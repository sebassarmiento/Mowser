<template>
  <div class="feed">
    <FeedCarousel v-if="carousel" v-bind:movies="carousel" />
    <h1>Now Playing</h1>
    <div class="feed-grid">
      <div class="movie-preview" v-for="(movie, index) in movies" v-bind:key="index" >
        <img v-on:click="loadPreview(index)" v-bind:src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" alt="">
        <h4>{{ movie.title }}</h4>
        <p>{{ timeAgo(movie.release_date) }}</p>
      </div>
    </div>
    <div class="load-more">
      <button v-on:click="loadMore" >Load more</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
import FeedCarousel from '@/components/FeedCarousel.vue'

export default {
  name: 'Feed',
  components: {
    FeedCarousel
  },
  data(){
    return {
      movies: null,
      latest: null,
      url: null,
      carousel: null,
      page: 1
    }
  },
  methods: {
    ...mapMutations(['ADD_CURRENT_PREVIEW']),
    loadPreview(i){
      console.log('Adding to preview')
      this.ADD_CURRENT_PREVIEW(this.movies[i])
    },

    loadMore(){
      this.page++
      fetch(`${this.url}&page=${this.page}`)
      .then(d => d.json())
      .then(res => {
        this.movies = [...this.movies, ...res.results]
      })
      .catch(err => {
        console.log(err)
      })
    },

    timeAgo(date){
      let myDate = date.split('-')
      myDate = myDate.map(d => parseFloat(d))
      // console.log(moment(myDate).fromNow(), myDate)
      return '1 month ago'
    }

  },
  mounted(){
    this.url = `${this.api_url}/movie/now_playing?api_key=${this.api_key}`
    fetch(this.url)
    .then(d => d.json())
    .then(res => {
      console.log(res)
      this.movies = res.results
      let random = Math.floor(Math.random() * this.movies.length - 3)
      this.carousel = [{...this.movies[random]}, {...this.movies[random + 1]}, {...this.movies[random + 2]}]
      console.log(this.carousel)
    })
    .catch(err => console.log(err))
  },
  computed: {
    ...mapState(['api_url', 'currentSearch', 'api_key'])
  }

}
</script>

<style scoped>

.feed{
  width: 100%;
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow: scroll;
}


.feed h1{
  padding: 12px;
  font-weight: 500;
  margin: 0px;
}

.feed-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 12px;
  grid-column-gap: 4px;
  padding: 12px;
}

.movie-preview{
  border-radius: 6px;
  width: 100%;
  margin-bottom: 12px;
}
.movie-preview img{
  border-radius: 0px;
  width: 100%;
  box-shadow: 0px 35px 30px -30px rgba(0, 0, 0, 0.411);
  opacity: 0.9;
  transition: all 0.2s ease-in-out;
}
.movie-preview img:hover{
  opacity: 1;
  cursor: pointer;
}
.movie-preview h4{
  margin: 0px 0px;
  font-size: 0.9em;
  text-align: left;
  cursor: pointer;
}
.movie-preview p{
  margin: 0px;
  font-size: 0.8em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.486);
}

.feed .load-more{
  grid-column: 1 / -1;
  margin: 0px auto;
  width: 100%;
  text-align: center;
  padding: 12px;
}
.feed .load-more button{
  padding: 12px;
  border-radius: 2px;
  font-size: 0.9em;
  font-weight: 500;
  border: 1px solid #2c3e50;
  position: relative;
  z-index: 1;
}
.feed .load-more button::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #2c3e50;
  border-radius: 20px;
  transform: scale(0.8, 1);
  opacity: 0;
  transition: all 0.2s ease-in-out;
  z-index: -1;
}
.load-more button:hover{
  color: white;
  cursor: pointer;
}
.load-more button:hover::after{
  border-radius: 0px;
  opacity: 1;
  transform: scale(1);
}

</style>
