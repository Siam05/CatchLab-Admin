import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    service_list: [],
    create_service: [],
    service_details: {},
    edit_service: {},
    delete_service: ""
}

const getters = {}

const mutations = {
    SET_SERVICE_LIST (state, items) {
        state.service_list = items
    },
    CREATE_SERVICE (state, items) {
        state.create_service = items
    },
    GET_SERVICE_DETAILS (state, items) {
        state.service_details = items
    },
    EDIT_SERVICE (state, items) {
        state.edit_service = items
    },
    DELETE_SERVICE (state, items) {
        state.delete_service = items
    },
}

const actions = {
    getServiceList ({ commit }) {
        axios.get(V1API.get_service_list).then(result => {
            let items = result.data.data
            commit('SET_SERVICE_LIST', items)
        })
    },

    async createService ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_service, payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('CREATE_SERVICE', items)
            dispatch('getServiceList')
            return result
        })
        return response
    },

    async getServiceDetails ({ commit }, payload) { 
        let response = await axios.get(V1API.get_service_details + payload).then(result => {
            let items = result.data.data
            commit('GET_SERVICE_DETAILS', items)
            return result
        })
        return response
    },

    async editService ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }  
            }
        let response = await axios.patch(V1API.edit_service + payload.id, 
            {
                title: payload.services.title,
                description: payload.services.description,
                icon: payload.services.icon,
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_SERVICE', items)
            dispatch('getServiceList')
            return result
        })
        return response
    },

    async deleteService ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(V1API.delete_service + payload, config).then(result => {
            let items = result.data
            commit('DELETE_SERVICE', items)
            dispatch('getServiceList')
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