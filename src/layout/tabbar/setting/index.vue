<template>
    <el-button circle size="small" icon="Refresh" @click="updateRefsh"></el-button>
    <el-button circle size="small" icon="FullScreen" @click="fullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <!-- 表单组件 -->
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker
                    v-model="color"
                    @change="setColor"
                    show-alpha
                    size="small"
                    :predefine="predefineColors"
                />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch
                    @change="changeDark"
                    v-model="dark"
                    class="mt-2"
                    style="margin-left: 24px"
                    inline-prompt
                    active-icon="MoonNight"
                    inactive-icon="Sunny"
                />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button circle size="small" icon="Setting"></el-button>
        </template>
    </el-popover>
    <img
        :src="userStore.avatar"
        style="width: 24px; border-radius: 50%; height: 24px; border-radius: 50%; margin: 0 10px"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 获取骨架的小仓库
import useLayoutSettingStore from '@/store/modules/setting'
// 获取路由器对象
let $router = useRouter()
// 获取路由对象
let $route = useRoute()
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
// 收集开关的数据
let dark = ref<boolean>(false)

// 刷新按钮的回调
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}

// 全屏按钮点击的回调
const fullScreen = () => {
    // DOM对象的一个属性:可以用来判断当亲是否是全屏状态[全屏:true,不是全屏:false]
    let full = document.fullscreenElement
    // 切换为全屏模式
    if (!full) {
        // 文档根节点的方法requestFullscreen,实现全屏
        document.documentElement.requestFullscreen()
    } else {
        // 变为不是全屏模式->退出全屏模式
        document.exitFullscreen()
    }
}

// 退出登录的回调
const logout = async () => {
    /**
     * 第一件事:需要向服务器发请求[退出登录的接口]
     * 第二件事:仓库当中关于用户相关的数据清空[token|username|avatar...]
     * 第三件事:跳转到登录页面
     */
    await userStore.userLogout()
    // 跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } })
}

// 颜色组件需要的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577'
])

// switch组件开关的change事件进行暗黑模式的切换
const changeDark = () => {
    // 获取HTML根节点
    let html = document.documentElement
    // 判断HTML标签是否有dark类名
    dark.value ? (html.className = 'dark') : (html.className = '')
}
// 主题颜色的设置
const setColor = () => {
    // 通过js修改节点的样式对象的属性与属性值
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
}
</script>

<script lang="ts">
export default {
    name: 'Setting'
}
</script>

<style scoped></style>
