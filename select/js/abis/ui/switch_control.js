SwitchControl.DownDelay 	= 150;
SwitchControl.Bty 			= "Bty";
SwitchControl.Vid 			= "Vid";
SwitchControl.Fgp 			= "Fgp";
SwitchControl.ImgId 		= "ImgId";
SwitchControl.Gid 			= "Gid";
SwitchControl.Layout 		= "Layout";
SwitchControl.Cid 			= "Cid";
SwitchControl.ImgIdCombo 	= "ImgIdCombo";
SwitchControl.GidCombo 		= "GidCombo";
SwitchControl.PrevNaviBnt 	= "PrevNaviBnt";
SwitchControl.NextNaviBnt 	= "NextNaviBnt";
SwitchControl.Tree 			= "Tree";
SwitchControl.Logo 			= "Logo";
SwitchControl.Undefined 	= "undefined";

/**
 * 提供卡片切换的相关操作
 * 
 * 职责 ：来操作 控制按钮，树结构；
 * 内部维护当前的 bty vid cid gid fgp；
 * 
 * 图像和特征的加载，通过 invoke ；回调业务模块进行处理
 */
function SwitchControl(id, fiveList, ImgIdList, invoke, treeId, treeData, bty, vid, fgp, cid, imgId, gid)
{
	this.id 			= id;
	this.btyId 			= this.id + SwitchControl.Bty;
	this.vidId 			= this.id + SwitchControl.Vid;
	this.fgpId 			= this.id + SwitchControl.Fgp;
	this.imgIdId 		= this.id + SwitchControl.ImgId;
	this.gidId 			= this.id + SwitchControl.Gid;
	this.layoutId 		= this.id + SwitchControl.Layout;
	this.cidId			= this.id + SwitchControl.Cid;
	this.imgComboId	 	= this.id + SwitchControl.ImgIdCombo;
	this.groupComboId 	= this.id + SwitchControl.GidCombo;
	this.logoId 		= this.id + SwitchControl.Logo;
	this.gPrevBntId 	= this.id + SwitchControl.PrevNaviBnt;
	this.gNextBntId 	= this.id + SwitchControl.NextNaviBnt;
	this.fiveList 		= fiveList;
	this.imgIdList 		= ImgIdList;
	this.treeId 		= treeId;
	this.treeData 		= treeData;
	this.invoke 		= invoke;
	this.layoutInvoke	= null;
	this.bty 			= bty;
	this.vid 			= vid;
	this.fgp 			= fgp;
	this.imgId 			= imgId;
	this.gid 			= gid;
	this.cid 			= cid;
	this.layout			= WebCode.LayoutType.Single;
	this.isType			= ABISCode.TableTypeCode.TPCARD;
	this.frameList 		= new Array();
	this.hasInit		= false;
	this.flag 			= "";
	this.isLoadTree		= false;
	this.switchControl = $("#" + this.id + "SwitchWidget");
	
	//先加载iframe
	this.initIframe();
}

SwitchControl.prototype.initParam = function()
{
	var browser = navigator.appName;
	var b_version = navigator.appVersion;
	var version = b_version.split(";");
	var versionName = version[1].replace(/[ ]/g, "");
	if (browser == "Microsoft Internet Explorer")
	{
		if (versionName == "MSIE8.0")
		{
			this.IEVersion = 8;
		}
		else
		{
			this.IEVersion = 9;
		}
	}
}
SwitchControl.prototype.initIframe = function(){
//先加载iframe
	var _this = this;
	this.initDownList(this.btyId);
	this.initDownList(this.vidId);
	this.initDownList(this.fgpId);
	this.initDownList(this.imgIdId);
	this.initDownList(this.gidId);
	this.initDownList(this.cidId);
	this.initDownList(this.layoutId,function(){_this.initLayoutList()});
	this.initDownList(this.imgComboId);
	this.initDownList(this.groupComboId);
}


/**
 * 初始化方法[外界不要调用]
 */
SwitchControl.prototype.init = function()
{
	this.initIframe();
	var _this = this;
	this.hasInit = true;
	this.initParam();
	this.btyLock = false;
	this.vidLock = false;
	this.fgpLock = false;
	this.cidLock = false;	
	//初始化图像浏览方式列表
	this.initImgIdList();
	//初始化布局类型列表
	this.initLayoutList();
	//初始化图像浏览方式下拉列表
	this.initImgIdComboList();
	//初始化事件
	this.initEvent();
	//初始化数据
	this.initData();
	//初始化树形控件
	this.initTree();
	//根据捺印还是现场改变界面显示内容
	this.applyDisMode();
}

SwitchControl.prototype.initImgIdType = function()
{
	this.imgIdList = new Array();
	this.imgIdList.push({"imgId":ABISCode.ImageShowType.PriCpr,"imgText":AbisMessageResource.ImageShowType["PriorityCompressGraph"]});
	this.imgIdList.push({"imgId":ABISCode.ImageShowType.PriLoseLess,"imgText":AbisMessageResource.ImageShowType["PriorityOriginalGraph"]});
	this.imgIdList.push({"imgId":ABISCode.ImageShowType.Cpr,"imgText":AbisMessageResource.ImageShowType["CompressGraph"]});
	this.imgIdList.push({"imgId":ABISCode.ImageShowType.LoseLess,"imgText":AbisMessageResource.ImageShowType["OriginalGraph"]});
	this.imgIdList.push({"imgId":ABISCode.ImageShowType.Nothing,"imgText":AbisMessageResource.ImageShowType["NotShow"]});
}

SwitchControl.prototype.initLayoutType = function()
{
	this.layoutList = new Array();
	this.layoutList.push({"id":WebCode.LayoutType.Single,"txt":AbisMessageResource.LayoutType["SingleFinger"]});
	this.layoutList.push({"id":WebCode.LayoutType.Multi,"txt":AbisMessageResource.LayoutType["Tile"]});
}

/**
 * 应用显示数据的模式（TP|LP)
 */
SwitchControl.prototype.applyDisMode = function()
{
	var cssName 	= "hidden";
	var btyDiv 		= $("#" + this.btyId);
	var vidDiv 		= $("#" + this.vidId);
	var fgpDiv 		= $("#" + this.fgpId);
	var gPrevBnt 	= $("#" + this.gPrevBntId);
	var gNextBnt 	= $("#" + this.gNextBntId);
	var logo 		= $("#" + this.logoId);
	var imgIdBnt 	= $("#" + this.imgIdId);
	var mntIdBnt 	= $("#" + this.gidId);
	var imgCombo 	= $("#" + this.imgComboId);
	var mntCombo 	= $("#" + this.groupComboId);
	var layoutBnt	= $("#" + this.layoutId);
	
	if (this.type == ABISCode.TableTypeCode.TPCARD)
	{
		logo.show();
		btyDiv.show();
		vidDiv.show();
		fgpDiv.show();
		gPrevBnt.show();
		gNextBnt.show();
		imgIdBnt.hide();
		mntIdBnt.show();
		imgCombo.hide();
		mntCombo.hide();
		if(this.isMatch){//判断是否认定控件
			layoutBnt.hide();
		}else{
			layoutBnt.show();
		}
	}
	else if (this.type == ABISCode.TableTypeCode.LPCARD)
	{
		btyDiv.show();
		vidDiv.hide();
		fgpDiv.hide();
		gPrevBnt.hide();
		gNextBnt.hide();
		imgIdBnt.hide();
		mntIdBnt.show();
		logo.show();
		imgCombo.hide();
		mntCombo.hide();
		layoutBnt.hide();
	}
	else if (this.type == ABISCode.TableTypeCode.LPCASE)
	{
		logo.show();
		btyDiv.show();
		fgpDiv.show();
		gPrevBnt.show();
		gNextBnt.show();
		imgIdBnt.hide();
		mntIdBnt.show();
		vidDiv.hide();
		imgCombo.hide();
		mntCombo.hide();
	}
}

/**
 * 初始化数据
 */
SwitchControl.prototype.initData = function()
{
	//初始化生物特征列表
	this.initBtyList();

	//改变BTY
	this.switchBty();
}

/** 设置布局回调函数 */
SwitchControl.prototype.setLayoutInvoke = function(layoutInvoke)
{
	this.layoutInvoke = layoutInvoke;
}

/**
 * 五要素改变时候调用此方法来更新控件
 */
SwitchControl.prototype.setData = function(fiveList, treeData, bty, vid, fgp, cid, gid)
{
	this.bty 		= bty;
	this.vid 		= vid;
	this.fgp 		= fgp;
	this.cid 		= cid;
	this.gid 		= gid;
	this.fiveList 	= fiveList;
	this.treeData 	= treeData;
	this.initData();
	this.initTree();
	this.applyDisMode();
}

SwitchControl.prototype.set6E = function(bty, vid, fgp, cid, imgId, gid)
{
	this.bty 		= bty;
	this.vid 		= vid;
	this.fgp 		= fgp;
	this.cid 		= cid;
	this.imgId 		= imgId;
	this.gid 		= gid;
	this.switchBty();
	this.refreshTree();
}

SwitchControl.prototype.set5E = function(bty, vid, fgp, cid, gid)
{
	this.bty 		= bty;
	this.vid 		= vid;
	this.fgp 		= fgp;
	this.cid 		= cid;
	this.gid 		= gid;
	this.switchBty();
	this.refreshTree();
	this.hiddenAll();
}

SwitchControl.prototype.initTree = function()
{
	if (this.treeId == null || this.treeId == SwitchControl.Undefined) { return; }
	var nThis = this;
	var settings =
	{
	    data :
	    {
		    simpleData :{enable : true}
	    },
	    callback :
	    {
	        beforeClick : beforeClick,
	        onClick 	: onClick,
	        onDblClick 	: onDoubleClick
	    }
	};
	
	function getFont(treeId, node) 
	{
		return {"color":"#f8f8f8"};
	}

	function beforeClick(tid, node, flag)
	{
		var bool = node.click == true ? true : false;
		return bool;
	}

	function onDoubleClick(e, tid, node)
	{
		var $tree = $("#" + nThis.treeId);
		var $logo = $("#" + nThis.logoId);
		var flags = $logo.attr("class").split("_");
		var flag = "";
		if (flags.length > 1)
		{
			flag += flags[0] + "_";
		}
		$logo.attr("class", flag + "logo");
		$tree.slideUp(SwitchControl.DownDelay);
	}

	function onClick(e, tid, node, clickFlag)
	{
		if (nThis.bty == node.bty && nThis.vid == node.vid && nThis.fgp == node.fgp && nThis.cid == node.cid)
		{
			return;
		}
		nThis.bty 		= node.bty;
		nThis.vid 		= node.vid;
		nThis.fgp 		= node.fgp;
		nThis.cid 		= node.cid;
		nThis.cardId	= node.cardId;
		nThis.switchBty();
		nThis.notifyChange();
	}

	var treePanel = $("#" + this.treeId);
	if (treePanel.attr("readyState") == "complete")
	{
		treePanel[0].contentWindow.initTree(settings, nThis.treeData);
		nThis.refreshTree();
	}
	else
	{
		treePanel.load(function()
		{
			if(nThis.isLoadTree)return;
			nThis.isLoadTree = true;
			treePanel[0].contentWindow.initTree(settings, nThis.treeData);
			nThis.refreshTree();
			treePanel.attr("readyState","complete"); 
		});		
		if(treePanel[0]&&treePanel[0].contentWindow&&treePanel[0].contentWindow.initTree){
			treePanel[0].contentWindow.initTree(settings, nThis.treeData);
			nThis.refreshTree();			
		}
	}
}

SwitchControl.prototype.refreshTree = function()
{
	var tId = this.id + "NaviTree";
	var tree = $("#" + this.treeId)[0].contentWindow.$.fn.zTree.getZTreeObj(tId);
	if ( tree == null ) return;
	var v = this.bty + "-" + this.vid + "-" + this.fgp + "-" + this.cid;
	var n = tree.getNodeByParam("id", v, null);
	tree.selectNode(n, false);
}

SwitchControl.prototype.reSet = function()
{
	this.fiveList = null;
	this.treeData = null;
	this.initTree();
	this.initBtyList();
	this.switchBty();
}

/**
 * 初始化布局类型列表
 */
SwitchControl.prototype.initLayoutList = function()
{
	//初始化数据
	this.initLayoutType();
	var node = this.switchControl.find("#" + this.layoutId);
	var $downList = $("#" + this.id + "LayoutFrame").contents().find("div");
	if($downList.length==0){
		//debugger
		return;
	}
	$downList.empty();
	var find = false;
	var layout = null;
	if (this.imgIdList != null)
	{
		for (var i = 0; i < this.layoutList.length; i++)
		{
			layout = this.layoutList[i];
			this.addItem($downList, layout.txt, layout.id, this, this.layoutId);
			if (layout.id== this.layout)
			{
				find = true;
			}
		}
	}
	if (!find)
	{
		if (this.layoutList != null && this.layoutList.length > 0)
		{
			var obj = this.layoutList[0];
			this.layout = obj.id;
		}
		else
		{
			this.layout = WebCode.LayoutType.Single;
		}
	}
	this.registerList($downList);
}

/**
 * 初始化图像样式下拉列表
 */
SwitchControl.prototype.initImgIdList = function()
{
	//初始化所需数据
	this.initImgIdType();
	
	var node = this.switchControl.find("#" + this.imgIdId);
	var $downList = $("#" + this.id + "ImgIdFrame").contents().find("div");
	$downList.empty();
	var find = false;
	var imgObj = null;
	if (this.imgIdList != null)
	{
		for (var i = 0; i < this.imgIdList.length; i++)
		{
			imgObj = this.imgIdList[i];
			this.addItem($downList, imgObj.imgText, imgObj.imgId, this, this.imgIdId);
			if (imgObj.imgId == this.imgId)
			{
				find = true;
			}
		}
	}
	if (!find)
	{
		if (this.imgIdList != null && this.imgIdList.length > 0)
		{
			var obj = this.imgIdList[0];
			this.imgId = obj.imgId;
		}
		else
		{
			this.imgId = null;
		}
	}

	this.registerList($downList);
}

SwitchControl.prototype.switchBty = function()
{
	if(this.switchControl==null){
		return;
	}
	var nodebty = this.switchControl.find("#" + this.btyId);
	var nodebtyText = null;
	var node = this.switchControl.find("#" + this.vidId);
	var $downList = $("#" + this.id + "VidFrame").contents().find("div");
	
	$downList.empty();

	var initViewText = null;
	var five;
	var viewList = null;
	if (this.fiveList != null)
	{
		for ( var i = 0; i < this.fiveList.length; i++)
		{
			five = this.fiveList[i];
			if (five.bty != this.bty)
			{
				continue;
			}
			nodebtyText = five.btyText;
			viewList = five.vidList;
		}
	}
	//给指位 bty文本信息赋值
	var $nodebty = $(nodebty).find(".up .text");
	if ($nodebty != null)
	{
		nodebtyText =nodebtyText||"";
		$nodebty.html(nodebtyText);	
	}
	var vid;
	var vidText;
	if (viewList != null)
	{
		for ( var i = 0; i < viewList.length; i++)
		{
			vid = viewList[i].vid;
			vidText = viewList[i].vidText;
			this.addItem($downList, vidText, vid, this, this.vidId);
			if (vid == this.vid)
			{
				initViewText = vidText;
			}
		}
	}
	if (initViewText == null)
	{
		if (viewList != null && viewList.length > 0)
		{
			this.vid = viewList[0].vid;
			initViewText = viewList[0].vidText;
		}
		else
		{
			this.vid = null;
			initViewText = "";
		}
	}
	var $up = $(node).find(".up .text");
	if ($up != null)
	{
		$up.html(initViewText);
	}

	this.initgidComboList();

	this.initGidList();

	this.registerList($downList);

	this.switchVid();
}

SwitchControl.prototype.initgidComboList = function()
{
	var $node = this.switchControl.find("#" + this.groupComboId);
	var $up = $node.find("div:eq(0)").find("span:eq(0)");
	var $downList = $("#" + this.id + "GidComboFrame").contents().find("div");
	
	$downList.empty();

	var initText 		= null;
	var five 			= null;
	var groupList 		= null;
	var groupListText 	= null;
	
	if (this.fiveList != null)
	{
		for (var i = 0; i < this.fiveList.length; i++)
		{
			five = this.fiveList[i];
			if (five.bty != this.bty)
			{
				continue;
			}
			groupList = five.gidList;
			groupListText = five.gidTextList;
		}
	}
	
	var gid;
	var gidText;
	if (groupList != null)
	{
		for ( var i = 0; i < groupList.length; i++)
		{
			gid = groupList[i];
			gidText = groupListText[i];
			this.addItem($downList, gidText, gid, this, this.gidId);
			if (gid == this.gid)
			{
				initText = gidText;
			}
		}
	}
	
	if (initText == null)
	{
		if (groupList != null && groupList.length > 0)
		{
			this.gid = groupList[0];
			initText = groupListText[0];
		}
		else
		{
			this.gid = null;
			initText = "";
		}
	}
	
	if ($up != null)
	{
		$up.html(initText);
	}
	
	this.registerList($downList);
}

SwitchControl.prototype.initGidList = function()
{
	var node = this.switchControl.find("#" + this.gidId);
	var $downList = $("#" + this.id + "GidFrame").contents().find("div");
	$downList.empty();

	var initText = null;
	var five = null;
	var groupList = null;
	var groupListText = null;
	if (this.fiveList != null)
	{
		for ( var i = 0; i < this.fiveList.length; i++)
		{
			five = this.fiveList[i];
			if (five.bty != this.bty)
			{
				continue;
			}
			groupList = five.gidList;
			groupListText = five.gidTextList;
		}
	}
	var gid;
	var gidText;
	if (groupList != null)
	{
		for ( var i = 0; i < groupList.length; i++)
		{
			gid = groupList[i];
			gidText = groupListText[i];
			this.addItem($downList, gidText, gid, this, this.gidId);
			if (gid == this.gid)
			{
				initText = gidText;
			}
		}
	}
	if (initText == null)
	{
		if (groupList != null && groupList.length > 0)
		{
			this.gid = groupList[0];
			initText = groupListText[0];
		}
		else
		{
			this.gid = null;
			initText = "";
		}
	}
	this.registerList($downList);
}

SwitchControl.prototype.switchFgp = function()
{
	var node = this.switchControl.find("#" + this.cidId);
	var $downList = $("#" + this.id + "CidFrame").contents().find("div");
	$downList.empty();
	var firstText = null;
	var five;
	var viewList = null;
	var fgpList = null;
	var cids = null;
	if (this.fiveList != null)
	{
		for ( var i = 0; i < this.fiveList.length; i++)
		{
			five = this.fiveList[i];
			if (five.bty != this.bty) continue;
			viewList = five.vidList;
			break;
		}
	}
	var vid;
	if (viewList != null)
	{
		for ( var i = 0; i < viewList.length; i++)
		{
			vid = viewList[i].vid;
			if (vid != this.vid) continue;
			fgpList = viewList[i].fgpList;
			break;
		}
	}
	var fgp;
	var fgpText;
	if (fgpList != null)
	{
		for ( var i = 0; i < fgpList.length; i++)
		{
			fgp = fgpList[i];
			if(fgp.fgp != this.fgp) continue;
			cids = fgp.cids;
			break;
		}
	}
	var cid;
	var cidText;
	if(cids != null)
	{
		for ( var i = 0; i < cids.length; i++)
		{
			cid = cids[i];
			this.addItem($downList, cid.text, cid.cid, this, this.cidId);
			if (cid.cid == this.cid)
			{
				cidText = cid.text;
			}
		}
	}
	if (cidText == null)
	{
		if (cids != null && cids.length > 0)
		{
			var cid = cids[0];
			this.cid = cid.cid;
			cidText = cid.text;
		}
		else
		{
			this.cid = null;
			cidText = "";
		}
	}
	var $up = $(node).find(".up .text");
	if ($up != null)
	{
		$up.html(cidText);
	}

	this.registerList($downList);
}
SwitchControl.prototype.switchGid = function(){
	
}
SwitchControl.prototype.switchVid = function()
{
	var node = this.switchControl.find("#" + this.fgpId);
	var $downList = $("#" + this.id + "FgpFrame").contents().find("div");
	$downList.empty();
	var firstText = null;
	var five;
	var viewList = null;
	var fgpList = null;
	if (this.fiveList != null)
	{
		for ( var i = 0; i < this.fiveList.length; i++)
		{
			five = this.fiveList[i];
			if (five.bty != this.bty)
				continue;
			viewList = five.vidList;
			break;
		}
	}
	var vid;
	if (viewList != null)
	{
		for ( var i = 0; i < viewList.length; i++)
		{
			vid = viewList[i].vid;
			if (vid != this.vid)
				continue;
			fgpList = viewList[i].fgpList;
			break;
		}
	}

	var fgp;
	var fgpText;
	if (fgpList != null)
	{
		for ( var i = 0; i < fgpList.length; i++)
		{
			fgp = fgpList[i];
			this.addItem($downList, fgp.text, fgp.fgp, this, this.fgpId, fgp.cardId);
			if (fgp.fgp == this.fgp)
			{
				firstText = fgp.text;
			}
		}
	}

	if (firstText == null)
	{
		if (fgpList != null && fgpList.length > 0)
		{
			var fgp 	= fgpList[0];
			this.fgp 	= fgp.fgp;
			this.cardId = fgp.cardId;
			firstText 	= fgp.text;
		}
		else
		{
			this.cardId	= null;
			this.fgp 	= null;
			firstText 	= "";
		}
	}
	var $up = $(node).find(".up .text");
	if ($up != null)
	{
		$up.html(firstText);
	}

	this.registerList($downList);
	
	this.switchFgp();
}

SwitchControl.prototype.addItem = function($parent, text, value, obj, id, cardId)
{
	var $span = $("<span value=" + value + " >" + text + "</span>");
	$span.attr("cardId",cardId);
	$parent.append($span);
	$span.click(function()
	{
		obj.clickItem(id, $(this));
	});
}

SwitchControl.prototype.initDownList = function(listId,callback)
{
	var _this = this;
	var $iFrame = $("#" + listId + "Frame");
	$iFrame.unbind("load");
	$iFrame.bind("load",function(){
		var $head = $iFrame.contents().find("head");
		var $body = $iFrame.contents().find("body");
		$body.css("fontFamily", "'微软雅黑',Arial,sans-serif");
		var $css = $("<link></link>");
		$css.attr("rel", "stylesheet");
		$css.attr("type", "text/css");
		//ie8 iframe引用不到相对路径css  2016年9月29日  hjx
		var before=_this.IEVersion = 8?window.location.protocol +"//"+window.location.host:"";//ie8 iframe引用不到相对路径css  2016年9月29日  hjx
		var cssUrl =before+WebVar.VarPath + "/css/abis/ui/switchcontrol/drop_down_list.css";
		$css.attr("href", cssUrl);
		$head.append($css);
		var cssName = null;
		if (listId == _this.imgIdId || listId == _this.imgComboId)
		{
			cssName = "imgIdList";
		}
		else if (listId == _this.gidId || listId == _this.groupComboId)
		{
			cssName = "gidList";
		}
		else if(listId == _this.layoutId)
		{
			cssName = "layoutList";
		}
		else
		{
			cssName = "bvfList";
		}
		var $div = $("<div class=\"\" ></div>");
		$div.addClass(cssName);
		var clsName = null;
		switch (listId)
		{
			case _this.btyId:
				clsName = "btyHeight";
				break;
			case _this.vidId:
				clsName = "vidHeight";
				break;
			case _this.fgpId:
				clsName = "fgpHeight";
				break;
			case _this.imgIdId:
			case _this.imgComboId:
				clsName = "imgIdHeight";
				break;
			case _this.gidId:
			case _this.groupComboId:
				clsName = "gidHeight";
				break;
			case _this.cidId:
				clsName = "cidHeight";
				break;
			case _this.layoutId:
				clsName = "layoutHeight";
				break;
		}
		$div.addClass(clsName +" list");
		$body.append($div);
		if(WebUtil.isFunction(callback)){
			callback();
		}
    }); 
	
}

SwitchControl.prototype.initBtyList = function()
{
	var $node = this.switchControl.find("#" + this.btyId);
	var $up = $node.find("div:eq(0)").find("span:eq(0)");
	var _this = this;
	var $downList = $("#" + _this.id + "BtyFrame").contents().find("div");
	$downList.empty();
	var firstText = null;
	var five;
	if (_this.fiveList != null)
	{
		for ( var i = 0; i < _this.fiveList.length; i++)
		{
			five = _this.fiveList[i];
			_this.addItem($downList, five.btyText, five.bty, _this, _this.btyId);
			if (five.bty == _this.bty)
			{
				firstText = five.btyText;
			}
		}
	}
	if (firstText == null)
	{
		if (_this.fiveList != null && _this.fiveList.length > 0)
		{
			_this.bty = _this.fiveList[0].bty;
			firstText = _this.fiveList[0].btyText;
		}
		else
		{
			_this.bty = null;
			firstText = "";
		}
	}
	if ($up != null)
	{
		$up.html(firstText);
	}
	_this.registerList($downList);	
//	$("#" + this.id + "BtyFrame").bind("load",function(){
//	
//	})
	
}
/**
 * 菜单点击事件
 * @param id   iframe id
 * @param item  <span class="select" value="0">**</span>
 */
SwitchControl.prototype.clickItem = function(id, item)
{
	this.hiddenAll();
	var value = parseInt($(item).attr("value"));
	if (id == this.btyId)
	{
		if (this.bty == value) return;
		this.bty = value;
		this.vid = null;
	}
	else if (id == this.vidId)
	{
		if (this.vid == value) return;
		this.vid = value;
		this.fgp = null;
	}
	else if (id == this.fgpId)
	{
		if (this.fgp == value) return;
		this.fgp = value;
		this.cardId = $(item).attr("cardId");
	}
	else if (id == this.cidId)
	{
		if (this.cid == value) return;
		this.cid = value;
	}
	else if (id == this.imgIdId)
	{
		if (this.imgId == value) return;
		this.imgId = value;
	}
	else if (id == this.gidId)
	{
		if (this.gid == value) return;
		this.gid = value;
	}
	else if (id == this.imgComboId)
	{
		if (this.imgId == value) return;
		this.imgId = value;
	}
	else if (id == this.groupComboId)
	{
		if (this.gid == value) return;
		this.gid = value;
	}
	else if(id == this.layoutId)
	{
		this.layout = value;
		if(this.layoutInvoke)
		{
			this.layoutInvoke(this.layout);
		}
		return;
	}
	var $idDiv = this.switchControl.find("#" + id);
	var $upDiv = $idDiv.find("div:eq(0)");
	var $textDiv = $upDiv.find("span:eq(0)");
	$textDiv.html($(item).html());
	if (id == this.btyId)
	{
		this.switchBty();
	}
	else if (id == this.vidId)
	{
		this.switchVid();
	}
	else if(id == this.fgpId)
	{
		this.switchFgp();
	}
	this.refreshTree();
	this.notifyChange();
}

SwitchControl.prototype.initImgIdComboList = function()
{
	var $node = this.switchControl.find("#" + this.imgComboId);
	var $up = $node.find("div:eq(0)").find("span:eq(0)");
	var $downList = $("#" + this.id + "ImgIdComboFrame").contents().find("div");
	$downList.empty();

	var firstText = null;
	var ImgIdObj;
	if (this.imgIdList != null)
	{
		for ( var i = 0; i < this.imgIdList.length; i++)
		{
			ImgIdObj = this.imgIdList[i];
			this.addItem($downList, ImgIdObj.imgText, ImgIdObj.imgId, this, this.imgComboId);
			if (ImgIdObj.imgId == this.imgId)
			{
				firstText = ImgIdObj.imgText;
			}
		}
	}
	if (firstText == null)
	{
		if (this.imgIdList != null && this.imgIdList.length > 0)
		{
			this.imgId = this.imgIdList[0].imgId;
			firstText = this.imgIdList[0].imgText;
		}
		else
		{
			this.imgId = null;
			firstText = "";
		}
	}
	if ($up != null)
	{
		$up.html(firstText);
	}
	this.registerList($downList);
}

SwitchControl.prototype.switchLayout = function()
{
	
}

SwitchControl.prototype.notifyChange = function()
{
	if(this.invoke)
	{
        if (this.bty == null || this.vid == null || this.fgp == null || this.imgId == null || this.cid == null)
        {
            this.invoke(this.id, null, null, null, null, null, null,null);
        }else{
            var intBty 	= parseInt(this.bty);
            var intVid 	= parseInt(this.vid);
            var intFgp 	= parseInt(this.fgp);
            var intCid 	= parseInt(this.cid);
            var intImgId= parseInt(this.imgId);
            var intGid 	= parseInt(this.gid);
            var cardId	= parseInt(this.cardId);
            this.invoke(this.id, intBty, intVid, intFgp, intCid, intImgId, intGid,cardId);
        }
	}
};

SwitchControl.prototype.hiddenAll = function()
{
	this.hiddenOtherList(null);
}

SwitchControl.prototype.hiddenOtherList = function(id)
{
	var controls = $(".dropdown");
	controls.each(function(i)
	{
		if ($(this).attr("id") != id)
		{
			// 需隐藏的列表
			var $up = $(this).find("div:eq(0)");
			$up.attr("class", "up");
			var $frame = $(this).find("iframe");
			$frame.slideUp(SwitchControl.DownDelay);
		}
	});

	// 隐藏其他
	var controls = $(".downList");
	controls.each(function(i)
	{
		if ($(this).attr("id") != id)
		{
			//需要隐藏掉的列表
			var $up = $(this).find("div:eq(0)");
			$up.attr("class", "up");
			var $frame = $(this).find("iframe");
			$frame.slideUp(SwitchControl.DownDelay);
		}
	});

	var nThis = this;
	var $trees = $(".tree_panel");
	$trees.each(function(i)
	{
		var treeId = $(this).attr("id");
		if (treeId != id)
		{
			var $logo = $("#" + nThis.id + "Logo");
			if (!$logo.is(":hidden"))
			{
				var cname = $logo.attr("class");
				var flag = "";
				if ( cname!=null )
				{
					var flags = cname.split("_");
					if (flags.length > 1)
					{
						flag += flags[0] + "_";
					}					
				}
				
				$logo.attr("class", flag + "logo");
				$(this).slideUp(SwitchControl.DownDelay);
			}
		}
	});

	var controls = $(".img_show_list");
	controls.each(function(i)
	{
		var sid = $(this).attr("id");
		if (sid != id)
		{
			$(this).slideUp(SwitchControl.DownDelay);
			var tempId = nThis.id + "ImgId";
			var f = $("#" + tempId);
			f.attr("class","imgid_bnt");
		}
	});

	var controls = $(".mnt_id_list");
	controls.each(function(i)
	{
		var sid = $(this).attr("id");
		if (sid != id)
		{
			$(this).slideUp(SwitchControl.DownDelay);
			var tempId = nThis.id + "Gid";
			var f = $("#" + tempId);
			f.attr("class","gid_bnt");
		}
	});
	
	var controls = $(".layout_list");
	controls.each(function(i)
	{
		var sid = $(this).attr("id");
		if (sid != id)
		{
			$(this).slideUp(SwitchControl.DownDelay);
			var tempId = nThis.id + "Layout";
			var f = $("#" + tempId);
			f.attr("class","layout_bnt");
		}
	});
	
}

/**
 * 初始化事件
 */
SwitchControl.prototype.initEvent = function()
{
	var obj = this;
	$(document).click(function(event)
	{
			
		var ev = event || window.event;
		var element = ev.srcElement || ev.target;
		
		var b1 = element.id.indexOf("ImgId") >= 0;
		var b2 = element.id.indexOf("Gid") >= 0;
		var b3 = element.id.indexOf("Layout") >= 0;
		
		//判断是不是点击了ImgId按钮和Gid按钮
		if(b1 || b2 || b3)
		{
				return;
		}
		if (element.nodeName == "A" )
		{
			return;
		}
		else if (element.id.indexOf("Logo") >= 0)
		{
			return;
		}
		else if (element.className == "dropbnt")
		{
			var id = element.parentNode.parentNode.id;
			obj.hiddenOtherList(id);
			return;
		}
		obj.hiddenAll();
	});


	this.switchControl.bind("selectstart", function()
	{
		return false;
	});
	this.switchControl.bind("contextmenu", function()
	{
		return false;
	});

	//注册下拉列表按钮事件
	this.registerDropDown(this.btyId);
	this.registerDropDown(this.vidId);
	this.registerDropDown(this.fgpId);
	this.registerDropDown(this.cidId);
	this.registerDropDown(this.imgComboId);
	this.registerDropDown(this.groupComboId);

	//注册生物特征锁定事件
	this.registerLockEvent(this.btyId);
	this.registerLockEvent(this.vidId);
	this.registerLockEvent(this.fgpId);
	this.registerLockEvent(this.cidId);
	
	//注册全局导航按钮事件
	this.registerNavigate();

	//注册五要素树形控件事件
	this.registerLogoEvent();

	//注册图像按钮事件
	this.registerImgIdEvent();

	//注册特征按钮事件
	this.registerMntIdEvent();

	//注册布局按钮事件
	this.registerLayoutTypeEvent();
	
	//注册互斥的下拉列表
	this.frameList[this.btyId] 			= this.id 	+ "BtyFrame";
	this.frameList[this.vidId] 			= this.id 	+ "VidFrame";
	this.frameList[this.fgpId] 			= this.id 	+ "FgpFrame";
	this.frameList[this.imgIdId] 		= this.id 	+ "ImgIdFrame";
	this.frameList[this.gidId] 			= this.id 	+ "GidFrame";
	this.frameList[this.layoutId] 		= this.id 	+ "LayoutFrame";
	this.frameList[SwitchControl.Tree] 	= this.treeId;
}

SwitchControl.prototype.registerLayoutTypeEvent = function()
{
	var listId = this.id + "LayoutFrame";
	var f = $("#" + listId);
	var id = this.id + "Layout";
	var $bnt = this.switchControl.find("#"+id);
	var nThis = this;
	$bnt.mouseover(function()
	{
		if(f.is(":hidden"))
		{
			$(this).attr("class","layout_bnt_hover");
		}
	});
	
	$bnt.mouseout(function()
	{
		if(f.is(":hidden"))
		{
			$(this).attr("class","layout_bnt");
		}
	});
	
	$bnt.mousedown(function()
	{
		if(f.is(":hidden"))
		{
			//定位列表
			var top = $(this).offset().top + $(this).height() -1;
			f.css("top",top+"px");
			$(this).attr("class","layout_bnt_down");
			nThis.hiddenOtherList(listId);
			f.slideToggle(SwitchControl.DownDelay);
			var $downList = f.contents().find("div");
		    $downList.children().each(function(i)
		    {
			    if ($(this).attr("value") == nThis.layout)
			    {
				    $(this).attr("class", "select");
				    selectedIndex = i;
			    }
			    else
			    {
				    $(this).attr("class", "");
			    }
		    });
		}
		else
		{
			f.slideUp(SwitchControl.DownDelay);
			$(this).attr("class","layout_bnt_hover");
		}
    });
}

SwitchControl.prototype.registerImgIdEvent = function()
{
	var listId = this.id + "ImgIdFrame";
	var f = $("#" + listId);
	var imgBntId = this.id + "ImgId";
	var $bnt = this.switchControl.find("#"+imgBntId);
	var nThis = this;
	$bnt.mouseover(function()
	{
		if(f.is(":hidden"))
		{
			$(this).attr("class","imgid_bnt_hover");
		}
	});
	
	$bnt.mouseout(function()
	{
		if(f.is(":hidden"))
		{
			$(this).attr("class","imgid_bnt");
		}
	});
	
	$bnt.mousedown(function()
	{
		if(f.is(":hidden"))
		{
			//定位列表
			var top = $(this).offset().top + $(this).height() -1;
			f.css("top",top+"px");
			$(this).attr("class","imgid_bnt_down");
			nThis.hiddenOtherList(listId);
			f.slideToggle(SwitchControl.DownDelay);
			var $downList = f.contents().find("div");
		    $downList.children().each(function(i)
		    {
			    if ($(this).attr("value") == nThis.imgId)
			    {
				    $(this).attr("class", "select");
				    selectedIndex = i;
			    }
			    else
			    {
				    $(this).attr("class", "");
			    }
		    });
		}
		else
		{
			f.slideUp(SwitchControl.DownDelay);
			$(this).attr("class","imgid_bnt_hover");
		}
    });
}

SwitchControl.prototype.registerMntIdEvent = function()
{
	var gidListId 	= this.id + "GidFrame";
	var f 			= $("#" + gidListId);
	var gidBntId 	= this.id + "Gid";
	var $bnt 		= this.switchControl.find("#" + gidBntId);
	var nThis 		= this;
	$bnt.mouseover(function()
	{
		if(f.is(":hidden"))
		{
			$(this).attr("class","gid_bnt_hover");
		}
	});
	
	$bnt.mouseout(function()
	{
		if(f.is(":hidden"))
		{
			$(this).attr("class","gid_bnt");
		}
	});
	$bnt.mousedown(function()
	{
		if(f.is(":hidden"))
		{
			//定位列表
			var top = $(this).offset().top + $(this).height() -1;
			f.css("top",top+"px");
			$(this).attr("class","gid_bnt_down");
			nThis.hiddenOtherList(gidListId);
			f.slideToggle(SwitchControl.DownDelay);
		    var $downList = f.contents().find("div");
		    $downList.children().each(function(i)
		    {
			    if ($(this).attr("value") == nThis.gid)
			    {
				    $(this).attr("class", "select");
				    selectedIndex = i;
			    }
			    else
			    {
				    $(this).attr("class", "");
			    }
		    });
		}
		else
		{
			f.slideUp(SwitchControl.DownDelay);
			$(this).attr("class","gid_bnt_hover");
		}
    });
}




/** 注册树形控件显隐事件
 */
SwitchControl.prototype.registerLogoEvent = function()
{
	var $logo = this.switchControl.find("#" + this.logoId);
	var $tree = $("#" + this.treeId);
	var nThis = this;
	$logo.mouseover(function()
	{
		if ($tree.is(":hidden"))
		{
			$(this).attr("class", nThis.flag + "logohover");
		}
	});
	$logo.mouseout(function()
	{
		if ($tree.is(":hidden"))
		{
			$(this).attr("class", nThis.flag + "logo");
		}
	});
	$logo.mousedown(function()
	{
		//定位列表树TOP
		var top = nThis.switchControl.offset().top + nThis.switchControl.height() - 1;
		
		var $tree = $("#" + nThis.treeId);
		$tree.css("top",top + "px");
		$(this).attr("class", nThis.flag + "logodown");
		if (!$tree.is(":hidden"))
		{
			$(this).attr("class", nThis.flag + "logohover");
		}
		nThis.hiddenOtherList(nThis.treeId);
		$tree.slideToggle(SwitchControl.DownDelay);
	});
}


/**
 * 注册图像浏览方式下拉列表的点击事件 
 */
SwitchControl.prototype.registerImgId = function()
{
	var ImgIdDiv = $(this.switchControl).find("#" + this.imgIdId);
	var upDiv = $(ImgIdDiv).find("div:eq(0)");
	var $text = $(upDiv).find("span:eq(0)");
	var $downList = $("#" + this.id + "ImgIdFrame").contents().find("div");
	var obj = this;
	$text.click(function(e)
	{
		if (e.button != 0) { return; }
			/*
			 	 如果当前浏览的图像非(优先压缩图|不使用)则选用优先压缩图
		    	3表示优先压缩图
				4表示不使用图像
			*/
		    if (obj.ImgId == 3)
		    {
			    obj.ImgId = 4;
		    }
		    else if (obj.ImgId == 4)
		    {
			    obj.ImgId = 3;
		    }
		    if (obj.ImgId != 3 && obj.ImgId != 4)
		    {
			    obj.ImgId = 3;
		    }
		    $downList.children().each(function(i)
		    {
			    if (obj.ImgId == $(this).attr("value"))
			    {
				    $text.html($(this).html());
			    }
		    });
		    obj.notifyChange();
	    });

	//注册列表项事件
	this.registerList($downList);
}

/**
 * 注册全局导航按钮事件
 */
SwitchControl.prototype.registerNavigate = function()
{
	var $prevBnt = this.switchControl.find("#" + this.gPrevBntId);
	var $nextBnt = this.switchControl.find("#" + this.gNextBntId);
	var obj = this;
	$prevBnt.mouseover(function()
	{
		$(this).attr("class", obj.flag + "prev_navi_hover");
	});

	$prevBnt.mouseout(function()
	{
		$(this).attr("class", obj.flag + "prev_navi");
	});

	$prevBnt.mouseup(function()
	{
		$(this).attr("class", obj.flag + "prev_navi_hover");
	});

	$prevBnt.mousedown(function(e)
	{
		if (obj.IEVersion == 9 && e.button != 0)
			return;
		if (obj.IEVersion == 8 && e.button != 1)
			return;
		$(this).attr("class", obj.flag + "prev_navi_down");

	});

	$prevBnt.click(function(e)
	{
		if (e.button != 0)
			return;
		obj.navigateClick(-1);
	});

	$nextBnt.mouseover(function()
	{
		$(this).attr("class", obj.flag + "next_navi_hover");
	});

	$nextBnt.mouseout(function()
	{
		$(this).attr("class", obj.flag + "next_navi");
	});

	$nextBnt.mouseup(function()
	{
		$(this).attr("class", obj.flag + "next_navi_hover");
	});

	$nextBnt.mousedown(function(e)
	{
		if (obj.IEVersion == 9 && e.button != 0)
			return;
		if (obj.IEVersion == 8 && e.button != 1)
			return;
		$(this).attr("class", obj.flag + "next_navi_down");
	});

	$nextBnt.click(function(e)
	{
		if (e.button != 0)
			return;
		obj.navigateClick(1);
	});
}

SwitchControl.prototype.navigateClick = function(op)
{
	if (this.cidLock || !this.execNavigate(this.cidId, this.cid, op))
	{
		if (this.fgpLock || !this.execNavigate(this.fgpId, this.fgp, op))
		{
			if (this.vidLock || !this.execNavigate(this.vidId, this.vid, op))
			{
				if (!this.btyLock)
				{
					this.execNavigate(this.btyId, this.bty, op);
				}
			}
		}
	}
}

SwitchControl.prototype.getIndex = function($node, value)
{
	var index = -1;
	$node.children().each(function(i)
	{
		if ($(this).attr("value") == value)
		{
			index = i;
			return;
		}
	});
	return index;
}

SwitchControl.prototype.execNavigate = function(id, value, op)
{
	var parent = this.switchControl.find("#" + id);
	var upDiv = $(parent).find("div:eq(0)");
	var txt = $(upDiv).find("span:eq(0)");
	var content = $("#" + id + "Frame").contents().find("div");
	var index = this.getIndex(content, value);
	if (op < 0 && index < 1)
	{
		return false;
	}
	if (op > 0 && index >= content.children().length - 1)
	{
		return false;
	}
	index += op;

	var $item = content.find("span:eq(" + index + ")");
	$(txt).html($item.html());
	value = $item.attr("value");
	if (id == this.btyId)
	{
		this.bty = value;
		if (op < 0)
		{
			var five;
			var vidObj;
			for ( var i = 0; i < this.fiveList.length; i++)
			{
				five = this.fiveList[i];
				if (five.bty == this.bty)
				{
					vidObj = five.vidList[five.vidList.length - 1];
					break;
				}
			}
			this.vid = vidObj.vid;
			var fgpObj 	= vidObj.fgpList[vidObj.fgpList.length - 1];
			this.fgp 	= fgpObj.fgp;
			this.cardId	= fgpObj.cardId;
			var cidObj 	= fgpObj.cids[fgpObj.cids.length - 1];
			this.cid 	= cidObj.cid;
		}
		else
		{
			this.vid = null;
			this.fgp = null;
			this.cid = null;
		}
		this.switchBty();
	}
	else if (id == this.vidId)
	{
		this.vid = value;
		if (op < 0)
		{
			var five;
			var fgpList = null;
			for ( var i = 0; i < this.fiveList.length; i++)
			{
				five = this.fiveList[i];
				if (five.bty == this.bty)
				{
					for ( var j = 0; j < five.vidList.length; j++)
					{
						var vidObj = five.vidList[j];
						if (vidObj.vid == this.vid)
						{
							fgpList = vidObj.fgpList;
							break;
						}
					}
					if (fgpList != null) break;
				}
			}
			var fgpObj 	= fgpList[fgpList.length - 1];
			this.fgp 	= fgpObj.fgp;
			this.cardId	= fgpObj.cardId;
			var cidObj 	= fgpObj.cids[fgpObj.cids.length - 1];
			this.cid 	= cidObj.cid;
		}
		else
		{
			this.fgp = null;
			this.cid = null;
		}
		this.switchVid();
	}
	else if (id == this.fgpId)
	{
		this.fgp = value;
		if (op < 0)
		{
			var five;
			var cidList = null;
			for ( var i = 0; i < this.fiveList.length; i++)
			{
				five = this.fiveList[i];
				if (five.bty == this.bty)
				{
					for ( var j = 0; j < five.vidList.length; j++)
					{
						var vidObj = five.vidList[j];
						if (vidObj.vid == this.vid)
						{
							for(var k =0; k < vidObj.fgpList.length;k++)
							{
								var fgpObj = vidObj.fgpList[k];
								if (fgpObj.fgp == this.fgp)
								{
									this.cardId	= fgpObj.cardId;
									cidList = fgpObj.cids;
									break;
								}
							}
						}
						if(cidList != null)break;
					}
					if(cidList != null)break;
				}
			}
			var cidObj = cidList[fgpObj.cids.length - 1];
			this.cid = cidObj.cid;
		}
		else
		{
			this.cid = null;
		}
		this.switchFgp();
	}
	else if(id == this.cidId)
	{
		this.cid = value;
	}
	this.refreshTree();
	this.notifyChange();
	return true;
}

SwitchControl.prototype.registerLockEvent = function(listId)
{

	var $parent = this.switchControl.find("#" + listId);
	var $upDiv = $parent.find("div:eq(0)");
	var $text = $upDiv.find("span:eq(0)");
	var obj = this;
	$text.click(function(e)
	{
		if (e.button != 0)
			return;
		var lock = null;
		if (listId == obj.btyId)
		{
			obj.btyLock = !obj.btyLock;
			lock = obj.btyLock;
		}
		else if (listId == obj.vidId)
		{
			obj.vidLock = !obj.vidLock;
			lock = obj.vidLock;
		}
		else if (listId == obj.fgpId)
		{
			obj.fgpLock = !obj.fgpLock;
			lock = obj.fgpLock;
		}
		else if (listId == obj.cidId)
		{
			obj.cidLock = !obj.cidLock;
			lock = obj.cidLock;
		}
		if (lock == true)
		{
			$text.addClass("fiveElock");
		}
		else
		{
			$text.removeClass("fiveElock");
		}
	});
}

SwitchControl.prototype.execNaviagte = function(listId, content, text, op)
{
	var value = null;
	if (listId == this.btyId)
	{
		value = this.bty;
	}
	else if (listId == this.vidId)
	{
		value = this.vid;
	}
	else if (listId == this.fgpId)
	{
		value = this.fgp;
	}
	else if (listId == this.imgIdId || listId == this.imgComboId)
	{
		value = this.imgId;
	}
	else if (listId == this.gidId || listId == this.groupComboId)
	{
		value = this.gid;
	}
	var index = this.getIndex(content, value);
	if (op < 0 && index < 1)
		return;
	if (op > 0 && index >= content.children().length - 1)
		return;
	index += op;
	var $item = content.find("span:eq(" + index + ")");
	$(text).html($item.html());
	value = $item.attr("value");
	if (listId == this.btyId)
	{
		this.bty = value;
		this.switchBty();
	}
	else if (listId == this.vidId)
	{
		this.vid = value;
		this.switchVid();
	}
	else if (listId == this.fgpId)
	{
		this.fgp = value;
	}
	else if (listId == this.imgIdId || listId == this.imgComboId)
	{
		this.imgId = value;
	}
	else if (listId == this.gidId || listId == this.groupComboId)
	{
		this.gid = value;
	}
	this.refreshTree();
	this.notifyChange();
}

SwitchControl.prototype.registerDropDown = function(id)
{
	var parent = this.switchControl.find("#" + id);	
	var up = parent.find("div:eq(0)");
	var $frame = $("#" + id + "Frame");
	var obj = this;
	var bnt = up.find("span:eq(1)");
	bnt.hover(function()
	{
		if ($frame.is(":hidden"))
		{
			up.attr("class", "uphover");
		}
	});
	bnt.mouseout(function()
	{
		if ($frame.is(":hidden"))
		{
			up.attr("class", "up");
		}
	});

	bnt.mousedown(function(e)
	{
		if(e.button !=0 && e.button != 1)return;

		if (up.attr("class") == "updown")
		{
			$frame.slideUp(SwitchControl.DownDelay);
			up.attr("class", "uphover");
		}
		else
		{
			//首先定位
			var top = parent.offset().top + parent.height() -1;
			$frame.css("top",top + "px");
			up.attr("class", "updown");
			$frame.slideDown(SwitchControl.DownDelay, function()
			{
				var v;
			    if (id == obj.btyId)
			    {
				    v = obj.bty;
			    }
			    else if (id == obj.vidId)
			    {
				    v = obj.vid;
			    }
			    else if (id == obj.fgpId)
			    {
				    v = obj.fgp;
			    }
			    else if( id == obj.cidId)
			    {
			    	v = obj.cid;
			    }
			    else if (id == obj.ImgIdId || id == obj.imgComboId)
			    {
				    v = obj.ImgId;
			    }
			    else if (id == obj.gidId || id == obj.groupComboId)
			    {
				    v = obj.gid;
			    }
			    //选中列表中对应的选项
			    var node;
			    var selectedIndex;
			    var $downList = $frame.contents().find("div");
			    $downList.children().each(function(i)
			    {
				    if ($(this).attr("value") == v)
				    {
					    $(this).attr("class", "select");
					    selectedIndex = i;
				    }
				    else
				    {
					    $(this).attr("class", "");
				    }
			    });
			    
			    //已知选中的索引，如果没有显示在有效区，则进行调整列表的滚动条
			    var $item = $downList.find(":eq(1)");
			    var itemHeight = parseFloat($item.css("height"));
			    var paddingTop = parseFloat($item.css("paddingTop"));
			    var paddingBottom = parseFloat($item.css("paddingBottom"));
			    itemHeight += paddingTop + paddingBottom;
			    var scrollY = itemHeight * parseInt(selectedIndex);
			    $downList.attr("scrollTop", scrollY);
		    });
		}
	});
}

SwitchControl.prototype.registerList = function($content)
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

SwitchControl.prototype.getFgpText = function(bty, vid, fgp)
{
	var fiveE;
	var viewObj;
	var f;
	if (this.fiveList == null) return null;
	for ( var i = 0; i < this.fiveList.length; i++)
	{
		fiveE = this.fiveList[i];
		if (fiveE.bty != bty) continue;
		for ( var j = 0; j < fiveE.vidList.length; j++)
		{
			viewObj = fiveE.vidList[j];
			if (viewObj.vid != vid) continue;
			for ( var k = 0; k < viewObj.fgpList.length; k++)
			{
				f = viewObj.fgpList[k];
				if (f == fgp)
				{
					var data =
					{
					    "bty" : fiveE.btyText,
					    "vid" : viewObj.vidText,
					    "fgp" : viewObj.fgpListText[k]
					};
					return data;
				}
			}
		}
	}
}
SwitchControl.prototype.getCid = function()
{
	return this.cid;
}

SwitchControl.prototype.setCid = function(cid)
{
	this.cid = cid;
}
SwitchControl.prototype.getBty = function()
{
	return this.bty;
}

SwitchControl.prototype.setBty = function(bty)
{
	this.bty = bty;
}

SwitchControl.prototype.getVid = function()
{
	return this.vid;
}

SwitchControl.prototype.setVid = function(vid)
{
	this.vid = vid;
}

SwitchControl.prototype.getFgp = function()
{
	return this.fgp;
}

SwitchControl.prototype.setFgp = function(fgp)
{
	this.fgp = fgp;
}
SwitchControl.prototype.getImgId = function()
{
	return this.imgId;
}

SwitchControl.prototype.setImgId = function(ImgId)
{
	this.imgId = ImgId;
}

SwitchControl.prototype.getGid = function()
{
	return this.gid;
}

SwitchControl.prototype.setGid = function(gid)
{
	this.gid = gid;
}
SwitchControl.prototype.getType = function()
{
	return this.type;
}

SwitchControl.prototype.setType = function(type)
{
	this.type = type;
}
SwitchControl.prototype.setIsMatch = function(isMatch)
{
	this.isMatch = isMatch;
}


SwitchControl.prototype.isInit = function()
{
	return this.hasInit;
}

SwitchControl.prototype.setChangeListener = function(listener)
{
	this.invoke = listener;
}

SwitchControl.prototype.showLayoutBnt = function()
{
	var layoutBnt	= $("#" + this.layoutId);
	layoutBnt.show();
}

SwitchControl.prototype.hideLayoutBnt = function()
{
	var layoutBnt	= $("#" + this.layoutId);
	layoutBnt.hide();
}
/*
 * 校验该指位 是否存在
 *先校验 bty指纹/掌纹 
 *vidList.vid  滚动平面
 *vidList.fgpList  指位
 */
SwitchControl.prototype.validate = function(bty,vid,fgp){
	if(WebUtil.isNull(this.fiveList)) {
		return false;
	}
	var fiveE;
	var viewObj;
	var f;
	for ( var i = 0; i < this.fiveList.length; i++)
	{
		fiveE = this.fiveList[i];
		if (fiveE.bty != bty) continue;
		for ( var j = 0; j < fiveE.vidList.length; j++)
		{
			viewObj = fiveE.vidList[j];
			if (viewObj.vid != vid) continue;
			for ( var k = 0; k < viewObj.fgpList.length; k++)
			{
				f = viewObj.fgpList[k];
				if (f.fgp == fgp)
				{
					return true;
				}
			}
		}
	}
	return false;
}
/*
 * 用来获取两个控件   第一个同步的指位（解决TT认定，指位候选卡，缺省第一指位  源卡为空的bug）
 * 
 * treeData2： 另一个控件的 treeData
 * p：限制条件   比如 需要认定掌纹， 第一个同步的指位是指纹  就不能返回
 * {bty,vid,fgp,cid}
 */
SwitchControl.prototype.getFristSyn = function(treeData2,p){
	var nThis = this;
	if(WebUtil.isNull(this.treeData)||WebUtil.isNull(treeData2)) {
		return null;
	}
	if(WebUtil.isNull(p)) {
		p={};
	}
	for ( var i = 0; i < this.treeData.length; i++){
		for ( var j = 0; j < treeData2.length; j++){
			if(WebUtil.isNull(this.treeData[i])||WebUtil.isNull(treeData2[j])) {
				continue;
			}
			if(WebUtil.isNull(this.treeData[i].cardId)||WebUtil.isNull(treeData2[j].cardId)) {
				continue;
			}
			if(WebUtil.isNull(this.treeData[i].id)||WebUtil.isNull(treeData2[j].id)) {
				continue;
			}
			var node = this.treeData[i];
			if(this.treeData[i].id==treeData2[j].id){
				if(!WebUtil.isNull(p.bty)&&p.bty!=node.bty){
					continue;
				}
				if(!WebUtil.isNull(p.vid)&&p.vid!=node.vid){
					continue;
				}
				if(!WebUtil.isNull(p.fgp)&&p.bty!=node.fgp){
					continue;
				}
				if(!WebUtil.isNull(p.cid)&&p.cid!=node.cid){
					continue;
				}
				nThis.bty 		= node.bty;
				nThis.vid 		= node.vid;
				nThis.fgp 		= node.fgp;
				nThis.cid 		= node.cid;
				nThis.cardId	= node.cardId;
				nThis.switchBty();
				nThis.notifyChange();
				return node;
			}
		}
	}
	return null;
}
