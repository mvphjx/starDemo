

function SoftwareMgr(param)
{	
	this.param = param;
	this.init();
}

SoftwareMgr.prototype.init = function()
{
	this.registerWindowSizeEvent();
	this.initButton();
	this.initNavigate();
	this.initTable();
	
	var nThis = this;
	$("#HideFrame").load
	(
		function()
		{
			// 去除file中的文本路径
			var objFile = document.getElementsByName('file')[0];
			objFile.outerHTML = objFile.outerHTML.replace(/(value=\").+\"/i,"$1\"");
			 
			$("input[name='fileName']").val("");
			$("#fileDesc").text("");
			nThis.refresh();
		}
	);
}

SoftwareMgr.prototype.registerWindowSizeEvent = function()
{
	var nThis = this;
	$(window).resize(function(){
		nThis.updateLayout();
	});
	this.updateLayout();
}

SoftwareMgr.prototype.updateLayout = function()
{
	var h = WebUtil.getContentHeight();
	var border = 2 + 2 + 2;
	$("#Navi_Area").height(h - border);
}

SoftwareMgr.prototype.refresh = function()
{
	this.tblMgr.refresh();
}

SoftwareMgr.prototype.initButton = function()
{
	WebUI.createLinkButton("add",LinkButtonCfg.Add,add);
	WebUI.createLinkButton("update",LinkButtonCfg.Update,update);
	WebUI.createLinkButton("del",LinkButtonCfg.Del,del);
	WebUI.createLinkButton("download",LinkButtonCfg.Download,download);
	WebUI.createLinkButton("refresh",LinkButtonCfg.Refresh,refresh);
	
	var nThis = this;
	function add()
	{
		// 添加操作将ID设置为NULL
		$("input[name='id']").val("");
		nThis.upload();
	}
	
	function update()
	{
		// 更新操作将ID设置为当前选择的ID
		var row = nThis.tblMgr.getTable().getSelectItem();
		if(!WebUtil.isEmpty(row))
		{
			$("input[name='id']").val(row.ID);
			//编辑页面值初始化
			var table = $("#upload_panel");
			var file = table.find("[name='file']");
			var fileName = table.find("[name='fileName']");
			var fileDesc = table.find("[name='fileDesc']");
			var type = table.find("[name='type']");
			var id = table.find("[name='xxxx']");
			//file.val(node[""]);
			fileName.val(row.NAME);
			fileDesc.val(row.DESCRIPTION);
			type.val(row.TYPE);
			//编辑页面值初始化 end
		}
		nThis.upload();
	}
	
	function del()
	{
		nThis.delConfig();
	}
	
	function download()
	{
		var row = nThis.tblMgr.getTable().getSelectItem();
		if(WebUtil.isEmpty(row))
		{
			alert(AbisMessageResource.Alert["NoDownloadSelected"]);
			return;
		}
		window.open(WebVar.VarPath + "/sys/softwaremgr/" + row.ID, "_blank");
	}
	
	function refresh()
	{
		nThis.tblMgr.refresh();
	}
	
}

SoftwareMgr.prototype.upload = function()
{
	var nodes = this.tree.getSelectedNodes();
	if(WebUtil.isEmpty(nodes)) 
	{
		alert(AbisMessageResource.Alert["LackSoftwareTypeCanNotUpload"]);
		return;
	}
	var node = nodes[0];

	$.dialog
	({
	    title		: node.name,
	    content		: document.getElementById('upload_panel'),
	    okValue		: AbisMessageResource["UpLoad2"],
		cancelValue	: AbisMessageResource['Cancel'],	 
	    ok: function () 
	    {
	    	return ok();
	    },
	    cancel: function () 
	    {        
	    }
	});
	
	var nThis = this;
	function ok()
	{
		// 验证数据有效性
		var filePath	= $("input[name='file']").val();
		var cfgName		= $("input[name='fileName']").val();
		var cfgType		= $("input[name='fileDesc']").val();
		var desc		= $("#desc").text();
		
		if(WebUtil.isEmpty(filePath))
		{
			alert(AbisMessageResource.Alert["PleaseChooseUploadFile"]);
			return false;
		}
		if(WebUtil.isEmpty(cfgName))
		{
			alert(AbisMessageResource.Alert["PleaseFillInUploadFileName"]);
			return false;
		}
		var len = WebUtil.getLength(cfgName);
		if(len > 60)
		{
			alert(AbisMessageResource.Alert["FileNameLenTip"]);
			return false;
		}
		len = WebUtil.getLength(desc);
		if(len > 200)
		{
			alert(AbisMessageResource.Alert["FileDescLenTip"]);
			return false;
		}
		var f = document.getElementById("upload_form");
		f.submit();
		return true;
	}
}

SoftwareMgr.prototype.delConfig = function()
{
	var rows = this.tblMgr.getTable().getSelectItems();
	if(WebUtil.isEmpty(rows))
	{
		alert(AbisMessageResource.Alert["PleaseSelectDataItemToDelete"]);
		return;
	}
	
	this.language = this.param.language;
	
	var nThis = this;
	var b = confirm(this.language.isDel);
	if(b)
   	{
		var ids = new Array();
		for(var i in rows)
		{
			 var row = rows[i];
			 ids.push(parseInt(row.ID));
		}
		
		var url = WebVar.VarPath + "/sys/softwaremgr/delete";
		var data = $.toJSON(ids);
		WebUtil.Wait();
		jQuery.ajax
		({
			type 		: 'POST',
			contentType : 'application/json',
			dataType 	: 'json',
			url 		: url,
			data 		: data,
			success 	: function(data) 
			{
				WebUtil.NoWait();
				if(data.status == "ok")
				{
					nThis.tblMgr.getTable().deleteSelectRow();
					nThis.tblMgr.refresh();
				}
				else
				{
					alert(data.msg);
				}
			},
			error : function(e) 
			{
				WebUtil.NoWait();
				alert(e);
			}
		});
   	}
}

SoftwareMgr.prototype.initNavigate = function()
{
	if(this.param.naviData == null)return;
	
	var settings =
	{
	    data :
	    {
		    simpleData :
		    {
			    enable : true
		    }
	    },
	    callback :
	    {
	        beforeClick : beforeClick,
	        onClick : onClick
	    }
	};
	
	var nThis = this;	
	function beforeClick(treeId, treeNode, clickFlag)
	{
		return true;
	}

	function onClick(event, treeId, treeNode, clickFlag)
	{
		if(treeNode.id == null)return;
		nThis.setTitle(treeNode.name);
		nThis.switchType(treeNode.id);
	}
	
	this.tree = $.fn.zTree.init($("#stree"), settings, this.param.naviData);
}

SoftwareMgr.prototype.initTable = function()
{
	var cols = new Array();
	cols.push("ID");
	cols.push("TYPE");
	cols.push("NAME");
	cols.push("DESCRIPTION");
	cols.push("CREATE_TIME");
	cols.push("CREATE_USER");
	
	var wheres = new Array();
	
	if(this.param.type == null)
	{
		var nodes = this.tree.getNodes();
		if (nodes.length > 0)
		{
			var n = nodes[0];
			this.param.type = n.id;
		}
	}
	if(this.param.type == null) return;

	// 设置当前的配置类型
	$("input[name='type']").val(this.param.type);
	
	var node = this.tree.getNodeByParam("id",this.param.type,null);
	this.tree.selectNode(node);
	this.setTitle(node.name);
	
	var where = {};
	where.colName 	= "TYPE";
	where.dataType 	= ABISCode.StorageDataType.NUMBER;
	where.value1	= this.param.type;
	wheres.push(where);
	
	var qryUrl = WebVar.VarPath + "/sys/softwaremgr/query";
	var tblParam =
	{
		tblId			: "table",
		tblName			: "SOFTWARE_LIST",
		cols			: cols,
		url				: qryUrl,
		orderCol		: "ID",
		pageSize		: 20,
		order			: WebCode.Order.DESC,
		pageBarId		: "SubPage",
		callBack		: {onClick:selectItem},
		sort			: {colName:"CREATE_TIME",order:WebTable.DES},
		multiSelect		: true,
		language		: this.param.pageNumStr,
		where			: wheres
	}
	
	this.tblMgr = new TableControlMgr(tblParam);
	
	function selectItem(row)
	{
		
	}
	
}

SoftwareMgr.prototype.setTitle = function(title)
{
	$("#TitleText").html(title);
}

SoftwareMgr.prototype.switchType = function(type)
{
	this.param.type = type;
	var wheres = new Array();
	var where = {};
	where.colName 	= "TYPE";
	where.dataType 	= ABISCode.StorageDataType.NUMBER;
	where.value1	= this.param.type;
	wheres.push(where);
	this.tblMgr.setQryParam(wheres);
	this.tblMgr.refresh();
	$("input[name='type']").val(type);
}