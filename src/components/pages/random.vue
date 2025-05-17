<script lang="ts" setup>
import PE from '../person-element.vue'
import { onMounted, ref, watch,onUnmounted } from 'vue';
import { ElContainer, ElMain, ElAside, ElDivider } from 'element-plus'
import { UserInfoData } from '../../types/global';

const ConfigList = ref<string[]>()
const data = ref<UserInfoData[]>()
const last_config = ref<string>()

onMounted(async () => {
    ConfigList.value = await window.storage.getItem("config-list") as string[] || []
    console.log(1)
    if (ConfigList.value.length <= 1) {

        console.log(2)
        window.storage.setItem("config-list", ['default'])
        ConfigList.value = ['default']
    }
    console.log(3)
    last_config.value = localStorage.getItem("last-config_name") || 'default'
    data.value = await window.storage.getItem("config:" + last_config.value) as UserInfoData[]
})

watch(last_config, async (newVal, oldVal) => {
    console.log("from:", oldVal, "to:", newVal)
    if (newVal) {
        if (oldVal)
            window.storage.setItem("config:" + oldVal, data.value)
        localStorage.setItem("last-config_name", newVal)
        data.value = await window.storage.getItem("config:" + newVal) as UserInfoData[]
    }
})

onUnmounted(async () => {
    if (last_config.value)
        window.storage.setItem("config:" + last_config.value, JSON.parse(JSON.stringify(data.value)))
})

</script>
<template>
    <el-container>
        <el-main class="inline-flex">
            <PE v-for="i in data" v-model:available="i.available" v-model:ischoosed="i.choosed"
                class="mb-[10px] min-w-[calc(20%-20px)] mx-[10px] select-none">{{ i.id }}</PE>
        </el-main>
        <el-aside width="200px" class="pl-[10px] select-none">
            <h1 class="text-3xl">选项</h1>
            <div>选择配置文件：
                <select v-model="last_config">
                    <option v-for="i in ConfigList" :value="i">{{ i == 'default' ? '默认' : i }}</option>
                </select>
            </div>
            <el-divider />
        </el-aside>
    </el-container>
</template>
<style scoped>
.el-aside {
    border-left: 1px solid gray;
}
</style>