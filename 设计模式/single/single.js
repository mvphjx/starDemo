


//单例管理
var getSingle = function (fn) {
    //使用闭包，保存执行结果，根据结果有无，实现单例
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
};
//创建业务对象
var createIframe = function () {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
};
