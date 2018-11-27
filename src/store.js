import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  isDistributor,
  getUserByToken,
  applyDistributor,
  sendMobileCode,
  validateMobileCode,
  getPresidentDetail,
  getMeInvitationList,
  getIncomeOrders,
  getTransferRecords
} from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null, //当前用户信息
    getCodeTip: '获取验证码', //
    remainTime: '发送短信', //
    clickAble: true, //
    extendAmount: 0, //分销员佣金
    presidentInfo: {}, //分会长信息
    invitationList: [], //分会长邀请列表
    incomeOrderList: [], //分会长收入订单列表
    distributors: [], //分会长分销员列表
    transferList: [], //分会长打款记录列表
    pageSize: 20, //分页Size
    currentPage: 1, //分页page
    loading: false, //列表加载中
    finished: false, //列表加载结束
    isDistributor: undefined //是不是分销员
  },
  mutations: {
    saveUserInfo(state, data) {
      Object.assign(state, data)
    },
    save(state, payload) {
      Object.assign(state, payload)
    },
    bindDistributorInfo(state, data) {
      Object.assign(state, data)
    },
    startSendCode(state) {
      state.sending = true
      state.clickAble = false
      state.remainTime = ''
    },
    endSendCode(state) {
      state.sending = false
      state.remainTime = '发送失败'
      state.getCodeTip = '重新获取'
    },
    countDownTime(state, time) {
      state.sending = false
      if (-1 === time) {
        state.remainTime = '发送短信'
        state.getCodeTip = '获取验证码'
      } else if (0 === time) {
        state.remainTime = '重新发送'
        state.getCodeTip = '重新获取'
      } else {
        state.remainTime = '剩余' + time + 's'
        state.getCodeTip = `重新获取(${time})`
      }
      state.clickAble = -1 === time || 0 === time
    },
    bindPresidentInfo(state, data) {
      Object.assign(state, data)
    },
    setInvitationList(state, data) {
      Object.assign(state, data)
    },
    setMeDistributors(state, data) {
      Object.assign(state, data)
    },
    setIncomeOrderList(state, data) {
      Object.assign(state, data)
    },
    bindTransferDetail(state, data) {
      Object.assign(state, data)
    },
    toggleLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    async getAccessToken() {
      await getToken()
    },
    async getUserInfo({ state, commit }, forceUpdate = false) {
      const { userInfo } = state
      if (userInfo && !forceUpdate) return userInfo
      const res = await getUserByToken()
      commit('saveUserInfo', { userInfo: res })
      return res
    },
    /**是否是分销员*/
    async checkDistributor({ state, commit, dispatch }, useCache = false) {
      if (undefined !== state.isDistributor && useCache)
        return state.isDistributor
      const response = await isDistributor()
      await commit('save', { isDistributor: false })
      return response
    },
    /**申请成为分销员*/
    async applyDistributor({ state, commit, dispatch }, params) {
      const res = await applyDistributor(params)
      if (!res) return null
      await commit('bindDistributorInfo', { extendAmount: res.extendAmount })
      await dispatch('checkDistributor', { useCache: false })
      return res
    },
    async sendMobileCode({ commit }, params) {
      await commit('startSendCode')
      const res = await sendMobileCode(params)
      if (0 !== res) {
        await commit('endSendCode')
        return
      }
      let totalTime = 60
      commit('countDownTime', totalTime)
      let interval = setInterval(() => {
        commit('countDownTime', --totalTime)
        if (totalTime <= 0) clearInterval(interval)
      }, 1000)
    },
    async validateMobileCode({ commit, dispatch }, params) {
      const res = await validateMobileCode(params)
      if (!res) return
      await dispatch('getUserInfo', true)
      return true
    },
    async getPresidentDetail({ commit }) {
      const res = await getPresidentDetail()
      console.log('getPresidentDetail', res)
      commit('bindPresidentInfo', { presidentInfo: res })
    },
    async getMeInvitationList({ state, commit }, refresh) {
      commit('toggleLoading', true)
      const currentPage = refresh ? 1 : state.currentPage + 1
      const params = { currentPage, pageSize: state.pageSize }
      const res = await getMeInvitationList(params)
      console.log('getMeInvitationList', res)
      let data = refresh ? res.result : state.invitationList.concat(res.result)
      const finished = data.length >= res.totalCount
      commit('toggleLoading', false)
      commit('setInvitationList', {
        invitationList: data,
        currentPage,
        finished
      })
    },
    async getMeDistributors({ state, commit }, refresh) {
      commit('toggleLoading', true)
      const currentPage = refresh ? 1 : state.currentPage + 1
      const params = { currentPage, pageSize: state.pageSize }
      const res = await getMeInvitationList(params)
      let data = refresh ? res.result : state.distributors.concat(res.result)
      console.log('getMeDistributors', res)
      const finished = data.length >= res.totalCount
      commit('toggleLoading', false)
      commit('setMeDistributors', { distributors: data, currentPage, finished })
    },
    async getIncomeOrders({ state, commit }, { refresh, status = 1 }) {
      commit('toggleLoading', true)
      const currentPage = refresh ? 1 : state.currentPage + 1
      const params = { status, currentPage, pageSize: state.pageSize }
      const res = await getIncomeOrders(params)
      let data = refresh ? res.result : state.incomeOrderList.concat(res.result)
      console.log('getMeDistributors', res)
      const finished = data.length >= res.totalCount
      commit('toggleLoading', false)
      commit('setIncomeOrderList', {
        incomeOrderList: data,
        currentPage,
        finished
      })
    },
    async getTransferRecord({ state, commit }, refresh) {
      await commit('toggleLoading', true)
      let currentPage = refresh ? 1 : state.currentPage + 1
      let params = { currentPage, pageSize: state.pageSize }
      const res = await getTransferRecords(params)
      commit('toggleLoading', false)
      if (!res) return
      let data =
        refresh || !state.transferList
          ? res.result
          : state.transferList.concat(res.result)
      let finished = data.length >= res.totalCount
      data.reduce((pre, item) => {
        let year = new Date(item.createTime).getFullYear()
        item['showYear'] = year !== pre
        return year
      }, 0)
      commit('bindTransferDetail', { transferList: data, finished })
    }
  }
})
