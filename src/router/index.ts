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
    {
      path: "/ExpendSearchLine",
      name: "ExpendSearchLine",
      component: () => import("@/views/ExpendSearchLine/ExpendSearchLine.vue"),
    },
    {
      path: "/ApplyAdd",
      name: "ApplyAdd",  // 多表单管理
      component: () => import("@/views/ResourceApplication/ApplyAdd.vue"),
    },
  ],
});

export default router;
