
WebMenu.prototype.clickMenu 	= false;

WebMenu.prototype.menuUpTime 	= 45;

WebMenu.prototype.menuDownTime 	= 180;


/** WEB菜单类 */
function WebMenu(menuId, menuCfg)
{
	this.menuId = menuId;
	this.menuCfg = menuCfg;
	this.menuRel = {};
	this.init();
}

/** 初始化工作 */
WebMenu.prototype.init = function()
{
	WebUtil.initVersion();

	var menuBar = $("#" + this.menuId);
	menuBar.bind("selectstart",function(){return false;});
	for ( var i = 0; i < this.menuCfg.length; i++)
	{
		var menu = this.menuCfg[i];
		var itemId = "Item_" + menu.id;
		var mItem = $("<li id = \"" + itemId + "\" class = \"Menu\"></li>");
		var mText = $("<span class=\"txt\"></span>");
		mText.html(menu.name);
		mItem.append(mText);
		menuBar.append(mItem);
		this.create(mItem, menu, null);
		if (i < this.menuCfg.length - 1)
		{
			var s = $("<li class=\"Line\"></li>");
			menuBar.append(s);
		}
	}

	var nThis = this;
	$(window).resize(function(event)
	{
		nThis.refreshAllMenu();
	});
	
	$(document).click(function(event)
	{
		var e = event || window.event;
		var ele = e.srcElement || e.target;
		if (ele.className == "txt") return;
		nThis.hiddenOther(null);
	});
}

WebMenu.prototype.registerMenuEvent = function($menuItem,menuObj)
{
	var nThis = this;
	
	$menuItem.mouseout(function()
	{
		var isClick = eval($(this).attr("isClick"));
		if (!isClick)
		{
			$(this).removeClass("SelectMenu");
		}
	});
	
	$menuItem.mousedown(function()
	{
		var menuItemId = $(this).attr("id");
	    var isClick = eval($(this).attr("isClick"));
	    if (isClick == true)
	    {
	    	nThis.clickMenu = false;
		    var itemId = $menuItem.attr("id");
		    var id = itemId.split("_")[1];
		    var mId = "MenuId_" + id;
		    var $menu = $("#" + mId);
		    $menu.slideUp(nThis.menuUpTime);
		    $(this).attr("isClick", false);
	    }
	    else
	    {
	    	nThis.clickMenu = true;
		    nThis.showMenu($(this));
	    }
	    if(menuObj.type == WebCode.MenuType.LINK)
	    {
	    	if (menuObj.mode == WebCode.MenuLinkType.SELF)
			{
				window.open(WebVar.VarPath + menuObj.url, "_self");
			}
			else
			{
				window.open(WebVar.VarPath + menuObj.url, "_blank");
			}
	    }
    });
	
	$menuItem.mouseover(function()
	{
		var isClick = eval($(this).attr("isClick"));
		if (!isClick)
		{
			$(this).addClass("SelectMenu");
			if (nThis.clickMenu == true)
			{
				var menuItemId = $(this).attr("id");
				nThis.hiddenOther(menuItemId);
				nThis.showMenu($(this));
			}
		}
	});
}

WebMenu.prototype.showMenu = function(mItem)
{
	var itemId = mItem.attr("id");
	var id = itemId.split("_")[1];
	var menuId = "MenuId_" + id;
	var menu = $("#" + menuId);
	this.updateMenuLocation(mItem, menuId);
	menu.slideDown(this.menuDownTime);
	mItem.attr("isClick", true);
}

/**
 * 隐藏除指定ID的其他菜单，当指定的ID为NULL时候表示隐藏全部菜单（需将全局菜单点击标记设置为FALSE）
 * @param {Object} menuItemId
 * @memberOf {TypeName} 
 */
WebMenu.prototype.hiddenOther = function(itemId)
{
	var $menus = $(".Menu");
	var nThis = this;
	$menus.each(function(i)
	{
		var tMenuItemId = $(this).attr("id");
		if (tMenuItemId != itemId)
		{
			var tId = tMenuItemId.split("_")[1];
			var tMenuId = "MenuId_" + tId;
			var $tMenu = $("#" + tMenuId);
			$tMenu.hide();
			$(this).removeClass("SelectMenu");
			$menuItem = $("#" + tMenuItemId);
			$menuItem.attr("isClick", false);
			nThis.hiddenMenu(tMenuId);
		}
	});
	if (itemId == null)
	{
		this.clickMenu = false;
	}
}

/** 隐藏指定的菜单 */
WebMenu.prototype.hiddenMenu = function(menuId)
{
	var childList = this.menuRel[menuId];
	if(WebUtil.isEmpty(childList))return;
	for(var str in childList)
	{
		var item = childList[str];
		var menu = eval(item.pMenuName);
		var $menuDiv = $(menu.document.body).find(".MList");
		var vItem = $menuDiv.find("#"+item.itemId);
		vItem.removeClass("SelectMItem");
		if(item.type == WebCode.MenuItemType.MENU)
		{
			this.hiddenMenu(item.menuId);
			$("#"+item.menuId).hide();
		}
	}
}

WebMenu.prototype.create = function($mItem,menu,pId,pMenuName)
{
	var isTop = "";
	if(WebUtil.isNull(pMenuName))
	{
		pMenuName = "";
	}
	if(WebUtil.isNull(pId))
	{
		pId = $mItem.attr("id");
		isTop = "top";
	}
	var thisObj = this;
	//注册菜单事件
	if(!WebUtil.isNull($mItem))
	{
		this.registerMenuEvent($mItem,menu);
	}
	var len = menu.items.length;
	if(len > 0)
	{
		var $menuBar 	= $("#" + this.menuId);
		var n 			= "MenuName_" + menu.id;
		var menuId 		= "MenuId_" + menu.id;
		var $menuPanel 	= $("<iframe id=\""
		        + menuId
		        + "\" name=\""
		        + n
		        + "\" class=\"MenuPanel\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" scrolling=\"no\" width=\"0\" height=\"0\"></iframe>");
		$menuBar.append($menuPanel);
		$menuPanel.attr("src",WebVar.VarPath + "/jsp/widget/menu/menupage.jsp");
		var obj = this;
		var childList = this.menuRel[menuId];
		if(WebUtil.isEmpty(childList))
		{
			childList = new Array();
			this.menuRel[menuId] = childList;
		}
		
		$menuPanel.load(function()
		{
			/*填充菜单项*/
		    var mm = eval(n);
		    var menuDiv = $(mm.document.body).find(".MList");
		    menuDiv.bind("selectstart", function()
		    {
			    return false;
		    });
		    var itemObj = null;
		    for ( var i = 0; i < menu.items.length; i++)
		    {
			    itemObj = menu.items[i];
			    var $item = $("<div class=\"MItem\"></div>");
			    var itemId = menuId+"_"+itemObj.seq;
			    $item.attr("id",itemId);
			    $item.attr("menuId",menuId);
			    $item.attr("name",n);
			    $item.attr("pId",pId);
			    $item.attr("pMenuName",pMenuName);
			    $item.attr("isTop",isTop);
			    $item.attr("seq",itemObj.seq);
			    itemObj.itemId = itemId;
			    itemObj.pMenuName = n;
			    
			    var $txt = $("<div class=\"Txt\"></div>");
			    $txt.html(itemObj.name);
			    var $img = $("<div class=\"Img\"></div>");
			    $item.append($txt);
			    $item.append($img);
			    menuDiv.append($item);
				
			    if(!WebUtil.isEmpty(itemObj.menu))
			    {
			    	$img.addClass("NIcon");
			    	var childMenu = itemObj.menu;
					itemObj.menuName = "MenuName_" + childMenu.id;
					itemObj.menuId = "MenuId_" +childMenu.id;
			    	thisObj.create(null,childMenu,itemId,n);
			    }
			    obj.registerItemEvent($item, itemObj);
			    childList.push(itemObj);
		    }
		    obj.updateMenuBounds(menuId, n);
	    });
	}
}

WebMenu.prototype.registerItemEvent = function($item, itemObj)
{
	var thisObj = this;
	$item.mouseover(function()
	{
		var menuId = $(this).attr("menuId");
		var childList = thisObj.menuRel[menuId];
		for(var str in childList)
		{
			var item = childList[str];
			var menu = eval(item.pMenuName);
			var body = $(menu.document.body);
			var $menuDiv = body.find(".MList");
			var vItem = $menuDiv.find("#"+item.itemId);
			vItem.removeClass("SelectMItem");
			if(item.type == WebCode.MenuItemType.MENU)
			{
				$("#"+item.menuId).hide();
				var a = vItem.find("div:eq(1)");
				a.removeClass("HIcon").addClass("NIcon");
			}
		}
		$(this).addClass("SelectMItem");
		if(itemObj.type == WebCode.MenuItemType.MENU)
		{
			var a = $(this).find("div:eq(1)");
			a.removeClass("NIcon").addClass("HIcon");
			var menuId = itemObj.menuId;
			thisObj.updateChildLocation($(this),menuId);
			var m = $("#" + menuId);
			m.show();
		}
	});
	
	$item.mouseout(function()
	{
		if(itemObj.type != WebCode.MenuItemType.MENU)
		{
			$(this).removeClass("SelectMItem");
		}
	});
	
	$item.click(function()
	{
		if(itemObj.type != WebCode.MenuItemType.MENU)
		{
			if (itemObj.mode == WebCode.MenuLinkType.SELF)
			{
				window.open(WebVar.VarPath + itemObj.url, "_self");
			}
			else
			{
				window.open(WebVar.VarPath + itemObj.url, "_blank");
			}
		    thisObj.hiddenOther(null);
	    }
    });
}

/** 重新定位所有菜单 */
WebMenu.prototype.refreshAllMenu = function()
{
	var $menuItems = $(".Menu");
	var nThis = this;
	$menuItems.each(function(i)
	{
		var tMenuItemId = $(this).attr("id");
		var tId = tMenuItemId.split("_")[1];
		var tMenuId = "MenuId_" + tId;
		nThis.updateMenuLocation($(this), tMenuId);
	});
}

/**
 * 刷新根菜单位置
 */
WebMenu.prototype.updateMenuLocation = function($menuItem, menuId)
{
	var gap = 0;
	WebUtil.initVersion();
	if(!WebUtil.isNull(WebUtil.version.ie))
	{
		if(WebUtil.version.ie == "8.0")
		{
			gap = 1;
		}
	}
	var mf = $("#" + menuId);
	var offset = $menuItem.offset();
	var txtH = $menuItem.height();
	var mfLeft = offset.left;
	var mfTop = offset.top + txtH;
	mf.css("left", mfLeft + "px");
	mf.css("top", mfTop + "px");
}

/**
 * 更新子菜单位置
 * @param {Object} $menuItem 当前菜单项
 * @param {Object} menuId 菜单
 */
WebMenu.prototype.updateChildLocation = function($item, mid)
{
	var level = 1;
	var firstItem = $item;
	var isTop = firstItem.attr("isTop");
	if(isTop != "top")
	{
		level = 2;
		var itemId  = $item.attr("pId");
		var menuName = $item.attr("pMenuName");
		var menu = eval(menuName);
		$menuDiv = $(menu.document.body).find(".MList");
		firstItem = $menuDiv.find("#"+itemId);
		while(firstItem.attr("isTop") != "top")
		{
			itemId  = $item.attr("pId");
			menuName = $item.attr("pMenuName");
			menu = eval(menuName);
			$menuDiv = $(menu.document.body).find(".MList");
			firstItem = $menuDiv.find("#"+itemId);
			level++;
		}
	}
	
	// seq需要准确的计算前面到底有几个菜单项
	var seq = $item.attr("seq");
	seq = $item.parent().children().index($item);
	
	var pMenuId 	= $item.attr("menuId");
	var $pMenu		= $("#" + pMenuId);
	var mOffset 	= $pMenu.offset();
	var pId 		= firstItem.attr("pId");
	var pItem 		= $("#"+pId);
	var offset 		= pItem.offset();
	var mh			= pItem.height();
	var txtW 		= parseInt($item.css("width"));
	var txtH 		= parseInt($item.css("height"));
	var idx			= parseInt(seq);
	var mfLeft 		= offset.left + (txtW * level) - (5 * level);
	var mfTop 		= mOffset.top + ((txtH + 1) * idx);
	var mf  		= $("#" + mid);
	mf.css("top", mfTop + "px");
	mf.css("left", mfLeft + "px");
}

/**
 * IFRAME加载的时候，根据包含的内容来修改IFRAME的尺寸和显示位置
 * @param {Object} $menu 菜单项
 * @param {Object} id iframeId
 * @param {Object} menuName iframe的名称
 */
WebMenu.prototype.updateMenuBounds = function(mId, mName)
{
	var mPanel = $("#" + mId);
	var m = eval(mName);
	var mList = $(m.document.body).find(".MList");
	var w = mList.width() + 2;
	var itemHeight = mList.find("div:eq(0)").outerHeight(true);
	var $items = mList.find(">div");
	var h = itemHeight * $items.length + 2;
	mList.css("visibility", "visible");
	mPanel.css("width", w + "px");
	mPanel.css("height", h + "px");
	mPanel.hide();
}
