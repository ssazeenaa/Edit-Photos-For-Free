<template>
  <Layout>
    <div class="container-fluid">
      <div class="row">
        <div class="col left-sidebar">
          <left-side></left-side>
        </div>
        <div class="col text-center">
          <h1 class="text-center">{{ $page.tool.title }}</h1>
          <div class="ads">
            <text-ad></text-ad>
          </div>
          <div class="markdown-body">
            <VueRemarkContent />
          </div>
          <div class="ads">
            <horizontal-ad></horizontal-ad>
          </div>
        </div>
        <div class="col right-sidebar">
          <div class="ads">
            <vertical-ad></vertical-ad>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>


<page-query>
query ($path: String!){
  tool (path: $path) {
    title
    short
    content
  }
}
</page-query>

<script>
// import LeftSide from "../components/LeftSide";

export default {
  components: {
    LeftSide: () => import('~/components/LeftSide'),
    TextAd: () => import('~/components/ads/TextAd'),
    HorizontalAd: () => import('~/components/ads/HorizontalAd'),
    VerticalAd: () => import('~/components/ads/VerticalAd')
  },
  metaInfo() {
    return {
      title: this.$page.tool.title,
      meta: [{ title: this.$page.tool.title, content: this.$page.tool.short }]
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

pre {
  margin: 1rem !important;
}

.left-sidebar, .right-sidebar {
    -ms-flex: 0 0 230px;
    flex: 0 0 230px;
} 

@media (min-width: 1400px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl
  {
    max-width: 1380px;
  }
} 

@media (min-width: 1600px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl
  {
    max-width: 1580px;
  }
} 

@media (min-width: 1800px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl
  {
    max-width: 1780px;
  }
} 

@media (max-width: 1400px) {
  .right-sidebar {
    display: none; 
  } 
}

@media (max-width: 1200px) {
  .left-sidebar {
    display: none; 
  } 
}

/*@media (max-width: 991px) {
  .right-sidebar {
    display: none; 
  } 
}

@media (max-width: 767px) {
  .left-sidebar {
    display: none; 
  } 
}*/

.ads {
  width: 100%;
}
</style>