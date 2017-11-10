
LPCaseInfo.prototype.res = null;


function LPCaseInfo(res)
{
	this.res = res;
	this.init();
}

LPCaseInfo.prototype.init = function()
{
	
	var tblParam =
	{
		link:{cols:["CARD_NUM"],callBack: selectLPCard},
		language:pageNumStr
	}
	function selectLPCard(row,colName)
	{
		switch(colName)
		{
			case "CARD_NUM":
				window.open(WebVar.VarPath+"/lp/detail/"+row.ID,"_blank");
			break;
		}
	}
	
	// 现场卡片列表
	var tbMgr = new WebTableMgr("cardTable","cardPageBar",5,tblParam);
	tbMgr.setInput(this.res);
	
}

LPCaseInfo.prototype.hiddenCardList = function()
{
	$("#LPCardList").hide();
}

LPCaseInfo.prototype.clear = function()
{
	$("#ceNumId").html("");
	$("#dbidId").html("");
	$("#ceStatusId").html("");
	$("#ceTypeId").html("");
	$("#createUserId").html("");
	$("#createTimeId").html("");
	$("#updateUserId").html("");
	$("#updateTimeId").html("");
	$("#createUnitCodeId").html("");
	$("#updateUnitCodeId").html("");
	$("#ceNameId").html("");
    $("#abisCeNumId").html("");
    $("#sceneInvestNumId").html("");
    $("#policeNumId").html("");
	$("#mainInfocommentsId").html("");
	
	$("#ceOccurPlaceCodeId").html("");
	$("#ceOccurPlaceId").html("");
	$("#ceOccurDateId").html("");
	$("#hasPersonKilledId").html("");
	$("#superviseLevelId").html("");
	$("#personKilledCntId").html("");
	$("#ceClassCode1Id").html("");
	$("#ceClassCode2Id").html("");
	$("#ceClassCode3Id").html("");
	$("#caseLossId").html("");
	$("#cePremiumId").html("");
	$("#acceptOperatorId").html("");
	$("#acceptTimeId").html("");
	$("#acceptUnitCodeId").html("");
	$("#acceptUnitNameId").html("");
	$("#acceptPlaceNameId").html("");
	$("#acceptInfocommentsId").html("");
	
	$("#regiApproverId").html("");
	$("#regiTimeId").html("");
	$("#regiUnitCodeId").html("");
	$("#regiUnitNameId").html("");
	
	$("#breakDateId").html("");
	$("#breakDateTypeCodeId").html("");
	$("#breakMethodCodeId").html("");
	$("#breakMethodDescId").html("");
	
	$("#extractDateId").html("");
	$("#extractor1Id").html("");
	$("#extractor2Id").html("");
	$("#extractor3Id").html("");
	$("#extractUnitCodeId").html("");
	$("#extractUnitNameId").html("");
	$("#extractInfocommentsId").html("");
	
	$("#cancelDateId").html("");
	$("#cancelReasonCodeId").html("");
	
	$("#ceSuspiciousAreaCode1Id").html("");
	$("#ceSuspiciousAreaCode2Id").html("");
	$("#ceSuspiciousAreaCode3Id").html("");
	
	
}

LPCaseInfo.prototype.setCaseObj = function(caseObj)
{
	this.clear();
	
	if(caseObj == null)return;
	var mainInfo = caseObj.mainInfo;
	var breakInfo = caseObj.breakInfo;
	var basicInfo = caseObj.basicInfo;
	var acceptInfo = caseObj.acceptInfo;
	var registerInfo = caseObj.registerInfo;
	var extractInfo = caseObj.extractInfo;
	var cancelInfo = caseObj.cancelInfo;
	var coopInvestInfo = caseObj.coopInvestInfo;
	if(mainInfo != null && mainInfo != "")
	{
		$("#ceNumId").html(mainInfo.ceNum);
		$("#dbidId").html(mainInfo.dbidText);
		$("#ceStatusId").html(mainInfo.ceStatusText);
		$("#ceTypeId").html(mainInfo.ceTypeText);
		$("#createUserId").html(mainInfo.createUser);
		$("#createTimeId").html(mainInfo.createTime);
		$("#updateUserId").html(mainInfo.updateUser);
		$("#updateTimeId").html(mainInfo.updateTime);
		$("#createUnitCodeId").html(mainInfo.createUnitCodeText);
		$("#updateUnitCodeId").html(mainInfo.updateUnitCodeText);
		$("#ceNameId").html(mainInfo.ceName);
        $("#abisCeNumId").html(mainInfo.abisCeNum);
        $("#sceneInvestNumId").html(mainInfo.sceneInvestNum);
        $("#policeNumId").html(mainInfo.policeNum);
		
	}
	
	if(basicInfo != null && basicInfo != "")
	{
		$("#ceOccurPlaceCodeId").html(basicInfo.ceOccurPlaceCode);
		$("#ceOccurPlaceId").html(basicInfo.ceOccurPlace);
		$("#ceOccurDateId").html(basicInfo.ceOccurDate);
		$("#hasPersonKilledId").html(basicInfo.hasPersonKilledText);
		
		$("#personKilledCntId").html(basicInfo.personKilledCnt);
		$("#ceClassCode1Id").html(basicInfo.ceClassCode1Text);
		$("#ceClassCode2Id").html(basicInfo.ceClassCode2Text);
		$("#ceClassCode3Id").html(basicInfo.ceClassCode3Text);
		$("#caseLossId").html(basicInfo.caseLoss);
		$("#cePremiumId").html(basicInfo.cePremium);
		$("#ceSuspiciousAreaCode1Id").html(basicInfo.ceSuspiciousAreaCode1Text);
		$("#ceSuspiciousAreaCode2Id").html(basicInfo.ceSuspiciousAreaCode2Text);
		$("#ceSuspiciousAreaCode3Id").html(basicInfo.ceSuspiciousAreaCode3Text);
		$("#mainInfocommentsId").html(basicInfo.ceComments);
	}
	
	if(acceptInfo != null && acceptInfo != "")
	{
		$("#acceptOperatorId").html(acceptInfo.acceptOperator);
		$("#acceptTimeId").html(acceptInfo.acceptTime);
		$("#acceptUnitCodeId").html(acceptInfo.acceptUnitCodeText);
		$("#acceptUnitNameId").html(acceptInfo.acceptUnitName);
		$("#acceptPlaceNameId").html(acceptInfo.acceptPlaceName);
		$("#acceptInfocommentsId").html(acceptInfo.acceptComments);
	}
	
	if(registerInfo != null && registerInfo != "")
	{
		$("#regiApproverId").html(registerInfo.regiApprover);
		$("#regiTimeId").html(registerInfo.regiTime);
		$("#regiUnitCodeId").html(registerInfo.regiUnitCodeText);
		$("#regiUnitNameId").html(registerInfo.regiUnitName);
	}
	
	if(breakInfo != null && breakInfo != "")
	{
		$("#breakDateId").html(breakInfo.breakDate);
		$("#breakDateTypeCodeId").html(breakInfo.breakDateTypeCodeText);
		$("#breakMethodCodeId").html(breakInfo.breakMethodCodeText);
		$("#breakMethodDescId").html(breakInfo.breakMethodDesc);
	}
	
	if(extractInfo != null && extractInfo != "")
	{
		$("#extractDateId").html(extractInfo.extractDate);
		$("#extractor1Id").html(extractInfo.extractor1);
		$("#extractor2Id").html(extractInfo.extractor2);
		$("#extractor3Id").html(extractInfo.extractor3);
		$("#extractUnitCodeId").html(extractInfo.extractUnitCode);
		$("#extractUnitNameId").html(extractInfo.extractUnitName);
		$("#extractInfocommentsId").html(extractInfo.extractComments);
	}
	
	if(cancelInfo != null && cancelInfo != "")
	{
		$("#cancelDateId").html(cancelInfo.cancelDate);
		$("#cancelReasonCodeId").html(cancelInfo.cancelReasonCodeText);
	}
	if(coopInvestInfo != null && coopInvestInfo != ""){
		$("#superviseLevelId").html(coopInvestInfo.superviseLevelText);		
	}
}


