import { createRouter, createWebHistory } from 'vue-router'
import Users from '../components/User/Users.vue'
import Posts from '../components/Posts/Posts.vue'
import Edit from '../components/Posts/Edit.vue'
import EditUser from '../components/User/Edit.vue'
import ShowUser from '../components/User/Show.vue'
import ShowPost from '../components/Posts/Show.vue'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/posts/page?:pageNumber',
    name: 'Post_Page',
    component: Posts,
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/posts/:id/edit',
    name: 'EditPost',
    component: Edit,

  },
  {
    path: '/users/:id/edit',
    name: 'EditUser',
    component: EditUser,

  },
  {
    path: '/users/:id',
    name: 'ShowUser',
    component: ShowUser,
  },

  {
    path: '/posts/:id',
    name: 'ShowPost',
    component: ShowPost,

  },

{
    path: '/login',
    name: 'Login',
    component: Login,
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
