/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddTTHitlog(requiredField,updateField,colLens)
{	
	this.crolArray = new Array();
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.colLens = colLens;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent = $("#AddTTHitlog").parent();
	pageparent.scroll(function()
	{  		  
		$(".newMenu").css('display','none');
    }
    );
}

var textArray = new Array();
AddTTHitlog.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	
	this.srcCardId 				= WebUI.createText("srcCardIdId","srcCardId","WebTextField","",this.requiredField);
	this.srcCardId.setErrorTip("srcCardId_tip");
	this.initMap(textArray,this.srcCardId);
	
	this.destCardId 			= WebUI.createText("destCardIdId","destCardId","WebTextField","",this.requiredField);
	this.destCardId.setErrorTip("destCardId_tip");
	this.initMap(textArray,this.destCardId);
	
	//比中信息							
	this.hitlogNum 				= WebUI.createText("hitlogNumId","hitlogNum","WebTextField","",this.requiredField);
	this.hitlogNum.setErrorTip("hitlogNum_tip");
	this.initMap(textArray,this.hitlogNum);
	
	this.rank 					= WebUI.createText("rankId","rank","WebTextField","",this.requiredField);
	this.rank.setErrorTip("rank_tip");
	this.initMap(textArray,this.rank);
	
	this.score 					= WebUI.createText("scoreId","score","WebTextField","",this.requiredField);
	this.score.setErrorTip("score_tip");
	this.initMap(textArray,this.score);
	
	this.enrollUser 			= WebUI.createText("enrollUserId","enrollUser","WebTextField","",this.requiredField);
	this.enrollUser.setErrorTip("enrollUser_tip");
	this.initMap(textArray,this.enrollUser);
	
	this.enrollTime 			= WebUI.createText("enrollTimeId","enrollTime","WebTextField","",this.requiredField);
	this.enrollTime.setErrorTip("enrollTime_tip");
	this.initMap(textArray,this.enrollTime);
	
	this.srcCardNum 			= WebUI.createText("srcCardNumId","srcCardNum","WebTextField","",this.requiredField);
	this.srcCardNum.setErrorTip("srcCardNum_tip");
	this.initMap(textArray,this.srcCardNum);
	
	this.srcPersonName 			= WebUI.createText("srcPersonNameId","srcPersonName","WebTextField","",this.requiredField);
	this.srcPersonName.setErrorTip("srcPersonName_tip");
	this.initMap(textArray,this.srcPersonName);
	
	this.srcPersonBirthDate 	= WebUI.createText("srcPersonBirthDateId","srcPersonBirthDate","WebTextField","",this.requiredField);
	this.srcPersonBirthDate.setErrorTip("srcPersonBirthDate_tip");
	this.initMap(textArray,this.srcPersonBirthDate);
	
	this.srcPersonShenfenId 	= WebUI.createText("srcPersonShenfenIdId","srcPersonShenfenId","WebTextField","",this.requiredField);
	this.srcPersonShenfenId.setErrorTip("srcPersonShenfenId_tip");
	this.initMap(textArray,this.srcPersonShenfenId);
	
	this.srcPersonPrintDate 	= WebUI.createText("srcPersonPrintDateId","srcPersonPrintDate","WebTextField","",this.requiredField);
	this.srcPersonPrintDate.setErrorTip("srcPersonPrintDate_tip");
	this.initMap(textArray,this.srcPersonPrintDate);
	
	this.destCardNum 			= WebUI.createText("destCardNumId","destCardNum","WebTextField","",this.requiredField);
	this.destCardNum.setErrorTip("destCardNum_tip");
	this.initMap(textArray,this.destCardNum);
	
	this.destPersonName 		= WebUI.createText("destPersonNameId","destPersonName","WebTextField","",this.requiredField);
	this.destPersonName.setErrorTip("destPersonName_tip");
	this.initMap(textArray,this.destPersonName);
	
	this.destPersonBirthDate 	= WebUI.createText("destPersonBirthDateId","destPersonBirthDate","WebTextField","",this.requiredField);
	this.destPersonBirthDate.setErrorTip("destPersonBirthDate_tip");
	this.initMap(textArray,this.destPersonBirthDate);
	
	this.destPersonShenfenId 	= WebUI.createText("destPersonShenfenIdId","destPersonShenfenId","WebTextField","",this.requiredField);
	this.destPersonShenfenId.setErrorTip("destPersonShenfenId_tip");
	this.initMap(textArray,this.destPersonShenfenId);
	
	this.destPersonPrintDate 	= WebUI.createText("destPersonPrintDateId","destPersonPrintDate","WebTextField","",this.requiredField);
	this.destPersonPrintDate.setErrorTip("destPersonPrintDate_tip");
	this.initMap(textArray,this.destPersonPrintDate);
	
	this.checker 				= WebUI.createText("checkerId","checker","WebTextField","",this.requiredField);
	this.checker.setErrorTip("checker_tip");
	this.initMap(textArray,this.checker);
	
	this.checkDate 				= WebUI.createText("checkDateId","checkDate","WebTextField","",this.requiredField);
	this.checkDate.setErrorTip("checkDate_tip");
	this.initMap(textArray,this.checkDate);
	
	
	this.status 				= WebUI.createCombo("statusId","status",null,null,true,false,"TT_HITLOG_MAIN|STATUS","",this.requiredField);
	this.status.setErrorTip("status_tip");
	this.initMap(textArray,this.status);
	
	this.qryType 				= WebUI.createCombo("qryTypeId","qryType",null,null,true,false,"TT_HITLOG_MAIN|QRY_TYPE","",this.requiredField);
	this.qryType.setErrorTip("qryType_tip");
	this.initMap(textArray,this.qryType);
	
	this.enrollUnitCode 		= WebUI.createCombo("enrollUnitCodeId","enrollUnitCode",null,null,true,false,"TT_HITLOG_MAIN|UNIT_CODE","",this.requiredField);
	this.enrollUnitCode.setErrorTip("enrollUnitCode_tip");
	this.initMap(textArray,this.enrollUnitCode);
	
	this.isDirectCaptured 		= WebUI.createCombo("isDirectCapturedId","isDirectCaptured",null,null,true,false,"TT_HITLOG_MAIN|IS_DIRECT_CAPTURED","",this.requiredField);
	this.isDirectCaptured.setErrorTip("isDirectCaptured_tip");
	this.initMap(textArray,this.isDirectCaptured);
	
	this.isWantedHit 			= WebUI.createCombo("isWantedHitId","isWantedHit",null,null,true,false,"TT_HITLOG_MAIN|IS_WANTED_HIT","",this.requiredField);
	this.isWantedHit.setErrorTip("isWantedHit_tip");
	this.initMap(textArray,this.isWantedHit);
	
	this.srcPersonSexCode 		= WebUI.createCombo("srcPersonSexCodeId","srcPersonSexCode",null,null,true,false,"TT_HITLOG_MAIN|SRC_PERSON_SEX_CODE","",this.requiredField);
	this.srcPersonSexCode.setErrorTip("srcPersonSexCode_tip");
	this.initMap(textArray,this.srcPersonSexCode);
	
	this.destPersonSexCode 		= WebUI.createCombo("destPersonSexCodeId","destPersonSexCode",null,null,true,false,"TT_HITLOG_MAIN|DEST_PERSON_SEX_CODE","",this.requiredField);
	this.destPersonSexCode.setErrorTip("destPersonSexCode_tip");
	this.initMap(textArray,this.destPersonSexCode);
	
	this.btyFlag 				= WebUI.createCombo("btyFlagId","btyFlag",null,null,true,false,"TT_HITLOG_MAIN|BTY_FLAG","",this.requiredField);
	this.btyFlag.setErrorTip("btyFlag_tip");
	this.initMap(textArray,this.btyFlag);
	
	this.checkerUnitCode 		= WebUI.createCombo("checkerUnitCodeId","checkerUnitCode",null,"checkerUnitNameId",false,false,"TT_HITLOG_MAIN|UNIT_CODE","",this.requiredField);
	this.checkerUnitCode.setErrorTip("checkerUnitCode_tip");
	this.initMap(textArray,this.checkerUnitCode);
	
	this.checkerUnitName		= WebUI.createCodeText("checkerUnitNameId","checkerUnitName","Address","",this.requiredField);
	this.checkerUnitName.setErrorTip("checkerUnitName_tip");
	this.initMap(textArray,this.checkerUnitName);
	
	this.comments 				= WebUI.createMulText("commentsId","comments","WebTextArea",null,this.requiredField);
	this.comments.setErrorTip("comments_tip");
	this.initMap(textArray,this.comments);

	this.srcCardNum.setEditable(false);
	this.destCardNum.setEditable(false);
	this.enrollUser.setEditable(false);
	this.enrollTime.setEditable(false);
	this.enrollUnitCode.setEditable(false);
	this.destPersonName.setEditable(false);
	this.srcPersonName.setEditable(false);
	this.srcPersonBirthDate.setEditable(false);
	this.srcPersonShenfenId.setEditable(false);
	this.srcPersonPrintDate.setEditable(false);
	this.destPersonBirthDate.setEditable(false);
	this.destPersonShenfenId.setEditable(false);
	this.destPersonPrintDate.setEditable(false);
	this.srcPersonSexCode.setEditable(false);
	this.destPersonSexCode.setEditable(false);
	this.hitlogNum.setEditable(false);
	this.qryType.setComboCode("1");
	this.initComboData();	
	this.setValidateColumns();
}

AddTTHitlog.prototype.initMap = function(map,contro)
{
	map.push(contro);
	var required = WebArrayUtil.containsToIgnoreCase(this.requiredField,contro.getId());
	var update = WebArrayUtil.containsToIgnoreCase(this.updateField,contro.getId());
	if(required)
	{
		this.requiredMap.push(contro);	
	}
	if(update)
	{
		this.updateMap.push(contro);	
	}
}

AddTTHitlog.prototype.register = function(contro)
{
	var nthis = this;
	contro.addChangeListener(textChange);
	function textChange()
	{				
		var id = contro.getId();		 
		var oldtext = nthis.srcCardObj[id];		
		if(oldtext == null) oldtext = "";
		oldtext += "";
		var text = contro.getValue();		
		if(text != oldtext)
		{
		   nthis.changeField[id] = true;		  
		   flag = true;
		}	
		else
		{
			nthis.changeField[id] = false;
			flag = false;
		}
		if(WebUtil.isFunction(nthis.changeListener))
		{
			nthis.changeListener(flag);	
		}
	}
}

//编辑页面的信息是否发生了变化
AddTTHitlog.prototype.isTxtInfoChanged = function()
{	
	var flag = false;
	for(var name in this.changeField)
	{
		if(this.changeField[name])
		{
			flag = true;
		    break;
		}					 
	}	    
	return flag;
}

//验证所有必填项是否都填了
AddTTHitlog.prototype.validateRequired = function()
{
	var flag = true;
	//验证必填项是否都填了
	var n = 0;
	for(var i = 0;i < this.requiredMap.length;i++)
	{
		 var text = this.requiredMap[i].getText();
		 if(text == null || text == "")
			 n = n+1;
	}		
	if(n > 0)
	{
		flag = false;
	}
	return flag;
}

/**
 * 注册文本改变事件
 * @param {Object} listener
 */
AddTTHitlog.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}

AddTTHitlog.prototype.initComboData=function()
{
	var columnnames = ['TT_HITLOG_MAIN|STATUS','TT_HITLOG_MAIN|QRY_TYPE','TT_HITLOG_MAIN|UNIT_CODE','TT_HITLOG_MAIN|IS_DIRECT_CAPTURED','TT_HITLOG_MAIN|IS_WANTED_HIT',
	                   'TT_HITLOG_MAIN|SRC_PERSON_SEX_CODE','TT_HITLOG_MAIN|DEST_PERSON_SEX_CODE','TT_HITLOG_MAIN|BTY_FLAG','TT_HITLOG_MAIN|UNIT_CODE'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}

AddTTHitlog.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.status.setComboData(data['tt_hitlog_main|status']);
	this.qryType.setComboData(data['tt_hitlog_main|qry_type']);
	this.enrollUnitCode.setComboData(data['tt_hitlog_main|unit_code']);
	this.isDirectCaptured.setComboData(data['tt_hitlog_main|is_direct_captured']);
	this.isWantedHit.setComboData(data['tt_hitlog_main|is_wanted_hit']);
	this.srcPersonSexCode.setComboData(data['tt_hitlog_main|src_person_sex_code']);
	this.destPersonSexCode.setComboData(data['tt_hitlog_main|dest_person_sex_code']);
	this.btyFlag.setComboData(data['tt_hitlog_main|bty_flag']);
	this.checkerUnitCode.setComboData(data['tt_hitlog_main|unit_code']);
}

/**  验证文本  */
AddTTHitlog.prototype.setValidateColumns = function()
{
	if(this.colLens != null)
	{
		var srcCardId = {};	
		srcCardId.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_CARD_ID];
		this.srcCardId.setValidateType(srcCardId);
		
		var destCardId = {};	
		destCardId.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_CARD_ID];
		this.destCardId.setValidateType(destCardId);
		
		var hitlogNum = {};	
		hitlogNum.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.HITLOG_NUM];
		this.hitlogNum.setValidateType(hitlogNum);
		
		var rank = {};	
		rank.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.RANK];
		this.rank.setValidateType(rank);
		
		var score = {};	
		score.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SCORE];
		this.score.setValidateType(score);
		
		var enrollUser = {};	
		enrollUser.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.ENROLL_USER];
		this.enrollUser.setValidateType(enrollUser);
		
		var enrollTime = {};	
		enrollTime.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.ENROLL_TIME];
		this.enrollTime.setValidateType(enrollTime);
		
		var srcCardNum = {};	
		srcCardNum.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_CARD_NUM];
		this.srcCardNum.setValidateType(srcCardNum);
		
		var srcPersonName = {};	
		srcPersonName.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_PERSON_NAME];
		this.srcPersonName.setValidateType(srcPersonName);
		
		var srcPersonBirthDate = {};	
		srcPersonBirthDate.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_PERSON_BIRTH_DATE];
		this.srcPersonBirthDate.setValidateType(srcPersonBirthDate);
		
		var srcPersonShenfenId = {};	
		srcPersonShenfenId.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_PERSON_SHENFEN_ID];
		this.srcPersonShenfenId.setValidateType(srcPersonShenfenId);
		
		var srcPersonPrintDate = {};	
		srcPersonPrintDate.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_PERSON_PRINT_DATE];
		this.srcPersonPrintDate.setValidateType(srcPersonPrintDate);
		
		var destCardNum = {};	
		destCardNum.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_CARD_NUM];
		this.destCardNum.setValidateType(destCardNum);
		
		var destPersonName = {};	
		destPersonName.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_PERSON_NAME];
		this.destPersonName.setValidateType(destPersonName);
		
		var destPersonBirthDate = {};	
		destPersonBirthDate.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_PERSON_BIRTH_DATE];
		this.destPersonBirthDate.setValidateType(destPersonBirthDate);
		
		var destPersonShenfenId = {};	
		destPersonShenfenId.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_PERSON_SHENFEN_ID];
		this.destPersonShenfenId.setValidateType(destPersonShenfenId);
		
		var destPersonPrintDate = {};	
		destPersonPrintDate.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_PERSON_PRINT_DATE];
		this.destPersonPrintDate.setValidateType(destPersonPrintDate);
		
		var checker = {};	
		checker.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.CHECKER];
		this.checker.setValidateType(checker);
		
		var checkDate = {};	
		checkDate.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.CHECK_TIME];
		this.checkDate.setValidateType(checkDate);
		
		var status = {};	
		status.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.STATUS];
		this.status.setValidateType(status);
		
		var qryType = {};	
		qryType.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.QRY_TYPE];
		this.qryType.setValidateType(qryType);
		
		var enrollUnitCode = {};	
		enrollUnitCode.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.ENROLL_UNIT_CODE];
		this.enrollUnitCode.setValidateType(enrollUnitCode);
		
		var isDirectCaptured = {};	
		isDirectCaptured.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.IS_DIRECT_CAPTURED];
		this.isDirectCaptured.setValidateType(isDirectCaptured);
		
		var isWantedHit = {};	
		isWantedHit.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.IS_WANTED_HIT];
		this.isWantedHit.setValidateType(isWantedHit);
		
		var srcPersonSexCode = {};	
		srcPersonSexCode.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.SRC_PERSON_SEX_CODE];
		this.srcPersonSexCode.setValidateType(srcPersonSexCode);
		
		var destPersonSexCode = {};	
		destPersonSexCode.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.DEST_PERSON_SEX_CODE];
		this.destPersonSexCode.setValidateType(destPersonSexCode);
		
		var btyFlag = {};	
		btyFlag.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.BTY_FLAG];
		this.btyFlag.setValidateType(btyFlag);
		
		var checkerUnitCode = {};	
		checkerUnitCode.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.CHECKER_UNIT_CODE];
		this.checkerUnitCode.setValidateType(checkerUnitCode);
		
		var checkerUnitName = {};	
		checkerUnitName.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.CHECKER_UNIT_NAME];
		this.checkerUnitName.setValidateType(checkerUnitName);
		
		var comments = {};	
		comments.maxlength = this.colLens["TT_HITLOG_MAIN"][TTHitlogMainCol.COMMENTS];
		this.comments.setValidateType(comments);
	}
}

AddTTHitlog.prototype.update = function(field)
{	
	for(var i = 0;i < this.crolArray.length;i++)
	{
	     var contral = crolArray[i];	
	     var id = contral.getId();
	     //禁止更新项验证
	     var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	     if(!forbidden)
	    	 contral.setEditable(false);
	}
}

AddTTHitlog.prototype.setTPRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/hitlog/ttlist/getCTPCard/" + rows[0].ID;
	var vthis = this;
	jQuery.ajax 
	( 
        {
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : null,
			dataType : 'json',
			success : function(data) 
			{   
				if(data != null)
				{
					var mainInfo = data.mainInfo;
					var tpCardInfo = data.tpCardInfo;
					var basicInfo = data.basicInfo;
					var certInfos = data.certInfos;
					var addrInfos = data.addrInfos;
					var bodyInfo = data.bodyInfo;
					if(!WebUtil.isNull(mainInfo))
					{
						$("#enrollUser").val(mainInfo.iniEnrollUser); 
						$("#enrollTime").val(mainInfo.iniEnrollTime); 
						vthis.enrollUnitCode.setComboCode(mainInfo.iniEnrollUnitCode);
					}
					if(!WebUtil.isNull(tpCardInfo))
					{
						$("#srcCardId").val(tpCardInfo.id); 
						$("#hitlogNum").val(tpCardInfo.cardNum); 
						$("#srcCardNum").val(tpCardInfo.cardNum); 
						$("#srcPersonPrintDate").val(tpCardInfo.printDate); 
						
					}
					if(!WebUtil.isNull(basicInfo))
					{
						$("#srcPersonName").val(basicInfo.name); 
						vthis.srcPersonSexCode.setComboCode(basicInfo.sexCode);
						$("#srcPersonBirthDate").val(basicInfo.birthDate); 
						$("#srcPersonShenfenId").val(basicInfo.shenfenId);
					}
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

AddTTHitlog.prototype.setTPRows1 = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/hitlog/ttlist/getCTPCard/" + rows[0].ID;
	var vthis = this;
	jQuery.ajax 
	( 
        {
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : null,
			dataType : 'json',
			success : function(data) 
			{   
				if(data != null)
				{
					var mainInfo = data.mainInfo;
					var tpCardInfo = data.tpCardInfo;
					var basicInfo = data.basicInfo;
					var certInfos = data.certInfos;
					var addrInfos = data.addrInfos;
					var bodyInfo = data.bodyInfo;
					if(!WebUtil.isNull(tpCardInfo))
					{
						$("#destCardId").val(tpCardInfo.id); 
						$("#destCardNum").val(tpCardInfo.cardNum); 
						$("#destPersonPrintDate").val(tpCardInfo.printDate);
					}
					if(!WebUtil.isNull(basicInfo))
					{
						$("#destPersonName").val(basicInfo.name); 
						vthis.destPersonSexCode.setComboCode(basicInfo.sexCode);
						$("#destPersonBirthDate").val(basicInfo.birthDate);
						$("#destPersonShenfenId").val(basicInfo.shenfenId);
						$("#destPersonShenfenId").val(basicInfo.shenfenId);
					}
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

