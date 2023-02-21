import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Books from '../views/Books.vue'
import BookDetails from '../views/BookDetails.vue'
import BookEdit from '../views/BookEdit.vue'
import NotFound from '../views/NotFound.vue'
import Favorites from '../views/Favorites.vue'
import FavoriteDetails from '../views/FavoriteDetails.vue'
import Tags from '../views/Tags.vue'
import TagDetails from '../views/TagDetails.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/books/:id',
    name: 'BookDetails',
    component: BookDetails,
    props: true
  },
  {
    path: '/books/edit/:id',
    name: 'BookEdit',
    component: BookEdit,
    props: true
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/favorites/:id',
    name: 'FavoriteDetails',
    component: FavoriteDetails,
    props: true
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/tags/:id',
    name: 'TagDetails',
    component: TagDetails,
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Registration',
    component: Registration
  },
    // Catch all 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = checkIfUserIsLoggedIn() // replace this with your own function to check if the user is logged in
//   if (to.path !== '/login' && !isLoggedIn) {
//     // next('/login')
//   } else {
//     next()
//   }
// })

// function checkIfUserIsLoggedIn () {
//   // replace this with your own function to check if the user is logged in
//   return false // for example purposes only
// }

export default router
