<template>
  <div>
    <app-button
      v-if="this.userStore.isAdmin"
      color="red-darken-4"
      @click="this.open = true"
    >
      {{ action }}
    </app-button>

    <v-dialog v-model="open" width="auto">
      <div class="dialog-block mx-auto pa-6 overflow-auto">
        <div>Вы действительно хотите удалить эту новость</div>

        <div class="mt-4 d-flex justify-end">
          <app-button
            @click="
              $emit('enterDialog');
              this.open = false;
            "
            color="red-darken-4"
          >
            Удалить новость
          </app-button>

          <app-button class="ml-2" @click="this.open = false">
            Отмена
          </app-button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';

export default {
  name: "news-delete-block",

  props: {
    action: {
      type: String,
      requiered: true,
    },
  },

  data() {
    return {
      open: false,
      userStore: useUserStore(),
    };
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
../helpers/TitleValidator
