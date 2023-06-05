// 用户管理接口
import request from '@/utils/request'
// 枚举地址
enum API {
    // 获取全部已有用户账号信息
    ALLUSER_URL = '/admin/acl/user/',
    // 新增一个新的用户信息
    ADDUSER_URL = '/admin/acl/user/save',
    // 更新已有的用户信息
    UPDATEUSER_URL = '/admin/acl/user/update',
    // 获取全部值为,当前账号拥有的职位接口
    ALLROLE_URL = '/admin/acl/user/toAssign/',
    // 给已有的用户分配角色接口
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    // 删除用户
    DELETEUSER_URL = '/admin/acl/user/remove/',
    // 批量删除的接口
    DELETEALLUSER_UTL = '/admin/acl/user/batchRemove'
}
import type { UserResponseData, User, AllRoleResponseData } from './type'

// 用户管理接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
    request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)

// 添加用户与修改用户接口
export const reqAddOrUpdate = (data: User) => {
    // 鞋带参数有ID更新
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}
// 获取全部职位以及包含当前用户的已有职位
export const reqAllRole = (userId: number) =>
    request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
// 分配职位
export const reqSetUserRole = (data: any) => request.post<any, any>(API.SETROLE_URL, data)
// 删除某个用户
export const reqDeleteUser = (userId: number) =>
    request.delete<any, any>(API.DELETEUSER_URL + userId)
// 批量删除的接口
export const reqDeleteAllUser = (idList: number[]) =>
    request.delete<any, any>(API.DELETEALLUSER_UTL, { data: idList })
