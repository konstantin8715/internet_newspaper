import { userService } from "../services/UserService";
import { commentsApi } from "../api/CommentsApi";

export const commentsService = {
  async getCommentsForNews(news) {
    const comments = [];

    for (
      let i = 0;
      i < Math.min(news.countOfComments - news.comments.length, 3);
      i++
    ) {
      const commentData = await commentsApi.getCommentsForNews(news.id);
      const comment = commentData.data[0];
      comment.datePublishedComment = new Date(comment.datePublishedComment);
      comments.push(comment);
    }

    return comments;
  },

  async checkExistComment(newsId) {
    const countOfCommentsData = await commentsApi.checkExistComment(newsId);
    const countOfComments = countOfCommentsData.data.countComment;
    return countOfComments;
  },

  async saveComment(newsId, textComment, user) {
    try {
      return await commentsApi.saveComment(newsId, textComment);
    } catch (error) {
      await userService.refreshToken(user);
      this.saveComment(newsId, textComment, user);
    }
  },

  async userDeleteComment(commentId, user) {
    try {
      await commentsApi.userDeleteComment(commentId);
    } catch (error) {
      await userService.refreshToken(user);
      this.userDeleteComment(commentId, user);
    }
  },

  async adminDeleteComment(commentId, admin) {
    try {
      await commentsApi.adminDeleteComment(commentId);
    } catch (error) {
      await userService.refreshToken(admin);
      this.adminDeleteComment(commentId, admin);
    }
  },
};
