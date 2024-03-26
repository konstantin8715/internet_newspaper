<template>
  <div>
    <textarea
      :value="comment"
      @input="$emit('update:comment', $event.target.value)"
      style="margin-top: 15px"
      placeholder="Введите комментарий"
      cols="40"
      rows="5"
      v-if="this.userStore.isUser"
    ></textarea>
    <app-button
      style="display: block; margin-top: 15px"
      @click="$emit('enterComment')"
      v-if="this.userStore.isUser && comment"
    >
      Отправить
    </app-button>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import AppButton from "./UI/AppButton.vue";

export default {
  components: { AppButton },
  name: "enter-comment-item",
  props: {
    comment: {
      type: String,
      requiered: true,
    },
  },

  components: { AppButton },

  data() {
    return {
      userStore: useUserStore(),
    };
  },

  emits: ["enterComment", "update:comment"],
};
</script>

<style scoped lang="scss"></style>
