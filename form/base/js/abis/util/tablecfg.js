

TableConfig.prototype.table 	= null;
TableConfig.prototype.isCreate 	= false;
TableConfig.prototype.moduleId 	= null;
TableConfig.prototype.cfgType 	= null;
TableConfig.prototype.tableName = null;
TableConfig.prototype.invoke	= null;
TableConfig.prototype.defaultCols	= null;

function TableConfig (moduleId,cfgType,tableName,invoke, defaultCols) 
{
	this.moduleId 	= moduleId;
	this.cfgType	= cfgType;
	this.tableName 	= tableName;
	this.invoke	 	= invoke;
	this.defaultCols = defaultCols;
}

TableConfig.prototype.open = function()
{
	if(!this.isCreate)
	{
		this.create();
		this.isCreate = true;
	}
	this.show();
}

TableConfig.prototype.create = function()
{
	WebUI.createWebButton("TopBnt",WebUI.BntType.B_60_24,null,top);
	WebUI.createWebButton("UpBnt",WebUI.BntType.B_60_24,null,up);
	WebUI.createWebButton("DownBnt",WebUI.BntType.B_60_24,null,down);
	WebUI.createWebButton("EndBnt",WebUI.BntType.B_60_24,null,bottom);
	
	var setting = 
	{
		isCheck		: true,
		canSort		: false,
		multiSelect : false
	};
	
	this.table = new WebTable("ColTable",setting);
	var nThis = this;
	function top()
	{
		nThis.table.top();
	}
	
	function up()
	{
		nThis.table.up();
	}
	
	function down()
	{
		nThis.table.down();
	}
	
	function bottom()
	{
		nThis.table.bottom();
	}

	var param = 
	{
		moduleId	: this.moduleId,
		cfgType		: this.cfgType,
		tableName	: this.tableName,
		defaultCols : this.defaultCols
	};
	
	var jsonData 	= $.toJSON(param);
	var url 		= WebVar.VarPath + "/tblcfg/";
 	var nThis 		= this;
 	
 	jQuery.ajax
 	(
        {
			type 		: 'POST',
			contentType : 'application/json',
			url 		: url,
			data 		: jsonData,
			dataType 	: 'json',
			success 	: function(data)
			{
				nThis.table.setInput(data.input);
			}
        }
 	);
}

TableConfig.prototype.show = function()
{
	var nThis = this;
	
	$.dialog
	({
	    title: AbisMessageResource["ListConfig"],
	    content: document.getElementById('TableConfigPage'),
	    okValue: AbisMessageResource['OK'],
		cancelValue: AbisMessageResource['Cancel'],	 
	    ok: function () 
	    {
	    	ok();
	    },
	    cancel: function () 
	    {        
	    }
	});
	
	function ok()
	{
		var items = nThis.table.getCheckItems();
		if(WebUtil.isEmpty(items))
		{
			alert(AbisMessageResource.Alert["SelectAtLeastOneColSearch"]);
			return;
		}
		var columns = new Array();
		for(var i in items)
		{
			var item = items[i];
			var c 	= {};
			c.name 	= item.ColName;
			c.width = item.ColWidth;
			columns.push(c);
		}

		var param = 
		{
				moduleId	: nThis.moduleId,
				cfgType		: nThis.cfgType,
				columns		: columns
		};
		
		var jsonData  = $.toJSON(param);
		
		var url 	= WebVar.VarPath + "/tblcfg/save";
	 	jQuery.ajax
	 	( 
	        {
				type 		: 'POST',
				contentType : 'application/json',
				url 		: url,
				data 		: jsonData,
				dataType 	: 'json',
				success 	: function(data) 
				{
					if(data.status == "ok")
					{
						if(WebUtil.isFunction(nThis.invoke))
						{
							nThis.invoke();
						}
					}
					else
					{
						alert(AbisMessageResource.Alert["SaveListConfigFailed"]);
					}
				}
	        }
	 	);
	}
}