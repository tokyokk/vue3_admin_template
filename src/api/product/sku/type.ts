/*
 * @Author: kirito
 * @Date: 2023-06-02 22:05:55
 * @LastEditTime: 2023-06-02 23:42:55
 * @Description: SKU接口类型
 * @FilePath: /project/src/api/product/sku/type.ts
 * @LastEditors: kirito
 * 可以输入预定的版权声明、个性签名、空行等
 */
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 定义SKU对象的ts类型
export interface Attr {
    id?: number
    attrId: string | number // 平台属性的ID
    valueId: string | number // 属性值的ID
}
export interface saleArr {
    id?: number
    saleAttrId: string | number // 属性ID
    saleAttrValueId: string | number // 属性值的ID
}

export interface SkuData {
    category3Id?: string | number // 三级分类的ID
    spuId?: string | number // 已有的SPU的ID
    tmId?: string | number // SPU品牌的ID
    skuName?: string // SKU名字
    price?: string | number // sku价格
    weight?: string | number // sku重量
    skuDesc?: string // sku的描述
    skuAttrValueList?: Attr[] // 平台属性的收集
    skuSaleAttrValueList?: saleArr[] // 销售属性
    skuDefaultImg?: string // sku图片地址
    isSale?: number // 控制商品的上架与下架
    id?: number
}

// 获取SKU接口返回的ts类型
export interface SkuResponseData extends ResponseData {
    data: {
        records: SkuData[]
        total: number
        size: number
        current: number
        orders: []
        optimizeCountSql: boolean
        hitCount: boolean
        countId: null
        maxLimit: null
        searchCount: boolean
        pages: number
    }
}

// 获取SKU接口的ts函数
export interface SkuInfoData extends ResponseData {
    data: SkuData
}
