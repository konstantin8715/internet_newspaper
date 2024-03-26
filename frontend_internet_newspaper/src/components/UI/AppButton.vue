<template>
  <v-btn class="btn">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "app-button",
  props: {
    prop1: {
      type: String,
      requiered: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../colors';
@import '../../font';

.btn {
  background: $text;
  color: $dark-text;
  font-size: $small-text;
}
</style>
