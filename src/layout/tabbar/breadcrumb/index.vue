<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包屑动态展示路由名字与标题 -->
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            v-show="item.meta.title"
            :to="item.path"
        >
            <!-- 图标 -->
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span style="margin: 0 5px">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
// 获取layout配置相关的仓库
let LayoutSettingStore = useLayoutSettingStore()
// 获取路由对象
let $route = useRoute()

const changeIcon = () => {
    // 图标进行切换
    LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>

<style scoped></style>
