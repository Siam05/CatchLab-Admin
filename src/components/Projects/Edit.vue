<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Edit Project</p>
                </div>

                <div>
                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Project Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="temp_project.title" placeholder="Service title" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Client Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="temp_project.client_name" placeholder="Client name" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Featured</p>
                            <Dropdown
                                v-model="temp_project.featured"
                                :options="statuses"
                                placeholder="Select a status"
                                option-label="label"
                                option-value="value"
                                class="w-full dropdown-height flex items-center"
                            >
                                <template #value="slotProps">
                                    <div class="capitalize" v-if="slotProps.value">
                                        {{ slotProps.value }}
                                    </div>
                                    <div v-else>
                                        {{ slotProps.placeholder }}
                                    </div>
                                </template>
                            </Dropdown>
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Category</p>
                            <Dropdown
                                v-model="temp_project.category"
                                :options="categories"
                                placeholder="Select category"
                                option-label="title"
                                option-value="id"
                                class="w-full dropdown-height flex items-center"
                            >
                            </Dropdown>
                        </div>
                    </div>

                    <div class="pb-4">
                        <div class="w-1/2 pr-3">
                            <p class="pb-1 text-gray-500">YouTube Video Link</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="temp_project.link" placeholder="YouTube Video Link" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img class="h-40 w-40" :src="show_image">
                            <input class="ml-4" type="file" accept="image/*" @change="projectImage">
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Details</p>
                        <Editor v-model="temp_project.details" editorStyle="height: 320px" />
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
import Dropdown from "primevue/dropdown";
import Toast from 'primevue/toast';
import Editor from 'primevue/editor';

export default {
    props: ['slug'],

    components: {
        InputText,
        Dropdown,
        Toast,
        Editor
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            temp_project: {
                title: "",
                client_name: "",
                details: "",
                featured: null,
                category: null,
                link: null,
                image: null
            },
            show_image: null,

            statuses: [
                {
                    label: "True",
                    value: "true",
                },
                {
                    label: "False",
                    value: "false",
                },
            ],
        }
    },

    computed: {
        ...mapState ({
            projects: state => state.projects.project_details,
            categories: state => state.categories.category_list
        })
    },

    mounted() {
        this.$store.dispatch('projects/getProjectDetails', this.slug)
        this.$store.dispatch('categories/getCategoryList')
    },

    watch: {
        projects(oldValue, newValue) {
            this.temp_project.id = this.projects.id
            this.temp_project.title = this.projects.title
            this.temp_project.client_name = this.projects.client_name
            this.temp_project.details = this.projects.details
            this.temp_project.featured = this.projects.featured
            this.temp_project.category = this.projects.category.id
            this.temp_project.link = this.projects.link
            this.show_image = this.host + this.projects.image
        }
    },

    methods: {
        submit() {
            console.log(this.temp_project)
            this.$store.dispatch('projects/editProject', { projects: this.temp_project, id: this.temp_project.id }).then(response => {
                console.log(response.data.response)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/projects/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        projectImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_project.image = e.target.result;
                this.show_image = e.target.result;
            };
        }
    }
}
</script>
