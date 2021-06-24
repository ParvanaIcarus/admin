import Vue from 'vue'
import { request } from './request'

// 登錄 login username password
export const reqLogin = (data) =>
  request({
    url: 'login',
    method: 'post',
    data,
  })

// 獲取左側菜單欄 menus
export const reqMenus = () =>
  request({
    url: 'menus',
  })

// 查詢用戶數據列表 users
export const reqUserList = (params) =>
  request({
    url: 'users',
    params,
  })

// 修改用戶數據 users/:uId/state/:type
export const reqUserState = (uId, type) =>
  request({
    url: `users/${uId}/state/${type}`,
    method: 'put',
  })

// 添加用戶 users post  username password email mobile
export const reqUserAdd = (data) =>
  request({
    url: 'users',
    method: 'post',
    data,
  })
// 編輯用戶 users/:id put
export const reqUpdataUsers = (id, { email, mobile }) =>
  request({
    url: 'users/' + id,
    method: 'put',
    data: {
      email,
      mobile,
    },
  })

// 刪除用戶 users/:id delete
export const reqDelUser = (id) =>
  request({
    url: 'users/' + id,
    method: 'delete',
  })

// 分配用戶角色 users/:id/role put
export const reqChangeUsersRole = (id, rid) =>
  request({
    url: `users/${id}/role`,
    method: 'put',
    data: { rid },
  })

// 所有權限列表 rights/:type get
export const reqRights = (type) =>
  request({
    url: 'rights/' + type,
  })

// 角色列表 roles
export const reqRolesList = () =>
  request({
    url: 'roles',
  })
