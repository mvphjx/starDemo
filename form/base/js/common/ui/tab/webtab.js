
/**
 * 选项卡控件对象
 * @param {Object} p  	{TabId:DivId,...}
 * @param {Object} setting 	{onClick:functionName(tabId),....}
 */
function WebTab(p,setting)
{
	this.param 		= p;
	this.setting 	= setting;
	this.init();
}

WebTab.prototype.init = function()
{
	if(this.param == null)
	{
		return;
	}
	var index = 0;
	for(var key in this.param)
	{
		var $item = $("#" + key);
		var $page = $("#" + this.param[key]);
		$item.attr("page",this.param[key]);
		$item.attr("isShow","true");
		this.registerTabItemEvent($item);
		//显示第一个页面，隐藏其他页面
		if(index == 0)
		{
			$page.show();
		}
		else
		{
			$page.hide();
		}
		index++;
	}
	
}

WebTab.prototype.addTab = function(itemId,pageId,isShow)
{
	if(WebHelper.isNull(this.param))
	{
		this.param = {};
	}
	var $item = $("#" + itemId);
	var $page = $("#" + pageId);
	$item.attr("page",pageId);
	this.registerTabItemEvent($item);
	this.param[itemId] = pageId;
	
	//显示第一个页面，隐藏其他页面
	if(isShow == true)
	{
		this.showTab(itemId);
	}
	else
	{
		$("#"+pageId).hide();
	}
}

/** 显示指定的选项卡 */
WebTab.prototype.showTab = function(tabId)
{
	if(WebHelper.isNull(this.param))return;
	for(var itemId in this.param)
	{
		var pageId = this.param[itemId];
		if(itemId != tabId)
		{
			$("#" + itemId).attr("class","");
			$("#"+pageId).hide();	
		}
	}
	var curPageId = this.param[tabId];
	if(!WebHelper.isNull(curPageId))
	{
		$("#" + tabId).attr("class","selected");
		$("#" + curPageId).show();
	}
}

WebTab.prototype.setText = function(tabId,text)
{
	$("#"+tabId).find("div").html(text);
}

WebTab.prototype.showTab = function(tabId)
{
	$("#"+tabId).attr("isShow","true");
	$("#"+tabId).show();
	
}

/**
 * 隐藏选项卡以及对应的容器
 */
WebTab.prototype.hiddenTab = function(tabId)
{
	//所有TAB取消选中状态
	for(var itemId in this.param)
	{
		$("#" + itemId).attr("class","");
	}
	
	//隐藏指定TABID的TAB和对应的页面
	$("#"+tabId).attr("isShow","false");
	$("#"+tabId).hide();
	var $page = $("#" + this.param[tabId]);
	$page.hide();
	
	//遍历所有找到第一个满足条件的TAB和对应的页面做显示操作
	var parent 		= $("#"+tabId).parent();
	var curPageId 	= null;
	var find 		= false;
	var thisObj		= this;
	parent.children().each
	(
		function(i)
		{
			var id = $(this).attr("id");
			var isShow = $(this).attr("isShow");
			if(!find && id != tabId && isShow == "true")
			{
				$(this).attr("class","selected");
				curPageId = thisObj.param[id];
				var $page = $("#" + curPageId);
				$page.show();
				find = true;
				return;
			}
		}
	);
	return curPageId;
}

WebTab.prototype.registerTabItemEvent = function($item)
{
	var obj = this;
	$item.mouseover
	(
		function()
		{
			var cssName = $(this).attr("class");
			if(cssName == 'selected')return;
			$(this).attr("class","mouseover");
		}
	);
	$item.mouseout
	(
		function()
		{
			var cssName = $(this).attr("class");
			if(cssName == 'selected')return;
			$(this).attr("class","mouseout");
		}
	);
	$item.mousedown
	(
		function()
		{
			var cssName = $(this).attr("class");
			if(cssName == 'selected')return;
			
			//设置当前标签为选中样式
			$(this).attr("class","selected");
			//显示标签对应的页面
			var $page = $("#"+$(this).attr("page"));
			var parentHeight=$page.css('height');			
			$page.parent().css('height:'+parentHeight);
			$page.show();
			
			//设置其他所有标签为非选中
			var $curItem = $(this);
			var $children = $(this).parent().children();
			$children.each
			(
				function(i)
				{
					if($(this).attr("id") != $curItem.attr("id"))
					{
						$(this).attr("class","");
						var $otherPage = $("#"+$(this).attr("page"));
						$otherPage.hide();
					}
				}
			);
			
			if(obj.setting != null && obj.setting.onClick != null)
			{
				obj.setting.onClick($(this).attr("id"));
			}
			
		}
	);
}	
