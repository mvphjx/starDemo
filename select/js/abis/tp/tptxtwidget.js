//文本编辑模式(编辑|扫描)
var TPTxtMode=
{
	SCAN:0,
	EDIT:1
}

/**
 * 捺印卡片文本信息编辑控件
 * @param requiredField 必填项
 * @param updateField   更新项
 */
function TPCardEditPage(requiredField,updateField,defValue,mode)
{	
	this.crolArray 		= new Array();
	this.requiredField	= requiredField;
	this.updateField	= updateField;
	this.defValue 		= defValue;
	this.mode 			= mode;
	this.delAddrList 	= new Array();
    this.delCertList 	= new Array();
	this.delCommList 	= new Array();
	this.delPhoneList 	= new Array();
	this.init();	
	
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#tpeditpage").parent();
	pageparent.scroll
	(
		function()
		{  		  
			$(".newMenu").css('display','none');
		}
	);
	
	this.Txtchange();
	
	this.initDefault();
}

var addrtableMgr;
var phonetableMgr;
var commtableMgr;
var certtableMgr;

var addressDetail;
var addressZipCode;
var addressCode;
var addressType;
var commNum;
var loginPass;
var commType;

var phoneNum;
var phoneNumType;
var certNum;
var startDate;
var expireDate;
var issueBy;
var issueDate;
var certType;

TPCardEditPage.prototype.init = function()
{
	this.filedMap={};
	//必填项
	this.requiredMap=new Array();
	
	//更新项
	this.updateMap=new Array();
	this.changeField={};
	
	//人员信息
	var personArray=new Array();
	
	this.personNum		= WebUI.createText("mainInfo_personNum",MisPersonCol.PERSON_NUM,"WebTextField","",this.requiredField);
	this.personNum.setErrorTip("mainInfo_personNum_tip");
	
	//验证人员号码是否已经存在
	var personNumparam={};
	this.personNum.setValidateType(personNumparam);
	this.personNum.keyUpListener(this.validatePersonNo);	
	$('#PERSON_NUM').attr("onpropertychange","changeCardNum()");
	
	this.initMap(personArray,this.personNum);
	
	//this.dbid 			= WebUI.createSearchCombo("mainInfo_dbid",MisPersonCol.DBID, "", 1, false, this.requiredField);
	this.dbid		= WebUI.createCombo("mainInfo_dbid",MisPersonCol.DBID,null,null,true,true,null,null,this.requiredField);
	this.dbid.setErrorTip("mainInfo_dbid_tip");
	this.initMap(personArray,this.dbid);

	
	this.createTime		= WebUI.createDateText("mainInfo_createTime","createTime","WebTextField","",this.requiredField);	
	this.initMap(personArray,this.createTime);
	
	this.createUser		= WebUI.createText("mainInfo_createUser","createUser","WebTextField","",this.requiredField);	
	this.initMap(personArray,this.createUser);
	
	this.updateUser		= WebUI.createText("mainInfo_updateUser","updateUser","WebTextField","",this.requiredField);	
	this.initMap(personArray,this.updateUser);
	
	this.updateTime 		= WebUI.createDateText("mainInfo_updateTime","updateTime","WebTextField","",this.requiredField);	
	this.initMap(personArray,this.updateTime);
	
	this.createUnitCode	= WebUI.createCombo("mainInfo_createUnitCode","createUnitCode",null,null,true,false,"MIS_PERSON|CREATE_UNIT_CODE","",this.requiredField);
	this.initMap(personArray,this.createUnitCode);
	
	this.updateUnitCode	= WebUI.createCombo("mainInfo_updateUnitCode","updateUnitCode",null,null,true,false,"MIS_PERSON|UPDATE_UNIT_CODE","",this.requiredField);
	this.initMap(personArray,this.updateUnitCode);
	
	this.crolArray["mainInfo"] = personArray;
//初始录入信息 enrollInfo
	var enrollInfoArray=new Array();

	this.iniEnrollType 	= WebUI.createCombo("enrollInfo_iniEnrollType",MisPersonEnrollInfoCol.INI_ENROLL_TYPE,null,null,true,false,"MIS_PERSON_TEXT_INFO|INI_ENROLL_TYPE","",this.requiredField);
	this.initMap(enrollInfoArray,this.iniEnrollType);
	
	this.iniEnrollTime	= WebUI.createDateText("enrollInfo_iniEnrollTime",MisPersonEnrollInfoCol.INI_ENROLL_TIME,"WebTextField","",this.requiredField);	
	this.initMap(enrollInfoArray,this.iniEnrollTime);
	
	this.iniEnrollUser	= WebUI.createText("enrollInfo_iniEnrollUser",MisPersonEnrollInfoCol.INI_ENROLL_USER,"WebTextField","",this.requiredField);	
	this.initMap(enrollInfoArray,this.iniEnrollUser);
	this.iniEnrollUser.setErrorTip("enrollInfo_iniEnrollUser_tip");
	
	this.iniEnrollUnitCode	= WebUI.createCombo("enrollInfo_iniEnrollUnitCode",MisPersonEnrollInfoCol.INI_ENROLL_UNIT_CODE,null,null,true,false,"MIS_PERSON_TEXT_INFO|INI_ENROLL_UNIT_CODE","",this.requiredField);
	this.initMap(enrollInfoArray,this.iniEnrollUnitCode);
	this.crolArray["enrollInfo"] = enrollInfoArray;
	//捺印信息
	var tpCardInfoArray=new Array();
	this.cardNum=WebUI.createText("tpCardInfo_cardNum",TPCardInfoCol.CARD_NUM,"WebTextField","",this.requiredField);
	this.cardNum.setErrorTip("tpCardInfo_cardNum_tip");
	$('#CARD_NUM').attr("readonly","readonly");
	this.initMap(tpCardInfoArray,this.cardNum);
	
	this.createTime1=WebUI.createDateText("tpCardInfo_createTime",TPCardInfoCol.CREATE_TIME,"WebTextField","",this.requiredField);
	this.initMap(tpCardInfoArray,this.createTime1);
	
	this.createUser1=WebUI.createText("tpCardInfo_createUser",TPCardInfoCol.CREATE_USER,"WebTextField","",this.requiredField);	
	this.initMap(tpCardInfoArray,this.createUser1);
	
	this.updateTime1=WebUI.createDateText("tpCardInfo_updateTime",TPCardInfoCol.UPDATE_TIME,"WebTextField","",this.requiredField);	
	this.initMap(tpCardInfoArray,this.updateTime1);
	
	this.updateUser1=WebUI.createText("tpCardInfo_updateUser",TPCardInfoCol.UPDATE_USER,"WebTextField","",this.requiredField);	
	this.initMap(tpCardInfoArray,this.updateUser1);
	
	this.printDate=WebUI.createDateText("tpCardInfo_printDate",TPCardInfoCol.PRINT_DATE,"WebTextField","",this.requiredField);
	this.initMap(tpCardInfoArray,this.printDate);
	
	this.printBy=WebUI.createText("tpCardInfo_printBy",TPCardInfoCol.PRINT_BY,"WebTextField","",this.requiredField);	
	this.printBy.setErrorTip("tpCardInfo_printBy_tip");
	this.initMap(tpCardInfoArray,this.printBy);
	
	this.printUnitCode=WebUI.createCombo("tpCardInfo_printUnitCode",TPCardInfoCol.PRINT_UNIT_CODE,null,"tpCardInfo_printUnitName",false,false,"TP_CARD_INFO|PRINT_UNIT_CODE","",this.requiredField);
	this.printUnitCode.setErrorTip("tpCardInfo_printUnitCode_tip");
	this.initMap(tpCardInfoArray,this.printUnitCode);
	
    this.printUnitName=WebUI.createCodeText("tpCardInfo_printUnitName",TPCardInfoCol.PRINT_UNIT_NAME,"Address","",this.requiredField);
    this.printUnitName.setErrorTip("tpCardInfo_printUnitName_tip");
    
	this.initMap(tpCardInfoArray,this.printUnitName);
	this.crolArray["tpCardInfo"]=tpCardInfoArray;

	//人员基本信息
	var basicInfoArray=new Array();
	this.name=WebUI.createText("basicInfo_name",MisPersonBasicInfoCol.NAME,"WebTextField","",this.requiredField);	
	this.name.setErrorTip("basicInfo_name_tip");
	this.initMap(basicInfoArray,this.name);
	this.alias=WebUI.createText("basicInfo_alias",MisPersonBasicInfoCol.ALIAS,"WebTextField","",this.requiredField);
	this.alias.setErrorTip("basicInfo_alias_tip");
	this.initMap(basicInfoArray,this.alias);
	this.birthDate=WebUI.createDateText("basicInfo_birthDate",MisPersonBasicInfoCol.BIRTH_DATE,"WebTextField","",this.requiredField);	
	this.birthDate.setErrorTip("basicInfo_birthDate_tip");
	this.initMap(basicInfoArray,this.birthDate);
	this.sexCode=WebUI.createCombo("basicInfo_sexCode",MisPersonBasicInfoCol.SEX_CODE,null,null,true,true,"MIS_PERSON_TEXT_INFO|SEX_CODE","",this.requiredField);
	this.sexCode.setErrorTip("basicInfo_sexCode_tip");
	this.initMap(basicInfoArray,this.sexCode);
	this.nation=WebUI.createCombo("basicInfo_nation",MisPersonBasicInfoCol.NATION,null,null,true,false,"MIS_PERSON_TEXT_INFO|NATION","",this.requiredField);
	this.nation.setErrorTip("basicInfo_nation_tip");
	this.initMap(basicInfoArray,this.nation);
	this.minZu=WebUI.createCombo("basicInfo_minZu",MisPersonBasicInfoCol.MIN_ZU,null,null,true,true,"MIS_PERSON_TEXT_INFO|MIN_ZU","",this.requiredField);
	this.minZu.setErrorTip("basicInfo_minZu_tip");
	this.initMap(basicInfoArray,this.minZu);
	this.shenfenId=WebUI.createText("basicInfo_shenfenId",MisPersonBasicInfoCol.SHENFEN_ID,"WebTextField","",this.requiredField);
	this.shenfenId.setErrorTip("basicInfo_shenfenId_tip");
	var shenfenIdparam={};
	shenfenIdparam.shenfenid=true;
	this.shenfenId.setValidateType(shenfenIdparam);	
	//$('#SHENFEN_ID').attr("onpropertychange","changeBirthDayAndSex()");
	this.initMap(basicInfoArray,this.shenfenId);
	
	this.namePinyin=WebUI.createText("basicInfo_namePinyin",MisPersonBasicInfoCol.NAME_PINYIN,"WebTextField","",this.requiredField);
	this.namePinyin.setErrorTip("basicInfo_namePinyin_tip");
	this.initMap(basicInfoArray,this.namePinyin);
	this.politicalAffiliation=WebUI.createCombo("basicInfo_politicalAffiliation",MisPersonBasicInfoCol.POLITICAL_AFFILIATION,null,null,true,true,"MIS_PERSON_TEXT_INFO|POLITICAL_AFFILIATION","",this.requiredField);
	this.politicalAffiliation.setErrorTip("basicInfo_politicalAffiliation_tip");
	this.initMap(basicInfoArray,this.politicalAffiliation);
	this.religiousFaith=WebUI.createCombo("basicInfo_religiousFaith",MisPersonBasicInfoCol.RELIGIOUS_FAITH,null,null,true,true,"MIS_PERSON_TEXT_INFO|RELIGIOUS_FAITH","",this.requiredField);
	this.religiousFaith.setErrorTip("basicInfo_religiousFaith_tip");
	this.initMap(basicInfoArray,this.religiousFaith);
	this.maritalStatus=WebUI.createCombo("basicInfo_maritalStatus",MisPersonBasicInfoCol.MARITAL_STATUS,null,null,true,true,"MIS_PERSON_TEXT_INFO|MARITAL_STATUS","",this.requiredField);
	this.maritalStatus.setErrorTip("basicInfo_maritalStatus_tip");
	this.initMap(basicInfoArray,this.maritalStatus);
	this.highestEduDegree=WebUI.createCombo("basicInfo_highestEduDegree",MisPersonBasicInfoCol.HIGHEST_EDU_DEGREE,null,null,true,true,"MIS_PERSON_TEXT_INFO|HIGHEST_EDU_DEGREE","",this.requiredField);
	this.highestEduDegree.setErrorTip("basicInfo_highestEduDegree_tip");
	this.initMap(basicInfoArray,this.highestEduDegree);
	this.militaryServiceStatus=WebUI.createCombo("basicInfo_militaryServiceStatus",MisPersonBasicInfoCol.MILITARY_SERVICE_STATUS,null,null,true,true,"MIS_PERSON_TEXT_INFO|MILITARY_SERVICE_STATUS","",this.requiredField);
	this.militaryServiceStatus.setErrorTip("basicInfo_militaryServiceStatus_tip");
	this.initMap(basicInfoArray,this.militaryServiceStatus);
	this.comments=WebUI.createMulText("basicInfo_comments",MisPersonBasicInfoCol.COMMENTS,"WebTextArea_Auto","",this.requiredField);
	this.comments.setErrorTip("basicInfo_comments_tip");
	this.initMap(basicInfoArray,this.comments);
	this.crolArray["basicInfo"]=basicInfoArray;

	//体貌特征
	var bodyInfoArray=new Array();
	this.bodyHeight=WebUI.createText("bodyInfo_bodyHeight",MisPersonBodyInfoCol.BODY_HEIGHT,"WebTextField","",this.requiredField);	
	this.bodyHeight.setErrorTip("bodyInfo_bodyHeight_tip");
	var bodyHeightparam={};
	bodyHeightparam.isdigital=true;
	bodyHeightparam.maxlength=3;
	bodyHeightparam.minlength=2;	
	this.bodyHeight.setValidateType(bodyHeightparam);
	this.initMap(bodyInfoArray,this.bodyHeight);
	
	this.footLength=WebUI.createText("bodyInfo_footLength",MisPersonBodyInfoCol.FOOT_LENGTH,"WebTextField","",this.requiredField);
	this.footLength.setErrorTip("bodyInfo_footLength_tip");
	var footLengthparam={};
	footLengthparam.isdigital=true;
	footLengthparam.maxlength=2;
	footLengthparam.minlength=2;
	this.footLength.setValidateType(footLengthparam);
	this.initMap(bodyInfoArray,this.footLength);
	
	this.bodyWeight=WebUI.createText("bodyInfo_bodyWeight",MisPersonBodyInfoCol.BODY_WEIGHT,"WebTextField","",this.requiredField);	
	this.bodyWeight.setErrorTip("bodyInfo_bodyWeight_tip");
	var bodyWeightparam={};
	bodyWeightparam.isdigital=true;
	bodyWeightparam.maxlength=3;
	bodyWeightparam.minlength=2;
	this.bodyWeight.setValidateType(bodyWeightparam);
	this.initMap(bodyInfoArray,this.bodyWeight);
	
	this.bloodType=WebUI.createCombo("bodyInfo_bloodType",MisPersonBodyInfoCol.BLOOD_TYPE,null,null,true,true,"MIS_PERSON_TEXT_INFO|BLOOD_TYPE","",this.requiredField);
	this.bloodType.setErrorTip("bodyInfo_bloodType_tip");
	this.initMap(bodyInfoArray,this.bloodType);	
	this.bodyFeature=WebUI.createCombo("bodyInfo_bodyFeature",MisPersonBodyInfoCol.BODY_FEATURE,null,null,true,true,"MIS_PERSON_TEXT_INFO|BODY_FEATURE","",this.requiredField);
	this.bloodType.setErrorTip("bodyInfo_bloodType_tip");
	this.initMap(bodyInfoArray,this.bodyFeature);
	this.hairColor=WebUI.createCombo("bodyInfo_hairColor",MisPersonBodyInfoCol.HAIR_COLOR,null,null,true,true,"MIS_PERSON_TEXT_INFO|HAIR_COLOR","",this.requiredField);
	this.hairColor.setErrorTip("bodyInfo_hairColor_tip");
	this.initMap(bodyInfoArray,this.hairColor);
	this.eyeColor=WebUI.createCombo("bodyInfo_eyeColor",MisPersonBodyInfoCol.EYE_COLOR,null,null,true,true,"MIS_PERSON_TEXT_INFO|EYE_COLOR","",this.requiredField);
	this.eyeColor.setErrorTip("bodyInfo_eyeColor_tip");
	this.initMap(bodyInfoArray,this.eyeColor);
	this.auditionCap=WebUI.createCombo("bodyInfo_auditionCap",MisPersonBodyInfoCol.AUDITION_CAP,null,null,true,true,"MIS_PERSON_TEXT_INFO|AUDITION_CAP","",this.requiredField);	
	this.auditionCap.setErrorTip("bodyInfo_auditionCap_tip");
	this.initMap(bodyInfoArray,this.auditionCap);
	this.vocalCap=WebUI.createCombo("bodyInfo_vocalCap",MisPersonBodyInfoCol.VOCAL_CAP,null,null,true,true,"MIS_PERSON_TEXT_INFO|VOCAL_CAP","",this.requiredField);	
	this.vocalCap.setErrorTip("bodyInfo_vocalCap_tip");
	this.initMap(bodyInfoArray,this.vocalCap);
	this.accent=WebUI.createCombo("bodyInfo_accent",MisPersonBodyInfoCol.ACCENT,null,null,true,true,"MIS_PERSON_TEXT_INFO|ACCENT","",this.requiredField);	
	this.accent.setErrorTip("bodyInfo_accent_tip");
	this.initMap(bodyInfoArray,this.accent);
	this.fingerMissedCnt=WebUI.createText("bodyInfo_fingerMissedCnt",MisPersonBodyInfoCol.FINGER_MISSED_CNT,"WebTextField","",this.requiredField);	
	this.fingerMissedCnt.setErrorTip("bodyInfo_fingerMissedCnt_tip");
	this.initMap(bodyInfoArray,this.fingerMissedCnt);
	this.crolArray["bodyInfo"]=bodyInfoArray;
	
	//关联案件信息
	var ceInfoArray=new Array();
	this.caseNum=WebUI.createText("ceInfo_caseNum",MisPersonCEInfoCol.CASE_NUM,"WebTextField","",this.requiredField);	
	this.caseNum.setErrorTip("ceInfo_caseNum_tip");
	this.initMap(ceInfoArray,this.caseNum);
	this.personClassCode=WebUI.createCombo("ceInfo_personClassCode",MisPersonCEInfoCol.PERSON_CLASS_CODE,null,null,true,true,"MIS_PERSON_TEXT_INFO|PERSON_CLASS_CODE","",this.requiredField);
	this.personClassCode.setErrorTip("ceInfo_personClassCode_tip");
	this.initMap(ceInfoArray,this.personClassCode);
	this.isCriminal=WebUI.createCombo("ceInfo_isCriminal",MisPersonCEInfoCol.IS_CRIMINAL,null,null,true,true,"MIS_PERSON_TEXT_INFO|IS_CRIMINAL","",this.requiredField);
	this.isCriminal.setErrorTip("ceInfo_isCriminal_tip");
	this.initMap(ceInfoArray,this.isCriminal);
	this.criminalRecord=WebUI.createMulText("ceInfo_criminalRecord",MisPersonBasicInfoCol.CRIMINAL_RECORD,"WebTextArea_Auto","",this.requiredField);
    this.criminalRecord.setErrorTip("ceInfo_criminalRecord_tip");
	this.initMap(ceInfoArray,this.criminalRecord);
	this.caseClassCode1=WebUI.createCombo("ceInfo_caseClassCode1",MisPersonCEInfoCol.CASE_CLASS_CODE_1,null,null,true,false,"MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_1","",this.requiredField);
	this.caseClassCode1.setErrorTip("ceInfo_caseClassCode1_tip");
	this.initMap(ceInfoArray,this.caseClassCode1);
	this.caseClassCode2=WebUI.createCombo("ceInfo_caseClassCode2",MisPersonCEInfoCol.CASE_CLASS_CODE_2,null,null,true,false,"MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_2","",this.requiredField);
	this.caseClassCode2.setErrorTip("ceInfo_caseClassCode2_tip");
	this.initMap(ceInfoArray,this.caseClassCode2);
	this.caseClassCode3=WebUI.createCombo("ceInfo_caseClassCode3",MisPersonCEInfoCol.CASE_CLASS_CODE_3,null,null,true,false,"MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_3","",this.requiredField);
	this.caseClassCode3.setErrorTip("ceInfo_caseClassCode3_tip");
	this.initMap(ceInfoArray,this.caseClassCode3);
	this.crolArray["ceInfo"]=ceInfoArray;

	var innerequireds=new Array();
	innerequireds.push("address_code");
	innerequireds.push("address_type");
	innerequireds.push("comm_type");
	innerequireds.push("comm_num");
	innerequireds.push("phone_num_type");
	innerequireds.push("phone_num");
	innerequireds.push("cert_type");
	innerequireds.push("cert_num");
	
	addressZipCode	= WebUI.createText("webox_address_zip_code","address_zip_code","WebTextField","",null);
	addressZipCode.setValidateType({maxlength:16});
    addressZipCode.setErrorTip("webox_address_zip_code_tip");

    addressDetail	= WebUI.createCodeText("webox_address_detail",'address_detail',"AddressDetail",null,null);
	addressDetail.setValidateType({maxlength:100});
    addressDetail.setErrorTip("webox_address_detail_tip");
	addressCode		= WebUI.createCombo("webox_address_code", "address_code", null, "webox_address_detail", false, false, "MIS_PERSON_TEXT_INFO|ADDRESS_CODE","",innerequireds,WebComboType.BOX);
	addressType		= WebUI.createCombo("webox_address_type", "address_type", null, null, true, true, "MIS_PERSON_TEXT_INFO|ADDRESS_TYPE","",innerequireds,WebComboType.BOX);
	commNum			= WebUI.createText("webox_comm_num","comm_num","WebTextField","",innerequireds);	
	commNum.setValidateType({maxlength:80});
    commNum.setErrorTip("webox_comm_num_tip");
	loginPass		= WebUI.createText("webox_login_pass","login_pass","WebTextField","",null);	
	loginPass.setValidateType({maxlength:20});
    loginPass.setErrorTip("webox_login_pass_tip");
	commType		= WebUI.createCombo("webox_comm_type", "comm_type", null, null, true, true, "MIS_PERSON_TEXT_INFO|COMM_TYPE","",innerequireds,WebComboType.BOX);

	phoneNum		= WebUI.createText("webox_phone_num","phone_num","WebTextField","",innerequireds);	
	phoneNum.setValidateType({maxlength:40});
    phoneNum.setErrorTip("webox_phone_num_tip");

    phoneNumType	= WebUI.createCombo("webox_phone_num_type", "phone_num_type", null, null, true, true, "MIS_PERSON_TEXT_INFO|PHONE_NUM_TYPE","",innerequireds,WebComboType.BOX);
	
	certType		= WebUI.createCombo("webox_cert_type", "cert_type", null, null, true, true, "MIS_PERSON_TEXT_INFO|CERT_TYPE","",innerequireds,WebComboType.BOX);
	certNum			= WebUI.createText("webox_cert_num","cert_num","WebTextField","",innerequireds);	
	certNum.setValidateType({maxlength:40});
    certNum.setErrorTip("webox_cert_num_tip");

    var  startDate_my97Options = {maxDate:'#F{$dp.$D(\'issue_date\')||$dp.$D(\'expire_date\')||\'%y-%M-%d\'}'};
    startDate		= WebUI.createDateText("webox_start_date","start_date","WebTextField","",null,startDate_my97Options);
    var issueDate_my97Options = {minDate:'#F{$dp.$D(\'start_date\')}',maxDate:'#F{$dp.$D(\'expire_date\')||\'%y-%M-%d\'}'};
    issueDate		= WebUI.createDateText("webox_issue_date","issue_date","WebTextField","",null,issueDate_my97Options);
    var expireDate_my97Options = {maxDate:'',minDate:'#F{$dp.$D(\'issue_date\')||$dp.$D(\'start_date\')}'};
	expireDate		= WebUI.createDateText("webox_expire_date","expire_date","WebTextField","",null,expireDate_my97Options);
	issueBy			= WebUI.createText("webox_issue_by","issue_by","WebTextField","",null);	
	issueBy.setValidateType({maxlength:40});
    issueBy.setErrorTip("webox_issue_by_tip");

	
		
	this.initComboData();
	this.initTable();	
	this.initDBInfo();
	
//	this.initUpdateField(personArray);
//	this.initUpdateField(tpCardInfoArray);
//	this.initUpdateField(basicInfoArray);
//	this.initUpdateField(bodyInfoArray);
//	this.initUpdateField(ceInfoArray);
	
	this.initUIMode();
	
	var _this = this;
	//根据身份证自动填写出生日期 性别；姓名填写拼音
    if(document.all){//ie8及以下
        $('#'+MisPersonBasicInfoCol.SHENFEN_ID)[0].attachEvent('onpropertychange',function(e) {
            if(e.propertyName!='value') return;
            setValueByShenfenId();
        });
        $('#'+MisPersonBasicInfoCol.NAME)[0].attachEvent('onpropertychange',function(e) {
            if(e.propertyName!='value') return;
            setValueByName();
        });
    }else{
        $(document).on('propertychange input', "#"+MisPersonBasicInfoCol.SHENFEN_ID, function(event) {
            setValueByShenfenId();
        });
        $(document).on('propertychange input', "#"+MisPersonBasicInfoCol.NAME, function(event) {
            setValueByName();
        });
    }
    var $setTime = null;
    function setValueByShenfenId(){
        $setTime && clearTimeout($setTime);
        $setTime = setTimeout(function() {
            var tip = $('#basicInfo_shenfenId_tip').html();
            if(tip === '') {
                var value = _this.shenfenId.getValue();
                if(WebUtil.isEmpty(value)) {
                    return;
                }
                var birth = value.substr(6, 8);
                _this.birthDate.setValue(birth);
                var sexcode = 0;
                if(value.length===15){
                    sexcode = value.substr(14, 1) % 2;
                }else{
                    sexcode = value.substr(16, 1) % 2;
                }
                sexcode = sexcode === 1 ? 1 : 2;
                _this.sexCode.setValue(sexcode);
            }
        }, 200);
    }
    function setValueByName(){
        $setTime && clearTimeout($setTime);
        $setTime = setTimeout(function() {
            //
            var tip = $('#basicInfo_name_tip').html();
            if(tip === '') {
                var value = _this.name.getValue();
                if(WebUtil.isEmpty(value)) {
                    return;
                }
                var pinyin = pinyinUtil.getPinyin(value, '');
                _this.namePinyin.setValue(pinyin);
            }
        }, 200);
    }
}

TPCardEditPage.prototype.initDBInfo = function()
{	
	
	var nThis = this;
	//文本页面没有数据库字段，控件
	//var url = WebVar.VarPath + "/db/mgr/dbinfo/" + ABISCode.DBTypeCode.TENRPINT_DB;
	//增加用途过滤
	var url = WebVar.VarPath + "/locbase/db/code/" + ABISCode.DBTypeCode.TENRPINT_DB + "/" + ABISCode.DBPurposeCode.NORMAL;
	jQuery.ajax
	( 
		{
			type 		: 'POST',
			contentType : 'application/json',
			url 		: url,
			data 		: null,
			dataType 	: 'json',
			success 	: function(data) 
			{
				if(data != null)
				{
					nThis.dbid.setComboData(data);
					if(nThis.dbid != null)
					{
						//alert(nThis.dbid);
						//nThis.dbid 指向的是控件 而不是数据库id 赋值报错，此页面并没有初始dbid，先注释掉  hjx 2017年4月17日
						//nThis.dbid.setValue(nThis.dbid) ;
					}
					nThis.loadDbInfo = true;
				}
			}
		}
	);
}
//设置校验规则  TODO  根据json格式遍历
TPCardEditPage.prototype.setValidateColumns = function(columnsObj)
{	
	
	
	
	if(WebUtil.isEmpty(columnsObj)) return;
	
	if(typeof columnsObj["MIS_PERSON"] == 'undefined'){
		columnsObj["MIS_PERSON"]={};
	}
	if(typeof columnsObj["TP_CARD_INFO"] == 'undefined'){
		columnsObj["TP_CARD_INFO"]={};
	}
	if(typeof columnsObj["MIS_PERSON_BASIC_INFO"] == 'undefined'){
		columnsObj["MIS_PERSON_BASIC_INFO"]=columnsObj["MIS_PERSON_TEXT_INFO"];
	}
	if(typeof columnsObj["MIS_PERSON_BODY_INFO"] == 'undefined'){
		columnsObj["MIS_PERSON_BODY_INFO"]=columnsObj["MisPersonBodyInfo"];
	}
	if(typeof columnsObj["MIS_PERSON_CE_INFO"] == 'undefined'){
		columnsObj["MIS_PERSON_CE_INFO"]=columnsObj["MisPersonCEInfo"];
	}
	//MisPersonEnrollInfo
	var personNumparam={};	
	
	
	personNumparam.maxlength=columnsObj["MIS_PERSON"][MisPersonCol.PERSON_NUM];
	this.personNum.setValidateType(personNumparam);	
	
	var iniEnrollTypeparam={};	
	iniEnrollTypeparam.maxlength=columnsObj["MIS_PERSON"][this.iniEnrollType.getId()];	
	this.iniEnrollType.setValidateType(iniEnrollTypeparam);
	
	var iniEnrollUserparam={};	
	iniEnrollUserparam.maxlength=columnsObj["MIS_PERSON"][this.iniEnrollUser.getId()];	
	this.iniEnrollUser.setValidateType(iniEnrollUserparam);	
	
	var printByparam={};	
	printByparam.maxlength=columnsObj["TP_CARD_INFO"][this.printBy.getId()];	
	this.printBy.setValidateType(printByparam);	
	
	var printUnitNameparam={};	
	printUnitNameparam.maxlength=columnsObj["TP_CARD_INFO"][this.printUnitName.getId()];
    this.printUnitName.setValidateType(printUnitNameparam);
    
	var cardNumParam={};	
	cardNumParam.maxlength=columnsObj["TP_CARD_INFO"][TPCardInfoCol.CARD_NUM];
	cardNumParam.regex = "^[A-Za-z0-9]+$";
    this.cardNum.setValidateType(cardNumParam);
    
    
	var nameparam={};	
	nameparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.name.getId()];
	this.name.setValidateType(nameparam);
	
	var aliasparam={};	
	aliasparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.alias.getId()];
	this.alias.setValidateType(aliasparam);
	
	var birthDateparam={};	
	birthDateparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.birthDate.getId()];
	this.birthDate.setValidateType(birthDateparam);
	
	var sexCodeparam={};	
	sexCodeparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.sexCode.getId()];
	this.sexCode.setValidateType(sexCodeparam);
	
	var nationparam={};	
	nationparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.nation.getId()];
	this.nation.setValidateType(nationparam);
	
	var minZuparam={};	
	minZuparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.minZu.getId()];
	this.minZu.setValidateType(minZuparam);	
	
	this.shenfenId.getValidateType.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.shenfenId.getId()];	
	
	var namePinyinparam={};
	namePinyinparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.namePinyin.getId()]
	namePinyinparam.regex = "^[A-Za-z]+$";
	this.namePinyin.setValidateType(namePinyinparam);
	var politicalAffiliationparam={};
	politicalAffiliationparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.politicalAffiliation.getId()];
	this.politicalAffiliation.setValidateType(politicalAffiliationparam);
	
	var religiousFaithparam={};
	religiousFaithparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.religiousFaith.getId()];
	this.religiousFaith.setValidateType(religiousFaithparam);
	
	var maritalStatusparam={};
	maritalStatusparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.maritalStatus.getId()];	
	this.maritalStatus.setValidateType(maritalStatusparam);
	
	var highestEduDegreeparam={};
	highestEduDegreeparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.highestEduDegree.getId()];
	this.highestEduDegree.setValidateType(highestEduDegreeparam);
	
	var militaryServiceStatusparam={};
	militaryServiceStatusparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.militaryServiceStatus.getId()];
	this.militaryServiceStatus.setValidateType(militaryServiceStatusparam);
	var commentsparam = {};
	commentsparam.maxlength=columnsObj["MIS_PERSON_BASIC_INFO"][this.comments.getId()];	
	commentsparam.maxlength=500;
	this.comments.setValidateType(commentsparam);	
	var bodyHeightParam = {};
	bodyHeightParam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.bodyHeight.getId()];
	//this.bodyHeight.setValidateType(bodyHeightParam);
	var footLengthParam = {};
	footLengthParam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.footLength.getId()];
	//this.footLength.setValidateType(footLengthParam);
	var bodyHeightParam = {};
	bodyHeightParam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.bodyWeight.getId()];
	//this.bodyWeight.setValidateType(bodyHeightParam)
	var bloodTypeparam={};
	bloodTypeparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.bloodType.getId()];
	//this.bloodType.setValidateType(bloodTypeparam);
	
	var bodyFeatureparam={};
	bodyFeatureparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.bodyFeature.getId()];
	this.bodyFeature.setValidateType(bodyFeatureparam);
	
	var hairColorparam={};
	hairColorparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.hairColor.getId()];
	this.hairColor.setValidateType(hairColorparam);
	
	var eyeColorparam={};
	eyeColorparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.eyeColor.getId()];
	this.eyeColor.setValidateType(eyeColorparam);
	
	var auditionCapparam={};
	auditionCapparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.auditionCap.getId()];
	this.auditionCap.setValidateType(auditionCapparam);
	
	var vocalCapparam={};
	vocalCapparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.vocalCap.getId()];
	this.vocalCap.setValidateType(vocalCapparam);
	
	var accentparam={};
	accentparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.accent.getId()];
	this.accent.setValidateType(accentparam);
	
	var fingerMissedCntparam={};
	fingerMissedCntparam.maxlength=columnsObj["MIS_PERSON_BODY_INFO"][this.fingerMissedCnt.getId()];
	fingerMissedCntparam.isdigital=true;
	this.fingerMissedCnt.setValidateType(fingerMissedCntparam);
	
	var caseNumparam={};
	caseNumparam.maxlength=columnsObj["MIS_PERSON_CE_INFO"][this.caseNum.getId()];
	this.caseNum.setValidateType(caseNumparam);
	
	var personClassCodeparam={};
	personClassCodeparam.maxlength=columnsObj["MIS_PERSON_CE_INFO"][this.personClassCode.getId()];
	this.personClassCode.setValidateType(personClassCodeparam);
	
	var isCriminalparam={};
	isCriminalparam.maxlength=columnsObj["MIS_PERSON_CE_INFO"][this.isCriminal.getId()];
	this.isCriminal.setValidateType(isCriminalparam);
	
	var criminalRecordparam={};
	criminalRecordparam.maxlength=columnsObj["MIS_PERSON_CE_INFO"][this.criminalRecord.getId()];
	this.criminalRecord.setValidateType(criminalRecordparam);
	
	var caseClassCode1param={};
	caseClassCode1param.maxlength=columnsObj["MIS_PERSON_CE_INFO"][this.caseClassCode1.getId()];
	this.caseClassCode1.setValidateType(caseClassCode1param);
	this.caseClassCode2.setValidateType(caseClassCode1param);
	this.caseClassCode3.setValidateType(caseClassCode1param);
	
}

TPCardEditPage.prototype.validatePersonNo = function(nThis)
{
	var nThis=nThis;
	var v=nThis.getValue();
	if(v=="")
	{
		nThis.cancelErrorTip();
		nThis.infotip.html("");
	}
	else
	{
		$.post(WebVar.VarPath + "/tp/txt/util/validatePersonNo",{personno:v},
				function(data)
				{
					if(data)
					{
						nThis.cancelErrorTip();
						nThis.getErrorTip().html("");
					}
					else
					{
						nThis.errorTip();
						nThis.getErrorTip().html(AbisMessageResource.Alert["PersonNumAlreadyExists"]);
					}
				}
			);
	}
	
}

TPCardEditPage.prototype.switchScanMode = function()
{
	this.mode = TPTxtMode.SCAN;
	
}

TPCardEditPage.prototype.switchEditMode = function()
{
	this.mode = TPTxtMode.EDIT;	
	
}


TPCardEditPage.prototype.initUIMode = function()
{
	if(this.mode == TPTxtMode.SCAN)
	{
//		this.personNum.setEditable(true);
//		this.cardNum.setEditable(true);
//		this.iniEnrollType.setEditable(true);
//		this.iniEnrollUser.setEditable(true);

		$("#hide_0").hide();
		$("#hide_1").hide();
		$("#hide_2").hide();
		$("#hide_3").hide();
		$("#hide_4").hide();
		$("#hide_5").hide();
	}
	else
	{
		this.update();
//		this.personNum.setEditable(false);
//		this.cardNum.setEditable(false);
//		this.iniEnrollType.setEditable(false);
//		this.iniEnrollUser.setEditable(false);
//		this.iniEnrollUnitCode.setEditable(false);
//		this.printBy.setEditable(false);		
//		this.printUnitCode.setEditable(false);
//		this.printUnitName.setEditable(false);
	}
}


TPCardEditPage.prototype.initMap = function(map,contro)
{
	// 将控件放入集合
	map.push(contro);
	
	// 使用控件ID映射控件
	this.filedMap[contro.getId()] = contro;
	
	// 查看是否为必填项
	var r = WebArrayUtil.containsToIgnoreCase(this.requiredField, contro.getId());
	if(r)
	{
		this.requiredMap.push(contro);	
	}
	
	// 查看是否为更新项
	var u = WebArrayUtil.containsToIgnoreCase(this.updateField, contro.getId());
	if(u)
	{
		this.updateMap.push(contro);	
	}
}

//是否通过了长度验证，既页面中存在红色字体提示长度不符合时不予保存
TPCardEditPage.prototype.isPassLenValidate = function()
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
TPCardEditPage.prototype.isPassValidate	= function()
{
	return this.isPassLenValidate() && this.validateRequired();
}

//为所有文本框注册当前文本是否发生了变化，编辑页面赋值后调用。
TPCardEditPage.prototype.Txtchange = function()
{
	for(var parent in this.crolArray)
	{
		for(var name in this.crolArray[parent])
		{
			var field = this.crolArray[parent][name];
			this.register(field);
		}
	}
}

TPCardEditPage.prototype.register = function(field)
{
	field.addChangeListener(textChange);
	
	var nthis = this;
	function textChange(id,value,data)
	{
		var id		= field.getId();
		var oldCard = nthis.srcCardObj;
		var oldValue= null;
		if(oldCard != null)
		{
			oldValue = oldCard[id] + "";
		}
		var value = field.getValue();	
		
		var type = field.getType();
		if(id == MisPersonCol.DBID)
		{
			var dbid = 0;
			for(var i in value)
			{
				var v = parseInt(value[i]);
				dbid |= v;
			}
			dbid += "";
			oldValue += "";
			flag = dbid != oldValue;
		}
		else
		{
			if(value != oldValue)
			{
				 flag = true;
			}	
			else
			{
				 flag = false;
			}
		}
		nthis.changeField[id] = flag;	
		if(WebUtil.isFunction(nthis.changeListener))
		{
			nthis.changeListener(id,value,data);	
		}
	}
}

//编辑页面的信息是否发生了变化
TPCardEditPage.prototype.isTxtInfoChanged = function()
{	
	var flag = false;
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
TPCardEditPage.prototype.validateRequired = function()
{
	// 验证必填项是否都填了
	var flag = true;
	var n = 0;
	for(var i=0 ;i < this.requiredMap.length;i++)
	{
		var field = this.requiredMap[i];
		var text = field.getValue();
		if(WebUtil.isEmpty(text))
		{
			n++;
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
TPCardEditPage.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}

TPCardEditPage.prototype.initComboData=function()
{
	
	var columnnames = ['MIS_PERSON|INI_ENROLL_TYPE','MIS_PERSON_TEXT_INFO|CREATE_UNIT_CODE',"MIS_PERSON_TEXT_INFO|SEX_CODE","MIS_PERSON_TEXT_INFO|NATION","MIS_PERSON_TEXT_INFO|MIN_ZU","MIS_PERSON_TEXT_INFO|POLITICAL_AFFILIATION",
	                   "MIS_PERSON_TEXT_INFO|RELIGIOUS_FAITH","MIS_PERSON_TEXT_INFO|MARITAL_STATUS","MIS_PERSON_TEXT_INFO|HIGHEST_EDU_DEGREE","MIS_PERSON_TEXT_INFO|MILITARY_SERVICE_STATUS","MIS_PERSON_TEXT_INFO|BLOOD_TYPE",
	                   "MIS_PERSON_TEXT_INFO|BODY_FEATURE","MIS_PERSON_TEXT_INFO|HAIR_COLOR","MIS_PERSON_TEXT_INFO|EYE_COLOR","MIS_PERSON_TEXT_INFO|ACCENT","MIS_PERSON_TEXT_INFO|PERSON_CLASS_CODE","MIS_PERSON_TEXT_INFO|AUDITION_CAP","MIS_PERSON_TEXT_INFO|VOCAL_CAP",
	                   "MIS_PERSON_TEXT_INFO|IS_CRIMINAL","MIS_PERSON_TEXT_INFO|ADDRESS_CODE","MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_1","MIS_PERSON_TEXT_INFO|ADDRESS_TYPE","MIS_PERSON_TEXT_INFO|COMM_TYPE","MIS_PERSON_TEXT_INFO|PHONE_NUM_TYPE","MIS_PERSON_TEXT_INFO|CERT_TYPE"];	
	WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis=this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
//初始化字典项
TPCardEditPage.prototype.getComboData=function (data)
{
	data = eval('(' + data + ')');			
	//dbid.setComboData(data['MIS_PERSON|dbid']);		
	//this.personType.setComboData(data['MIS_PERSON|person_type']);
	this.iniEnrollUnitCode.setComboData(data['mis_person_text_info|create_unit_code']);
	this.createUnitCode.setComboData(data['mis_person_text_info|create_unit_code']);
	this.updateUnitCode.setComboData(data['mis_person_text_info|create_unit_code']);
	this.iniEnrollType.setComboData(data['mis_person_text_info|ini_enroll_type']);
	
	this.printUnitCode.setComboData(data['mis_person_text_info|create_unit_code']);
	this.sexCode.setComboData(data['mis_person_text_info|sex_code']);
	this.nation.setComboData(data['mis_person_text_info|nation']);
	this.minZu.setComboData(data['mis_person_text_info|min_zu']);
	this.politicalAffiliation.setComboData(data['mis_person_text_info|political_affiliation']);
	this.religiousFaith.setComboData(data['mis_person_text_info|religious_faith']);
	this.maritalStatus.setComboData(data['mis_person_text_info|marital_status']);
	this.highestEduDegree.setComboData(data['mis_person_text_info|highest_edu_degree']);
	this.militaryServiceStatus.setComboData(data['mis_person_text_info|military_service_status']);
	
	this.bloodType.setComboData(data['mis_person_text_info|blood_type']);
	this.bodyFeature.setComboData(data['mis_person_text_info|body_feature']);
	this.hairColor.setComboData(data['mis_person_text_info|hair_color']);
	this.eyeColor.setComboData(data['mis_person_text_info|eye_color']);
	this.accent.setComboData(data['mis_person_text_info|accent']);
	this.auditionCap.setComboData(data['mis_person_text_info|audition_cap']);
	this.vocalCap.setComboData(data['mis_person_text_info|vocal_cap']);
	
	this.personClassCode.setComboData(data['mis_person_text_info|person_class_code']);
	this.isCriminal.setComboData(data['mis_person_text_info|is_criminal']);
	this.caseClassCode1.setComboData(data['mis_person_text_info|case_class_code_1']);
	this.caseClassCode2.setComboData(data['mis_person_text_info|case_class_code_1']);
	this.caseClassCode3.setComboData(data['mis_person_text_info|case_class_code_1']);
	
	//box
	addressCode.setComboData(data['mis_person_text_info|address_code']);	
	addressType.setComboData(data['mis_person_text_info|address_type']);
	commType.setComboData(data['mis_person_text_info|comm_type']);
	phoneNumType.setComboData(data['mis_person_text_info|phone_num_type']);
	certType.setComboData(data['mis_person_text_info|cert_type']);
}

TPCardEditPage.prototype.initTable=function()
{

	var tblParamLanguage =
	{
		language:pageNumStr
	};
	addrtableMgr = new WebTableMgr("addrTable","addrPageBar",20,tblParamLanguage);
	commtableMgr = new WebTableMgr("commTable","commPageBar",20,tblParamLanguage);	
	phonetableMgr = new WebTableMgr("phoneTable","phonePageBar",20,tblParamLanguage);
	certtableMgr = new WebTableMgr("certTable","certPageBar",20,tblParamLanguage);
	
	this.initTableButton();
}

TPCardEditPage.prototype.setTableData=function(obj)
{
	var commJson="commJson";
	var phoneJson="phoneJson";
	var certJson="certJson";
	var addrJson="addrJson";	
	addrtableMgr.setInput(eval('('+obj[addrJson]+')'));
	commtableMgr.setInput(eval('('+obj[commJson]+')'));
	phonetableMgr.setInput(eval('('+obj[phoneJson]+')'));
	certtableMgr.setInput(eval('('+obj[certJson]+')'));	
}

TPCardEditPage.prototype.getTPCardObject = function()
{
	var newObj=null;
	if(this.oldObj == null)
	{
		this.oldObj  			= {};
		this.oldObj.mainInfo 	= {};
		this.oldObj.tpCardInfo 	= {};
		this.oldObj.basicInfo 	= {};
		this.oldObj.bodyInfo 	= {};
		this.oldObj.ceInfo 		= {};
		this.oldObj.commInfos 	= {};
		this.oldObj.phoneInfos 	= {};
		this.oldObj.certInfos 	= {};
		this.oldObj.addrInfos 	= {};
		this.oldObj.EnrollInfo 	= {};
		
		newObj				= {};
		newObj.mainInfo 	= {};
		newObj.tpCardInfo 	= {};
		newObj.basicInfo 	= {};
		newObj.bodyInfo 	= {};
		newObj.ceInfo 		= {};
		newObj.commInfos 	= {};
		newObj.phoneInfos 	= {};
		newObj.certInfos 	= {};
		newObj.addrInfos 	= {};
		newObj.enrollInfo 	= {};
		
	}
	else
	{		
		newObj=$.extend(true,{},this.oldObj);
		newObj.enrollInfo = this.oldObj.EnrollInfo||{};
		
	}
	
	if(WebUtil.isNull(this.oldObj.mainInfo))
	{
		this.oldObj.mainInfo = {};		
		newObj.mainInfo = {};		
	}	
	var mainInfoChanged=false;	
	var flag=this.isChanged(this.oldObj.mainInfo.personNum ,this.personNum.getText());
	if(true)
	{		
		newObj.mainInfo.personNum=this.personNum.getText();
		mainInfoChanged=true;
	}	
	
	var dbid = this.dbid.getValue();	
	flag = this.isChanged(this.oldObj.mainInfo.dbid ,dbid);
	if(true)
	{		
		newObj.mainInfo.dbid = dbid;
		mainInfoChanged = true;
	}	

	var cuInfo = {};
	cuInfo.createTime 			= this.createTime.getValue();
	cuInfo.createUser 			= this.createUser.getValue();
	cuInfo.createUnitCode 		= this.createUnitCode.getValue();
	cuInfo.updateTime 			= this.updateTime.getValue();
	cuInfo.updateUser 			= this.updateUser.getValue();
	cuInfo.updateUnitCode 		= this.updateUnitCode.getValue();

	newObj.mainInfo.cuInfo = cuInfo;
	//enrollInfo
	if(WebUtil.isNull(this.oldObj.EnrollInfo))
	{
		this.oldObj.EnrollInfo = {};
		newObj.enrollInfo = {};
	}
	var enrollInfoChanged = false;
	flag=this.isChanged(this.oldObj.EnrollInfo.iniEnrollTime ,this.iniEnrollTime.getText());
	if(flag)
	{		
		newObj.enrollInfo.IniEnrollTime=this.iniEnrollTime.getText();
		enrollInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.EnrollInfo.iniEnrollUser ,this.iniEnrollUser.getText());
	if(flag)
	{		
		newObj.enrollInfo.IniEnrollUser=this.iniEnrollUser.getText();
		enrollInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.EnrollInfo.iniEnrollUnitCode ,this.iniEnrollUnitCode.getCode());
	if(flag)
	{		
		newObj.enrollInfo.IniEnrollUnitCode=this.iniEnrollUnitCode.getCode();
		enrollInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.EnrollInfo.iniEnrollType ,this.iniEnrollType.getCode());
	if(flag)
	{		
		newObj.enrollInfo.IniEnrollType=this.iniEnrollType.getCode();
		enrollInfoChanged=true;
	}
	if(!enrollInfoChanged){
		newObj.enrollInfo=null;
	}
	//enrollInfo end
	//tpCardInfo
	if(WebUtil.isNull(this.oldObj.tpCardInfo))
	{
		this.oldObj.tpCardInfo = {};
		newObj.tpCardInfo = {};
	}
	var tpCardInfoChanged=false;	
	flag=this.isChanged(this.oldObj.tpCardInfo.cardNum,this.cardNum.getText());
	if(flag)
	{	
		newObj.tpCardInfo.cardNum=this.cardNum.getText();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.createTime,this.createTime1.getText());
	if(flag)
	{		
		newObj.tpCardInfo.createTime= this.createTime1.getText();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.createUser,this.createUser1.getText());
	if(flag)
	{		
		newObj.tpCardInfo.createUser = this.createUser1.getText();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.updateTime,this.updateTime1.getText());
	if(flag)
	{		
		newObj.tpCardInfo.updateTime		= this.updateTime1.getText();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.updateUser,this.updateUser1.getText());
	if(flag)
	{		
		newObj.tpCardInfo.updateUser		= this.updateUser1.getText();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.printDate,this.printDate.getText());
	if(flag)
	{		
		newObj.tpCardInfo.printDate		= this.printDate.getText();
		tpCardInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.tpCardInfo.printBy,this.printBy.getText());
	if(flag)
	{		
		newObj.tpCardInfo.printBy		= this.printBy.getText();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.printUnitCode,this.printUnitCode.getCode());
	if(flag)
	{		
		newObj.tpCardInfo.printUnitCode		= this.printUnitCode.getCode();
		tpCardInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.tpCardInfo.printUnitName,this.printUnitName.getText());
	if(flag)
	{		
		newObj.tpCardInfo.printUnitName		= this.printUnitName.getText();
		tpCardInfoChanged=true;
	}
    if(!tpCardInfoChanged)    	
    {
    	newObj.tpCardInfo=null;
    }
  //tpCardInfo end
  //basicInfo
	if(WebUtil.isNull(this.oldObj.basicInfo))
	{
		this.oldObj.basicInfo = {};
		newObj.basicInfo = {};
	}	
	var basicInfoChanged=false;
	flag=this.isChanged(this.oldObj.basicInfo.name,this.name.getText());
	if(flag)
	{		
		newObj.basicInfo.name		= this.name.getText();
		basicInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.basicInfo.namePinyin,this.namePinyin.getText());
	if(flag)
	{		
		newObj.basicInfo.namePinyin		= this.namePinyin.getText();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.birthDate,this.birthDate.getText());
	if(flag)
	{		
		newObj.basicInfo.birthDate		= this.birthDate.getText();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.sexCode,this.sexCode.getCode());
	if(flag)
	{		
		newObj.basicInfo.sexCode		= this.sexCode.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.nation,this.nation.getCode());
	if(flag)
	{		
		newObj.basicInfo.nation		= this.nation.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.shenfenId,this.shenfenId.getText());
	if(flag)
	{	
		newObj.basicInfo.shenfenId		= this.shenfenId.getText();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.minZu,this.minZu.getCode());
	if(flag)
	{		
		newObj.basicInfo.minZu		= this.minZu.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.alias,this.alias.getText());
	if(flag)
	{		
		newObj.basicInfo.alias		= this.alias.getText();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.comments,this.comments.getText());
	if(flag)
	{		
		newObj.basicInfo.comments		= this.comments.getText();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.religiousFaith,this.religiousFaith.getCode());
	if(flag)
	{		
		newObj.basicInfo.religiousFaith		= this.religiousFaith.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.maritalStatus,this.maritalStatus.getCode());
	if(flag)
	{		
		newObj.basicInfo.maritalStatus		= this.maritalStatus.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.highestEduDegree,this.highestEduDegree.getCode());
	if(flag)
	{		
		newObj.basicInfo.highestEduDegree		= this.highestEduDegree.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.politicalAffiliation,this.politicalAffiliation.getCode());
	if(flag)
	{		
		newObj.basicInfo.politicalAffiliation		= this.politicalAffiliation.getCode();
		basicInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.basicInfo.militaryServiceStatus,this.militaryServiceStatus.getCode());
	if(flag)
	{		
		newObj.basicInfo.militaryServiceStatus		= this.militaryServiceStatus.getCode();
		basicInfoChanged=true;
	}	
	if(!basicInfoChanged)
	{
		newObj.basicInfo=null;
	}
	
	//bodyInfo
	if(WebUtil.isNull(this.oldObj.bodyInfo))
	{
		this.oldObj.bodyInfo = {};
		newObj.bodyInfo = {};
	}
	var bodyInfoChanged=false;
	flag=this.isChanged(this.oldObj.bodyInfo.bodyHeight,this.bodyHeight.getText());
	if(flag)
	{		
		newObj.bodyInfo.bodyHeight		= this.bodyHeight.getText();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.footLength,this.footLength.getText());
	if(flag)
	{		
		newObj.bodyInfo.footLength	= this.footLength.getText();
		bodyInfoChanged=true;
	}		
	flag=this.isChanged(this.oldObj.bodyInfo.bodyWeight,this.bodyWeight.getText());
	if(flag)
	{		
		newObj.bodyInfo.bodyWeight	= this.bodyWeight.getText();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.bloodType,this.bloodType.getCode());
	if(flag)
	{		
		newObj.bodyInfo.bloodType	= this.bloodType.getCode();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.bodyFeature,this.bodyFeature.getCode());
	if(flag)
	{		
		newObj.bodyInfo.bodyFeature	= this.bodyFeature.getCode();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.hairColor,this.hairColor.getCode());
	if(flag)
	{		
		newObj.bodyInfo.hairColor	= this.hairColor.getCode();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.eyeColor,this.eyeColor.getCode());
	if(flag)
	{		
		newObj.bodyInfo.eyeColor	= this.eyeColor.getCode();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.auditionCap,this.auditionCap.getValue());
	if(flag)
	{		
		newObj.bodyInfo.auditionCap	= this.auditionCap.getValue();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.vocalCap,this.vocalCap.getValue());
	if(flag)
	{		
		newObj.bodyInfo.vocalCap	= this.vocalCap.getValue();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.accent,this.accent.getCode());
	if(flag)
	{		
		newObj.bodyInfo.accent	= this.accent.getCode();
		bodyInfoChanged=true;
	}	
	flag=this.isChanged(this.oldObj.bodyInfo.fingerMissedCnt,this.fingerMissedCnt.getText());
	if(flag)
	{		
		newObj.bodyInfo.fingerMissedCnt	= this.fingerMissedCnt.getText();
		bodyInfoChanged=true;
	}
	if(newObj.bodyInfo.fingerMissedCnt==null)
	{
		newObj.bodyInfo.fingerMissedCnt=0;
	}
	if(!bodyInfoChanged)
	{
		newObj.bodyInfo=null;
	}

	//ceInfo
	if(WebUtil.isNull(this.oldObj.ceInfo))
	{
		this.oldObj.ceInfo = {};
		newObj.ceInfo = {};
	}
	var ceInfoChanged=false;
	flag=this.isChanged(this.oldObj.ceInfo.caseClassCode1,this.caseClassCode1.getCode());
	if(flag)
	{		
		newObj.ceInfo.caseClassCode1	= this.caseClassCode1.getCode();
		ceInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.ceInfo.caseClassCode2,this.caseClassCode2.getCode());
	if(flag)
	{		
		newObj.ceInfo.caseClassCode2	= this.caseClassCode2.getCode();
		ceInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.ceInfo.caseClassCode3,this.caseClassCode3.getCode());
	if(flag)
	{		
		newObj.ceInfo.caseClassCode3	= this.caseClassCode3.getCode();
		ceInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.ceInfo.isCriminal,this.isCriminal.getCode());
	if(flag)
	{		
		newObj.ceInfo.isCriminal	= this.isCriminal.getCode();
		ceInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.ceInfo.personClassCode,this.personClassCode.getCode());
	if(flag)
	{		
		newObj.ceInfo.personClassCode	= this.personClassCode.getCode();
		ceInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.ceInfo.criminalRecord,this.criminalRecord.getText());
	if(flag)
	{		
		newObj.ceInfo.criminalRecord	= this.criminalRecord.getText();
		ceInfoChanged=true;
	}
	flag=this.isChanged(this.oldObj.ceInfo.caseNum,this.caseNum.getText());
	if(flag)
	{		
		newObj.ceInfo.caseNum	= this.caseNum.getText();
		ceInfoChanged=true;
	}
	if(!ceInfoChanged)
	{
		newObj.ceInfo=null;
	}

    var commInfos=new Array();
	var commtable=commtableMgr.getTable();
	var commdata1=eval('('+this.oldObj.commJson+')');
	var commdata= null;
	
	if(commdata1 != null)
	{
		commdata = commdata1['result'];	
	}
	for(var i=0;i<commtable.getRowCount();i++)
	{
		var rowdata=commtable.getRow(i);		
		var id=rowdata['ID'];
		var commtype=rowdata['COMM_TYPE'];
		var commNum=rowdata['COMM_NUM'];
		var loginPass=rowdata['LOGIN_PASS'];
		var personcomm={};
		personcomm.id=id;		  
		personcomm.commType=commtype;		  
		personcomm.commNum=commNum;
		personcomm.loginPass=loginPass;
		if(id==null||id==0)
		{
			commInfos.push(personcomm);  
		}
		else
		{
			if(commdata != null)
			{
				for(var j=0;j<commdata.length;j++)
				{
				  var tempid=commdata[j]['data']['ID'];
				  if(tempid==id)
				  {
					  var flag=false;
					  var t1=commdata[j]['data']['COMM_TYPE'];
				  if(t1!='')
				  {
					   var t11=t1.split(WebTable.splitChar);
					   t1=t11[0];
				  }
				  var t2=commdata[j]['data']['COMM_NUM'];
				  var t3=commdata[j]['data']['LOGIN_PASS'];
				  if(t1!=commtype)flag=true;
				  if(t2!=commNum) flag=true;
				  if(t3!=loginPass)flag=true;
				  if(flag) commInfos.push(personcomm);
				}
				}
			}
		}
	}
	
	var addInfos=new Array();
	var addrtable=addrtableMgr.getTable();
	var addressdata1=eval('('+this.oldObj.addrJson+')')
	var addressdata= null;
	if(addressdata1 != null)
	{
		addressdata = addressdata1['result'];	
	}
	for(var i=0;i<addrtable.getRowCount();i++)
	{
		var rowdata=addrtable.getRow(i);		
		var id=rowdata['ID'];		  
		var addressCode=rowdata['ADDRESS_CODE'];		  
		var addressDetail=rowdata['ADDRESS_DETAIL'];
		var addressType=rowdata['ADDRESS_TYPE'];
		var addressZipCode=rowdata['ADDRESS_ZIP_CODE'];
		var personaddr={};
		personaddr.id=id;		  
		personaddr.addressCode=addressCode;		  
		personaddr.addressDetail=addressDetail;
		personaddr.addressType=addressType;
		personaddr.addressZipCode=addressZipCode;
		if(id==null||id==0)
		{
			addInfos.push(personaddr);  
		}
		else
		{
			if(addressdata != null)
			{
				  for(var j=0;j<addressdata.length;j++)
				  {
					  var tempid=addressdata[j]['data']['ID'];
					  if(tempid==id)
					  {
						  var flag=false;
						  var t1=addressdata[j]['data']['ADDRESS_CODE'];
						  if(t1!='')
						  {
							  var t11=t1.split(ABISTableUtil.splitChar);
							  t1=t11[0];
						  }
						  var t2=addressdata[j]['data']['ADDRESS_DETAIL'];
						  var t3=addressdata[j]['data']['ADDRESS_TYPE'];
						  if(t3!='')
						  {
							  var t33=t3.split(WebTable.splitChar);
							  t3=t33[0];
						  }
						  var t4=addressdata[j]['data']['ADDRESS_ZIP_CODE'];
						  if(t1!=addressCode) flag=true;
						  if(t2!=addressDetail)  flag=true;
						  if(t3!=addressType) flag=true;
						  if(t4!=addressZipCode) flag=true;
						  if(flag)  addInfos.push(personaddr);
					  }
				  }
			}
		}

	}

	var phoneInfos=new Array();
	var phonetable=phonetableMgr.getTable();
	var phonedata1=eval('('+this.oldObj.phoneJson+')');
	var phonedata = null;
	if(phonedata1 != null)
	{
		phonedata = phonedata1['result'];
	}
	for(var i=0;i<phonetable.getRowCount();i++)
	{
		var rowdata=phonetable.getRow(i);
		var id=rowdata['ID'];
		var phoneNumType=rowdata['PHONE_NUM_TYPE'];
		var phoneNum=rowdata['PHONE_NUM'];
		var personphone={};
		personphone.id=id;
		personphone.phoneNumType=phoneNumType;
		personphone.phoneNum=phoneNum;
		if(id==null||id==0)
		{
			phoneInfos.push(personphone);
		}
		else
		{
			if(phonedata != null)
			{
				  for(var j=0;j<phonedata.length;j++)
				  {
					  var tempid=phonedata[j]['data']['ID'];
					  if(tempid==id)
					  {
						  var flag=false;
						  var t1=phonedata[j]['data']['PHONE_NUM_TYPE'];
						  if(t1!='')
						  {
							  var t11=t1.split(WebTable.splitChar);
							  t1=t11[0];
						  }
						  var t2=phonedata[j]['data']['PHONE_NUM'];
						  if(t1!=phoneNumType) flag=true;
						  if(t2!=phoneNum) flag=true;
						  if(flag) phoneInfos.push(personphone);
					   }
				  }
			}
		}
	}

	var certInfos=new Array();
	var certtable=certtableMgr.getTable();
	var certdata1=eval('('+this.oldObj.certJson+')')
	var certdata = null;
	if(certdata1 != null)
	{
		certdata = certdata1['result'];
	}
	for(var i=0;i<certtable.getRowCount();i++)
	{
		var rowdata=certtable.getRow(i);
		var id=rowdata['ID'];
		var certType=rowdata['CERT_TYPE'];
		var certNum=rowdata['CERT_NUM'];
		var issueBy=rowdata['ISSUE_BY'];
		var issueDate=rowdata['ISSUE_DATE'];
		var startDate=rowdata['START_DATE'];
		var expireDate=rowdata['EXPIRE_DATE'];
		var personcert={};
		personcert.id=id;
		personcert.certType=certType;
		personcert.certNum=certNum;
		personcert.issueBy=issueBy;
		personcert.issueDate=issueDate;
		personcert.startDate=startDate;
		personcert.expireDate=expireDate;
		if(id==null||id==0)
		{
			certInfos.push(personcert);
		}
		else
		{
			if(certdata != null)
			{
			  for(var j=0;j<certdata.length;j++)
			  {
				  var tempid=certdata[j]['data']['ID'];
				  if(tempid==id)
				  {
					  var flag=false;
					  var t1=certdata[j]['data']['CERT_TYPE'];
					  if(t1!='')
					  {
						  var t11=t1.split(WebTable.splitChar);
						  t1=t11[0];
					  }
					  var t2=certdata[j]['data']['CERT_NUM'];
					  var t3=certdata[j]['data']['ISSUE_BY'];
					  var t4=certdata[j]['data']['ISSUE_DATE'];
					  var t5=certdata[j]['data']['START_DATE'];
					  var t6=certdata[j]['data']['EXPIRE_DATE'];
					  if(t1!=certType) flag=true;
					  if(t2!=certNum) flag=true;
					  if(t3!=issueBy) flag=true;
					  if(t4!=issueDate) flag=true;
					  if(t5!=startDate) flag=true;
					  if(t6!=expireDate) flag=true;
					  if(flag)  certInfos.push(personcert);
				  }
			  }
			}
		}

	}

	this.oldObj.commInfos=commInfos;
	this.oldObj.phoneInfos=phoneInfos;
	this.oldObj.certInfos=certInfos;
	this.oldObj.addrInfos=addInfos;

	newObj.commInfos=commInfos;
	newObj.phoneInfos=phoneInfos;
	newObj.certInfos=certInfos;
	newObj.addrInfos=addInfos;

	var bzoObj = {}
	bzoObj.card = newObj;
	bzoObj.delAddrList = this.delAddrList;
    bzoObj.delCertList = this.delCertList;
	bzoObj.delCommList = this.delCommList;
	bzoObj.delPhoneList = this.delPhoneList;
	return bzoObj;
}
TPCardEditPage.prototype.isChanged=function(src,des)
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

TPCardEditPage.prototype.clear =function()
{
	this.personNum.setValue("");
	this.dbid.setValue("");
	//this.personType.setValue("");
	this.iniEnrollType.setValue("");
	this.iniEnrollTime.setValue("");
	this.iniEnrollUser.setValue("");
	this.iniEnrollUnitCode.setValue("");

	this.createTime.setValue("");
	this.createUser.setValue("");
	this.createUnitCode.setValue("");
	this.updateTime.setValue("");
	this.updateUser.setValue("");
	this.updateUnitCode.setValue("");

	this.cardNum.setValue("");
	this.createTime1.setValue("");
	this.createUser1.setValue("");
	this.updateTime1.setValue("");
	this.updateUser1.setValue("");
	this.printDate.setValue("");
	this.printBy.setValue("");
	this.printUnitCode.setValue("");
	this.printUnitName.setValue("");

	this.name.setValue("");
	this.alias.setValue("");
	this.birthDate.setValue("");
	this.sexCode.setValue("");
	this.nation.setValue("");
	this.minZu.setValue("");
	this.shenfenId.setValue("");
	this.namePinyin.setValue("");
	this.politicalAffiliation.setValue("");
	this.religiousFaith.setValue("");
	this.maritalStatus.setValue("");
	this.highestEduDegree.setValue("");
	this.militaryServiceStatus.setValue("");
	this.comments.setValue("");

	this.bodyHeight.setValue("");
	this.footLength.setValue("");
	this.bodyWeight.setValue("");
	this.bloodType.setValue("");
	this.bodyFeature.setValue("");
	this.hairColor.setValue("");
	this.eyeColor.setValue("");
	this.auditionCap.setValue("");
	this.vocalCap.setValue("");
	this.accent.setValue("");
	this.fingerMissedCnt.setValue("");

	this.caseNum.setValue("");
	this.personClassCode.setValue("");
	this.isCriminal.setValue("");
	this.criminalRecord.setValue("");
	this.caseClassCode1.setValue("");
	this.caseClassCode2.setValue("");
	this.caseClassCode3.setValue("");

	addrtableMgr.getTable().clear(true);
	commtableMgr.getTable().clear(true);
	phonetableMgr.getTable().clear(true);
	certtableMgr.getTable().clear(true);
}

TPCardEditPage.prototype.initDefault = function()
{
	if(WebUtil.isEmpty(this.defValue)) return;

	for(var i=0;i<this.defValue.length;i++)
	{
		var v = this.defValue[i];
		var field = this.filedMap[v.k];
		if(field == null)continue;
		field.setValue(v.v);
	}
}

TPCardEditPage.prototype.reSet =function()
{
	this.clear();
	this.initDefault();
}

TPCardEditPage.prototype.setTPCardObject = function(obj)
{
	this.clear();
	this.initDefault();

	this.srcCardObj	= new Array();
	this.oldObj		= obj;
	var mainInfo	= "mainInfo";
	var tpCardInfo	= "tpCardInfo";
	var basicInfo	= "basicInfo";
	var bodyInfo	= "bodyInfo";
	var ceInfo		= "ceInfo";
	var EnrollInfo		= "EnrollInfo";

	var mainInfoA	= this.crolArray[mainInfo];
	if(obj[mainInfo]!=null)
	{
		this.setContralValue(this.personNum,obj[mainInfo][MisPerson.PERSONNUM]);
		this.setContralValue(this.dbid,obj[mainInfo][MisPerson.DBID]);


		if(obj.mainInfo.cuInfo != null)
		{
			this.setContralValue(this.createTime,obj.mainInfo.cuInfo.createTime);
			this.setContralValue(this.createUser,obj.mainInfo.cuInfo.createUser);
			this.setContralValue(this.createUnitCode,obj.mainInfo.cuInfo.createUnitCode);
			this.setContralValue(this.updateTime,obj.mainInfo.cuInfo.updateTime);
			this.setContralValue(this.updateUser,obj.mainInfo.cuInfo.updateUser);
			this.setContralValue(this.updateUnitCode,obj.mainInfo.cuInfo.updateUnitCode);
		}
	}
	else
	{
		for(var i=0;i<mainInfoA.length;i++)
		{
			var contral	= mainInfoA[i];
		    var id		= contral.getId();
		    this.srcCardObj[id] = "";
		    contral.setText("");
		}
	}
	var tpCardInfoA= this.crolArray[tpCardInfo];
	if(obj[tpCardInfo]!=null)
	{
		this.setContralValue(this.cardNum,obj[tpCardInfo][TPCardInfo.CARDNUM]);
		this.setContralValue(this.createTime1,obj[tpCardInfo][TPCardInfo.CREATETIME]);
		this.setContralValue(this.createUser1,obj[tpCardInfo][TPCardInfo.CREATEUSER]);
		this.setContralValue(this.updateTime1,obj[tpCardInfo][TPCardInfo.UPDATETIME]);
		this.setContralValue(this.updateUser1,obj[tpCardInfo][TPCardInfo.UPDATEUSER]);
		this.setContralValue(this.printDate,obj[tpCardInfo][TPCardInfo.PRINTDATE]);
		this.setContralValue(this.printBy,obj[tpCardInfo][TPCardInfo.PRINTBY]);
		this.setContralValue(this.printUnitCode,obj[tpCardInfo][TPCardInfo.PRINTUNITCODE]);
		this.setContralValue(this.printUnitName,obj[tpCardInfo][TPCardInfo.PRINTUNITNAME]);
	}
	else
	{
		for(var i=0;i<tpCardInfoA.length;i++)
		{
			var contral=tpCardInfoA[i];
			var id=contral.getId();
		    this.srcCardObj[id]="";
			contral.setText("");
		}
	}
	var basicInfoA= this.crolArray[basicInfo];
	if(obj[basicInfo]!=null)
	{
		this.setContralValue(this.name,obj[basicInfo][MisPersonBasicInfo.NAME]);
		this.setContralValue(this.alias,obj[basicInfo][MisPersonBasicInfo.ALIAS]);
		this.setContralValue(this.birthDate,obj[basicInfo][MisPersonBasicInfo.BIRTHDATE]);
		this.setContralValue(this.sexCode,obj[basicInfo][MisPersonBasicInfo.SEXCODE]);
		this.setContralValue(this.nation,obj[basicInfo][MisPersonBasicInfo.NATION]);
		this.setContralValue(this.minZu,obj[basicInfo][MisPersonBasicInfo.MINZU]);
		this.setContralValue(this.shenfenId,obj[basicInfo][MisPersonBasicInfo.SHENFENID]);
		this.setContralValue(this.namePinyin,obj[basicInfo][MisPersonBasicInfo.NAMEPINYIN]);
		this.setContralValue(this.politicalAffiliation,obj[basicInfo][MisPersonBasicInfo.POLITICALAFFILIATION]);
		this.setContralValue(this.religiousFaith,obj[basicInfo][MisPersonBasicInfo.RELIGIOUSFAITH]);
		this.setContralValue(this.maritalStatus,obj[basicInfo][MisPersonBasicInfo.MARITALSTATUS]);
		this.setContralValue(this.highestEduDegree,obj[basicInfo][MisPersonBasicInfo.HIGHESTEDUDEGREE]);
		this.setContralValue(this.militaryServiceStatus,obj[basicInfo][MisPersonBasicInfo.MILITARYSERVICESTATUS]);
		this.setContralValue(this.comments,obj[basicInfo][MisPersonBasicInfo.COMMENTS]);
	}
	else
	{
		for(var i=0;i<basicInfoA.length;i++)
		{
			var contral=basicInfoA[i];
			var id=contral.getId();
		    this.srcCardObj[id]="";
			contral.setText("");
		}
	}
	var bodyInfoA= this.crolArray[bodyInfo];
	if(obj[bodyInfo]!=null)
	{
		this.setContralValue(this.bodyHeight,obj[bodyInfo][MisPersonBodyInfo.BODYHEIGHT]);
		this.setContralValue(this.footLength,obj[bodyInfo][MisPersonBodyInfo.FOOTLENGTH]);
		this.setContralValue(this.bodyWeight,obj[bodyInfo][MisPersonBodyInfo.BODYWEIGHT]);
		this.setContralValue(this.bloodType,obj[bodyInfo][MisPersonBodyInfo.BLOODTYPE]);
		this.setContralValue(this.bodyFeature,obj[bodyInfo][MisPersonBodyInfo.BODYFEATURE]);
		this.setContralValue(this.hairColor,obj[bodyInfo][MisPersonBodyInfo.HAIRCOLOR]);
		this.setContralValue(this.eyeColor,obj[bodyInfo][MisPersonBodyInfo.EYECOLOR]);
		this.setContralValue(this.auditionCap,obj[bodyInfo][MisPersonBodyInfo.AUDITIONCAP]);
		this.setContralValue(this.vocalCap,obj[bodyInfo][MisPersonBodyInfo.VOCALCAP]);
		this.setContralValue(this.accent,obj[bodyInfo][MisPersonBodyInfo.ACCENT]);
		this.setContralValue(this.fingerMissedCnt,obj[bodyInfo][MisPersonBodyInfo.FINGERMISSEDCNT]);
	}
	else
	{
		for(var i=0;i<bodyInfoA.length;i++)
		{
			var contral=bodyInfoA[i];
			var id=contral.getId();
		    this.srcCardObj[id]="";
			contral.setText("");
		}
	}
	var ceInfoA= this.crolArray[ceInfo];
	if(obj[ceInfo]!=null)
	{
		this.setContralValue(this.caseNum,obj[ceInfo][MisPersonCEInfo.CASENUM]);
		this.setContralValue(this.personClassCode,obj[ceInfo][MisPersonCEInfo.PERSONCLASSCODE]);
		this.setContralValue(this.isCriminal,obj[ceInfo][MisPersonCEInfo.ISCRIMINAL]);
		this.setContralValue(this.criminalRecord,obj[ceInfo][MisPersonCEInfo.CRIMINALRECORD]);
		this.setContralValue(this.caseClassCode1,obj[ceInfo][MisPersonCEInfo.CASECLASSCODE1]);
		this.setContralValue(this.caseClassCode2,obj[ceInfo][MisPersonCEInfo.CASECLASSCODE2]);
		this.setContralValue(this.caseClassCode3,obj[ceInfo][MisPersonCEInfo.CASECLASSCODE3]);
	}
	else
	{
		for(var i=0;i<ceInfoA.length;i++)
		{
			var contral=ceInfoA[i];
			var id=contral.getId();
		    this.srcCardObj[id]="";
			contral.setText("");
		}
	}
	//EnrollInfo
	if(obj[EnrollInfo]!=null)
	{
		this.setContralValue(this.iniEnrollType,obj[EnrollInfo][MisPersonEnrollInfo.INIENROLLTYPE]);
		this.setContralValue(this.iniEnrollTime,obj[EnrollInfo][MisPersonEnrollInfo.INIENROLLTIME]);
		this.setContralValue(this.iniEnrollUser,obj[EnrollInfo][MisPersonEnrollInfo.INIENROLLUSER]);
		this.setContralValue(this.iniEnrollUnitCode,obj[EnrollInfo][MisPersonEnrollInfo.INIENROLLUNITCODE]);
	}
	else
	{
		//id
	}
	this.setTableData(obj);
}

TPCardEditPage.prototype.setContralValue =function(field,value)
{
	var id = field.getId();
	this.srcCardObj[id] = value;
	if( value != null && value != 'null' && value!= "")
	{
		field.setValue(value);
	}
}

TPCardEditPage.prototype.update = function()
{
	if(this.updateField == null)return;

	var mainInfo	= "mainInfo";
	var tpCardInfo	= "tpCardInfo";
	var basicInfo	= "basicInfo";
	var bodyInfo	= "bodyInfo";
	var ceInfo		= "ceInfo";
	var EnrollInfo = "EnrollInfo";

	var mainInfoA = this.crolArray[mainInfo];
	var field = this.updateField//[TableName.MIS_PERSON];
	for(var i=0;i<mainInfoA.length;i++)
	{
		var contral=mainInfoA[i];
		var id=contral.getId();
		var b = WebArrayUtil.containsToIgnoreCase(field,id);
		if(!b)contral.setEditable(false);
	}

	var tpCardInfoA= this.crolArray[tpCardInfo];
	field = this.updateField//[TableName.TP_CARD_INFO];
	for(var i=0;i<tpCardInfoA.length;i++)
	{
		var contral = tpCardInfoA[i];
		var id = contral.getId();
	    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	    if(!b)contral.setEditable(false);
	}

	var basicInfoA = this.crolArray[basicInfo];

	field = this.updateField//[TableName.MIS_PERSON_BASIC_INFO];
	for(var i=0;i<basicInfoA.length;i++)
	{
		var contral = basicInfoA[i];
		var id = contral.getId();
	    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	    if(!forbidden) contral.setEditable(false);
	}

	var bodyInfoA= this.crolArray[bodyInfo];
	field = this.updateField//[TableName.MIS_PERSON_BODY_INFO];
	for(var i=0;i<bodyInfoA.length;i++)
	{
		var contral = bodyInfoA[i];
		var id = contral.getId();
	    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	    if(!forbidden) contral.setEditable(false);
	}

	var ceInfoA= this.crolArray[ceInfo];
	field = this.updateField//[TableName.MIS_PERSON_CE_INFO];
	for(var i=0;i<ceInfoA.length;i++)
	{
		var contral=ceInfoA[i];
		var id=contral.getId();
	    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	    if(!forbidden) contral.setEditable(false);
	}
}

TPCardEditPage.prototype.initTableButton = function()
{
	WebUI.createLinkButton("add_address",LinkButtonCfg.Add,addAddressBox);
	WebUI.createLinkButton("del_address",LinkButtonCfg.Del,delAddr);
	WebUI.createLinkButton("edit_address",LinkButtonCfg.Editor,editAddressBox);

	WebUI.createLinkButton("add_number",LinkButtonCfg.Add,addNumberBox);
	WebUI.createLinkButton("del_number",LinkButtonCfg.Del,delNumber);
	WebUI.createLinkButton("edit_number",LinkButtonCfg.Editor,editNumberBox);

	WebUI.createLinkButton("add_phone",LinkButtonCfg.Add,addPhoneBox);
	WebUI.createLinkButton("del_phone",LinkButtonCfg.Del,delPhone);
	WebUI.createLinkButton("edit_phone",LinkButtonCfg.Editor,editPhoneBox);

	WebUI.createLinkButton("add_crt",LinkButtonCfg.Add,addCrtBox);
	WebUI.createLinkButton("del_crt",LinkButtonCfg.Del,delCrt);
	WebUI.createLinkButton("edit_crt",LinkButtonCfg.Editor,editCrtBox);

	var nThis = this;
	function addAddressBox()
	{
		nThis.addAddressBox();
	}
	function editAddressBox()
	{
		nThis.editAddressBox();
	}
	function addNumberBox()
	{
		nThis.addNumberBox();
	}
	function editNumberBox()
	{
		nThis.editNumberBox();
	}
	function addPhoneBox()
	{
		nThis.addPhoneBox();
	}
	function editPhoneBox()
	{
		nThis.editPhoneBox();
	}
	function addCrtBox()
	{
		nThis.addCrtBox();
	}
	function editCrtBox()
	{
		nThis.editCrtBox();
	}
	function delAddr()
	{
		nThis.delAddress();
	}
	function delNumber()
	{
		nThis.delNumber();
	}
	function delPhone()
	{
		nThis.delPhone();
	}
	function delCrt()
	{
		nThis.delCrt();
	}
}
/**
 * 以下的增加，删除，修改操作结果，只是在页面上显示，不对库中的数据进行操作。
 * 最终的返回的tpcardobject会保存着所做的修改，统一保存。
 */
TPCardEditPage.prototype.addAddressBox = function()
{
	boxInputClear();
	if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true){
        this.dialogWindow=$.dialog({
            title		: AbisMessageResource["AddAddressInfo"],
            content		: document.getElementById('addaddress'),
            okValue		: AbisMessageResource['Add'],
            cancelValue	: AbisMessageResource['Cancel'],
            ok			: function () {
                return addAddress(0);
            },
            cancel		: function () {
            }
        });
        var nthis = this;
        function addAddress(type)
        {
            return nthis.addAddress(type);
        }
	}
}
/**
 * type 表示 是增加还是更新 0增加 1更新
 */
TPCardEditPage.prototype.addAddress = function(type)
{
	addressType.cancelErrorTip();
	addressCode.cancelErrorTip();

	var addrType = addressType.getCode();
	var addrCode = addressCode.getCode();

	if(!addressType.validateValue() || !addressType.validateRequried()) {
		return false;
	}
	if(!addressCode.validateValue() || !addressCode.validateRequried()) {
		return false;
	}
	if(!addressDetail.validateValue() || !addressDetail.validateRequried()) {
		return false;
	}
	if(!addressZipCode.validateValue() || !addressZipCode.validateRequried()) {
		return false;
	}
	var table = addrtableMgr.getTable();
	var array =
	{
		data:
		{
			ADDRESS_TYPE	: addressType.getCode() + WebTable.splitChar + addressType.getText(),
			ADDRESS_CODE	: addressCode.getCode(),
			//getValue获取填写信息  getText获取所有信息
			ADDRESS_DETAIL	: addressDetail.getText(),
			ADDRESS_ZIP_CODE: addressZipCode.getText()
		}
	}
	if(type == 0)
	{
		var errorMsg =this.validateTableData(addrtableMgr,"ADDRESS_TYPE",addrType);
		if(errorMsg){
			DialogUtil.openSimpleDialogForOcx(errorMsg+"，"+AbisMessageResource.AlreadyExistReEnter)
			return false;
		}
		table.addRow(array);
	}
	else
	{
		//ID删除 不再需要 赋值 2016年12月16日
		//array.data['ID']=table.getSelectItems()[0]['ID'];
		table.deleteSelectRow();
		table.addRow(array);
	}
	this.changeField['address'] = true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
	return true;
}
//js分页  缓存数据 delete  （需要再维护一个   addrtableMgr.getData）
//未使用
TPCardEditPage.prototype.delAddressByJs = function()
{
	var table=addrtableMgr.getTable();
	var data=table.getSelectItems();
	this.delAddrList.push(data[0]['ID']);

	//js分页  缓存数据 delete
	if(typeof(addrtableMgr.getData()) != "undefined" && addrtableMgr.getData() != ''&&typeof(data) != "undefined"){
		var addrData = addrtableMgr.getData();
		var i = (addrtableMgr.curPage-1)*addrtableMgr.pageSize + table.getSelectIndex();
		if(typeof(addrData[i]) != "undefined" && addrData[i]!= ''){
			//置空 不完全删除 数组length不变
			//delete addrData[i];
			//完全移除
			addrData.splice(i,1);
		}
		addrtableMgr.reFresh(addrData);
	}
	//js分页缓存数据 delete  end

	this.changeField['address']=true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
}
TPCardEditPage.prototype.delAddress = function()
{
	var table=addrtableMgr.getTable();
	var data=table.getSelectItems();
	this.delAddrList.push(data[0]['ID']);
	table.deleteSelectRow();
	this.changeField['address']=true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
}
TPCardEditPage.prototype.editAddressBox = function()
{
	if(setAddress())
	{
        if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
            this.dialogWindow = $.dialog({
                title: AbisMessageResource["EditAddressInfo"],
                initialize: function () {
                    setAddress();
                },
                content: document.getElementById('addaddress'),
                okValue: AbisMessageResource['Update'],
                cancelValue: AbisMessageResource['Cancel'],
                ok: function () {
                    return addAddress(1)
                },
                cancel: function () {
                    boxInputClear();
                }
            });
        }
	}
	else
	{
		alert(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
	}
	var nthis = this;
	function addAddress(type)
	{
		return nthis.addAddress(type);
	}
}

function setAddress()
{
	var table=addrtableMgr.getTable();
	var data=table.getSelectItems();
	if(WebUtil.isEmpty(data))				return false;
	addressDetail.setText(data[0]['ADDRESS_DETAIL']);
	addressZipCode.setText(data[0]['ADDRESS_ZIP_CODE']);
	addressCode.setComboCode(data[0]['ADDRESS_CODE']);
	addressType.setComboCode(data[0]['ADDRESS_TYPE']);
	return true;

}

TPCardEditPage.prototype.addNumberBox = function()
{
	boxInputClear();
    if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
        this.dialogWindow =
            $.dialog({
                title: AbisMessageResource["AddNumInfo"],
                content: document.getElementById('addnumber'),
                okValue: AbisMessageResource['Add'],
                cancelValue: AbisMessageResource['Cancel'],
                ok: function () {
                    return addNumber(0);
                },
                cancel: function () {
                }
            });
    }
	var nthis=this;
	function addNumber(type)
	{
		return nthis.addNumber(type);
	}
}
TPCardEditPage.prototype.addNumber=function(type)
{
	commType.cancelErrorTip();
	commNum.cancelErrorTip();

	var cType 	= commType.getCode();
	var cNum 	= commNum.getText();
	if(!commType.validateValue() || !commType.validateRequried()) {
		return false;
	}
	if(!commNum.validateValue() || !commNum.validateRequried()) {
		return false;
	}
	if(!loginPass.validateValue() || !loginPass.validateRequried()) {
		return false;
	}
	var table=commtableMgr.getTable();
	var array=
	{
			data:
			{
				COMM_TYPE	: commType.getCode()+WebTable.splitChar+commType.getText(),
				COMM_NUM	: commNum.getText(),
				LOGIN_PASS	: loginPass.getText()
			}
	}
	if(type==0)
	{
		var errorMsg =this.validateTableData(commtableMgr,"COMM_TYPE",cType);
		if(errorMsg){
			DialogUtil.openSimpleDialogForOcx(errorMsg+AbisMessageResource.AlreadyExistReEnter)
			return false;
		}
		table.addRow(array);
	}
	else
	{
		//array.data['ID']=table.getSelectItems()[0]['ID'];
		table.deleteSelectRow();
		table.addRow(array);
	}
	this.changeField['number'] = true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
	return true;
}

TPCardEditPage.prototype.delNumber = function()
{
	var table=commtableMgr.getTable();
	var data=table.getSelectItems();
	this.delCommList.push(data[0]['ID']);

    table.deleteSelectRow();
	this.changeField['number']=true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
}
TPCardEditPage.prototype.editNumberBox = function()
{
	if(setNumber())
	{
        if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
            this.dialogWindow =
                $.dialog({
                    title: AbisMessageResource["EditNumInfo"],
                    initialize: function () {
                        setNumber();
                    },
                    content: document.getElementById('addnumber'),
                    okValue: AbisMessageResource['Update'],
                    cancelValue: AbisMessageResource['Cancel'],
                    ok: function () {
                        return addNumber(1);
                    },
                    cancel: function () {
                    }
                });
        }
	}
	else
	{
		alert(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
	}
	var nthis = this;
	function addNumber(type)
	{
		return nthis.addNumber(type);
	}
}
function setNumber()
{
	var table=commtableMgr.getTable();
	var data=table.getSelectItems();
	if(WebUtil.isEmpty(data))
		return false;
	commType.setComboCode(data[0]['COMM_TYPE']);
	commNum.setText(data[0]['COMM_NUM']);
	loginPass.setText(data[0]['LOGIN_PASS']);

	return true;
}
TPCardEditPage.prototype.addPhoneBox = function()
{
	boxInputClear();
    if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
        this.dialogWindow =
            $.dialog({
                title: AbisMessageResource["AddPhoneInfo"],
                content: document.getElementById('addphone'),
                okValue: AbisMessageResource['Add'],
                cancelValue: AbisMessageResource['Cancel'],
                ok: function () {
                    return addPhone(0);
                },
                cancel: function () {
                }
            });
    }
	var nthis = this;
	function addPhone(type)
	{
		return nthis.addPhone(type);
	}
}
TPCardEditPage.prototype.addPhone = function(type)
{
	phoneNumType.cancelErrorTip();
	phoneNum.cancelErrorTip();

	var numType = phoneNumType.getCode();
	var num 	= phoneNum.getText();

	if(!phoneNum.validateValue() || !phoneNum.validateRequried()) {
		return false;
	}
	if(!phoneNumType.validateValue() || !phoneNumType.validateRequried()) {
		return false;
	}
	var table=phonetableMgr.getTable();
	var array=
	{
			data:
			{
				PHONE_NUM		: phoneNum.getText(),
				PHONE_NUM_TYPE	: phoneNumType.getCode()+WebTable.splitChar+phoneNumType.getText()
			}
	}
	if(type==0)
	{
		var errorMsg =this.validateTableData(phonetableMgr,"PHONE_NUM_TYPE",numType);
		if(errorMsg){
			DialogUtil.openSimpleDialogForOcx(errorMsg+AbisMessageResource.AlreadyExistReEnter)
			return false;
		}
		table.addRow(array);
	}
	else
	{
		//array.data['ID']=table.getSelectItems()[0]['ID'];
		table.deleteSelectRow();
		table.addRow(array);
	}
	this.changeField['phone'] = true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
	return true;
}

TPCardEditPage.prototype.delPhone = function()
{
	var table=phonetableMgr.getTable();
	var data=table.getSelectItems();
	this.delPhoneList.push(data[0]['ID']);
	table.deleteSelectRow();
	this.changeField['phone']=true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
}
TPCardEditPage.prototype.editPhoneBox = function()
{
	if(setPhone())
	{
        if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
            this.dialogWindow =
                $.dialog({
                    title: AbisMessageResource["EditPhoneInfo"],
                    initialize: function () {
                        setPhone();
                    },
                    content: document.getElementById('addphone'),
                    okValue: AbisMessageResource['Update'],
                    cancelValue: AbisMessageResource['Cancel'],
                    ok: function () {
                        return addPhone(1);
                    },
                    cancel: function () {
                    }
                });
        }
	}
	else
	{
		alert(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
	}
	var nthis=this;
	function addPhone(type)
	{
		return nthis.addPhone(type);
	}
}
function setPhone()
{
	var table 	= phonetableMgr.getTable();
	var data 	= table.getSelectItems();
	if(WebUtil.isEmpty(data))
	{
		return false;
	}
	phoneNumType.setComboCode(data[0]['PHONE_NUM_TYPE']);
	phoneNum.setText(data[0]['PHONE_NUM']);

	return true;
}
TPCardEditPage.prototype.addCrtBox = function()
{
	boxInputClear();
    if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
        this.dialogWindow =
            $.dialog({
                title: AbisMessageResource["AddCertificateInfo"],
                content: document.getElementById('addcrt'),
                okValue: AbisMessageResource['Add'],
                cancelValue: AbisMessageResource['Cancel'],
                ok: function () {
                    return addCrt(0);
                },
                cancel: function () {
                }
            });
    }
	var nthis = this;
	function addCrt(type)
	{
		return nthis.addCrt(type);
	}
}
TPCardEditPage.prototype.addCrt=function(type)
{
	var ctType 	= certType.getCode();
	var ctNum 	= certNum.getText();

	certType.cancelErrorTip();
	certNum.cancelErrorTip();

	if(!certType.validateValue() || !certType.validateRequried()) {
		return false;
	}
	if(!certNum.validateValue() || !certNum.validateRequried()) {
		return false;
	}
	if(!startDate.validateValue() || !startDate.validateRequried()) {
		return false;
	}
	if(!expireDate.validateValue() || !expireDate.validateRequried()) {
		return false;
	}
	if(!issueBy.validateValue() || !issueBy.validateRequried()) {
		return false;
	}
	if(!issueDate.validateValue() || !issueDate.validateRequried()) {
		return false;
	}
	var table = certtableMgr.getTable();
	var array=
	{
			data:
			{
				CERT_TYPE	: certType.getCode()+WebTable.splitChar+certType.getText(),
				CERT_NUM	: certNum.getText(),
				START_DATE	: startDate.getText(),
				EXPIRE_DATE	: expireDate.getText(),
				ISSUE_BY	: issueBy.getText(),
				ISSUE_DATE	: issueDate.getText()
			}
	}
	if(type==0){
		var errorMsg =this.validateTableData(certtableMgr,"PHONE_NUM_TYPE",ctType);
		if(errorMsg){
			DialogUtil.openSimpleDialogForOcx(errorMsg+AbisMessageResource.AlreadyExistReEnter)
			return false;
		}
	}
	if(type==1)
	{
		//array.data['ID']=table.getSelectItems()[0]['ID'];
		table.deleteSelectRow();
	}
	table.addRow(array);
	this.changeField['crt']=true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
	return true;
}

TPCardEditPage.prototype.delCrt = function()
{
	var table=certtableMgr.getTable();
	var data=table.getSelectItems();
	this.delCertList.push(data[0]['ID']);
	table.deleteSelectRow();
	this.changeField['crt']=true;
	if(WebUtil.isFunction(this.changeListener))
	{
		this.changeListener();
	}
}

TPCardEditPage.prototype.editCrtBox = function()
{
	if(setCrt())
	{
        if(WebUtil.isEmpty(this.dialogWindow)||this.dialogWindow.closed===true) {
            this.dialogWindow =
                $.dialog({
                    title: AbisMessageResource["EditCertificateInfo"],
                    initialize: function () {
                        setCrt();
                    },
                    content: document.getElementById('addcrt'),
                    okValue: AbisMessageResource['Update'],
                    cancelValue: AbisMessageResource['Cancel'],
                    ok: function () {
                        return addCrt(1);
                    },
                    cancel: function () {
                    }
                });
        }
	}
	else
	{
		alert(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
	}
	var nthis = this;
	function addCrt(type)
	{
		return nthis.addCrt(type);
	}
}

TPCardEditPage.prototype.setPersonNum = function(personNum)
{
	this.personNum.setValue(personNum);
}

TPCardEditPage.prototype.setCardNum = function(cardNum)
{
	this.cardNum.setValue(cardNum);
}

TPCardEditPage.prototype.setDBText = function(text)
{
	dbid.setValue(text, false);
}

TPCardEditPage.prototype.setDbid = function(dbid)
{
	if(this.loadDbInfo == true)
	{
		// 给控件设置
		this.dbid.setValue(dbid);
	}
	else
	{
		// 缓存
		this.dbid = dbid;
	}
}
/**
 * tableMgr 表格对象
 * col 列
 * value 值
 * 校验表格数据 比如某列不能重复  也许只会用到一列，先简单写 不考虑多列情况
 */
TPCardEditPage.prototype.validateTableData= function(tableMgr,col,value) {
	var result = null;
	if(WebUtil.isNull(tableMgr)) {
		return null;
	}
	if(WebUtil.isNull(tableMgr.getTable())) {
		return null;
	}
	if(WebUtil.isNull(tableMgr.getTable().getRowCount())) {
		return null;
	}
	if(WebUtil.isNull(col)||WebUtil.isNull(value)){
		return null;
	}
	var count = tableMgr.getTable().getRowCount();
	for(var i = 0; i < count; i++) {
		var resultData = {}
		var rowdata = tableMgr.getTable().getRowDataPlus(i);
		if(!WebUtil.isNull(rowdata[col])){
			if(rowdata[col]===value){
				if(!WebUtil.isNull(rowdata[col+"Text"])){
					result =rowdata[col+"Text"];
				}else{
					result =col;
				}
				break;
			}
		}
	}
	if(result!=null){
		result =tableMgr.getTable().input.headerText[col]+WebTable.splitChar+result;
	}
	return result;
}
function setCrt()
{
	var table=certtableMgr.getTable();
	var data=table.getSelectItems();
	if(WebUtil.isEmpty(data))				
		return false;
	certType.setComboCode(data[0]['CERT_TYPE']);
	certNum.setText(data[0]['CERT_NUM']);	
	issueBy.setText(data[0]['ISSUE_BY']);
	issueDate.setText(data[0]['ISSUE_DATE']);	
	startDate.setText(data[0]['START_DATE']);
	expireDate.setText(data[0]['EXPIRE_DATE']);
	return true;	
}


function boxInputClear()
{
	addressDetail.clear();
	addressZipCode.clear();
	addressCode.clear();
	addressType.clear();
	
	commNum.clear();
	loginPass.clear();
	commType.clear();

	phoneNum.clear();
	phoneNumType.clear();
	
	certNum.clear();
	startDate.clear();
	expireDate.clear();	
	issueBy.clear();	
	issueDate.clear();	
	certType.clear();
}

function changeCardNum(){
	var pn = $('#PERSON_NUM').val();
	$('#CARD_NUM').val(pn.substring(1,pn.length));
}
//弃用，写在外面无法操作页面控件
function changeBirthDayAndSex(){
	var id = $('#SHENFEN_ID').val();
	if(id.length == 15){
		var secCode = id.charAt(id.length - 1);
		if(WebUtil.isNumber(secCode)){
			if(secCode%2 == 0){
				$('#SEX_CODEtextfieldtrue').val('女');
			}else{
				$('#SEX_CODEtextfieldtrue').val('男');
			}
			$('#BIRTH_DATE').val(id.substr(6,8));
		}
	}else if($('#SHENFEN_ID').val().length==18){
		var secCode = id.charAt(id.length - 2);
		if(WebUtil.isNumber(secCode)){
			if(secCode%2 == 0){
				$('#SEX_CODEtextfieldtrue').val('女');
			}else{
				$('#SEX_CODEtextfieldtrue').val('男');
			}
			$('#BIRTH_DATE').val(id.substr(6,8));
		}
	}
}