import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: async () => await import("../pages/MainPage.vue"),
  },
  {
    path: "/login",
    component: async () => await import("../pages/AuthPage.vue"),
  },
  {
    path: "/signup",
    component: async () => await import("../pages/RegistrationPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
