import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/free-book-mockup-generator',
    name: 'FreeBookMockupGenerator',
    component: () => import('../views/landing/FreeBookMockupGenerator.vue')
  },
  {
    path: '/book-cover-mockup-generator',
    name: 'BookCoverMockupGenerator',
    component: () => import('../views/landing/BookCoverMockupGenerator.vue')
  },
  {
    path: '/ebook-mockup-generator',
    name: 'EbookMockupGenerator',
    component: () => import('../views/landing/EbookMockupGenerator.vue')
  },
  {
    path: '/hardcover-book-mockup',
    name: 'HardcoverBookMockup',
    component: () => import('../views/landing/HardcoverBookMockup.vue')
  },
  {
    path: '/3d-book-mockup-generator',
    name: 'ThreeDBookMockupGenerator',
    component: () => import('../views/landing/ThreeDBookMockupGenerator.vue')
  },
  {
    path: '/paperback-book-mockup',
    name: 'PaperbackBookMockup',
    component: () => import('../views/landing/PaperbackBookMockup.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/landing/About.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/landing/Privacy.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/landing/Terms.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/landing/Contact.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash, offset: { x: 0, y: 64 } }
    }
    return { x: 0, y: 0 }
  }
})

export default router
