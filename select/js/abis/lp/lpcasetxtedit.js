//文本编辑模式(编辑|扫描)
var LPTxtMode=
{
	INPUT:0,
	EDIT:1
}

LPCaseEditPage.prototype.requiredField 	= null;
LPCaseEditPage.prototype.updateField 	= null;
LPCaseEditPage.prototype.mode 			= null;

function LPCaseEditPage(requiredField,updateField,defValue,mode)
{	
	this.requiredField	= requiredField;
	this.updateField	= updateField;
	this.defValue		= defValue;
	this.mode 			= mode;
	
	this.init();	
	
	this.update(updateField);	//现行阶段毙掉更新项
	
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#caseeditpage").parent();
	pageparent.scroll
	(
		function()
		{  		  
			$(".newMenu").css('display','none');
		}
	);
	
	this.registerTxtChangeListener();
	
}

LPCaseEditPage.prototype.init = function()
{
	this.initUI();
	this.initData();
	//this.initUIStatus();
}

LPCaseEditPage.prototype.initUIStatus = function(mode)
{
	//案件信息编辑页面，初始化应为新增，但是open case之后为编辑状态， 所以 初始化执行 initUIStatus 意义不大
	if(mode == LPTxtMode.EDIT)
	{
		this.ceNum.setEditable(false);
        this.abisCeNum.setEditable(false);
		this.dbCombo.setEditable(false);
	}else{
		this.ceNum.setEditable(true);
        this.abisCeNum.setEditable(true);
		this.dbCombo.setEditable(true);
	}
}
/*
 * 根据页面div  生成控件，并且放到相应对象中
 */
LPCaseEditPage.prototype.initUI = function()
{
	this.filedMap 		= {};
	//页面控件 的 容器
	this.crolArray		= new Array();
	
	//必填项
	this.requiredMap 	= new Array();
	
	//更新项
	this.updateMap 		= new Array();
	
	this.changeField 	= {};
	
	// 案件主要信息
	var mainInfoArray=new Array();
    this.ceNum = WebUI.createText("mainInfo_cenum",CaseEventCol.CE_NUM,"WebTextField","",this.requiredField);
    this.ceNum.setErrorTip("mainInfo_cenum_tip");
    this.initMap(mainInfoArray,this.ceNum);
	this.abisCeNum = WebUI.createText("mainInfo_abisCeNum",CaseEventCol.ABIS_CE_NUM,"WebTextField","",this.requiredField);
    this.abisCeNum.setErrorTip("mainInfo_abisCeNum_tip");
    this.initMap(mainInfoArray,this.abisCeNum);
	this.sceneInvestNum = WebUI.createText("mainInfo_sceneInvestNum",CaseEventCol.SCENE_INVEST_NUM,"WebTextField","",this.requiredField);
    this.sceneInvestNum.setErrorTip("mainInfo_sceneInvestNum_tip");
    this.initMap(mainInfoArray,this.sceneInvestNum);
    this.policeNum = WebUI.createText("mainInfo_policeNum",CaseEventCol.POLICE_NUM,"WebTextField","",this.requiredField);
    this.policeNum.setErrorTip("mainInfo_policeNum_tip");
    this.initMap(mainInfoArray,this.policeNum);
	//this.dbCombo = WebUI.createSearchCombo("mainInfo_dbid",CaseEventCol.DBID, "",2, false, this.requiredField);
	this.dbCombo = WebUI.createCombo("mainInfo_dbid",CaseEventCol.DBID, null,null, true, true,ABISCode.DBCodeName,"",this.requiredField);
	this.dbCombo.setErrorTip("mainInfo_dbid_tip");
	this.initMap(mainInfoArray,this.dbCombo);
	
	this.ceStatus=WebUI.createCombo("mainInfo_ceStatus",CaseEventCol.CE_STATUS,null,null,true,true,"CASE_EVENT|CE_STATUS","title",this.requiredField);
	this.ceStatus.setErrorTip("mainInfo_ceStatus_tip");
	this.initMap(mainInfoArray,this.ceStatus);
	
	this.ceType=WebUI.createCombo("mainInfo_ceType",CaseEventCol.CE_TYPE,null,null,true,true,"CASE_EVENT|CE_TYPE","title",this.requiredField);
	this.ceType.setErrorTip("mainInfo_ceType_tip");
	this.initMap(mainInfoArray,this.ceType);
	
	this.createUser=WebUI.createText("mainInfo_createUser",CaseEventCol.CREATE_USER,"WebTextField","",this.requiredField);
	this.createUser.setErrorTip("mainInfo_createUser_tip");
	this.initMap(mainInfoArray,this.createUser);
	
	this.createTime=WebUI.createDateText("mainInfo_createTime",CaseEventCol.CREATE_TIME,"WebTextField","",this.requiredField);	
	this.createTime.setErrorTip("mainInfo_createTime_tip");
	this.initMap(mainInfoArray,this.createTime);
	
	this.ceName=WebUI.createText("mainInfo_ceName",CaseEventCol.CE_NAME,"WebTextField","",this.requiredField);	
	this.ceName.setErrorTip("mainInfo_ceName_tip");
	this.initMap(mainInfoArray,this.ceName);
	
	this.mainInfocomments=WebUI.createMulText("mainInfo_comments",CaseEventCol.COMMENTS,"WebTextArea","",this.requiredField);
	this.mainInfocomments.setErrorTip("mainInfo_comments_tip");
	this.initMap(mainInfoArray,this.mainInfocomments);
	
	this.updateUser=WebUI.createText("mainInfo_updateUser",CaseEventCol.UPDATE_USER,"WebTextField","",this.requiredField);
	this.updateUser.setErrorTip("mainInfo_updateUser_tip");
	this.initMap(mainInfoArray,this.updateUser);
	
	this.updateTime=WebUI.createDateText("mainInfo_updateTime",CaseEventCol.UPDATE_TIME,"WebTextField","",this.requiredField);
	this.updateTime.setErrorTip("mainInfo_updateTime_tip");
	this.initMap(mainInfoArray,this.updateTime);
	
	this.createUnitCode=WebUI.createCombo("mainInfo_createUnitCode",CaseEventCol.CREATE_UNIT_CODE,null,null,false,false,"CASE_EVENT|CREATE_UNIT_CODE","",this.requiredField);
	this.createUnitCode.setErrorTip("mainInfo_createUnitCode_tip");
	this.initMap(mainInfoArray,this.createUnitCode);
	
	this.updateUnitCode=WebUI.createCombo("mainInfo_updateUnitCode",CaseEventCol.UPDATE_UNIT_CODE,null,null,false,false,"CASE_EVENT|UPDATE_UNIT_CODE","",this.requiredField);
	this.updateUnitCode.setErrorTip("mainInfo_updateUnitCode_tip");
	this.initMap(mainInfoArray,this.updateUnitCode);
	this.crolArray["mainInfo"]=mainInfoArray;
	
	//案件基本信息
	var basicInfoArray=new Array();
	this.ceOccurPlaceCode=WebUI.createCombo("basicInfo_ceOccurPlaceCode",CEBasicInfoCol.CE_OCCUR_PLACE_CODE,null,"basicInfo_ceOccurPlace",false,false,"CASE_TEXT_INFO|CE_OCCUR_PLACE_CODE","",this.requiredField);
	this.ceOccurPlaceCode.setErrorTip("basicInfo_ceOccurPlaceCode_tip");
	this.initMap(basicInfoArray,this.ceOccurPlaceCode);
	
	this.ceOccurPlace=WebUI.createCodeText("basicInfo_ceOccurPlace",CEBasicInfoCol.CE_OCCUR_PLACE,"AddressDetail","",this.requiredField);	
	this.ceOccurPlace.setErrorTip("basicInfo_ceOccurPlace_tip");
	this.initMap(basicInfoArray,this.ceOccurPlace);
	
	this.ceOccurDate=WebUI.createDateText("basicInfo_ceOccurDate",CEBasicInfoCol.CE_OCCUR_DATE,"WebTextField","",this.requiredField,{maxDate:'#F{$dp.$D(\''+CaseExtractInfoCol.EXTRACT_DATE+'\')||\'%y-%M-%d\'}'});	
	this.ceOccurDate.setErrorTip("basicInfo_ceOccurDate_tip");
	this.initMap(basicInfoArray,this.ceOccurDate);
	
	this.hasPersonKilled=WebUI.createCombo("basicInfo_hasPersonKilled",CEBasicInfoCol.HAS_PERSON_KILLED,null,null,true,false,"CASE_TEXT_INFO|HAS_PERSON_KILLED","",this.requiredField);
	this.hasPersonKilled.setErrorTip("basicInfo_hasPersonKilled_tip");
	this.initMap(basicInfoArray,this.hasPersonKilled);
	
	
	this.personKilledCnt=WebUI.createText("basicInfo_personKilledCnt",CEBasicInfoCol.PERSON_KILLED_CNT,"WebTextField","",this.requiredField);
	this.personKilledCnt.setErrorTip("basicInfo_personKilledCnt_tip");
	this.initMap(basicInfoArray,this.personKilledCnt);
	
	this.ceClassCode1=WebUI.createCombo("basicInfo_ceClassCode1",CEBasicInfoCol.CE_CLASS_CODE_1,null,null,true,false,"CASE_TEXT_INFO|CE_CLASS_CODE_1","",this.requiredField);
	this.ceClassCode1.setErrorTip("basicInfo_ceClassCode1_tip");
	this.initMap(basicInfoArray,this.ceClassCode1);
	
	this.ceClassCode2=WebUI.createCombo("basicInfo_ceClassCode2",CEBasicInfoCol.CE_CLASS_CODE_2,null,null,true,false,"CASE_TEXT_INFO|CE_CLASS_CODE_2","",this.requiredField);
	this.ceClassCode2.setErrorTip("basicInfo_ceClassCode2_tip");
	this.initMap(basicInfoArray,this.ceClassCode2);
	
	this.ceClassCode3=WebUI.createCombo("basicInfo_ceClassCode3",CEBasicInfoCol.CE_CLASS_CODE_3,null,null,true,false,"CASE_TEXT_INFO|CE_CLASS_CODE_3","",this.requiredField);
	this.ceClassCode3.setErrorTip("basicInfo_ceClassCode3_tip");
	this.initMap(basicInfoArray,this.ceClassCode3);
	
	this.caseLoss=WebUI.createText("basicInfo_caseLoss",CEBasicInfoCol.CASE_LOSS,"WebTextField","",this.requiredField);
	this.caseLoss.setErrorTip("basicInfo_caseLoss_tip");
	this.initMap(basicInfoArray,this.caseLoss);
	
	this.ceSuspiciousAreaCode1=WebUI.createCombo("basicInfo_ceSuspiciousAreaCode1",CEBasicInfoCol.CE_SUSPICIOUS_AREA_CODE_1,null,null,false,false,"CASE_EVENT|CE_SUSPICIOUS_AREA_CODE_1","",this.requiredField);
	this.ceSuspiciousAreaCode1.setErrorTip("basicInfo_ceSuspiciousAreaCode1_tip");
	this.initMap(basicInfoArray,this.ceSuspiciousAreaCode1);
	
	this.ceSuspiciousAreaCode2=WebUI.createCombo("basicInfo_ceSuspiciousAreaCode2",CEBasicInfoCol.CE_SUSPICIOUS_AREA_CODE_2,null,null,false,false,"CASE_EVENT|CE_SUSPICIOUS_AREA_CODE_1","",this.requiredField);
	this.ceSuspiciousAreaCode2.setErrorTip("basicInfo_ceSuspiciousAreaCode2_tip");
	this.initMap(basicInfoArray,this.ceSuspiciousAreaCode2);
	
	this.ceSuspiciousAreaCode3=WebUI.createCombo("basicInfo_ceSuspiciousAreaCode3",CEBasicInfoCol.CE_SUSPICIOUS_AREA_CODE_3,null,null,false,false,"CASE_EVENT|CE_SUSPICIOUS_AREA_CODE_1","",this.requiredField);
	this.ceSuspiciousAreaCode3.setErrorTip("basicInfo_ceSuspiciousAreaCode3_tip");
	this.initMap(basicInfoArray,this.ceSuspiciousAreaCode3);
	
	this.cePremium=WebUI.createText("basicInfo_cePremium",CEBasicInfoCol.CE_PREMIUM,"WebTextField","",this.requiredField);
	this.cePremium.setErrorTip("basicInfo_cePremium_tip");
	this.initMap(basicInfoArray,this.cePremium);
	
	this.basicInfocomments=WebUI.createMulText("basicInfo_ceComments","basicInfocomments","WebTextArea_Auto","",this.requiredField);
	this.basicInfocomments.setErrorTip("basicInfo_ceComments_tip");
	this.initMap(basicInfoArray,this.basicInfocomments);
	this.crolArray["basicInfo"]=basicInfoArray;
	
	//接警信息
	var acceptInfoArray=new Array();
	this.acceptOperator=WebUI.createText("acceptInfo_acceptOperator",CEAcceptInfoCol.ACCEPT_OPERATOR,"WebTextField","",this.requiredField);
	this.acceptOperator.setErrorTip("acceptInfo_acceptOperator_tip");
	this.initMap(acceptInfoArray,this.acceptOperator);
	
	this.acceptTime=WebUI.createDateText("acceptInfo_acceptTime",CEAcceptInfoCol.ACCEPT_TIME,"WebTextField","",this.requiredField);
	this.acceptTime.setErrorTip("acceptInfo_acceptTime_tip");
	this.initMap(acceptInfoArray,this.acceptTime);
	
	this.acceptUnitName=WebUI.createText("acceptInfo_acceptUnitName",CEAcceptInfoCol.ACCEPT_UNIT_NAME,"WebTextField","",this.requiredField);
	this.acceptUnitName.setErrorTip("acceptInfo_acceptUnitName_tip");
	this.initMap(acceptInfoArray,this.acceptUnitName);
	
	this.acceptUnitCode=WebUI.createCombo("acceptInfo_acceptUnitCode",CEAcceptInfoCol.ACCEPT_UNIT_CODE,null,"acceptInfo_acceptUnitName",false,false,"CASE_TEXT_INFO|ACCEPT_UNIT_CODE","",this.requiredField);
	this.acceptUnitCode.setErrorTip("acceptInfo_acceptUnitCode_tip");
	this.initMap(acceptInfoArray,this.acceptUnitCode);
	
	this.acceptPlaceName=WebUI.createText("acceptInfo_acceptPlaceName",CEAcceptInfoCol.ACCEPT_PLACE,"WebTextField","",this.requiredField);
	this.acceptPlaceName.setErrorTip("acceptInfo_acceptPlaceName_tip");
	this.initMap(acceptInfoArray,this.acceptPlaceName);
	
	this.acceptInfocomments=WebUI.createMulText("acceptInfo_acceptcomments","acceptInfocomments","WebTextArea","",this.requiredField);
	this.acceptInfocomments.setErrorTip("acceptInfo_acceptcomments_tip");
	this.initMap(acceptInfoArray,this.acceptInfocomments);
	this.crolArray["acceptInfo"]=acceptInfoArray;
	
	//立案信息
	var registerInfoArray=new Array();
	this.regiApprover=WebUI.createText("registerInfo_regiApprover",CaseRegisterInfoCol.REGI_APPROVER,"WebTextField","",this.requiredField);
	this.regiApprover.setErrorTip("registerInfo_regiApprover_tip");
	this.initMap(registerInfoArray,this.regiApprover);
	
	this.regiTime=WebUI.createDateText("registerInfo_regiTime",CaseRegisterInfoCol.REGI_TIME,"WebTextField","",this.requiredField);
	this.regiTime.setErrorTip("registerInfo_regiTime_tip");
	this.initMap(registerInfoArray,this.regiTime);
	
	this.regiUnitCode=WebUI.createCombo("registerInfo_regiUnitCode",CaseRegisterInfoCol.REGI_UNIT_CODE,null,"registerInfo_regiUnitName",false,false,"CASE_TEXT_INFO|REGI_UNIT_CODE","",this.requiredField);
	this.regiUnitCode.setErrorTip("registerInfo_regiUnitCode_tip");
	this.initMap(registerInfoArray,this.regiUnitCode);
	
	this.regiUnitName=WebUI.createText("registerInfo_regiUnitName",CaseRegisterInfoCol.REGI_UNIT_NAME,"WebTextField","",this.requiredField);
	this.regiUnitName.setErrorTip("registerInfo_regiUnitName_tip");
	this.initMap(registerInfoArray,this.regiUnitName);
	this.crolArray["registerInfo"]=registerInfoArray;
	//破案信息
	var breakInfoArray=new Array();
	this.breakDate=WebUI.createDateText("breakInfo_breakDate",CaseBreakInfoCol.BREAK_DATE,"WebTextField","",this.requiredField);
	this.breakDate.setErrorTip("breakInfo_breakDate_tip");
	this.initMap(breakInfoArray,this.breakDate);
	
	this.breakDateTypeCode=WebUI.createCombo("breakInfo_breakDateTypeCode",CaseBreakInfoCol.BREAK_DATE_TYPE_CODE,null,null,true,true,"CASE_TEXT_INFO|BREAK_DATE_TYPE_CODE","",this.requiredField);
	this.breakDateTypeCode.setErrorTip("breakInfo_breakDateTypeCode_tip");
	this.initMap(breakInfoArray,this.breakDateTypeCode);
	
	this.breakMethodCode=WebUI.createCombo("breakInfo_breakMethodCode",CaseBreakInfoCol.BREAK_METHOD_CODE,null,null,true,true,"CASE_TEXT_INFO|BREAK_METHOD_CODE","",this.requiredField);
	this.breakMethodCode.setErrorTip("breakInfo_breakMethodCode_tip");
	this.initMap(breakInfoArray,this.breakMethodCode);
	
	this.breakMethodDesc=WebUI.createMulText("breakInfo_breakMethodDesc",CaseBreakInfoCol.BREAK_METHOD_DESC,"WebTextArea","",this.requiredField);
	this.breakMethodDesc.setErrorTip("breakInfo_breakMethodDesc_tip");
	this.initMap(breakInfoArray,this.breakMethodDesc);
	this.crolArray["breakInfo"]=breakInfoArray;
	
	//案件提取信息
	var extractInfoArray=new Array();
	this.extractDate=WebUI.createDateText("extractInfo_extractDate",CaseExtractInfoCol.EXTRACT_DATE,"WebTextField","",this.requiredField,{minDate:'#F{$dp.$D(\''+CEBasicInfoCol.CE_OCCUR_DATE+'\')}'});
	this.extractDate.setErrorTip("extractInfo_extractDate_tip");
	this.initMap(extractInfoArray,this.extractDate);
	
	this.extractor1=WebUI.createText("extractInfo_extractor1",CaseExtractInfoCol.EXTRACTOR_1,"WebTextField","",this.requiredField);
	this.extractor1.setErrorTip("extractInfo_extractor1_tip");
	this.initMap(extractInfoArray,this.extractor1);
	
	this.extractor2=WebUI.createText("extractInfo_extractor2",CaseExtractInfoCol.EXTRACTOR_2,"WebTextField","",this.requiredField);
	this.extractor2.setErrorTip("extractInfo_extractor2_tip");
	this.initMap(extractInfoArray,this.extractor2);
	
	this.extractor3=WebUI.createText("extractInfo_extractor3",CaseExtractInfoCol.EXTRACTOR_3,"WebTextField","",this.requiredField);
	this.extractor3.setErrorTip("extractInfo_extractor3_tip");
	this.initMap(extractInfoArray,this.extractor3);
	
	this.extractUnitCode=WebUI.createCombo("extractInfo_extractUnitCode",CaseExtractInfoCol.EXTRACT_UNIT_CODE,null,"extractInfo_extractUnitName",false,false,"CASE_EVENT|CREATE_UNIT_CODE","",this.requiredField);
	this.extractUnitCode.setErrorTip("extractInfo_extractUnitCode_tip");
	this.initMap(extractInfoArray,this.extractUnitCode);
		
	this.extractUnitName=WebUI.createCodeText("extractInfo_extractUnitName",CaseExtractInfoCol.EXTRACT_UNIT_NAME,"Address","",this.requiredField);
	this.extractUnitName.setErrorTip("extractInfo_extractUnitName_tip");
	this.initMap(extractInfoArray,this.extractUnitName);
	
	this.extractInfocomments=WebUI.createMulText("extractInfo_extractcomments","extractInfocomments","WebTextArea","",this.requiredField);
	this.extractInfocomments.setErrorTip("extractInfo_extractcomments_tip");
	this.initMap(extractInfoArray,this.extractInfocomments);
	this.crolArray["extractInfo"]=extractInfoArray;
	
	//销案信息
	var cancelInfoArray=new Array();
	this.cancelDate=WebUI.createDateText("cancelInfo_cancelDate",CECancelInfoCol.CANCEL_DATE,"WebTextField","",this.requiredField);
	this.cancelDate.setErrorTip("cancelInfo_cancelDate_tip");
	this.initMap(cancelInfoArray,this.cancelDate);
	
	this.cancelReasonCode=WebUI.createCombo("cancelInfo_cancelReasonCode",CECancelInfoCol.CANCEL_REASON_CODE,null,null,true,true,"CASE_TEXT_INFO|CANCEL_REASON_CODE","",this.requiredField);
	this.cancelReasonCode.setErrorTip("cancelInfo_cancelReasonCode_tip");
	this.initMap(cancelInfoArray,this.cancelReasonCode);
	this.crolArray["cancelInfo"]=cancelInfoArray;
		
	
	//新增一个对象 CoopInvestInfo  hjx 2017年3月15日
	var CoopInvestInfoArray = [];
	this.superviseLevel=WebUI.createCombo("basicInfo_superviseLevel",CEBasicInfoCol.SUPERVISE_LEVEL,null,null,true,true,"CASE_TEXT_INFO|SUPERVISE_LEVEL","",this.requiredField);
	this.superviseLevel.setErrorTip("basicInfo_superviseLevel_tip");
	this.initMap(CoopInvestInfoArray,this.superviseLevel);
	this.crolArray['coopInvestInfo']=CoopInvestInfoArray;
	//this.initUpdateField(mainInfoArray);
	//this.initUpdateField(basicInfoArray);
	//this.initUpdateField(acceptInfoArray);
	//this.initUpdateField(registerInfoArray);
	//this.initUpdateField(breakInfoArray);
	//this.initUpdateField(extractInfoArray);
	//this.initUpdateField(cancelInfoArray);
}

LPCaseEditPage.prototype.initData = function(map,contro)
{
	this.initComboData();
	this.initDBInfo();
}

LPCaseEditPage.prototype.initDBInfo = function(map,contro)
{
	//var url = WebVar.VarPath + "/db/mgr/dbinfo/" + ABISCode.DBTypeCode.LATENT_DB;
	var url = WebVar.VarPath + "/locbase/db/code/" + ABISCode.DBTypeCode.LATENT_DB + "/" + ABISCode.DBPurposeCode.NORMAL;
	var nThis = this;
	$.ajax
	( 
        {
			type 		: 'POST',
			contentType : 'application/json',
			url 		: url,
			data 		: null,
			dataType 	: 'json',
			success 	: function(data) 
			{   
				nThis.dbCombo.setComboData(data);
				if(!WebUtil.isEmpty(data))
				{
					if(nThis.defValue == null)return;
					var dbValue = null;
					for( var i = 0; i < nThis.defValue.length; i++ )
					{
						var v = nThis.defValue[i];
						if(v.k != CaseEventCol.DBID)continue;
						dbValue = v.v;
					}
					var d = data[0];
					for(var i in data)
					{
						var db = data[i];
						if(db.code == dbValue)
						{
							d = db;
							break;
						}
					}
					var arr = new Array();
					arr.push(d.code);
					nThis.dbCombo.setValue(d.code);
				}
			},   
			error : function(e) 
			{
				
			}
		}
	);
}
//设置校验规则  TODO  根据json格式遍历
LPCaseEditPage.prototype.setValidateColumns = function(columnsObj)
{
	if(WebUtil.isEmpty(columnsObj)) return;
	if(typeof columnsObj["CASE_EVENT"] == 'undefined'){
		columnsObj["CASE_EVENT"]={};
	}
	if(typeof columnsObj["TP_CARD_INFO"] == 'undefined'){
		columnsObj["TP_CARD_INFO"]={};
	}
	if(typeof columnsObj["CE_BASIC_INFO"] == 'undefined'){
		columnsObj["CE_BASIC_INFO"]={};
	}
	if(typeof columnsObj["CE_ACCEPT_INFO"] == 'undefined'){
		columnsObj["CE_ACCEPT_INFO"]={};
	}
	if(typeof columnsObj["CASE_REGISTER_INFO"] == 'undefined'){
		columnsObj["CASE_REGISTER_INFO"]={};
	}
	if(typeof columnsObj["CASE_BREAK_INFO"] == 'undefined'){
		columnsObj["CASE_BREAK_INFO"]={};
	}
	if(typeof columnsObj["CASE_EXTRACT_INFO"] == 'undefined'){
		columnsObj["CASE_EXTRACT_INFO"]={};
	}
	if(typeof columnsObj["CE_CANCEL_INFO"] == 'undefined'){
		columnsObj["CE_CANCEL_INFO"]={};
	}
	var ceNumparam={};	
	ceNumparam.maxlength= 23;//columnsObj["CASE_EVENT"][CaseEventCol.CE_NUM];
	ceNumparam.minlength= 22;
    // ceNumparam.regex = "^[A-Za-z0-9]+$";
	//修改案事件编号验证规则为A+22位数字规则   17/10/09
    ceNumparam.regex =/^A\d{22}$/;
	this.ceNum.setValidateType(ceNumparam);
    this.abisCeNum.setValidateType(ceNumparam);
    this.policeNum.setValidateType({maxlength:23});
    this.sceneInvestNum.setValidateType({maxlength:23});
	var dbComboparam={};	
	dbComboparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.DBID];
	this.dbCombo.setValidateType(dbComboparam);	
	
	var ceStatusparam={};	
	ceStatusparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.CE_STATUS];
	this.ceStatus.setValidateType(ceStatusparam);	
	
	var ceTypeparam={};	
	ceTypeparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.CE_TYPE];
	this.ceType.setValidateType(ceTypeparam);	
	
	var createUserparam={};	
	createUserparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.CREATE_USER];
	this.createUser.setValidateType(createUserparam);	
	
	var createTimeparam={};	
	createTimeparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.CREATE_TIME];
	this.createTime.setValidateType(createTimeparam);	
	
	var ceNameparam={};	
	ceNameparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.CE_NAME];
	this.ceName.setValidateType(ceNameparam);	
	
	var mainInfocommentsparam={};	
	mainInfocommentsparam.maxlength=1000;//columnsObj["CASE_EVENT"][CaseEventCol.COMMENTS];
	this.mainInfocomments.setValidateType(mainInfocommentsparam);	
	
	var updateUserparam={};	
	updateUserparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.UPDATE_USER];
	this.updateUser.setValidateType(updateUserparam);	
	
	var updateTimeparam={};	
	updateTimeparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.UPDATE_TIME];
	this.updateTime.setValidateType(updateTimeparam);	
	
	var createUnitCodeparam={};	
	createUnitCodeparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.CREATE_UNIT_CODE];
	this.createUnitCode.setValidateType(createUnitCodeparam);	
	
	var updateUnitCodeparam={};	
	updateUnitCodeparam.maxlength=columnsObj["CASE_EVENT"][CaseEventCol.UPDATE_UNIT_CODE];
	this.updateUnitCode.setValidateType(updateUnitCodeparam);	

	//==
	/*var ceOccurPlaceCodeparam={};	
	ceOccurPlaceCodeparam.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_OCCUR_PLACE_CODE];
	this.ceOccurPlaceCode.setValidateType(ceOccurPlaceCodeparam);	*/
	
	var ceOccurPlaceparam={};	
	ceOccurPlaceparam.maxlength=100;
	this.ceOccurPlace.setValidateType(ceOccurPlaceparam);	
	
	/*var ceOccurDateparam={};	
	ceOccurDateparam.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_OCCUR_DATE];
	this.ceOccurDate.setValidateType(ceOccurDateparam);	*/
	
	/*var hasPersonKilledparam={};	
	hasPersonKilledparam.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.HAS_PERSON_KILLED];
	this.hasPersonKilled.setValidateType(hasPersonKilledparam);	
	
	var superviseLevelparam={};	
	superviseLevelparam.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.SUPERVISE_LEVEL];
	this.superviseLevel.setValidateType(superviseLevelparam);	*/
	
	var personKilledCntparam={};	
	personKilledCntparam.maxlength=2;
	personKilledCntparam.isdigital=true;
	this.personKilledCnt.setValidateType(personKilledCntparam);	
	
	/*var ceClassCode1param={};	
	ceClassCode1param.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_CLASS_CODE_1];
	this.ceClassCode1.setValidateType(ceClassCode1param);	
	
	var ceClassCode2param={};	
	ceClassCode2param.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_CLASS_CODE_2];
	this.ceClassCode2.setValidateType(ceClassCode2param);	
	
	var ceClassCode3param={};	
	ceClassCode3param.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_CLASS_CODE_3];
	this.ceClassCode3.setValidateType(ceClassCode3param);	*/
	
	var caseLossparam={};	
	caseLossparam.maxlength=20;
	caseLossparam.isdigital=true;
	this.caseLoss.setValidateType(caseLossparam);	
	
	/*var ceSuspiciousAreaCode1param={};	
	ceSuspiciousAreaCode1param.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_SUSPICIOUS_AREA_CODE_1];
	this.ceSuspiciousAreaCode1.setValidateType(ceSuspiciousAreaCode1param);	
	
	var ceSuspiciousAreaCode2param={};	
	ceSuspiciousAreaCode2param.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_SUSPICIOUS_AREA_CODE_2];
	this.ceSuspiciousAreaCode2.setValidateType(ceSuspiciousAreaCode2param);	
	
	var ceSuspiciousAreaCode3param={};	
	ceSuspiciousAreaCode3param.maxlength=columnsObj["CE_BASIC_INFO"][CEBasicInfoCol.CE_SUSPICIOUS_AREA_CODE_3];
	this.ceSuspiciousAreaCode3.setValidateType(ceSuspiciousAreaCode3param);	
	*/
	var cePremiumparam={};	
	cePremiumparam.maxlength=10;
	cePremiumparam.isdigital=true;
	this.cePremium.setValidateType(cePremiumparam);	
	
	var basicInfocommentsparam={};	
	basicInfocommentsparam.maxlength=1000;
	this.basicInfocomments.setValidateType(basicInfocommentsparam);	

	//====
	var acceptOperatorparam={};	
	acceptOperatorparam.maxlength=50;
	this.acceptOperator.setValidateType(acceptOperatorparam);	
	
	/*var acceptTimeparam={};	
	acceptTimeparam.maxlength=columnsObj["CE_ACCEPT_INFO"][CEAcceptInfoCol.ACCEPT_TIME];
	this.acceptTime.setValidateType(acceptTimeparam);	
	
	var acceptUnitCodeparam={};	
	acceptUnitCodeparam.maxlength=columnsObj["CE_ACCEPT_INFO"][CEAcceptInfoCol.ACCEPT_UNIT_CODE];
	this.acceptUnitCode.setValidateType(acceptUnitCodeparam);	
	*/
	var acceptUnitNameparam={};	
	acceptUnitNameparam.maxlength=100;
	this.acceptUnitName.setValidateType(acceptUnitNameparam);	
	
	var acceptPlaceNameparam={};	
	acceptPlaceNameparam.maxlength=100;
	this.acceptPlaceName.setValidateType(acceptPlaceNameparam);	
	
	var acceptInfocommentsparam={};	
	acceptInfocommentsparam.maxlength=1000;
	this.acceptInfocomments.setValidateType(acceptInfocommentsparam);		

	//=====
	var regiApproverparam={};	
	regiApproverparam.maxlength=50;
	this.regiApprover.setValidateType(regiApproverparam);	
	
	/*var regiTimeparam={};	
	regiTimeparam.maxlength=columnsObj["CASE_REGISTER_INFO"][CaseRegisterInfoCol.REGI_TIME];
	this.regiTime.setValidateType(regiTimeparam);	
	
	var regiUnitCodeparam={};	
	regiUnitCodeparam.maxlength=columnsObj["CASE_REGISTER_INFO"][CaseRegisterInfoCol.REGI_UNIT_CODE];
	this.regiUnitCode.setValidateType(regiUnitCodeparam);	*/
	
	var regiUnitNameparam={};	
	regiUnitNameparam.maxlength=100;
	this.regiUnitName.setValidateType(regiUnitNameparam);	

	//===
	/*var breakDateparam={};	
	breakDateparam.maxlength=columnsObj["CASE_BREAK_INFO"][CaseBreakInfoCol.BREAK_DATE];
	this.breakDate.setValidateType(breakDateparam);	
	
	var breakDateTypeCodeparam={};	
	breakDateTypeCodeparam.maxlength=columnsObj["CASE_BREAK_INFO"][CaseBreakInfoCol.BREAK_DATE_TYPE_CODE];
	this.breakDateTypeCode.setValidateType(breakDateTypeCodeparam);	
	
	var breakMethodCodeparam={};	
	breakMethodCodeparam.maxlength=columnsObj["CASE_BREAK_INFO"][CaseBreakInfoCol.BREAK_METHOD_CODE];
	this.breakMethodCode.setValidateType(breakMethodCodeparam);	*/
	
	var breakMethodDescparam={};	
	breakMethodDescparam.maxlength=1000;
	this.breakMethodDesc.setValidateType(breakMethodDescparam);		

	/*var regiUnitNameparam={};	
	regiUnitNameparam.maxlength=columnsObj["CASE_EXTRACT_INFO"][CaseExtractInfoCol.EXTRACT_DATE];
	this.extractDate.setValidateType(regiUnitNameparam);	*/
	
	//==
	var extractor1param={};	
	extractor1param.maxlength=30;
	this.extractor1.setValidateType(extractor1param);	
	
	var extractor2param={};	
	extractor2param.maxlength=30;
	this.extractor2.setValidateType(extractor2param);	
	
	var extractor3param={};	
	extractor3param.maxlength=30;
	this.extractor3.setValidateType(extractor3param);	
	
	var extractUnitNameparam={};	
	extractUnitNameparam.maxlength=70;
	this.extractUnitName.setValidateType(extractUnitNameparam);
	
		
	
	var extractInfocommentsparam={};	
	extractInfocommentsparam.maxlength=200;
	this.extractInfocomments.setValidateType(extractInfocommentsparam);		

	//==
	/*var cancelDateparam={};	
	cancelDateparam.maxlength=columnsObj["CE_CANCEL_INFO"][CECancelInfoCol.CANCEL_DATE];
	this.cancelDate.setValidateType(cancelDateparam);	
	
	var cancelReasonCodeparam={};	
	cancelReasonCodeparam.maxlength=columnsObj["CE_CANCEL_INFO"][CECancelInfoCol.CANCEL_REASON_CODE];
	this.cancelReasonCode.setValidateType(cancelReasonCodeparam);	*/
	
}

//是否通过了长度验证，既页面中存在红色字体提示长度不符合时不予保存
LPCaseEditPage.prototype.isPassLenValidate = function()
{
	for(var parent in this.crolArray)
	{
		for( var name in this.crolArray[parent])
		{
			var contro = this.crolArray[parent][name];	
			var tip = contro.getErrorTip();
			if(tip == null) 	
			{
				continue;
			}
			var errorinfo = contro.getErrorTip().html()
			if(!WebUtil.isEmpty(errorinfo)){
				return false;
			}
		}
	}
	return true;
}

//是否通过了验证，包括长度验证和必填项验证
LPCaseEditPage.prototype.isPassValidate	= function()
{
	return this.isPassLenValidate() && this.validateRequired();
}

LPCaseEditPage.prototype.initMap = function(map,contro)
{
	map.push(contro);
	this.filedMap[contro.getId()]=contro;
	var required=WebArrayUtil.containsToIgnoreCase(this.requiredField,contro.getId());
	var update=WebArrayUtil.containsToIgnoreCase(this.updateField,contro.getId());
	if(required)
	{
		this.requiredMap.push(contro);	
	}
	if(update)
	{
		this.updateMap.push(contro);	
	}
}
LPCaseEditPage.prototype.initUpdateField = function(map)
{
	for(var i=0;i<map.length;i++)	
		{
		 var id= map[i].getId();
		 var flag=true;
		 for(var j=0;j<this.updateMap.length;j++)
			 {
			   var nid=this.updateMap[j].getId();
			   if(id==nid)
			   {
				   this.updateMap[j].setEditable(true);
				   flag=false;
				   break;
			   }
			 }
		 if(flag)
			 map[i].setEditable(false);
		}		
}

//为所有文本框注册当前文本是否发生了变化，编辑页面赋值后调用。
LPCaseEditPage.prototype.registerTxtChangeListener = function()
{
	var nthis = this;	
	for(var parent in this.crolArray)
	{
		for( var name in this.crolArray[parent])
		{
			var contro = this.crolArray[parent][name];
			nthis.register(contro);
		}
	}
}

LPCaseEditPage.prototype.register = function(contro)
{
	var nThis = this;
	contro.addChangeListener(textChange);
	function textChange(id,value,txt)
	{				
		var oldtext = null;
		if(nThis.srcCaseObj != null)
		{
			oldtext = nThis.srcCaseObj[id];		
		}
		if(oldtext == null) 
		{
			oldtext = "";
		}
		//数据库字段特殊处理
		if(id == CaseEventCol.DBID)
		{
			if(value != null)
			{
				value += "";
				var dbs = value.split(",");
				value  = 0;
				for(var i in dbs)
				{
					value |= dbs[i];
				}
			}
			nThis.dbid = value;
		}
		if(value != oldtext)
		{
			nThis.changeField[id] = true;		  
			flag = true;
		}	
		else
		{
			nThis.changeField[id] = false;
		    flag = false;
		}
		if(WebUtil.isFunction(nThis.changeListener))
		{
			nThis.changeListener(flag);	
		}
	}
}

//编辑页面的信息是否发生了变化
LPCaseEditPage.prototype.isTxtInfoChanged = function()
{	
	var flag=false;
	for(var name in this.changeField)
	{
		if(this.changeField[name])
		{
			flag=true;
		    break;
		}					 
	}	    
	return flag;
}
//验证所有必填项是否都填了
LPCaseEditPage.prototype.validateRequired = function()
{
	var flag=true;
	//验证必填项是否都填了
	var n=0;
	for(var i=0;i<this.requiredMap.length;i++)
	{
		 var text=this.requiredMap[i].getText();
		 if(text == null || text == "")
		 {
			 n=n+1;
		 }
	}		
	if(n>0)
	{
		flag=false;
	}
	return flag;
}
/**
 * 注册文本改变事件
 * @param {Object} listener
 */
LPCaseEditPage.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
LPCaseEditPage.prototype.initComboData=function()
{
	var columnnames = ['CASE_EVENT|CE_STATUS','CASE_EVENT|CE_TYPE',"CASE_EVENT|CREATE_UNIT_CODE","CASE_TEXT_INFO|CE_OCCUR_PLACE_CODE","CASE_TEXT_INFO|HAS_PERSON_KILLED","CASE_TEXT_INFO|CE_SUSPICIOUS_AREA_CODE_1",
	                   "CASE_TEXT_INFO|SUPERVISE_LEVEL","CASE_TEXT_INFO|CE_CLASS_CODE_1","CASE_TEXT_INFO|BREAK_DATE_TYPE_CODE","CASE_TEXT_INFO|BREAK_METHOD_CODE","CASE_TEXT_INFO|CANCEL_REASON_CODE"];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis=this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
LPCaseEditPage.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.ceStatus.setComboData(data['case_event|ce_status']);			
	this.ceType.setComboData(data['case_event|ce_type']);
	this.createUnitCode.setComboData(data['case_event|create_unit_code']);
	this.updateUnitCode.setComboData(data['case_event|create_unit_code']);
	
	this.ceOccurPlaceCode.setComboData(data['case_text_info|ce_occur_place_code']);
	this.hasPersonKilled.setComboData(data['case_text_info|has_person_killed']);
	this.superviseLevel.setComboData(data['case_text_info|supervise_level']);
	this.ceClassCode1.setComboData(data['case_text_info|ce_class_code_1']);
	this.ceClassCode2.setComboData(data['case_text_info|ce_class_code_1']);
	this.ceClassCode3.setComboData(data['case_text_info|ce_class_code_1']);
	this.ceSuspiciousAreaCode1.setComboData(data['case_text_info|ce_suspicious_area_code_1']);
	this.ceSuspiciousAreaCode2.setComboData(data['case_text_info|ce_suspicious_area_code_1']);
	this.ceSuspiciousAreaCode3.setComboData(data['case_text_info|ce_suspicious_area_code_1']);
	this.extractUnitCode.setComboData(data['case_event|create_unit_code']);
	this.acceptUnitCode.setComboData(data['case_event|create_unit_code']);
	this.regiUnitCode.setComboData(data['case_event|create_unit_code']);
	
	this.breakDateTypeCode.setComboData(data['case_text_info|break_date_type_code']);
	this.breakMethodCode.setComboData(data['case_text_info|break_method_code']);
	this.cancelReasonCode.setComboData(data['case_text_info|cancel_reason_code']);		
}
LPCaseEditPage.prototype.getLPCaseObject = function()
{
	var newObj = null;
	if(this.oldObj == null)
	{
		this.oldObj 				= {};
		this.oldObj.mainInfo 		= {};
		this.oldObj.breakInfo 		= {};
		this.oldObj.extractInfo 	= {};
		this.oldObj.registerInfo 	= {};
		this.oldObj.acceptInfo 		= {};
		this.oldObj.basicInfo 		= {};
		this.oldObj.cancelInfo 		= {};
		
		newObj 						= {};
		newObj.mainInfo 			= {};
		newObj.breakInfo 			= {};
		newObj.extractInfo 			= {};
		newObj.registerInfo 		= {};
		newObj.acceptInfo 			= {};
		newObj.basicInfo 			= {};
		newObj.cancelInfo 			= {};
		newObj.coopInvestInfo 	    = {};
	}
	else
	{
		newObj=$.extend(true,{},this.oldObj);
	}
	
	if(WebUtil.isNull(this.oldObj.mainInfo))
	{
		this.oldObj.mainInfo = {};		
		newObj.mainInfo = {};		
	}
	
	var flag = this.isChanged(this.oldObj.mainInfo.ceNum ,this.ceNum.getValue());
	newObj.mainInfo.ceNum=this.ceNum.getValue();

    flag = flag || this.isChanged(this.oldObj.mainInfo.abisCeNum, this.abisCeNum.getValue());
    newObj.mainInfo.abisCeNum = this.abisCeNum.getValue();

    flag = flag || this.isChanged(this.oldObj.mainInfo.sceneInvestNum, this.sceneInvestNum.getValue());
    newObj.mainInfo.sceneInvestNum = this.sceneInvestNum.getValue();

    flag = flag || this.isChanged(this.oldObj.mainInfo.policeNum, this.policeNum.getValue());
    newObj.mainInfo.policeNum = this.policeNum.getValue();

	flag = flag || this.isChanged(this.oldObj.mainInfo.dbid ,this.dbid);
	newObj.mainInfo.dbid = this.dbid;

	flag = flag ||  this.isChanged(this.oldObj.mainInfo.ceStatus ,this.ceStatus.getValue());
	newObj.mainInfo.ceStatus = this.ceStatus.getValue();

	flag = flag ||  this.isChanged(this.oldObj.mainInfo.ceType ,this.ceType.getValue());
	newObj.mainInfo.ceType = this.ceType.getValue();

	flag = flag ||  this.isChanged(this.oldObj.mainInfo.ceName ,this.ceName.getValue());
	newObj.mainInfo.ceName	= this.ceName.getValue();

	flag = flag ||  this.isChanged(this.oldObj.mainInfo.createUser ,this.createUser.getValue());
	newObj.mainInfo.createUser = this.createUser.getValue();
 
	flag = flag ||  this.isChanged(this.oldObj.mainInfo.createTime ,this.createTime.getValue());
	newObj.mainInfo.createTime = this.createTime.getValue();
 
	flag = flag ||  this.isChanged(this.oldObj.mainInfo.comments ,this.mainInfocomments.getValue());
	newObj.mainInfo.comments = this.mainInfocomments.getValue();
 
	flag = flag || this.isChanged(this.oldObj.mainInfo.updateTime ,this.updateTime.getValue());
	newObj.mainInfo.updateTime = this.updateTime.getValue();
 
	flag = flag || this.isChanged(this.oldObj.mainInfo.createUnitCode ,this.createUnitCode.getValue());
	newObj.mainInfo.createUnitCode	= this.createUnitCode.getValue();
 
	flag = flag || this.isChanged(this.oldObj.mainInfo.updateUnitCode ,this.updateUnitCode.getValue());
	newObj.mainInfo.updateUnitCode = this.updateUnitCode.getValue();
	 
   // if(!flag)
	//{
   // 	newObj.mainInfo = null;
	//}
	
	if(WebUtil.isNull(this.oldObj.basicInfo))
	{
		this.oldObj.basicInfo = {};
		newObj.basicInfo = {};
	}	
	
	flag = this.isChanged(this.oldObj.basicInfo.ceOccurPlaceCode ,this.ceOccurPlaceCode.getValue());
	newObj.basicInfo.ceOccurPlaceCode	= this.ceOccurPlaceCode.getValue();
	
	flag = flag || this.isChanged(this.oldObj.basicInfo.ceOccurPlace ,this.ceOccurPlace.getText());
	newObj.basicInfo.ceOccurPlace		= this.ceOccurPlace.getText();
 
	flag = flag || this.isChanged(this.oldObj.basicInfo.ceOccurDate ,this.ceOccurDate.getValue());
	newObj.basicInfo.ceOccurDate		= this.ceOccurDate.getValue();
 
	flag = flag || this.isChanged(this.oldObj.basicInfo.hasPersonKilled ,this.hasPersonKilled.getValue());
	newObj.basicInfo.hasPersonKilled	= this.hasPersonKilled.getValue();
	
	// flag = flag || this.isChanged(this.oldObj.basicInfo.superviseLevel ,this.superviseLevel.getValue());
	// newObj.basicInfo.superviseLevel	= this.superviseLevel.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceClassCode1 ,this.ceClassCode1.getValue());
	newObj.basicInfo.ceClassCode1		= this.ceClassCode1.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceClassCode2 ,this.ceClassCode2.getValue());
	newObj.basicInfo.ceClassCode2		= this.ceClassCode2.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceClassCode3 ,this.ceClassCode3.getValue());
	newObj.basicInfo.ceClassCode3		= this.ceClassCode3.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceComments ,this.basicInfocomments.getValue());
	newObj.basicInfo.ceComments		= this.basicInfocomments.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.cePremium ,this.cePremium.getValue());
	newObj.basicInfo.cePremium			= this.cePremium.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceSuspiciousAreaCode1 ,this.ceSuspiciousAreaCode1.getValue());
	newObj.basicInfo.ceSuspiciousAreaCode1=this.ceSuspiciousAreaCode1.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceSuspiciousAreaCode2 ,this.ceSuspiciousAreaCode2.getValue());
	newObj.basicInfo.ceSuspiciousAreaCode2=this.ceSuspiciousAreaCode2.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.ceSuspiciousAreaCode3 ,this.ceSuspiciousAreaCode3.getValue());
	newObj.basicInfo.ceSuspiciousAreaCode3=this.ceSuspiciousAreaCode3.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.personKilledCnt ,this.personKilledCnt.getValue());
	newObj.basicInfo.personKilledCnt=this.personKilledCnt.getValue();

	flag = flag || this.isChanged(this.oldObj.basicInfo.caseLoss ,this.caseLoss.getValue());
	newObj.basicInfo.caseLoss=this.caseLoss.getValue();

    if(!flag&&false)
	{
    	newObj.basicInfo=null;
	}
    
	if(WebUtil.isNull(this.oldObj.acceptInfo))
	{
		this.oldObj.acceptInfo = {};
		newObj.acceptInfo = {};
	}
		
	flag = this.isChanged(this.oldObj.acceptInfo.acceptOperator ,this.acceptOperator.getValue());
	newObj.acceptInfo.acceptOperator	= this.acceptOperator.getValue();
 
	flag = flag || this.isChanged(this.oldObj.acceptInfo.acceptTime ,this.acceptTime.getValue());
	newObj.acceptInfo.acceptTime		= this.acceptTime.getValue();

	flag = flag || this.isChanged(this.oldObj.acceptInfo.acceptUnitName ,this.acceptUnitName.getValue());
	newObj.acceptInfo.acceptUnitName	= this.acceptUnitName.getValue();

	flag = flag || this.isChanged(this.oldObj.acceptInfo.acceptUnitCode ,this.acceptUnitCode.getValue());
	newObj.acceptInfo.acceptUnitCode	= this.acceptUnitCode.getValue();

	flag = flag || this.isChanged(this.oldObj.acceptInfo.acceptPlaceName ,this.acceptPlaceName.getValue());
	newObj.acceptInfo.acceptPlaceName	= this.acceptPlaceName.getValue();

	flag = flag || this.isChanged(this.oldObj.acceptInfo.acceptComments,this.acceptInfocomments.getValue());
	newObj.acceptInfo.acceptComments			= this.acceptInfocomments.getValue();

    if(!flag&&false)
	{
    	newObj.acceptInfo=null;
	}
    
	if(WebUtil.isNull(this.oldObj.registerInfo))
	{
		this.oldObj.registerInfo = {};
		newObj.registerInfo = {};
	}	
	
	flag = this.isChanged(this.oldObj.registerInfo.regiApprover ,this.regiApprover.getValue());
	newObj.registerInfo.regiApprover	= this.regiApprover.getValue();

	flag = flag || this.isChanged(this.oldObj.registerInfo.regiTime ,this.regiTime.getValue());
	newObj.registerInfo.regiTime		= this.regiTime.getValue();

	flag = flag || this.isChanged(this.oldObj.registerInfo.regiUnitCode ,this.regiUnitCode.getValue());
	newObj.registerInfo.regiUnitCode	= this.regiUnitCode.getValue();

	flag= flag || this.isChanged(this.oldObj.registerInfo.regiUnitName ,this.regiUnitName.getValue());
	newObj.registerInfo.regiUnitName	= this.regiUnitName.getValue();

    if(!flag&&false)
	{
    	newObj.registerInfo=null;
	}
    
	if(WebUtil.isNull(this.oldObj.breakInfo))
	{
		this.oldObj.breakInfo = {};
		newObj.breakInfo = {};
	}	
	
	flag = this.isChanged(this.oldObj.breakInfo.breakDate ,this.breakDate.getValue());
	newObj.breakInfo.breakDate			= this.breakDate.getValue();

	flag = flag || this.isChanged(this.oldObj.breakInfo.breakDateTypeCode ,this.breakDateTypeCode.getValue());
	newObj.breakInfo.breakDateTypeCode	= this.breakDateTypeCode.getValue();

	flag = flag || this.isChanged(this.oldObj.breakInfo.breakMethodCode ,this.breakMethodCode.getValue());
	newObj.breakInfo.breakMethodCode	= this.breakMethodCode.getValue();

	flag = flag || this.isChanged(this.oldObj.breakInfo.breakMethodDesc ,this.breakMethodDesc.getValue());
	newObj.breakInfo.breakMethodDesc	= this.breakMethodDesc.getValue();

    if(!flag&&false)
	{
    	newObj.breakInfo=null;
	}
    
	if(WebUtil.isNull(this.oldObj.extractInfo))
	{
		this.oldObj.extractInfo = {};
		newObj.extractInfo = {};
	}

	flag = this.isChanged(this.oldObj.extractInfo.extractDate ,this.extractDate.getValue());
	newObj.extractInfo.extractDate		= this.extractDate.getValue();

	flag = flag || this.isChanged(this.oldObj.extractInfo.extractor1 ,this.extractor1.getValue());
	newObj.extractInfo.extractor1		= this.extractor1.getValue();

	flag = flag || this.isChanged(this.oldObj.extractInfo.extractor2 ,this.extractor2.getValue());
	newObj.extractInfo.extractor2		= this.extractor2.getValue();

	flag = flag || this.isChanged(this.oldObj.extractInfo.extractor3 ,this.extractor3.getValue());
	newObj.extractInfo.extractor3		= this.extractor3.getValue();
	
	flag = flag || this.isChanged(this.oldObj.extractInfo.extractUnitName ,this.extractUnitName.getValue());
	newObj.extractInfo.extractUnitName		= this.extractUnitName.getText();
	
	flag = flag || this.isChanged(this.oldObj.extractInfo.extractUnitCode ,this.extractUnitCode.getValue());
	newObj.extractInfo.extractUnitCode		= this.extractUnitCode.getValue();
	
	flag = flag || this.isChanged(this.oldObj.extractInfo.extractComments ,this.extractInfocomments.getValue());
	newObj.extractInfo.extractComments		= this.extractInfocomments.getValue();

    if(!flag&&false)
	{
    	newObj.extractInfo=null;
	}
    
	if(WebUtil.isNull(this.oldObj.cancelInfo))
	{
		this.oldObj.cancelInfo = {};
		newObj.cancelInfo = {};
	}
	
	flag = this.isChanged(this.oldObj.cancelInfo.cancelDate ,this.cancelDate.getValue());
	newObj.cancelInfo.cancelDate		= this.cancelDate.getValue();

	newObj.cancelInfo.cancelReasonCode	= this.cancelReasonCode.getValue();

    if(!flag&&false)
	{
    	newObj.cancelInfo=null;
	}
    
    
    //新增一个对象 CoopInvestInfo  hjx 2017年3月15日
    newObj.coopInvestInfo={}
	newObj.coopInvestInfo.superviseLevel=this.superviseLevel.getValue();
    
	return newObj;
}

LPCaseEditPage.prototype.clear = function()
{
	this.ceNum.setValue("");
    this.abisCeNum.setValue("");
    this.sceneInvestNum.setValue("");
    this.policeNum.setValue("");
	this.dbCombo.setValue("");
	this.ceStatus.setValue("");	
	this.ceType.setValue("");			
	this.createUser.setValue("");			
	this.createTime.setValue("");			
	this.ceName.setValue("");			
	this.mainInfocomments.setValue("");			
	this.updateUser.setValue("");			
	this.updateTime.setValue("");			
	this.createUnitCode.setValue("");			
	this.updateUnitCode.setValue("");	
	
	this.acceptOperator.setValue("");
	this.acceptTime.setValue("");
	this.acceptUnitCode.setValue("");
	this.acceptUnitName.setValue("");
	this.acceptPlaceName.setValue("");
	this.acceptInfocomments.setValue("");
	
	this.ceOccurPlaceCode.setValue("");
	this.ceOccurPlace.setValue("");
	this.ceOccurDate.setValue("");
	this.hasPersonKilled.setValue("");
	this.superviseLevel.setValue("");
	this.personKilledCnt.setValue("");
	this.ceClassCode1.setValue("");
	this.ceClassCode2.setValue("");
	this.ceClassCode3.setValue("");
	this.caseLoss.setValue("");
	this.ceSuspiciousAreaCode1.setValue("");
	this.ceSuspiciousAreaCode2.setValue("");
	this.ceSuspiciousAreaCode3.setValue("");
	this.cePremium.setValue("");
	this.basicInfocomments.setValue("");
	
	this.regiApprover.setValue("");
	this.regiTime.setValue("");
	this.regiUnitCode.setValue("");
	this.regiUnitName.setValue("");
	
	this.breakDate.setValue("");
	this.breakDateTypeCode.setValue("");
	this.breakMethodCode.setValue("");
	this.breakMethodDesc.setValue("");
	
	this.extractDate.setValue("");
	this.extractor1.setValue("");
	this.extractor2.setValue("");
	this.extractor3.setValue("");
	this.extractUnitName.setValue("");
	this.extractUnitCode.setValue("");
	
	this.extractInfocomments.setValue("");
	
	this.cancelDate.setValue("");
	this.cancelReasonCode.setValue("");
}

LPCaseEditPage.prototype.initDefault = function()
{
	if(this.defValue == null)return;
	
	for(var i=0;i<this.defValue.length;i++)
	{
		var v = this.defValue[i];	  
		var field = this.filedMap[v.k];
		if(field == null)continue;
		field.setValue(v.v);
	}
}

LPCaseEditPage.prototype.reSet = function()
{
	this.clear();
	this.initDefault();
}

LPCaseEditPage.prototype.setLPCaseObject = function(obj)
{
	this.reSet();
	this.srcCaseObj=new Array();
	this.oldObj=obj;
	var mainInfo="mainInfo";
	var acceptInfo="acceptInfo";
	var basicInfo="basicInfo";	
	var registerInfo="registerInfo";
	var breakInfo="breakInfo";	
	var extractInfo="extractInfo";	
	var cancelInfo="cancelInfo";
	var coopInvestInfo = "coopInvestInfo";
	
	
	var mainInfoA= this.crolArray[mainInfo];
	if(obj[mainInfo]!=null)
	{
		this.setContralValue(this.ceNum,obj[mainInfo][CaseEvent.CENUM]);
        this.setContralValue(this.abisCeNum,obj[mainInfo][CaseEvent.ABISCENUM]);
        this.setContralValue(this.sceneInvestNum,obj[mainInfo][CaseEvent.SCENEINVESTNUM]);
        this.setContralValue(this.policeNum,obj[mainInfo][CaseEvent.POLICENUM]);
		this.setContralValue(this.ceStatus,obj[mainInfo][CaseEvent.CESTATUS]);
		this.setContralValue(this.ceType,obj[mainInfo][CaseEvent.CETYPE]);		
		this.setContralValue(this.createUser,obj[mainInfo][CaseEvent.CREATEUSER]);		
		this.setContralValue(this.createTime,obj[mainInfo][CaseEvent.CREATETIME]);		
		this.setContralValue(this.ceName,obj[mainInfo][CaseEvent.CENAME]);		
		this.setContralValue(this.mainInfocomments,obj[mainInfo][CaseEvent.COMMENTS]);		
		this.setContralValue(this.updateUser,obj[mainInfo][CaseEvent.UPDATEUSER]);		
		this.setContralValue(this.updateTime,obj[mainInfo][CaseEvent.UPDATETIME]);		
		this.setContralValue(this.createUnitCode,obj[mainInfo][CaseEvent.CREATEUNITCODE]);		
		this.setContralValue(this.updateUnitCode,obj[mainInfo][CaseEvent.UPDATEUNITCODE]);
		this.setContralValue(this.dbCombo,obj[mainInfo][CaseEvent.DBID]);
		
	}
	else
	{
		for(var i=0;i<mainInfoA.length;i++)
		{
			var contral=mainInfoA[i];	
			var id=contral.getId();	
			this.srcCaseObj[id]="";			     		    
			contral.setText("");
		}
	}
	var acceptInfoA= this.crolArray[acceptInfo];
	if(obj[acceptInfo]!=null)
	{
		this.setContralValue(this.acceptOperator,obj[acceptInfo][CEAcceptInfo.ACCEPTOPERATOR]);
		this.setContralValue(this.acceptTime,obj[acceptInfo][CEAcceptInfo.ACCEPTTIME]);
		this.setContralValue(this.acceptUnitCode,obj[acceptInfo][CEAcceptInfo.ACCEPTUNITCODE]);
		this.setContralValue(this.acceptUnitName,obj[acceptInfo][CEAcceptInfo.ACCEPTUNITNAME]);
		this.setContralValue(this.acceptPlaceName,obj[acceptInfo][CEAcceptInfo.ACCEPTPLACENAME]);
		this.setContralValue(this.acceptInfocomments,obj[acceptInfo][CEAcceptInfo.ACCEPTCOMMENTS]);
	}
	else
	{
		for(var i=0;i<acceptInfoA.length;i++)
		{
			var contral=acceptInfoA[i];	
			var id=contral.getId();	
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
	var basicInfoA= this.crolArray[basicInfo];
	if(obj[basicInfo]!=null)
	{
		this.setContralValue(this.ceOccurPlaceCode,obj[basicInfo][CEBasicInfo.CEOCCURPLACECODE]);
		this.setContralValue(this.ceOccurPlace,obj[basicInfo][CEBasicInfo.CEOCCURPLACE]);
		this.setContralValue(this.ceOccurDate,obj[basicInfo][CEBasicInfo.CEOCCURDATE]);
		this.setContralValue(this.hasPersonKilled,obj[basicInfo][CEBasicInfo.HASPERSONKILLED]);
		this.setContralValue(this.personKilledCnt,obj[basicInfo][CEBasicInfo.PERSONKILLEDCNT]);
		this.setContralValue(this.ceClassCode1,obj[basicInfo][CEBasicInfo.CECLASSCODE1]);
		this.setContralValue(this.ceClassCode2,obj[basicInfo][CEBasicInfo.CECLASSCODE2]);
		this.setContralValue(this.ceClassCode3,obj[basicInfo][CEBasicInfo.CECLASSCODE3]);
		this.setContralValue(this.caseLoss,obj[basicInfo][CEBasicInfo.CASELOSS]);
		this.setContralValue(this.ceSuspiciousAreaCode1,obj[basicInfo][CEBasicInfo.CESUSPICIOUSAREACODE1]);
		this.setContralValue(this.ceSuspiciousAreaCode2,obj[basicInfo][CEBasicInfo.CESUSPICIOUSAREACODE2]);
		this.setContralValue(this.ceSuspiciousAreaCode3,obj[basicInfo][CEBasicInfo.CESUSPICIOUSAREACODE3]);
		this.setContralValue(this.cePremium,obj[basicInfo][CEBasicInfo.CEPREMIUM]);
		this.setContralValue(this.basicInfocomments,obj[basicInfo][CEBasicInfo.CECOMMENTS]);
	}
	else
	{
		for(var i=0;i<basicInfoA.length;i++)
		{
			var contral=basicInfoA[i];	
			var id=contral.getId();		
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
	var registerInfoA= this.crolArray[registerInfo];
	if(obj[registerInfo]!=null)
	{
		this.setContralValue(this.regiApprover,obj[registerInfo][CaseRegisterInfo.REGIAPPROVER]);
		this.setContralValue(this.regiTime,obj[registerInfo][CaseRegisterInfo.REGITIME]);
		this.setContralValue(this.regiUnitCode,obj[registerInfo][CaseRegisterInfo.REGIUNITCODE]);
		this.setContralValue(this.regiUnitName,obj[registerInfo][CaseRegisterInfo.REGIUNITNAME]);
	}
	else
	{
		for(var i=0;i<registerInfoA.length;i++)
		{
			var contral=registerInfoA[i];	
			var id=contral.getId();			
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
	var breakInfoA= this.crolArray[breakInfo];
	if(obj[breakInfo]!=null)
	{
		this.setContralValue(this.breakDate,obj[breakInfo][CaseBreakInfo.BREAKDATE]);
		this.setContralValue(this.breakDateTypeCode,obj[breakInfo][CaseBreakInfo.BREAKDATETYPECODE]);
		this.setContralValue(this.breakMethodCode,obj[breakInfo][CaseBreakInfo.BREAKMETHODCODE]);
		this.setContralValue(this.breakMethodDesc,obj[breakInfo][CaseBreakInfo.BREAKMETHODDESC]);
	}
	else
	{
		for(var i=0;i<breakInfoA.length;i++)
		{
			var contral=breakInfoA[i];	
			var id=contral.getId();			
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
	var extractInfoA= this.crolArray[extractInfo];
	if(obj[extractInfo]!=null)
	{
		this.setContralValue(this.extractDate,obj[extractInfo][CaseExtractInfo.EXTRACTDATE]);
		this.setContralValue(this.extractor1,obj[extractInfo][CaseExtractInfo.EXTRACTOR1]);
		this.setContralValue(this.extractor2,obj[extractInfo][CaseExtractInfo.EXTRACTOR2]);
		this.setContralValue(this.extractor3,obj[extractInfo][CaseExtractInfo.EXTRACTOR3]);
		this.setContralValue(this.extractUnitName,obj[extractInfo][CaseExtractInfo.EXTRACTUNITNAME]);
		this.setContralValue(this.extractUnitCode,obj[extractInfo][CaseExtractInfo.EXTRACTUNITCODE]);		
		this.setContralValue(this.extractInfocomments,obj[extractInfo][CaseExtractInfo.EXTRACTCOMMENTS]);
	}
	else
	{
		for(var i=0;i<extractInfoA.length;i++)
		{
			var contral=extractInfoA[i];	
			var id=contral.getId();		
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
	var cancelInfoA= this.crolArray[cancelInfo];
	if(obj[cancelInfo]!=null)
	{
		this.setContralValue(this.cancelDate,obj[cancelInfo][CECancelInfo.CANCELDATE]);
		this.setContralValue(this.cancelReasonCode,obj[cancelInfo][CECancelInfo.CANCELREASONCODE]);
	}
	else
	{
		for(var i=0;i<cancelInfoA.length;i++)
		{
			var contral=cancelInfoA[i];	
			var id=contral.getId();				 
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
	//新增一个对象 CoopInvestInfo  hjx 2017年3月15日
	var CoopInvestInfoA= this.crolArray[coopInvestInfo];
	if(obj[coopInvestInfo]!=null)
	{
		this.setContralValue(this.superviseLevel,obj[coopInvestInfo]['superviseLevel']);
	}	
	else
	{
		for(var i=0;i<CoopInvestInfoA.length;i++)
		{
			var contral=CoopInvestInfoA[i];	
			var id=contral.getId();				 
		    this.srcCaseObj[id]="";	
			contral.setText("");
		}
	}
}

LPCaseEditPage.prototype.setContralValue =function(contral,value)
{
	var id=contral.getId();
	this.srcCaseObj[id]=value;
	if(!WebUtil.isNull(value))
		contral.setValue(value);
}
LPCaseEditPage.prototype.update = function(field)
{
	if(field!=null&&field.length>0)
	{
		var mainInfo="mainInfo";
		var acceptInfo="acceptInfo";
		var basicInfo="basicInfo";
		var registerInfo="registerInfo";
		var breakInfo="breakInfo";
		var extractInfo="extractInfo";
		var cancelInfo="cancelInfo";
		var mainInfoA= this.crolArray[mainInfo];
		for(var i=0;i<mainInfoA.length;i++)
			{
			     var contral=mainInfoA[i];	
			     var id=contral.getId();
			     //禁止更新项验证
			     var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
			     if(!forbidden)
			    	 contral.setEditable(false);
			}
		var acceptInfoA= this.crolArray[acceptInfo];
		for(var i=0;i<acceptInfoA.length;i++)
		{
			var contral=acceptInfoA[i];	
			var id=contral.getId();
		    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
		     if(!forbidden)
		    	 contral.setEditable(false);
		}
		var basicInfoA= this.crolArray[basicInfo];
		for(var i=0;i<basicInfoA.length;i++)
		{
			var contral=basicInfoA[i];	
			var id=contral.getId();
		     var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
		     if(!forbidden)
		    	 contral.setEditable(false);
		}
		var registerInfoA= this.crolArray[registerInfo];
		for(var i=0;i<registerInfoA.length;i++)
		{
			var contral=registerInfoA[i];	
			var id=contral.getId();
		     var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
		     if(!forbidden)
		    	 contral.setEditable(false);
		}
		var breakInfoA= this.crolArray[breakInfo];
		for(var i=0;i<breakInfoA.length;i++)
		{
			var contral=breakInfoA[i];	
			var id=contral.getId();
		     var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
		     if(!forbidden)
		    	 contral.setEditable(false);
		}
		var extractInfoA= this.crolArray[extractInfo];
		for(var i=0;i<extractInfoA.length;i++)
		{
			var contral=extractInfoA[i];	
			var id=contral.getId();
			var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
			if(!forbidden)
				contral.setEditable(false);
		}
		var cancelInfoA= this.crolArray[cancelInfo];
		for(var i=0;i<cancelInfoA.length;i++)
		{
			var contral=cancelInfoA[i];	
			var id=contral.getId();
			var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
			if(!forbidden)
				contral.setEditable(false);
		}
	}
	
}
LPCaseEditPage.prototype.isChanged=function(src,des)
{
	if(src==null&&des=="")
	{
		return false;
	}
	else if(src==des)
	{
		return false;
	}
	else
	{
		return true;
	}
}

