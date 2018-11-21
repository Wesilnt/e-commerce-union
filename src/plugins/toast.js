import Toast from './Toast.vue'
export default {
  install(Vue) {
    const VueToast = Vue.extend(Toast)
    let toast = null
    const typeStatus = ['success', 'fail', 'loading']
    const positionStatus = ['top', 'middle', 'bottom']
    const toastPromise = (params = {}, type = '') => {
      return new Promise((resolve, reject) => {
        if (toast) return
        const { mountEl = document.body, position } = params
        if (type && position) {
          reject('type and position can not exist both')
          return
        }
        // 判断 toast 默认三种类型
        if (position && !positionStatus.includes(position)) {
          reject(`position must be one of [ ${positionStatus.join(' , ')} ]`)
          return
        }
        if (type && !typeStatus.includes(type)) {
          reject(`type must be one of [ ${typeStatus.join(' , ')} ]`)
          return
        }
        toast = new VueToast()
        toast.$mount()
        mountEl.appendChild(toast.$el)
        switch (typeof params) {
          case 'string':
            toast.show({ message: params, type })
            break
          case 'object':
            toast.show({ ...params, type })
            break
          default:
            reject('params must be a string or object')
            return
        }
        resolve()
      }).catch(res => {
        throw new Error(res)
      })
    }
    typeStatus.forEach(item => {
      toastPromise[item] = params => toastPromise(params, item)
    })
    toastPromise.clear = function() {
      clearInterval(toast.inter)
      toast.hidden = true
      toast.$el.parentNode.removeChild(toast.$el)
      toast = null
    }
    // TODO 尚未添加全局配置
    Vue.prototype.$toast = toastPromise
  }
}
