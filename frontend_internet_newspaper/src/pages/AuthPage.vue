<template>
  <div class="container">
    <div class="auth-block mx-auto pa-8">
      <form-field
        :title="'Email:'"
        :type="'text'"
        :placeholderText="'Введите email'"
        :validator="this.emailValidator"
        :warningText="'Некорректный email'"
        @updateField="this.isValidEmail = $event"
        @enterField="this.email = $event"
      />

      <form-field
        class="mt-2"
        :title="'Пароль:'"
        :type="'password'"
        :placeholderText="'Введите пароль'"
        :validator="this.passwordValidator"
        :warningText="'Пароль должен содержать не менее 8 символов, включая прописные и строчные буквы, «+», а также хотя бы одну цифру от 0 до 9.'"
        @updateField="this.isValidPassword = $event"
        @enterField="this.password = $event"
      />

      <form-confirm-button
        :isValidName="true"
        :isValidSurname="true"
        :isValidEmail="this.isValidEmail"
        :isValidPassword="this.isValidPassword"
        :text="'Войти'"
        :warningText="'Неправильное имя пользовтеля или пароль'"
        :showErrorMessage="this.showErrorMessage"
        @confirm="signIn"
      />

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
import FormField from "../components/FormField.vue";
import FormConfirmButton from "../components/FormConfirmButton.vue";
import { validateEmail } from "../helpers/EmailValidator";
import { validatePassword } from "../helpers/PasswordValidator";

export default {
  components: { FormField, FormConfirmButton },
  data() {
    return {
      // email: "aleksandrov@yandex.ru",
      // password: "Aleksandrov47",
      email: "",
      password: "",
      emailValidator: validateEmail,
      passwordValidator: validatePassword,
      isValidEmail: false,
      isValidPassword: false,
      showErrorMessage: false,
      userStore: useUserStore(),
    };
  },

  methods: {
    async signIn() {
      try {
        await userService.signIn(this.email, this.password);
        this.$router.push("/");
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
