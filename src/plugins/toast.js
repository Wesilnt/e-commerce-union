import VueToast from './Toast.vue'
import Vue from 'vue'

const types = ['loading', 'success', 'fail']
const isObj = param => {
  const type = typeof param
  return type === 'object'
}

const COLORS = {
  defaultBgColor: 'rgba(37, 37, 37, 0.82)',
  successBgColor: 'rgba(255, 163, 47, 0.82)',
  failBgColor: 'rgba(90, 90, 90, 0.82)',
  loadingBgColor: 'rgba(119, 119, 119, 0.49)'
}
const ICONS = {
  successIcon: require(`../../public/success.svg`),
  failIcon: require(`../../public/fail.svg`),
  loadingIcon: require(`../../public/loading.svg`)
}
const defaultOptions = {
  shown: true,
  type: 'text',
  mask: false,
  message: 'toast something',
  duration: 3000,
  forbidClick: true,
  spin: false,
  icon: null,
  ...COLORS,
  ...ICONS,
  position: 'middle',
  overlayStyle: {}
}
const parseOpts = message => (isObj(message) ? message : { message }),
  queue = [] // toast队列
let singleton = true, // 一个html只容许存在一个toast
  currentOptions = { ...defaultOptions },
  timeout = null

function createInstance() {
  const len = queue.length
  if (!len || !singleton) {
    // 如果队列中不存在或者不为单例
    const toast = new (Vue.extend(VueToast))({
      el: document.createElement('div')
    })
    document.body.appendChild(toast.$el)
    queue.push(toast)
  }
  return queue[queue.length - 1]
}

function Toast(opts = {}) {
  const toast = createInstance()
  opts = {
    ...currentOptions,
    ...parseOpts(opts),
    clear() {
      toast.shown = false
      clearTimeout(timeout)
      if (!singleton) {
        document.body.removeChild(toast.$el)
        toast.$destroy()
      }
    }
  }
  Object.assign(toast, opts)
  console.log(toast)
  clearTimeout(timeout)
  if (opts.duration > 0) {
    timeout = setTimeout(() => {
      toast.clear()
    }, opts.duration)
  }
  return toast
}
const createMethod = type => options => {
  return Toast({
    type,
    ...parseOpts(isObj(options) ? { message: type, ...options } : type)
  })
}

types.forEach(item => {
  Toast[item] = createMethod(item)
})
Toast.clear = all => {
  if (queue.length) {
    if (all) {
      queue.forEach(toast => toast.clear())
      queue.splice(0)
    } else if (singleton) {
      queue[0].clear()
    } else {
      queue.shift().clear()
    }
  }
}
Toast.setDefaultOptions = options => {
  Object.assign(currentOptions, options)
}

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions }
}

Toast.allowMultiple = (allow = true) => {
  singleton = !allow
}

Toast.install = () => Vue.use(VueToast)

Vue.prototype.$toast = Toast

export default Toast
