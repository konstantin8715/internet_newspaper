<template>
  <div class="d-flex flex-column">
    <span>{{ title }}</span>
    <app-input
      v-if="type != 'textarea'"
      class="mt-1"
      :value="value"
      @update:value="
        value = $event;
        $emit('updateField', this.isValid);
        $emit('enterField', $event);
      "
      :type="type"
      :placeholder="placeholderText"
    />
    <app-textarea
      v-else
      class="mt-1"
      :value="value"
      @update:value="
        value = $event;
        $emit('updateField', this.isValid);
        $emit('enterField', $event);
      "
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

    value: {
      type: String,
      requiered: false,
      default: "",
    },
  },

  data() {
    return {
      isChanged: false,
    };
  },

  computed: {
    isValid() {
      if (this.validator) {
        return this.validator(this.value);
      }
    },
  },

  watch: {
    value() {
      if (this.value.length == 0) {
        this.isChanged = false;
      } else {
        this.isChanged = true;
      }
    },
  },

  emits: ["updateField", "enterField"],
};
</script>
