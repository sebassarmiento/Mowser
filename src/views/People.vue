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
            <h3>Biography</h3>
            <p class="biography" >{{ person.biography }}</p>
            <h3>Photos</h3>
            <div v-if="photos" class="photos">
                <div v-for="(p, i) in photos" v-bind:key="i" class="photo" >
                    <img v-bind:src="`https://image.tmdb.org/t/p/w500${p.file_path}`" alt="">
                </div>
            </div>
            <h3>Movies</h3>
            <div v-if="movies" >
                <FeedGrid v-bind:movies="movies" v-bind:limit="10" />
            </div>
            <h3>Movies</h3>
            <div v-if="movies" >
                <FeedGrid v-bind:movies="movies" v-bind:limit="10" />
            </div>
            <h3>Movies</h3>
            <div v-if="movies" >
                <FeedGrid v-bind:movies="movies" v-bind:limit="10" />
            </div>
            <h3>Movies</h3>
            <div v-if="movies" >
                <FeedGrid v-bind:movies="movies" v-bind:limit="10" />
            </div>
            <h3>Movies</h3>
            <div v-if="movies" >
                <FeedGrid v-bind:movies="movies" v-bind:limit="10" />
            </div>
        </div>
    </div>
    <Loader v-else />
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader.vue'
import FeedGrid from '@/components/FeedGrid.vue'

export default {
    name: 'People',
    components: {
        Loader,
        FeedGrid
    },
    data(){
        return {
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
    padding: 12px;
}

.person-profile{
    padding: 12px;
    min-width: 26vw;
    min-height: calc(100vh - 84px);
    max-height: calc(100vh - 84px);
    position: sticky;
    top: 72px;
    left: 0px;
    background: red;
}
.person-profile img{
    width: 100%;
    max-height: 400px;
    border-radius: 12px;
    margin-bottom: 12px;
}

.person-info{
    padding: 12px;
    background: green;
    max-width: calc(74vw - 24px);
}
.person-info h3{
    font-size: 1.4em;
    margin: 24px 0px;
}
.biography{
    margin: 0px;
    font-size: 1em;
    line-height: 1.2em;
    margin-bottom: 24px;
}

.photos{
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(120px, 140px));
    margin-bottom: 24px;
}
.photos img{
    width: 100%;
    border-radius: 8px;
    margin: 0px auto;
    display: block;
}

</style>
