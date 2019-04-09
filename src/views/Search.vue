<template>
    <div class="search" >
        <p v-if="movies.length > 0" >Showing {{ movies.length }} of {{ total_results }} results for '<strong>{{ $route.query.query }}</strong>'</p>
        <div v-else class="search-text">
            <i class="fas fa-search" ></i>
            <p>Type something in the search bar above and press enter!</p>
        </div>
        <div v-if="loading" class="loading">
            <Loader />
        </div>
        <div v-if="movies" class="results">
            <div v-for="(m, i) in movies" class="movie" v-bind:key="i" v-on:click="redirect(m.id)" >
                <img v-bind:src="m.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${m.backdrop_path}` : ImagePlaceholder" alt="">
                <h4>{{ m.title }} <span><i class="fas fa-star" ></i> {{ m.vote_average }}</span></h4>
                <p>{{ m.release_date ? timeAgo(m.release_date) : null }}</p>
            </div>
        </div>
        <div v-if="moreData" class="load-more">
            <button v-on:click="loadMore" >Load more</button>
        </div>
        <Footer v-if="movies.length > 0" />
    </div>
</template>

<script>
import timeAgo from '@/utils/timeAgo.js'
import { mapState, mapMutations } from 'vuex'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import Loader from '@/components/Loader.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'Search',
    components: {
        Loader,
        Footer
    },
    data(){
        return {
            movies: [],
            page: 1,
            ImagePlaceholder,
            moreData: true,
            total_results: 0,
            total_pages: 0,
            query: '',
            loading: false
        }
    },
    methods: {
        getData(query){
            this.loading = true
            fetch(`${this.api_url}/search/movie?api_key=${this.api_key}&query=${query}&page=${this.page}`)
            .then(d => d.json())
            .then(res => {
                console.log(res)
                this.total_results = res.total_results
                this.movies = [...this.movies, ...res.results]
                this.total_pages = res.total_pages
                if(res.total_pages === this.page){
                    this.moreData = false
                }
                this.loading = false
            })
            .catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        loadMore(){
            console.log(this.page, this.total_pages)
            if(this.moreData){
                this.page += 1
                this.getData(this.query)
            }
            if(this.page >= this.total_pages){
                    this.moreData = false
            }
        },
        timeAgo(date){
            let myDate = date.split('-')
            myDate = myDate.map(d => parseFloat(d))
            return timeAgo(myDate)
        },
        redirect(id){
            this.$router.push(`/movie/id/${id}`)
        }
    },
    mounted(){
        console.log('Mounted')
        window.scrollTo(0, 0)
        this.query = this.$route.query.query
        this.getData(this.query)
    },
    updated(){
        if(this.query !== this.$route.query.query){
            console.log('Entra')
            this.movies = [],
            this.page = 1,
            this.moreData = true,
            this.total_results = 0,
            this.query = this.$route.query.query
            this.getData(this.query)
        }
    },
    computed: {
    ...mapState(['api_url', 'currentSearch', 'api_key'])
    },
    watch: {
        '$route' (to, from){
            console.log(to)
            console.log(from)
            if(to.query.query !== from.query.query){
                this.movies = [],
                this.page = 1,
                this.moreData = true,
                this.total_results = 0,
                this.query = to.query.query
                this.getData(this.query)
            }
        }
    }
}
</script>

<style scoped>

.search{
    min-height: calc(100vh - 60px);
    padding: 12px;
}
.search-text, .loading{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.search-text i{
    font-size: 5em;
    opacity: 0.4;
}

.search p:nth-child(1){
    text-align: center;
}

.results{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.results .movie img{
    width: 100%;
    display: block;
    opacity: 0.8;
    transition: all .3s ease-in-out;
}
.results .movie img:hover{
    opacity: 1;
}
.results .movie{
    margin: 0px 4px;
    margin-bottom: 20px;
    cursor: pointer;
}

.results .movie h4{
    margin: 4px 0px;
    font-size: 0.9em;
    font-weight: 600;
    position: relative;
    padding-right: 36px;
    line-height: 1.2em;
}
.results .movie span{
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 0.9em;
    height: 1.5em;
}
.results .movie span i{
    color: rgb(255, 196, 0);
}
.results .movie p{
    margin: 0px;
    font-size: 0.8em;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.486);
}


.load-more{
    text-align: center;
    padding: 24px;
}

.load-more button{
    margin: 12px auto;
    padding: 12px 18px;
    font-size: 0.9em;
    font-family: 'Roboto', sans-serif;
    background: #066d9c;
    border: none;
    border-radius: 2px;
    color: white;
    font-weight: 500;
    cursor: pointer;
}

</style>


