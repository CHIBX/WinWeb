<script lang="ts" setup>
const props = defineProps<{ stopBlur?: boolean }>();
</script>

<template>
    <div class="fixed h-full w-full z-[1] overflow-hidden blur-transition"
        :style="!stopBlur ? { backdropFilter: 'blur(20px)' } : null"
        style="transition: 0.5s cubic-bezier(0.55, 0, 0.1, 1);">
    </div>
    <img src="/backgrounds/windows_11_logo.webp" class="object-cover fixed h-full w-full" alt="background">
    <slot />
</template>

<style scoped>
.blur-transition {
    transition: backdrop-filter 0.3s ease-in-out;
}
</style>