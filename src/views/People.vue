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
            <PersonMenu v-bind:data="{movies, photos, biography: person.biography}" />
            <div v-if="menu.biography" >
                <h3>Biography</h3>
                <p class="biography" >{{ person.biography }}</p>
            </div>
            <div v-if="menu.photos && photos" >
                <div class="photos">
                    <div v-for="(p, i) in photos" v-bind:key="i" class="photo" >
                        <img v-bind:src="`https://image.tmdb.org/t/p/w500${p.file_path}`" alt="">
                    </div>
                </div>
            </div>
            <div v-if="menu.movies && movies" >
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
import FeedGrid from '@/components/FeedGrid.vue'
import PersonMenu from '@/components/Person/PersonMenu.vue'
import ImagePlaceholder from '@/assets/MoviePlaceholder.png'
import timeAgo from '@/utils/timeAgo'

export default {
    name: 'People',
    components: {
        Loader,
        FeedGrid,
        PersonMenu
    },
    data(){
        return {
            ImagePlaceholder,
            person: null,
            movies: null,
            photos: null,
            menu: {
                biography: true,
                photos: false,
                movies: false
            }
        }
    },
    methods: {
        getAge(date){
            let year = new Date(date.split('-').join('.')).getFullYear()
            let now = new Date().getFullYear()

            return now - year;
        },
        selectMenuOption(option){
            for(let k in this.menu) this.menu[k] = false;
            this.menu = {...this.menu, [option]: true}
        },
        timeAgo(date){
            let myDate = date.split('-')
            myDate = myDate.map(d => parseFloat(d))
            return timeAgo(myDate)
        },
        redirect(type, id){
            console.log(id)
            this.$router.push(`/${type}/id/${id}`)
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
