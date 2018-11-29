const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
  reg.lastIndex = 0
  return reg.test(path)
}

export const json2formData = json => {
  if (Object.prototype.toString.call(json) !== '[object Object]') {
    return json
  }
  const formData = new FormData()
  for (const [key, value] of Object.entries(json)) {
    formData.append(key, value)
  }
  return formData
}
const pako = require('pako')
export const encode = str => {
  return window.btoa(pako.gzip(encodeURIComponent(str), { to: 'string' }))
}

export const decode = encodedData => {
  let strData = window.atob(encodedData)
  // Convert binary string to character-number array
  let charData = strData.split('').map(function(x) {
    return x.charCodeAt(0)
  })
  // Turn number array into byte-array
  let binData = new Uint8Array(charData)
  let data = pako.inflate(binData)
  // Convert gunzipped byteArray back to ascii string:
  strData = String.fromCharCode.apply(null, new Uint16Array(data))
  return decodeURIComponent(strData)
}

export function formatData(data) {
  if (data < 10) return '0' + data
  return data
}
export const formatYMDHMS = date => {
  let mss = new Date(date)
  let year = formatData(mss.getFullYear())
  let month = formatData(mss.getMonth() + 1)
  let day = formatData(mss.getDate())
  let hour = formatData(mss.getHours())
  let minute = formatData(mss.getMinutes())
  let seconds = formatData(mss.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}
export const formatYMD = date => {
  let mss = new Date(date)
  let year = mss.getFullYear()
  let month = mss.getMonth() + 1
  let day = mss.getDate()
  return `${year}-${month < 9 ? '0' + month : month}-${
    day < 9 ? '0' + day : day
  }`
}

export const formatMD = date => {
  let mss = new Date(date)
  let month = mss.getMonth() + 1
  let day = mss.getDate()
  return `${month < 9 ? '0' + month : month}月${day < 9 ? '0' + day : day}日`
}

export function debounce(func, wait, immediate) {
  // immediate默认为false
  var timeout, args, context, timestamp, result

  var later = function() {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function() {
    context = this
    args = arguments
    timestamp = Date.now()
    // 第一次调用该方法时，且immediate为true，则调用func函数
    var callNow = immediate && !timeout
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

export function throttle(func, wait, options) {
  /* options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    // 计算剩余时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 当到达wait指定的时间间隔，则调用func函数
    // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
    if (remaining <= 0 || remaining > wait) {
      // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // options.trailing=true时，延时执行func函数
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
