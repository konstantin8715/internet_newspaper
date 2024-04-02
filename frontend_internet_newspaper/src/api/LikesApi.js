import axios from "axios";

export const likesApi = {
  URL: import.meta.env.VITE_API_URL,

  saveLike(newsId) {
    return axios({
      url: `${this.URL}/likes/save?newsId=${newsId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  deleteLike(newsId) {
    return axios({
      url: `${this.URL}/likes?newsId=${newsId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};
