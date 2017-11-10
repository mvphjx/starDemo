/**
 * 北京众联云生信息技术有限公司
 * 版权所有(c) 2013-2015
 */



function TabInfo(requiredField,updateField,colLens,p)
{
    this.crolArray = new Array();
    //必填项
    this.requiredField = requiredField;
    //更新项
    //this.updateField = updateField;
    //this.colLens = colLens;
    //this.defValues=p.res;
    this.init();

    this.delMsg = p.delMsg;
    this.delAddrList 	= new Array();
    this.delCertList 	= new Array();
    this.delCommList 	= new Array();
    this.delPhoneList 	= new Array();
    //内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
    var pageparent = $("#AddRmtServerCfg").parent();
    pageparent.scroll(function()
        {
            $(".newMenu").css('display','none');
        }
    );
}
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

var textArray = new Array();
TabInfo.prototype.init = function()
{
    //必填项
    this.requiredMap = new Array();
    //更新项
    this.updateMap = new Array();
    this.changeField = {};
    // 卡片文本信息
    this.personNum	=WebUI.createText("mainInfo_personNum_tip","mainInfoPersonNumTip","WebTextField","",this.requiredField);
    this.personNum.setEditable(false);
    this.initMap(textArray,this.personNum);
    this.cardNum		=WebUI.createText("tpCardInfo_cardNum_tip","tpCardInfoCardNumTip","WebTextField","",this.requiredField);
    this.cardNum.setEditable(false);
    this.initMap(textArray,this.cardNum);
    /*this.dbId = WebUI.createCombo("mainInfoDbidTip","mainInfo_dbid_tip",null,null,false,false,"MIS_PERSON|DBID",null,this.requiredField);
     this.initMap(textArray,this.dbId);*/
    this.printDate	= WebUI.createDateText("tpCardInfo_printDate","tpCardInfoPrintDate","WebTextField","",this.requiredField);
    this.printDate.setEditable(false);
    this.PrintBy		=WebUI.createText("tpCardInfo_printBy_tip","tpCardInfoPrintByTip","WebTextField","",this.requiredField);
    this.PrintBy.setEditable(false);
    this.printUnitCode	=WebUI.createCombo("tpCardInfo_printUnitCode_tip","tpCardInfoPrintUnitCodeTip",null,"tpCardInfoPrintUnitNameTip",false,false,"TP_CARD_INFO|PRINT_UNIT_CODE",null,this.requiredField);
    this.printUnitCode.setEditable(false);
    this.printUnitName	=WebUI.createText("tpCardInfo_printUnitName_tip","tpCardInfoPrintUnitNameTip","WebTextField","",this.requiredField);
    this.printUnitName.setEditable(false);
    this.name	=WebUI.createText("basicInfo_name_tip","basicInfoNameTip","WebTextField","",this.requiredField);
    this.initMap(textArray,this.name);
    this.namePinyin	=WebUI.createText("basicInfo_namePinyin_tip","basicInfoNamePinyinTip","WebTextField","",this.requiredField);
    this.shenfenId	=WebUI.createText("basicInfo_shenfenId_tip","basicInfoShenfenIdTip","WebTextField","",this.requiredField);
    this.shenfenId.setErrorTip("basicInfo_shenfenId_txt");
    var shenfenIdparam={};
    shenfenIdparam.shenfenid=true;
    this.shenfenId.setValidateType(shenfenIdparam);
    this.birthDate	=WebUI.createDateText("basicInfo_birthDate_tip","basicInfoBirthDateTip","WebTextField","",this.requiredField);
    this.sexCode		=WebUI.createCombo("basicInfo_sexCode_tip","basicInfoSexCodeTip",null,null,true,true,"MIS_PERSON_TEXT_INFO|SEX_CODE",null,this.requiredField);
    this.minZu = WebUI.createCombo("basicInfo_minZu_tip","basicInfoMinZuTip",null,null,true,true,"MIS_PERSON_TEXT_INFO|MIN_ZU",null,this.requiredField);
    this.nation		=WebUI.createCombo("basicInfo_nation_tip","basicInfoNationTip",null,null,true,true,"MIS_PERSON_TEXT_INFO|NATION",null,this.requiredField);
    this.alias			=WebUI.createText("basicInfo_alias_tip","basicInfoAliasTip","WebTextField","",this.requiredField);
    this.caseNum			=WebUI.createText("ceInfo_caseNum_tip","ceInfoCaseNumTip","WebTextField","",this.requiredField);
    this.caseNum.setErrorTip("ceInfo_caseNum_txt");
    var caseNumparam={};
    caseNumparam.maxlength=32;
    this.caseNum.setValidateType(caseNumparam);
    this.personClassCode			=WebUI.createCombo("ceInfo_personClassCode_tip","ceInfoPersonClassCodeTip",null,null,true,true,"MIS_PERSON_TEXT_INFO|PERSON_CLASS_CODE",null,this.requiredField);
    this.isCriminal			=WebUI.createCombo("ceInfo_isCriminal_tip","ceInfoIsCriminalTip",null,null,true,true,"MIS_PERSON_TEXT_INFO|IS_CRIMINAL",null,this.requiredField);
    this.criminalRecord			=WebUI.createText("ceInfo_criminalRecord_tip","ceInfoCriminalRecordTip","WebTextField","",this.requiredField);
    this.caseClassCode1			=WebUI.createCombo("ceInfo_caseClassCode1_tip","ceInfoCaseClassCode1Tip",null,null,true,true,"MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_1",null,this.requiredField);
    this.caseClassCode2			=WebUI.createCombo("ceInfo_caseClassCode2_tip","ceInfoCaseClassCode2Tip",null,null,true,true,"MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_2",null,this.requiredField);
    this.caseClassCode3			=WebUI.createCombo("ceInfo_caseClassCode3_tip","ceInfoCaseClassCode3Tip",null,null,true,true,"MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_3",null,this.requiredField);
    this.comments			=WebUI.createMulText("basicInfo_comments_tip","basicInfoCommentsTip","WebTextArea_Auto","",this.requiredField);
    this.bodyHeight			=WebUI.createText("bodyInfo_bodyHeight_tip","bodyInfoBodyHeightTip","WebTextField","",this.requiredField);
    this.footLength			=WebUI.createText("bodyInfo_footLength_tip","bodyInfoFootLengthTip","WebTextField","",this.requiredField);
    this.bodyWeight			=WebUI.createText("bodyInfo_bodyWeight_tip","bodyInfoBodyWeightTip","WebTextField","",this.requiredField);
    this.bodyHeight.setErrorTip("bodyInfo_bodyHeight_txt");
    var bodyHeightparam={};
    bodyHeightparam.isdigital=true;
    bodyHeightparam.maxlength=3;
    bodyHeightparam.minlength=2;
    this.bodyHeight.setValidateType(bodyHeightparam);
    this.footLength.setErrorTip("bodyInfo_footLength_txt");
    var footLengthparam={};
    footLengthparam.isdigital=true;
    footLengthparam.maxlength=2;
    footLengthparam.minlength=2;
    this.footLength.setValidateType(footLengthparam);
    this.bodyWeight.setErrorTip("bodyInfo_bodyWeight_txt");
    var bodyWeightparam={};
    bodyWeightparam.isdigital=true;
    bodyWeightparam.maxlength=3;
    bodyWeightparam.minlength=2;
    this.bodyWeight.setValidateType(bodyWeightparam);
    //其他信息表格
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
    startDate		= WebUI.createDateText("webox_start_date","start_date","WebTextField","",null);
    expireDate		= WebUI.createDateText("webox_expire_date","expire_date","WebTextField","",null,{NoTimeLimit:true});
    issueBy			= WebUI.createText("webox_issue_by","issue_by","WebTextField","",null);
    issueBy.setValidateType({maxlength:40});
    issueBy.setErrorTip("webox_issue_by_tip");
    issueDate		= WebUI.createDateText("webox_issue_date","issue_date","WebTextField","",null);

    this.initComboData();
    this.setValidateColumns();
    this.initTable();
    //this.setDefValues(this.defValues);
    var _this = this;
    //根据身份证自动填写出生日期 性别；姓名填写拼音
    if(document.all){//ie8及以下
        $('#basicInfoShenfenIdTip')[0].attachEvent('onpropertychange',function(e) {
            if(e.propertyName!='value') return;
            setValueByShenfenId();
        });
        $('#basicInfoNameTip')[0].attachEvent('onpropertychange',function(e) {
            if(e.propertyName!='value') return;
            setValueByName();
        });
    }else{
        $(document).on('propertychange input', "#basicInfo_shenfenId_tip", function(event) {
            setValueByShenfenId();
        });
        $(document).on('propertychange input', "#basicInfo_name_tip", function(event) {
            setValueByName();
        });
    }
    var $setTime = null;
    function setValueByShenfenId(){
        $setTime && clearTimeout($setTime);
        $setTime = setTimeout(function() {
            var tip = $('#basicInfo_shenfenId_txt').html();
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
            var tip = $('#basicInfo_name_tip_txt').html();
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
TabInfo.prototype.initMap = function(map,contro)
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
TabInfo.prototype.register = function(contro)
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
TabInfo.prototype.isTxtInfoChanged = function()
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
TabInfo.prototype.validateRequired = function()
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
//给其他表格添加表头数据
TabInfo.prototype.setTableData = function(objH,obj) {
    var commJson = "commInfos";
    var phoneJson = "phoneInfos";
    var certJson = "certInfos";
    var addrJson = "addrInfos";
    //表头信息
    var hcommJson = "commJson";
    var hphoneJson = "phoneJson";
    var hcertJson = "certJson";
    var haddrJson = "addrJson";
    if (!WebUtil.isEmpty(obj[addrJson])){
        addrtableMgr.setInput(eval('('+obj[addrJson]+')'));
    }else{
        addrtableMgr.setInput(eval('('+objH[haddrJson]+')'));
    }
    if (!WebUtil.isEmpty(obj[commJson])){
        commtableMgr.setInput(eval('('+obj[commJson]+')'));
    }else{
        commtableMgr.setInput(eval('('+objH[hcommJson]+')'));
    }
    if (!WebUtil.isEmpty(obj[phoneJson])){
        phonetableMgr.setInput(eval('('+obj[phoneJson]+')'));
    }else{
        phonetableMgr.setInput(eval('('+objH[hphoneJson]+')'));
    }
    if(!WebUtil.isEmpty(obj[certJson])){
        certtableMgr.setInput(eval('('+obj[certJson]+')'));
    }else{
        certtableMgr.setInput(eval('('+objH[hcertJson]+')'));
    }

}
//给其他信息添加数据
TabInfo.prototype.setTextData = function(obj)
{
    if(obj == null)return;
    var basicJson="basicInfo";
    var bodyJson="bodyInfo";
    var ceJson="ceInfo";
    var tpcardJson="tpcard";
    var basicInfo=obj[basicJson];
    var bodyInfo=obj[bodyJson];
    var ceInfo=obj[ceJson];
    var tpcardInfo=obj[tpcardJson];
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.name)) {
        this.name.setValue(basicInfo.name);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.namePinyin)) {
        this.namePinyin.setValue(basicInfo.namePinyin);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.shenfenId)) {
        this.shenfenId.setValue(basicInfo.shenfenId);
    }
    //$("#basicInfoShenfenIdTip").attr("maxlength",18);
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.birthDate)) {
        this.birthDate.setValue(basicInfo.birthDate);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.sexCode)) {
        this.sexCode.setValue(basicInfo.sexCode);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.minZu)) {
        this.minZu.setValue(basicInfo.minZu);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.nation)) {
        this.nation.setValue(basicInfo.nation);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.alias)) {
        this.alias.setValue(basicInfo.alias);
    }
    if(basicInfo!=null&&!WebUtil.isEmpty(basicInfo.comments)) {
        this.comments.setValue(basicInfo.comments);
    }

    if(tpcardInfo!=null&&!WebUtil.isEmpty(tpcardInfo.cardNum)) {
        this.cardNum.setValue(tpcardInfo.cardNum);
    }
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.caseNum)) {
        //案件号
        this.caseNum.setValue(ceInfo.caseNum);
    }
    //$("#ceInfoCaseNumTip").attr("maxlength",25);
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.personClassCode)) {
        this.personClassCode.setValue(ceInfo.personClassCode);
    }
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.isCriminal)) {
        this.isCriminal.setValue(ceInfo.isCriminal);
    }
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.criminalRecord)) {
        this.criminalRecord.setValue(ceInfo.criminalRecord);
    }
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.caseClassCode1)) {
        this.caseClassCode1.setValue(ceInfo.caseClassCode1);
    }
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.caseClassCode2)) {
        this.caseClassCode2.setValue(ceInfo.caseClassCode2);
    }
    if(ceInfo!=null&&!WebUtil.isEmpty(ceInfo.caseClassCode3)) {
        this.caseClassCode3.setValue(ceInfo.caseClassCode3);
    }

    if(!WebUtil.isEmpty(bodyInfo)) {
        //其他信息
        this.bodyHeight.setValue(bodyInfo.bodyHeight);
        this.bodyWeight.setValue(bodyInfo.bodyWeight);
        this.footLength.setValue(bodyInfo.footLength);
        /*$("#bodyInfoBodyHeightTip").attr("maxlength",3);
        $("#bodyInfoFootLengthTip").attr("maxlength",3);
        $("#bodyInfoBodyWeightTip").attr("maxlength",3);*/
    }

}
/**
 * 注册文本改变事件
 * @param {Object} listener
 */
TabInfo.prototype.registerChangeListener = function(listener)
{
    this.changeListener = listener;
}
TabInfo.prototype.initComboData=function()
{
    var columnnames = ['MIS_PERSON|DBID','TP_CARD_INFO|PRINT_UNIT_CODE','MIS_PERSON_TEXT_INFO|SEX_CODE','MIS_PERSON_TEXT_INFO|MIN_ZU'
        ,'MIS_PERSON_TEXT_INFO|NATION','MIS_PERSON_TEXT_INFO|IS_CRIMINAL','MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_1','MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_2'
        ,'MIS_PERSON_TEXT_INFO|CASE_CLASS_CODE_3','MIS_PERSON_TEXT_INFO|PERSON_CLASS_CODE','MIS_PERSON_TEXT_INFO|ADDRESS_TYPE'
        ,'MIS_PERSON_TEXT_INFO|ADDRESS_CODE','MIS_PERSON_TEXT_INFO|PHONE_NUM_TYPE','MIS_PERSON_TEXT_INFO|COMM_TYPE','MIS_PERSON_TEXT_INFO|CERT_TYPE'];
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
        nthis.getComboData(data);
    }
}
var addressTypeList;
var phoneNumTypeList;
var commTypeList;
var certTypeList;
//初始化 控件
TabInfo.prototype.getComboData=function(data)
{
    data = eval('(' + data + ')');
    //this.dbId.setComboData(data['mis_person|dbid']);
    this.printUnitCode.setComboData(data['tp_card_info|print_unit_code']);
    this.sexCode.setComboData(data['mis_person_text_info|sex_code']);
    this.minZu.setComboData(data['mis_person_text_info|min_zu']);
    this.nation.setComboData(data['mis_person_text_info|nation']);
    this.isCriminal.setComboData(data['mis_person_text_info|is_criminal']);
    this.personClassCode.setComboData(data['mis_person_text_info|person_class_code']);
    this.caseClassCode1.setComboData(data['mis_person_text_info|case_class_code_1']);
    this.caseClassCode2.setComboData(data['mis_person_text_info|case_class_code_2']);
    this.caseClassCode3.setComboData(data['mis_person_text_info|case_class_code_3']);
    //地址表格数据
    addressType.setComboData(data['mis_person_text_info|address_type']);
    addressTypeList = data['mis_person_text_info|address_type'];
    addressCode.setComboData(data['mis_person_text_info|address_code']);
    //电话表格数据
    phoneNumType.setComboData(data['mis_person_text_info|phone_num_type']);
    phoneNumTypeList = data['mis_person_text_info|phone_num_type'];
    //号码表格数据
    commType.setComboData(data['mis_person_text_info|comm_type']);
    commTypeList = data['mis_person_text_info|comm_type'];
    //证件表格数据
    certType.setComboData(data['mis_person_text_info|cert_type']);
    certTypeList = data['mis_person_text_info|cert_type'];
}
TabInfo.prototype.update = function(field)
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
TabInfo.prototype.setQryrmtVal = function(val)
{
    this.qry_rmt.setText(val);
}
TabInfo.prototype.setQrylocalVal = function(val)
{
    this.qry_local.setText(val);
}
/**  验证文本  */
TabInfo.prototype.setValidateColumns = function()
{
    if(this.colLens != null)
    {
        var srcCaseId = {};
        srcCaseId.maxlength = this.colLens["RMT_SERVER"][LLHitlogMainCol.SRC_CASE_ID];
        this.srcCaseId.setValidateType(srcCaseId);

    }
}
TabInfo.prototype.initTable=function()
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
TabInfo.prototype.initTableButton = function()
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
TabInfo.prototype.addAddressBox = function()
{
    boxInputClear();
    $.dialog({
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
    //$("#SingleLayer").hide();
    $("div[role='dialog']").draggable&&$("div[role='dialog']").draggable();
    var nthis = this;
    function addAddress(type)
    {
        return nthis.addAddress(type);
    }
}
TabInfo.prototype.editAddressBox = function()
{
    if(setAddress())
    {
        $.dialog({
            title: AbisMessageResource["EditAddressInfo"],
            initialize: function () {
                setAddress();
            },
            content		: document.getElementById('addaddress'),
            okValue		: AbisMessageResource['Update'],
            cancelValue	: AbisMessageResource['Cancel'],
            ok			: function () {return addAddress(1)},
            cancel		: function () {}
        });
    }
    else
    {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
    }
    var nthis = this;
    function addAddress(type)
    {
        return nthis.addAddress(type);
    }
}
TabInfo.prototype.delAddress = function()
{
    var table=addrtableMgr.getTable();
    var data=table.getSelectItems();
    if(!WebUtil.isEmpty(data)){
        this.delAddrList.push(data[0]['ID']);
        table.deleteSelectRow();
        this.changeField['address']=true;
        if(WebUtil.isFunction(this.changeListener))
        {
            this.changeListener();
        }
    }else {
        DialogUtil.openSimpleDialogForOcx(this.delMsg);
        //alert(this.delMsg)
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
    //addressType.setComboCode(data[0]['ADDRESS_TYPE']);
    addressType.setValue(toAddressType(data[0]['ADDRESS_TYPE']))
    return true;

}
/**
 * type 表示 是增加还是更新 0增加 1更新
 */
TabInfo.prototype.addAddress = function(type)
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
/**
 * tableMgr 表格对象
 * col 列
 * value 值
 * 校验表格数据 比如某列不能重复  也许只会用到一列，先简单写 不考虑多列情况
 */
TabInfo.prototype.validateTableData= function(tableMgr,col,value) {
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
//电话信息
TabInfo.prototype.addPhoneBox = function()
{
    boxInputClear();
    $.dialog({
        title		: AbisMessageResource["AddPhoneInfo"],
        content		: document.getElementById('addphone'),
        okValue		: AbisMessageResource['Add'],
        cancelValue	: AbisMessageResource['Cancel'],
        ok			: function () {return addPhone(0);},
        cancel		: function () {}
    });
    var nthis = this;
    function addPhone(type)
    {
        return nthis.addPhone(type);
    }
}
TabInfo.prototype.addPhone = function(type)
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

TabInfo.prototype.delPhone = function()
{
    var table=phonetableMgr.getTable();
    var data=table.getSelectItems();
    if(!WebUtil.isEmpty(data)) {
        this.delPhoneList.push(data[0]['ID']);
        table.deleteSelectRow();
        this.changeField['phone'] = true;
        if (WebUtil.isFunction(this.changeListener)) {
            this.changeListener();
        }
    }else {
        DialogUtil.openSimpleDialogForOcx(this.delMsg);
        //alert(this.delMsg);
    }
}
TabInfo.prototype.editPhoneBox = function()
{
    if(setPhone())
    {
        $.dialog({
            title: AbisMessageResource["EditPhoneInfo"],
            initialize: function () {
                setPhone();
            },
            content		: document.getElementById('addphone'),
            okValue		: AbisMessageResource['Update'],
            cancelValue	: AbisMessageResource['Cancel'],
            ok			: function () {return addPhone(1);},
            cancel		: function () {
            }
        });
    }
    else
    {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
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
    phoneNumType.setValue(toPhoneNumType(data[0]['PHONE_NUM_TYPE']));
    phoneNum.setText(data[0]['PHONE_NUM']);
    return true;
}
//号码信息操作
TabInfo.prototype.addNumberBox = function()
{
    boxInputClear();
    $.dialog({
        title		: AbisMessageResource["AddNumInfo"],
        content		: document.getElementById('addnumber'),
        okValue		: AbisMessageResource['Add'],
        cancelValue	: AbisMessageResource['Cancel'],
        ok			: function () {return addNumber(0);},
        cancel		: function () {}
    });
    var nthis=this;
    function addNumber(type)
    {
        return nthis.addNumber(type);
    }
}
TabInfo.prototype.addNumber=function(type)
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

TabInfo.prototype.delNumber = function()
{
    var table=commtableMgr.getTable();
    var data=table.getSelectItems();
    if(!WebUtil.isEmpty(data)){
        this.delCommList.push(data[0]['ID']);
        table.deleteSelectRow();
        this.changeField['number']=true;
        if(WebUtil.isFunction(this.changeListener))
        {
            this.changeListener();
        }
    }else{
        DialogUtil.openSimpleDialogForOcx(this.delMsg);
        //alert(this.delMsg)
    }
}
TabInfo.prototype.editNumberBox = function()
{
    if(setNumber())
    {
        $.dialog({
            title		: AbisMessageResource["EditNumInfo"],
            initialize	: function () {
                setNumber();
            },
            content		: document.getElementById('addnumber'),
            okValue		: AbisMessageResource['Update'],
            cancelValue	: AbisMessageResource['Cancel'],
            ok			: function () {return addNumber(1);},
            cancel		: function () {}
        });
    }
    else
    {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
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
    //commType.setComboCode(data[0]['COMM_TYPE']);
    commType.setValue(toCommType(data[0]['COMM_TYPE']))
    commNum.setText(data[0]['COMM_NUM']);
    loginPass.setText(data[0]['LOGIN_PASS']);
    return true;
}
//证件信息操作
TabInfo.prototype.addCrtBox = function()
{
    boxInputClear();
    $.dialog({
        title		: AbisMessageResource["AddCertificateInfo"],
        content		: document.getElementById('addcrt'),
        okValue		: AbisMessageResource['Add'],
        cancelValue	: AbisMessageResource['Cancel'],
        ok			: function () {return addCrt(0);},
        cancel		: function () {}
    });
    var nthis = this;
    function addCrt(type)
    {
        return nthis.addCrt(type);
    }
}
TabInfo.prototype.addCrt=function(type)
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

TabInfo.prototype.delCrt = function()
{
    var table=certtableMgr.getTable();
    var data=table.getSelectItems();
    if(!WebUtil.isEmpty(data)){
        this.delCertList.push(data[0]['ID']);
        table.deleteSelectRow();
        this.changeField['crt']=true;
        if(WebUtil.isFunction(this.changeListener))
        {
            this.changeListener();
        }
    }else{
        DialogUtil.openSimpleDialogForOcx(this.delMsg);
        //alert(this.delMsg)
    }
}

TabInfo.prototype.editCrtBox = function()
{
    if(setCrt())
    {
        $.dialog({
            title: AbisMessageResource["EditCertificateInfo"],
            initialize: function () {
                setCrt();
            },
            content		: document.getElementById('addcrt'),
            okValue		: AbisMessageResource['Update'],
            cancelValue	: AbisMessageResource['Cancel'],
            ok			: function () {return addCrt(1);},
            cancel		: function () {}
        });
    }
    else
    {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
    }
    var nthis = this;
    function addCrt(type)
    {
        return nthis.addCrt(type);
    }
}
function setCrt()
{
    var table=certtableMgr.getTable();
    var data=table.getSelectItems();
    if(WebUtil.isEmpty(data))
        return false;
    //certType.setComboCode(data[0]['CERT_TYPE']);
    certType.setValue(toCertType(data[0]['CERT_TYPE']))
    certNum.setText(data[0]['CERT_NUM']);
    issueBy.setText(data[0]['ISSUE_BY']);
    issueDate.setText(data[0]['ISSUE_DATE']);
    startDate.setText(data[0]['START_DATE']);
    expireDate.setText(data[0]['EXPIRE_DATE']);
    return true;
}
//设置表单控件的值
TabInfo.prototype.setDefValues= function(defValues)
{
    if(defValues == null)return;
    var defJson="person";
    var tpcardJson="tpcard";
    var defInfo=defValues[defJson];
    var tpcardInfo=defValues[tpcardJson];
    if(!WebUtil.isEmpty(defInfo)) {
        // 卡片文本信息
        this.personNum.setValue(defInfo.personNum);
    }
    if(!WebUtil.isEmpty(tpcardInfo)){
        this.cardNum.setValue(tpcardInfo.cardNum);
        this.printDate.setValue(tpcardInfo.printDate);
        this.PrintBy.setValue(tpcardInfo.printBy);
        this.printUnitCode.setValue(tpcardInfo.printUnitCode);
    }
}
//转换 true = 1 false = 0
TabInfo.prototype.formatBoolean = function (boolean){
    if(boolean="true"){
        return "1";
    }
    if(boolean="false"){
        return "0";
    }
    return boolean;
}

function comboListener(comboUni,comboReadonly,url,monitoredObj,param) {
    if (comboUni != "") {
        comboUni.addSelectionListener(
            function (id, value, txt) {
                if (typeof value == 'undefined') {
                    return;
                }
                var param = {};
                if (id == "OBJ_TYPE") {
                    param.objType = value;
                } else if (id == "EVENT_OBJECT_ID") {
                    param.eventObjId = value;
                } else if (id == "EVENT_OBJ_ID") {
                    param.eventObjId = value;
                }

                //清除选中框上的值
                $("#" + monitoredObj + "textfieldfalse").val("");
                //清除上一次操作下拉选的值
                $("#" + monitoredObj + "list").html("");
                comboReadonly.setEditable(true);
                $.ajax
                (
                    {
                        type: 'POST',
                        url: url,
                        data: param,
                        dataType: 'json',
                        success: function (data) {
                            comboReadonly.setData(eval('(' + data + ')'));
                        },
                        error: function (e) {
                            WebUtil.NoWait();
                        }
                    }
                );
            }
        );
    }
}
//封装填写信息
function getMainInfo() {
    var mainInfo = {};
    mainInfo.personNum = $("#mainInfoPersonNumTip").val();
    return mainInfo;
}
function getTPCardInfo() {
    var tpCardInfo = {};
    tpCardInfo.cardNum = $("#tpCardInfoCardNumTip").val();
    tpCardInfo.printDate = $("#tpCardInfoPrintDate").val();
    tpCardInfo.printBy = $("#tpCardInfoPrintByTip").val();
    tpCardInfo.printUnitCode = $("#tpCardInfoPrintUnitCodeTipcode").val();
    tpCardInfo.printUnitName = $("#tpCardInfoPrintUnitNameTip").val();
    return tpCardInfo;
}
function getTextInfo() {
    var textInfo = {};
    textInfo.name = $("#basicInfoNameTip").val();
    textInfo.namePinyin = $("#basicInfoNamePinyinTip").val();
    textInfo.shenfenId = $("#basicInfoShenfenIdTip").val();
    textInfo.birthDate = $("#basicInfoBirthDateTip").val();
    textInfo.sexCode = $("#basicInfoSexCodeTipcode").val();
    textInfo.minZu = $("#basicInfoMinZuTipcode").val();
    textInfo.nation = $("#basicInfoNationTipcode").val();
    textInfo.alias = $("#basicInfoAliasTip").val();
    textInfo.caseNum = $("#ceInfoCaseNumTip").val();
    textInfo.specificPersonClassCode = $("#ceInfoPersonClassCodeTipcode").val();
    textInfo.isCriminal = $("#ceInfoIsCriminalTipcode").val();
    textInfo.criminalRecord = $("#ceInfoCriminalRecordTip").val();
    textInfo.caseClassCode1 = $("#ceInfoCaseClassCode1Tipcode").val();
    textInfo.caseClassCode2 = $("#ceInfoCaseClassCode2Tipcode").val();
    textInfo.caseClassCode3 = $("#ceInfoCaseClassCode3Tipcode").val();
    textInfo.comments = $("#basicInfoCommentsTip").val();
    textInfo.bodyHeight = $("#bodyInfoBodyHeightTip").val();
    textInfo.footLength = $("#bodyInfoFootLengthTip").val();
    textInfo.bodyWeight = $("#bodyInfoBodyWeightTip").val();
    textInfo.addrInfo = getAddrInfo();
    textInfo.commInfo = getCommInfo();
    textInfo.phoneInfo = getPhoneInfo();
    textInfo.cretInfo = getCretInfo();
    return textInfo;
}
function getAddrInfo() {
    var addrInfo = {};
    var addrList = new Array();
    var table=addrtableMgr.getTable();
    var data=table.getAllItems();
    if(!WebUtil.isEmpty(data)){
        for(var i=0;i<data.length;i++)
        {
            var addr = {};
            addr.addressType = toAddressType(data[i].ADDRESS_TYPE);
            addr.addressCode = data[i].ADDRESS_CODE;
            addr.addressDetail = data[i].ADDRESS_DETAIL;
            addr.addressZipCode = data[i].ADDRESS_ZIP_CODE;
            addrList.push(addr);
        }
        //addrInfo = $.toJSON(addrList);
    }
    return addrList;

}
function toAddressType(addressType){
    var addType;
    for(var i=0;i<addressTypeList.length;i++)
    {
        if(addressTypeList[i].text==addressType){
            addType = addressTypeList[i].code;
            break;
        }
    }
    if(WebUtil.isEmpty(addType)) {
        addType = addressType;
    }
    return addType;
}
function getBodyInfo() {
    var bodyInfo = {};
    if(!WebUtil.isEmpty($("#bodyInfoBodyHeightTip").val())) {
        bodyInfo.bodyHeight = $("#bodyInfoBodyHeightTip").val();
    }
    if(!WebUtil.isEmpty($("#bodyInfoFootLengthTip").val())) {
        bodyInfo.footLength = $("#bodyInfoFootLengthTip").val();
    }
    if(!WebUtil.isEmpty($("#bodyInfoBodyWeightTip").val())) {
        bodyInfo.bodyWeight = $("#bodyInfoBodyWeightTip").val();
    }
    var bodyInfos = "";
    if(!WebUtil.isEmpty($("#ceInfoCaseClassCode1Tipcode").val())){
        bodyInfos = $.toJSON(bodyInfo);
    }
    return bodyInfo;
}
function getCaseInfo() {
    var caseInfo = {};
    if(!WebUtil.isEmpty($("#ceInfoCaseClassCode1Tipcode").val())) {
        caseInfo.caseClassCode1 = $("#ceInfoCaseClassCode1Tipcode").val();
    }
    if(!WebUtil.isEmpty($("#ceInfoCaseClassCode2Tipcode").val())) {
        caseInfo.caseClassCode2 = $("#ceInfoCaseClassCode2Tipcode").val();
    }
    if(!WebUtil.isEmpty($("#ceInfoCaseClassCode3Tipcode").val())) {
        caseInfo.caseClassCode3 = $("#ceInfoCaseClassCode3Tipcode").val();
    }
    if(!WebUtil.isEmpty($("#ceInfoIsCriminalTipcode").val())) {
        caseInfo.isCriminal = $("#ceInfoIsCriminalTipcode").val();
    }
    if(!WebUtil.isEmpty($("#ceInfoPersonClassCodeTipcode").val())) {
        caseInfo.personClassCode = $("#ceInfoPersonClassCodeTipcode").val();
    }
    if(!WebUtil.isEmpty($("#ceInfoCriminalRecordTip").val())) {
        caseInfo.criminalRecord = $("#ceInfoCriminalRecordTip").val();
    }
    if(!WebUtil.isEmpty($("#ceInfoCaseNumTip").val())) {
        caseInfo.caseNum = $("#ceInfoCaseNumTip").val();
    }
    var caseInfos = "";
    if(!WebUtil.isEmpty($("#ceInfoCaseClassCode1Tipcode").val())){
        caseInfos = $.toJSON(caseInfo);
    }
    return caseInfo;
}
function getCommInfo() {
    var commInfo = {};
    var commList = new Array();
    var table=commtableMgr.getTable();
    var data=table.getAllItems();
    if(!WebUtil.isEmpty(data)){
        for(var i=0;i<data.length;i++)
        {
            var comm = {};
            comm.commNum = data[i].COMM_NUM;
            comm.commType = toCommType(data[i].COMM_TYPE);
            comm.loginPass = data[i].LOGIN_PASS;
            commList.push(comm);
        }
        commInfo = $.toJSON(commList);
    }
    return commList;
}
function toCommType(commType){
    var commonTy ;
    for(var i=0;i<commTypeList.length;i++)
    {
        if(commTypeList[i].text==commType){
            commonTy = commTypeList[i].code;
            break;
        }
    }
    if(WebUtil.isEmpty(commonTy)) {
        commonTy = commType;
    }
    return commonTy;
}
function getPhoneInfo() {
    var phoneInfo = {};
    var phoneList = new Array();
    var table=phonetableMgr.getTable();
    var data=table.getAllItems();
    if(!WebUtil.isEmpty(data)){
        for(var i=0;i<data.length;i++)
        {
            var phone = {};
            phone.phoneNum = data[i].PHONE_NUM;
            phone.phoneNumType = toPhoneNumType(data[i].PHONE_NUM_TYPE);
            phoneList.push(phone);
        }
        phoneInfo = $.toJSON(phoneList);
    }
    return phoneList;
}
function toPhoneNumType(phoneNumType) {
    var phoneTy;
    for(var i=0;i<phoneNumTypeList.length;i++)
    {
        if(phoneNumTypeList[i].text==phoneNumType){
            phoneTy = phoneNumTypeList[i].code;
            break;
        }
    }
    if(WebUtil.isEmpty(phoneTy)) {
        phoneTy = phoneNumType;
    }
    return phoneTy;
}
function getCretInfo() {
    var cretInfo = {};
    var cretList = new Array();
    var table=certtableMgr.getTable();
    var data=table.getAllItems();
    if(!WebUtil.isEmpty(data)){
        for(var i=0;i<data.length;i++)
        {
            var cret = {};
            cret.certNum = data[i].CERT_NUM;
            cret.certType = toCertType(data[i].CERT_TYPE);
            cret.expireDate = data[i].EXPIRE_DATE;
            cret.issueBy = data[i].ISSUE_BY;
            cret.issueDate = data[i].ISSUE_DATE;
            cret.startDate = data[i].START_DATE;
            cretList.push(cret);
        }
        cretInfo = $.toJSON(cretList);
    }
    return cretList;
}
function toCertType(certType) {
    var certTy;
    for(var i=0;i<certTypeList.length;i++)
    {
        if(certTypeList[i].text==certType){
            certTy = certTypeList[i].code;
            break;
        }
    }
    if(WebUtil.isEmpty(certTy)) {
        certTy = certType;
    }
    return certTy;
}
function clearText() {
    $("#basicInfoNameTip").val("");
    $("#basicInfoNamePinyinTip").val("");
    $("#basicInfoShenfenIdTip").val("");
    $("#basicInfoBirthDateTip").val("");
    $("#basicInfoBirthDateTip").attr("realvalue","");
    $("#basicInfoSexCodeTiptextfieldtrue").val("");
    $("#basicInfoSexCodeTipcode").val("");
    $("#basicInfoMinZuTiptextfieldtrue").val("");
    $("#basicInfoMinZuTipcode").val("");
    $("#basicInfoNationTiptextfieldtrue").val("");
    $("#basicInfoNationTipcode").val("");
    $("#basicInfoAliasTip").val("");
    $("#ceInfo_caseNum_tip").val("");
    $("#ceInfoPersonClassCodeTiptextfieldtrue").val("");
    $("#ceInfoPersonClassCodeTipcode").val("");
    $("#ceInfoIsCriminalTiptextfieldtrue").val("");
    $("#ceInfoIsCriminalTipcode").val("");
    $("#ceInfoCriminalRecordTip").val("");
    $("#ceInfoCaseClassCode1Tiptextfieldtrue").val("");
    $("#ceInfoCaseClassCode1Tipcode").val("");
    $("#ceInfoCaseClassCode2Tiptextfieldtrue").val("");
    $("#ceInfoCaseClassCode2Tipcode").val("");
    $("#ceInfoCaseClassCode3Tiptextfieldtrue").val("");
    $("#ceInfoCaseClassCode3Tipcode").val("");
    $("#basicInfoCommentsTip").val("");
    $("#bodyInfoBodyHeightTip").val("");
    $("#bodyInfoFootLengthTip").val("");
    $("#bodyInfoBodyWeightTip").val("");
    $("#mainInfoPersonNumTip").val("");
    $("#tpCardInfoCardNumTip").val("");
    $("#tpCardInfoPrintDate").val("");
    $("#tpCardInfoPrintByTip").val("");
    $("#tpCardInfoPrintUnitCodeTiptextfieldfalse").val("");
    $("#tpCardInfoPrintUnitCodeTipcode").val("");
    $("#tpCardInfoPrintUnitNameTip").val("");
    $("#ceInfoCaseNumTip").val("");
    addrtableMgr.getTable().clear();
    commtableMgr.getTable().clear();
    certtableMgr.getTable().clear();
    phonetableMgr.getTable().clear();
}