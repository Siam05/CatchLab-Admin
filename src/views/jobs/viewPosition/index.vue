<template>
    <div class="w-full">
        <Header />
        <ViewPosition />
        <Footer />
    </div>
</template>

<script>
import ViewPosition from '../../../components/Jobs/ViewPosition.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        ViewPosition,
        Header,
        Footer
    }
}
</script>
