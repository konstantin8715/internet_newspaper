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
