<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="bg-white rounded-md p-6 m-6">
            <p class="text-left text-xl font-semibold pb-6">View Projects</p>
            <div>
                <div class="">
                    <DataTable ref="dt" :value="projects" stripedRows dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="serial" header="#" style="width: 5rem">
                            <template #body="{ data }">
                                {{ projects.indexOf(data) + 1 }}
                            </template>
                        </Column>
                        
                        <Column field="title" header="Project Title" :sortable="true" style="min-width:20rem"></Column>

                        <Column header="YouTube Link" :sortable="true" style="min-width:20rem">
                            <template #body="{data}">
                                <a target="_blank" class="hover:text-primary" :href="data.link">{{ data.link }}</a>
                            </template>
                        </Column>

                        <Column header="Featured" :sortable="true" style="min-width:15rem">
                            <template #body="{data}">
                                <p v-if="data.featured == true" class="w-10 p-0.5 bg-primary text-white flex items-center justify-center rounded-md">Yes</p>
                                <p v-else class="w-8 p-0.5 bg-red-700 text-white flex items-center justify-center rounded-md">No</p>
                            </template>
                        </Column>

                        <!-- <Column :exportable="false" header="Image" :sortable="true" style="min-width:15rem">
                            <template #body="{data}">
                                <img class="rounded-md w-20 h-20" :src="host + data.image" alt="">
                            </template>
                        </Column> -->

                        <Column header="Action" :exportable="false" style="min-width:10rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{ path: '/projects/edit/' + slotProps.data.slug }">
                                            <button class="bg-secondary hover:bg-primary rounded-full w-9 h-9"><i class="pi pi-pencil" style="font-size: 1rem; color: white;"></i></button>
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <button @click="confirmDeleteProject(slotProps.data)" class="bg-red-700 hover:bg-red-800 rounded-full w-9 h-9"><i class="pi pi-trash" style="font-size: 1rem; color: white;"></i></button>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteProjectDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="temp_project">Are you sure you want to delete <b>{{ temp_project.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProjectDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProject(temp_project.id)" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';

export default {
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        Toast
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",

            deleteProjectDialog: false,
            temp_project: {}
        }
    },

    computed: {
        ...mapState ({
            projects: state => state.projects.project_list
        })
    },

    mounted() {
        this.$store.dispatch('projects/getProjectList')
    },

    methods: {
        confirmDeleteProject (project) {
            this.temp_project = project;
            this.deleteProjectDialog = true;
        },
        deleteProject (id) {
            this.$store.dispatch("projects/deleteProject", id).then(response => {
                console.log(response.data)
                if(response.data.code == 200) {
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
            this.deleteProjectDialog = false;
            this.project = {};
        },
    }
}
</script>

<style scoped>
.p-button {
    @apply border border-green-200 hover:border-green-300
}
</style>
