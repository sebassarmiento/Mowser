import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Movie from './views/Movie.vue'
import People from './views/People.vue'
import Search from './views/Search.vue'
import Discover from './views/Discover.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
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
      path: '/people/id/:personId',
      name: 'People',
      component: People
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
