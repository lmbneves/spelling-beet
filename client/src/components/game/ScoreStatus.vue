<template>
  <v-container>
    <v-row>
      <v-col
        cols="12">
        <p class="score-status__content">Score: {{ currentScore }}</p>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import colors from 'vuetify/lib/util/colors'

export default {
  name: 'ScoreStatus',
  data: function () {
    return {
      //
    }
  },
  computed: {
    currentScore: function () {
      return this.$store.getters.getTotalScore;
    },
  }
}
</script>

<style scoped>
.score-status__content {
  text-align: left;
}

</style>