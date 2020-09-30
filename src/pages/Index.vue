<template>
  <Layout>
    <div class="row">
      <div class="col-md-7 col-sm-12 text-center align-self-center">
        <h1>
          Free Photo Editing Online
          <span class="text-primary"><g-link class="nav-link inline" to="/phototools">Tools</g-link></span> and
          <span class="text-primary"><g-link class="nav-link inline" to="/photoapps">Apps</g-link></span>
        </h1>
        <h2>For Photographers and Designers.</h2>

        <div class="ads">
          <square-ad></square-ad>
        </div>
      </div>
      <div class="col-md-5 col-sm-12 mt-4">
        <g-image src="../assets/edit-photos-for-free.png" blur="100" class="img-fluid rounded"></g-image>
      </div>
    </div>

    <div class="mt-4">
      <h5 class="text-center">
        <b>Image Editing Apps</b>
      </h5>
      <div class="row mb-5 mt-4">
        <div
          v-for="edge in $static.allApp.edges"
          :key="edge.node.id"
          class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"
        >
          <div class="card bg">
            <div class="card-body">
              <div class="card-title text-center">
                <b>{{ edge.node.title }}</b>
              </div>
              <p class="text-center">{{ edge.node.short }}</p>
            </div>
            <div class="row justify-content-center mb-3">
              <div>
                <g-link :to="edge.node.path" class="btn bg-btn">USE</g-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ads">
      <horizontal-ad></horizontal-ad>
    </div>

    <div class="mt-4">
      <h5 class="text-center">
        <b>Image Editing Tools</b>
      </h5>
      <div class="row mb-5 mt-4">
        <div
          v-for="edge in $static.allTool.edges"
          :key="edge.node.id"
          class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3"
        >
          <div class="card bg">
            <div class="card-body">
              <div class="card-title text-center">
                <b>{{ edge.node.title }}</b>
              </div>
              <p class="text-center">{{ edge.node.short }}</p>
            </div>
            <div class="row justify-content-center mb-3">
              <div>
                <g-link :to="edge.node.path" class="btn bg-btn">USE</g-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h5 class="text-center">
        <b>Find Me</b>
      </h5>
      <div class="row justify-content-center">
        <a href="https://facebook.com/editphotosforfree" target="_blank" class="btn social btn-primary">
          Facebook
        </a>
        <a href="https://www.youtube.com/editphotosforfree" target="_blank" class="btn social btn-info">
          Youtube
        </a>
      </div>
    </div>
  </Layout>
</template>
<static-query>
{
  allApp (limit: 10, order: DESC) {
    edges{
      node {
        id
        title
        short
        path
      }
    }
  },

  allTool (limit: 10, order: DESC) {
    edges{
      node {
        id
        title
        short
        path
      }
    }
  }
}
</static-query>
<script>

export default {
  metaInfo: {
    title: "Image Tools and Apps Online",
    meta: [{ title: "Collection of Image Editing Apps and Tools", content: "Edit your images easily using free easy to use apps and tools online" }]
  },
  components: {
    SquareAd: () => import('~/components/ads/SquareAd'),
    HorizontalAd: () => import('~/components/ads/HorizontalAd')
  }
};
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
}

.inline {
  display: inline;
  padding: 0px;
}

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
.social {
  margin: 0.5rem;
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
