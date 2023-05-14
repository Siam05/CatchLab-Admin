<template>
    <div class="w-full">
        <Header />
        <View />
        <Footer />
    </div>
</template>

<script>
import View from '../../../components/Services/View.vue'
import Header from '../../../components/Header/Header.vue'
import Footer from '../../../components/Footer/Footer.vue'

export default {
    components: {
        View,
        Header,
        Footer
    }
}
</script>
