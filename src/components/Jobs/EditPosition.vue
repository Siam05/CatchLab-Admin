<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6 w-full">
            <div class="bg-white text-left p-6 rounded-lg shadow-md">
                <div class="pb-4">
                    <p class="text-xl font font-semibold pb-1">Edit Job Position</p>
                </div>

                <div>
                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Title</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="job_position.title" placeholder="Title" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Available Positions</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="job_position.available_position" placeholder="Available positions" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Active</p>
                            <Dropdown
                                v-model="job_position.is_active"
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
                            <p class="pb-1 text-gray-500">Deadline</p>
                            <Calendar
                                class="w-full dropdown-height"
                                id="invoice-date"
                                v-model="job_position.deadline"
                                :show-icon="true"
                                placeholder="Select a date"
                            />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Qualification</p>
                        <Editor v-model="qualification.details" editorStyle="height: 320px" />
                    </div>

                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Job Type</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="job_description.type" placeholder="Job type" />
                        </div>

                        <div class="w-full pl-3">
                            <p class="pb-1 text-gray-500">Job Salary</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="job_description.salary" placeholder="Job Salary" />
                        </div>
                    </div>

                    <div class="flex pb-4">
                        <div class="w-1/2 pr-3">
                            <p class="pb-1 text-gray-500">Job Location</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="job_description.location" placeholder="Job Location" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description</p>
                        <Editor v-model="job_description.description" editorStyle="height: 320px" />
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
import Editor from 'primevue/editor';
import Toast from 'primevue/toast';
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import moment from "moment";

export default {
    props: ['slug'],

    components: {
        InputText,
        Editor,
        Toast,
        Dropdown,
        Calendar,
        moment
    },

    data() {
        return {
            host: "https://api.catchbangladesh.com",

            job_position: {
                title: "",
                available_position: null,
                is_active: "",
                // deadline: ""
            },
            qualification: {
                details: ""
            },
            job_description: {
                type: "",
                post: "",
                location: "",
                salary: "",
                description: ""

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
        ...mapState ({
            job_positions: state => state.jobs.job_position_by_id
        })
    },

    mounted() {
        this.$store.dispatch('jobs/getJobPositionById', this.slug)
    },

    watch: {
        job_positions(oldValue, newValue) {
            this.job_position.id = this.job_positions.id
            this.job_position.title = this.job_positions.title
            this.job_position.available_position = this.job_positions.available_position
            this.job_position.is_active = this.job_positions.is_active
            this.job_position.deadline = this.job_positions.deadline
            this.qualification.details = this.job_positions.qualification.details
            this.job_description.type = this.job_positions.job_description.type
            this.job_description.post = this.job_positions.job_description.post
            this.job_description.location = this.job_positions.job_description.location
            this.job_description.salary = this.job_positions.job_description.salary
            this.job_description.description = this.job_positions.job_description.description
        }
    },

    methods: {
        submit() {
            console.log(this.temp_case)
            this.$store.dispatch('jobs/editJobPosition', {
                id: this.slug,
                job_position: this.job_position,
                qualification: this.qualification,
                job_description: this.job_description
            }).then(response => {
                console.log(response.data.response)
                if(response.data.status == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.message, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/job-positions/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.message, closable: false, life: 3000})
                }
            })
        }
    }
}
</script>
