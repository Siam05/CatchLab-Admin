<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Edit Category</p>
                </div>

                <div>
                    <div class="pb-6">
                        <p class="pb-1 text-gray-500">Category Title</p>
                        <InputText type="text" class="w-full dropdown-height" v-model="temp_category.title" placeholder="Service title" />
                    </div>

                    <!-- <div class="pb-6">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img class="h-40 w-40" :src="show_image">
                            <input class="ml-4" type="file" accept="image/*" @change="categoryImage">
                        </div>
                    </div> -->

                    <!-- <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description</p>
                        <Editor v-model="temp_category.description" editorStyle="height: 320px" />
                    </div> -->
                    
                    <div class="flex justify-center py-10">
                        <button @click="submit" class="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import Editor from 'primevue/editor';

export default {
    props: ['slug'],

    components: {
        InputText,
        Toast,
        Editor
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            temp_category: {
                id: null,
                title: "",
                // description: "",
                // image: null
            },
            // show_image: null
        }
    },

    computed: {
        ...mapState ({
            categories: state => state.categories.category_details
        })
    },

    mounted() {
        this.$store.dispatch('categories/getCategoryDetails', this.slug)
    },

    watch: {
        categories(oldValue, newValue) {
            this.temp_category.id = this.categories.id
            this.temp_category.title = this.categories.title
            // this.temp_category.description = this.categories.description
            // this.show_image = this.host + this.categories.image
        }
    },

    methods: {
        submit() {
            console.log(this.temp_category)
            this.$store.dispatch('categories/editCategory', { categories: this.temp_category, id: this.temp_category.id }).then(response => {
                console.log(response.data.response)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/categories/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        // categoryImage(e){
        //     const image = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.readAsDataURL(image);
        //     reader.onload = e =>{
        //         this.temp_category.image = e.target.result;
        //         this.show_image = e.target.result;
        //     };
        // }
    }
}
</script>
