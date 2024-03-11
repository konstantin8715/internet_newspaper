import { authenticationApi } from "../api/UserApi";
import { useUserStore } from "../stores/UserStore";

export const userService = {
  async signUp(name, surname, email, password) {
    try {
      return await authenticationApi.signUp(name, surname, email, password);
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      const response = await authenticationApi.signIn(email, password);
      const data = response.data;
      useUserStore().saveUser(data.id, data.name, data.surname, data.roles);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      throw error;
    }
  },

  async refreshToken(user) {
    try {
      const response = await authenticationApi.refreshToken();
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      return response;
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      console.log("unautorized");
      user.deleteUserFromLocalStorage();
      user.$reset();
      throw error;
    }
  },

  async signOut(user) {
    try {
      await authenticationApi.signOut();
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      throw error;
    } finally {
      user.deleteUserFromLocalStorage();
      user.$reset();
    }
  },
};
