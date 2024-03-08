import {likesApi} from '../api/LikesApi';
import { newsApi } from '../api/NewsApi';

export const likesService = {

    async saveLike(newsId) {
        try {
            await likesApi.saveLike(newsApi);
        } catch (error) {
            // TODO: Сделать свои объекты ошибок
            throw error;
        }
    },

}