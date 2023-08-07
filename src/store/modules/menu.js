import { getSesStorage, setSesStorage } from "@/utils/auth";

import variables from "@/style/element-variables.scss"; // 主题色

const MENU_STATE = "MENU_STATE";

const types = {
  MENU_IS_SHOW: "MENU_IS_SHOW",
  HANDLE_LEFT_MENU: "HANDLE_LEFT_MENU", // 收缩左侧菜单
  INIT_LEFT_MENU: "INIT_LEFT_MENU", // 初始化左侧菜单
  SET_LEFT_COLLAPSE: "SET_LEFT_COLLAPSE", // 改变左边菜单的收缩宽度
  SET_FOOTER_SHOW: "SET_FOOTER_SHOW", // 显示隐藏底部layout
};
const intSidebar = {
  opened: true,
  width: 210,
  theme: variables.theme,
};
const menu = {
  state: {
    sidebarIsShow: true,
    minLeftMenuWidth: 72,
    maxLeftMenuWidth: 210,
    sidebar: {
      opened: true,
      width: null,
    },
    isCollapse: false, // 菜单默认展开
    isFooter: false,
  },
  getters: {
    sidebar: (state) => {
      //   return getSesStorage(MENU_STATE) || state.sidebar;
      return state.sidebar.width ? state.sidebar : getSesStorage(MENU_STATE) || intSidebar;
    },
    isCollapse: (state) => {
      return state.isCollapse || getSesStorage(types.SET_LEFT_COLLAPSE);
    },
    isFooter: (state) => {
      return state.isFooter || getSesStorage(types.SET_FOOTER_SHOW);
    },
    menuIsShow: (state) => {
      return state.sidebarIsShow || getSesStorage(types.MENU_IS_SHOW);
    },
  },
  mutations: {
    [types.MENU_IS_SHOW](state, payload) {
      state.sidebarIsShow = payload;
    },
    [types.HANDLE_LEFT_MENU](state) {
      const sSidebar = getSesStorage(MENU_STATE) || state.sidebar;
      if (sSidebar.opened) {
        // true
        state.sidebar.width = state.minLeftMenuWidth;
      } else {
        state.sidebar.width = state.maxLeftMenuWidth;
      }
      state.sidebar.opened = !sSidebar.opened;
      setSesStorage(MENU_STATE, state.sidebar);
    },
    [types.INIT_LEFT_MENU](state) {
      state.sidebar = {
        opened: true,
        width: 72,
      };
    },
    [types.SET_LEFT_COLLAPSE](state) {
      state.isCollapse = !state.isCollapse;
    },
    [types.SET_FOOTER_SHOW](state) {
      state.isFooter = true;
    },
  },
  actions: {
    handleLeftMenu: ({ commit }) => {
      commit(types.HANDLE_LEFT_MENU);
    },
    initLeftMenu: ({ commit }) => {
      commit(types.INIT_LEFT_MENU);
    },
    setLeftCollapse: ({ commit }) => {
      commit(types.SET_LEFT_COLLAPSE);
    },
    setMenuIsShow: ({ commit }, opt) => {
      commit(types.MENU_IS_SHOW, opt);
    },
  },
};

export default menu;
