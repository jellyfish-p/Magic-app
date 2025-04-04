<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { House, SwitchFilled, Cpu, Setting } from '@element-plus/icons-vue'

</script>

<template>
    <el-menu default-active="1" class="min-h-full backdrop-blur-md" :router="true" background-color="#ffffff88">
        <el-menu-item index="1" route="/">
            <el-icon>
                <house />
            </el-icon>
            首页
        </el-menu-item>
        <el-sub-menu class="backdrop-blur-md" index="3" route="/random">
            <template #title>
                <el-icon>
                    <switch-filled />
                </el-icon>
                抽取
            </template>
            <el-menu-item index="3-1" route="/random/fake">
                不重复随机抽取
            </el-menu-item>
            <el-menu-item index="3-2" route="/random/real">
                可重复随机抽取
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4" route="/settings">
            <el-icon>
                <Setting />
            </el-icon>
            设置
        </el-menu-item>
        <el-menu-item index="5" route="/about">
            <el-icon>
                <cpu />
            </el-icon>
            关于
        </el-menu-item>
    </el-menu>
</template>

<style scoped></style>