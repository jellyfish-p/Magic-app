<template>
    <div ref="self" class="custom-shadow inline-flex items-center justify-begin rounded-full hover:shadow-lg">
        <div class="size-[40px] inline-flex items-center justify-center">
            <div ref="person" id="color-dot" class="size-[10px] rounded-full bg-gray-500"
                :class="available ? choosed ? 'bg-gray-500' : 'bg-green-500' : 'bg-red-500'"
                style="transition: background-color 0.3s ease-in-out;" />
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
.custom-shadow {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.custom-shadow:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
}
</style>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const self = ref<HTMLDivElement>()
const person = ref<HTMLDivElement>()
const available = defineModel<boolean>('available')
const choosed = defineModel<boolean>('ischoosed')
onMounted(() => {
    self.value?.addEventListener('click', () => {
        available.value = !available.value
    })
})
</script>