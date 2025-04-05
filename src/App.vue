<script setup lang="ts">
import { onMounted } from 'vue'
import { ElContainer, ElMain, ElAside } from 'element-plus'
import defaultBG from './assets/backgrounds/bg1.avif'
import HEADER from './components/header/header.vue'

onMounted(async () => {
    addEventListener('click', () => {

    })
    const element = document.getElementById('containerbg') as HTMLDivElement
    const RandomBG = await window.storage.getItem('IsRandomBGon')
    console.log(RandomBG)
    if (RandomBG === "true") {
        let url = await window.storage.getItem('RandomBGUrl')
        if (url === "") url = "https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302"
        element.style.backgroundImage = `url(${url})`
    }
    else {
        element.style.backgroundImage = `url(${defaultBG})`
    }
})

</script>

<template>
    <el-container id="containerbg" class="min-h-screen bg-cover">
        <el-aside width="180px">
            <HEADER />
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<style scoped>
.el-main {
    overflow: hidden;
}
</style>
