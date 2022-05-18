import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("../views/Map.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/map/addTrack",
    name: "AddPersonalTrack",
    component: () =>
      import(/* webpackChunkName: "map" */ "../views/AddPersonalTrack.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/personalTrips",
    name: "PersonalTrips",
    component: () =>
      import("../views/PersonalTrips.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path: "/publicTrips",
    name: "PublicTrips",
    component: () =>
      import("../views/PublicTrips.vue"),
    meta: {
      authRequired: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      next();
    } else {
      if (to.matched.some(record => !record.meta.authRequired)) {
        next();
      } else {
        alert("You must be logged in to see this page");
        next({
          path: "/"
        });
        
      }
    }
  });
});

export default router;
