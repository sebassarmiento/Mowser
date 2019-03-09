<template>
  <div v-if="movie" class="movie">
      <img class="bg-image" v-bind:src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" alt="">
      <div class="movie-overview">
          <img v-bind:src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" alt="">
          <div>
              <span v-for="g in movie.genres" v-bind:key="g.id" >{{ g.name }}</span>
              <h2>{{ movie.title }} <i class="fas fa-star" ></i>{{ movie.vote_average }}</h2>
              <p>{{ movie.overview }}</p>
          </div>
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
          movie: null
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
      console.log(this.api_url, '/movie/' , this.$route.params.movieId )
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

</style>
