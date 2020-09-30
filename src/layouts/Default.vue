<template>
  <div class="bottom">
    <!-- navbar -->
    <b-navbar class="mb-3 nav-bottom" toggleable="lg" type="light" stick="true" variant="white">
      <div class="container">
        <b-navbar-brand href="/">{{ $static.metadata.siteName }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <g-link class="nav-link" to="/phototools">Tools</g-link>
            <g-link class="nav-link" to="/photoapps">Apps</g-link>
            <!-- <g-link class="nav-link" to="/blogs">Blog</g-link> -->
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <!-- navbar -->
    <!-- slot with transition -->
    <transition name="fade" appear>
      <main class="container">
        <slot />
      </main>
    </transition>
    <!--  -->
    <!-- footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";

export default {
  components: {
    Footer
  }
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
main {
  min-height: 800px;
}

h1, .h1 {
    font-size: 30px !important;
}

h2, .h2 {
    font-size: 20px !important;
}

@media (min-width: 1400px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl
  {
    max-width: 1380px !important;
  }
} 

@media (min-width: 1600px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl
  {
    max-width: 1580px !important;
  }
} 

@media (min-width: 1800px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl
  {
    max-width: 1780px !important;
  }
} 

@media (max-width: 1200px) {
  .right-sidebar {
    display: none !important; 
  } 
}

@media (max-width: 1200px) {
  .left-sidebar {
    display: none !important; 
  } 
}

#navbar li.normal:hover {
    background: #CCCCCC;
}

#navbar li.normal {
  background: #EEEEEE;
}

#navbar li.high {
  background: #a2d2f9;
}

#navbar li.high:hover {
    background: #65b3f3;
}

#navbar li.vhigh {
  background: #ffb8b2;
}

#navbar li.vhigh:hover {
    background: #f9857c;
}

#info-container .alert-info {
  width: 100%;
}

#fileInput {
  overflow: hidden;
}

#settings .col-form-label {
  padding-top: 0px;
  padding-bottom: 0px;
}

</style>
