/**
 * 现场卡片质量检查
 * 
 * 功能：
 * 获取工作流队列的卡片任务，检查一个卡片图像的质量，判断是否合格，并完成任务。
 * 1初始化ocx插件  图像工具 各个卡片文本显示区域
 * 2获取任务  进行内容填充
 * 3完成任务
 * 4放弃任务
 *
 */
/**
 @param p
     {
         cs		: "卡片结构",
         fvs		: "切割部位",
         btyspec : "生物特征切割规格",
         cprmex 	: "压缩提取特征配置"
     }
 */
function LPCardQual(cardId, language, p) {
    this.cs = p.cs;
    this.fvs = p.fvs;
    this.btyspec = p.btyspec;
    this.cprmex = p.cprmex;
    this.gid = p.gid || 0;
    this.language = language;
    this.workmode = WebCode.WorkMode.normal;
    this.group = p.group;
    this.method = p.method;
    this.init();
    this.cardId = cardId;
    if (this.cardId != null) {
        this.openCard(this.cardId);
    }
}

LPCardQual.prototype.init = function () {
    this.proObj = $("#FgpInfoFrame").property();
    this.initPage();
    this.initParam();
    this.initUI();
};

LPCardQual.prototype.initPage = function () {
    var _this = this;
    /** 获取扫描选项卡的底部位置 */
    var toolTop = $(".WebTool").offset().top;
    var toolH = $(".WebTool").outerHeight(true);
    var tool = toolTop + toolH;

    var imgTop = $(".imgContent").offset().top;
    var height = WebUtil.getClientHeight() - LayoutParam.footerH - 3;
    var ocxH = height - imgTop;
    if (ocxH < 512) {
        ocxH = 512;
    }
    $(".imgContent").css("height", ocxH);

	/* 其他系统信息视图 */
    var otherSysTop = $(".OtherSysLayer").offset().top;
    var otherSysH = height - otherSysTop;
    $(".OtherSysLayer").css("height", otherSysH);
    var imgProTop = $(".ImgProView").offset().top;
    var imgProH = height - imgProTop;
    $(".ImgProView").css("height", imgProH);
    $(".ImgProLayer").css("height", "100%");

    //隐藏修改结束
    var txtH = height - tool;
    $("#CardTxtLayer").height(txtH);
    //    var url = WebVar.VarPath + "/lp/lpcardqual/aborttask/" + this.taskId;

    //监听快捷键
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode === 90 && e.ctrlKey) {
            //alert("你按下了ctrl+Z");
            _this.ocx.HS_OCX_Undo(0);
        }
        if (e.keyCode === 89 && e.ctrlKey) {
            //alert("你按下了ctrl+Y");
            _this.ocx.HS_OCX_Redo(0);
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
            var url = WebVar.VarPath + "/lp/lpcardqual/aborttask/" + _this.taskId;
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

};

LPCardQual.prototype.initParam = function () {
    this.dbid = null;
    this.cardId = null;
    this.dbDialog = null;
    this.cardDialog = null;
    this.imgTool = null;
    this.lpCase = null;
    this.treeData = null;
    this.txtChange = false;
    this.lpCard = null;
    this.cache = [];
    this.curBty = null;
    this.curCid = null;
    this.curGid = null;
};
/*
 * 初始化页面控件
 * 包括但不限于  
 * 按钮；ocx； ztree；文本编辑页面 各个控件 
 */
LPCardQual.prototype.initUI = function () {
    this.openBnt = new ToolButton("Open", "OpenImg", callBack, "OpenDisableImg");
    this.openBnt.setText(AbisMessageResource.ToolTipText["Open"]);
    this.saveBnt = new ToolButton("Save", "SaveImg", callBack, "SaveDisableImg");
    this.saveBnt.setText(AbisMessageResource.ToolTipText["Save"]);
    this.selectDBBnt = new ToolButton("SelectDb", "SelectDBImg", callBack);
    this.selectDBBnt.setText(AbisMessageResource.ToolTipText["SelectDB"]);
    this.switchWorkModeBtn = new ToolButton("WorkModeBtn", "WorkModeImg", callBack, "WorkModeDisableImg");
    this.switchWorkModeBtn.setText(AbisMessageResource.ToolTipText["SwitchWorkMode"]);
    this.GetTask = new ToolButton("GetTask", "GetTaskImg", callBack, "GetTaskDisableImg");
    this.GetTask.setText(AbisMessageResource.ToolTipText["GetTask"]);
    this.FinishTask = new ToolButton("FinishTask", "FinishTaskImg", callBack, "FinishTaskDisableImg");
    this.FinishTask.setText(AbisMessageResource.ToolTipText["FinishTask"]);
    this.AbortTask = new ToolButton("AbortTask", "AbortTaskImg", callBack, "AbortTaskDisableImg");
    this.AbortTask.setText(AbisMessageResource.ToolTipText["AbortTask"]);
    this.SaveMore = new ToolButton("SaveMore", "SaveMore", callBack, "SaveMoreDisableImg");
    this.SaveMore.setText(AbisMessageResource.ToolTipText["SaveMore"]);
    this.saveBnt.setEnabled(false);
    this.GetTask.setEnabled(false);
    this.FinishTask.setEnabled(false);
    this.AbortTask.setEnabled(false);
    var nThis = this;
    this.showTxtBnt = WebUI.createTxtBnt("ShowTxt", WebUI.TxtBntType.TOGGLE,
        showTxt);
    function showTxt(visible) {
        if (visible === true) {
            $("#CardLayer").hide();
            $("#CardTxtLayer").show();
        } else {
            $("#CardTxtLayer").hide();
            $("#CardLayer").show();
        }
    }

    this.sendMatch = WebUI.createWebButton("SendMatchBnt",
        WebUI.BntType.B_80_24, "SendMatchBnt", callBack);

    this.saveBnt.setEnabled(false);
    function callBack(id) {
        switch (id) {
            case "Open":
                nThis.showCaseDialog();
                break;
            case "Save":
                nThis.save();
                break;
            case "SelectDb":
                nThis.showDBDialog();
                break;
            case "WorkModeBtn":
                nThis.switchMode();
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
            case "SendMatchBnt":
                nThis.sendMatchTask();
                break;
        }
    }

    var toolIdList = [];
    toolIdList.push(ToolId.Move);
    toolIdList.push(ToolId.ZoomIn);
    toolIdList.push(ToolId.ZoomOut);
    toolIdList.push(ToolId.RotateLeft);
    toolIdList.push(ToolId.RotateRight);
    toolIdList.push(ToolId.Precent50);
    toolIdList.push(ToolId.Precent100);
    toolIdList.push(ToolId.Precent150);
    toolIdList.push(ToolId.Precent200);
    toolIdList.push(ToolId.ViewPort);
    toolIdList.push(ToolId.FitWidth);
    toolIdList.push(ToolId.FitHeight);
    toolIdList.push(ToolId.Rotate0);
    toolIdList.push(ToolId.Rotate90);
    toolIdList.push(ToolId.Rotate180);
    toolIdList.push(ToolId.Rotate270);
    toolIdList.push(ToolId.AdjustScale);
    toolIdList.push(ToolId.ChooseMnt);
    toolIdList.push(ToolId.ChooseMethod);
    toolIdList.push(ToolId.SaveMore);
    toolIdList.push(ToolId.ShowCentre);
    toolIdList.push(ToolId.ShowTriangle);
    toolIdList.push(ToolId.ShowMnt);
    this.imgTool = new ImageTool("ImgOper", "MntEditOcx", toolIdList,
        OCX.OcxType.EDIT, imgToolInvoke);
    //imgTool 高级保存下拉选 初始化
    this.SaveType = {};
    this.SaveType.SaveOther = 0;
    this.SaveType.UpdateImage = 1;
    var imgData = {};
    var saveChosen = [];
    saveChosen.push({value: this.SaveType.SaveOther, text: AbisMessageResource.SaveAsNewCard});
    saveChosen.push({value: this.SaveType.UpdateImage, text: AbisMessageResource.Update});
    imgData[ToolId.SaveMore] = saveChosen;
    setTimeout(function () {
        nThis.imgTool.setDownListData(imgData);
    }, 3000);
    this.setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick,
            onClick: onClick
        }
    };

    function beforeClick(treeId, treeNode, clickFlag) {
        if (treeNode.click == undefined)
            return true;
        return treeNode.click;
    }

    function onClick(event, treeId, treeNode, clickFlag) {
        if (treeNode.id == "text") {
            $("#CardLayer").hide();
            $("#CardTxtLayer").show();
            nThis.showTxtBnt.setChecked(true);
        } else {
            var cardId = treeNode.cardId;
            if (WebUtil.isNull(cardId))
                return;
            nThis.switchBfvc(treeNode.bty, treeNode.cid);
            $("#CardTxtLayer").hide();
            $("#CardLayer").show();
            nThis.showTxtBnt.setChecked(false);
        }
    }

    $.fn.zTree.init($("#NaviTree"), this.setting, null);

    this.initOcx();
    this.initTxt();

    $(window).resize(function () {
        nThis.initPage();
    });
    function imgToolInvoke(id, result) {
        switch (id) {
            case ToolId.ChooseMnt:
                nThis.setGid(result.value, true);
                break;
            case ToolId.SaveMore:
                nThis.save(null, result.value);
                break;
        }
        nThis.updateSaveStatus();
    }
};

LPCardQual.prototype.initTxt = function () {
    this.cardWidget = new LPCardEditPage(null, null, 1);
    this.cardWidget.registerChangeListener(cardTxtChange);
    var nThis = this;

    function cardTxtChange() {
        nThis.txtChange = nThis.cardWidget.isTxtInfoChanged();
        nThis.updateSaveStatus();
    }
};

LPCardQual.prototype.initOcx = function () {
    this.ocx = document.getElementById("MntEditOcx");
    try {
        this.ocx.HS_OCX_OnTest(0);
        this.ocx.attachEvent('HS_OCX_NotifyModifyEvent', mntChange);
        if (!WebUtil.isNull(this.cprmex)) {
            this.ocx.HS_OCX_SetMexCprParam(this.cprmex, 0);
        }
        else {
            alert(AbisMessageResource.Alert["NoCprParamConfig"]);
        }
        var n = this.ocx.HS_OCX_SetImgSpec(this.btyspec, 0);
        if (n < 0) {
            alert(AbisMessageResource['NoCutParam']);
        }

    } catch (e) {
        alert(e);
        this.ocx = null;
    }

    var nThis = this;

    function mntChange() {
        for (var i = 0; i < nThis.cache.length; i++) {
            var c = nThis.cache[i];
            if (c.bty == nThis.curBty && c.cid == nThis.curCid
                && c.gid == nThis.curGid) {
                c.mntChange = true;
                break;
            }
        }
        nThis.updateSaveStatus();
        nThis.setPrototypeText();
    }
};

LPCardQual.prototype.updateSaveStatus = function () {
    var b = false;
    for (var i = 0; i < this.cache.length; i++) {
        var c = this.cache[i];
        if (c.mntChange) {
            b = true;
            break;
        }
    }
    var candSave = b || this.txtChange;// ||(this.ocx.HS_OCX_GetRotateAngle()!==0);
    this.saveBnt.setEnabled(candSave);
    this.switchWorkModeBtn.setEnabled(!candSave);
};


LPCardQual.prototype.getEditTask = function () {
    var url = WebVar.VarPath + "/lp/lpcardqual/gettask";
    var nThis = this;
    jQuery.ajax({
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        data: null,
        success: function (data) {
            if (!WebUtil.isEmpty(data) && !WebUtil.isEmpty(data.lpCardData)) {
                WebUtil.NoWait();
                nThis.reSetStatus();
                var struct = data.lpCardData.struct;
                nThis.lpCard = data.lpCardData.lpCard;
                nThis.cardWidget.setLPCardObject(nThis.lpCard);
                if (struct != null) {
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
                    $.fn.zTree.init($("#NaviTree"), nThis.setting, treeList);

                    var id = null;
                    for (var i = 0; i < treeList.length; i++) {
                        if (treeList[i].cardId != undefined) {
                            id = treeList[i].id;
                            break;
                        }
                    }
                    if (id != null) {
                        var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
                        var $node = $naviTree.getNodeByParam("id", id, null);
                        $naviTree.selectNode($node, false);
                        nThis.switchBfvc($node.bty, $node.cid);
                    }
                    nThis.taskId = data.taskId;
                    nThis.GetTask.setEnabled(false);
                    nThis.FinishTask.setEnabled(true);
                    nThis.AbortTask.setEnabled(true);
                    nThis.saveBnt.setEnabled(false);
                }

            } else {
                alert(AbisMessageResource['EditQueueNoTask']);
            }
        },
        error: function (e) {
            alert(e);
        }
    });
};

LPCardQual.prototype.clearAll = function () {
    $.fn.zTree.init($("#NaviTree"), this.setting, null);
    MntTool.hiddenAll();
    var imgOcx = document.getElementById("MntEditOcx");
    imgOcx.HS_OCX_ResetAllData(0);

};

LPCardQual.prototype.sendMatchTask = function () {
    var _this = this;
    if (this.lpCard == null) {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource["CurrentNoOpenCard"]);
        return;
    }
    if (this.selBty !== ABISCode.Bty.BTY_FINGER && this.selBty !== ABISCode.Bty.BTY_PALM) {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource["NotSupported"] + AbisMessageResource.Match.Bty);
        return;
    }
    var param = {};
    param.cards = new Array();
    var card = {};
    card.cardId = this.lpCard.lpCardInfo.id;
    card.cardNum = this.lpCard.lpCardInfo.cardNum;
    card.printType = ABISCode.PrintTypeCode.PRINT_TP;
    param.bty = this.lpCard.lpCardInfo.bty;
    param.cards.push(card);

    param.printType = ABISCode.PrintTypeCode.PRINT_LP;
    var functions = {
        getMnt: function () {
            return _this.ocx.HS_OCX_GetEditedCardData(_this.cardId, 0);
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
LPCardQual.prototype.abortTask = function () {
    var url = WebVar.VarPath + "/lp/lpcardqual/aborttask/" + this.taskId;
    var nThis = this;
    jQuery.ajax({
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        url: url,
        data: null,
        success: function (data) {
            if (data == 1) {
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
        error: function (e) {
            alert(e);
        }
    });
};

LPCardQual.prototype.finishTask = function () {
    var _this = this;
    // 如果编辑过先保存
    this.save(finishTask);
    function finishTask() {
        var url = WebVar.VarPath + "/lp/lpcardqual/finishtask/" + _this.taskId;
        jQuery.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: url,
            data: null,
            success: function (data) {
                if (data >= 0) { // 成功
                    _this.switchWorkModeBtn.setEnabled(true);
                    _this.GetTask.setEnabled(true);
                    _this.FinishTask.setEnabled(false);
                    _this.AbortTask.setEnabled(false);
                    _this.saveBnt.setEnabled(false);
                    _this.clearAll();
                    _this.getEditTask();
                } else {
                    alert(AbisMessageResource['CompleteFailed']);
                }
            },
            error: function (e) {
                alert(e);
            }
        });
    }
};

LPCardQual.prototype.switchMode = function () {
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
};
LPCardQual.prototype.save = function (callBack, SaveType) {
    SaveType = parseInt(SaveType);
    var _this = this;
    var cardId = this.lpCard.lpCardInfo.id;
    //HS_OCX_GetAllLPEditedCardData
    var imgLobStr = null;
    var reloadImg = false;
    if (this.SaveType.SaveOther === SaveType) {
        WebUtil.Wait();
        imgLobStr = _this.ocx.HS_OCX_GetAllLPEditedCardData(cardId, 0);
        save(imgLobStr, true)
    } else if (this.SaveType.UpdateImage === SaveType) {
        WebUtil.Wait();
        reloadImg = true;
        imgLobStr = _this.ocx.HS_OCX_GetAllLPEditedCardData(cardId, 1);
        save(imgLobStr)
    } else {
        WebUtil.Wait();
        imgLobStr = _this.ocx.HS_OCX_GetEditedCardData(cardId, 0);
        save(imgLobStr)
    }
    function save(imgLobStr, newCard) {
        var editData = {};
        if (newCard === true) {
            editData.option = 1;
        } else {
            editData.option = 0;
        }
        editData.imgLobStr = imgLobStr;
        if (_this.txtChange) {
            var txtObj = _this.cardWidget.getLPCardObject();
            if (!WebUtil.isEmpty(txtObj.lpCardInfo)) {
                editData.lpCardInfo = txtObj.lpCardInfo;
            } else {
                editData.lpCardInfo = _this.lpCard.lpCardInfo;
            }
            if (!WebUtil.isEmpty(txtObj.lpCardText)) {
                editData.lpCardText = txtObj.lpCardText;
            }
            if (!WebUtil.isEmpty(txtObj.enrollInfo)) {
                editData.enrollInfo = txtObj.enrollInfo;
            }
        } else {
            editData.lpCardInfo = _this.lpCard.lpCardInfo;
            if (!imgLobStr) {
                if (WebUtil.isFunction(callBack)) {
                    callBack();
                }
                WebUtil.NoWait();
                DialogUtil.openSimpleDialogForOcx(AbisMessageResource['SaveFail']);
                return;
            }
        }
        editData.lobObjs = [];
        for (var i = 0; i < _this.cache.length; i++) {
            var obj = _this.cache[i];
            if (obj.mntChange) {
                for (var j = 0; j < _this.lpCard.lobs.length; j++) {
                    var lobObj = _this.lpCard.lobs[j];
                    var lob = lobObj.lob;
                    if (lob.bty == obj.bty && lob.cid == obj.cid
                        && lob.gid == obj.gid
                        && lob.dataType == ABISCode.LobDataType.MNT) {
                        editData.lobObjs.push(lobObj);
                    }
                }
            }
        }
        var jData = $.toJSON(editData);
        var url = WebVar.VarPath + "/lp/lpcardqual/save";
        jQuery.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: url,
            data: jData,
            success: function (data) {
                WebUtil.NoWait();
                if (data.status == "ok") {
                    _this.saveBnt.setEnabled(false);
                    _this.switchWorkModeBtn.setEnabled(true);
                    if (WebUtil.isFunction(callBack)) {
                        callBack();
                    } else {
                        if (reloadImg) {
                            _this.openCard(cardId);
                        }
                    }
                    DialogUtil.openSimpleDialogForOcx(AbisMessageResource.SaveSuccess);
                } else {
                    alert(data.msg);
                }
            },
            error: function (e, textStatus) {
                // alert(textStatus);
                alert(AbisMessageResource['SaveFail'] + ", " + AbisMessageResource['Cause'] + ":" + textStatus);
            }
        });

    }
};

LPCardQual.prototype.showCaseDialog = function () {
    var _this = this;
    if (this.saveBnt.enabled === true) {
        //如果需要保存
        var msg = AbisMessageResource.Alert.NeedToSave + '?';
        var button = [
            {
                value: AbisMessageResource['Yes'],
                callback: function () {
                    _this.save(showCaseDialog);
                },
                focus: true
            },
            {
                value: AbisMessageResource['No'],
                callback: function () {
                    showCaseDialog();
                }
            },
            {
                value: AbisMessageResource['Cancel'],
                callback: function () {

                }
            }
        ];
        DialogUtil.openComfirmDialogPlusForOcx(msg, button)
    } else {
        showCaseDialog();
    }
    function showCaseDialog() {
        if (_this.window == null) {
            _this.window = ABISWindowUtil.openLPCard("LPCardWindow", _this.dbid,
                null, invoke, false, "ID", WebTable.DES);
        } else {
            _this.window.setData({
                dbid: _this.dbid
            });
            _this.window.open();
        }
    }

    function invoke(rows) {
        if (!WebUtil.isEmpty(rows)) {
            var result = rows[0];
            var cardId = result.ID;
            _this.openCard(cardId);
        }
    }
};

LPCardQual.prototype.openCard = function (cardId) {
    this.cardId = cardId;
    var nThis = this;
    WebUtil.Wait();
    var url = WebVar.VarPath + "/lp/lpcardqual/" + this.cardId;
    jQuery.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: url,
        data: null,
        dataType: 'json',
        timeout: WebVar.TimeOut,
        success: function (data) {
            WebUtil.NoWait();
            if (data != null) {
                nThis.reSetStatus();
                var struct = data.struct;
                nThis.lpCard = data.lpCard;
                nThis.cardWidget.setLPCardObject(nThis.lpCard);
                if (struct != null) {
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
                    $.fn.zTree.init($("#NaviTree"), nThis.setting, treeList);

                    var id = null;
                    for (var i = 0; i < treeList.length; i++) {
                        if (treeList[i].cardId != undefined) {
                            id = treeList[i].id;
                            break;
                        }
                    }
                    if (id != null) {
                        var $naviTree = $.fn.zTree.getZTreeObj("NaviTree");
                        var $node = $naviTree.getNodeByParam("id", id, null);
                        $naviTree.selectNode($node, false);
                        nThis.switchBfvc($node.bty, $node.cid, nThis.gid);
                    }
                }
            }
        },
        error: function (e, status, error) {
            if (status == "timeout") {
                alert(nThis.language.SvrNoResponse);
            }
        }
    });

};
//打开新图片重置界面状态
LPCardQual.prototype.reSetStatus = function () {
    //清空缓存  特征组
    this.cache = [];
    //控件数据清空
    this.ocx.HS_OCX_ResetAllData(0);
    //重置保存按钮状态  hjx  2017年3月21日
    this.saveBnt.setEnabled(false);
    //重置旋转角度
    try {
        this.imgTool.selectTool(ToolId.Rotate0);
    } catch (e) {
        $("#Rotate0").trigger("mousedown")
    }

};
LPCardQual.prototype.searchData = function (cardId, bty, cid, imgType, gid, type,
                                        searchTxt) {
    if (cardId == null)
        return;
    var obj = {};
    obj.cardId = cardId;
    obj.bty = bty;
    obj.cid = cid;
    obj.imgType = imgType;
    obj.gid = gid;
    obj.dataType = type;
    obj.qryTxt = searchTxt;

    var jStr = $.toJSON(obj);
    var url = WebVar.VarPath + "/lp/data/";
    var nThis = this;
    jQuery.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: url,
        data: jStr,
        dataType: 'json',
        success: function (resInfo) {
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data=resInfo.data
                if (data != null) {
                    var imgLob = data.img;
                    var mntLob = data.mnt;
                    if (nThis.ocx != null) {
                        if (imgLob != null && !WebUtil.isEmpty(imgLob.item)) {
                            var lob = imgLob.lob;
                            var item = imgLob.item;
                            nThis.ocx.HS_OCX_AppendLPStrLob(nThis.cardId,
                                nThis.cardId, lob.id, item.itemIndex, bty,
                                ABISCode.LobDataType.IMG, lob.gid, cid,
                                item.data);
                        }
                        if (mntLob != null && !WebUtil.isEmpty(mntLob.item)) {
                            var lob = mntLob.lob;
                            var item = mntLob.item;
                            nThis.ocx.HS_OCX_AppendLPStrLob(nThis.cardId,
                                nThis.cardId, lob.id, item.itemIndex, bty,
                                ABISCode.LobDataType.MNT, lob.gid, cid,
                                item.data);
                        }
                        nThis.ocx.HS_OCX_SelectImageMnt(nThis.cardId, 0, bty, 0, 0,
                            obj.imgType, obj.gid, cid);
                    }
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }

        },
        error: function (e, status, error) {

        }
    });
};
/*设置特征组*/
//gid bool:是否需要控件立即切换 gid
LPCardQual.prototype.setGid = function (gid, bool) {
    if (gid != undefined) {
        this.imgTool.gid = gid;
        bool && this.switchBfvc(this.curBty, this.curCid, gid);
    }
};
LPCardQual.prototype.switchBfvc = function (bty, cid, gid) {
    if (this.ocx == null)
        return;
    if (this.lpCard == null)
        return;

    var cardId = this.lpCard.lpCardInfo.id;
    var caseId = this.lpCard.lpCardInfo.ceId;

    this.curBty = bty;
    this.curCid = cid;
    this.curGid = gid || 0;// RAY
    var fgp = 0;
    var vid = 0;
    var imgType = ABISCode.ImageShowType.LoseLess;

    var imgExists = this.ocx.HS_OCX_LobIsExist(cardId, 0, bty, fgp, vid,
        ABISCode.LobDataType.IMG, ABISCode.ImageShowType.LoseLess, cid);
    var mntExists = this.ocx.HS_OCX_LobIsExist(cardId, 0, bty, fgp, vid,
        ABISCode.LobDataType.MNT, this.curGid, cid);

    if (imgExists && mntExists) {
        this.ocx.HS_OCX_SelectImageMnt(cardId, 0, bty, 0, 0,
            ABISCode.ImageShowType.LoseLess, this.curGid, cid);
    } else {
        if (!WebUtil.isEmpty(this.lpCard.lobs)) {
            for (var i = 0; i < this.lpCard.lobs.length; i++) {
                var lobObj = this.lpCard.lobs[i];
                var lob = lobObj.lob;
                if (lob.bty == bty && lob.cid == cid) {
                    var item = lobObj.item;
                    if (!imgExists && lob.dataType == ABISCode.LobDataType.IMG) {
                        this.ocx.HS_OCX_AppendLPStrLob(caseId, cardId, lob.id,
                            item.itemIndex, bty, ABISCode.LobDataType.IMG,
                            lob.gid, cid, item.data);
                    }
                    if (!mntExists && lob.dataType == ABISCode.LobDataType.MNT) {
                        this.ocx.HS_OCX_AppendLPStrLob(caseId, cardId, lob.id,
                            item.itemIndex, bty, ABISCode.LobDataType.MNT,
                            lob.gid, cid, item.data);
                    }
                }
            }
            this.ocx.HS_OCX_SelectImageMnt(cardId, 0, bty, 0, 0, imgType,
                this.curGid, cid);
            // 加入缓存
            var data = {};
            data.bty = this.curBty;
            data.cid = this.curCid;
            data.gid = this.curGid;
            data.mntChange = false;
            this.cache.push(data);
        }
    }

    this.switchTool(ABISCode.TableTypeCode.LPCARD, bty);
    this.cardId = cardId;
    this.selBty = bty;
    this.selVid = vid;
    this.selFgp = fgp;
    this.selCid = cid;
    this.setPrototypeText();
};
/**
 * 根据生物特征类型和卡片类型切换编辑工具
 * @param {Object} type 1:捺印,2：现场 ABISCode.TableTypeCode
 * @param {Object} bty  ABISCode.BTY
 */
LPCardQual.prototype.switchTool = function (type, bty) {
    var _this = this;
    //imgTool 的相关切换
    var imgData = {};
    var groupData = this.group && this.group[bty];
    var methodData = this.method && this.method[bty];
    imgData[ToolId.ChooseMnt] = groupData;
    imgData[ToolId.ChooseMethod] = methodData;
    this.imgTool.setDownListData(imgData);

    //特征编辑工具切换
    MntTool.switchTool(type, bty);
    //注入一个获取特征 参数的方法
    if (!MntTool.getCardOptions) {
        MntTool.setGetMsgFucntion(function () {
            return _this.getCardOptions(_this);
        })
    }

};
LPCardQual.prototype.showDBDialog = function () {
    if (this.dbDialog == null) {
        this.dbDialog = ABISWindowUtil.openDB("DbDialog",
            ABISCode.DBTypeCode.LATENT_DB, ABISCode.DBPurposeCode.NORMAL,
            chooseDb);
    } else {
        this.dbDialog.open();
    }

    var nThis = this;

    function chooseDb(rows) {
        if (WebUtil.isEmpty(rows))
            return;
        nThis.dbid = rows[0].DBID;
    }
};
/**
 * 展示特征属性
 */
LPCardQual.prototype.setPrototypeText = function () {
    //HS_OCX_GetLobMexInfo(LONGLONG cardSID, LONG bTpCard, LONG nBty, LONG nFgp, LONG nVid, LONG nGid, LONG nCid);
    var str = this.ocx.HS_OCX_GetLobMexInfo(this.cardId, 0, this.selBty, this.selFgp, this.selVid, this.imgTool.gid || -1, this.selCid);
    if (this.proObj) {
        this.proObj.init(str);
    }

};
/**
 * 获取 当前卡片图像的 指位 算法 特征等参数
 * {bty,fgp,vid,gid,cid,mid,}
 * 图像类型 暂未实现
 */
LPCardQual.prototype.getCardOptions = function (_this) {
    _this = _this || this;
    var obj = {};
    obj.bty = _this.selBty;
    obj.fgp = _this.selFgp;
    obj.vid = _this.selVid;
    obj.gid = _this.imgTool.getGid();
    obj.cid = _this.selCid;
    obj.mid = _this.imgTool.mid;
    return obj;
};