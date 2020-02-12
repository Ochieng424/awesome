<template>
  <div class="container" style="padding-top: 50px">
    <p>
    	<button class="btn btn-primary btn-sm" type="button" @click="addNew()">
    		<i class="fa fa-plus"></i>
    	  New Project
        </button>
        <button class="btn btn-dark btn-sm ml-4" type="button" @click="view()">
            <i class="fa fa-eye"></i>
            View Project
        </button>
    </p>
    <hr>
    <div class="col-sm-12" v-if="isAdd">
    	<div class="alert alert-success" role="alert" v-if="success">
            Project added successfully!
          </div>
    	<div class="row">
    		<div class="col">
    		<div class="form-group">
            <label>Title</label>
            <input
              v-model="formAdd.title"
              type="text"
              name="title"
              placeholder="Title"
              class="form-control"
            />
            <small style="color: red" v-if="error && errors.title">{{
              errors.title[0]
            }}</small>
          </div>
          </div>
          <div class="col">
          	<div class="form-group">
            <label v-if="!isEdit">Cover Image</label><br />
                <label v-if="isEdit">Select another Image to Change</label><br />
            <input
              type="file"
              class="form-control"
              @change="fieldChange"
              id="image"
              accept="image/*"
            />
            <small style="color: red" v-if="error && errors.image">{{
              errors.image[0]
            }}</small>
          </div>

      </div>
  </div>
  <div class="row">
    		<div class="col">
    		<div class="form-group">
            <label>Source Code Link</label>
            <input
              v-model="formAdd.code"
              type="url"
              name="source"
              placeholder="Source Code"
              class="form-control"
            />
            <small style="color: red" v-if="error && errors.code">{{
              errors.code[0]
            }}</small>
          </div>
          </div>
          <div class="col">
          	<div class="form-group">
            <label>Live Demo Link</label>
            <input
              v-model="formAdd.live"
              type="url"
              name="live"
              placeholder="Live Demo Link"
              class="form-control"
            />
            <small style="color: red" v-if="error && errors.live">{{
              errors.live[0]
            }}</small>
          </div>

      </div>
  </div>
  <div class="row">
          <div class="col">
          	<div class="form-group">
            <label>Description</label>
            <vue-editor v-model="formAdd.description"></vue-editor>
            <small style="color: red" v-if="error && errors.description">{{
              errors.description[0]
            }}</small>
          </div>
          </div>
          <div class="col">

          </div>
    	</div>
    	<hr>
    	<div class="row">
    		<div class="col">
    		<button v-if="isAdd && !isEdit" type="button" class="btn btn-dark" @click="postProject">Submit</button>
                <button v-if="isEdit" type="button" class="btn btn-success" @click="updateProject">Update</button>
    		</div>
    	</div>
    </div>
    <div class="col-sm-12" v-if="!isAdd">
        <div class="row">
            <div class="col-sm-4" v-for="project in projects.data" :key="project.id">
                <div class="card">
                    <img :src="project.image" class="card-img-top" :alt="project.title">
                    <div class="card-body">
                        <h5 class="card-title">{{project.title}}</h5>
                        <router-link :to="{path: '/projects/' +project.ref+'/more'}" class="btn btn-sm btn-primary">More</router-link>
                        <button type="button" class="btn btn-dark btn-sm ml-3" @click="editProject(project)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm ml-3" @click="deleteProject(project.id)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="vld-parent">
      <loading
        name="loader"
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </div>
</template>
<script>
    /* eslint-disable */
	import { VueEditor } from "vue2-editor";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "ProjectManage",
  components: {
    VueEditor,
    Loading
  },
  data(){
     return{
         isEdit: false,
     	image: [],
      isLoading: false,
      fullPage: true,
      errors: {},
      error: false,
      projects: {},
      isAdd: false,
      formAdd: {
             id: '',
          code: '',
          title: '',
          live: '',
          description: '',
      },
      form: new FormData(),
      success: false
     }
  },
  methods:{
      deleteProject(projectId){
          this.axios.delete('project/' + projectId);
          this.getProjects();
      },
      updateProject(){
          this.isLoading = true;
          for (let i = 0; i < this.image.length; i++) {
              this.form.append("files[]", this.image[i]);
          }
          this.form.append("title", this.formAdd.title);
          this.form.append("code", this.formAdd.code);
          this.form.append("live", this.formAdd.live);
          this.form.append("description", this.formAdd.description);

          const config = { headers: { "Content-Type": "multipart/form-data" } };

          this.axios
              .post("/update_project/" + this.formAdd.id, this.form, config)
              .then(response => {
                  this.success = true;
                  this.isLoading = false;
                  this.formAdd = {
                      code: '',
                      title: '',
                      live: '',
                      description: '',
                  };
                  this.getProjects();
                  this.form.clear();
                  this.form.reset();
                  this.image.splice(0, this.image.length);
                  this.image = [];
                  this.form.delete('files');
              })
              .catch(error => {
                  this.isLoading = false;
                  this.error = true;
                  this.errors = error.response.data.errors;
              });
      },
      editProject(project){
          this.formAdd.title = project.title;
          this.formAdd.description = project.description;
          this.formAdd.code = project.code;
          this.formAdd.live = project.live;
          this.formAdd.id = project.id;
          this.isEdit = true;
          this.isAdd = true;
      },
  	postProject() {
      this.isLoading = true;
      for (let i = 0; i < this.image.length; i++) {
        this.form.append("files[]", this.image[i]);
      }

      this.form.append("title", this.formAdd.title);
      this.form.append("code", this.formAdd.code);
      this.form.append("live", this.formAdd.live);
      this.form.append("description", this.formAdd.description);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      this.axios
        .post("/project", this.form, config)
        .then(response => {
          this.success = true;
          this.isLoading = false;
            this.formAdd = {
                code: '',
                title: '',
                live: '',
                description: '',
            };
            this.getProjects();
          this.form.clear();
          this.form.reset();
          this.image.splice(0, this.image.length);
          this.image = [];
          this.form.delete('files');
        })
        .catch(error => {
          this.isLoading = false;
          this.error = true;
          this.errors = error.response.data.errors;
        });
    },
  	fieldChange(e) {
      let selectedFiles = e.target.files;
      if (!selectedFiles.length) {
        return false;
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.image.push(selectedFiles[i]);
      }
    },
  	addNew(){
      this.isAdd = true;
  	},
      view(){
          this.isAdd = false;
      },
    getProjects(){
        this.axios.get("project").then(({data}) => ([this.projects = data]));
    },
  },
  created(){
    this.getProjects();
  }
};
</script>