import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    project_list: [],
    create_project: [],
    project_details: {},
    edit_project: {},
    delete_project: ""
}

const getters = {}

const mutations = {
    SET_PROJECT_LIST (state, items) {
        state.project_list = items
    },
    CREATE_PROJECT (state, items) {
        state.create_project = items
    },
    GET_PROJECT_DETAILS (state, items) {
        state.project_details = items
    },
    EDIT_PROJECT (state, items) {
        state.edit_project = items
    },
    DELETE_PROJECT (state, items) {
        state.delete_project = items
    },
}

const actions = {
    getProjectList ({ commit }) {
        axios.get(V1API.get_project_list).then(result => {
            let items = result.data.data
            commit('SET_PROJECT_LIST', items)
        })
    },

    async createProject ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_project, payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('CREATE_PROJECT', items)
            dispatch('getProjectList')
            return result
        })
        return response
    },

    async getProjectDetails ({ commit }, payload) { 
        let response = await axios.get(V1API.get_project_details + payload).then(result => {
            let items = result.data.data
            commit('GET_PROJECT_DETAILS', items)
            return result
        })
        return response
    },

    async editProject ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }  
            }
        let response = await axios.patch(V1API.edit_project + payload.id, 
            {
                title: payload.projects.title,
                client_name: payload.projects.client_name,
                // details: payload.projects.details,
                featured: payload.projects.featured,
                category: payload.projects.category,
                link: payload.projects.link,
                // image: payload.projects.image
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_PROJECT', items)
            dispatch('getProjectList')
            return result
        })
        return response
    },

    async deleteProject ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(V1API.delete_project + payload, config).then(result => {
            let items = result.data
            commit('DELETE_PROJECT', items)
            dispatch('getProjectList')
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