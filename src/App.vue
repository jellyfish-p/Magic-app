<script setup lang="ts">
import HEADER from './components/header/header.vue'

</script>

<template>
    <el-container class="min-h-screen">
        <el-header>
            <HEADER />
        </el-header>
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
