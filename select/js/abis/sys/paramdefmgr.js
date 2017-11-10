

function ParamDefMgr(param)
{
	this.param = param;
	this.init();
}

ParamDefMgr.prototype.init = function()
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
			 
			$("input[name='cfgName']").val("");
			$("#desc").text("");
			nThis.refresh();
		}
	);
}

ParamDefMgr.prototype.registerWindowSizeEvent = function()
{
	var nThis = this;
	$(window).resize(function(){
		nThis.updateLayout();
	});
	this.updateLayout();
}

ParamDefMgr.prototype.updateLayout = function()
{
	var h = WebUtil.getContentHeight();
	var border = 2 + 2 + 2;
	$("#Navi_Area").height(h - border);
	
}

ParamDefMgr.prototype.initNavigate = function()
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
		if(treeNode.type == undefined)return true;
		return eval(treeNode.type);
	}

	function onClick(event, treeId, treeNode, clickFlag)
	{
		if(treeNode.type == null)return;
		nThis.setTitle(treeNode.name);
		nThis.switchType(treeNode.type);
	}
	
	this.tree = $.fn.zTree.init($("#stree"), settings, this.param.naviData);
}

ParamDefMgr.prototype.setTitle = function(title)
{
	$("#TitleText").html(title);
}

ParamDefMgr.prototype.initTable = function()
{
	var cols = new Array();
	cols.push("ID");
	cols.push("NAME");
	cols.push("DESCRIPTION");
	cols.push("CREATE_USER");
	cols.push("CREATE_TIME");
	
	var wheres = new Array();
	
	var treeObj = $.fn.zTree.getZTreeObj("stree");
	var tId;
	if(this.param.type == null)
	{
		var nodes = treeObj.getNodes();
		if (nodes.length > 0)
		{
			var node = nodes[0];
			var children = node.children;
			if(children.length > 0)
			{
				var n = children[0];
				this.param.type = n.type;
				tId = n.id;
			}
		}
	}
	if(this.param.type == null) return;

	// 设置当前的配置类型
	$("input[name='cfgType']").val(this.param.type);
	
	var node = treeObj.getNodeByParam("type",this.param.type,null);
	treeObj.selectNode(node);
	this.setTitle(node.name);
	
	var where = {};
	where.colName 	= "TYPE";
	where.dataType 	= ABISCode.StorageDataType.NUMBER;
	where.value1	= this.param.type;
	wheres.push(where);
	
	var qryUrl = WebVar.VarPath + "/sys/paramdefmgr/query";
	var tblParam =
	{
		tblId			: "table",
		tblName			: "user_pref_def",
		cols			: cols,
		url				: qryUrl,
		orderCol		: MisPersonCol.ID,
		order			: WebCode.Order.DESC,
		pageBarId		: "SubPage",
		callBack		: {onClick:selectItem},
		sort			: {colName:"CREATE_TIME",order:WebTable.DES},
		multiSelect		: true,
		link			: {cols:["NAME"],callBack:clickLink},
		language		: this.param.pageNumStr,
		where			: wheres
	}
	
	this.tblMgr = new TableControlMgr(tblParam);
	
	var nThis = this;
	
	function selectItem(row)
	{
		
	}
	
	function clickLink(row,name)
	{
		var id = row["ID"];
		var cfgType = nThis.param.type;
		switch(cfgType)
		{
			case CfgTypeCode.STD_INFO_COLLECT:
				window.open(WebVar.VarPath + "/sys/stdcfg/modify/" + id,"_blank");
				break;
			case CfgTypeCode.BTY_COLLECT_ITEM:
				//活采生物特征采集项详情
				window.open(WebVar.VarPath + "/sys/livescancfg/?oper=edit&id=" + id,"_blank");
				break;
			case CfgTypeCode.TPCARD_REQURIED:
			case CfgTypeCode.TPCARD_UPDATE:
				window.open(WebVar.VarPath + "/sys/fillitemconfig/tp/edit/" + cfgType + "/" + id, "_blank");		
				break;
			case CfgTypeCode.LPCASE_REQURIED:
			case CfgTypeCode.LPCASE_UPDATE:
				window.open(WebVar.VarPath + "/sys/fillitemconfig/case/edit/" + cfgType + "/" + id, "_blank");
				break;
			case CfgTypeCode.WANTED_REQURIED:
			case CfgTypeCode.WANTED_UPDATE:
				window.open(WebVar.VarPath + "/sys/fillitemconfig/wanted/edit/" + cfgType + "/" + id,"_blank");		
				break;
			case CfgTypeCode.CAPTURED_REQURIED:
			case CfgTypeCode.CAPTURED_UPDATE:
				window.open(WebVar.VarPath + "/sys/fillitemconfig/captured/edit/" + cfgType + "/" + id,"_blank");
				break;
			case CfgTypeCode.LL_HITLOG_REQURIED:
			case CfgTypeCode.TT_HITLOG_REQURIED:
				//更新项，比重信息（查重)（串查）
				window.open(WebVar.VarPath + "/sys/fillitemconfig/hit/edit/" + cfgType + "/" + id,"_blank");
				break;
			case CfgTypeCode.TT_HITLOG_UPDATE:
				//更新项，比重信息（查重）
				window.open(WebVar.VarPath + "/sys/fillitemconfig/hit/edit/" + cfgType + "/" + id,"_blank");
				break;
			case CfgTypeCode.LTL_HITLOG_REQURIED:
			case CfgTypeCode.LTL_HITLOG_UPDATE:
				window.open(WebVar.VarPath + "/sys/fillitemconfig/hitlog/edit/" + cfgType + "/" + id,"_blank");
				break;
			case CfgTypeCode.LL_HITLOG_UPDATE:
				//更新项，比重信息（串查）
				window.open(WebVar.VarPath + "/sys/fillitemconfig/hit/edit/" + cfgType + "/" + id,"_blank");
				break;
			default:
				window.open(WebVar.VarPath + "/sys/paramdefmgr/look/" + id,"_blank");
				break;
		}
	}
}

ParamDefMgr.prototype.initButton = function()
{
	WebUI.createLinkButton("add",LinkButtonCfg.Add,add);
	WebUI.createLinkButton("del",LinkButtonCfg.Del,del);
	WebUI.createLinkButton("refresh",LinkButtonCfg.Refresh,refresh);
	
	var nThis = this;
	function add()
	{
		nThis.addConfig();
	}
	
	function del()
	{
		nThis.delConfig();
	}
	
	function refresh()
	{
		nThis.tblMgr.refresh();
	}
	
	function clickLink(row,colName)
	{
		window.open(WebVar.VarPath + "/tp/detail/" + row.ID, "_blank");
	}
}

ParamDefMgr.prototype.refresh = function()
{
	this.tblMgr.refresh();
}

ParamDefMgr.prototype.delConfig = function()
{
	var rows = this.tblMgr.getTable().getSelectItems();
	if(WebUtil.isEmpty(rows))
	{
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["PleaseSelectDataItemToDelete"]);
		//alert(AbisMessageResource.Alert["PleaseSelectDataItemToDelete"]);
		return;
	}
	
	this.language = this.param.language;
	
	var nThis = this;
    var callback = function(){

	/*var b = confirm(this.language.isDel);
	if(b)
   	{*/
		var ids = new Array();
		for(var i in rows)
		{
			 var row = rows[i];
			 ids.push(parseInt(row.ID));
		}
		
		var url = WebVar.VarPath + "/sys/paramdefmgr/delete";
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
                    DialogUtil.openSimpleDialogForOcx(data.msg,null,null,1);
					//alert(data.msg);
				}
			},
			error : function(e) 
			{
				WebUtil.NoWait();
                DialogUtil.openSimpleDialogForOcx(e,null,null,1);
				//alert(e);
			}
		});
   	}
    DialogUtil.openComfirmDialog(this.language.isDel,3,callback);
}

ParamDefMgr.prototype.addConfig = function()
{
	var nodes = this.tree.getSelectedNodes();
	if(WebUtil.isEmpty(nodes)) 
	{
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["LeftNavWithoutDataNotSupportAddConfig"]);
		//alert(AbisMessageResource.Alert["LeftNavWithoutDataNotSupportAddConfig"]);
		return;
	}
	var node = nodes[0];
	var cfgType = node.type;
	switch(cfgType)
	{
		case CfgTypeCode.BTY_COLLECT_ITEM:
			var url = WebVar.VarPath + "/sys/livescancfg/?oper=add";
			window.open(url,"_blank");
			break;
		case CfgTypeCode.STD_INFO_COLLECT:
			var url = WebVar.VarPath + "/sys/stdcfg/";
			window.open(url,"_blank");
			break;
		case CfgTypeCode.BTY_SPEC_PARAM:	
		case CfgTypeCode.TP_PRINT_TEMPLATE:
		case CfgTypeCode.LP_PRINT_TEMPLATE:
		case CfgTypeCode.TLT_VERIFY_TEMPLATE:
		case CfgTypeCode.CARD_TEMPLATE:
		case CfgTypeCode.CPR_MEX_PARAM:
			//cfgType为生物特征采集规格参数时
            if(cfgType==8){
                $("#isContent").val("isContent");
			}else{
                $("#isContent").val("");
			}
			this.upload(node.name);
			break;
		case CfgTypeCode.TPCARD_REQURIED:
		case CfgTypeCode.TPCARD_UPDATE:
			window.open(WebVar.VarPath + "/sys/fillitemconfig/tp/add/" + cfgType, "_blank");		
			break;
		case CfgTypeCode.LPCASE_REQURIED:
		case CfgTypeCode.LPCASE_UPDATE:
			window.open(WebVar.VarPath + "/sys/fillitemconfig/case/add/" + cfgType, "_blank");
			break;
		case CfgTypeCode.WANTED_REQURIED:
		case CfgTypeCode.WANTED_UPDATE:
			window.open(WebVar.VarPath + "/sys/fillitemconfig/wanted/add/" + cfgType,"_blank");		
			break;
		case CfgTypeCode.CAPTURED_REQURIED:
		case CfgTypeCode.CAPTURED_UPDATE:
			window.open(WebVar.VarPath + "/sys/fillitemconfig/captured/add/" + cfgType,"_blank");
			break;
		case CfgTypeCode.TT_HITLOG_REQURIED:
		case CfgTypeCode.TT_HITLOG_UPDATE:
		case CfgTypeCode.LTL_HITLOG_REQURIED:
		case CfgTypeCode.LTL_HITLOG_UPDATE:
		case CfgTypeCode.LL_HITLOG_REQURIED:
		case CfgTypeCode.LL_HITLOG_UPDATE:
			window.open(WebVar.VarPath + "/sys/fillitemconfig/hitlog/add/" + cfgType ,"_blank");
			break;
		
	}
	/*
							
	 */
}

ParamDefMgr.prototype.upload = function(headTxt)
{
	$.dialog
	({
	    title		: headTxt,
	    content		: document.getElementById('upload_panel'),
	    okValue		: AbisMessageResource['Save'],
		cancelValue	: AbisMessageResource['Cancel'],	 
	    ok: function () 
	    {
	    	return ok();
	    },
	    cancel: function () 
	    {     
	    	cancel();
	    }
	});
	
	var nThis = this;
	function ok()
	{
		// 验证数据有效性
		var filePath	= $("input[name='file']").val();
		var cfgName		= $("input[name='cfgName']").val();
		var cfgType		= $("input[name='cfgType']").val();
		var desc		= $("#desc").text();
		if(WebUtil.isEmpty(filePath))
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["PleaseChooseToSaveConfigFile"]);
			//alert(AbisMessageResource.Alert["PleaseChooseToSaveConfigFile"]);
			return false;
		}
		if(WebUtil.isEmpty(cfgName))
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["PleaseFillInConfigName"]);
			//alert(AbisMessageResource.Alert["PleaseFillInConfigName"]);
			return false;
		}
		var len = WebUtil.getLength(cfgName);
		if(len > 60)
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["ConfigNameLenTip"]);
			//alert(AbisMessageResource.Alert["ConfigNameLenTip"]);
			return false;
		}
		len = WebUtil.getLength(desc);
		if(len > 200)
		{
            DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert["ConfigDescLenTip"]);
			//alert(AbisMessageResource.Alert["ConfigDescLenTip"]);
			return false;
		}
		var f = document.getElementById("upload_form");
		f.submit();
		$("#desc").val("");
		return true;
	}
	//清除填写的信息
	function cancel()
	{
		var file = document.getElementById("file");  
		if (file.outerHTML) {
            file.outerHTML = file.outerHTML;
        } else {
            file.value = "";
        }
		$("input[name='cfgName']").val("");
		$("#desc").val("");
	}
}

ParamDefMgr.prototype.switchType = function(type)
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
	$("input[name='cfgType']").val(type);
}
