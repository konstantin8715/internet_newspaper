<template>
  <div class="d-flex flex-column">
    <span>{{ title }}</span>
    <app-input
      class="auth-input mt-1"
      :value="value"
      @update:value="
        value = $event;
        $emit('updateField', this.isValid);
        $emit('enterField', this.value);
      "
      :type="type"
      :placeholder="placeholderText"
    />
    <app-warning-text v-if="!this.isValid && this.isChanged">
      {{ warningText }}
    </app-warning-text>
  </div>
</template>

<script>
export default {
  name: "form-field",
  props: {
    title: {
      type: String,
      requiered: true,
    },

    warningText: {
      type: String,
      requiered: true,
    },

    placeholderText: {
      type: String,
      requiered: false,
    },

    type: {
      type: String,
      requiered: true,
    },

    validator: {
      type: Function,
      requiered: false,
    },
  },

  data() {
    return {
      value: "",
      isChanged: false,
    };
  },

  computed: {
    isValid() {
      console.log(this.validator(this.value));
      return this.validator(this.value);
    },
  },

  watch: {
    value() {
      if (this.value.length == 0) {
        this.isChanged = false;
      } else {
        this.isChanged = true;
      }
      // this.isChanged = this.value.length == 0;
    },
  },

  emits: ["updateField", "enterField"],
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
