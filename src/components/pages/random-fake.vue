<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { onMounted, ref } from 'vue'
import { card } from '../middleware'
import { random } from '../../utils/storage'

const countuser = ref<number>(0)
const countorigin = ref<number>(0)

onMounted(async () => {
    countuser.value = await random.GetUserLength()
    countorigin.value = await random.GetOriginUserLength()
})

const user = ref<{ id: number, name: string }>({ id: 0, name: '' })

async function randomUser() {
    user.value = (await random.getRandomUser()).at(0) as { id: number, name: string }
    countuser.value = await random.GetUserLength()
}

async function reset() {
    random.ResetUser()
    countuser.value = await random.GetUserLength()
    countorigin.value = await random.GetOriginUserLength()
    user.value = { id: 0, name: '' }
}

</script>

<template>
    <card class="h-full">
        <p class="flex justify-center items-center">随机抽取</p>
        <p class="flex justify-end items-center">{{ countuser }} / {{ countorigin }}</p>
        <div
            class="ml-auto mr-auto w-[50%] h-[50%] border-2 rounded-2xl flex flex-row justify-center items-center gap-4">
            <p v-if="user.id" class="text-5xl">{{ user.id }}</p>
            <p v-if="user.name" class="text-5xl">{{ user.name }}</p>
        </div>
        <div class="flex flex-row justify-center items-center gap-5 mt-20">
            <el-button size="large" @click="randomUser">抽取</el-button>
            <el-button size="large" @click="reset">清空</el-button>
        </div>
    </card>
</template>

<style scoped></style>