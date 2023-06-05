<template>
    <div class="box7">
        <div class="title">
            <p>年度游客量对比</p>
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
    mychart.setOption({
        title: {
            text: '散点图',
            left: '40%',
            textStyle: {
                color: 'white'
            }
        },
        xAxis: {
            type: 'category',
            show: true
        },
        yAxis: { show: false },
        grid: {
            left: 20,
            top: 20,
            right: 0,
            bottom: 20
        },
        series: {
            type: 'scatter',
            data: [33, 55, 68, 669, 1175, 5596, 1856, 5563, 3358, 885, 669, 4458, 6698, 5585],
            // 标记图行的设置
            symbol: 'diamond',
            symbolSize: 16,
            // 图文标签
            label: {
                show: true,
                position: 'top',
                color: 'skyblue'
            },
            // 散点图标记的颜色
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'orange' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: 'blue' // 100% 处的颜色
                        }
                    ],
                    global: false // 缺省为 false
                }
            }
        }
    })
})
</script>

<style scoped lang="scss">
.box7 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;
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
