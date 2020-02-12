<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row align-items-center" style="padding-top: 50px">
        <div class="col-lg-5 ml-auto d-none d-lg-block">
          <img src="/img/computers.svg" alt="img" style="width: 400px;" />
        </div>
        <div class="col-lg-6">
          <h4 style="color: #355841;">My Profile</h4>
          <div class="alert alert-success" role="alert" v-if="success">
            Details updated successfully!
          </div>
          <div class="form-group">
            <label>About</label>
            <vue-editor v-model="about" :editorToolbar="myToolbar"></vue-editor>
            <small style="color: red" v-if="error && errors.about">{{
              errors.about[0]
            }}</small>
          </div>
          <div class="form-group">
            <label>Update Resume</label><br />
            <input
              type="file"
              class="form-control"
              @change="fieldChange"
              id="resume"
              accept="application/pdf, application/vnd.ms-excel"
            />
            <small style="color: red" v-if="error && errors.resume">{{
              errors.resume[0]
            }}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Change Password</label>
            <input
              type="password"
              placeholder="New password"
              v-model="password"
              class="form-control"
            />
            <small style="color: red" v-if="error && errors.password">{{
              errors.password[0]
            }}</small>
          </div>
          <button
            @click.prevent="updateProfile()"
            type="button"
            class="btn btn-dark"
          >
            Update Details
          </button>
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
import { VueEditor } from "vue2-editor";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Profile",
  components: {
    VueEditor,
    Loading
  },
  data() {
    return {
      success: false,
      isSuccess: '',
      resume: [],
      isLoading: false,
      fullPage: true,
      errors: {},
      error: false,
      myToolbar: [
        ["bold", "italic"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      about: this.$auth.user().about,
      password: "",
      form: new FormData()
    };
  },
  methods: {
    fieldChange(e) {
      let selectedFiles = e.target.files;
      if (!selectedFiles.length) {
        return false;
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.resume.push(selectedFiles[i]);
      }
    },
    updateProfile() {
      this.isLoading = true;
      for (let i = 0; i < this.resume.length; i++) {
        this.form.append("files[]", this.resume[i]);
      }

      this.form.append("about", this.about);
      this.form.append("password", this.password);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      this.axios
        .post("/update", this.form, config)
        .then(response => {
          this.success = true;
          this.isLoading = false;
          this.form.clear();
          this.form.reset();
          this.resume.splice(0, this.resume.length);
          this.isSuccess = response.data.status;
          
          
        })
        .catch(error => {
          this.isLoading = false;
          this.error = true;
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
<style scoped></style>
