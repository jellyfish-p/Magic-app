<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'element-plus/theme-chalk/el-icon.css'
import { card, countdown } from '../middleware'

const DateTimeFormatConfig: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
    second: 'numeric',
}

onMounted(() => {
    setInterval(() => {
        date.value = new Date().toLocaleDateString("en-US", DateTimeFormatConfig)
    }, 1000)
    fetch('https://v1.hitokoto.cn?c=d&c=k')
        .then(Response => Response.json())
        .then(data => {
            OneSentence.value = data.hitokoto
            console.log(data)
        })
})

const date = ref<string>(new Date().toLocaleDateString("en-US", DateTimeFormatConfig))
const timeout = ref(Date.now() + 1000 * 60 * 60 * 25)

const OneSentence = ref<string>('Waiting network...')
</script>

<template>
    <div class="flex">
        <div class="flex flex-col w-1/2">
            <card>
                <p class="font-[Digital-Numbers]">{{ date }}</p>
            </card>
            <card>
                <p>{{ OneSentence }}</p>
            </card>
        </div>
        <div class="flex flex-col w-1/2">
            <card class="flex flex-row flex-nowrap">
                <countdown :value="timeout" title="倒计时" />
            </card>
        </div>
    </div>
</template>

<style scoped></style>
