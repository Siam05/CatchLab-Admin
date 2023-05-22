<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="bg-white rounded-md p-6 m-6">
            <p class="text-left text-xl font-semibold pb-6">View Job Applications</p>
            <div>
                <div class="">
                    <DataTable ref="dt" :value="job_applications" stripedRows dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Job Applications" responsiveLayout="scroll">

                        <Column field="serial" header="#" style="width: 5rem">
                            <template #body="{ data }">
                                {{ job_applications.indexOf(data) + 1 }}
                            </template>
                        </Column>

                        <Column field="name" header="Name" :sortable="true" style="min-width:15rem">
                            <template #body="{data}">
                                <div class="">
                                    <p class="font-semibold">{{ data.name }}</p>
                                    <p class="text-secondary text-sm mt-2">{{ data.position_data.title }}</p>
                                </div>
                            </template>
                        </Column>

                        <Column header="Contact" :sortable="true" style="min-width:15rem">
                            <template #body="{data}">
                                <div class="flex flex-col">
                                    <a class="rounded-xl hover:text-secondary" :href="`mailto:${ data.email }`">{{ data.email }}</a>
                                    <a class="rounded-xl hover:text-secondary mt-2" :href="`tel:${ data.phone }`">{{ data.phone }}</a>
                                </div>
                            </template>
                        </Column>

                        <Column header="Links" :sortable="true" style="min-width:10rem">
                            <template #body="{data}">
                                <div class="flex flex-col">
                                    <a :href="data.facebook" target="_blank">Facebook Link</a>
                                    <a class="my-2" :href="data.linkedIn" target="_blank">LinkedIn Link</a>
                                    <a :href="data.portfolio" target="_blank">Portfolio Link</a>
                                </div>
                            </template>
                        </Column>


                        <Column header="CV" :sortable="true" style="min-width:10rem">
                            <template #body="{data}">
                                <div class="">
                                    <a class="px-2 py-1 bg-secondary text-white cursor-pointer rounded-xl" :href="host + data.cv" target="_blank">Read</a>
                                </div>
                            </template>
                        </Column>

                        <Column header="Date" :sortable="true" style="min-width:8rem">
                            <template #body="{data}">
                                <div class="">
                                    <p>{{ getDeadLine(data.created_on) }}</p>
                                </div>
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                                <div>
                                    <button @click="confirmDeleteJobApplication(slotProps.data)" class="bg-red-700 hover:bg-red-800 rounded-full w-9 h-9"><i class="pi pi-trash" style="font-size: 1rem; color: white;"></i></button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Delete Dialog -->
                <Dialog v-model:visible="deleteJobApplicationDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="temp_job_application">Are you sure you want to delete <b>{{ temp_job_application.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteJobApplicationDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteJobApplication(temp_job_application.id)" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import moment from "moment";

export default {
    components: {
        InputText,
        DataTable,
        Column,
        Dialog,
        Button,
        Toast,
        moment
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",

            deleteJobApplicationDialog: false,
            temp_job_application: {}
        }
    },

    computed: {
        ...mapState ({
            job_applications: state => state.jobs.job_applications
        })
    },

    mounted() {
        this.$store.dispatch('jobs/getJobApplications')
    },

    methods: {
        getDeadLine (deadline) {
            return moment(deadline).format('MMMM Do, YYYY')
        },

        confirmDeleteJobApplication (jobApplication) {
            this.temp_job_application = jobApplication;
            this.deleteJobApplicationDialog = true;
        },

        deleteJobApplication (id) {
            this.$store.dispatch("jobs/deleteJobApplication", id).then(response => {
                console.log(response.data)    
                if(response.data.status == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.message, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.message, closable: false, life: 3000})
                }
            })
            this.deleteJobApplicationDialog = false;
            this.jobApplication = {};
        },
    }
}
</script>

<style scoped>
.p-button {
    @apply border border-green-200 hover:border-green-300
}
</style>
