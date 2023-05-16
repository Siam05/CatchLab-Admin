<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Create Project</p>
                </div>

                <div>
                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Project Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="project.title" placeholder="Project Title" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Client Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="project.client_name" placeholder="Client name" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Featured</p>
                            <Dropdown
                                v-model="project.featured"
                                :options="statuses"
                                placeholder="Select a status"
                                option-label="label"
                                option-value="value"
                                class="w-full dropdown-height flex items-center"
                            >
                            </Dropdown>
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Category</p>
                            <Dropdown
                                v-model="project.category"
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
                            <InputText type="text" class="w-full dropdown-height" v-model="project.link" placeholder="YouTube Video Link" />
                        </div>
                    </div>

                    <!-- <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img v-if="project.image" class="h-40 w-40" :src="project.image">
                            <img v-else class="h-40 w-40 border border-gray-300" src="../../assets/empty_image.jpg">
                            <input :class="project.image ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="projectImage">
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Details</p>
                        <Editor v-model="project.details" editorStyle="height: 320px" />
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
import Dropdown from "primevue/dropdown";
import Toast from 'primevue/toast';
import Editor from 'primevue/editor';

export default {
    components: {
        InputText,
        Dropdown,
        Toast,
        Editor
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            project: {
                title: "",
                client_name: "",
                // details: "",
                featured: null,
                category: null,
                link: null,
                // image: null
            },
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
        ...mapState({
            categories: state => state.categories.category_list
        }),
    },

    mounted() {
        this.$store.dispatch('categories/getCategoryList')
    },

    methods: {
        submit() {
            this.$store.dispatch('projects/createProject', this.project).then(response => {
                console.log(response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.project.title= ""
                    this.project.client_name = ""
                    // this.project.details = ""
                    this.project.featured = null
                    this.project.category = null
                    this.project.link = null
                    // this.project.image = null
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        // projectImage(e){
        //     const image = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.readAsDataURL(image);
        //     reader.onload = e =>{
        //         this.project.image = e.target.result;
        //     };
        // }
    }
}
</script>
