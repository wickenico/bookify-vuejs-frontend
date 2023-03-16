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
import Logout from '../views/Logout.vue'
import Registration from '../views/Registration.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Imprint from '../views/Imprint.vue'
import Contact from '../views/Contact.vue'
import BugReport from '../views/BugReport.vue'
import Settings from '../views/Settings.vue'

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
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/register',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/user/:username?',
    name: 'User',
    component: User,
    props: true
  },
  {
    path: '/users/edit/:id',
    name: 'UserEdit',
    component: UserEdit,
    props: true
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: Imprint
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/bugreport',
    name: 'BugReport',
    component: BugReport
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
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

router.beforeEach((to, from, next) => {
  const credentials = sessionStorage.getItem('credentials')
  const expiration = sessionStorage.getItem('expiration')
  if (to.name !== 'Login' && to.name !== 'Registration' && (!credentials || expiration < new Date().getTime())) {
    next('/login')
  } else {
    next()
  }
})

export default router
