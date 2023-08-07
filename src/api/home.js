/*
 * @Author: K
 * @Date: 2022-04-09 17:28:11
 * @LastEditors: owen
 * @LastEditTime: 2022-04-09 17:28:12
 * @FilePath: \app-pcweb\src\api\home.js
 */
/*
 * @Author: K
 * @Date: 2022-03-30 09:44:51
 * @LastEditors: owen
 * @LastEditTime: 2022-04-07 17:28:57
 * @FilePath: \app-h5web\src\api\home.js
 */
import request from "@/utils/request";
//  获取游戏列表
export function applicationGamelist(data) {
  return request({
    url: "/game/v1/gameRefTemplate/list",
    method: "POST",
    data,
  });
}

// 启动游戏
export function applicationLunchGame(data) {
  return request({
    url: "/game/v1/application/launch/game",
    method: "POST",
    data,
  });
}

/**
 * 回收 余额
 * @param {*} data
 * @returns
 */
export function recycle(data) {
  return request({
    url: "/game/v1/user/recycle",
    method: "POST",
    data,
  });
}
/**
 * 获取资源信息
 * @param {*} params
 * @returns
 */
export function webResource(data) {
  return request({
    url: "/basic/v1/resource/get",
    method: "POST",
    data,
  });
}

/**
 * 获取资源信息
 * @param {*} params
 * @returns
 */
export function getPolicy(data) {
  return request({
    url: "/basic/v1/web/document/info",
    method: "POST",
    data,
  });
}

/**
 * 获取用户所有资产（包括第三方资产） 钱包余额
 */
export function getChips(data) {
  return request({
    url: "/assets/v1/account/getall",
    method: "POST",
    data,
  });
}
/**
 * 点击品牌回收余额
 */
export function recycleBrand(data) {
  return request({
    url: "/game/v1/user/brand/recycle",
    method: "POST",
    data,
  });
}
