<template>
    <div class="container">
        <button @click="$router.push('login')">Log in</button>
        <button @click="$router.push('signup')">Sign up</button>
        <div class="news" v-for="n in news" :key="n.id">
            <div>{{ n.id }}</div>
            <h1>{{ n.newsTitle }}</h1>
            <div>{{ n.newsText }}</div>
            <img :src="n.picture.url">
        </div>
    </div>
</template>

<script>
import {newsApi} from '../api/NewsApi';

export default {
    components: {  },
    data() {
        return {
            news: [],
        }
    },

    methods: {
        
    },

    created() {
        newsApi.getFreshNews().then(response => this.news = response.data);
    },
}
</script>

<style scoped lang="scss">
    
</style>