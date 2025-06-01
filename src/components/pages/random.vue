<script lang="ts" setup>
import PE from '../person-element.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { UserInfoData } from '../../types/global';

const ConfigList = ref<string[]>()
const data = ref<UserInfoData[]>()
const last_config = ref<string>()
const lucky_man = ref<string>()

interface Config {
    fake_random: boolean
}
let config_settings: Config

const fake_random = ref<boolean>(false)

function setConfig() {
    fake_random.value = config_settings.fake_random
}

onMounted(async () => {
    ConfigList.value = await window.storage.getItem("config-list") as string[] || []
    if (ConfigList.value.length <= 1) {
        window.storage.setItem("config-list", ['default'])
        ConfigList.value = ['default']
    }
    last_config.value = localStorage.getItem("last-config_name") || 'default'
    data.value = await window.storage.getItem("config:" + last_config.value) as UserInfoData[]
    config_settings = await window.storage.getItem("config-settings:" + last_config.value) as Config || { fake_random: false }
    setConfig()
})

watch(last_config, async (newVal, oldVal) => {
    console.log("from:", oldVal, "to:", newVal)
    if (newVal) {
        if (oldVal)
            window.storage.setItem("config:" + oldVal, JSON.parse(JSON.stringify(data.value)))
        localStorage.setItem("last-config_name", newVal)
        data.value = await window.storage.getItem("config:" + newVal) as UserInfoData[]
        lucky_man.value = undefined
    }
})

onUnmounted(async () => {
    if (last_config.value)
        window.storage.setItem("config:" + last_config.value, JSON.parse(JSON.stringify(data.value)))
    config_settings.fake_random = fake_random.value
    window.storage.setItem("config-settings:" + last_config.value, JSON.parse(JSON.stringify(config_settings)))
})

function random() {
    console.log("random")
    if (data.value?.length) {
        let list: UserInfoData[] = []
        if (!fake_random.value)
            list = data.value.filter(i => i.available && !i.choosed) as UserInfoData[]
        else
            list = data.value.filter(i => i.available) as UserInfoData[]
        let index = Math.floor(Math.random() * list.length)
        let user = list[index]
        if (!fake_random.value)
            data.value[data.value.findIndex(i => i.id === user.id)].choosed = true
        lucky_man.value = `${user.id} ${user.username ? user.username : user.real_name}`
        if (list.length === 1) {
            data.value.forEach(i => i.choosed = false)
        }
    }
}
</script>
<template>
    <el-container>
        <el-main class="inline-flex">
            <PE v-for="i in data" v-model:available="i.available" v-model:ischoosed="i.choosed"
                class="mb-[10px] min-w-[calc(20%-20px)] mx-[10px] select-none">{{ i.id }} {{
                    i.username ? i.username : i.real_name }}</PE>
        </el-main>
        <el-aside width="200px" class="pl-[10px] select-none">
            <h1 class="text-3xl">选项</h1>
            <div>
                <p>选择配置文件：</p>
                <el-select v-model="last_config">
                    <el-option v-for="i in ConfigList" :value="i">{{ i == 'default' ? '默认' : i }}</el-option>
                </el-select>
            </div>
            <el-divider>被抽的</el-divider>
            <div class="w-[calc(100%-20px)] h-[40px] mx-auto border-black border-2 border-solid rounded-full content-center justify-center"
                @click="random">
                <p class="text-center">
                    {{ lucky_man || "点击抽取" }}
                </p>
            </div>
            <el-divider>设置</el-divider>
            <el-checkbox v-model="fake_random">不判重复</el-checkbox>
        </el-aside>
    </el-container>
</template>
<style scoped>
.el-aside {
    border-left: 1px solid gray;
}
</style>