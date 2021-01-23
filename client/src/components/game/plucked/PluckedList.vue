<template>
  <v-container>
    <div class="plucked-wrapper">
      <span class="plucked-header">You have plucked {{ pluckedWords.length }} veggies.</span>
      <ul class="plucked-list">
        <li class="plucked-item" v-for="pw in pluckedWords" v-bind:key="pw">
          {{ pw }}
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'PluckedList',
  data: function () {
    return {
      //
    }
  },
  computed: {
    pluckedWords: function() {
      return this.$store.state.pluckedWords;
    }
  }
};
</script>

<style scoped>
.plucked-wrapper {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding: 15px 20px;
  min-height: 480px;
  overflow: hidden;
  text-align: left;
}

.plucked-header {
  margin-bottom: 18px;
}

.plucked-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  -moz-column-count: 3;
  -moz-column-gap: 0px;
  -webkit-column-count: 3;
  -webkit-column-gap: 0px;
  column-count: 3;
  column-gap: 0px;
  column-fill: auto;
  overflow-y: scroll;
  height: 440px;
}

.plucked-item {
  text-transform: capitalize;
  margin-bottom: 8px;
}


@media screen and (min-width: 768px) {
  .plucked-wrapper {
    display: flex;
    flex-direction: column;
  }
}

</style>