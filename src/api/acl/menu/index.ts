import request from '@/utils/request'
// 枚举地址
enum API {
    // 获取全部菜单与按钮的标记地址
    ALLPERMISSION_URL = '/admin/acl/permission',
    // 给某一级菜单新增一个子菜单
    ADDMENU_URL = '/admin/acl/permission/save',
    // 更新已有的菜单
    UPDATEMENU_UTL = '/admin/acl/permission/update',
    // 删除已有菜单
    DELETEMENU_URL = '/admin/acl/permission/remove/'
}
import type { PermissionResponseData, MenuParams } from './type'
// 获取菜单的数据
export const reqAllPermission = () =>
    request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
// 添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEMENU_UTL, data)
    } else {
        return request.post<any, any>(API.ADDMENU_URL, data)
    }
}
/**
 * 删除已有菜单
 * @param id
 * @returns
 */
export const reqRemoveMenu = (id: number) => request.delete<any, any>(API.DELETEMENU_URL + id)
