<template>
  <div class="left-side">
    <div class="block-title">Photo Apps</div>
    <div class="link" v-for="edge in $static.allApp.edges" :key="edge.id">
      <g-link :to="edge.node.path" class="btn bg-btn">{{ edge.node.title }}</g-link>
    </div>
    <div class="block-title">Photo Tools</div>
    <div class="link" v-for="edge in $static.allTool.edges" :key="edge.id">
      <g-link :to="edge.node.path" class="btn bg-btn">{{ edge.node.title }}</g-link>
    </div>
  </div>
</template>

<static-query>
query {
  allApp {
    edges {
      node {
        id
        path
        title
      }
    }
  },
  allTool {
    edges {
      node {
        id
        path
        title
      }
    }
  }
}
</static-query>

<script>

</script>

<style scoped>
.link a {
    text-align: left;
    font-size: 14px;
    background: #EEEEEE;
    width: 100%;
    margin: 2px 0px;
}

.link a:hover {
  background: #555555;
  color: #EEEEEE;
}

.block-title {
  margin: 5px 0px;
  font-weight: bold;
}
</style>