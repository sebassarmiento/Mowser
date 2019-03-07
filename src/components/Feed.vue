<template>
  <div class="feed">
    <h1>Showing {{ $route.params.category }} </h1>
    <div class="feed-grid">
      <div class="movie-preview" v-for="(movie, index) in movies" v-bind:key="index" >
        <img v-on:click="loadPreview(index)" v-bind:src="`https://image.tmdb.org/t/p/w154/${movie.poster_path}`" alt="">
        <h4>{{ movie.title }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Feed',
  data(){
    return {
      movies: null
    }
  },
  methods: {
    ...mapMutations(['ADD_CURRENT_PREVIEW']),
    loadPreview(i){
      console.log('Adding to preview')
      this.ADD_CURRENT_PREVIEW(this.movies[i])
    }

  },
  mounted(){
    console.log(this.$route)
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

.feed{
  width: 100%;
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow: scroll;
}

.feed-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 12px;
  padding: 12px;
}

.movie-preview{
  border-radius: 6px;
  width: 100%;
}
.movie-preview img{
  border-radius: 6px;
  width: 100%;
  box-shadow: 0px 35px 30px -30px rgba(0, 0, 0, 0.411);
}
.movie-preview h4{
  margin: 6px 0px;
  text-align: left;
}

</style>
