<template>
  <div>
    <h3>
      {{ post.newsTitle }} <span style="color: red">id: {{ post.id }}</span>
    </h3>
    <div>{{ post.newsText }}</div>
    <img width="500px" length="250px" :src="post.picture.url" /><br />
    <app-button @click="likeNews"
      >Количество лайков: {{ post.likes.length }}</app-button
    ><br />

    <comments-list :post="post" />
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";
import AppButton from "./UI/AppButton.vue";
import CommentsList from "./CommentsList.vue";

export default {
  name: "news-item",
  components: { AppButton, CommentsList },

  props: {
    post: {
      type: Object,
      requiered: true,
    },
  },

  data() {
    return {
      userStore: useUserStore(),
      newsStore: useNewsStore(),
    };
  },

  methods: {
    async likeNews() {
      try {
        await this.newsStore.saveLikeForNews(this.post, this.userStore);
      } catch (error) {
        console.log(error);
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
