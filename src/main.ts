import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// svg需要的配置项
import 'virtual:svg-icons-register'
// 引入模版的全局的样式
import '@/styles/index.scss'

// 引入自定义插进全局注册：注册整个项目全局组件
import globalComponent from '@/components'
// 引入仓库
import pinia from './store'

// 引入element-plus国际化
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import router from './router'
import './permisstion'

// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn // element-plus国际化配置
})
// 注册模版路由
app.use(router)
// 注册pinia
app.use(pinia)

// 安装自定义插件
app.use(globalComponent)

// 引入自定义指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)

// 将应用挂载到挂载点上
app.mount('#app')
