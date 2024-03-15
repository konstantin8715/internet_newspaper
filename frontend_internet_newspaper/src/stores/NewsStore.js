import { defineStore } from "pinia";

import { newsService } from "../services/NewsService";
import { commentsService } from "../services/CommentsService";

export const useNewsStore = defineStore("useNewsStore", {
  state: () => ({
    news: [
      //   {
      //     id: "",
      //     title: "",
      //     text: "",
      //     pictureUrl: "",
      //     likes: [],
      //     comments: [],
      //     loadedComments: 0;
      //   },
    ],
  }),

  actions: {
    async loadNews() {
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
        });
      });
    },

    async loadCommentsForNews(news) {
      try {
        const comments = await commentsService.getCommentsForNews(news);
        comments.forEach((c) => news.comments.push(c));
      } catch (error) {
        throw error;
      }
    },
  },
});
