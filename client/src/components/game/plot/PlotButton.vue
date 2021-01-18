<template>
  <v-btn>
    {{ letter }}
  </v-btn>
</template>

<script>
export default {
  name: 'PlotButton',
  props: {
    letter: String
  }
};
</script>