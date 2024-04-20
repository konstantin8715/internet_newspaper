import { newsApi } from "../api/NewsApi";
import { userService } from "../services/UserService";

export const newsService = {
  async getFreshNews() {
    const response = await newsApi.getFreshNews();
    const data = response.data;
    return data;
  },

  async getNewsByUserThemes(favoritesThemes, forbiddenThemes) {
    const response = await newsApi.getNewsByUserThemes(
      favoritesThemes,
      forbiddenThemes
    );
    const data = response.data;
    return data;
  },

  async updateNews(news, user) {
    try {
      await newsApi.updateNews(news);
    } catch (error) {
      await userService.refreshToken(user);
      this.updateNews(news, user);
    }
  },

  async createNews(news, admin) {
    try {
      await newsApi.createNews(news);
    } catch (error) {
      await userService.refreshToken(admin);
      this.createNews(news, admin);
    }
  },

  async deleteNews(newsId, admin) {
    try {
      await newsApi.deleteNews(newsId);
    } catch (error) {
      await userService.refreshToken(admin);
      this.deleteNews(newsId, admin);
    }
  },
};
