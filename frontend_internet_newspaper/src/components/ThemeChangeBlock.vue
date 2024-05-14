<template>
  <div>
    <app-button @click="this.open = true"> Редактировать темы </app-button>

    <v-dialog v-model="open" width="auto">
      <div class="dialog-block mx-auto pa-6 overflow-auto">
        <form-field
          class="mt-2"
          :title="'Добавить любимую тему:'"
          :type="'text'"
          :placeholderText="'Введите тему'"
          :validator="this.textValidator"
          :warningText="'Тема должна иметь длину минимум 2 символа'"
          @updateField="this.isValidFavoriteTheme = $event"
          :value="this.favoriteTheme"
          @enterField="this.favoriteTheme = $event"
        />

        <app-button
          class="w-25 mt-2"
          :disabled="!this.isValidFavoriteTheme"
          @click="addFavoriteTheme"
        >
          Добавить тему
        </app-button>

        <div class="mt-2">
          <v-chip
            v-for="t in this.userStore.favoritesThemes"
            :key="t.name"
            class="ma-2"
            closable
            @click:close="deleteFavoriteTheme(t)"
          >
            {{ "#" + t.name }}
          </v-chip>
        </div>

        <form-field
          class="mt-2"
          :title="'Добавить нелюбимую тему:'"
          :type="'text'"
          :placeholderText="'Введите тему'"
          :validator="this.textValidator"
          :warningText="'Тема должна иметь длину минимум 2 символа'"
          @updateField="this.isValidForbiddenTheme = $event"
          :value="this.forbiddenTheme"
          @enterField="this.forbiddenTheme = $event"
        />

        <app-button
          class="w-25 mt-2"
          :disabled="!this.isValidForbiddenTheme"
          @click="addForbiddenTheme"
        >
          Добавить тему
        </app-button>

        <div class="mt-2">
          <v-chip
            v-for="t in this.userStore.forbiddenThemes"
            :key="t.name"
            class="ma-2"
            closable
            @click:close="deleteForbiddenTheme(t)"
          >
            {{ "#" + t.name }}
          </v-chip>
        </div>

        <div class="mt-4 d-flex justify-end">
          <app-button class="ml-2" @click="this.open = false; loadNews();">
            Закрыть
          </app-button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useNewsStore } from "../stores/NewsStore";
import FormField from "./FormField.vue";
import { validateText } from "../helpers/TextValidator";

export default {
  name: "theme-change-block",

  components: { FormField },

  data() {
    return {
      favoriteTheme: "",
      forbiddenTheme: "",
      isValidFavoriteTheme: false,
      isValidForbiddenTheme: false,
      userStore: useUserStore(),
      newsStore: useNewsStore(),
      open: false,
      textValidator: validateText,
    };
  },

  methods: {
    deleteFavoriteTheme(theme) {
      this.userStore.deleteFavoriteTheme(theme);
    },

    deleteForbiddenTheme(theme) {
      this.userStore.deleteForbiddenTheme(theme);
    },

    addFavoriteTheme() {
      console.log(this.userStore.favoritesThemes);
      if (
        this.userStore.favoritesThemes.find((t) => t.name == this.favoriteTheme)
      ) {
        alert("Такая тема уже есть");
      } else {
        this.userStore.addFavoriteTheme({ name: this.favoriteTheme });
      }
      this.favoriteTheme = "";
    },

    addForbiddenTheme() {
      if (
        this.userStore.forbiddenThemes.find((t) => t.name == this.forbiddenTheme)
      ) {
        alert("Такая тема уже есть");
      } else {
        this.userStore.addForbiddenTheme({ name: this.forbiddenTheme });
      }
      this.forbiddenTheme = "";
    },

    async loadNews() {
      try {
        await this.newsStore.loadNews();
      } catch (error) {
        alert("Ошибка при загрузке новостей");
      }
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
