<template>
  <v-row>
    <v-spacer></v-spacer>
    <v-col
      cols="5">
      <div class="pluck-alert__wrapper">
        <v-alert
          :value="pluckAlert"
          class="pluck-alert__content"
          :color="pluckAlertColor"
          dark
          transition="fade-transition"
          dense> 
          {{ pluckAlertMsg }} 
        </v-alert>
      </div>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import colors from 'vuetify/lib/util/colors'

export default {
  name: 'GameAlert',
  data: function () {
    return {
      pluckAlert: false,
      pluckAlertMsg: '',
      pluckAlertColor: ''
    }
  },
  methods: {
    flashErrorAlert: function(msg) {
      this.pluckAlertMsg = msg;
      this.pluckAlertColor = colors.red.darken3;
      this.pluckAlert = true;
      
      window.setInterval(() => {
        this.pluckAlert = false;
      }, 2000);
    },
    flashPangramAlert: function(msg) {
      this.pluckAlertMsg = msg;
      this.pluckAlertColor = colors.lime.darken1;
      this.pluckAlert = true;
      
      window.setInterval(() => {
        this.pluckAlert = false;
      }, 2000);
    },
    flashPluckAlert: function() {
      this.pluckAlertMsg = 'Nice!';
      this.pluckAlertColor = colors.green.darken1;
      this.pluckAlert = true;
      
      window.setInterval(() => {
        this.pluckAlert = false;
      }, 2000);
    }
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