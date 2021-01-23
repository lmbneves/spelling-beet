import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)

const store = new Vuex.Store({
  state: {
    pluckedWords: []
  },
  mutations: {
    addPluckedWord (state, word) {
      state.pluckedWords.push(word);
    }
  }
});

new Vue({
  vuetify: new Vuetify(),
  store: store,
  render: h => h(App),
}).$mount('#app')
