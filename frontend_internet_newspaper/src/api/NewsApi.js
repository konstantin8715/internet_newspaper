import axios from 'axios';

export const newsApi = {
    async getFreshNews() {
        return await axios({
            url: 'http://localhost:8080/news/fresh-news',
            method: 'get',
        });
    },
}