import { userApi } from "../api/UserApi";
import { useUserStore } from "../stores/UserStore";

export const userService = {
  async signUp(name, surname, email, password) {
    return await userApi.signUp(name, surname, email, password);
  },

  async signIn(email, password) {
    const response = await userApi.signIn(email, password);
    const data = response.data;
    useUserStore().saveUser(data.id, data.name, data.surname, data.roles);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  },

  async refreshToken(user) {
    try {
      const response = await userApi.refreshToken();
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      return response;
    } catch (error) {
      user.deleteUserFromLocalStorage();
      user.$reset();
      throw error;
    }
  },

  async signOut() {
    await userApi.signOut();
  },
};
