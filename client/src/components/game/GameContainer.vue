<template>
  <v-container>
    <v-row>
      <v-col
        cols="12">
        <PluckQueue ref="pluckQueue" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6">
        <PlotContainer :pluckables="pluckables"/>
      </v-col>
      <v-col
        cols="12"
        md="6">
        <PluckedList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlotContainer from './plot/PlotContainer'
import PluckedList from './plucked/PluckedList'
import PluckQueue from './queue/PluckQueue'

export default {
  name: 'GameContainer',
  components: {
    PlotContainer,
    PluckedList,
    PluckQueue
  },
  data: function () {
    return {
      pluckables: ['h', 'a', 'r', 'm', 'o', 'n', 'y']
    }
  },
  methods: {
    addLetterToQueue: function (letter) {
      var letterVal = letter.toLowerCase();
      this.$refs.pluckQueue.insertEntryIntoQueue(letterVal, 'valid');
    },
    removeLetterFromQueue: function () {
      this.$refs.pluckQueue.deleteEntryFromQueue();
    }
  },
  mounted: function () {

    window.addEventListener("keyup", e => {
      if (e.keyCode == 8 || e.keyCode == 46) this.removeLetterFromQueue();
    });
    window.addEventListener("keypress", e => {
      if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
        this.addLetterToQueue(String.fromCharCode(e.keyCode));
      } else if (e.keyCode == 13) {
        // enter
      }
    });
  }
};
</script>