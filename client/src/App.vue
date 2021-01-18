<template>
  <div id="app">
    <AppNavbar />
    <GameContainer />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar'
import GameContainer from './components/game/GameContainer'

export default {
  name: 'App',
  components: {
    AppNavbar,
    GameContainer
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
