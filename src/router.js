import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    } ,
    {
      path: '/home/problem',
      name: 'problem',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/CommonProblem.vue')
    },
    {
      path: '/home/meInvitation',
      name: 'meInvitation',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/MeInvitation.vue')
    },
    {
      path: '/home/invitationLetter',
      name: 'invitationLetter',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/InvitationLetter.vue')
    },
    {
      path: '/home/invitationOrderDetail',
      name: 'invitationOrderDetail',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/InvitationOrderDetail.vue')
    },
    {
      path: '/home/joinDistributor',
      name: 'joinDistributor',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/JoinDistributor.vue')
    },
    {
      path: '/home/distributionIntroduce',
      name: 'DistributionIntroduce',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/DistributionIntroduce.vue')
    },
    {
      path: '/home/distributionApplyResult',
      name: 'distributionApplyResult',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/DistributionApplyResult.vue')
    },
    {
      path: '/home/meDistributors',
      name: 'meDistributors',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/MeDistributors.vue')
    }
  ]
})
