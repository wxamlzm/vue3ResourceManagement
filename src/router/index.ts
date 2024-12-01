import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ResourceManagement",
      component: () =>
        import("../views/ResourceManagement/ResourceManagement.vue"),
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("../views/Test.vue"),
    },
    {
      path: "/ApplicationForm",
      name: "ApplicationForm",
      component: () => import("@/views/ApplicationForm/ApplicationForm.vue"),
    },
  ],
});

export default router;
