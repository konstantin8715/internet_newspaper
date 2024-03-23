import { newsApi } from "../api/NewsApi";
import { userService } from "../services/UserService";

export const newsService = {
  async getFreshNews() {
    try {
      const response = await newsApi.getFreshNews();
      const data = response.data;
      return data;
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      throw error;
    }
  },

  async updateNews(news, user) {
    try {
      await newsApi.updateNews(news);
    } catch (error) {
      try {
        await userService.refreshToken(user);
        this.updateNews(news, user);
      } catch (error) {
        throw error;
      }
      throw error;
    }
  },

  async createNews(news, admin) {
    try {
      await newsApi.createNews(news);
    } catch (error) {
      try {
        await userService.refreshToken(admin);
        this.createNews(news, admin);
      } catch (error) {
        throw error;
      }
    }
  },

  async deleteNews(newsId, admin) {
    try {
      await newsApi.deleteNews(newsId);
    } catch (error) {
      try {
        await userService.refreshToken(admin);
        this.deleteNews(newsId, admin);
      } catch (error) {
        throw error;
      }
    }
  },
};
