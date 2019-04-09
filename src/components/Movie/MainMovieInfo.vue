<template>
    <div class="bg-image">
          <img v-bind:src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" alt="">
          <div class="movie-info">
              <h2>{{ movie.title }}</h2>
              <div class="extra-info" >
                  <p>{{ movie.original_language.toUpperCase() }}</p>
                  <div class="genres">
                      <span v-for="g in movie.genres.slice(0, 2)" v-bind:key="g.id" >{{ g.name }}&nbsp;&nbsp;</span>
                  </div>
                  <span class="runtime" >{{ movie.runtime }} min</span>
                  <span class="rating" >{{ movie.vote_average }}/10 <i class="fas fa-star" ></i></span>
              </div>
              <p class="overview" >{{ movie.overview }}</p>
              <div class="buttons">
                  <button class="add-wishlist" >Save</button>
                  <button v-on:click="playVideos" class="play-trailer" v-if="trailer" ><i class="far fa-play-circle"></i><span>Play videos</span></button>
              </div>
          </div>
      </div>
</template>

<script>
export default {
    name: 'MainMovieInfo',
    props: {
        movie: Object,
        trailer: Boolean
    },
    methods: {
        playVideos(){
            this.$parent.selectMenuOption('videos', true)
        }
    }
}
</script>

<style scoped>

.bg-image{
    width: 100%;
    max-height: calc(100vh - 60px);
    min-height: calc(100vh - 60px);
    overflow: hidden;
    position: relative;
}

.movie-info::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.377);
    border-radius: 30px;
    filter: blur(40px);
    z-index: -1;
}
.movie-info{
    position: absolute;
    width: 40%;
    min-width: 400px;
    max-width: 600px;
    bottom: 24px;
    right: 24px;
    color: white;
    padding: 24px;
    border-radius: 24px;
    z-index: 2;
    animation: fadeMovieInfo 1s ease-out;
}
@keyframes fadeMovieInfo {
    0%{opacity: 0; transform: translateX(100px);}
    100%{opacity: 1; transform: translateX(0px);}
}
.movie-info h2{
    font-size: 2.2em;
    line-height: 1.2em;
    font-weight: bolder;
    margin-bottom: 6px;
}
.movie-info .extra-info{
    font-weight: 600;
    display: flex;
    align-items: center;
    font-size: 0.8em;
}
.movie-info .extra-info p, .movie-info .extra-info .genres, .movie-info .extra-info .runtime{
    margin-right: 24px;
}
.movie-info .extra-info .rating i{
    margin-left: 2px;
    font-size: 0.9em;
    transform: translateY(-1px);
}
.movie-info .overview{
    font-size: 0.95em;
    font-weight: 400;
    padding-bottom: 12px;
}


.buttons{
    display: flex;
}
.add-wishlist{
    padding: 18px 40px;
    border: none;
    border-radius: 4px;
    background: rgb(255, 0, 55);
    font-size: 0.9em;
    font-weight: 600;
    color: white;
    cursor: pointer;
}
.play-trailer{
    padding: 18px 40px;
    border: none;
    border-radius: 4px;
    font-size: 0.9em;
    font-weight: 600;
    color: white;
    cursor: pointer;
    background: transparent;
    display: flex;
    align-items: center;
}
.play-trailer i{
    margin-right: 12px;
    font-size: 2em;
}
.play-trailer span{
    transform: translateY(-1px);
}

</style>

