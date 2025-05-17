<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { ElSelect, ElOption, ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber } from 'element-plus';
import { UserInfoData } from '../../types/global';

const ConfigList = ref<string[]>(['default'])

onMounted(async () => {
    ConfigList.value = await window.storage.getItem("config-list") || ['default']
    options.value = localStorage.getItem('last-config_name') || 'default'
    data.value = await window.storage.getItem("config:" + options.value) || []
})

const options = ref<string>('default');
const data = ref<UserInfoData[]>([])

watch(options, async (val) => {
    data.value = await window.storage.getItem("config:" + val) || []
    localStorage.setItem('last-config_name', val)
})

const addingUser = ref<boolean>(false)
const Saving = ref<boolean>(false)

const form = reactive({
    id: 1,
    name: '',
    nickname: '',
})

async function addUser() {
    addingUser.value = true
    let idx = 1
    data.value.forEach((item) => {
        if (item.id === idx) {
            idx++
        }
    })
    form.id = idx
    form.name = ''
    form.nickname = ''
}

function addUserConfirm() {
    data.value.push({ id: form.id, real_name: form.name, username: form.nickname, choosed: false, available: true } as UserInfoData)
    addingUser.value = false
}

async function save() {
    Saving.value = true
    await window.storage.setItem("config:" + options.value, JSON.parse(JSON.stringify(data.value)))
    Saving.value = false
}
</script>

<template>
    <div class="flex">
        <p class="select-none text-nowrap justify-center items-center mr-1">选择配置文件</p>
        <el-select v-model="options" placeholder="选择配置文件">
            <el-option v-for="i in ConfigList" :key="i" :label="i" :value="i" />
        </el-select>
    </div>
    <el-table :data="data" style="width: 100%" class="max-h-[50vh]" :loading="addingUser || Saving">
        <el-table-column prop="id" label="ID" width="180" sortable />
        <el-table-column prop="real_name" label="Name" width="180" sortable />
        <el-table-column prop="username" label="Nickname" width="180" />
    </el-table>
    <div class="flex">
        <el-button class="w-full" @click="addUser" :loading="addingUser">Add user</el-button>
        <el-button class="w-full" @click="save" :loading="Saving">Save</el-button>
    </div>
    <el-dialog v-model="addingUser" title="Add user">
        <el-form :model="form">
            <el-form-item label="ID"><el-input-number v-model="form.id" :min="1"></el-input-number></el-form-item>
            <el-form-item label="Name*"><el-input v-model="form.name" placeholder="请输入真名"></el-input></el-form-item>
            <el-form-item label="Nickname"><el-input v-model="form.nickname"
                    placeholder="请输入昵称"></el-input></el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addingUser = false">Cancel</el-button>
                <el-button type="primary" @click="addUserConfirm">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>