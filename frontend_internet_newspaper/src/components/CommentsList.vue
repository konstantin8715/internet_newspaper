<template>
  <div сlass="d-flex flex-column" v-if="post.showComments">
    
    <div v-for="comment in sortedComments(post)" :key="comment.id">
      <comment-item :comment="comment" @deleteComment="this.deleteComment" />
    </div>

    <span
      class="cursor-pointer text-decoration-underline"
      v-if="post.comments.length < post.countOfComments"
      @click="loadComments(post)"
    >
      Показать предыдущие комментарии
    </span>

    <app-textarea
      class="mt-6 h-10"
      v-model:value="this.comment"
      placeholder="Введите комментарий"
      v-if="this.userStore.isUser"
    />
    <span v-if="this.comment.length > 1000">Слишком большой комментарий</span>
    <app-button
      class="mt-2"
      @click="this.saveComment"
      v-if="this.userStore.isUser && this.isCommentCorrect"
    >
      Отправить
    </app-button>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";
import AppButton from "./UI/AppButton.vue";
import CommentItem from "./CommentItem.vue";

export default {
  name: "comment-list",

  components: { AppButton, CommentItem },

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
      comment: "",
    };
  },

  computed: {
    isCommentCorrect() {
      return (
        this.comment.length > 0 &&
        this.comment.length <= 1000 &&
        this.comment.replace(/\s+/g, "").length > 0
      );
    },
  },

  methods: {
    async loadComments() {
      try {
        await this.newsStore.loadCommentsForNews(this.post);
      } catch (error) {
        alert("Не удалось загрузить комментарии");
      }
    },

    async saveComment() {
      try {
        await this.newsStore.saveCommentForNews(
          this.post,
          this.comment,
          this.userStore
        );
        this.comment = "";
      } catch (error) {
        alert(
          "Пользователь не авторизован, либо срок действия токенов истек"
        );
      }
    },

    async deleteComment(comment) {
      try {
        if (this.userStore.isAdmin) {
          await this.newsStore.adminDeleteCommentForNews(
            this.post,
            comment.id,
            this.userStore
          );
        } else {
          await this.newsStore.deleteCommentForNews(
            this.post,
            comment.id,
            this.userStore
          );
        }
      } catch (error) {
        alert("Не удалось удалить комментарий");
      }
    },

    sortedComments() {
      return this.post.comments.sort(
        (c1, c2) => c2.datePublishedComment - c1.datePublishedComment
      );
    },
  },
};
</script>
