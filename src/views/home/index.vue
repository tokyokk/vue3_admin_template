<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar" />
            <div class="bottom">
                <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
                <p class="subtitle">硅谷甄选运营平台</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="600px" height="400px"></svg-icon>
    </div>
</template>

<script setup lang="ts">
// 引入用户相关的仓库,获取当前用户的头像,昵称
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
// 获取用户的头像和昵称
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
    display: flex;
    .avatar {
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }
    .bottom {
        margin-left: 20px;
        .title {
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 30px;
        }
        .subtitle {
            font-style: italic;
            color: pink;
        }
    }
}
.bottoms {
    display: flex;
    margin-top: 20px;
    justify-content: center;
}
</style>
