<template>
    <layout-div>
        <h2 class="text-center mt-5 mb-3">Include New Learned Technology</h2>
        <div class="card">
            <div class="card-header">
                <router-link class="btn btn-outline-info float-right" to="/"> View All Tech Stacks Learned
                </router-link>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label htmlFor="name">Name</label>
                        <input v-model="technology.name" type="text" class="form-control" id="name" name="name" />
                    </div>
                    <div class="form-group">
                        <label htmlFor="isFrameworkOrLib">Is a Framework or a Lib?</label> &nbsp;
                        <input v-model="technology.isFrameworkOrLib" type="checkbox" class="form-check-input"
                            id="isFrameworkOrLib" name="isFrameworkOrLib" :checked="technology.isFrameworkOrLib" />
                    </div>
                    <div class="form-group">
                        <label htmlFor="currentVersion">Current Version</label>
                        <input v-model="technology.currentVersion" type="number" min="0.1" class="form-control"
                            id="currentVersion" name="currentVersion" />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select class="form-select form-select-sm w-25" v-model="technology.category">
                            <option disabled value="">Please select one</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Devops">Devops</option>
                            <option value="Database">Database</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="skillLevel">Skill Level</label>
                        <select class="form-select form-select-sm w-25" v-model="technology.skillLevel">
                            <option disabled value="">Please select one</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Skilled">Skilled</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <button @click="handleSave()" :disabled="isSaving" type="button"
                        class="btn btn-outline-primary mt-3">
                        Save Learned Technology
                    </button>
                </form>
            </div>
        </div>
    </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2';

export default {
    name: 'TechStackCreate',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            technology: {
                name: '',
                isFrameworkOrLib: false,
                currentVersion: 0.0,
                category: '',
                skillLevel: ''
            },
            isSaving: false,
        };
    },
    methods: {
        async handleSave() {
            this.isSaving = true
            await axios.post('api/Technologies', this.technology)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Technology saved successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.isSaving = false
                    this.technology.name = ""
                    this.technology.currentVersion = 0.0;
                    this.technology.isFrameworkOrLib = false
                    this.technology.category = ""
                    this.technology.skillLevel = ""
                    return response
                })
                .catch(error => {
                    this.isSaving = false
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occurred!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return error
                });
        },
    },
};

</script>