<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Site Settings</p>
                </div>

                <div>
                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Phone Number</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.phone_number" placeholder="Phone number" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Email</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.email" placeholder="Email" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Address</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.address" placeholder="Address" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Company Profile</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.company_profile" placeholder="Company profile" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Facebook Link</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.fb_link" placeholder="Facebook link" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">LinkedIn Link</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.linkedIn_link" placeholder="LinkedIn link" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description (Up to 40 words)</p>
                        <Textarea class="w-full" v-model="site_setting.description" :autoResize="true" rows="4" cols="30" placeholder="Description" />
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Logo</p>
                        <div class="flex items-center">
                            <img class="h-24" :src="show_logo">
                            <input :class="site_setting.logo ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="siteLogo">
                        </div>
                    </div>

                    <div class="flex pb-6">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Banner one Image</p>
                            <div class="flex items-center">
                                <img class="h-12" :src="show_banner1_img">
                                <input :class="site_setting.banner1_img ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="banner1Image">
                            </div>
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Banner one Link</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.banner1_link" placeholder="Banner one link" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Banner two Image</p>
                            <div class="flex items-center">
                                <img class="h-12" :src="show_banner2_img">
                                <input :class="site_setting.banner2_img ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="banner2Image">
                            </div>
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Banner two Link</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="site_setting.banner2_link" placeholder="Banner two link" />
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
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        Textarea,
        Toast
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            site_setting: {
                phone_number: "",
                address: "",
                email: "",
                company_profile: "",
                fb_link: "",
                linkedIn_link: "",
                description: "",
                logo: null,
                banner1_img: null,
                banner1_link: "",
                banner2_img: null,
                banner2_link: ""
            },
            show_logo: null,
            show_banner1_img: null,
            show_banner2_img: null
        }
    },

    computed: {
        ...mapState ({
            site_settings: state => state.site_settings.site_settings
        })
    },

    mounted() {
        this.$store.dispatch('site_settings/getSiteSettings')
    },

    watch: {
        site_settings(oldValue, newValue) {
            this.site_setting.id = this.site_settings.id
            this.site_setting.phone_number = this.site_settings.phone_number
            this.site_setting.address = this.site_settings.address
            this.site_setting.email = this.site_settings.email
            this.site_setting.company_profile = this.site_settings.company_profile
            this.site_setting.fb_link = this.site_settings.fb_link
            this.site_setting.linkedIn_link = this.site_settings.linkedIn_link
            this.site_setting.description = this.site_settings.description
            this.show_logo = this.host + this.site_settings.logo
            this.show_banner1_img = this.host + this.site_settings.banner1_img
            this.site_setting.banner1_link = this.site_settings.banner1_link
            this.show_banner2_img = this.host + this.site_settings.banner2_img
            this.site_setting.banner2_link = this.site_settings.banner2_link
        }
    },

    methods: {
        submit() {
            this.$store.dispatch('site_settings/createSiteSettings', this.site_setting).then(response => {
                console.log(response.data.response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.site_setting.phone_number= ""
                    this.site_setting.address = ""
                    this.site_setting.email = ""
                    this.site_setting.company_profile = ""
                    this.site_setting.fb_link = ""
                    this.site_setting.linkedIn_link = ""
                    this.site_setting.description = ""
                    this.site_setting.logo = null
                    this.site_setting.banner1_img = null
                    this.site_setting.banner1_link = ""
                    this.site_setting.banner2_img = null
                    this.site_setting.banner2_link = ""
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        siteLogo(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.site_setting.logo = e.target.result;
                this.show_logo = e.target.result;
            };
        },

        banner1Image(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.site_setting.banner1_img = e.target.result;
                this.show_banner1_img = e.target.result;
            };
        },

        banner2Image(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.site_setting.banner2_img = e.target.result;
                this.show_banner2_img = e.target.result;
            };
        }
    }
}
</script>