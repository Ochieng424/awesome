import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import Profile from "../views/Profile.vue";
import Expertise from "../views/Expertise.vue";
import Manage from "../views/ProjectManage.vue";
import Project from "../views/Project/index.vue";
import ProjectDetails from "../views/Project/MoreDetails.vue";
import Contact from "../views/Contact";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact
  },
  {
    path: "/projects",
    name: "projects",
    component: Project
  },
  {
    path: "/projects/:refNo/more",
    name: "projectDetails",
    component: ProjectDetails
  },
  {
    path: "/expertise",
    name: "expertise",
    component: Expertise
  },
  {
    path: "/login",
    name: "login",
    component: Auth,
    meta: {
      auth: false
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      auth: true
    }
  },
  {
    path: "/project/manage",
    name: "manage",
    component: Manage,
    meta: {
      auth: true
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
