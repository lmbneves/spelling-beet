<template>
  <v-container>
    <div>
      <template v-for="p in pluckables">
        <PlotButton @click.native="addLetterToQueue(p)" v-bind:key="p" :letter="p" />
      </template>
    </div>
    <div class="plot-action-btns">
      <v-btn
        elevation="0"
        outlined
        large
        rounded
        @click.native="removeLetterFromQueue()">
        Delete
      </v-btn>
      <v-btn
        elevation="0"
        outlined
        icon
        large
        rounded
        class="cache-btn"
        @click.native="shufflePluckables()">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <v-btn
        elevation="0"
        outlined
        large
        rounded
        @click.native="submitQueue()">
        Pluck
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import PlotButton from './PlotButton'

export default {
  name: 'PlotContainer',
  components: {
    PlotButton
  },
  props: {
    pluckables: Array
  },
  methods: {
    addLetterToQueue: function (p) {
      this.$parent.addLetterToQueue(p);
    },
    removeLetterFromQueue: function () {
      this.$parent.removeLetterFromQueue();
    },
    shufflePluckables: function () {
      this.$parent.shufflePluckables();
    },
    submitQueue: function () {
      this.$parent.submitQueue();
    }
  }
};
</script>

<style scoped>
.plot-action-btns {
  margin-top: 20px;
}

.cache-btn {
  margin: 0 12px;
}
</style>