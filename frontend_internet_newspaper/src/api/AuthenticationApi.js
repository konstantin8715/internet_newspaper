import axios from "axios";

export const authenticationApi = {

    async signUp(name, surname, email, password) {
        return await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-up',
            data: {
                name, surname, email, password
            }
        });
    },

    async signIn(email, password) {
        return await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-in',
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