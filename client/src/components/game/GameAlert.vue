<template>
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
</template>

<script>
export default {
  name: 'GameAlert',
  props: {
    pluckErrorAlert: Boolean,
    pluckErrorMsg: String
  }
}
</script>

<style scoped>
.pluck-alert__wrapper {
  margin-top: 20px;
  min-height: 40px;
}

.pluck-alert__content {
  font-size: 9pt;
}
</style>