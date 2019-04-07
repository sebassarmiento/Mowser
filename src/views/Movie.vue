<template>
  <div v-if="movie" class="movie">
      <MainMovieInfo v-bind:trailer="videos ? true : false" v-bind:movie="movie" />
      <div class="movie-grid">
          <div v-if="movie.production_companies.filter(c => c.logo_path).length > 0" class="companies">
              <div class="company" v-for="c in movie.production_companies.filter(c => c.logo_path)" v-bind:key="c.id" >
                    <img v-bind:src="`https://image.tmdb.org/t/p/w154${c.logo_path}`" alt="">
              </div>
          </div>
          <div class="movie-column-1">

          <MovieMenu v-if="cast" v-bind:counts="getCategoryCount()" />

          <div v-if="menu.cast && cast" class="cast">
              <h2 v-if="cast.length > 0" >Showing {{ castSlice > cast.length ? cast.length : castSlice }} of {{ cast.length }} <span v-if="castSlice <= cast.length" v-on:click="castSlice === 10 ? castSlice = cast.length : castSlice = 10" >{{ castSlice === 10 ? 'Show all' : 'Show less' }}</span></h2>
              <h2 v-else class="no-elements" >No cast to show</h2>
              <div v-for="actor in cast.filter(a => a.profile_path).slice(0, castSlice)" v-bind:key="actor.id" class="actor">
                  <img v-on:click="redirect(actor.id, 'people')" v-bind:src="`https://image.tmdb.org/t/p/w154${actor.profile_path}`" alt="">
                  <span >{{ actor.character }}</span>
                  <p >{{ actor.name }}</p>
              </div>
          </div>

          <div v-if="menu.crew && crew" class="cast">
              <h2 v-if="crew.length > 0" >Showing {{ crewSlice > crew.length ? crew.filter(a => a.profile_path).length : crewSlice }} of {{ crew.filter(a => a.profile_path).length }} <span v-if="crewSlice <= crew.length" v-on:click="crewSlice === 10 ? crewSlice = crew.filter(a => a.profile_path).length : crewSlice = 10" >{{ crewSlice === 10 ? 'Show all' : 'Show less' }}</span></h2>
              <h2 v-else class="no-elements" >No crew to show</h2>
              <div v-for="actor in crew.filter(a => a.profile_path).slice(0, crewSlice)" v-bind:key="actor.credit_id" class="actor">
                  <img v-on:click="redirect(actor.id, 'people')" v-bind:src="`https://image.tmdb.org/t/p/w154${actor.profile_path}`" alt="">
                  <span >{{ actor.character }}</span>
                  <p >{{ actor.name }}</p>
              </div>
          </div>
          
        <div v-if="menu.videos && videos" class="trailer">
            <h2 v-if="videos.length === 0" class="no-elements" >No videos to show</h2>
            <iframe v-for="video in videos" v-bind:key="video.key" v-bind:src="`https://www.youtube.com/embed/${video.key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <div v-if="menu.images && images" class="images">
              <h2 v-if="images.posters.length > 0" >Showing {{ imagesSlice > images.posters.length ? images.posters.length : imagesSlice }} of {{ images.posters.length }} <span v-if="imagesSlice <= images.posters.length" v-on:click="imagesSlice === 10 ? imagesSlice = images.posters.length : imagesSlice = 10" >{{ imagesSlice === 10 ? 'Show all' : 'Show less' }}</span></h2>
              <h2 v-else class="no-elements" >No images to show</h2>

            <img v-for="image in images.posters.slice(0, imagesSlice)" v-bind:key="image.id" v-bind:src="`https://image.tmdb.org/t/p/w154${image.file_path}`" alt="">
        </div>

        <div v-if="menu.reviews && reviews" class="reviews">
            <h2 v-if="reviews.length > 0" class="showing-reviews" >Showing {{ reviewsSlice > reviews.length ? reviews.length : reviewsSlice }} of {{ reviews.length }} <span v-if="reviewsSlice <= reviews.length" v-on:click="reviewsSlice === 10 ? reviewsSlice = reviews.length : reviewsSlice = 10" >{{ reviewsSlice === 10 ? 'Show all' : 'Show less' }}</span></h2>
            <h2 v-else class="no-elements" >No reviews to show</h2>
            <div v-for="r in reviews" v-bind:key="r.id" class="review">
                <div class="review-user">
                    <i class="fas fa-user" ></i><h2>{{ r.author }}</h2>
                </div>
                <p>{{ r.content }}</p>
            </div>
        </div>

          </div>
          <div class="movie-column-2">
              <p>Budget: <i class="fas fa-dollar-sign"></i><span> {{ movie.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</span></p>
              <p>Revenue: <i class="fas fa-dollar-sign"></i><span> {{ movie.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</span></p>
              <a v-if="movie.homepage" v-bind:href="movie.homepage" target="_blank" class="movie-website" >Website</a>
              <p class="ratings" > <i class="fas fa-star" ></i> {{ movie.vote_average }} <span>({{ movie.vote_count }} ratings)</span></p>
              <div class="keywords" >
                  <p>Keywords</p>
                  <span v-for="k in keywords" v-bind:key="k.id" >{{ k.name }}</span>
              </div>
          </div>
      </div>
        <MovieCarousel v-if="recommended && recommended.length > 0" v-bind:movies="recommended" />
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
          crew: null,
          recommended: null,
          reviews: null,
          images: null,
          keywords: null,
          recommendedScroll: 'recElement',
          castScroll: 'castElement',
          menu: {
              cast: true,
              images: null,
              videos: null,
              crew: null,
              reviews: null
          },
          castSlice: 10,
          reviewsSlice: 10,
          imagesSlice: 10,
          crewSlice: 10
      }
  },
  updated(){
      console.log("UPDATED!!")
      console.log(this._data)
      if(this.recommended && this.cast){
          this.recommendedScroll = 'recElement'
      }
  },
  methods: {

      getCategoryCount(){
          return {
              cast: this.cast ? this.cast.length : 0,
              images: this.images ? this.images.posters.length : 0,
              videos: this.videos ? this.videos.length : 0,
              crew: this.crew ? this.crew.filter(a => a.profile_path).length : 0,
              reviews: this.reviews ? this.reviews.length : 0
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

      fetchData(param, key, resultKey){
          fetch(`${this.api_url}/movie/${this.$route.params.movieId}${param ? `/${param}` : ''}?api_key=${this.api_key}`)
          .then(d => d.json())
          .then(res => {
              this[key] = resultKey ? res[resultKey] : res
          })
          .catch(err => {
              console.log(err)
          })
      },

      getData(){

        this.fetchData(null, 'movie')

        this.fetchData('videos', 'videos', 'results')

        this.fetchData('credits', 'cast', 'cast')

        this.fetchData('credits', 'crew', 'crew')

        this.fetchData('recommendations', 'recommended', 'results')

        this.fetchData('images', 'images')

        this.fetchData('keywords','keywords', 'keywords')

        this.fetchData('reviews','reviews', 'results')

      },

      keyToKeep(k){
          switch(k){
              case 'menu':
              return false
              case 'castSlice':
              return false
              case 'imagesSlice':
              return false
              case 'reviewsSlice':
              return false
              case 'crewSlice':
              return false
              default:
              return true
          }
      }
  },
  mounted(){
      console.log('Mounted')
      this.getData()
      window.scrollTo(0, 0)
  },
  watch: {
      '$route' (to, from){
          console.log('Route changed', from, to)
          for(let k in this._data){
              if(this._data.hasOwnProperty(k) && this.keyToKeep(k)){
                  this[k] = null
              }
          }
          console.log('HEre!!!', this._data)
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

.no-elements{
    font-size: 1em;
    font-weight: 500;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.companies{
    grid-column: 1 / -1;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(236, 169, 236);
}
.companies .company{
    margin: 0px 12px;
}
.companies .company img{
    min-height: 30px;
    max-height: 50px;
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
    position: relative;
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


.movie-website{
    font-size: 0.8em;
    color: rgb(33, 78, 201);
    font-weight: 400;
    cursor: pointer;
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
.cast h2{
    grid-column: 1 / -1;
    font-size: 1em;
    font-weight: 500;
}
.cast h2 span{
    margin-left: 12px;
    font-size: 0.8em;
    color: rgb(33, 78, 201);
    font-weight: 400;
    cursor: pointer;
}
.actor img{
    display: block;
    width: 100%;
    transition: all 0.2s ease-in-out;
}
.cast img:hover{
    cursor: pointer;
    transform: translateY(-10px);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 12px;
}
.images h2{
    grid-column: 1 / -1;
    font-size: 1em;
    font-weight: 500;
}
.images h2 span{
    margin-left: 12px;
    font-size: 0.8em;
    color: rgb(33, 78, 201);
    font-weight: 400;
    cursor: pointer;
}
.images img{
    width: 100%;
    display: inline-block;
}


.ratings span{
    font-size: 0.8em;
    margin: 0px 2px;
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

.review{
    background: rgb(224, 224, 224);
    padding: 12px;
    border-radius: 4px;
    margin-top: 6px;
}
.reviews .showing-reviews{
    font-size: 1em;
    font-weight: 500;
}
.review h2 span{
    margin-left: 12px;
    font-size: 0.8em;
    color: rgb(33, 78, 201);
    font-weight: 400;
    cursor: pointer;
}
.review .review-user{
    font-weight: bold;
    font-size: 1em;
    display: flex;
    align-items: center;
}
.review .review-user h2{
    margin: 0px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    height: 30px;
}
.review .review-user i{
    margin-right: 6px;
    font-weight: normal;
    height: 30px;
    width: 30px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
.review p{
    margin-bottom: 0px;
    line-height: 1.2em;
}

</style>
