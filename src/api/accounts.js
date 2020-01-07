import request from '@/utils/request'

export function getAccountInfo(data) {
  return request({
    url: '/account/wallet',
    method: 'post',
    data
  })
}

export function exportAccount(params) {
    return request({
      url: '/account/exportBalance',
      method: 'get',
      responseType: 'blob',
      params
    })
}