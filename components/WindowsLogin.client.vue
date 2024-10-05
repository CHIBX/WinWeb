<script lang="ts" setup>
import { uid } from 'uid';
import type { User } from '~/utils/types';
import { addUser, deleteUsers } from '~/utils/users';
import { delay } from '~/utils';

// TODO: Remove this
// await delay(5000);

const userStore = useUser();
const password = ref("");

try {
    const isFirstTime = localStorage.getItem('first-time');
    if (isFirstTime !== 'false') {
        const { refreshUser } = await import('@/utils/users');
        await refreshUser();
        localStorage.setItem('first-time', 'false');
    }
    (await getUsers()).filter((user) => {

    });
} catch (error) {

}


</script>

<template>
    <div class="w-[600px] flex flex-col mt-40 gap-5 items-center">
        <ProfileIcon />
        <!-- <div></div> -->
        <input type="text" class="password mt-5" v-model="password" placeholder="Enter your password" />
    </div>
    <!-- <DotLoader style="--uib-size: 50px;" /> -->
</template>

<style scoped>
.password {
    font-size: 16px;
    position: relative;
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