import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  // return request({
  //   url: '/transaction/list',
  //   method: 'get',
  //   params: query
  // })

  return new Promise((r)=>{
    r({
      code: 20000,
      data: {
        total: 20,
        'items|20': [{
          order_no: '@guid()',
          // timestamp: +Mock.Random.date('T'),
          timestamp: Date.now(),
          username: '@name()',
          price: '@float(1000, 15000, 0, 2)',
          'status|1': ['success', 'pending']
        }]
      }
    })
  })
}
