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
      path: "/ResourceRequestDetail",
      name: "ResourceRequestDetail",
      component: () =>
        import("@/views/ResourceManagement/ResourceRequestDetail.vue"),
    },
  ],
});

export default router;
