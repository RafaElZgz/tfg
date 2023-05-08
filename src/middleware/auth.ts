import { useUserStore } from '~/stores/userStore';

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();
    const user = userStore.getMe;

    if (!user) {
        useState<string>('goTo', () => to.path);
        await navigateTo('/users/me/login');
    }
});
