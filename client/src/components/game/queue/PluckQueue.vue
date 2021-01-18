<template>
  <v-container>
    <div class="text-center" id="currentWord" ref="word"></div>
  </v-container>
</template>

<script>
import QueueEntry from "./QueueEntry"
import Vue from 'vue'

export default {
  name: 'PluckQueue',
  components: {
    QueueEntry
  },
  methods: {
    insertEntryIntoQueue: function(value, validity) {
      var EntryComponentClass = Vue.extend(QueueEntry);
      var entry = new EntryComponentClass({
        propsData: {
          value: value, 
          validity: validity
        }
      });

      entry.$mount() // pass nothing
      this.$refs.word.appendChild(entry.$el)
    },
    deleteEntryFromQueue: function () {
      var currentWordElem = document.getElementById("currentWord");
      currentWordElem.removeChild(currentWordElem.lastElementChild);
    },
    clearQueue: function () {
      document.getElementById("currentWord").innerHTML = "";
    }
  }
};
</script>

<style scoped>
#currentWord {
  height: 40px;
  font-weight: bold;
  font-size: 28pt;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-rendering: optimizeLegibility;
}
</style>