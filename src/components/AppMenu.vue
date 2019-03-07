<template>
    <div class="app-menu">
        <h1>Movies<i class="fas fa-film"></i></h1>
        <router-link class="link" to="/top-rated" ><i class="far fa-circle"></i>Top rated</router-link>
        <router-link class="link" to="/upcoming" ><i class="far fa-circle"></i>Upcoming</router-link>
        <router-link class="link" to="/now-playing" ><i class="far fa-circle"></i>Now playing</router-link>
        <router-link class="link" to="/popular" ><i class="far fa-circle"></i>Popular</router-link>
        <h1>TV Shows<i class="fas fa-tv"></i></h1>
        <router-link class="link" to="/popular-tv" ><i class="far fa-circle"></i>Popular</router-link>
        <router-link class="link" to="/top-rated-tv" ><i class="far fa-circle"></i>Top rated</router-link>
        <router-link class="link" to="/on-air-tv" ><i class="far fa-circle"></i>On the air</router-link>
        <router-link class="link" to="/airing-today-tv" ><i class="far fa-circle"></i>Airing today</router-link>
        <h1>People<i class="fas fa-users"></i></h1>
        <router-link class="link" to="/popular-people" ><i class="far fa-circle"></i>Popular</router-link>
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
    border-right: 1px solid rgba(0, 0, 0, 0.116);
    background: white;
    overflow: scroll;
}

.app-menu .link{
    display: flex;
    padding: 6px 24px;
    text-align: left;
    font-size: 0.9em;
    font-weight: 500;
    align-items: center;
    border-left: 3px solid transparent;
    transition: all 0.1s ease-in-out;
}
.app-menu .link:hover{
    background: rgb(245, 245, 245);
    border-left: 3px solid indigo;
    color: indigo;
}
.app-menu .link i{
    padding: 12px;
    font-size: 6px;
}
.app-menu h1{
    margin: 0px;
    text-align: left;
    font-size: 1.1em;
    text-transform: uppercase;
    padding: 12px 24px;
    display: flex;
    align-items: center;
}
.app-menu h1 i{
    margin-left: auto;
}

</style>

