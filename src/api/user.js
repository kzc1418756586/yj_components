/*
 * @Author: owen
 * @Date: 2022-03-29 10:56:40
 * @LastEditors: owen
 * @LastEditTime: 2022-04-24 11:47:18
 * @FilePath: \app-pcweb\src\api\user.js
 */
import request from "@/utils/request";
import { getLocalStorage } from "@/utils/auth.js";
import { encode } from "js-base64";
const buildConf = require("./../../build.config");
const gitEnv = process.env.VUE_APP_ENVIRONMENT_MODE || "develop";
const baseConfing = buildConf[gitEnv];
// import md5 from "md5";
// import sha256 from "sha256";
// import { postParamStr } from "@/utils/utils";

// 账号密码登录
export function login(data, type = "phone") {
  const str = JSON.stringify({
    ...data,
    domain: baseConfing.web,
    nonce: baseConfing.nonce,
  });
  // console.log(buildConf[gitEnv].web, buildConf[gitEnv].nonce, "---------------");

  const strs = encode(str);
  const dataObj = {
    param: strs,
    type: type,
    app: "web",
    invite_code: "",
  };

  return request({
    url: "/web/v1/user/login/" + type,
    method: "post",
    data: dataObj,
  });
}

export const loginPost = (data, type = "account") => {
  const str = /[a-zA-Z]+/.test(data.phone);
  if (str) {
    return request({
      url: "/usercenter/v1/web/login/account",
      method: "post",
      data: {
        app: "web",
        user_name: data.phone,
        password: data.password,
      },
    });
  } else {
    return request({
      url: "/usercenter/v1/web/login/phone",
      method: "post",
      data: {
        app: "web",
        phone: "55" + data.phone,
        password: data.password,
      },
    });
  }
};

// 一键快捷登录
export const visitorPost = (data) => {
  return request({
    url: "/usercenter/v1/web/register/visitor",
    method: "post",
    data: {
      ...data,
      app: "web",
    },
  });
};

// facebook注册/登录
export const facebookLogin = (data) => {
  return request({
    url: "/usercenter/v1/web/register/facebook",
    method: "post",
    data: {
      ...data,
      app: "web",
    },
  });
};
// 发邮件
export const sendEmailPost = (data) => {
  return request({
    url: "/basic/v1/email/send/userNamePwd",
    method: "post",
    data: {
      ...data,
      app: "web",
    },
  });
};

// 获取验证码
export function getCaptcha(data) {
  return request({
    url: "/basic/v1/web/sms/send/captcha",
    method: "post",
    data,
  });
}

export function registerPost(data, type = "phone") {
  const str = JSON.stringify({
    ...data,
    domain: baseConfing.web,
    nonce: baseConfing.nonce,
  });
  const strs = encode(str);
  const dataObj = {
    param: strs,
    type: type,
    app: "web",
    invite_code: getLocalStorage("INVITE_CODE") || "",
  };
  return request({
    url: "/web/v1/user/register/" + type,
    method: "post",
    data: dataObj,
  });
}

/**
 * 手机号注册
 * @param {*} data
 * @returns
 */
export const registerPhonePost = (data) => {
  return request({
    url: "/usercenter/v1/web/register/phone",
    method: "post",
    data: {
      ...data,
      app: "web",
      invite_code: data.invite_code || getLocalStorage("INVITE_CODE") || "",
    },
  });
};
/**
 * 账号号注册
 * @param {*} data
 * @returns
 */
export const registerAccountPost = (data) => {
  return request({
    url: "/usercenter/v1/web/register/account",
    method: "post",
    data: {
      ...data,
      app: "web",
      invite_code: data.invite_code || getLocalStorage("INVITE_CODE") || "",
    },
  });
};

// 修改密码
export function ChangePassword(data) {
  const str = JSON.stringify({
    ...data,
    domain: baseConfing.web,
    nonce: baseConfing.nonce,
  });
  const strs = encode(str);
  const dataObj = {
    param: strs,
  };
  return request({
    url: "/web/v1/user/password",
    method: "post",
    data: dataObj,
  });
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: "/usercenter/v1/web/user/updatePassword",
    method: "post",
    data,
  });
}
// 获取个人信息
export function getUserInfoPost(data) {
  return request({
    url: "/usercenter/v1/user/info",
    method: "post",
    data,
  });
}

// M令牌登录（带账号密码）
export function loginMToken(form) {
  const data = { ...form };
  return request({
    url: "/web/login/two",
    method: "post",
    data,
  });
}

// 登出
export function logout() {
  return request({
    url: "/usercenter/v1/user/logout",
    method: "post",
  });
}

// 提交反馈
export function feedbackPost(data) {
  return request({
    url: "usercenter/v1/user/feedback",
    method: "post",
    data,
  });
}

/**
 * 修改信息
 * @param {*} data  { nick_name: 昵称，avatar：头像}
 * @returns { code:0,data:{}}
 */
export const updateinfoPost = (data) =>
  request({
    url: "/usercenter/v1/user/update",
    method: "post",
    data,
  });

/**
 * 绑定手机号
 * @param {*} data ={phone： 手机号码，aptcha：验证码，password：密码 }
 * @returns { code:0,data:{}}
 */
export const bindPhonePost = (data) =>
  request({
    url: "/usercenter/v1/user/bindPhone",
    method: "post",
    data,
  });

/**
 * 绑定邀请码
 * @param {*} data ={invite_code: 邀请码 }
 * @returns { code:0,data:{}}
 */
export const bindinvitationPost = (data) =>
  request({
    url: "/usercenter/v1/web/user/bindInviteCode",
    method: "post",
    data,
  });
// 获取会员等级流水;
export const vipConfigs = (data) =>
  request({
    url: "/usercenter/v1/user/vip/flow",
    method: "post",
    data,
  });

// 获取会员层级关联提款信息
export const vipConfigswithdrawConfigs = (data) =>
  request({
    url: "/basic/v1/user/member-level-withdraw-configs",
    method: "post",
    data,
  });

// 用户绑定facebook账号
export const bindfacebook = (data) =>
  request({
    url: "/usercenter/v1/user/bindFacebook",
    method: "post",
    data,
  });

// 上报 adjustId
export const adidUpdate = (data) =>
  request({
    url: "/v1/application/update/eventid",
    method: "post",
    data: { ...data, app: "web" },
  });

// 事件上报
export const gatheringPost = (data) =>
  request({
    url: "/gathering/v1/event",
    method: "post",
    data: { ...data },
  });

// 获取 ip 地址
export const getIp = (data) =>
  request({
    url: "/gathering/v1/ip",
    method: "post",
    data: { ...data },
  });
