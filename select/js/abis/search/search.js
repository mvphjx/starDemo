
Search.prototype.searchTxt	= null;
Search.prototype.result 	= null;
Search.prototype.pageSize	= null;
Search.prototype.pageCnt	= null;
Search.prototype.pageBarLan	= null;
Search.prototype.pageBar 	= null;
Search.prototype.curPage 	= null;

function Search(searchTxt,result,pageCnt,pageSize,curPage,pageBarLan)
{
	this.searchTxt	= searchTxt;
	this.result 	= result;
	this.pageCnt	= pageCnt;
	this.pageSize	= pageSize;
	this.curPage	= curPage;
	this.pageBarLan = pageBarLan;
	this.init();
}

Search.prototype.init = function()
{
	this.initUI();
	this.initResult();
}

Search.prototype.initUI = function()
{
	var nThis = this;
	
	$("#SearchArea").hide();
	$("input[name='RexTxt']").val(this.searchTxt);
	$("input[name='RexTxt']").keyup
	(
		function(e)
		{
			if(e.keyCode == 13)
			{
				nThis.search();
			}
		}
	);
	
	$("#SearchButton").mouseup
	(
		function()
		{
			nThis.search();
		}
	);
	WebUI.createWebButton("SearchButton",WebUI.BntType.B_100_32,null,func);
	WebUI.createWebButton("HSearchButton",WebUI.BntType.B_100_32,null,HSearch);
	WebUI.createWebButton("SeniorSearchButton",WebUI.BntType.B_100_32,null,func);
	function func()
	{
		
	}
	
	function SeniorSearch()
	{
	}
	
	function HSearch()
	{
		var v = $("input[name='RexTxt']").val();
		if(WebUtil.isNull(v)) return;
		v = WebUtil.urlEncode(v);
		window.open(WebVar.VarPath + "/search/senior/" + v,"_blank");
	}
}

Search.prototype.search = function()
{
	var v = $("input[name='RexTxt']").val();
	if(WebUtil.isNull(v)) return;
	v = WebUtil.urlEncode(v);
	var url = WebVar.VarPath + "/search/" + v;
	window.open(url,"_self");
}

Search.prototype.initResult = function()
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
			var v = $("input[name='RexTxt']").val();
			v = WebUtil.urlEncode(v);
			var url = WebVar.VarPath + "/search/" + v +"/" + nThis.pageSize + "/" + curPage;
			window.open(url,"_self");
		}
		
		if(res.recordCnt > res.curCnt)
		{
			if(this.pageBar == null)
			{
				var param = {};
				param.showResCnt = false;
				this.pageBar = new WebTablePageNumber("PageCoder",pageClick,this.pageBarLan,false,param);
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

Search.prototype.clear = function()
{
	var childs = $("#SearchResult").find("div");
	for(var i=0;i<childs.length;i++)
	{
		var div = childs[i];
		$(div).remove();
	}
}