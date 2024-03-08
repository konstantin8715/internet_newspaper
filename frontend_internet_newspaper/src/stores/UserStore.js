import {
    defineStore
} from 'pinia';

import {authenticationApi} from '../api/UserApi';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        name: '',
        surname: '',
        roles: [],
    }),

    actions: {

        loadUserFromLocalStorage() {
            this.name = localStorage.getItem('userName');
            this.surname = localStorage.getItem('userSurname');
            this.roles = JSON.parse(localStorage.getItem('userRoles'));
        },

        saveUser(name, surname, roles) {
            this.name = name;
            this.surname = surname;
            this.roles = roles;
            this.saveUserToLocalStorage(name, surname, roles);
        },

        saveUserToLocalStorage(name, surname, roles) {
            localStorage.setItem('userName', name);
            localStorage.setItem('userSurname', surname);
            localStorage.setItem('userRoles', JSON.stringify(roles));
        },
    }
})