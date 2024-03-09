import {authenticationApi} from '../api/UserApi';
import {useUserStore} from '../stores/UserStore';

export const userService = {

    async signIn(email, password) {
        try {
            const response = await authenticationApi.signIn(email, password);
            const data = response.data;
            useUserStore().saveUser(data.id, data.name, data.surname, data.roles);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        } catch (error) {
            // TODO: Сделать свои объекты ошибок
            throw error;
        }
    },

    async refreshToken() {
        try {
            const response = await authenticationApi.refreshToken();
            const data = response.data;
            localStorage.setItem('accessToken', data.accessToken);
        } catch (error) {
            // TODO: Сделать свои объекты ошибок
            throw error;
        }
    },

}