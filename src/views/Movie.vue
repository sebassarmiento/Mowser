<template>
  <div v-if="movie" class="movie">
      <MainMovieInfo v-bind:trailer="trailer ? true : false" v-bind:movie="movie" />
      <div class="movie-grid">
          <div class="movie-column-1">

          <MovieMenu />

          <CastCarousel v-bind:cast="cast" />
          
      <div v-if="trailer" class="trailer">
          <h2>Trailer</h2>
          <iframe v-bind:src="`https://www.youtube.com/embed/${trailer[0].key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
          </div>
          <div class="movie-column-2">
              <h1>Info</h1>
          </div>
      </div>
        <MovieCarousel v-bind:movies="recommended" />
      <Footer />
  </div>
  <Loader v-else />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'
import Footer from '@/components/Footer.vue'
import handleScroll from '@/utils/handleScroll.js'
import MainMovieInfo from '@/components/Movie/MainMovieInfo.vue'
import MovieMenu from '@/components/Movie/MovieMenu.vue'
import CastCarousel from '@/components/Movie/CastCarousel.vue'
import MovieCarousel from '@/components/Movie/MovieCarousel.vue'

export default {
  name: 'Movie',
  components: {
      Loader,
      Footer,
      MainMovieInfo,
      MovieMenu,
      CastCarousel,
      MovieCarousel
  },
  data(){
      return {
          movie: null,
          trailer: null,
          cast: null,
          recommended: null,
          images: null,
          recommendedScroll: 'recElement',
          castScroll: 'castElement'
      }
  },
  updated(){
      console.log("UPDATED!!")
      if(this.recommended && this.cast){
          this.recommendedScroll = 'recElement'
          this.castScroll = 'castElement'
      }
  },
  methods: {
      redirect(id, type){
          this.$router.push(`/${type}/id/${id}`)
      },

      handleScroll(dir, element){
          if(element === 'cast'){
              handleScroll(this.$refs.castElement, dir)
          } else {
              handleScroll(this.$refs.recElement, dir)
          }
      },

      handleMovieScroll(e){
          console.log(e.target.scrollY)
      },

      getData(){

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
          if(res.results.length > 0){
              this.trailer = res.results
          }
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


      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/recommendations?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          console.log('Recommended', res)
          if(res.results.length > 0){
              this.recommended = res.results
          }
      })
      .catch(err => {
          console.log(err)
      })


      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/images?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          console.log('Images', res)
          this.images = res
      })
      .catch(err => {
          console.log(err)
      })

      }
  },
  mounted(){
      console.log('Mounted')
      this.getData()
  },
  watch: {
      '$route' (to, from){
          console.log('Route changed', from, to)
          for(let k in this._data){
              if(this._data.hasOwnProperty(k)){
                  this[k] = null
              }
          }
          window.scrollTo(0, 0)
          this.getData()
      }
  },
  computed: {
      ...mapState(['api_url', 'api_key'])
  }
}

</script>

<style scoped>

.movie{
}



.movie-grid{
    padding: 12px;
    max-width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.movie-column-1{
    min-width: 70vw;
    max-width: 70vw;
}
.movie-column-2{
    background: rgb(224, 224, 224);
    width: calc(30vw - 36px);
    max-height: calc(100vh - 84px);
    min-height: calc(100vh - 84px);
    margin-left: 12px;
    position: sticky;
    top: 72px;
    right: 12px;
    padding: 12px;
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



</style>
