<template>
    <div v-if="movies" class="recommended-container">
          <h2>Others you might like</h2>
          <div v-bind:ref="scrollElement" class="recommended">
              <div v-for="r in movies" v-bind:key="r._id" v-on:click="redirect(r.id, 'movie')" >
                  <img v-bind:src="`https://image.tmdb.org/t/p/w154${r.poster_path}`" alt="">
                  <p>{{ r.title }} <span><i class="fas fa-star" ></i> {{ r.vote_average }}</span></p>
              </div>
          </div>
          <i v-on:click="handleScroll('left')" class="fas fa-long-arrow-alt-left scroll-btn left"></i>
          <i v-on:click="handleScroll('right')" class="fas fa-long-arrow-alt-right scroll-btn right"></i>
      </div>
</template>

<script>
import handleScroll from '@/utils/handleScroll.js'

export default {
    name: 'MovieCarousel',
    props: ['movies'],
    data(){
        return {
            scrollElement: 'scroll'
        }
    },
    methods: {
        redirect(id, type){
          this.$router.push(`/${type}/id/${id}`)
        },
        handleScroll(dir){
            handleScroll(this.$refs.scroll, dir)
        }
    }
}
</script>

<style scoped>

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


