<template>
  <div>
    {{ this.userStore.name }}
    {{ this.userStore.surname }}
    {{ this.userStore.roles }}
  </div>
  <div class="container">
    <button @click="$router.push('login')">Log in</button>
    <button @click="$router.push('signup')">Sign up</button>
    <div class="news" v-for="n in news" :key="n.id">
      <div>{{ n.id }}</div>
      <h1>{{ n.newsTitle }}</h1>
      <div>{{ n.newsText }}</div>
      <img :src="n.picture.url" />
      <button @click="">count of likes</button>
    </div>
  </div>
</template>

<script>
import { newsApi } from "../api/NewsApi";
import { useUserStore } from "../stores/UserStore";

export default {
  components: {},
  data() {
    return {
      news: [],
      userStore: useUserStore(),
    };
  },

  methods: {},

  created() {
    newsApi.getFreshNews().then((response) => (this.news = response.data));
    this.userStore.loadUser();
  },
};
</script>

<style scoped lang="scss"></style>
