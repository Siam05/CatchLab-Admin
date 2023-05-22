import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import services from './modules/services'
import categories from './modules/categories'
import projects from './modules/projects'
import clients from './modules/clients'
import jobs from './modules/jobs'
import site_settings from './modules/site_settings'

export default createStore({
    modules: {
        login,
        dashboard,
        services,
        categories,
        projects,
        clients,
        jobs,
        site_settings,
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})