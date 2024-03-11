import axios from "axios";

export const likesApi = {
  saveLike(newsId) {
    return axios({
      url: `http://localhost:8080/likes/save?newsId=${newsId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  deleteLike(newsId) {
    return axios({
      url: `http://localhost:8080/likes?newsId=${newsId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};
