
TPScan.prototype.isImpImg 	= false;
TPScan.prototype.txtWidget	= null;
TPScan.prototype.imgOcx		= null;
TPScan.prototype.colLens	= null;

/**
	@param p
	{
		dbid: "选中的数据库",
		dbInfo	: "所有捺印数据库",
		tplInfo	: "卡片模版",
		cs		: "卡片结构",
		fvs		: "切割部位",
		requried: "必填项",
		defValue: "默认值",
		colLens	: "长度验证",
		btyspec : "生物特征切割规格",
		cprmex 	: "压缩提取特征配置"
		bpmLists: "已发布工作流"
	}
 */
function TPScan(p)
{
	this.initParam();
	this.dbid 	= p.dbid;
	this.dbInfo 	= p.dbInfo;
	this.tplInfo	= p.tplInfo;
	this.cs			= p.cs;
	this.fvs		= p.fvs;
	this.requried	= p.requried;
	this.defValue 	= p.defValue;
	this.colLens 	= p.colLens;
	this.btyspec	= p.btyspec;
	this.cprmex		= p.cprmex;
	this.bpmLists = p.bpmLists;
	this.init();	
}

TPScan.prototype.initParam = function()
{
	this.dbid = null;
	
	// 卡片模版缓存
	this.template = {};

	// 当前的卡片模版名称
	this.tplName = null;
}

TPScan.prototype.init = function()
{
	this.initOcx();
	this.initImgTool();
	this.initButton();
	this.initShowTxtBnt();
	this.initScanList();
	this.initScanObjectTree();
	this.initTxt();
	this.initToolView();
	this.layout();
	
	var nThis = this;
	$(window).resize
	(
		function()
		{
			nThis.layout();
		}
	);
	
}

TPScan.prototype.checkSave = function()
{
	var isFinish = this.txtWidget.isPassValidate();
	var dataStr = this.imgOcx.HS_OCX_GetAllScanObject(0);
	var hasCutData = false;
	if(!WebUtil.isNull(dataStr))
	{
		var data = eval('(' + dataStr +')');
		if(data != null && data.length > 0)
		{
			hasCutData = true;
		}
	}
	if(hasCutData && isFinish)
	{
		this.saveBnt.setEnabled(true);
	}
	else
	{
		this.saveBnt.setEnabled(false);
	}
}

TPScan.prototype.initImgTool = function()
{
	var toolIds = new Array();
	toolIds.push(ToolId.Move);
	toolIds.push(ToolId.ZoomIn);
	toolIds.push(ToolId.ZoomOut);
//	toolIds.push(ToolId.RotateLeft);
//	toolIds.push(ToolId.RotateRight);
	toolIds.push(ToolId.Precent50);
	toolIds.push(ToolId.Precent100);
	toolIds.push(ToolId.Precent150);
	toolIds.push(ToolId.Precent200);
	toolIds.push(ToolId.ViewPort);
	toolIds.push(ToolId.FitWidth);
	toolIds.push(ToolId.FitHeight);
	var imgTool = new ImageTool("ImgOper","ScanOcx",toolIds,OCX.OcxType.TPSCAN);
}

TPScan.prototype.initButton = function()
{
	this.saveBnt 		= new ToolButton("Save","SaveImg",callBack,"SaveDisableImg");
	this.saveBnt.setText(AbisMessageResource.ToolTipText["Save"]);
	this.importImg 		= new ToolButton("ImportImg", "ImportImg", callBack);
	this.importImg.setText(AbisMessageResource.ToolTipText["ImportImg"]);
	this.scan		 	= new ToolButton("Scan", "Scan", callBack);
	this.scan.setText(AbisMessageResource.ToolTipText["Scan"]);
	this.selelctScan	= new ToolButton("SelectScan", "SelectScan", callBack);
	this.selelctScan.setText(AbisMessageResource.ToolTipText["SelectScan"]);
    this.autoSplit = new ToolButton("AutoSplit","AutoSplit",callBack,"AutoSplitDisableImg");
    this.autoSplit.setText(AbisMessageResource.ToolTipText["AutoSplit"]);
	this.saveBnt.setEnabled(false);
	
	var nThis = this;
	function callBack(id)
	{
		switch(id)
		{
			case "Scan":
				nThis.importImgFunction(function (){
					return nThis.imgOcx.HS_OCX_OnFlatScan(0);
				})
				break;
			case "ImportImg":
				nThis.openImgFile();
				break;
			case "LocalTpl":
				nThis.openLocalTpl();
				break;
			case "Save":
				nThis.save();
				break;
			case "SelectScan":
				nThis.imgOcx.HS_OCX_SelectFlatScan(0);
				break;
			case "VideoScan":
				nThis.importImgFunction(function (){
					return nThis.imgOcx.HS_OCX_OnVideoSnap(0);
				});
				break;
			case "AutoSplit":
                var autoSplitComboCode = nThis.autoSplitCombo.getValue();
				if(!WebUtil.isEmpty(autoSplitComboCode)){
                    autoSplitComboCode = parseInt(autoSplitComboCode)
                    nThis.imgOcx.HS_OCX_ApplyAutoSplit(autoSplitComboCode,0);
				}
				break;
		}
	}
}

TPScan.prototype.openImgFile = function()
{
	var _this = this;
	this.importImgFunction(function (){
		_this.imgOcx.HS_OCX_OnFileImport(0);
	})
	this.isImpImg = true;
}
/**
 *  导入图片  扫描图片  拍摄图片 时。根据模板执行多次操作；并且更新页面信息
 * 
 */
TPScan.prototype.importImgFunction = function(invoke)
{
	var _this = this;
	var count = this.imgOcx.HS_OCX_GetPageCount();
	if(count < 1)
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["AddScanPageTip"]);
		return;
	}
	var index = this.imgOcx.HS_OCX_GetActivePageIndex();
	var infoStr = this.imgOcx.HS_OCX_GetPageInfo(index,0);
	var  templateCount = this.imgOcx.HS_OCX_GetTemplatePageCnt();
	if(count===1&&infoStr==="{width:0,height:0,dpi:0,bit:0}"&&templateCount>1){//页数==1   内容==空
		for(var i=1 ;i<=templateCount;i++){
			if(i!==1){
				_this.imgOcx.HS_OCX_NewPage(0);
			}
			var n  = invoke();
			//break;
			//if(n == -1)return;
		}
	}else{
		var n  = invoke();
	}
	this.checkSave();
	var index = this.imgOcx.HS_OCX_GetActivePageIndex();
	var infoStr = this.imgOcx.HS_OCX_GetPageInfo(index,0);
	var info = eval('(' + infoStr + ')');
	// 格式 {width:4250,height:5850,dpi:500,bit:8} 
	$("#ImgWidth").html(info.width+"px");
	$("#ImgHeight").html(info.height+"px");
	$("#ImgDepth").html(info.bit);
	$("#ImgDpi").html(info.dpi);
	//刷新扫描页
	this.refreshPageList();
	//刷新 捺印对象
	this.refreshScanObjList();
}


TPScan.prototype.setTemplate = function(template)
{
    var autoSplitComboCode = this.autoSplitCombo.getValue();
    if(!WebUtil.isEmpty(autoSplitComboCode)){
        autoSplitComboCode = parseInt(autoSplitComboCode)
        this.imgOcx.HS_OCX_SetCardTemplate(template,autoSplitComboCode,0);
    }
	this.checkSave();
	this.refreshScanObjList();
}

TPScan.prototype.openLocalTpl = function()
{
    var autoSplitComboCode = this.autoSplitCombo.getValue();
    if(!WebUtil.isEmpty(autoSplitComboCode)){
        autoSplitComboCode = parseInt(autoSplitComboCode)
        this.imgOcx.HS_OCX_OpenCardTemplage(autoSplitComboCode,0);
    }
	this.refreshScanObjList();
}

TPScan.prototype.refreshScanObjList = function()
{
	if(WebUtil.isEmpty(this.fvs))return;
	var str = this.imgOcx.HS_OCX_GetAllScanObject(0);
	var newFvs = this.fvs;
	if(!WebUtil.isNull(str))
	{
		newFvs = new Array();
		var scanObjs = eval('('+str+')');
		for(var i=0;i<this.fvs.length;i++)
		{
			var fv = this.fvs[i];
			if(fv.click == false)
			{
				newFvs.push(fv);
			}
			else
			{
				var exists = false;
				for(var j=0;j<scanObjs.length;j++)
				{
					var obj = scanObjs[j];
					if(fv.bty == obj.bty && fv.vid == obj.vid && fv.fgp == obj.fgp)
					{
						exists = true;
						break;
					}
				}
				if(exists == false)
				{
					newFvs.push(fv);
				}
			}
		}
	}
	$.fn.zTree.init($("#ScanObjectTree"), this.scanObjSetting, newFvs);
}


TPScan.prototype.initShowTxtBnt = function()
{
	var nThis = this;
	var showTxtBnt = WebUI.createTxtBnt("ShowTxt", WebUI.TxtBntType.TOGGLE, showTxt);
	function showTxt(visible)
	{
		nThis.showTxt = visible;
		if(visible == true)
		{
			$("#OcxPart").hide();
			$("#TxtPart").show();
		}
		else
		{
			$("#TxtPart").hide();
			$("#OcxPart").show();
		}
	}
}

TPScan.prototype.initToolView = function()
{
	var nThis = this;
	// 卡片模版
	this.tplCombo = WebUI.createCombo("Template", "TplId", "", null,true,true,null,AbisMessageResource["CardTemplate"], null, 0 , 2);
	this.tplCombo.setComboData(this.tplInfo);
	this.tplCombo.addChangeListener(changeTpl);
	this.tplCombo.setValue("");
	function changeTpl(name,value,txt)
	{
		var tplName = value;
		nThis.applyTemplate(tplName);
	}
	//切割参数
    this.autoSplitInfoData = [{"code":0,"pinyin":"","text":"单面指纹卡"},{"code":1,"pinyin":"","text":"单面掌纹卡（右手在上）"},{"code":2,"pinyin":"","text":"单面掌纹卡（左手在上）"},{"code":3,"pinyin":"","text":"合并卡（右手在上）"},{"code":4,"pinyin":"","text":"合并卡（左手在上）"}];
    this.autoSplitCombo = WebUI.createCombo("AutoSplitDiv", "autoSplitId", "", null,true,true,null,null, null, 0 , 2);
    this.autoSplitCombo.setComboData(this.autoSplitInfoData);
    this.autoSplitCombo.addChangeListener(changeAutoSplitInfo);
    this.autoSplitCombo.setValue(0);
    function changeAutoSplitInfo(name,value,txt)
    {
    }
	WebComboUtil.addClickListener();
	//数据库
    this.dbTxt = WebUI.createCombo("Dbid","Dbid_Combo",null,null,true,true,null,null,null);
    initDBInfo();
	function initDBInfo()
	{	
		var url = WebVar.VarPath + "/locbase/db/code/" + ABISCode.DBTypeCode.TENRPINT_DB + "/" + ABISCode.DBPurposeCode.NORMAL;
		jQuery.ajax
		( 
			{
				type 		: 'POST',
				contentType : 'application/json',
				url 		: url,
				data 		: null,
				dataType 	: 'json',
				success 	: function(data) 
				{
					if(data != null)
					{
						nThis.dbTxt.setComboData(data);
						nThis.dbTxt.addChangeListener(change);
						nThis.dbTxt.setValue(nThis.dbid);
						nThis.txtWidget.setDbid(nThis.dbid);
						function change(id,value,text)
						{
							nThis.dbid = null;
							if(!WebUtil.isEmpty(value))
							{
								nThis.txtWidget.setDbid(value);
							}
						}
					}
				}
			}
		);
	}
	//bpmLists 工作流
    this.bpmChecker = new CheckBnt("bpmChecker", [{id: "0", text: AbisMessageResource.Workflow, enabled: true,checked:true}], {param: {colCount: 1},callback: {onClick:invole }});
	function invole(id,checked){
            nThis.bpmCombo.setEditable(checked);
    }
    this.bpmCombo = WebUI.createCombo("bpmDefination","bpmCombo",null,null,true,true,null,null,null);
	var datas=[];
	if(!WebUtil.isEmpty(this.bpmLists)){
        this.bpmCombo.setComboData(WebUtil.string2Json(this.bpmLists));
        this.bpmCombo.setValue("0");
	}
}

TPScan.prototype.applyTemplate = function(tplName)
{
	if(this.tplName == tplName) return;
	this.tplName = tplName;
	if(this.tplName == "")
	{
		var count = this.imgOcx.HS_OCX_GetPageCount();
		for(var i =0;i<count;i++)
		{
			this.imgOcx.HS_OCX_DeleteCardTemlate(i);
		}
		this.refreshScanObjList();
		return;
	}
	// 查看是否被缓存过
	var template = this.template[tplName];
	if(WebUtil.isNull(template))
	{
		tplName = WebUtil.urlEncode(tplName);
		//检索卡片模版
		var url = WebVar.VarPath + "/tp/scan/template/" + tplName;
		var nThis = this;
		jQuery.ajax
		(
	        {
				type 		: 'POST',
				contentType : 'application/json',
				dataType 	: 'json',
				url 		: url,
				data 		: null,
				success 	: function(data) 
				{   
					if(data.status == "ok")
					{
						var tplBaseStr = data.data;
						nThis.setTemplate(tplBaseStr);
					}
					else
					{
						DialogUtil.openSimpleDialogForOcx(data.msg);
					}
				},
				error : function(e) 
				{   
					DialogUtil.openSimpleDialogForOcx(e.msg);
				}   
			}
		);
	}
}

TPScan.prototype.initTxt = function()
{
	
	

	this.txtWidget = new TPCardEditPage(this.requried,null,this.defValue,TPTxtMode.SCAN);
	this.txtWidget.registerChangeListener(txtChange);
	this.txtWidget.setTableData(this.cs);
	this.txtWidget.setValidateColumns(this.colLens);
	var nThis = this;
	var retrFunc = null;
	function txtChange(id,value,data)
	{
		nThis.checkSave();
		
		if(id == TPCardInfoCol.CARD_NUM)
		{
			clearTimeout(retrFunc);
			retrFunc = setTimeout(
				function()
				{
					
				}, 2000);
		}
	}
}
//刷新扫描页
TPScan.prototype.refreshPageList = function()
{
	var count = this.imgOcx.HS_OCX_GetPageCount();
	
	var data = 
	[
		{id:"root",pId:0,name:AbisMessageResource["ScanPageList"],open:true,click:false}
	];
	for(var i=0;i<count;i++)
	{
		var item 	= {};
		item.id 	= "page_"+i;
		item.pId	= "root";
		//item.name	= "第"+(i+1)+"页";
		item.name	= ""+(i+1)+AbisMessageResource["Page"];
		item.open	= false;
		item.click	= true;
		item.index	= i;
		data.push(item);
	}
	$.fn.zTree.init($("#ScanListTree"), this.scanListSetting, data);

	var index = this.imgOcx.HS_OCX_GetActivePageIndex();
	if(index >= 0)
	{
		var treeObj = $.fn.zTree.getZTreeObj("ScanListTree");
		var nodes = treeObj.getNodes();
		var node = nodes[0].children[index];
		treeObj.selectNode(node);
	}
}

TPScan.prototype.initScanList = function()
{
	this.scanListSetting =
	{
	    data :
	    {
		    simpleData :
		    {
			    enable : true
		    }
	    },
	    callback :
	    {
	        beforeClick : beforeClick,
	        onClick : onClick
	    }
	};
	
	var nThis = this;	
	function beforeClick(treeId, treeNode, clickFlag)
	{
		if(treeNode.click == undefined)return true;
		return eval(treeNode.click);
	}

	function onClick(event, treeId, treeNode, clickFlag)
	{
		nThis.imgOcx.HS_OCX_SetActivePage(treeNode.index,0);
		var index = nThis.imgOcx.HS_OCX_GetActivePageIndex();
		var infoStr = nThis.imgOcx.HS_OCX_GetPageInfo(index,0);
		var info = eval('(' + infoStr + ')');
		// 格式 {width:4250,height:5850,dpi:500,bit:8} 
		$("#ImgWidth").html(info.width+"px");
		$("#ImgHeight").html(info.height+"px");
		$("#ImgDepth").html(info.bit);
		$("#ImgDpi").html(info.dpi);
	}
	$.fn.zTree.init($("#ScanListTree"), this.scanListSetting, null);
	
	var nThis = this;
	var limitnum = 4;//最多页数
	// 初始化按钮
	$("#AddPage").click
	(
		function()
		{
			var count = nThis.imgOcx.HS_OCX_GetPageCount();
			if(count>=limitnum){
				DialogUtil.openSimpleDialogForOcx(AbisMessageResource.MaxScanPage.replace("{{num}}",limitnum));
				return false;
			}
			nThis.imgOcx.HS_OCX_NewPage(0);
			nThis.refreshPageList();
		}
	);
	$("#DelPage").click
	(
		function()
		{
			if(nThis.imgOcx.HS_OCX_GetPageCount()==1){
				nThis.imgOcx.HS_OCX_DeleteAllPage(0);
				nThis.imgOcx.HS_OCX_NewPage(0);
				nThis.refreshPageList();
				nThis.refreshScanObjList();
			}else{
				var index = nThis.imgOcx.HS_OCX_GetActivePageIndex();
				nThis.imgOcx.HS_OCX_DeletePage(index,0);
				nThis.refreshPageList();
				nThis.refreshScanObjList();
			}
		}
	);
	$("#ClearPage").click
	(
		function()
		{
			nThis.imgOcx.HS_OCX_DeleteAllPage(0);
			nThis.imgOcx.HS_OCX_NewPage(0);
			nThis.refreshPageList();
			nThis.refreshScanObjList();
		}
	);
	
	this.refreshPageList();
}

TPScan.prototype.initScanObjectTree = function()
{	
	var nThis = this;
	this.scanObjSetting =
	{
	    data :
	    {
		    simpleData :
		    {
			    enable : true
		    }
	    },
	    callback :
	    {
	        beforeClick : beforeClick,
	        onClick : onClick,
	        onDblClick:createBox
	    }
	};
		
	//卡片导航点击节点前判断是否可以点击
	function beforeClick(treeId, treeNode, clickFlag)
	{
		if(treeNode.click == undefined)return true;
		return eval(treeNode.click);
	}

	//卡片导航点击节点事件
	function onClick(event, treeId, treeNode, clickFlag)
	{
		
	}
	
	function createBox(event, treeId, treeNode)
	{
		if(treeNode.children){
			for(var childrenLength = treeNode.children.length-1;childrenLength>=0;childrenLength--){
				var childrenNode = treeNode.children[childrenLength];
				createBox(event, childrenNode.id, childrenNode)
			}
		}
		var bty 	= treeNode.bty;
		var vid 	= treeNode.vid;
		var fgp		= treeNode.fgp;
		var t = $.fn.zTree.getZTreeObj("ScanObjectTree");
		var result=nThis.imgOcx.HS_OCX_AddCutBoxByBfv(bty,fgp,vid,0);
		if(result>=0){
			t.removeNode(treeNode);
			nThis.checkSave();
		}else{
			DialogUtil.openSimpleDialogForOcx(AbisMessageResource.OperationFailed);
		}
	}
	$.fn.zTree.init($("#ScanObjectTree"), this.scanObjSetting, this.fvs);
};
TPScan.prototype.setScanObj = function(data)
{
	this.fvs = data;
	$.fn.zTree.init($("#ScanObjectTree"), this.scanObjSetting, this.fvs);
}

TPScan.prototype.layout = function()
{
	var h = WebUtil.getContentHeight();

	//控件
	var toolH = $(".WebTool").height();
	var gap = 4;
	var ocxH = h - toolH - gap;
	if(ocxH < 640)
	{
		ocxH = 640;
	}
		
	$("#OcxPart").height(ocxH);
	$("#TxtPart").height(ocxH);
	
	var contentH = LayoutParam.headerH + toolH + ocxH + gap;
	
	//扫描对象列表
	var scanObj  = $("#ScanObject");
	var scanObjH = contentH - scanObj.offset().top - 2;
	scanObj.height(scanObjH);
	
	//反馈信息
	var feedBack  = $("#FeedBack");
	var feedBackH = contentH - feedBack.offset().top - 2;
	feedBack.height(feedBackH);
}

TPScan.prototype.save = function()
{
	WebUtil.Wait();
    this.saveBnt.setEnabled(false);
	if(WebUtil.isNull(this.cprmex))
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["NoCprParamCanNotSave"]);
		return;
	}
	if(WebUtil.isNull(this.btyspec))
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["NoImgCutSpecifyParamCanNotSave"]);
		return;
	}
	
	var checkTxt = this.txtWidget.validateRequired();
	if(!checkTxt)
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["IncompleteInfo"]);
		return;
	}
	
	var imgData = this.imgOcx.HS_OCX_GetExfedTPCard(0);
	var txtData = this.txtWidget.getTPCardObject();
	
	if(txtData.card.mainInfo != null)
	{
		this.mainInfo = txtData.card.mainInfo;
	}
	else
	{
		txtData.card.mainInfo = this.mainInfo;
	}
	
	
	var cardData = {};
    cardData.useBpm = WebUtil.isEmpty(this.bpmChecker.getSelectIds)?true:false;
    cardData.bpmId =this.bpmCombo.getValue();
	cardData.imgData = imgData;
	cardData.cardObj = txtData.card;
	//cardData.cardObj.mainInfo.dbid = this.dbid;
	
	var jData = $.toJSON(cardData);
	var url = WebVar.VarPath + "/tp/scan/save";
	
	var nThis = this;
	$.ajax
	( 
        {
			type 		: 'POST',
			contentType : 'application/json',
			url 		: url,
			data 		: jData,
			dataType 	: 'json',
			success 	: function(data) 
			{   
				WebUtil.NoWait();
                nThis.saveBnt.setEnabled(true);
				if(data.status == "ok")
				{
					nThis.txtWidget.reSet();
					nThis.saveBnt.setEnabled(false);
					
					var personNum 	= data.result.personNum;
					var cardNum 	= data.result.cardNum;
					nThis.txtWidget.setPersonNum(personNum);
					nThis.txtWidget.setCardNum(cardNum);
                    nThis.txtWidget.setDbid(nThis.dbTxt.getValue());
					nThis.imgOcx.HS_OCX_OnClear(1);
					nThis.initScanObjectTree();
					DialogUtil.openSimpleDialogForOcx(data.msg,reload);
				}
				else
				{
					DialogUtil.openSimpleDialogForOcx(data.msg);
				}
			},   
			error : function(e) 
			{   
				WebUtil.NoWait();
                nThis.saveBnt.setEnabled(true);
				DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["SaveCardFail"]);
			}   
		}
	);
	function reload(){
		//window.location.href=window.location.href;
	}
	
//	var index = this.imgOcx.GetActivePageIndex(); 
//	var active = this.imgOcx.GetActivePageIndex();
//	var pageCount = this.imgOcx.GetPageCount();
//	var pageInfo = this.imgOcx.GetPageInfo(0,0);
//	var fgpInfo = this.imgOcx.GetScanObjectInfo(1, 1, 0, 0);
//	var flag = this.imgOcx.AddCutBoxByBfv(1, 1, 0, 0);
}

TPScan.prototype.searchCardNum = function()
{
	var cardNum = $("#CardNum").val();
	if(WebUtil.isNull(cardNum))
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["PleaseEnterCardNum"]);
		return;
	}
	feedBackInfo.query(ABISCode.TableTypeCode.TPCARD,"cardnum",cardNum);
}

TPScan.prototype.searchPersonNo = function()
{
	var personNo = $("#PeopleNo").val();
	if(WebUtil.isNull(personNo))
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["PleaseEnterPersonNum"]);
		return;
	}
	feedBackInfo.query(ABISCode.TableTypeCode.TPPERSON,"person_no",personNo);
}

TPScan.prototype.initOcx = function()
{
	var _this = this;
	try
	{
		this.imgOcx = document.getElementById("ScanOcx");
		if(!WebUtil.isNull(this.btyspec))
		{
			this.imgOcx.HS_OCX_SetImgSpec(this.btyspec,0);
		}
		else
		{
			DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["NoImgCutSpecifyParam"]);
		}
		if(!WebUtil.isNull(this.cprmex))
		{
			this.imgOcx.HS_OCX_SetMexCprParam(this.cprmex,0);
		}
		else
		{
			DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["NoCprParamConfig"]);
		}
		this.imgOcx.attachEvent("HS_OCX_NotifyEvent", ocxEvent);
	}
	catch(e)
	{
		var msg = "";
		if(this.btyspec==null){
			msg=(AbisMessageResource.Alert["NoImgCutSpecifyParamCanNotSave"]);
		}
		DialogUtil.openSimpleDialogForOcx(e+"\n"+msg)
		this.imgOcx = null;
//		this.scanBnt.setEnabled(false);
//		this.openImgBnt.setEnabled(false);
//		this.localTpl.setEnabled(false);
//		this.serverTpl.setEnabled(false);
	}
	
	function ocxEvent(eventId, option, desc)
	{
		//2:4:{eventid:2,boxid:4,bty:1,fgp:0,vid:0,imgwidth:640,imgheight:640,resolution:500,viewwidth:70,viewheight:70,px:2659,py:1601,rotateangle:0.000000}
		if(WebUtil.isNull(desc))
		{
			$("#BoxWidth").html("");
			$("#BoxHeight").html("");
			$("#BoxX").html("");
			$("#BoxY").html("");
			$("#BoxAngle").html("");
			return;
		}
		var obj = eval('('+desc+')');
		switch(eventId)
		{
			case OCX.OcxMouseMessage.OCX_WM_LBUTTONDOWN:
			case OCX.OcxMouseMessage.OCX_WM_LBUTTONUP:	
				var fgp = option;
				$("#BoxWidth").html(obj.imgwidth+"px");
				$("#BoxHeight").html(obj.imgheight+"px");
				$("#BoxX").html(obj.px+"px");
				$("#BoxY").html(obj.py+"px");
				$("#BoxAngle").html(parseInt(obj.rotateangle)+"°");
				break;
			case OCX.OcxMouseMessage.OCX_WM_LBUTTONDBLCLK:

				_this.refreshScanObjList();
				break;
		}
	}
}

//TPScan.prototype.findFvs = function()
//{
//	if(WebUtil.isNull(this.dbid))return;
//	var nThis = this;
//	this.setScanObj(null);
//	var url = WebVar.VarPath + "/tp/scan/fvs/" + this.dbid;
//	jQuery.ajax
//	( 
//      {
//			type 		: 'POST',
//			contentType : 'application/json',
//			dataType 	: 'json',
//			url 		: url,
//			data 		: null,
//			success 	: function(data) 
//			{   
//				nThis.setScanObj(data);
//			},
//			error : function(e) 
//			{   
//				alert(e);
//			}   
//		}
//	);
//}
