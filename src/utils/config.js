// 编译环境
let NODE_ENV = process.env.NODE_ENV
// 调试选项，本地调试请改为 False
export const IS_ONLINE = true

// 测试 Token
export const TEST_TOKEN = '60487b89-0503-4aa0-88c3-defe70607929'
// export const TEST_TOKEN = "000ccd2f-a4bd-4c0c-8ca4-4524e5ec2b96"
// export const TEST_TOKEN = 'd5baa57e-74ee-4dd4-8122-f9c0f360889f'
// 公众号 URL
export const WECHAT_SUBSCRIPTION_URL =
  'https://mp.weixin.qq.com/mp/profile_ext?action=home' +
  '&__biz=MzA4Mzg3NjE2Mg==&scene=126#wechat_redirect'
// 后端接口api
let api = 'https://xcx.test.shbaoyuantech.com:30000'
if (NODE_ENV === 'development') {
  api = 'https://xcx.test.shbaoyuantech.com:30000'
} else if (NODE_ENV === 'production') {
  api = 'https://xcx.shbaoyuantech.com'
} else {
  throw new Error('域名地址既不是测试环境也不是正式环境')
}

// 前端访问地址
// http://t.shbaoyuantech.com/#    测试环境
// http://m.shbaoyuantech.com/#    正式环境
let originUrl = 'http://e.shbaoyuantech.com'
if (NODE_ENV === 'production') {
  originUrl = 'http://e.shbaoyuantech.com'
}
// 微信授权地址
// 目前测试环境和正式环境地址一样
let wxConfigUrl =
  'http://tencent.test.shbaoyuantech.com/wechat-js-config/online'
if (NODE_ENV === 'development') {
  wxConfigUrl = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/online'
}
export { api, originUrl, wxConfigUrl }
