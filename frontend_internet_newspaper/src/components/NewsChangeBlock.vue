<template>
  <div>
    <app-button
      v-if="this.userStore.isAdmin"
      @click="
        this.open = true;
        this.localThemes = [...this.themes];
      "
    >
      {{ action }}
    </app-button>

    <v-dialog v-model="open" width="auto">
      <div class="dialog-block mx-auto pa-6 overflow-auto">
        <form-field
          :title="'Заголовок:'"
          :type="'text'"
          :placeholderText="'Введите загловок'"
          :validator="this.textValidator"
          :warningText="'Заголовок должно иметь длину минимум 2 символа'"
          @updateField="this.isValidTitle = $event"
          :value="this.localTitle"
          @enterField="this.localTitle = $event"
        />

        <form-field
          class="mt-2"
          :title="'Темы:'"
          :type="'text'"
          :placeholderText="'Введите тему'"
          :validator="this.textValidator"
          :warningText="'Тема должна иметь длину минимум 2 символа'"
          @updateField="this.isValidNewTheme = $event"
          :value="this.newThemeName"
          @enterField="this.newThemeName = $event"
        />

        <app-button
          class="w-25 mt-2"
          :disabled="!this.isValidNewTheme"
          @click="addTheme"
        >
          Добавить тему
        </app-button>

        <div class="mt-2">
          <v-chip
            v-for="t in this.localThemes"
            :key="t.name"
            class="ma-2"
            closable
            @click:close="deleteTheme(t)"
          >
            {{ "#" + t.name }}
          </v-chip>
        </div>

        <form-field
          class="mt-2"
          :title="'Текст:'"
          :type="'textarea'"
          :placeholderText="'Введите текст новости'"
          :validator="this.textValidator"
          :warningText="'Текст новости не должен быть пустым и должен иметь длину минимум 2 символа'"
          @updateField="this.isValidText = $event"
          :value="this.localText"
          @enterField="this.localText = $event"
        />

        <form-field
          class="mt-2"
          :title="'Ссылка на изображение:'"
          :type="'text'"
          :placeholderText="'Вставьте ссылку на изображение'"
          :validator="this.urlValidator"
          :warningText="'Ссылка должна иметь формат URL'"
          @updateField="this.isValidUrl = $event"
          :value="this.localPictureUrl"
          @enterField="this.localPictureUrl = $event"
        />

        <img class="d-block mt-4 mx-auto w-50 h-50" :src="localPictureUrl" />

        <div class="mt-4 d-flex justify-end">
          <news-confirm-button
            :isValidTitle="this.isValidTitle"
            :isValidText="this.isValidText"
            :isValidUrl="this.isValidUrl"
            :text="action"
            @confirm="
              $emit(
                'enterDialog',
                localTitle,
                localThemes,
                localText,
                localPictureUrl
              );
              this.open = false;
            "
          />

          <app-button class="ml-2" @click="this.open = false">
            Отмена
          </app-button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import FormField from "./FormField.vue";
import NewsConfirmButton from "./NewsConfirmButton.vue";
import { validateText } from "../helpers/TextValidator";
import { validateUrl } from "../helpers/UrlValidator";

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
      default: "",
    },

    themes: {
      type: Array,
      requiered: true,
      default: [],
    },

    text: {
      type: String,
      requiered: true,
      default: "",
    },

    pictureUrl: {
      type: String,
      requiered: true,
      default: "",
    },
  },

  created() {
    this.isValidTitle = this.textValidator(this.localTitle);
    this.isValidText = this.textValidator(this.localText);
    this.isValidUrl = this.textValidator(this.localPictureUrl);
  },

  data() {
    return {
      localTitle: this.title,
      localText: this.text,
      localPictureUrl: this.pictureUrl,
      localThemes: [...this.themes],
      newThemeName: "",
      userStore: useUserStore(),
      open: false,
      textValidator: validateText,
      urlValidator: validateUrl,
      isValidTitle: false,
      isValidText: false,
      isValidUrl: false,
      isValidNewTheme: false,
    };
  },

  methods: {
    deleteTheme(theme) {
      this.localThemes = this.localThemes.filter((t) => t.name != theme.name);
    },

    addTheme() {
      if (this.localThemes.find((t) => t.name == this.newThemeName)) {
        alert("Такая тема уже есть");
      } else {
        this.localThemes.push({ name: this.newThemeName });
      }
      this.newThemeName = "";
    },
  },

  emits: ["enterDialog"],
};
</script>

<style scoped lang="scss">
@import "../colors";
@import "../font";

.dialog-block {
  width: 800px;
  height: 50%;
  background: $dark-primary;
  display: flex;
  flex-direction: column;
  color: $text;
  border-radius: 5px;
}
</style>
