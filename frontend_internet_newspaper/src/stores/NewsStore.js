import { defineStore } from "pinia";

import { newsService } from "../services/NewsService";
import { commentsService } from "../services/CommentsService";
import { likesService } from "../services/LikesService";

export const useNewsStore = defineStore("useNewsStore", {
  state: () => ({
    news: [],
  }),

  getters: {
    hasNews() {
      return this.news.length > 0;
    }
  },

  actions: {
    async loadNews() {
      if (this.hasNews) {
        this.news = [];
      }
      const news = await newsService.getFreshNews();
      news.forEach(async (n) => {
        this.news.push(n);
        n.comments = [];
        n.countOfComments = await commentsService.checkExistComment(n.id);
        n.showComments = false;
        n.isCommentsLoaded = false;
        n.change = false;
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

    async updateNews(news, userStore) {
      try {
        const requestNews = {
          id: news.id,
          newsTitle: news.newsTitle,
          newsText: news.newsText,
          datePublishedNews: news.datePublishedNews,
          likes: news.likes,
          picture: news.picture,
          themes: news.themes,
        };
        await newsService.updateNews(requestNews, userStore);
      } catch (error) {
        throw error;
      }
    },

    async createNews(news, userStore) {
      try {
        const requestNews = {
          newsTitle: news.newsTitle,
          newsText: news.newsText,
          datePublishedNews: new Date().toISOString(),
          likes: [],
          picture: news.picture,
          themes: [],
        };
        console.log(requestNews);
        await newsService.createNews(requestNews, userStore);
      } catch (error) {
        throw error;
      }
    },

    async deleteNews(newsId, userStore) {
      try {
        await newsService.deleteNews(newsId, userStore);
        this.news = this.news.filter(n => n.id != newsId);
      } catch (error) {
        throw error;
      }
    },

    async saveCommentForNews(news, textComment, userStore) {
      try {
        const newComment = await commentsService.saveComment(
          news.id,
          textComment,
          userStore,
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
