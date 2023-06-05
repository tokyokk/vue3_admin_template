<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo />
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu
                    :collapse="LayoutSettingStore.fold ? true : false"
                    :default-active="$route.path"
                    background-color="#001529"
                    text-color="white"
                    active-text-color="yellowgreen"
                >
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: LayoutSettingStore.fold ? true : false }">
            <!-- layout的组件顶部导航tabbar组件 -->
            <Tabbar />
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ fold: LayoutSettingStore.fold ? true : false }">
            <Main />
        </div>
    </div>
</template>

<script setup lang="ts">
// 获取路由对象
import { useRoute } from 'vue-router'
// 引入左侧菜单logo子组件
import Logo from './Logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 右侧内容展示区域
import Main from './main/index.vue'
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 获取layout配置仓库
let LayoutSettingStore = useLayoutSettingStore()

// 获取路由对象
let $route = useRoute()
</script>

<script lang="ts">
export default {
    name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>
