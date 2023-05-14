<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Create Client</p>
                </div>

                <div>
                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Client Name</p>
                        <InputText type="text" class="w-full dropdown-height" v-model="client.name" placeholder="Client name" />
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Client Logo</p>
                        <div class="flex items-center">
                            <img v-if="client.logo" class="h-40 w-40" :src="client.logo">
                            <img v-else class="h-40 w-40 border border-gray-300" src="../../assets/empty_image.jpg">
                            <input :class="client.logo ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="clientLogo">
                        </div>
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
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        Toast
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            client: {
                name: "",
                logo: null,
            }
        }
    },

    methods: {
        submit() {
            this.$store.dispatch('clients/createClient', this.client).then(response => {
                console.log(response.data.response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.client.name= ""
                    this.event.logo = null
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        clientLogo(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.client.logo = e.target.result;  
            };
        }
    }
}
</script>
