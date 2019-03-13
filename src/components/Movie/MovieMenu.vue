<template>
    <div class="movie-menu">
        <div v-on:click="select('cast')" class="movie-menu-btn" v-bind:class="current" >Cast</div>
        <div v-on:click="select('images')" class="movie-menu-btn" >Images</div>
        <div v-on:click="select('videos')" class="movie-menu-btn" >Videos</div>
        <div v-on:click="select('reviews')" class="movie-menu-btn" >Reviews</div>
        <div v-on:click="select('credits')" class="movie-menu-btn" >Credits</div>
    </div>
</template>

<script>
export default {
    name: 'MovieMenu',
    data(){
        return {
            current: 'cast'
        }
    },
    methods: {
        select(ele){
            this.current = ele
            console.log('Click', this.current)
        }
    }
}
</script>

<style scoped>

.movie-menu{
    display: flex;
    padding: 12px;
    justify-content: center;
    position: sticky;
    top: 60px;
    background: white;
    z-index: 3;
}

.movie-menu .movie-menu-btn{
    padding: 12px;
    position: relative;
    cursor: pointer;
    width: 100px;
    display: flex;
    justify-content: center;
}
.movie-menu-btn:nth-child(1):after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 2px;
    background: purple;
    transition: all 0.3s ease-in-out;
}

.movie-menu .movie-menu-btn.cast::after{
    transform: translateX(0px);
}
.movie-menu .movie-menu-btn.images::after{
    transform: translateX(100px);
}
.movie-menu .movie-menu-btn.videos::after{
    transform: translateX(200px);
}
.movie-menu .movie-menu-btn.reviews::after{
    transform: translateX(300px);
}
.movie-menu .movie-menu-btn.credits::after{
    transform: translateX(400px);
}


</style>


