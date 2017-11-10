

/*
 C++   2
 RCP  ABISCode.ClientType.RPC:1
 C	 ABISCode.ClientType.C:0
 调用javascript时，无法使用ajax操作，调用本地方法。
 重写 .ajax .post .get方法
 */
;(function($) {
    //备份jquery的ajax方法
    var _ajax = $.ajax;
    //重写jquery的ajax方法
    $.ajax = function(opt) {
        if(WebComboGetData.getClientType() != null) {
            var data = "[]";
            try {
                WebComboGetData.getComboData(opt,callback);
                function callback(data){
                    opt.success(data);
                }
            } catch(e) {
                var url = opt.url;
                var result = data;
                var msg = 'url:' + url + "|resultData:" + result + "|error:" + e;
                if(isDebug) {
                    console.log(e)
                }
                WebComboGetData.log(msg);
            } finally {
                return;
            }
        }
        //模拟登陆
        if(isDebug && !isLogin && login) {
            isLogin = true;
            login();
        }
        //模拟登陆end
        //备份opt中error和success方法
        var fn = {
            error: function(XMLHttpRequest, textStatus, errorThrown) {},
            success: function(data, textStatus) {}
        }
        if(opt.error) {
            fn.error = opt.error;
        }
        if(opt.success) {
            fn.success = opt.success;
        }
        //扩展增强处理
        var _opt = $.extend(opt, {
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //错误方法增强处理
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function(data, textStatus) {
                //成功回调方法增强处理
                fn.success(data, textStatus);
            }
        });
        _ajax(_opt);
    };
    var WebComboGetData = {
        /*
         url
         ----/util/combo/find/CEBasicInfo|CESuspiciousAreaCode_2/1
         ----/util/combo/search/CEBasicInfo|CESuspiciousAreaCode_2/1
         ----/util/combo/data/dbid,ceStatus,ceType,CEBasicInfo|CEOccurPlaceCode,....
         ----/db/mgr/dbinfo/+ ABISCode.DBTypeCode.TENRPINT_DB
         data
         filterRgx:undefined
         colFilterRgxs:undefined
         */
        path: {
            find: "/util/combo/find/",
            search: "/util/combo/search/",
            data: "/util/combo/data/",
            dbinfo: "/db/mgr/dbinfo/",
            searchDialog: "/tblcfg/searchDialog"
        },
        getComboData: function(opt,callback) {
            var url = opt.url
            var data = opt.data
            this.getComboDataByRCP(url, data,callback);
            return "[]";
        },
        getClientType: function() {
            var result = 1;
            return result;
        },
        /*
         获取url里面的参数
         ...../util/combo/find/CEBasicInfo|CESuspiciousAreaCode_2/1
         ->
         CEBasicInfo|CESuspiciousAreaCode_2 , 1
         */
        getParam: function(url, str) {
            var start = url.indexOf(str) + str.length;
            var param = url.substring(start);
            return param.split('/')
        },
        getComboDataByRCP: function(url, data,callback) {
            var data = "[]";
            if(url.indexOf(this.path.find) > -1) {
                var paramArr = this.getParam(url, this.path.find)
                data=findCodeInfo(paramArr[0], paramArr[1]);
                callback&&callback(data);
            } else if(url.indexOf(this.path.search) > -1) {
                var paramArr = this.getParam(url, this.path.search)
                data=searchCodeInfo(paramArr[0], paramArr[1]);
                callback&&callback(data);
            } else if(url.indexOf(this.path.data) > -1) {
                var paramArr = this.getParam(url, this.path.data)
                data={};
                data[paramArr[0]] = dataDemo.codeTableData;
                callback&&callback(data);
            } else if(url.indexOf(this.path.dbinfo) > -1) {
                var paramArr = this.getParam(url, this.path.dbinfo)
                data=searchDBCatlog(paramArr[0]);
                callback&&callback(data);
            }else if(url.indexOf(this.path.searchDialog) > -1) {
                var paramArr = this.getParam(url, this.path.dbinfo)
                data=dataDemo.searchDialogData;
                callback&&callback(data);
            }
        },
        log: function(str) {
            //日志记录
            try {
                var type = this.getClientType();
                if(type == ABISCode.ClientType.RCP) {
                    //errorCallBack(str);
                } else if(type == ABISCode.ClientType.C) {
                    //TODO
                }	else if(type == ABISCode.ClientType.CPLUS) {
                    //TODO
                }
            } catch(e) {
                //console.log(str)
                //日志记录方法报错，暂不处理
            }

        },
        //Html解码
        decode: function(str) {
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        }
    }
})(jQuery);

try{
    // Qt客户端注册相关函数，2017-11-01 by ZhangRunnan.
    new QWebChannel(qt.webChannelTransport, function(channel) {
        window.TextInfoPackage = channel.objects.TextInfoPackage;
    });
}catch(e){
    //TODO handle the exception
}
function dataChanged(canSave) {
    TextInfoPackage.dataChanged(canSave)
}
