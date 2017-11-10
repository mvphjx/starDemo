/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function CanceledWanted(requiredField,updateField)
{	
	this.crolArray=new Array();
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#CanceledWanted").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
    );
}
var textArray = new Array();
CanceledWanted.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	this.captureId 				= WebUI.createText("captureIdId","captureId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.captureId);
	this.wantedId 				= WebUI.createText("wantedIdId","wantedId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.wantedId);
	this.cancelDate 			= WebUI.createText("cancelDateId","cancelDate","WebTextField","",this.requiredField);
	this.initMap(textArray,this.cancelDate);
	this.cancelApprovedBy 		= WebUI.createText("cancelApprovedById","cancelApprovedBy","WebTextField","",this.requiredField);
	this.initMap(textArray,this.cancelApprovedBy);
	
	this.cancelReason 			= WebUI.createCombo("cancelReasonId","cancelReason",null,null,true,true,"WANTED_PERSON_CANCELED_LOG|CANCEL_REASON","",this.requiredField);
	this.initMap(textArray,this.cancelReason);
	
	this.initComboData();
	
	this.cancelDate.setEditable(false);
	
}
CanceledWanted.prototype.initMap = function(map,contro)
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
CanceledWanted.prototype.register = function(contro)
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
CanceledWanted.prototype.isTxtInfoChanged = function()
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
CanceledWanted.prototype.validateRequired = function()
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
CanceledWanted.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
CanceledWanted.prototype.initComboData = function()
{
	var columnnames = ['WANTED_PERSON_CANCELED_LOG|CANCEL_REASON'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
CanceledWanted.prototype.getComboData = function(data)
{
	data = eval('(' + data + ')');
	this.cancelReason.setComboData(data['wanted_person_canceled_log|cancel_reason']);
}
CanceledWanted.prototype.update = function(field)
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

CanceledWanted.prototype.setWantedRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/canceledwanted/getCWanted/" + rows[0].ID;
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
					var mainInfo = data.wanted;
					var caseInfo = data.caseInfo;
					var personInfo = data.personInfo;
					
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
						$("#createTime").html(mainInfo.createTime);
						$("#updateUser").html(mainInfo.updateUser);
						$("#updateTime").html(mainInfo.updateTime);
						$("#createUnitCode").html(mainInfo.createUnitCode);
						$("#updateUnitCode").html(mainInfo.updateUnitCode);
						$("#comments").html(mainInfo.comments);
					}
					else
					{
						alert(""+searchStr.NotData+"!");
						subcancel.setEnabled(false);
						getwanted.setEnabled(true);
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
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

CanceledWanted.prototype.cleanWanted = function()
{	
		$("#wantedId").val("");
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
}

