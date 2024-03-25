<template>
  <div class="main-block">
    <div class="content-container d-flex justify-space-between align-center">
      <span class="logo text-uppercase">Новости</span>
      <div v-if="user.isUser">
        <svg-icon type="mdi" :path="path"></svg-icon>
        <span class="profile-text mr-6"
          >{{ user.name }} {{ user.surname }}</span
        >
        <v-btn class="btn" @click="$emit('signOut')">
          Выйти
          <template v-slot:append>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-btn>
      </div>
      <div v-else>
        <v-btn class="btn mr-2" @click="$router.push('login')">Войти</v-btn>
        <v-btn class="btn" @click="$router.push('signup')"
          >Зарегистрироваться</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-header",
  props: {
    user: {
      type: Object,
      requiered: true,
    },
  },

  emits: ["signOut"],
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

.btn {
  background: $text;
  color: $dark-text;
  font-size: $small-text;
}

.profile-text {
  color: $dark-text;
  font-size: $large-text;
}
</style>
