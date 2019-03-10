<template>
  <div v-if="movie" class="movie">
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
                  <span>{{ movie.vote_average }}/10</span>
              </div>
              <p>{{ movie.overview }}</p>
              <div class="buttons">
                  <button class="add-wishlist" >Purchase</button>
                  <button class="play-trailer" v-if="trailer" ><i class="far fa-play-circle"></i>Play trailer</button>
              </div>
          </div>
      </div>
      <div class="movie-overview">
          <img v-bind:src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" alt="">
          <div>
              <span v-for="g in movie.genres" v-bind:key="g.id" >{{ g.name }}</span>
              <h2>{{ movie.title }} <i class="fas fa-star" ></i>{{ movie.vote_average }}</h2>
              <p>{{ movie.overview }}</p>
          </div>
      </div>
      <div v-if="trailer" class="trailer">
          <iframe v-bind:src="`https://www.youtube.com/embed/${trailer[0].key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
  </div>
  <Loader v-else />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Movie',
  components: {
      Loader
  },
  data(){
      return {
          movie: null,
          trailer: null
      }
  },
  mounted(){
      fetch(`${this.api_url}/movie/${this.$route.params.movieId}?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          console.log(res)
          this.movie = res
      })
      .catch(err => {
          console.log(err)
      })

      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/videos?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          console.log('Videos', res)
          this.trailer = res.results
      })
      .catch(err => {
          console.log(err)
      })
  },
  computed: {
      ...mapState(['api_url', 'api_key'])
  }
}

</script>

<style scoped>

.movie{
}

.bg-image{
    width: 100%;
    max-height: calc(100vh - 60px);
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

.movie-overview span{
    margin-right: 6px;
    font-size: 0.8em;
    font-weight: 500;
}
.movie-overview{
    display: flex;
    padding: 24px;
}
.movie-overview img{
    border-radius: 4px;
    margin-right: 12px;
    box-shadow: 0px 50px 30px -30px rgba(0, 0, 0, 0.61);
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
    align-items: center;
}
.play-trailer i{
    margin-right: 12px;
    font-size: 2em;
}


.trailer iframe{
    width: 100vw;
    height: calc(100vh - 60px);
}

</style>
