<template>
  <template v-if="this.newsStore.hasNews">
    <news-change-block
      class="d-flex justify-center mt-5"
      :action="'Добавить новость'"
      @enterDialog="createNews"
    />
    <div
      class="post"
      v-for="post in this.filterNewsByFavoriteForbiddenThemes"
      :key="post.id"
    >
      <news-item :post="post" />
    </div>
  </template>
  <div v-else class="d-flex justify-center align-center mt-16">
    <span class="no-news-banner">Нет актуальных новостей</span>
  </div>
</template>

<script>
import NewsItem from "./NewsItem.vue";
import { useNewsStore } from "../stores/NewsStore";
import NewsChangeBlock from "./NewsChangeBlock.vue";
import { useUserStore } from "../stores/UserStore";

export default {
  name: "news-list",
  components: { NewsItem, NewsChangeBlock },
  data() {
    return {
      newsStore: useNewsStore(),
      userStore: useUserStore(),
    };
  },

  computed: {
    filterNewsByFavoriteForbiddenThemes() {
      let news = this.newsStore.news;
      const forbiddenThemes = this.userStore.forbiddenThemes.map((n) => n.name);
      const favoriteThemes = this.userStore.favoritesThemes.map((n) => n.name);
      news = news.filter(
        (n) => !n.themes.some((t) => forbiddenThemes.includes(t.name))
      );
      return news.sort(
        (n1, n2) =>
          n2.themes.reduce((count, t) => {
            if (favoriteThemes.includes(t.name)) {
              count++;
            }
            return count;
          }, 0) -
          n1.themes.reduce((count, t) => {
            if (favoriteThemes.includes(t.name)) {
              count++;
            }
            return count;
          }, 0)
      );
    },
  },

  methods: {
    async createNews(title, themes, text, pictureUrl) {
      try {
        const createdNews = {
          newsTitle: title,
          themes: themes,
          newsText: text,
          picture: {
            url: pictureUrl,
          },
        };
        await this.newsStore.createNews(createdNews, this.userStore);
        this.getFreshNews();
      } catch (error) {
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
