<template>
  <div сlass="d-flex flex-column" v-if="post.showComments">
    <span
      class="cursor-pointer text-decoration-underline"
      v-if="post.comments.length < post.countOfComments"
      @click="loadComments(post)"
    >
      Показать предыдущие комментарии
    </span>

    <!-- style="
        display: flex;
        border: 2px solid white;
        margin-top: 15px;
        width: 100%;
      " -->
    <div v-for="comment in sortedComments(post)">
      <comment-item :comment="comment" @deleteComment="this.deleteComment" />
    </div>

    <enter-comment-item
      v-model:comment="this.comment"
      @enterComment="this.saveComment"
    />

    {{ this.comment }}
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";
import AppButton from "./UI/AppButton.vue";
import CommentItem from "./CommentItem.vue";
import EnterCommentItem from "./EnterCommentItem.vue";

export default {
  name: "comment-list",

  components: { AppButton, CommentItem, EnterCommentItem },

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

  methods: {
    async loadComments() {
      try {
        await this.newsStore.loadCommentsForNews(this.post);
      } catch (error) {
        console.log(error);
        alert("Не удалось загрузить комментарии");
      }
    },

    async saveComment() {
      try {
        console.log(this.comment);
        await this.newsStore.saveCommentForNews(
          this.post,
          this.comment,
          this.userStore
        );
        this.comment = "";
      } catch (error) {
        console.log(error);
        console.log(
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
        console.log(error);
        console.log("Не удалось удалить комментарий");
      }
    },

    sortedComments() {
      return this.post.comments.sort(
        (c1, c2) => c1.datePublishedComment - c2.datePublishedComment
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
