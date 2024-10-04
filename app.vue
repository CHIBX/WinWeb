<script setup lang="ts">
import { delay } from '~/utils';

const canShowLogin = ref(false);
onMounted(() => {
  delay(2000).then(() => canShowLogin.value = true);
})
</script>

<template>
  <div class="h-full overflow-hidden">
    <WindowsLoading>
      <template #default>
        <Transition name="fade">
          <div v-if="!canShowLogin"
            class="select-none flex-col gap-4 h-full w-full flex relative items-center justify-center">
            <img src="/icons/windows_11.svg" class="" width="250" height="250" alt="logo">
            <div class="mt-20 flex flex-col items-center gap-10">
              <DotLoader style="--uib-size: 50px;" />
              <div>
                <strong class="mt-10 text-2xl tracking-wide">Windows is getting everything ready...</strong>
              </div>
            </div>
          </div>
          <div class="h-full w-full" v-else>
            <Suspense>
              <LazyWindowsLogin />

              <template #fallback>
                <div class="h-full w-full flex items-center justify-center">
                  <DotLoader style="--uib-size: 100px;" />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </template>
    </WindowsLoading>

  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  height: 100%;
}

#__nuxt {
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>