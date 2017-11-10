
MenuInfo.prototype.index = 0;

function MenuInfo(searchParm,linkList,listProtalPage)
{	
	this.searchParm = searchParm;
	this.init(linkList,listProtalPage);
}

MenuInfo.prototype.init = function(linkList,listProtalPage)
{
	var hti = WebUtil.getContentHeight() - 50;
	$("#stree1").height(hti);
	$("#treediv1").height(hti + 40);
	$("#stree2").height(hti - 33);
	$("#treediv2").height(hti + 40);
//	var friends = $("#chupageId");
//	friends.empty();
//	if(!WebUtil.isNull(listProtalPage) && listProtalPage != "null")
//	{
//		for(var i = 0;i < listProtalPage.length;i++)
//		{
//			var option = "<option id='' value='"+listProtalPage[i].id+"'  title='0'>"+listProtalPage[i].name+"</option>";
//			friends.append(option);
//		}
//	}
//	var option1 = "<option id='' value='/tp/feedback/'  title='0'>活采</option>";
//	var option2 = "<option id='' value='/match/taskmgrinfo/'  title='0'>比对任务管理信息</option>";
//	var option3 = "<option id='' value='/sys/general/'  title='0'>系统概括信息</option>";
//	friends.append(option1);
//	friends.append(option2);
//	friends.append(option3);
	
	var friendParm = $("#menuParmLinkId");
	friendParm.empty();
	if(!WebUtil.isNull(linkList) && linkList != "null")
	{
		for(var i=0;i<linkList.length;i++) 
		{    
			var option = "<option id='"+linkList[i].url+"' value='"+linkList[i].id+"'  title='"+linkList[i].linkMode+"'>"+linkList[i].descriptionName+"</option>";
			friendParm.append(option);
		}
	}
}

MenuInfo.prototype.addMenu = function(menuList)
{
	var treeObj = $.fn.zTree.getZTreeObj("stree2");
	var nodes = treeObj.getSelectedNodes();
	var newMenuStr = AbisMessageResource['NewMenu'];
	var newNode = {id:"Menu_" + this.index,pId:"root",name:newMenuStr,nameId:"newMenu",yname:"newMenu",oname:name,newMenuStr:"newMenu",oyname:"newMenu",
			open: true,click: true,dropPrev: false,linkId: ""};//,iconSkin:"iconfilef"
	if(nodes[0] != null)
	{
		var nid = nodes[0].id;
		nid = nid.substring(0,4);
		if(nid == "Menu")
		{
			newNode = treeObj.addNodes(nodes[0], newNode);
		}
		else
		{
			newNode = treeObj.addNodes(null, newNode);
		}
	}
	else
	{
		newNode = treeObj.addNodes(nodes[0], newNode);
	}
	this.index ++;
}

function addMenuTree()
{
	var treeObj = $.fn.zTree.getZTreeObj("stree2");
	var nodes = treeObj.getSelectedNodes();
	$("#addMenudialog").find("input[name=menutype]").each(function(){
		if($(this).attr("checked"))
		{
			var id= "Menu_"+$(this).attr("id");
			var name = $(this).attr("title");
			var nameId = $(this).val();
			var newNode = {id:id,pId:"root",name:name,nameId:nameId,yname:nameId,oname:name,onameId:nameId,oyname:nameId,open: true,click: true,dropPrev: false,linkId: ""};
			newNode = treeObj.addNodes(nodes[0], newNode);
		}
	});
	treeObj.refresh();
}

MenuInfo.prototype.addPage = function(menuItemList)
{
	this.data = menuItemList;
	var vthis = this;
	$("#addPagedialog").html("");
	var num = 1;
	for(d in this.data)
	{
		if(num % 4 == 0)
		{
        	$("#addPagedialog").append("<span class='worktypediv'><input type='checkbox' onchange='' class='menuitmetype' name='menuitmetype' value='"+this.data[d].disp+"' title='"+this.data[d].dispName+"' id='"+this.data[d].id+"'/>&nbsp;"+this.data[d].dispName+"</span>" );
        	$("#addPagedialog").append("</br></br>");
		}
    	else
    	{
    		$("#addPagedialog").append("<span class='worktypediv'><input type='checkbox' onchange='' class='menuitmetype' name='menuitmetype' value='"+this.data[d].disp+"' title='"+this.data[d].dispName+"' id='"+this.data[d].id+"'/>&nbsp;"+this.data[d].dispName+"</span>");
    	}
       num++;
	}	
	num --;
	if(num % 4 != 0)
	{
		$("#addMenudialog").append("</br></br>");
	}
	
	$.dialog({
	    title: AbisMessageResource['AddPage'],
	    content: document.getElementById('addPagedialog'),	   
	    okValue: ''+vthis.searchParm.OK+'',
	    cancelValue:''+vthis.searchParm.Cancel+'',	 
	    ok: function () {addPageTree();},
	    cancel: function () {
		   return true;
        }
	});
}

function addPageTree()
{
	var Obj = $.fn.zTree.getZTreeObj("stree2");
	var nodes = Obj.getSelectedNodes();

	$("#addPagedialog").find("input[name=menuitmetype]").each(function(){
		if($(this).attr("checked"))
		{
			var Id= "Page_"+$(this).attr("id");
			var name = $(this).attr("title");
			var nameId = $(this).val();
			var pid = nodes[0].id;
			var newNode = {id:Id,pId:"0",name:name,nameId:nameId,open: true,click: true,dropPrev: false,linkId: ""};
			newNode = Obj.addNodes(nodes[0], newNode);
		}
	});
	Obj.refresh();
}
MenuInfo.prototype.oldId = null;
MenuInfo.prototype.onClick = function(menuParm,treeNode)
{
	var vthis = this;
	document.onkeyup = function (e)
	{
		var key = (e.keyCode) || (e.which) || (e.charCode);
		if (key == "13")/*回车*/
		{		
			vthis.onClick(menuParm,treeNode);
		}
	}
	
	var treeObj = $.fn.zTree.getZTreeObj("stree2");
	var menuId = treeNode.id;
	var menuJ = menuId.substr(0,menuId.indexOf('_'));
	if(this.oldId == null)
	{
		this.oldId = treeNode;
	}
	else
	{
		var nodes = treeObj2.getNodes();
		var oid = this.oldId.id;
		var isOid = oid.substr(0,oid.indexOf('_'));
		if(isOid == "Menu")
		{
			var menuD = menuParm.getMenuData();
			if(!WebUtil.isNull(menuD) && menuD != "null")
			{
				this.oldId.name = menuD.zhong;
				this.oldId.yname = menuD.yin;
				treeObj.updateNode(this.oldId);
			}
		}
		if(isOid == "Page")
		{
			var pageD = menuParm.getPageData();
			if(!WebUtil.isNull(pageD) && pageD != "null")
			{
				this.oldId.name = pageD.zhong;
				this.oldId.yname = pageD.yin;
				treeObj.updateNode(this.oldId);
			}
		}
		this.oldId = treeNode;
	}
	this.qieMenu(menuId, menuParm, treeNode);
}

MenuInfo.prototype.qieMenu = function(menuId,menuParm,treeNode)
{
	var isMenu = menuId.substr(0,menuId.indexOf('_'));
	if(isMenu == "Menu")
	{
		$("#isPageId1").hide();
		$("#isPageId2").hide();
		$(".menupId .TableTitle .Header").html(AbisMessageResource['MenuProperty']);
		menuParm.setMenuValue(treeNode);
	}
	if(isMenu == "Page")
	{
		$("#isPageId1").show();
		$("#isPageId2").show();
		$(".menupId .TableTitle .Header").html(AbisMessageResource['PageProperty']);
		menuParm.setPageValue(treeNode);
	}
}

MenuInfo.prototype.menuList = new Array();
MenuInfo.prototype.save = function(mid,menuParm)
{
	var list = new Array();
	this.menuList = new Array();
	var ztreeObj = $.fn.zTree.getZTreeObj("stree2");
	var strees = ztreeObj.getNodes();
	if(!WebUtil.isNull(strees) && strees != "null")
	{
		for(var n = 0;n < strees.length; n++)
		{
			var nodes = strees[n];
			list = this.dieMenu(nodes);
		}
	}
	
	var menuObj = menuParm.getObjData(); 
	var obj 	= {};
	obj.id = mid;
	obj.menuName = $("#menuNameId").val();
	obj.menuJian = $("#menuJianId").val();
	obj.chuLink = "";//$("#chupageId").val();
	obj.list = list;
	if(WebUtil.isNull(obj.menuName))
	{
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource['MenuNameEmptyTip']);
		//alert(AbisMessageResource['MenuNameEmptyTip']);
		return;
	}
	var jsonData = $.toJSON(obj);
	var url = WebVar.VarPath +"/sys/menucfg/save";
	var nThis = this;
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jsonData,
		dataType : 'json',
		success : function(data) 
		{   
			if(data != null)
			{
                DialogUtil.openSimpleDialogForOcx(AbisMessageResource['SaveSuccess'],null,null,"okdialog");
				//alert(AbisMessageResource['SaveSuccess']);
				window.location.reload();
			}
		},   
		error : function(e) 
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource['SaveFail'],null,null,"errordialog");
			//alert(AbisMessageResource['SaveFail']);
		}   
	});
}

//MenuInfo.prototype.update = function(mid,menuParm,delList,updateList)
//{
//	var list = new Array();
//	this.menuList = new Array();
//	var ztreeObj = $.fn.zTree.getZTreeObj("stree2");
//	var strees = ztreeObj.getNodes();
//	if(!WebUtil.isNull(strees) && strees != "null")
//	{
//		for(var n = 0;n < strees.length; n++)
//		{
//			var nodes = strees[n];
//			list = this.dieMenu(nodes);
//		}
//	}
//	
//	var menuObj = menuParm.getObjData(); 
//	var obj 	= {};
//	obj.id = mid;
//	obj.menuName = $("#menuNameId").val();
//	obj.menuJian = $("#menuJianId").val();
//	obj.chuLink = "";//$("#chupageId").val();
//	obj.list = list;
//	if(WebUtil.isNull(obj.menuName))
//	{
//		alert(AbisMessageResource['MenuNameEmptyTip']);
//		return;
//	}
//	var jsonData = $.toJSON(obj);
//	var url = WebVar.VarPath +"/sys/menucfg/update";
//	var nThis = this;
//	jQuery.ajax( 
//    {
//		type : 'POST',
//		contentType : 'application/json',
//		url : url,
//		data : jsonData,
//		dataType : 'json',
//		success : function(data) 
//		{   
//			if(data != null)
//			{
//				alert(AbisMessageResource['SaveSuccess']);
//				window.location.reload();
//			}
//		},   
//		error : function(e) 
//		{   
//			alert(AbisMessageResource['SaveFail']);
//		}   
//	});
//}

MenuInfo.prototype.index = 0;
MenuInfo.prototype.mindex = 0;
//MenuInfo.prototype.menuO = {};
MenuInfo.prototype.list = new Array();
MenuInfo.prototype.dieMenu = function(nodes)
{
	this.index = 0;
	var mlist = new Array();
	if(!WebUtil.isNull(nodes) && nodes != "null")
	{
		var noId = nodes.id;
		var isMenu = noId.substr(0,noId.indexOf('_'));
		if(isMenu == "Menu")
		{
			var menuObj 	= {};
			menuObj.menuSetId = "0";
			var pmenuId = nodes.pId;
			if(!WebUtil.isNull(pmenuId) && pmenuId != "null")
			{
				var ispmenuId = pmenuId.substr(0,pmenuId.indexOf('_'));
				if(ispmenuId == "Menu")
				{
					menuObj.parentMenuId = pmenuId.substr(pmenuId.indexOf('_')+1,pmenuId.length);
				}
				else
				{
					menuObj.parentMenuId = 0;
				}
			}
			else
			{
				menuObj.parentMenuId = 0;
			}
			menuObj.seq = this.mindex;
			menuObj.type = 0;
			menuObj.linkId = 0;
			menuObj.dispName = nodes.nameId;
			menuObj.ydispName = nodes.yname;
			menuObj.zdispName = nodes.name;
			menuObj.menuList = mlist;
//			this.index ++;
			this.mindex ++;
			var nod = nodes.children;
			if(!WebUtil.isNull(nod) && nod != "null")
			{
				var pList = new Array();
				for(var k = 0;k < nod.length;k++)
				{
					var pageNode = nod[k];
					var paId = pageNode.id;
					var isPage = paId.substr(0,paId.indexOf('_'));
					if(isPage == "Menu")
					{
						menuObj.menuList.push(this.dieM(pageNode));
					}
					else
					{
						var pageObj = {};
						pageObj.menuCfgId = "";
						pageObj.linkId = pageNode.linkId;
						pageObj.seq = this.index;
						pageObj.name = pageNode.nameId;
						pageObj.value = pageNode.name;
						pageObj.yvalue = pageNode.yname;
						pList.push(pageObj);
						this.index ++;
					}
				}
				menuObj.pageList = pList;
			}
		}
		else
		{
			var nod = nodes.children;
			if(!WebUtil.isNull(nod) && nod != "null")
			{
				for(var k = 0;k < nod.length;k++)
				{
					this.dieMenu(nod[k]);
				}
			}
		}
		this.menuList.push(menuObj);
	}
	return this.menuList;
}

MenuInfo.prototype.dieM = function(nodes)
{
	var menuO = {};
	this.list = new Array();
	var mlist = new Array();
	if(!WebUtil.isNull(nodes) && nodes != "null")
	{
		var noId = nodes.id;
		var isMenu = noId.substr(0,noId.indexOf('_'));
		if(isMenu == "Menu")
		{
			menuO.menuSetId = "0";
			var pmenuId = nodes.pId;
			if(!WebUtil.isNull(pmenuId) && pmenuId != "null")
			{
				var ispmenuId = pmenuId.substr(0,pmenuId.indexOf('_'));
				if(ispmenuId == "Menu")
				{
					menuO.parentMenuId = pmenuId.substr(pmenuId.indexOf('_')+1,pmenuId.length);
				}
				else
				{
					menuO.parentMenuId = 0;
				}
			}
			else
			{
				menuO.parentMenuId = 0;
			}
			menuO.seq = this.index;
			menuO.type = 0;
			menuO.linkId = 0;
			menuO.dispName = nodes.nameId;
			menuO.ydispName = nodes.yname;
			menuO.zdispName = nodes.name;
			menuO.menuList = mlist;
			this.index ++;
			var nod = nodes.children;
			var ind = 0;
			if(!WebUtil.isNull(nod) && nod != "null")
			{
				var pList = new Array();
				for(var k = 0;k < nod.length;k++)
				{
					var pageNode = nod[k];
					var paId = pageNode.id;
					var isPage = paId.substr(0,paId.indexOf('_'));
					if(isPage == "Menu")
					{
						menuO.menuList.push(this.dieM(pageNode));
					}
					else
					{
						var pageObj = {};
						pageObj.menuCfgId = "";
						pageObj.linkId = pageNode.linkId;
						pageObj.seq = ind;
						pageObj.name = pageNode.nameId;
						pageObj.value = pageNode.name;
						pageObj.yvalue = pageNode.yname;
						pList.push(pageObj);
						ind ++;
					}
				}
				menuO.pageList = pList;
			}
		}
		this.list.push(menuO);
	}
	return menuO;
}

