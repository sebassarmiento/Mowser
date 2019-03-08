<template>
    <div v-if="currentPreview" class="preview">
        <img v-bind:src="`https://image.tmdb.org/t/p/w1280/${currentPreview.poster_path}`" alt="">
        <div class="preview-info">
            <div class="rating" ><i class="fas fa-star"></i>{{currentPreview.vote_average}}</div>
            <h2>{{ currentPreview.title }}</h2>
            <p>{{ currentPreview.overview }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Preview',
    computed: {
        ...mapState(['currentPreview'])
    }
}
</script>

<style scoped>

.preview{
    width: 20vw;
    min-width: 260px;
    height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    overflow: scroll;
    transition: all 0.3s ease-in-out;
    animation: showPreview 0.3s ease-in-out;
}
.preview img{
    width: 100%;
    display: block;
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

</style>
