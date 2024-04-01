<template>
  <div class="container">
    <div class="registration-block mx-auto pa-8">
      <form-field
        :title="'Имя:'"
        :type="'text'"
        :placeholderText="'Введите имя'"
        :validator="this.textValidator"
        :warningText="'Имя должно иметь длину минимум 2 символа'"
        @updateField="this.isValidName = $event"
        @enterField="this.name = $event"
      />

      <form-field
        class="mt-2"
        :title="'Фамилия:'"
        :type="'text'"
        :placeholderText="'Введите фамилию'"
        :validator="this.textValidator"
        :warningText="'Фамилия должна иметь длину минимум 2 символа'"
        @updateField="this.isValidSurname = $event"
        @enterField="this.surname = $event"
      />

      <form-field
        class="mt-2"
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
        :isValidName="this.isValidName"
        :isValidSurname="this.isValidSurname"
        :isValidEmail="this.isValidEmail"
        :isValidPassword="this.isValidPassword"
        :text="'Зарегистрироваться'"
        :warningText="'Пользователь с таким email уже существует'"
        :showErrorMessage="this.showErrorMessage"
        @confirm="signup"
      />

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
import { validateText } from "../helpers/TextValidator";
import { validateEmail } from "../helpers/EmailValidator";
import { validatePassword } from "../helpers/PasswordValidator";
import FormField from "../components/FormField.vue";
import FormConfirmButton from "../components/FormConfirmButton.vue";

export default {
  components: { FormField, FormConfirmButton },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      textValidator: validateText,
      emailValidator: validateEmail,
      passwordValidator: validatePassword,
      isValidName: false,
      isValidSurname: false,
      isValidEmail: false,
      isValidPassword: false,
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
