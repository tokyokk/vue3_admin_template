/*
 * @Author: kirito
 * @Date: 2023-05-31 21:45:04
 * @LastEditTime: 2023-06-02 02:29:01
 * @LastEditors: kirito
 * @Description: SPU接口的数据类型定义类
 * @FilePath: /project/src/api/product/spu/type.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// 服务器全部接口返回的数据类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// SPU数据的ts类型,需要修改
export interface SpuData {
    id?: number
    spuName: string
    description: string
    category3Id: number | string
    tmId: number | string
    spuSaleAttrList: null | SaleAttr[]
    spuImageList: null | SpuImg[]
}

// 数组:元素都是已有SPU数据类型
export type Records = SpuData[]
// 定义获取已有的SPU接口返回的ts类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        searchCount: boolean
        pages: number
    }
}
// 品牌类型的TS类型
export interface TradeMark {
    id: number
    tmName: string
    logoUrl: string
}
// 品牌接口返回的数据ts类型
export interface AllTradeMark extends ResponseData {
    data: TradeMark[]
}

// 商品图片的ts类型
export interface SpuImg {
    id?: number
    imgName?: string
    imgUrl?: string
    createTime?: string
    updateTime?: string
    spuId?: number
    name?: string
    url?: string
}
// 已有的SPU的图片墙数据的类型
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

// 已有的销售属性值对象ts类型
export interface SaleAttrValue {
    id?: number
    createTime?: null
    updateTime?: null
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrValueName: string
    saleAttrName?: string
    isChecked?: null
}
// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]
// 销售属性对象ts类型
export interface SaleAttr {
    id?: number
    createTime?: null
    updateTime?: null
    spuId?: number
    baseSaleAttrId: number | string
    saleAttrName: string
    spuSaleAttrValueList: SpuSaleAttrValueList
    flag?: boolean
    saleAttrValue?: string
}

// SPU已有的销售属性接口返回ts类型
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

// 已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
    id: number
    name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}

export interface Attr {
    attrId: string | number // 平台属性的ID
    valueId: string | number // 属性值的ID
}
export interface saleArr {
    saleAttrId: string | number // 属性ID
    saleAttrValueId: string | number // 属性值的ID
}

export interface SkuData {
    category3Id: string | number // 三级分类的ID
    spuId: string | number // 已有的SPU的ID
    tmId: string | number // SPU品牌的ID
    skuName: string // SKU名字
    price: string | number // sku价格
    weight: string | number // sku重量
    skuDesc: string // sku的描述
    skuAttrValueList?: Attr[] // 平台属性的收集
    skuSaleAttrValueList?: saleArr[] // 销售属性
    skuDefaultImg: string // sku图片地址
}

// 获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}
