<template>
    <div class="app-menu">
        <h1>Movies<i class="fas fa-film"></i></h1>
        <router-link class="link" to="/feed/top-rated" ><i class="fas fa-circle"></i>Top rated</router-link>
        <router-link class="link" to="/feed/upcoming" ><i class="fas fa-circle"></i>Upcoming</router-link>
        <router-link class="link" to="/feed/now-playing" ><i class="fas fa-circle"></i>Now playing</router-link>
        <router-link class="link" to="/feed/popular" ><i class="fas fa-circle"></i>Popular</router-link>
        <h1>TV Shows<i class="fas fa-tv"></i></h1>
        <router-link class="link" to="/feed/popular-tv" ><i class="fas fa-circle"></i>Popular</router-link>
        <router-link class="link" to="/feed/top-rated-tv" ><i class="fas fa-circle"></i>Top rated</router-link>
        <router-link class="link" to="/feed/on-air-tv" ><i class="fas fa-circle"></i>On the air</router-link>
        <router-link class="link" to="/feed/airing-today-tv" ><i class="fas fa-circle"></i>Airing today</router-link>
        <h1>People<i class="fas fa-users"></i></h1>
        <router-link class="link" to="/feed/popular-people" ><i class="fas fa-circle"></i>Popular</router-link>
    </div>
</template>

<script>
export default {
    name: 'AppMenu'
}
</script>

<style scoped>

.app-menu{
    height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    width: 20vw;
    min-width: 240px;
    border-right: 1px solid rgba(0, 0, 0, 0.116);
    background: white;
    overflow: scroll;
    flex: 1;
}

.app-menu .link{
    display: flex;
    padding: 12px 24px;
    text-align: left;
    font-size: 0.9em;
    font-weight: 500;
    align-items: center;
    border-right: 3px solid transparent;
    transition: all 0.1s ease-in-out;
    color: rgba(0, 0, 0, 0.466);
    font-family: 'Lato', sans-serif;
}
.app-menu .link:hover{
    background: rgb(248, 246, 247);
    border-right: 3px solid indigo;
    color: indigo;
}
.app-menu .link i{
    padding: 12px;
    font-size: 6px;
    margin-right: 12px;
    display: none;
}
.app-menu h1{
    margin: 0px;
    text-align: left;
    font-size: 1em;
    text-transform: uppercase;
    padding: 12px 24px;
    display: flex;
    align-items: center;
}
.app-menu h1 i{
    margin-left: auto;
}

</style>

