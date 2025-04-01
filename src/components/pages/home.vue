<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import { ElMessageBox, ElDatePicker } from 'element-plus'
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
    fetch('https://v1.hitokoto.cn')
        .then(Response => Response.json())
        .then(data => {
            OneSentence.value = data.hitokoto
            console.log(data)
        })
})

function GetTimeOut() {
    let time = Number(localStorage.getItem('timeout')) || Date.now()
    window.localStorage.setItem('timeout', time.toString())
    return time
}

async function SetTimeOut() {
    ElMessageBox({
        title: '设置倒计时',
        message: () => h(ElDatePicker, {
            type: 'datetime',
            placeholder: '选择日期时间',
            modelValue: timeout.value,
            'onUpdate:modelValue': (value) => {
                console.log(value)
                timeout.value = value
                window.storage.setItem('timeout', value.toString())
            }
        })
    })
}

const date = ref<string>(new Date().toLocaleDateString("en-US", DateTimeFormatConfig))
const timeout = ref<number>(GetTimeOut())

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
            <button @click="SetTimeOut">
                <card class="flex flex-row flex-nowrap">
                    <countdown :value="timeout" title="倒计时" />
                </card>
            </button>
        </div>
    </div>
</template>

<style scoped></style>
