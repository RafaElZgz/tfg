import { useUserStore } from '~/stores/userStore';

export default defineNuxtPlugin(async () => {
    const { $directus } = useNuxtApp();

    let token = await $directus.auth.token;
    const userStore = useUserStore();

    var authenticated = false;
    if (token) authenticated = true;

    setInterval(async () => {
        token = await $directus.auth.token;
        if (authenticated && !token) {
            userStore.setMe(null);
            location.reload();
        } else if (!authenticated && token) {
            authenticated = true;
        }
    }, 30000);
});
