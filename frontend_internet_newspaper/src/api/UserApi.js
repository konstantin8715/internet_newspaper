import axios from "axios";

export const authenticationApi = {

    signUp(name, surname, email, password) {
        return axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-up',
            data: {
                name, surname, email, password,
            }
        });
    },

    signIn(email, password) {
        return axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-in',
            data: {
                email, password,
            },
        });
    },

    refreshToken(refreshToken) {
        return axios({
            method: 'post',
            url: 'http://localhost:8080/auth/refresh-token',
            data: {
                refreshToken,
            },
        });
    },

    signOut(refreshToken) {
        return axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-out',
            data: {
                refreshToken,
            },
        });
    },
}