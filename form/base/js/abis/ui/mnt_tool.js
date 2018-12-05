var mntTools	=
{
	0:"select",
	1:"mntpoint",
	2:"core",
	3:"vcore",
	4:"ldelta",
	5:"rdelta",
	6:"dir",
	7:"pixcle",
	8:"ridge",
	9:"mntridge",
	10:"exactarea",
	11:"pcore",
	12:"pdelta",
	13:"wdelta",
	14:"baseline",
	15:"mntposition",
	16:"rootarea",
	17:"innerarea",
	18:"outerarea",
	19:"eye",
	20:"delete"
};

var menuIdList = ["mntposition","rootarea","innerarea","outerarea"];

var mntToolData  = 
[
	{bty:ABISCode.Bty.BTY_FINGER,	type:ABISCode.TableTypeCode.TPCARD,tool:[0,1,2,3,4,5,6,8,9]},
	{bty:ABISCode.Bty.BTY_PALM,		type:ABISCode.TableTypeCode.TPCARD,tool:[0,1,6,9,11,12,13,14]},
	{bty:ABISCode.Bty.BTY_FACE,		type:ABISCode.TableTypeCode.TPCARD,tool:[0,19]},
	{bty:ABISCode.Bty.BTY_FINGER,	type:ABISCode.TableTypeCode.LPCARD,tool:[0,1,2,3,4,5,6,8,9,10,15]},
	{bty:ABISCode.Bty.BTY_PALM,		type:ABISCode.TableTypeCode.LPCARD,tool:[0,1,6,8,9,10,11,12,13,14,16,17,18]},
	{bty:ABISCode.Bty.BTY_FACE,		type:ABISCode.TableTypeCode.LPCARD,tool:[0,19]}
];

//特征编辑工具脚本对象
function MntToolObject()
{
	$("#MntTool").bind("selectstart",function(){return false;});
	
	//当前工具
	MntToolObject.prototype.toolId 			= new Array();
	
	//当前生物特征
	MntToolObject.prototype.bty 			= null;
	
	//编辑控件Id
	MntToolObject.prototype.ocxId			= null;
	
	//选择事件
	MntToolObject.prototype.selectionLisetner = null;
	
	//隐藏全部工具
	MntToolObject.prototype.hiddenAll = function()
	{
		for(var key in mntTools)
		{
			$("#"+mntTools[key]).hide();
		}
	}
	
	//全部设置为普通样式
	MntToolObject.prototype.normalAll = function()
	{
		for(var key in mntTools)
		{
			$("#"+mntTools[key]).attr("class","mntbnt");
		}
	}
	
	/**
	 * 设置被编辑控件的Id
	 * @param {Object} ocxId 编辑控件ID
	 */
	MntToolObject.prototype.setOcxId = function(ocxId)
	{
		this.ocxId = ocxId;
	}
	
	/**
	 * 初始化工具面板
	 * @param {Object} ocxId 编辑控件ID
	 */
	MntToolObject.prototype.init = function(ocxId)
	{
		this.ocxId = ocxId;
		
		this.hiddenAll();
		
		//当前对象引用
		var obj = this;
		
		//注册鼠标事件
		for(var id in mntTools)
		{
			var id = mntTools[id];
			$("#"+id).mouseover
			(
				function()
				{
					if(obj.toolId[obj.bty] != $(this).attr("id"))
					{
						$(this).attr("class","mntbnthover");
					}
				}
			);
			$("#"+id).mouseout
			(
				function()
				{
					if(obj.toolId[obj.bty] != $(this).attr("id"))
					{
						$(this).attr("class","mntbnt");
					}
				}
			);
			$("#"+id).mousedown
			(
				function(e)
				{
					var tId = $(this).attr("id");
					if(obj.toolId != tId)
					{
						$("#"+obj.toolId[obj.bty]).attr("class","mntbnt");
						obj.toolId[obj.bty]  = tId;
						$(this).attr("class","mntbntdown");
						if(!WebUtil.isNull(obj.ocxId))
						{
							obj.applyMntTool(tId,e);
						}
						if(obj.selectionLisetner != null)
						{
							obj.selectionLisetner(tId);
						}
					}
				}
			);
		}
		//注册菜单事件
		for(var i=0;i<menuIdList.length;i++)
		{
			$("#"+menuIdList[i]+"_menu").children().each
			(
				function(i)
				{
					$(this).mouseover
					(
						function()
						{
							$(this).attr("class","itemhover");
						}
					);
					$(this).mouseout
					(
						function()
						{
							$(this).attr("class","item");
						}
					);
					$(this).mousedown
					(
						function()
						{
							obj.applyMntTool($(this).attr("id"));
						}
					);
				}
			);
		}
		
		//文档点击事件来处理菜单互斥显隐
		document.onclick = function(event)
		{
			var e = event || window.event;
			var ele = e.srcElement || e.target;
			var curId = null;
			var bntId = null;
			for(var i=0;i<menuIdList.length;i++)
			{
				bntId  = menuIdList[i];
				if(ele.className == "mntbntdown"  && ele.id == bntId || ele.className == bntId)
				{
					curId = bntId;
					break;
				}
				else if( ele.className == "toolname")
				{
					var parentId = $(ele).parent().attr("id");
					if(parentId == bntId)
					{
						curId = bntId;
						break;
					}
				}
			}
			for(var i=0;i<menuIdList.length;i++)
			{
				if(menuIdList[i] == curId)continue;
				$("#"+menuIdList[i]+"_menu").hide();
			}
		}
	}
	
	 /**
	  * 应用编辑工具
	  *  @param {Object} ocx 控件
	  *   @param {String} tid 工具Id
	  */
	MntToolObject.prototype.applyMntTool = function(toolId,e)
	{
		
		var ocx = document.getElementById(this.ocxId);
		if(!WebUtil.isNull(ocx))
		{
			var tid = null;
			switch(toolId)
			{
				case "select":
					tid = MntToolName.SELECTMNT;
					break;
				case "mntpoint":
					tid = MntToolName.MNT;
					break;
				case "core":
					tid = MntToolName.UPCORE;
					break;
				case "vcore":
					tid = MntToolName.VICECORE;
					break;
				case "ldelta":
					tid = MntToolName.LEFTDELTA;
					break;
				case "rdelta":
					tid = MntToolName.RIGHTDELTA;
					break;
				case "dir":
					tid = MntToolName.FPDIRECTION;
					break;
				case "pixcle":
					tid = MntToolName.P2PLENGTH;
					break;
				case "ridge":
					tid = MntToolName.P2PRIDGECNT;
					break;
				case "mntridge":
					tid = MntToolName.MNTRIDGECNT;
					break;
				case "exactarea":
					tid = MntToolName.CLEARAREA;
					break;
				case "pcore":
					tid = MntToolName.PATTERNCORE;
					break;
				case "pdelta":
					tid = MntToolName.PATTERNDELTA;
					break;
				case "wdelta":
					tid = MntToolName.WRISTDELTA;
					break;
				case "baseline":
					tid = MntToolName.BASELINE;
					break;
				case "mntposition":
					this.showMenu("mntposition_menu",e);
					return;
				case "rootarea":
					this.showMenu("rootarea_menu",e);
					return;
				case "innerarea":
					this.showMenu("innerarea_menu",e);
					return;
				case "outerarea":
					this.showMenu("outerarea_menu",e);
					return;
				case "CoreUp":
					tid = MntToolName.POSCOREUPPER;
					break;
				case "CoreDown":
					tid = MntToolName.POSCORELOWER;
					break;
				case "CoreLeft":
					tid = MntToolName.POSCORELEFT;
					break;
				case "CoreRight":
					tid = MntToolName.POSCORERIGHT;
					break;
				case "PalmFP1":
					tid = MntToolName.POSPALMFP1;
					break;
				case "PalmFP2":
					tid = MntToolName.POSPALMFP2;
					break;
				case "PalmFP3":
					tid = MntToolName.POSPALMFP3;
					break;
				case "PalmFP4":
					tid = MntToolName.POSPALMFP4;
					break;
				case "PalmIP":
					tid = MntToolName.POSPALMIP;
					break;
				case "PalmIPUP":
					tid = MntToolName.POSPALMIPUP;
					break;
				case "PalmIPMD":
					tid = MntToolName.POSPALMIPMD;
					break;
				case "PalmIPLW":
					tid = MntToolName.POSPALMIPLW;
					break;
				case "PalmOP":
					tid = MntToolName.POSPALMOP;
					break;
				case "PalmOPUP":
					tid = MntToolName.POSPALMOPUP;
					break;
				case "PalmOPMD":
					tid = MntToolName.POSPALMOPMD;
					break;
				case "PalmOPLW":
					tid = MntToolName.POSPALMOPLW;
					break;
				case "eye":
					break;
				case "delete":
					tid = MntToolName.DELETEMNT;
					break;
				default:return;
			}
			ocx.HS_OCX_SetActiveEditElemType(tid);
		}
	}
	
	MntToolObject.prototype.showMenu = function(menuId,e)
	{
		var docWidth = $(document).width();
		var left = e.clientX + 1;
		var top  = e.clientY + 1;
		var menuWidth = parseInt($("#"+menuId).css("width"));
		if(left + menuWidth  >  docWidth)
		{
			left = docWidth - menuWidth - 10;
		}
	 	$("#"+menuId).css({"left":left + 1,"top":top + 1});
		$("#"+menuId).show();
		
	}
	
	/**
	 * 根据生物特征类型和卡片类型切换编辑工具
	 * @param {Object} type 1:捺印,2：现场
	 * @param {Object} bty
	 */
	MntToolObject.prototype.switchTool = function(type,bty)
	{
		 
		this.bty = bty;
		
		this.hiddenAll();
		
		this.normalAll();
		
		if(this.toolId[bty] == undefined)
		{
			this.toolId[bty] = mntTools[0];
		}
		var d;
		for(var i =0;i<mntToolData.length;i++)
		{
			d = mntToolData[i];
			if(d.bty == bty && d.type == type)
			{
				for(var j=0;j<d.tool.length;j++)
				{
					var id = mntTools[d.tool[j]];
					$("#"+id).show();
				}
			}
		}
		$("#MntToolContent").show();
		$("#"+this.toolId[bty]).attr("class","mntbntdown");
	}
	
	 /**
	  * 返回当前点击工具ID
	  */
	MntToolObject.prototype.getToolId = function()
	{
		return this.toolId;
	}
	 
	/**
	 * 注册选中事件
	 */
	MntToolObject.prototype.addSelectionListener = function(selectionLisetner)
	{
		this.selectionLisetner = selectionLisetner;
	}
	
	
	MntToolObject.prototype.setHeight = function(h)
	{
		$("#MntToolContent").height(h);
	}
}