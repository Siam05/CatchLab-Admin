import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    category_list: [],
    create_category: [],
    category_details: {},
    edit_category: {},
    delete_category: ""
}

const getters = {}

const mutations = {
    SET_CATEGORY_LIST (state, items) {
        state.category_list = items
    },
    CREATE_CATEGORY (state, items) {
        state.create_category = items
    },
    GET_CATEGORY_DETAILS (state, items) {
        state.category_details = items
    },
    EDIT_CATEGORY (state, items) {
        state.edit_category = items
    },
    DELETE_CATEGORY (state, items) {
        state.delete_category = items
    },
}

const actions = {
    getCategoryList ({ commit }) {
        axios.get(V1API.get_category_list).then(result => {
            let items = result.data.data
            commit('SET_CATEGORY_LIST', items)
        })
    },

    async createCategory ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_category, payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('CREATE_CATEGORY', items)
            dispatch('getCategoryList')
            return result
        })
        return response
    },

    async getCategoryDetails ({ commit }, payload) { 
        let response = await axios.get(V1API.get_category_details + payload).then(result => {
            let items = result.data.data
            commit('GET_CATEGORY_DETAILS', items)
            return result
        })
        return response
    },

    async editCategory ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }  
            }
        let response = await axios.patch(V1API.edit_category + payload.id,
            {
                title: payload.categories.title,
                // description: payload.categories.description,
                // image: payload.categories.image
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_CATEGORY', items)
            dispatch('getCategoryList')
            return result
        })
        return response
    },

    async deleteCategory ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(V1API.delete_category + payload, config).then(result => {
            let items = result.data
            commit('DELETE_CATEGORY', items)
            dispatch('getCategoryList')
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