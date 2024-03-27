<template>
  <div class="container">
    <div class="auth-block mx-auto pa-8">
      <div class="d-flex flex-column">
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
        :disabled="!this.isValidEmail || !this.isValidPassword"
        @click="signIn"
      >
        Войти
      </app-button>

      <div class="d-flex justify-center mt-1">
        <span>
          Нет аккаунта?
          <span
            class="auth-route text-decoration-underline cursor-pointer"
            @click="$router.push('signup')"
          >
            Зарегистрироваться
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { userService } from "../services/UserService";

export default {
  components: {},
  data() {
    return {
      email: "",
      password: "",
      isEmailChanged: false,
      isPasswordChanged: false,
      userStore: useUserStore(),
    };
  },

  computed: {
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
    email() {
      if (this.email.length == 0) {
        this.isEmailChanged = false;
      }
      else {
        this.isEmailChanged = true;
      }
    },

    password() {
      if (this.password.length == 0) {
        this.isPasswordChanged = false;
      }
      else {
        this.isPasswordChanged = true;
      }
    }
  },

  methods: {
    async signIn() {
      try {
        await userService.signIn(this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        alert("Неправильное имя пользовтеля или пароль");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../colors";
@import "../font";

.auth-block {
  width: 70%;
  height: 50%;
  margin-top: 150px;
  background: $dark-primary;
  display: flex;
  flex-direction: column;
  color: $text;
  border-radius: 5px;
}

.auth-input {
  height: 35px;
}

.auth-route {
  color: $light-primary;
}
</style>
