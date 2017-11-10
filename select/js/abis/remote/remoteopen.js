
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
	setLanguage: function(language)
	{
		this.language = language;
	},
	openTPCard:function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder)
	{
		var initParam =
		{
			tableName	: "MATCH_PART_FOR_RMT_CLIENT",
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
			page		: "/jsp/abis/remoteconfig/remoteadd.jsp",
			initData	: initParam,
			call		: {init:"initPage",set:"setData",get:"getSelectItem"},
			callBack	: {ok:callBack},
			language	: this.language
		};
		var window = new WebWindow(id,param);
		return window;
	},
	openAdd : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder,butText)
	{
		this.language.OK = butText;
		var initParam = 
		{
			tableName:"MATCH_PARTITION",
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
			title:this.language.AddRemoteServerComparison,
			page:"/jsp/abis/remoteconfig/remoteadd.jsp",
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
	openDBAdd : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder,butText)
	{
		this.language.OK = butText;
		var initParam = 
		{
			tableName:"DB_CATLOG",
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
			title:this.language.AddRemoteServerDataBase,
			page:"/jsp/abis/remoteconfig/remoteDBadd.jsp",
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
	openUnitCode : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder,butText)
	{
		this.language.OK = butText;
		var initParam = 
		{
			tableName:"ACCESSABLE_REMOTE_TERMINAL",
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
			title:this.language.PersonUnitName,
			page:"/jsp/abis/remoteconfig/remoteunitcode.jsp",
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
	//候选列表
    openCand : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder,title)
    {
        var initParam =
            {
                tableName:"QRY_CAND",
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
                page:"/jsp/abis/expanalysis/choosecandtable.jsp",
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
    openCandTask : function(id,dbid,where,callBack,isMultiSelect,sortCol,sortOrder,butText)
    {
    	var okval = this.language.OK;
        this.language.OK = butText;
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
        this.language.OK = okval;
        return matchDialog;
    },
    openCardsTL : function(id,dbid,where,dbTypes,callBack,isMultiSelect,sortCol,sortOrder)
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
}
