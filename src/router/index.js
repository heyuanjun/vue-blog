import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/LeaveMessage.vue')
  },
  {
    path: '/photos',
    name: 'photos',
    component: () => import('../views/Photos.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/category.vue')
  },
  {
    path: '/article',
    name: 'card',
    component: () => import('../components/HomeComponents/Card.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import ('../components/HomeComponents/detail.vue')
  },
]

let adminRoutes = [
  {
    path: '/admin',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import ('../admin/adminLogin.vue')
  },
  {
    path: '/admin/article',
    name: 'admin',
    component: () => import ('../admin/articleEditor.vue'),
    children: [
      {
        path: '/admin/article/upload/photos',
        name: 'uploadphoto',
        component: () => import ('../admin/sendcontent.vue')
      },
      {
        path: '/admin/article/upload/images',
        name: 'images',
        component: () => import ('../admin/ImageUpload.vue')
      },
      {
        path: '/admin/article/upload/articlePublish',
        name: 'articlePublish',
        component: () => import ('../admin/articlePublish.vue')
      },
      {
        path: '/admin/article/upload/articleManage',
        name: 'articleManage',
        component: () => import ('../admin/articleManage.vue')
      },
      {
        path: '/admin/article/upload/users',
        name: 'UserManage',
        component: () => import ('../admin/UserManage.vue')
      },
      {
        path: '/admin/article/upload/articleupdate/:id',
        name: 'articleupdate',
        component: () => import ('../admin/updateArticle.vue')
      }
    ]
  }
]

routes = routes.concat(adminRoutes)

const router = new VueRouter({
  /* 路由不再显示 hash */
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const adminRouter = new VueRouter({
  /* 路由不再显示 hash */
  mode: 'history',
  base: process.env.BASE_URL,
  adminRoutes
})

/* 重定向不报错 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

/*
* Admin 导航守卫
* to: 即将要进入的目标 路由对象;（这个对象中包含name，params，meta等属性）
* from: 当前导航正要离开的路由对象；（这个对象中包含name，params，meta等属性）
* next: Function: 确保要调用 next 方法，否则钩子就不会被 resolved。
*/
adminRouter.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/admin') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      next('/admin');
    } else {
      next();
    }
  }

});


export default router
