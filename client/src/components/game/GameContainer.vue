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
import axios from 'axios'
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
      pluckables: Array,
      cream: String
    }
  },
  methods: {
    getPluckables: function() {
      axios
        .get('http://localhost:3000/plot')
        .then((res) => {
          this.pluckables = res.data.letters;
          this.cream = res.data.required;
          this.pluckables.splice(0, 0, this.cream);
        }).then(() => {
          this.shufflePluckables();
        });
    },
    addLetterToQueue: function (letter) {
      var letterVal = letter.toLowerCase();
      this.$refs.pluckQueue.insertEntryIntoQueue(letterVal, 'valid');
    },
    removeLetterFromQueue: function () {
      this.$refs.pluckQueue.deleteEntryFromQueue();
    },
    shufflePluckables: function() {
        var a = this.pluckables.filter(l => l != this.cream);
        var n = a.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        a.splice(0, 0, this.cream);
        this.pluckables = a;
      }
  },
  mounted: function () {
    this.getPluckables();

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