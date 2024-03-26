<template>
  <div
    class="post"
    v-for="post in this.newsStore.news"
    :key="post.id"
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

<style scoped lang="scss">
@import "../colors";
@import "../font";

.post {
  background: $dark-primary;
  color: $text;
  width: 100%;
  margin-top: 20px;
  padding: 30px 0;
  border-radius: 5px;
}
</style>
