
const routes = [
  { //Login Page
    path: '/',
    component: () => import('src/layouts/LoginRegisterLayout.vue'),
    children: [
      { path: '', name:"welcome", component: () => import('pages/LoginPage.vue') },
      { path: '/login', name:"login", component: () => import('pages/LoginPage.vue') }
    ]
  },
  { //Register Page
    path: '/',
    component: () => import('src/layouts/LoginRegisterLayout.vue'),
    children: [
      { path: '/register', name:"register", component: () => import('pages/RegisterPage.vue') }
    ]
  },
  { //Playlist Page
    path: '/',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      { path: 'playlist', name:"main", component: () => import('pages/MainPage.vue') },
      { path: 'playlist/:id', name:"main", component: () => import('pages/MainPage.vue') },
    ]
  },
  { //Songs Page
    path: '/',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      { path: '/songs', name:"songs", component: () => import('pages/SongsPage.vue') }
    ]
  },


  
  { //Index Page NOT USED
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/main', name:"index", component: () => import('pages/Index.vue') }
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
