import {newsApi} from '../api/NewsApi';
import {useUserStore} from '../stores/UserStore';

export const newsService = {

    async getFreshNews(email, password) {
        try {
            const data = await newsApi.getFreshNews().data;
            return data;
        } catch (error) {
            // TODO: Сделать свои объекты ошибок
            throw error;
        }
    },

}