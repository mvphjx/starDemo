/**
 * 闭包 避免全局命名冲突
 * 使用 define进行模块加载
 */
(function () {
    //模块业务代码
    var logDemo = function (message) {
        return {
            warn: function (value) {
                if (!message || !message.version) {
                    message = {version: "0.0"}
                }
                console.warn("当前版本信息：" + message.version + ",内容：" + value);
            }
        };
    };
    //AMD 规范
    if (typeof define === "function" && define.amd) {
        /**
         * 第一个参数  导出的名字
         * 第二个参数  依赖的模块
         * 第三个参数  导出的对象
         */
        define("logDemo", ["message"], function (message) {
            return new logDemo(message);
        });
    }
}());
