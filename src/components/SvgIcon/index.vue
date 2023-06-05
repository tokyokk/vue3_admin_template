<template>
    <!-- svg:图标的外层是容器节点，内部需要结合use标签结合使用 -->
    <svg :style="{ width, height }">
        <!-- xlink:href执行需要使用的图标,属性值务必使用#icon-图标的名字 -->
        <!-- use标签使用fill属性可以填充颜色 -->
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
// 接收父组件传递过来的参数
defineProps({
    // xlink:href属性值前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    // 提供使用的图标名字
    name: String,
    // 接收父组件的颜色
    color: {
        type: String,
        default: ''
    },
    // 接收父组件传递过来的图标大小
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})
</script>

<style scoped></style>
