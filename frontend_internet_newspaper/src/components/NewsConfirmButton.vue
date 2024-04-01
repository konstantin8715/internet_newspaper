<template>
  <div class="d-flex flex-column">
    <app-button class="mt-6" :disabled="isValid" @click="$emit('confirm')">
      {{ text }}
    </app-button>
  </div>
</template>

<script>
export default {
  name: "news-confirm-button",
  props: {
    isValidTitle: {
      type: Boolean,
      requiered: true,
    },

    isValidText: {
      type: Boolean,
      requiered: true,
    },

    text: {
      type: String,
      requiered: true,
    },
  },

  computed: {
    isValid() {
      return !this.isValidTitle || !this.isValidText;
    },
  },

  emits: ["confirm"],
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

.comment-author,
.comment-date,
.comment-delete {
  color: $light-primary;
  font-size: $small-text;
}

.comment-data-text {
  word-wrap: break-word;
  white-space: pre-line;
}
</style>
