<template>
  <div class="container">
    <div class="row align-items-center" style="padding-top: 80px">
      <div class="col-lg-6">
        <h1 style="color: #355841;">Software Developer</h1>
        <p class="lead mt-5 mb-8" style="color: #4d4d4d" v-html="details.about">
          
        </p>
        <p>
        	<button type="button" class="btn btn-outline-success">
        		<i class="fa fa-download"></i>
        	  Resume
            </button>
        </p>
        <hr />
        <p>
          <a
                  href="https://github.com/Ochieng424"
                  target="_blank"
          >
            <i
                    class="fa fa-2x fa-github"
                    style="color: #2c3e50; margin-right: 10px;"
            ></i>
          </a>
          <a
            href="https://www.linkedin.com/in/derrick-ochieng-75a208118/"
            target="_blank"
          >
            <i
              class="fa fa-2x fa-linkedin"
              style="color: #2c3e50; margin-right: 10px;"
            ></i>
          </a>

          <a href="https://twitter.com/ochiengd_" target="_blank">
            <i
              class="fa fa-2x fa-twitter-square"
              style="color: #2c3e50; margin-right: 10px;"
            ></i>
          </a>

          <a href="https://www.instagram.com/ochieng_derrick/" target="_blank">
            <i
              class="fa fa-2x fa-instagram"
              style="color: #2c3e50; margin-right: 10px;"
            ></i>
          </a>
        </p>
      </div>

      <div class="col-lg-5 ml-auto d-none d-lg-block">
        <img
          src="/img/africanprogrammer-slower-internet.svg"
          alt="img"
          style="width: 350px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data(){
     return{
       details: {}
     }
  },
  methods:{
    getDetails(){
        this.axios.get("details").then(({data}) => ([this.details = data]));
    },
  },
  created(){
  	this.getDetails();
  }
};
</script>
