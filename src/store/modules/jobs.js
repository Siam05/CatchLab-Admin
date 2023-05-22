import axios from 'axios';
import V1API from '../../../api-path/api-path';

const state = {
    job_positions: [],
    create_job_position: [],
    job_position_by_id: {},
    edit_job_position: {},
    delete_job_position: "",

    job_applications: [],
    delete_job_application: ""
}

const getters = {}

const mutations = {
    SET_JOB_POSITIONS (state, items) {
        state.job_positions = items
    },
    CREATE_JOB_POSITION (state, items) {
        state.create_job_position = items
    },
    GET_JOB_POSITION_BY_ID (state, items) {
        state.job_position_by_id = items
    },
    EDIT_JOB_POSITION (state, items) {
        state.edit_job_position = items
    },
    DELETE_JOB_POSITION (state, items) {
        state.delete_job_position = items
    },


    SET_JOB_APPLICATIONS (state, items) {
        state.job_applications = items
    },
    DELETE_JOB_APPLICATION (state, items) {
        state.delete_job_application = items
    }
}

const actions = {
    getJobPositions ({ commit }) {
        axios.get(V1API.get_job_positions).then(result => {
            let items = result.data.data
            commit('SET_JOB_POSITIONS', items)
        })
    },

    async createJobPosition ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        let response = await axios.post(V1API.create_job_position,
            {
                title: payload.job_position.title,
                available_position: payload.job_position.available_position,
                qualification: {
                    details: payload.qualification.details
                },
                job_description: {
                    type: payload.job_description.type,
                    post: payload.job_description.post,
                    location: payload.job_description.location,
                    salary: payload.job_description.salary,
                    description: payload.job_description.description
                },
                is_active: payload.job_position.is_active,
                // deadline: payload.job_position.deadline
            }, config).then(result => {
            let items = result.data
            console.log(items)
            commit('CREATE_JOB_POSITION', items)
            dispatch('getJobPositions')
            return result
        })
        return response
    },

    async getJobPositionById ({ commit }, payload) { 
        let response = await axios.get(V1API.get_job_position_by_id + payload).then(result => {
            let items = result.data.data
            commit('GET_JOB_POSITION_BY_ID', items)
            return result
        })
        return response
    },

    async editJobPosition ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }  
            }
        let response = await axios.patch(V1API.edit_job_position + payload.id, 
            {
                title: payload.job_position.title,
                available_position: payload.job_position.available_position,
                qualification: {
                    details: payload.qualification.details
                },
                job_description: {
                    type: payload.job_description.type,
                    post: payload.job_description.post,
                    location: payload.job_description.location,
                    salary: payload.job_description.salary,
                    description: payload.job_description.description
                },
                is_active: payload.job_position.is_active,
                // deadline: payload.job_position.deadline
            }
            ,config).then(result => {
            let items = result.data.data
            commit('EDIT_JOB_POSITION', items)
            dispatch('getJobPositions')
            return result
        })
        return response
    },

    async deleteJobPosition ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(V1API.delete_job_position + payload, config).then(result => {
            let items = result.data
            commit('DELETE_JOB_POSITION', items)
            dispatch('getJobPositions')
            return result
        })
        return response
    },


    getJobApplications ({ commit }) {
        axios.get(V1API.get_job_applications).then(result => {
            let items = result.data.data
            commit('SET_JOB_APPLICATIONS', items)
        })
    },

    async deleteJobApplication ({ commit, dispatch }, payload) {
        let config=
            {
                headers:  { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }    
            }
        console.log(payload)

        let response = await axios.delete(V1API.delete_job_application + payload, config).then(result => {
            let items = result.data
            commit('DELETE_JOB_APPLICATION', items)
            dispatch('getJobApplications')
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