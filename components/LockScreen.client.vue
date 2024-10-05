<script lang="ts" setup>
const date = useDateFormat(new Date)
</script>

<template>
    <div class="h-full text-5xl font-bold tracking-wide flex flex-col pt-40 segoe-bold">
        {{ date }}
    </div>
</template>

<style scoped>
.segoe-bold {
    font-family: "Segoe UI";
}
</style>