/**
 * XXX组件
 * 主要职责如下：
 * 1界面渲染
 * 2数据交互封装
 * 3提供接口调用
 * 需要依赖的模块：
 * ...
 *
 * @type {XXXCompomentClass}
 */
var XXXCompoment = function () {
    /**
     * 构造器
     * @param setting{domId,...}
     * @constructor
     */
    var XXXCompomentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    XXXCompomentClass.prototype = { //这里定义 暴露给外界调用的 接口/方法
        getInfo: function () {
            API.getInfo().then(function () {
                //...return promise
            }).then(function () {

            });
        }
    };
    /**
     * 服务器相关接口封装
     */
    var API = {
        //获取信息
        getInfo: function (id, jsonData) {
            var def = $.Deferred();
            var url = WebVar.VarPath + "/hitlog/detail/byId/" + id;
            jQuery.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: url,
                data: $.toJSON(jsonData),
                dataType: 'json',
                success: function (resultMsg) {
                    if (resultMsg.status === WebCode.WebResultStatus.ok) {
                        def.resolve(resultMsg.data);
                    } else {
                        DialogUtil.openSimpleDialog(data.msg);
                    }
                },
                error: function (e) {
                    DialogUtil.openSimpleDialog(resultMsg.msg);
                    recheckConfig = 0;
                    def.resolve();
                }
            });
            return def.promise();
        }
    }
    return XXXCompomentClass;

    /**
     * 私有方法
     */
    function init() {

    }

    /**
     * 初始化事件/监听
     */
    function initEvent() {

    }

    /**
     * 初始化界面
     */
    function initUI() {


    }


}();

var XXXCompoment = new XXXCompoment();
XXXCompoment.getInfo()
