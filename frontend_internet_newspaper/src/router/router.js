import AuthPage from '../pages/AuthPage.vue';
import MainPage from '../pages/MainPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import {
    createRouter,
    createWebHistory
} from 'vue-router';

const routes = [{
    path: '/',
    component: MainPage,
},
{
    path: '/login',
    component: AuthPage,
},
{
    path: '/signup',
    component: RegistrationPage,
},
{
    path: '/:catchAll(.*)',
    redirect: '/',
}
];

const router = createRouter({
routes,
history: createWebHistory(),
});

export default router;