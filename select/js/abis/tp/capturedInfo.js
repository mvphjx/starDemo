/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddCaptured(requiredField,updateField)
{	
	this.crolArray = new Array();
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent = $("#AddCaptured").parent();
	pageparent.scroll(function()
	{  		  
		$(".newMenu").css('display','none');
    }
    );
}
AddCaptured.prototype.init = function()
{
	//必填项
	this.requiredMap = new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	var textArray = new Array();
	
	//抓获的基本信息
	
	this.gab_zt_card_no			= WebUI.createText("gab_zt_card_noId","gab_zt_card_no","WebTextField","",this.requiredField);
	this.initMap(textArray,this.gab_zt_card_no);
	this.captured_date			= WebUI.createText("captured_dateId","captured_date","WebTextField","",this.requiredField);	
	this.initMap(textArray,this.captured_date);
	this.capture_fill_in_user 	= WebUI.createText("capture_fill_in_userId","capture_fill_in_user","WebTextField","",this.requiredField);
	this.initMap(textArray,this.capture_fill_in_user);
	this.capture_fill_in_date 	= WebUI.createText("capture_fill_in_dateId","capture_fill_in_date","WebTextField","",this.requiredField);
	this.initMap(textArray,this.capture_fill_in_date);
	this.req_enroll_user 		= WebUI.createText("req_enroll_userId","req_enroll_user","WebTextField","",this.requiredField);
	this.initMap(textArray,this.req_enroll_user);
	this.req_enroll_date 		= WebUI.createText("req_enroll_dateId","req_enroll_date","WebTextField","",this.requiredField);
	this.initMap(textArray,this.req_enroll_date);
	this.req_approved_by 		= WebUI.createText("req_approved_byId","req_approved_by","WebTextField","",this.requiredField);
	this.initMap(textArray,this.req_approved_by);
	this.req_approved_date 		= WebUI.createText("req_approved_dateId","req_approved_date","WebTextField","",this.requiredField);
	this.initMap(textArray,this.req_approved_date);
	
	this.tp_numId 			= WebUI.createText("tp_numIdId","tp_numId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.tp_numId);
	this.tp_card_num 			= WebUI.createText("tp_card_numId","tp_card_num","WebTextField","",this.requiredField);
	this.initMap(textArray,this.tp_card_num);
	this.lp_caseId 			= WebUI.createText("lp_caseIdId","lp_caseId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.lp_caseId);
	
	this.captured_address_code 	= WebUI.createCombo("captured_address_codeId","captured_address_code",null,"captured_addressId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.captured_address_code);
	this.captured_address 		= WebUI.createCodeText("captured_addressId","captured_address","Address","",this.requiredField);
	this.initMap(textArray,this.captured_address);
	this.captured_unit_code 	= WebUI.createCombo("captured_unit_codeId","captured_unit_code",null,"captured_unit_nameId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.captured_unit_code);
	this.captured_unit_name 	= WebUI.createCodeText("captured_unit_nameId","captured_unit_name","Address","",this.requiredField);
	this.initMap(textArray,this.captured_unit_name);
	this.captured_unit_type 	= WebUI.createCombo("captured_unit_typeId","captured_unit_type",null,null,true,true,"CAPTURED_PERSON_MAIN|UNIT_TYPE",null,this.requiredField);
	this.initMap(textArray,this.captured_unit_type);
	this.req_unit_code      = WebUI.createCombo("req_unit_codeId","req_unit_code",null,"req_unit_nameId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.req_unit_code);
	this.req_unit_name 			= WebUI.createCodeText("req_unit_nameId","req_unit_name","Address","",this.requiredField);
	this.initMap(textArray,this.req_unit_name);
	this.captured_method     	= WebUI.createCombo("captured_methodId","captured_method",null,null,true,true,"CAPTURED_PERSON_MAIN|CAPTURE_METHOD",null,this.requiredField);
	this.initMap(textArray,this.captured_method);
//	this.captured_status	    = WebUI.createCombo("captured_statusId","captured_status",null,null,true,true,"CAPTURED_PERSON_MAIN|STATUS",null,this.requiredField);
//	this.initMap(textArray,this.captured_status);
    
	//抓获的人员信息
	this.name 					= WebUI.createText("nameId","name","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.name);
	this.alias 					= WebUI.createText("aliasId","alias","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.alias);
	this.shenfenId 				= WebUI.createText("shenfen_IdId","shenfen_Id","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.shenfenId);
	this.birth_date 			= WebUI.createText("birth_dateId","birth_date","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.birth_date);
	this.body_height 			= WebUI.createText("body_heightId","body_height","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.body_height);
	this.cert_num 				= WebUI.createText("cert_numId","cert_num","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.cert_num);
	
	this.sex_code				= WebUI.createCombo("sex_codeId","sex_code",null,null,true,false,"MIS_PERSON_BASIC_INFO|SEX_CODE",null,this.requiredField);
	this.initMap(textArray,this.sex_code);
	this.nation 				= WebUI.createCombo("nation_Id","nation",null,null,true,false,"MIS_PERSON_BASIC_INFO|NATION",null,this.requiredField);
	this.initMap(textArray,this.nation);
	this.nationality 			= WebUI.createCombo("nationalityId","nationality",null,null,true,false,"MIS_PERSON_BASIC_INFO|MIN_ZU",null,this.requiredField);
	this.initMap(textArray,this.nationality);
	this.certificate_type 		= WebUI.createCombo("certificate_typeId","certificate_type",null,null,true,false,"LTL_HITLOG_TP_INFO|CERTIFICATE_TYPE",null,this.requiredField);
	this.initMap(textArray,this.certificate_type);
	this.hukou_place_code 		= WebUI.createCombo("hukou_place_codeId","hukou_place_code",null,"hukou_placeId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.hukou_place_code);
	this.hukou_place 			= WebUI.createCodeText("hukou_placeId","hukou_place","AddressDetail",null,this.requiredField);
	this.initMap(textArray,this.hukou_place);
	this.address_code 			= WebUI.createCombo("address_codeId","address_code",null,"addressId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.address_code);
	this.address 				= WebUI.createCodeText("addressId","address","AddressDetail",null,this.requiredField);
	this.initMap(textArray,this.address);
	
	//抓获人员关联的案件信息
	this.case_num 				= WebUI.createText("case_numId","case_num","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.case_num);
	this.regi_time 				= WebUI.createText("regi_timeId","regi_time","WebTextField",null,this.requiredField);
	this.initMap(textArray,this.regi_time);
	
	this.ce_class_code 			= WebUI.createCombo("ce_class_codeId","ce_class_code1",null,null,true,false,"CE_BASIC_INFO|CE_CLASS_CODE_1",null,this.requiredField);
	this.initMap(textArray,this.ce_class_code);
	this.regi_unit_code 		= WebUI.createCombo("regi_unit_codeId","regi_unit_code",null,"regi_unit_NameId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.regi_unit_code);
	this.regi_unit_Name			= WebUI.createCodeText("regi_unit_NameId","regi_unit_Name","Address",null,this.requiredField);
	this.initMap(textArray,this.regi_unit_Name);
	this.zb_unit_code 			= WebUI.createCombo("zb_unit_codeId","zb_unit_code",null,"zb_unit_nameId",false,false,"CASE_REGISTER_INFO|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.zb_unit_code);
	this.zb_unit_name			= WebUI.createCodeText("zb_unit_nameId","zb_unit_name","Address",null,this.requiredField);
	this.initMap(textArray,this.zb_unit_name);
	this.break_method_desc 		= WebUI.createMulText("break_method_descId","break_method_desc","WebTextArea",null,this.requiredField);
	this.initMap(textArray,this.break_method_desc);
	
	this.initComboData();	
	
	this.gab_zt_card_no.setEditable(false);
	this.case_num.setEditable(false);
}
AddCaptured.prototype.initMap = function(map,contro)
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
AddCaptured.prototype.register = function(contro)
{
	var nthis = this;
	contro.addChangeListener(textChange);
	function textChange()
	{				
		var id = contro.getId();		 
		var oldtext = nthis.srcCardObj[id];		
		if(oldtext == null) oldtext = "";
		oldtext += "";
		var text=contro.getValue();		
		if(text!=oldtext)
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
AddCaptured.prototype.isTxtInfoChanged = function()
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
AddCaptured.prototype.validateRequired = function()
{
	var flag = true;
	//验证必填项是否都填了
	var n = 0;
	for(var i = 0;i < this.requiredMap.length;i++)
	{
		var text = this.requiredMap[i].getText();
		if(text == null || text == "")
		{
			n = n + 1;
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
AddCaptured.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddCaptured.prototype.initComboData=function()
{
	var columnnames = ['CAPTURED_PERSON_MAIN|STATUS','CASE_REGISTER_INFO|UNIT_CODE','CE_BASIC_INFO|CE_CLASS_CODE_1','MIS_PERSON_BASIC_INFO|SEX_CODE',
	                   'MIS_PERSON_BASIC_INFO|NATION','MIS_PERSON_BASIC_INFO|MIN_ZU','LTL_HITLOG_TP_INFO|CERTIFICATE_TYPE','CAPTURED_PERSON_MAIN|UNIT_TYPE',
	                   'CAPTURED_PERSON_MAIN|CAPTURE_METHOD'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AddCaptured.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.hukou_place_code.setComboData(data['case_register_info|unit_code']);
	this.sex_code.setComboData(data['mis_person_basic_info|sex_code']);
	this.nation.setComboData(data['mis_person_basic_info|nation']);
	this.nationality.setComboData(data['mis_person_basic_info|min_zu']);
	this.certificate_type.setComboData(data['ltl_hitlog_tp_info|certificate_type']);
	this.address_code.setComboData(data['case_register_info|unit_code']);
	this.ce_class_code.setComboData(data['ce_basic_info|ce_class_code_1']);
	this.regi_unit_code.setComboData(data['case_register_info|unit_code']);
	this.zb_unit_code.setComboData(data['case_register_info|unit_code']);
//	this.captured_status.setComboData(data['captured_person_main|status']);
	this.captured_address_code.setComboData(data['case_register_info|unit_code']);
//	this.caseOccurPlaceCode.setComboData(data['case_register_info|unit_code']);
	this.captured_unit_code.setComboData(data['case_register_info|unit_code']);
	this.req_unit_code.setComboData(data['case_register_info|unit_code']);
	this.captured_method.setComboData(data['captured_person_main|capture_method']);
	this.captured_unit_type.setComboData(data['captured_person_main|unit_type']);
}
AddCaptured.prototype.update = function(field)
{	
	for(var i=0;i<this.crolArray.length;i++)
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

AddCaptured.prototype.setWantedRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/addcaptured/getCWanted/" + rows[0].ID;
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
					var tpcard = data.tpcard;
					var lpcase = data.lpcase;
					var caseInfo = data.caseInfo;
					var personInfo = data.personInfo;
					
					if(!WebUtil.isNull(tpcard))
					{
						var tpCardInfo = tpcard.tpCardInfo;
						var basicInfo = tpcard.basicInfo;
						var tpcardmainInfo = tpcard.mainInfo;
						var certInfos = tpcard.certInfos;
						var certInfos = tpcard.certInfos;
						var addrInfos = tpcard.addrInfos;
						if(!WebUtil.isNull(tpCardInfo))
						{
							$("#tp_card_num").val(tpCardInfo.cardNum); 
							$("#gab_zt_card_no").val(tpCardInfo.cardNum); 
							$("#tp_numId").val(tpCardInfo.id);
						}
						if(!WebUtil.isNull(basicInfo))
						{
							$("#name").val(basicInfo.name); 
							$("#alias").val(basicInfo.alias);
							vthis.sex_code.setComboCode(basicInfo.sexCode);
							$("#birth_date").val(basicInfo.birthDate);
							vthis.nation.setComboCode(basicInfo.nation);
							vthis.nationality.setComboCode(basicInfo.nationality);
							$("#shenfen_Id").val(basicInfo.shenfenId);
						}
						if(!WebUtil.isNull(tpcardmainInfo))
						{
							$("#person_num").val(tpcardmainInfo.personNum);
						}
						if(!WebUtil.isNull(certInfos))
						{
							vthis.certificate_type.setComboCode(certInfos.certTypeText);
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
					}
					if(!WebUtil.isNull(lpcase))
					{
						var lpcasemainInfo = lpcase.mainInfo;
						var breakInfo = lpcase.breakInfo;
						var basicInfo = lpcase.basicInfo;
						var acceptInfo = lpcase.acceptInfo;
						var registerInfo = lpcase.registerInfo;
						if(!WebUtil.isNull(lpcasemainInfo))
						{
							$("#lp_caseId").val(lpcasemainInfo.id); 
							$("#case_num").val(lpcasemainInfo.ceNum); 
						}
						if(!WebUtil.isNull(basicInfo))
						{
							vthis.ce_class_code.setComboCode(basicInfo.ceClassCode1);
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
					if(!WebUtil.isNull(mainInfo))
					{
						var ztNum = mainInfo.wantedNo;
						ztNum = ztNum.replace("JK","");
						$("#gab_zt_card_no").val(ztNum);
						$("#wantedNo").html(mainInfo.wantedNo);
						$("#wantedstatus").html(mainInfo.wantedStatusText);
						$("#wantedtype").html(mainInfo.wantedTypeText);
						$("#award").html(mainInfo.award);
						$("#contacter").html(mainInfo.contacter);
						$("#contacterPhone").html(mainInfo.contacterPhone);
						$("#fillInUser").html(mainInfo.fillInUser);
						$("#fillInUnit").html(mainInfo.fillInUnitCode);
						$("#fillInTime").html(mainInfo.fillInTimeText);
						$("#fillInApprovedBy").html(mainInfo.fillInApprovedBy);
						$("#escapeDate").html(mainInfo.escapeDate);
						$("#escapeType").html(mainInfo.escapeType);
						$("#escapeDirection").html(mainInfo.escapeDirection);
						$("#comments").html(mainInfo.comments);
					}
					if(!WebUtil.isNull(caseInfo))
					{
						$("#case_num").val(caseInfo.caseNum); 
						vthis.ce_class_code.setComboCode(caseInfo.caseClassCode);
						$("#regi_time").val(caseInfo.regiDateText); 
						vthis.req_unit_code.setComboCode(caseInfo.regiUnitCode);
						vthis.zb_unit_code.setComboCode(caseInfo.zbUnitCode);
						$("#break_method_desc").val(caseInfo.caseDesc); 
					}
					if(!WebUtil.isNull(personInfo))
					{
						$("#name").val(personInfo.name); 
						$("#alias").val(personInfo.alias); 
						vthis.sex_code.setComboCode(personInfo.sexCode);
						$("#body_height").val(personInfo.bodyHeight); 
						$("#shenfen_Id").val(personInfo.shenFenId); 
						vthis.nation.setComboCode(personInfo.nation);
						$("#birth_date").val(personInfo.birthDateText); 
						vthis.nationality.setComboCode(personInfo.nationality);
						vthis.certificate_type.setComboCode(personInfo.certificateType);
						$("#cert_num").val(personInfo.certificateCode); 
						vthis.hukou_place_code.setComboCode(personInfo.hukouPlaceCode);
						vthis.address_code.setComboCode(personInfo.addressCode);
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

AddCaptured.prototype.setHitRows = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/tp/addcaptured/getCLTLHitlog/" + rows[0].ID;
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
//						$("#hitlog_num").val(mainInfo.hitlogNum); 
						$("#tp_card_num").val(mainInfo.tpCardNum); 
						$("#gab_zt_card_no").val(mainInfo.tpCardNum); 
						$("#tp_numId").val(mainInfo.tpCardId);
						$("#name").val(mainInfo.tpName); 
						vthis.sex_code.setComboCode(mainInfo.tpPersonSexCode);
						$("#birth_date").val(mainInfo.tpPersonBirthDate);
						$("#shenfen_Id").val(mainInfo.tpPersonCertId);
						$("#lp_caseId").val(mainInfo.lpCaseId); 
						$("#case_num").val(mainInfo.lpCaseNum); 
						vthis.ce_class_code.setComboCode(mainInfo.lpCaseClassCode1); //ce_class_code//ce_class_code1textfieldfalse
					}
					/*if(!WebUtil.isNull(tpInfo))
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
					}*/
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

