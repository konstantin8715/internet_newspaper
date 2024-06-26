import { defineStore } from "pinia";
import { userService } from "../services/UserService";
import { useNewsStore } from "./NewsStore";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    id: "",
    name: "",
    surname: "",
    roles: [],
    favoritesThemes: [],
    forbiddenThemes: [],
  }),

  getters: {
    isUser() {
      return (
        this.roles.includes("ROLE_USER") || this.roles.includes("ROLE_ADMIN")
      );
    },

    isAdmin() {
      return this.roles.includes("ROLE_ADMIN");
    },
  },

  actions: {
    saveUser(id, name, surname, roles) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.roles = roles;
      this.saveUserToLocalStorage(id, name, surname, roles);
    },

    loadUserFromLocalStorage() {
      this.id = localStorage.getItem("userId");
      this.name = localStorage.getItem("userName");
      this.surname = localStorage.getItem("userSurname");
      this.roles = JSON.parse(localStorage.getItem("userRoles"));
      const favoritesThemes = JSON.parse(localStorage.getItem(this.id + "fav"));
      favoritesThemes == null
        ? (this.favoritesThemes = [])
        : (this.favoritesThemes = favoritesThemes);
      const forbiddenThemes = JSON.parse(localStorage.getItem(this.id + "forb"));
      forbiddenThemes == null
        ? (this.forbiddenThemes = [])
        : (this.forbiddenThemes = forbiddenThemes);
    },

    saveUserToLocalStorage(id, name, surname, roles) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", name);
      localStorage.setItem("userSurname", surname);
      localStorage.setItem("userRoles", JSON.stringify(roles));
      // localStorage.setItem(
      //   "favoritesThemes",
      //   JSON.stringify(this.favoritesThemes)
      // );
      // localStorage.setItem(
      //   "forbiddenThemes",
      //   JSON.stringify(this.forbiddenThemes)
      // );
    },

    addFavoriteTheme(theme) {
      this.favoritesThemes.push(theme);
      localStorage.setItem(
        this.id + "fav",
        JSON.stringify(this.favoritesThemes)
      );
    },

    addForbiddenTheme(theme) {
      this.forbiddenThemes.push(theme);
      localStorage.setItem(
        this.id + "forb",
        JSON.stringify(this.forbiddenThemes)
      );
    },

    deleteFavoriteTheme(theme) {
      this.favoritesThemes = this.favoritesThemes.filter(
        (t) => t.name != theme.name
      );
      localStorage.setItem(
        this.id + "fav",
        JSON.stringify(this.favoritesThemes)
      );
    },

    deleteForbiddenTheme(theme) {
      this.forbiddenThemes = this.forbiddenThemes.filter(
        (t) => t.name != theme.name
      );
      localStorage.setItem(
        this.id + "forb",
        JSON.stringify(this.forbiddenThemes)
      );
    },

    deleteUserFromLocalStorage() {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userSurname");
      localStorage.removeItem("userRoles");
      // localStorage.removeItem("favoritesThemes");
      // localStorage.removeItem("forbiddenThemes");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    async signOut() {
      try {
        await userService.signOut();
      } catch (error) {
        throw error;
      } finally {
        this.deleteUserFromLocalStorage();
        this.$reset();
        try {
          await useNewsStore().loadNews();
        } catch (error) {
          alert("Ошибка при загрузке новостей");
        }
      }
    },
  },
});
