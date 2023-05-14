<template>
    <div class="w-full">
        <Header />
        <Create />
        <Footer />
    </div>
</template>

<script>
import Create from '../../components/Site-Settings/Create.vue'
import Header from '../../components/Header/Header.vue'
import Footer from '../../components/Footer/Footer.vue'

export default {
    components: {
        Create,
        Header,
        Footer
    }
}
</script>
