import { userApi } from "../api/UserApi";
import { useUserStore } from "../stores/UserStore";

export const userService = {
  async signUp(name, surname, email, password) {
    try {
      return await userApi.signUp(name, surname, email, password);
    } catch (error) {
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      const response = await userApi.signIn(email, password);
      const data = response.data;
      useUserStore().saveUser(data.id, data.name, data.surname, data.roles);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      throw error;
    }
  },

  async refreshToken(user) {
    try {
      const response = await userApi.refreshToken();
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      console.log('refreshToken');
      return response;
    } catch (error) {
      user.deleteUserFromLocalStorage();
      user.$reset();
      throw error;
    }
  },

  async signOut() {
    try {
      await userApi.signOut();
    } catch (error) {
      throw error;
    }
  },
};
