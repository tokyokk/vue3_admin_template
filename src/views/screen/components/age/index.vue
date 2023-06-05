<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png" alt="" />
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let charts = ref()
// 组件挂载完毕初始化图行图表
onMounted(() => {
    let mychart = echarts.init(charts.value)
    // 设置配置项
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 10,
            orient: 'vertical', // 图例组件方向的设置
            // 图例组件的文字颜色
            textStyle: {
                color: 'white',
                fontSize: 14
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: 'white'
                },
                // 放大效果
                /* emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                }, */
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Java' },
                    { value: 735, name: 'JavaScript' },
                    { value: 580, name: 'golang' },
                    { value: 484, name: 'C++' },
                    { value: 300, name: 'C语言' }
                ]
            }
        ],
        // 调整图形图表的位置
        grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        }
    }
    mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box2 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: 20px;
        p {
            color: white;
            font-size: 20px;
        }
    }
    .charts {
        height: 260px;
    }
}
</style>
