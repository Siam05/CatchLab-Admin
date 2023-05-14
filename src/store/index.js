import { createStore } from 'vuex'
import login from './modules/login'
import dashboard from './modules/dashboard'
import clients from './modules/clients'
import services from './modules/services'
import categories from './modules/categories'
import projects from './modules/projects'
import site_settings from './modules/site_settings'

export default createStore({
    modules: {
        login,
        dashboard,
        clients,
        services,
        categories,
        projects,
        site_settings,
    },

    state () {
        return {}
    },
    
    getters: {},
    mutaions: {},
    actions: {}
})