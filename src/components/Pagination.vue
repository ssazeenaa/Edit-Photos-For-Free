<template>
  <div class="row justify-content-center">
    <nav class="text-center mt-4">
      <ul class="pagination">
        <li class="page-item" v-if="hasPreviousPage">
          <g-link class="page-link" :to="previous">Previous Page</g-link>
        </li>
        <li class="page-item" v-if="hasNextPage">
          <g-link class="page-link" :to="next">Next Page</g-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["hasPreviousPage", "hasNextPage", "currentPage"],

  computed: {
    previous() {
      return this.currentPage === 2
        ? "/projects"
        : `/projects/${this.currentPage - 1}`;
    },
    next() {
      return `/projects/${this.currentPage + 1}`;
    }
  }
};
</script>

<style>
</style>