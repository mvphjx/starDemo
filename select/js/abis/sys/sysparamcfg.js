
SysParamCfg.prototype.sysParamObj	= null;

function SysParamCfg(sysParamObj)
{
	this.texts			= {};
	this.sysParamObj	= sysParamObj;
	this.init();
}

SysParamCfg.prototype.init = function()
{
	this.initSysParam();
	
	this.initDefaultMenu();
	
	this.initHPBind();
	
	this.initDefaultHP();
	
	this.initSaveEvent();
}

SysParamCfg.prototype.initSysParam = function()
{
	if(this.sysParamObj == null)return;
	var sysParams = this.sysParamObj.sysParams;
	
	if(WebUtil.isEmpty(sysParams)) return;
	
	for(var i in sysParams)
	{
		var grp = sysParams[i];
		
		// 创建分组并设置分组标题
		var itemGrp = $("#item_grp").clone(true);	
		var itemTitle = itemGrp.find(".title");
		itemTitle.html(grp.title);
		itemGrp.attr("id","item_grp_" + i);
		$("#cfg_grps").append(itemGrp);
		
		if(WebUtil.isEmpty(grp.cfgs))continue;
		
		for(var c in grp.cfgs)
		{
			// 配置对象
			var cfg = grp.cfgs[c];
			
			// 克隆
			var cfgItem 	= $("#cfg_item").clone(true);
			var cfgName 	= cfgItem.find("#cfg_name");
			var cfgText 	= cfgItem.find("#cfg_text");
			var borwseBnt	= cfgItem.find("#cfg_borwse_bnt");
			var delBnt		= cfgItem.find("#cfg_del_bnt");
			
			var cfgId		= "cfg_item_" 		+ cfg.cfgType;
			var cfgNameId 	= "cfg_name_" 		+ cfg.cfgType;
			var cfgTextId	= "cfg_text_" 		+ cfg.cfgType;
			var borwseBntId	= "cfg_borwse_bnt_" + cfg.cfgType;
			var delBntId	= "cfg_del_bnt_"		+ cfg.cfgType;
			
			// 修改标识符
			cfgItem.attr("id",cfgId);
			cfgName.attr("id",cfgNameId);
			cfgText.attr("id",cfgTextId);
			borwseBnt.attr("id",borwseBntId);
			delBnt.attr("id",delBntId);
			
			// 添加配置项
			itemGrp.append(cfgItem);
			
			cfgName.html(cfg.labName);
			var cfgTxt 		= WebUI.createText(cfgTextId, cfgTextId + " _txt", "WebTextField", null, null);
			var borwseBnt 	= WebUI.createWebButton(borwseBntId, WebUI.BntType.B_60_24, "", choose);
			var delBnt 		= WebUI.createWebButton(delBntId, WebUI.BntType.B_60_24, "", del);
			
			cfgTxt.setValue(cfg.cfgName);
			cfgTxt.setData("id",cfg.cfgId);
			cfgTxt.setEditable(false);
			
			this.texts[cfg.cfgType] = cfgTxt;
			
			cfgItem.show();
		}
		itemGrp.show();
	}
	
	var nThis = this;
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
			var text	= nThis.texts[cfgType];
			text.setData("id",cfgId);
			text.setValue(cfgName);
		}
	}
	
	function del(id)
	{
		var ps = id.split("_");
		var cfgType = ps[ps.length - 1];
		var text	= nThis.texts[cfgType];
		text.setData("id",null);
		text.setValue("");
	}
}

SysParamCfg.prototype.initDefaultMenu = function()
{
	var menuInfo = this.sysParamObj.menuInfo;
	
	var nThis = this;
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
			nThis.menuTxt.setValue(menuName);
			nThis.menuTxt.setData("id",menuId);
			nThis.menuTxt.setData("name",menuName);
		}
	}

	function delMenu()
	{
		nThis.menuTxt.setValue("");
		nThis.menuTxt.setData("id",null);
		nThis.menuTxt.setData("name",null);
	}
	this.menuTxt		= WebUI.createText("menu_txt", "menu_txt_id", "WebTextField", null, null);
	this.menuBorwseBnt 	= WebUI.createWebButton("menu_bnt_borwse", WebUI.BntType.B_60_24, "", chooseMenu);
	this.menuDelBnt 	= WebUI.createWebButton("menu_bnt_del", WebUI.BntType.B_60_24, "", delMenu);
	this.menuTxt.setEditable(false);
	
	if(menuInfo != null)
	{
		this.menuTxt.setValue(menuInfo.menuName);
	}
}


SysParamCfg.prototype.initHPBind = function()
{
	if(this.sysParamObj == null) return;
	var hpCfgInfo = this.sysParamObj.hpCfgInfo;
	var hpCfgs	= hpCfgInfo.hps; 
	if(hpCfgs == null) return;
	
	this.cfgTxts = {};
	
	var body = $("#hp_grp").find(".body");
	
	for(var c in hpCfgs)
	{
		// 配置对象
		var cfg = hpCfgs[c];
		
		// 克隆
		var cfgItem 	= $("#hp_item").clone(true);
		var cfgName 	= cfgItem.find("#hp_name");
		var cfgText 	= cfgItem.find("#hp_text");
		var borwseBnt	= cfgItem.find("#hp_borwse_bnt");
		var delBnt		= cfgItem.find("#hp_del_bnt");
		
		// 定义新的标识符ID
		var cfgId		= "hp_item_" 		+ cfg.pageId;
		var cfgNameId 	= "hp_name_" 		+ cfg.pageId;
		var cfgTextId	= "hp_text_" 		+ cfg.pageId;
		var borwseBntId	= "hp_borwse_bnt_" 	+ cfg.pageId;
		var delBntId	= "hp_del_bnt_"		+ cfg.pageId;
		
		// 修改标识符
		cfgItem.attr("id",cfgId);
		cfgName.attr("id",cfgNameId);
		cfgText.attr("id",cfgTextId);
		borwseBnt.attr("id",borwseBntId);
		delBnt.attr("id",delBntId);
		
		// 添加配置项
		body.append(cfgItem);
		
		var cfgTxt 		= WebUI.createText(cfgTextId, cfgTextId + " _txt", "WebTextField", null, null);
		var borwseBnt 	= WebUI.createWebButton(borwseBntId, WebUI.BntType.B_60_24, "", choose);
		var delBnt 		= WebUI.createWebButton(delBntId, WebUI.BntType.B_60_24, "", del);
		cfgTxt.setEditable(false);
		
		this.cfgTxts[cfgTextId] = cfgTxt;
		
		// 赋初始值
		cfgName.html(cfg.pageName);
		cfgTxt.setValue(cfg.colCfgName);
		
		// 显示
		cfgItem.show();
	}

	var nThis = this;
	function choose(id)
	{
		var ps = id.split("_");
		var pageId = ps[ps.length - 1];
		
		var cols = new Array();
		cols.push(PortalColumnCfgCol.ID);
		cols.push(PortalColumnCfgCol.NAME);
		cols.push(PortalColumnCfgCol.DESCRIPTION);
		cols.push(PortalColumnCfgCol.CREATE_TIME);
		ABISWindowUtil.open("dialog","portal_column_cfg",cols,PortalColumnCfgCol.NAME,AbisMessageResource["Name2"],AbisMessageResource["Search"],null,invoke,false,PortalColumnCfgCol.ID,1);
		
		function invoke(row)
		{
			var cfgId = row[0][PortalColumnCfgCol.ID];
			var cfgName = row[0][PortalColumnCfgCol.NAME];
			nThis.updateItem(pageId,cfgId,cfgName);
		}
	}
	
	function del(id)
	{
		var ps = id.split("_");
		var pageId = ps[ps.length - 1];
		for(var c in hpCfgs)
		{
			var cfg = hpCfgs[c];
			if(cfg.pageId == pageId)
			{
				cfg.colCfgId = null;
				cfg.colCfgName = null;
				var cfgTextId	= "hp_text_" + cfg.pageId;
				var txt = nThis.cfgTxts[cfgTextId];
				txt.setValue("");
			}
		}
	}
	
	this.updateItem = function(pageId,cfgId,cfgName)
	{
		for(var c in hpCfgs)
		{
			var cfg = hpCfgs[c];
			if(cfg.pageId == pageId)
			{
				cfg.colCfgId 	= cfgId;
				cfg.colCfgName 	= cfgName;
				var cfgTextId	= "hp_text_" + cfg.pageId;
				var text 		= this.cfgTxts[cfgTextId];
				text.setValue(cfgName);
			}
		}
	}
}

SysParamCfg.prototype.initDefaultHP = function()
{
	var hpCfgInfo = this.sysParamObj.hpCfgInfo;
	
	var nThis = this;
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
			nThis.hpTxt.setValue(pageName);
			nThis.hpTxt.setData("id",pageId);
			if(hpCfgInfo.hpInfo == null) hpCfgInfo.hpInfo = {};
			hpCfgInfo.hpInfo.hpId = pageId;
		}
	}

	function delHp()
	{
		nThis.hpTxt.setValue("");
		if(hpCfgInfo.hpInfo != null)
		{
			hpCfgInfo.hpInfo.hpId = null;
		}
	}
	this.hpTxt		 	= WebUI.createText("def_hp_txt", "homepage_txt_txt", "WebTextField", null, null);
	this.hpBorwseBnt 	= WebUI.createWebButton("def_hp_bnt_borwse", WebUI.BntType.B_60_24, "", chooseHp);
	this.hpDelBnt 		= WebUI.createWebButton("def_hp_bnt_del", WebUI.BntType.B_60_24, "", delHp);
	this.hpTxt.setEditable(false);
	
	if(hpCfgInfo.hpInfo != null)
	{
		this.hpTxt.setValue(hpCfgInfo.hpInfo.hpName);
	}
}

SysParamCfg.prototype.initSaveEvent = function()
{
	var nThis = this;
	
	this.saveBnt = WebUI.createWebButton("save",WebUI.BntType.B_100_28,"",save);
	
	function save()
	{
		var sysParams = nThis.sysParamObj.sysParams;
		
		// 系统参数赋值
		for(var cfgType in nThis.texts)
		{
			var text = nThis.texts[cfgType];
			for(var i in sysParams)
			{
				var grp = sysParams[i];
				for(var c in grp.cfgs)
				{
					var cfg = grp.cfgs[c];
					if(cfg.cfgType == cfgType)
					{
						cfg.cfgId	= text.getData("id");
					}
				}
			}
		}
		
		// 默认菜单
		var newId 	= nThis.menuTxt.getData("id");
		var newName = nThis.menuTxt.getData("name");
		if(newId != null)
		{
			var menuInfo = nThis.sysParamObj.menuInfo;
			if(menuInfo == null) 
			{
				menuInfo = {};
				menuInfo.menuId = newId;
				menuInfo.menuName = newName
				nThis.sysParamObj.menuInfo = menuInfo;
			}
			else
			{
				if(newId == menuInfo.menuId)
				{
					// 认为菜单无变化，不需要提交
					nThis.sysParamObj.menuInfo = null;
					alert(AbisMessageResource["NoChange"]);
				}
				else
				{
					menuInfo.menuId = newId;
					menuInfo.menuName = newName;
				}
			}
		}
		
		// 保存
		var jsonData =  $.toJSON(nThis.sysParamObj);
		var url = WebVar.VarPath + "/sys/paramcfg/save"
		$.ajax
		( 
	        {
				type 		: 'POST',
				contentType : 'application/json',
				url 		: url,
				data 		: jsonData,
				dataType 	: 'json',
				success 	: function(data) 
				{   
					WebUtil.NoWait();
					if(data.status == "ok")
					{
						window.location.reload();
					}
					else
					{
						alert(data.msg);
					}
				},   
				error : function(e) 
				{
					WebUtil.NoWait();
				}
			}
		);
	}
	
}