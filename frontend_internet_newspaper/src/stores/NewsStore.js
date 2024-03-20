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
        comments.forEach((c) => news.comments.push(c));
        news.showComments = true;
        news.isCommentsLoaded = true;
      } catch (error) {
        throw error;
      }
    },

    async saveCommentForNews(newsId, textComment) {
      try {
        return await commentsService.saveComment(newsId, textComment);
      } catch (error) {
        console.log(error);
      }
    },

    async saveLikeForNews(news, userStore) {
      try {
        // console.log('newsStore.saveLikeForNews()');
        const liked = news.likes.find(
          (like) => like.user.id == userStore.id /*|| like.user.id == -1*/
        );
        console.log(news.likes);
        console.log(userStore.id);
        console.log(liked);

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
