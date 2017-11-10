/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddLLHitlog(requiredField,updateField,colLens)
{	
	this.crolArray = new Array();
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.colLens = colLens;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent = $("#AddLLHitlog").parent();
	pageparent.scroll(function()
	{  		  
		$(".newMenu").css('display','none');
    }
    );
}
var textArray = new Array();
AddLLHitlog.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	
	this.srcCaseId 				= WebUI.createText("srcCaseIdId","srcCaseId","WebTextField","",this.requiredField);
	this.srcCaseId.setErrorTip("srcCaseId_tip");
	this.initMap(textArray,this.srcCaseId);
	
	this.srcCardId 				= WebUI.createText("srcCardIdId","srcCardId","WebTextField","",this.requiredField);
	this.srcCardId.setErrorTip("srcCardId_tip");
	this.initMap(textArray,this.srcCardId);
	
	this.destCaseId 			= WebUI.createText("destCaseIdId","destCaseId","WebTextField","",this.requiredField);
	this.destCaseId.setErrorTip("destCaseId_tip");
	this.initMap(textArray,this.destCaseId);
	
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
	
	this.srcCaseNum 			= WebUI.createText("srcCaseNumId","srcCaseNum","WebTextField","",this.requiredField);
	this.srcCaseNum.setErrorTip("srcCaseNum_tip");
	this.initMap(textArray,this.srcCaseNum);
	
	this.srcCardNum 			= WebUI.createText("srcCardNumId","srcCardNum","WebTextField","",this.requiredField);
	this.srcCardNum.setErrorTip("srcCardNum_tip");
	this.initMap(textArray,this.srcCardNum);
	
	this.srcCaseOccurDate 		= WebUI.createText("srcCaseOccurDateId","srcCaseOccurDate","WebTextField","",this.requiredField);
	this.srcCaseOccurDate.setErrorTip("srcCaseOccurDate_tip");
	this.initMap(textArray,this.srcCaseOccurDate);
	
	this.destCaseNum 			= WebUI.createText("destCaseNumId","destCaseNum","WebTextField","",this.requiredField);
	this.destCaseNum.setErrorTip("destCaseNum_tip");
	this.initMap(textArray,this.destCaseNum);
	
	this.destCardNum 			= WebUI.createText("destCardNumId","destCardNum","WebTextField","",this.requiredField);
	this.destCardNum.setErrorTip("destCardNum_tip");
	this.initMap(textArray,this.destCardNum);
	this.destCaseOccurDate 		= WebUI.createDateText("destCaseOccurDateId","destCaseOccurDate","WebTextField","",this.requiredField);
	//this.destCaseOccurDate 		= WebUI.createText("destCaseOccurDateId","destCaseOccurDate","WebTextField","",this.requiredField);
	this.destCaseOccurDate.setErrorTip("destCaseOccurDate_tip");
	this.initMap(textArray,this.destCaseOccurDate);
	
	this.checker 				= WebUI.createText("checkerId","checker","WebTextField","",this.requiredField);
	this.checker.setErrorTip("checker_tip");
	this.initMap(textArray,this.checker);
	
	this.checkDate 				= WebUI.createText("checkDateId","checkDate","WebTextField","",this.requiredField);
	this.checkDate.setErrorTip("checkDate_tip");
	this.initMap(textArray,this.checkDate);
	
	this.status 				= WebUI.createCombo("statusId","status",null,null,true,false,"LL_HITLOG_MAIN|STATUS","",this.requiredField);
	this.status.setErrorTip("status_tip");
	this.initMap(textArray,this.status);
	
	this.qryType 				= WebUI.createCombo("qryTypeId","qryType",null,null,true,false,"LL_HITLOG_MAIN|QRY_TYPE","",this.requiredField);
	this.qryType.setErrorTip("qryType_tip");
	this.initMap(textArray,this.qryType);
	
	this.enrollUnitCode 		= WebUI.createCombo("enrollUnitCodeId","enrollUnitCode",null,null,true,false,"LL_HITLOG_MAIN|UNIT_CODE","",this.requiredField);
	this.enrollUnitCode.setErrorTip("enrollUnitCode_tip");
	this.initMap(textArray,this.enrollUnitCode);
	
	this.srcCaseClassCode1 		= WebUI.createCombo("srcCaseClassCode1Id","srcCaseClassCode1",null,null,true,false,"LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1","",this.requiredField);
	this.srcCaseClassCode1.setErrorTip("srcCaseClassCode1_tip");
	this.initMap(textArray,this.srcCaseClassCode1);
	
	this.srcCaseClassCode2 		= WebUI.createCombo("srcCaseClassCode2Id","srcCaseClassCode2",null,null,true,false,"LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1","",this.requiredField);
	this.srcCaseClassCode2.setErrorTip("srcCaseClassCode2_tip");
	this.initMap(textArray,this.srcCaseClassCode2);
	
	this.srcCaseClassCode3 		= WebUI.createCombo("srcCaseClassCode3Id","srcCaseClassCode3",null,null,true,false,"LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1","",this.requiredField);
	this.srcCaseClassCode3.setErrorTip("srcCaseClassCode3_tip");
	this.initMap(textArray,this.srcCaseClassCode3);
	
	this.srcCaseSuperviseLevel 	= WebUI.createCombo("srcCaseSuperviseLevelId","srcCaseSuperviseLevel",null,null,true,false,"LL_HITLOG_MAIN|SRC_CASE_SUPERVISE_LEVEL","",this.requiredField);
	this.srcCaseSuperviseLevel.setErrorTip("srcCaseSuperviseLevel_tip");
	this.initMap(textArray,this.srcCaseSuperviseLevel);
	
	this.destCaseClassCode1 	= WebUI.createCombo("destCaseClassCode1Id","destCaseClassCode1",null,null,true,false,"LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1","",this.requiredField);
	this.destCaseClassCode1.setErrorTip("destCaseClassCode1_tip");
	this.initMap(textArray,this.destCaseClassCode1);
	
	this.destCaseClassCode2 	= WebUI.createCombo("destCaseClassCode2Id","destCaseClassCode2",null,null,true,false,"LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1","",this.requiredField);
	this.destCaseClassCode2.setErrorTip("destCaseClassCode2_tip");
	this.initMap(textArray,this.destCaseClassCode2);
	
	this.destCaseClassCode3 	= WebUI.createCombo("destCaseClassCode3Id","destCaseClassCode3",null,null,true,false,"LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1","",this.requiredField);
	this.destCaseClassCode3.setErrorTip("destCaseClassCode3_tip");
	this.initMap(textArray,this.destCaseClassCode3);
	
	this.destCaseSuperviseLevel = WebUI.createCombo("destCaseSuperviseLevelId","destCaseSuperviseLevel",null,null,true,false,"LL_HITLOG_MAIN|DEST_CASE_SUPERVISE_LEVEL","",this.requiredField);
	this.destCaseSuperviseLevel.setErrorTip("destCaseSuperviseLevel_tip");
	this.initMap(textArray,this.destCaseSuperviseLevel);
	
	this.btyFlag 				= WebUI.createCombo("btyFlagId","btyFlag",null,null,true,false,"LL_HITLOG_MAIN|BTY_FLAG","",this.requiredField);
	this.btyFlag.setErrorTip("btyFlag_tip");
	this.initMap(textArray,this.btyFlag);
	
	this.checkerUnitCode 		= WebUI.createCombo("checkerUnitCodeId","checkerUnitCode",null,"checkerUnitNameId",false,false,"LL_HITLOG_MAIN|UNIT_CODE","",this.requiredField);
	this.checkerUnitCode.setErrorTip("checkerUnitCode_tip");
	this.initMap(textArray,this.checkerUnitCode);
	
	this.checkerUnitName		= WebUI.createCodeText("checkerUnitNameId","checkerUnitName","Address",null,this.requiredField);
	this.checkerUnitName.setErrorTip("checkerUnitName_tip");
	this.initMap(textArray,this.checkerUnitName);
	
	this.comments 				= WebUI.createMulText("commentsId","comments","WebTextArea",null,this.requiredField);
	this.comments.setErrorTip("comments_tip");
	this.initMap(textArray,this.comments);
	
	this.destCaseNum.setEditable(false);
	this.srcCaseNum.setEditable(false);
	this.hitlogNum.setEditable(false);
	this.srcCaseSuperviseLevel.setEditable(false);
	this.destCaseSuperviseLevel.setEditable(false);
	this.srcCaseClassCode1.setEditable(false);
	this.srcCaseClassCode2.setEditable(false);
	this.srcCaseClassCode3.setEditable(false);
	this.destCaseClassCode1.setEditable(false);
	this.destCaseClassCode2.setEditable(false);
	this.destCaseClassCode3.setEditable(false);
	this.destCaseOccurDate.setEditable(false);
	this.srcCaseOccurDate.setEditable(false);
	$("#enrollUser").val(enrollUserStr); 
	this.enrollUnitCode.setComboCode(enrollUnitCodeStr); 
	$("#enrollTime").val(enrollTimeStr);
	this.qryType.setComboCode("4"); 
	this.initComboData();	
	this.setValidateColumns();
}
AddLLHitlog.prototype.initMap = function(map,contro)
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
AddLLHitlog.prototype.register = function(contro)
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
AddLLHitlog.prototype.isTxtInfoChanged = function()
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
AddLLHitlog.prototype.validateRequired = function()
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
AddLLHitlog.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddLLHitlog.prototype.initComboData=function()
{
	var columnnames = ['LL_HITLOG_MAIN|STATUS','LL_HITLOG_MAIN|QRY_TYPE','LL_HITLOG_MAIN|UNIT_CODE','LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1','LL_HITLOG_MAIN|SRC_CASE_SUPERVISE_LEVEL',
	                   'LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1','LL_HITLOG_MAIN|DEST_CASE_SUPERVISE_LEVEL','LL_HITLOG_MAIN|BTY_FLAG'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AddLLHitlog.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.status.setComboData(data['ll_hitlog_main|status']);
	this.qryType.setComboData(data['ll_hitlog_main|qry_type']);
	this.enrollUnitCode.setComboData(data['ll_hitlog_main|unit_code']);
	this.srcCaseClassCode1.setComboData(data['ll_hitlog_main|src_case_class_code_1']);
	this.srcCaseClassCode2.setComboData(data['ll_hitlog_main|src_case_class_code_1']);
	this.srcCaseClassCode3.setComboData(data['ll_hitlog_main|src_case_class_code_1']);
	this.srcCaseSuperviseLevel.setComboData(data['ll_hitlog_main|src_case_supervise_level']);
	this.destCaseClassCode1.setComboData(data['ll_hitlog_main|dest_case_class_code_1']);
	this.destCaseClassCode2.setComboData(data['ll_hitlog_main|dest_case_class_code_1']);
	this.destCaseClassCode3.setComboData(data['ll_hitlog_main|dest_case_class_code_1']);
	this.destCaseSuperviseLevel.setComboData(data['ll_hitlog_main|dest_case_supervise_level']);
	this.btyFlag.setComboData(data['ll_hitlog_main|bty_flag']);
	this.checkerUnitCode.setComboData(data['ll_hitlog_main|unit_code']);
}
AddLLHitlog.prototype.update = function(field)
{	
	for(var i = 0;i < this.crolArray.length;i++)
	{
	    var contral = crolArray[i];	
	    var id = contral.getId();
	    //禁止更新项验证
	    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	    if(!forbidden)
    	{
	    	 contral.setEditable(false);
    	}
	}
}

/**  验证文本  */
AddLLHitlog.prototype.setValidateColumns = function()
{
	if(this.colLens != null)
	{
		var srcCaseId = {};	
		srcCaseId.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_ID];
		this.srcCaseId.setValidateType(srcCaseId);
		
		var srcCardId = {};	
		srcCardId.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CARD_ID];
		this.srcCardId.setValidateType(srcCardId);
		
		var destCaseId = {};	
		destCaseId.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_ID];
		this.destCaseId.setValidateType(destCaseId);
		
		var destCardId = {};	
		destCardId.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CARD_ID];
		this.destCardId.setValidateType(destCardId);
		
		var hitlogNum = {};	
		hitlogNum.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.HITLOG_NUM];
		this.hitlogNum.setValidateType(hitlogNum);
		
		var rank = {};	
		rank.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.RANK];
		this.rank.setValidateType(rank);
		
		var score = {};	
		score.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SCORE];
		this.score.setValidateType(score);
		
		var enrollUser = {};	
		enrollUser.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.ENROLL_USER];
		this.enrollUser.setValidateType(enrollUser);
		
		var enrollTime = {};	
		enrollTime.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.ENROLL_TIME];
		this.enrollTime.setValidateType(enrollTime);
		
		var srcCaseNum = {};	
		srcCaseNum.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_NUM];
		this.srcCaseNum.setValidateType(srcCaseNum);
		
		var srcCardNum = {};	
		srcCardNum.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CARD_NUM];
		this.srcCardNum.setValidateType(srcCardNum);
		
		var srcCaseOccurDate = {};	
		srcCaseOccurDate.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_OCCUR_DATE];
		this.srcCaseOccurDate.setValidateType(srcCaseOccurDate);
		
		var destCaseNum = {};	
		destCaseNum.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_NUM];
		this.destCaseNum.setValidateType(destCaseNum);
		
		var destCardNum = {};	
		destCardNum.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CARD_NUM];
		this.destCardNum.setValidateType(destCardNum);
		
		var destCaseOccurDate = {};	
		destCaseOccurDate.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_OCCUR_DATE];
		this.destCaseOccurDate.setValidateType(destCaseOccurDate);
		
		var checker = {};	
		checker.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.CHECKER];
		this.checker.setValidateType(checker);
		
		var checkDate = {};	
		checkDate.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.CHECK_TIME];
		this.checkDate.setValidateType(checkDate);
		
		var status = {};	
		status.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.STATUS];
		this.status.setValidateType(status);
		
		var qryType = {};	
		qryType.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.QRY_TYPE];
		this.qryType.setValidateType(qryType);
		
		var enrollUnitCode = {};	
		enrollUnitCode.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.ENROLL_UNIT_CODE];
		this.enrollUnitCode.setValidateType(enrollUnitCode);
		
		var srcCaseClassCode1 = {};	
		srcCaseClassCode1.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_CLASS_CODE_1];
		this.srcCaseClassCode1.setValidateType(srcCaseClassCode1);
		
		var srcCaseClassCode2 = {};	
		srcCaseClassCode2.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_CLASS_CODE_2];
		this.srcCaseClassCode2.setValidateType(srcCaseClassCode2);
		
		var srcCaseClassCode3 = {};	
		srcCaseClassCode3.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_CLASS_CODE_3];
		this.srcCaseClassCode3.setValidateType(srcCaseClassCode3);
		
		var srcCaseSuperviseLevel = {};	
		srcCaseSuperviseLevel.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.SRC_CASE_SUPERVISE_LEVEL];
		this.srcCaseSuperviseLevel.setValidateType(srcCaseSuperviseLevel);
		
		var destCaseClassCode1 = {};	
		destCaseClassCode1.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_CLASS_CODE_1];
		this.destCaseClassCode1.setValidateType(destCaseClassCode1);
		
		var destCaseClassCode2 = {};	
		destCaseClassCode2.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_CLASS_CODE_2];
		this.destCaseClassCode2.setValidateType(destCaseClassCode2);
		
		var destCaseClassCode3 = {};	
		destCaseClassCode3.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_CLASS_CODE_3];
		this.destCaseClassCode3.setValidateType(destCaseClassCode3);
		
		var destCaseSuperviseLevel = {};	
		destCaseSuperviseLevel.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.DEST_CASE_SUPERVISE_LEVEL];
		this.destCaseSuperviseLevel.setValidateType(destCaseSuperviseLevel);
		
		var btyFlag = {};	
		btyFlag.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.BTY_FLAG];
		this.btyFlag.setValidateType(btyFlag);
		
		var checkerUnitCode = {};	
		checkerUnitCode.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.CHECKER_UNIT_CODE];
		this.checkerUnitCode.setValidateType(checkerUnitCode);
		
		var checkerUnitName = {};	
		checkerUnitName.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.CHECKER_UNIT_NAME];
		this.checkerUnitName.setValidateType(checkerUnitName);
		
		var comments = {};	
		comments.maxlength = this.colLens["LL_HITLOG_MAIN"][LLHitlogMainCol.COMMENTS];
		this.comments.setValidateType(comments);
	}
}

AddLLHitlog.prototype.setLPRows = function(rows,searchStr)
{
	var url = WebVar.VarPath + "/hitlog/lllist/getCLPCase/" + rows[0].ID;
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
					var breakInfo = data.breakInfo;
					var basicInfo = data.basicInfo;
					var acceptInfo = data.acceptInfo;
					var registerInfo = data.registerInfo;
					var cards = data.cards;
					if(!WebUtil.isNull(mainInfo))
					{
						$("#srcCaseId").val(mainInfo.id); 
						$("#hitlogNum").val(mainInfo.ceNum); 
						$("#srcCaseNum").val(mainInfo.ceNum); 
					}
					if(!WebUtil.isNull(basicInfo))
					{
						vthis.srcCaseClassCode1.setComboCode(basicInfo.ceClassCode1);
						vthis.srcCaseClassCode2.setComboCode(basicInfo.ceClassCode2);
						vthis.srcCaseClassCode3.setComboCode(basicInfo.ceClassCode3);
						vthis.srcCaseSuperviseLevel.setComboCode(basicInfo.superviseLevel);
						$("#srcCaseOccurDate").val(basicInfo.ceOccurDate); 
					}
					if(!WebUtil.isNull(cards))
					{
						$("#srcCardId").val(cards[0].lpCardInfo.id); 
						$("#srcCardNum").val(cards[0].lpCardInfo.cardNum); 
					}
				}
			},   
			error : function(e) 
			{   
				DialogUtil.openSimpleDialog(""+searchStr.QueryError+"!");
			}   
		}
	);
}

AddLLHitlog.prototype.setLPRows1 = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/hitlog/lllist/getCLPCase/" + rows[0].ID;
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
					var breakInfo = data.breakInfo;
					var basicInfo = data.basicInfo;
					var acceptInfo = data.acceptInfo;
					var registerInfo = data.registerInfo;
					var cards = data.cards;
					if(!WebUtil.isNull(mainInfo))
					{
						$("#destCaseId").val(mainInfo.id); 
						$("#destCaseNum").val(mainInfo.ceNum); 
					}
					if(!WebUtil.isNull(basicInfo))
					{
						vthis.destCaseClassCode1.setComboCode(basicInfo.ceClassCode1);
						vthis.destCaseClassCode2.setComboCode(basicInfo.ceClassCode2);
						vthis.destCaseClassCode3.setComboCode(basicInfo.ceClassCode3);
						vthis.destCaseSuperviseLevel.setComboCode(basicInfo.superviseLevel);
						$("#destCaseOccurDate").val(basicInfo.ceOccurDate); 
					}
					if(!WebUtil.isNull(cards))
					{
						$("#destCardId").val(cards[0].lpCardInfo.id); 
						$("#destCardNum").val(cards[0].lpCardInfo.cardNum); 
					}
				}
			},   
			error : function(e) 
			{   
				DialogUtil.openSimpleDialog(""+searchStr.QueryError+"!");
			}   
		}
	);
}

