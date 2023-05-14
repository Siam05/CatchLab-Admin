<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="bg-white rounded-md p-6 m-6">
            <p class="text-left text-xl font-semibold pb-6">View Categories</p>
            <div>
                <div class="">
                    <DataTable ref="dt" :value="categories" stripedRows dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                        <Column field="serial" header="#" style="width: 5rem">
                            <template #body="{ data }">
                                {{ categories.indexOf(data) + 1 }}
                            </template>
                        </Column>
                        
                        <Column field="title" header="Category Title" :sortable="true" style="min-width:25rem"></Column>

                        <Column :exportable="false" header="Description" :sortable="true" style="min-width:12rem">
                            <template #body="{data}">
                                <div v-if="data.description.length < 200" v-html="data.description"></div>
                                <div v-else v-html="data.description.substring(0, 200)"></div>
                            </template>
                        </Column>

                        <Column :exportable="false" header="Image" :sortable="true" style="min-width:12rem">
                            <template #body="{data}">
                                <img class="rounded-md w-20 h-20" :src="host + data.image" alt="">
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="min-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <router-link :to="{ path: '/categories/edit/' + slotProps.data.slug }">
                                            <button class="bg-secondary hover:bg-primary rounded-full w-9 h-9"><i class="pi pi-pencil" style="font-size: 1rem; color: white;"></i></button>
                                        </router-link>
                                    </div>
                                    <div class="ml-2">
                                        <button @click="confirmDeleteCategory(slotProps.data)" class="bg-red-700 hover:bg-red-800 rounded-full w-9 h-9"><i class="pi pi-trash" style="font-size: 1rem; color: white;"></i></button>
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <Dialog v-model:visible="deleteCategoryDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="temp_category">Are you sure you want to delete <b>{{ temp_category.title }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCategoryDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCategory(temp_category.id)" />
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

            deleteCategoryDialog: false,
            temp_category: {}
        }
    },

    computed: {
        ...mapState ({
            categories: state => state.categories.category_list
        })
    },

    mounted() {
        this.$store.dispatch('categories/getCategoryList')
    },

    methods: {
        confirmDeleteCategory (category) {
            this.temp_category = category;
            this.deleteCategoryDialog = true;
        },
        deleteCategory (id) {
            this.$store.dispatch("categories/deleteCategory", id).then(response => {
                console.log(response.data)
                if(response.data.code == 200) {
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
            this.deleteCategoryDialog = false;
            this.category = {};
        },
    }
}
</script>

<style scoped>
.p-button {
    @apply border border-green-200 hover:border-green-300
}
</style>
