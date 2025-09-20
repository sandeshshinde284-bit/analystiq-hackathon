// File: src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // --- Group 1: Routes using the Default (Public) Layout ---
  {
    path: "/",
    component: () => import("@/components/Templates/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
      },
    ],
  },

  // --- Group 2: Routes using the App Layout ---
  {
    path: "/app",
    component: () => import("@/components/Templates/AppLayout.vue"),
    children: [
      {
        path: "new-analysis",
        name: "new-analysis",
        component: () => import("@/views/NewAnalysisView.vue"),
      },
      {
        path: "analysis-in-progress",
        name: "analysis-in-progress",
        component: () => import("@/views/AnalysisInProgressView.vue"),
      },
      {
        path: "analysis-results",
        name: "analysis-results",
        component: () => import("@/views/AnalysisResultsView.vue"),
      },
    ],
  },

  // --- Redirects ---
  {
    path: "/new-analysis",
    redirect: "/app/new-analysis",
  },
  {
    path: "/analysis-in-progress",
    redirect: "/app/analysis-in-progress",
  },
  {
    path: "/analysis-results",
    redirect: "/app/analysis-results",
  },
];

const router = createRouter({
  // CORRECTED: Using process.env.BASE_URL for Vue CLI projects
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
