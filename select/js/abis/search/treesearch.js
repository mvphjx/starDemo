
TreeSearch.prototype.searchTxt	= null;
TreeSearch.prototype.result 	= null;
TreeSearch.prototype.pageSize	= null;
TreeSearch.prototype.pageCnt	= null;
TreeSearch.prototype.pageBarLan	= null;
TreeSearch.prototype.pageBar 	= null;
TreeSearch.prototype.curPage 	= null;
TreeSearch.prototype.selectData 	= -1;
TreeSearch.prototype.textDBListUI	= null;



function TreeSearch(searchTxt,result,pageCnt,pageSize,curPage,pageBarLan, textDBListUI)
{
	this.searchTxt	= searchTxt;
	this.result 	= result;
	this.pageCnt	= pageCnt;
	this.pageSize	= pageSize;
	this.curPage	= curPage;
	this.pageBarLan = pageBarLan;
	this.textDBListUI = textDBListUI;
	this.init();
}

TreeSearch.prototype.init = function()
{
	this.initUI();
	this.initResult();
}

TreeSearch.prototype.initUI = function()
{
	var nThis = this;
	
	$("#SearchArea").hide();
	$("input[name='RexsTxt']").val(this.searchTxt);
	$("input[name='RexsTxt']").keyup
	(
		function(e)
		{
			if(e.keyCode == 13)
			{
				nThis.search();
			}
		}
	);
	

	function func()
	{
		
	}

	WebUI.createWebButton("SeniorSearchButton",WebUI.BntType.B_100_32,null,func);
	WebUI.createWebButton("TextDBSelectAll",WebUI.BntType.B_60_24,null,func);
	WebUI.createWebButton("TextDBReverseSelect",WebUI.BntType.B_60_24,null,func);
	WebUI.createWebButton("TextDBClearSelect",WebUI.BntType.B_60_24,null,func);

	$("#SeniorSearchButton").mouseup
	(
		function()
		{
			nThis.search();
		}
	);

	$("#TextDBSelectAll").mouseup
	(
		function()
		{
			nThis.textDBListUI.setAllSelected(true);
		}
	);

	$("#TextDBReverseSelect").mouseup
	(
		function()
		{
			nThis.textDBListUI.setInverse();
		}
	);

	$("#TextDBClearSelect").mouseup
	(
		function()
		{
			nThis.textDBListUI.setAllSelected(false);
		}
	);
	/*

	function textDBSelectAll()
	{
		nThis.textDBListUI.setAllSelected(true);
	}
	
	function textDBClearAll()
	{
		nThis.textDBListUI.setAllSelected(false);
	}
	
	function textDBReverseSelect()
	{
		nThis.textDBListUI.setInverse();
	}
	*/
}


TreeSearch.prototype.setSelectData = function(selectData)
{
	this.selectData = selectData;
}

TreeSearch.prototype.buildSelectDBs = function(dbListUI)
{
	var selectDBName = dbListUI.getSelectData();
	
	if ( WebUtil.isNull(selectDBName) )
	{
		return;
	}
	
	var selectData = "";
	
	for(var s in selectDBName)
	{
		if ( selectData.length>0 ) selectData += ",";
		selectData += selectDBName[s].id;
	}
	return	WebUtil.urlEncode(selectData);
}

TreeSearch.prototype.search = function()
{
	var v = $("input[name='RexsTxt']").val();
	if ( WebUtil.isNull(v) )
	{
		return;
	}

	v = WebUtil.urlEncode(v);
	
	this.selectData = this.buildSelectDBs(this.textDBListUI);
	
	var url = WebVar.VarPath + "/search/senior/"  + v + "?tbl=" + this.selectData;
	window.open(url,"_self");
}

TreeSearch.prototype.treeSearch = function(data)
{
	var treeData 	= "";
	if(!WebUtil.isNull(data))
	{
		treeData += data + ",";
		treeData += treeData.substring(0,treeData.length - 1);
	}
	else
	{
		return;
	}
	var v = $("input[name='RexsTxt']").val();
	if(WebUtil.isNull(v)) return;
	v = WebUtil.urlEncode(v);
	var url = WebVar.VarPath + "/search/treesch/"  + v + "/" + data;
	window.open(url,"_blank");
}

TreeSearch.prototype.initResult = function()
{
	this.clear();
	
	var $content = $("#SearchResult");
	
	if(!WebUtil.isEmpty(this.result)) 
	{
		var res = this.result[0];
		for(var j=0;j<res.records.length;j++)
		{
			var row = res.records[j];
			var div = $("<div></div>");
			div.addClass("Content");
			div.addClass("M_Left_30");
			div.addClass("M_Top_20");
			$content.append(div);
			div.html(row.fmtTxt);
		}
		
		var nThis = this;
		function pageClick(pid,curPage)
		{
			var v = $("input[name='RexsTxt']").val();
			v = WebUtil.urlEncode(v);
			var tempSelectedDB = nThis.buildSelectDBs(nThis.textDBListUI);
			var url = WebVar.VarPath + "/search/senior/"  + v + "?tbl=" + tempSelectedDB+"&pi="+curPage;
			window.open(url,"_self");
		}
		
		if(res.recordCnt > res.curCnt)
		{
			if(this.pageBar == null)
			{
				var param = {};
				param.showResCnt = false;
				this.pageBar = new WebTablePageNumber("PageCoder", pageClick, this.pageBarLan,false,param);
			}
			this.pageBar.setPageCnt(this.pageCnt,this.pageSize);
			if(this.curPage > 1)
			{
				this.pageBar.switchPageNum(this.curPage);
			}
			this.pageBar.show();
		}
		else
		{
			if(this.pageBar != null)
			{
				this.pageBar.hide();
			}
		}
	}
	else
	{
		var div = $("<div></div>");
		div.addClass("Content");
		div.addClass("M_Left_30");
		div.addClass("M_Top_5");
		div.html(AbisMessageResource["NotFindOutAbout"] + " <b>" + this.searchTxt + "</b> "+ AbisMessageResource["RelevantInfo"]);
		$content.append(div);
	}
}

TreeSearch.prototype.clear = function()
{
	var childs = $("#SearchResult").find("div");
	for(var i=0;i<childs.length;i++)
	{
		var div = childs[i];
		$(div).remove();
	}
}