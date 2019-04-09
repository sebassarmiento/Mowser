<template>
    <div class="container" >
      <div v-bind:ref="scroll" class="feed-grid">
      <div class="movie-preview" v-for="(movie, index) in limitMovies()" v-bind:key="index" >
        <img v-on:click="redirect(index)" v-bind:src="movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` : ImagePlaceholder" alt="">
        <h4>{{ movie.title }}</h4>
        <p>{{ movie.release_date ? timeAgo(movie.release_date) : null }}</p>
      </div>
      <i v-on:click="handleScroll('left')" class="fas fa-long-arrow-alt-left scroll-btn left hidden-arrow"></i>
      <i v-on:click="handleScroll('right')" class="fas fa-long-arrow-alt-right scroll-btn right"></i>
    </div>
    </div>
</template>


<script>
import timeAgo from '@/utils/timeAgo.js'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import handleScroll from '@/utils/handleScroll.js'

export default {
    name: 'FeedGrid',
    data(){
      return {
        ImagePlaceholder,
        scroll: 'scrollElement'
      }
    },
    props: {
        movies: Array,
        limit: Number
    },
    methods: {
        redirect(i){
          window.scrollTo(0, 0)
          this.$router.push(`/movie/id/${this.movies[i].id}`)
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
        },

        handleScroll(dir, element){
              handleScroll(this.$refs.scrollElement, dir)
        },

    }
}
</script>

<style scoped>

.container{
  padding: 12px;
  position: relative;
  width: 100%;
}


.feed-grid{
  display: flex;
  overflow: scroll;
}

.movie-preview{
  border-radius: 6px;
  min-width: 220px;
  margin: 0px 2px;
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
    transition: all 0.15s ease-in-out;
}
.scroll-btn.right{
    top: 50px;
    right: 0px;
}
.scroll-btn.left{
    top: 50px;
    left: 0px;
}

</style>
