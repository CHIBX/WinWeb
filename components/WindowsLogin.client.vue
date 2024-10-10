<script lang="ts" setup>

import { Icon } from "@iconify/vue";
import type { User } from '~/utils/types';
import { addUser, deleteUsers } from '~/utils/users';
import { delay } from '~/utils';

// TODO: Remove this
// await delay(5000);

const userStore = useUser();
const password = ref("");
const totalUsers = ref<User[]>([])
const showLogin = inject<Ref<boolean>>('showLogin')!;
const debouncedBack = useDebounceFn(() => {
    showLogin.value = false;
}, 200);

try {
    let users: User[] = [];
    const isFirstTime = localStorage.getItem('first-time');
    if (isFirstTime !== 'false') {
        const { refreshUser } = await import('@/utils/users');
        await refreshUser();
        localStorage.setItem('first-time', 'false');
    }
    else {
        users = await getUsers();
        userStore.$patch({ currentUser: users.find((user) => user.isCurrent == true) });
    }
    totalUsers.value = users;
    console.log("user:", userStore.currentUser!.userName);
} catch (error) {
    console.error(error);
}


</script>

<template>
    <div class="w-[600px] flex flex-col relative mt-40 gap-5 items-center">
        <Teleport to="#back-arrow">
            <PrimeButton class="px-3 py-2 rounded" @click="debouncedBack">
                <Icon color="white" icon="material-symbols:arrow-left-alt-rounded" width="40" height="40" />
            </PrimeButton>
        </Teleport>
        <ProfileIcon height="200" width="200" />
        <span class="segoe text-white text-3xl">{{ userStore.currentUser!.fullName }}</span>
        <!-- <div></div> -->
        <!-- <input type="text" class="password mt-5" v-model="password" placeholder="Enter your password" /> -->
        <PrimePassword v-model="password" :feedback=false placeholder="Enter your password" toggleMask
            class="password mt-5" />
    </div>
    <!-- <DotLoader style="--uib-size: 50px;" /> -->
</template>

<style scoped>
.password {
    font-size: 16px;
    /* position: relative; */
    font-family: 'Segoe UI Regular';
    background-color: white;
    color: black;
    width: 400px;
    padding: 10px;
    box-shadow: 0 0 5px 2px rgb(73, 73, 73);
    border: none;
    outline: none;
}

input.password::before {
    content: "";
    position: absolute;
    bottom: 2px;
    width: 0;
    height: 10px;
    background-color: #00ff22;
    left: 0;
    transition: all 0.5s ease;
}

input.password:focus::before {
    width: 100%;
}
</style>