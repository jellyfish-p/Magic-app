<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const title = defineProps<{ title?: string }>();
const data = defineModel<number>("value", { required: true })

const time = ref<number>(data.value - new Date().getTime())

onMounted(() => {
    setInterval(async () => {
        time.value = data.value - new Date().getTime()
    }, 1000)
})

function formatTime(time: number) {
    let res: string = ""
    res += Math.floor(time / (60 * 60 * 1000)).toString().padStart(2, "0")
    res += ":"
    res += Math.floor(time / (60 * 1000) % 60).toString().padStart(2, "0")
    res += ":"
    res += Math.floor(time / 1000 % 60).toString().padStart(2, "0")
    return res
}
</script>

<template>
    <div>
        <div v-if="title.title">
            {{ title.title }}
        </div>
        <div v-if="time > 60 * 60 * 24 * 1000" class="flex flex-row gap-2 justify-center items-center">
            <p class="font-[Digital-Numbers] text-5xl">
                {{ Math.floor(time / (60 * 60 * 24 * 1000)).toString().padStart(4, "0") }}
            </p>
            <p class="text-5xl">天</p>
        </div>
        <div v-else>
            <p class="font-[Digital-Numbers] text-4xl">
                {{ formatTime(time) }}
            </p>
        </div>
    </div>
</template>

<style scoped></style>