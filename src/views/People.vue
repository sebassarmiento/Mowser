<template>
    <div class="people">
        <h1>People component</h1>
        <div v-if="person" class="person-info">
            <img v-bind:src="`https://image.tmdb.org/t/p/w154${person.profile_path}`" alt="">
            <div>
                <h2>{{ person.name }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'People',
    data(){
        return {
            person: null
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

    },
    computed: {
      ...mapState(['api_url', 'api_key'])
  }
}
</script>

<style scoped>

.people{
    background: red;
    padding: 12px;
}

.person-info{
    background: green;
    padding: 12px;
    display: flex;
}
.person-info img{
    height: 200px;
}

</style>
