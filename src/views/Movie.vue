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
                  <span class="rating" >{{ movie.vote_average }}/10 <i class="fas fa-star" ></i></span>
              </div>
              <p class="overview" >{{ movie.overview }}</p>
              <div class="buttons">
                  <button class="add-wishlist" >Purchase</button>
                  <button class="play-trailer" v-if="trailer" ><i class="far fa-play-circle"></i><span>Play trailer</span></button>
              </div>
          </div>
      </div>
      <div v-if="cast" class="cast-container">
          <h2>Cast</h2>
          <div class="cast">
              <div v-for="actor in cast.slice(0, 20)" v-bind:key="actor.name" v-on:click="redirect(actor.id, 'people')" class="actor">
              <img v-if="actor.profile_path" v-bind:src="`https://image.tmdb.org/t/p/w154${actor.profile_path}`" alt="">
              <span v-if="actor.profile_path" >{{ actor.character }}</span>
              <p v-if="actor.profile_path" >{{ actor.name }}</p>
          </div>
          </div>
      </div>
      <div v-if="trailer" class="trailer">
          <h2>Trailer</h2>
          <iframe v-bind:src="`https://www.youtube.com/embed/${trailer[0].key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div v-if="recommended" class="recommended-container">
          <h2>Others you might like</h2>
          <i v-on:click="handleScroll('left')" class="fas fa-long-arrow-alt-left scroll-btn left"></i>
          <div v-bind:ref="recommendedScroll" class="recommended">
              <div v-for="r in recommended" v-bind:key="r._id" v-on:click="redirect(r.id, 'movie')" >
                  <img v-bind:src="`https://image.tmdb.org/t/p/w154${r.poster_path}`" alt="">
                  <p>{{ r.title }} <span><i class="fas fa-star" ></i> {{ r.vote_average }}</span></p>
              </div>
          </div>
          <i v-on:click="handleScroll('right')" class="fas fa-long-arrow-alt-right scroll-btn right"></i>
      </div>
      <Footer />
  </div>
  <Loader v-else />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'
import Footer from '@/components/Footer.vue'
import handleScroll from '@/utils/handleScroll.js'

export default {
  name: 'Movie',
  components: {
      Loader,
      Footer
  },
  data(){
      return {
          movie: null,
          trailer: null,
          cast: null,
          recommended: null,
          images: null,
          recommendedScroll: 'recElement'
      }
  },
  updated(){
      console.log("UPDATED!!")
      if(this.recommended){
          this.recommendedScroll = 'recElement'
      }
  },
  methods: {
      redirect(id, type){
          this.$router.push(`/${type}/id/${id}`)
          console.log('Changing key')
          this.componentKey++
      },

      handleScroll(dir){
          handleScroll(this.$refs.recElement, dir)
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
          if(res.results.lenght < 0){
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
          this.recommended = res.results
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

.trailer h2{
    text-align: center;
}
.trailer iframe{
    width: 70vw;
    height: 70vh;
    display: block;
    margin: 24px auto;
}

.cast-container{
    padding: 50px;
}
.cast{
    display: flex;
    align-items: flex-start;
    padding: 12px;
    overflow: scroll;
}
.cast img{
    transition: all 0.2s ease-in-out;
    margin: 0px 4px;
}
.cast img:hover{
    transform: translateY(-10px);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.cast .actor{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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


.recommended-container{
    padding: 50px;
    position: relative;
}

.recommended{
    display: flex;
    overflow: scroll;
    padding: 12px;
}

.recommended div{
    margin: 0px 6px;
    cursor: pointer;
}
.recommended img{
    transition: all 0.2s ease-in-out;
}
.recommended img:hover{
    transform: translateY(-10px);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.recommended p{
    margin: 4px 0px;
    font-size: 0.9em;
    font-weight: 600;
    position: relative;
    padding-right: 36px;
    line-height: 1.2em;
}
.recommended span{
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 0.8em;
    height: 1.5em;
}
.recommended span i{
    color: rgb(255, 196, 0);
}
.scroll-btn{
    height: 50px;
    width: 50px;
    min-width: 50px;
    border-radius: 50%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    position: absolute;
    cursor: pointer;
    z-index: 2;
}
.scroll-btn.right{
    top: calc(50% - 25px);
    right: 25px;
}
.scroll-btn.left{
    top: calc(50% - 25px);
    left: 25px;
}

</style>
