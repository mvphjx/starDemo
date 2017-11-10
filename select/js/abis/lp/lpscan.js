
LPScan.prototype.dbInfo 	= null;
LPScan.prototype.dbid 	= null;
LPScan.prototype.btyInfo 	= null;
LPScan.prototype.language 	= null;
LPScan.prototype.btyTxt 	= null;
LPScan.prototype.dbTxt 		= null;
LPScan.prototype.caseTxt 	= null;
LPScan.prototype.ocxPart 	= null;
LPScan.prototype.txtPart 	= null;
LPScan.prototype.casePart 	= null;
LPScan.prototype.contPart 	= null;
LPScan.prototype.scanPart	= null;
LPScan.prototype.cardPart 	= null;
LPScan.prototype.ocx	 	= null;
LPScan.prototype.caseObj 	= null;
LPScan.prototype.isOpenImg	= false;
LPScan.prototype.enrollType	= false;

function LPScan(dbInfo,dbid,btyInfo,btyspec,language,plus)
{
	this.dbInfo		= dbInfo;
	this.dbid 	    = dbid;	
	this.btyInfo 	= btyInfo;
	this.btyspec	= btyspec;
	this.language	= language;
	this.bpmLists = WebUtil.isEmpty(plus)?{}:plus.bpmLists;
	this.init();	
}

LPScan.prototype.initInvariable = function()
{
	this.ocx 		= document.getElementById("ImgOcx");
	this.ocxPart 	= $("#OcxPart");
	this.txtPart 	= $("#TxtPart");
	this.contPart 	= $("#ContentPart");
	this.casePart	= $("#CaseInfo");
	this.cardPart 	= $("#CardInfo");
	this.scanPart	= $("#ScanPart");
}

LPScan.prototype.init = function()
{
	this.initInvariable();
	this.initImgTool();
	this.initCaseTree();
	this.initButton();
	this.initShowTxtBnt();
	this.initOcx();
	this.initTxt();
	this.initScanParam();
	
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

LPScan.prototype.checkSave = function()
{
	var v = this.btyTxt.getValue();
	if(v == null || this.caseObj == null || this.isOpenImg == false||(!this.cardTxt.isPassValidate()))
	{
		this.saveBnt.setEnabled(false);
	}
	else
	{
		this.saveBnt.setEnabled(true);	
	}
}

LPScan.prototype.initScanParam = function()
{
	var nThis = this;	
	//this.dbTxt = WebUI.createSearchCombo("DBText",LPCardInfoCol.DBID_MASK, "",1, false,change);
	this.dbTxt = WebUI.createCombo("DBText",LPCardInfoCol.DBID_MASK, null,null, true, true,ABISCode.DBCodeName,"",null);
	this.dbTxt.setComboData(this.dbInfo);
	this.dbTxt.setEditable(false);	
	// 生物特征
	var p = new ComboParam();
	p.pId 			= "BtyText";
	p.id 			= "bty";
	p.flag 			= true;
	p.issearchall 	= false;
	p.itemtype 		= ComboItemType.Text;
	this.btyTxt = WebUI.createCombo1(p);
	this.btyTxt.addChangeListener(changdBty);
	this.btyTxt.setComboData(this.btyInfo);
	
	if(this.btyInfo != null)
	{
		var bty = this.btyInfo[0].code;
		var btyTxt = this.btyInfo[0].text;
		this.btyTxt.setValue(bty);
		this.cardTxt.setBty(bty,btyTxt);
	}

	function changdBty(id,value,text)
	{
		nThis.cardTxt.setBty(value,text);
		var n = nThis.imgOcx.HS_OCX_SetBty(value,0);
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

};

LPScan.prototype.initImgTool = function()
{
	var toolIds = [];
	toolIds.push(ToolId.Move);
	toolIds.push(ToolId.ZoomIn);
	toolIds.push(ToolId.ZoomOut);
	//toolIds.push(ToolId.RotateLeft);
	//toolIds.push(ToolId.RotateRight);
	toolIds.push(ToolId.Precent50);
	toolIds.push(ToolId.Precent100);
	toolIds.push(ToolId.Precent150);
	toolIds.push(ToolId.Precent200);
	toolIds.push(ToolId.ViewPort);
	toolIds.push(ToolId.FitWidth);
	toolIds.push(ToolId.FitHeight);
	toolIds.push(ToolId.AdjustScale);
	//toolIds.push(ToolId.TextInfo);
	new ImageTool("ImgOper","ScanOcx",toolIds,OCX.OcxType.LPSCAN);
	
	
	var toolIds_card = [];
	toolIds_card.push(ToolId.Move);
	toolIds_card.push(ToolId.ZoomIn);
	toolIds_card.push(ToolId.ZoomOut);
	toolIds_card.push(ToolId.Precent50);
	toolIds_card.push(ToolId.Precent100);
	toolIds_card.push(ToolId.Precent150);
	toolIds_card.push(ToolId.Precent200);
	toolIds_card.push(ToolId.ViewPort);
	toolIds_card.push(ToolId.FitWidth);
	toolIds_card.push(ToolId.FitHeight);
	new ImageTool("ImgOper2","ImgOcx",toolIds_card,OCX.OcxType.EDIT);
}

LPScan.prototype.initCaseTree = function()
{
	this.setting =
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

	function beforeClick(treeId, treeNode, clickFlag)
	{
		if(treeNode.click == undefined)return true;
		return treeNode.click;
	}

	var nThis = this;
	
	function onClick(event, treeId, treeNode, clickFlag)
	{
		if(treeNode.id == "text")
		{
			nThis.scanPart.hide();
			nThis.cardPart.hide();
			nThis.casePart.show();
		}
		else
		{
			nThis.scanPart.hide();
			nThis.casePart.hide();
			nThis.cardPart.show();
			
			//切换现场卡片
			var cardId = treeNode.cardId;
			if(WebUtil.isNull(cardId))return;
			var bty = treeNode.bty;
			var cid = treeNode.cid;
			nThis.switchCard(cardId, bty , cid, ABISCode.ImageShowType.PriLoseLess, 0);
		}
	}
	
	$.fn.zTree.init($("#NaviTree"), this.setting, null);
}

LPScan.prototype.initButton = function()
{
	this.saveBnt 		= new ToolButton("Save","SaveImg",callBack,"SaveDisableImg");
	this.saveBnt.setText(AbisMessageResource.ToolTipText["Save"]);
	this.scanBnt 		= new ToolButton("Open","OpenImg",callBack,"OpenDisableImg");
	this.scanBnt.setText(AbisMessageResource.ToolTipText["Open"]);
	this.importImg 		= new ToolButton("ImportImg", "ImportImg", callBack,"ImportDisableImg");
	this.importImg.setText(AbisMessageResource.ToolTipText["ImportImg"]);
	this.scan		 	= new ToolButton("Scan", "Scan", callBack,"ScanDisable");
	this.scan.setText(AbisMessageResource.ToolTipText["Scan"]);
	this.selelctScan	= new ToolButton("SelectScan", "SelectScan", callBack);
	this.selelctScan.setText(AbisMessageResource.ToolTipText["SelectScan"]);
	this.videoScan	= new ToolButton("VideoScan", "VideoScan", callBack);
	this.videoScan.setText(AbisMessageResource.ToolTipText["VideoScan"]);
	this.videoSnap	= new ToolButton("VideoSnap", "VideoSnap", callBack);
	this.videoSnap.setText(AbisMessageResource.ToolTipText["VideoSnap"]);
	this.gotoScan		= new ViewButton("GotoScan","GotoScan",callBack);
	this.gotoScan.setText(AbisMessageResource.GotoScan);
	//this.newCase		= new ViewButton("NewCase","NewCase",callBack);
	
	this.saveBnt.setEnabled(false);
	
	// this.saveBnt2 		= new ToolButton("Save2","SaveImg",callBack,"SaveDisableImg");
	// this.saveBnt2.setText(AbisMessageResource.ToolTipText["Save"]);
	// this.scanBnt2 		= new ToolButton("Open2","OpenImg",callBack);
	// this.scanBnt2.setText(AbisMessageResource.ToolTipText["Open"]);
	// this.importImg2 		= new ToolButton("ImportImg2", "ImportImg", callBack);
	// this.importImg2.setText(AbisMessageResource.ToolTipText["ImportImg"]);
	// this.saveBnt2.setEnabled(false);
    this.gotoScan2 		= new ToolButton("GotoScan2","GotoScan2",callBack);
    this.gotoScan2.setText(AbisMessageResource.GotoScan);
	
	var nThis = this;
	function callBack(id)
	{
		nThis.cancelSelectedNode();//维护节点状态，避免歧义
		switch(id)
		{
			case "Open":
				nThis.openCaseWindow();
				break;
			case "Open2":	
				nThis.scanPart.show();
				nThis.casePart.hide();
				nThis.cardPart.hide();
				nThis.openCaseWindow();
				break;
			case "Save":
				nThis.save();
				break;
			case "ImportImg":
				nThis.openImgFile();
				break;
			case "ImportImg2":
				nThis.scanPart.show();
				nThis.casePart.hide();
				nThis.cardPart.hide();
				nThis.openImgFile();
				break;
			case "Scan":
				nThis.scanImg();
                nThis.upDatePageInfo();
				break;
			case "SelectScan":
				nThis.imgOcx.HS_OCX_SelectFlatScan(0);
				nThis.upDatePageInfo();
				break;	
			case "GotoScan":
            case "GotoScan2":
				nThis.casePart.hide();
				nThis.cardPart.hide();
				nThis.scanPart.show();
				break;
			case "NewCase":
				break;
			case "VideoScan":
                if(nThis.caseId == null)
                {
                    DialogUtil.openSimpleDialogForOcx(AbisMessageResource['PleaseOpenACase']);
                    return;
                }
                //保存 扫描 打开 失效
                nThis.scanBnt.setEnabled(false);
                nThis.importImg.setEnabled(false);
                nThis.scan.setEnabled(false);
                nThis.imgOcx.HS_OCX_OnVideoScan(0);
				nThis.upDatePageInfo();
				break;
			case "VideoSnap":
                //保存 扫描 打开 生效
                nThis.scanBnt.setEnabled(true);
                nThis.importImg.setEnabled(true);
                nThis.scan.setEnabled(true);
                if(nThis.caseId == null)
                {
                    DialogUtil.openSimpleDialogForOcx(AbisMessageResource['PleaseOpenACase']);
                    return;
                }
				if(nThis.imgOcx.HS_OCX_OnVideoSnap(0)>=0){
                    nThis.isOpenImg = true;
                    nThis.upDatePageInfo();
                }
				break;	
				
		}
	}
}

LPScan.prototype.openCaseWindow = function()
{
	if (this.cardWindow == null) 
	{
		this.cardWindow = ABISWindowUtil.openLPCase("lpcard", null, null,selectedCard, false, LPCardInfoCol.CREATE_TIME, WebTable.DES);
	} 
	else 
	{
		//this.cardWindow.setData({dbid : this.dbid});
		//页面暂不需要 限制数据库
		this.cardWindow.setData({});
		this.cardWindow.open();
	}

	var nThis = this;
	function selectedCard(rows) 
	{
		if (!WebUtil.isEmpty(rows)) 
		{
			var result = rows[0];
			nThis.openCase(rows);
		}
	}
}

// 打开图像
LPScan.prototype.openImgFile = function()
{
	if(this.caseId == null)
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource['PleaseOpenACase']);
		return;
	}
	var f = this.imgOcx.HS_OCX_OnFileImport(0);
	if(f == 0 ) return;
	this.isOpenImg = true;
	this.upDatePageInfo();

}
//导入 扫描  拍照后 更新一下   页面信息
LPScan.prototype.upDatePageInfo= function(){
	this.checkSave();
	var infoStr = this.imgOcx.HS_OCX_GetImgInfo();
	var info = eval('(' + infoStr + ')');
	$("#ImgWidth").html(info.width+"px");
	$("#ImgHeight").html(info.height+"px");
	$("#ImgDepth").html(info.bpp);
	$("#ImgDpi").html(info.resolution);
	var bty = this.btyTxt.getValue();
	if(bty == null)return;
	var n = this.imgOcx.HS_OCX_SetBty(bty,0);
	this.enrollType = ABISCode.LPEnrollType.IMAGE_SLICER;
	
}

// 扫描
LPScan.prototype.scanImg = function()
{
	if(this.caseId == null)
	{
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource['PleaseOpenACase']);
		return false;
	}
	//this.imgOcx.HS_OCX_SetFlatScanShowUI(0);
	if(this.imgOcx.HS_OCX_OnFlatScan(0)>=0){
        this.enrollType = ABISCode.LPEnrollType.LATENT_SCAN;
        this.isOpenImg = true;
    }
}

LPScan.prototype.openLocalTpl = function()
{
	// this.imgOcx.HS_OCX_OpenCardTemplage(0);
	// var cnt = this.imgOcx.HS_OCX_GetTemplatePageCnt();
	// this.setPageCnt(cnt);
	// this.refreshScanObjList();
}

LPScan.prototype.save = function()
{	
	if(parseInt(this.seq)>99){
		var str =AbisMessageResource.UpTo8;
		DialogUtil.openSimpleDialogForOcx(str.replace('8','99'));
		return false;
	}
	if(!this.cardTxt.isPassValidate()){
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert.IncompleteErrorInfo);
		return false;
	}
	this.saveBnt.setEnabled(false);
	var data = {};
	data.imgLobStr = this.imgOcx.HS_OCX_OnGetLPBlobData(0);
	//alert(data.imgLobStr)
	var txtData = this.cardTxt.getLPCardObject();
	
	data.lpCardInfo = txtData.lpCardInfo;
	data.lpCardText = txtData.lpCardText;
	data.enrollInfo = txtData.enrollInfo;
	
	data.lpCardInfo.ceId 		= this.caseId;
	data.lpCardInfo.dbid	= this.dbid;
	data.enrollInfo.enrollType	= this.enrollType;
    data.useBpm = WebUtil.isEmpty(this.bpmChecker.getSelectIds)?true:false;
    data.bpmId  = this.bpmCombo.getValue();
	var jData = $.toJSON(data);
	var url = WebVar.VarPath + "/lp/scan/save";
	
	WebUtil.Wait();
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
				if(data.status == "ok")
				{
					nThis.addNewCardNode(data.data);
					nThis.initCardInfo();
					nThis.cardTxt.clear();
				}
				else
				{
					DialogUtil.openSimpleDialogForOcx(data.msg);
				}
				WebUtil.NoWait();
				nThis.saveBnt.setEnabled(true);
			},   
			error : function(e) 
			{
                DialogUtil.openSimpleDialogForOcx(AbisMessageResource['SaveCardFail']);
				nThis.saveBnt.setEnabled(true);
				WebUtil.NoWait();
			}   
		}
	);
};

/**
 * 打开案件
 */
LPScan.prototype.openCase = function(rows)
{
	var nThis = this;
	if(!WebUtil.isEmpty(rows))
	{
		WebUtil.Wait();
		var result = rows[0];
		this.caseId = result.ID;
		this.dbid = result.DBID;
		var url = WebVar.VarPath + "/lp/scan/navi/" + this.caseId;
		jQuery.ajax
		( 
	        {
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : null,
				dataType : 'json',
				timeout	: WebVar.TimeOut,
				success : function(data) 
				{   
					WebUtil.NoWait();
					if(data != null)
					{
						var struct = data.struct;
						if(struct != null)
						{
							var downList 	= struct.downList;
							var imgIdList 	= struct.imgIdList;
							var treeList 	= struct.treeList;
							if (treeList != null) 
							{
								treeList.push( 
								{
									id : "text",
									pId : "root",
									name : nThis.language.CaseInfo,
									open : false,
									click : true
								});
							}
							$.fn.zTree.init($("#NaviTree"), nThis.setting, treeList);
							
							var id = null;
							for(var i = 0;i<treeList.length;i++)
							{
								if(treeList[i].cardId != undefined)
								{
									id 		= treeList[i].id;
									break;
								}
							}
							if(id != null)
							{
								var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
								var $node = $naviTree.getNodeByParam("id", id, null);
								//不用选中第一个节点，因为缺省是扫描界面
								//$naviTree.selectNode($node, false);
							}
						}
						nThis.caseObj = data.caseObj;
						if(data.caseObj != null)
						{
							CaseInfoEnt.hiddenCardList();
							CaseInfoEnt.setCaseObj(data.caseObj);
							//设置数据库
							if(data.caseObj.mainInfo&&data.caseObj.mainInfo.dbid){								
								nThis.dbTxt.setValue(data.caseObj.mainInfo.dbid);
							}
						}
						
						nThis.initCardInfo();
						nThis.checkSave();
					}
				},   
				error : function(e,status,error) 
				{   
					if(status == "timeout")
					{
                        DialogUtil.openSimpleDialogForOcx(nThis.language.SvrNoResponse);
					}	
				}   
			}
		);
	}
};

LPScan.prototype.initCardInfo = function()
{
	var tree = $.fn.zTree.getZTreeObj("NaviTree");
	var nodes = tree.getNodes();
	var size = 0;//卡片节点总数
	var maxNum = 0;
	var root = nodes[0];
	var minAbleNum = 0;//可用的最小卡片序号
	var seqs = [];
	var childrens = root.children;
	for(var i in childrens)
	{
		var node = childrens[i];
		if(WebUtil.isEmpty(node.children))continue;
		var cs = node.children;
		for(var j in cs)
		{
			var child = cs[j];
			var fgp = parseInt(child.fgp);
			if(fgp > maxNum)
			{
				maxNum = fgp;
			}
			seqs.push(fgp);
			size++;
		}
	}
	maxNum += 1;
	if(maxNum>99&&size<99){
		for(var minAbleNum = 1; minAbleNum<100;minAbleNum++){
			if(jQuery.inArray(minAbleNum, seqs)==-1){
				break;
			}
		}
		maxNum=minAbleNum;
	}
	this.seq = maxNum >= 10 ? maxNum : "0" + maxNum;
	
	var ceNum = this.caseObj.mainInfo.ceNum;
	
	var newCardNum = ceNum + this.seq;
	
	this.cardTxt.setCardNum(newCardNum);
	this.cardTxt.setSeq(this.seq);
	
};

LPScan.prototype.addNewCardNode = function(cardId)
{
	var bty = parseInt(this.btyTxt.getCode());
	
	var tree = $.fn.zTree.getZTreeObj("NaviTree");
	
	var nodes = tree.getNodes();
	
	var root = nodes[0];
	var children = root.children;
	
	//查找是否有生物特征节点
	var btyNode = null;
	for(var i in children)
	{
		var n = children[i];
		var btyValue = parseInt(n.bty);
		if(btyValue == bty)
		{
			btyNode = n;
			break;
		}
	}
	
	var nodes = [];
	var parent = btyNode;
	
	var isCreate = false;
	if(btyNode == null)
	{
		parent = root;
		var btyTxt = "";
		switch(bty)
		{
			case 1:	btyTxt = AbisMessageResource['Fingerprint'];	break;
			case 2:	btyTxt = AbisMessageResource['Palm'];	break;
			case 4:	btyTxt = AbisMessageResource['Photo'];	break;
			default:btyTxt = AbisMessageResource['NotSupported'];	break;
		}
		btyNode 		= {};
		btyNode.id 		= bty;
		btyNode.pId 	= "root";
		btyNode.bty 	= bty;
		btyNode.name	= btyTxt;
		btyNode.open 	= true;
		btyNode.click 	= false;
		btyNode.type 	= ABISCode.TableTypeCode.LPCASE;
		nodes.push(btyNode);
		
		isCreate = true;
	}
	
	var seq 	= parseInt(this.seq);
	var obj 	= {};
	obj.id 		= bty +"-0-"+ seq +"-0";
	obj.name 	= this.seq;
	obj.pId 	= bty;
	obj.cardId 	= cardId;
	obj.bty 	= bty;
	obj.vid		= 0;
	obj.cid 	= 0;
	obj.fgp 	= seq;
	obj.open	= true;
	obj.click 	= true;
	obj.type 	= ABISCode.TableTypeCode.LPCASE;
	nodes.push(obj);
	
	tree.addNodes(parent,nodes,true);
};

LPScan.prototype.searchData = function(cardId, bty, cid, imgType, gid)
{
	if(cardId == null)return;
	var obj 	= {};
	obj.bty 	= bty;
	obj.cid 	= cid;
	obj.imgType = imgType;
	obj.gid		= gid;
	obj.cardId 	= cardId;
	//判断是否需要检索卡片文本
	obj.qryTxt	= true;
	for(var i=0;i<this.cache.length;i++)
	{
		var o = this.cache[i];
		var card = o.card;
		if(card.lpcardInfo.id == cardId)
		{
			obj.qryTxt = false;
			break;
		}
	}
	var jStr	= $.toJSON(obj);
	var url 	= WebVar.VarPath +"/lp/data/";
	var nThis 	= this;
	jQuery.ajax( 
    {
		type 		: 'POST',
		contentType : 'application/json',
		url 		: url,
		data 		: jStr,
		dataType 	: 'json',
		timeout		: WebVar.TimeOut,
		success 	: function(resInfo)
		{
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data=resInfo.data
                nThis.curData = data;
                if(data  != null)
                {
                    nThis.curCard = {"card":data,"mnt":false,"txt":false};
                    nThis.cache.push(nThis.curCard);
                    nThis.switchLPCardTxt(cardId);
                    var imgLob = data.img;
                    var mntLob = data.mnt;
                    if(nThis.ocx != null)
                    {
                        if (imgLob != null && !WebUtil.isEmpty(imgLob.item))
                        {
                            var lob = imgLob.lob;
                            var item = imgLob.item;
                            nThis.ocx.HS_OCX_AppendLPStrLob(nThis.caseId,nThis.cardId, lob.id, item.itemIndex, bty, ABISCode.LobDataType.IMG, lob.gid, cid, item.data);
                        }
                        if (mntLob != null && !WebUtil.isEmpty(mntLob.item))
                        {
                            var lob = mntLob.lob;
                            var item= mntLob.item;
                            nThis.ocx.HS_OCX_AppendLPStrLob(nThis.caseId,nThis.cardId, lob.id, item.itemIndex, bty, ABISCode.LobDataType.MNT, lob.gid, cid, item.data);
                        }
                        nThis.ocx.HS_OCX_SelectImageMnt(nThis.cardId, 0, bty, 0, 0, obj.imgType, obj.gid, cid);
                    }
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }

		},   
		error : function(e,status,error) 
		{   
			if(status == "timeout")
			{
                DialogUtil.openSimpleDialogForOcx(nThis.language.SvrNoResponse);
			}
		}   
	});
};

LPScan.prototype.switchCard = function(cardId, bty, cid, imgType, gid)
{
	var obj 	= {};
	obj.cardId 	= cardId;
	obj.bty 	= bty;
	obj.cid 	= cid;
	obj.imgType = imgType;
	obj.gid		= gid;
	var jsonData = $.toJSON(obj);
	var url = WebVar.VarPath +"/lp/data/";
	
	var nThis = this;
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jsonData,
		dataType : 'json',
		success : function(resInfo)
		{
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data=resInfo.data
                if(data != null)
                {
                    var img = "";
                    var mnt = "";
                    var imgLob = data.img;
                    var mntLob = data.mnt;
                    if(imgLob != null && !WebUtil.isEmpty(imgLob.item))
                    {
                        img = imgLob.item.data;
                    }
                    if(mntLob != null && !WebUtil.isEmpty(mntLob.item))
                    {
                        mnt = mntLob.item.data;
                    }
                    nThis.ocx.HS_OCX_SetImageMnt(img, "", mnt, "");
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }

		},   
		error : function(e) 
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource['SearchError']);
		}   
	});
};


LPScan.prototype.refreshScanObjList = function()
{
	if(WebUtil.isEmpty(this.fvs))return;
	var str = this.imgOcx.HS_OCX_GetAllScanObject(0);
	var newFvs = this.fvs;
	if(!WebUtil.isNull(str))
	{
		newFvs = [];
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
};


LPScan.prototype.initShowTxtBnt = function()
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
	
//	var showTxtBnt = WebUI.createTxtBnt("ScanPage", WebUI.TxtBntType.TOGGLE, showScanPage);
//	function showScanPage(visible)
//	{
//		nThis.showScanPage = visible;
//		if(visible == true)
//		{
//			$("#OcxPart").hide();
//			$("#TxtPart").show();
//		}
//		else
//		{
//			$("#TxtPart").hide();
//			$("#OcxPart").show();
//		}
//	}
	
};

LPScan.prototype.layout = function()
{
	var h 		= WebUtil.getClientHeight();
	var toolH 	= $(".WebTool").height();
	var border 	= 4;
	var ocxH 	= h - LayoutParam.headerH - LayoutParam.footerH - toolH - border;
	
	this.ocxPart.height(ocxH);
	this.txtPart.height(ocxH);
	
	var txtH = h - LayoutParam.headerH - LayoutParam.footerH - border;
	this.contPart.height(txtH);
	
	var caseInfoH = txtH - border;
	this.casePart.height(caseInfoH);
	this.cardPart.height(caseInfoH);
	
	var propertyH = h - LayoutParam.footerH - $("#Property").offset().top - 2;
	$("#Property").height(propertyH);
	
	var imgProH = h - LayoutParam.footerH - $("#ImgProcess").offset().top - 2;
	$("#ImgProcess").height(imgProH);
};

LPScan.prototype.searchCardNum = function()
{
	var cardNum = $("#CardNum").val();
	if(WebUtil.isEmpty(cardNum))
	{
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource['PleaseInputCardNum']);
		return;
	}
	feedBackInfo.query(ABISCode.TableTypeCode.TPCARD,"cardnum",cardNum);
};

LPScan.prototype.initTxt = function()
{
	var nThis = this;
//	this.caseTxt = new LPCaseEditPage(null,null,LPTxtMode.SCAN);
	
	this.cardTxt = new LPCardEditPage(null,null,LPTxtMode.SCAN);
    this.cardTxt.setLPCardObject({});
	this.cardTxt.registerChangeListener(txtChange);

    function txtChange(id,value,data)
    {
        nThis.checkSave();
    }
};

LPScan.prototype.initOcx = function()
{
	try
	{
		this.imgOcx = document.getElementById("ScanOcx");
		var n = this.imgOcx.HS_OCX_SetImgSpec(this.btyspec,0);
		if(n < 0)
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource['NoCutParam']);
		}
		this.imgOcx.attachEvent("HS_OCX_NotifyEvent", ocxEvent);
	}
	catch(e)
	{
		var msg = "";
		if(this.btyspec==null){
			msg=(AbisMessageResource.Alert["NoImgCutSpecifyParamCanNotSave"]);
		}
        DialogUtil.openSimpleDialogForOcx(e+"\n"+msg);
		this.imgOcx = null;
	}
	
	function ocxEvent(eventId, option, desc)
	{
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
		}
	}
};
/*
 * 返回现场录入主界面后  取消 卡片 案件信息等节点选中状态；
 */
LPScan.prototype.cancelSelectedNode = function(){
	var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
	$naviTree.cancelSelectedNode();
};


