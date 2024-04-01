<template>
  <div>
    <app-button :disabled="isValid" @click="$emit('confirm')">
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

    isValidUrl: {
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
      return !this.isValidTitle || !this.isValidText || !this.isValidUrl;
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
