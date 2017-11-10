
PortalColumnCfg.prototype.cfgObj = null;

function PortalColumnCfg(cvId,colObjs,cfgObj)
{
	this.cvId 		= cvId;
	this.colObjs 	= colObjs;
	this.cfgObj	= cfgObj;
	this.init();
}

PortalColumnCfg.prototype.init = function()
{
	var param = {};
	param.onDelete = del;
	this.canvas = new ColumnCanvas(this.cvId,param);
	this.initLayout();
	this.initEvent();
	this.initColumn();
	
	var nThis = this;
	function del(id)
	{
		for(var i = 0; i < nThis.colObjs.length; i++)
		{
			var obj = nThis.colObjs[i];
			if(id == obj.id)
			{
				nThis.crtFrame(obj);
			}
		}
	}
	
	this.name	= WebUI.createText("cfgName","cfgname","WebTextField","",null);
	this.desc 	= WebUI.createMulText("cfgDesc","cfgdesctxt","WebTextArea","",null);
	this.submit = WebUI.createWebButton("submit",WebUI.BntType.B_120_32, "submit_bnt", submit);
	
	function submit()
	{
		nThis.save();
	}
	
	this.save  = function()
	{
	
		var name = this.name.getValue();
		var desc = this.desc.getValue();
		var rs = this.canvas.getRects();
		
		if(WebUtil.isNull(name))
		{
			DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["PleaseFillInConfigName"]);
			return;
		}
		if(WebUtil.isEmpty(rs))
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["HaveNoConfigColCannotCreate"]);
			return;
		}
		
		// 创建配置内容
		var content 	= {};
		content.width 	= this.canvas.getWidth();
		content.height 	= this.canvas.getHeight();
		content.cols 	= new Array();
		for(var i in rs)
		{
			var r 	= rs[i];
			var b 	= r.getRelativeBounds();
			b.id 	= r.getId();
			content.cols.push(b);
		}
		
		var isNew = this.cfgObj == null;
		
		var cfg = null;
		if(isNew == true)
		{
			cfg = {};
		}
		else
		{
			cfg = this.cfgObj;
		}
		cfg.name 	= name;
		cfg.desc 	= desc;
		cfg.content = content;
		
		var data = $.toJSON(cfg);
		var url = WebVar.VarPath + "/sys/portalcolcfgmgr/save";
		
		WebUtil.Wait();
		
		var nThis = this;
		
		jQuery.ajax
		({
			type 		: 'POST',
			contentType : 'application/json',
			dataType 	: 'json',
			url 		: url,
			data 		: data,
			success 	: function(d) 
			{
				WebUtil.NoWait();
				if(d.status == "ok")
				{
					if(isNew == true)
					{
						nThis.canvas.clear();
						nThis.name.clear();
						nThis.desc.clear();
						nThis.initColumn();
                        DialogUtil.openSimpleDialogForOcx(AbisMessageResource['CreateSuccess']);
					}
					else
					{
                        DialogUtil.openSimpleDialogForOcx(AbisMessageResource['SaveSuccess']);
					}
				}
				else
				{
                    DialogUtil.openSimpleDialogForOcx(d.msg);
				}
			},
			error : function(e) 
			{
				WebUtil.NoWait();
                DialogUtil.openSimpleDialogForOcx(e);
			}
		});
	}
	
	if(this.cfgObj != null)
	{
		// 当前模式为编辑模式
		this.name.setValue(this.cfgObj.name);
		this.name.setEditable(false);
		this.desc.setValue(this.cfgObj.desc);
		
		// 初始化栏目
		if(this.cfgObj.content != null)
		{
			if(!WebUtil.isEmpty(this.cfgObj.content.cols))
			{
				var w = this.cfgObj.content.width;
				var h = this.cfgObj.content.height;
				this.canvas.setHeight(h);
				for(var i in this.cfgObj.content.cols)
				{
					var col = this.cfgObj.content.cols[i];
					this.createColumn(col.id,col);
				}
			}
		}
	}
}

PortalColumnCfg.prototype.initLayout = function()
{
	var h = WebUtil.getContentHeight() - 3;
	$(".left_part").height(h);
	$(".right_part").height(h);
}

PortalColumnCfg.prototype.initEvent = function()
{
	var nThis = this;
	$(window).resize(function(){
		nThis.initLayout();	
	});
}

PortalColumnCfg.prototype.initColumn = function()
{
	var objs = $("#navi").children();
	for(var i = 0;i < objs.length; i++)
	{
		var obj = objs[i];
		$(obj).remove();
	}
	
	for(var i = 0; i < this.colObjs.length; i++)
	{
		var obj = this.colObjs[i];
		this.crtFrame(obj);
	}
}

PortalColumnCfg.prototype.crtFrame = function(obj)
{
	var item = $("#item").clone();
	item.attr("id",obj.id);
	item.find(".text").html(obj.name);
	item.bind("selectstart", function(){return false});
	$("#navi").append(item);
	item.show();
	
	var nThis = this;
	item.dblclick(function(){
		nThis.createColumn(this.id);
	});
}

PortalColumnCfg.prototype.createColumn = function(id,cfg)
{
	var obj = null;
	for(var i=0;i<this.colObjs.length;i++)
	{
		var o = this.colObjs[i];
		if(o.id == id)
		{
			obj = o;
			break;
		}
	}
	if(obj == null) return;
	
	var param 	= {};
	param.id 	= id;
	param.obj 	= obj;
	param.cfg	= cfg;
	
	var cr = new ColRect(this.canvas,param);
	var item = $("#" + id);
	item.remove();
	
}
