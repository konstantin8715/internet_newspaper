<template>
  <textarea
    ref="textarea"
    class="app-textarea w-100 pa-4"
    :value="value"
    @input="
      $emit('update:value', $event.target.value);
      resize();
    "
  ></textarea>
</template>

<script>
export default {
  name: "app-textarea",
  props: {
    value: {
      type: String,
      requiered: true,
    },
  },

  mounted() {
    this.resize();
  },

  methods: {
    resize() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto"; // Установка высоты textarea в автоматический режим
      textarea.style.height = textarea.scrollHeight + "px";
    },
  },

  emits: ["update:value"],
};
</script>

<style scoped lang="scss">
@import "../../colors";
@import "../../font";

.app-textarea {
  background: $primary;
  resize: none;
  outline: none;
  border: 1px solid $light-primary;
  font-size: $medium-text;
  border-radius: 5px;
  color: $text;
}

.app-textarea::placeholder {
  font-size: $medium-text;
  color: $text;
  font-family: "Roboto";
}
</style>
