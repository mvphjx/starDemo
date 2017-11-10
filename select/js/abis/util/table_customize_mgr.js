/*
 * 所谓自定义表格管理是:只负责数据检索以及页码实现，不负责具体表格的实现
 * 	参数格式:
			{
				tblName:"tablename",
				cols:"col1,col2",
				url:"",
				orderCol:"colname",
				pageBarId:"id",
				pageSize:"number",
				callBack:{onClick:selectItem},
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true|false,
				link:{cols:["CARD_NUM"],callBack:clickLink}
				invoke:回调函数
			}
*/
function TableCustomizeMgr(param)
{
	this.param = param;
	this.init();
}

TableCustomizeMgr.prototype.init = function()
{
	var setting = 
	{
		callBack	: this.param.callBack,
		sort		: this.param.sort,
		multiSelect	: this.param.multiSelect,
		link		: this.param.link,
		pageBarId	: this.param.pageBarId
	};
	
	this.pageBar = null;
	this.search(1,true);
}

/** 更改显示列时候调用 */
TableCustomizeMgr.prototype.setColumn = function(columns)
{
	
}

/** 设置常规检索条件参数 */
TableCustomizeMgr.prototype.setQryParam = function(where)
{
	this.qryParam.where = where;
	this.isQryCnt = true;
	this.qryParam.curPage = 1;
}

/** 设置高级检索条件 */
TableCustomizeMgr.prototype.setAdvQryParam = function(advWhere)
{
	this.qryParam.advWhere = advWhere;
	this.isQryCnt = true;
	this.qryParam.curPage = 1;
}
/** 设置通用检索xml */
TableCustomizeMgr.prototype.setXml = function(xml)
{
	this.qryParam.xml = xml;
	this.isQryCnt = true;
	this.qryParam.curPage = 1;
}

/** 检索数据 */
TableCustomizeMgr.prototype.search = function(curPage,isQryCnt)
{
	this.curPage 	= curPage;
	this.isQryCnt 	= isQryCnt;
	var pageCnt 	= null;
	if(this.pageBar != null)
	{
		pageCnt = this.pageBar.getPageCnt();
	}
	this.qryParam = 
	{
		tblName		: this.param.tblName,
		colList		: this.param.cols,
		curPage		: this.curPage,
		where		: null,
		advWhere	: null,
		pageSize	: this.param.pageSize,
		order		: 1,
		orderCol	: this.param.order,
		qryCnt		: true,
		xml 		: null
	};
	if(pageCnt == null)
	{
		this.qryParam.qryCnt = true;
	}
	this.refresh();
}

/** 刷新 */
TableCustomizeMgr.prototype.refresh = function()
{
	var jsonData = $.toJSON(this.qryParam);
 	var nThis = this;
 	jQuery.ajax( 
		        {
					type : 'POST',
					contentType : 'application/json',
					url : this.param.url,
					data : jsonData,
					dataType : 'json',
					success : function(data) 
					{   
						if(WebUtil.isFunction(nThis.param.invoke))
						{
							nThis.param.invoke(data);
						}
						if(!WebUtil.isNull(data.pageCount))
						{
							if(nThis.pageBar == null)
							{
								nThis.pageBar = new WebTablePageNumber(nThis.param.pageBarId,pageClick,nThis.param.language);
							}
							if(nThis.isQryCnt == true)
							{
								if(data.recordCount > nThis.qryParam.pageSize) //如果大于设置的显示数才显示分页
								{
									nThis.pageBar.setPageCnt(data.pageCount,data.pageSize);
									nThis.pageBar.show();
								}
								else
								{
									nThis.pageBar.hide();
								}
                                nThis.pageBar.setRecordCnt(data.recordCount);
							}
							if (typeof(FooterHelper) != "undefined")
							{
								FooterHelper.refresh();
							}
						}
					},   
					error : function(e) 
					{   
						window.open(WebVar.VarPath+"/login","_self");
					}   
				});
 	function pageClick(pid,curPage)
 	{
 		nThis.search(curPage, false);
 	}
}