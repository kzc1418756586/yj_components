/*
 * @Author: K
 * @Date: 2022-04-08 13:54:54
 * @LastEditors: owen
 * @LastEditTime: 2022-05-07 18:20:07
 * @FilePath: \app-pcweb\src\utils\request.js
 */
import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
import i18n from "@/locale/index";
import sha256 from "sha256";
const buildConf = require("./../../build.config");
const gitEnv = process.env.VUE_APP_ENVIRONMENT_MODE || "develop";
// console.log(process.env, WEBTYPE, gitEnv, "-------------");
const baseConfing = buildConf[gitEnv];
// console.log(gitEnv, WEBTYPE, buildConf, "=======baseConfing=======");
const apiWhiteList = ["/gathering/v1/event"]; // 配置接口地址白名单  ，数据打点 不要提示信息接口
const SignFun = () => {
  const dateString = new Date();

  const time = new Date(dateString.toUTCString());
  const strTime = time.getTime();
  const seconds = parseInt(strTime / 1000, 10);
  const url = baseConfing.web;

  const sign = strTime + "_" + url + "_" + seconds;
  const signSha256 = sha256(sign);
  return sign + "_" + signSha256;
};

const service = axios.create({
  baseURL: baseConfing.baseApi, // url = base url + request url
  timeout: 30000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    config.headers["Sign"] = SignFun();
    config.headers["content-type"] = "application/json";
    config.headers["app"] = "web";
    if (getToken()) {
      config.headers["authorization"] = "Bearer " + getToken();
    }

    return config;
  },
  (error) => {
    console.log(error, "------use-----"); // for debug
    return Promise.error(error);
  }
);

// 请求拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 40003) {
      // ip限制
      window.location.href = "/#/403";
    }
    const whiteList = ["/basic/v1/resource/get"];
    if (whiteList.includes(response.config.url)) {
      store.commit("setPacketConfig", res);
      return res;
    }
    if (Number(res.code) === 0) {
      return res;
    } else {
      // console.log(Number(res.code) === 40016 || Number(res.code) === 40017, "----------Number--------");
      if (Number(res.code) === 40016 || Number(res.code) === 40017) {
        // Token 失效
        // console.log(Number(res.code) === 40016 || Number(res.code) === 40017, "----------Number1--------");
        store.dispatch("signOut");
      }

      const errorWhiteList = ["/web/v1/user/recycle", "/web/v1/application/lunch/game"];
      if (errorWhiteList.includes(response.config.url)) {
        return res;
      }
      if (Number(res.code) === 100201) {
        // 领取新人任务时，没填信息的code，不做提示
        return res;
      }
      if (Number(res.code) === 10010) {
        // console.log(res.code, Vue.prototype.$isPopShow, "-------10010--------");
        Vue.prototype.$isPopShow({
          show: true,
          views: "IllegalLogin",
          data: { close: true, text: res.msg },
        });
        return res;
      }
      console.log(response.config.url);
      if (apiWhiteList.includes(response.config.url)) {
        return res;
      }
      const tsr = `msgcode.${res.code}`;
      var msg = i18n.tc(tsr);
      const msgcode = msg.split(".");
      if (msgcode[0].includes("msgcode")) {
        msg = res.msg;
      }
      Message({
        message: msg || "Error",
        type: "error",
        showClose: true,
      });
      return res;
      //   DonMessage.error(`${res.code}` || "Error");
      //   return Promise.reject(new Error(res.code || "Error"));
    }
  },
  function (error) {
    const code = error.message.replace(/[^0-9]/gi, "");
    const { response, message } = error;
    console.log(error);
    console.log(error, response, message, code, "------12345-----");

    if (code === 401) {
      // 维护中
      store.dispatch("signOut");
      const timer = setTimeout(() => {
        clearTimeout(timer);
      }, 2000);
      return message;
    } else {
      console.log(window.navigator.onLine, "-------window.navigator.onLine------");
      if (!window.navigator.onLine) {
        Message({
          message: message || "Error",
          type: "error",
          showClose: true,
        });
      } else {
        return message;
      }
    }
  }
);

const request = service;
export default request;
