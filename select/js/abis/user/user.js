
User.prototype.hpCfgs = null; 	// 主页配置

function User(treedata, type, user, filter, hpCfgs)
{
    this.initParam(treedata);
    if(user != null)
    {
        this.adminLevelText 	= user.adminLevel;
    }
    this.type			= type;
    this.clienttype		= 3;
    this.unitCodefilter	= filter;
    this.hpCfgs			= hpCfgs;
    this.userparamconfig= new UserParamConfig(this.hpCfgs);
    this.userprivconfig	= new UserPrivConfig(treedata);

    this.init();

    if(type == PageTypeCodes.EDIT)
    {
        this.setUser(user);
        this.hidenpassword();
    }
}

function changeClientType(t){
    var $1 = $("input[name='allowedClientType'][value=1]");
    var $2 = $("input[name='allowedClientType'][value=2]");
    var $4 = $("input[name='allowedClientType'][value=4]");

    if($(t).is(':checked') && $(t).val()==4){
        if($1.is(':checked')){
            $1.click();
            $1.attr("checked",false);
        }
        if($2.is(':checked')){
            $2.click();
            $2.attr("checked",false);
        }
    }else if($(t).is(':checked') && $(t).val()==1){
        if($4.is(':checked')){
            $4.click();
            $4.attr("checked",false);
        }
    }else if($(t).is(':checked') && $(t).val()==2){
        if($4.is(':checked')){
            $4.click();
            $4.attr("checked",false);
        }
    }
}
 User.prototype.searchOrgList = function(){
	var nthis = this;
    if($.trim($("#unitcodetextfieldfalse").val())==''){
        unitcode.setComboData(unitCodeArr);
    }else{
        var arr = new Array();
        $.each(unitCodeArr,function(i,n){
            if(n.code.indexOf($.trim($("#unitcodetextfieldfalse").val()))>-1){
                arr.push(n);
            }
        });
        unitcode.setComboData(arr);
    }
}
 User.prototype.searchAccessList = function(){
	var nThis = this;
    if($.trim($("#dataAccessLevel1textfieldfalse").val())==''){
        dataAccessLevel.setComboData(accessLevelArr);
    }else{
        var arr = new Array();
        $.each(accessLevelArr,function(i,n){
            if(n.code.indexOf($.trim($("#dataAccessLevel1textfieldfalse").val()))>-1){
                arr.push(n);
            }
        });
        dataAccessLevel.setComboData(arr);
    }
}

User.prototype.initParam = function(treedata)
{
    this.tpcardWindow	= null;
    this.oldRolesArray	= null;
    this.rolesArray		= new Array();
}

User.prototype.init = function()
{
    this.initTabInfo();
    this.initUserBasicInfo();
    this.initRoleInfo();
    this.initMenuInfo();
    this.initBiomInfo();
    this.initPrintTPInfo();
    this.initPrintLPInfo();
    this.initPrintIdentifiInfo();
   this.loadAccessLevel();
    if(this.type == PageTypeCodes.ADD)
    {
        this.validateUserId();
    }
}

User.prototype.initTabInfo =function()
{
    var initData 	= {base_li:"base",role_li:"role",priv_li:"priv",param_li:"param",login_li:"login",quota_li:"quota",filter_li:"filter",quan_li:"quan"};
    var setting		= {onClick:tabClick};
    var tab 		= new WebTab(initData,setting);
    if(this.admrole != SysAdmRole.SUPER)
    {
        tab.hiddenTab("filter_li");
    }

    function tabClick()
    {

    }
}
User.prototype.initUserBasicInfo =function()
{
    var columnnames = ['USER_MAIN|UNIT_CODE','USER_ROLE|IS_DISABLED','USER_INFO|SEX_CODE','USER_MAIN|ALLOWED_CLIENT_TYPE'];
    var filtercolums = new Array();
    filtercolums.push('USER_MAIN|UNIT_CODE:' + this.unitCodefilter);
    WebComboUtil.getCodeTable(columnnames, initcombodata,filtercolums);

    var nthis=this;
	/*$.post(WebVar.VarPath+"/user/mgr/getadmin",null,
	 function(data)
	 {
	 data = eval('(' + data + ')');
	 nthis.adminLevel.setComboData(data);
	 }
	 );*/
    function initcombodata(data)
    {
        data = eval('(' + data + ')');
        //nthis.unitcode.setComboData(data['user_main|unit_code']);
        initOrgList();
        livingcode.setComboData(data['user_main|unit_code']);
        //nthis.isRemoteUser.setComboData(data['user_main|is_remote_user']);
        isDisabled.setComboData(data['user_role|is_disabled']);
        sexcode.setComboData(data['user_info|sex_code']);
        //nthis.userlevel.setComboData(data['user_main|user_level']);
        //nthis.dataAccessLevel.setComboData(data['user_main|data_access_level']);
        clientType.setComboData(data['user_main|allowed_client_type']);

        // 初始化默认参数
        nthis.initDefaultValue();
    }

    function initOrgList(){
        unitcode.setComboData(unitCodeArr);
        $("#unitcodetextfieldfalse").attr("oninput","searchOrgList()");
    }
    initUnitCodeArr(initOrgList);
    // 保存
    WebUI.createWebButton("finish",WebUI.BntType.B_100_24,null,finish);
    function finish()
    {
        var f= nthis.validate();
        if(f == true)
        {
            nthis.save();
        }
        else if(f == 'PasswordNotEqual')
        {
            DialogUtil.openSimpleDialog(AbisMessageResource.Alert["TwoInputPasswordNotConsistent"]);
            return
        }
        else if(f == 'rolesEmpty')
        {
            DialogUtil.openSimpleDialog(AbisMessageResource["IncompleteRoleInfo"]);
            return
        }
        else if(f == 'PasswordLessSix')
        {
            DialogUtil.openSimpleDialog(textArr.PasswordMinLength);
            return
        }
        else if(f == 'PasswordContinuation')
        {
            DialogUtil.openSimpleDialog(textArr.PasswordConsecutive);
            return
        }
        else if(f == 'PasswordSame')
        {
            DialogUtil.openSimpleDialog(textArr.PasswordSameWord);
            return
        }
        else
        {
            DialogUtil.openSimpleDialog(AbisMessageResource.Alert["IncompleteUserInfo"]);
            return;
        }
    }
    WebUI.createWebButton("addunitcode",WebUI.BntType.B_80_24,null,addunitcode);
    function addunitcode()
    {
        $.dialog({
            title: AbisMessageResource["AddUnit"],
            content: document.getElementById('unitcodedialog'),
            okValue: AbisMessageResource['OK'],
            cancelValue:AbisMessageResource['Cancel'],
            ok: function () {return addUnitCode();},
            cancel: function () {
            }
        });
    }

    function addUnitCode()
    {
        var c = $("input[name='addunitcode']").val();
        var t = $("input[name='addunitname']").val();
        if(c != "" && t != "")
        {
            unitcode.getWidget().addItem(c,t,"");
            unitcode.setComboCode(c);
        }
        else
        {
            DialogUtil.openSimpleDialog(AbisMessageResource.Alert["MustFillInUnitCodeAndName"]);
            return false;
        }
        return true;
    }

    WebUI.createWebButton("selectperson",WebUI.BntType.B_80_24,null,selectperson);
    function selectperson()
    {
        nthis.selectperson();
    }
}

User.prototype.initDefaultValue = function()
{
    if(this.type == PageTypeCodes.ADD)
    {
        //this.isRemoteUser.setValue(ABISCode.BOOL_C.NO);
        isDisabled.setValue(ABISCode.BOOL_C.NO);
        $("input[name='id']").val(0);
    }
    this.initAllowedClientType();
}

User.prototype.setUser = function(user)
{
    this.user = user;
    if(user == null)return;

    this.setHSUserRoleInfo(user.userRole);
    this.setHSBasicUserInfo(user.basicInfo);
    this.setHSUserInfo(user.userInfo);
    this.setRoleInfo(user.roles);
    this.setParamConfig(user);
    this.setPrivConfig(user);
}

User.prototype.setHSUserRoleInfo = function(userRole)
{
    if(!WebUtil.isNull(userRole))
    {
        $("input[name='id']").val(userRole.id);
        $("input[name='isDeleted']").val(userRole.isDeleted);
        userid.setText(userRole.userId);
        userid.setEditable(false);
        uname.setText(userRole.name);
        //this.personName.setText(userRole.personId);
        descption.setText(userRole.description);
        //this.isDisabled.setValue(userRole.isDisabled);
        $("input[name='isDisabled']").each(function(){
            if($(this).val()==userRole.isDisabled) $(this).attr("checked",true);
        });
    }
}

User.prototype.setHSBasicUserInfo =function(userinfo)
{
    if(!WebUtil.isNull(userinfo))
    {
        realname.setValue(userinfo.name);
        sexcode.setValue(userinfo.sexCode);
        livingcode.setValue(userinfo.livingAddressCode);
        livingaddress.setValue(userinfo.livingAddress);
        utitle.setValue(userinfo.title);
        mainphone1.setValue(userinfo.mainMobilePhoneNum1);
        mainphone2.setValue(userinfo.mainMobilePhoneNum2);
        fixedphone1.setValue(userinfo.mainFixedPhoneNum1);
        otherphone1.setValue(userinfo.otherMobilePhoneNum1);
        otherphone2.setValue(userinfo.otherMobilePhoneNum2);
        email1.setValue(userinfo.email1);
        email2.setValue(userinfo.email2);
        qq1.setValue(userinfo.qq1);
        weixin1.setValue(userinfo.weiXin1);
        comments.setValue(userinfo.comments);
        birthdate.setValue(userinfo.birthDate);
        shenFenId.setValue(userinfo.shenFenId);
        policeNo.setValue(userinfo.policeNo);
    }
}

User.prototype.setHSUserInfo = function(userInfo)
{
    var nthis =this;
    if(!WebUtil.isNull(userInfo))
    {
        unitcode.setValue(userInfo.unitCode);
        //isRemoteUser.setValue(userInfo.isRemoteUser);
        userlevel.setValue(userInfo.userLevel);
		/*if(!WebUtil.isEmpty(userInfo.unitCode)){
		 var filterStr = getShortUnitCode(userInfo.unitCode)+"*";
		 $("#dataAccessLevel").html("");
		 dataAccessLevel= WebUI.createCombo("dataAccessLevel","dataAccessLevel1",null,null,false,false,"USER_MAIN|DATA_ACCESS_LEVEL","",requiredField);
		 dataAccessLevel.setFilterRgx(filterStr);
		 dataAccessLevel.setValue(userInfo.dataAccessLevel);
		 var filtercolums = new Array();
		 filtercolums.push('USER_MAIN|DATA_ACCESS_LEVEL:'+filterStr);
		 WebComboUtil.getCodeTable(["USER_MAIN|DATA_ACCESS_LEVEL"], initcombodata,filtercolums);
		 function initcombodata(data)
		 {
		 data = eval('(' + data + ')');
		 //console.log(data);
		 dataAccessLevel.setComboData(data['user_main|data_access_level']);
		 }
		 }*/
        if(dataAccessLevel!=null){
            //dataAccessLevel.setText(dataAccessLevelText);
            dataAccessLevel.setValue(dataAccessLevelValue);
        }
        adminLevel.setValue(userInfo.adminLevel);
        this.clienttype = userInfo.allowedClientType;
    }
}

User.prototype.initAllowedClientType = function()
{
    var codes = new Array();
    codes.push(1);
    codes.push(2);
    codes.push(4);
    codes.push(8);

    var value = "";

    for(var i=0;i<codes.length;i++)
    {
        if( (codes[i] & this.clienttype) > 0 )
        {
            value += codes[i];
            value += ",";
        }
    }
    if(value.length > 1)
    {
        value = value.substring(0,value.length - 1);
    }

    clientType.setValue(value);
    $("input[name='allowedClientType']").each(function(){
        $(this).attr("onclick","changeClientType(this)");
    });
}

User.prototype.setRoleInfo = function(roles)
{
    var _roles = roles;
    this.oldRolesArray = roles;
    this.rolesArray = new Array();
    var nthis = this;
    if(!WebUtil.isEmpty(roles))
    {
        $("input[name='role']").each
        (
            function()
            {
                var v = $(this).val();
                for(var j=0; j< roles.length; j++)
                {
                    if(v == roles[j])
                    {
                        $(this).attr("checked",true);
                        nthis.rolesArray.push($(this).val());
                        _roles.splice($.inArray(v,_roles),1);
                        break;
                    }
                }
            }
        );
        if(!WebUtil.isEmpty(_roles)){
            for(var j=0; j< _roles.length; j++)
            {
                nthis.rolesArray.push(_roles[j]);
            }
        }
    }
}

User.prototype.setParamConfig = function(user)
{
    this.userparamconfig.setParamConfig(user.paramConfig);
}

User.prototype.setPrivConfig =function(user)
{
    this.userprivconfig.setPrivConfig(user.privs);
}

User.prototype.selectperson =function()
{
    if (this.tpcardWindow == null)
    {
        this.tpcardWindow = ABISWindowUtil.openTPCard("tpcard11", null, null,getperson, true, TPCardInfoCol.CREATE_TIME,WebTable.DES);
    }
    else
    {
        this.tpcardWindow.setData({dbid:dbid});
        this.tpcardWindow.open();
    }

    var nthis=this;
    function getperson(rows)
    {
        var n=rows[0]["NAME"];
        var id=rows[0]["ID"];
        personName.setText(n);
        $("input[name='personId']").val(id);
    }
}

User.prototype.initRoleInfo =function()
{
    var nthis=this;
    $.post(WebVar.VarPath+"/user/mgr/roles",null,
        function(resultInfo)
        {
            if(resultInfo.status === WebCode.WebResultStatus.ok){
                var data=resultInfo.data;
                $("#roles").html("").append("<tr class='theader'><td width='50'></td><td width='300'>" + AbisMessageResource["Name2"] + "</td><td width='400'>" + AbisMessageResource["Describe"] + "</td></tr>");
                for(var i=0;i<data.length;i++)
                {
                    this.$checkbox = $("<input type='checkbox' name='role' value="+data[i].id+"></input>");
                    this.$checkbox.bind("click",function(n){
                        nthis.buildRoles();
                    });
                    this.$td1 = $("<td width='50'></td>");
                    this.$td1.append(this.$checkbox);
                    this.$td2 = $("<td width='300'>"+data[i].name+"</td>");
                    this.$td3 = $("<td width='400'>"+data[i].des+"</td>");
                    this.$tr = $("<tr style='height: 30px;'></tr>");

                    this.$tr.append(this.$td1);
                    this.$tr.append(this.$td2);
                    this.$tr.append(this.$td3);
                    if(i%2==0)
                        this.$tr.addClass("trcol1");
                    else
                        this.$tr.addClass("trcol2");
                    $("#roles").append(this.$tr);
                }
                nthis.setRoleInfo(nthis.oldRolesArray);
            }else{
                DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
            }
        }
    );
}

User.prototype.initMenuInfo =function()
{
    $.post(WebVar.VarPath+"/user/mgr/menulist",null,
        function(data)
        {
            if(data.status === WebCode.WebResultStatus.ok){
                var menulist= data.data;
                $("#menutable").html("").append("<tr class='theader'><td width='50'></td><td width='150'>" + AbisMessageResource["Name2"] + "</td><td width='200'>" + AbisMessageResource["Describe"] + "</td><td width='200'>" + AbisMessageResource["HomePage"] + "</td><td width='150'>" + AbisMessageResource["CreateTime"] + "</td><td width='100'>" + AbisMessageResource["CreateUser"] + "</td></tr>");
                for(var i=0;i<menulist.length;i++)
                {
                    if(i%2==0)
                        $("#menutable").append("<tr style='height: 30px;' class='trcol1'><td width='50'><input type='radio' name='menu' value="+menulist[i].id+"></input></td><td>"+menulist[i].name+"</td><td>"+menulist[i].description+"</td><td>"+menulist[i].homePage+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                    else
                        $("#menutable").append("<tr style='height: 30px;' class='trcol2'><td width='50'><input type='radio' name='menu' value="+menulist[i].id+"></input></td><td>"+menulist[i].name+"</td><td>"+menulist[i].description+"</td><td>"+menulist[i].homePage+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(data.msg);
            }
        });
}

User.prototype.initPrintTPInfo =function()
{
    $.post(WebVar.VarPath+"/user/mgr/getPrint/tp",null,
        function(data)
        {
            if(data==null||data=="") $("#printtptable").html(AbisMessageResource["TemplateNotExist"]);
            else
            {
                var menulist=eval('('+data+')');
                $("#printtptable").html("").append("<tr class='theader'><td width='50'></td><td width='150'>" + AbisMessageResource["Name2"] + "</td><td width='200'>" + AbisMessageResource["Type"] + "</td><td width='150'>" + AbisMessageResource["CreateTime"] + "</td><td width='100'>" + AbisMessageResource["CreateUser"] + "</td></tr>");
                for(var i=0;i<menulist.length;i++)
                {
                    if(i%2==0)
                        $("#printtptable").append("<tr style='height: 30px;' class='trcol1'><td width='50'><input type='radio' name='tpprint' value="+menulist[i].configName+"></input></td><td>"+menulist[i].configName+"</td><td>"+menulist[i].configType+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                    else
                        $("#printtptable").append("<tr style='height: 30px;' class='trcol2'><td width='50'><input type='radio' name='tpprint' value="+menulist[i].configName+"></input></td><td>"+menulist[i].configName+"</td><td>"+menulist[i].configType+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                }
            }
        });
}

User.prototype.initPrintLPInfo =function()
{
    $.post(WebVar.VarPath+"/user/mgr/getPrint/lp",null,
        function(data)
        {
            if(data==null||data=="") $("#printlptable").html(AbisMessageResource["TemplateNotExist"]);
            else
            {
                var menulist=eval('('+data+')');
                $("#printlptable").html("").append("<tr class='theader'><td width='50'></td><td width='150'>" + AbisMessageResource["Name2"] + "</td><td width='200'>" + AbisMessageResource["Type"] + "</td><td width='150'>" + AbisMessageResource["CreateTime"] + "</td><td width='100'>" + AbisMessageResource["CreateUser"] + "</td></tr>");
                for(var i=0;i<menulist.length;i++)
                {
                    if(i%2==0)
                        $("#printlptable").append("<tr style='height: 30px;' class='trcol1'><td width='50'><input type='radio' name='lpprint' value="+menulist[i].configName+"></input></td><td>"+menulist[i].configName+"</td><td>"+menulist[i].configType+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                    else
                        $("#printlptable").append("<tr style='height: 30px;' class='trcol2'><td width='50'><input type='radio' name='lpprint' value="+menulist[i].configName+"></input></td><td>"+menulist[i].configName+"</td><td>"+menulist[i].configType+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                }
            }
        });
}

User.prototype.initPrintIdentifiInfo =function()
{
    $.post(WebVar.VarPath+"/user/mgr/getPrint/identifi",null,
        function(data)
        {
            if(data==null||data=="") $("#printidentifitable").html(AbisMessageResource["TemplateNotExist"]);
            else
            {
                var menulist=eval('('+data+')');
                $("#printidentifitable").html("").append("<tr class='theader'><td width='50'></td><td width='150'>" + AbisMessageResource["Name2"] + "</td><td width='200'>" + AbisMessageResource["Type"] + "</td><td width='150'>" + AbisMessageResource["CreateTime"] + "</td><td width='100'>" + AbisMessageResource["CreateUser"] + "</td></tr>");
                for(var i=0;i<menulist.length;i++)
                {
                    if(i%2==0)
                        $("#printidentifitable").append("<tr style='height: 30px;' class='trcol1'><td width='50'><input type='radio' name='idenprint' value="+menulist[i].configName+"></input></td><td>"+menulist[i].configName+"</td><td>"+menulist[i].configType+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                    else
                        $("#printidentifitable").append("<tr style='height: 30px;' class='trcol2'><td width='50'><input type='radio' name='idenprint' value="+menulist[i].configName+"></input></td><td>"+menulist[i].configName+"</td><td>"+menulist[i].configType+"</td><td>"+menulist[i].createTime+"</td><td>"+menulist[i].createUser+"</td></tr>");
                }
            }
        });
}

User.prototype.initBiomInfo =function()
{

    $.post(WebVar.VarPath+"/user/mgr/stdcfgs",null,
        function(data)
        {
            var menulist = eval('('+data+')');
            $("#biomtable").html("").append("<tr class='theader'><td width='50'></td><td width='150'>" + AbisMessageResource["Name2"] + "</td><td width='200'>" + AbisMessageResource["Describe"] + "</td><td width='150'>" + AbisMessageResource["CreateTime"] + "</td><td width='100'>" + AbisMessageResource["Name2"] + "CreateUser</td></tr>");

            var id;
            var desc;
            var crtTime;
            var crtUser;

            for(var i=0;i<menulist.length;i++)
            {
                id		= menulist[i].id;
                desc 	= menulist[i].description;
                crtTime = menulist[i].createTime;
                crtUser	= menulist[i].createUser;

                if(desc == null) desc = "";
                if(crtTime == null) crtTime = "";
                if(crtUser == null) crtUser = "";

                if( i % 2 == 0 )
                {
                    $("#biomtable").append("<tr style='height: 30px;' class='trcol1'><td width='50'><input type='radio' name='biom' value="+id+"></input></td><td>"+menulist[i].name+"</td><td>"+desc+"</td><td>"+crtTime+"</td><td>"+crtUser+"</td></tr>");
                }
                else
                {
                    $("#biomtable").append("<tr style='height: 30px;' class='trcol2'><td width='50'><input type='radio' name='biom' value="+id+"></input></td><td>"+menulist[i].name+"</td><td>"+desc+"</td><td>"+crtTime+"</td><td>"+crtUser+"</td></tr>");
                }
            }
        });
}

User.prototype.validate = function()
{
    var r0 = true;//this.adminLevel.validateRequried();
    var r1 = userid.validateRequried();
    var r2 = uname.validateRequried();
    var r3 = unitcode.validateRequried();
    var r4 = true//isRemoteUser.validateRequried();
    var r5 = true;//userlevel.validateRequried();
    var r6 = dataAccessLevel.validateRequried();
    var r7 = true;
    var r8 = true;
    if(this.type == PageTypeCodes.ADD)
    {
        r7 = password.validateRequried();
        r8 = confirmpassword.validateRequried();
    }
    var r9 = clientType.validateRequried();
    var r = r0 && r1 && r2 && r3 && r5 && r6 && r7 && r8 && r9;
    if(r == false)
    {
        return false;
    }
    var p1 = password.getValue();
    var p2 = confirmpassword.getValue();
    if(p1 !== p2)
    {
        return 'PasswordNotEqual';
    }
    if(this.type==PageTypeCodes.EDIT){
    } else {
        if(p1.length<6){
            return 'PasswordLessSix';
        }
        if(serial(p1)){
            return 'PasswordContinuation';
        }
        var reg = new RegExp('(\\w)\\1{2,}')
        if(reg.test(p1)){
            return 'PasswordSame';
        }
    }
    if(!this.rolesArray.length>0){
        return 'rolesEmpty';
    }
    return true;
}

function serial(number){
    var number = number.toString();
    for (var i = 0 ; i < number.length;i++){
        if(i > 1  && number.charAt(i).charCodeAt() - number.charAt(i - 1).charCodeAt()==1&&number.charAt(i-1).charCodeAt() - number.charAt(i - 2).charCodeAt()==1){
            if((number.charAt(i)+number.charAt(i-1)+number.charAt(i-2)).match(/\d{3,}|[a-zA-Z]{3,}/)){
                return true;
            }
        }
    }
    return false;
}
User.prototype.save = function()
{
    WebUtil.Wait();
    var userData 			= {};
    userData.type			= this.type;
    userData.userrole		= this.buildHSUserRole();
    userData.userinfo		= this.buildUserBasicInfo();
    userData.roleList 		= this.rolesArray;
    userData.delRoleList 	= this.buildRoles();
    userData.prefCfgList	= this.userparamconfig.getParamConfig();
    userData.delPrefcfgList	= this.userparamconfig.getDelParamConfig();
    userData.hpInfo			= this.userparamconfig.getHomePageCfg();
    userData.user			= this.getUserInfo();
    userData.userAdmCfg 	= this.getUserAdmCfg();
    userData.privList		= this.userprivconfig.getPrivConfig();
    userData.delPrivList	= this.userprivconfig.getDelPrivConfig();

    if(this.type == PageTypeCodes.ADD)
    {
        userData.password 		= WebUtil.trim(password.getValue());
        userData.confirmpassword= WebUtil.trim(confirmpassword.getValue());
    }

    var jData 	= $.toJSON(userData);
    var url 	= WebVar.VarPath + "/user/mgr/save";
    var nThis 	= this;
    jQuery.ajax({
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        url : url,
        data : jData,
        success : function(data)
        {
            WebUtil.NoWait();
            if(data.status == "ok")
            {
                if(nThis.type == PageTypeCodes.ADD)
                {
                    DialogUtil.dialogAfterSaveOK(clear,closepage);
                }
                else
                {
                    DialogUtil.openSimpleDialog(AbisMessageResource['SaveSuccess'],0);
                    window.location.reload();
                }

                //closepage();
            }
            else
            {
                DialogUtil.openSimpleDialog(data.msg);
            }
        },
        error : function(e)
        {
            WebUtil.NoWait();
            DialogUtil.openSimpleDialog(AbisMessageResource.Alert["ConnectSvrException"]);
        }
    });

    function clear()
    {
        nThis.clear();
    }
    function closepage()
    {
        if(window.opener){
            window.opener = null;
            window.close&&window.close();
        }
    }
}

User.prototype.buildHSUserRole = function()
{
    var userRole = {};
    if(this.type == PageTypeCodes.EDIT)
    {
        userRole.id 		= $("input[name='id']").val();
        userRole.isDeleted  = $("input[name='isDeleted']").val();
    }
    //userRole.isDisabled		= isDisabled.getValue();
    userRole.isDisabled     = $("input[name='isDisabled']:checked").val();
    userRole.userId 		= WebUtil.trim(userid.getValue());
    userRole.name 			= uname.getValue();
    userRole.description 	= descption.getValue();
    userRole.type			= ABISCode.UserRoleTypeCode.USER;
    if(this.type == PageTypeCodes.EDIT && this.user != null)
    {
        userRole.cuInfo 	= this.user.userRole.cuInfo;
    }
    return userRole;
}

User.prototype.buildUserBasicInfo = function()
{
    var basicInfo = {};
    if(this.type == PageTypeCodes.EDIT)
    {
        basicInfo.id = $("input[name='id']").val();
    }
    //basicInfo.name					= realname.getValue();
    basicInfo.name					= uname.getValue();
    basicInfo.sexCode				= sexcode.getValue();
    basicInfo.livingAddressCode		= livingcode.getValue();
    basicInfo.livingAddress			= livingaddress.getValue();
    basicInfo.title					= utitle.getValue();
    basicInfo.mainMobilePhoneNum1	= mainphone1.getValue();
    basicInfo.mainMobilePhoneNum2	= mainphone2.getValue();
    basicInfo.mainFixedPhoneNum1	= fixedphone1.getValue();
    basicInfo.otherMobilePhoneNum1	= otherphone1.getValue();
    basicInfo.otherMobilePhoneNum2	= otherphone2.getValue();
    basicInfo.email1				= email1.getValue();
    basicInfo.email2				= email2.getValue();
    basicInfo.qq1					= qq1.getValue();
    basicInfo.weiXin1				= weixin1.getValue();
    basicInfo.comments				= comments.getValue();
    basicInfo.birthDate				= birthdate.getValue();
    basicInfo.shenFenId				= shenFenId.getValue();
    basicInfo.policeNo				= policeNo.getValue();

    return basicInfo;
}

User.prototype.getUserInfo = function()
{
    var user			= {};
    if(this.type == PageTypeCodes.EDIT)
    {
        user.id 		= $("input[name='id']").val();
        user.dataAccessLevel = dataAccessLevel.getValue();
    }else{
        user.dataAccessLevel = dataAccessLevel.getValue();
    }
    //user.isRemoteUser	= isRemoteUser.getValue();
    user.unitCode		= unitcode.getValue();
    //user.userLevel		= userlevel.getValue();
    user.userLevel = userLevelText;
    //user.dataAccessLevel	= dataAccessLevel.getValue();
    //user.adminLevel	= adminLevel.getValue();

    var codes = clientType.getValue();
    var _clientType=0;
    for(var i=0;i<codes.length;i++)
    {
        _clientType += parseInt(codes[i]);
    }
    user.allowedClientType = _clientType;
    return user;
}

User.prototype.getUserAdmCfg = function()
{
    var admcfg = {};
    admcfg.dataFilterGroups = "";
    var rolestr = "";
    for(var i=0;i<this.rolesArray.length;i++)
    {
        rolestr = this.rolesArray[i] + "," + rolestr;
    }
    admcfg.allowedRoles	= rolestr;
    admcfg.templateUsers= "";
    return admcfg;
}

User.prototype.buildRoles = function()
{
    var nthis = this;
    nthis.rolesArray = new Array();
    var delRoles = new Array();
    $("input[name='role']:checked").each
    (
        function()
        {
            nthis.rolesArray.push($(this).val());
        }
    );

    if(this.oldRolesArray != null)
    {
        for(var i=0;i<this.oldRolesArray.length;i++)
        {
            var flag = false;
            for(var j=0;j<this.rolesArray.length;j++)
            {
                if(this.oldRolesArray[i] == this.rolesArray[j])
                {
                    flag = true;
                    break;
                }
            }
            if(!flag)
            {
                delRoles.push(this.oldRolesArray[i]);
            }
        }
    }

    return delRoles;
}

User.prototype.clear = function()
{
    $(".Text_Input").val("");
    unitcode.clear();
    //isRemoteUser.clear();
    isDisabled.clear();
    livingaddress.clear();
    sexcode.clear();
    livingcode.clear();
    $("input[type='text']").each(function(){$(this).val("");});
    $("input[type='hidden']").each(function(){if($(this).attr("name")!="type") $(this).val("");});
    $("input[type='checkbox']").each(function(){$(this).attr("checked", false);});
    $("input[type='radio']").each(function(){$(this).attr("checked", false);});
    this.userparamconfig.clear();
    this.rolesArray	 	= new Array();
    this.oldRolesArray 	= new Array();
    this.initDefaultValue();
}

User.prototype.hidenpassword = function()
{
    $(".password").hide();
}

User.prototype.validateUserId = function()
{
    $("input[name='userId']").blur
    (
        function()
        {
            var nThis = $(this);
            var v = $(this).val();
            if(v != "")
            {
                $.post(WebVar.VarPath+"/user/mgr/validate/"+v,null,
                    function(data)
                    {
                        if(data == true)
                        {
                            nThis.css("background-color","red");
                        }
                        else
                        {
                            nThis.css("background-color","");
                        }
                    }
                );
            }
            else
            {
                v = $("#userIdValue").html();
                $(this).val(v);
            }
        }
    );
    $("input[name='userId']").focus
    (
        function()
        {
            var v = $(this).val();
            $("#userIdValue").html(v);
            if(v != "")
            {
                $(this).css("background-color","");
            }
        }
    );
}
//去掉尾部0
User.prototype.getShortUnitCode = function(code){
    if(WebUtil.isNull(code)) {
        return '';
    }
    return code.replace(/0+?$/, '');
}
    User.prototype.loadAccessLevel =	function (){
        var nThis = this;
        $("#dataAccessLevel1textfieldfalse").val("");
        $.ajax
        (
            {
                type 		: 'POST',
                url 		: WebVar.VarPath + "/org/search",
                data 		: null,
                dataType 	: 'json',
                success 	: function(data)
                {
                    dataAccessLevel.setComboData(eval('(' + data + ')'));
                    accessLevelArr = eval('(' + data + ')');
                    $("#dataAccessLevel1textfieldfalse").attr("oninput","searchAccessList()");
                },
                error : function(e)
                {
                    WebUtil.NoWait();
                }
            }
        );
    }

function initUnitCodeArr(callback){
    var url = WebVar.VarPath + "/sys/unitlevel/searchAllUnit/";
    jQuery.ajax({
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        url : url,
        data :{} ,
        success : function(data)
        {
            data=eval('('+data+')');
            unitCodeArr = new Array();
            $.each(data,function(i,n){
                var code = {};
                code.code = n.unitCode;
                code.text = n.dispName;
                code.pinyin = n.inputCode;
                unitCodeArr.push(code);
            });
            if(WebUtil.isFunction(callback)){
                callback();
            }
        },
        error : function(e)
        {
            DialogUtil.openSimpleDialog(AbisMessageResource.UnitlevelLoadFailed);
            return false;
        }
    });
}