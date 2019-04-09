<template>
  <div class="feed">
    <FeedCarousel v-if="carousel" v-bind:movies="carousel" />
    <h1 class="title" >MOWSER</h1>
    <div class="flex">
      <div class="column">
        <h2>Popular people</h2>
        <div v-for="p in people" v-bind:key="p.id" class="person">
          <img v-bind:src="`https://image.tmdb.org/t/p/w154/${p.profile_path}`" v-on:click="redirect(p.id)" alt="">
        </div>
      </div>
      <div class="column-2">
        <h1 v-if="now_playing" >Now Playing <span v-on:click="seeAll('now_playing')" >See all</span></h1>
      <FeedGrid v-if="now_playing" v-bind:movies="now_playing" v-bind:limit="20" />
      <h1 v-if="top_rated" >Top Rated <span v-on:click="seeAll('top_rated')" >See all</span></h1>
      <FeedGrid v-if="top_rated" v-bind:movies="top_rated" v-bind:limit="20" />
      <h1 v-if="upcoming" >Upcoming <span v-on:click="seeAll('upcoming')" >See all</span></h1>
      <FeedGrid v-if="upcoming" v-bind:movies="upcoming" v-bind:limit="20" />
      </div>
    </div>
    <Footer />
    <Loader v-if="!now_playing" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
import FeedCarousel from '@/components/Home/FeedCarousel.vue'
import Loader from '@/components/Loader.vue'
import timeAgo from '@/utils/timeAgo.js'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import FeedGrid from '@/components/Home/FeedGrid.vue'
import Preview from '@/components/Preview.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Feed',
  components: {
    FeedCarousel,
    Loader,
    Preview,
    ImagePlaceholder,
    FeedGrid,
    Footer
  },
  data(){
    return {
      now_playing: null,
      top_rated: null,
      upcoming: null,
      url: null,
      carousel: null,
      people: null,
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
    },

    redirect(id){
      this.$router.push(`/people/id/${id}`)
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

    this.getData(`${this.api_url}/person/popular?api_key=${this.api_key}`, 'people')

  },
  computed: {
    ...mapState(['api_url', 'currentSearch', 'api_key'])
  }

}
</script>

<style scoped>

.feed{
  width: 100%;
  min-height: calc(100vh - 60px);
  position: relative;
}

.title{
  padding: 50px !important;
  margin: 0px !important;
  justify-content: center !important; 
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);  
  margin-bottom: 12px !important;
  color: rgb(255, 255, 255);
}

.flex{
  display: flex;
}
.column{
  width: 300px;
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
  left: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 12px;
  padding: 12px;
  overflow: scroll;
}
.column-2{
  max-width: calc(100vw - 300px);
}
.column h2{
  grid-column: 1 / -1;
  font-size: 1.2em;
  font-weight: 500;
  text-transform: uppercase;
  padding: 12px;
  margin: 0px;
  text-align: center;
  margin-bottom: 24px;
}
.person{
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.person img{
  height: 140%;
  width: 100%;
}
.person:hover{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  transform: translateY(-4px);
}

.feed h1{
  padding: 12px;
  font-weight: 500;
  margin: 0px;
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
