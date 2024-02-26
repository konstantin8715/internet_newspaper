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
import { authenticationApi } from "../api/AuthenticationApi";
import { useUserStore } from "../stores/UserStore";

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
    signin() {
      authenticationApi
        .signIn(this.email, this.password)
        .then((r) => {
          console.log(r.data);
          this.userStore.saveUser(r.data.name, r.data.surname, r.data.roles);
          this.userStore.saveTokensForUser(r.data.accessToken, r.data.refreshToken);
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang="scss"></style>
