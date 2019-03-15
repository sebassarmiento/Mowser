<template>
    <div class="movie-menu">
        <div v-on:click="select('cast')" class="movie-menu-btn" v-bind:class="current" >Cast <span>({{ counts.cast }})</span></div>
        <div v-on:click="select('images')" class="movie-menu-btn" >Images <span>({{ counts.images }})</span></div>
        <div v-on:click="select('videos')" class="movie-menu-btn" >Videos <span>({{ counts.videos }})</span></div>
        <div v-on:click="select('reviews')" class="movie-menu-btn" >Reviews <span>({{ counts.reviews }})</span></div>
        <div v-on:click="select('credits')" class="movie-menu-btn" >Credits <span>({{ counts.credits }})</span></div>
    </div>
</template>

<script>
export default {
    name: 'MovieMenu',
    props: ['counts'],
    data(){
        return {
            current: 'cast'
        }
    },
    methods: {
        select(ele){
            window.scrollTo(0, window.innerHeight)
            this.current = ele
            this.$parent.selectMenuOption(ele)
        }
    },
    mounted() {
        console.log(this.$props)
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
    align-items: center;
    justify-content: space-evenly;
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

.movie-menu-btn span{
    font-size: 0.8em;
}


</style>


