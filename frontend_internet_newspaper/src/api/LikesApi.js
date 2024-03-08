import axios from 'axios';

export const likesApi = {
    async likeNews(newsId) {
        return await axios({
            url: `http://localhost:8080/likes/save?newsId=${newsId}`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    },
}