<template>
    <div class="box8">
        <div class="title">
            <p>数据统计</p>
            <img src="../../images/dataScreen-title.png" alt="" />
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 获取DOM节点
let charts = ref()
// 组件挂载完毕
onMounted(() => {
    // 一个容器可以同时处理多种类型的图表
    let mychart = echarts.init(charts.value)
    let option = {
        title: {
            text: '游客消费统计',
            textStyle: {
                color: 'white'
            }
        },

        radar: {
            // shape: 'circle',
            indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '购物'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '写代码'
                    }
                ]
            }
        ]
    }
    mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box8 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    .title {
        p {
            color: white;
            font-size: 18px;
        }
    }
    .charts {
        height: calc(100% - 30px);
    }
}
</style>
