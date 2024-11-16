<template>
    <layout-div>
        <div class="container">
            <h2 class="text-center mt-5 mb-3">Tech Stack List</h2>
            <div class="card">
                <div class="card-header">
                    <router-link to="/create" class="btn btn-outline-primary">Create New Learned Technology
                    </router-link>
                </div>
                <div class="card-body">
                    <div v-if="technologies.length === 0" class="text-center p-3">
                        <p class="h5 text-muted">No technologies found</p>
                    </div>
                    <table v-else class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Is Framework or Lib?</th>
                                <th>Current version</th>
                                <th>Category</th>
                                <th>Skill Level</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="technology in technologies" :key="technology.id">
                                <td>{{ technology.name }}</td>
                                <td>
                                    <input type="checkbox" v-model="technology.isFrameworkOrLib" disabled />
                                </td>
                                <td>{{ technology.currentVersion }}</td>
                                <td>{{ technology.category }}</td>
                                <td>{{ technology.skillLevel }}</td>
                                <td class="text-center">
                                    <router-link :to="`/show/${technology.id}`"
                                        class="btn btn-outline-info mx-1">Details</router-link>
                                    <router-link :to="`/edit/${technology.id}`"
                                        class="btn btn-outline-success mx-1">Edit</router-link>
                                    <button @click="handleDelete(technology.id)"
                                        className="btn btn-outline-danger mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2';

export default {
    name: 'TechStackList',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            technologies: []
        };
    },
    created() {
        this.fetchTechStackList();
    },
    methods: {
        async fetchTechStackList() {
            await axios.get('/api/Technologies')
                .then(response => {
                    this.technologies = response.data.data;
                    return response;
                })
                .catch(error => {
                    return error
                });
        },
        handleDelete(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/api/Technologies/${id}`)
                        .then(response => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Technology deleted successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.fetchTechStackList();
                            return response
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'An Error Ocurred!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            return error
                        });
                }
            })
        }
    },
};
</script>