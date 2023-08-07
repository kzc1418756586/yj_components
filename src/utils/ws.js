/*
 * @Author: K
 * @Date: 2022-04-06 14:23:03
 * @LastEditors: owen
 * @LastEditTime: 2022-04-22 22:57:42
 * @FilePath: \app-pcweb\src\utils\ws.js
 */
// import { getToken } from "@/utils/auth";
import store from "@/store";
import { formatTime } from "@/utils/utils";
import { webResource } from "@/api/home";
import { getLocalStorage, setLocalStorage } from "@/utils/auth";

export default {
  data() {
    return {
      websock: null, // 建立的连接
      lockReconnect: false, // 是否真正建立连接
      timeout: 5 * 1000, // 5秒一次心跳
      timeoutObj: null, // 心跳心跳倒计时
      serverTimeoutObj: null, // 心跳倒计时
      timeoutnum: null, // 断开 重连倒计时
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.taken;
    },
    siLogin() {
      return this.$store.getters.login;
    },
    lang() {
      return this.$store.getters.getLang;
    },
    appConfig() {
      return this.$store.getters.getPacketConfig?.app_config || {};
    },
  },
  // created() {},
  watch: {
    siLogin: {
      handler(val, oval) {
        if (!val) {
          // console.log("-------watch------ websocketclose-------");
          this.websocketclose();
        } else {
          if (this.getToken) {
            // 登录后开启长连接
            // console.log(1111111, "--------initWebSocket----------------");
            if (val !== oval) {
              this.initWebSocket();
            }
          }
        }
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true,
    },
  },
  destroyed() {
    // 页面销毁时关闭长连接
    // console.log("-------destroyed------ websocketclose-------");
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      // 建立连接
      if (this.appConfig.game_addr) {
        const wsuri = this.appConfig.game_addr + "?token=" + this.getToken + "&lang=" + store.getters.getLang;
        // 建立连接
        this.websock = new WebSocket(wsuri);
        // 连接成功
        this.websock.onopen = this.websocketonopen;
        // 连接错误
        this.websock.onerror = this.websocketonerror;
        // 接收信息
        this.websock.onmessage = this.websocketonmessage;
        // 连接关闭
        this.websock.onclose = this.websocketclose;
      }
      // 初始化weosocket
    },
    reconnect() {
      // 重新连接
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      // 没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        // 新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      // 重置心跳
      var that = this;
      // 清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      // 重启心跳
      that.start();
    },
    start() {
      // 开启心跳
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);

      self.timeoutObj = setTimeout(function () {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息
        if (self.websock.readyState === 1) {
          // 如果连接正常
          const dataStr = JSON.stringify({ action: "ping", data: null });
          self.websock.send(dataStr);
        } else {
          // 否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          // 超时关闭
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    websocketonopen() {
      // 连接成功事件
      const dataStr = JSON.stringify({ action: "ping", data: null });
      this.websocketsend(dataStr);
      // 提示成功
      console.log("连接成功", 3);
      // 开启心跳
      this.start();
    },
    websocketonerror() {
      // 连接失败事件
      // 错误
      console.log("WebSocket连接发生错误");
      // 重连
      this.reconnect();
    },
    websocketclose() {
      try {
        this.websock && this.websock.close();
        clearTimeout(this.timeoutObj);
        // 提示关闭
        console.log("连接已关闭", "------1----");
      } catch (error) {
        console.log(error, "------------");
      }
      // 连接关闭事件

      // 重连
      // this.reconnect();
    },
    websocketonmessage(event) {
      // 接收服务器推送的信息
      // 打印收到服务器的内容
      const data = JSON.parse(event.data);
      console.log("收到服务器信息", event, data);
      if (data.action === "changeUserProfile") {
        // 更新用户信息
        this.$store.commit("wssSetUserInfo", data.data);
        this.$store.dispatch("activityfirstWithdrawalInfo");
      }
      if (data.action === "changeBalance") {
        // 账户信息变更
        this.$store.commit("wssSetUserInfo", data.data);
        this.$store.dispatch("activityfirstWithdrawalInfo");
      } else if (data.action === "rechargeSuccess") {
        this.$store.dispatch("getUserInfoFun");
        this.$store.dispatch("activityfirstWithdrawalInfo");
      }
      if (data.action === "news") {
        if (data?.data?.unread_email_num === 1) {
          // 公告
          this.$store.commit("setMaildot", true);
        }
        if (data?.data?.user_notice_num === 1) {
          console.log("你有新公告");
        }
      }
      if (data.action === "hideGameByBrandIdMq") {
        //  隐藏品牌id
        this.$store.commit("setHideBrandId", data.data.brand_id);
      }
      if (data.action === "hideGameByGameIdsMq") {
        // 隐藏 游戏id
        const lists = data.data.game_ids || [];
        if (lists.length) {
          const arry = getLocalStorage("RECORD_GAME") || [];
          let games = [];
          lists.forEach((element) => {
            arry.map(function (item, index) {
              if (item.game_id !== element) {
                games.push(item);
              }
            });
          });
          games = new Set([...arry]);
          setLocalStorage("RECORD_GAME", games);
        }
        this.$store.commit("setHideGameId", lists);
      }
      if (data.action === "hideGameByGameRefTemplateIdsMq") {
        // 隐藏游戏模板id
        this.$store.commit("setHideTmpGameIds", data.data.ids);
      }
      if (data.action === "userHasBeenRestricted_ws") {
        // 会员限制登录
        this.websocketclose();
        this.$store.dispatch("signOutPs");
        this.$isPopShow({
          show: true,
          views: "IllegalLogin",
          data: { text: this.$t("home.illegalLogin1") },
        });
      }
      if (data.action === "exitKick") {
        // 异地登录
        this.websocketclose();
        this.$store.dispatch("signOutPs");
        this.$isPopShow({
          show: true,
          views: "IllegalLogin",
          data: { text: null },
        });
        // try {
        //   this.getWebResource();
        // } catch (error) {
        //   console.log(error, "---------------");
        // }
      }
      if (data.action === "system_maintenance_type_one_ws") {
        // 维护信息
        if (data.data) {
          // 系统维护信息
          const { languages, begin_time_unix, end_time_unix, is_maintain_start } = data.data || {};
          if (is_maintain_start) {
            this.websocketclose();
            this.$store.dispatch("signOutPs");
          }
          const _html = `
            <div style="text-align:left;font-size:14px;">
            ${languages[this.lang]}</div>
            <p style="text-align:left; font-size:15px;"">
            ${this.$t("comment.systemMaintenance")} :
            ${formatTime(begin_time_unix, "/", true)} ~ ${formatTime(end_time_unix, "/", true)}</p>
          `;
          this.$isPopShow({
            show: true,
            views: "IllegalLogin",
            data: { title: this.$t("comment.systemMaintenance"), close: is_maintain_start, text: _html },
          });
        }
      }
      if (data.action === "system_maintenance_list_ws") {
        // 游戏维护
        webResource();
      }
      // 收到服务器信息，心跳重置
      this.reset();
    },
    websocketsend(msg) {
      // 向服务器发送信息
      this.websock.send(msg);
    },
  },
};
