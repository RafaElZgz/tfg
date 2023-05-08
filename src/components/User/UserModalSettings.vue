<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore();

const user = userStore.getMe!;

/**
 *
 * Datos del usuario
 *
 */

const avatar = user.avatar || '/img/user.svg';
const biography = user.description || '';

/**
 * Formulario
 */

const form = {
    avatar: ref(null) as Ref<File | null>,
};

/**
 * Avatar
 */

var avatarUploaded = ref(false);
let newAvatarName = ref(null) as Ref<string | null>;

const onAvatarUpload = (event: Event) => {
    if (
        !(event.target instanceof HTMLInputElement) ||
        event.target.type !== 'file' ||
        !event.target.files
    ) {
        return;
    }

    let file = event.target.files[0];
    event.target.files = null;

    form.avatar.value = file;
    newAvatarName.value = file.name;

    avatarUploaded.value = true;
};

/**
 * Cancelar edición de perfil
 */

function cancelEditProfile() {
    form.avatar.value = null;
    avatarUploaded.value = false;
}
</script>

<template>
    <div
        id="user-modal-setttings"
        class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[70] overflow-x-hidden overflow-y-auto">
        <div
            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-4xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div
                class="flex flex-col w-full p-4 bg-white border shadow-sm rounded-xl sm:p-8">
                <!-- Content -->

                <div class="flex w-full pb-4 mb-6 border-b">
                    <div class="mr-auto">
                        <h2 class="text-xl font-bold text-gray-800">Perfil</h2>
                        <p class="text-sm text-gray-600">
                            Administre su nombre, contraseña y configuración de
                            cuenta.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm text-gray-500 transition-all border rounded-md shadow-md hs-dropdown-toggle hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
                        data-hs-overlay="#user-modal-setttings">
                        <span class="sr-only">Close</span>
                        <ClientOnly>
                            <Icon
                                class="w-5 h-5"
                                name="material-symbols:close" />
                        </ClientOnly>
                    </button>
                </div>

                <form @submit.prevent="">
                    <!-- Grid -->
                    <div class="grid grid-cols-12 gap-2 sm:gap-6">
                        <div class="col-span-12 lg:col-span-3">
                            <label
                                class="inline-block text-sm text-gray-800 mt-2.5">
                                Foto de perfil
                            </label>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-9">
                            <div class="flex items-center gap-5">
                                <img
                                    class="inline-block w-16 h-16 rounded-full ring-2 ring-white"
                                    :src="avatar"
                                    alt="Image Description" />
                                <div
                                    class="flex flex-col lg:flex-row gap-x-2 gap-y-1.5">
                                    <label
                                        aria-label="Upload avatar"
                                        for="avatar"
                                        type="button"
                                        class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary">
                                        <ClientOnly>
                                            <Icon
                                                class="w-4 h-4"
                                                name="uil:image-upload" />
                                        </ClientOnly>
                                        Subir foto
                                    </label>
                                    <input
                                        id="avatar"
                                        max="1"
                                        @change="onAvatarUpload($event)"
                                        type="file"
                                        accept="image/*"
                                        class="hidden" />
                                    <div
                                        class="my-auto space-x-1.5 flex"
                                        v-if="avatarUploaded">
                                        <ClientOnly>
                                            <Icon
                                                class="my-auto text-green-600 w-7 h-7"
                                                name="ph:check-circle-bold" />
                                        </ClientOnly>
                                        <span
                                            class="inline-block max-w-[10rem] text-xs text-green-800 truncate my-auto mt-[0.3rem]">
                                            {{ newAvatarName }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 lg:col-span-3">
                            <label
                                for="af-account-full-name"
                                class="inline-block text-sm text-gray-800 mt-2.5">
                                Nombre completo
                            </label>
                            <div class="inline-block hs-tooltip">
                                <button
                                    type="button"
                                    class="ml-1 hs-tooltip-toggle">
                                    <svg
                                        class="inline-block w-3 h-3 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path
                                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                </button>
                                <span
                                    class="absolute z-10 invisible inline-block w-40 px-2 py-1 text-xs font-medium text-center text-white transition-opacity bg-gray-900 rounded-md shadow-sm opacity-0 hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible"
                                    role="tooltip">
                                    No se muestra al público
                                </span>
                            </div>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 mb-2 lg:col-span-9 lg:mb-0">
                            <div class="sm:flex">
                                <input
                                    id="af-account-full-name"
                                    type="text"
                                    :placeholder="user.first_name"
                                    :value="user.first_name"
                                    class="relative block w-full px-3 py-2 -mt-px -ml-px text-sm border-gray-200 shadow-sm pr-11 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75" />
                                <input
                                    type="text"
                                    :placeholder="user.last_name"
                                    :value="user.last_name"
                                    class="relative block w-full px-3 py-2 -mt-px -ml-px text-sm border-gray-200 shadow-sm pr-11 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75" />
                            </div>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 lg:col-span-3">
                            <label
                                for="af-account-email"
                                class="inline-block text-sm text-gray-800 mt-2.5">
                                Correo electrónico
                            </label>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 mb-2 lg:col-span-9 lg:mb-0">
                            <input
                                id="af-account-email"
                                type="email"
                                :placeholder="user.email"
                                :value="user.email"
                                class="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-primary/75 focus:ring-primary/75" />
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 lg:col-span-3">
                            <label
                                for="af-account-password"
                                class="inline-block text-sm text-gray-800 mt-2.5">
                                Contraseña
                            </label>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 mb-2 lg:col-span-9 lg:mb-0">
                            <div class="space-y-2">
                                <input
                                    id="af-account-password"
                                    type="text"
                                    class="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-primary/75 focus:ring-primary/75"
                                    placeholder="Introducir la contraseña actual" />
                                <input
                                    type="text"
                                    class="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm pr-11 focus:border-primary/75 focus:ring-primary/75"
                                    placeholder="Introducir la contraseña nueva" />
                            </div>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 lg:col-span-3">
                            <div class="inline-block">
                                <label
                                    for="af-account-phone"
                                    class="inline-block text-sm text-gray-800 mt-2.5">
                                    Teléfono
                                </label>
                                <span class="text-sm text-gray-400">
                                    (Opcional)
                                </span>
                            </div>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 mb-2 lg:col-span-9 lg:mb-0">
                            <div class="sm:flex">
                                <input
                                    id="af-account-phone"
                                    type="text"
                                    class="relative block w-full px-3 py-2 -mt-px -ml-px text-sm border-gray-200 shadow-sm pr-11 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75"
                                    placeholder="+x(xxx)xxx-xx-xx" />
                                <select
                                    class="relative block w-full px-3 py-2 -mt-px -ml-px text-sm border-gray-200 shadow-sm pr-9 sm:w-auto first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75">
                                    <option selected>Móvil</option>
                                    <option>Hogar</option>
                                    <option>Trabajo</option>
                                </select>
                            </div>

                            <p class="mt-3">
                                <a
                                    class="inline-flex items-center gap-x-1.5 text-sm text-primary decoration-2 hover:underline font-medium"
                                    href="/">
                                    <svg
                                        class="w-3.5 h-3.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                    Añadir teléfono
                                </a>
                            </p>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 lg:col-span-3">
                            <label
                                for="af-account-gender-checkbox"
                                class="inline-block text-sm text-gray-800 mt-2.5">
                                Género
                            </label>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 mb-2 lg:col-span-9 lg:mb-0">
                            <div class="sm:flex">
                                <label
                                    for="af-account-gender-checkbox"
                                    class="relative flex w-full px-3 py-2 -mt-px -ml-px text-sm border border-gray-200 shadow-sm first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75">
                                    <input
                                        type="radio"
                                        name="af-account-gender"
                                        class="shrink-0 mt-0.5 border-gray-200 rounded-full text-primary pointer-events-none focus:ring-primary/75"
                                        id="af-account-gender-checkbox"
                                        checked />
                                    <span class="ml-3 text-sm text-gray-500">
                                        Masculino
                                    </span>
                                </label>

                                <label
                                    for="af-account-gender-checkbox-female"
                                    class="relative flex w-full px-3 py-2 -mt-px -ml-px text-sm border border-gray-200 shadow-sm first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75">
                                    <input
                                        type="radio"
                                        name="af-account-gender"
                                        class="shrink-0 mt-0.5 border-gray-200 rounded-full text-primary pointer-events-none focus:ring-primary/75"
                                        id="af-account-gender-checkbox-female" />
                                    <span class="ml-3 text-sm text-gray-500">
                                        Femenino
                                    </span>
                                </label>

                                <label
                                    for="af-account-gender-checkbox-other"
                                    class="relative flex w-full px-3 py-2 -mt-px -ml-px text-sm border border-gray-200 shadow-sm first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg focus:z-10 focus:border-primary/75 focus:ring-primary/75">
                                    <input
                                        type="radio"
                                        name="af-account-gender"
                                        class="shrink-0 mt-0.5 border-gray-200 rounded-full text-primary pointer-events-none focus:ring-primary/75"
                                        id="af-account-gender-checkbox-other" />
                                    <span class="ml-3 text-sm text-gray-500">
                                        Otro
                                    </span>
                                </label>
                            </div>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 lg:col-span-3">
                            <label
                                for="af-account-bio"
                                class="inline-block text-sm text-gray-800 mt-2.5">
                                Mensaje
                            </label>
                        </div>

                        <!-- End Col -->

                        <div class="col-span-12 mb-2 lg:col-span-9 lg:mb-0">
                            <textarea
                                id="af-account-bio"
                                class="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg focus:border-primary/75 focus:ring-primary/75"
                                rows="3"
                                maxlength="40"
                                placeholder="Escribe tu mensaje..."
                                >{{ biography }}</textarea
                            >
                        </div>

                        <!-- End Col -->
                    </div>
                    <!-- End Grid -->

                    <div class="flex justify-end mt-5 gap-x-2">
                        <button
                            type="button"
                            @click="cancelEditProfile()"
                            data-hs-overlay="#user-modal-setttings"
                            class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white transition-all border border-transparent rounded-md shadow-md bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2">
                            Guardar cambios
                        </button>
                    </div>
                </form>

                <!-- End Content -->
            </div>
        </div>
    </div>
</template>
