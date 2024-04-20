import axios from "axios";

export const newsApi = {
  URL: import.meta.env.VITE_API_URL,

  getFreshNews() {
    return axios({
      url: `${this.URL}/news/fresh-news`,
      method: "get",
    });
  },

  getNewsByUserThemes(favoritesT, forbiddenT) {
    return axios({
      url: `${this.URL}/news/user-themes`,
      method: "post",
      data: {
        favoritesThemes: favoritesT,
        forbiddenThemes: forbiddenT,
      },
    });
  },

  updateNews(news) {
    return axios({
      url: `${this.URL}/news/${news.id}`,
      method: "put",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        ...news,
      },
    });
  },

  createNews(news) {
    return axios({
      url: `${this.URL}/news/save`,
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        ...news,
      },
    });
  },

  deleteNews(newsId) {
    return axios({
      url: `${this.URL}/news/${newsId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};
