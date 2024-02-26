import {
    defineStore
} from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        name: '',
        surname: '',
        roles: [],
    }),

    actions: {
        loadUser() {
            this.name = localStorage.getItem('userName');
            this.surname = localStorage.getItem('userSurname');
            this.roles = JSON.parse(localStorage.getItem('userRoles'));
        },
    }
})