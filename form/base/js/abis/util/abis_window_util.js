
/**
 * 打开各种常用对话框
 * @param {Object} id 对话框ID
 * @param {Object} whereStr 条件语句
 * @param {Object} callBack 回调函数 
 * @return 对话框引用
 */
var  ABISWindowUtil = 
{
	language:{},
	openSendMatch:function(id,param)
	{
		function send(p) 
		{
			var list = new Array();
			if(p.cards != null)
			{
				for(var i in p.cards)
				{
					var r 	= p.cards[i];
					var card = {};
					card.cardId = r.cardId;
					card.cardNum = r.cardNum;;
					list.push(card);
				}
			}
			
			var obj = {};
			obj.matchType = p.matchType;
			obj.bty = p.bty;
			obj.matchMethodId = p.matchMethodId;
			obj.mpIds = p.mpIds;
			obj.srcMntGid = p.srcMntGid;
			obj.priority = p.priority;
			obj.maxCandCnt = p.maxCandCnt;
			obj.includeMnt = p.includeMnt;
			obj.list = list;
			
			var url = WebVar.VarPath + "/match/sendmatch/submitMatch";
//			var url = WebVar.VarPath + "/match/sendmatch/submit";
			var jData = $.toJSON(obj);
			jQuery.ajax 
			( 
		        {
					type : 'POST',
					contentType : 'application/json',
					url : url,
					data : jData,
					dataType : 'json',
					success : function(data) 
					{   
						if(!WebUtil.isNull(data))
						{
							alert(data.msg);
						}
					},   
					error : function(e) 
					{   
						alert(AbisMessageResource.Alert['SearchError']);
					}   
				}
			);
			
//			var url = WebVar.VarPath + "/match/sendmatch/submit";
//			var jData = $.toJSON(p);
//			jQuery.ajax( 
//		    {
//				type : 'POST',
//				contentType : 'application/json',
//				url : url,
//				data : jData,
//				dataType : 'json',
//				success : function(data) 
//				{   
//					if(!WebUtil.isNull(data))
//					{
//						alert(data.msg);
//					}
//				},   
//				error : function(e) 
//				{
//					alert("检索出错12!");
//				}   
//			});
		}
		
		var param = 
		{
			title:AbisMessageResource["SendMatchTask"],
			page:"/jsp/abis/widget/sendmatch.jsp",
			initData:param,
			call:{init:"init",get:"getParam",set:"setParam"},
			callBack:{ok:send},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	},
	openMatch : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName:"MATCH_VIEW",
			tableType:ABISCode.TableTypeCode.QUERYQUETABLE,
			dbType:ABISCode.DBTypeCode.QUERY_DB,
			regLabName:this.language.MatchNumber,
			multiSelect:isMultiSelect,
			language	: this.language
		}
		if(!WebUtil.isNull(dbid))
		{
			initParam.dbid = dbid;
		}
		if(!WebUtil.isNull(where))
		{
			initParam.where = where;
		}
		var param = 
		{
			title:this.language.MatchTask,
			page:"/jsp/widget/choose_dbid_table.jsp",
			initData:initParam,
			call:{init:"initPage",get:"getSelectItem",set:"setData"},
			callBack:{ok:callBack},
			language	: this.language
		};
		if(!WebUtil.isNull(sortCol))
		{
			if(WebUtil.isNull(sortOrder))
			{
				sortOrder = 1;/* 默认降序 */
			}
			var sort = {colName:sortCol,order:sortOrder};
			initParam.sort = sort;
		}
		var matchDialog = new WebWindow(id,param);
		return matchDialog;
	},
	openTPCard:function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName	: "TP_CARD_VIEW",
			tableType	: ABISCode.TableTypeCode.TPCARD,
			dbType		: ABISCode.DBTypeCode.TENRPINT_DB,
			regLabName	: this.language.CardNum,
			multiSelect	: isMultiSelect,
			language	: this.language
		};
		if(!WebUtil.isNull(sortCol))
		{
			if(WebUtil.isNull(sortOrder))
			{
				sortOrder = 1;/* 默认降序 */
			}
			var sort = {colName:sortCol,order:sortOrder};
			initParam.sort = sort;
		}
		if(!WebUtil.isNull(dbid))
		{
			initParam.dbid = dbid;
		}
		if(!WebUtil.isNull(where))
		{
			initParam.where = where;
		}
		var param = 
		{
			title		: this.language.TPCard,
			page		: "/jsp/widget/choose_dbid_table.jsp",
			initData	: initParam,
			call		: {init:"initPage",get:"getSelectItem",set:"setData"},
			callBack	: {ok:callBack},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	},
	setLanguage: function(language)
	{
		this.language = language;
	},
	openLPCase : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName:"LP_CASE_VIEW",
			tableType:ABISCode.TableTypeCode.LPCASE,
			dbType:ABISCode.DBTypeCode.LATENT_DB,
			regLabName:this.language.CaseNumber,
			multiSelect:isMultiSelect,
			language	: this.language
		};
		if(!WebUtil.isNull(sortCol))
		{
			if(WebUtil.isNull(sortOrder))
			{
				sortOrder = 1;
			}
			var sort = {colName:sortCol,order:sortOrder};
			initParam.sort = sort;
		}
		if(!WebUtil.isNull(dbid))
		{
			initParam.dbid = dbid;
		}
		if(!WebUtil.isNull(where))
		{
			initParam.where = where;
		}
		var param = 
		{
			title:this.language.Case,
			page:"/jsp/widget/choose_dbid_table.jsp",
			initData:initParam,
			call:{init:"initPage",get:"getSelectItem",set:"setData"},
			callBack:{ok:callBack},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	},
	openLPCard : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName	: "LP_CARD_VIEW",
			tableType	: ABISCode.TableTypeCode.LPCARD,
			dbType		: ABISCode.DBTypeCode.LATENT_DB,
			regLabName	: this.language.CardNumber,
			multiSelect	: isMultiSelect,
			language	: this.language
		};
		if(!WebUtil.isNull(sortCol))
		{
			if(WebUtil.isNull(sortOrder))
			{
				sortOrder = 1;
			}
			var sort = {colName:sortCol,order:sortOrder};
			initParam.sort = sort;
		}
		if(!WebUtil.isNull(dbid))
		{
			initParam.dbid = dbid;
		}
		if(!WebUtil.isNull(where))
		{
			initParam.where = where;
		}
		var param = 
		{
			title		: this.language.LPCard,
			page		: "/jsp/widget/choose_dbid_table.jsp",
			initData	: initParam,
			call		: {init:"initPage",get:"getSelectItem",set:"setData"},
			callBack	: {ok:callBack},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	},
	openDB: function(id,dbType,dbPurpose,invoke)
	{
		var p =
		{
			title : this.language.ChooseDB,
			page : "/jsp/widget/choose_db.jsp",
			initData : 
			{
				dbType 		: dbType,
				dbPurpose	: dbPurpose
			},
			call : 
			{
				get 	: "getSelectDb",
				init 	: "init"
			},
			callBack : 
			{
				ok 	: invoke
			},
			language	: this.language
		};
		var window = new WebWindow(id, p);
		return window;
	},
	open : function(id,tableName,colList,regCol,regLab,titleName,whereStr,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName	: tableName,
			cols		: colList,
			regCol		: regCol,
			regLabName	: regLab,
			tableType	: ABISCode.TableTypeCode.MATCHHITLOG,
			dbType		: ABISCode.DBTypeCode.ADMIN_DB,
			multiSelect	: isMultiSelect,
			language	: this.language,
			isDbid		: false
			};
		if(!WebUtil.isNull(sortCol))
		{
			if(WebUtil.isNull(sortOrder))
			{
				sortOrder = 1;/* 默认降序 */
			}
			var sort = {colName:sortCol,order:sortOrder};
			initParam.sort = sort;
		}
		if(!WebUtil.isNull(whereStr))
		{
			initParam.where = whereStr;
		}
		var param = 
		{
			title	: titleName,
			page	: "/jsp/widget/choose_dbid_table.jsp",
			initData: initParam,
			call	: {init:"initPage",get:"getSelectItem",set:"setData"},
			callBack: {ok:callBack},
			showCtrl	: true,
			language: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	},
	openUser : function(id,colList,whereStr,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName:"user_view",
			regLabName:this.language.ChooseUser,
			cols:colList,
			where:whereStr,
			multiSelect:isMultiSelect,
			language	: this.language
		};
		if(!WebUtil.isNull(sortCol))
		{
			if(WebUtil.isNull(sortOrder))
			{
				sortOrder = 1;/* 默认降序 */
			}
			var sort = {colName:sortCol,order:sortOrder};
			initParam.sort = sort;
		}
		if(!WebUtil.isNull(whereStr))
		{
			initParam.where = whereStr;
		}
		var param = 
		{
			title: this.language.ChooseUser,
			page:"/jsp/widget/choose_user_table.jsp",
			initData:initParam,
			call:{init:"initPage",get:"getSelectItem",set:"setData"},
			callBack:{ok:callBack},
			language: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	}
}
