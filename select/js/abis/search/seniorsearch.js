
Seniorsearch.prototype.searchTxt	= null;
Seniorsearch.prototype.result 	= null;
Seniorsearch.prototype.pageSize	= null;
Seniorsearch.prototype.pageCnt	= null;
Seniorsearch.prototype.pageBarLan	= null;
Seniorsearch.prototype.pageBar 	= null;
Seniorsearch.prototype.curPage 	= null;
Seniorsearch.prototype.selectData 	= -1;
Seniorsearch.prototype.textDBListUI	= null;



function Seniorsearch(searchTxt,result,pageCnt,pageSize,curPage,pageBarLan, textDBListUI)
{
	this.searchTxt	= searchTxt;
	this.result 	= result;
	this.pageCnt	= pageCnt;
	this.pageSize	= pageSize;
	this.curPage	= curPage;
	this.pageBarLan = pageBarLan;
	this.textDBListUI = textDBListUI;
//	this.init();
}

Seniorsearch.prototype.init = function()
{
	this.initUI();
	this.initResult(null, true);
}

Seniorsearch.prototype.initUI = function()
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


Seniorsearch.prototype.setSelectData = function(selectData)
{
	this.selectData = selectData;
}

Seniorsearch.prototype.buildSelectDBs = function(dbListUI)
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

Seniorsearch.prototype.search = function()
{
	var v = $("input[name='RexsTxt']").val();
	if ( WebUtil.isNull(v) )
	{
		return;
	}

	v = WebUtil.urlEncode(v);
	
	this.selectData = this.buildSelectDBs(this.textDBListUI);
	if(!this.selectData){
		DialogUtil.openSimpleDialog(AbisMessageResource.Alert.PleaseAtLeastSelectOne);
		return;
	}
	
	
	var url = WebVar.VarPath + "/search/senior/"  + v + "?tbl=" + this.selectData;
	window.open(url,"_self");
}

Seniorsearch.prototype.pageSearch = function(pageIndex)
{
	var v = $("input[name='RexsTxt']").val();
	if ( WebUtil.isNull(v) )
	{
		return;
	}

	v = WebUtil.urlEncode(v);
	
	this.selectData = this.buildSelectDBs(this.textDBListUI);
	
	var url = WebVar.VarPath + "/search/treesch/"  + v + "/" + this.selectData+"/"+pageIndex;
	var	req;
	
	if ( window.XMLHttpRequest ) 
	{
		req = new XMLHttpRequest();
	}
	else if ( window.ActiveXObject )
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else return;
	req.open("GET", url, false);
	req.send(null);
	this.result = req.responseText;
	this.result = eval(this.result);
	this.curPage = pageIndex;
	this.initResult(this.selectData, false);
}

Seniorsearch.prototype.treeSearch = function(data, pageIndex, initPageSelector)
{
	if ( WebUtil.isNull(data) ) return;
	var v = $("input[name='RexsTxt']").val();
	if(WebUtil.isNull(v)) return;
	
	v = WebUtil.urlEncode(v);
	var url = WebVar.VarPath + "/search/treesch/"  + v + "/" + data+"/"+pageIndex;
	var	req;
	
	if ( window.XMLHttpRequest ) 
	{
		req = new XMLHttpRequest();
	}
	else if ( window.ActiveXObject )
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else return;
	req.open("GET", url, false);
	req.send(null);
	this.result = req.responseText;
//	alert(req.readyState);
	this.result = eval(this.result);
	this.curPage = pageIndex;
	if ( initPageSelector )
	{
		if ( this.pageBar != null )
		{
			this.pageBar.hide();
			delete this.pageBar;
			this.pageBar = null;
		}		
	}
	this.initResult(data, initPageSelector);
//	window.open(url,"_blank");
}

Seniorsearch.prototype.initResult = function(treeItemId, initPageSelector)
{
	this.clear(initPageSelector);
	
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
//			var v = $("input[name='RexsTxt']").val();
//			v = WebUtil.urlEncode(v);
//			var tempSelectedDB = nThis.buildSelectDBs(nThis.textDBListUI);
//			var url = WebVar.VarPath + "/search/senior/"  + v + "?tbl=" + tempSelectedDB+"&pi="+curPage;
//			window.open(url,"_self");
			nThis.pageSearch(curPage);
		}
		
		function	treePageClick(pid, curPage)
		{
			nThis.treeSearch(treeItemId, curPage, false);
		}
		
		var pageClickFunc = WebUtil.isNull(treeItemId)?pageClick:treePageClick;
		
//		if ( this.pageBar != null && curPage == 1 ) delete this.pageBar;
		
		if(res.recordCnt > this.pageSize)
		{
			if(this.pageBar == null)
			{
				var param = {};
				param.showResCnt = false;
				this.pageBar = new WebTablePageNumber("PageCoder", pageClickFunc, this.pageBarLan,false,param);
			}
			this.pageCnt = Math.ceil(res.recordCnt/this.pageSize);
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

Seniorsearch.prototype.clear = function(initPageSelector)
{
	var childs = $("#SearchResult").find("div");
	for(var i=0;i<childs.length;i++)
	{
		var div = childs[i];
		$(div).remove();
	}
	if ( initPageSelector )
	{
		childs = $("#PageCoder").find("div");
		for(var i=0;i<childs.length;i++)
		{
			var div = childs[i];
			$(div).remove();
		}		
	}
}