<template>
  <div class="container">
    <div class="registration-block mx-auto pa-8">
      <div class="d-flex flex-column">
        <span>Имя:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.email"
          type="text"
          placeholder="Введите имя"
        />
        <app-warning-text v-if="!this.isValidEmail && this.isEmailChanged">
          Некорректный email
        </app-warning-text>
      </div>

      <div class="d-flex flex-column mt-4">
        <span>Фамилия:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.email"
          type="text"
          placeholder="Введите фамилию"
        />
        <app-warning-text v-if="!this.isValidEmail && this.isEmailChanged">
          Некорректный email
        </app-warning-text>
      </div>

      <div class="d-flex flex-column mt-4">
        <span>Email:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.email"
          type="text"
          placeholder="Введите email"
        />
        <app-warning-text v-if="!this.isValidEmail && this.isEmailChanged">
          Некорректный email
        </app-warning-text>
      </div>

      <div class="d-flex flex-column mt-4">
        <span>Пароль:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.password"
          type="password"
          placeholder="Введите пароль"
        />
        <app-warning-text
          v-if="!this.isValidPassword && this.isPasswordChanged"
        >
          Пароль должен содержать не менее 8 символов, включая прописные и
          строчные буквы, «+», а также хотя бы одну цифру от 0 до 9.
        </app-warning-text>
      </div>

      <app-button
        class="mt-6"
        :disabled="!this.isValidEmail && !this.isValidPassword"
        @click="signIn"
      >
        Войти
      </app-button>
    </div>
  </div>
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
      isNameChanged: false,
      isSurnameChanged: false,
      isEmailChanged: false,
      isPasswordChanged: false,
      showErrorMessage: false,
    };
  },

  methods: {
    async signup() {
      try {
        await userService.signUp(
          this.name,
          this.surname,
          this.email,
          this.password
        );
        this.$router.push("login");
        alert("Вы успешно зарегистрировались. Авторизуйтесь.");
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

<style scoped lang="scss">
@import "../colors";
@import "../font";

.registration-block {
  width: 70%;
  height: 50%;
  margin-top: 70px;
  background: $dark-primary;
  display: flex;
  flex-direction: column;
  color: $text;
  border-radius: 5px;
}
</style>
