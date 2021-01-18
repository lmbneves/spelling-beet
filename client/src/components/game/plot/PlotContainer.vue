<template>
  <v-container>
    <template v-for="p in pluckables">
      <PlotButton @click.native="addLetterToQueue(p)" v-bind:key="p" :letter="p" />
    </template>
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
    addLetterToQueue: function(p) {
      this.$parent.addLetterToQueue(p);
    }
  }
};
</script>