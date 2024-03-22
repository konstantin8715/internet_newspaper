import axios from "axios";

export const newsApi = {
  getFreshNews() {
    return axios({
      url: "http://localhost:8080/news/fresh-news",
      method: "get",
    });
  },

  updateNews(news) {
    return axios({
      url: `http://localhost:8080/news/${news.id}`,
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
      url: `http://localhost:8080/news/save`,
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        ...news,
      },
    });
  },
};
