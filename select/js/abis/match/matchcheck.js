
//扩展一下ajax 实现页面图像数据的缓存 
;(function($) {
	//备份jquery的ajax方法  
	var _ajax = $.ajax;
	var ajaxCache = {};//存放  ajax缓存数据  
	ajaxCache.__MaxLength__ = 20;//最大缓存20
	//重写jquery的ajax方法  
	$.ajax = function(opt) {
		var url = opt.url;
		var data_send = opt.data;
		//备份opt中error和success方法  
		var fn = {
			error: function(XMLHttpRequest, textStatus, errorThrown) {},
			success: function(data, textStatus) {}
		};
		if(opt.error) {
			fn.error = opt.error;
		}
		if(opt.success) {
			fn.success = opt.success;
		}
		//扩展增强处理  
		var _opt = $.extend(opt, {
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//错误方法增强处理  
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success: function(data, textStatus) {
				if(cacheResult.status===AjaxCacheType.DoCache){
					var firstKey = null;
					var length = 0;
					for(var key in ajaxCache[url]){
						if(!firstKey){
							firstKey = key;
						}
						length++;
					}
					if(length>=ajaxCache.__MaxLength__){
						delete ajaxCache[url][firstKey];
					}
					//console.log(url+"****"+length)
					ajaxCache[url][data_send]=data;
				}
				//成功回调方法增强处理   
				fn.success(data, textStatus);
			}
		});
		var cacheResult = checkCache(opt);
		switch(cacheResult.status){
			case AjaxCacheType.NoCache:
				_ajax(_opt);
				break;
			case AjaxCacheType.DoCache:
				_ajax(_opt);
				break;
			case AjaxCacheType.HasCached:
				opt.success(cacheResult.data);
				return;
				break;
		}
	};
	var  AjaxCacheType = {
			"NoCache":1,//不需要缓存
			"DoCache":2,//需要缓存
			"HasCached":3//已经缓存
	};
	/**
	 * 缓存逻辑判断 
	 * 接收 .ajax对象
	 * 返回 {status,data}
	 */
	function checkCache(opt){
		//实现缓存逻辑
		var url = opt.url;
		var data = opt.data;
		var result = {};
		if(url==='/abisweb/tp/data/'||url==='/abisweb/lp/data/'){
			if(!ajaxCache[url]){
				ajaxCache[url]={};
			}
			if(ajaxCache[url][data]){
				result.data = ajaxCache[url][data];
				result.status = AjaxCacheType.HasCached;
			}else{
				result.status = AjaxCacheType.DoCache;
			}
		}else{
			result.status = AjaxCacheType.NoCache;
		}
		return result;
	}
})(jQuery);

var FullScreenParam = 
{
		maxHeight:0
};

var MenuItemId = 
{
	CopyNum	: "CopyNum",
	Match	: "Match",
	NoMatch	: "NoMatch"
};

function SwitcherData()
{
	this.cardId		= null;
	this.bty		= null;
	this.fgp		= null;
	this.vid		= null;
	this.cid		= null;
	this.gid		= null;
	this.imgId		= null;
	this.type		= null;
}

function MatchCheck(qryId,pageNumLan)
{
	this.initParam();
	this.qryId 			= qryId;
	this.pageNumLan		= pageNumLan;
	this.init();
	if(this.qryId != null)
	{
		this.open(qryId);
	}
	var _this = this;
	setTimeout(function(){
		//初始化缺省全屏
		_this.switchScreenMode();
	},300);
}
MatchCheck.prototype.isFillScreen = false;
MatchCheck.prototype.loadFirstTT = true;//第一次加载TT 如果缺指位需要特殊处理
MatchCheck.prototype.candResults = {};//候选列表  认定结果缓存，防止翻页之后丢失 id：value
MatchCheck.prototype.firstPageFirstLoadDoNotNeedLoad = false;//优化避免重复加载
MatchCheck.prototype.init = function()
{
	this.defaultLayout();
	this.initButton();
	this.initCheckOcx();
	this.initCandTable();
	this.initInfoUI();
	
	var nThis = this;
	
	$(document).keydown
	(
		function(e)
		{
			if(e.keyCode === 122)
			{
				nThis.f11 = true;
			}
		}
	);
	
	$(window).resize(function()
	{
		if(nThis.f11 == true)
		{
			nThis.f11 = null;
			nThis.runF11 = true;
			if(nThis.isFillScreen === true)
			{
				nThis.fullScreen();
			}
			else
			{
				nThis.defaultLayout();
			}
			setTimeout
			(
				function()
				{
					nThis.runF11 = false;
				},
				1000
			);
		}
		else
		{
			if(nThis.runF11 !== true && nThis.switchScreen !== true)
			{
				nThis.defaultLayout();
			}
		}
	});
}

MatchCheck.prototype.fs = function() 
{
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) 
    {
        rfs.call(el);
    } 
    else if (typeof window.ActiveXObject != "undefined") 
    {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) 
        {
            wscript.SendKeys("{F11}");
            this.f11 = true;
        }
    }
}

/** 切换屏幕显示模式 */
MatchCheck.prototype.switchScreenMode = function()
{
	this.switchScreen = true;
	if(this.isFillScreen == true)
	{
		// 退出全屏
		this.fillScreenBnt.setText(AbisMessageResource['FullScreen']);
		this.isFillScreen = false;
		this.exitFullScreen();
	}
	else
	{
		// 执行全屏 
		this.fillScreenBnt.setText(AbisMessageResource['ExitFullScreen']);
		this.isFillScreen = true;
		this.fullScreen();
	}
	
	var nThis = this;
	setTimeout(function(){nThis.switchScreen = false},1000);
}


MatchCheck.prototype.initParam = function()
{
	this.candTable 		= null;
	this.imgOperTool 	= null;
	this.dstCardId 		= null;
	this.bty			= null;
	this.vid			= null;
	this.fgp			= null;
	this.mntId			= null;
	this.synFgp			= true;			//同步指位
	this.synImage 		= true;			//同步图像操作
	this.imgOcx 		= null;			//认定控件
	this.srcSwitcherData= null;
	this.dstSwitcherData= null;
	/* 当源和候选是案件时使用到一下值作为暂时记录 */
	this.srcCaseId		= null;
	this.dstCaseId		= null;
}

MatchCheck.prototype.initButton = function()
{
	var nThis = this;
	$(document).bind("contextmenu",function(){return false;});
	
	//创建页面自定义工具栏按钮
	var openBnt = new ToolButton("OpenMatch","OpenImg",invoke);
	this.prevFgp = new ToolButton("PrevCand_Plus", "PrevImg", invoke,"PrevFgpDisableImg");
	this.prevFgp.setText(AbisMessageResource.ToolTipText["LastOne"]);
	this.nextFgp = new ToolButton("NextCand_Plus", "NextImg", invoke,"NextFgpDisableImg");
	this.nextFgp.setText(AbisMessageResource.ToolTipText["NextOne"]);
	this.ShowTable = new ToolButton("ShowTable", "ShowTable", invoke);
	this.ShowTable.setText(AbisMessageResource.Match["CandList"]);
	this.ShowTool = new ToolButton("ShowTool", "ShowTool", invoke);
	this.ShowTool.setText(AbisMessageResource.Match["ImageProTool"]);
    this.finishCheckBnt = WebUI.createWebButton("CheckBnt",WebUI.BntType.B_100_28,"CheckBnt",invoke);
	this.finishCheckBnt.setText(AbisMessageResource['CheckComplete']);
	this.fillScreenBnt = WebUI.createWebButton("FillScreenBnt",WebUI.BntType.B_100_28,"FillScreenBnt",invoke);
	this.fillScreenBnt.setText(AbisMessageResource['FullScreen']);
    function invoke(id) {
        switch (id) {
            case "OpenMatch":
                nThis.openMatch();
                break;
            case "PrevCand_Plus":
                //复用了候选列表的上一个  方法
                break;
            case "NextCand_Plus":
                //复用了候选列表的下一个 方法
                break;
            case "CheckBnt":
                nThis.beforeFinishCheck();
                break;
            case "FillScreenBnt":
                nThis.switchScreenMode();
                break;
            case "ShowTable":
                nThis.showTable();
                break;
            case "ShowTool":
                nThis.showTool();
                break;
        }
    }
	//初始化图像操作工具条
	var toolIdList = new Array();
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
	toolIdList.push(ToolId.Align);
    toolIdList.push(ToolId.Synchro);
    // toolIdList.push(ToolId.AutoRevolve);
    toolIdList.push(ToolId.LeftRevolve);
    toolIdList.push(ToolId.RightRevolve);
    toolIdList.push(ToolId.ShowCentre);
    toolIdList.push(ToolId.ShowTriangle);
    toolIdList.push(ToolId.ShowMnt);
    toolIdList.push(ToolId.ShowMntDirection);
    toolIdList.push(ToolId.ShowMatchMnt);
    toolIdList.push(ToolId.ShowMntNumber);
	this.imgOperTool = new ImageTool("ImgOper","CheckImageOcx",toolIdList,OCX.OcxType.EDIT);
}

/**
 * 退出全屏模式
 */
MatchCheck.prototype.exitFullScreen = function()
{
	var leftW = $(".LeftLayout").outerWidth(true);
	var rightW = $(".RightLayout").outerWidth(true);
	leftW = Math.abs(leftW);
	rightW = Math.abs(rightW) - 1;
	
	$(".LeftLayout").slideDown();
	$(".RightLayout").slideDown();
	$(".LeftLayout").animate({"width":leftW + "px"},400);
	$(".RightLayout").animate({"width":rightW  + "px"},400,function()
			{
				updateSliderLocation();
			});
	$(".CenterLayout").animate({"marginLeft":(leftW + 1) + "px","marginRight":(rightW + 1)+ "px"},100);
	$(".WebMenu").show();
	
	var swticherH 	= $("#SwitcherPanel").outerHeight(true) + 1;
	var candH		= $(".DownArea").outerHeight(true);
	
	var height 		= FullScreenParam.maxHeight;
	var ocxH	 	= height - swticherH  - candH;
	
	var width	= document.body.scrollWidth;
	var ocxW	= width - (leftW + rightW + 5);
	
	$(".FgpFrame").animate({"width":"100%","height":ocxH + "px"},150);
	
	$(".AbisHeader").show();
	
	$(".FooterContent").show();
	
	$(".DownArea").show();
	
	//上一下下一个候选按钮隐藏
	$("#NextCand_Plus").hide();
	$("#PrevCand_Plus").hide();	
	$("#ShowTable").hide();
	$("#ShowTool").hide();
	var _this = this;
	setTimeout(function () {
		_this.defaultLayout();
	}, 150);
}

/**
 * 进入全屏模式
 */
MatchCheck.prototype.fullScreen = function()
{
	hiddenSlider();
	
	$(".LeftLayout").animate({"width":"0px"},300,function(){$(".LeftLayout").slideUp();});
	$(".RightLayout").animate({"width":"0px"},300,function(){$(".RightLayout").slideUp();});
	
	$(".WebMenu").hide();
	
	$(".AbisHeader").hide();

	/* 隐藏头部和底部 */
	$(".FooterContent").hide();
	$(".DownArea").hide();
	
	/* 更改控件高度 */
	var height 	= WebUtil.getClientHeight();
	var width = WebUtil.getClientWidth();
	var toolHeight 		= $(".WebTool").outerHeight(true) + 1;
	var switcherHeight 	= $("#SwitcherPanel").outerHeight(true) + 1;
	var ocxHeight 		= height - toolHeight - switcherHeight - 1;

	$(".CenterLayout").animate({"marginLeft":"0px","marginRight":"0px"},100);
	$(".FgpFrame").animate({"width":"100%","height":ocxHeight+"px"},150);
	//上一下下一个候选等按钮显示
	$("#NextCand_Plus").show();
	$("#PrevCand_Plus").show();
	$("#ShowTable").show();
	$("#ShowTool").show();
	

}


/** 自动调整控件尺寸 */
MatchCheck.prototype.defaultLayout = function()
{

	var ch = WebUtil.getClientHeight();
	
	var rightTop = $(".RightLayout").offset().top;
	var rightH = $(".RightLayout").outerHeight(true);
	
	var height = ch - rightTop;
	
	FullScreenParam.maxHeight = height - 1;
	
	// 使用控件区域进行空间填充
	var cMaginBorder = 4;
	if(this.isFullScreen === true)
	{
		cMaginBorder = 2;
	}
	var swtichH = $(".LeftFgpLayout").outerHeight(true);
	var ocx = $(".FgpFrame");
	var ocxH = ocx.outerHeight(true);
	var downHeight = $(".DownArea").outerHeight(true) ;
	if(!$(".DownArea").is(":visible")){
		downHeight = 0;
	}
	var ocxHeight = height - downHeight - swtichH - cMaginBorder;
	ocx.height(ocxHeight);
	
	if(height > rightTop)
	{
		var rMaginBorder = 3;
		var titleH 		= $(".Title").outerHeight(true);
		var candInfoH 	= $("#CandCard").outerHeight(true);
		var imgProH 	= $("#ImgProView").outerHeight(true);
		var newH 		= height - candInfoH  - imgProH - titleH - rMaginBorder;
		//alert(imgProH+newH)
		$("#ImgProcess").height(imgProH+newH-titleH);
		$(".ImgProcessTool").height(imgProH+newH);
		$("#ImgProView").height(imgProH+newH+titleH);
		
		//左侧
		var srcCardInfoH 	= $("#SrcCard").outerHeight(true);
		var matchTask 	= $("#MatchTaskInfo");
		matchTask.height(height-titleH-srcCardInfoH);
	}

	// 使用关联信息视图进行空间填充
	var lMarginBorder = 3;
	var srcCardH = $("#SrcCard").outerHeight(true);
	var titleH = $(".Title").outerHeight(true);
	var newConnH = height - srcCardH - titleH - lMarginBorder;
	var connInfo = $(".ConnInfo");
	connInfo.height(newConnH);
	
}
/** 完成认定 之前进行校验 无候选提示 */
MatchCheck.prototype.beforeFinishCheck = function(){
	var _this = this;
	var finishFlag = false;
	var jCandInfoList = new Array();
	for(var i in this.candResults){
		var cand = this.candResults[i];
		var r = cand[QryCandCol.VERIFY_RESULT];
		if(r == ABISCode.VerifyResultCode.MATCH || r == ABISCode.VerifyResultCode.NOTMATCH || r == ABISCode.VerifyResultCode.APPLYRECHECK || r == ABISCode.VerifyResultCode.APPLYAUDIT)
		{
			//确认不中 确认比中 申请复核 
			finishFlag = true;
			break;
		}
	}
	if(finishFlag){
		finishCheck();
	}else{
		DialogUtil.openComfirmDialogForOcx(AbisMessageResource.Alert.NoMatchOptionWarn,finishCheck);
	}
	/** 完成认定 */
	function finishCheck(){
		if(_this.matchInfo == null){
			return;
		}
		_this.finishCheckBnt.setEnabled(false);	
		var qryObj 		= _this.matchInfo.qryObj;
		var qryId 		= qryObj.taskInfo.id;
		var checkInfo 	= {};
		checkInfo.qryId = qryId;		
		var jCandInfoList = new Array();
		for(var i in _this.candResults){
			var cand = _this.candResults[i];
			var r = cand[QryCandCol.VERIFY_RESULT];
			if(r == ABISCode.VerifyResultCode.MATCH || r == ABISCode.VerifyResultCode.NOTMATCH || r == ABISCode.VerifyResultCode.APPLYRECHECK || r == ABISCode.VerifyResultCode.APPLYAUDIT)
			{
				var jCandInfo = {};
				jCandInfo.candId = cand.ID;
				jCandInfo.checkResult = cand[QryCandCol.VERIFY_RESULT];
				jCandInfoList.push(jCandInfo);
			}
		}
		checkInfo.verifyList = jCandInfoList;
		var jsonStr =  $.toJSON(checkInfo);
		var url = WebVar.VarPath + "/match/check/finish";
		$.ajax(
				{
					type 		: "POST",
					url 		: url,
					data 		: jsonStr,
					dataType 	: 'json',
					contentType : "application/json",
					success 	: function(resInfo)
					{
						if (resInfo.status = WebCode.WebResultStatus.ok)
						{
							_this.reSet();	
							var isAddHitlog = resInfo.AddHitlog;
							var qryType = qryObj.taskInfo.qryType;
							var qryStatus = qryObj.taskInfo.qryStatus;
							var params = {}
							params.id= qryId;
							params.type= qryType;
							if(isAddHitlog){
								ABISWindowUtil.openHitLog("openHitLogDialogId",params);					
							}else{
								DialogUtil.openSimpleDialogForOcx(AbisMessageResource.SaveSuccess);
							}
						}
					},
					error:function(e)
					{
						
					}
					
				});
		
	}
}

/***
 * 重置页面
 */
MatchCheck.prototype.reSet = function()
{
	// 如果不清空页面则将候选列表右键菜单更新
	
	//this.clearInfo();
	//this.clearMatchTaskInfo();
	//this.candTable.getTable().clear();
}

/** 打开比对任务 */
MatchCheck.prototype.openMatch = function()
{
	if(this.matchDialog == null)
	{
		var wheres = [];
		var where = {};
		where.colName = QryTaskCol.QRY_STATUS;
		where.dataType = ABISCode.StorageDataType.NUMBER;
		where.values = ABISCode.MatchCheckAllowStatus;
		wheres.push(where);
		this.matchDialog = ABISWindowUtil.openMatch("MatchDialog",null,wheres,selectMatch, false, "ID", WebTable.DES);
	}
	else
	{
		this.matchDialog.open();
	}
	
	var nThis = this;
	function selectMatch(rows)
	{
		nThis.openMatchTask(rows);
		$("#SrcCard").focus();
	}
}

/**
 * 比对任务对话框选择之后打开一个比对任务
 * rows表示表格选中的行
 */
MatchCheck.prototype.openMatchTask = function(rows)
{
	if(WebUtil.isEmpty(rows)) return;
	
	var nThis 	= this;
	var row 	= rows[0];
	var qryId 	= parseInt(row[QryTaskCol.ID]);
	
	this.open(qryId);
}

MatchCheck.prototype.open = function(qryId)
{
	var nThis = this;
	var url = WebVar.VarPath + "/match/check/do/" + qryId;
	$.ajax
	({
	    type : "POST",
	    data : null,
	    url : url,
	    contentType : "application/json",
	    success : function(resInfo)
	    {
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var matchInfo=resInfo.data
                nThis.firstPageFirstLoadDoNotNeedLoad = false;//优化避免重复加载
                nThis.switchMatchTask(matchInfo);
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }
	    },
	    error:function(e)
	    {
	    	
	    }
	});
}

// 切换比对任务
MatchCheck.prototype.switchMatchTask = function(matchInfo)
{
	this.matchInfo = matchInfo;
	if(matchInfo == null) 
	{
		this.reSet();
		return;
	}

	var qryObj 			= matchInfo.qryObj;
	var taskInfo 		= qryObj.taskInfo;

	// 更新比对任务信息
	this.updateMatchTaskInfo(taskInfo);
	
	// 更新源卡候选卡UI界面
	this.updateInfoUI(taskInfo.qryType);
	
	// 更新源卡文本
	this.updateSrcInfo(matchInfo);
	
	// 检索候选列表
	this.searchCandInfo();
	
	// 更新候选列表菜单文本
	this.updateMenuTxt();
	
	// 清空候选 认定结果缓存
	this.candResults={};
}

MatchCheck.prototype.updateSrcInfo = function(matchInfo)
{
	var qryObj	= matchInfo.qryObj;
	var taskInfo = qryObj.taskInfo;
	if(taskInfo.qryType == ABISCode.QryType.TT || taskInfo.qryType == ABISCode.QryType.TL)
	{
		this.updateTPCardInfo(this.srcInfo,matchInfo.srcTPInfo);
	}
	else
	{
		this.updateLPCardInfo(this.srcInfo,matchInfo.srcLPInfo);	
	}
}

MatchCheck.prototype.updateTPCardInfo = function(info,tpInfo)
{
	var cardNum = info.find("#TPCardNum");
	cardNum.html(WebUtil.toString(tpInfo.cardNum));
	cardNum.attr("href",WebVar.VarPath+"/tp/detail/"+tpInfo.id);
	
	info.find("#ShenfenId").html(WebUtil.toString(tpInfo.shenfenId));
	info.find("#Name").html(WebUtil.toString(tpInfo.name));
	info.find("#Sex").html(WebUtil.toString(tpInfo.sex));
	info.find("#PersonClass").html(WebUtil.toString(tpInfo.personType));

	if(tpInfo.wantedId != null)
	{
		var wanted = info.find("#Wanted");
		wanted.attr("href",WebVar.VarPath+"/tp/wanteddetail/"+tpInfo.wantedId);
		wanted.html(WebUtil.toString(tpInfo.wantedStauts));
	}
	
	if(tpInfo.caseId != null)
	{
		var caseNum = info.find("#LPCaseNum");
		caseNum.html(WebUtil.toString(tpInfo.caseNum));
		caseNum.attr("href",WebVar.VarPath + "/lp/case/" + tpInfo.caseId);
	}
}

MatchCheck.prototype.updateLPCardInfo = function(info,lpInfo)
{
	if(lpInfo == null)return;
	var cardNum = info.find("#LPCardNum");
	cardNum.html(WebUtil.toString(lpInfo.cardNum));
	cardNum.attr("href",WebVar.VarPath + "/lp/detail/" + lpInfo.id);	
	var caseNum = info.find("#CeNum");
	caseNum.html(WebUtil.toString(lpInfo.caseNum));
	caseNum.attr("href",WebVar.VarPath + "/lp/case/" + lpInfo.caseId);
	info.find("#CeName").html(WebUtil.toString(lpInfo.caseName));
	info.find("#CeClass").html(WebUtil.toString(lpInfo.caseType));
	info.find("#Seq").html(WebUtil.toString(lpInfo.cardSeq));
	info.find("#HasTPMatch").html(WebUtil.toString(lpInfo.isMatchTP));
	info.find("#CeStatus").html(WebUtil.toString(lpInfo.caseStatus));
	info.find("#SuperviseLevel").html(WebUtil.toString(lpInfo.superviseLevel));
	info.find("#HasPersonKill").html(WebUtil.toString(lpInfo.hasPersonKilled));
	info.find("#BreakDate").html(WebUtil.toString(lpInfo.breakDate));
	info.find("#CancelDate").html(WebUtil.toString(lpInfo.cancelDate));
	
}

MatchCheck.prototype.updateMatchTaskInfo = function(taskInfo)
{
	this.clearMatchTaskInfo();
	
	if(taskInfo == null)return;
	
	var qryNum = $("#QryNum");
	qryNum.html(WebUtil.toString(taskInfo.qryNum));
	var url = WebVar.VarPath+"/match/detail/" + taskInfo.id;
	qryNum.attr("href",url);
	
	$("#QryType").html(taskInfo.qryTypeText);
	$("#QryStatus").html(taskInfo.qryStatusText);
	$("#BtyFlag").html(taskInfo.btyMaskText);
	$("#CandCnt").html(taskInfo.candCnt);
	$("#SubmitUser").html(taskInfo.submitUser);
	$("#SubmitUnitCode").html(taskInfo.submitUnitCodeText);
	$("#SubmitTime").html(taskInfo.submitTimeText);
	$("#VerifyResult").html(taskInfo.lastVerifyResultText);
}

/** 更新弹出菜单项文本 */
MatchCheck.prototype.updateMenuTxt = function()
{
	var item1 = this.candTable.getTable().getPopMenuItem(MenuItemId.Match);
	var item2 = this.candTable.getTable().getPopMenuItem(MenuItemId.NoMatch);
	
	var statusTxt = this.getStatusFlowTxt();
	if(statusTxt == null)
	{
		// 不可以进行认定
		this.finishCheckBnt.setEnabled(false);
		item1.item.hide();
		item2.item.hide();
		return;
	}
	this.finishCheckBnt.setEnabled(true);
	item1.item.show();
	item2.item.show();
	item1.txt.html(statusTxt.OK);
	item2.txt.html(statusTxt.CANCEL);
}

/** 根据比对状态对象生成相应文本 */
MatchCheck.prototype.getStatusFlowTxt = function()
{
	if(this.matchInfo == null)return;
	
	var statusTxt = null;
	var confirmText = "";
	var cancelText 	= "";
	statusTxt = {};
	var qryObj 		= this.matchInfo.qryObj;
	var qryStatus = qryObj.taskInfo.qryStatus;
	var qryType = qryObj.taskInfo.qryType;
	switch (qryStatus)
	{
		case ABISCode.QryStatusCode.WAITCHECK:
			if (qryType == ABISCode.QryType.TL || qryType == ABISCode.QryType.LT)
			{
				confirmText = AbisMessageResource['ApplyReview'];
				cancelText 	= AbisMessageResource['CancelReview'];
			}
			else
			{
				confirmText = AbisMessageResource['ConfirmHit'];
				cancelText 	= AbisMessageResource['ConfirmNotHit'];
			}
			break;
		case ABISCode.QryStatusCode.WAITRECHECK:
//			if (qryType == ABISCode.QryType.TL || qryType == ABISCode.QryType.LT)
//			{
//				confirmText = "申请审核"
//				cancelText 	= "取消审核";
//			}
//			else
//			{
//				confirmText = AbisMessageResource['ConfirmHit'];
//				cancelText 	= AbisMessageResource['ConfirmNotHit'];
//			}
//			break;
		case ABISCode.QryStatusCode.WAITAUDIT:
				confirmText = AbisMessageResource['ConfirmHit'];
				cancelText 	= AbisMessageResource['ConfirmNotHit'];
			break;
		default:
			return null;
	}
	statusTxt.OK		= confirmText;
	statusTxt.CANCEL 	= cancelText;
	return statusTxt;
}

//切换候选
MatchCheck.prototype.switchCand = function(row)
{
	if(WebUtil.isNull(row)) return;
	this.dstCardId 	= parseInt(row[QryCandCol.LOC_CARD_ID]);
	if(WebUtil.isNull(this.dstCardId)) return;
	var bty	= parseInt(row[QryCandCol.BTY]);
	var fgp	= 0;
	var vid	= 0;
	var cid	= 0;
	var gid	= dstFactory.getMntGid();
	
	var dstCidObj	= row[QryCandCol.DEST_CID];
	var dstGidObj	= row[QryCandCol.DEST_GID];
	
	if(!WebUtil.isEmpty(dstCidObj)) cid = parseInt(dstCidObj);
	if(!WebUtil.isEmpty(dstGidObj)) gid = parseInt(dstGidObj);
	
	var qryObj 		= this.matchInfo.qryObj;
	var qryType 	= qryObj.taskInfo.qryType;
	
	if(qryType == ABISCode.QryType.TT || qryType == ABISCode.QryType.LT)
	{
		fgp	= parseInt(row[QryCandCol.FGP]);
		vid	= parseInt(row[QryCandCol.DEST_VID]);
		if(fgp == 0)
		{
			fgp = 1;
		}
	}

	var mntId		= parseInt(row[QryCandCol.DEST_GID]);
	var imgType		= dstFactory.getImageType();
	
	var isTP 		= false;
	var tableType	= ABISCode.TableTypeCode.LPCARD;
	if(qryType == ABISCode.QryType.TT || qryType == ABISCode.QryType.LT)
	{
		isTP 		= true;
		tableType	= ABISCode.TableTypeCode.TPCARD;
	}
	if(qryType == ABISCode.QryType.TT ){
		this.loadFirstTT = true;
	}
	
	dstFactory.init(this.dstCardId, bty, vid, fgp, cid, imgType, mntId, tableType,true);
	
	// 获取候选卡片信息
	this.updateCandInfo(this.dstCardId);
	this.syncSrcBfvc(row);

}

MatchCheck.prototype.updateCandInfo = function(cardId)
{
	if(cardId == null)return;
	//更新候选卡缓存
	this.updateCandCache();
	var qryObj	= this.matchInfo.qryObj;
	var taskInfo = qryObj.taskInfo;
	var printType;
	if(taskInfo.qryType == ABISCode.QryType.TT || taskInfo.qryType == ABISCode.QryType.LT)
	{
		printType = ABISCode.PrintTypeCode.PRINT_TP;
	}
	else
	{
		printType = ABISCode.PrintTypeCode.PRINT_LP;
	}
	
	var url = WebVar.VarPath + "/match/check/cand/{0}/{1}";
	url = WebUtil.formatTxt(url,printType,cardId);
	
	var nThis = this;
	$.ajax({
	    type : "POST",
	    data : null,
	    url : url,
	    contentType : "application/json",
	    success : function(candInfo)
	    {
	    	if(candInfo != null)
	    	{
	    		if(candInfo.candTPInfo != null)
	    		{
	    			nThis.updateTPCardInfo(nThis.candInfo,candInfo.candTPInfo);
	    		}
	    		if(candInfo.candLPInfo != null)
	    		{
	    			nThis.updateLPCardInfo(nThis.candInfo,candInfo.candLPInfo);	
	    		}
	    	}
	    },
	    error:function(e)
	    {
	    	
	    }
	});
	

}
MatchCheck.prototype.updateCandCache = function()
{
	var candList 	= this.candTable.getTable().getAllItems()||[];
	var qryObj	= this.matchInfo.qryObj;
	var taskInfo = qryObj.taskInfo;
	var printType;
	for(var i = 0;i<candList.length;i++){
		var row = candList[i];
		if(taskInfo.qryType == ABISCode.QryType.TL)
		{//倒查
			var cardId 	= parseInt(row[QryCandCol.LOC_CARD_ID]);
			var bty =  parseInt(row[QryCandCol.BTY]);
			var vid =  parseInt(row[QryCandCol.DEST_VID]||0);
			var fgp =  parseInt(row[QryCandCol.FGP]||0);
			var cid =  parseInt(row[QryCandCol.DEST_CID]||0);
			var gid =  parseInt(row[QryCandCol.DEST_GID]||0);
			var dataType = ABISCode.FGPDataType.ALL;
			var imgType = dstFactory&&dstFactory.getImageType();
			var loc  =  true;
			this.cacheLP(cardId,bty,vid, fgp, cid, gid, dataType, imgType, loc)//缓存图像
		}	
	}
	//this.cacheTP(cardId,bty,vid, fgp, cid, gid, dataType, imgType, loc){//缓存图像
}
/**
 * TL同步切换源卡指位
 * 
 */
MatchCheck.prototype.syncSrcBfvc = function(row)
{
	var qryObj 		= this.matchInfo.qryObj;
	var qryType 	= qryObj.taskInfo.qryType;
	
	if(qryType == ABISCode.QryType.TL)			
	{	
		var bty	= parseInt(row[QryCandCol.BTY]);
		var fgp	= parseInt(row[QryCandCol.FGP]);
		var vid	= 0;
		var cid	= 0;
		var gid	= 0;		
		var dstVidObj	= row[QryCandCol.DEST_VID];
		var dstCidObj	= row[QryCandCol.DEST_CID];
		var dstGidObj	= row[QryCandCol.DEST_GID];
		if(!WebUtil.isEmpty(dstVidObj)){
			vid = parseInt(dstVidObj);	
		}
		if(!WebUtil.isEmpty(dstCidObj)){
			cid = parseInt(dstCidObj);
		}
		if(!WebUtil.isEmpty(dstGidObj)){
			gid = parseInt(dstGidObj);
		}		
		var imgType = srcFactory.getImageType();
		srcFactory.getSwitchControl().set6E(bty, vid, fgp, cid, imgType, gid);
		this.selectedSrcFgp(null, bty, vid, fgp, cid, imgType, gid);
	}
}

/**
 *  TT同步切换源卡指位 和 候选卡指位 信息 
 *  
 */

MatchCheck.prototype.syncSrcAndDstBfvc = function(type)
{
	if(WebUtil.isNull(this.matchInfo)) {
		return false;
	}
	var qryObj 		= this.matchInfo.qryObj;
	var qryType 	= qryObj.taskInfo.qryType;
	
	if(qryType == ABISCode.QryType.TT && !this.loadFirstTT)			
	{	
		var srcswitchControl = srcFactory.getSwitchControl();
		var srcbty	= srcswitchControl.getBty();
		var srcfgp	= srcswitchControl.getFgp();
		var srcvid	= srcswitchControl.getVid();
		var srccid	= srcswitchControl.getCid();
		var srcgid	= srcswitchControl.getGid();
		var dstswitchControl = dstFactory.getSwitchControl();
		var dstbty	= dstswitchControl.getBty();
		var dstfgp	= dstswitchControl.getFgp();
		var dstvid	= dstswitchControl.getVid();
		var dstcid	= dstswitchControl.getCid();
		var dstgid	= dstswitchControl.getGid();
		if (srcbty ===dstbty && srcvid === dstvid &&srcfgp ===dstfgp && srccid === dstcid  )
		{
				return;
		}
		if(type ==='dst' ){
			if(dstFactory.getSwitchControl().validate(srcbty,srcvid,srcfgp)){
				//源卡触发改变，同步候选卡
				var imgType = dstFactory.getImageType();
				dstFactory.getSwitchControl().set6E(srcbty, srcvid, srcfgp, srccid, imgType, srcgid);
				this.selectedDstFgp(type, srcbty, srcvid, srcfgp, srccid, imgType, srcgid);
				//dstFactory.getSwitchControl().notifyChange();	
			}else{
				//清空ocx控件
				var imgType = dstFactory.getImageType();
				dstFactory.getSwitchControl().set6E(0, 0, 0, dstcid, imgType, dstgid);
				this.selectedDstFgp(null);
			}					
		}else if (type === 'src'){
			if(srcFactory.getSwitchControl().validate(dstbty,dstvid,dstfgp)){
				//候选卡触发改变，同步源卡
				var imgType = srcFactory.getImageType();
				srcFactory.getSwitchControl().set6E(dstbty, dstvid, dstfgp, dstcid, imgType, dstgid);
				this.selectedSrcFgp(type, dstbty, dstvid, dstfgp, dstcid, imgType, dstgid);
				//srcFactory.getSwitchControl().notifyChange();	
			}else{
				var imgType = srcFactory.getImageType();
				srcFactory.getSwitchControl().set6E(0, 0, 0, srccid, imgType, srcgid);
				this.selectedSrcFgp(null);
			}
		}
	}else if(qryType == ABISCode.QryType.TT && this.loadFirstTT){
		//第一次加载候选指位  需要同步显示 两边都有的数据，不能显示空白
		if(type ==='src' ){
			if(srcFactory.getSwitchControl().validate(dstbty,dstvid,dstfgp)){
				//候选卡触发改变，同步源卡
				var imgType = srcFactory.getImageType();
				srcFactory.getSwitchControl().set6E(dstbty, dstvid, dstfgp, dstcid, imgType, dstgid);
				this.selectedSrcFgp(type, dstbty, dstvid, dstfgp, dstcid, imgType, dstgid);
			}else{
				//选中的候选记录
                var row 	= this.candTable.getTable().getSelectItem();
                var srcGid = row[QryCandCol.SRC_GID]||0;
                var destGid = row[QryCandCol.DEST_GID]||0;
				var treeData2=dstFactory.getSwitchControl().treeData;
				var p={};
				p.bty=dstFactory.getSwitchControl().getBty();//TT比对 只有bty固定，其他的比对器认为   整体匹配
				var fgpdata = srcFactory.getSwitchControl().getFristSyn(treeData2,p);
				if(!WebUtil.isEmpty(fgpdata)){
					dstFactory.getSwitchControl().set6E(fgpdata.bty, fgpdata.vid, fgpdata.fgp, fgpdata.cid, dstFactory.getImageType(), destGid);
					this.selectedDstFgp(type,fgpdata.bty, fgpdata.vid, fgpdata.fgp, fgpdata.cid, dstFactory.getImageType(), destGid);
					srcFactory.getSwitchControl().set6E(fgpdata.bty, fgpdata.vid, fgpdata.fgp, fgpdata.cid, srcFactory.getImageType(), srcGid);
					this.selectedSrcFgp(type, fgpdata.bty, fgpdata.vid, fgpdata.fgp, fgpdata.cid, srcFactory.getImageType(), srcGid);
				}else{
					debugger
				}
				
			}		
			this.loadFirstTT = false;
		}
	}			
}

MatchCheck.prototype.initCandTable = function()
{
	var  nThis = this;
	function selectCand(row)
	{
		nThis.switchCand(row);
	}
	function setCandResults(){
		//给刷新后的表单  设置缓存的  认定结果
		var indexList 	= nThis.candTable.getTable().indexList||[];
		for(var i=0;i< indexList.length;i++)
		{
			var index = i;
			var objIndex = indexList[i];
			var colData =  nThis.candTable.getTable().getRowByObjIndex(objIndex);
			var id = colData[QryCandCol.ID];
			var col = nThis.candResults[id]||nThis.candResults[id+""];
			if(!WebUtil.isEmpty(col)){
				var result = col[QryCandCol.VERIFY_RESULT];
				var text = col[QryCandCol.VERIFY_RESULT+"Text"];
				nThis.candTable.getTable().setColValue(index,QryCandCol.VERIFY_RESULT,result,text);
			}
		}
		//刷新  翻页后 选中第一条
        var row 	= nThis.candTable.getTable().getSelectItem();
		if(nThis.firstPageFirstLoadDoNotNeedLoad){
            selectCand(row);
        }else{
            nThis.firstPageFirstLoadDoNotNeedLoad = true;
		}
    }

	/**
	 *	菜单项被选择的事件 
	 *增加一个 操作结果的缓存，方便翻页之后，保留认定结果。
	 */
	function selectMenuItem(id)
	{
		var qryObj = nThis.matchInfo.qryObj
		var qryStatus = qryObj.taskInfo.qryStatus;
		var qryType	= qryObj.taskInfo.qryType;
		
		switch(id)
		{
			case MenuItemId.CopyNum:
				var row = nThis.candTable.getTable().getSelectItem();
				if(WebUtil.isEmpty(row)) return;
				var cardNum = row[QryCandCol.LOC_CARD_NUM];
				window.clipboardData.setData('text', cardNum);
				break;
			case MenuItemId.Match:
				var result 	= "";
				var text 	= "";
				switch (qryStatus)
				{
					case ABISCode.QryStatusCode.WAITCHECK:
						if (qryType == ABISCode.QryType.TL || qryType == ABISCode.QryType.LT)
						{
							result = ABISCode.VerifyResultCode.APPLYRECHECK;
							text = AbisMessageResource['ApplyReview'];
						}
						else
						{
							result = ABISCode.VerifyResultCode.MATCH;
							text = AbisMessageResource['Hit'];
						}
						break;
					case ABISCode.QryStatusCode.WAITRECHECK:
					case ABISCode.QryStatusCode.WAITAUDIT:
						result = ABISCode.VerifyResultCode.MATCH;
						text = AbisMessageResource['Hit'];
						break;
				}
				var curIndex = nThis.candTable.getTable().getSelectIndex();
				nThis.candTable.getTable().setColValue(curIndex,QryCandCol.VERIFY_RESULT,result,text);
				var selectCol = nThis.candTable.getTable().getRowDataPlus(curIndex);
				nThis.candResults[selectCol.ID] = selectCol;
				break;
			case MenuItemId.NoMatch:
				var text = "";
				var result = "";
				switch (qryStatus)
				{
					case ABISCode.QryStatusCode.WAITCHECK:
						if (qryType == ABISCode.QryType.TL || qryType == ABISCode.QryType.LT)
						{
							result = ABISCode.VerifyResultCode.NOTCHECKED;
							text = "";
						}
						else
						{
							result = ABISCode.VerifyResultCode.NOTMATCH;
							text = AbisMessageResource['NotHit'];
						}
						break;
					case ABISCode.QryStatusCode.WAITRECHECK:
					case ABISCode.QryStatusCode.WAITAUDIT:
						result = ABISCode.VerifyResultCode.NOTMATCH;
						text = AbisMessageResource['NotHit'];
						break;
				}
				var curIndex = nThis.candTable.getTable().getSelectIndex();
				nThis.candTable.getTable().setColValue(curIndex,QryCandCol.VERIFY_RESULT,result,text);
				var selectCol = nThis.candTable.getTable().getRowDataPlus(curIndex);
				nThis.candResults[selectCol.ID] = selectCol;
				break;
		}
	}

	var menu = 
	{
		selectItem:selectMenuItem,
		menuItem:
		[
			{id:MenuItemId.CopyNum,type:0,txt:AbisMessageResource['CopyBarCode']},
			{type:1},
			{id:MenuItemId.Match,type:0,txt:""},
			{id:MenuItemId.NoMatch,type:0,txt:""}
		]
	};
	
	$("#QryCandTable").bind("selectstart",function(){return false});
	
	var cols = new Array();
	cols.push(QryCandCol.ID);
	cols.push(QryCandCol.SCORE);
	cols.push(QryCandCol.CAND_RANK);
	cols.push(QryCandCol.BTY);
	cols.push(QryCandCol.FGP);
	cols.push(QryCandCol.SRC_VID);
	cols.push(QryCandCol.SRC_CID);
	cols.push(QryCandCol.SRC_GID);
	cols.push(QryCandCol.DEST_VID);
	cols.push(QryCandCol.DEST_CID);
	cols.push(QryCandCol.DEST_GID);
	cols.push(QryCandCol.LOC_CARD_ID);
	cols.push(QryCandCol.LOC_CARD_NUM);
	cols.push(QryCandCol.VERIFY_RESULT);
	
	var where = new Array();
	var w = {};
	w.colName = "1";
	w.dataType = ABISCode.StorageDataType.NUMBER;
	w.value1 = 2;
	where.push(w);
	var tblParam =
	{
		tblId		: "QryCandTable",
		tblName		: TableName.QRY_CAND,
		cols		: cols,
		url			: WebVar.VarPath + "/locbase/table/",
		orderCol	: QryCandCol.CAND_RANK,
		order		: 0,
		pageSize	: 10,
		where		: where,
		pageBarId	: "QryCandCodeBar",
		callBack	: {onClick:selectCand,refresh:setCandResults},
		//sort		: {colName:QryCandCol.CAND_RANK,order:WebTable.ASC},
		multiSelect	: false,
		menu		: menu,
		language	: this.pageNumLan,
		statuscolor	: true
	}
	
	/* 创建候选列表表格对象 */
	this.candTable = new TableControlMgr(tblParam);
	
	/* 更新菜单文本 */
	this.updateMenuTxt();
	
	/* 注册导航按钮事件 */
	$("#NextCand").click
	(
		function()
		{
			navigateCand(1);
		}
	);
	$("#NextCand_Plus").click
	(
		function()
		{
			navigateCand(1);
		}
	);
	
	/* 注册导航按钮事件 */
	$("#PrevCand").click
	(
		function()
		{
			navigateCand(-1);
		}
	);
	$("#PrevCand_Plus").click
	(
		function()
		{
			navigateCand(-1);
		}
	);
	
	
	function navigateCand(flag)
	{
		if(nThis.candTable.getTable() == null)return;
		var index = nThis.candTable.getTable().getSelectIndex();
		var rCnt = nThis.candTable.getTable().getRowCount();
		var curIndex = index + flag;
		if(curIndex < 0 || curIndex >= rCnt)
		{
			return;
		}
		nThis.candTable.getTable().setSelectIndex(curIndex);
		var row = nThis.candTable.getTable().getSelectItem();
		nThis.switchCand(row);
	}
}

/** 初始化比对任务信息、原卡信息、候选卡信息界面以及状态 */
MatchCheck.prototype.initInfoUI = function()
{
	var tpInfo = $("#TPCardInfo");
	var lpInfo = $("#LPCardInfo");
	tpInfo.hide();
	lpInfo.hide();
}

MatchCheck.prototype.updateInfoUI = function(qryType)
{
	if(qryType == null)return;
	
	var tpInfo = $("#TPCardInfo");
	var lpInfo = $("#LPCardInfo");
	
	if(this.srcInfo != null)
	{
		this.srcInfo.remove();
	}

	if(this.candInfo != null)
	{
		this.candInfo.remove();
	}
	
	switch(qryType)
	{
		case ABISCode.QryType.TT:
			this.srcInfo = tpInfo.clone(true);
			this.candInfo = tpInfo.clone(true);
			break;
		case ABISCode.QryType.TL:
			this.srcInfo = tpInfo.clone(true);
			this.candInfo = lpInfo.clone(true);
			break;
		case ABISCode.QryType.LT:
			this.srcInfo = lpInfo.clone(true);
			this.candInfo = tpInfo.clone(true);
			break;
		case ABISCode.QryType.LL:
			this.srcInfo = lpInfo.clone(true);
			this.candInfo = lpInfo.clone(true);
			break;
	}
	
	this.srcInfo.attr("id","");
	this.candInfo.attr("id","");
	
	$("#SrcCardInfo").append(this.srcInfo);
	$("#CandCardInfo").append(this.candInfo);

	this.srcInfo.show();
	this.candInfo.show();
}

MatchCheck.prototype.clearMatchTaskInfo = function()
{
	//比对信息
	$("#QryNum").html("");
	$("#QryType").html("");
	$("#QryStatus").html("");
	$("#BtyFlag").html("");
	$("#CandCnt").html("");
	$("#SubmitUser").html("");
	$("#SubmitUnitCode").html("");
	$("#SubmitTime").html("");
	$("#VerifyResult").html("");
}

/**
 * 清空信息
 */
MatchCheck.prototype.clearInfo = function()
{
	
	//捺印卡片信息
	$("#TPCardNum").html("");
	$("#ShenfenId").html("");
	$("#Name").html("");
	$("#Sex").html("");
	$("#PersonClass").html("");
	$("#IsCriminal").html("");
	$("#IsWanted").html("");
	$("#IsCapture").html("");
	$("#LPCaseNum").html("");
	
	//现场卡片和案件信息
	$("#LPCardNum").html("");
	$("#CeNum").html("");
	$("#CeClass").html("");
	$("#Seq").html("");
	$("#HasTPMatch").html("");
	$("#CeName").html("");
	$("#CeStatus").html("");
	$("#SuperviseLevel").html("");
	$("#HasPersonKill").html("");
	$("#BreakDate").html("");
	$("#CancelDate").html("");
}



/**
 * 根据比对ID检索比对候选
 */
MatchCheck.prototype.searchCandInfo = function()
{
	if(this.matchInfo == null)return;
	
	var where = new Array();
	var qryObj 		= this.matchInfo.qryObj;
	var qryId 		= qryObj.taskInfo.id;
	var qryStatus 	= qryObj.taskInfo.qryStatus;
	
	var w1 = {colName:QryCandCol.QRY_ID,dataType:ABISCode.StorageDataType.NUMBER,value1:qryId};
	where.push(w1);
	if(qryStatus == ABISCode.QryStatusCode.WAITRECHECK)
	{
		var w = {colName:QryCandCol.VERIFY_RESULT,dataType:ABISCode.StorageDataType.NUMBER,value1:ABISCode.VerifyResultCode.APPLYRECHECK};
		where.push(w);
	}
	else if(qryStatus == ABISCode.QryStatusCode.WAITCENSOR)
	{
		var w = {colName:QryCandCol.VERIFY_RESULT,dataType:ABISCode.StorageDataType.NUMBER,value1:ABISCode.VerifyResultCode.APPLYAUDIT};
		where.push(w);
	}
	var qryObj 		= this.matchInfo.qryObj;
	var qryType 	= qryObj.taskInfo.qryType;
	var orderCol=QryCandCol.CAND_RANK;
	var order =WebTable.ASC;
	if(qryType===ABISCode.QryType.TL){
		orderCol=QryCandCol.FGP+","+QryCandCol.CAND_RANK;
		order =WebTable.ASC;
	}
	this.candTable.setQryParam(where,orderCol,order);
	this.candTable.refresh(invoke,1000);
	
	var nThis = this;
	function invoke()
	{
		nThis.loadFirst();
	}
}

MatchCheck.prototype.loadFirst = function()
{
	if(this.matchInfo == null)return;
	
	var row 	= this.candTable.getTable().getSelectItem();
	var bty 	= null;
	var fgp 	= null;
	
	var srcCid	= null;
	var srcVid 	= null;
	var srcGid	= null;
	
	var dstCid	= null;
	var dstVid 	= null;
	var dstGid	= null;
	
	this.dstCardId 	= null;
	if(row != null && !WebUtil.isNull(row.length))
	{
		this.dstCardId 	= parseInt(row[QryCandCol.LOC_CARD_ID]);
		bty				= row[QryCandCol.BTY];
		fgp				= row[QryCandCol.FGP];
		srcVid			= row[QryCandCol.SRC_VID];
		srcCid			= row[QryCandCol.SRC_CID];
		srcGid			= row[QryCandCol.SRC_GID];
		dstVid			= row[QryCandCol.DEST_VID];
		dstCid			= row[QryCandCol.DEST_CID];
		dstGid			= row[QryCandCol.DEST_GID];
	}
	if(fgp == "")
	{
		fgp = 0;
	}
	if(WebUtil.isNull(srcVid)) srcVid = 0;
	if(WebUtil.isNull(srcCid)) srcCid = 0;
	if(WebUtil.isNull(srcGid)) srcGid = 0;
	if(WebUtil.isNull(dstVid)) dstVid = 0;
	if(WebUtil.isNull(dstCid)) dstCid = 0;
	if(WebUtil.isNull(dstGid)) dstGid = 0;
	
	var srcImgId 	= null;
	var dstImgId 	= null;
	var srcType		= null;
	var dstType		= null;
	
	
	var qryObj 		= this.matchInfo.qryObj;
	var qryType 	= qryObj.taskInfo.qryType;
	
	switch(qryType)
	{
		case ABISCode.QryType.TT: 
			srcImgId 	= ABISCode.ImageShowType.Cpr;
			dstImgId 	= ABISCode.ImageShowType.Cpr;
			srcType 	= ABISCode.TableTypeCode.TPCARD;
			dstType 	= ABISCode.TableTypeCode.TPCARD;
            this.loadFirstTT = true;
			break;
		case ABISCode.QryType.TL:
			srcImgId 	= ABISCode.ImageShowType.Cpr;
			dstImgId 	= ABISCode.ImageShowType.LoseLess;
			srcType 	= ABISCode.TableTypeCode.TPCARD;
			dstType 	= ABISCode.TableTypeCode.LPCARD;
			break;
		case ABISCode.QryType.LT:
			srcImgId 	= ABISCode.ImageShowType.LoseLess;
			dstImgId 	= ABISCode.ImageShowType.Cpr;
			srcType 	= ABISCode.TableTypeCode.LPCARD;
			dstType 	= ABISCode.TableTypeCode.TPCARD;
			break;
		case ABISCode.QryType.LL:
			srcImgId 	= ABISCode.ImageShowType.LoseLess;
			dstImgId 	= ABISCode.ImageShowType.LoseLess;
			srcType 	= ABISCode.TableTypeCode.LPCARD;
			dstType 	= ABISCode.TableTypeCode.LPCARD;
			break;
	}
	var qryObj = this.matchInfo.qryObj;
	var srcCardId = qryObj.taskInfo.firstSrcCardId;
	/*
	 * ajax  加载 源卡 候选卡  
	 * */
	if(!WebUtil.isNull(srcFactory))
	{
		srcFactory.init(srcCardId, bty, srcVid, fgp, srcCid, srcImgId, srcGid, srcType,true);		
	}
	else
	{
		this.srcSwitcherData 			= new SwitcherData();
		this.srcSwitcherData.cardId 	= srcCardId;
		this.srcSwitcherData.bty 		= bty;
		this.srcSwitcherData.fgp 		= fgp;
		this.srcSwitcherData.vid 		= srcVid;
		this.srcSwitcherData.cid 		= srcCid;
		this.srcSwitcherData.gid 		= srcGid;
		this.srcSwitcherData.imgId	 	= srcImgId;
		this.srcSwitcherData.type 		= srcType;
	}
	if(!WebUtil.isNull(dstFactory))
	{
		
		dstFactory.init(this.dstCardId, bty, dstVid, fgp, dstCid, dstImgId, dstGid, dstType,true);
	}
	else
	{
		this.dstSwitcherData 			= new SwitcherData();
		this.dstSwitcherData.cardId 	= this.dstCardId;
		this.dstSwitcherData.bty 		= bty;
		this.dstSwitcherData.fgp 		= fgp;
		this.dstSwitcherData.vid 		= dstVid;
		this.dstSwitcherData.cid 		= dstCid;
		this.dstSwitcherData.gid 		= dstGid;
		this.dstSwitcherData.imgId 		= dstImgId;
		this.dstSwitcherData.type	 	= dstType;
	}

	// 获取候选卡片信息
	this.updateCandInfo(this.dstCardId);
}

/** 初始化认定控件 */ 
MatchCheck.prototype.initCheckOcx = function()
{
	//初始化认定控件参数
	this.imgOcx = document.getElementById("CheckImageOcx");
	
	//设置编辑模式为认定模式
	this.imgOcx.HS_OCX_SetEditorMode(2);
	
	//设置左侧和右侧不可编辑
	this.imgOcx.HS_OCX_SetCellEditElemType(0,0,0);
	this.imgOcx.HS_OCX_SetCellEditElemType(0,1,0);
}
MatchCheck.prototype.cacheTP = function(cardId,bty,vid, fgp, cid, gid, dataType, imgType, loc){//缓存图像
	if(cardId==null){
		return;
	}
	var obj 		= {};
	obj.cardId 		= cardId;
	obj.bty 		= bty;
	obj.vid 		= vid;
	obj.fgp 		= fgp;
	obj.cid 		= cid;
	obj.gid 		= gid;
	obj.imgType 	= imgType;
	obj.dataType 	= dataType;
	var json = $.toJSON(obj);
	var url = WebVar.VarPath + "/tp/data/";
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : json,
		dataType : 'json',
		success : function(data) {},
		error : function(e, status, error) {}
	});
}
MatchCheck.prototype.searchTP = function(cardId,bty,vid, fgp, cid, gid, dataType, imgType, loc)
{
    var nThis = this;
	if(cardId==null){
        // 左边的是0, 0, 右边的候选是0, 1
        nThis.imgOcx.HS_OCX_ResetCellAllData(0, 1, 0);
		return;
	}
	var obj 		= {};
	obj.cardId 		= cardId;
	obj.bty 		= bty;
	obj.vid 		= vid;
	obj.fgp 		= fgp;
	obj.cid 		= cid;
	obj.gid 		= gid;
	obj.imgType 	= imgType;
	obj.dataType 	= dataType;
	var json = $.toJSON(obj);
	var url = WebVar.VarPath + "/tp/data/";
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : json,
		dataType : 'json',
		success : function(resultInfo)
		{
			if(resultInfo.status === WebCode.WebResultStatus.ok){
				var data = resultInfo.data;
                if (data != null)
                {
                    var ocx = document.getElementById("MntEditOcx");
                    var img = null;
                    var mnt = null;
                    if (data.img != null)
                    {
                        var imgLob = data.img.lob;
                        var imgItem = null;
                        if (!WebUtil.isEmpty(data.img.item))
                        {
                            imgItem = data.img.item;
                            nThis.imgOcx.HS_OCX_AppendCheckTPStrLob(cardId, imgLob.id,
                                imgItem.itemIndex, bty, fgp, vid,ABISCode.LobDataType.IMG, imgLob.gid, cid,imgItem.data, loc);
                        }
                    }
                    if (data.mnt != null)
                    {
                        var mntLob = data.mnt.lob;
                        var mntItem = null;
                        if (!WebUtil.isEmpty(data.mnt.item))
                        {
                            mntItem = data.mnt.item;
                            nThis.imgOcx.HS_OCX_AppendCheckTPStrLob(cardId, mntLob.id,
                                mntItem.itemIndex, bty, fgp, vid,ABISCode.LobDataType.MNT, mntLob.gid, cid,mntItem.data, loc);
                        }
                    }
                    nThis.imgOcx.HS_OCX_SelectImageMnt(cardId, 1, bty, fgp, vid, obj.imgType, obj.gid, cid);
                    nThis.imgOcx.HS_OCX_DoDigitMap(0);
                }
			}else{
                DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
			}

		},
		error : function(e, status, error) 
		{
			//清空 ocx nThis.imgOcx

            nThis.imgOcx.HS_OCX_SelectImageMnt(cardId,1,undefined, undefined, undefined, undefined,ABISCode.LobDataType.IMG, undefined, undefined);
            nThis.imgOcx.HS_OCX_DoDigitMap(0);
            //dstFactory.getSwitchControl().set6E(0, 0, 0, dstcid, imgType, dstgid);
		}
	});
}
//缓存图像信息
MatchCheck.prototype.cacheLP = function(cardId, bty, cid, dataType, imgType, gid, loc){
	if(cardId == null)return;
	var obj 	= {};
	obj.bty 	= bty;
	obj.cid 	= cid;
	obj.imgType = imgType;
	obj.gid		= gid;
	obj.cardId 	= cardId;
	obj.dataType= dataType;
	obj.qryTxt	= true;		//是否需要检索卡片文本
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
		success : function(data) {},
		error : function(e, status, error) {}
	});  
}
MatchCheck.prototype.searchLP = function(cardId, bty, cid, dataType, imgType, gid, loc)
{
	if(cardId == null)return;
	var obj 	= {};
	obj.bty 	= bty;
	obj.cid 	= cid;
	obj.imgType = imgType;
	obj.gid		= gid;
	obj.cardId 	= cardId;
	obj.dataType= dataType;
	obj.qryTxt	= true;		//是否需要检索卡片文本
	
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
		success 	: function(resInfo)
		{
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data = resInfo.data;
                if(data  != null)
                {
                    //var curCard = {"card":data,"mnt":false,"txt":false};
                    var imgLob 		= data.img;
                    var mntLob 		= data.mnt;
                    var cardInfo	= data.lpCardInfo;
                    var ceId		= cardInfo.ceId;
                    if(nThis.imgOcx != null)
                    {
                        if (imgLob != null && !WebUtil.isEmpty(imgLob.item))
                        {
                            var lob 	= imgLob.lob;
                            var item 	= imgLob.item;
                            nThis.imgOcx.HS_OCX_AppendCheckLPStrLob(ceId, cardId, lob.id, item.itemIndex, bty, ABISCode.LobDataType.IMG, lob.gid, cid, item.data,loc);
                        }
                        if (mntLob != null && !WebUtil.isEmpty(mntLob.item))
                        {
                            var lob 	= mntLob.lob;
                            var item	= mntLob.item;
                            nThis.imgOcx.HS_OCX_AppendCheckLPStrLob(ceId, cardId, lob.id, item.itemIndex, bty, ABISCode.LobDataType.MNT, lob.gid, cid, item.data,loc);
                        }
                        nThis.imgOcx.HS_OCX_SelectImageMnt(cardId, 0, bty, 0, 0, obj.imgType, obj.gid, cid);
                        nThis.imgOcx.HS_OCX_DoDigitMap(0);
                    }
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }

		},   
		error : function(e,status,error) 
		{   
		}   
	});
}


MatchCheck.prototype.selectedSrcFgp = function(id, bty, vid, fgp, cid, imgType, mntId)
{
	if(this.matchInfo==null){
		return;
	}
	var qryObj = this.matchInfo.qryObj;
	var srcCardId = qryObj.taskInfo.firstSrcCardId;
	if(fgp == 0)
	{
		fgp = 1;
	}
	this.searchBfvc(srcCardId, bty, vid, fgp, cid, imgType, mntId, false);
}

/** 切换候选卡指位*/
MatchCheck.prototype.selectedDstFgp = function(id, bty, vid, fgp, cid, imgType, mntId)
{
	this.searchBfvc(this.dstCardId, bty, vid, fgp, cid, imgType, mntId, true);
}

MatchCheck.prototype.searchBfvc = function(cardId, bty, vid, fgp, cid, imgType, mntId,isCand)
{
	if(cardId==null){
		return;
	}
    if (bty == null || vid == null || fgp == null || cid == null){
		//清空  TODO
        bty=vid=fgp=cid=imgType=mntId=undefined;
        this.imgOcx.HS_OCX_SelectImageMnt(cardId, 1, bty, vid, fgp, cid, imgType, mntId);
        this.imgOcx.HS_OCX_DoDigitMap(0);
	}
	var type = OCX.DataType.SRC;
	if(isCand == true)
	{
		type = OCX.DataType.CAND;
	}
	
	var isTP;
	var qryObj 		= this.matchInfo.qryObj;
	var qryType 	= qryObj.taskInfo.qryType;
	switch(qryType)
	{
		case ABISCode.QryType.TT:
			isTP = 1;
			break;
		case ABISCode.QryType.TL:
			isTP = isCand == true ? 0 : 1;
			break;
		case ABISCode.QryType.LT:
			isTP = isCand == true ? 1 : 0;
			break;
		case ABISCode.QryType.LL:
			isTP = 0;
			break;
	}
	
	var imgExists = this.imgOcx.HS_OCX_LobIsExist(cardId, isTP, bty, fgp, vid, ABISCode.LobDataType.IMG, imgType, cid);
	var mntExists = this.imgOcx.HS_OCX_LobIsExist(cardId, isTP, bty, fgp, vid, ABISCode.LobDataType.MNT, mntId, cid);
	if(imgExists === 0 && mntExists === 0)
 	{
		if(isTP === 1)
		{
			this.searchTP(cardId, bty, vid, fgp, cid, mntId, ABISCode.FGPDataType.ALL, imgType, type);
		}
		else
		{
			this.searchLP(cardId, bty, cid, ABISCode.FGPDataType.ALL, imgType, mntId, type);
		}
	}
	else if(imgExists === 0)//图像不存在去查找图像
	{
		if(isTP === 1)
		{
			this.searchTP(cardId, bty, vid, fgp, cid, mntId, ABISCode.FGPDataType.IMG, imgType, type);
		}
		else
		{
			this.searchLP(cardId, bty, cid, ABISCode.FGPDataType.IMG, imgType, mntId, type);
		}
	}
	else if(mntExists === 0)//特征不存在去查找特征
	{
		if(isTP === 1)
		{
			this.searchTP(cardId, bty, vid, fgp, cid, mntId, ABISCode.FGPDataType.MNT, imgType, type);
		}
		else
		{
			this.searchLP(cardId, bty, cid, ABISCode.FGPDataType.MNT, imgType, mntId, type);
		}
	}
	else
	{
		//图像和特征都存在
		this.imgOcx.HS_OCX_SelectImageMnt(cardId, isTP, bty, fgp, vid, imgType, mntId, cid);
        this.imgOcx.HS_OCX_DoDigitMap(0);
	}
}
/*展示候选列表*/
MatchCheck.prototype.showTable = function(){
	var e = $('#DownArea');
	var visible = e.is(":visible");
	if(visible){
		//e.hide();
		this.switchScreen = true;
		this.fullScreen();
		var nThis = this;
		setTimeout(function(){nThis.switchScreen = false},1000);
	}else{
		this.switchScreen = true;
		e.show();
		this.defaultLayout();
		var nThis = this;
		setTimeout(function(){nThis.switchScreen = false},1000);
	}
}
/*弹出候选列表*/
MatchCheck.prototype.alertTable = function(){
	var e = $('#DownArea');
	e.show();
    var d = dialog({
    	id: 'EF893L1',
     	height: 262,
     	width: 700,
    	onclose: function () {
    		e.hide();
    		$('.CenterLayout').append(e);  		
        },
    	quickClose: true,
        content:document.getElementById('DownArea')   
    });
    d.show(document.getElementById('ShowTable'));
}
/*弹出图像工具*/
var d;
MatchCheck.prototype.showTool = function(){
	if(d){
		d.open&&d.close();
		return false;
	}
	var e = $('.ImgProcessTool');
	var visible = e.is(":visible");
	e.show();
	var title = $('#ImgProView').find('.Title .TitleDesc').html();
    d = dialog({
    	title: title,
    	id: 'EF893L',
     	height: 350,
     	width: 300,
    	onclose: function () {
    		$('#ImgProView').append(e);
    		//非弹出可以用  相对html定位不准
    		$('.Slider').css({position: "absolute"});
    		setTimeout(function(){d=false},500);
        },
       // onblur:resetSlider,
       // onreset:resetSlider,
       // ondragend:resetSlider,
    	quickClose: true,
        content:e[0]   
    });
    d.show();
    var h2 = 442;
    var w2 = 342;
	var iframe  ='<iframe id="iframetool" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;width:'+w2+'px; height:'+h2+'px;z-index:-1; filter:alpha(opacity=0);"></iframe>'
    $('.ui-dialog-grid').append($(iframe));
}
