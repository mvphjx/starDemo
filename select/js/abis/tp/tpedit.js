TPEdit.prototype.requried = null;
TPEdit.prototype.update = null;
TPEdit.prototype.cardId = null;
TPEdit.prototype.language = null;
TPEdit.prototype.colLens = null;
TPEdit.prototype.workmode = null;
TPEdit.prototype.taskId = null;
TPEdit.prototype.selBty = null;
TPEdit.prototype.selVid = null;
TPEdit.prototype.selFgp = null;
TPEdit.prototype.selCid = null;
TPEdit.prototype.selGid = null;//特征组
TPEdit.prototype.selBfvc = {};
TPEdit.prototype.needCheckList = [];//需要检查的指位，检查才允许完成,本来想动态维护删除一个指位信息，但是发现  上一个下一个 按钮需要依赖  原始的检查指位信息
TPEdit.prototype.hasCheckList = [];//已经检查完成的指位
TPEdit.prototype.paramMex = {};//用来保存 当前页面  卡片节点  特征参数
/**
@param p
{
	cs		: "卡片结构",
	fvs		: "切割部位",
	btyspec : "生物特征切割规格",
	cprmex 	: "压缩提取特征配置" 
	group ：特征组
	method：提取算法
}

待优化之处：原型方法暴露太多，没有封装。样式用的很简陋。
*/
function TPEdit(cardId, language, colLens, requried, update,p) {
	this.cs			= p.cs;
	this.fvs		= p.fvs;
	this.btyspec	= p.btyspec;
	this.cprmex		= p.cprmex;
	this.group = p.group;
	this.method = p.method;
	
	this.selGid = p.gid||0;
	this.initParam();
	this.cardId = cardId;
	this.language = language;
	this.colLens = colLens;
	this.requried = requried;
	this.update = update;
	this.workmode = WebCode.WorkMode.normal;
	this.init();
}

TPEdit.prototype.initParam = function() {
	this.naviData = null;
	this.dbWindow = null;
	this.cardWindow = null;
	this.cardId = null;
	this.dbid = null;
	this.cardObj = null;
	this.mntChange = false;
	this.txtChange = false;
	this.txtFinish = false;
	this.lobs = new Array();
}

TPEdit.prototype.init = function() {
	this.proObj = $("#FgpInfoFrame").property();
	this.initToolImg();
	this.initNaviTree();
	var nThis = this;
	var _this = this;
	this.imgOcx = document.getElementById("MntEditOcx");
	if(!WebUtil.isNull(this.cprmex))
	{
		this.imgOcx.HS_OCX_SetMexCprParam(this.cprmex,0);
	}
	else
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["NoCprParamConfig"]);
	}
	this.imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);
	this.imgOcx.attachEvent("HS_OCX_NotifyModifyEvent", ocxEvent);
	function ocxEvent(lobid, itemIndex) {
		nThis.setPrototypeText();
		nThis.mntChange = true;
		nThis.updateSaveStatus();
	}

	this.tpTxtWidget = new TPCardEditPage(this.requried, this.update, null,
			TPTxtMode.EDIT);
	this.tpTxtWidget.registerChangeListener(txtChange);
	if (this.colLens != null) {
		this.tpTxtWidget.setValidateColumns(this.colLens);
	}

	function txtChange(id, value, data) {
		nThis.txtChange = nThis.tpTxtWidget.isTxtInfoChanged();
		nThis.txtFinish = nThis.tpTxtWidget.validateRequired();
		nThis.updateSaveStatus();
	}

	MntTool.addSelectionListener(switcherMntTool);
	function switcherMntTool() {
	}

	this.layout();
	$(window).resize(function() {
		nThis.layout();
	});
	
	if (this.cardId != null) {
		this.openCard(this.cardId);
	}
	if (this.selGid!=null){
		//this.setGid(this.selGid)
	}
    //监听快捷键
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode === 90 && e.ctrlKey) {
            //alert("你按下了ctrl+Z");
            nThis.imgOcx.HS_OCX_Undo(0);
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            //alert("你按下了ctrl+Y");
            nThis.imgOcx.HS_OCX_Redo(0);
        }
    };
    //浏览器关闭监听
    window.onbeforeunload = function() {
        if (_this.AbortTask.enabled) {
            return "任务未完成，离开页面将自动放弃任务";
        } else {
            return;//正常关闭
        }
    };
	/*浏览器关闭放弃任务*/
    window.onunload = function() {
        if (_this.AbortTask.enabled&&_this.taskId) {
            var url = WebVar.VarPath + "/tp/edit/aborttask/" + _this.taskId;
            var data ={};
            jQuery.ajax({
                async: false,
                type: 'POST',
                url: url,
                data: data,
                dataType: 'json'
            });
        } else {
            return;//正常关闭
        }
    };
	
}

TPEdit.prototype.updateSaveStatus = function() {
	var b = (this.mntChange == true || this.txtChange == true);
	b = b && this.txtFinish;
	this.saveBnt.setEnabled(b);
	this.switchWorkModeBtn.setEnabled(!b);
}

TPEdit.prototype.initToolImg = function() {
	workModeList = new Array();
	workModeList.push({
		"id" : WebCode.WorkMode.normal,
		"txt" : "自由模式"
	});
	workModeList.push({
		"id" : WebCode.WorkMode.queue,
		"txt" : "队列模式"
	});
	this.openBnt = new ToolButton("Open", "OpenImg", invoke, "OpenDisableImg");
	this.openBnt.setText(AbisMessageResource.ToolTipText["Open"]);
	this.saveBnt = new ToolButton("Save", "SaveImg", invoke, "SaveDisableImg");
	this.saveBnt.setText(AbisMessageResource.ToolTipText["Save"]);
	this.selectDBBnt = new ToolButton("SelectDb", "SelectDBImg", invoke);
	this.selectDBBnt.setText(AbisMessageResource.ToolTipText["SelectDB"]);
	this.prevFgp = new ToolButton("PrevFgp", "PrevImg", invoke,"PrevFgpDisableImg");
	this.prevFgp.setText(AbisMessageResource.ToolTipText["LastOne"]);
	this.nextFgp = new ToolButton("NextFgp", "NextImg", invoke,"NextFgpDisableImg");
	this.nextFgp.setText(AbisMessageResource.ToolTipText["NextOne"]);
	// this.WorkMode = new ToolButtonList("WorkMode",
	// workModeList,"WorkModeImg", this);
	// this.switchWorkMode =
	// WebUI.createWebButton("WorkMode",WebUI.BntType.B_80_24,
	// "WebButton_80_24", invoke);
	this.switchWorkModeBtn = new ToolButton("WorkModeBtn", "WorkModeImg",
			invoke, "WorkModeDisableImg");
	this.switchWorkModeBtn.setText(AbisMessageResource.ToolTipText["SwitchWorkMode"]);
	// this.prevCard = new ToolButton("PrevCard", "PrevCardImg", invoke);
	// this.nextCard = new ToolButton("NextCard", "NextCardImg", invoke);
	this.GetTask = new ToolButton("GetTask", "GetTaskImg", invoke,
			"GetTaskDisableImg");
	this.GetTask.setText(AbisMessageResource.ToolTipText["GetTask"]);
	this.FinishTask = new ToolButton("FinishTask", "FinishTaskImg", invoke,
			"FinishTaskDisableImg");
	this.FinishTask.setText(AbisMessageResource.ToolTipText["FinishTask"]);
	this.AbortTask = new ToolButton("AbortTask", "AbortTaskImg", invoke,
			"AbortTaskDisableImg");
	this.AbortTask.setText(AbisMessageResource.ToolTipText["AbortTask"]);
	this.sendMatch = WebUI.createWebButton("SendMatchBnt",
			WebUI.BntType.B_80_24, "SendMatchBnt", invoke);
	this.saveBnt.setEnabled(false);
	// this.prevCard.setEnabled(false);
	// this.nextCard.setEnabled(false);
	this.GetTask.setEnabled(false);
	this.FinishTask.setEnabled(false);
	this.AbortTask.setEnabled(false);

	// 初始化图像操作工具条
	var idList = new Array();
	idList.push(ToolId.Move);
	idList.push(ToolId.ZoomIn);
	idList.push(ToolId.ZoomOut);
	idList.push(ToolId.RotateLeft);
	idList.push(ToolId.RotateRight);
	idList.push(ToolId.Precent50);
	idList.push(ToolId.Precent100);
	idList.push(ToolId.Precent150);
	idList.push(ToolId.Precent200);
	idList.push(ToolId.ViewPort);
	idList.push(ToolId.FitWidth);
	idList.push(ToolId.FitHeight);
	idList.push(ToolId.Rotate0);
	idList.push(ToolId.Rotate90);
	idList.push(ToolId.Rotate180);
	idList.push(ToolId.Rotate270);
	idList.push(ToolId.ChooseMnt);
	idList.push(ToolId.ChooseMethod);
    idList.push(ToolId.ShowCentre);
    idList.push(ToolId.ShowTriangle);
    idList.push(ToolId.ShowMnt);
	this.imgTool = new ImageTool("ImgOper", "MntEditOcx", idList,
			OCX.OcxType.EDIT,imgToolInvoke);
	var nThis = this;
	function invoke(id) {
		switch (id) {
		case "Open":
			nThis.showCardWindow();
			break;
		case "Save":
			nThis.save();
			break;
		case "SelectDb":
			nThis.showDBWindow();
			break;
		case "PrevFgp":
			nThis.changeFgp(-1);
			break;
		case "NextFgp":
			nThis.changeFgp(1);
			break;
		case "SendMatchBnt":
			nThis.sendMatchTask();
			break;
		case "WorkModeBtn":
			nThis.switchMode();
			break;
		case "PrevCard":
			alert('PrevCard');
			break;
		case "NextCard":
			alert('NextCard');
			break;
		case "GetTask":
			nThis.getEditTask();
			break;
		case "FinishTask":
			nThis.finishTask();
			break;
		case "AbortTask":
			nThis.abortTask();
			break;
		}
	}
	function imgToolInvoke(id,result){
		switch (id) {
		case "ChooseMnt":
			nThis.setGid(result.value,true);
			break;
		}
	}
}

TPEdit.prototype.setBfvc = function(bty, vid, fgp, cid) {
	if (bty != undefined && vid != undefined	&& fgp != undefined) 
	{
		this.selBfvc.bty = bty;
		this.selBfvc.vid = vid;
		this.selBfvc.fgp = fgp;
		this.selBfvc.cid = cid;
		this.selBty = bty;
		this.selVid = vid;
		this.selFgp = fgp;
		this.selCid = cid;
	}
}
/*设置特征组*/
//gid bool:是否需要控件立即切换 gid
TPEdit.prototype.setGid = function (gid,bool){
	if (gid != undefined){
		this.imgTool.gid = gid;
		bool&&this.switchFGP(this.selBty,this.selVid,this.selFgp,this.selCid,gid);
	}
}
TPEdit.prototype.getEditTask = function() {
	var url = WebVar.VarPath + "/tp/edit/gettask";
	var nThis = this;
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		dataType : 'json',
		url : url,
		data : null,
		success : function(resInfo) {
            if (resInfo.status === WebCode.WebResultStatus.ok) {
                var data = resInfo.data;
                if (!WebUtil.isEmpty(data) && !WebUtil.isEmpty(data.tpCardData)) {
                    WebUtil.NoWait();
                    var struct = data.tpCardData.struct;
                    nThis.cardObj = data.tpCardData.cardObj;
                    nThis.cardId = data.tpCardData.cardObj.tpCardInfo.id;

                    if (struct != null) {
                        nThis.naviData = struct;
                        var downList = struct.downList;
                        var imgIdList = struct.imgIdList;
                        var treeList = struct.treeList;
                        if (treeList != null) {
                            treeList.push({
                                id: "text",
                                pId: "root",
                                name: nThis.language.TextInfo,
                                open: false,
                                click: true
                            });
                        }
                        //滚动指位 缺指处理
                        //需要检查的指位
                        nThis.needCheckList = [];
                        nThis.hasCheckList = [];
                        if (!WebUtil.isEmpty(data.fiveList)) {
                            $.each(treeList, function (index, node) {
                                if (!WebUtil.isEmpty(node.id)) {
                                    if ($.inArray(node.id, data.fiveList) > -1) {
                                        node.name = node.name + "*"
                                        node.iconSkin = "icon01";
                                        nThis.needCheckList.push(node.id);
                                    }
                                }
                            })
                        }
                        $.fn.zTree.init($("#NaviTree"), nThis.setting, treeList);
                        if (!WebUtil.isEmpty(nThis.needCheckList)) {
                            //优先选中  需要检查的指位
                            var sixEList =
                                [{
                                    "bty": 0,
                                    "vidList": [{
                                        "vid": 0,
                                        "fgpList": [{
                                            "cids": [{"cid": 0}]
                                        }], "fgp": 1
                                    }]
                                }];
                            var sirArr = nThis.needCheckList[0].split('-');
                            sixEList[0].bty = sirArr[0]
                            sixEList[0].vidList[0].vid = sirArr[1]
                            sixEList[0].vidList[0].fgpList[0].fgp = sirArr[2]
                            sixEList[0].vidList[0].fgpList[0].cids[0].cid = sirArr[3]
                            nThis.initShow(sixEList);
                        } else {
                            nThis.initShow(downList);
                        }
                    }

                    if (nThis.cardObj != null) {
                        nThis.tpTxtWidget.setTPCardObject(nThis.cardObj);
                        nThis.txtFinish = nThis.tpTxtWidget.validateRequired();
                        nThis.updateSaveStatus();
                    }
                    nThis.taskId = data.taskId;
                    nThis.GetTask.setEnabled(false)
                    nThis.switchWorkModeBtn.setEnabled(false)
                    nThis.FinishTask.setEnabled(true);
                    nThis.AbortTask.setEnabled(true);
                    nThis.saveBnt.setEnabled(false);
                } else {
                    DialogUtil.openSimpleDialogForOcx(AbisMessageResource["EditQueueNoTask"]);
                }
            }else {
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
			}
		},
		error : function(e) {
			DialogUtil.openSimpleDialogForOcx(e);
		}
	});
}

TPEdit.prototype.clearAll = function() {
	$.fn.zTree.init($("#NaviTree"), this.setting, null);
	MntTool.hiddenAll();
	var imgOcx = document.getElementById("MntEditOcx");
	imgOcx.HS_OCX_ResetAllData(0);
	this.tpTxtWidget.clear();

}

TPEdit.prototype.abortTask = function() {
	var url = WebVar.VarPath + "/tp/edit/aborttask/" + this.taskId;
	var nThis = this;
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		dataType : 'json',
		url : url,
		data : null,
		success : function(data) {
			if (data == 0) {
				// getBnt.setEnabled(true);
				// finishBnt.setEnabled(false);
				// abortBnt.setEnabled(false);
				// reSetClean();
				nThis.switchWorkModeBtn.setEnabled(true);
				nThis.GetTask.setEnabled(true);
				nThis.FinishTask.setEnabled(false);
				nThis.AbortTask.setEnabled(false);
				nThis.saveBnt.setEnabled(false);
				nThis.clearAll();
			}
		},
		error : function(e) {
			DialogUtil.openSimpleDialogForOcx(e);
		}
	});
}

TPEdit.prototype.finishTask = function() {
	// 校验是否检查了所有指位
	if (this.workmode == WebCode.WorkMode.queue) {
		if(!WebUtil.isNull(this.needCheckList)){
			if(this.needCheckList.length>this.hasCheckList.length){
				DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert.NeedToCheckAll);
				return false;
			}
		}
	}
	// 如果编辑过先保存
	if (this.txtChange == true || this.mntChange == true) {
		this.save();
	}
	var url = WebVar.VarPath + "/tp/edit/finishtask/" + this.taskId;
	var nThis = this;
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		dataType : 'json',
		url : url,
		data : null,
		success : function(data) {
			if (data >= 0) { // 成功
				nThis.switchWorkModeBtn.setEnabled(true);
				nThis.GetTask.setEnabled(true);
				nThis.FinishTask.setEnabled(false);
				nThis.AbortTask.setEnabled(false);
				nThis.saveBnt.setEnabled(false);
				nThis.clearAll();
				nThis.cardObj=null;
				nThis.getEditTask();
			} else {
				DialogUtil.openSimpleDialogForOcx(AbisMessageResource["CompleteFailed"]);
			}
		},
		error : function(e) {
			DialogUtil.openSimpleDialogForOcx(e);
		}
	});
}

TPEdit.prototype.switchMode = function() {
	if (this.workmode == WebCode.WorkMode.normal) {
		this.workmode = WebCode.WorkMode.queue;
		this.GetTask.setEnabled(true);
		this.FinishTask.setEnabled(false);
		this.AbortTask.setEnabled(false);
		this.openBnt.setEnabled(false);
	} else if (this.workmode == WebCode.WorkMode.queue) {
		this.workmode = WebCode.WorkMode.normal;
		// this.prevCard.setEnabled(false);
		// this.nextCard.setEnabled(false);
		this.GetTask.setEnabled(false);
		this.FinishTask.setEnabled(false);
		this.AbortTask.setEnabled(false);
		this.openBnt.setEnabled(true);
	}
}

TPEdit.prototype.sendMatchTask = function() {
    var _this = this;
	if (this.cardObj == null) {
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource["CurrentNoOpenCard"]);
		return;
	}
	if(this.selBty!==ABISCode.Bty.BTY_FINGER&&this.selBty!==ABISCode.Bty.BTY_PALM){
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource["NotSupported"]+AbisMessageResource.Match.Bty);
		return;
	}
	var param = {};
	param.cards = new Array();
	var card = {};
	card.cardId = this.cardObj.tpCardInfo.id;
	card.cardNum = this.cardObj.tpCardInfo.cardNum;
	card.printType = ABISCode.PrintTypeCode.PRINT_TP;
	param.bty = this.selBty;
	param.cards.push(card);

	param.printType = ABISCode.PrintTypeCode.PRINT_TP;

    var functions = {
        getMnt: function () {
            return _this.imgOcx.HS_OCX_GetEditedCardData(_this.cardId, 1);
        }
    };
    if(this.sendMatchWindow) {
        this.sendMatchWindow.setData(param);
        this.sendMatchWindow.open();
    } else {
        this.sendMatchWindow = ABISWindowUtil.openSendMatch("SendMatchWindow",
            param,functions);
    }
}

TPEdit.prototype.save = function() {
	WebUtil.Wait();
	var cardStr = this.imgOcx.HS_OCX_GetEditedCardData(this.cardId, 1);
	var editData = {};
	if (this.txtChange == true) {
		var txtBzoInfo = this.tpTxtWidget.getTPCardObject();
		editData.cardObj = txtBzoInfo.card;
		editData.delAddrList = txtBzoInfo.delAddrList;
		editData.delCertList = txtBzoInfo.delCertList;
		editData.delCommList = txtBzoInfo.delCommList;
		editData.delPhoneList = txtBzoInfo.delPhoneList;
	} else {
		var txtBzoInfo = {};
		txtBzoInfo.card = {
			"mainInfo" : this.cardObj.mainInfo
		};
		editData.cardObj = txtBzoInfo.card;
	}
	editData.imgData = cardStr;
	if (!WebUtil.isNull(cardStr)) {
		editData.mntLobs = this.lobs;
	}
	var jData = $.toJSON(editData);
	var url = WebVar.VarPath + "/tp/edit/save";
	var nThis = this;
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		dataType : 'json',
		url : url,
		data : jData,
		success : function(data) {
			WebUtil.NoWait();
			if (data.status == "ok") {
				nThis.saveBnt.setEnabled(false);
				nThis.switchWorkModeBtn.setEnabled(true);
				// alert(data.msg);
			} else {
				DialogUtil.openSimpleDialogForOcx(data.msg);
			}

		},
		error : function(e) {
			DialogUtil.openSimpleDialogForOcx(e);
		}
	});
}

TPEdit.prototype.changeFgp = function(flag) {
	var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
	var fgpNode = $naviTree.getSelectedNodes()[0];
	if (fgpNode.bty == undefined || fgpNode.vid == undefined
			|| fgpNode.fgp == undefined)
		return;
	var index = -1;
	var treeList = this.naviData.treeList;
	for ( var i = 0; i < treeList.length; i++) {
		var node = treeList[i];
		if (node.bty == undefined || node.vid == undefined
				|| node.fgp == undefined)
			continue;
		if (node.bty == fgpNode.bty && node.vid == fgpNode.vid
				&& node.fgp == fgpNode.fgp) {
			index = i;
		}
	}
	if (index >= 0) {
		index += flag;
		while (index < treeList.length&&index>=0) {
			var node = treeList[index];
			if (node!=null&&node.bty != undefined && node.vid != undefined
					&& node.fgp != undefined) {
				//下一个上一个  队列模式 优化
				if (this.workmode == WebCode.WorkMode.queue) {
					var arrindex = $.inArray(node.id,this.needCheckList)
					if(arrindex===-1){
						index += flag;
						continue;
					}
				}
				//队列处理结束
				var idValue = node.bty + "-" + node.vid + "-" + node.fgp + "-"
						+ node.cid;
				var $n = $naviTree.getNodeByParam("id", idValue, null);
				$naviTree.selectNode($n, false);
				this.switchFGP(node.bty, node.vid, node.fgp, node.cid);
				break;
			} else {
				index += flag;
			}
		}
	}
}

TPEdit.prototype.showCardWindow = function() {
	if (this.cardWindow == null) {
		this.cardWindow = ABISWindowUtil.openTPCard("tpcard", null, null,
				selectedCard, false, TPCardInfoCol.ID, WebTable.DES);
	} else {
		this.cardWindow.setData({
			dbid : this.dbid
		});
		this.cardWindow.open();
	}

	var nThis = this;
	function selectedCard(rows) {
		if (!WebUtil.isEmpty(rows)) {
			var result = rows[0];
			nThis.openCard(result.ID);
		}
	}
}

TPEdit.prototype.openCard = function(cardId) {
	var nThis = this;
	this.cardId = cardId;
	if (this.cardObj != null) {
		var id = this.cardObj.mainInfo.id;
		if (id == this.cardId) {
			return;
		}
	}
	var url = WebVar.VarPath + "/tp/edit/" + this.cardId;
	WebUtil.Wait();
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : null,
		dataType : 'json',
		//timeout : WebVar.TimeOut,
		success : function(data) {
            WebUtil.NoWait();
			if(data.status===WebCode.WebResultStatus.ok){
                data = data.data ;
                if (data != null) {
                    var struct = data.struct;
                    nThis.cardObj = data.cardObj;
                    if (struct != null) {
                        nThis.naviData = struct;
                        var downList = struct.downList;
                        var imgIdList = struct.imgIdList;
                        var treeList = struct.treeList;
                        if (treeList != null) {
                            treeList.push({
                                id : "text",
                                pId : "root",
                                name : nThis.language.TextInfo,
                                open : false,
                                click : true
                            });
                        }
                        $.fn.zTree.init($("#NaviTree"), nThis.setting, treeList);
                        nThis.initShow(downList);
                    }
                    if (nThis.cardObj != null) {
                        nThis.tpTxtWidget.setTPCardObject(nThis.cardObj);
                        nThis.txtFinish = nThis.tpTxtWidget.validateRequired();
                        nThis.mntChange = false;
                        nThis.txtChange == false;
                        nThis.updateSaveStatus();
                    }
				}
			}else{
                DialogUtil.openSimpleDialogForOcx(data.msg);
            }
		},
		error : function(e, status, error) {
			if (status == "timeout") {
				DialogUtil.openSimpleDialogForOcx(_this.language.SvrNoResponse);
			}
		}
	});

}

TPEdit.prototype.initShow = function(sixEList) {
	var bty;
	var vid;
	var fgp;
	var cid;
	if(!WebUtil.isNull(this.selBfvc.bty))
	{
		bty = this.selBfvc.bty;
		vid = this.selBfvc.vid;
		fgp = this.selBfvc.fgp;
		cid = this.selBfvc.cid;
		var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
		var idValue = bty + "-" + vid + "-" + fgp + "-" + cid;
		var $node = $naviTree.getNodeByParam("id", idValue, null);
		$naviTree.selectNode($node, false);
		this.switchFGP(bty, vid, fgp, cid);
	}
	else if (!WebUtil.isEmpty(sixEList)) 
	{
		var sixEObj = sixEList[0];
		var vidObj = sixEObj.vidList[0];
		var fgpObj = vidObj.fgpList[0];
		for(var fgpIndex=0;fgpIndex<vidObj.fgpList.length;fgpIndex++){
			fgp = vidObj.fgpList[fgpIndex]
			if(fgp.cardId!==0){
                fgpObj =fgp;
                break;
			}
		}
		var cidObj = fgpObj.cids[0];
		bty = sixEObj.bty;
		vid = vidObj.vid;
		fgp = fgpObj.fgp;
		cid = cidObj.cid;
		var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
		var idValue = bty + "-" + vid + "-" + fgp + "-" + cid;
		var $node = $naviTree.getNodeByParam("id", idValue, null);
		$naviTree.selectNode($node, false);
		this.switchFGP(bty, vid, fgp, cid);
	}
	this.setPreNextButton();
}

TPEdit.prototype.showDBWindow = function() {
	if (this.dbWindow == null) {
		this.dbWindow = ABISWindowUtil.openDB("DbWindow",
				ABISCode.DBTypeCode.TENRPINT_DB, ABISCode.DBPurposeCode.NORMAL,
				chooseDb);
	} else {
		this.dbWindow.open();
	}

	var nThis = this;
	function chooseDb(rows) {
		if (WebUtil.isEmpty(rows))
			return;

		nThis.dbid = rows[0].DBID_MASK;
	}
}

TPEdit.prototype.layout = function() {
	var height = WebUtil.getContentHeight();
	height -= 3;
	// 计算导航高度
	var navi = $("#NavigateCard");
	var property = $("#FgpProperty");

	var mntTool = $("#MntTool");
	var imgProcess = $("#ImageProcess");

	var lh = navi.height() + property.height() + 4;
	var rh = mntTool.height() + imgProcess.height() + 4;
	var mh = lh > rh ? lh : rh;
	if (mh < height) {
		var perprotyTop = $("#FgpProperty").offset().top;
		var propertyH = height - (perprotyTop - LayoutParam.headerH);
		property.height(propertyH);
		
		this.proObj.setHeight(propertyH - 27);

		var rHalfHeight = (height - rh) / 2;
		mntTool.height(mntTool.height() + rHalfHeight);
		var mntToolH = mntTool.height() - 27;

		$(".EditToolLayer").height(mntToolH);

		MntTool.setHeight(mntToolH);

		imgProcess.height(imgProcess.height() + rHalfHeight);
		updateSliderLocation();
	}

	// 计算控件高度,和两边高度对齐,已知两边高度一定大于640
	var ocxHeight = height - 36;
	if (ocxHeight < mh - 36) {
		ocxHeight = mh - 36;
	}
	var editOcx = $("#OcxPart");
	editOcx.height(ocxHeight);
	$("#TxtPart").height(ocxHeight);
}

TPEdit.prototype.initNaviTree = function() {
	this.initTreeSetting();
	if (this.naviData != null) {
		var treeList = this.naviData.treeList;
		if (treeList != null) {
			treeList.push({
				id : "text",
				pId : "root",
				name : this.language.TextInfo,
				open : false,
				click : true
			});
		}
		$.fn.zTree.init($("#NaviTree"), this.setting, treeList);
		this.initShow(this.naviData.jsFiveList);
	}
}

TPEdit.prototype.initTreeSetting = function() {
	this.setting = {
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			beforeClick : beforeClick,
			onClick : onClick
		}
	};

	var nThis = this;
	// 卡片导航点击节点前判断是否可以点击
	function beforeClick(treeId, treeNode, clickFlag) {
		if (treeNode.click == undefined)
			return true;
		return eval(treeNode.click);
	}

	// 卡片导航点击节点事件
	function onClick(event, treeId, treeNode, clickFlag) {
		switch (treeNode.id) {
		case "text":
			// 显示文本信息
			$("#OcxPart").hide();
			$("#TxtPart").show();
			nThis.prevFgp.setEnabled(false);
			nThis.nextFgp.setEnabled(false);
			break;
		default:
			$("#OcxPart").show();
			$("#TxtPart").hide();
			nThis.switchFGP(treeNode.bty, treeNode.vid, treeNode.fgp,
					treeNode.cid);
			break;
		}
	}
}

TPEdit.prototype.switchFGP = function(bty, vid, fgp,cid,gid) {
	if (this.workmode == WebCode.WorkMode.queue) {
		//已经检查过指位
		var arrindex = $.inArray(bty+'-'+vid+'-'+fgp+'-'+cid,this.needCheckList);
		if(arrindex>-1){
			this.hasCheckList.push(bty+'-'+vid+'-'+fgp+'-'+cid);
		}
	}
	this.mntGid = gid||this.imgTool.gid||0;
	var imgExists = false;
	var mntExists = false;
	this.selBty = bty;
	this.selVid = vid;
	this.selFgp = fgp;
	this.selCid = cid;
	if (this.imgOcx.HS_OCX_LobIsExist(this.cardId, 1, bty, fgp, vid,
			ABISCode.LobDataType.IMG, ABISCode.ImageShowType.PriCpr, cid)) {
		imgExists = true;
	}
	if (this.imgOcx.HS_OCX_LobIsExist(this.cardId, 1, bty, fgp, vid,
			ABISCode.LobDataType.MNT, this.mntGid, cid)) {
		mntExists = true;
	}
	if (!imgExists && !mntExists) {
		this.searchData(bty, vid, fgp, cid, this.mntGid,
				ABISCode.FGPDataType.ALL);
	} else if (!imgExists) {
		this.searchData(bty, vid, fgp, cid, this.mntGid,
				ABISCode.FGPDataType.IMG);
	} else if (!mntExists) {
		this.searchData(bty, vid, fgp, cid, this.mntGid,
				ABISCode.FGPDataType.MNT);
	} else {
		this.imgOcx.HS_OCX_SelectImageMnt(this.cardId, 1, bty, fgp, vid,
				ABISCode.ImageShowType.PriCpr, this.mntGid, cid);
		this.setPrototypeText();
	}
	this.switchTool(ABISCode.TableTypeCode.TPCARD, bty);
	this.setPreNextButton();
}
/**
 * 根据生物特征类型和卡片类型切换编辑工具
 * @param {Object} type 1:捺印,2：现场 ABISCode.TableTypeCode
 * @param {Object} bty  ABISCode.BTY
 */
TPEdit.prototype.switchTool = function(type,bty){
	var _this = this;
	//imgTool 的相关切换
	var imgData = {}
	var groupData = this.group&&this.group[bty];
	var methodData = this.method&&this.method[bty];
	imgData[ToolId.ChooseMnt]= groupData;
	imgData[ToolId.ChooseMethod]=methodData;
	this.imgTool.setDownListData(imgData);
	//特征编辑工具切换
	MntTool.switchTool(type, bty);
	//注入一个获取特征 参数的方法
	if(!MntTool.getCardOptions){
		MntTool.setGetMsgFucntion(function(){
			return _this.getCardOptions(_this);
		})
	}
}
TPEdit.prototype.searchData = function(bty, vid, fgp, cid, mntGid, dataType) {
	var _this =this;
	var obj = {};
	obj.bty = bty;
	obj.vid = vid;
	obj.fgp = fgp;
	obj.cid = cid;
	obj.imgType = ABISCode.ImageShowType.PriCpr;
	obj.gid = mntGid;
	obj.cardId = this.cardId;
	obj.dataType = dataType;

	var json = $.toJSON(obj);
	var url = WebVar.VarPath + "/tp/data/";
	var nThis = this;
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : json,
		dataType : 'json',
		timeout : WebVar.TimeOut,
		success : function(data) {
			if (data != null) {
				var ocx = document.getElementById("MntEditOcx");
				var img = null;
				var mnt = null;
				if (data.img != null) {
					var imgLob = data.img.lob;
					var imgItem = null;
					if (!WebUtil.isEmpty(data.img.item)) {
						imgItem = data.img.item;
						ocx.HS_OCX_AppendTPStrLob(nThis.cardId, imgLob.id,
								imgItem.itemIndex, bty, fgp, vid,
								ABISCode.LobDataType.IMG, imgLob.gid, cid,
								imgItem.data);
					}
				}
				if (data.mnt != null) {
					var mntLob = data.mnt.lob;
					var mntItem = null;
					if (!WebUtil.isEmpty(data.mnt.item)) {
						mntItem = data.mnt.item;
						nThis.lobs.push(data.mnt);
						ocx.HS_OCX_AppendTPStrLob(nThis.cardId, mntLob.id,
								mntItem.itemIndex, bty, fgp, vid,
								ABISCode.LobDataType.MNT, mntLob.gid, cid,
								mntItem.data);
					}

				}
				ocx.HS_OCX_SelectImageMnt(nThis.cardId, 1, bty, fgp, vid,
						obj.imgType, obj.gid, cid);
				_this.setPrototypeText();
			}
		},
		error : function(e, status, error) {
			if (status == "timeout") {
				DialogUtil.openSimpleDialogForOcx(language.SvrNoResponse);
			}
		}
	});
}
//校验  前后按钮  是否变灰
TPEdit.prototype.setPreNextButton = function() {
	this.prevFgp.setEnabled(false);
	this.nextFgp.setEnabled(false);
	var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
	if ($naviTree == undefined){
		return;
	}
	var fgpNode = $naviTree.getSelectedNodes()[0];
	if (fgpNode==undefined ||fgpNode.bty == undefined || fgpNode.vid == undefined
			|| fgpNode.fgp == undefined){
		return;
	}
	var index = -1;
	var treeList = this.naviData.treeList;
	for ( var i = 0; i < treeList.length; i++) {
		var node = treeList[i];
		if (node.bty == undefined || node.vid == undefined
				|| node.fgp == undefined)
			continue;
		if (node.bty == fgpNode.bty && node.vid == fgpNode.vid
				&& node.fgp == fgpNode.fgp) {
			index = i;
		}
	}
	if (index >= 0) {
		var pre = index-1;
		var next = index+1;
		while (next < treeList.length) {
			var node = treeList[next];
			if (node.bty != undefined && node.vid != undefined
					&& node.fgp != undefined) {
				//下一个 可用
				this.nextFgp.setEnabled(true);
				break;
			}
			next = next +1;
		}
		while (pre >0) {
			var node = treeList[pre];
			if (node.bty != undefined && node.vid != undefined
					&& node.fgp != undefined) {
				//上一个 可用
				this.prevFgp.setEnabled(true);
				break;
			}
			pre = pre-1;
		}
	}
}
/**
 * 展示特征属性
 */
TPEdit.prototype.setPrototypeText = function() {
	//HS_OCX_GetLobMexInfo(LONGLONG cardSID, LONG bTpCard, LONG nBty, LONG nFgp, LONG nVid, LONG nGid, LONG nCid);
	var str = this.imgOcx.HS_OCX_GetLobMexInfo(this.cardId,1,this.selBty,this.selFgp ,this.selVid ,this.imgTool.gid||-1,this.selCid);
	if(this.proObj){
		this.proObj.init(str);
	}
}
/**
 * 获取 当前卡片图像的 指位 算法 特征等参数
 * {bty,fgp,vid,gid,cid,mid,}
 * 图像类型 暂未实现
 */
TPEdit.prototype.getCardOptions= function(_this) {
	_this = _this||this;
	var obj = {};
	obj.bty = _this.selBty;
	obj.fgp = _this.selFgp;
	obj.vid = _this.selVid;
	// obj.gid =_this.imgTool.gid;
    obj.gid =_this.imgTool.getGid();
	obj.cid =_this.selCid;
	obj.mid =_this.imgTool.mid;
	return obj;
}