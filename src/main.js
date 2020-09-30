// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex'
import DefaultLayout from "~/layouts/Default.vue";
import BootstrapVue from "bootstrap-vue";
// import Vue2TouchEvents from 'vue2-touch-events'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// import LoadScript from 'vue-plugin-load-script';


export default function(Vue, { router, head, isClient, appOptions }) {
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Nunito:300,400,700&display=swap"
  });
  Vue.component("Layout", DefaultLayout);

  Vue.use(BootstrapVue);
  // Vue.use(Vue2TouchEvents)
  Vue.use(Vuex);

  appOptions.store = new Vuex.Store();  

  // Vue.use(LoadScript);
  // head.link.push({
  //   rel: "stylesheet",
  //   href: "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  // });
}
