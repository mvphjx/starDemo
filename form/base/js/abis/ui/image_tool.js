
// * 图像操作工具ID
ImageTool.prototype.id 			= null;

//选择工具变化时回调接口

ImageTool.prototype.changedTool = null;	

//工具按钮以及状态管理对象

ImageTool.prototype.tools 		= null;

//按钮间互斥关系

ImageTool.prototype.relationMgr = null;

var ToolId =
{
    Move 		: "Move",
    CutBox		: "CutBox",
    ZoomIn 		: "ZoomIn",
    ZoomOut 	: "ZoomOut",
    RotateLeft 	: "RotateLeft",
    RotateRight	: "RotateRight",
    Precent50 	: "Precent50",
    Precent100 	: "Precent100",
    Precent150 	: "Precent150",
    Precent200 	: "Precent200",
    ViewPort 	: "ViewPort",
    FitWidth 	: "FitWidth",
    FitHeight 	: "FitHeight",
    Rotate0 	: "Rotate0",
    Rotate90 	: "Rotate90",
    Rotate180 	: "Rotate180",
    Rotate270 	: "Rotate270",
    Align	 	: "Align"
}

var ToolIdText =
{
    Move 		: AbisMessageResource.ToolIdText['Move'],
    CutBox		: AbisMessageResource.ToolIdText['CutBox'],
    ZoomIn 		: AbisMessageResource.ToolIdText['ZoomIn'],
    ZoomOut 	: AbisMessageResource.ToolIdText['ZoomOut'],
    ViewPort 	: AbisMessageResource.ToolIdText['ViewPort'],
    FitWidth 	: AbisMessageResource.ToolIdText['FitWidth'],
    FitHeight 	: AbisMessageResource.ToolIdText['FitHeight'],
    Precent50 	: AbisMessageResource.ToolIdText['Precent50'],
    Precent100 	: AbisMessageResource.ToolIdText['Precent100'],
    Precent150 	: AbisMessageResource.ToolIdText['Precent150'],
    Precent200 	: AbisMessageResource.ToolIdText['Precent150'],
    RotateLeft 	: AbisMessageResource.ToolIdText['RotateLeft'],
    RotateRight	: AbisMessageResource.ToolIdText['RotateRight'],
    Rotate0 	: AbisMessageResource.ToolIdText['Rotate0'],
    Rotate90 	: AbisMessageResource.ToolIdText['Rotate90'],
    Rotate180 	: AbisMessageResource.ToolIdText['Rotate180'],
    Rotate270 	: AbisMessageResource.ToolIdText['Rotate270'],
    Align	 	: AbisMessageResource.ToolIdText['Align']
}

var ButtonType =
{
	Push		:"Push",
	Toggle		:"Toggle",
	Radio		:"Radio"
}

//图像操作工具
function ImageTool(id,imgId,toolIdList,ocxType)
{
	this.id 			= id;
	this.imgId 			= imgId;
	this.toolIdList 	= toolIdList;
	this.ocxType		= ocxType;
	this.init();
}

/**
 * 初始化
 */
ImageTool.prototype.init = function()
{
	//初始化按钮关系
	this.relationMgr = new Array();
	this.relationMgr[ToolId.Move]	 	= [ToolId.CutBox];
	this.relationMgr[ToolId.CutBox] 	= [ToolId.Move];
	this.relationMgr[ToolId.ZoomIn] 	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent100,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.ZoomOut] 	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent100,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.ViewPort]	= [ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent100,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.FitWidth]	= [ToolId.ViewPort,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent100,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.FitHeight]	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.Precent50,ToolId.Precent100,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.Precent50]	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent100,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.Precent100]	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent150,ToolId.Precent200];
	this.relationMgr[ToolId.Precent150]	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent100,ToolId.Precent200];
	this.relationMgr[ToolId.Precent200]	= [ToolId.ViewPort,ToolId.FitWidth,ToolId.FitHeight,ToolId.Precent50,ToolId.Precent100,ToolId.Precent150];
	
	this.relationMgr[ToolId.RotateLeft] = [ToolId.Rotate0,ToolId.Rotate90,ToolId.Rotate180,ToolId.Rotate270];
	this.relationMgr[ToolId.RotateRight]= [ToolId.Rotate0,ToolId.Rotate90,ToolId.Rotate180,ToolId.Rotate270];
	
	this.relationMgr[ToolId.Rotate0] 	= [ToolId.Rotate90,ToolId.Rotate180,ToolId.Rotate270];
	this.relationMgr[ToolId.Rotate90] 	= [ToolId.Rotate0,ToolId.Rotate180,ToolId.Rotate270];
	this.relationMgr[ToolId.Rotate180] 	= [ToolId.Rotate0,ToolId.Rotate90,ToolId.Rotate270];
	this.relationMgr[ToolId.Rotate270] 	= [ToolId.Rotate0,ToolId.Rotate90,ToolId.Rotate180];
	
//	this.relationMgr[ToolId.LeftAlign] 		= [ToolId.RightAlign,ToolId.TopAlign,ToolId.BottomAlign];
//	this.relationMgr[ToolId.RightAlign] 	= [ToolId.LeftAlign,ToolId.TopAlign,ToolId.BottomAlign];
//	this.relationMgr[ToolId.TopAlign] 		= [ToolId.LeftAlign,ToolId.RightAlign,ToolId.BottomAlign];
//	this.relationMgr[ToolId.BottomAlign] 	= [ToolId.LeftAlign,ToolId.RightAlign,ToolId.TopAlign];
	
	//初始化工具
	this.tools = new Array();
	this.tools[ToolId.Move] 		= {cssName:"ImgMove",type:ButtonType.Toggle,selected:false};
	this.tools[ToolId.CutBox] 		= {cssName:"ImgCutBox",type:ButtonType.Toggle,selected:false};
	this.tools[ToolId.ZoomIn] 		= {cssName:"ImgZoomIn",type:ButtonType.Push,selected:false};
	this.tools[ToolId.ZoomOut] 		= {cssName:"ImgZoomOut",type:ButtonType.Push,selected:false};
	this.tools[ToolId.RotateLeft] 	= {cssName:"ImgRotateLeft",type:ButtonType.Push,selected:false};
	this.tools[ToolId.RotateRight]	= {cssName:"ImgRotateRight",type:ButtonType.Push,selected:false};
	this.tools[ToolId.Precent50] 	= {cssName:"ImgPrecent50",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Precent100] 	= {cssName:"ImgPrecent100",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Precent150] 	= {cssName:"ImgPrecent150",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Precent200] 	= {cssName:"ImgPrecent200",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.ViewPort] 	= {cssName:"ImgViewPort",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.FitWidth] 	= {cssName:"ImgFitWidth",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.FitHeight] 	= {cssName:"ImgFitHeight",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Rotate0] 		= {cssName:"ImgRotate0",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Rotate90] 	= {cssName:"ImgRotate90",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Rotate180] 	= {cssName:"ImgRotate180",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Rotate270] 	= {cssName:"ImgRotate270",type:ButtonType.Radio,selected:false};
	this.tools[ToolId.Align] 		= {cssName:"ImgAlign",type:ButtonType.Toggle,selected:false};

	var $toolBar = $("#"+this.id);
	
	for(var key in this.tools)
	{
		if(this.checkToolId(key))
		{
			var t = this.tools[key];
			var text = ToolIdText[key];
			var $backBnt  = $("<div class=\"ToolBntNormal\"></div>");
			var $bnt = $("<div id=\""+key+"\" title=\""+text+"\" class=\"ToolBnt "+ t.cssName+"\"></div>");
			$backBnt.append($bnt);
			this.regImgOperBntEvent($bnt);
			$toolBar.append($backBnt);
		}
	}
	this.selectTool(ToolId.ViewPort);
	var ocx = document.getElementById(this.imgId);
	//ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_WHEEL,OCX.MouseMode.MOUSE_MODE_NONE);
	//ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_LEFT,OCX.MouseMode.MOUSE_MODE_NONE);
}

ImageTool.prototype.operImage = function(tool,selected)
{
	try
	{
		var ocx = document.getElementById(this.imgId);
		switch(tool)
		{
			case ToolId.Move:
				if(selected == true)
				{
					ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_WHEEL,OCX.MouseMode.MOUSE_MODE_ZOOM);
					ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_LEFT,OCX.MouseMode.MOUSE_MODE_MOVE_IMAGE);
				}
				else
				{
					ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_WHEEL,OCX.MouseMode.MOUSE_MODE_NONE);
					ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_LEFT,OCX.MouseMode.MOUSE_MODE_NONE);
				}
				break;
			case ToolId.CutBox:
				ocx.HS_OCX_Cut();
				break;
			case ToolId.ZoomIn:
				var	f = ocx.HS_OCX_GetZoomRatio();
				f+= 0.1;
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_Zoom(f);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomRatio(f);
				}
				break;
			case ToolId.ZoomOut:
				var	f = ocx.HS_OCX_GetZoomRatio();
				f-= 0.1;
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_Zoom(f);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomRatio(f);
				}
				break;
			case ToolId.FitWidth:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_SetZoomMode(1);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomMode(1);
				}
				break;
			case ToolId.FitHeight:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_SetZoomMode(2);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomMode(2);
				}
				break;
			case ToolId.ViewPort:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_SetZoomMode(0);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomMode(0);
				}
				break;
			case ToolId.Precent50:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_Zoom(0.5);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomRatio(0.5);
				}
				break;
			case ToolId.Precent100:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_Zoom(1.0);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomRatio(1.0);
				}
				break;
			case ToolId.Precent150:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_Zoom(1.5);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomRatio(1.5);
				}
				break;
			case ToolId.Precent200:
				if(this.ocxType == OCX.OcxType.EDIT)
				{
					ocx.HS_OCX_Zoom(2.0);
				}
				else if(this.ocxType == OCX.OcxType.TPSCAN || this.ocxType == OCX.OcxType.LPSCAN)
				{
					ocx.HS_OCX_OnSetZoomRatio(2.0);
				}
				break;
			case ToolId.RotateLeft:
				var angle = ocx.HS_OCX_GetRotateAngle();
				ocx.HS_OCX_Rotate(angle + 15);
				break;
			case ToolId.RotateRight:
				var angle = ocx.HS_OCX_GetRotateAngle();
				ocx.HS_OCX_Rotate(angle - 15);
				break;
			case ToolId.Rotate0:
				ocx.HS_OCX_Rotate(0);
				break;
			case ToolId.Rotate90:
				ocx.HS_OCX_Rotate(90);
				break;
			case ToolId.Rotate180:
				ocx.HS_OCX_Rotate(180);
				break;
			case ToolId.Rotate270:
				ocx.HS_OCX_Rotate(270);
				break;
			case ToolId.Align:
				if(selected)
				{
					ocx.HS_OCX_SetCellWindowAlign(0,0,2,1);
					ocx.HS_OCX_SetCellWindowAlign(0,1,1,1);
				}
				else
				{
					ocx.HS_OCX_SetCellWindowAlign(0,0,0,1);
					ocx.HS_OCX_SetCellWindowAlign(0,1,0,1);
				}	
				break;
		}
	}
	catch(e)
	{
		alert(e);
	}
}

/** 检查是否使用工具ID  */
ImageTool.prototype.checkToolId = function(toolId)
{
	if(WebUtil.isEmpty(this.toolIdList))return true;
	for(var i =0;i<this.toolIdList.length;i++)
	{
		if(this.toolIdList[i] == toolId)
		{
			return true;
		}
	}
	return false;
}

ImageTool.prototype.selectTool = function(toolId)
{
	var selected;
	var button = $("#"+toolId);
	var pro = this.tools[toolId];
	var cssName = pro.cssName;
	if(pro.type == ButtonType.Toggle)
	{
		if(pro.selected == true)
		{
			var $parent = button.parent();
			$parent.attr("class","ToolBntHover");
			pro.selected = false;
		}
		else
		{
			var $parent = button.parent();
			$parent.attr("class","ToolBntDown");
			pro.selected = true;
		}
	}
	else if(pro.type == ButtonType.Push || pro.type == ButtonType.Radio)
	{
		//已经是当前选择的函数结束
		if(pro.selected == true)return;
		
		var $parent = button.parent();
		$parent.attr("class","ToolBntDown");
		//设置选中样式以及状态属性
		if(pro.type == ButtonType.Radio)
		{
			pro.selected = true;
		}
	}
	
	//查看关系取消互斥关系按钮状态
	var remgr = this.relationMgr[toolId];
	if(remgr != undefined)
	{
		for(var index in remgr)
		{
			var $bnt = $("#"+remgr[index]);
			var p = this.tools[remgr[index]];
			p.selected = false;
			var $parent = $bnt.parent();
			$parent.attr("class","ToolBntNormal");
		}
	}
	//执行回调事件
	this.operImage(toolId,pro.selected);
}

ImageTool.prototype.regImgOperBntEvent= function($bnt)
{
	var obj = this;
	$bnt.mousedown
	(
		function()
		{
			var toolId = $(this).attr("id");
			obj.selectTool(toolId);
		}
	);
	$bnt.mouseup
	(
		function()
		{
			var bId = $(this).attr("id");
			var pro = obj.tools[bId];
			if(pro.selected != true)
			{
				var $parent = $(this).parent();
				$parent.attr("class","ToolBntHover");
			}
		}
	);
	
	$bnt.mouseout
	(
		function()
		{
			var bId = $(this).attr("id");
			var pro = obj.tools[bId];
			if(pro.selected != true)
			{
				var $parent = $(this).parent();
				$parent.attr("class","ToolBntNormal");
			}
		}
	);
	
	$bnt.mouseover
	(
		function()
		{
// console.error("=>>>: $bnt.mouseover");
			var bId = $(this).attr("id");
			var pro = obj.tools[bId];
			var cssName = pro.cssName;
			if(pro.selected != true)
			{
				var $parent = $(this).parent();
				$parent.attr("class","ToolBntHover");
			}
			
		}
	);
		
}
