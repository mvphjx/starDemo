
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
        Move: "Move",
        CutBox: "CutBox",
        ZoomIn: "ZoomIn",
        ZoomOut: "ZoomOut",
        RotateLeft: "RotateLeft",
        RotateRight: "RotateRight",
        Precent50: "Precent50",
        Precent100: "Precent100",
        Precent150: "Precent150",
        Precent200: "Precent200",
        ViewPort: "ViewPort",
        FitWidth: "FitWidth",
        FitHeight: "FitHeight",
        Rotate0: "Rotate0",
        Rotate90: "Rotate90",
        Rotate180: "Rotate180",
        Rotate270: "Rotate270",
        Align: "Align",
        AdjustScale: 'AdjustScale',
        ChooseMnt: "ChooseMnt",
        ChooseMethod: "ChooseMethod",
        SaveMore: 'SaveMore',
        TextInfo: 'TextInfo',
        Synchro: 'Synchro',
        AutoRevolve:'AutoRevolve',
        RightRevolve:'RightRevolve',
        LeftRevolve:'LeftRevolve',
        ShowCentre: 'ShowCentre',
        ShowTriangle: 'ShowTriangle',
        ShowMnt: 'ShowMnt',
        ShowMntDirection: 'ShowMntDirection',
        ShowMatchMnt: 'ShowMatchMnt',
        ShowMntNumber: 'ShowMntNumber',
        DelMatchMarkPoint: 'DelMatchMarkPoint'
    };

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
    Precent200 	: AbisMessageResource.ToolIdText['Precent200'],
    RotateLeft 	: AbisMessageResource.ToolIdText['RotateLeft'],
    RotateRight	: AbisMessageResource.ToolIdText['RotateRight'],
    Rotate0 	: AbisMessageResource.ToolIdText['Rotate0'],
    Rotate90 	: AbisMessageResource.ToolIdText['Rotate90'],
    Rotate180 	: AbisMessageResource.ToolIdText['Rotate180'],
    Rotate270 	: AbisMessageResource.ToolIdText['Rotate270'],
    Align	 	: AbisMessageResource.ToolIdText['Align'],
    AdjustScale	: AbisMessageResource.ToolIdText['AdjustScale'],
    ChooseMnt	: AbisMessageResource.ToolIdText['ChooseMnt'],
    ChooseMethod: AbisMessageResource.ToolIdText['ChooseMethod'],
    SaveMore: AbisMessageResource.ToolIdText['SaveMore'],
    TextInfo	: AbisMessageResource.ToolIdText['TextInfo'],
    Synchro:  AbisMessageResource.ToolIdText['Synchro'],
    AutoRevolve: AbisMessageResource.ToolIdText['AutoRevolve'],
    RightRevolve: AbisMessageResource.ToolIdText['RightRevolve'],
    LeftRevolve: AbisMessageResource.ToolIdText['LeftRevolve'],
    ShowCentre:  AbisMessageResource.ToolIdText['ShowCentre'],
    ShowTriangle: AbisMessageResource.ToolIdText['ShowTriangle'],
    ShowMnt: AbisMessageResource.ToolIdText['ShowMnt'],
    ShowMntDirection:  AbisMessageResource.ToolIdText['ShowMntDirection'],
    ShowMatchMnt:  AbisMessageResource.ToolIdText['ShowMatchMnt'],
    ShowMntNumber:  AbisMessageResource.ToolIdText['ShowMntNumber'],
    DelMatchMarkPoint:  AbisMessageResource.ToolIdText['DelMatchMarkPoint']
};

var ButtonType =
{
	Push		:"Push",
	Toggle		:"Toggle",
	Radio		:"Radio"
};

//图像操作工具
function ImageTool(id,imgId,toolIdList,ocxType,imgToolInvoke)
{
	this.id 			= id;
	this.gid 			= null;//特征组id
	this.mid 			= null;//算法id
	this.imgId 			= imgId;
	this.toolIdList 	= toolIdList;
	this.ocxType		= ocxType;
	if(imgToolInvoke){
		this.invoke =imgToolInvoke
	}
	this.init();
	
}
/**
 * 
 * @param bntId  触发的按钮id
 * @param result 为了方便扩展，返回对象  例如特征组{value:0}
 */
ImageTool.prototype.invoke = function(bntId,result){
	
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
	this.relationMgr[ToolId.ChooseMnt]  =[ToolId.ChooseMethod];
	this.relationMgr[ToolId.ChooseMethod] =[ToolId.ChooseMnt];
    this.relationMgr[ToolId.LeftRevolve] =[ToolId.RightRevolve];
    this.relationMgr[ToolId.RightRevolve] =[ToolId.LeftRevolve];
	this.downListIds=[ToolId.ChooseMnt,ToolId.ChooseMethod,ToolId.SaveMore];//缓存下拉选的按钮id
	
//	this.relationMgr[ToolId.LeftAlign] 		= [ToolId.RightAlign,ToolId.TopAlign,ToolId.BottomAlign];
//	this.relationMgr[ToolId.RightAlign] 	= [ToolId.LeftAlign,ToolId.TopAlign,ToolId.BottomAlign];
//	this.relationMgr[ToolId.TopAlign] 		= [ToolId.LeftAlign,ToolId.RightAlign,ToolId.BottomAlign];
//	this.relationMgr[ToolId.BottomAlign] 	= [ToolId.LeftAlign,ToolId.RightAlign,ToolId.TopAlign];

    //初始化工具
    this.tools = new Array();
    this.tools[ToolId.Move] = {cssName: "ImgMove", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.CutBox] = {cssName: "ImgCutBox", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.ZoomIn] = {cssName: "ImgZoomIn", type: ButtonType.Push, selected: false};
    this.tools[ToolId.ZoomOut] = {cssName: "ImgZoomOut", type: ButtonType.Push, selected: false};
    this.tools[ToolId.RotateLeft] = {cssName: "ImgRotateLeft", type: ButtonType.Push, selected: false};
    this.tools[ToolId.RotateRight] = {cssName: "ImgRotateRight", type: ButtonType.Push, selected: false};
    this.tools[ToolId.Precent50] = {cssName: "ImgPrecent50", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Precent100] = {cssName: "ImgPrecent100", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Precent150] = {cssName: "ImgPrecent150", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Precent200] = {cssName: "ImgPrecent200", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.ViewPort] = {cssName: "ImgViewPort", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.FitWidth] = {cssName: "ImgFitWidth", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.FitHeight] = {cssName: "ImgFitHeight", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Rotate0] = {cssName: "ImgRotate0", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Rotate90] = {cssName: "ImgRotate90", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Rotate180] = {cssName: "ImgRotate180", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Rotate270] = {cssName: "ImgRotate270", type: ButtonType.Radio, selected: false};
    this.tools[ToolId.Align] = {cssName: "ImgAlign", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.AdjustScale] = {cssName: "AdjustScale", type: ButtonType.Push, selected: false};
    this.tools[ToolId.TextInfo] = {cssName: "TextInfo", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.ChooseMnt] = {cssName: "ChooseMnt", type: ButtonType.Push, selected: false};
    this.tools[ToolId.ChooseMethod] = {cssName: "ChooseMethod", type: ButtonType.Push, selected: false};
    this.tools[ToolId.SaveMore] = {cssName: "SaveMore", type: ButtonType.Push, selected: false};
    this.tools[ToolId.Synchro] = {cssName: "Synchro", type: ButtonType.Toggle, selected: true};
    this.tools[ToolId.AutoRevolve] = {cssName: "AutoRevolve", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.LeftRevolve] = {cssName: "LeftRevolve", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.RightRevolve] = {cssName: "RightRevolve", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.ShowCentre] = {cssName: "ShowCentre", type: ButtonType.Toggle, selected: true};
    this.tools[ToolId.ShowTriangle] = {cssName: "ShowTriangle", type: ButtonType.Toggle, selected: true};
    this.tools[ToolId.ShowMnt] = {cssName: "ShowMnt", type: ButtonType.Toggle, selected: true};
    this.tools[ToolId.ShowMntDirection] = {cssName: "ShowMntDirection", type: ButtonType.Toggle, selected: true};
    this.tools[ToolId.ShowMatchMnt] = {cssName: "ShowMatchMnt", type: ButtonType.Toggle, selected: false};
    this.tools[ToolId.ShowMntNumber] = {cssName: "ShowMntNumber", type: ButtonType.Toggle, selected: true};
    this.tools[ToolId.DelMatchMarkPoint] = {cssName: "DelMatchMarkPoint", type: ButtonType.Toggle, selected: true};

	var $toolBar = $("#"+this.id);
	
	for(var key in this.tools)
	{
		if(this.checkToolId(key))
		{
			var t = this.tools[key];
			var text = ToolIdText[key];
            var $backBnt;
			if(t.selected===true){
                $backBnt  = $("<div class=\"ToolBntDown\"></div>");
			}else {
                $backBnt  = $("<div class=\"ToolBntNormal\"></div>");
			}
			var $bnt = $("<div id=\""+key+"\" title=\""+text+"\" class=\"ToolBnt "+ t.cssName+"\"></div>");
			$backBnt.append($bnt);
			this.regImgOperBntEvent($bnt);
			$toolBar.append($backBnt);
			if($.inArray(key, this.downListIds) > -1){
				this.initDownList(key);//初始化 下拉列表
			}			
		}
	}
	this.selectTool(ToolId.ViewPort);
	// var ocx = document.getElementById(this.imgId);
	//ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_WHEEL,OCX.MouseMode.MOUSE_MODE_NONE);
	//ocx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_LEFT,OCX.MouseMode.MOUSE_MODE_NONE);
}

ImageTool.prototype.setImgId = function(imgId){
    this.imgId = imgId;
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
				this.invoke(tool,{value:angle + 15});//回调
				break;
			case ToolId.RotateRight:
				var angle = ocx.HS_OCX_GetRotateAngle();
				ocx.HS_OCX_Rotate(angle - 15);
				this.invoke(tool,{value:angle - 15});//回调
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
			case ToolId.AdjustScale:
				ocx.HS_OCX_StartAdjustScale(0);
				break;	
			case ToolId.ChooseMnt:
				//回调  注册在事件中
				break;			
			case ToolId.TextInfo:
				break;
            case ToolId.Synchro:
                ocx.HS_OCX_SetCheckMode(selected?1:0)
                break;
            case ToolId.AutoRevolve:
                ocx.HS_OCX_SetAutoRotate(selected?1:0)
                break;
            case ToolId.LeftRevolve:
                if(selected){
                    ocx.HS_OCX_SetAutoRotate(1)
                    ocx.HS_OCX_SetRightAutoRotate(0)
                }else{
                    ocx.HS_OCX_SetAutoRotate(0)
                }
                break;
            case ToolId.RightRevolve:
            	if(selected){
                    ocx.HS_OCX_SetAutoRotate(1)
                    ocx.HS_OCX_SetRightAutoRotate(1)
				}else{
                    ocx.HS_OCX_SetAutoRotate(0)
				}
                break;
            case ToolId.ShowCentre:
                ocx.HS_OCX_SetShowCenter(selected?1:0)
                break;
            case ToolId.ShowTriangle:
                ocx.HS_OCX_SetShowTriangle(selected?1:0)
                break;
            case ToolId.ShowMnt:
                ocx.HS_OCX_SetShowMinuMnt(selected?1:0)
                break;
            case ToolId.ShowMntDirection:
                ocx.HS_OCX_SetShowMntTail(selected?1:0)
                break;
            case ToolId.ShowMatchMnt:
                ocx.HS_OCX_SetShowMatchMntOnly(selected?1:0)
                break;
            case ToolId.ShowMntNumber:
                ocx.HS_OCX_SetShowMatchInfoNumber(selected?1:0)
                break;
            case ToolId.DelMatchMarkPoint:
                ocx.HS_OCX_ClearTrackPointMnt(0)
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
	//选择器增加条件，兼容一个页面多个控件的情况
	var button=$("#"+this.id).find("#"+toolId)
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
			//var $bnt = $("#"+remgr[index]);
			var $bnt=$("#"+this.id).find("#"+remgr[index])
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


ImageTool.prototype.downListData = {};
/**
 * 创建下拉列表
 * @param listId
 */
ImageTool.prototype.initDownList = function(listId)
{
	var iframeName = listId+"Frame";
	if($("#"+iframeName).size()>0){
		return;
	}
    var style  ='top: 0px; height: 100px; overflow: hidden; padding-top: 0px; padding-bottom: 0px; margin-top: 0px; margin-bottom: 0px; display:none;position:absolute;';
    if(listId==="ChooseMnt"){
        style +="width:150px";
    }else{
        style +="width:120px";
    }
    var iframe = '<iframe id="'+iframeName+'" frameBorder="0" scrolling="no" style="'+style+'"><html><head></head><body></body></html></iframe>';
	$("#"+listId).parent().append($(iframe));
	$('#'+iframeName).bind("load",function(){
		var $head =$(this).contents().find("head");
		var $body =$(this).contents().find("body");
		$body.css("fontFamily", "'微软雅黑',Arial,sans-serif");
		var $css = $("<link></link>");
		$css.attr("rel", "stylesheet");
		$css.attr("type", "text/css");
		var before=this.IEVersion = 8?window.location.protocol +"//"+window.location.host:"";//ie8 iframe引用不到相对路径css  2016年9月29日  hjx
		var cssUrl =before+WebVar.VarPath + "/css/abis/ui/switchcontrol/drop_down_list.css";
		$css.attr("href", cssUrl);
		$head.append($css);
		var $div = $("<div class=\"\" ></div>");
		$div.addClass("gidList");
		$div.addClass("gidHeight" +" list");
		var htmlstr = '<div id='+iframeName+'List></div>';
		$div.html(htmlstr);
		$body.append($div);
    }); 
	this.registerListEvent(listId);
};
/**
 * 获取用户操作的数据信息，如果没有返回初始值
 */
ImageTool.prototype.getGid = function (){
    if(WebUtil.isNull(this.gid)){
        try {
            this.gid = this.downListData[ToolId.ChooseMnt][0].value;
            this.mid = this.downListData[ToolId.ChooseMnt][0].defaultMexMethod;
        }catch(e){}
    }
    return this.gid;
};
/*
 * 设置 特征组和提取算法值
 */
ImageTool.prototype.setGid = function (gid){
	if(!WebUtil.isNull(gid)){
		this.gid=gid;
		//this.mid=0;
	}else if(WebUtil.isNull(this.gid)){
        try {
            this.gid = this.downListData[ToolId.ChooseMnt][0].value;
            this.mid = this.downListData[ToolId.ChooseMnt][0].defaultMexMethod;
        }catch(e){}
	}else if(WebUtil.isNull(this.mid)){

    }

}
/*
 * 给下拉列表赋值  {"ChooseMnt"：[{value:0,text:1},{value:2,text:3}]}
 */
ImageTool.prototype.setDownListData = function (data){
	if(WebUtil.contains(this.downListData,data)){
		return;
	}else{
        $.extend(this.downListData,data);
	}
	//<span class="select" value="0">Hx-1 指纹特征组</span><span value="1">Hx-2 指纹特征组</span><span value="2">Ray-2 指纹特征组</span><span value="3">Ray-1 指纹特征组</span>
	if(!WebUtil.isNull(data)){
		for(var key in data){
			var iframeName = key+"Frame";
			var domStr = key+"FrameList";
			var dom = $("#"+iframeName).contents().find("#"+domStr);
			setData(data[key],$(dom));
		}
	}
	this.setGid();
	function setData(spanData,$dom){
		if(WebUtil.isNull($dom)||$dom.length===0){
			return;
		}
		if(!WebUtil.isNull(spanData)){
			var htmlStr = "";
			if(spanData instanceof Array){
				for(var i in spanData){
						var value = spanData[i].value;
						var text =  spanData[i].text;
						var defaultMexMethod = spanData[i].defaultMexMethod;
						var otherInfo = "";//拼接自定义信息
						if(defaultMexMethod){
							otherInfo = "   defaultMexMethod="+defaultMexMethod;
						}
						htmlStr= htmlStr+'<span value="'+value+'"'+otherInfo+
						'>'+text+'</span>';
					}
			}
			$dom.html(htmlStr)
		}
	}
}


/*
 * 注册 下拉列表的相关事件
 */
ImageTool.prototype.registerListEvent = function(bntId)
{
	var DownDelay 	= 150;
	var gidFrame = bntId+"Frame";
	var frame 			= $("#" + gidFrame);
	var $bnt 		= $("#"+bntId);
	var nThis 		= this;
	$bnt.mousedown(function()
	{
		if(frame.is(":hidden"))
		{
			//定位列表
			var top = $(this).offset().top + $(this).height() -1;
			frame.css("top",top+"px");
			frame.slideToggle(DownDelay);
			hideOthers();
			frame.contents().find("span").each(function(i)
		    {
				var value =0;
				var domValue = $(this).attr("value");
				switch (bntId) {
					case ToolId.ChooseMnt:
						if(WebUtil.isNull(nThis.gid)){
							nThis.gid = domValue
						}
						value = nThis.gid;
						break;
					case ToolId.ChooseMethod:
						if(WebUtil.isNull(nThis.mid)){
							nThis.mid = domValue
						}
						value = nThis.mid;
						break;
				}	
			    if (domValue == value)
			    {
				    $(this).attr("class", "select");
			    }
			    else
			    {
				    $(this).attr("class", "");
			    }
		    });
		}
		else
		{
			frame.slideUp(DownDelay);
		}
    });
	
	frame.contents().on('click','span',function(event){//选择 特征组
		var value = $(this).attr("value");

		$(this).attr("class", "select");
		$(this).siblings().attr("class", "");
		switch (bntId) {
			case ToolId.ChooseMnt:
				nThis.gid = value;
				var defaultMexMethod = $(this).attr("defaultMexMethod");
				if(defaultMexMethod){//特征组联动 提取方法
					nThis.mid=defaultMexMethod;
				}
				frame.slideUp(DownDelay);
				break;
			case ToolId.ChooseMethod:
				nThis.mid = value;
				frame.slideUp(DownDelay);//点击后收取下拉
				break;
			default :
                frame.slideUp(DownDelay);//点击后收取下拉
                break;
		}	
		nThis.invoke(bntId,{value:value});//回调	
	});	
	//隐藏其他下拉选
	function hideOthers(){
		for(var i in nThis.downListIds){
			var id = nThis.downListIds[i];
			if(bntId===id){
				continue;
			}
			//$("#" + id+"Frame").slideUp(DownDelay);
			$("#" + id+"Frame").slideUp(0);
		}
	}
}
