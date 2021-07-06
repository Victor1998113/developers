import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AddEmp from "@/components/AddEmp"

Vue.use(VueRouter)

const routes = [
  {path: "/",component: Home},
  {path:'/home',component:Home},
  {path: '/addEmp',component: AddEmp},
]

const router = new VueRouter({
  routes
})

export default router
