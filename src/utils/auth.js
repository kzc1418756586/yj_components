/*
 * @Author: owen
 * @Date: 2022-04-07 14:48:56
 * @LastEditors: owen
 * @LastEditTime: 2022-04-22 22:53:56
 * @FilePath: \app-pcweb\src\utils\auth.js
 */

const TokenKey = "Admin-Token";
const HeadPortrait = "HeadPortrait";
export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

/**
 * 获取 session Storage 值
 * @param {sting} key
 * @returns
 */
export const getSesStorage = (key) => {
  const str = sessionStorage.getItem(key);
  const obj = (str && JSON.parse(str)) || null;
  return obj;
};

export function getHeadPortrait() {
  return sessionStorage.getItem(HeadPortrait);
}

export function setHeadPortrait(HeadPortrait) {
  return sessionStorage.setItem(HeadPortrait, HeadPortrait);
}

export function removeHeadPortrait() {
  return sessionStorage.removeItem(HeadPortrait);
}

// 用户信息首充状态

// export const SETactivityfirst = (key, data) => sessionStorage.setItem(key, JSON.stringify(data));

// /**
//  * 删除 session Storage
//  * @param {sting} key
//  * @returns
//  */
// export const removeactivityfirst = (key) => sessionStorage.removeItem(key);

// /**
//  * 获取 local Storage 值
//  * @param {sting} key
//  * @returns
//  */
// export const GETactivityfirst = (key) => JSON.parse(localStorage.getItem(key));
// ======================
/**
 * 设置 session Storage 值
 * @param {sting} key
 * @param {object} data
 * @returns
 */
export const setSesStorage = (key, data) => sessionStorage.setItem(key, JSON.stringify(data));

/**
 * 删除 session Storage
 * @param {sting} key
 * @returns
 */
export const removeSesStorage = (key) => sessionStorage.removeItem(key);

/**
 * 获取 local Storage 值
 * @param {sting} key
 * @returns
 */
export const getLocalStorage = (key) => {
  // console.log(localStorage.getItem(key), "---------");
  return (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))) || null;
};

/**
 * 设置 local Storage 值
 * @param {sting} key
 * @param {object} data
 * @returns
 */
export const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

/**
 * 删除 local Storage
 * @param {sting} key
 * @returns
 */
export const removeLocalStorage = (key) => localStorage.removeItem(key);
