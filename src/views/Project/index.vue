<template>
    <div class="container" style="padding-top: 50px">
        <div class="col-sm-12">
            <div class="row">
                <div class="col-sm-4 mb-4" v-for="project in projects.data" :key="project.id">
                    <div class="card">
                        <img v-lazy="project.image" class="card-img-top" :alt="project.title">
                        <div class="card-body">
                            <h5 class="card-title">{{project.title}}</h5>
                            <router-link :to="{path: '/projects/' +project.ref+'/more'}" class="btn btn-sm btn-primary">More</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import { VueEditor } from "vue2-editor";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    export default {
        name: "index",
        data(){
            return{
                projects: {},
            }
        },
        methods:{
            getProjects(){
                this.axios.get("projects").then(({data}) => ([this.projects = data]));
            },
        },
        created(){
            this.getProjects();
        }
    };
</script>