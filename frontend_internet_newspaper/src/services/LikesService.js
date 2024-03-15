import { likesApi } from "../api/LikesApi";
import { userService } from "../services/UserService";

export const likesService = {
  async saveLike(news, user) {
    try {
      const like = news.likes.find((like) => like.user.id == user.id);
      if (like) {
        return likesService.deleteLike(news);
      }

      return await likesApi.saveLike(news.id);
    } catch (error) {
      try {
        await userService.refreshToken(user);
        this.saveLike(news, user);
      } catch (error) {
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
