<script lang="ts" setup>
const props = defineProps<{ disableAnim?: boolean }>();
const { x, y } = useMouse();
</script>

<template>
    <div class="fixed h-full w-full overflow-hidden blur-transition"
        :style="$attrs.style as {} || { filter: 'blur(10px)' }">
        <img src="/backgrounds/background_2.webp" class="object-cover h-full w-full" alt="background">
        <div v-if="!disableAnim" class="background-blur absolute rounded-full" :style="{
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
}

.blur-transition {
    transition: filter 0.5s ease-in-out;
}
</style>