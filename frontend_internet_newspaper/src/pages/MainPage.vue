<template>
  <div class="container">
    <main-header />
    <news-list />
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import NewsList from "../components/NewsList.vue";

import { likesService } from "../services/LikesService";
import { userService } from "../services/UserService";
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";

export default {
  components: { MainHeader, NewsList },
  data() {
    return {
      userStore: useUserStore(),
      newsStore: useNewsStore(),
      updateTitle: "",
      updateText: "",
      createNewsFlag: false,
      createNewsTitle: "",
      createNewsText: "",
      createNewsPictureUrl: "",
      comment: "",
    };
  },

  methods: {
    async likeNews(news) {
      try {
        await this.newsStore.saveLikeForNews(news, this.userStore);
      } catch (error) {
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
      }
    },

    async getFreshNews() {
      try {
        await this.newsStore.loadNews();
      } catch (error) {
        alert("Ошибка при загрузке новостей");
      }
    },

    async loadComments(news) {
      try {
        await this.newsStore.loadCommentsForNews(news);
      } catch (error) {
        console.log(error);
        alert("Не удалось загрузить комментарии");
      }
    },

    async saveCommentForNews(news) {
      try {
        await this.newsStore.saveCommentForNews(
          news,
          this.comment,
          this.userStore
        );
        this.comment = "";
      } catch (error) {
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
      }
    },

    async deleteComment(news, comment) {
      try {
        if (this.userStore.isAdmin) {
          await this.newsStore.adminDeleteCommentForNews(
            news,
            comment.id,
            this.userStore
          );
        } else {
          await this.newsStore.deleteCommentForNews(
            news,
            comment.id,
            this.userStore
          );
        }
      } catch (error) {
        console.log("Не удалось удалить комментарий");
      }
    },

    openDialog(news) {
      news.change = true;
      this.updateTitle = news.newsTitle;
      this.updateText = news.newsText;
    },

    async updateNews(news) {
      try {
        news.newsTitle = this.updateTitle;
        news.newsText = this.updateText;
        await this.newsStore.updateNews(news, this.userStore);
        this.newsTitle = "";
        this.newsText = "";
        news.change = false;
      } catch (error) {
        console.log(error);
        alert("Не удалось обновить новость");
      }
    },

    async createNews() {
      try {
        const createdNews = {
          newsTitle: this.createNewsTitle,
          newsText: this.createNewsText,
          picture: {
            url: this.createNewsPictureUrl,
          },
        };
        await this.newsStore.createNews(createdNews, this.userStore);
        this.createNewsTitle = "";
        this.createNewsText = "";
        this.createNewsPictureUrl = "";
        this.createNewsFlag = false;
        this.getFreshNews();
      } catch (error) {
        console.log(error);
        alert("Не удалось создать новость");
      }
    },

    async deleteNews(news) {
      try {
        await this.newsStore.deleteNews(news.id, this.userStore);
      } catch (error) {
        alert("Не удалось удалить новость");
      }
    },

    sortedComments(n) {
      return n.comments.sort(
        (c1, c2) => c1.datePublishedComment - c2.datePublishedComment
      );
    },

    async signOut() {
      try {
        await this.userStore.signOut();
      } catch (error) {
        alert("Не удалось выйти");
      }
    },
  },

  async created() {
    try {
      await userService.refreshToken(this.userStore);
      this.userStore.loadUserFromLocalStorage();
    } catch {
      console.log(
        "Пользователь не авторизован, либо срок действия токенов истек"
      );
    } finally {
      if (this.newsStore.news.length === 0) {
        this.getFreshNews();
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "../colors";
</style>
../services/LikesService../modules/MainHeader.vue../components/MainHeader.vue
