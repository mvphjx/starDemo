
//工具栏按钮样式
function ToolButton(id,bntClass,invoke,disableClass)
{
	this.id 			= id;
	this.bntClass 		= bntClass;
	this.disableClass 	= disableClass;
	this.invoke 		= invoke;
	this.enabled 		= true;
	this.isDown			= false;//表示按钮是否按下
	this.init();
}

ToolButton.prototype.setEnabled = function(enabled)
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
ToolButton.prototype.setText = function(text)
{
	this.$button.attr("title",text);
}


ToolButton.prototype.init = function()
{
	this.parent = $("#"+this.id);
	this.parent.attr("class","ToolBntNormal");
	
	this.$button = $("<div class=\"ToolBnt " + this.bntClass + "\"></div>");
	this.parent.append(this.$button);
	
	var thisObj = this;
	this.$button.click
	(
		function()
		{
			if(thisObj.enabled == false)return;
			thisObj.invoke(thisObj.id);
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
}