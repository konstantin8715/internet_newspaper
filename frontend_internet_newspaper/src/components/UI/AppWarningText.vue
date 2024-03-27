<template>
  <span class="warning-text mt-1">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "app-warning-text",
};
</script>

<style scoped lang="scss">
@import "../../colors";
@import "../../font";

.warning-text {
  font-size: $small-text;
  color: red;
}
</style>
