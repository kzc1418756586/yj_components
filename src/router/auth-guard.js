/*
 * @Author: K
 * @Date: 2022-04-09 16:13:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 17:12:46
 * @FilePath: \app-pcweb\src\router\auth-guard.js
 */
import store from "@/store/index";

export default (to, from, next) => {
  // const res = store.getters.getPacketConfig;
  // if (res?.code === 40003) {
  //   if (to.path !== "/403") {
  //     next("/403");
  //   }
  // }
  if (store.getters.taken) {
    next();
  } else {
    next("/home");
  }
};
