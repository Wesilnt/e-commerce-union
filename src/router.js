import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)
// router.beforeEach((to, from, next) => {
//     console.log(to, from);
//     next()
// })

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/Home.vue')
    },
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
    },
    {
      path: '/home/transferRecord',
      name: 'transferRecord',
      component: () =>
        import(/* webpackChunkName: "problem" */ './views/TransferRecord.vue')
    }
  ]
})
