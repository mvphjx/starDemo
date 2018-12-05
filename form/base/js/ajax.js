/*
C++   2 
RCP  ABISCode.ClientType.RPC:1		
C	 ABISCode.ClientType.C:0
调用javascript时，无法使用ajax操作，调用本地方法。
重写 .ajax .post .get方法
*/
(function($) {
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
					alert(msg)
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
		};
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
			"http://192.168.128.145:7950/abisweb/util/combo/find/MIS_PERSON_TEXT_INFO|COMM_TYPE?searchContition=1"
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
			dbinfo: "/db/mgr/dbinfo/"
		},
		getComboData: function(opt,callback) {
			var url = opt.url;
			var data = opt.data;

			var type = this.getClientType();
			if(type == ABISCode.ClientType.RCP) {
				this.getComboDataByRCP(url, data,callback);
			} else if(type == ABISCode.ClientType.QT) {
				this.getComboDataByQt(url, data,callback);
			}else if(type == ABISCode.ClientType.CPLUS) {
				this.getComboDataByCPLUS(url, data,callback);
			}
			return "[]";
		},
		getClientType: function() {
			var result = null;
			if((typeof EditPage != 'undefined') && !WebUtil.isNull(EditPage.prototype.unique) && !WebUtil.isNull(EditPage.prototype.unique.type)) {
				result = EditPage.prototype.unique.type;
			} else if((typeof DetailPage != 'undefined') && !WebUtil.isNull(DetailPage.prototype.unique) && !WebUtil.isNull(DetailPage.prototype.unique.type)) {
				result = DetailPage.prototype.unique.type;
			}
			return result;
		},
		/**
		 * 获取url里面的参数
		 * @param {Object} url ajax访问的url地址
		 * @param {Object} str url无参数匹配串
		 */
		getParam: function(url, str) {
			var start = url.indexOf(str) + str.length;
			var param = url.substring(start);
			return param.split('/')
		},
		//与指纹系统RCP客户端 交互 
		getComboDataByRCP: function(url, data,callback) {
			var data = "[]";
			if(url.indexOf(this.path.find) > -1) {
				var paramArr = this.getParam(url, this.path.find)
				paramArr = paramArr[0].split('?searchContition=');
				data=findCodeInfo(paramArr[0], paramArr[1]);
				callback&&callback(data);
			} else if(url.indexOf(this.path.search) > -1) {
				var paramArr = this.getParam(url, this.path.search)
				data=searchCodeInfo(paramArr[0], paramArr[1]);
				callback&&callback(data);
			} else if(url.indexOf(this.path.data) > -1) {
				var paramArr = this.getParam(url, this.path.data)
				data=findAllCodeTable(paramArr[0]);
				callback&&callback(data);
			} else if(url.indexOf(this.path.dbinfo) > -1) {
				var paramArr = this.getParam(url, this.path.dbinfo)
				data=searchDBCatlog(paramArr[0]);
				data = {"status":"ok","data":data}
				callback&&callback(data);
			}
		},
		//与指纹系统Qt客户端 交互 
		getComboDataByQt: function(url, data, callback) {
			if(url.indexOf(this.path.find)>-1){
				var paramArr = this.getParam(url,this.path.find)
				paramArr = paramArr[0].split('?searchContition=');
				TextInfoPackage.findCodeInfo(paramArr[0], paramArr[1], function(message) {
					callback&&callback(message)
				});

			}else if(url.indexOf(this.path.search)>-1){
				var paramArr = this.getParam(url,this.path.search)
				TextInfoPackage.searchCodeInfo(paramArr[0], paramArr[1], function(message) {
					callback&&callback(message)
				});

			}else if(url.indexOf(this.path.data)>-1){
				var paramArr = this.getParam(url,this.path.data)
				TextInfoPackage.findAllCodeTable(paramArr[0], function(message) {
					callback&&callback(message)
				});

			}else if(url.indexOf(this.path.dbinfo)>-1){
				var paramArr = this.getParam(url,this.path.dbinfo)
				TextInfoPackage.searchDBCatlog(paramArr[0], function(message) {
					message = {"status":"ok","data":message}
					callback&&callback(message)
				});
			}
		},
		//与活采c++客户端交互
		getComboDataByCPLUS: function(url, data,callback) {
			var data = "[]";
			if(url.indexOf(this.path.find) > -1) {
				var paramArr = this.getParam(url, this.path.find);
                paramArr = paramArr[0].split('?searchContition=');
				data=window.external.SearchCodeTable(paramArr[0], paramArr[1]);
				callback&&callback(data);
			} else if(url.indexOf(this.path.search) > -1) {
				var paramArr = this.getParam(url, this.path.search)
				data=window.external.SearchCodeTableEx(paramArr[0], paramArr[1]);
				data = eval('(' + data + ')');
				if(!WebUtil.isArray(data)){
					for(var key in data){
						data= data[key];
					break;
					}
				}
				data = JSON.stringify(data);
				callback&&callback(data);
			} else if(url.indexOf(this.path.data) > -1) {
				var paramArr = this.getParam(url, this.path.data)
				data=window.external.SearchCodes(paramArr[0]);
				callback&&callback(data);
			} else if(url.indexOf(this.path.dbinfo) > -1) {
				var paramArr = this.getParam(url, this.path.dbinfo)
				//searchDBCatlog
				data=window.external.SearchDBCatlog(paramArr[0]);
                data = {"status":"ok","data":data}
				callback&&callback(data);
			}
		},
		log: function(str) {
			//日志记录
			try {
				var type = this.getClientType();
				if(type == ABISCode.ClientType.RCP) {
					errorCallBack(str);
				} else if(type == ABISCode.ClientType.QT) {
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

// 数据是否可以保存.
function dataCanBeSaved(canSave) {
	TextInfoPackage.dataCanBeSaved(canSave)
}

// 数据是否改变.
function dataIsChanged(isChanged) {
	TextInfoPackage.dataIsChanged(isChanged)
}
