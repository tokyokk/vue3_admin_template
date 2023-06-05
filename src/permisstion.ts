//路由鉴权:鉴权,项目当中路由能不能被访问的权限的设置(某一个路由什么情况下可以被访问,是什么时候不可以访问)
import router from '@/router'
import setting from './setting'
// 进度条以及样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 取消进度条转圈
nprogress.configure({ showSpinner: false })

// 获取用户相关的小仓库内部的token数据,去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)

// 全局守卫:项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    // to and from are both route objects. must call `next`.
    document.title = `${setting.title} - ${to.meta.title}`
    /**
     * to:你将要访问那个路由
     * from:你从哪个路由而来的
     * next:路由放行的函数
     */
    nprogress.start()
    // 获取token,判断用户是否登录
    const token = userStore.token
    // 获取用户名字
    const username = userStore.username
    // 用户未登录
    if (token) {
        // 登录成功,访问login,不能访问,指向首页
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            // 登录成功访问其余六个路由(登录除外)
            // 有用户信息
            if (username) {
                next()
            } else {
                // 如果没有用户信息,在守卫这里发请求获取到用户信息在放行
                try {
                    // 获取用户信息
                    await userStore.userInfo()
                    // 放行
                    // 万一:刷新的时候是异步路由,有可能获取到用户信息/异步路由还没有加载完毕,出现空白效果
                    next({ ...to })
                } catch (error) {
                    // token过期:获取不到用户信息
                    // 用户手动修改本地存储token
                    // 退出登录->用户相关的数据清空
                    await userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        // 用户未登录判断
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
    // to and from are both route objects.
    nprogress.done()
})

// 第一个问题:任意路由切换实现进度条的业务--nprogress
// 第二个问题:路由鉴权问题(路由组件访问权限的设置)
// 全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

// 用户未登录:可以访问login,其余的六个路由不能访问(指向login)
// 用户登录成功:不可以访问login[指向首页],其余的路由可以访问
