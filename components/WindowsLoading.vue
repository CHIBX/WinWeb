<script lang="ts" setup>
const { x, y } = useMouse();
</script>

<template>
    <div class="fixed h-full w-full overflow-hidden" style="filter: blur(10px);">
        <img src="/backgrounds/background_2.webp" class="object-cover h-full w-full" alt="background">
        <div class="background-blur absolute rounded-full" :style="{
            left: `${x - 150}px`,
            top: `${y - 150}px`,
        }"></div>
    </div>
    <slot />
</template>

<style scoped>
.background-blur {
    width: 300px;
    height: 300px;
    background-image: linear-gradient(to bottom, rgb(171, 249, 255), rgb(127, 193, 255));
    filter: blur(100px);
    transform: translate3d(0, 0, 0);
    transition: transform 0.1s ease-out;
}
</style>