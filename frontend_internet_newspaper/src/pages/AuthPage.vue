<template>
  <div>
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
    <button style="margin-top: 15px" @click="signin">signin</button>
  </div>
</template>

<script>
import {authenticationApi} from "../api/AuthenticationApi";

export default {
  components: {},
  data() {
    return {
      email: "",
      password: "",
      authenticationApi,
    };
  },

  methods: {
    signin() {
      console.log(this.email);
      console.log(this.password);
      authenticationApi.signIn(this.email, this.password);
    },
  },
};
</script>

<style scoped lang="scss"></style>
