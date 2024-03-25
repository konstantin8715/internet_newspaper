<template>
  <div
    class="news"
    v-for="post in this.newsStore.news"
    :key="post.id"
    style="border: solid red; margin-top: 20px; padding: 25px"
  >
    <news-item :post="post" />
  </div>
</template>

<script>
import NewsItem from "./NewsItem.vue";
import { useNewsStore } from "../stores/NewsStore";

export default {
  name: "news-list",
  components: { NewsItem },
  data() {
    return {
      newsStore: useNewsStore(),
    };
  },

  methods: {},
};
</script>

<style scoped lang="scss"></style>
