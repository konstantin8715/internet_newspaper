<template>
  <div class="main-block">
    <div class="content-container d-flex justify-space-between align-center">
      <span class="logo text-uppercase">Новости</span>
      <div v-if="this.userStore.isUser">
        <span class="profile-text mr-6"
          >{{ this.userStore.name }} {{ this.userStore.surname }}
        </span>
        <app-button @click="signOut"> Выйти </app-button>
      </div>
      <div v-else>
        <app-button class="mr-2" @click="$router.push('login')">
          Войти
        </app-button>
        <app-button @click="$router.push('signup')">Регистрация</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import AppButton from "./UI/AppButton.vue";

export default {
  name: "main-header",

  components: { AppButton },

  data() {
    return {
      userStore: useUserStore(),
    };
  },

  methods: {
    async signOut() {
      try {
        await this.userStore.signOut();
      } catch (error) {
        alert("Не удалось выйти");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../colors";
@import "../font";

.main-block {
  background: $primary;
  height: 50px;
  border-radius: 5px;
}

.logo {
  font-size: $logo;
  font-weight: 700;
}

.profile-text {
  color: $dark-text;
  font-size: $large-text;
}
</style>
