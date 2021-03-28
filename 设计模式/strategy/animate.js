/**
 * 策略模式  实现简单动画
 * @param dom
 * @constructor
 */
var tween = {
        linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        strongEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        strongEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        sineaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        sineaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    }
;


var Animate = function (dom) {
    //进行运动的dom节点
    this.dom = dom;
    //动画开始时间
    this.startTime = 0;
    //动画开始时,dom节点的位置, 即dom的初始位置
    this.startPos = 0;
    //动画结束时,dom节点的位置,即dom的目标位置
    this.endPos = 0;
    //dom节点需要被改变的css属性名
    this.propertyName = null;
    //缓动算法
    this.easing = null;
    //动画持续时间
    this.duration = null;
};
/**
 *
 * @param propertyName 要改变的CSS属性名,比如’left'、'top',分别表示左右移动和上下移动。
 * @param endPos 小球运动的目标位置
 * @param duration 动画持续时间
 * @param easing 缓动算法
 */
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    //动画启动时间
    this.startTime = +new Date;
    // dom节点初始位置
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    // dom节点需要被改变的CSS属性名
    this.propertyName = propertyName;
    // dom节点目标位置
    this.endPos = endPos;
    //动画持续时间
    this.duration = duration;
    //缓动算法
    this.easing = tween[easing];
    var self = this;
    //启动定时器,开始执行动画
    var timeId = setInterval(function () {
        //如果动画已结束,则清除定时器
        if (self.step() === false) {
            clearInterval(timeId);
        }
    }, 19);
};


Animate.prototype.step = function () {
    var t = +new Date;
    //取得当前时间
    if (t >= this.startTime + this.duration) {
        //更新小球的CSS属性值
        this.update(this.endPos);
        return false;
    }
    // pos为小球当前位置
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    //更新小球的CSS属性值
    this.update(pos);
};

Animate.prototype.update = function (pos) {
    console.log(this.propertyName, pos)
    this.dom.style[this.propertyName] = pos + 'px'
};
