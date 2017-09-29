import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Items from '@/components/Items'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
      {
        path: '/items',
        component: Items
      },
      {
        path: '/todo',
        component: Todo
      },

      ]
    }
  ]
})
