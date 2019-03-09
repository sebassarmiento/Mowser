<template>
    <div class="loader"></div>
</template>

<script>
export default {
    name: 'Loader'
}
</script>

<style scoped>

.loader{
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid black;
    border-right: 2px solid black;
    animation: loader 0.4s linear infinite;
}

@keyframes loader {
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}

</style>
