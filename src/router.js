import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Movie from './views/Movie.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Home
    },
    {
      path: '/feed/:category',
      name: 'feed',
      component: Home
    },
    {
      path: '/movie/id/:movieId',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
