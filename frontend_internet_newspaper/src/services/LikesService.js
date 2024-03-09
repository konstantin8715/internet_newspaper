import { likesApi } from '../api/LikesApi';
import { userService } from '../services/UserService';
import { newsService } from '../services/NewsService';

export const likesService = {

    async saveLike(news, user) {
        try {
            if (news.likes.find(like => like.user.id === user.id)) {
                await this.deleteLike(news.id);
                return;
            }
            await likesApi.saveLike(news.id);
            news.likes.push({});
        } catch (error) {
            try {
                console.log('start refresh');
                await userService.refreshToken();
                console.log('end refresh');
                this.saveLike(news);
            } catch (error) {
                console.log('start delete user');
                user.deleteUserFromLocalStorage();
                user.$reset();
                console.log('end delete user');
                throw error;
            }
        }
    },

    async deleteLike(newsId) {
        try {
            console.log('start delete like');
            await likesApi.deleteLike(newsId);
            news.likes.pop();
            console.log('finish delete like');
        } catch (error) {
            throw error;
        }
    },

}