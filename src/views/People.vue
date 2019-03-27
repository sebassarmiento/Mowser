<template>
    <div v-if="person" class="person-container" >
        <div class="person-profile">
            <img v-bind:src="`https://image.tmdb.org/t/p/w500${person.profile_path}`" alt="">
            <div>
                <h2>{{ person.name }}<span v-if="person.birthday" >, {{ getAge(person.birthday) }}</span></h2>
                <p v-if="person.place_of_birth" >Born in {{ person.place_of_birth }}</p>
            </div>
        </div>
        <div class="person-info">
            <div v-if="person.biography" >
                <h3>Biography</h3>
                <p class="biography" >{{ person.biography }}</p>
            </div>
            <div v-if="photos" class="photos-container" >
                <h3>Photos</h3>
                <div class="photos">
                    <div v-for="(p, i) in photos" v-bind:key="i" class="photo" >
                        <img v-bind:src="`https://image.tmdb.org/t/p/w500${p.file_path}`" alt="">
                    </div>
                </div>
            </div>
            <div v-if="movies" class="movies-container" >
                <div class="movie-header" >
                    <h3>Movies</h3>
                    <div class="sort-movies">
                        <select v-on:change="sortMovies" >
                            <option value="new">Newest</option>
                            <option value="old">Oldest</option>
                            <option value="top">Top rated</option>
                            <option value="less">Less rated</option>
                        </select>
                    </div>
                </div>
                <div class="person-movies" >
                    <div v-for="movie in movies" v-bind:key="movie.id" class="movie" >
                        <img v-on:click="redirect('movie', movie.id)" v-bind:src="movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}` : ImagePlaceholder" alt="">
                        <h4>{{ movie.title }}</h4>
                        <p>{{ movie.release_date ? timeAgo(movie.release_date) : null }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Loader v-else />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'
import FeedGrid from '@/components/Home/FeedGrid.vue'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import timeAgo from '@/utils/timeAgo'

export default {
    name: 'People',
    components: {
        Loader,
        FeedGrid    
    },
    data(){
        return {
            ImagePlaceholder,
            person: null,
            movies: null,
            photos: null
        }
    },
    methods: {
        getAge(date){
            let year = new Date(date.split('-').join('.')).getFullYear()
            let now = new Date().getFullYear()

            return now - year;
        },
        timeAgo(date){
            let myDate = date.split('-')
            myDate = myDate.map(d => parseFloat(d))
            return timeAgo(myDate)
        },
        redirect(type, id){
            this.$router.push(`/${type}/id/${id}`)
        },

        sortMovies(e){
            let val = e.target.value
            let timeStamp = date => new Date(date.split('-').map(d => parseFloat(d)).join('.')).getTime()
        
            switch(val){
                case 'new':
                this.movies = this.movies.filter(m => m.release_date).sort((a, b) => timeStamp(b.release_date) - timeStamp(a.release_date))
                break;
                case 'old':
                this.movies = this.movies.filter(m => m.release_date).sort((a, b) => timeStamp(a.release_date) - timeStamp(b.release_date))
                break;
                case 'top':
                this.movies = this.movies.sort((a, b) => b.vote_average - a.vote_average)
                break;
                case 'less':
                this.movies = this.movies.sort((a, b) => a.vote_average - b.vote_average)
                break;
                default:
                return null
            }
        }
    },
    mounted(){

        fetch(`${this.api_url}/person/${this.$route.params.personId}?api_key=${this.api_key}`)
        .then(d => d.json())
        .then(res => {
            console.log(res)
            this.person = res
        })
        .catch(err => console.log(err))

        fetch(`${this.api_url}/person/${this.$route.params.personId}/images?api_key=${this.api_key}`)
        .then(d => d.json())
        .then(res => {
            console.log(res)
            this.photos = res.profiles
        })
        .catch(err => console.log(err))

        fetch(`${this.api_url}/person/${this.$route.params.personId}/movie_credits?api_key=${this.api_key}`)
        .then(d => d.json())
        .then(res => {
            console.log('Credits' ,res)
            this.movies = res.cast
        })
        .catch(err => console.log(err))

    },
    computed: {
      ...mapState(['api_url', 'api_key'])
    }
}
</script>

<style scoped>

p, h2, h3{
    margin: 0px;
}

.person-container{
    display: flex;
    padding: 0px;
    min-height: calc(100vh - 60px);
}

.person-profile{
    padding: 12px;
    padding-top: 0px;
    min-width: 260px;
    max-width: 260px;
    min-height: calc(100vh - 84px);
    max-height: calc(100vh - 84px);
    position: sticky;
    top: 72px;
    left: 0px;
}
.person-profile img{
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-top: 0px;
    margin-bottom: 12px;
}

.person-info{
    padding: 12px;
    padding-top: 0px;
    min-width: calc(100vw - 260px);
    max-width: calc(100vw - 260px);
    background: white;
}
.person-info h3{
    font-size: 1.4em;
    margin: 24px 0px;
}
.biography{
    margin: 0px;
    margin-top: 12px;
    font-size: 1em;
    line-height: 1.2em;
    margin-bottom: 24px;
}


.photos-container{
    padding-top: 24px;
}
.photos{
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(120px, 140px));
    margin-bottom: 24px;
    margin-top: 12px;
}
.photos img{
    width: 100%;
    border-radius: 8px;
    margin: 0px auto;
    display: block;
}


.movie-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 12px;
}
.movie-header .sort-movies{
    width: 100px;
    height: 30px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    padding: 0px 12px;
    box-sizing: content-box;
    border: 2px solid rgb(224, 224, 224);
}
.movie-header select{
    background: rgb(224, 224, 224);
    padding: 12px;
    font-size: 0.9em;
    border: 2px solid rgb(224, 224, 224);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-weight: 600;
    color: rgb(77, 75, 75);
}
.movies-container{
    padding-top: 24px;
}
.person-movies{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    margin-top: 12px;
}
.person-movies .movie{
    min-width: 220px;
    border-radius: 6px;
    margin: 12px 2px;
}
.person-movies img{
    border-radius: 0px;
    width: 100%;
    box-shadow: 0px 35px 30px -30px rgba(0, 0, 0, 0.411);
    opacity: 0.9;
    transition: all 0.2s ease-in-out;
}
.person-movies img:hover{
  opacity: 1;
  cursor: pointer;
}
.person-movies h4{
  margin: 0px 0px;
  font-size: 0.9em;
  text-align: left;
  cursor: pointer;
}
.person-movies p{
  margin: 0px;
  font-size: 0.8em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.486);
}

</style>
