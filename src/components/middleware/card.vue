<template>
    <div class="bg-white/70 backdrop-blur-sm m-3 rounded-xl
        hover:shadow-2xl transition-all duration-300 ease-in-out onloading">
        <div class="p-5 w-full" v-bind="$attrs">
            <slot />
        </div>
    </div>
</template>
<style scoped>
.onloading {
    transform: scale(1) translateY(50px);
    opacity: 0;
}
</style>
<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
    setTimeout(() => {
        const card = document.getElementsByClassName("onloading")
        for (let i = 0; i < card.length; ++i) {
            const row = card[i]!
            row.classList.remove("onloading")
        }
    }, 50)
})
</script>