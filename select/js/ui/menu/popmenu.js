
/**
 * WEB弹出式菜单
 * [
 * 	{id:"",type:"",txt:"",img:""}
 * ]
 */
var PopMenuType = 
{
	MenuItem	:"MenuItem",
	Separator	:"Separator"
}

function PopMenu(id,items,callBack)
{
	this.id 		= id;
	this.items 		= items;
	this.callBack 	= callBack;
	this.init();
}

PopMenu.prototype.initParam = function()
{	
	this.menu		= null;
	this.delay		= 200;
}

PopMenu.prototype.showMenu = function()
{
	if(this.menu == null)
	{
		/* 初始化菜单 */
		if(WebHelper.isEmpty(this.items))return;
		this.menu 	= $("<div class=\"PopMenu\"></div>");
		$(document.body).prepend(this.menu);
		this.menu.bind("selectstart",function(){return false;});
		this.menu.hide();
		var top 	= $("<div class=\"Border\"></div>");
		this.menu.append(top);
		
		var thisObj = this;
		for(var i=0;i<this.items.length;i++)
		{
			var item = this.items[i];
			var menuItem  = null;
			if(item.type == PopMenuType.MenuItem)
			{
				menuItem 	= $("<div class=\"Item\"></div>");
				menuItem.attr("id",item.id);
				
				var itemImg 	= $("<div class=\"Img\"></div>");
				itemImg.addClass(item.img);
				
				var itemTxt		= $("<div class=\"Txt\"></div>");
				itemTxt.html(item.txt);
				
				menuItem.append(itemImg);
				menuItem.append(itemTxt);
				
				menuItem.mouseover
				(
					function()
					{
						$(this).addClass("ItemHover");
					}
				);
				menuItem.mouseout
				(
					function()
					{
						$(this).removeClass("ItemHover");
					}
				);
				
				menuItem.click
				(
					function()
					{
						thisObj.menu.fadeOut(thisObj.delay);
						if(!WebHelper.isNull(thisObj.callBack))
						{
							var itemId = $(this).attr("id");
							thisObj.callBack(thisObj.id,itemId);
						}
					}
				);
			}
			else
			{
				menuItem 	= $("<div class=\"Separator\"></div>");
			}
			this.menu.append(menuItem);
		}
		var bottom 	= $("<div class=\"Border\"></div>");
		this.menu.append(bottom);

		document.onclick = function(event)
		{
			var e = event || window.event;
			var ele = e.srcElement || e.target;
			//点击下拉按钮
			if (ele.className == "PopMenuBntDown" )
			{
				return;
			}
			if(thisObj.menu != null)
			{
				thisObj.menu.fadeOut(thisObj.delay);
			}
		}
		
	}
	/* 调整位置 */
	var offset 	= this.$menuBnt.offset();
	var height 	= this.$menuBnt.outerHeight(true);
	var menuW	= this.menu.outerWidth(true);
	var bodyW	= document.documentElement.scrollWidth;
	var left	= offset.left;
	if(left + menuW > bodyW)
	{
		left = bodyW - menuW;
	}
	this.menu.css("left",left);
	this.menu.css("top",offset.top+height);
	this.menu.fadeIn(this.delay);
}

PopMenu.prototype.init = function()
{
	this.initParam();
	if(WebHelper.isNull(this.id))return;
	var $parent = $("#" + this.id);
	this.$menuBnt = $("<div class=\"PopMenuBnt\"></div>");
	$parent.append(this.$menuBnt);
	var thisObj = this;
	this.$menuBnt.click
	(
		function(e)
		{
			thisObj.showMenu();
		}
	);
	
	this.$menuBnt.mouseover
	(
		function(e)
		{
			$(this).attr("class","PopMenuBntHover");
		}
	);
	
	this.$menuBnt.mousedown
	(
		function()
		{
			$(this).attr("class","PopMenuBntDown");
		}
	);
		
	this.$menuBnt.mouseout
	(
		function()
		{
			$(this).attr("class","PopMenuBnt");
		}
	);
}
