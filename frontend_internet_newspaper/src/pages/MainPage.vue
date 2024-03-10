<template>
  <div
    v-if="this.userStore.name && this.userStore.surname && this.userStore.roles"
  >
    {{ this.userStore.name }}
    {{ this.userStore.surname }}
    {{ this.userStore.roles }}
  </div>
  <div class="container">
    <button @click="$router.push('login')">Log in</button>
    <button @click="$router.push('signup')">Sign up</button>
    <div
      class="news"
      v-for="n in news"
      :key="n.id"
      style="border: solid red; margin-top: 20px"
    >
      <h3>{{ n.newsTitle }}</h3>
      <div>{{ n.newsText }}</div>
      <img width="500px" length="250px" :src="n.picture.url" /><br />
      <button @click="likeNews(n)">
        Количество лайков: {{ n.likes.length }}
      </button>
    </div>
  </div>
</template>

<script>
import { newsService } from "../services/NewsService";
import { likesService } from "../services/LikesService";
import { userService } from "../services/UserService";
import { useUserStore } from "../stores/UserStore";

export default {
  components: {},
  data() {
    return {
      news: [],
      userStore: useUserStore(),
    };
  },

  methods: {
    async likeNews(news) {
      try {
        await likesService.saveLike(news, this.userStore);
        this.getFreshNews();
      } catch (error) {
        // this.$router.push("/login");
        alert("Пользователь не авторизован, либо срок действия токенов истек");
      }
    },
    
    async getFreshNews() {
      try {
        this.news = await newsService.getFreshNews();
      } catch (error) {
        alert("Ошибка при загрузке новостей");
      }
    },
  },

  created() {
    this.userStore.loadUserFromLocalStorage();
    this.getFreshNews();
  },
};
</script>

<style scoped lang="scss"></style>
../services/LikesService
