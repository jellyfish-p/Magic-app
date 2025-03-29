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

function checkUpdate() {
    ElNotification({
        title: '错误',
        message: '还没写呢 (QwQ)',
        type: 'error',
        position: 'bottom-right',
        showClose: false
    })
}

</script>

<template>
    <card class="flex flex-nowrap flex-row">
        <p class="text-2xl">关于版本</p>
        <el-button class="ml-auto" @click="checkUpdate">检查更新</el-button>
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