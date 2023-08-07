/*
 * 帧动画库类
 * @constructor
 */
const FrameAnimation = function () {
  // 初始化状态
  this.taskQueue = [];
  this.index = 0; // 动画帧的位置
  this.timeline = null;
  this.state = 0;
  this.edom = null;
  this.interval = 1000 / 60;
  this.wait = 5 * 1000;
  this.loop = 1; // 循环次数
  this.count = 0;
};
FrameAnimation.prototype.init = function (ele, positions, imageUrl) {
  if (ele) {
    this.edom = ele;
    if (imageUrl) {
      this.edom.style.backgroundImage = "url(" + imageUrl + ")";
    }
  }
  var len = positions.length;
  if (len) {
    positions.forEach((item) => {
      var position = item.split(" ");
      this.taskQueue.push({ x: position[0], y: position[1] });
    });
    console.log(this.taskQueue, "---------taskQueue---------");
  }
  this.timeline && clearInterval(this.timeline);
};

FrameAnimation.prototype.run = function () {
  var me = this;
  var enterframe = function () {
    const num = me.index;
    const cLen = me.taskQueue.length * me.loop;
    const task = me.taskQueue[num];
    if (task) {
      me.edom.style.backgroundPosition = task.x + "px " + task.y + "px";
    }

    if (num === me.taskQueue.length - 1) {
      me.index = 0;
      if (me.count >= cLen) {
        me.count = 0;
        // console.log(me.count, cLen, "-------count--cLen-------");
        me.timeline && clearInterval(me.timeline);
        const timer = setTimeout(() => {
          me.timeline = setInterval(enterframe, me.interval);
          clearTimeout(timer);
        }, me.wait);
      }
    }
    me.index++;
    me.count++;
  };
  this.timeline = setInterval(enterframe, this.interval);
};

/*
 * 暂停当前异步定时任务
 *
 */
FrameAnimation.prototype.pause = function () {
  if (this.state === 1) {
    this.state = 2;
    this.timeline && clearInterval(this.timeline);
    return this;
  }
  return this;
};
FrameAnimation.prototype.start = function (interval) {
  this.interval = interval;
  this.run();
};
FrameAnimation.prototype.dispose = function () {
  this.timeline && clearInterval(this.timeline);
  this.taskQueue = [];
  this.index = 0; // 动画帧的位置
  this.state = 0;
  this.edom = null;
  this.interval = 1000 / 60;
  this.wait = 5 * 1000;
  this.loop = 5;
};

export default FrameAnimation;
