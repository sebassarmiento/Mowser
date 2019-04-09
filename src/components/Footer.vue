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
    min-height: 100px;
    width: 100%;
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
    color: #333;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
}

footer a{
    font-weight: bold;
}

@keyframes showFooter{
    from{opacity: 0}
    to{opacity: 1}
}

</style>

