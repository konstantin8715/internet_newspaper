<template>
  <div class="comment d-flex flex-column mt-4">
    <div class="d-flex justify-space-between">
      <div class="comment-author">{{ comment.user.name }} {{ comment.user.surname }}</div>
      <span
        v-if="comment.user.id == this.userStore.id || this.userStore.isAdmin"
        @click="$emit('deleteComment', comment)"
        class="comment-delete text-decoration-underline cursor-pointer"
      >
        Удалить
      </span>
    </div>

    <div class="comment-data d-flex justify-space-between align-end">
      <div class="comment-data-text w-75">
        <p>
          {{ comment.textComment }}
        </p>
      </div>
      <div class="comment-date">{{ this.formattedDate }}</div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import AppButton from "./UI/AppButton.vue";

export default {
  name: "comment-item",
  props: {
    comment: {
      type: Object,
      requiered: true,
    },
  },

  components: { AppButton },

  data() {
    return {
      userStore: useUserStore(),
    };
  },

  computed: {
    formattedDate() {
      const date = new Date(this.comment.datePublishedComment);
      return date.toLocaleString("ru-RU", {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },

  emits: ["deleteComment"],
};
</script>

<style scoped lang="scss">
@import "../font";
@import "../colors";

.comment {
  border-bottom: 1px solid $light-primary;
  color: $text;
  font-size: $medium-text;
}

.comment-author, .comment-date, .comment-delete {
  color: $light-primary;
  font-size: $small-text;
}

.comment-data-text {
  word-wrap: break-word;
  white-space: pre-line;
}
</style>
