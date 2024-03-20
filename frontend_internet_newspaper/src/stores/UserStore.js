import { defineStore } from "pinia";
import { userService } from "../services/UserService";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    id: "",
    name: "",
    surname: "",
    roles: [],
  }),

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
    },

    saveUserToLocalStorage(id, name, surname, roles) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", name);
      localStorage.setItem("userSurname", surname);
      localStorage.setItem("userRoles", JSON.stringify(roles));
    },

    deleteUserFromLocalStorage() {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userSurname");
      localStorage.removeItem("userRoles");
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
      }
    },

    // async refreshToken() {
    //   try {
    //     const data = await userService.refreshToken();
    //     localStorage.setItem("accessToken", data.accessToken);
    //   } catch (error) {
    //     user.deleteUserFromLocalStorage();
    //     user.$reset();
    //     throw error;
    //   }
    // },
  },
});
