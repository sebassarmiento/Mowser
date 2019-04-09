<template>
    <div v-if="currentPreview" class="preview">
        <img v-if="currentPreview.poster_path" v-bind:src="`https://image.tmdb.org/t/p/w1280/${currentPreview.poster_path}`" alt="">
        <div class="preview-info">
            <div class="rating" ><i class="fas fa-star"></i>{{currentPreview.vote_average}}</div>
            <h2>{{ currentPreview.title }}</h2>
            <p>{{ currentPreview.overview }}</p>
            <button v-on:click="goTo" >See more</button>
        </div>
    </div>
    <div v-else class="preview" >
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Preview',
    computed: {
        ...mapState(['currentPreview'])
    },
    methods: {
        goTo(){
            this.$router.push(`/movie/id/${this.currentPreview.id}`)
        }
    }
}
</script>

<style scoped>

.preview{
    width: 20vw;
    min-width: 260px;
    height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    overflow: auto;
    transition: all 0.3s ease-in-out;
    animation: showPreview1 0.3s ease-in-out;
    position: sticky;
    top: 60px;
    right: 0px;
    z-index: 10;
}
.preview img{
    width: 100%;
    display: block;
    transform: translateY(-100%);
    animation: showPreviewImage 0.5s ease-in-out 0.3s forwards;
}

.preview-info{
    padding: 12px;
    position: relative;
    border-left: 1px solid rgba(0, 0, 0, 0.192);
}
.preview-info .rating{
    position: absolute;
    top: 12px;
    right: 12px;
    line-height: 1.2em;
    padding: 4px;
    display: flex;
    align-items: center;
}
.preview-info .rating i{
    margin-right: 6px;
    color: rgb(255, 217, 0);
}

.preview-info h2{
    text-align: left;
    margin: 0px;
    padding-right: 50px;
    line-height: 1.2em;
}
.preview-info p{
    line-height: 1em;
}

.preview-info button{
    width: 100%;
    padding: 12px;
    font-size: 0.9em;
    background-color: #2c3e50c4;
    color: white;
    font-weight: 500;
    border: none;
    position: relative;
    cursor: pointer;
    z-index: 1;
    border-radius: 2px;
}
.preview-info button::after{
    content: '';
    position: absolute;
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: scale(0.8, 1);
    background: #2c3e50;
    transition: all 0.2s ease-in-out;
}
.preview-info button:hover::after{
    opacity: 1;
    transform: scale(1);
    border-radius: 0px;
}

@keyframes showPreview {
    0%{
        opacity: 0;
        width: 0px;
        min-width: 0px;
        max-width: 0px;
    }
    100%{
        opacity: 1;
        min-width: 300px;
        width: 20vw;
        max-width: auto;
    }
}

@keyframes showPreviewImage {
    0%{
        transform: translateY(-100%);
    }
    80%{
        transform: translateY(20px);
    }
    100%{
        transform: translateY(0);
    }
}

</style>
