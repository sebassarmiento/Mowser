<template>
  <div id="app">
    <Navbar />
    <div class="app-layout">
      <AppMenu />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AppMenu from '@/components/AppMenu.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    AppMenu
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
  text-align: center;
  color: #2c3e50;
}

.app-layout{
  display: flex;
}

</style>
