/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AuditWanted(requiredField,updateField)
{	
	this.crolArray=new Array();
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#AuditWanted").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
    );
}
var textArray = new Array();
AuditWanted.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	this.wantedId 				= WebUI.createText("wantedIdId","wantedId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.wantedId);
	
	this.createTime 			= WebUI.createDateText("createTimeId","createTime","WebTextField","",this.requiredField);
	this.initMap(textArray,this.createTime);
	this.workingTime 			= WebUI.createDateText("workingTimeId","workingTime","WebTextField","",this.requiredField);
	this.initMap(textArray,this.workingTime);
	
	//人员信息							
//	this.taskType 				= WebUI.createCombo("taskTypeId","taskType",null,null,true,true,"RMT_TASK_OP_DETAIL|TASK_TYPE","",this.requiredField);
//	this.initMap(textArray,this.taskType);
//	this.priority 				= WebUI.createCombo("priorityId","priority",null,null,true,true,"WANTED_PERSON_AUDIT_QUE|PRIORITY","",this.requiredField);
//	this.initMap(textArray,this.priority);
	
//	this.status 			= WebUI.createCombo("statusId","status",null,null,true,true,"WANTED_PERSON_AUDIT_QUE|PERSON_STATUS","",this.requiredField);
//	this.initMap(textArray,this.status);
	this.auditResult 			= WebUI.createCombo("auditResultId","auditResult",null,null,true,true,"WANTED_PERSON_AUDIT_LOG|AUDIT_RESULT","",this.requiredField);
	this.initMap(textArray,this.auditResult);
	
	this.initComboData();	
	
}
AuditWanted.prototype.initMap = function(map,contro)
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
AuditWanted.prototype.register = function(contro)
{
	var nthis = this;
	contro.addChangeListener(textChange);
	function textChange()
	{				
		var id=contro.getId();		 
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
AuditWanted.prototype.isTxtInfoChanged = function()
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
AuditWanted.prototype.validateRequired = function()
{
	var flag = true;
	//验证必填项是否都填了
	var n = 0;
	for(var i = 0;i < this.requiredMap.length; i++)
	{
		var text = this.requiredMap[i].getText();
		if(text == null || text == "")
		{
			n = n+1;
		}
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
AuditWanted.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AuditWanted.prototype.initComboData = function()
{
	var columnnames = ['RMT_TASK_OP_DETAIL|TASK_TYPE','WANTED_PERSON_AUDIT_QUE|PRIORITY','WANTED_PERSON_AUDIT_QUE|STATUS','WANTED_PERSON_AUDIT_LOG|AUDIT_RESULT'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AuditWanted.prototype.getComboData = function(data)
{
	data = eval('(' + data + ')');
	//this.taskType.setComboData(data['rmt_task_op_detail|task_type']);
	//this.priority.setComboData(data['wanted_person_audit_que|priority']);
//	this.status.setComboData(data['wanted_person_audit_que|status']);
	this.auditResult.setComboData(data['wanted_person_audit_log|audit_result']);
}
AuditWanted.prototype.update = function(field)
{	
	for(var i = 0;i < this.crolArray.length; i++)
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

var gupData = null;
AuditWanted.prototype.setWanted = function(searchStr,datamgr,supmgr,groutMgr,dataMgrLink)
{	
	var url = WebVar.VarPath + "/tp/auditwanted/audit";
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
					data = data.model;
					var mainInfo = data.wantedmain;
					var caseInfo = data.caseInfo;
					var personInfo = data.personInfo;
					var dataLink = data.dataLink;
//					var supToJson = data.supToJson;
					var gupToJson = data.gupToJson;
					var linkInfo = data.linkInfo;
					
					if(!WebUtil.isNull(mainInfo))
					{
						$("#wantedId").val(mainInfo.id);
						$("#wantedNo").html(mainInfo.wantedNo);
						$("#wantedtype").html(mainInfo.wantedTypeText);
						$("#wantedStatus").html(mainInfo.wantedStatusText);
						$("#wantedBy").html(mainInfo.wantedBy);
						$("#arrestLevel").html(mainInfo.arrestLevelText);
						$("#wantedLevel").html(mainInfo.wantedLevelText);
						$("#escapeDate").html(mainInfo.escapeDate);
						$("#escapeDirection").html(mainInfo.escapeDirection);
						$("#escapeType").html(mainInfo.escapeTypeText);
						$("#fillInUser").html(mainInfo.fillInUser);
						$("#fillInTime").html(mainInfo.fillInTimeText);
						$("#fillInApprovedBy").html(mainInfo.fillInApprovedBy);
						$("#fillInUnitCode").html(mainInfo.fillInUnitCode);
						$("#ztwFillInUser").html(mainInfo.ztwFillInUser);
						$("#ztwFillInTime").html(mainInfo.ztwFillInTimeText);
						$("#ztwFillInApprovedBy").html(mainInfo.ztwFillInApprovedBy);
						$("#ztwFillInUnitCode").html(mainInfo.ztwFillInUnitCode);
						$("#expirationDate").html(mainInfo.expirationDateText);
						$("#award").html(mainInfo.award);
						$("#contacter").html(mainInfo.contacter);
						$("#contacterPhone").html(mainInfo.contacterPhone);
						$("#createUser").html(mainInfo.createUser);
						$("#createTime").html(mainInfo.createTimeText);
						$("#updateUser").html(mainInfo.updateUser);
						$("#updateTime").html(mainInfo.updateTimeText);
						$("#createUnitCode").html(mainInfo.createUnitCode);
						$("#updateUnitCode").html(mainInfo.updateUnitCode);
						$("#comments").html(mainInfo.comments);
					}
					else
					{
						subFin.setEnabled(false);
            			getwanted.setEnabled(true);
            			abortWanted.setEnabled(false);
						alert(""+searchStr.NotData+"!");
					}
					if(!WebUtil.isNull(caseInfo))
					{
						$("#caseNum").html(caseInfo.caseNum);
						$("#caseDesc").html(caseInfo.caseDesc);
						$("#regiUnitCode").html(caseInfo.regiUnitCode);
						$("#regiDate").html(caseInfo.regiDateText);
						$("#regiUnitName").html(caseInfo.regiUnitName);
						$("#regiUnitType").html(caseInfo.regiUnitTypeText);
						$("#zbUnitCode").html(caseInfo.zbUnitCode);
						$("#zbUnitName").html(caseInfo.zbUnitName);
						$("#caseClassCode").html(caseInfo.caseClassCodeText);
						$("#superviseLevel").html(caseInfo.superviseLevelText);
						$("#caseOccurDate").html(caseInfo.caseOccurDateText);
						$("#caseOccurPlaceCode").html(caseInfo.caseOccurPlaceCode);
						$("#caseOccurPlace").html(caseInfo.caseOccurPlace);
						$("#caseLoss").html(caseInfo.caseLoss);
						$("#caseCommitType").html(caseInfo.caseCommitType);
					}
					if(!WebUtil.isNull(personInfo))
					{
						$("#name").html(personInfo.name);
						$("#alias").html(personInfo.alias);
						$("#birthDate").html(personInfo.birthDate);
						$("#sexCode").html(personInfo.sexCodeText);
						$("#nation").html(personInfo.nationText);
						$("#nationality").html(personInfo.nationalityText);
						$("#certificateType").html(personInfo.certificateTypeText);
						$("#certificateCode").html(personInfo.certificateCode);
						$("#shenFenId").html(personInfo.shenFenId);
						$("#hukouPlaceCode").html(personInfo.hukouPlaceCode);
						$("#hukouPlace").html(personInfo.hukouPlace);
						$("#addressCode").html(personInfo.addressCode);
						$("#addressDetail").html(personInfo.addressDetail);
						$("#bodyHeight").html(personInfo.bodyHeight);
						$("#accentCode").html(personInfo.accentCodeText);
						$("#occupationCode").html(personInfo.occupationCodeText);
						$("#bodyFeature").html(personInfo.bodyFeature);
						$("#smt").html(personInfo.smt);
					}
					if(!WebUtil.isNull(dataLink))
					{
						var dataLinkData = eval('('+dataLink+')');
						datamgr.setInput(dataLinkData);
					}
//					if(!WebUtil.isNull(supToJson))
//					{
//						var supToJsonData = eval('('+supToJson+')');
//						supmgr.setInput(supToJsonData);
//					}
					if(!WebUtil.isNull(gupToJson))
					{
						var gupToJsonData = eval('('+gupToJson+')');
						gupData = gupToJsonData;
						groutMgr.setInput(gupToJsonData);
						if(!WebUtil.isNull(gupToJsonData))
						{
							if(WebUtil.isNull(gupToJsonData.result))
							{
								$("#groupId").hide();
							}
							if(!WebUtil.isNull(gupToJsonData.result))
							{
								$("#groupId").show();
							}
						}
					}
					else
					{
						$("#groupId").hide();
					}
					if(!WebUtil.isNull(linkInfo))
					{
		        		var linkInfo = eval('('+ linkInfo +')');
		        		var dataType = null;
		        		var dataId = null;
		        		if(!WebUtil.isNull(linkInfo))
		        		{
		        			dataType = linkInfo[0].data1Type;
		        			dataId = linkInfo[0].data1Id;
		        		}
		        		dataMgrLink = new DataLink("datalinkId",null,pageNumStr,dataType,dataId);
		        		$("#linkId").show();
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

AuditWanted.prototype.setbatchWanted = function(searchStr,datamgr,supmgr,groutMgr,dataMgrLink,auditId)
{	
	var url = WebVar.VarPath + "/tp/auditwanted/findAuditInfo/"+auditId;
	var vthis = this;
	jQuery.ajax 
	( 
        {
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : auditId,
			dataType : 'json',
			success : function(data) 
			{   
				if(data != null)
				{
					var mainInfo = data.wantedmain;
					var caseInfo = data.caseInfo;
					var personInfo = data.personInfo;
					var dataLink = data.dataLink;
//					var supToJson = data.supToJson;
					var gupToJson = data.gupToJson;
					var linkInfo = data.linkInfo;
					
					if(!WebUtil.isNull(mainInfo))
					{
						$("#wantedId").val(mainInfo.id);
						$("#wantedNo").html(mainInfo.wantedNo);
						$("#wantedtype").html(mainInfo.wantedTypeText);
						$("#wantedStatus").html(mainInfo.wantedStatusText);
						$("#wantedBy").html(mainInfo.wantedBy);
						$("#arrestLevel").html(mainInfo.arrestLevelText);
						$("#wantedLevel").html(mainInfo.wantedLevelText);
						$("#escapeDate").html(mainInfo.escapeDate);
						$("#escapeDirection").html(mainInfo.escapeDirection);
						$("#escapeType").html(mainInfo.escapeTypeText);
						$("#fillInUser").html(mainInfo.fillInUser);
						$("#fillInTime").html(mainInfo.fillInTimeText);
						$("#fillInApprovedBy").html(mainInfo.fillInApprovedBy);
						$("#fillInUnitCode").html(mainInfo.fillInUnitCode);
						$("#ztwFillInUser").html(mainInfo.ztwFillInUser);
						$("#ztwFillInTime").html(mainInfo.ztwFillInTimeText);
						$("#ztwFillInApprovedBy").html(mainInfo.ztwFillInApprovedBy);
						$("#ztwFillInUnitCode").html(mainInfo.ztwFillInUnitCode);
						$("#expirationDate").html(mainInfo.expirationDateText);
						$("#award").html(mainInfo.award);
						$("#contacter").html(mainInfo.contacter);
						$("#contacterPhone").html(mainInfo.contacterPhone);
						$("#createUser").html(mainInfo.createUser);
						$("#createTime").html(mainInfo.createTimeText);
						$("#updateUser").html(mainInfo.updateUser);
						$("#updateTime").html(mainInfo.updateTimeText);
						$("#createUnitCode").html(mainInfo.createUnitCode);
						$("#updateUnitCode").html(mainInfo.updateUnitCode);
						$("#comments").html(mainInfo.comments);
					}
					else
					{
						subFin.setEnabled(false);
            			getwanted.setEnabled(true);
            			abortWanted.setEnabled(false);
						alert(""+searchStr.NotData+"!");
					}
					if(!WebUtil.isNull(caseInfo))
					{
						$("#caseNum").html(caseInfo.caseNum);
						$("#caseDesc").html(caseInfo.caseDesc);
						$("#regiUnitCode").html(caseInfo.regiUnitCode);
						$("#regiDate").html(caseInfo.regiDateText);
						$("#regiUnitName").html(caseInfo.regiUnitName);
						$("#regiUnitType").html(caseInfo.regiUnitTypeText);
						$("#zbUnitCode").html(caseInfo.zbUnitCode);
						$("#zbUnitName").html(caseInfo.zbUnitName);
						$("#caseClassCode").html(caseInfo.caseClassCodeText);
						$("#superviseLevel").html(caseInfo.superviseLevelText);
						$("#caseOccurDate").html(caseInfo.caseOccurDateText);
						$("#caseOccurPlaceCode").html(caseInfo.caseOccurPlaceCode);
						$("#caseOccurPlace").html(caseInfo.caseOccurPlace);
						$("#caseLoss").html(caseInfo.caseLoss);
						$("#caseCommitType").html(caseInfo.caseCommitType);
					}
					if(!WebUtil.isNull(personInfo))
					{
						$("#name").html(personInfo.name);
						$("#alias").html(personInfo.alias);
						$("#birthDate").html(personInfo.birthDate);
						$("#sexCode").html(personInfo.sexCodeText);
						$("#nation").html(personInfo.nationText);
						$("#nationality").html(personInfo.nationalityText);
						$("#certificateType").html(personInfo.certificateTypeText);
						$("#certificateCode").html(personInfo.certificateCode);
						$("#shenFenId").html(personInfo.shenFenId);
						$("#hukouPlaceCode").html(personInfo.hukouPlaceCode);
						$("#hukouPlace").html(personInfo.hukouPlace);
						$("#addressCode").html(personInfo.addressCode);
						$("#addressDetail").html(personInfo.addressDetail);
						$("#bodyHeight").html(personInfo.bodyHeight);
						$("#accentCode").html(personInfo.accentCodeText);
						$("#occupationCode").html(personInfo.occupationCodeText);
						$("#bodyFeature").html(personInfo.bodyFeature);
						$("#smt").html(personInfo.smt);
					}
					if(!WebUtil.isNull(dataLink))
					{
						var dataLinkData = eval('('+dataLink+')');
						datamgr.setInput(dataLinkData);
					}
//					if(!WebUtil.isNull(supToJson))
//					{
//						var supToJsonData = eval('('+supToJson+')');
//						supmgr.setInput(supToJsonData);
//					}
					if(!WebUtil.isNull(gupToJson))
					{
						var gupToJsonData = eval('('+gupToJson+')');
						gupData = gupToJsonData;
						groutMgr.setInput(gupToJsonData);
						if(!WebUtil.isNull(gupToJsonData))
						{
							if(WebUtil.isNull(gupToJsonData.result))
							{
								$("#groupId").hide();
							}
							if(!WebUtil.isNull(gupToJsonData.result))
							{
								$("#groupId").show();
							}
						}
					}
					else
					{
						$("#groupId").hide();
					}
					if(!WebUtil.isNull(linkInfo))
					{
		        		var linkInfo = eval('('+ linkInfo +')');
		        		var dataType = null;
		        		var dataId = null;
		        		if(!WebUtil.isNull(linkInfo))
		        		{
		        			dataType = linkInfo[0].data1Type;
		        			dataId = linkInfo[0].data1Id;
		        		}
		        		dataMgrLink = new DataLink("datalinkId",null,pageNumStr,dataType,dataId);
		        		$("#linkId").show();
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


AuditWanted.prototype.getgupData = function()
{	
	return gupData;
}

AuditWanted.prototype.setdataLink = function(mgr)
{	
	
}

AuditWanted.prototype.setSupToJon = function(mgr,data)
{	
	var data = eval('('+data+')');
	mgr.setInput(data);
}

AuditWanted.prototype.cleanWanted = function()
{	
		var vthis = this;
		$("#wantedId").val("");
//		vthis.taskType.clear();
//		vthis.priority.clear();
//		vthis.status.clear();
		vthis.auditResult.clear();
		$("#wantedNo").html("");
		$("#wantedtype").html("");
		$("#wantedStatus").html("");
		$("#wantedBy").html("");
		$("#arrestLevel").html("");
		$("#wantedLevel").html("");
		$("#escapeDate").html("");
		$("#escapeDirection").html("");
		$("#escapeType").html("");
		$("#fillInUser").html("");
		$("#fillInTime").html("");
		$("#fillInApprovedBy").html("");
		$("#fillInUnitCode").html("");
		$("#ztwFillInUser").html("");
		$("#ztwFillInTime").html("");
		$("#ztwFillInApprovedBy").html("");
		$("#ztwFillInUnitCode").html("");
		$("#expirationDate").html("");
		$("#award").html("");
		$("#contacter").html("");
		$("#contacterPhone").html("");
		$("#createUser").html("");
		$("#createTime").html("");
		$("#updateUser").html("");
		$("#updateTime").html("");
		$("#createUnitCode").html("");
		$("#updateUnitCode").html("");
		$("#comments").html("");
		
		$("#caseNum").html("");
		$("#caseDesc").html("");
		$("#regiUnitCode").html("");
		$("#regiDate").html("");
		$("#regiUnitName").html("");
		$("#regiUnitType").html("");
		$("#zbUnitCode").html("");
		$("#zbUnitName").html("");
		$("#caseClassCode").html("");
		$("#superviseLevel").html("");
		$("#caseOccurDate").html("");
		$("#caseOccurPlaceCode").html("");
		$("#caseOccurPlace").html("");
		$("#caseLoss").html("");
		$("#caseCommitType").html("");
		$("#name").html("");
		$("#alias").html("");
		$("#birthDate").html("");
		$("#sexCode").html("");
		$("#nation").html("");
		$("#nationality").html("");
		$("#certificateType").html("");
		$("#certificateCode").html("");
		$("#shenFenId").html("");
		$("#hukouPlaceCode").html("");
		$("#hukouPlace").html("");
		$("#addressCode").html("");
		$("#addressDetail").html("");
		$("#bodyHeight").html("");
		$("#accentCode").html("");
		$("#occupationCode").html("");
		$("#bodyFeature").html("");
		$("#smt").html("");
}

AuditWanted.prototype.setLPRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/wanted/getCLPCase/" + rows[0].ID;
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
					if(!WebUtil.isNull(mainInfo))
					{
						$("#lp_caseId").val(mainInfo.id); 
						$("#case_num").val(mainInfo.ceNum); 
					}
					if(!WebUtil.isNull(basicInfo))
					{
						vthis.ce_class_code.setComboCode(basicInfo.ceClassCode1); //ce_class_code//ce_class_code1textfieldfalse
					}
					if(!WebUtil.isNull(registerInfo))
					{
						$("#regi_time").val(registerInfo.regiTime);
						vthis.regi_unit_code.setComboCode(registerInfo.regiUnitCode);
					}
					if(!WebUtil.isNull(acceptInfo))
					{
						vthis.accept_unit_code.setComboCode(acceptInfo.acceptUnitCode);
					}
					if(!WebUtil.isNull(breakInfo))
					{
						$("#break_method_desc").val(breakInfo.breakMethodDesc);
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

