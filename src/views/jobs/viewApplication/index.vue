<template>
    <div class="w-full">
        <Header />
        <ViewApplication />
        <Footer />
    </div>
</template>

<script>
import ViewApplication from '../../../components/Jobs/ViewApplication.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewApplication,
        Header,
        Footer
    }
}
</script>
