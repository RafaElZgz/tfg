<script setup lang="ts">
definePageMeta({
    layout: 'empty',
});

const { $directus } = useNuxtApp();
const { $toast } = useNuxtApp();

const router = useRouter();

const form = {
    email: 'rafa@rab-devs.com',
};

function goBack() {
    if (router.options.history.state.back) {
        router.back();
    } else {
        navigateTo('/');
    }
}

const goTo: string = useState<string>('goTo').value;

const onSubmit = async () => {
    try {
        await $directus.auth.password.request(form.email);
        $toast.success('Sesión iniciada');
        setTimeout(() => navigateTo(goTo || '/'), 1500);
    } catch (error) {
        $toast.error('Datos de usuario incorrectos');
    }
};
</script>

<template>
    <div class="flex items-center h-full py-16 bg-gray-100">
        <main class="w-full max-w-md p-6 mx-auto">
            <div
                class="flex flex-col px-10 py-8 border border-gray-200 shadow-xl rounded-xl bg-gray-50">
                <h1 class="text-2xl font-bold text-center text-gray-800">
                    Recuperar contraseña
                </h1>
                <div class="mt-4">
                    <p class="mb-4 text-center text-gray-600">
                        ¿Ya tienes cuenta?
                        <NuxtLink
                            to="/users/me/login"
                            class="font-semibold text-primary focus hover:underline">
                            Iniciar sesión
                        </NuxtLink>
                    </p>
                </div>
                <form @submit.prevent="onSubmit()" class="py-2 my-4 space-y-5">
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
                        <button
                            type="submit"
                            class="w-full p-4 font-semibold text-white rounded-lg shadow-md bg-primary focus hover:bg-primary/80">
                            Recuperar contraseña
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
