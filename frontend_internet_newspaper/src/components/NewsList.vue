<template>
  <template v-if="this.newsStore.hasNews">
    <div class="post" v-for="post in this.newsStore.news" :key="post.id">
      <news-item :post="post" />
    </div>
    <news-change-block
      class="d-flex justify-center mt-8 pb-8"
      :action="'Добавить новость'"
      @enterDialog="createNews"
    />
  </template>
  <div v-else class="d-flex justify-center align-center mt-16">
    <span class="no-news-banner">Нет актуальных новостей</span>
  </div>
</template>

<script>
import NewsItem from "./NewsItem.vue";
import { useNewsStore } from "../stores/NewsStore";
import NewsChangeBlock from "./NewsChangeBlock.vue";

export default {
  name: "news-list",
  components: { NewsItem, NewsChangeBlock },
  data() {
    return {
      newsStore: useNewsStore(),
    };
  },

  methods: {
    async createNews(title, text, pictureUrl) {
      try {
        const createdNews = {
          newsTitle: title,
          newsText: text,
          picture: {
            url: pictureUrl,
          },
        };
        await this.newsStore.createNews(createdNews, this.userStore);
        this.getFreshNews();
      } catch (error) {
        console.log(error);
        alert("Не удалось создать новость");
      }
    },

    async getFreshNews() {
      try {
        await this.newsStore.loadNews();
      } catch (error) {
        alert("Ошибка при загрузке новостей");
      }
    },
  },
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

.no-news-banner {
  font-size: $banner-text;
  color: $dark-primary;
}
</style>
