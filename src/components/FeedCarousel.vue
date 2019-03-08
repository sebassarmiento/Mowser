<template>
    <div v-if="current" class="carousel">
      <img v-bind:src="`https://image.tmdb.org/t/p/w1280/${current.backdrop_path}`" alt="">
      <div class="info">
        <h2>{{ current.title }}</h2>
        <p><span>{{ current.release_date.split('-').join('/') }}</span><i class="fas fa-star"></i>{{ current.vote_average }}</p>
      </div>
      <div class="bg"></div>
    </div>
</template>

<script>
export default {
    name: 'FeedCarousel',
    props: {
        movies: Array
    },
    data(){
        return {
            current: null,
            index: 0
        }
    },
    methods: {
        startCarousel(){
            setInterval(() => {
                this.index = this.index < 2 ? this.index + 1 : 0
                this.current = this.movies[this.index]
            }, 7000)
        }
    },
    mounted(){
        console.log(this.movies)
        this.current = this.movies[0]
        this.startCarousel()
    }
}
</script>

<style scoped>
.carousel{
  padding: 0px;
  width: 100%;
  position: relative;
  background: black;
  color: white;
}
.carousel img{
  min-width: 100%;
  max-width: 100%;
  margin: 0px;
  opacity: 0.7;
  display: block;
}
.carousel .info{
  position: absolute;
  top: calc(100% - 24px);
  transform: translateY(-100%);
  left: 24px;
}
.carousel h2{
  color: white;
  margin-bottom: 6px;
}
.carousel p{
  margin: 0px;
  font-size: 0.9em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.863);
}
.carousel p i{
  margin-right: 4px;
  font-weight: auto;
  color: white;
}
.carousel p span{
  margin-right: 24px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.863);
  position: relative;
}
.carousel p span::after{
  content: '';
  position: absolute;
  height: 100%;
  width: 1px;
  background: rgba(255, 255, 255, 0.733);
  top: 0;
  right: -12px;
}

.bg{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: black;
    opacity: 0.4;
    animation: bg 7s linear infinite 0s;
}
@keyframes bg {
    0%{
        opacity: 1;
    }
    10%{
        opacity: 0;
    }
    90%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>


