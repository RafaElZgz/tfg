import { useUserStore } from '~/stores/userStore';

export default defineNuxtPlugin(async () => {
    const { $directus } = useNuxtApp();

    let token = await $directus.auth.token;
    const userStore = useUserStore();

    var authenticated = false;

    if (token) {
        const user: User = ((await $directus.users.me.read()) as User) || null;
        userStore.setMe(user);
        authenticated = true;
    } else if (!token) userStore.setMe(null);

    setInterval(async () => {
        token = await $directus.auth.token;
        if (authenticated && !token) {
            userStore.setMe(null);
            await navigateTo('/users/me/login');
        }
    }, 30000);
});
