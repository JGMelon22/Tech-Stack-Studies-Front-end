<template>
    <layout-div>
        <h2 class="text-center mt-5 mb-3">Show Tech Stack</h2>
        <div class="card">
            <div class="card-header">
                <router-link
                    class="btn btn-outline-info float-right"
                    to="/"> View All Tech Stacks Learned
                </router-link>
            </div>
            <div className="card-body">
            <b className="text-muted">Name:</b>
            <p>{{ technology.name }}</p>
            <b className="text-muted">Is Framework Or Lib?</b>&nbsp;
            <input type="checkbox" className="form-check-input" :checked="technology.isFrameworkOrLib" disabled /><br/><br/>
            <b className="text-muted">Category:</b>
            <p>{{ technology.category }}</p>            
            <b className="text-muted">Skill Level:</b>
            <p>{{ technology.skillLevel }}</p>
        </div>

        </div>
    </layout-div>
</template>


<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2';

export default {
    name: 'TechStackShow',
    components: {
        LayoutDiv,
    },
    data(){
        return {
            technology: {
                name: '',
                isFrameworkOrLib: false,
                currentVersion: 0.0,
                category: '',
                skillSet: ''
            },
            isSaving: false
        };
    },
    created() {
        const id = this.$route.params.id; 
        axios.get(`/api/Technologies/${id}`)
        .then(response => {
            let technologyInfo = response.data.data
            this.technology.name = technologyInfo.name
            this.technology.isFrameworkOrLib = technologyInfo.isFrameworkOrLib
            this.technology.currentVersion = technologyInfo.currentVersion
            this.technology.category = technologyInfo.category
            this.technology.skillLevel = technologyInfo.skillLevel
            return response
        })
        .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500
                })
                return error
        })
    },
    methods: {
        
    },
};

</script>