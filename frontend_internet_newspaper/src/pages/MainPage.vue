<template>
  <div v-if="this.userStore.isUser">
    {{ this.userStore.name }}
    {{ this.userStore.surname }}
    <button @click="signOut">Выйти</button>
  </div>
  <div v-else>
    <button @click="$router.push('login')">Войти</button>
    <button @click="$router.push('signup')">Зарегистрироваться</button>
  </div>
  <div class="container">
    <div
      class="news"
      v-for="n in this.newsStore.news"
      :key="n.id"
      style="border: solid red; margin-top: 20px; padding: 25px"
    >
      <!-- Изменение новости -->
      <v-btn v-if="this.userStore.isAdmin" @click="openDialog(n)"
        >Изменить новость</v-btn
      >

      <v-dialog v-model="n.change" width="auto">
        <v-card max-width="700" prepend-icon="mdi-update" title="Update news">
          <input v-model="this.updateTitle" />
          <textarea v-model="this.updateText" cols="100" rows="40"></textarea>
          <template v-slot:actions>
            <v-btn class="ms-auto" @click="updateNews(n)"
              >Подтвердить изменения</v-btn
            >
            <v-btn class="ms-auto" @click="n.change = false">Отмена</v-btn>
          </template>
        </v-card>
      </v-dialog>
      <!-- Изменение новости -->

      <div v-if="this.userStore.isAdmin">
        <button @click="deleteNews(n)">Удалить новость</button>
      </div>

      <h3>
        {{ n.newsTitle }} <span style="color: red">id: {{ n.id }}</span>
      </h3>
      <div>{{ n.newsText }}</div>
      <img width="500px" length="250px" :src="n.picture.url" /><br />
      <button @click="likeNews(n)">
        Количество лайков: {{ n.likes.length }}</button
      ><br />

      <button
        v-if="!n.showComments"
        @click="n.isCommentsLoaded ? (n.showComments = true) : loadComments(n)"
        style="display: block; margin-top: 15px; margin: 0 auto"
      >
        Показать комметарии
      </button>

      <button
        v-if="n.showComments"
        @click="n.showComments = false"
        style="display: block; margin-top: 15px; margin: 0 auto"
      >
        Скрыть комментарии
      </button>

      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          padding: 15px;
          margin-top: 20px;
          border: 2px solid white;
          width: 70%;
        "
        v-if="n.showComments"
      >
        <button
          style="display: block; margin-top: 15px"
          v-if="n.comments.length < n.countOfComments"
          @click="loadComments(n)"
        >
          Показать предыдущие комментарии
        </button>

        <div
          style="
            display: flex;
            border: 2px solid white;
            margin-top: 15px;
            width: 100%;
          "
          v-for="c in sortedComments(n)"
        >
          <div style="width: 100%">
            {{ c.textComment }}
          </div>
          <button
            v-if="c.user.id == this.userStore.id || this.userStore.isAdmin"
            @click="deleteComment(n, c)"
          >
            Удалить
          </button>
        </div>

        <textarea
          v-model="comment"
          style="margin-top: 15px"
          placeholder="Введите комментарий"
          cols="40"
          rows="5"
          v-if="this.userStore.isUser && this.userStore.roles"
        ></textarea>
        <button
          style="display: block; margin-top: 15px"
          @click="saveCommentForNews(n)"
          v-if="this.userStore.isUser && this.comment"
        >
          Отправить
        </button>
      </div>
    </div>
    <!-- Добавление новости -->
    <v-btn v-if="this.userStore.isAdmin" @click="this.createNewsFlag = true"
      >Добавить новость</v-btn
    >

    <v-dialog v-model="this.createNewsFlag" width="auto">
      <v-card max-width="700" prepend-icon="mdi-update" title="Update news">
        <input v-model="this.createNewsTitle" />
        <textarea v-model="this.createNewsText" cols="100" rows="40"></textarea>
        <input v-model="this.createNewsPictureUrl" placeholder="pictureUrl" />
        <template v-slot:actions>
          <v-btn class="ms-auto" @click="createNews()"
            >Подтвердить изменения</v-btn
          >
          <v-btn class="ms-auto" @click="this.createNewsFlag = false"
            >Отмена</v-btn
          >
        </template>
      </v-card>
    </v-dialog>
    <!-- Добавление новости -->
  </div>
</template>

<script>
import { likesService } from "../services/LikesService";
import { userService } from "../services/UserService";
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";

export default {
  components: {},
  data() {
    return {
      userStore: useUserStore(),
      newsStore: useNewsStore(),
      updateTitle: "",
      updateText: "",
      createNewsFlag: false,
      createNewsTitle: "",
      createNewsText: "",
      createNewsPictureUrl: "",
      comment: "",
    };
  },

  methods: {
    async likeNews(news) {
      try {
        await this.newsStore.saveLikeForNews(news, this.userStore);
      } catch (error) {
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
      }
    },

    async getFreshNews() {
      try {
        await this.newsStore.loadNews();
      } catch (error) {
        alert("Ошибка при загрузке новостей");
      }
    },

    async loadComments(news) {
      try {
        await this.newsStore.loadCommentsForNews(news);
      } catch (error) {
        console.log(error);
        alert("Не удалось загрузить комментарии");
      }
    },

    async saveCommentForNews(news) {
      try {
        await this.newsStore.saveCommentForNews(
          news,
          this.comment,
          this.userStore
        );
        this.comment = "";
      } catch (error) {
        console.log(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
      }
    },

    async deleteComment(news, comment) {
      try {
        if (this.userStore.isAdmin) {
          await this.newsStore.adminDeleteCommentForNews(
            news,
            comment.id,
            this.userStore
          );
        } else {
          await this.newsStore.deleteCommentForNews(
            news,
            comment.id,
            this.userStore
          );
        }
      } catch (error) {
        console.log("Не удалось удалить комментарий");
      }
    },

    openDialog(news) {
      news.change = true;
      this.updateTitle = news.newsTitle;
      this.updateText = news.newsText;
    },

    async updateNews(news) {
      try {
        news.newsTitle = this.updateTitle;
        news.newsText = this.updateText;
        await this.newsStore.updateNews(news, this.userStore);
        this.newsTitle = "";
        this.newsText = "";
        news.change = false;
      } catch (error) {
        console.log(error);
        alert("Не удалось обновить новость");
      }
    },

    async createNews() {
      try {
        const createdNews = {
          newsTitle: this.createNewsTitle,
          newsText: this.createNewsText,
          picture: {
            url: this.createNewsPictureUrl,
          },
        };
        await this.newsStore.createNews(createdNews, this.userStore);
        this.createNewsTitle = "";
        this.createNewsText = "";
        this.createNewsPictureUrl = "";
        this.createNewsFlag = false;
        this.getFreshNews();
      } catch (error) {
        console.log(error);
        alert("Не удалось создать новость");
      }
    },

    async deleteNews(news) {
      try {
        await this.newsStore.deleteNews(news.id, this.userStore);
      } catch (error) {
        alert("Не удалось удалить новость");
      }
    },

    sortedComments(n) {
      return n.comments.sort(
        (c1, c2) => c1.datePublishedComment - c2.datePublishedComment
      );
    },

    async signOut() {
      try {
        await this.userStore.signOut();
      } catch (error) {
        alert("Не удалось выйти");
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

<style scoped lang="scss"></style>
../services/LikesService
