import "babel-polyfill";
import Vue from "vue";
import "normalize.css/normalize.css";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/display.css";
import "@/style/element-variables.scss";
import "./plugins";
import "@/layouts/export";
import yjComponents from "@/components/index";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale"; // Internationalizati
import { utils } from "./utils/utils";
import { title } from "@/config";

Vue.use(yjComponents);
Vue.use(Element, {
  size: "mini",
  zIndex: 2000,
});

Vue.prototype.$utils = utils;
Vue.prototype.$baseEventBus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.$baseTitle = (() => {
  return title;
})();

new Vue({
  i18n,
  // theme,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
