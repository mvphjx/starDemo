function Role(treedata, type,language) 
{
	this.initParam(treedata);	
	this.language = language;
	this.type=type;
	this.init();
}

Role.prototype.initParam = function(treedata) 
{	
	this.roleid=null;	
	this.name=null;
	this.descption=null;
	this.isDisabled=null;
	this.roleObj={};	
	this.userprivconfig=new UserPrivConfig(treedata);
}

Role.prototype.init = function() 
{
	this.initTabInfo();
	this.initUserBasicInfo();
	this.validateRoleId();
}
Role.prototype.initTabInfo =function()
{
	var initData 	= {base_li:"base",priv_li:"priv"};	
	var setting		= {onClick:tabClick};
	var tab 		= new WebTab(initData,setting);
	
	function tabClick()
	{
		
	}
}
Role.prototype.initUserBasicInfo =function()
{
	var requiredField =new Array();
	requiredField.push("roleId");
	requiredField.push("name");
	
	//基本信息
	this.roleid					= WebUI.createText("roleId","roleId","WebTextField","",requiredField);
	this.name					= WebUI.createText("name","name","WebTextField","",requiredField);
	this.descption				= WebUI.createMulText("description","description","WebTextArea","",requiredField);
	this.isDisabled 			= WebUI.createCombo("isDisabled1","isDisabled",null,null,true,false,"USER_ROLE|IS_DISABLED","",requiredField);	
	//详细信息
	
    
	var columnnames = ['USER_ROLE|IS_DISABLED'];
    WebComboUtil.getCodeTable(columnnames, initcombodata);    
    var nthis=this;
    function initcombodata(data)
    {
    	data = eval('(' + data + ')');
    	nthis.isDisabled.setComboData(data['user_role|is_disabled']);  	
    	if(data['user_role|is_disabled'] != null)
    	{
    		nthis.isDisabled.setValue(data['user_role|is_disabled'][0].code);
    	}
    }
    
    // 保存
	WebUI.createWebButton("finish",WebUI.BntType.B_100_24,null,finish);  	
	function finish()
	{
		var f= nthis.validate();
		if(f)
		{
			nthis.save();
		}
		else
		{
			DialogUtil.openSimpleDialog(AbisMessageResource["WithAsteriskRequired"]);
		}
	}
}
Role.prototype.setUser = function(user)
{	
	this.setRoleBasicInfo(user.userinfo);
	this.setPrivConfig(user);	
}

Role.prototype.setRoleBasicInfo =function(hsuserrole)
{
	$("input[name='id']").val(hsuserrole.id);
	this.roleid.setText(hsuserrole.userId);	
	this.name.setText(hsuserrole.name);	
	this.descption.setText(hsuserrole.description);
	this.isDisabled.setValue(hsuserrole.isDisabled);
	$("input[name='isDisabled']").each(function(){
		if($(this).val()==hsuserrole.isDisabled) $(this).attr("checked",true);
	});
}

Role.prototype.setPrivConfig =function(user)
{
	this.userprivconfig.setPrivConfig(user.privs);
}

Role.prototype.save = function() 
{
	WebUtil.Wait();
	this.getRoleBasicInfo();		
	
	var roleObject = {};
	roleObject.type=this.type;
	roleObject.userrole=this.roleObj;
	roleObject.privList=this.userprivconfig.getPrivConfig();	
	roleObject.delPrivList=this.userprivconfig.getDelPrivConfig();
	
	var jData = $.toJSON(roleObject);
	var url = WebVar.VarPath + "/user/rolelist/add";
	var nThis = this;
	jQuery.ajax({
		type : 'POST',
		contentType : 'application/json',
		dataType : 'json',
		url : url,
		data : jData,
		success : function(data) 
		{
			WebUtil.NoWait();
	    	if(data == 0)
	    	{
	    		if(t==PageTypeCodes.ADD)
	    		{
	    			DialogUtil.dialogAfterSaveOK(clear,closepage);
	    		}
	    		else
	    		{
					DialogUtil.openSimpleDialog(AbisMessageResource['SaveSuccess']);
	    		}
	    	} else if(data == -2){
                DialogUtil.openSimpleDialog(AbisMessageResource['NoPermission']);
			}
	    	else
	    	{
                DialogUtil.openSimpleDialog(AbisMessageResource['SaveFail']);
	    	}
		},
		error : function(e) 
		{
            DialogUtil.openSimpleDialog(e);
			window.location.reload();
		}
	});
	
	function clear()
	{
		nThis.clear();
	}
	function closepage()
	{
		window.close();
	}
}
Role.prototype.getRoleBasicInfo = function()
{
	this.roleObj.userId=this.roleid.getValue();	
	this.roleObj.type=2;	
	this.roleObj.name=this.name.getValue();
	this.roleObj.description=this.descption.getValue();
	//this.roleObj.isDisabled=this.isDisabled.getValue();
	this.roleObj.isDisabled=$("input[name='isDisabled']:checked").val();
	this.roleObj.id=$("input[name='id']").val();
}

Role.prototype.clear = function() 
{
	$(".Text_Input").val("");	
	this.isDisabled.setComboClear();
	$("input[type='text']").each(function(){$(this).val("");});
	$("input[type='hidden']").each(function(){if($(this).attr("name")!="type") $(this).val("");});	
	$("input[type='checkbox']").each(function(){$(this).attr("checked", false);});
	$("input[type='radio']").each(function(){$(this).attr("checked", false);});
}

Role.prototype.validate = function()
{
	var flag = true;
	//验证必填项是否都填了
	if(WebUtil.isEmpty(this.roleid.getValue()))
	{
		flag = false;
	}
	if(WebUtil.isEmpty(this.name.getValue()))
	{
		flag = false;
	}
	return flag;
}
Role.prototype.validateRoleId = function()
{
	$("input[name='roleId']").blur(function(){
		var v=$(this).val();
		var nThis=$(this);
		if(v!="")
		{
			$.post(WebVar.VarPath+"/user/rolelist/validate/"+v,null,
				      function(data)
				      {
				            if(data == true)
				            {
				            	nThis.css("background-color","red");
				            	nThis.val(v+" :"+ AbisMessageResource["AlreadyExistReEnter"]);  
				            }	
				            else
				            {
				            	nThis.css("background-color","");
				            }
				      }
			);
		}
	});
	$("input[name='roleId']").focus(function(){
		var v=$(this).val();		
		var nThis=$(this);
		if(v!="")
		{
			$(this).val("");	
			$(this).css("background-color","");
		}
	});
}