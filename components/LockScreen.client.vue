<script lang="ts" setup>
import { clockRef as clock, type Clock } from '~/utils';
const func = (c: Clock) => { clock.value = c; };

clock.value.suscribe(func);

onUnmounted(() => clock.value.unsuscribe(func));
</script>

<template>
    <div class="h-full text-white flex flex-col gap-2.5 items-center pt-10 segoe">
        <div class="text-9xl font-bold tracking-widest">{{ `${clock.hours}:${clock.minutes}` }}</div>
        <div class="text-2xl">{{ `${clock.dayFull}, ${clock.monthFull} ${clock.date}` }}</div>
    </div>
</template>

<style scoped></style>