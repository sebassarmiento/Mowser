<template>
  <div class="feed">
    <FeedCarousel v-if="carousel" v-bind:movies="carousel" />
    <h1 v-if="now_playing" >Now Playing <span v-on:click="seeAll('now_playing')" >See all</span></h1>
    <FeedGrid v-if="now_playing" v-bind:movies="now_playing" v-bind:limit="20" />
    <h1 v-if="top_rated" >Top Rated <span v-on:click="seeAll('top_rated')" >See all</span></h1>
    <FeedGrid v-if="top_rated" v-bind:movies="top_rated" v-bind:limit="20" />
    <h1 v-if="upcoming" >Upcoming <span v-on:click="seeAll('upcoming')" >See all</span></h1>
    <FeedGrid v-if="upcoming" v-bind:movies="upcoming" v-bind:limit="20" />
    <Loader v-else-if="!now_playing" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
import FeedCarousel from '@/components/FeedCarousel.vue'
import Loader from '@/components/Loader.vue'
import timeAgo from '@/utils/timeAgo.js'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import FeedGrid from '@/components/FeedGrid.vue'

export default {
  name: 'Feed',
  components: {
    FeedCarousel,
    Loader,
    ImagePlaceholder,
    FeedGrid
  },
  data(){
    return {
      now_playing: null,
      top_rated: null,
      upcoming: null,
      url: null,
      carousel: null,
      page: 1,
      ImagePlaceholder
    }
  },
  methods: {
  
    seeAll(category){
      console.log(category + ' clicked!')
      this.$router.push(`/feed/${category}`)
    },

    timeAgo(date){
      let myDate = date.split('-')
      myDate = myDate.map(d => parseFloat(d))
      return timeAgo(myDate)
    },

    getData(url, category){
      fetch(url)
      .then(d => d.json())
      .then(res => {
        console.log('Fetched data', res)
        this[category] = res.results
      })
      .catch(err => console.log)
    }



  },
  mounted(){
    this.url = `${this.api_url}/movie/now_playing?api_key=${this.api_key}`
    fetch(this.url)
    .then(d => d.json())
    .then(res => {
      console.log('Now playing',res)
      this.now_playing = res.results
      let random = Math.floor((Math.random() * this.now_playing.length) + 1)
      if(random > 3 )random -= 3
      this.carousel = [{...this.now_playing[random]}, {...this.now_playing[random + 1]}, {...this.now_playing[random + 2]}]
      console.log(this.carousel)
    })
    .catch(err => console.log(err))

    this.getData(`${this.api_url}/movie/top_rated?api_key=${this.api_key}`, 'top_rated')

    this.getData(`${this.api_url}/movie/upcoming?api_key=${this.api_key}`, 'upcoming')

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
  position: relative;
}


.feed h1{
  padding: 12px;
  font-weight: 500;
  margin: 0px;
  margin-top: 24px;
  position: relative;
  display: flex;
  align-items: center;
}
.feed h1 span{
  margin-left: 24px;
  font-size: 0.4em;
  color: rgba(28, 28, 206, 0.795);
  font-weight: 500;
  cursor: pointer;
  display: grid;
  align-items: flex-end;
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
