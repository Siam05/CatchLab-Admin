import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index'
import Dashboard from '../views/dashboard/index.vue'
import Login from '../views/login/index.vue'

import CreateServices from '../views/services/create/index.vue'
import ViewServices from '../views/services/view/index.vue'
import EditServices from '../views/services/edit/[id].vue'

import CreateCategory from '../views/categories/create/index.vue'
import ViewCategories from '../views/categories/view/index.vue'
import EditCategory from '../views/categories/edit/[id].vue'

import CreateProjects from '../views/projects/create/index.vue'
import ViewProjects from '../views/projects/view/index.vue'
import EditProjects from '../views/projects/edit/[id].vue'

import CreateClients from '../views/clients/create/index.vue'
import ViewClients from '../views/clients/view/index.vue'

import CreatePosition from '../views/jobs/createPosition/index.vue'
import ViewPosition from '../views/jobs/viewPosition/index.vue'
import EditPosition from '../views/jobs/editPosition/[id].vue'
import ViewApplication from '../views/jobs/viewApplication/index.vue'

import SiteSettings from '../views/site-settings/index.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            login_required: true,
            hideSidebar: false,
            isDashboardOpen: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            hideSidebar: true,
        }
    },

    // Services
    {
        path: '/services/create',
        name: 'CreateServices',
        component: CreateServices,
        meta: {
            login_required: true,
            hideSidebar: false,
            isServiceOpen: true,
            isServiceCreate: true
        }
    },
    {
        path: '/services/view',
        name: 'ViewServices',
        component: ViewServices,
        meta: {
            login_required: true,
            hideSidebar: false,
            isServiceOpen: true,
            isServiceView: true
        }
    },
    {
        path: '/services/edit/:id',
        name: 'EditServices',
        component: EditServices,
        meta: {
            login_required: true,
            hideSidebar: false,
            isServiceOpen: true
        }
    },

    // Categories
    {
        path: '/categories/create',
        name: 'CreateCategory',
        component: CreateCategory,
        meta: {
            login_required: true,
            hideSidebar: false,
            isCategoryOpen: true,
            isCategoryCreate: true
        }
    },
    {
        path: '/categories/view',
        name: 'ViewCategories',
        component: ViewCategories,
        meta: {
            login_required: true,
            hideSidebar: false,
            isCategoryOpen: true,
            isCategoryView: true
        }
    },
    {
        path: '/categories/edit/:id',
        name: 'EditCategory',
        component: EditCategory,
        meta: {
            login_required: true,
            hideSidebar: false,
            isCategoryOpen: true
        }
    },

    // Projects
    {
        path: '/projects/create',
        name: 'CreateProjects',
        component: CreateProjects,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true,
            isProjectCreate: true
        }
    },
    {
        path: '/projects/view',
        name: 'ViewProjects',
        component: ViewProjects,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true,
            isProjectView: true
        }
    },
    {
        path: '/projects/edit/:id',
        name: 'EditProjects',
        component: EditProjects,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true
        }
    },

    // Clients
    {
        path: '/clients/create',
        name: 'CreateClients',
        component: CreateClients,
        meta: {
            login_required: true,
            hideSidebar: false,
            isClientOpen: true,
            isClientCreate: true
        }
    },
    {
        path: '/clients/view',
        name: 'ViewClients',
        component: ViewClients,
        meta: {
            login_required: true,
            hideSidebar: false,
            isClientOpen: true,
            isClientView: true
        }
    },

    // Jobs
    {
        path: '/job-position/create',
        name: 'CreatePosition',
        component: CreatePosition,
        meta: {
            login_required: true,
            hideSidebar: false,
            isJobsOpen: true,
            isJobPositionCreate: true
        }
    },
    {
        path: '/job-positions/view',
        name: 'ViewPosition',
        component: ViewPosition,
        meta: {
            login_required: true,
            hideSidebar: false,
            isJobsOpen: true,
            isJobPositionView: true
        }
    },
    {
        path: '/job-position/edit/:id',
        name: 'EditPosition',
        component: EditPosition,
        meta: {
            login_required: true,
            hideSidebar: false,
            isJobsOpen: true
        }
    },
    {
        path: '/job-applications/view',
        name: 'ViewApplication',
        component: ViewApplication,
        meta: {
            login_required: true,
            hideSidebar: false,
            isJobsOpen: true,
            isJobApplicationView: true
        }
    },

    // Site Settings
    {
        path: '/site-settings',
        name: 'SiteSettings',
        component: SiteSettings,
        meta: {
            login_required: true,
            hideSidebar: false,
            isSiteSettingsOpen: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return desired position
        if (savedPosition) return savedPosition
        else return { top: 0 }
    }
})

router.beforeEach(function (to, from, next) {
    if (to.meta.login_required) {
        let isLoggedInPromise = store
        .dispatch("login/getLoginStatus")
        .then((response) => {
            let isLoggedIn = response;
            if (isLoggedIn) {
                let verifiedPromise = store
                .dispatch("login/checkVerification")
                .then((result) => {
                    let verified = result.data.code;
                    if (parseInt(verified) !== 200) {
                        next("/login");
                    } else {
                        next();
                    }
                });
            } else {
                next("/login");
            }
        });
    }
    else {
        next();
    }
});

export default router