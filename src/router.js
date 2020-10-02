import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/dashboard/pages/Login'
import Register from './views/dashboard/pages/Register'
import Logout from './views/dashboard/pages/Logout'
import Principal from './views/dashboard/tables/Principal'
import CityDet from './views/dashboard/tables/CityDet'
import StoreFromC from './views/dashboard/tables/StoreFromC'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresLogged: true
      }
    },
            // Pages
    {
      path: "/login",
      name: "login",
      component: Login,    
    },
    {
      path: "/city/:cityId/city-det",
      name: "citydet",
      component: CityDet,    
    },
    {
      path: "/store/:storeId/store-det",
      name: "store-det",
      component: StoreFromC,    
    },
    { 
      path: '/', 
      name: 'principal', 
      component: Principal 
    },
    { 
      path: '/logout', 
      name: 'logout', 
      component: Logout 
    },
    {

      path: '/index',
      name: 'index',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboar
        {
          name: 'Dashboard',
          path: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Perfil de usuario',
          path: 'user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Regiones',
          path: 'regions',
          component: () => import('@/views/dashboard/component/Regions'),
          meta: {
            requiresAuth: true
          }
        },
        // Tables
        {
          name: 'Comercios',
          path: 'commerces',
          component: () => import('@/views/dashboard/tables/Commerces'),
          meta: {
            requiresAuth: true
          }
        },
        // Maps
        {
          name: 'Quejas',
          path: 'quejas',
          component: () => import('@/views/dashboard/maps/AllComplains'),
          meta: {
            requiresAuth: true
          }
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'commerce/:companyId/commerce-detail', 
          name: 'Comercio detalle', 
          component: () => import('@/views/dashboard/tables/CommerceDetail'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'store-branch/:storeId/store', 
          name: 'Store detalle', 
          component: () => import('@/views/dashboard/tables/StoreDetail'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'city/:cityId/city-detail', 
          name: 'City detalle', 
          component: () => import('@/views/dashboard/tables/CityDetail'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'store-fromcity/:storeId/store', 
          name: 'Store', 
          component: () => import('@/views/dashboard/tables/StoreFromCityDetail'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'town/:townId/town-detail', 
          name: 'Town', 
          component: () => import('@/views/dashboard/tables/TownDetail'),
          meta: {
            requiresAuth: true
          }
        },

      ],
    },
  ],
})
