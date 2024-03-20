import { userApi } from "../api/UserApi";
import { useUserStore } from "../stores/UserStore";

export const userService = {
  // TODO: Перенести в UserStore
  async signUp(name, surname, email, password) {
    try {
      return await userApi.signUp(name, surname, email, password);
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      throw error;
    }
  },

  // TODO: Перенести в UserStore
  async signIn(email, password) {
    try {
      const response = await userApi.signIn(email, password);
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
      const response = await userApi.refreshToken();
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      return response;
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      user.deleteUserFromLocalStorage();
      user.$reset();
      throw error;
    }
  },

  async signOut() {
    try {
      await userApi.signOut();
    } catch (error) {
      // TODO: Сделать свои объекты ошибок
      throw error;
    }
  },
};
