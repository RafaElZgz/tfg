import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        me: null as User | null,
        users: {
            data: [] as User[],
        },
    }),

    getters: {
        getMe(): User | null {
            return this.me;
        },
        getUsers(): User[] {
            return this.users.data;
        },
    },

    actions: {
        async setMe(me: User | null): Promise<void> {
            this.me = me;
        },
        async setUsers(users: any): Promise<void> {
            this.users = users;
        },
    },

    persist: true,
});
