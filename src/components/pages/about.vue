<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { card } from '../middleware'
import { ElButton, ElNotification, ElMessageBox, ElProgress } from 'element-plus'

const context = ref<string>("")

onMounted(() => {
    setTimeout(() => {
        context.value = "听说有小笨蛋在看这段话呢，让我看看是谁"
    }, 1500)
    setInterval(() => {
        if (sessionStorage.getItem("update") == "true")
            updating.value = true
    })
})

async function checkUpdate() {
    CheckingUpdate.value = true
    const data = await window.updater.CheckForUpdates()
    console.log(data)
    if (data.isUpdateAvailable) {
        ElMessageBox.confirm("检测到新版本，是否更新？", "提示", {
            confirmButtonText: "下载并安装",
            cancelButtonText: "取消",
            type: "info"
        }).then(() => {
            window.updater.DownloadUpdate()
            sessionStorage.setItem("update", "true")
        }
        )
    }
    else {
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
    CheckingUpdate.value = false
}

window.ipcRenderer.on('UpdateMsg', (_event, data) => {
    switch (data.state) {
        case 1:
            ElMessageBox.confirm("检测到新版本，是否更新？", "提示", {
                confirmButtonText: "下载并安装",
                cancelButtonText: "取消",
                type: "info"
            }).then(() => {
                window.updater.DownloadUpdate()
                sessionStorage.setItem("update", "true")
            }
            )
            break;
        case 3:
            progress.value = data.msg.percent.toFixed(1)
            break;
        case 4:
            ElMessageBox.alert("下载完成！即将重启以安装更新", "提示", {
                confirmButtonText: "确定",
                callback: () => {
                    window.updater.QuitAndInstall()
                }
            })
    }
})

const CheckingUpdate = ref<boolean>(false)
const updating = ref<boolean>(false)
const progress = ref<number>(0)
</script>

<template>
    <card class="flex flex-nowrap flex-row">
        <p class="text-2xl">关于版本</p>
        <el-button class="ml-auto" @click="checkUpdate" :loading="CheckingUpdate">检查更新</el-button>
    </card>
    <card v-if="updating">
        <el-progress :percentage="progress" :indeterminate="true" />
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