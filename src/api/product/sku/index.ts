/*
 * @Author: kirito
 * @Date: 2023-06-02 22:05:49
 * @LastEditTime: 2023-06-02 23:50:06
 * @LastEditors: kirito
 * @Description: SKU模块接口管理
 * @FilePath: /project/src/api/product/sku/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import request from '@/utils/request'
// 枚举地址
enum API {
    // 获取已有的SKU列表数据
    SKU_URL = '/admin/product/list/',
    // 商品上架
    SALE_URL = '/admin/product/onSale/',
    // 商品下架
    CANCELSALE_URL = '/admin/product/cancelSale/',
    // 获取商品详情的接口
    SKUINFO_URL = '/admin/product/getSkuInfo/',
    // 删除已有的商品
    DELETESKU_URL = '/admin/product/deleteSku/'
}
import type { SkuResponseData, SkuInfoData } from './type'

// 获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
    request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 已有商品上架的请求
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId)
// 已有商品下架的请求
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)
// 获取商品详情的接口
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
// 删除已有的商品
export const reqDeleteSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId)
