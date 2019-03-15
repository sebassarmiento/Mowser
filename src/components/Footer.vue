<template>
    <footer>
        <p>Developed by Sebastian Sarmiento</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>

footer{
    height: 300px;
    width: 100%;
    background: linear-gradient(to bottom, rgb(255, 255, 255),rgba(136, 136, 136, 0.678), rgba(0, 0, 0, 0.849));
    text-align: center;
    position: relative;
}

footer p{
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
}

</style>

