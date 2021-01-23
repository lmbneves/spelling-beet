<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6">
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            cols="5">
            <div class="pluck-alert__wrapper">
              <v-alert
                :value="pluckErrorAlert"
                class="pluck-alert__content"
                color="#47839B"
                dark
                transition="fade-transition"
                dense> 
                {{ pluckErrorMsg }} 
              </v-alert>
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <PluckQueue ref="pluckQueue" />
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
      pluckedWords: [],
      pluckErrorAlert: false,
      pluckErrorMsg: ''
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
        this.flashPluckAlert("Missing the cream of the crop");
        console.log("submitted word does not contain daily letter")
      } else if (this.currentQueue.length <= 3) {
        this.flashPluckAlert("Pluck is too short");
        console.log("submitted word is too short")
      } else if (this.invalidPlucks > 0) {
        this.flashPluckAlert("Pluck contains invalid letters");
        console.log("submitted word contains invalid letters")
      } else if (this.pluckedWords.includes(this.currentQueue)) {
        this.flashPluckAlert("Already plucked");
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
    },
    flashPluckAlert: function(errMsg) {
      this.pluckErrorMsg = errMsg;
      this.pluckErrorAlert = true;
      
      window.setInterval(() => {
        this.pluckErrorAlert = false;
      }, 2400);
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

<style scoped>
.pluck-alert__wrapper {
  min-height: 40px;
}

.pluck-alert__content {
  font-size: 9pt;
}

</style>