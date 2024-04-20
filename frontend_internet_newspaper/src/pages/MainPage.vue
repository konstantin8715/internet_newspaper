<template>
  <div class="container">
    <main-header />
    <news-list />
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import NewsList from "../components/NewsList.vue";

import { userService } from "../services/UserService";
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";

export default {
  components: { MainHeader, NewsList },
  data() {
    return {
      userStore: useUserStore(),
      newsStore: useNewsStore(),
    };
  },

  methods: {
    async getFreshNews() {
      try {
        await this.newsStore.loadNews();
      } catch (error) {
        console.log(error);
        alert("Ошибка при загрузке новостей");
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
