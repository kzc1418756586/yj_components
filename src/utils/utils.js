/* eslint-disable no-undef */
/*
 * @Author: owen
 * @Date: 2022-03-29 12:09:08
 * @LastEditors: owen
 * @LastEditTime: 2022-04-12 21:01:43
 * @FilePath: \app-pcweb\src\utils\utils.js
 */

export const utils = {
  Transformation: 100, // 金币转化比列
  fomatFloat(src, pos = 2) {
    // 处理小数位数向上向下取整
    // src是要保留小数的值，pos是要保留几位小数；
    if (src) {
      return Math.floor(src * Math.pow(10, pos)) / Math.pow(10, pos);
    } else {
      return 0;
    }
  },
  // var nums=fomatFloat(num,3)
  // 排序 从大到小
  compare(p) {
    // 这是比较函数排序
    return function (m, n) {
      const a = m[p];
      const b = n[p];
      return b - a; // 升序
    };
  },
  numFormat(num) {
    num = num.toString().split("."); // 分隔小数点
    const arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
    let res = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i % 3 === 0 && i !== 0) {
        res.push(","); // 添加分隔符
      }
      res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if (num[1]) {
      // 如果有小数的话添加小数部分
      res = res.join("").concat("." + num[1]);
    } else {
      res = res.join("");
    }
    return res;
  },
  // 除某个值（默认100）保留整数
  fomatDivide(num, dividend = 100) {
    if (num) return parseInt(num / dividend);
    else return 0;
  },
};
export function renderTemplate(template, data) {
  console.log(template, data);
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) {
    // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return renderTemplate(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

// let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
// let person = {    name: '布兰',    age: 12}
// render(template, person);
/**
 *
 * @param {Object} obj
 * @param {String} type
 * @returns  key=value&key1=value1pe
 */
export const postParamStr = (obj = {}, type = "&") => {
  if (Object.keys(obj).length === 0 || obj.constructor !== Object) return "";
  const w = Object.entries(obj);
  w.forEach((v, i) => {
    w[i] = v.join("=");
  });
  return w.join(type);
};

/**
 *  深度拷贝
 * @param {*} obj
 * @param {*} hash
 * @returns
 */
export function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return obj;
  }
  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];
  // eslint-disable-next-line valid-typeof
  const isObj = typeof obj === "Object";
  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((e, i) => {
      res[i] = deepClone(e);
    });
  } else if (isObj && obj !== null) {
    res = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = deepClone(obj[key]);
      }
    }
  } else {
    res = obj;
  }
  hash.set(obj, res);
  return res;
}

/**
 * 时间格式化
 * @param {number} time
 * @param {string} type
 * @returns {string}
 */
export function formatTime(time, type = "-", fmt = false) {
  let date = null;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^\d+$/.test(time)) {
        if (("" + time).length === 10) {
          time = parseInt(time) * 1000;
        }
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const times = new Date(date);
  const y = times.getFullYear();
  const m = times.getMonth() + 1 < 10 ? "0" + (times.getMonth() + 1) : times.getMonth() + 1;
  const d = times.getDate() < 10 ? "0" + times.getDate() : times.getDate();
  const h = times.getHours() < 10 ? "0" + times.getHours() : times.getHours();
  const s = times.getMinutes() < 10 ? "0" + times.getMinutes() : times.getMinutes();
  const ss = times.getSeconds() < 10 ? "0" + times.getSeconds() : times.getSeconds();
  // return y + type + m + type + d + " " + h + " : " + s + " : " + ss;
  if (fmt) {
    return y + type + m + type + d + "  " + h + ":" + s + ":" + ss;
  } else {
    return y + type + m + type + d + "  " + h + ":" + s;
  }
}
/**
 * 时间格式化
 * @param {number} time
 * @param {string} type
 * @returns {string}
 */
export function formatDate(time, type = "-") {
  let date = null;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^\d+$/.test(time)) {
        if (("" + time).length === 10) {
          time = parseInt(time) * 1000;
        }
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const times = new Date(date);
  const y = times.getFullYear();
  const m = times.getMonth() + 1 < 10 ? "0" + (times.getMonth() + 1) : times.getMonth() + 1;
  const d = times.getDate() < 10 ? "0" + times.getDate() : times.getDate();

  return y + type + m + type + d;
}
export function utcToDateFormat(time, type = "-") {
  let date = null;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^\d+$/.test(time)) {
        if (("" + time).length === 10) {
          time = parseInt(time) * 1000;
        }
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  // const utc = 0 - new Date().getTimezoneOffset() / 60;
  // const timeStr = new Date(date).getTime() + utc * 60 * 60 * 1000;
  const times = new Date(date);
  // const y = times.getFullYear();
  const m = times.getMonth() + 1 < 10 ? "0" + (times.getMonth() + 1) : times.getMonth() + 1;
  const d = times.getDate() < 10 ? "0" + times.getDate() : times.getDate();
  const h = times.getHours() < 10 ? "0" + times.getHours() : times.getHours();
  const s = times.getMinutes() < 10 ? "0" + times.getMinutes() : times.getMinutes();
  const ss = times.getSeconds() < 10 ? "0" + times.getSeconds() : times.getSeconds();

  // return y + type + m + type + d + " " + h + " : " + s + " : " + ss;
  return m + type + d + "  " + h + ":" + s + ":" + ss;
}

/**
 * 金币显示
 */
export function GolLimitMFormat(num, d = 2) {
  const numb = num || 0;
  const numstr = Number(numb) / 100;
  if (numstr >= 100000000) {
    return parseFloat(numstr / 1000000).toFixed(d) + "M";
  } else if (numstr >= 1000000) {
    return parseFloat(numstr / 1000).toFixed(d) + "K";
  } else {
    return parseFloat(numstr).toFixed(d);
  }
}

/**
 * 金币显示
 */
export function numbrFormat(num, d = 2) {
  const numstr = Number(num) || 0;
  return parseFloat(numstr).toFixed(d);
}

/**
 * 判断是否为手机打开
 * @returns false/true
 */
export function isMobile() {
  // match方法可在字符串内检索指定的值，
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}
