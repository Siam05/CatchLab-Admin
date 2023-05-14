<template>
    <div class="bg-gray-100 flex">
        <div :class="!$route.meta.hideSidebar ? 'w-1/6' : 'w-0'">
            <Sidebar v-if="!$route.meta.hideSidebar" />
        </div>
        <div :class="!$route.meta.hideSidebar ? 'w-5/6' : 'w-full'">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/Header/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}

</script>

<style>
#app {
    font-family: Montserrat;
    text-align: center;
    /* font-family: 'DM Sans', sans-serif; */
}

.ck-editor__editable {
    min-height: 400px;
}

.submit-button {
    @apply bg-secondary hover:bg-primary rounded py-2 px-6 text-white
}
.dropdown-height {
    height: 34px;
}

.screen-height {
    min-height: calc(100vh - 161px);
}

@media screen and (min-width: 1536px) {
    .container {
        max-width: 1320px !important;
    }
}
</style>
