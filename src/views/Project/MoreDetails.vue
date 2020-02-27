<template>
    <div class="container-fluid" style="margin: 0; padding: 0">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{path: '/projects'}" style="text-decoration: none; color: blue">All Projects</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{details.title}}</li>
            </ol>
        </nav>
        <div class="container">
            <div class="row" style="padding-top: 70px">
                <div class="col-sm-5 mb-3 pl-4 pr-4">
                    <div class="row">
                        <img v-lazy="details.image" class="card-img img-fluid mx-auto" style="width: 450px;">
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>{{details.title}}</h3>
                            <hr>
                            <p v-html="details.description"></p>
                            <hr>
                            <a :href="details.code" v-if="details.code" target="_blank" type="button" class="btn btn-outline-primary btn-sm">
                                <i class="fa fa-github"></i>
                                Source Code
                            </a>
                            <a :href="details.live" target="_blank" v-if="details.live" type="button" class="btn btn-sm btn-outline-success ml-3">
                                <i class="fa fa-link"></i>
                                Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MoreDetails",
        data(){
            return{
                refNo: this.$route.params.refNo,
                details: {}
            }
        },
        methods:{
            getDetails(){
                this.axios.get("details/" + this.refNo).then(({data}) => ([this.details = data]));
            }
        },
        created() {
            this.getDetails();
        }
    }
</script>

<style scoped>

</style>