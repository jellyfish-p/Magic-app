<script lang="ts" setup>
import { h, ref, watch } from 'vue'
import { random } from '../../utils/storage'
import { ElDialog, ElButton, ElTable, ElTableColumn, ElMessageBox, ElInputNumber, ElInput, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// functions
async function setUserInfo() {
    random.SetInfo({ name: data.value })
    dialogVisible.value = false
}

function editUserInfo(index: number) {
    id.value = data.value[index].id
    name.value = data.value[index].name
    ElMessageBox({
        title: '编辑用户',
        message: () => h('div', null, [
            h(ElInputNumber, {
                modelValue: id.value,
                min: 1,
                step: 1,
                "onUpdate:modelValue"(val) {
                    id.value = val || 1
                },
            }),
            h(ElInput, {
                modelValue: name.value,
                placeholder: '请输入用户名',
                "onUpdate:modelValue"(val) {
                    name.value = val
                },
            })
        ])
    }).then(() => {
        data.value.splice(index, 1, { id: id.value, name: name.value })
        data.value.sort((a, b) => a.id - b.id)
    })
}

function deleteUserInfo(index: number) {
    data.value.splice(index, 1)
}

function addUserInfo() {
    let idt = 1
    data.value.forEach(item => {
        if (item.id == idt) {
            idt++
        }
        else {
            return
        }
    })
    id.value = idt
    name.value = ''
    ElMessageBox({
        title: '添加用户',
        message: () => h('div', null, [
            h(ElInputNumber, {
                modelValue: id.value,
                min: 1,
                step: 1,
                "onUpdate:modelValue"(val) {
                    id.value = val || 1
                },
            }),
            h(ElInput, {
                modelValue: name.value,
                placeholder: '请输入用户名',
                "onUpdate:modelValue"(val) {
                    name.value = val
                },
            })
        ])
    }).then(() => {
        data.value.find((item) => item.id === id.value) ? ElMessage.error('用户 ID 已存在') :
            data.value.push({ id: id.value, name: name.value })
        data.value.sort((a, b) => a.id - b.id)
    })
}

const props = defineProps<{ editable: boolean }>()

const dialogVisible = defineModel<boolean>()

// Variables
const data = ref<{ id: number, name: string }[]>([])
const id = ref<number>(1)
const name = ref<string>('')

// Watchers
watch(dialogVisible, async (val) => {
    if (val) {
        data.value = (await random.OriginUserInfo()).name
    }
})
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="editable ? '修改用户信息' : '查看用户信息'" width="80%">
        <template #footer>
            <div>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button v-if="props.editable" type="primary" @click="setUserInfo">确定</el-button>
            </div>
        </template>

        <el-table :data="data" max-height="40vh">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column lable="操作">
                <template #default="scope">
                    <el-button v-if="props.editable" type="primary" text
                        @click="editUserInfo(scope.$index)">编辑</el-button>
                    <el-button v-if="props.editable" type="danger" text
                        @click="deleteUserInfo(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="mt-4 w-full" @click="addUserInfo">
            <el-icon>
                <Plus />
            </el-icon>
            添加用户
        </el-button>
    </el-dialog>
</template>
