<script setup lang="ts">
definePageMeta({
    layout: 'empty',
});

import { useUserStore } from '~/stores/userStore';

const { $directus, $toast } = useNuxtApp();

const userStore = useUserStore();
const router = useRouter();

const goTo: string = useState<string>('goTo').value;

function goBack() {
    if (router.options.history.state.back) {
        router.back();
    } else {
        navigateTo('/');
    }
}

const form = {
    email: 'rafa@rab-devs.com',
    password: 'tfgdaw',
};

const onLogin = async () => {
    try {
        await $directus.auth.login({
            email: form.email,
            password: form.password,
        });
        await userStore.setMe(
            (await $directus.users.me.read({
                fields: [
                    'avatar',
                    'description',
                    'email',
                    'first_name',
                    'friends',
                    'id',
                    'language',
                    'last_name',
                    'password',
                    'role',
                    'status',
                    'username',
                ],
            })) as User
        );
        $toast.success('Sesión iniciada');
        setTimeout(() => navigateTo(goTo || '/'), 1500);
    } catch (e) {
        $toast.error('Datos de usuario incorrectos');
    }
};

onMounted(() => {
    if (userStore.getMe) navigateTo('/');
});
</script>

<template>
    <div class="flex items-center h-full py-16 bg-gray-100">
        <main class="w-full max-w-md p-6 mx-auto">
            <div
                class="flex flex-col px-10 py-8 border border-gray-200 shadow-xl rounded-xl bg-gray-50">
                <h1 class="text-2xl font-bold text-center text-gray-800">
                    Iniciar sesión
                </h1>
                <div class="my-4">
                    <p class="mb-4 text-center text-gray-600">
                        ¿No tienes cuenta?
                        <NuxtLink
                            to="/users/register"
                            class="font-semibold text-primary focus hover:underline">
                            Crea una cuenta aquí
                        </NuxtLink>
                    </p>
                    <button
                        type="button"
                        class="w-full p-3 mx-auto font-semibold text-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus hover:bg-gray-600 hover:text-white">
                        <ClientOnly>
                            <Icon
                                name="skill-icons:discord"
                                class="w-5 h-5 mr-1.5 -mt-1 text-gray-500" />
                        </ClientOnly>
                        Iniciar sesión con Discord
                    </button>
                </div>
                <div
                    class="flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-300 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-300 after:ml-6">
                    O
                </div>
                <form @submit.prevent="onLogin()" class="py-2 my-4 space-y-5">
                    <div>
                        <label for="email" class="font-semibold text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            v-model="form.email"
                            required
                            id="email"
                            type="email"
                            class="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus" />
                    </div>
                    <div>
                        <label
                            for="password"
                            class="font-semibold text-gray-700">
                            Contraseña
                        </label>
                        <input
                            v-model="form.password"
                            required
                            id="password"
                            type="password"
                            class="w-full mt-1 mb-2 border-gray-300 rounded-lg focus" />
                        <NuxtLink
                            to="/users/me/recover-password"
                            class="p-1 font-semibold rounded-lg text-primary focus hover:underline">
                            Recuperar contraseña
                        </NuxtLink>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="w-full p-4 font-semibold text-white rounded-lg shadow-md bg-primary focus hover:bg-primary/80">
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                <button
                    type="button"
                    @click="goBack()"
                    class="px-2 py-1 mx-auto font-semibold text-gray-500 rounded-lg focus hover:text-black">
                    <ClientOnly>
                        <Icon name="ph:key-return" class="w-5 h-5 mr-1 -mt-1" />
                    </ClientOnly>
                    Volver atrás
                </button>
            </div>
        </main>
    </div>
</template>

<style>
.focus {
    @apply focus:bg-yellow-400 focus:text-black;
}
</style>
