import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home1 from '../views/home1.vue'
import Home2 from '../views/Home2.vue'
import Home3 from '../views/home3.vue'
import CoordinatePicker from '../views/CoordinatePicker.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/coordinate-picker',
    name: 'CoordinatePicker',
    component: CoordinatePicker
  },
  {
    path: '/home1',
    name: 'Home1',
    component: Home1
  },
  {
    path: '/home2',
    name: 'Home2',
    component: Home2
  },
  {
    path: '/home3',
    name: 'Home3',
    component: Home3
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
