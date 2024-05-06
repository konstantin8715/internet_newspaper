<template>
  <div class="d-flex flex-column">
    <app-button
      class="mt-6"
      :disabled="isValid"
      @click="$emit('confirm')"
    >
      {{ text }}
    </app-button>
    <app-warning-text v-if="showErrorMessage">
      {{ warningText }}
    </app-warning-text>
  </div>
</template>

<script>
export default {
  name: "form-confirm-button",
  props: {
    isValidName: {
      type: Boolean,
      requiered: true,
    },

    isValidSurname: {
      type: Boolean,
      requiered: true,
    },

    isValidEmail: {
      type: Boolean,
      requiered: true,
    },

    isValidPassword: {
      type: Boolean,
      requiered: true,
    },

    isPasswordsMatched: {
      type: Boolean,
      requiered: true,
    },

    text: {
      type: String,
      requiered: true,
    },

    warningText: {
      type: String,
      requiered: true,
    },

    showErrorMessage: {
      type: Boolean,
      requiered: false,
    },
  },

  computed: {
    isValid() {
      if (this.isValidName == undefined && this.isValidSurname == undefined) {
        return !this.isValidEmail || !this.isValidPassword;
      } else {
        return (
          !this.isValidEmail ||
          !this.isValidPassword ||
          !this.isValidName ||
          !this.isValidSurname ||
          !this.isPasswordsMatched
        );
      }
    },
  },

  emits: ["confirm"],
};
</script>
