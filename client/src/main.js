import Vue from 'vue'

import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(),
  store: new Vuex.Store(store),
  render: h => h(App),
}).$mount('#app')
