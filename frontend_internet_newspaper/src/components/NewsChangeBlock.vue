<template>
  <app-button v-if="this.userStore.isAdmin" @click="this.open = true">
    {{ action }}
  </app-button>

  <v-dialog v-model="open" width="auto">
    <div class="dialog-block mx-auto pa-8 overflow-auto">
      <form-field
        :title="'Заголовок:'"
        :type="'text'"
        :placeholderText="'Введите загловок'"
        :validator="this.textValidator"
        :warningText="'Заголовок должно иметь длину минимум 2 символа'"
        @updateField="this.isValidTitle = $event"
        :value="this.title"
        @enterField="this.title = $event"
      />

      <form-field
        :title="'Текст:'"
        :type="'textarea'"
        :placeholderText="'Введите текст новости'"
        :validator="this.textValidator"
        :warningText="'Текст новости не должен быть пустым и должен иметь длину минимум 2 символа'"
        @updateField="this.isValidText = $event"
        :value="this.text"
        @enterField="this.text = $event"
      />

      <form-field
        :title="'Ссылка на изображение:'"
        :type="'text'"
        :placeholderText="'Вставьте ссылку на изображение'"
        :value="this.pictureUrl"
        @enterField="this.pictureUrl = $event"
      />

      <img class="post-img d-block mt-4 mx-auto w-50 h-50" :src="pictureUrl" />

      <news-confirm-button
        class="ms-auto"
        :isValidTitle="this.isValidTitle"
        :isValidText="this.isValidText"
        :text="action"
        @confirm="$emit('enterDialog', title, text, pictureUrl)"
      />

      <app-button class="ms-auto" @click="this.open = false">
        Отмена
      </app-button>
    </div>
  </v-dialog>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import FormField from "./FormField.vue";
import NewsConfirmButton from "./NewsConfirmButton.vue";
import { validateText } from "../helpers/TextValidator";

export default {
  name: "news-change-block",

  components: { FormField, NewsConfirmButton },

  props: {
    action: {
      type: String,
      requiered: true,
    },

    title: {
      type: String,
      requiered: true,
    },

    text: {
      type: String,
      requiered: true,
    },

    pictureUrl: {
      type: String,
      requiered: true,
    },

    // enterText: {
    //   type: String,
    //   requiered: true,
    // },
  },

  data() {
    return {
      userStore: useUserStore(),
      open: false,
      textValidator: validateText,
      isValidTitle: false,
      isValidText: false,
    };
  },

  emits: [
    "enterDialog"
  ],
};
</script>

<style scoped lang="scss">
@import "../colors";
@import "../font";

.dialog-block {
  width: 70%;
  height: 50%;
  margin-top: 10px;
  background: $dark-primary;
  display: flex;
  flex-direction: column;
  color: $text;
  border-radius: 5px;
}

.post-text {
  height: 200px;
}

.post-img {
}
</style>
