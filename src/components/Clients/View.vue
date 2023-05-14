<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="bg-white rounded-md p-6 m-6">
            <p class="text-left text-xl font-semibold pb-6">View Client List</p>
            <div>
                <div class="w-full">
                    <DataTable ref="dt" :value="clients" stripedRows dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="serial" header="#" style="width: 5rem">
                            <template #body="{ data }">
                                {{ clients.indexOf(data) + 1 }}
                            </template>
                        </Column>
                        
                        <Column field="name" header="Client Name" :sortable="true" style="max-width:25rem"></Column>

                        <Column :exportable="false" header="Client Image" :sortable="true" style="max-width:12rem">
                            <template #body="{data}">
                                <img class="rounded-md w-28 h-28" :src="host + data.logo" alt="">
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="max-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <button @click="editClient(slotProps.data)" class="bg-secondary hover:bg-primary rounded-full w-9 h-9"><i class="pi pi-pencil" style="font-size: 1rem; color: white;"></i></button>
                                    </div>
                                    <div class="ml-2">
                                        <button @click="confirmDeleteClient(slotProps.data)" class="bg-red-700 hover:bg-red-800 rounded-full w-9 h-9"><i class="pi pi-trash" style="font-size: 1rem; color: white;"></i></button>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Edit Client Dialog -->
                <Dialog v-model:visible="editDialog" :style="{ width: '800px' }" header="Edit Client Data" :modal="true" class="p-fluid">
                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Client Name</p>
                        <InputText type="text" class="w-full dropdown-height" v-model="temp_client.name" placeholder="Name" />
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Client Logo</p>
                        <div class="flex items-center">
                            <img v-if="show_logo" class="h-36 w-36" :src="show_logo">
                            <input :class="temp_client.logo ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="clientLogo">
                        </div>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideEditDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveClientEdit" />
                    </template>
                </Dialog>

                <!-- Edit Client Dialog -->
                <Dialog v-model:visible="deleteClientDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="temp_client">Are you sure you want to delete <b>{{ temp_client.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteClientDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteClient(temp_client.id)" />
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
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        DataTable,
        Column,
        Button,
        Dialog,
        Toast
    },

    data() {
        return {
            host: "https://catchlab-api.smicee.com",
            
            editDialog: false,
            deleteClientDialog: false,
            temp_client: {},

            temp_client: {
                id: null,
                name: "",
                logo: null
            },
            show_logo: null
        }
    },

    computed: {
        ...mapState ({
            clients: state => state.clients.client_list,
        })
    },

    mounted() {
        this.$store.dispatch('clients/getClientList')
    },

    methods: {
        clientLogo(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.temp_client.logo = e.target.result;
                this.show_logo = e.target.result;
            };
        },

        editClient(client) {
            this.editDialog = true;
            this.temp_client = client;
            this.show_logo = this.host + client.logo
        },

        hideEditDialog () {
            this.editDialog = false;
            this.$store.dispatch('clients/getClientList')
        },

        saveClientEdit () {
            console.log(this.temp_client)
            this.$store.dispatch('clients/editClient', { client: this.temp_client, id: this.temp_client.id }).then(response => {
                console.log(response.data.response)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.hideEditDialog()
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        confirmDeleteClient (client) {
            this.temp_client = client;
            this.deleteClientDialog = true;
        },

        deleteClient (id) {
            this.$store.dispatch("clients/deleteClient", id).then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
            this.deleteClientDialog = false;
            this.client = {};
        },
    }
}
</script>

<style scoped>
.p-button {
    @apply border border-green-200 hover:border-green-300
}
</style>
