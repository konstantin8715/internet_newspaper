import axios from "axios";

export const authenticationApi = {

    async signUp(name, surname, email, password) {
        return await axios({
            method: 'post',
            url: 'http://localhost:8085/auth/sign-up',
            data: {
                name, surname, email, password
            }
        });
    },

    async signIn(email, password) {
        return await axios({
            method: 'post',
            url: 'http://localhost:8085/auth/sign-in',
            data: {
                email, password
            },
        });
    },

    refreshToken() {

    },

    signOut() {

    },
}