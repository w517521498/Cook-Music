import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../components/Recommend'
import Singer from '../components/Singer/index.vue'
import Rank from '../components/Rank/index.vue'
import My from  '../components/My'
import Detail from 'components/Detail'
import Xiangqing from '../components/Xiangqing'
import Tuijiangedan from '../components/Tuijiangedan'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
   {
     path:'/recommend',
     component:Recommend,
     children:[
       {
         path:':disstid',
         name:'tuijiangedan',
         component:Tuijiangedan
       }
     ]
   },
   {
    path:'/singer',
    component:Singer,
    children:[
      {
        path:':singermid',
        name:'detail',
        component:Detail
      }
    ]
    },{
      path:'/rank',
      component:Rank,
      children:[
        {
        path:':topid',
        name:'xiangxi',
        component:Xiangqing
        }
      ]
    },{
      path:'/my',
      component:My
    },{
      path:'/',
      redirect:'/recommend'
    }
  ]
})

export default router
