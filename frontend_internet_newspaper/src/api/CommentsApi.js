import axios from "axios";

export const commentsApi = {
  URL: import.meta.env.VITE_API_URL,

  getCommentsForNews(newsId) {
    return axios({
      url: `${this.URL}/comment/show?newsId=${newsId}`,
      method: "get",
    });
  },

  checkExistComment(newsId) {
    return axios({
      url: `${this.URL}/comment/check-db?newsId=${newsId}`,
      method: "post",
    });
  },

  saveComment(newsId, textComment) {
    return axios({
      url: `${this.URL}/comment/save?newsId=${newsId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        textComment,
      },
    });
  },

  userDeleteComment(commentId) {
    return axios({
      url: `${this.URL}/comment/user/${commentId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  adminDeleteComment(commentId) {
    return axios({
      url: `${this.URL}/comment/admin/${commentId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};
