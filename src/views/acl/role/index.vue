<!-- eslint-disable vue/valid-attribute-name -->
<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary" :disabled="keyword ? false : true">
                    搜索
                </el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
        <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0" :data="allRole">
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column
                show-overflow-tooltip
                align="center"
                label="职位名称"
                prop="roleName"
            ></el-table-column>
            <el-table-column
                align="center"
                show-overflow-tooltip
                label="创建时间"
                prop="createTime"
            ></el-table-column>
            <el-table-column
                align="center"
                label="更新时间"
                prop="updateTime"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column align="center" label="操作" width="300px">
                <!-- row:代表已有的职位对象 -->
                <template #="{ row, $index }">
                    <el-button type="primary" icon="User" size="small" @click="setPermission(row)">
                        分配权限
                    </el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">
                        编辑
                    </el-button>
                    <el-popconfirm
                        :title="`你确定删除${row.roleName}?`"
                        width="200px"
                        @confirm="removeRole(row.id)"
                    >
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :background="true"
            layout=" prev, pager, next, jumper,-> ,sizes,total"
            :total="total"
            @current-change="getHasRole"
            @size-change="sizeChange"
        />
    </el-card>
    <!-- 添加职位与更新职位的结构:对话框 -->
    <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉组件:分配职位的菜单权限与按钮权限 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
            <el-tree
                ref="tree"
                :data="menuArr"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="selectArr"
                :props="defaultProps"
            />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer = false">取消</el-button>
                <el-button type="primary" @click="handler">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
// 请求方法
import {
    reqAllRoleList,
    reqAddOrUpdateRole,
    reqAllMenuList,
    reqSetPermission,
    reqRemoveRole
} from '@/api/acl/role/index'
import type {
    Records,
    RoleResponseData,
    RoleData,
    MenuResponseData,
    MenuList
} from '@/api/acl/role/type'
// 引入骨架仓库
import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示几条数据
let pageSize = ref<number>(5)
// 搜索职位关键字
let keyword = ref<string>('')
// 存储总个数
let allRole = ref<Records>([])
// 职位总个数
let total = ref<number>(0)
// 仓库中的数据:刷新页面
let settingStore = useLayoutSettingStore()
// 对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 获取tree组件实例
let tree = ref<any>()
// 收集新增岗位数据
let RoleParams = reactive<RoleData>({
    roleName: ''
})
// 定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
// 准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])
// 获取form组件实例
let form = ref<any>()
/**
 * 组件挂载完毕
 */
onMounted(() => {
    // 获取职位请求
    getHasRole()
})
/**
 * 获取全部用户信息的方法|分页器当前页码发生变化的回调
 * @param pager 初始页
 */
const getHasRole = async (pager = 1) => {
    // 修改当前页码
    pageNo.value = pager
    let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
        total.value = result.data.total
        allRole.value = result.data.records
    }
}
/**
 * 下拉菜单页码发生变化的回调
 */
const sizeChange = () => {
    getHasRole()
}
/**
 * 搜索按钮的点击回调
 */
const search = () => {
    // 再次发请求根据关键字
    getHasRole()
    keyword.value = ''
}
/**
 * 重置按钮的回调
 */
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
// 添加职位按钮的回调
const addRole = () => {
    // 对话框显示
    dialogVisible.value = true
    // 清空数据
    Object.assign(RoleParams, {
        roleName: '',
        id: 0
    })
    // 清空上一次表单校验结果
    nextTick(() => {
        form.value.clearValidate('roleName')
    })
}
// 更新职位按钮的回调
const updateRole = (row: RoleData) => {
    // 对话框显示
    dialogVisible.value = true
    // 存储已有的职位(带有ID)
    Object.assign(RoleParams, row)
    // 清空上一次表单校验结果
    nextTick(() => {
        form.value.clearValidate('roleName')
    })
}
// 自定义校验规则
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('职位名称不能少于两位'))
    }
}
// 职位相关的及哦啊眼规则
const rules = {
    roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }]
}
// 确定按钮的回调
const save = async () => {
    // 表单校验结果,结果通过发请求,结果没通过不应该发请求
    await form.value.validate()
    // 添加或者更新职位请求
    let result: any = await reqAddOrUpdateRole(RoleParams)
    if (result.code == 200) {
        // 提示文字
        ElMessage({
            type: 'success',
            message: RoleParams.id ? '更新成功' : '添加成功'
        })
        // 对话框消失
        dialogVisible.value = false
        // 再次获取数据
        getHasRole(RoleParams.id ? pageNo.value : 1)
    }
}
// 分配权限按钮的回调
// 已有的职位的数据
const setPermission = async (row: RoleData) => {
    // 抽屉显示出来
    drawer.value = true
    // 收集当前要分类权限的职位的数据
    Object.assign(RoleParams, row)
    // 根据职位获取权限的数据
    let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
    if (result.code == 200) {
        menuArr.value = result.data
        selectArr.value = filterSelectArr(menuArr.value, [])
    }
}

// 树形控件测试数据
const defaultProps = {
    children: 'children',
    label: 'name'
}

const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr)
        }
    })
    return initArr
}
/**
 * 抽屉确定按钮的回调
 */
const handler = async () => {
    // 职位的id
    const roleId = RoleParams.id as number
    // 选中的节点ID
    let arr = tree.value.getCheckedKeys()
    // 半选的ID
    let arr1 = tree.value.getHalfCheckedKeys()
    let permissionId = arr.concat(arr1)
    // 下发权限
    let result: any = await reqSetPermission(roleId, permissionId)
    if (result.code == 200) {
        // 抽屉关闭
        drawer.value = false
        // 提示信息
        ElMessage({
            type: 'success',
            message: '分配权限成功'
        })
        // 页面刷新
        window.location.reload()
    }
}
/**
 * 删除已有的职位
 */
const removeRole = async (id: number) => {
    let result: any = await reqRemoveRole(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
}
</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
</style>
