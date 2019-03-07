<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AppMenu from '@/components/AppMenu.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>


<style>
*{
  box-sizing: border-box;
}
*:focus{
  outline: none;
}

a{
  text-decoration: none;
  color: inherit;
}

body{
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
