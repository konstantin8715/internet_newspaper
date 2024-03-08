import {authenticationApi} from '../api/UserApi';
import {useUserStore} from '../stores/UserStore';

export const userService = {

    async signIn(email, password) {
        try {
            const data = await authenticationApi.signIn(email, password).data;
            useUserStore().saveUser(data.name, data.surname, data.roles);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        } catch (error) {
            // TODO: Сделать свои объекты ошибок
            throw error;
        }
    },

}