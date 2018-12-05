

WebTablePageNumber.prototype.pageCoderBntCnt 	= 7;
WebTablePageNumber.prototype.pageCoderBntWidth 	= 24;

function WebTablePageNumber(pid, invoke, language, isBg, param)
{
	this.pid 		= pid;
	this.invoke 	= invoke;
	this.language 	= language;
	this.isBg		= isBg;
	this.visible	= true;
	this.param		= param;
	this.init();
}

WebTablePageNumber.prototype.init = function()
{
	this.page 	= $("#" + this.pid);
	this.bg		= $("<div></div>");

	if(this.isBg == true)
	{
		this.bg.addClass("PageBg");
	}
	
	this.page.append(this.bg);
	
	if(this.param == null || this.param.showResCnt == true)
	{
		this.resCnt		= $("<div class=\"RecordCnt\"></div");
		this.bg.append(this.resCnt);
	}
	this.pageBar 	= $("<div class=\"PageBar\"></div");
	this.bg.append(this.pageBar);
	
}

WebTablePageNumber.prototype.show = function()
{
	this.page.show();
	this.page.height(30);
	this.visible = true;
}

WebTablePageNumber.prototype.hide = function()
{
	this.page.hide();
	this.page.height(0);
	this.visible = false;
}

WebTablePageNumber.prototype.isVisible = function()
{
	return this.visible;
}

WebTablePageNumber.prototype.setSelectChangeListener = function(listener)
{
	this.invoke = listener;
}

WebTablePageNumber.prototype.getCurPage = function()
{
	return this.curPage;
}

/**
 * 获取总页数
 */
WebTablePageNumber.prototype.getPageCnt = function()
{
	return this.pageCnt;
}

WebTablePageNumber.prototype.setRecordCnt = function(recCnt)
{
	if(this.resCnt != null)
	{
		this.resCnt.html(""+this.language.TotalRecords+":"+ recCnt);
	}
}


/**
 * 根据页码总数初始化界面
 * @param {Object} pageCnt 页码总数
 */
WebTablePageNumber.prototype.setPageCnt = function(pageCnt, pageSize)
{
	var $children = this.pageBar.children();
	$children.each
	(
		function(i)
		{
			$(this).remove();
		}
	);
	
	//首页  前一页 1 2 3 4 5 6 7 后一页 末页  到___页 共7页 30条/页
	this.pageCnt = parseInt(pageCnt);
	this.curPage = 1;
	//首页
	var firstPageTxt 	= "";
	var nextPageTxt 	= "";
	var prevPageTxt 	= "";
	var lastPageTxt 	= "";
	var toTxt			= "";
	var totalPageTxt	= "";
	var pageTxt			= "";
	var recordsPageTxt 	= "";
	if(this.language != null)
	{
		firstPageTxt 	= this.language.FirstPage;
		nextPageTxt 	= this.language.NextPage;
		prevPageTxt 	= this.language.PreviousPage;
		lastPageTxt 	= this.language.LastPage;
		toTxt			= this.language.To;
		totalPageTxt	= this.language.TotalPage;
		pageTxt			= this.language.Page;
		recordsPageTxt 	= this.language.RecordsPage;
		pagejump		= this.language.webpage_jump;
	}
	
	var $firstPage = $("<div  class=\"PageCodeBnt CtrlBntSize BntNormal\">"+ firstPageTxt +"</div>");
	$firstPage.attr("type", "first");
	this.registerButton($firstPage);
	this.pageBar.append($firstPage);

	//前一页
	var $prevPage = $("<div  class=\"PageCodeBnt CtrlBntSize BntNormal\">" + prevPageTxt + "</div>");
	$prevPage.attr("type", "prev");
	this.registerButton($prevPage);
	this.pageBar.append($prevPage);

	var $pageCode;
	var pageCount = this.pageCnt;
	if (this.pageCnt > this.pageCoderBntCnt)
	{
		pageCount = this.pageCoderBntCnt;
	}
	for ( var i = 1; i <= pageCount; i++)
	{
		$pageCode = $("<div  class=\"PageCodeBnt PagingBntSize\"></div>");
		if (i == this.curPage)
		{
			$pageCode.addClass("BntSelect");
		}
		else
		{
			$pageCode.addClass("BntNormal");
		}
		$pageCode.html(i);
		$pageCode.attr("id", this.pid + "_" + i);
		$pageCode.attr("type", "code");
		$pageCode.attr("page", i);
		$pageCode.bind("selectstart",function(){return false});
		$pageCode.css("width",this.pageCoderBntWidth + "px");
		this.registerButton($pageCode);
		this.pageBar.append($pageCode);
		if (i > this.pageCoderBntCnt - 1)
		{
			break;
		}
	}

	var $nextPage = $("<div  class=\"PageCodeBnt CtrlBntSize BntNormal\">" + nextPageTxt + "</div>");
	$nextPage.attr("type", "next");
	this.registerButton($nextPage);
	this.pageBar.append($nextPage);

	var $lastPage = $("<div  class=\"PageCodeBnt CtrlBntSize BntNormal\">" + lastPageTxt + "</div>");
	$lastPage.attr("type", "last");
	this.registerButton($lastPage);
	this.pageBar.append($lastPage);

	var $pageCount = $("<div class=\"PageCntLab\"></div>");
	var txt = WebUtil.formatTxt(totalPageTxt,this.pageCnt);
	txt += " ";
	txt += toTxt;
	$pageCount.html(txt);
	this.pageBar.append($pageCount);
	
	var $turnTxt = $("<input type=\"text\" class=\"TurnTxt\"/>");
	var txtId = this.pid + "_TurnTxt";
	$turnTxt.attr("id", txtId);
	this.pageBar.append($turnTxt);
	
		
	$turnTxt.focus(function()
	{
		$(this).addClass("TurnTxtSelect");
	});
	$turnTxt.blur(function()
	{
		$(this).removeClass("TurnTxtSelect");
	});
	var thisObj = this;
	$turnTxt.keydown(function(e)
	{
		/* 回车 */
		if (e.keyCode == 13)
		{
			$(this).blur();
			thisObj.forwardPage();
			return;
		}
		
		/*退格和删除 */
		if (e.keyCode == 46 || e.keyCode == 8 ) { return; }
		
		/* 左右光标 */
		if (e.keyCode == 39 || e.keyCode == 37) { return; }

		var keyCode = e.keyCode;
		
		/* 数字 */
		if (( (keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57)))
		{
			if (keyCode >= 96 && keyCode <= 105)
			{
				keyCode -= 48;
			}

			var txtId = $turnTxt.attr("id");
			var txt = document.getElementById(txtId);

			var range = document.selection.createRange();
			range.setEndPoint("StartToStart", txt.createTextRange());
			var pos = range.text.length;

			range = document.selection.createRange();
			var selectLen = range.text.length;
			var startIndex = pos;
			if (selectLen > 0)
			{
				startIndex = pos - selectLen;
			}
			var word = $(this).val();
			var startStr = word.slice(0, startIndex);
			var endStr = word.slice(pos, word.length);
			var newChar = String.fromCharCode(keyCode);
			var newStr = startStr + newChar + endStr;
			var newValue = parseInt(newStr);
			//获取光标左右的内容 加上新的字符 拼接之后进行验证
			if (newValue < 1 || newValue > thisObj.pageCnt)
			{
				e.preventDefault();
				return;
			}
			return;
		}
		e.preventDefault();
	});
	
	//页码标签
	var $Lablepage = $("<div class=\"PageCntLab\"></div>");
	$Lablepage.html(" "+pageTxt+" ");
	this.pageBar.append($Lablepage);		
	
//	var $pageBnt = $("<div class=\"PageBnt ToPageBntWidth\">"+ pagejump +"</div>");
//	this.registerPageNumBnt($pageBnt);
//	this.pageBar.append($pageBnt);

	//每页条数
	var $pageSize = $("<div class=\"PageSize\"></div>");
	$pageSize.html(pageSize + recordsPageTxt);
	this.pageBar.append($pageSize);
}

WebTablePageNumber.prototype.registerPageNumBnt = function($pageBnt)
{
	var thisObj = this;
	$pageBnt.mouseover(function()
	{
		$(this).addClass("PageBntSelect");
	});
	$pageBnt.mouseout(function()
	{
		$(this).removeClass("PageBntSelect");
	});
	$pageBnt.click(function()
	{
		thisObj.forwardPage();
	});
}

WebTablePageNumber.prototype.switchPageNum = function(pageNum)
{
	if (WebUtil.isNull(pageNum)) return; 
	if (pageNum == this.curPage) return; 

	var pageCount = this.pageCnt;
	var index = "_1";
	if (this.pageCnt > this.pageCoderBntCnt)
	{
		pageCount = this.pageCoderBntCnt;
	}
	else
	{
		index = "_" + pageNum;
	}
	var $pageBnt = $("#" + this.pid + index);
	$pageBnt.attr("page", pageNum);
	this.choosePage($pageBnt,false);
}

WebTablePageNumber.prototype.forwardPage = function()
{
	var txtId = this.pid + "_TurnTxt";
	var pageNum = $("#" + txtId).val();
	if (WebUtil.isNull(pageNum)) { return; }
	if (pageNum == this.curPage) { return; }
	if (WebUtil.isNull(this.invoke)) { return; }
	var pageCount = this.pageCnt;
	var index = "_1";
	if (this.pageCnt > this.pageCoderBntCnt)
	{
		pageCount = this.pageCoderBntCnt;
	}
	else
	{
		index = "_" + pageNum;
	}
	var $pageBnt = $("#" + this.pid + index);
	$pageBnt.attr("page", pageNum);
	this.choosePage($pageBnt,true);
}

/**
 * 注册页码按钮事件
 */
WebTablePageNumber.prototype.registerButton = function($bnt)
{
	var thisObj = this;
	$bnt.mouseover(function()
	{
		var css = $(this).attr("class");
		var page = $(this).attr("page");
		if (thisObj.curPage == page) { return; }
		$(this).removeClass("BntNormal");
		$(this).addClass("BntHover");
	});
	$bnt.mouseout(function()
	{
		var css = $(this).attr("class");
		var page = $(this).attr("page");
		if (thisObj.curPage == page) { return; }
		$(this).removeClass("BntHover");
		$(this).addClass("BntNormal");
	});
	$bnt.click(function(e)
	{
		thisObj.choosePage($bnt,true);
	});
}

/**
 * 验证点击的页码以及回调外界(外界禁止调用)
 */
WebTablePageNumber.prototype.choosePage = function($bnt,isInvoke)
{
	if (this.invoke == null) { return; }
	var type = $bnt.attr("type");
	var clickBntIndex = null;
	switch (type)
	{
		case "first":
			if (this.curPage == 1) { return; }
			this.curPage = 1;
			break;
		case "prev":
			var pageNum = this.curPage - 1;
			if (pageNum < 1)
			{
				pageNum = 1;
			}
			if (pageNum >= this.pageCnt)
			{
				pageNum = this.pageCnt;
			}
			if (pageNum == this.curPage) { return; }
			this.curPage = parseInt(pageNum);
			break;
		case "next":
			var pageNum = parseInt(this.curPage) + 1;
			if (pageNum < 1)
			{
				pageNum = 1;
			}
			if (pageNum > this.pageCnt)
			{
				pageNum = this.pageCnt;
			}
			if (pageNum == this.curPage) { return; }
			this.curPage = parseInt(pageNum);
			break;
		case "last":
			if (this.curPage == this.pageCnt) { return; }
			this.curPage = this.pageCnt;
			break;
		case "code":
			var page = $bnt.attr("page");
			if (page == this.curPage) { return; }
			this.curPage = parseInt(page);

			//计算点击页码按钮的索引
			var pageCount = this.pageCnt > this.pageCoderBntCnt ? this.pageCoderBntCnt : this.pageCnt;
			for ( var i = 1; i <= pageCount; i++)
			{
				var $bnt = $("#" + this.pid + "_" + i);
				if ($bnt.attr("page") == this.curPage)
				{
					clickBntIndex = i;
					break;
				}
			}
			break;
	}
	/* 更新页码 */
	if (this.pageCnt > this.pageCoderBntCnt)
	{
		var offset = (this.pageCoderBntCnt - 1) / 2;
		var start = this.curPage - offset;
		var end = this.curPage + offset;
		//越界判断
		if (start < 1)
		{
			start = 1;
			end = start + (this.pageCoderBntCnt - 1);
		}
		if (end > this.pageCnt)
		{
			end = this.pageCnt;
			start = this.pageCnt - (this.pageCoderBntCnt - 1);
		}

		//页码标签的ID永远不变，改变的是标签的值,所以重新给页码标签赋值
		var index = 1;
		for ( var i = start; i <= end; i++)
		{
			bntId = this.pid + "_" + index;
			$bnt = $("#" + bntId);
			$bnt.attr("page", i);
			$bnt.html(i);
			index++;
		}
	}
	//更新页码样式
	var bntId;
	var $bnt;
	var cnt = this.pageCnt;
	if (this.pageCnt > this.pageCoderBntCnt)
	{
		cnt = this.pageCoderBntCnt;
	}
	var page;
	for ( var i = 1; i <= cnt; i++)
	{
		bntId = this.pid + "_" + i;
		$bnt = $("#" + bntId);
		page = $bnt.attr("page");
		if (page == this.curPage)
		{
			$bnt.removeClass("BntNormal");
			$bnt.removeClass("BntHover");
			$bnt.addClass("BntSelect");
		}
		else
		{
			$bnt.removeClass("BntSelect");
			$bnt.removeClass("BntHover");
			$bnt.addClass("BntNormal");
		}
	}

	if (type == "code")
	{
		/*设置当前鼠标所在页码的划过样式*/
		var $pageBnt = $("#" + this.pid + "_" + clickBntIndex);
		$pageBnt.addClass();
	}
	if(isInvoke)
	{
		this.invoke(this.pid,this.curPage);
	}
}

WebTablePageNumber.prototype.setPageCoderBntCnt = function(pageCoderBntCnt)
{
	this.pageCoderBntCnt = pageCoderBntCnt
}

WebTablePageNumber.prototype.setPageCoderBntWidth = function(pageCoderBntWidth)
{
	this.pageCoderBntWidth = pageCoderBntWidth;
}