
//工具栏按钮下拉列表样式
function ToolButtonList(id,listdata,bntClass,invoke,disableClass)
{
	this.id 			= id;
	this.listdata		= listdata;
	this.bntClass 		= bntClass;
	this.disableClass 	= disableClass;
	this.invoke 		= invoke;
	this.enabled 		= true;
	this.isDown			= false;//表示按钮是否按下
	this.value          = null;
	this.init();
}

ToolButtonList.prototype.setEnabled = function(enabled)
{
	this.enabled = enabled;
	if(this.enabled == true)
	{
		this.$button.attr("class","ToolBnt "+this.bntClass);
	}
	else
	{
		this.parent.attr("class","ToolBntNormal");
		this.$button.attr("class","ToolBnt "+this.disableClass);
	}
}

ToolButtonList.prototype.addItem = function($parent, text, value, obj, cardId)
{
	var $span = $("<span value=" + value + " >" + text + "</span>");
	$span.attr("cardId",cardId);
	$parent.append($span);
	$span.click(function()
	{
		obj.clickItem($(this));
	});
}

ToolButtonList.prototype.switchWorkMode = function(mode)
{
	this.invoke.switchWorkMode(mode);
}

ToolButtonList.prototype.clickItem = function(item)
{
	var value = $(item).attr("value");
	if(this.value == value) return;
	this.value = value;
	this.switchWorkMode(value);
}

ToolButtonList.prototype.registerList = function($content)
{
	$content.children().each(function(i)
	{
		var item = $(this);
		$(this).mouseover(function()
		{
			$content.children().each(function(i)
			{
				if ($(this).attr("value") == item.attr("value"))
				{
					$(this).attr("class", "select");
				}
				else
				{
					$(this).attr("class", "");
				}
			});

		});
	});
}

ToolButtonList.prototype.init = function()
{
	this.parent = $("#"+this.id);
	this.parent.attr("class","ToolBntNormal");
	//this.$button = $("<div class=\"ToolBnt " + this.bntClass + "\"></div>");
	//this.$button = $("<div id=\""+ this.id +"downbtn\" class=\"" + this.bntClass + "\"></div>");
	//this.parent.append(this.$button);
	//$downbtn = $("#"+this.id+"downbtn");
	/*
	this.$downlist = $("<div class=\"ToolBtnList\"></div>");
	this.parent.append(this.$downlist);
	for (var i = 0; i < this.listdata.length; i++)
	{
		workmode = this.listdata[i];
		this.addItem(this.$downlist, workmode.txt, workmode.id, this);
	}
	*/
	/*
	var thisObj = this;
	this.$button.click
	(
		function()
		{
			if(thisObj.enabled == false)return;
			//thisObj.invoke(thisObj.id);
		}
	);
	this.$button.mouseover
	(
		function()
		{
			if(thisObj.enabled == false)return;
			if(!thisObj.isDown)
			{	
				var $parent = $(this).parent();
				$parent.attr("class","ToolBntHover");
			}
		}
	);
	this.$button.mouseout
	(
		function()
		{
			var $parent = $(this).parent();
			$parent.attr("class","ToolBntNormal");
		}
	);
	this.$button.mousedown
	(
		function()
		{
			if(thisObj.enabled == false)return;
			var $parent = $(this).parent();
			$parent.attr("class","ToolBntDown");
			thisObj.isDown = true;
		}
	);
	this.$button.mouseup
	(
		function()
		{
			if(thisObj.enabled == false)return;
			var $parent = $(this).parent();
			$parent.attr("class","ToolBntHover");
			thisObj.isDown = false;
		}
	);
	*/
}