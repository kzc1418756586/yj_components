/* eslint-disable no-extend-native */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  return fmt;
};
export function simpleFormatTime(time) {
  if (!time) return;
  const plain = time.split("");
  const zeroZone = plain.findIndex((v) => v === "Z");
  const indexZ = zeroZone !== -1 ? zeroZone : plain.length;
  plain[plain.findIndex((v) => v === "T")] = " ";

  let newTime = plain.slice(0, indexZ);
  const zone = newTime.findIndex((v) => v === "+");
  const indexZone = zone !== -1 ? zone : newTime.length;
  newTime = newTime.slice(0, indexZone);

  return newTime.join("");
}

// 格式化时间为 时:分:秒
export function formatFullTime(msTime, multy = 1) {
  const time = msTime / multy;
  let hour = Math.floor(time / 60 / 60);
  let minute = Math.floor(time / 60) % 60;
  let second = Math.floor(time) % 60;

  hour = hour.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  second = second.toString().padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}

// 时间字符串处理
export function formatTimeTo(times) {
  if (times) {
    const aryStr = times.split("-", 3);
    const text = aryStr[aryStr.length - 1].replace("T", " ");
    aryStr.pop();
    const txt = aryStr.join("-") + "-" + text;
    return txt;
  } else {
    return "";
  }
}
//  时区处理
export function getAnyZone(timeStamp, timeZone = -4) {
  const timeStampTmp = new Date(timeStamp + (new Date().getTimezoneOffset() + timeZone * 60) * 60 * 1000);
  return timeStampTmp;
}
export function getUTCTime() {
  const d1 = new Date();
  const d2 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours() - 4, d1.getUTCMinutes(), d1.getUTCSeconds());
  return d2;
}
