<script lang="ts" setup>
import { uid } from 'uid';
import type { User } from '~/utils/types';
import { addUser, deleteUsers } from '~/utils/users';
import { delay } from '~/utils';

// TODO: Remove this
await delay(5000);

const userStore = useUser();

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

function fillRandomUsers(): User {
    return {
        uid: uid(9),
        userName: "95cce27532",
        fullName: uid(10),
        isCurrent: false,
        password: uid(12),
        avatar: null,
    };
}

</script>

<template>
    <div>

    </div>
</template>

<style scoped></style>