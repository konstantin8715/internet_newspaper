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
  <div v-if="showErrorMessage">
    Ошибка при отправке запроса на сервер или пользователь с данной почтой уже
    сущестует. Попробуйте еще раз.
  </div>
  <button style="margin-top: 15px" @click="signup">Зарегистрироваться</button>
</template>

<script>
import { userService } from "../services/UserService";

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
    async signup() {
      try {
        await userService.signUp(this.name, this.surname, this.email, this.password);
        this.$router.push('login')
        alert('Вы успешно зарегистрировались. Авторизуйтесь.');
      } catch (error) {
        this.showErrorMessage = true;
      }
      // authenticationApi
      //   .signUp(this.name, this.surname, this.email, this.password)
      //   .then(() => this.$router.push('login'))
      //   .catch((err) => {
      //     console.log(err);
      //     alert(
      //       "Ошибка при отправке запроса на сервер или пользователь с данной почтой уже сущестует. Попробуйте еще раз."
      //     );
      //   });
    },
  },
};
</script>

<style scoped lang="scss"></style>
