<template>
    <div class="search">
        <Filters />
        <div class="results">
            <h2 v-if="searched" >Showing results for {{ keyword }}</h2>
        </div>
    </div>
</template>

<script>
import Filters from '@/components/Discover/Filters.vue'


export default {
    name: 'Discover',
    components: {
        Filters
    },
    data(){
        return {
            keyword: '',
            searched: false
        }
    },
    methods: {
        search(filters){
            this.searched = true
            this.keyword = filters.keyword || ''
        }
    }
}
</script>

<style scoped>



</style>

