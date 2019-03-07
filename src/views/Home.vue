<template>
  <div class="home">
    <AppMenu />
    <Feed />
    <Preview />
  </div>
</template>

<script>
import Feed from '@/components/Feed.vue'
import AppMenu from '@/components/AppMenu.vue'
import Preview from '@/components/Preview.vue'

export default {
  name: 'home',
  components: {
    Feed,
    AppMenu,
    Preview
  }
}

</script>

<style scoped>

.home{
  display: flex;
}

</style>
