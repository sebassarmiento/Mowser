<template>
  <div class="feed">
    <div v-if="movies" class="carousel">
      <img v-bind:src="`https://image.tmdb.org/t/p/w1280/${movies[0].backdrop_path}`" alt="">
      <div class="info">
        <h2>{{ movies[0].title }}</h2>
      </div>
    </div>
    <h1>Showing {{ $route.params.category }} </h1>
    <div class="feed-grid">
      <div class="movie-preview" v-for="(movie, index) in movies" v-bind:key="index" >
        <img v-on:click="loadPreview(index)" v-bind:src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`" alt="">
        <h4>{{ movie.title }}</h4>
        <p>{{ timeAgo(movie.release_date) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'Feed',
  data(){
    return {
      movies: null,
      latest: null
    }
  },
  methods: {
    ...mapMutations(['ADD_CURRENT_PREVIEW']),
    loadPreview(i){
      console.log('Adding to preview')
      this.ADD_CURRENT_PREVIEW(this.movies[i])
    },

    timeAgo(date){
      let myDate = date.split('-')
      myDate = myDate.map(d => parseFloat(d))
      console.log(moment(myDate).fromNow(), myDate)
      return '1 month ago'
    }

  },
  mounted(){
    let url = `${this.api_url}/movie/now_playing?api_key=${this.api_key}`
    fetch(url)
    .then(d => d.json())
    .then(res => {
      console.log(res)
      this.movies = res.results
    })
    .catch(err => console.log(err))
  },
  computed: {
    ...mapState(['api_url', 'currentSearch', 'api_key'])
  }

}
</script>

<style scoped>
.carousel{
  padding: 0px;
  width: 100%;
  position: relative;
  background: black;
}
.carousel img{
  width: 100%;
  margin: 0px;
  opacity: 0.7;
}
.carousel .info{
  background: red;
  position: absolute;
  top: 50%;
  right: 12px;
}
.carousel h2{
  color: white;
}

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

</style>
