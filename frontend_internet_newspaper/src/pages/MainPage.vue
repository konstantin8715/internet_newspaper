<template>
  <!-- TODO: Сделать то, что в v-if getterом в UserStore -->
  <div
    v-if="this.userStore.name && this.userStore.surname && this.userStore.roles"
  >
    {{ this.userStore.name }}
    {{ this.userStore.surname }}
    <button @click="signOut">Sign out</button>
  </div>
  <div v-else>
    <button @click="$router.push('login')">Log in</button>
    <button @click="$router.push('signup')">Sign up</button>
  </div>
  <div class="container">
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

    async signOut() {
      try {
        await userService.signOut();
      } catch (error) {
        alert("Не удалось выйти");
      }
    }
  },

  async created() {
    try {
      await userService.refreshToken(this.userStore);
      this.userStore.loadUserFromLocalStorage();
    }
    catch {
      alert("Пользователь не авторизован, либо срок действия токенов истек");
    }
    finally {
      this.getFreshNews();
    }
  },
};
</script>

<style scoped lang="scss"></style>
../services/LikesService
