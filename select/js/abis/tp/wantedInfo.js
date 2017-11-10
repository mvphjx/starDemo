/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddWanted(requiredField,updateField)
{	
	this.crolArray=new Array();
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#AddWanted").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
    );
}
var textArray = new Array();
AddWanted.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	
	//人员信息							
	this.sex_code 				= WebUI.createCombo("sex_codeId","sex_code",null,null,true,false,"MIS_PERSON_BASIC_INFO|SEX_CODE","",this.requiredField);
	this.initMap(textArray,this.sex_code);
	this.nation 				= WebUI.createCombo("nationId","nation",null,null,true,false,"MIS_PERSON_BASIC_INFO|NATION","",this.requiredField);
	this.initMap(textArray,this.nation);
	this.nationality 			= WebUI.createCombo("nationalityId","nationality",null,null,true,false,"MIS_PERSON_BASIC_INFO|MIN_ZU","",this.requiredField);
	this.initMap(textArray,this.nationality);
	this.certificate_type		= WebUI.createCombo("certificate_typeId","certificate_type",null,null,true,false,"LTL_HITLOG_TP_INFO|CERTIFICATE_TYPE","",this.requiredField);
	this.initMap(textArray,this.certificate_type);
	this.hukou_place_code 		= WebUI.createCombo("hukou_place_codeId","hukou_place_code",null,"hukou_PlaceId",false,false,"MIS_PERSON_BASIC_INFO|UNIT_CODE","",this.requiredField);
	this.initMap(textArray,this.hukou_place_code);
	this.hukou_Place 			= WebUI.createCodeText("hukou_PlaceId","hukou_Place","AddressDetail",null,this.requiredList);
	this.initMap(textArray,this.hukou_Place);
	this.address_code 			= WebUI.createCombo("address_codeId","address_code",null,"addressId",false,false,"MIS_PERSON_BASIC_INFO|UNIT_CODE","",this.requiredField);
	this.initMap(textArray,this.address_code);
	this.address 				= WebUI.createCodeText("addressId","address","AddressDetail",null,this.requiredList);
	this.initMap(textArray,this.address);
	this.accent			 		= WebUI.createCombo("accentId","accent",null,null,true,false,"MIS_PERSON_BODY_INFO|ACCENT_CODE","",this.requiredField);
	this.initMap(textArray,this.accent);
//	this.occupation			 	= WebUI.createText("occupationId","occupation","WebTextField","",this.requiredField);
//	this.initMap(textArray,this.occupation);
	
	this.tp_card_num 			= WebUI.createText("tp_card_numId","tp_card_num","WebTextField","",this.requiredField);
	this.initMap(textArray,this.tp_card_num);
	this.name 					= WebUI.createText("nameId","name","WebTextField","",this.requiredField);
	this.initMap(textArray,this.name);
	this.person_num				= WebUI.createText("person_numId","person_num","WebTextField","",this.requiredField);
	this.initMap(textArray,this.person_num);
	this.alias 					= WebUI.createText("aliasId","alias","WebTextField","",this.requiredField);
	this.initMap(textArray,this.alias);
	this.birth_date 				= WebUI.createText("birth_dateId","birth_date","WebTextField","",this.requiredField);
	this.initMap(textArray,this.birth_date);
	this.cert_num 				= WebUI.createText("cert_numId","cert_num","WebTextField","",this.requiredField);
	this.initMap(textArray,this.cert_num);
	this.shenfen_id 			= WebUI.createText("shenfen_IdId","shenfen_id","WebTextField","",this.requiredField);
	this.initMap(textArray,this.shenfen_id);
	this.body_Height 			= WebUI.createText("body_HeightId","body_Height","WebTextField","",this.requiredField);
	this.initMap(textArray,this.body_Height);
	this.body_Feature 			= WebUI.createText("body_FeatureId","body_Feature","WebTextField","",this.requiredField);
	this.initMap(textArray,this.body_Feature);
	
	this.tp_numId 				= WebUI.createText("tp_numIdId","tp_numId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.tp_numId);
	this.lp_caseId 				= WebUI.createText("lp_caseIdId","lp_caseId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.lp_caseId);
	
	//案件
	this.regi_unit_code 		= WebUI.createCombo("regi_unit_codeId","regi_unit_code",null,"regi_unit_NameId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.regi_unit_code);
	this.regi_unit_name 		= WebUI.createCodeText("regi_unit_NameId","regi_unit_name","Address",null,this.requiredField);
	this.initMap(textArray,this.regi_unit_name);
//	this.accept_unit_name 		= WebUI.createText("accept_unit_nameId","accept_unit_name","WebTextField","",this.requiredField);
//	this.accept_unit_name 		= WebUI.createCodeText("accept_unit_nameId","accept_unit_name","Address2",null,this.requiredField);
//	this.initMap(textArray,this.accept_unit_name);
//	this.accept_unit_code		= WebUI.createCombo("accept_unit_codeId","accept_unit_code",null,"accept_unit_name",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
//	this.initMap(textArray,this.accept_unit_code);
	this.ce_class_code 			= WebUI.createCombo("ce_class_codeId","ce_class_code",null,null,true,true,"CE_BASIC_INFO|CE_CLASS_CODE_1","",this.requiredField);
	this.initMap(textArray,this.ce_class_code);
	
	this.break_method_desc 		= WebUI.createMulText("break_method_descId","break_method_desc","WebTextArea",null,this.requiredField);
	this.initMap(textArray,this.break_method_desc);
	this.regi_time 				= WebUI.createText("regi_timeId","regi_time","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.regi_time);
	this.case_num 				= WebUI.createText("case_numId","case_num","WebTextField","",this.requiredField);
	this.initMap(textArray,this.case_num);
	this.caseOccurDate 			= WebUI.createText("caseOccurDateId","caseOccurDate","WebTextField","",this.requiredField);
	this.initMap(textArray,this.caseOccurDate);
	
	
	this.caseOccurPlaceCode 	= WebUI.createCombo("caseOccurPlaceCodeId","caseOccurPlaceCode",null,"caseOccurPlaceId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.caseOccurPlaceCode);
	this.caseOccurPlace 		= WebUI.createCodeText("caseOccurPlaceId","caseOccurPlace","AddressDetail","",this.requiredField);
	this.initMap(textArray,this.caseOccurPlace);
	
	this.zbUnitCode 			= WebUI.createCombo("zbUnitCodeId","zbUnitCode",null,"zbUnitNameId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.zbUnitCode);
	this.zbUnitName 			= WebUI.createCodeText("zbUnitNameId","zbUnitName","Address","",this.requiredField);
	this.initMap(textArray,this.zbUnitName);
	this.superviseLevel			= WebUI.createCombo("superviseLevelId","superviseLevel",null,null,true,false,"CE_BASIC_INFO|SUPERVISE_LEVEL",null,this.requiredField);
	this.initMap(textArray,this.superviseLevel);
	
	//缉控
	
	this.wantedLevel			= WebUI.createCombo("wantedLevelId","wantedLevel",null,null,true,false,"WANTED_PERSON_MAIN|WANTED_LEVEL",null,this.requiredField);
	this.initMap(textArray,this.wantedLevel);
	this.arrestLevel			= WebUI.createCombo("arrestLevelId","arrestLevel",null,null,true,false,"WANTED_PERSON_MAIN|ARREST_LEVEL",null,this.requiredField);
	this.initMap(textArray,this.arrestLevel);
	this.wanted_type			= WebUI.createCombo("wanted_typeId","wanted_type",null,null,true,false,"WANTED_PERSON_MAIN|WANTED_TYPE",null,this.requiredField);
	this.initMap(textArray,this.wanted_type);
//	this.wanted_status			= WebUI.createCombo("wanted_statusId","wanted_status",null,null,true,false,"",null,this.requiredField);
//	this.initMap(textArray,this.wanted_status);
	this.escape_type			= WebUI.createCombo("escape_typeId","escape_type",null,null,true,false,"WANTED_PERSON_MAIN|ESCAPE_TYPE",null,this.requiredField);
	this.initMap(textArray,this.escape_type);
	this.fill_in_unit_code		= WebUI.createCombo("fill_in_unit_codeId","fill_in_unit_code",null,null,false,false,"",null,this.requiredField);
	this.initMap(textArray,this.fill_in_unit_code);
//	this.ztwfillinunitcode		= WebUI.createCombo("ztwfillinunitcodeId","ztwfillinunitcode",null,null,true,false,"CREATEUNITCODE",null,this.requiredField);
//	this.initMap(textArray,this.ztwfillinunitcode);
	
	this.comments				= WebUI.createMulText("commentsId","comments","WebTextArea",null,this.requiredField);
	this.initMap(textArray,this.comments);
	this.escape_date			= WebUI.createText("escape_dateId","escape_date","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.escape_date);
	this.escape_direction		= WebUI.createText("escape_directionId","escape_direction","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.escape_direction);
	this.fill_in_user			= WebUI.createText("fill_in_userId","fill_in_user","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.fill_in_user);
	this.fill_in_time			= WebUI.createText("fill_in_timeId","fill_in_time","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.fill_in_time);
	this.fill_in_approved_by	= WebUI.createText("fill_in_approved_byId","fill_in_approved_by","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.fill_in_approved_by);
	this.wanted_no				= WebUI.createText("wanted_noId","wanted_no","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.wanted_no);
	this.hitlog_num				= WebUI.createText("hitlog_numId","hitlog_num","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.hitlog_num);
	
	this.expiration_date		= WebUI.createText("expiration_dateId","expiration_date","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.expiration_date);
	this.award					= WebUI.createText("awardId","award","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.award);
	this.contacter				= WebUI.createText("contacterId","contacter","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.contacter);
	this.contacter_phone		= WebUI.createText("contacter_phoneId","contacter_phone","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.contacter_phone);
	
	this.initComboData();	
	
//	$("#tp_card_num").attr({"disabled":"disabled"});
	//this.wanted_no.setEditable(false);
	//this.hitlog_num.setEditable(false);
	//this.tp_card_num.setEditable(false);
	//this.person_num.setEditable(false);
	//this.case_num.setEditable(false);
}
AddWanted.prototype.initMap = function(map,contro)
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
AddWanted.prototype.register = function(contro)
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
AddWanted.prototype.isTxtInfoChanged = function()
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
AddWanted.prototype.validateRequired = function()
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
AddWanted.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddWanted.prototype.initComboData = function()
{
	var columnnames = ['MIS_PERSON_BASIC_INFO|NATION','MIS_PERSON_BASIC_INFO|SEX_CODE','MIS_PERSON_BASIC_INFO|MIN_ZU','LTL_HITLOG_TP_INFO|CERTIFICATE_TYPE',
	                   'MIS_PERSON_BASIC_INFO|UNIT_CODE','MIS_PERSON_BODY_INFO|ACCENT_CODE','CASE_REGISTER_INFO|UNIT_CODE','CASE_HANDLE_INFO|UNIT_CODE',
	                   'CE_BASIC_INFO|CE_CLASS_CODE_1','CE_BASIC_INFO|SUPERVISE_LEVEL','WANTED_PERSON_MAIN|WANTED_TYPE','WANTED_PERSON_MAIN|ESCAPE_TYPE','WANTED_PERSON_MAIN|WANTED_LEVEL','WANTED_PERSON_MAIN|ARREST_LEVEL'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AddWanted.prototype.getComboData = function(data)
{
	data = eval('(' + data + ')');
	this.sex_code.setComboData(data['mis_person_basic_info|sex_code']);
	this.nation.setComboData(data['mis_person_basic_info|nation']);
	this.nationality.setComboData(data['mis_person_basic_info|min_zu']);
	this.certificate_type.setComboData(data['ltl_hitlog_tp_info|certificate_type']);
	this.hukou_place_code.setComboData(data['mis_person_basic_info|unit_code']);
	this.address_code.setComboData(data['mis_person_basic_info|unit_code']);
	this.accent.setComboData(data['mis_person_body_info|accent_code']);
	this.regi_unit_code.setComboData(data['case_register_info|unit_code']);
	this.caseOccurPlaceCode.setComboData(data['case_handle_info|unit_code']);
	this.zbUnitCode.setComboData(data['case_handle_info|unit_code']);
	this.ce_class_code.setComboData(data['ce_basic_info|ce_class_code_1']);
	this.fill_in_unit_code.setComboData(data['mis_person_basic_info|unit_code']);
	this.superviseLevel.setComboData(data['ce_basic_info|supervise_level']);
	this.wanted_type.setComboData(data['wanted_person_main|wanted_type']);
	this.escape_type.setComboData(data['wanted_person_main|escape_type']);
	this.wantedLevel.setComboData(data['wanted_person_main|wanted_level']);
	this.arrestLevel.setComboData(data['wanted_person_main|arrest_level']);
}
AddWanted.prototype.update = function(field)
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

AddWanted.prototype.setTPRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/addwanted/getCTPCard/" + rows[0].ID;
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
					var ceInfo = data.ceInfo;
					var EnrollInfo = data.EnrollInfo;
					if(!WebUtil.isNull(tpCardInfo))
					{
						$("#tp_card_num").val(tpCardInfo.cardNum); 
						$("#tp_numId").val(tpCardInfo.id);
					}
					if(!WebUtil.isNull(basicInfo))
					{
						$("#name").val(basicInfo.name); 
						$("#alias").val(basicInfo.alias);
						vthis.sex_code.setComboCode(basicInfo.sexCode);
						$("#birth_date").val(basicInfo.birthDate);
						vthis.nation.setComboCode(basicInfo.nation);
						vthis.nationality.setComboCode(basicInfo.minZu);
					}
					if(!WebUtil.isNull(mainInfo))
					{
						$("#person_num").val(mainInfo.personNum);
					}
					if(!WebUtil.isNull(certInfos))
					{
						vthis.certificate_type.setComboCode(certInfos.certType);
						$("#cert_num").val(certInfos.certNum);
					}
					if(!WebUtil.isNull(addrInfos))
					{
						for(var i = 0;i<addrInfos.length;i++)
						{
							if(addrInfos[i].addressType== 2)
							{
								vthis.address_code.setComboCode(addrInfos[i].addressCode);
							}
							if(addrInfos[i].addressType== 5)
							{
								vthis.hukou_place_code.setComboCode(addrInfos[i].addressCode);
							}
						}
					}
					$("#shenfen_Id").val(basicInfo.shenfenId);
					$("#body_Height").val(bodyInfo.bodyHeight);
					vthis.accent.setComboCode(bodyInfo.accentText);
//					$("#occupation").val(basicInfo.militaryServiceStatusText);
					$("#body_Feature").val(bodyInfo.bodyFeatureText);
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

AddWanted.prototype.setLPRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/addwanted/getCLPCase/" + rows[0].ID;
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
						//vthis.accept_unit_code.setComboCode(acceptInfo.acceptUnitCode);
					}
					if(!WebUtil.isNull(breakInfo))
					{
						$("#break_method_desc").val(breakInfo.breakMethodDesc);
					}
					if(!WebUtil.isNull(basicInfo))
					{
						$("#caseOccurDate").val(basicInfo.ceOccurDate);
						vthis.caseOccurPlaceCode.setComboCode(basicInfo.ceOccurPlaceCode);
						vthis.superviseLevel.setComboCode(basicInfo.superviseLevel);
						if(!WebUtil.isNull(basicInfo.ceOccurPlace)){
							vthis.caseOccurPlace.setText(basicInfo.ceOccurPlace);							
						}
//						zbUnitCodecode
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

AddWanted.prototype.setHitRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/addwanted/getCLTLHitlog/" + rows[0].ID;
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
					var tpInfo = data.tpInfo;
					var lpInfo = data.lpInfo;
					
					if(!WebUtil.isNull(mainInfo))
					{
						$("#hitlog_num").val(mainInfo.hitlogNum); 
						$("#tp_card_num").val(mainInfo.tpCardNum); 
						$("#tp_numId").val(mainInfo.tpCardId);
						$("#name").val(mainInfo.tpName); 
						vthis.sex_code.setComboCode(mainInfo.tpPersonSexCode);
						$("#birth_date").val(mainInfo.tpPersonBirthDate);
						$("#shenfen_Id").val(mainInfo.tpPersonCertId);
						$("#lp_caseId").val(mainInfo.lpCaseId); 
						$("#case_num").val(mainInfo.lpCaseNum); 
						vthis.ce_class_code.setComboCode(mainInfo.lpCaseClassCode1); //ce_class_code//ce_class_code1textfieldfalse
					}
					if(!WebUtil.isNull(tpInfo))
					{
						vthis.nation.setComboCode(tpInfo.nation);
						vthis.nationality.setComboCode(tpInfo.nationality);
						vthis.certificate_type.setComboCode(tpInfo.certificateType);
						$("#cert_num").val(tpInfo.certificateNum);
						vthis.address_code.setComboCode(tpInfo.addressCode);
						vthis.hukou_place_code.setComboCode(tpInfo.hukouPlaceCode);
					}
					if(!WebUtil.isNull(lpInfo))
					{
						$("#regi_time").val(lpInfo.registerDate);
						vthis.regi_unit_code.setComboCode(lpInfo.registerUnitCode);
	//					vthis.accept_unit_code.setComboCode(lpInfo.acceptUnitCode);
						$("#break_method_desc").val(lpInfo.caseDesc);
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

AddWanted.prototype.setSupToJon = function(mgr,data)
{	
	var data = eval('('+data+')');
	mgr.setInput(data);
}

