/*
 * @Author: owen
 * @Date: 2022-03-15 17:58:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-12 21:05:42
 * @Description: file content
 * @FilePath: \app-pcweb\src\locale\pt_PT\index.js
 */
import route from "./route";
import msgcode from "./DataAppLangMsg.js";

export default {
  ...msgcode,
  route,
  comment: {
    close: "desativar",
    confirm: "confirmar",
    cancel: "cancelar",
    edit: "Modificar",
    submit: "Enviar",
    setting: "Configurações",
    charge: "Recarregar",
    cxchange: "Trocar",
    delete: "Apagar",
    language: "Língua",
    maintai: "Em manutenção",
    systemMaintenance: "Manutenção do sistema",
    MaintenanceTime: "Duração de manutenção",
  },
  home: {
    illegalLogin: "Sua conta está logada fora do local e foi desconectada.",
    illegalLogin1: "A sua conta foi desativada, favor entre em contato com a suporte.",
    illegalLogin2: "O seu registro/Login foi restrito,favor entre em contato com a suporte.",
  },
  login: {},
  searchForm: {
    inputTip: "Please enter",
    selectTip: "Select",
    max: "Peak value",
    min: "Least value",
    startTime: "Start time",
    endTime: "End time",
    day: "day",
    week: "week",
    month: "month",
  },
  btns: {
    add: "add",
    update: "update",
    permissions: "permissions",
    subAccount: "subAccount",
    white: "white",
    mtoken: "mtoken",
    changePassword: "changePassword",
    unlockAccount: "unlockAccount",
    changeStatus: "changeStatus",
    del: "remove",
  },
};
