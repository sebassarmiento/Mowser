<template>
    <div class="movie-menu">
        <div class="movie-menu-btn">Videos</div>
        <div class="movie-menu-btn">Images</div>
        <div class="movie-menu-btn">Cast</div>
        <div class="movie-menu-btn">Reviews</div>
        <div class="movie-menu-btn">Credits</div>
    </div>
</template>

<script>
export default {
    name: 'MovieMenu'
}
</script>

<style scoped>

.movie-menu{
    display: flex;
    padding: 12px;
    justify-content: center;
    position: sticky;
    top: 60px;
    background: white;
    z-index: 3;
}

.movie-menu .movie-menu-btn{
    padding: 12px;
    position: relative;
    cursor: pointer;
    width: 100px;
    display: flex;
    justify-content: center;
}
.movie-menu-btn:nth-child(1):after{
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 2px;
    background: purple;
}


</style>


