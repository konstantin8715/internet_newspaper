import axios from "axios";

export const commentsApi = {
  getCommentsForNews(newsId) {
    return axios({
      url: `http://localhost:8080/comment/show?newsId=${newsId}`,
      method: "get",
    });
  },

  checkExistComment(newsId) {
    return axios({
      url: `http://localhost:8080/comment/check-db?newsId=${newsId}`,
      method: "post",
    });
  },

  saveComment(newsId, textComment) {
    return axios({
      url: `http://localhost:8080/comment/save?newsId=${newsId}`,
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
      url: `http://localhost:8080/comment/user/${commentId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};
