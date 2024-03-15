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
      style="border: solid red; margin-top: 20px"
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
        style="display: flex; align-items: center; flex-direction: column"
        v-if="n.showComments"
      >
        <div v-for="c in n.comments">
          {{ c.textComment }}
        </div>
        <button
          style="display: block; margin-top: 15px"
          v-if="n.comments.length < n.countOfComments"
          @click="loadComments(n)"
        >
          Показать еще комментарии
        </button>

        <textarea
          v-model="comment"
          style="margin-top: 15px"
          placeholder="Введите комментарий"
          cols="40"
          rows="5"
        ></textarea>
        <button
          style="display: block; margin-top: 15px;"
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
        await likesService.saveLike(news, this.userStore);
        this.getFreshNews();
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

    async signOut() {
      try {
        await userService.signOut();
      } catch (error) {
        alert("Не удалось выйти");
      }
    },

    async loadComments(news) {
      try {
        await this.newsStore.loadCommentsForNews(news);
      } catch (error) {
        alert("Не удалось загрузить комментарии");
      }
    },

    async saveCommentForNews(news) {
      try {
        await this.newsStore.saveCommentForNews(news.id, this.comment);
        this.loadComments(news);
        this.comment = "";
      } catch (error) {
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
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
      this.getFreshNews();
    }
  },
};
</script>

<style scoped lang="scss"></style>
../services/LikesService
