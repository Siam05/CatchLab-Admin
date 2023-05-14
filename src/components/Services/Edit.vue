<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Edit Services</p>
                </div>

                <div>
                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Service Title</p>
                        <InputText type="text" class="w-full dropdown-height" v-model="temp_service.title" placeholder="Service title" />
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Icon</p>
                        <div class="flex items-center">
                            <img class="h-40 w-40" :src="show_icon">
                            <input class="ml-4" type="file" accept="image/*" @change="serviceIcon">
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description</p>
                        <Editor v-model="temp_service.description" editorStyle="height: 320px" />
                    </div>
                    
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
            temp_service: {
                id: null,
                title: "",
                description: "",
                icon: null
            },
            show_icon: null
        }
    },

    computed: {
        ...mapState ({
            services: state => state.services.service_details
        })
    },

    mounted() {
        this.$store.dispatch('services/getServiceDetails', this.slug)
    },

    watch: {
        services(oldValue, newValue) {
            this.temp_service.id = this.services.id
            this.temp_service.title = this.services.title
            this.temp_service.description = this.services.description
            this.show_icon = this.host + this.services.icon
        }
    },

    methods: {
        submit() {
            console.log(this.temp_service)
            this.$store.dispatch('services/editService', { services: this.temp_service, id: this.temp_service.id }).then(response => {
                console.log(response.data.response)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/services/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        serviceIcon(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_service.icon = e.target.result;
                this.show_icon = e.target.result;
            };
        }
    }
}
</script>
