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
export const formatDuring = mss => {
  if (isNaN(mss)) return '00:00'
  mss = Math.round(mss)
  var days = parseInt(mss / (60 * 60 * 24))
  var hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
  var minutes = parseInt((mss % (60 * 60)) / 60)
  var seconds = mss % 60
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return minutes + ':' + seconds
}
export function getDateDiff(dateStr) {
  var publishTime = dateStr / 1000,
    d_seconds,
    d_minutes,
    d_hours,
    d_days,
    timeNow = parseInt(new Date().getTime() / 1000),
    d,
    date = new Date(publishTime * 1000),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  //小于10的在前面补0
  if (M < 10) {
    M = '0' + M;
  }
  if (D < 10) {
    D = '0' + D;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }

  d = timeNow - publishTime;
  d_days = parseInt(d / 86400);
  d_hours = parseInt(d / 3600);
  d_minutes = parseInt(d / 60);
  d_seconds = parseInt(d);

  if (d_days > 0 && d_days < 3) {
    return d_days + '天前';
  } else if (d_days <= 0 && d_hours > 0) {
    return d_hours + '小时前';
  } else if (d_hours <= 0 && d_minutes > 0) {
    return d_minutes + '分钟前';
  } else if (d_seconds < 60) {
    if (d_seconds <= 0) {
      return '刚刚';
    } else {
      return d_seconds + '秒前';
    }
  } else if (d_days >= 3 && d_days < 30) {
    return M + '月' + D + '日' + H + ':' + m;
  } else if (d_days >= 30) {
    return Y + '月' + M + '日' + D + ' ' + H + ':' + m;
  }
}

//学习进度百分比格式化
export const learntimeFormat = (learntime, totaltime, id) => {
  let progressCache = localStorage.getItem(id) 
  let curTime = learntime 
  if (progressCache) {
    let learnJson = JSON.parse(progressCache)
    curTime = learnJson.currentTime || learnJson.historyPlayPosition
  }
  if (!curTime || curTime <= 1) return '未收听'
  let percent = parseInt((curTime * 100) / totaltime)
  return '已收听' + (percent < 1 ? 1 : percent) + '%'
}

//倒计时函数
export const startCountDown = (duration, callback) => {
  return setInterval(() => {
    var hours = parseInt(duration / (60 * 60))
    var minutes = parseInt((duration % (60 * 60)) / 60)
    var seconds = duration % 60
    hours = parseInt(hours)
    minutes = parseInt(minutes)
    seconds = parseInt(seconds)
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    callback([hours, minutes, seconds])
    duration--
  }, 1000)
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
/**
 * 手机号码校验
 */
export function isPhoneNumber( value) {
  if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
    return false
  } else {
    return true
  }
}

const gradeMap = [
  { key: -1, value: '未上学' },
  { key: 0, value: '幼儿园' },
  { key: 1, value: '一年级' },
  { key: 2, value: '二年级' },
  { key: 3, value: '三年级' },
  { key: 4, value: '四年级' },
  { key: 5, value: '五年级' },
  { key: 6, value: '六年级' },
  { key: 7, value: '初一' },
  { key: 8, value: '初二' },
  { key: 9, value: '初三' },
  { key: 10, value: '初三以上' }
]
// 根据key 转化成 年级
export function getGradeStr(num) {
  for (let i = 0; i < gradeMap.length; i++) {
    let key = gradeMap[i].key
    let value = gradeMap[i].value
    if (num === key) {
      return value
    }
  }
}
// 根据 年级转化成 key
export function getGradeNum(str) {
  for (let i = 0; i < gradeMap.length; i++) {
    let key = gradeMap[i].key
    let value = gradeMap[i].value
    if (value === str) {
      return key
    }
  }
}
