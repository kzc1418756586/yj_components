/**
 * @author
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { publicPath, routerMode } from "@/config";

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/error/403"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    meta: { title: "首页", icon: "el-icon-s-platform" },
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/Home"),
        meta: {
          title: "首页",
          icon: "el-icon-s-platform",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/list",
    component: Layout,
    redirect: "/list/index",
    meta: { title: "列表页面", icon: "el-icon-s-grid" },
    children: [
      {
        path: "index",
        name: "List",
        component: () => import("@/views/List"),
        meta: {
          title: "列表",
          icon: "el-icon-s-grid",
          affix: false,
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    meta: { title: "个人中心", icon: "el-icon-user-solid" },
    children: [
      {
        path: "index",
        name: "User",
        component: () => import("@/views/User"),
        meta: {
          title: "用户",
          icon: "el-icon-user-solid",
          affix: false,
        },
      },
    ],
  },
  {
    path: "/error",
    component: EmptyLayout,
    redirect: "noRedirect",
    name: "Error",
    meta: { title: "错误页", icon: "el-icon-cpu" },
    children: [
      {
        path: "401",
        name: "Error401",
        component: () => import("@/views/error/401"),
        meta: { title: "401", icon: "el-icon-document-delete" },
      },
      {
        path: "404",
        name: "Error404",
        component: () => import("@/views/error/404"),
        meta: { title: "404", icon: "el-icon-document-delete" },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});

export function resetRouter() {
  location.reload();
}

export default router;
