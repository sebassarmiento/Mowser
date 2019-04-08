<template>
    
    <div class="filters">
            <div class="filter">
                <label for="keyword-filter">Keywords</label>
                <input type="text" id="keyword-filter" v-model="keyword" >
            </div>
            <div class="filter">
                <label for="year-filter">Year</label>
                <select name="" id="year-filter">
                    <option value="">Any</option>
                    <option value="">2019</option>
                    <option value="">2018</option>
                    <option value="">2017</option>
                    <option value="">2016</option>
                    <option value="">2015</option>
                    <option value="">2014</option>
                    <option value="">2013</option>
                    <option value="">2012</option>
                </select>
            </div>
            <div class="filter">
                <label for="sortby-filter">Sort by</label>
                <select name="" id="sortby-filter">
                    <option value="">Popularity Descending</option>
                    <option value="">Popularity Ascending</option>
                    <option value="">Popularity Descending</option>
                    <option value="">Popularity Ascending</option>
                    <option value="">Popularity Descending</option>
                    <option value="">Popularity Ascending</option>
                </select>
            </div>
            <div class="filter">
                <label for="genres-filter">Genres</label>
                <select name="" id="genres-filter">
                    <option value="">Any</option>
                    <option value="">Action</option>
                    <option value="">Adventure</option>
                    <option value="">Science fiction</option>
                    <option value="">Adventure</option>
                    <option value="">Science fiction</option>
                    <option value="">Adventure</option>
                </select>
            </div>
            <button class="search-btn" v-on:click="handleSearch()" >Search</button>
        </div>

</template>

<script>
export default {
    name: 'Filters',
    data(){
        return {
            keyword: ''
        }
    },
    methods: {
        handleSearch(){
            this.$parent.search({
                keyword: this.keyword
            })
        }
    }
}
</script>

<style scoped>

.filters{
    background: rgb(250, 220, 220);
    width: 100%;
    display: flex;
    padding: 12px;
    align-items: center;
    justify-content: center;
}

.filter{
    margin-right: 24px;
}

.filter input{
    width: 200px;
    padding: 8px;
    font-size: 1em;
    color: rgba(61, 57, 57, 0.712);
    border: 1px solid rgba(61, 57, 57, 0.192);
    border-radius: 10px;
}

.filter label{
    margin-right: 6px;
}

.search-btn{
    padding: 12px 18px;
    border: none;
    border-radius: 2px;
    font-size: 0.9em;
    background-color: darkslateblue;
    color: white;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
}


</style>


