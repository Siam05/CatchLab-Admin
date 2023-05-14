import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    site_settings: [],
    create_site_settings: []
}

const getters = {}

const mutations = {
    SET_SITE_SETTINGS (state, items) {
        state.site_settings = items
    },

    CREATE_SITE_SETTINGS (state, items) {
        state.create_site_settings = items
    }
}

const actions = {
    getSiteSettings ({ commit }) {
        axios.get(V1API.get_site_settings).then(result => {
            let items = result.data.data
            commit('SET_SITE_SETTINGS', items)
        })
    },

    async createSiteSettings ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_site_settings, payload, config).then(result => {
            let items = result.data
            console.log(items)
            commit('CREATE_SITE_SETTINGS', items)
            dispatch('getSiteSettings')
            return result
        })
        return response
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}