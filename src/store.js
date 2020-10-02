import Vue from 'vue'
import Vuex from 'vuex'
import { axiosBase } from './api/axios-base'
import axios from 'axios'

Vue.use(Vuex)
let URL = 'https://diaco-backend.herokuapp.com/'
export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://i.pinimg.com/originals/74/8d/0c/748d0c93cb336d05cce5d993b5d923ea.jpg',
    drawer: null,
    status: '',
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') || null, 
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
    },
    auth_error(state){
        state.status = 'error'
    },
    logout(state){
        state.status = ''
        state.token = ''
    },
  },
  actions: {
    refreshToken (context) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/token/refresh/', {
          refresh: context.state.refreshToken
        }) // send the stored refresh token to the backend API
          .then(response => { // if API sends back new access and refresh token update the store
            console.log('New access successfully generated')
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            console.log('error in refreshToken Task')
            reject(err) // error generating new access and refresh token because refresh token has expired
          })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        axios({url: URL+'api/users/', data: user, method: 'POST' })
        .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
  },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    login({commit}, user){
      return new Promise((resolve, reject) => {
          axios({url: URL+'api/api-token-auth/', data: user, method: 'POST' })
          .then(async (resp) => {
            const parseResponde = await resp.data
            const token = parseResponde.token
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            //console.log(JSON.parse(window.atob(base64)))        
            const user = JSON.parse(window.atob(base64)).user_id
            //console.log(user, 'ID USUARIO')
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          }) .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
          })
      })
    },
  },
})
