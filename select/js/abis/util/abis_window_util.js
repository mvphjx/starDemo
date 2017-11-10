
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
	/**
	 * 
	 * @param id
	 * @param param
					{
						cards: [cardId, cardNum, printType],
						bty,
						printType
					}
	 * @returns {WebWindow}
	 */
	openSendMatch:function(id,param,functions)
	{
		var setting = 
		{
			title:AbisMessageResource["SendMatchTask"],
			page:"/jsp/abis/widget/sendmatchplus.jsp",
			initData:param,
			call:{init:"init",get:"getParam",set:"setParam"},
			callBack:{ok:send},
			language	: this.language
		};
		var window = new WebWindow(id,setting);
		return window;
		//回调方法
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
			var obj = $.extend({},p);
            obj.list = list;
            delete obj.cards
			if(obj.includeMnt&&functions&&WebUtil.isFunction(functions.getMnt)){
				//如果是编辑页面  获取正在编辑的特征数据
                obj.imgLobStr=functions.getMnt();
			}
			
			var url = WebVar.VarPath + "/match/sendmatch/submitMatch";
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
                        if (data.status === WebCode.WebResultStatus.ok){
                            DialogUtil.openSimpleDialogForOcx(data.msg);
						}else{
                            DialogUtil.openSimpleDialogForOcx(data.msg,function(){
                                window.open();
                            });
						}
					},   
					error : function(e) 
					{
                        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert['SearchError']);
					}   
				}
			);
		}
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
	//增加查询多个数据库下拉
	openCard : function(id,dbid,where,dbTypes,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam = 
		{
			tableName	: "LP_CARD_VIEW",
			tableType	: ABISCode.TableTypeCode.LPCARD,
			dbType		: dbTypes,
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
	openDBs: function(id,dbType,dbType1,dbPurpose,invoke)
	{
		var p =
		{
			title : this.language.ChooseDB,
			page : "/jsp/widget/choose_db.jsp",
			initData : 
			{
				dbType 		: dbType,
				dbType1 	: dbType1,
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
	},
	/**
	 * 填写&获取 比中信息
	 * @param id 控件id
	 * @param params 其他参数
	 * --@id 比对任务id
	 * --@type 比对任务类型
	 * @returns {WebWindow}
	 * 		  		
	 */
	openHitLog:function(id,params)
	{
		var type = params.type;
		var qryid = params.id;
		var title = {};//显示标题
		title[ABISCode.QryType.TL]=AbisMessageResource["Match"]['TPTL'];
		title[ABISCode.QryType.TT]=AbisMessageResource["Match"]['TPTT'];
		title[ABISCode.QryType.LT]=AbisMessageResource["Match"]['LPLT'];
		title[ABISCode.QryType.LL]=AbisMessageResource["Match"]['LPLL'];
		var url = {};//提交地址
		url[ABISCode.QryType.TL]=WebVar.VarPath + "/hitlog/addtllt/add";
		url[ABISCode.QryType.TT]=WebVar.VarPath + "/hitlog/addtt/add";
		url[ABISCode.QryType.LT]=WebVar.VarPath + "/hitlog/addtllt/add";
		url[ABISCode.QryType.LL]=WebVar.VarPath + "/hitlog/addll/add";
		var jsonCfgByType = {};//映射关系
		jsonCfgByType[ABISCode.QryType.TL]='ltl';
		jsonCfgByType[ABISCode.QryType.TT]='tt';
		jsonCfgByType[ABISCode.QryType.LT]='ltl';
		jsonCfgByType[ABISCode.QryType.LL]='ll';
		var param = 
		{
			title:title[type],
			page:"/jsp/abis/hitlog/addhitlogsimple.jsp",
			initData:param,
			call:{init:"init",get:"getParam",set:"setParam"},
			callBack:{ok:saveHitLog,cancel:saveHitLog},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
		
		function saveHitLog(p) 
		{
			var remarkValue = p.remarkValue||"";
			//获取比中信息，并且提交
	        AddLTLHitlog.getHitlogInfo(qryid,HitLogJsonCfg[jsonCfgByType[type]],submit,type,remarkValue)
			function submit(data) {
				jQuery.ajax({
					url: url[type],
					data: {json:data},
					type: "POST",
					dataType : 'json',
					beforeSend: function() {},
					//contentType: 'application/json',
					success : function(data) 
	                {   
	                    if(!WebUtil.isNull(data))
	                    {
                            DialogUtil.openSimpleDialogForOcx(data.msg);
	                    }
	                },   
	                error : function(e) 
	                {
                        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.SaveFail);
	                }
				});
			}
		}
	},
	/**
	 * 通用数据检索
	 * @param params 其他参数
	 * {
	 * 	  tableName//表名 必须
	 * 	  cfgType//用户自定义配置  加载/保存参数
	 * 	  moduleId//用户自定义配置  加载/保存参数
	 * 	  data{//初始化的数据，任意一种xml数据格式均可  xmls为xml的数组形式，会进行合并，以最后一个元素为基准
	 * 	  	xml,SimpFilter,xmls,SimpFilters,
	 * 	  	initWhere,//初始条件
	 * 	  	columns 要显示那些可以配置得列  ["id","name"...]
	 * 	  	}
	 * 	  callback  function,用户配置完成后，返回数据检索的xml信息data：
	 * 				{xml：完整模板,xml_Filter：不带非空项模板,SimpFilter：完整SimpFilter节点,SimpFilter_Filter：不带非空项SimpFilter节点}
	 * @returns {WebWindow}
	 *     
	 */
	openSearch :function(params)
	{
		var id = null;
		if(!params||!params.tableName){
			return;
		}
		var param = 
		{
			title:'通用数据检索',
			page:"/jsp/abis/search/search_dialog.jsp",
			initData:params,//call中函数 的参数
			call:{init:"init",get:"getParam",set:"setParam"},
			callBack:{ok:callback},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
		
		function callback(p) 
		{
			params&&params.callback(p)
		}
	},
	openservercode	: function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder,title)
	{
		var initParam = 
		{
			tableName:"RMT_AUTO_TASK_CFG",
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
			title:title,
			page:"/jsp/abis/queuetask/rmtserverunitcode.jsp",
			initData:initParam,
			call:{init:"initPage",get:"getSelectItem",set:"setData"},
			callBack:{ok:callBack},
			showCtrl	: true,
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
    openBiosignature : function(id,callBack,title)
    {
        var param =
            {
                title: title,
                page:"/jsp/abis/queuetask/biosignature.jsp",
                call:{get:"getSelectItem"},
                callBack:{ok:callBack},
                language: this.language
            };
        var window = new WebWindow(id,param);
        return window;
	},
    openTransferDb : function(id,dbType,tblName,where,callBack,isMultiSelect,sortCol,sortOrder)
    {
        var initParam =
            {
                tableName:tblName,
                dbType:dbType,
                multiSelect:isMultiSelect,
                language	: this.language
            }
        if(!WebUtil.isNull(dbType))
        {
            initParam.dbType = dbType;
        }
        if(!WebUtil.isNull(where))
        {
            initParam.where = where;
        }
        var param =
            {
                title:this.language.TransferDb,
                page:"/jsp/abis/db/transferdb.jsp",
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
        var dbDialog = new WebWindow(id,param);
        return dbDialog;
    },
	/**
	 * dbType:默认数据库类型，设置为只读
	 *
	 * 例:从捺印卡片列表选中记录设置子库
	 * 	openTransferSubDb("openSubDb",1,1,[1,2])
	 *
	 * */
    openTransferSubDb : function(id,dbType,dbid,selectIdArr,callBack,isMultiSelect,sortCol,sortOrder)
    {
        var initParam =
            {
                dbType:dbType,
                dbid:dbid,
                selectIdArr:selectIdArr,
                multiSelect:isMultiSelect,
                language	: this.language
            }
        if(!WebUtil.isNull(selectIdArr))
        {
            initParam.selectIdArr = selectIdArr;
        }
        if(!WebUtil.isNull(dbid))
        {
            initParam.dbid = dbid;
        }
        var param =
            {
                title:this.language.SubDbConfig,
                page:"/jsp/abis/db/logic_db_config.jsp",
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
        var subDbDialog = new WebWindow(id,param);
        return subDbDialog;
    }
}
