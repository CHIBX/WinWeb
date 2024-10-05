<script setup lang="ts">

const canShowLogin = ref(false);

</script>

<template>
  <div class="h-full overflow-hidden" @click="canShowLogin = true">
    <!-- Disable animation until user decides to go to login  -->
    <WindowsLoading :disable-anim="!canShowLogin" :style="canShowLogin && null">
      <template #default>
        <Transition name="fade-lift">
          <div v-if="!canShowLogin"
            class="select-none flex-col gap-4 h-full w-full flex relative items-center justify-center">
            <LockScreen />
          </div>
          <div class="h-full w-full flex justify-center" v-else>
            <WindowsLogin />
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

.fade-lift-enter-active,
.fade-lift-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-lift-enter-from,
.fade-lift-leave-to {
  opacity: 0;
  transform: translateY(-400px);
}
</style>