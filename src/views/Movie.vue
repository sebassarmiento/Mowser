<template>
  <div v-if="movie" class="movie">
      <div class="bg-image">
          <img v-bind:src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" alt="">
          <div class="movie-info">
              <h2>{{ movie.title }}</h2>
              <div class="extra-info" >
                  <p>{{ movie.original_language.toUpperCase() }}</p>
                  <div class="genres">
                      <span v-for="g in movie.genres.slice(0, 3)" v-bind:key="g.id" >{{ g.name }}&nbsp;&nbsp;</span>
                  </div>
                  <span class="runtime" >{{ movie.runtime }} min</span>
                  <span class="rating" >{{ movie.vote_average }}/10 <i class="fas fa-star" ></i></span>
              </div>
              <p class="overview" >{{ movie.overview }}</p>
              <div class="buttons">
                  <button class="add-wishlist" >Purchase</button>
                  <button class="play-trailer" v-if="trailer" ><i class="far fa-play-circle"></i><span>Play trailer</span></button>
              </div>
          </div>
      </div>
      <div v-if="cast" class="cast">
          <div v-for="actor in cast.slice(0, 10)" v-bind:key="actor.name" class="actor">
              <img v-bind:src="`https://image.tmdb.org/t/p/w154${actor.profile_path}`" alt="">
              <span>{{ actor.character }}</span>
              <p>{{ actor.name }}</p>
          </div>
      </div>
      <div v-if="trailer" class="trailer">
          <h2>Trailer</h2>
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
          trailer: null,
          cast: null
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


      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/credits?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          console.log('Cast', res)
          this.cast = res.cast
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

@keyframes fadeMovie {
    0%{opacity: 0; transform: translateX(100px);}
    100%{opacity: 1; transform: translateX(0px);}
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
    animation: fadeMovie 1s ease-in-out;
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

.trailer h2{
    text-align: center;
}
.trailer iframe{
    width: 70vw;
    height: 70vh;
    display: block;
    margin: 24px auto;
}


.cast{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    padding: 12px;
}
.cast .actor img{
    width: 120px;
}
.cast .actor{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.cast .actor span{
    font-size: 0.9em;
    font-weight: 600;
    text-align: center;
    margin-top: 4px;
}
.cast .actor p{
    margin-top: 4px;
    line-height: 1.2em;
    max-height: 1.2em;
    overflow: hidden;
}

</style>
