<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Create Service</p>
                </div>

                <div>
                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Service Title</p>
                        <InputText type="text" class="w-full dropdown-height" v-model="service.title" placeholder="Service Title" />
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Icon</p>
                        <div class="flex items-center">
                            <img v-if="service.icon" class="h-40 w-40" :src="service.icon">
                            <img v-else class="h-40 w-40 border border-gray-300" src="../../assets/empty_image.jpg">
                            <input :class="service.icon ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="serviceIcon">
                        </div>
                    </div>

                    <!-- <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description</p>
                        <Editor v-model="service.description" editorStyle="height: 320px" />
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
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import Editor from 'primevue/editor';

export default {
    components: {
        InputText,
        Toast,
        Editor
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            service: {
                title: "",
                description: "something",
                icon: ""
            }
        }
    },

    methods: {
        submit() {
            this.$store.dispatch('services/createService', this.service).then(response => {
                console.log(response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.service.title= ""
                    this.service.description = "something"
                    this.service.icon = null
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
                this.service.icon = e.target.result;
            };
        }
    }
}
</script>
