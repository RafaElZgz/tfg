<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

const route = useRoute();
const userStore = useUserStore();

const user: User | undefined = userStore.getUsers.find(
    (user) => user.username === route.path.split('/').pop()
);

/**
 * Comprobamos si el usuario existe
 */

if (!user) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Usuario no encontrado',
    });
}

/**
 *
 * Datos del usuario
 *
 */

const avatar = user.avatar || '/img/user.svg';
const biography = user.description || 'Sin descripción';

let name: string | undefined =
    user?.first_name && user?.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.first_name || user.last_name;
</script>

<template>
    <div
        class="flex flex-col h-full p-5 pt-2 space-y-4 lg:space-y-8 lg:p-10 lg:pt-4">
        <header
            class="flex flex-col bg-white border border-gray-200 shadow-md rounded-xl h-fit">
            <div class="flex flex-col p-5 xl:flex-row">
                <div class="flex mb-4 mr-auto space-x-8 xl:mb-0">
                    <img
                        :src="avatar"
                        alt="Avatar"
                        class="object-cover w-24 h-24 border border-gray-300 shadow-md xl:w-32 xl:h-32 rounded-xl" />
                    <div class="my-auto">
                        <h3 v-if="name" class="text-lg font-bold xl:text-xl">
                            {{ name }}
                        </h3>
                        <h4 class="font-medium text-gray-600 xl:text-lg">
                            @{{ user.username }}
                        </h4>
                    </div>
                </div>
                <div
                    class="flex flex-col float-right my-auto space-y-4 xl:space-y-0 xl:space-x-6 xl:flex-row xl:mr-4">
                    <p
                        class="px-4 py-4 text-sm truncate border rounded-lg shadow-sm lg:px-8 lg:min-w-fit">
                        {{ biography }}
                    </p>
                </div>
            </div>
        </header>
    </div>
</template>
