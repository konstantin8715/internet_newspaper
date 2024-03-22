import { defineStore } from "pinia";

import { newsService } from "../services/NewsService";
import { commentsService } from "../services/CommentsService";
import { likesService } from "../services/LikesService";

export const useNewsStore = defineStore("useNewsStore", {
  state: () => ({
    news: [],
  }),

  actions: {
    async loadNews() {
      // console.log("newsStore.loadNews()");
      const news = await newsService.getFreshNews();
      news.forEach(async (n) => {
        this.news.push({
          id: n.id,
          title: n.newsTitle,
          text: n.newsText,
          pictureUrl: n.picture.url,
          likes: n.likes,
          comments: [],
          countOfComments: await commentsService.checkExistComment(n.id),
          showComments: false,
          isCommentsLoaded: false,
        });
      });
    },

    async loadCommentsForNews(news) {
      try {
        const comments = await commentsService.getCommentsForNews(news);
        news.comments.push(...comments);
        // comments.forEach((c) => news.comments.push(c));
        news.showComments = true;
        news.isCommentsLoaded = true;
      } catch (error) {
        throw error;
      }
    },

    async saveCommentForNews(news, textComment, userStore) {
      try {
        const newComment = await commentsService.saveComment(
          news.id,
          textComment,
          userStore
        );
        newComment.data.datePublishedComment = new Date(
          newComment.data.datePublishedComment
        );
        news.comments.push(newComment.data);
        news.countOfComments++;
      } catch (error) {
        throw error;
      }
    },

    async deleteCommentForNews(news, commentId, userStore) {
      try {
        await commentsService.userDeleteComment(commentId, userStore);
        news.countOfComments = await commentsService.checkExistComment(news.id);
        news.comments = news.comments.filter((c) => c.id != commentId);
      } catch (error) {
        throw error;
      }
    },

    async adminDeleteCommentForNews(news, commentId, userStore) {
      try {
        await commentsService.adminDeleteComment(commentId, userStore);
        news.countOfComments = await commentsService.checkExistComment(news.id);
        news.comments = news.comments.filter((c) => c.id != commentId);
      } catch (error) {
        throw error;
      }
    },

    async saveLikeForNews(news, userStore) {
      try {
        const liked = news.likes.find((like) => like.user.id == userStore.id);

        if (liked) {
          await likesService.deleteLike(news, userStore);
          news.likes = news.likes.filter((like) => like !== liked);
        } else {
          await likesService.saveLike(news, userStore);
          news.likes.push({
            user: {
              id: userStore.id,
            },
          });
        }
      } catch (error) {
        throw error;
      }
    },
  },
});
