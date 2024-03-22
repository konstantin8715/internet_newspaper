import axios from "axios";

export const newsApi = {
  getFreshNews() {
    return axios({
      url: "http://localhost:8080/news/fresh-news",
      method: "get",
    });
  },

  updateNews(news) {
    console.log(news);
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
};
