import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect:"user",
    component: Layout,
    children:[
      {
        path:'user',
        name:'user',
        component:() => import("@/views/User")
      },
      {
        path: 'book',
        name: 'book',
        component: () => import("@/views/Book")
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import("@/views/Person")
      },
      {
        path: 'password',
        name: 'Password',
        component: () => import("@/views/Password")
      },
      {
        path: 'lendrecord',
        name: 'LendRecord',
        component: () => import("@/views/LendRecord")
      },
      {
        path:'dashboard',
        name:'Dashboard',
        component:() => import("@/views/Dashboard")
      },
      {
        path: 'bookwithuser',
        name: 'BookWithUser',
        component: () => import("@/views/BookWithUser")
      },
      {
        path: 'cperson',
        name: 'CPerson',
        component: () => import("@/views/CPerson")
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import("@/views/feedback")
      },
      {
        path: 'safety',
        name: 'Safety',
        component: () => import("@/views/Safety")
      },
      {
        path: 'proj',
        name: 'Proj',
        component: () => import("@/views/Proj")
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import("@/views/Task")
      },
      {
        path: 'mfeedback',
        name: 'MFeedback',
        component: () => import("@/views/MFeedback")
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import("@/views/Notice")
      },
      {
        path: 'mproj',
        name: 'MProj',
        component: () => import("@/views/MProj")
      },
      {
        path: 'mtask',
        name: 'MTask',
        component: () => import("@/views/MTask")
      },
      {
        path: 'msafety',
        name: 'MSafety',
        component: () => import("@/views/MSafety")

      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import("@/views/Register")
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
