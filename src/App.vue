<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      style="padding: 20px 10px"
    >
      <router-link to="/" class="navbar-brand">
        <img
                src="/img/programmer.svg"
                alt="img"
                style="width: 35px;"
        />
        Derrick Ochieng
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/expertise" class="nav-link">Stack</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projects" class="nav-link">Projects</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
          <li class="nav-item dropdown" v-if="$auth.check()">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $auth.user().name }}
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <router-link to="/project/manage" class="dropdown-item">Projects</router-link>
              <router-link to="/profile" class="dropdown-item"
                >Profile</router-link
              >
              <a class="dropdown-item" href="#" @click.prevent="$auth.logout()"
                >Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <vue-page-transition name="fade-in-right">
    <router-view />
    </vue-page-transition>
    <footer class="text-muted mt-4" style="background-color: #f4f4f4; padding: 20px">
      <div class="container" >
        <p>Made with
         <router-link to="/login">
           <i class="fa fa-heart text-danger"></i>
         </router-link>
        </p>
        <p>© {{new Date().getFullYear()}} Ochieng!</p>
      </div>
    </footer>
  </div>
</template>

<style></style>
