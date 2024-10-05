<script lang="ts" setup>
const props = withDefaults(defineProps<{
    src?: string,
    height?: string,
    width?: string
}>(), { src: '/icons/blank-profile.webp', height: '250', width: '250' });
</script>

<template>
    <div :style="{ height: `${height}px`, width: `${width}px` }" class="rounded-full overflow-hidden relative z-1">
        <img :src="src" class="w-full h-full object-cover" alt="Profile picture">
    </div>
</template>

<style scoped></style>