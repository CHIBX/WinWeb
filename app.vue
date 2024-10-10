<script setup lang="ts">

const showLogin = ref(false);
provide('showLogin', showLogin); 
</script>

<template>
  <div class="h-full overflow-hidden relative" @click="showLogin = true">
    <!-- Disable animation until user decides to go to login  -->
    <WindowsLoading :stopBlur="!showLogin">
      <template #default>
        <div class="h-full w-full relative z-[2]">
          <!-- <Transition name="fade-lift">
            <div v-if="!showLogin"
              class="absolute select-none z-10 flex-col gap-4 h-full w-full flex items-center justify-center">
              <LockScreen />
            </div>
          </Transition>
          <div class="h-full w-full absolute flex justify-center">
            <Transition name="lift" mode="in-out">
              <WindowsLogin v-if="showLogin" />
            </Transition>
          </div> -->

          <Transition name="fade-lift">
            <div v-if="!showLogin"
              class="absolute select-none z-10 flex-col gap-4 h-full w-full flex items-center justify-center">
              <LockScreen />
            </div>
            <div v-else class="h-full w-full absolute flex justify-center">
              <LazyWindowsLogin />
            </div>
          </Transition>
        </div>
      </template>
    </WindowsLoading>
    <!-- Portal for back button-->
    <div id="back-arrow" class="fixed top-10 left-10 z-[2]"></div>
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
  transition: all .5s ease;
}

.fade-lift-enter-from,
.fade-lift-leave-to {
  opacity: 0;
  /* transform: translateY(-400px); */
}

.lift-enter-active,
.lift-leave-active {
  transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
  transform: translateY(0px);
}

.lift-enter-from,
.lift-leave-to {
  opacity: 0;
  transform: translateY(400px);
  filter: blur(30px);

}

.segoe-bold {
  font-family: "Segoe UI Bold";
}

.segoe {
  font-family: "Segoe UI Regular";
}
</style>