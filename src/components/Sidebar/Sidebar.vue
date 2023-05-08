<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

const { $directus, $toast } = useNuxtApp();

const userStore = useUserStore();
const user = userStore.getMe;

/**
 * Logout
 */

const onLogout = async () => {
    await $directus.auth.logout();
    await userStore.setMe(null);
    $toast.success('¡Sesión cerrada!');
    setTimeout(() => {
        location.reload();
    }, 1000);
};

/**
 *
 * Sidebar links
 *
 */

interface SidebarLink {
    name: String;
    icon: String;
    href: String;
}

const sidebar_links: SidebarLink[] = [
    {
        name: 'Inicio',
        icon: 'fluent-mdl2:home',
        href: '/',
    },
    {
        name: 'Juegos',
        icon: 'fluent-mdl2:game',
        href: '/games',
    },
    {
        name: 'Perfil',
        icon: 'fluent-mdl2:account-management',
        href: '/users/me',
    },
];
</script>

<template>
    <aside
        id="sidebar"
        class="border-r border-gray-200 hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 lg:relative z-[60] lg:z-0 w-60 bg-white overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0">
        <div class="text-gray-500">
            <NuxtLink
                class="flex h-16 px-4 py-2 text-xl font-bold text-gray-800 focus:bg-yellow-500"
                href="/">
                <span class="m-auto">GamesCore</span>
            </NuxtLink>
            <ul class="mt-6">
                <SidebarLink
                    v-for="link in sidebar_links"
                    :name="link.name"
                    :icon="link.icon"
                    :href="link.href" />
            </ul>
            <div class="px-6 my-6">
                <button
                    v-if="user"
                    @click="onLogout()"
                    class="btn-sidebar-extra">
                    Cerrar sesión
                </button>
                <NuxtLink v-else to="/users/me/login" class="btn-sidebar-extra">
                    Iniciar sesión
                </NuxtLink>
            </div>
        </div>
    </aside>
</template>

<style>
.btn-sidebar-extra {
    @apply flex items-center justify-between px-8 py-2 mx-auto text-sm font-semibold leading-5 text-white transition-colors duration-150 border border-transparent rounded-lg bg-primary w-fit active:bg-yellow-500 hover:bg-primary/80 focus:bg-yellow-500 focus:text-black;
}
</style>
