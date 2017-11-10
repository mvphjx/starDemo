
StdCollectCfg.prototype.std_module 		= null;
StdCollectCfg.prototype.std_person_item = null;
StdCollectCfg.prototype.std_init_param	= null;
StdCollectCfg.prototype.requriedId 		= null;
StdCollectCfg.prototype.btyCfgId 		= null;

function StdCollectCfg(std_module,std_person_item,std_init_param)
{
	this.std_module 		= std_module;
	this.std_person_item 	= std_person_item;
	this.std_init_param		= std_init_param;
	this.init();
	this.initValue();
}

StdCollectCfg.prototype.initValue = function()
{
	if(this.std_init_param != null)
	{
		this.reqTxt.setValue(this.std_init_param.reqTxtName);
		this.btyTxt.setValue(this.std_init_param.collectItemName);
		this.cfg_name_txt.setValue(this.std_init_param.name);
		this.cfg_desc_txt.setValue(this.std_init_param.desc);
		
		var cfg = this.std_init_param.cfg;
		if(cfg != null)
		{
			this.requriedId = cfg.txtCfgId;
			this.btyCfgId	= cfg.btyCfgId;
			
			if(!WebUtil.isEmpty(cfg.modules))
			{
				for(var i in cfg.modules)
				{
					var code = cfg.modules[i];
					this.module_checks.setSelected(code,true);
				}
			}
			
			var nThis = this;
			if(!WebUtil.isEmpty(cfg.collectItems))
			{
				
				var list = new Array();
				
				for(var i in cfg.collectItems)
				{
					var code = cfg.collectItems[i];
					
					// 删除
					$('#person_all_item option').each
					(
						function(i)
						{
							if($(this).val() == code)
							{
								
								$(this).remove();
								return;
							}
					    }
					);
					
					// 添加
					for(var k in this.std_person_item)
					{
						var item  = this.std_person_item[k];
						if(item.code == code)
						{
							list.push(item);
						}
					}
				}
				
				if(!WebUtil.isEmpty(list))
				{
					this.addItem($("#person_check_item"),list);
				}
			}
		}
		
	}
}

StdCollectCfg.prototype.init = function()
{
	this.reqTxt = WebUI.createText("requried_txt", "requried_txt_id", "WebTextField", null, null);
	this.reqBnt = WebUI.createWebButton("requried_bnt", WebUI.BntType.B_60_24, "", req);
	this.reqTxt.setEditable(false);
	
	this.btyTxt = WebUI.createText("bty_txt", "bty_txt_id", "WebTextField", null, null);
	this.btyBnt = WebUI.createWebButton("bty_bnt", WebUI.BntType.B_60_24, "", bty);
	this.btyTxt.setEditable(false);
	
	this.cfg_name_txt = WebUI.createText("cfg_name_txt", "cfg_name_txt_id", "WebTextField", null, null);
	this.cfg_desc_txt = WebUI.createMulText("cfg_desc_txt", "cfg_desc_txt_id", "WebTextArea_W200", null, null);
	
	this.saveBnt = WebUI.createWebButton("save",WebUI.BntType.B_100_28,"",save);
	
	var nThis = this;
	
	function save()
	{
		nThis.save();
	}
	
	function req()
	{
		var cols = new Array();
		cols.push(UserPrefDefCol.ID);
		cols.push(UserPrefDefCol.NAME);
		cols.push(UserPrefDefCol.DESCRIPTION);
		cols.push(UserPrefDefCol.CREATE_TIME);
		
		var wheres 		= new Array();
		var where 		= {};
		where.colName 	= UserPrefDefCol.TYPE;
		where.dataType 	= ABISCode.StorageDataType.NUMBER;
		where.value1	= CfgTypeCode.TPCARD_REQURIED;
		wheres.push(where);
		ABISWindowUtil.open("d1","USER_PREF_DEF",cols,UserPrefDefCol.NAME,AbisMessageResource["Name2"],AbisMessageResource["Search"],wheres,invoke,false,UserPrefDefCol.ID,1);
		
		function invoke(row)
		{
			nThis.requriedId = row[0][UserPrefDefCol.ID];
			var name = row[0][UserPrefDefCol.NAME];
			nThis.reqTxt.setValue(name);
		}
	}

	function bty()
	{
		var cols = new Array();
		cols.push(UserPrefDefCol.ID);
		cols.push(UserPrefDefCol.NAME);
		cols.push(UserPrefDefCol.DESCRIPTION);
		cols.push(UserPrefDefCol.CREATE_TIME);
		
		var wheres 		= new Array();
		var where 		= {};
		where.colName 	= UserPrefDefCol.TYPE;
		where.dataType 	= ABISCode.StorageDataType.NUMBER;
		where.value1	= CfgTypeCode.BTY_COLLECT_ITEM;
		wheres.push(where);
		ABISWindowUtil.open("d1","USER_PREF_DEF",cols,UserPrefDefCol.NAME,AbisMessageResource["Name2"],AbisMessageResource["Search"],wheres,invoke,false,UserPrefDefCol.ID,1);
		
		function invoke(row)
		{
			nThis.btyCfgId = row[0][UserPrefDefCol.ID];
			var name = row[0][UserPrefDefCol.NAME];
			nThis.btyTxt.setValue(name);
		}
	}
	
	// 采集类别
	var data = new Array();
	
	if(this.std_module != null)
	{
		for(var c in this.std_module)
		{
			var code 	= this.std_module[c];
			var d 		= {};
			d.id 		= code.code;
			d.text 		= code.text;
			d.enabled 	= true;
			data.push(d);
		}
	}

	var s = 
	{
		param:		{colCount:2}
	}
	this.module_checks = new CheckBnt("modules",data,s);

	
	// 人员采集项
	if(this.std_person_item != null)
	{
		var list = $("#person_all_item");
		
		this.addItem(list,this.std_person_item);
		
	}
	
	$("#leftbnt").click(function()
	{
		var obj =   $("#person_all_item").find("option:selected");
		var addList = new Array();
		for(var i in obj )
		{
			var o = obj[i];
			if(o == null || o.value == null)continue;
		
			for(var i in nThis.std_person_item)
			{
				var c = nThis.std_person_item[i];
				if(c.code == o.value)
				{
					addList.push(c);
					break;
				}
			}
			
			$('#person_all_item option').each
			(
				function()
				{
					if( $(this).val() == o.value)
					{
						$(this).remove();
					}
			    }
			);
		}
		
		var list = $("#person_check_item");
		nThis.addItem(list,addList);
	});
	
	$("#rightbnt").click(function()
	{
		var obj =   $("#person_check_item").find("option:selected");
		var addList = new Array();
		for(var i in obj )
		{
			var o = obj[i];
			if(o == null || o.value == null)continue;
		
			for(var i in nThis.std_person_item)
			{
				var c = nThis.std_person_item[i];
				if(c.code == o.value)
				{
					addList.push(c);
					break;
				}
			}
		}
		$('#person_all_item option:selected').remove(); 
		var list = $("#person_all_item");
		nThis.addItem(list,addList);
	});
	
	$("#upbnt").click(function()
	{
		var list = $('#person_check_item');
		
		if(null == list.val())
		{ 
			alert(AbisMessageResource["PleaseSelectOne"]); 
			return false; 
		} 
		//选中的索引,从0开始 
		var optionIndex = list.get(0).selectedIndex; 
		//如果选中的不在最上面,表示可以移动 
		if(optionIndex > 0)
		{ 
			$('#person_check_item option:selected').insertBefore($('#person_check_item option:selected').prev('option'));
		}
	});

	$("#downbnt").click(function()
	{
		var list = $('#person_check_item');
		
		if(null == list.val())
		{ 
			alert(AbisMessageResource["PleaseSelectOne"]); 
			return false; 
		} 
		var optionLength = list[0].options.length; 
		
		//选中的索引,从0开始 
		var optionIndex = list.get(0).selectedIndex; 
		
		//如果选中的不在最上面,表示可以移动 
		if(optionIndex < (optionLength -1 ))
		{ 
			$('#person_check_item option:selected').insertAfter($('#person_check_item option:selected').next('option'));
		}
	});
}

StdCollectCfg.prototype.addItem = function(list,modules)
{
	for(var i in modules)
	{
		var item  = modules[i];
		var option = $("<option value='" + item.code + "'>" + item.text + "</option>");
		list.append(option);
	}
}

StdCollectCfg.prototype.save = function()
{
	var obj = {};
	if(this.std_init_param != null)
	{
		obj = this.std_init_param;
	}
	var cfg			= {};
	cfg.txtCfgId	= this.requriedId;
	cfg.btyCfgId	= this.btyCfgId;
	cfg.modules 	= new Array();
	cfg.collectItems= new Array();
	
	obj.cfg 		= cfg;
	obj.name 		= this.cfg_name_txt.getValue();
	obj.desc 		= this.cfg_desc_txt.getValue();
	
	var ds = this.module_checks.getSelectData();
	for(var i in ds)
	{
		var o = ds[i];
		if(o == null) continue;
		cfg.modules.push(o.id);
	}
	
	$("#person_check_item option").each
	(
		function()
		{
			cfg.collectItems.push($(this).val());
		}
	); 
	
	var jsonData =  $.toJSON(obj);
	var url = WebVar.VarPath + "/sys/stdcfg/save"
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
					if(WebUtil.isFunction(window.opener.refresh) == true)
					{
						window.opener.refresh();
					}
					alert(data.msg);
					
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
