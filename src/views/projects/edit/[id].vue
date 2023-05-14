<template>
    <div>
        <Header />
        <Edit :slug="getEditData()" />
        <Footer />
    </div>
</template>

<script>
import Edit from '../../../components/Projects/Edit.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        Edit,
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
