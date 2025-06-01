<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'
const update = async () => {
    CheckingUpdate.value = true
    const data = await window.updater.CheckForUpdates()
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
    由 Jellyfish-p 开发
    <br/>
    <el-button @click="update" v-loading="CheckingUpdate">检查更新</el-button>
    <el-progress :percentage="progress" v-if="updating" :indeterminate="true" />
</template>