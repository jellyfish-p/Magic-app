<script lang="ts" setup>
import { ref } from 'vue'
import { card, UserInfoView } from '../middleware'
import { ElMessage, ElButton } from 'element-plus'
import { OriginUserInfo } from '../../utils/storage/random'


window.ipcRenderer.on('getInfoCallback', (args) => {
    console.log(args)
})

function valid(data: { name: { id: number, name: string }[] }) {
    if (typeof data !== 'object') return false
    if (!('name' in data)) return false
    if (typeof data.name !== 'object') return false
    data.name.forEach(item => {
        if (!('id' in item)) return false
        if (!('name' in item)) return false
        if (typeof item.id !== 'number') return false
        if (typeof item.name !== 'string') return false
    })
    return true
}


async function test() {
    editorVisible.value = true
}
async function ExportConfig() {
    let element = document.createElement('a')
    element.download = 'config.json'
    element.style.display = 'none'
    let data = JSON.stringify(OriginUserInfo())
    let blob = new Blob([data], { type: 'text/json' })
    element.href = URL.createObjectURL(blob)
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

async function ImportConfig() {
    let element = document.createElement('input')
    element.type = 'file'
    element.style.display = 'none'
    element.accept = '.json'
    element.addEventListener('change', async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        console.log(file)
        if (file) {
            const reader = new FileReader()
            reader.onload = async (event) => {
                const text = event.target?.result
                console.log(text)
                if (typeof text === 'string') {
                    let data = JSON.parse(text)
                    if (valid(data)) {
                        (await import('../../utils/storage/random')).SetInfo(data)
                        ElMessage.success('导入成功')
                    } else {
                        ElMessage.error('配置文件损坏')
                    }
                } else {
                    ElMessage.error('文件格式错误')
                }
            }
            reader.readAsText(file)
        } else {
            ElMessage.error('请选择文件')
        }
    })
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

const editorVisible = ref<boolean>(false)

</script>

<template>
    <card class="flex flex-row flex-nowarp justify-center items-center">
        <p>数据相关</p>
        <el-button class="ml-auto" @click="test">修改抽取数据集</el-button>
        <el-button type="primary" @click="ExportConfig">导出数据</el-button>
        <el-button type="primary" @click="ImportConfig">导入数据</el-button>
    </card>
    <user-info-view v-model="editorVisible" :editable="true" />
</template>

<style scoped></style>