<template>
  <div class="home">
    <AppMenu />
    <Feed />
  </div>
</template>

<script>
import Feed from '@/components/Feed.vue'
import AppMenu from '@/components/AppMenu.vue'

export default {
  name: 'home',
  components: {
    Feed,
    AppMenu
  }
}

</script>

<style scoped>

.home{
  display: flex;
}

</style>
