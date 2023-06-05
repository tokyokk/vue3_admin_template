// 定义用户相关数据的ts类型
// 用户登录接口携带的ts类型
export interface loginFormData {
    username: string
    password: string
}

// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

// 定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string
}

// 定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}

/* 以下是mock的ts定义 */
/* 登录接口需要携带ts类型  */
/*export interface loginForm {
    username: string
    password: string
}

interface dataType {
    token?: string
    message?: string
}

// 登录接口返回数据类型
export interface loginResponseData {
    code: number
    data: dataType
}

// 定义服务器返回用户信息相关的数据类型
interface userInfo {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
}

interface user {
    checkUser: userInfo
}
export interface userResponseData {
    code: number
    data: user
}*/
