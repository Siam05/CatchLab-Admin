<template>
    <div class="flex w-full px-5 pt-6 bg-secondary h-full">
        <div class="w-full text-gray-500">
            <!-- Logo -->
            <div class="flex justify-center mb-8 mt-4">
                <router-link to="/">
                    <img @click="visibleSidebar = false" class="w-40" src="../../assets/logoW.png" alt="">
                </router-link>
            </div>

            <!-- Dashboard -->
            <div class="my-1">
                <router-link to="/">
                    <p @click="showDashboard" :class="{ 'clicked': $route.meta.isDashboardOpen }" class="px-6 py-3 font-semibold mb-2 flex items-center rounded-md text-white"><i class="pi pi-home pr-5" style="font-size: 1.2rem"></i>Dashboard</p>
                </router-link>
            </div>

            <!-- Services -->
            <div class="my-2">
                <p class="flex items-center px-6 py-3 mb-2 font-semibold cursor-pointer rounded-md text-white" @click="showServices" :class="{ 'clicked': $route.meta.isServiceOpen }"><i class="pi pi-gift pr-5" style="font-size: 1.2rem"></i>Services</p>

                <div v-if="$route.meta.isServiceOpen || displayServices" class="text-sm">
                    <router-link to="/services/create">
                        <div :class="$route.meta.isServiceCreate ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectCreateService">
                            <i class="pi pi-file-edit pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">Create</p>
                        </div>
                    </router-link>

                    <router-link to="/services/view">
                        <div :class="$route.meta.isServiceView ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectViewService">
                            <i class="pi pi-eye pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">View</p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Categories -->
            <div class="my-2">
                <p class="flex items-center px-6 py-3 mb-2 font-semibold cursor-pointer rounded-md text-white" @click="showCategories" :class="{ 'clicked': $route.meta.isCategoryOpen }"><i class="pi pi-globe pr-5" style="font-size: 1.2rem"></i>Categories</p>

                <div v-if="$route.meta.isCategoryOpen || displayCategories" class="text-sm">
                    <router-link to="/categories/create">
                        <div :class="$route.meta.isCategoryCreate ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectCreateCategory">
                            <i class="pi pi-file-edit pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">Create</p>
                        </div>
                    </router-link>

                    <router-link to="/categories/view">
                        <div :class="$route.meta.isCategoryView ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectViewCategory">
                            <i class="pi pi-eye pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">View</p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Projects -->
            <div class="my-2">
                <p class="flex items-center px-6 py-3 mb-2 font-semibold cursor-pointer rounded-md text-white" @click="showProjects" :class="{ 'clicked': $route.meta.isProjectOpen }"><i class="pi pi-folder-open pr-5" style="font-size: 1.2rem"></i>Projects</p>

                <div v-if="$route.meta.isProjectOpen || displayProjects" class="text-sm">
                    <router-link to="/projects/create">
                        <div :class="$route.meta.isProjectCreate ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectCreateProject">
                            <i class="pi pi-file-edit pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">Create</p>
                        </div>
                    </router-link>

                    <router-link to="/projects/view">
                        <div :class="$route.meta.isProjectView ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectViewProject">
                            <i class="pi pi-eye pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">View</p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Client List  -->
            <div class="my-2">
                <p class="flex items-center px-6 py-3 mb-2 font-semibold cursor-pointer rounded-md text-white" @click="showClients" :class="{ 'clicked': $route.meta.isClientOpen }"><i class="pi pi-star pr-5" style="font-size: 1.2rem"></i>Client List</p>

                <div v-if="$route.meta.isClientOpen || displayClients" class="text-sm">
                    <router-link to="/clients/create">
                        <div :class="$route.meta.isClientCreate ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectCreateClient">
                            <i class="pi pi-file-edit pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">Create</p>
                        </div>
                    </router-link>

                    <router-link to="/clients/view">
                        <div :class="$route.meta.isClientView ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectViewClient">
                            <i class="pi pi-eye pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">View</p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Jobs  -->
            <div class="my-2">
                <p class="flex items-center px-6 py-3 mb-2 font-semibold cursor-pointer rounded-md text-white" @click="showJobs" :class="{ 'clicked': $route.meta.isJobsOpen }"><i class="pi pi-briefcase pr-5" style="font-size: 1.2rem"></i>Jobs</p>

                <div v-if="$route.meta.isJobsOpen || displayJobs" class="text-sm">
                    <router-link to="/job-position/create">
                        <div :class="$route.meta.isJobPositionCreate ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectCreateJobPosition">
                            <i class="pi pi-file-edit pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">Create Position</p>
                        </div>
                    </router-link>

                    <router-link to="/job-positions/view">
                        <div :class="$route.meta.isJobPositionView ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectViewJobPosition">
                            <i class="pi pi-eye pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">View Positions</p>
                        </div>
                    </router-link>

                    <router-link to="/job-applications/view">
                        <div :class="$route.meta.isJobApplicationView ? 'text-primary font-semibold' : 'text-white'" class="flex px-16 py-2 items-center hover:font-semibold" @click="selectViewJobApplication">
                            <i class="pi pi-eye pr-2" style="font-size: 0.8rem"></i>
                            <p class="flex justify-start">Applications</p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Site Settings -->
            <div class="my-1">
                <router-link to="/site-settings">
                    <p @click="showSiteSettings" :class="{ 'clicked': $route.meta.isSiteSettingsOpen || displaySiteSettings }" class="px-6 py-3 font-semibold mb-2 flex items-center rounded-md text-white"><i class="pi pi-wrench pr-5" style="font-size: 1.2rem"></i>Site Settings</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';

export default {
    components: {
        Sidebar,
    },

    data() {
        return {
            showServiceColor: true,
            serviceCreateColor: false,
            serviceViewColor: false,

            showCategoryColor: true,
            categoryCreateColor: false,
            categoryViewColor: false,

            showProjectColor: true,
            projectCreateColor: false,
            projectViewColor: false,

            showClientColor: true,
            clientCreateColor: false,
            clientViewColor: false,

            showJobsColor: true,
            jobPositionCreateColor: false,
            jobPositionViewColor: false,
            jobApplicationViewColor: false,

            displayDashboard: false,
            displayServices: false,
            displayCategories: false,
            displayProjects: false,
            displayClients: false,
            displayJobs: false,
            displaySiteSettings: false
        }
    },

    methods: {
        showDashboard() {
            if(this.displayDashboard == false) {
                this.displayDashboard = true
                this.displayServices = false
                this.displayCategories = false
                this.displayProjects = false
                this.displayClients = false
                this.displayJobs = false
                this.displaySiteSettings = false
            } else {
                this.displayDashboard = true
            }
        },

        showServices() {
            if (this.displayServices == false) {
                this.displayDashboard = false
                this.displayServices = true
                this.displayCategories = false
                this.displayProjects = false
                this.displayClients = false
                this.displayJobs = false
                this.displaySiteSettings = false
            } else {
                this.displayServices = true
            }
        },

        selectCreateService() {
            this.$route.meta.isServiceOpen = true
            this.showServiceColor = false
            this.serviceCreateColor = true
            this.serviceViewColor = false
        },

        selectViewService() {
            this.$route.meta.isServiceOpen = true
            this.showServiceColor = false
            this.serviceCreateColor = false
            this.serviceViewColor = true
        },

        showCategories() { 
            if (this.displayCategories == false) {
                this.displayDashboard = false
                this.displayServices = false
                this.displayCategories = true
                this.displayProjects = false
                this.displayClients = false
                this.displayJobs = false
                this.displaySiteSettings = false
            } else {
                this.displayCategories = true
            }
        },

        selectCreateCategory() { 
            this.$route.meta.isCategoryOpen = true
            this.showCategoryColor = false
            this.categoryCreateColor = true
            this.categoryViewColor = false
        },

        selectViewCategory() { 
            this.$route.meta.isCategoryOpen = true
            this.showCategoryColor = false
            this.categoryCreateColor = false
            this.categoryViewColor = true
        },

        showProjects() { 
            if (this.displayProjects == false) {
                this.displayDashboard = false
                this.displayServices = false
                this.displayCategories = false
                this.displayProjects = true
                this.displayClients = false
                this.displayJobs = false
                this.displaySiteSettings = false
            } else {
                this.displayProjects = true
            }
        },

        selectCreateProject() { 
            this.$route.meta.isProjectOpen = true
            this.showProjectColor = false
            this.projectCreateColor = true
            this.projectViewColor = false
        },

        selectViewProject() { 
            this.$route.meta.isProjectOpen = true
            this.showProjectColor = false
            this.projectCreateColor = false
            this.projectViewColor = true
        },

        showClients() {
            if (this.displayClients == false) {
                this.displayDashboard = false
                this.displayServices = false
                this.displayCategories = false
                this.displayProjects = false
                this.displayClients = true
                this.displayJobs = false
                this.displaySiteSettings = false
            } else {
                this.displayClients = true
            }
        },

        selectCreateClient() {
            this.$route.meta.isClientOpen = true
            this.showClientColor = false
            this.clientCreateColor = true
            this.clientViewColor = false
        },

        selectViewClient() {
            this.$route.meta.isClientOpen = true
            this.showClientColor = false
            this.clientCreateColor = false
            this.clientViewColor = true
        },

        showJobs() {
            if (this.displayJobs == false) {
                this.displayDashboard = false
                this.displayServices = false
                this.displayCategories = false
                this.displayProjects = false
                this.displayClients = false
                this.displayJobs = true
                this.displaySiteSettings = false
            } else {
                this.displayJobs = true
            }
        },

        selectCreateJobPosition() {
            this.$route.meta.isJobsOpen = true
            this.showJobsColor = false
            this.jobPositionCreateColor = true
            this.jobPositionViewColor = false
            this.jobApplicationViewColor = false
        },

        selectViewJobPosition() {
            this.$route.meta.isJobsOpen = true
            this.showJobsColor = false
            this.jobPositionCreateColor = false
            this.jobPositionViewColor = true
            this.jobApplicationViewColor = false
        },

        selectViewJobApplication() {
            this.$route.meta.isJobsOpen = true
            this.showJobsColor = false
            this.jobPositionCreateColor = false
            this.jobPositionViewColor = false
            this.jobApplicationViewColor = true
        },

        showSiteSettings() {            
            if(this.displaySiteSettings == false) {
                this.displayDashboard = false
                this.displayServices = false
                this.displayCategories = false
                this.displayProjects = false
                this.displayClients = false
                this.displayJobs = false
                this.displaySiteSettings = true
            } else {
                this.displaySiteSettings = true
            }
        },

        getLogout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            this.$router.push('/login')
        },
    }
}
</script>

<style scoped>
.clicked {
    @apply bg-primary;
}
</style>
