<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { card } from '../middleware'
import { ElButton, ElNotification } from 'element-plus'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-notification.css'

const context = ref<string>("")

onMounted(() => {
    setTimeout(() => {
        context.value = "听说有小笨蛋在看这段话呢，让我看看是谁"
    }, 1500)
})

async function checkUpdate() {
    CheckingUpdate.value = true
    const data = await window.updater.CheckForUpdates()
    if(data.isUpdateAvailable){
        ElNotification({
            title: "发现新版本",
            message: "发现新版本，是否更新？",
            type: "success",
            duration: 0,
            position: "bottom-right",
            showClose: false,
            customClass: "notification",
        })
    }
    else{
        ElNotification({
            title: "已是最新版本",
            message: "已是最新版本，无需更新",
            type: "success",
            duration: 0,
            position: "bottom-right",
            showClose: false,
            customClass: "notification",
        })
    }
}

const CheckingUpdate = ref<boolean>(false)
</script>

<template>
    <card class="flex flex-nowrap flex-row">
        <p class="text-2xl">关于版本</p>
        <el-button class="ml-auto" @click="checkUpdate" :loading="CheckingUpdate">检查更新</el-button>
    </card>
    <card>
        Copyright © 2025-present jellyfish-p All rights reserved.
    </card>
    <card>
        由 jellyfish-p 开发 (以及维护？)
        <br />
        {{ context }}
    </card>
</template>

<style scoped></style>