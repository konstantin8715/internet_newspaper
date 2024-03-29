<template>
  <app-button v-if="this.userStore.isAdmin" @click="this.open = true">
    Изменить новость
  </app-button>

  <v-dialog v-model="open" width="auto">
    <div class="dialog-block mx-auto pa-8 overflow-auto">
      <div class="d-flex flex-column">
        <span>Заголовок новости:</span>
        <app-input
          class="auth-input mt-1"
          :value="this.title"
          @update:value="this.title"
          type="text"
          placeholder="Введите заголовок новости"
        />
        <app-warning-text v-if="!this.isValidTitle && this.isTitleChanged">
          Название не должно быть пустым
        </app-warning-text>
      </div>

      <div class="d-flex flex-column">
        <span>Текст новости:</span>
        <app-textarea
          class="post-text mt-1"
          :value="this.text"
          @update:value="this.text"
          type="text"
          placeholder="Введите текст новости"
        />
        <app-warning-text v-if="!this.isValidText && this.isTextChanged">
          Текст новости не должен быть пустым
        </app-warning-text>
      </div>

      <div class="d-flex flex-column">
        <span>Ссылка на изображение:</span>
        <app-input
          class="auth-input mt-1"
          :value="this.pictureUrl"
          @update:value="this.pictureUrl"
          type="text"
          placeholder="Вставьте ссылку на изображение"
        />
      </div>

      <img class="post-img d-block mt-4 mx-auto w-50 h-50" :src="pictureUrl" />

      <app-button
        class="ms-auto"
        @click="$emit('enterDialog', title, text, pictureUrl)"
      >
        {{ this.enterText }}
      </app-button>
      <app-button class="ms-auto" @click="this.open = false">
        Отмена
      </app-button>
    </div>
  </v-dialog>
</template>

<script>
import { useUserStore } from "../../stores/UserStore";

export default {
  name: "app-dialog",
  props: {
    title: {
      type: String,
      requiered: false,
    },

    text: {
      type: String,
      requiered: false,
    },

    pictureUrl: {
      type: String,
      requiered: false,
    },

    enterText: {
      type: String,
      requiered: true,
    },
  },

  data() {
    return {
      userStore: useUserStore(),
      open: false,
      isTitleChanged: false,
      isTextChanged: false,
    };
  },

  created() {},

  computed: {
    isValidTitle() {
      return this.title.length > 0;
    },

    isValidText() {
      return this.text.length > 0;
    },
  },

  watch: {
    title() {
      if (this.title.length == 0) {
        this.isTitleChanged = false;
      } else {
        this.isTitleChanged = true;
      }
    },

    text() {
      if (this.text.length == 0) {
        this.isTextChanged = false;
      } else {
        this.isTextChanged = true;
      }
    },
  },

  emits: [
    "enterDialog",
    // "closeDialog",
    // "update:title",
    // "update:text",
    // "update:pictureUrl",
  ],
};
</script>

<style scoped lang="scss">
@import "../../colors";
@import "../../font";

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
