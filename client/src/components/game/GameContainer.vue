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
        <PluckedList :pluckedWords="pluckedWords" />
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
      pluckables: [],
      cream: String,
      currentQueue: '',
      pluckedWords: []
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
    checkQueue: function(wordToCheck) {
      axios
        .put('http://localhost:3000/plot', { wordToCheck: wordToCheck })
        .then((res) => {
          if (res.data.isWord) {
            var word = res.data.word;
            this.pluckedWords.push(word);
            // this.$refs.pluckedList.addValidWordToList(word);
          }
        });
    },
    addLetterToQueue: function (letter) {
      var letterVal = letter.toLowerCase();
      var validLetters = JSON.parse(JSON.stringify(this.pluckables));
      var validity = (letterVal == this.cream) ? "required" : (validLetters.includes(letterVal) ? "valid" : "invalid");
      if (validity == "invalid") this.invalidPlucks++;

      this.$refs.pluckQueue.insertEntryIntoQueue(letterVal, validity);
      this.currentQueue += letterVal;
    },
    removeLetterFromQueue: function () {
      this.currentQueue = this.currentQueue.substring(0, this.currentQueue.length - 1);
      this.$refs.pluckQueue.deleteEntryFromQueue();
    },
    submitQueue: function () {
      if (!this.currentQueue.includes(this.cream)) {
        // TODO: show reject animation -- word does not include daily letter
        console.log("submitted word does not contain daily letter")
      } else if (this.currentQueue.length <= 3) {
        // TODO: show reject animation -- word is too short
        console.log("submitted word is too short")
      } else if (this.invalidPlucks > 0) {
        // TODO: show reject animation -- contains invalid letters
        console.log("submitted word contains invalid letters")
      } else if (this.pluckedWords.includes(this.currentQueue)) {
        // TODO: show reject animation -- already found
        console.log("submitted word contains all valid letters but was already found")
      } else {
        console.log(this.currentQueue);
        this.checkQueue(this.currentQueue);
        console.log("submitted word contains all valid letters")
      }
      this.currentQueue = '';
      this.invalidPlucks = 0;
      this.$refs.pluckQueue.clearQueue();
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
        this.submitQueue();
      }
    });
  }
};
</script>