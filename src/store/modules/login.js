import axios from 'axios';
import V1API from '../../../api-path/api-path';
import router from "../../router/index";

const state = {
    access_token: null,
    refresh_token: null,
    isLoggedIn: false,
    status_code: null
}

const getters = {}

const mutations = {
    SET_ACCESS_TOKEN (state, token) {
        localStorage.setItem('access_token', token)
        state.access_token = token
    },

    SET_REFRESH_TOKEN (state, token) {
        localStorage.setItem('refresh_token', token)
        state.refresh_token = token
    },

    SET_LOGIN_STATUS(state, status) {
        state.isLoggedIn = status;
    },

    GET_VERIFY_LOGIN (state, status) {
        state.status_code = status;
    },
}

const actions = {
    getLoginStatus({commit}) {
        let loginStatus = localStorage.getItem('access_token')==undefined? false : true;
        localStorage.setItem('loggedIn', loginStatus)
        commit('SET_LOGIN_STATUS', loginStatus)
        return loginStatus;
    },

    async checkVerification({commit}){
        let access_token = localStorage.getItem("access_token")
        let response = await axios.post(V1API.verify_token, {
          access_token: access_token
        })
        .then((result) => {
          let item = result.data.code;
          commit("GET_VERIFY_LOGIN", item);
          return result;
        });
        return response;
      },

    get_Login({ commit, dispatch }, payload) {
        let response = axios.post(V1API.get_login, payload).then(result => {
            console.log(result)
            let access_token = result.data.access_token
            let refresh_token = result.data.refresh_token
            commit('SET_ACCESS_TOKEN', access_token)
            commit('SET_REFRESH_TOKEN', refresh_token) 
            dispatch('getLoginStatus')
            // router.push('/')
            return result
        })
        .catch(error => {
            console.log(error)
        }) 
        return response      
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}