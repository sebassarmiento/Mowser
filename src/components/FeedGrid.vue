<template>
    <div class="feed-grid">
      <div class="movie-preview" v-for="(movie, index) in limitMovies()" v-bind:key="index" >
        <img v-on:click="loadPreview(index)" v-bind:src="movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` : ImagePlaceholder" alt="">
        <h4>{{ movie.title }}</h4>
        <p>{{ timeAgo(movie.release_date) }}</p>
      </div>
    </div>
</template>


<script>
import timeAgo from '@/utils/timeAgo.js'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import { mapMutations } from 'vuex'

export default {
    name: 'FeedGrid',
    props: {
        movies: Array,
        limit: Number
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
            return timeAgo(myDate)
        },
        limitMovies(){
            if(this.limit){
                console.log('Entra limit')
                return this.movies.slice(0, this.limit)
            } else {
                console.log('Entra normal')
                return this.movies
            }
        }
    }
}
</script>

<style scoped>


.feed-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 12px 4px;
  padding: 12px;
}

.movie-preview{
  border-radius: 6px;
  width: 100%;
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
