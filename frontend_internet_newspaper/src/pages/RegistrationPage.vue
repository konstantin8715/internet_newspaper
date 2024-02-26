<template>
  <!-- TODO: Сделать валидацию -->
  <input
    style="width: 500px; height: 100px; font-size: 32px"
    v-model="name"
    type="text"
    placeholder="Введите имя"
  />
  <input
    style="width: 500px; height: 100px; display: block; font-size: 32px"
    v-model="surname"
    type="text"
    placeholder="Введите фамилию"
  />
  <input
    style="width: 500px; height: 100px; font-size: 32px"
    v-model="email"
    type="text"
    placeholder="Введите email"
  />
  <input
    style="width: 500px; height: 100px; display: block; font-size: 32px"
    v-model="password"
    type="text"
    placeholder="Введите пароль"
  />
  <div v-if="showErrorMessage">Пользователь с такой почтой уже существует</div>
  <button style="margin-top: 15px" @click="signup">Зарегистрироваться</button>
</template>

<script>
import { authenticationApi } from "../api/AuthenticationApi";

export default {
  components: {},
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      showErrorMessage: false,
    };
  },

  methods: {
    signup() {
      authenticationApi
        .signUp(this.name, this.surname, this.email, this.password)
        .catch((err) => {
          if (
            err.response.data.email ===
            "User with email kostya.ignatev.14@mail.ru already exists"
          )
            this.showErrorMessage = true;
          else {
            this.showErrorMessage = false;
            alert("Ошибка при отправке запроса на сервер. Попробуйте еще раз.");
          }
        });
    },
  },
};
</script>

<style scoped lang="scss"></style>
