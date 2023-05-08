<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
});

import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore();

const user: User = userStore.getMe!;

/**
 *
 * Datos del usuario
 *
 */

const avatar = user.avatar || '/img/user.svg';
const biography = user.description || 'Sin descripción';

let name: string | undefined =
    user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.first_name || user.last_name;
</script>

<template>
    <div
        class="flex flex-col h-full p-5 pt-2 space-y-4 lg:space-y-8 lg:p-10 lg:pt-4">
        <header
            class="flex flex-col bg-white border border-gray-200 shadow rounded-xl h-fit">
            <div class="flex flex-col p-5 xl:flex-row">
                <div class="flex mb-4 mr-auto space-x-8 xl:mb-0">
                    <img
                        :src="avatar"
                        alt="Avatar"
                        class="object-cover w-24 h-24 border border-gray-300 shadow-md xl:w-32 xl:h-32 rounded-xl" />
                    <div class="my-auto">
                        <h3 class="text-lg font-bold xl:text-xl">
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
                    <button
                        type="button"
                        data-hs-overlay="#user-modal-setttings"
                        class="w-full px-4 py-3 text-sm font-semibold bg-gray-100 border rounded-lg shadow-md xl:text-base hover:bg-black hover:text-white focus:bg-yellow-400">
                        <ClientOnly>
                            <Icon
                                name="fluent-mdl2:settings"
                                class="w-4 h-4 mr-2" />
                        </ClientOnly>
                        Ajustes
                    </button>
                </div>
            </div>
            <nav
                class="relative z-0 flex -mb-0.5 overflow-hidden border-t rounded-b-xl divide-x"
                aria-label="Tabs"
                role="tablist">
                <button
                    type="button"
                    class="btn-user-tab active"
                    id="tab-stats-btn"
                    data-hs-tab="#user-tab-stats"
                    aria-controls="tab-stats"
                    role="tab">
                    <ClientOnly>
                        <Icon
                            name="fluent-mdl2:presentation"
                            class="w-4 h-4 mr-2" />
                    </ClientOnly>
                    <span class="hidden lg:inline-flex"> Estadísticas </span>
                </button>
                <button
                    type="button"
                    class="btn-user-tab"
                    id="tab-friends-btn"
                    data-hs-tab="#user-tab-friends"
                    aria-controls="tab-friends"
                    role="tab">
                    <ClientOnly>
                        <Icon
                            name="fluent-mdl2:add-friend"
                            class="w-4 h-4 mr-2" />
                    </ClientOnly>
                    <span class="hidden lg:inline-flex"> Amigos </span>
                </button>
                <button
                    type="button"
                    class="btn-user-tab"
                    id="tab-messages-btn"
                    data-hs-tab="#user-tab-messages"
                    aria-controls="tab-messages"
                    role="tab">
                    <ClientOnly>
                        <Icon
                            name="fluent-mdl2:chat-invite-friend"
                            class="w-4 h-4 mr-2" />
                    </ClientOnly>
                    <span class="hidden lg:inline-flex"> Mensajes </span>
                </button>
            </nav>
        </header>
        <main
            class="grid h-full p-5 bg-white border border-gray-200 shadow-md rounded-xl">
            <UserTabStats />
            <UserTabFriends />
            <UserTabMessages />
        </main>
    </div>
    <UserModalSettings />
</template>

<style>
.btn-user-tab {
    @apply relative flex-1 min-w-0 px-4 py-4 overflow-hidden text-sm font-medium text-center text-gray-500 bg-white border-b-4 focus:bg-yellow-400 focus:text-black focus:hs-tab-active:border-b-yellow-800 hs-tab-active:border-b-primary hs-tab-active:text-gray-900 hs-tab-active:font-bold border-l-0 hover:text-gray-700 hover:bg-gray-100 focus:z-10;
}
</style>
