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

    signIn(email, password) {
        axios({
            method: 'post',
            url: 'http://localhost:8085/auth/sign-in',
            data: {
                email, password
            },
        }).then(response => console.log(response))
          .catch(error => console.log(error.response.data));
    },

    refreshToken() {

    },

    signOut() {

    },
}