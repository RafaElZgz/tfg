import { useUserStore } from '~/stores/userStore';

import directusConfig from '~~/config/directus.config';

export default defineNuxtPlugin(async () => {
    const { $directus } = useNuxtApp();

    const { data: users } = await useAsyncData<User[]>('users', () => {
        return $directus.users.readByQuery({
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
            access_token: directusConfig.token,
        }) as Promise<User[]>;
    });

    const userStore = useUserStore();
    userStore.setUsers(users.value || []);
});
