import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    client_list: [],
    create_client: {},
    edit_client: {},
    delete_client: ""
}

const getters = {}

const mutations = {
    SET_CLIENT_LIST (state, items) {
        state.client_list = items
    },

    CREATE_CLIENT (state, items) {
        state.create_client = items
    },
    
    EDIT_CLIENT (state, items) {
        state.edit_client = items
    },
    
    DELETE_CLIENT (state, items) {
        state.delete_client = items
    },
}

const actions = {
    getClientList ({ commit }) {
        axios.get(V1API.get_client_list).then(result => {
            let items = result.data.data
            commit('SET_CLIENT_LIST', items)
        })
    },

    async createClient ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_client, payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('CREATE_CLIENT', items)
            dispatch('getClientList')
            return result
        })
        return response
    },

    async editClient ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }  
            }
        let response = await axios.patch(V1API.edit_client + payload.id, 
            {
                name: payload.client.name,
                logo: payload.client.logo
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_CLIENT', items)
            dispatch('getClientList')
            return result
        })
        return response
    },

    async deleteClient ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(V1API.delete_client + payload, config).then(result => {
            let items = result.data
            commit('DELETE_CLIENT', items)
            dispatch('getClientList')
            return result
        })
        return response
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}