<template>
  <div>
    <div style="width: 100%">
      {{ comment.textComment }}
    </div>
    <button
      v-if="comment.user.id == this.userStore.id || this.userStore.isAdmin"
      @click="$emit('deleteComment', comment)"
    >
      Удалить
    </button>
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

  components: {AppButton},

  data() {
    return {
      userStore: useUserStore(),
    };
  },

  emits: ["deleteComment"],
};
</script>

<style scoped lang="scss"></style>
