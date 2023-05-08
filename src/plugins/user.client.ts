import { useUserStore } from '~/stores/userStore';

export default defineNuxtPlugin(async () => {
    const { $directus } = useNuxtApp();

    let token = await $directus.auth.token;
    const userStore = useUserStore();

    if (token) {
        const user: User = ((await $directus.users.me.read()) as User) || null;
        userStore.setMe(user);
    } else if (!token) userStore.setMe(null);

    setInterval(async () => {
        token = await $directus.auth.token;
        if (!token) {
            userStore.setMe(null);
            location.reload();
        }
    }, 30000);
});
