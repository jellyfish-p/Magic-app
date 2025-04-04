<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import { card } from '../middleware'
import { random } from '../../utils/storage'


const user = ref<{ id: number, name: string }>({ id: 0, name: '' })

async function randomUser() {
    const data = (await random.OriginUserInfo()).name
    user.value = data[Math.floor(Math.random() * data.length)]
}

</script>

<template>
    <card class="h-full">
        <p class="flex justify-center items-center">随机抽取</p>
        <div
            class="mt-4 ml-auto mr-auto w-[50%] h-[50%] border-2 rounded-2xl flex flex-row justify-center items-center gap-4">
            <p v-if="user.id" class="text-5xl">{{ user.id }}</p>
            <p v-if="user.name" class="text-5xl">{{ user.name }}</p>
        </div>
        <div class="flex flex-row justify-center items-center gap-5 mt-20">
            <el-button size="large" @click="randomUser">抽取</el-button>
        </div>
    </card>
</template>

<style scoped></style>