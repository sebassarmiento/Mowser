<template>
    
    <div v-if="cast" class="cast-container">
          <h2>Cast</h2>
          <div v-bind:ref="scrollElement" class="cast">
              <div v-for="actor in cast.slice(0, 20)" v-bind:key="actor.name" v-on:click="redirect(actor.id, 'people')" class="actor">
              <img v-if="actor.profile_path" v-bind:src="`https://image.tmdb.org/t/p/w154${actor.profile_path}`" alt="">
              <span v-if="actor.profile_path" >{{ actor.character }}</span>
              <p v-if="actor.profile_path" >{{ actor.name }}</p>
              </div>
          </div>
          <i v-on:click="handleScroll('left', 'cast')" class="fas fa-long-arrow-alt-left scroll-btn left"></i>
          <i v-on:click="handleScroll('right', 'cast')" class="fas fa-long-arrow-alt-right scroll-btn right"></i>
    </div>

</template>

<script>
import handleScroll from '@/utils/handleScroll.js'

export default {
    name: 'CastCarousel',
    props: ['cast'],
    data(){
        return {
            scrollElement: 'scroll'
        }
    },
    methods: {
        handleScroll(dir){
            handleScroll(this.$refs.scroll, dir)
        }
    }
}
</script>

<style scoped>


.cast-container{
    padding: 50px;
    position: relative;
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

