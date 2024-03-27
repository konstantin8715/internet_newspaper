<template>
  <input
    class="app-input"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script>
export default {
  name: "app-input",
  props: {
    value: {
      type: String,
      requiered: true,
    },
  },

  emits: ["update:value"],
};
</script>

<style scoped lang="scss">
@import "../../colors";
@import "../../font";

.app-input {
  font-size: $medium-text;
  color: $text;
  outline: none;
  border: 2px solid $light-primary;
  border-radius: 5px;
  padding: 10px;
}

.app-input::placeholder {
  font-size: $medium-text;
  color: $light-primary;
}
</style>
