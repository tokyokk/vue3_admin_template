// 数据类型定义
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 菜单权限与按钮权限的ts类型
export interface Permission {
    id?: number
    createTime: string
    updateTime: string
    pid: number
    name: string
    code: null
    toCode: null
    type: number
    status: null
    level: number
    children?: PermissionList
    select: boolean
}

export type PermissionList = Permission[]

// 菜单接口返回的数据类型
export interface PermissionResponseData extends ResponseData {
    data: PermissionList
}

// 添加或者修改菜单携带的参数ts类型
export interface MenuParams {
    id?: number // ID`
    code: number | string // 权限数值
    level: number // 几级菜单
    name: string // 菜单的名字
    pid: number // 菜单的id
}
