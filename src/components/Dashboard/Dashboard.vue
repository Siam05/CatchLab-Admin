<template>
    <div class="w-full flex flex-col items-center bg-gray-100 screen-height">
        <div class="w-full p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Dashboard</p>
                    <p class="text-sm">Hi! Welcome to the Dashboard of Catch Bangladesh</p>
                </div>

                <div class="grid grid-cols-4 gap-4 text-white">
                    <!-- Total Categories -->
                    <router-link to="/categories/view">
                        <div class="bg-secondary rounded-md p-4 flex">
                            <div class="bg-white rounded-full w-16 h-16">
                                <p class="flex justify-center items-center h-full text-secondary"><i class="pi pi-star" style="font-size: 1.8rem"></i></p>
                            </div>
                            <div class="pl-4 flex items-center">
                                <div class="font-semibold">
                                    <p class="text-2xl">{{ items.event }}</p>
                                    <p>Total Categories</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Projects -->
                    <router-link to="/projects/view">
                        <div class="bg-secondary rounded-md p-4 flex">
                            <div class="bg-white rounded-full w-16 h-16">
                                <p class="flex justify-center items-center h-full text-secondary"><i class="pi pi-gift" style="font-size: 1.8rem"></i></p>
                            </div>
                            <div class="pl-4 flex items-center">
                                <div class="font-semibold">
                                    <p class="text-2xl">{{ items.hotel }}</p>
                                    <p>Total Projects</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Services -->
                    <router-link to="/services/view">
                        <div class="bg-secondary rounded-md p-4 flex">
                            <div class="bg-white rounded-full w-16 h-16">
                                <p class="flex justify-center items-center h-full text-secondary"><i class="pi pi-paperclip" style="font-size: 1.8rem"></i></p>
                            </div>
                            <div class="pl-4 flex items-center">
                                <div class="font-semibold">
                                    <p class="text-2xl">{{ items.blog }}</p>
                                    <p>Total Services</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Clients -->
                    <router-link to="/clients/view">
                        <div class="bg-secondary rounded-md p-4 flex">
                            <div class="bg-white rounded-full w-16 h-16">
                                <p class="flex justify-center items-center h-full text-secondary"><i class="pi pi-users" style="font-size: 1.8rem"></i></p>
                            </div>
                            <div class="pl-4 flex items-center">
                                <div class="font-semibold">
                                    <p class="text-2xl">{{ items.review }}</p>
                                    <p>Total Clients</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    components: {},

    data() {
        return {}
    },

    computed: {
        ...mapState({
            items: state => state.dashboard.items
        })
    },

    mounted() {
        this.$store.dispatch('dashboard/get_Items_Count')
    },
}
</script>
