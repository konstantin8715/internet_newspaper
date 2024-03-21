<template>
  <!-- TODO: Сделать то, что в v-if getterом в UserStore -->
  <div
    v-if="this.userStore.name && this.userStore.surname && this.userStore.roles"
  >
    {{ this.userStore.name }}
    {{ this.userStore.surname }}
    <button @click="signOut">Выйти</button>
  </div>
  <div v-else>
    <button @click="$router.push('login')">Войти</button>
    <button @click="$router.push('signup')">Зарегистрироваться</button>
  </div>
  <div class="container">
    <div
      class="news"
      v-for="n in this.newsStore.news"
      :key="n.id"
      style="border: solid red; margin-top: 20px; padding: 25px"
    >
      <h3>{{ n.title }}</h3>
      <div>{{ n.text }}</div>
      <img width="500px" length="250px" :src="n.pictureUrl" /><br />
      <button @click="likeNews(n)">
        Количество лайков: {{ n.likes.length }}</button
      ><br />

      <button
        v-if="!n.showComments"
        @click="n.isCommentsLoaded ? (n.showComments = true) : loadComments(n)"
        style="display: block; margin-top: 15px; margin: 0 auto"
      >
        Показать комметарии
      </button>

      <button
        v-if="n.showComments"
        @click="n.showComments = false"
        style="display: block; margin-top: 15px; margin: 0 auto"
      >
        Скрыть комментарии
      </button>

      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          padding: 15px;
          margin-top: 20px;
          border: 2px solid white;
          width: 70%;
        "
        v-if="n.showComments"
      >
        <button
          style="display: block; margin-top: 15px"
          v-if="n.comments.length < n.countOfComments"
          @click="loadComments(n)"
        >
          Показать предыдущие комментарии
        </button>

        <div v-for="c in sortedComments(n)">
          {{ c.textComment }}
        </div>

        <textarea
          v-model="comment"
          style="margin-top: 15px"
          placeholder="Введите комментарий"
          cols="40"
          rows="5"
        ></textarea>
        <button
          style="display: block; margin-top: 15px"
          @click="saveCommentForNews(n)"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { likesService } from "../services/LikesService";
import { userService } from "../services/UserService";
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";

export default {
  components: {},
  data() {
    return {
      userStore: useUserStore(),
      newsStore: useNewsStore(),
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
        await this.newsStore.saveCommentForNews(news, this.comment);
        // console.log(news.comments);
        this.comment = "";
      } catch (error) {
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
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

<style scoped lang="scss"></style>
../services/LikesService
