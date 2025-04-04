<script setup lang="ts">
import { onMounted } from 'vue'
import { ElContainer, ElMain, ElAside } from 'element-plus'
import 'element-plus/theme-chalk/el-container.css'
import 'element-plus/theme-chalk/el-main.css'
import 'element-plus/theme-chalk/el-footer.css'
import 'element-plus/theme-chalk/el-aside.css'
import HEADER from './components/header/header.vue'

onMounted(() => {
    addEventListener('click', () => {

    })
})

</script>

<template>
    <el-container class="min-h-screen bg-[url('./assets/backgrounds/bg1.avif')] bg-cover">
        <el-container class="height-auto">
            <el-aside width="180px">
                <HEADER />
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-main {
    overflow: hidden;
}
</style>
