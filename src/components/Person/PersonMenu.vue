<template>

    <div v-if="data.photos && data.movies" class="person-menu" >
        <div v-on:click="select('biography')" class="person-menu-btn" v-bind:class="current" >Biography</div>
        <div v-on:click="select('photos')" class="person-menu-btn" >Photos <span>({{ data.photos.length }})</span></div>
        <div v-on:click="select('movies')" class="person-menu-btn" >Movies <span>({{ data.movies.length }})</span></div>
    </div>
    
</template>

<script>
export default {
    name: 'PersonMenu',
    props: {
        data: Object
    },
    data(){
        return {
            current: 'biography'
        }
    },
    methods: {
        select(option){
            this.current = option
            window.scrollTo(0, 0)
            this.$parent.selectMenuOption(this.current)
        }
    }
}
</script>

<style scoped>


.person-menu{
    width: calc(100% + 24px);
    height: 60px;
    background: rgb(233, 233, 233);
    margin-left: -12px;
    margin-top: -12px;
    align-items: center;
    justify-content: center;
    display: flex;
    position: sticky;
    top: 60px;
    left: 0;
}

.person-menu .person-menu-btn{
    padding: 12px;
    position: relative;
    cursor: pointer;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.person-menu-btn span{
    margin-left: 6px;
    font-size: 0.8em;
}

.person-menu-btn:nth-child(1):after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 2px;
    background: purple;
    transition: all 0.3s ease-in-out;
}

.person-menu .person-menu-btn.biography::after{
    transform: translateX(0px);
}
.person-menu .person-menu-btn.photos::after{
    transform: translateX(100px);
}
.person-menu .person-menu-btn.movies::after{
    transform: translateX(200px);
}


</style>
