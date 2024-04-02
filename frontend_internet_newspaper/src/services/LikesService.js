import { likesApi } from "../api/LikesApi";
import { userService } from "../services/UserService";

export const likesService = {
  async saveLike(news, user) {
    try {
      await likesApi.saveLike(news.id);
    } catch (error) {
      await userService.refreshToken(user);
      this.saveLike(news, user);
    }
  },

  async deleteLike(news, user) {
    try {
      await likesApi.deleteLike(news.id);
    } catch (error) {
      await userService.refreshToken(user);
      this.deleteLike(news, user);
    }
  },
};
