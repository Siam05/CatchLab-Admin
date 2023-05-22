<template>
    <div class="w-full">
        <Header />
        <CreatePosition />
        <Footer />
    </div>
</template>

<script>
import CreatePosition from '../../../components/Jobs/CreatePosition.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        CreatePosition,
        Header,
        Footer
    }
}
</script>
