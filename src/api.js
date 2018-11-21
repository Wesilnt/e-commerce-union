import {stringify} from 'qs'
import request from './utils/request'
import {IS_ONLINE, originUrl } from './utils/config'
//获取Token
export async function getToken() {
    const originHref=window.location.href.split('#')[1]
    const result = await request.post('/auth/wechat/get-wechat-auth-link', {
        originUrl:originUrl + originHref
    })
    if (IS_ONLINE) window.location.href = result.wechatAuthUrl
    return result
}
//获取用户信息
export async function getUserByToken(params) {
    return request(`/user/getUserByToken${stringify(params)}`)
}
//发送验证码
export function sendMobileCode(params) {
    return request.post(`/user/sendMobileCode`, params)
}
//验证码校验
export function validateMobileCode(params) {
    return request.post(`/user/validateMobileCode`, params)
}
/** GET */
//获取分会长详情
export async function getPresidentDetail() {
    return request(`/distribution/presidentDetail`)//?${stringify(params)}
}
//申请成为分销员
export function applyDistributor(params) {
    return request.post(`/distribution/applyForDistribution`, params)
}
//我的邀请列表
export async function getMeInvitationList(params) {
    return request(`/distribution/myDisApplyList?${stringify(params)}`)
}
//我的推广订单列表
export async function getIncomeOrders(params) {
    return request(`/distribution/getPresidentIncomePage?${stringify(params)}`)
}

//我的分销员
export async function getMeDistributors(params) {
    return request(`/distribution/getDisPageListByPreUserId?${stringify(params)}`)
}

//打款记录
export async function getTransferRecords(params) {
    return request(`/distribution/getPresidentTransRecordPage?${stringify(params)}`)
}
