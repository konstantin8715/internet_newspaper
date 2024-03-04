<template>
  <div>
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
import { newsApi } from "../api/NewsApi";
import { likesApi } from "../api/LikesApi";
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
    likeNews(id) {
      likesApi.likeNews(id).then((r) => {
        console.log(r);
      });
    },
  },

  created() {
    newsApi.getFreshNews().then((r) => {
      console.log(r);
      this.news = r.data;
    });
    this.userStore.loadUser();
  },
};
</script>

<style scoped lang="scss"></style>
