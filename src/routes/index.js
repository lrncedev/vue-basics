import { createRouter, createWebHistory } from 'vue-router'

// import TaskList from "../components/TaskList.vue"

import DefaultView from "../views/DefaultView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DefaultView
  },
  // {
  //   path: "/tasks",
  //   name: "Tasks",
  //   component: 
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router