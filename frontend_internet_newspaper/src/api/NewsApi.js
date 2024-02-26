import axios from 'axios';

export const newsApi = {
    getFreshNews() {
        return axios({
            url: 'http://localhost:8085/news/fresh-news',
            method: 'get',
        });
    },
}