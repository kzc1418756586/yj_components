/*
 * @Author: owen
 * @Date: 2022-04-07 11:00:46
 * @LastEditors: owen
 * @LastEditTime: 2022-05-06 12:01:26
 * @FilePath: \app-pcweb\src\locale\index.js
 */

import Vue from "vue";
import VueI18n from "vue-i18n";
import elen from "element-ui/lib/locale/lang/en";
import elpt from "element-ui/lib/locale/lang/pt";
import { setLocalStorage, getLocalStorage } from "@/utils/auth";
import store from "@/store";
import en from "./en_US";
import zh from "./zh_CN";
import pu from "./pt_PT";

Vue.use(VueI18n);

const messages = {
  en: {
    ...en,
    ...elen,
  },
  zh: {
    ...zh,
    ...elen,
  },
  pu: {
    ...pu,
    ...elpt,
  },
};

/**
 * Available locales
 */
export const locales = [
  {
    title: "English",
    locale: "en",
    abbr: "ENG",
  },
  // {
  //   title: "中文",
  //   locale: "zh",
  //   abbr: "CHN",
  // },
  {
    title: "Portugues do Brasil",
    locale: "pu",
    abbr: "PU",
  },
];
// 获取浏览器语言
const getNavigatorLang = () => {
  let language = getLocalStorage("lang")?.lang;
  if (!language) {
    const jsSrc = (navigator.language || navigator.browserLanguage).toLowerCase();
    const langObj = {
      "en-us": "en",
      "zh-cn": "zh",
      "pt-br": "pu",
    };
    language = langObj[jsSrc] || "en";
    // console.log(language, "----------");
    setLocalStorage("lang", { lang: language });
    // store.commit("setLang", language);
  }
  return language;
};

/**
 * VueI18n instance
 */
const i18n = new VueI18n({
  // set locale options: en | zh | pu
  locale: getNavigatorLang(),
  // set locale messages
  messages,
});

/**
 * Set locale to new value at Vue and Vuex.
 *
 * @param {Boolean} newLocale themeDark new value
 */
export async function setLocale(locale) {
  if (i18n.locale !== locale) {
    // console.log(`[Locale] Set to "${locale}"`);
    i18n.locale = locale || getNavigatorLang();
    store.commit("setLang", i18n.locale);
  }
}

export default i18n;
