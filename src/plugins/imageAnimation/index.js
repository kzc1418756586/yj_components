var loadImage = require("../imageloader");
var Timeline = require("../timeline");

// 初始化状态
var STATE_INITIAL = 0;
// 开始状态
var STATE_START = 1;
// 停止状态
var STATE_STOP = 2;
// 同步任务
var TASK_SYNC = 0;
// 异步任务
var TASK_ASYNC = 1;

/**
 * 简单的函数封装，执行callback
 * @param   callback 执行函数
 */
function next(callback) {
  callback && callback();
}
/* 帧动画库类
 * @constructor
 */
function FrameAnimation() {
  this.taskQueue = [];
  this.index = 0;
  this.timeline = new Timeline();
  this.state = STATE_INITIAL;
}

/* 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
FrameAnimation.prototype.loadImage = function (imglist) {
  var taskFn = function (next) {
    loadImage(imglist.slice(), next);
  };
  var type = TASK_SYNC;
  return this._add(taskFn, type);
};

/* 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele dom对象
 * @param positions 背景位置数组
 * @param imageUrl 图片URL地址
 */
FrameAnimation.prototype.changePosition = function (ele, positions, imageUrl) {
  var len = positions.length;
  var taskFn;
  var type;
  if (len) {
    var me = this;
    taskFn = function (next, time) {
      if (imageUrl) {
        // ele.style.backgroundImage = "url(" + imageUrl + ")";
        // console.log(imageUrl, "-----------ssss------------");
      }
      // 获得当前背景图片位置索引
      var index = Math.min((time / me.interval) | 0, len);
      var position = positions[index - 1].split(" ");
      // 改变dom对象的背景图片位置
      ele.style.backgroundPosition = position[0] + "px " + position[1] + "px";
      if (index === len) {
        next();
      }
    };
    type = TASK_ASYNC;
  } else {
    taskFn = next;
    type = TASK_SYNC;
  }
  return this._add(taskFn, type);
};

/* 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele dom对象
 * @param imglist 图片数组
 */
FrameAnimation.prototype.changeSrc = function (ele, imglist) {
  var len = imglist.length;
  var taskFn;
  var type;
  if (len) {
    var me = this;
    taskFn = function (next, time) {
      // 获得当前背景图片位置索引
      var index = Math.min((time / me.interval) | 0, len);
      // 改变image对象的背景图片位置
      ele.src = imglist[index - 1];
      if (index === len) {
        next();
      }
    };
    type = TASK_ASYNC;
  } else {
    taskFn = next;
    type = TASK_SYNC;
  }
  return this._add(taskFn, type);
};

/* 添加一个异步定时任务，自定义动画每帧执行的任务函数
 * @param tastFn 自定义每帧执行的任务函数
 */
FrameAnimation.prototype.enterFrame = function (taskFn) {
  return this._add(taskFn, TASK_ASYNC);
};

/* 添加一个同步任务，在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
FrameAnimation.prototype.then = function (callback) {
  var taskFn = function (next) {
    callback(this);
    next();
  };
  var type = TASK_SYNC;
  return this._add(taskFn, type);
};

/* 开始执行任务，异步定义任务执行的间隔
 * @param interval
 */
FrameAnimation.prototype.start = function (interval) {
  if (this.state === STATE_START) {
    return this;
  }
  // 如果任务链中没有任务，则返回
  if (!this.taskQueue.length) {
    return this;
  }
  this.state = STATE_START;
  this.interval = interval;
  this._runTask();
  return this;
};

/* 添加一个同步任务，回退到上一个任务，实现重复上一个任务的效果，可以定义重复的次数
 * @param times 重复次数
 */
FrameAnimation.prototype.repeat = function (times) {
  var me = this;
  var taskFn = function () {
    if (typeof times === "undefined") {
      // 无限回退到上一个任务
      me.index--;
      me._runTask();
      return;
    }
    if (times) {
      times--;
      // 回退
      me.index--;
      me._runTask();
    } else {
      // 达到重复次数，跳转到下一个任务
      var task = me.taskQueue[me.index];
      me._next(task);
    }
  };
  var type = TASK_SYNC;
  return this._add(taskFn, type);
};

/* 添加一个同步任务，相当于repeat()，无限循环上一次任务
 *
 */
FrameAnimation.prototype.repeatForever = function () {
  return this.repeat();
};

/* 设置当前任务执行结束后到下一个任务开始前的等待时间
 * @param time 等待时长
 */
FrameAnimation.prototype.wait = function (time) {
  if (this.taskQueue && this.taskQueue.length > 0) {
    this.taskQueue[this.taskQueue.length - 1].wait = time;
  }
  return this;
};

/* 暂停当前异步定时任务
 *
 */
FrameAnimation.prototype.pause = function () {
  if (this.state === STATE_START) {
    this.state = STATE_STOP;
    this.timeline.stop();
    return this;
  }
  return this;
};

/* 重新执行上一次暂停的异步定时任务
 *
 */
FrameAnimation.prototype.restart = function () {
  if (this.state === STATE_STOP) {
    this.state = STATE_START;
    this.timeline.restart();
    return this;
  }
  return this;
};

/* 释放资源
 *
 */
FrameAnimation.prototype.dispose = function () {
  if (this.state !== STATE_INITIAL) {
    this.state = STATE_INITIAL;
    this.taskQueue = null;
    this.timeline.stop();
    this.timeline = null;
    return this;
  }
  return this;
};

/**
 * 添加一个任务到任务队列
 * @param taskFn 任务方法
 * @param type   任务类型
 * @private
 */
FrameAnimation.prototype._add = function (taskFn, type) {
  console.log(taskFn, "-----------");
  this.taskQueue.push({
    taskFn: taskFn,
    type: type,
  });
  return this;
};

/**
 * 执行任务
 * @private
 */
FrameAnimation.prototype._runTask = function () {
  if (!this.taskQueue || this.state !== STATE_START) {
    return;
  }
  // 任务执行完毕
  if (this.index === this.taskQueue.length) {
    this.dispose();
    return;
  }
  // 获得任务链上的当前任务
  var task = this.taskQueue[this.index];
  if (task.type === TASK_SYNC) {
    this._syncTask(task);
  } else {
    this._asyncTask(task);
  }
};

/**
 * 同步任务
 * @param  task 执行的任务对象
 * @private
 */
FrameAnimation.prototype._syncTask = function (task) {
  var me = this;
  var next = function () {
    // 切换到下一个任务
    me._next(task);
  };
  var taskFn = task.taskFn;
  taskFn(next);
};

/**
 * 异步任务
 * @param  task 执行的任务对象
 * @private
 */
FrameAnimation.prototype._asyncTask = function (task) {
  var me = this;
  // 定义每一帧执行的回调函数
  var enterframe = function (time) {
    var taskFn = task.taskFn;
    var next = function () {
      // 停止当前任务
      me.timeline.stop();
      // 执行下一个任务
      me._next(task);
    };
    taskFn(next, time);
  };
  this.timeline.onenterframe = enterframe;
  this.timeline.start(this.interval);
};

/**
 * 切换到下一个任务，支持如果当前任务需要等待，则延时执行
 * @private
 */
FrameAnimation.prototype._next = function (task) {
  this.index++;
  var me = this;
  if (task.wait) {
    var timer = setTimeout(function () {
      me._runTask();
      clearTimeout(timer);
    }, task.wait);
  } else {
    this._runTask();
  }
};

module.exports = FrameAnimation;
// module.exports = function () {
//   return new FrameAnimation();
// };
