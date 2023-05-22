<template>
    <div>
        <Header />
        <EditPosition :slug="getEditData()" />
        <Footer />
    </div>
</template>

<script>
import EditPosition from '../../../components/Jobs/EditPosition.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        EditPosition,
        Header,
        Footer
    },

    methods: {
        getEditData() {
            return this.$route.params.id
        }
    }
}
</script>
