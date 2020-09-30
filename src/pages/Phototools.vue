<template>
  <Layout>
    <b-row>

      <b-row>
        <b-jumbotron header="Online Photo Tools">
          <p>It is collection of Photo Tools which can be used to batch edit your photos like resizing, cropping, watermarking etc. The Photo tools can be used for doing repetative tasks on thousands of images automatically.</p>
        </b-jumbotron>
      </b-row>

      <b-row class="ads">
        <horizontal-ad></horizontal-ad>
      </b-row>

      <b-row>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3" v-for="edge in $page.allTool.edges" :key="edge.id">
          <div class="card bg rounded">
            <!-- <g-image class="img-thumbnail" height="150" width="150" :src="edge.node.image"></g-image> -->
            <div class="card-body text-center">
              <div class="card-title">
                <b>{{ edge.node.title }}</b>
              </div>
              <p>{{ edge.node.short }}</p>
            </div>
            <div class="row justify-content-center mb-3">
              <div>
                <g-link :to="edge.node.path" class="btn bg-btn">USE</g-link>
              </div>
            </div>
          </div>
        </div>
      </b-row>

    </b-row>
  </Layout>
</template>

<page-query>
query {
  allTool {
    edges {
      node {
        title
        short
        id
        path
        content
        image
      }
    }
  }
}
</page-query>
<script>

export default {
  // add title of page
  metaInfo: {
    title: "Image Editing Tools",
    meta: [{ title: "Collection of Image Editing Tools", content: "Quickly edit your multiple images in batch using these tools online" }]
  },
  components: {
    HorizontalAd: () => import('~/components/ads/HorizontalAd')
  }
};
</script>

<style scoped>
.bg {
  background-color: #f6f6f6;
  transition: box-shadow ease 0.5s;
}

.bg:hover {
  box-shadow: 4px 6px 10px grey;
}

.bg-btn {
  border: 1px solid black;
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

.ads {
  width: 100%;
}
</style>