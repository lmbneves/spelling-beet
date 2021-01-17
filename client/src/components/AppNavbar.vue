<template>
  <v-app-bar
    app
    dark
    color="#000000"
    class="navbar">
    <v-container>
      <v-layout>
        <span class="app-name">Spelling Beet</span>
        <v-spacer></v-spacer>
      </v-layout>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppNavbar',
  data: function () {
    return {
      //
    }
  }
};
</script>

<style scoped>
.navbar .app-name {
  margin-left: 5px;
  margin-top: 2px;
}

.navbar a {
  text-decoration: none;
}
</style>