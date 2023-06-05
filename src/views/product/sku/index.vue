<!-- eslint-disable vue/valid-attribute-name -->
<!--
 * @Author: kirito
 * @Date: 2023-05-26 23:45:44
 * @LastEditTime: 2023-06-02 21:50:05
 * @LastEditors: kirito
 * @Description: 
 * @FilePath: /project/src/views/product/sku/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <el-card>
        <el-table stripe border style="margin: 10px 0" :data="skuArr">
            <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
            ></el-table-column>
            <el-table-column
                prop="skuName"
                label="名称"
                show-overflow-tooltip
                width="150px"
            ></el-table-column>
            <el-table-column
                prop="skuDesc"
                label="描述"
                show-overflow-tooltip
                width="150px"
            ></el-table-column>
            <el-table-column label="图片" width="150px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" width="150px"></el-table-column>
            <el-table-column prop="price" label="价格" width="150px"></el-table-column>
            <el-table-column label="操作" width="350px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        type="primary"
                        :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
                        size="small"
                        @click="updateSale(row)"
                    ></el-button>
                    <el-button
                        @click="updateSku"
                        type="primary"
                        icon="Edit"
                        size="small"
                    ></el-button>
                    <el-button
                        @click="findSku(row)"
                        type="primary"
                        icon="InfoFilled"
                        size="small"
                    ></el-button>
                    <el-popconfirm
                        @confirm="removeSku(row.id)"
                        :title="`你确定删除${row.skuName}吗?`"
                        width="200px"
                    >
                        <template #reference>
                            <el-button type="primary" icon="Delete" size="small"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 15, 20, 25]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getHasSku"
            @size-change="handler"
        />

        <!-- 抽屉组件:展示商品的详情 -->
        <el-drawer v-model="drawer">
            <!-- 标题部分 -->
            <template #header>
                <h4>查看商品的详情</h4>
            </template>
            <template #default>
                <el-row style="margin: 10px 0">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag
                            style="margin: 5px"
                            v-for="item in skuInfo.skuAttrValueList"
                            :key="item.id"
                        >
                            {{ item.valueName }}
                        </el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag
                            style="margin: 5px"
                            v-for="item in skuInfo.skuSaleAttrValueList"
                            :key="item.id"
                        >
                            {{ item.saleAttrValueName }}
                        </el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入请求
import { reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo, reqDeleteSku } from '@/api/product/sku'
import { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage, ElNotification } from 'element-plus'
// 分页器当前页码
let pageNo = ref<number>(1)
// 每一页展示的条目数量
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
// 控制抽屉的的显示与隐藏
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
// 组件挂载完毕
onMounted(() => {
    getHasSku()
})
const getHasSku = async (pager = 1) => {
    // 当前分页器的页码
    pageNo.value = pager
    let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
        total.value = result.data.total
        skuArr.value = result.data.records
    }
}

// 分页器下拉菜单发生变化触发
const handler = (pageSizes: number) => {
    getHasSku()
}

// 商品的上架与下级的操作
const updateSale = async (row: SkuData) => {
    // 如果当前商品的isSale==1,说明是上架商品，->更新为下架
    if (row.isSale == 1) {
        // 下架操作
        await reqCancelSale(row.id as number)
        // 提示信息
        ElMessage({
            type: 'success',
            message: '下架成功'
        })
        // 发请求获取当前更新完毕的全部SKU
        getHasSku(pageNo.value)
    } else {
        // 上架操作
        await reqSaleSku(row.id as number)
        // 提示信息
        ElMessage({
            type: 'success',
            message: '上架成功'
        })
        // 发请求获取当前更新完毕的全部SKU
        getHasSku(pageNo.value)
    }
}

// 更新已有的SKU
const updateSku = () => {
    ElNotification({
        message: '程序员正在努力的开发中......',
        type: 'success'
    })
}
// 查看商品详情的回调
const findSku = async (row: SkuData) => {
    // 展示抽屉
    drawer.value = true
    // 获取已有商品的数据
    let result: SkuInfoData = await reqSkuInfo(row.id as number)
    // 存储已有的SKU
    skuInfo.value = result.data
}

// 删除已有的SKU商品
const removeSku = async (id: number) => {
    // 删除已有的商品
    let result: any = await reqDeleteSku(id)
    if (result.code == 200) {
        // 提示信息
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        // 获取已有全部商品
        getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '系统数据不能删除'
        })
    }
}

/* const handleCurrentChange = (val: number) => {
    pageNo.value = val
    getHasSku(pageNo.value)
} */
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
