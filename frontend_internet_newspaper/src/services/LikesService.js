import { likesApi } from "../api/LikesApi";
import { userService } from "../services/UserService";
import { newsService } from "../services/NewsService";

export const likesService = {
  async saveLike(news, user) {
    try {
      const like = news.likes.find((like) => like.user.id == user.id);
      if (like) {
        return likesService.deleteLike(news);
      }

      return likesApi.saveLike(news.id);
    } catch (error) {
      try {
        await userService.refreshToken();
        await this.saveLike(news, user);
      } catch (error) {
        console.log('unautorized');
        user.deleteUserFromLocalStorage();
        user.$reset();
        throw error;
      }
    }
  },

  async deleteLike(news) {
    try {
      await likesApi.deleteLike(news.id);
    } catch (error) {
      throw error;
    }
  },
};
