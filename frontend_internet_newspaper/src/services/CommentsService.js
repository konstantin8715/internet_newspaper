import { userService } from "../services/UserService";
import { commentsApi } from "../api/CommentsApi";

export const commentsService = {
  async getCommentsForNews(news) {
    try {
      const comments = [];

      for (
        let i = 0;
        i < Math.min(news.countOfComments - news.comments.length, 3);
        i++
      ) {
        const commentData = await commentsApi.getCommentsForNews(news.id);
        const comment = {
          id: commentData.data[0].id,
          textComment: commentData.data[0].textComment,
          datePublishedComment: new Date(
            commentData.data[0].datePublishedComment
          ),
        };
        comments.push(comment);
      }

      return comments
    } catch (error) {
      throw error;
    }
  },

  async checkExistComment(newsId) {
    const countOfCommentsData = await commentsApi.checkExistComment(newsId);
    const countOfComments = countOfCommentsData.data.countComment;
    return countOfComments;
  },

  async saveComment(newsId, textComment) {
    try {
      return await commentsApi.saveComment(newsId, textComment);
    } catch (error) {
      throw error;
    }
  },
};
