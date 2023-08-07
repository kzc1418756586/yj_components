/**
 * @author
 * @description 公共布局及样式自动引入
 */

import PageTable from "./pageTable/index.vue";
import SearchForm from "./searchForm/index.vue";
import DateForm from "./searchForm/date-from.vue";
const components = [PageTable, SearchForm, DateForm];

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { version: "1.0.0", install, PageTable, SearchForm, DateForm };
