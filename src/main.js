import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/app.scss";

import axios from "axios";
import VueAxios from "vue-axios";

import swal from "sweetalert2";
window.swal = require('sweetalert2');
const toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
window.toast = toast;
window.Fire = new Vue();

Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://localhost:8000/api/v1";
// Vue.http.options.root = "http://localhost:8000/api/v1";

// websanova
Vue.router = router;
Vue.use(require("@websanova/vue-auth"), {
  auth: require("@websanova/vue-auth/drivers/auth/bearer.js"),
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js"),
  rolesVar: "role",
  tokenStore: ["localStorage", "cookie"]
});

import VuePageTransition from 'vue-page-transition';
 
Vue.use(VuePageTransition);

// VForm
import { Form, HasError, AlertError } from "vform";

window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
