<script lang="ts" setup>
import { ElMenu, ElMenuItem } from 'element-plus'
import { SwitchFilled, Cpu, EditPen } from '@element-plus/icons-vue'

</script>

<template>
    <el-menu default-active="1" :router="true" background-color="#ffffff88" mode="horizontal">
        <el-menu-item index="1" route="/random">
            <el-icon>
                <SwitchFilled />
            </el-icon>
            随机
        </el-menu-item>
        <el-menu-item index="2" route="/config">
            <el-icon>
                <EditPen />
            </el-icon>
            配置
        </el-menu-item>
        <el-menu-item index="3" route="/about">
            <el-icon>
                <Cpu />
            </el-icon>
            关于
        </el-menu-item>
    </el-menu>
</template>