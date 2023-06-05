<template>
    <div class="box6">
        <div class="title">
            <p>热门景区排行</p>
            <img src="../../images/dataScreen-title.png" alt="" />
        </div>
        <!-- 图行图标的容器 -->
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
        // 标题组件
        title: {
            // 主标题
            text: '景区排行',
            link: 'https://echarts.apache.org/zh/index.html',
            // 标题位置
            left: '50%',
            // 主题文字样式
            textStyle: {
                color: 'yellowgreen',
                fontSize: 20
            },
            // 子标题
            subtext: '各大景区排行',
            // 子标题的样式
            subtextStyle: {
                color: 'yellowgreen',
                fontSize: 16
            }
        },
        // x/y
        xAxis: {
            type: 'category' // 图表在X轴上份额不展示
        },
        yAxis: {},
        // 布局组件
        grid: {
            left: 20,
            bottom: 20,
            right: 20
        },
        // 系列: 决定显示图表是哪一种
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60, 70],
                // 柱状图:图形上的文本标签
                label: {
                    show: true,
                    // 文字的位置
                    position: 'insideTop',
                    color: 'hotpink'
                },
                // 是否显示背景颜色
                showBackground: true,
                backgroundStyle: {
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
                },
                // 柱条的样式
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                    // 柱条的颜色
                    color: function (data: any) {
                        // 给每一个柱条设置颜色
                        let arr = [
                            'red',
                            'orange',
                            'yellowgreen',
                            'green',
                            'skyblue',
                            'hotpink',
                            'purple'
                        ]
                        return arr[data.dataIndex]
                    }
                }
            },
            {
                type: 'line',
                data: [10, 20, 50, 60, 80, 90],
                // 平滑曲线
                smooth: true
            }
        ],
        tooltip: {
            backgroundColor: 'rgba(50,50,0,107)'
        }
    })
})
</script>

<style scoped lang="scss">
.box6 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;
    .title {
        margin-left: 5px;
        p {
            color: white;
            font-size: 20px;
        }
    }
    .charts {
        height: calc(100% - 30px);
    }
}
</style>
