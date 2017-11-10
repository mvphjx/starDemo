/**
 * 将比对任务，映射比中记录。
 * 
 * 
 * 选择 比对任务 赋值；
 * 选择 捺印卡片赋值
 * 选择 案件信息赋值
 */
var AddLTLHitlog = {
	splitChar: '_And_',
	/**
	 * id 比对任务id
	 * jsoncfg json映射关系
	 * callback 回调函数
	 * 
	 * return json（接口格式）
	 */
	getHitlogInfo:function(id,jsoncfg,callback,type,remarkValue){
		//获取比中信息，并且执行回调方法
		switch(type)
		{
			case ABISCode.QryType.TT:
				this.getTTHitlogInfo(id,jsoncfg,callback,remarkValue);
				break;
			case ABISCode.QryType.LL:
				this.getLLHitlogInfo(id,jsoncfg,callback,remarkValue);
				break;
			case ABISCode.QryType.TL:
			case ABISCode.QryType.LT:
				this.getLTLHitlogInfo(id,jsoncfg,callback,remarkValue);
				break;
		}
	},
	getLTLHitlogInfo: function(id,jsoncfg,callback,remarkValue) {
		var ltlHitlogInfo = {};
		var url = WebVar.VarPath + "/hitlog/addtllt/getCQryCard/" + id;
		var _this = this;
		jQuery.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: null,
			dataType: 'json',
			success: function(resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    var data=resInfo.data
                    if(!WebUtil.isNull(data)) {
                        var result = {};
						/*
						 *      * tpcard 捺印卡片
						 *      * lpcard 现场卡片
						 *      * lpcase 案件
						 *      * checkInfo 认定人
						 *      * recheckInfo 复核人
						 *      * qryInfo 比对任务
						 *      * qrycand 候选卡
						 */
                        var lpcard = data.lpcard;
                        var lpcase = data.lpcase;
                        var tpcard = data.tpcard;
                        var qryInfo = data.qryInfo;
                        var checkInfo = data.checkInfo;
                        var recheckInfo = data.recheckInfo;
                        var qrycand =  data.qrycand;
                        var match =  data.match;
                        if(!WebUtil.isNull(tpcard)) {
                            if(typeof tpcard == 'string') {
                                tpcard = eval('(' + tpcard + ')');
                            }
                            tpcard.personTextInfo = _this.toJson(tpcard.personTextInfo)
                            var jsonData=JsonUtil.getJson(jsoncfg, tpcard);
                            try {//获取户籍地现住址
                                var addinfo = tpcard.personTextInfo.AddrInfo;
                                $.each(addinfo, function(index, obj1) {
                                    var model = addinfo[index];
                                    var type = model["AddressType"];
                                    if(type === 2) {
                                        var addcode = model["AddressCode"]||""
                                        var AddressDetail = model["AddressDetail"]||""
                                        JsonUtil.createJsonById(ltl.tp11.id,addcode,null,jsonData);
                                        JsonUtil.createJsonById(ltl.tp12.id,AddressDetail,null,jsonData);
                                    }
                                    if(type === 5) {
                                        var addcode = model["AddressCode"]||""
                                        var AddressDetail = model["AddressDetail"]||""
                                        JsonUtil.createJsonById(ltl.tp9.id,addcode,null,jsonData);
                                        JsonUtil.createJsonById(ltl.tp10.id,AddressDetail,null,jsonData);
                                    }
                                });
                            } catch(e) {}
                            try {//获取第一个证件
                                var CertInfo0 = tpcard.personTextInfo.CertInfo[0];
                                CertificateNum = CertInfo0.CertNum||""
                                CertificateType = CertInfo0.CertType||""
                                JsonUtil.createJsonById(ltl.tp8.id,CertificateNum,null,jsonData);
                                JsonUtil.createJsonById(ltl.tp7.id,CertificateType,null,jsonData);
                            } catch(e) {}
                            try{
                                JsonUtil.createJsonById(ltl.log31.id,3,null,jsonData);
                            }catch(e){}
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(lpcase)) {
                            lpcase =_this.toJson(lpcase);
                            lpcase.caseTextInfo = _this.toJson(lpcase.caseTextInfo);
                            try{//案发日期格式 需要转化
                                lpcase.caseTextInfo.BasicInfo.CEOccurDate= WebUtil.dateTime2Date(lpcase.caseTextInfo.BasicInfo.CEOccurDate);
                            }catch(e){}
                            var jsonData=JsonUtil.getJson(jsoncfg, lpcase);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(lpcard)) {
                            var jsonData=JsonUtil.getJson(jsoncfg, lpcard);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(match)) {
                            var jsonData=JsonUtil.getJson(jsoncfg, match);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(qryInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg, qryInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(checkInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['checkInfoCfg'], checkInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(recheckInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['recheckInfoCfg'], recheckInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(qrycand)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['qrycandInfoCfg'], qrycand);
                            result =$.extend(true, result, jsonData);
                        }
                        if(result){
                            //特殊字段的逻辑
                            if(result["mainInfo"]){
                                JsonUtil.createJsonById(ltl.log20.id,remarkValue,null,result);
                                try{
                                    if(result["mainInfo"]["ltlHitlogInfo"]){
                                        result["mainInfo"]["ltlHitlogInfo"] = JSON.stringify(result["mainInfo"]["ltlHitlogInfo"])
                                    }
                                    if(result["mainInfo"]["ltlHitlogQryInfo"]){
                                        result["mainInfo"]["ltlHitlogQryInfo"] = JSON.stringify(result["mainInfo"]["ltlHitlogQryInfo"])
                                    }
                                    if(result["mainInfo"]["ltlHitlogTpInfo"]){
                                        result["mainInfo"]["ltlHitlogTpInfo"] =JSON.stringify(result["mainInfo"]["ltlHitlogTpInfo"])
                                    }
                                    if(result["mainInfo"]["ltlHitlogLpInfo"]){
                                        result["mainInfo"]["ltlHitlogLpInfo"] =JSON.stringify(result["mainInfo"]["ltlHitlogLpInfo"])
                                    }
                                    var modeljson  = {};
                                    modeljson["mainInfo"]=result["mainInfo"];
                                    result = JSON.stringify(modeljson);
                                }catch(e){}

                            }
                        }
                        callback&&callback(result);
                        //console.log(result);
                    }
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }

			},
			error: function(e) {
				alert("" + searchStr.QueryError + "!");
			}
		});
	},
	getLLHitlogInfo: function(id,jsoncfg,callback,remarkValue) {
		var ltlHitlogInfo = {};
		var url = WebVar.VarPath + "/hitlog/addtllt/getCQryCard/" + id;
		var _this = this;
		jQuery.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: null,
			dataType: 'json',
			success: function(resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    var data=resInfo.data
                    if(!WebUtil.isNull(data)) {
                        var result = {};
						/*
						 *      * lpcard1 现场卡片
						 *      * lpcase1 案件
						 *      * lpcard2 现场卡片
						 *      * lpcase2 案件
						 *      * checkInfo 认定人
						 *      * qryInfo 比对任务
						 *      * qrycand 候选卡片
						 */
                        var lpcard1 = data.lpcard1;
                        var lpcase1 = data.lpcase1;
                        var lpcard2 = data.lpcard2;
                        var lpcase2 = data.lpcase2;
                        var qryInfo = data.qryInfo;
                        var checkInfo = data.checkInfo;
                        var qrycand =  data.qrycand;
                        if(!WebUtil.isNull(lpcase1)) {
                            if(typeof lpcase1 == 'string') {
                                lpcase1 = eval('(' + lpcase1 + ')');
                            }
                            lpcase1.caseTextInfo = _this.toJson(lpcase1.caseTextInfo);
                            try{//案发日期格式 需要转化
                                lpcase1.caseTextInfo.BasicInfo.CEOccurDate= WebUtil.dateTime2Date(lpcase1.caseTextInfo.BasicInfo.CEOccurDate);
                            }catch(e){}
                            var jsonData=JsonUtil.getJson(jsoncfg.lpcase1, lpcase1);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(lpcard1)) {
                            var jsonData=JsonUtil.getJson(jsoncfg.lpcard1, lpcard1);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(lpcase2)) {
                            if(typeof lpcase2 == 'string') {
                                lpcase2 = eval('(' + lpcase2 + ')');
                            }
                            lpcase2.caseTextInfo = _this.toJson(lpcase2.caseTextInfo);
                            try{//案发日期格式 需要转化
                                lpcase2.caseTextInfo.BasicInfo.CEOccurDate= WebUtil.dateTime2Date(lpcase2.caseTextInfo.BasicInfo.CEOccurDate);
                            }catch(e){}
                            var jsonData=JsonUtil.getJson(jsoncfg.lpcase2, lpcase2);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(lpcard2)) {
                            var jsonData=JsonUtil.getJson(jsoncfg.lpcard2, lpcard2);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(qryInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg, qryInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(checkInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['checkInfoCfg'], checkInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(qrycand)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['qrycandInfoCfg'], qrycand);
                            result =$.extend(true, result, jsonData);
                        }
                        //json转字符串
                        if(result){
                            if(result["mainInfo"]){
                                JsonUtil.createJsonById(ll.ll12.id,remarkValue,null,result);
                                try{
                                    if(result["mainInfo"]["llHitlogInfo"]){
                                        result["mainInfo"]["llHitlogInfo"] =JSON.stringify(result["mainInfo"]["llHitlogInfo"])
                                    }
                                    var modeljson  = {};
                                    modeljson["mainInfo"]=result["mainInfo"];
                                    result = JSON.stringify(modeljson);
                                }catch(e){}
                            }
                        }
                        callback&&callback(result);
                        //console.log(result);
                    }
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }

			},
			error: function(e) {
				alert("" + searchStr.QueryError + "!");
			}
		});
	},
	getTTHitlogInfo: function(id,jsoncfg,callback,remarkValue) {
		var ltlHitlogInfo = {};
		var url = WebVar.VarPath + "/hitlog/addtllt/getCQryCard/" + id;
		var _this = this;
		jQuery.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: null,
			dataType: 'json',
			success: function(resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    var data=resInfo.data
                    if(!WebUtil.isNull(data)) {
                        var result = {};
						/*
						 *      * tpcard1 卡片
						 *      * tpcard2 现场卡片
						 *      * checkInfo 认定人
						 *      * qryInfo 比对任务
						 *      * qrycand 候选卡片信息qrycandInfoCfg
						 */
                        var tpcard1 = data.tpcard1;
                        var tpcard2 = data.tpcard2;
                        var qryInfo = data.qryInfo;
                        var checkInfo = data.checkInfo;
                        var qrycand =  data.qrycand;
                        if(!WebUtil.isNull(tpcard1)) {
                            if(typeof tpcard1 == 'string') {
                                tpcard1 = eval('(' + tpcard1 + ')');
                            }
                            tpcard1.personTextInfo = _this.toJson(tpcard1.personTextInfo)
                            var jsonData=JsonUtil.getJson(jsoncfg.tpcard1, tpcard1);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(tpcard2)) {
                            if(typeof tpcard2 == 'string') {
                                tpcard2 = eval('(' + tpcard2 + ')');
                            }
                            tpcard2.personTextInfo = _this.toJson(tpcard2.personTextInfo)
                            var jsonData=JsonUtil.getJson(jsoncfg.tpcard2, tpcard2);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(qryInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg, qryInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(checkInfo)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['checkInfoCfg'], checkInfo);
                            result =$.extend(true, result, jsonData);
                        }
                        if(!WebUtil.isNull(qrycand)) {
                            var jsonData=JsonUtil.getJson(jsoncfg['qrycandInfoCfg'], qrycand);
                            result =$.extend(true, result, jsonData);
                        }
                        //json转字符串;json截取
                        if(result){
                            if(result["mainInfo"]){
                                JsonUtil.createJsonById(tt.tt13.id,remarkValue,null,result);
                                try{
                                    if(result["mainInfo"]["ttHitlogInfo"]){
                                        result["mainInfo"]["ttHitlogInfo"] =JSON.stringify(result["mainInfo"]["ttHitlogInfo"])
                                    }
                                    var modeljson  = {};
                                    modeljson["mainInfo"]=result["mainInfo"];
                                    result = JSON.stringify(modeljson);
                                }catch(e){}
                            }
                        }
                        callback&&callback(result);
                        //console.log(result);
                    }
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }
			},
			error: function(e) {
				alert("" + searchStr.QueryError + "!");
			}
		});
	},
	//页面填充，用来编辑
	setMatchRows: function(rows,searchStr,jsoncfg,callback) {
		var url = WebVar.VarPath + "/hitlog/addtllt/getCQryCard/" + rows[0].ID;
		var _this = this;
		jQuery.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: null,
			dataType: 'json',
			success: function(resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    var data=resInfo.data
                    if(!WebUtil.isNull(data)) {
						/*
						 *      * tpcard 捺印卡片
						 *      * lpcard 现场卡片
						 *      * lpcase 案件
						 *      * checkInfo 认定人
						 *      * recheckInfo 复核人
						 *      * qryInfo 比对任务
						 */
                        var lpcard = data.lpcard;
                        var lpcase = data.lpcase;
                        var tpcard = data.tpcard;
                        var qryInfo = data.qryInfo;
                        var checkInfo = data.checkInfo;
                        var recheckInfo = data.recheckInfo;
                        if(!WebUtil.isNull(tpcard)) {
                            tpcard= _this.toJson(tpcard)
                            tpcard.personTextInfo = _this.toJson(tpcard.personTextInfo)
                            _this.setInfo(jsoncfg, tpcard);
                            callback&&callback(tpcard);
                        }
                        if(!WebUtil.isNull(lpcase)) {
                            lpcase= _this.toJson(lpcase)
                            lpcase.caseTextInfo = _this.toJson(lpcase.caseTextInfo)
                            _this.setInfo(jsoncfg, lpcase);
                        }
                        if(!WebUtil.isNull(lpcard)) {
                            lpcard= _this.toJson(lpcard)
                            _this.setInfo(jsoncfg, lpcard);
                        }
                        if(!WebUtil.isNull(qryInfo)) {
                            _this.setInfo(jsoncfg, qryInfo);
                        }
                        if(!WebUtil.isNull(checkInfo)) {
                            checkInfo= _this.toJson(checkInfo)
                            _this.setInfo(jsoncfg['checkInfoCfg'], checkInfo);
                        }
                        if(!WebUtil.isNull(recheckInfo)) {
                            recheckInfo= _this.toJson(recheckInfo)
                            _this.setInfo(jsoncfg['recheckInfoCfg'], recheckInfo);
                        }
                    }
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }

			},
			error: function(e) {
				alert("" + searchStr.QueryError + "!");
			}
		});
	},
	setTPRows: function(rows, searchStr, jsoncfg,callback) {
		var url = WebVar.VarPath + "/hitlog/addtllt/getTPCard/" + rows[0].ID;
		var _this = this;
		jQuery.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: null,
			dataType: 'json',
			success: function(resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    var data=resInfo.data
                    if(!WebUtil.isNull(data)) {
                        var tpcard = data.tpcard;
                        if(!WebUtil.isNull(tpcard)) {
                            tpcard= _this.toJson(tpcard)
                            tpcard.personTextInfo = _this.toJson(tpcard.personTextInfo)
                            _this.setInfo(jsoncfg, tpcard);
                            callback&&callback(tpcard);
                        }
                    }
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }

			},
			error: function(e) {
				alert("" + searchStr.QueryError + "!");
			}
		});
	},
	setLPRows: function(rows, searchStr, jsoncfg) {
		var url = WebVar.VarPath + "/hitlog/addtllt/getLPCase/" + rows[0].ID;
		var _this = this;
		jQuery.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: null,
			dataType: 'json',
			success: function(resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    var data=resInfo.data
                    if(!WebUtil.isNull(data)) {
                        var lpcard = data.lpcard;
                        var lpcase = data.lpcase;
                        if(!WebUtil.isNull(lpcase)) {
                            lpcase= _this.toJson(lpcase)
                            lpcase.caseTextInfo = _this.toJson(lpcase.caseTextInfo)
                            _this.setInfo(jsoncfg, lpcase);
                        }
                        if(!WebUtil.isNull(lpcard)) {
                            lpcard= _this.toJson(lpcard)
                            _this.setInfo(jsoncfg, lpcard);
                        }
                    }
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }
			},
			error: function(e) {
				alert("" + searchStr.QueryError + "!");
			}
		});
	},
	setInfo: function(jsoncfg, data) {
		data = this.toJson(data);
		var value = null;
		var _this = this;
		//console.log(data);
		$.each(jsoncfg, function(name, obj) {
			if(typeof obj == "string") {
				value = null;
				value = _this.getJsonValueById(obj, data);
				if(value !== null) {
					EditPage.prototype.unique.setValueById(name, value)
				}
			}
		});
	},
	getJsonValueById: function(id, data, splitChar) {
		splitChar = splitChar || this.splitChar;
		var arr = new Array();
		arr = id.split(splitChar);
		for(var i = 0; i < arr.length; i++) {
			if(data[arr[i]] != undefined) {
				data = data[arr[i]]
			} else {
				data = null;
				break
			}
		}
		return data;
	},
	//将字符串转换为json，如果失败返回原字符串
	toJson: function(jsonstr) {
		var json = jsonstr;
		try {
			if(typeof jsonstr == "string") {
				json = eval('(' + jsonstr + ')');
			}
		} catch(e) {
			json={};
		}
		return json;
	},
	//某个层级下的字符串转换为json ， 如果失败返回原字符串
	toJsonByIds: function(ids, data, splitChar) {
		if(typeof ids === 'string') {
			var idstr = ids;
			ids = [];
			ids.push(idstr);
		}
		for(var i = 0; i < ids.length; i++) {
			var id = ids[i];
			splitChar = splitChar || this.splitChar;
			var arr = new Array();
			arr = id.split(splitChar);
			var result = data;
			for(var j = 0; j < arr.length - 1; j++) {
				if(result[arr[j]] == undefined) {
					result[arr[j]] = {};
				}
				result = result[arr[j]];
			}
			result[arr[arr.length - 1]] = this.toJson(result[arr[arr.length - 1]]);
		}
		return data;
	}
}

