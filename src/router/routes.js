
const routes = [
  {
    path: '/',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      { path: '', name:"main", component: () => import('pages/MainPage.vue') },
      { path: 'playlist', name:"main", component: () => import('pages/MainPage.vue') },
      { path: 'playlist/:id', name:"main", component: () => import('pages/MainPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      { path: '/songs', name:"songs", component: () => import('pages/SongsPage.vue') }
    ]
  },
  {
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
