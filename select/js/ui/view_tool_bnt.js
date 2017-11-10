

function ViewButton(id,bntClass,invoke,disableClass)
{
	this.id 			= id;
	this.bntClass 		= bntClass;
	this.disableClass 	= disableClass;
	this.invoke 		= invoke;
	this.enabled 		= true;
	this.isDown			= false;
	this.init();
}

ViewButton.prototype.setEnabled = function(enabled)
{
	this.enabled = enabled;
	if(this.enabled == true)
	{
		this.$button.attr("class","ViewBnt " + this.bntClass);
	}
	else
	{
		this.parent.attr("class","ViewBntNormal");
		this.$button.attr("class","ViewBnt " + this.disableClass);
	}
}
ViewButton.prototype.setText = function(text)
{
	this.$button.attr("title",text);
}
ViewButton.prototype.init = function()
{
	this.parent = $("#"+this.id);
	this.parent.attr("class","ViewBntNormal");
	
	this.$button = $("<div class=\"ViewBnt " + this.bntClass + "\"></div>");
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
				$parent.attr("class","ViewBntHover");
			}
		}
	);
	this.$button.mouseout
	(
		function()
		{
			var $parent = $(this).parent();
			$parent.attr("class","ViewBntNormal");
		}
	);
	this.$button.mousedown
	(
		function()
		{
			if(thisObj.enabled == false)return;
			var $parent = $(this).parent();
			$parent.attr("class","ViewBntDown");
			thisObj.isDown = true;
		}
	);
	this.$button.mouseup
	(
		function()
		{
			if(thisObj.enabled == false)return;
			var $parent = $(this).parent();
			$parent.attr("class","ViewBntHover");
			thisObj.isDown = false;
		}
	);
}