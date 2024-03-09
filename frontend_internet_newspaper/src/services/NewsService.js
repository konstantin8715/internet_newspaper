import {newsApi} from '../api/NewsApi';
import {useUserStore} from '../stores/UserStore';

export const newsService = {

    async getFreshNews(email, password) {
        try {
            const response = await newsApi.getFreshNews();
            const data = response.data;
            return data;
        } catch (error) {
            // TODO: Сделать свои объекты ошибок
            throw error;
        }
    },

    // async checkLikeNews(userId, newsId) {
    //     try {
    //         const response = await newsApi.getFreshNews();
    //         const data = response.data;
    //         const news = data.find(news => news.id === newsId)
    //         const like = news.likes.find(like => like.user.id === userId);

    //         if (like) return true;
    //         else return false;
    //     } catch (error) {
    //         // TODO: Сделать свои объекты ошибок
    //         throw error;
    //     }
    // },
}