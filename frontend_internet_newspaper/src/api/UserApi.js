import axios from "axios";

export const userApi = {
  URL: import.meta.env.VITE_API_URL,

  signUp(name, surname, email, password) {
    return axios({
      method: "post",
      url: `${this.URL}/auth/sign-up`,
      data: {
        name,
        surname,
        email,
        password,
      },
    });
  },

  signIn(email, password) {
    return axios({
      method: "post",
      url: `${this.URL}/auth/sign-in`,
      data: {
        email,
        password,
      },
    });
  },

  refreshToken() {
    return axios({
      method: "post",
      url: `${this.URL}/auth/refresh-token`,
      data: {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    });
  },

  signOut() {
    return axios({
      method: "post",
      url: `${this.URL}/auth/sign-out`,
      data: {
        refreshToken: localStorage.getItem("refreshToken"),
      },
    });
  },
};
