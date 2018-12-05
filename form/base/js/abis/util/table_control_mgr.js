/**
	负责数据检索、页码实现、和表格数据管理
	参数格式:
	{
		tblId		: 表格ID,
		tblName		: 表名,
		cols		: col1[,col2...],
		url			: 访问地址,
		orderCol	: 列名,
		order		: 0|1,
		pageSize	: 每页多少条,
		where		: [{colName:列名,dataType:类型(@see ABISCode.StorageDataType),value1:值},...]
		pageBarId	: "页码ID",
		callBack	: {onClick:selectItem},
		sort		: {colName:列名,order:WebTable.DES},
		multiSelect	: true|false,
		link		: {cols:["CARD_NUM"],callBack:clickLink},
		statuscolor	: true|false(默认false),
		menu		: {}
	}
*/

function TableControlMgr(param)
{
	this.param = param;
	this.initTable();
	this.initForm();

}

TableControlMgr.prototype.initTable = function()
{
	var setting = 
	{
		callBack	: this.param.callBack,
		sort		: this.param.sort,
		multiSelect	: this.param.multiSelect,
		link		: this.param.link,
		pageBarId	: this.param.pageBarId,
		menu		: this.param.menu,
		order		: this.param.order,
		isCheck		: this.param.isCheck
	};
	this.table = new WebTable(this.param.tblId,setting);
	//根据查询结果  决定生成 页码组件
	this.pageBar = null;
	this.search(1,true);
	//设置表格  自动出现滚动条
	//overflow: auto; overflow-y:auto;
	var tblId = $('#'+this.param.tblId)
	if(typeof tblId != 'undefined'  && typeof  tblId.parent() !='undefined') {
		tblId.parent().css('overflow', 'auto').css('overflow-y', 'auto');
	}
}

/**
 * 以下方法为导出excel服务提供参数
 */
TableControlMgr.prototype.setSearchColsValues =function(colsvalues)
{
	$("input[name='colsvalues']").val(colsvalues);
}

TableControlMgr.prototype.getTable = function()
{
	return this.table;
}

/** 
 * 更改显示列时候调用 
 */
TableControlMgr.prototype.setColumn=function(columns)
{
	
}

/** 设置常规检索条件参数 */
TableControlMgr.prototype.setQryParam = function(where)
{
	this.qryParam.where 	= where;
	this.param.where		= where;
	this.isQryCnt 			= true;
	this.qryParam.curPage 	= 1;
}

/** 设置高级检索条件 */
TableControlMgr.prototype.setAdvQryParam = function(advWhere)
{
	this.qryParam.advWhere = advWhere;
	this.isQryCnt = true;
	this.qryParam.curPage = 1;
}

/** 检索数据 */
TableControlMgr.prototype.search = function(curPage,isQryCnt)
{
	this.curPage 	= curPage;
	this.isQryCnt 	= isQryCnt;
	var pageCnt 	= null;
	
	if(this.pageBar != null)
	{
		pageCnt = this.pageBar.getPageCnt();
	}
	
	var pageSize = 30;
	if(!WebUtil.isNull(this.param.pageSize))
	{
		pageSize = parseInt(this.param.pageSize);
	}
	
	this.qryParam = 
	{
		tblName		: this.param.tblName,
		colList		: this.param.cols,
		curPage		: curPage,
		initWhere	: this.param.initWhere,
		where		: this.param.where,
		advWhere	: null,
		pageSize	: pageSize,
		order		: this.param.order,
		orderCol	: this.param.orderCol,
		qryCnt		: true
	};
	if(pageCnt == null)
	{
		this.qryParam.qryCnt = true;
	}
	this.refresh();
}

/** 刷新 */
TableControlMgr.prototype.refresh = function(invoke,delay)
{
	var jsonData = $.toJSON(this.qryParam);
 	var nThis = this;
 	nThis.table.wait();
 	jQuery.ajax( 
		        {
					type : 'POST',
					contentType : 'application/json',
					url : this.param.url,
					data : jsonData,
					dataType : 'json',
					success : function(data) 
					{
						nThis.table.waitstop();
						nThis.table.setInput(data.tblData);
						if(WebUtil.isFunction(invoke))
						{
							if(WebUtil.isNumber(delay))
							{
								setTimeout(invoke,delay);
							}
							else
							{
								invoke();
							}
						}
						if(!WebUtil.isNull(data.pageCount))
						{
							if(nThis.pageBar == null)
							{
								nThis.pageBar = new WebTablePageNumber(nThis.param.pageBarId,pageClick,nThis.param.language,nThis.param.statuscolor);
								var n = Math.ceil(data.recordCount / nThis.qryParam.pageSize);
								var b = 1;
								while(n > 10)
								{
									n = n / 10;
									b++;
								}
								if(b == 1) b = 2;
								var width = (b * 10) + 4;
								nThis.pageBar.setPageCoderBntWidth(width);
							}
							nThis.pageBar.setRecordCnt(data.recordCount);
							
							if(nThis.isQryCnt == true)
							{
								if(data.recordCount > nThis.qryParam.pageSize) //如果大于设置的显示数才显示分页
								{
									nThis.pageBar.setPageCnt(data.pageCount,data.pageSize);
									if(!nThis.pageBar.isVisible())
									{
										var tbFrame = $("#"+nThis.param.tblId);
										if(tbFrame.css("overflow") == "auto")
										{
											var h = nThis.table.getHeight();
											h -= 30;
											nThis.table.setHeight(h);
										}
									}
									nThis.pageBar.show();
								}
								else
								{
									if(nThis.pageBar.isVisible())
									{
										var tbFrame = $("#"+nThis.param.tblId);
										if(tbFrame.css("overflow") == "auto")
										{
											var h = nThis.table.getHeight();
											h += 30;
											nThis.table.setHeight(h);
										}
									}
									nThis.pageBar.hide();
								}
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

/**
 * 创建一个表单，用于提交导出excel的参数，导出excel
 * colsvalues:由WebSearchMgr提供的检索条件
 * tablename：表名
 * pagesize：单页导出的数据量
 * curpage：当前页  应该提供一个参数用于确定 1.只导出当前页 2.导出开始页到当前页的数据 3.导出所有的数据
 * showcols：导出的列，前面通过一个对话框选取需要导出的列
 */
TableControlMgr.prototype.initForm = function()
{
	if(this.param.pageSize == undefined || this.param.pageSize == 0)
	{
		this.param.pageSize = 30;
	}
	var form = "<form id='exportForm' style='display:none' action='" + WebVar.VarPath + "/util/exporttable/'>" +
	"<input name='ids' type='hidden' value=''></input>" +
	"<input name='cols' type='hidden' value=''></input>" +
	"<input name='tableName' type='hidden' value='" + this.param.tblName + "'></input>"+
	"<input name='orderName' type='hidden' value=''></input>" +
	"<input name='order' type='hidden' value=''></input>" +
	"<input name='key' type='hidden' value=''></input>" +
	"</form>"
	$("#" + this.param.tblId).append(form);
}


/**
 * 导出表格对话框
 */
TableControlMgr.prototype.exportDialog = function(key)
{
	if(key == null)
	{
		key = "ID";
	}
	var ids = new Array();
	var rows = this.table.getSelectItems();
	for(var i in rows)
	{
		var row = rows[i];
		var id = row[key];
		ids.push(id);
	}
	var idsStr = WebArrayUtil.join(ids,",");
	
	var cols = this.table.getShowCols();
	var colsStr = WebArrayUtil.join(cols,",");
	
	$("input[name='ids']").val(idsStr);
	$("input[name='cols']").val(colsStr);
	$("input[name='orderName']").val(this.table.getOrderName());
	$("input[name='order']").val(this.table.getOrder());
	$("input[name='key']").val(key);
	$("#exportForm").submit();
}

