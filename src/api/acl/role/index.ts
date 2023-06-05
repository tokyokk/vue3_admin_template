// 角色管理模块的接口
import request from '@/utils/request'
// 枚举地址
enum API {
    // 获取全部的职位接口
    ALLROLE_URL = '/admin/acl/role/',
    // 新增岗位
    ADDROLE_URL = '/admin/acl/role/save',
    // 更新已有的职位
    UPDATEROLE_URL = '/admin/acl/role/update',
    // 获取全部的菜单与按钮的数据
    ALLPERMISSION = '/admin/acl/permission/toAssign/',
    // 给相应的职位分配权限
    SERPERMISTION_URL = '/admin/acl/permission/doAssign/?',
    // 删除已有的职务
    REMOVEROLE_URL = '/admin/acl/role/remove/'
}
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
// 获取全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
    request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
/**
 * 添加职位或者更新已有职位
 * @param data
 * @returns
 */
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
}
/**
 * 获取全部的菜单与按钮的数据
 * @param roleId 角色ID
 * @returns
 */
export const reqAllMenuList = (roleId: number) =>
    request.get<any, MenuResponseData>(API.ALLPERMISSION + roleId)
/**
 * 给相应的职位分配权限
 * @param roleId
 * @param permisssionId
 * @returns
 */
export const reqSetPermission = (roleId: number, permisssionId: number[]) =>
    request.post(API.SERPERMISTION_URL + `roleId=${roleId}&permissionId=${permisssionId}`)
/**
 * 删除已有的职位
 * @param roleId
 * @returns
 */
export const reqRemoveRole = (roleId: number) =>
    request.delete<any, any>(API.REMOVEROLE_URL + roleId)
