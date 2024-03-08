<template>
  <div>
    <!-- TODO: Сделать валидацию -->
    <input
      style="width: 500px; height: 100px; font-size: 32px"
      v-model="email"
      type="text"
    />
    <input
      style="width: 500px; height: 100px; display: block; font-size: 32px"
      v-model="password"
      type="text"
    />
    <button style="margin-top: 15px" @click="signIn">signin</button>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { userService } from '../services/UserService';

export default {
  components: {},
  data() {
    return {
      email: "",
      password: "",
      userStore: useUserStore(),
    };
  },

  methods: {

    async signIn() {
      try {
        await userService.signIn(this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        alert('Неправильное имя пользовтеля или пароль');
      }
    },

  },
};
</script>

<style scoped lang="scss"></style>
