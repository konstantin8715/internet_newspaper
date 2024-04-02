<template>
  <div class="content-container">
    <div class="admin-buttons d-flex justify-end">
      <news-change-block
        :action="'Изменить новость'"
        :title="post.newsTitle"
        :text="post.newsText"
        :pictureUrl="post.picture.url"
        @enterDialog="updateNews"
      />

      <app-button
        v-if="this.userStore.isAdmin"
        @click="deleteNews"
        class="ml-2"
        color="red-darken-4"
      >
        Удалить новость
      </app-button>
    </div>

    <h1 class="post-title mt-2">{{ post.newsTitle }}</h1>
    <div class="post-text mt-4">
      <span>
        {{ this.firstHalfOfPostText
        }}<!--
        --><span v-if="post.newsText.length > 300 && !post.showFullText"
          >...</span
        >
        <span
          class="post-text-button text-decoration-underline cursor-pointer"
          @click="showHiddenText"
          v-if="post.newsText.length > 300 && !post.showFullText"
          >Показать больше</span
        >
      </span>
      <span v-if="post.showFullText">
        {{ this.secondHalfOfPostText }}
      </span>
    </div>

    <img class="post-img d-block mt-4 mx-auto" :src="post.picture.url" />

    <div class="d-flex mt-4 flex-column">
      <div class="d-flex justify-space-between align-end">
        <div>
          <v-btn class="post-like w-20" @click="likeNews">
            <v-icon
              v-if="!this.userStore.isUser"
              icon="mdi-heart-remove-outline"
            />
            <v-icon v-else-if="this.isCurrentUserLikedPost" icon="mdi-heart" />
            <v-icon v-else icon="mdi-heart-outline" />
            {{ post.likes.length }}
          </v-btn>

          <app-button
            v-if="!post.showComments"
            class="ml-4"
            @click="
              post.isCommentsLoaded
                ? (post.showComments = true)
                : loadComments(post)
            "
          >
            <v-icon icon="mdi-comment" />
          </app-button>

          <app-button
            class="ml-4"
            v-if="post.showComments"
            @click="post.showComments = false"
          >
            <v-icon icon="mdi-comment-minus" />
          </app-button>
        </div>

        <div class="post-date">
          {{ this.formattedDate }}
        </div>
      </div>

      <comments-list class="mt-4" :post="post" />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";
import CommentsList from "./CommentsList.vue";
import NewsChangeBlock from "./NewsChangeBlock.vue";
import { formatDate } from "../helpers/DataFormatter.js";

export default {
  name: "news-item",
  components: { CommentsList, NewsChangeBlock },

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

  computed: {
    isCurrentUserLikedPost() {
      return this.post.likes.find((like) => like.user.id == this.userStore.id);
    },

    formattedDate() {
      return formatDate(new Date(this.post.datePublishedNews));
    },

    firstHalfOfPostText() {
      const len = this.post.newsText.length;
      return this.post.newsText.slice(0, len / 2);
    },

    secondHalfOfPostText() {
      const len = this.post.newsText.length;
      return this.post.newsText.slice(len / 2);
    },
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

    async updateNews(title, text, pictureUrl) {
      try {
        this.post.newsTitle = title;
        this.post.newsText = text;
        this.post.picture.url = pictureUrl;
        await this.newsStore.updateNews(this.post, this.userStore);
      } catch (error) {
        console.log(error);
        alert("Не удалось обновить новость");
      }
    },

    async loadComments() {
      try {
        await this.newsStore.loadCommentsForNews(this.post);
      } catch (error) {
        console.log(error);
        alert("Не удалось загрузить комментарии");
      }
    },

    async deleteNews() {
      try {
        await this.newsStore.deleteNews(this.post.id, this.userStore);
      } catch (error) {
        alert("Не удалось удалить новость");
      }
    },

    showHiddenText() {
      this.post.showFullText = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../font";
@import "../colors";

.post-title {
  font-size: $title-text;
  color: $text;
}

.post-text {
  font-size: $medium-text;
  word-wrap: break-word;
  white-space: pre-line;
  overflow: hidden;
}

.post-img {
  max-width: 100%;
}

.post-like {
  background: $text;
  color: $dark-text;
  font-size: $small-text;
}

.post-date {
  color: $light-primary;
  font-size: $small-text;
}

.post-text-button {
  color: $light-primary;
}
</style>
