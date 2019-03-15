<template>
  <div v-if="movie" class="movie">
      <MainMovieInfo v-bind:trailer="videos ? true : false" v-bind:movie="movie" />
      <div class="movie-grid">
          <div class="movie-column-1">

          <MovieMenu v-if="cast" v-bind:counts="getCategoryCount()" />

          <div v-if="menu.cast && cast" class="cast">
              <div v-for="actor in cast.filter(a => a.profile_path)" v-bind:key="actor.id" class="actor">
                  <img v-bind:src="`https://image.tmdb.org/t/p/w154${actor.profile_path}`" alt="">
                  <span >{{ actor.character }}</span>
                  <p >{{ actor.name }}</p>
              </div>
          </div>
          
        <div v-if="menu.videos" class="trailer">
            <iframe v-for="video in videos" v-bind:key="video.key" v-bind:src="`https://www.youtube.com/embed/${video.key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <div v-if="menu.images" class="images">
            <img v-for="image in images.posters" v-bind:key="image.id" v-bind:src="`https://image.tmdb.org/t/p/w154${image.file_path}`" alt="">
        </div>

          </div>
          <div class="movie-column-2">
              <h2>Extra info</h2>
              <p>Budget: <i class="fas fa-dollar-sign"></i><span> {{ movie.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</span></p>
              <p>Revenue: <i class="fas fa-dollar-sign"></i><span> {{ movie.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</span></p>
              <a v-bind:href="movie.homepage" target="_blank" >Go to website</a>
              <div class="production-companies" >
                  <p>Production companies</p>
                  <img v-for="c in movie.production_companies" v-bind:key="c.id" v-bind:src="`https://image.tmdb.org/t/p/w154${c.logo_path}`" alt="">
              </div>
              <p>Vote average: {{ movie.vote_average }}</p>
              <p>Votes: {{ movie.vote_count }}</p>
              <div class="keywords" >
                  <p>Keywords</p>
                  <span v-for="k in keywords" v-bind:key="k.id" >{{ k.name }}</span>
              </div>
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
          videos: null,
          cast: null,
          recommended: null,
          images: null,
          keywords: null,
          recommendedScroll: 'recElement',
          castScroll: 'castElement',
          menu: {
              cast: true,
              images: null,
              videos: null,
              credits: null,
              reviews: null
          }
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

      getCategoryCount(){
          return {
              cast: this.cast ? this.cast.length : 0,
              images: this.images ? this.images.posters.length : 0,
              videos: this.videos ? this.videos.length : 0,
              credits: 10,
              reviews: 10
          }
      },

      selectMenuOption(e){
        for(let k in this.menu) this.menu[k] = false;
        this.menu = {...this.menu, [e]: true}
        console.log(this.menu)
      },

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
          //console.log(res)
          this.movie = res
      })
      .catch(err => {
          console.log(err)
      })

      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/videos?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          //console.log('Videos', res)
          if(res.results.length > 0){
              this.videos = res.results
          }
      })
      .catch(err => {
          console.log(err)
      })


      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/credits?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          //console.log('Cast', res)
          this.cast = res.cast
      })
      .catch(err => {
          console.log(err)
      })


      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/recommendations?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          //console.log('Recommended', res)
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
          //console.log('Images', res)
          this.images = res
      })
      .catch(err => {
          console.log(err)
      })


      fetch(`${this.api_url}/movie/${this.$route.params.movieId}/keywords?api_key=${this.api_key}`)
      .then(d => d.json())
      .then(res => {
          console.log('Keywords', res)
          this.keywords = res.keywords
      })
      .catch(err => {
          console.log(err)
      })

      }
  },
  mounted(){
      console.log('Mounted')
      this.getData()
      this.$on('click', () => {
          console.log('Chooooseeen')
      })
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
    overflow: scroll;
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


.cast{
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-gap: 12px;
}
.actor img{
    display: block;
    width: 100%;
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


.images{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    grid-gap: 12px;
}
.images img{
    width: 100%;
    display: inline-block;
}


.production-companies{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4px;
    align-items: center;
    padding: 4px;
}
.production-companies p{
    grid-column: 1 / -1;
}
.production-companies img{
    width: 100%;
}

.keywords{
    background: none;
}
.keywords p{
    font-weight: bold;
}
.keywords span{
    padding: 4px;
    border-radius: 4px;
    background: rgb(170, 167, 167);
    margin: 2px;
    font-size: 0.8em;
    display: inline-block;
}

</style>
