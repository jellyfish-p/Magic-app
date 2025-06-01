<script lang="ts" setup>
const update = () => { window.updater.CheckForUpdates() }
window.ipcRenderer.on('UpdateMsg', (_event, msg) => {
    if(msg === 0) {
        
    }
})
</script>
<template>
    由 Jellyfish-p 开发
    <el-button @click="update">检查更新</el-button>
</template>