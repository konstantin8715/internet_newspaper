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

      <!-- <span>Имя:</span>
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
      </div> -->

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
import { validateText } from "../helpers/TextValidator";
import { validateEmail } from "../helpers/EmailValidator";
import { validatePassword } from "../helpers/PasswordValidator";
import FormField from "../components/FormField.vue";

export default {
  components: { FormField },
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
