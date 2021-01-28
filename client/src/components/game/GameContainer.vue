<template>
  <v-container class="game-page__wrapper">
    <v-row>
      <v-col
        cols="12"
        md="6">
        <GameAlert ref="gameAlert" />
        <PluckQueue ref="pluckQueue" />
        <PlotContainer />
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
import GameAlert from './GameAlert'
import PlotContainer from './plot/PlotContainer'
import PluckedList from './plucked/PluckedList'
import PluckQueue from './queue/PluckQueue'

export default {
  name: 'GameContainer',
  components: {
    GameAlert,
    PlotContainer,
    PluckedList,
    PluckQueue
  },
  data: function () {
    return {
      currentQueue: '',
      invalidPlucks: 0
    }
  },
  methods: {
    initGame: function() {
      this.$store.dispatch( "initGame" );
    },
    checkQueue: function(wordToCheck) {
      axios
        .put('http://localhost:3000/plot', { wordToCheck: wordToCheck })
        .then((res) => {
          if (res.data.isWord) {
            var word = res.data.word;
            this.$store.commit('addPluckedWord', word.toUpperCase());
          } else {
            this.$refs.gameAlert.flashErrorAlert("Pluck doesn't exist");
          }
        });
    },
    addLetterToQueue: function (letter) {
      var letterVal = letter.toUpperCase();
      var validLetters = JSON.parse(JSON.stringify(this.pluckables));
      var validity = (letterVal == this.cream) ? "required" : (validLetters.includes(letterVal) ? "valid" : "invalid");
      if (validity == "invalid") this.invalidPlucks++;

      // TODO: if user deletes invalid letter, word still considered invalid. need to adjust letter and validity tracking

      this.$refs.pluckQueue.insertEntryIntoQueue(letterVal, validity);
      this.currentQueue += letterVal;
    },
    removeLetterFromQueue: function () {
      this.currentQueue = this.currentQueue.substring(0, this.currentQueue.length - 1);
      this.$refs.pluckQueue.deleteEntryFromQueue();
    },
    submitQueue: function () {
      if (!this.currentQueue.includes(this.cream)) {
        this.$refs.gameAlert.flashErrorAlert("Missing the cream of the crop");
        console.log("submitted word does not contain daily letter")
      } else if (this.currentQueue.length <= 3) {
        this.$refs.gameAlert.flashErrorAlert("Pluck is too short");
        console.log("submitted word is too short")
      } else if (this.invalidPlucks > 0) {
        this.$refs.gameAlert.flashErrorAlert("Pluck contains invalid letters");
        console.log("submitted word contains invalid letters")
      } else if (this.pluckedWords.includes(this.currentQueue)) {
        this.$refs.gameAlert.flashErrorAlert("Already plucked");
        console.log("submitted word contains all valid letters but was already found")
      } else {
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
  computed: {
    pluckables: function () {
      return this.$store.getters.pluckablesList;
    },
    cream: function () {
      return this.$store.getters.creamOfTheCrop;
    },
    pangramList: function () {
      return this.$store.getters.pangramList;
    },
    pluckedWords: function () {
      return Object.values(this.$store.getters.getPluckedWords);
    }
  },
  mounted: function () {
    this.initGame();

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

<style scoped>
.game-page__wrapper {
  margin-top: 100px;
}

</style>