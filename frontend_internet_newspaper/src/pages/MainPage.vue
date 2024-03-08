<template>
  <div v-if="this.useUserStore.name && this.useUserStore.surname && this.useUserStore.roles">
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
      <img width="200px" length="100px" :src="n.picture.url" /><br />
      <button @click="likeNews(n.id)">Количество лайков: {{ n.likes.length }}</button>
    </div>
  </div>
</template>

<script>
import { newsService } from "../services/NewsService";
import { likesService } from "../services/LikesService";
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
        likesService.saveLike(news.id);
        news.likes.push({});
      } catch (error) {
        alert('Пользователь неавторизован');
        this.userStore.$reset();
      }
    },

  },

  async created() {
    this.userStore.loadUser();
    try {
      this.news = await newsService.getFreshNews();
    } catch (error) {
      alert('Ошибка при загрузке новостей');
    }
  },
};
</script>

<style scoped lang="scss"></style>../services/LikesService
