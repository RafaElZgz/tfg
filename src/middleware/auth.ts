import { useUserStore } from '~/stores/userStore';

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();
    const user = userStore.getMe;

    const router = useRouter();

    if (!user) {
        useState<string>('goTo', () => to.path);
        await router.push('/users/me/login');
    }
});
