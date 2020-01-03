import request from '@/utils/request'
import md5 from 'blueimp-md5'

export function login({ userName, passwd }) {
  passwd = md5(passwd)
  console.log(userName, passwd)
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userName,
      passwd
    }
  })
}

export function reset({ passwd }) {
  passwd = md5(passwd)
  return request({
    url: '/user/resetPasswd',
    method: 'put',
    data: {
      passwd
    }
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'post',
  // })

  return new Promise((r) => {
    r({
      data: {
        userRole: ['admin'],
        isDefault: false,
        nickName: 'fake name',
        roles: ['admin'],
        name: 'fake name'
      }
    })
  })
}

export function logout() {
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
  return new Promise((r)=>{
    r()
  })
}
