<template>
  <div>
    <app-button
      v-if="!post.showComments"
      @click="
        post.isCommentsLoaded ? (post.showComments = true) : loadComments(post)
      "
      style="display: block; margin-top: 15px; margin: 0 auto"
    >
      Показать комметарии
    </app-button>

    <app-button
      v-if="post.showComments"
      @click="post.showComments = false"
      style="display: block; margin-top: 15px; margin: 0 auto"
    >
      Скрыть комментарии
    </app-button>

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
      v-if="post.showComments"
    >
      <app-button
        style="display: block; margin-top: 15px"
        v-if="post.comments.length < post.countOfComments"
        @click="loadComments(post)"
      >
        Показать предыдущие комментарии
      </app-button>

      <div
        style="
          display: flex;
          border: 2px solid white;
          margin-top: 15px;
          width: 100%;
        "
        v-for="comment in sortedComments(post)"
      >
        <comment-item :comment="comment" @deleteComment="this.deleteComment" />
      </div>

      <enter-comment-item
        :comment="this.comment"
        @enterComment="this.saveComment"
      />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";
import AppButton from "./UI/AppButton.vue";
import CommentItem from "./CommentItem.vue";
import EnterCommentItem from "./EnterCommentItem.vue";

export default {
  name: 'comment-list',

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
        await this.newsStore.saveCommentForNews(
          post,
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

    async deleteComment(comment) {
      try {
        if (this.userStore.isAdmin) {
          await this.newsStore.adminDeleteCommentForpost(
            post,
            comment.id,
            this.userStore
          );
        } else {
          await this.newsStore.deleteCommentForpost(
            post,
            comment.id,
            this.userStore
          );
        }
      } catch (error) {
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
