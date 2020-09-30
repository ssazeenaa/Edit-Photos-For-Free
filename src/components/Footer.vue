<template>
  <div>
    <b-navbar class="mt-5 border bottom" type="light" variant="white" toggleable="sm" >
      <div class="container">
        <div>{{ `${$static.metadata.siteName} &copy;  ${getDate}` }}</div>
        <b-navbar-nav class="ml-auto">
          <g-link class="nav-link" to="/about">About Us</g-link>
          <g-link class="nav-link" to="/terms">Terms of Service</g-link>
          <g-link class="nav-link" to="/privacy">Privacy Policy</g-link>
          <g-link class="nav-link" to="/contact">Contact Us</g-link>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  computed: {
    getDate() {
      const date = new Date();
      return date.getFullYear();
    }
  }
};
</script>

<style>
</style>