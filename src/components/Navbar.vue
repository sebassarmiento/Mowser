<template>
    <div id="nav">
      <router-link class="brand" to="/" ><i class="fas fa-film"></i>Mowser</router-link>
      <div class="navbar-search">
          <i class="fas fa-search"></i>
          <input placeholder="Search" type="text">
      </div>
      <div class="navbar-menu" >
        <router-link to="/search" ><i class="fas fa-search"></i></router-link>
        <router-link to="/home" ><i class="fas fa-home"></i></router-link>
        <router-link to="/about" ><i class="fas fa-user-circle"></i></router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>

#nav{
    height: 60px;
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: 10;
    /* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.212); */
}

/* Brand */
.brand{
    width: calc(20vw + 12px);
    background: rgba(255, 255, 255, 0.829);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px;
    min-width: 260px;
}
.brand i{
    padding: 12px;
    font-size: 2em;
}

/* Navbar Search */
.navbar-search{
    flex: 3;
    background: rgba(255, 255, 255, 0.733);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.navbar-search input{
    padding: 12px;
    padding-left: 30px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.144);
    height: calc(100% - 24px);
    width: 100%;
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.568);
}
.navbar-search i{
    position: absolute;
    height: calc(100% - 24px);
    width: 36px;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.144);
}

/* Navbar Menu */
.navbar-menu{
    flex: 4;
    background: rgba(255, 255, 255, 0.295);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px;
    font-size: 1.4em;
}
.navbar-menu i{
    margin: 0px 12px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

/*
#nav a.router-link-exact-active {
  color: #42b983;
}*/

</style>

