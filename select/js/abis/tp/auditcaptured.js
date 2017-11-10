/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AuditCaptured(requiredField,updateField)
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
AuditCaptured.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	this.capturedId 				= WebUI.createText("capturedIdId","capturedId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.capturedId);
	
	//人员信息							
//	this.taskType 				= WebUI.createCombo("taskTypeId","taskType",null,null,true,true,"RMT_TASK_OP_DETAIL|TASK_TYPE","",this.requiredField);
//	this.initMap(textArray,this.taskType);
//	this.priority 				= WebUI.createCombo("priorityId","priority",null,null,true,true,"WANTED_PERSON_AUDIT_QUE|PRIORITY","",this.requiredField);
//	this.initMap(textArray,this.priority);
//	this.status 			= WebUI.createCombo("statusId","status",null,null,true,true,"WANTED_PERSON_AUDIT_QUE|PERSON_STATUS","",this.requiredField);
//	this.initMap(textArray,this.status);
	this.auditResult 			= WebUI.createCombo("auditResultId","auditResult",null,null,true,true,"CAPTURED_AUDIT_LOG|AUDIT_RESULT","",this.requiredField);	this.initMap(textArray,this.auditResult);
	
	this.initComboData();	
	
}
AuditCaptured.prototype.initMap = function(map,contro)
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
AuditCaptured.prototype.register = function(contro)
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
AuditCaptured.prototype.isTxtInfoChanged = function()
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
AuditCaptured.prototype.validateRequired = function()
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
AuditCaptured.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AuditCaptured.prototype.initComboData = function()
{
	var columnnames = ['RMT_TASK_OP_DETAIL|TASK_TYPE','WANTED_PERSON_AUDIT_QUE|PRIORITY','WANTED_PERSON_AUDIT_QUE|STATUS','CAPTURED_AUDIT_LOG|AUDIT_RESULT'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AuditCaptured.prototype.getComboData = function(data)
{
	data = eval('(' + data + ')');
//	this.taskType.setComboData(data['rmt_task_op_detail|task_type']);
//	this.priority.setComboData(data['wanted_person_audit_que|priority']);
//	this.status.setComboData(data['wanted_person_audit_que|status']);
	var auditResults = data['captured_audit_log|audit_result'];
	for(var i=0;i<auditResults.length;i++){
		var obj = auditResults[i];
		if (obj.code  == '0')
		{
			auditResults.splice(i,1);
			break;
		}
	}
	this.auditResult.setComboData(auditResults);
	//this.auditResult.setComboData(data['captured_audit_log|audit_result']);
}
AuditCaptured.prototype.update = function(field)
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

AuditCaptured.prototype.setWanted = function(searchStr,datamgr)
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
					var dataLink = data.dataLink;
					
					if(!WebUtil.isNull(mainInfo))
					{
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
						$("#createTime").html(mainInfo.createTime);
						$("#updateUser").html(mainInfo.updateUser);
						$("#updateTime").html(mainInfo.updateTime);
						$("#createUnitCode").html(mainInfo.createUnitCode);
						$("#updateUnitCode").html(mainInfo.updateUnitCode);
						$("#comments").html(mainInfo.comments);
					}
					if(!WebUtil.isNull(dataLink))
					{
						var dataLinkData = eval('('+dataLink+')');
						datamgr.setInput(dataLinkData);
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

AuditCaptured.prototype.setCaptured = function(searchStr)
{	
	var url = WebVar.VarPath + "/tp/auditcaptured/audit/";
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
					var capturedmain = data.capturedmain;
					if(!WebUtil.isNull(capturedmain))
					{
						$("#capturedId").val(capturedmain.id);
						$("#capturedstatus").html(capturedmain.statusText);
						$("#createUser").html(capturedmain.createUser);
						$("#createTime").html(capturedmain.createTimeText);
						$("#createUnitCode").html(capturedmain.createUnitCode);
						$("#updateUser").html(capturedmain.updateUser);
						$("#updateTime").html(capturedmain.updateTimeText);
						$("#updateUnitCode").html(capturedmain.updateUnitCode);
						$("#captureDate").html(capturedmain.captureDateText);
						$("#captureMethod").html(capturedmain.captureMethodText);
						$("#captureAddressCode").html(capturedmain.captureAddressCode);
						$("#captureAddress").html(capturedmain.captureAddress);
						$("#captureUnitCode").html(capturedmain.captureUnitCode);
						$("#captureUnitName").html(capturedmain.captureUnitName);
						$("#captureUnitType").html(capturedmain.captureUnitTypeText);
						$("#captureFillInUser").html(capturedmain.captureFillInUser);
						$("#captureFillInDate").html(capturedmain.captureFillInDateText);
						$("#reqEnrollUser").html(capturedmain.reqEnrollUser);
						$("#reqEnrollDate").html(capturedmain.reqEnrollDate);
						$("#reqApprovedBy").html(capturedmain.reqApprovedBy);
						$("#reqApprovedDate").html(capturedmain.reqApprovedDateText);
						$("#reqUnitCode").html(capturedmain.reqUnitCode);
						$("#reqUnitName").html(capturedmain.reqUnitName);
						$("#gabZtCardNo").html(capturedmain.gabZtCardNo);
						
					}
					else
					{
						subAudit.setEnabled(false);
            			getCaptured.setEnabled(true);
            			aboutCatured.setEnabled(false);
            			alert(""+searchStr.NotData+"!");
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

AuditCaptured.prototype.cleanCaptured = function()
{	
	var vthis = this;
	$("#capturedId").val("");
//	vthis.taskType.clear();
//	vthis.priority.clear();
//	vthis.status.clear();
	vthis.auditResult.clear();
	$("#capturedstatus").html("");
	$("#createUser").html("");
	$("#createTime").html("");
	$("#createUnitCode").html("");
	$("#updateUser").html("");
	$("#updateTime").html("");
	$("#updateUnitCode").html("");
	$("#captureDate").html("");
	$("#captureMethod").html("");
	$("#captureAddressCode").html("");
	$("#captureAddress").html("");
	$("#captureUnitCode").html("");
	$("#captureUnitName").html("");
	$("#captureUnitType").html("");
	$("#captureFillInUser").html("");
	$("#captureFillInDate").html("");
	$("#reqEnrollUser").html("");
	$("#reqEnrollDate").html("");
	$("#reqApprovedBy").html("");
	$("#reqApprovedDate").html("");
	$("#reqUnitCode").html("");
	$("#reqUnitName").html("");
	$("#gabZtCardNo").html("");
}


