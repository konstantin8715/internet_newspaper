import { likesApi } from "../api/LikesApi";
import { userService } from "../services/UserService";

export const likesService = {
  async saveLike(news, user) {
    try {
      await likesApi.saveLike(news.id);
    } catch (error) {
      try {
        await userService.refreshToken(user);
        this.saveLike(news, user);
      } catch (error) {
        throw error;
      }
    }
  },

  async deleteLike(news, user) {
    try {
      await likesApi.deleteLike(news.id);
    } catch (error) {
      try {
        await userService.refreshToken(user);
        this.deleteLike(news, user);
      } catch (error) {
        throw error;
      }
    }
  },
};
