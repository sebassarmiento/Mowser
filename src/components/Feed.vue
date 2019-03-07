<template>
  <div class="feed">
    <h1>Showing {{ $route.params.category }} </h1>
  </div>
</template>

<script>

export default {
  name: 'Feed',
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style scoped>

.feed{
  background: red;
  width: 100%;
  height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  overflow: scroll;
}

</style>
