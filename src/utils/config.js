"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 编译环境
let NODE_ENV = process.env.NODE_ENV;
// 调试选项，本地调试请改为 False
exports.IS_ONLINE = false;
// 测试 Token
exports.TEST_TOKEN = "60487b89-0503-4aa0-88c3-defe70607929"
// exports.TEST_TOKEN = "d5baa57e-74ee-4dd4-8122-f9c0f360889f"
// 公众号 URL
exports.WECHAT_SUBSCRIPTION_URL = 'https://mp.weixin.qq.com/mp/profile_ext?action=home' +
    '&__biz=MzA4Mzg3NjE2Mg==&scene=126#wechat_redirect';
// 后端接口api
let api = 'https://xcx.test.shbaoyuantech.com:30000';
exports.api = api;
if (NODE_ENV === 'development') {
    exports.api = api = 'https://xcx.test.shbaoyuantech.com:30000';
}
else if (NODE_ENV === 'production') {
    exports.api = api = 'https://xcx.shbaoyuantech.com';
}
else {
    throw new Error('域名地址既不是测试环境也不是正式环境');
}
// 前端访问地址
// http://t.shbaoyuantech.com/#    测试环境
// http://m.shbaoyuantech.com/#    正式环境
let originUrl = 'http://t.shbaoyuantech.com/#';
exports.originUrl = originUrl;
if (NODE_ENV === 'production') {
    exports.originUrl = originUrl = 'http://m.shbaoyuantech.com/#';
}
// 微信授权地址
// 目前测试环境和正式环境地址一样
let wxConfigUrl = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/online';
exports.wxConfigUrl = wxConfigUrl;
if (NODE_ENV === 'development') {
    exports.wxConfigUrl = wxConfigUrl = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/online';
}
