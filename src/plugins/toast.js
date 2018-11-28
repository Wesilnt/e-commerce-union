import VueToast from './Toast.vue'
import Vue from 'vue'

const types = ['loading', 'success', 'fail']
const isObj = param => {
  const type = typeof param
  return type === 'object'
}

const COLORS = {
  bgColor: 'rgba(37, 37, 37, 0.82)',
  successBgColor: 'rgba(2, 142, 7, 0.85)',
  failBgColor: 'rgba(255, 20, 3, 0.85)',
  loadingBgColor: 'rgba(0, 0, 0, 0.81)'
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
  message: '',
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
      if (!singleton) {
        document.body.removeChild(toast.$el)
        toast.$destroy()
      }
    }
  }
  Object.assign(toast, opts)
  clearTimeout(timeout)
  if (opts.duration > 0) {
    timeout = setTimeout(() => {
      toast.clear()
    }, opts.duration)
  }
  return toast
}
const createMethod = type => options =>
  Toast({
    type,
    ...parseOpts(options || type)
  })
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
