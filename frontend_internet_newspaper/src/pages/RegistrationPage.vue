<template>
  <div class="container">
    <div class="registration-block mx-auto pa-8">
      <div class="d-flex flex-column">
        <span>Имя:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.name"
          type="text"
          placeholder="Введите имя"
        />
        <app-warning-text v-if="!this.isValidName && this.isNameChanged">
          Имя должно иметь длину минимум 2 символа
        </app-warning-text>
      </div>

      <div class="d-flex flex-column mt-4">
        <span>Фамилия:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.surname"
          type="text"
          placeholder="Введите фамилию"
        />
        <app-warning-text v-if="!this.isValidSurname && this.isSurnameChanged">
          Фамилия должна иметь длину минимум 2 символа
        </app-warning-text>
      </div>

      <div class="d-flex flex-column mt-4">
        <span>Email:</span>
        <app-input
          class="auth-input mt-1"
          v-model:value="this.email"
          type="text"
          placeholder="Введите email"
          @focus="this.showErrorMessage = false"
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
          строчные буквы, «+», а также хотя бы одну цифру от 0 до 9
        </app-warning-text>
      </div>

      <app-button
        class="mt-6"
        :disabled="
          !this.isValidEmail ||
          !this.isValidPassword ||
          !this.isValidName ||
          !this.isValidSurname
        "
        @click="signup"
      >
        Зарегистрироваться
      </app-button>
      <app-warning-text v-if="this.showErrorMessage">
        Пользователь с таким email уже существует
      </app-warning-text>

      <div class="d-flex justify-center mt-1">
        <span>
          Уже есть аккаунт?
          <span
            class="registration-route text-decoration-underline cursor-pointer"
            @click="$router.push('login')"
          >
            Войти
          </span>
        </span>
      </div>
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

  computed: {
    isValidName() {
      return this.name.length >= 2;
    },

    isValidSurname() {
      return this.surname.length >= 2;
    },

    isValidEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },

    isValidPassword() {
      const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
      return passwordPattern.test(this.password);
    },
  },

  watch: {
    name() {
      if (this.name.length == 0) {
        this.isNameChanged = false;
      } else {
        this.isNameChanged = true;
      }
    },

    surname() {
      if (this.surname.length == 0) {
        this.isSurnameChanged = false;
      } else {
        this.isSurnameChanged = true;
      }
    },

    email() {
      if (this.email.length == 0) {
        this.isEmailChanged = false;
      } else {
        this.isEmailChanged = true;
      }
    },

    password() {
      if (this.password.length == 0) {
        this.isPasswordChanged = false;
      } else {
        this.isPasswordChanged = true;
      }
    },
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

.registration-route {
  color: $light-primary;
}
</style>
