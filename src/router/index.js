import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../view/Home.vue";

Vue.use(VueRouter);


//Router view set as Home.vue on launch
const routes = [
    {
    path: "/",
    name: "Home",
    component: Home,
    },
];
//History mode makes URL look normal 
//i.e. http://testsite/id
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;