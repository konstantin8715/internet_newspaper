import {
    defineStore
} from 'pinia';

export const useTokenStore = defineStore('tokenStore', {
    state: () => ({
        accessToken: '',
        refreshToken: '',
    }),

    actions: {
        saveTokens(accessToken, refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },

        loadTokens() {
            this.accessToken = localStorage.getItem('accessToken');
            this.refreshToken = localStorage.getItem('refreshToken');
        },
    }
})