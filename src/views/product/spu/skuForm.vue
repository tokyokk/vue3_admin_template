<!-- eslint-disable vue/valid-attribute-name -->
<!-- eslint-disable vue/no-unused-vars -->
<!--
 * @Author: kirito
 * @Date: 2023-05-31 23:06:38
 * @LastEditTime: 2023-06-02 01:54:34
 * @LastEditors: kirito
 * @Description: 
 * @FilePath: /project/src/views/product/spu/skuForm.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input type="number" placeholder="价格(元)" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
            <el-input type="number" placeholder="重量(g)" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input type="textarea" placeholder="SKU描述" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>

        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item
                    v-for="(item, index) in attrArr"
                    :key="item.id"
                    :label="item.attrName"
                >
                    <el-select v-model="item.attrIdAndValueId">
                        <el-option
                            v-for="(attrValue, index) in item.attrValueList"
                            :key="attrValue.id"
                            :value="`${item.id}:${attrValue.id}`"
                            :label="attrValue.valueName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item
                    :label="item.saleAttrName"
                    v-for="(item, index) in saleArr"
                    :key="item.id"
                >
                    <el-select v-model="item.saleIdAndValueId">
                        <el-option
                            v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
                            :key="saleAttrValue.id"
                            :value="`${item.id}:${saleAttrValue.id}`"
                            :label="saleAttrValue.saleAttrValueName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr" ref="table">
                <el-table-column type="selection" align="center" width="80px"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="handler(row)">
                            设置默认
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
// 引入请求API
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
import { ref, reactive } from 'vue'
import { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
// 平台属性
let attrArr = ref<any>([])
// 销售属性
let saleArr = ref<any>([])
// 照片的数据
let imgArr = ref<any>([])
// 获取table组件实例
let table = ref<any>()

// 收集sku的参数
let skuParams = reactive<SkuData>({
    // 父组件传递过来的数据
    category3Id: '', // 三级分类的ID
    spuId: '', // 已有的SPU的ID
    tmId: '', // SPU品牌的ID
    // v-model收集
    skuName: '', // SKU名字
    price: '', // sku价格
    weight: '', // sku重量
    skuDesc: '', // sku的描述
    skuAttrValueList: [], // 平台属性的收集
    skuSaleAttrValueList: [], // 销售属性
    skuDefaultImg: '' // sku图片地址
})

// 自定义事件的方法
let $emit = defineEmits(['changeScene'])

// 取消按钮的回调
const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}

// 当前子组件的方法对外暴露
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    // 收集数据
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
    // 获取平台属性
    let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    // 获取对应的销售属性
    let result1: any = await reqSpuHasSaleAttr(spu.id)
    // 获取照片墙的数据
    let result2: any = await reqSpuImageList(spu.id)
    // 平台属性
    attrArr.value = result.data
    // 销售属性
    saleArr.value = result1.data
    // 图片
    imgArr.value = result2.data
}

// 设置默认图片的方法回调
const handler = (row: any) => {
    // 点击的时候,全部的图片的复选框不勾选
    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    })
    // 选中的图片才勾选
    table.value.toggleRowSelection(row, true)
    // 收集图片的地址
    skuParams.skuDefaultImg = row.imgUrl
}

// 保存按钮的方法回调
const save = async () => {
    // 整理参数
    // 平台属性
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    }, [])
    // 销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    }, [])

    // 添加SKU的请求
    let result: any = await reqAddSku(skuParams)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
        // 通知父组件切换场景为0
        $emit('changeScene', { flag: 0, params: '' })
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }
}

defineExpose({
    initSkuData
})
</script>

<style scoped></style>
