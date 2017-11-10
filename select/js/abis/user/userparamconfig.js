
User.prototype.hpInfo = null; 	// 主页配置

function UserParamConfig(hpInfo) 
{
	this.hpInfo = hpInfo;
	this.initParam();	
	this.init();
}
UserParamConfig.prototype.initParam = function() 
{
	this.delPrefcfgList=new Array();
	this.prefCfgList=new Array();
	this.menuid=null;
	this.olddefs=null;
}

UserParamConfig.prototype.init = function() 
{	
	this.initButton();
	this.initText();	
	this.initHomePageCfg();
}

UserParamConfig.prototype.initButton = function() 
{	
	WebUI.createWebButton("requiredtpButton",WebUI.BntType.B_60_24,null,show);  //CfgTypeCode.TPCARD_REQURIED
	WebUI.createWebButton("deltpButton",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("requiredcaseButton",WebUI.BntType.B_60_24,null,show); //CfgTypeCode.LPCASE_REQURIED 
	WebUI.createWebButton("delcaseButton",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("requiredhitlogButton",WebUI.BntType.B_60_24,null,show); //CfgTypeCode.HITLOG_REQURIED
	WebUI.createWebButton("delhitlogButton",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("requiredwantedButton",WebUI.BntType.B_60_24,null,show);//CfgTypeCode.WANTED_REQURIED  
	WebUI.createWebButton("delwantedButton",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("requiredcapturedButton",WebUI.BntType.B_60_24,null,show); //CfgTypeCode.CAPTURED_REQURIED 
	WebUI.createWebButton("delcapturedButton",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("updatetpButton",WebUI.BntType.B_60_24,null,show);  //CfgTypeCode.TPCARD_UPDATE
	WebUI.createWebButton("deltpButton1",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("updatecaseButton",WebUI.BntType.B_60_24,null,show);  //CfgTypeCode.LPCASE_UPDATE
	WebUI.createWebButton("delcaseButton1",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("updatehitlogButton",WebUI.BntType.B_60_24,null,show); //CfgTypeCode.HITLOG_UPDATE 
	WebUI.createWebButton("delhitlogButton1",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("updatewantedButton",WebUI.BntType.B_60_24,null,show); //CfgTypeCode.WANTED_UPDATE 
	WebUI.createWebButton("delwantedButton1",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("updatecapturedButton",WebUI.BntType.B_60_24,null,show);  //CfgTypeCode.CAPTURED_UPDATE
	WebUI.createWebButton("delcapturedButton1",WebUI.BntType.B_60_24,null,deleteconfig); 
	
	WebUI.createWebButton("printtpButton",WebUI.BntType.B_60_24,null,selectPrintTPButton);  
	WebUI.createWebButton("delprinttpButton",WebUI.BntType.B_60_24,null,deleteconfig);  
	WebUI.createWebButton("printcaseButton",WebUI.BntType.B_60_24,null,selectPrintLPButton); 
	WebUI.createWebButton("delprintcaseButton",WebUI.BntType.B_60_24,null,deleteconfig); 
	WebUI.createWebButton("printIdentifiButton",WebUI.BntType.B_60_24,null,selectPrintIdentifiButton); 
	WebUI.createWebButton("delprintIdentifiButton",WebUI.BntType.B_60_24,null,deleteconfig); 
	WebUI.createWebButton("selectMenuButton",WebUI.BntType.B_60_24,null,selectMenuButton); 
	WebUI.createWebButton("delMenuButton",WebUI.BntType.B_60_24,null,deleteconfig); 
	WebUI.createWebButton("selectStdCfgButton",WebUI.BntType.B_60_24,null,selectBiomButton); 
	WebUI.createWebButton("delStdCfgButton",WebUI.BntType.B_60_24,null,deleteconfig); 
	
	var borwseBnt30 = WebUI.createWebButton("cfg_browse_btn_30", WebUI.BntType.B_60_24, "", choose);
	var delBnt30    = WebUI.createWebButton("cfg_del_btn_30", WebUI.BntType.B_60_24, "", del);
	var borwseBnt200 = WebUI.createWebButton("cfg_browse_btn_200", WebUI.BntType.B_60_24, "", choose);
	var delBnt200    = WebUI.createWebButton("cfg_del_btn_200", WebUI.BntType.B_60_24, "", del);
	
	
	function choose(id)
	{
		var ps = id.split("_");
		var cfgType = ps[ps.length - 1];
		var cols = new Array();
		cols.push(UserPrefDefCol.ID);
		cols.push(UserPrefDefCol.NAME);
		cols.push(UserPrefDefCol.DESCRIPTION);
		cols.push(UserPrefDefCol.CREATE_TIME);
		
		var wheres 		= new Array();
		var where 		= {};
		where.colName 	= UserPrefDefCol.TYPE;
		where.dataType 	= ABISCode.StorageDataType.NUMBER;
		where.value1	= cfgType;
		wheres.push(where);
		
		ABISWindowUtil.open("d1","USER_PREF_DEF",cols,UserPrefDefCol.NAME,AbisMessageResource["Name2"],AbisMessageResource["Search"],wheres,invoke,false,UserPrefDefCol.ID,1);
		
		function invoke(row)
		{
			var cfgId = row[0][UserPrefDefCol.ID];
			var cfgName = row[0][UserPrefDefCol.NAME];
			if(id=='cfg_browse_btn_30'){
				$("input[name='n30']").val(cfgName);
				$("input[name='i30']").val(cfgId);
			}else if(id=='cfg_browse_btn_200'){
				$("input[name='n200']").val(cfgName);
				$("input[name='i200']").val(cfgId);
			}
		}
	}
	
	function del(id)
	{
		if(id=='cfg_del_btn_30'){
			$("input[name='n30']").val("");
			$("input[name='i30']").val("");
		}else if(id=='cfg_del_btn_200'){
			$("input[name='n200']").val("");
			$("input[name='i200']").val("");
		}
	}
	
	var menuBorwseBnt = WebUI.createWebButton("menu_bnt_borwse", WebUI.BntType.B_60_24, "", chooseMenu);
	var menuDelBnt    = WebUI.createWebButton("menu_bnt_del", WebUI.BntType.B_60_24, "", delMenu);
	
	function chooseMenu()
	{
		var cols = new Array();
		cols.push("ID");
		cols.push("NAME");
		cols.push("DESCRIPTION");
		cols.push("CREATE_TIME");
		
		ABISWindowUtil.open("dialog","menu_set_cfg",cols,"NAME",AbisMessageResource["Name2"],AbisMessageResource["Search"],null,invoke,false,"ID",1);
		
		function invoke(row)
		{
			var menuId	 = row[0]["ID"];
			var menuName = row[0]["NAME"];
			$("input[name='n40']").val(menuName);
			$("input[name='i40']").val(menuId);
		}
	}

	function delMenu()
	{
		$("input[name='n40']").val("");
		$("input[name='i40']").val("");
	}
	
	var hpBorwseBnt = WebUI.createWebButton("def_hp_bnt_borwse", WebUI.BntType.B_60_24, "", chooseHp);
	var hpDelBnt    = WebUI.createWebButton("def_hp_bnt_del", WebUI.BntType.B_60_24, "", delHp);
	
	function chooseHp()
	{
		var cols = new Array();
		cols.push("ID");
		cols.push("NAME");
		cols.push("DESCRIPTION");
		cols.push("CREATE_TIME");
		
		ABISWindowUtil.open("dialog","portal_page",cols,"NAME",AbisMessageResource["Name2"],AbisMessageResource["Search"],null,invoke,false,"ID",1);
		
		function invoke(row)
		{
			var pageId	 = row[0]["ID"];
			var pageName = row[0]["NAME"];			
			$("input[name='n202']").val(pageName);
			$("input[name='i202']").val(pageId);
		}
	}

	function delHp()
	{
		$("input[name='n202']").val("");
		$("input[name='i202']").val("");
	}

	function deleteconfig(id)
	{
		if(id=="deltpButton")
		{			
			$("input[name='20v']").val("");
			$("input[name='t20']").val("");
		}
		else if(id=="delcaseButton")
		{		
			$("input[name='23v']").val("");
			$("input[name='t23']").val("");
		}
		else if(id=="delhitlogButton")
		{			
			$("input[name='29v']").val("");
			$("input[name='t29']").val("");
		}
		else if(id=="delwantedButton")
		{			
			$("input[name='25v']").val("");
			$("input[name='t25']").val("");
		}
		else if(id=="delcapturedButton")
		{			
			$("input[name='27v']").val("");
			$("input[name='t27']").val("");
		}
		else if(id=="deltpButton1")
		{			
			$("input[name='22v']").val("");
			$("input[name='t22']").val("");
		}	
		else if(id=="delcaseButton1")
		{		
			$("input[name='24v']").val("");
			$("input[name='t24']").val("");
		}
		else if(id=="delhitlogButton1")
		{			
			$("input[name='30v']").val("");
			$("input[name='t30']").val("");
		}
		else if(id=="delwantedButton1")
		{		
			$("input[name='26v']").val("");
			$("input[name='t26']").val("");
		}
		else if(id=="delcapturedButton1")
		{			
			$("input[name='28v']").val("");
			$("input[name='t28']").val("");
		}
		else if(id=="delprinttpButton")
		{			
			$("input[name='printtpv']").val("");
			$("input[name='printtp']").val("");
		}
		else if(id=="delprintcaseButton")
		{			
			$("input[name='printcasev']").val("");
			$("input[name='printcase']").val("");
		}
		else if(id=="delprintIdentifiButton")
		{			
			$("input[name='printIdentifiv']").val("");
			$("input[name='printIdentifi']").val("");
		}
		else if(id=="delMenuButton")
		{			
			$("input[name='t40']").val("");
			$("input[name='40v']").val("");
		}
		else if(id=="delStdCfgButton")
		{			
			$("input[name='t200']").val("");
			$("input[name='200v']").val("");
		}
		else
		{
			DialogUtil.openSimpleDialog(AbisMessageResource.Alert["Error"]);
		}
	}
	
	function show(id)
	{		
		var type;
		var moduleId;
		if(id=='requiredtpButton')
		{
			moduleId=
			type=CfgTypeCode.TPCARD_REQURIED;
		}
		else if(id=='requiredcaseButton')
			type=CfgTypeCode.LPCASE_REQURIED;
		else if(id=='requiredhitlogButton')
			type=CfgTypeCode.HITLOG_REQURIED;
		else if(id=='requiredwantedButton')
			type=CfgTypeCode.WANTED_REQURIED;
		else if(id=='requiredcapturedButton')
			type=CfgTypeCode.CAPTURED_REQURIED;
		else if(id=='updatetpButton')
			type=CfgTypeCode.TPCARD_UPDATE;
		else if(id=='updatecaseButton')
			type=CfgTypeCode.LPCASE_UPDATE;
		else if(id=='updatehitlogButton')
			type=CfgTypeCode.HITLOG_UPDATE;
		else if(id=='updatewantedButton')
			type=CfgTypeCode.WANTED_UPDATE;
		else if(id=='updatecapturedButton')
			type=CfgTypeCode.CAPTURED_UPDATE;
		$.post(WebVar.VarPath +"/user/mgr/config/"+type,null,
			      function(data)
			       {			
					data=eval('('+data+')');
					if(data.length>0)
					{
						var t1="<table  align='center' class='configtable'><tr><td class='selecttd'></td><td class='nametd'>" + AbisMessageResource["Name2"] + "</td><td class='desctd'>" + AbisMessageResource["Describe"] + "</td></tr>";
						var c="";					
						for(var i=0;i<data.length;i++)
							{							
							c=c+"<tr><td class='selecttd'><input type='radio' name='cfgdefid' value="+data[i].id+"></input></td><td class='nametd'><div id="+data[i].id+">"+data[i].name+"</div></td><td class='desctd'>"+data[i].des+"</td></tr>";
							}
						var t2="</table>";
				       $("#mainlist").html(t1+c+t2);				       
						$.dialog({
						    title: AbisMessageResource["SelectConfig"],
						    content: document.getElementById('showtable'),	   
						    okValue: AbisMessageResource['OK'],
						    cancelValue:AbisMessageResource['Cancel'],	 
						    ok: function () {setValue(type);},
						   cancel: function () {        
					        }
						});
						var nthis=this;
						function setValue(type)
						{
							var id=$("input[type='radio']:checked").val();							
							var name=$("#"+id).html();						
							$("input[name='"+type+"v']").val(id);						
							$("input[name='t"+type+"']").val(name);
						}				       
				    }
					else
					{
						DialogUtil.openSimpleDialog(AbisMessageResource.Alert["NotFindCorrespondConfig"]);
					}
			      }
	    	);
	}
	
	function selectMenuButton()
	{
		$.dialog({
		    title: AbisMessageResource["SelectMenuConfig"],
		    content: document.getElementById('menudialog'),	   
		    okValue: AbisMessageResource['OK'],
		    cancelValue:AbisMessageResource['Cancel'],	 
		    ok: function () {getselectMenu();},
		   cancel: function () {        
	        }
		});
	}
	function selectBiomButton()
	{
		$.dialog({
			title: AbisMessageResource["IntegratedAcquisitionConfig"],
			content: document.getElementById('biomdialog'),	   
			okValue: AbisMessageResource['OK'],
			cancelValue:AbisMessageResource['Cancel'],	 
			ok: function () {getselectBiom();},
			cancel: function () 
			{        
			}
		});
	}
	function selectPrintTPButton()
	{
		$.dialog({
			title: AbisMessageResource["SelectTPCardTemplate"],
			content: document.getElementById('printtpdialog'),	   
			okValue: AbisMessageResource['OK'],
			cancelValue:AbisMessageResource['Cancel'],	 
			ok: function () {getselectTP();},
			cancel: function () 
			{        
			}
		});
	}
	function selectPrintLPButton()
	{
		$.dialog({
			title: AbisMessageResource["SelectLPCardTemplate"],
			content: document.getElementById('printlpdialog'),	   
			okValue: AbisMessageResource['OK'],
			cancelValue:AbisMessageResource['Cancel'],	 
			ok: function () {getselectLP();},
			cancel: function () 
			{        
			}
		});
	}
	function selectPrintIdentifiButton()
	{
		$.dialog({
			title: AbisMessageResource["SelectCertificateTemplate"],
			content: document.getElementById('printidentifidialog'),	   
			okValue: AbisMessageResource['OK'],
			cancelValue:AbisMessageResource['Cancel'],	 
			ok: function () {getselectIdentifi();},
			cancel: function () 
			{        
			}
		});
	}
	
	function getselectMenu()
	{
		$("input[name='menu']:checked").each
		(
			function()
			{
				var name = $(this).parent().next().html();
				$("input[name='t40']").val(name);
				$("input[name='40v']").val($(this).val());
			}
		);
	}
	
	function getselectBiom()
	{
		$("input[name='biom']:checked").each(function(){
			var name=$(this).parent().next().html();
			$("input[name='t200']").val(name);
			$("input[name='200v']").val($(this).val());
		});
	}
	function getselectTP()
	{
		$("input[name='tpprint']:checked").each(function(){
			var name=$(this).parent().next().html();
			$("input[name='printtp']").val(name);
			$("input[name='printtpv']").val($(this).val());
		});
	}
	function getselectLP()
	{
		$("input[name='lpprint']:checked").each(function(){
			var name=$(this).parent().next().html();
			$("input[name='printcase']").val(name);
			$("input[name='printcasev']").val($(this).val());
		});
	}
	function getselectIdentifi()
	{
		$("input[name='idenprint']:checked").each(function(){
			var name=$(this).parent().next().html();
			$("input[name='printIdentifi']").val(name);
			$("input[name='printIdentifiv']").val($(this).val());
		});
	}
}

UserParamConfig.prototype.initText = function() 
{
/*	tp=WebUI.createText("t21","t21","WebTextField","",null);
	WebUI.createText("t23","t23","WebTextField","",null);
	WebUI.createText("t29","t29","WebTextField","",null);
	WebUI.createText("t25","t25","WebTextField","",null);
	WebUI.createText("t27","t27","WebTextField","",null);
	WebUI.createText("t22","t22","WebTextField","",null);
	WebUI.createText("t24","t24","WebTextField","",null);
	WebUI.createText("t30","t30","WebTextField","",null);
	WebUI.createText("t26","t26","WebTextField","",null);
	WebUI.createText("t28","t28","WebTextField","",null);
	WebUI.createText("printtp","printtpv","WebTextField","",null);
	WebUI.createText("printcase","printcasev","WebTextField","",null);
	WebUI.createText("selectMenu","selectMenuv","WebTextField","",null);*/
}

UserParamConfig.prototype.setParamConfig = function(defs) 
{	      		
	this.olddefs = defs;
	if(!WebUtil.isEmpty(defs))
	{
		for(var i=0;i<defs.length;i++)
		{
			var type	= defs[i].cfgType;
			var id		= defs[i].cfgId;
			var name  	= defs[i].cfgName;
			$("input[name='n" + type + "']").val(name);
			$("input[name='i" + type + "']").val(id);        				
		}
	}
}
UserParamConfig.prototype.getParamConfig = function() 
{
    this.prefCfgList=new Array();

	if(this.olddefs != null)
	{
		for(var i=0;i<this.olddefs.length;i++)
		{
			var type=this.olddefs[i].cfgType;	        			
			var id=this.olddefs[i].cfgId;
			var name  =this.olddefs[i].cfgName; 		
			var v=$("input[name='"+type+"v']").val(); 
			if(v==null||v=="")
			{
				var delcfg={};
				delcfg.id=this.olddefs[i].id;
				delcfg.userId=this.olddefs[i].userId;
				delcfg.userType=this.olddefs[i].userType;
				delcfg.moduleId=this.olddefs[i].moduleId;
				delcfg.cfgType=this.olddefs[i].cfgType;
				delcfg.cfgId=this.olddefs[i].cfgId;
				this.delPrefcfgList.push(delcfg);
			}
		}
	}	
	var id = $("input[name='"+CfgTypeCode.TPCARD_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.TP_TXT_INPUT;
		prefcfg.cfgType=CfgTypeCode.TPCARD_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='" + CfgTypeCode.TPCARD_UPDATE + "v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.TP_TXT_INPUT;
		prefcfg.cfgType=CfgTypeCode.TPCARD_UPDATE;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.LPCASE_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.LP_CASE_TXT_INPUT;
		prefcfg.cfgType=CfgTypeCode.LPCASE_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.LPCASE_UPDATE+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.LP_CASE_TXT_INPUT;
		prefcfg.cfgType=CfgTypeCode.LPCASE_UPDATE;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.WANTED_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_WANTED_INPUT;
		prefcfg.cfgType=CfgTypeCode.WANTED_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.WANTED_UPDATE+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_WANTED_EDIT;
		prefcfg.cfgType=CfgTypeCode.WANTED_UPDATE;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id=$("input[name='"+CfgTypeCode.CAPTURED_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_CAPTURE_INPUT;
		prefcfg.cfgType=CfgTypeCode.CAPTURED_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.CAPTURED_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_CAPTURE_INPUT;
		prefcfg.cfgType=CfgTypeCode.CAPTURED_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.CAPTURED_UPDATE+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_CAPTURE_EDIT;
		prefcfg.cfgType=CfgTypeCode.CAPTURED_UPDATE;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.TT_HITLOG_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_TT_HITLOG_INPUT;
		prefcfg.cfgType=CfgTypeCode.TT_HITLOG_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id = $("input[name='"+CfgTypeCode.TT_HITLOG_REQURIED+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_TT_HITLOG_INPUT;
		prefcfg.cfgType=CfgTypeCode.TT_HITLOG_REQURIED;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	id=$("input[name='"+CfgTypeCode.TT_HITLOG_UPDATE+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB_TT_HITLOG_EDIT;
		prefcfg.cfgType=CfgTypeCode.TT_HITLOG_UPDATE;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	
	id = $("input[name='" + CfgTypeCode.MENU + "v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg			= {};
		prefcfg.cfgId		= id;
		prefcfg.userType	= UserTypeCode.USER;
		prefcfg.moduleId	= UIModuleId.WEB;
		prefcfg.cfgType		= CfgTypeCode.MENU;
		
		this.prefCfgList.push(prefcfg);
	}
	
	id = $("input[name='"+CfgTypeCode.STD_INFO_COLLECT+"v']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.C_STD_INFO_COLLECT;
		prefcfg.cfgType=CfgTypeCode.STD_INFO_COLLECT;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	
	id = $("input[name='i30']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB;
		prefcfg.cfgType=CfgTypeCode.TPCARD_UPDATE;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	
	id = $("input[name='i200']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB;
		prefcfg.cfgType=CfgTypeCode.UNIFY_COLLECT_CFG;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}
	
	id = $("input[name='i40']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg			= {};
		prefcfg.cfgId		= id;
		prefcfg.userType	= UserTypeCode.USER;
		prefcfg.moduleId	= UIModuleId.WEB;
		prefcfg.cfgType		= CfgTypeCode.MENU;
		
		this.prefCfgList.push(prefcfg);
	}
	
	id = $("input[name='i202']").val();
	if(!WebUtil.isNull(id))
	{
		var prefcfg={};
		prefcfg.userType=UserTypeCode.USER;
		prefcfg.moduleId=UIModuleId.WEB;
		prefcfg.cfgType=CfgTypeCode.PORTAL_PAGE_CFG;
		prefcfg.cfgId=id;
		this.prefCfgList.push(prefcfg);
	}

	return this.prefCfgList;
}

UserParamConfig.prototype.getDelParamConfig = function() 
{	
	return this.delPrefcfgList;
}

UserParamConfig.prototype.getHomePageCfg = function() 
{	
	//var id  = this.hpTxt.getData("id");
	this.hpInfo = {};
	this.hpInfo.hpName  = $("input[name='n202']").val();
	var id  = $("input[name='i202']").val();
	if(this.hpInfo == null)
	{
		if(id != null)
		{			
			this.hpInfo.hpId = id;			
		}
	} 
	else
	{
		this.hpInfo.hpId = id;
	}
	return this.hpInfo;
}

UserParamConfig.prototype.clear = function() 
{	
	$("input[type='hidden']").val("");  
	$("input[type='text']").val("");  
}

UserParamConfig.prototype.initHomePageCfg = function()
{
	this.hpTxt 			= WebUI.createText("hp_txt", "hp_txt_id", "WebTextField", null, null);
	this.hpBorwseBnt	= WebUI.createWebButton("hp_borwse_bnt", WebUI.BntType.B_60_24, "", choose);
	this.hpDelBnt 		= WebUI.createWebButton("hp_del_bnt", WebUI.BntType.B_60_24, "", del);
	this.hpTxt.setEditable(false);
		
	if(this.hpInfo != null)
	{
		this.hpTxt.setValue(this.hpInfo.hpName);
	}
		
	var nThis = this;
	function choose(id)
	{
		var cols = new Array();
		cols.push("ID");
		cols.push("NAME");
		cols.push("DESCRIPTION");
		cols.push("CREATE_TIME");
		
		ABISWindowUtil.open("dialog","portal_page",cols,"NAME",AbisMessageResource["Name2"],AbisMessageResource["Search"],null,invoke,false,"ID",1);
		
		function invoke(row)
		{
			var hpId = row[0]["ID"];
			var hpName = row[0]["NAME"];
			nThis.hpTxt.setValue(hpName);
			nThis.hpTxt.setData("id",hpId);
		}
	}
		
	function del(id)
	{
		nThis.hpTxt.setValue("");
		nThis.hpTxt.setData("id",null);
	}
}

