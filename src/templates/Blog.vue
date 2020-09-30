<template>
  <Layout>
    <h4 class="text-center">{{ $page.blog.title }}</h4>
    <p class="text-center">
      <b>Date: {{ $page.blog.date }} | {{ $page.blog.timeToRead }} Mins Read</b>
    </p>
    <div>
      <g-image class="img-fluid img" :src="$page.blog.image" />
    </div>
    <div class="markdown-body" v-html="$page.blog.content"></div>
  </Layout>
</template>


<page-query>
query ($path: String!){
  blog (path: $path) {
    title
    content
    timeToRead
    date
    image
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blog.title
    };
  }
};
</script>

<style scoped>
.img {
  display: block;
  margin: 0 auto;
  height: 50%;
  width: 50%;
}

.markdown-body {
  margin-bottom: 6rem;
}
pre {
  margin: 2rem !important;
}
</style>