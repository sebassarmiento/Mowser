<template>
  <div class="home">
    <Feed />
  </div>
</template>

<script>
import Feed from '@/components/Home/Feed.vue'
import Preview from '@/components/Preview.vue'

export default {
  name: 'home',
  components: {
    Feed,
    Preview
  }
}

</script>

<style scoped>

.home{
  display: flex;
}

</style>
