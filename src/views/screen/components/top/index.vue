<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间:{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 点击首页按钮回到首页
import { useRouter } from 'vue-router'
// 获取路由器对象
let $router = useRouter()
let timer = ref(0)
// 存储当前的时间
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
// 按钮点击的回调
const goHome = () => {
    $router.push('/home')
}
// 组件挂载完毕更新当前的时间
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    }, 100)
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 40px;
    display: flex;
    .left {
        flex: 1.5;
        background-size: cover;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            background-size: 100% 100%;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
    }
    .center {
        flex: 2;
        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;
        }
    }
    .right {
        flex: 1.5;
        background-size: cover;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rbtn {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            background-size: 100% 100%;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
        }
        .time {
            color: #29fcff;
            font-size: 20px;
            margin-right: 10px;
        }
    }
}
</style>
