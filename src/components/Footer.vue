<template>
    <footer>
        <p>Developed by <a href="https://www.sarmientosebastian.com" target="_blank" >Sebastian Sarmiento</a></p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>

footer{
    height: 150px;
    width: 100%;
    background: linear-gradient(to bottom, rgb(255, 255, 255), rgb(0, 0, 0));
    opacity: 0.8;
    text-align: center;
    position: relative;
    animation: showFooter 1s ease-in-out;
}

footer p{
    position: absolute;
    bottom: 12px;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
}

footer a{
    font-weight: bold;
    color: rgb(255, 255, 255);
}

@keyframes showFooter{
    from{opacity: 0}
    to{opacity: 1}
}

</style>

