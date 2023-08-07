/*
 * @Author: owen
 * @Date: 2022-03-15 17:58:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-12 20:01:47
 * @Description: file content
 * @FilePath: \app-pcweb\src\locale\zh_CN\index.js
 */
import route from "./route";
import msgcode from "./DataAppLangMsg.js";
export default {
  route,
  ...msgcode,
  comment: {
    close: "关闭",
    confirm: "确认",
    cancel: "取消",
    edit: "修改",
    submit: "提交",
    setting: "设置",
    charge: "充值",
    cxchange: "兑换",
    delete: "删除",
    language: "语言",
    maintai: "维护中...",
    systemMaintenance: "系统维护",
    MaintenanceTime: "维护时间",
  },
  home: {
    illegalLogin: "您的账号异地登录，已断开连接。",
    illegalLogin1: "您的账号已被停用，请联系客服！",
    illegalLogin2: "您的注册/登录已被限制，请联系客服！",
  },
  login: {},
  searchForm: {
    inputTip: "请输入",
    selectTip: "请输入选择",
    max: "最大值",
    min: "最小值",
    startTime: "开始时间",
    endTime: "结束时间",
    day: "天",
    week: "周",
    month: "月",
  },
  btns: {
    add: "新增",
    update: "编辑",
    permissions: "权限设置",
    subAccount: "子账号",
    white: "白名单",
    mtoken: "M令牌",
    changePassword: "修改密码",
    unlockAccount: "解锁账号",
    changeStatus: "停用/启用",
    del: "删除",
  },
};
