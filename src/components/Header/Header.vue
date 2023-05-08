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
    }, 1500);
};

/**
 * User data
 */

const avatar = user?.avatar || '/img/user.svg';
const username = user?.username || undefined;

let name: string | undefined =
    user?.first_name && user?.last_name
        ? `${user.first_name} ${user.last_name}`
        : user?.first_name || user?.last_name;

/**
 *
 * Notifications
 *
 */

let notifications: Notification[] = [];

var areNotifications = ref(false);

if (notifications.length > 0) areNotifications = ref(true);
else areNotifications = ref(false);

let count_fr_noti: number = 0,
    count_pm_noti: number = 0,
    count_sm_noti: number = 0;

notifications.forEach((notification) => {
    switch (notification.type) {
        case 'friend_request':
            count_fr_noti++;
            break;
        case 'private_message':
            count_pm_noti++;
            break;
        case 'system_message':
            count_sm_noti++;
            break;
    }
});
</script>

<template>
    <header class="z-10 py-4">
        <div
            class="container flex items-center justify-between h-full px-6 mx-auto">
            <button
                type="button"
                data-hs-overlay="#sidebar"
                aria-controls="sidebar"
                aria-label="Abrir navegación lateral"
                class="p-2 mr-5 -ml-1 text-gray-300 border-4 border-gray-300 rounded-md shadow-md bg-slate-600 lg:hidden focus:bg-yellow-800 focus:text-yellow-500 focus:border-yellow-500">
                <ClientOnly>
                    <Icon name="ri:menu-fill" class="w-6 h-6 -mt-1" />
                </ClientOnly>
            </button>

            <div class="flex justify-center flex-1 lg:mr-32"></div>

            <ul
                class="inline-flex items-center flex-shrink-0 space-x-2 md:space-x-4">
                <li class="relative inline-flex hs-dropdown">
                    <button
                        id="dropdown-notifications"
                        class="relative align-middle bg-gray-300 rounded-full shadow-md border-gray-400/20 text-slate-600 hs-dropdown-toggle focus:bg-yellow-500 focus:text-yellow-800 hover:text-slate-600/80"
                        aria-label="Abrir notificaciones"
                        aria-haspopup="true">
                        <ClientOnly>
                            <Icon
                                name="material-symbols:circle-notifications"
                                class="w-11 h-11" />
                        </ClientOnly>
                        <span
                            v-if="areNotifications"
                            aria-hidden="true"
                            class="ring-2 ring-gray-50 absolute inline-block w-2.5 h-2.5 transform translate-x-1 -translate-y-1 bg-red-600 rounded-full right-2 top-1.5"></span>
                    </button>

                    <ul
                        aria-labelledby="dropdown-notifications"
                        class="p-2 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden absolute right-0 w-56 space-y-2 text-gray-600 bg-white border border-gray-200 rounded-md shadow-md">
                        <p
                            class="p-2 mb-2 -m-2 font-semibold text-center bg-gray-100">
                            Notificaciones
                        </p>
                        <li class="flex">
                            <NuxtLink class="btn-dropdown-notifications" to="/">
                                <span>Solicitud amistad</span>
                                <span
                                    class="btn-dropdown-notifications-count"
                                    v-if="count_fr_noti > 0">
                                    {{ count_fr_noti }}
                                </span>
                            </NuxtLink>
                        </li>
                        <li class="flex">
                            <NuxtLink class="btn-dropdown-notifications" to="/">
                                <span>Mensaje privado</span>
                                <span
                                    class="btn-dropdown-notifications-count"
                                    v-if="count_pm_noti > 0">
                                    {{ count_pm_noti }}
                                </span>
                            </NuxtLink>
                        </li>
                        <li class="flex">
                            <NuxtLink class="btn-dropdown-notifications" to="/">
                                <span>Sistema</span>
                                <span
                                    class="btn-dropdown-notifications-count"
                                    v-if="count_sm_noti > 0">
                                    {{ count_sm_noti }}
                                </span>
                            </NuxtLink>
                        </li>
                    </ul>
                </li>

                <li class="relative inline-flex hs-dropdown">
                    <button
                        id="dropdown-avatar"
                        class="shadow-md flex p-1.5 pr-6 space-x-3 align-middle bg-gray-300/80 rounded-full hs-dropdown-toggle focus:saturate-0 border border-gray-400/20"
                        aria-label="Abrir opciones cuenta"
                        aria-haspopup="true">
                        <img
                            class="bg-slate-600 object-cover w-[3.2rem] h-[3.2rem] my-auto rounded-full"
                            :src="avatar"
                            alt="Avatar"
                            aria-hidden="true" />
                        <div
                            v-if="name && username"
                            class="flex flex-col my-auto -space-y-0.5 text-left">
                            <span
                                class="pt-1 text-base font-semibold text-gray-600">
                                {{ name }}
                            </span>
                            <span class="pb-1 text-sm font-light text-gray-600">
                                @{{ username }}
                            </span>
                        </div>
                        <span
                            v-else
                            class="my-auto text-lg font-bold text-left text-gray-600">
                            Invitado
                        </span>
                    </button>

                    <ul
                        aria-labelledby="dropdown-avatar"
                        class="p-2 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden absolute right-0 w-56 space-y-2 text-gray-600 bg-white border border-gray-200 rounded-md shadow-md">
                        <p
                            class="p-2 mb-2 -m-2 font-semibold text-center bg-gray-100">
                            Usuario
                        </p>
                        <li class="flex">
                            <NuxtLink
                                to="/users/me"
                                class="btn-dropdown-avatar">
                                <Icon
                                    name="icon-park-outline:user"
                                    class="w-4 h-4 mr-3" />
                                <span>Perfil</span>
                            </NuxtLink>
                        </li>
                        <li class="flex">
                            <NuxtLink
                                to="/users/me"
                                class="btn-dropdown-avatar">
                                <Icon
                                    name="icon-park-outline:config"
                                    class="w-4 h-4 mr-3" />
                                <span>Ajustes</span>
                            </NuxtLink>
                        </li>
                        <li class="flex">
                            <button
                                v-if="user"
                                @click="onLogout()"
                                type="button"
                                class="btn-dropdown-avatar">
                                <Icon
                                    name="icon-park-outline:logout"
                                    class="w-4 h-4 mr-3" />
                                <span>Cerrar sesión</span>
                            </button>
                            <NuxtLink
                                v-else
                                to="/users/me/login"
                                class="btn-dropdown-avatar">
                                <Icon
                                    name="icon-park-outline:login"
                                    class="w-4 h-4 mr-3" />
                                <span>Iniciar sesión</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>

<style>
.btn-dropdown-notifications {
    @apply inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800;
}

.btn-dropdown-notifications:focus {
    @apply bg-yellow-500 text-black;
}

.btn-dropdown-notifications-count {
    @apply inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full;
}

.btn-dropdown-avatar {
    @apply inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800;
}

.btn-dropdown-avatar:focus {
    @apply bg-yellow-500 text-black;
}

#dropdown-notifications:focus > span {
    @apply bg-yellow-800;
}
</style>
