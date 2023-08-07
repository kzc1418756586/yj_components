/**
 * @author
 * @description 公共布局及样式自动引入
 */

import Vue from "vue";

const requireComponents = require.context("./components", true, /\.vue$/);
requireComponents.keys().forEach((fileName) => {
  const componentConfig = requireComponents(fileName);
  const componentName = componentConfig.default.name;
  Vue.component(componentName, componentConfig.default || componentConfig);
});

const requireThemes = require.context("@/style/themes", true, /\.scss$/);
requireThemes.keys().forEach((fileName) => {
  require(`@/style/themes/${fileName.slice(2)}`);
});
