
UnitStree.prototype.key = "";
UnitStree.prototype.lastValue = "";
UnitStree.prototype.nodeList  = [];
UnitStree.prototype.ztreeObj = "";
UnitStree.prototype.startUnitCode = "";
UnitStree.prototype.startUnitLevel = "";
UnitStree.data = null;

function UnitStree(id,array)
{
	this.id = id;
	this.array = array;
	this.ztreeObj = array;
	UnitStree.data = array;
	this.init();
}

UnitStree.prototype.init = function()
{
	
	var div = "<div id=\"treeId\">" +
					"<div style=\"width: 800px;\"><input type=\"text\" id=\"key\" class=\"text_w Text_Input\"></input></div>" +
					"		<div id=\"stree\" class=\"ztree Tree\"></div></div>";
	
	$("#" + this.id).html(div);
	
	$("#stree_2_a").click();
	//var hti = WebUtil.getContentHeight() + 50;
	$("#stree").height(350);
	$("#stree").width(380);
	
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		},
		view : {
			nameIsHTML : true
		},
		callback : {
			beforeClick : beforeClick,
			onClick : onClick
		}
	}
	
	var arr = new Array();
	var ztree;
	if($("#unitId").attr("checked") == false)//是否显示下级单位
	{
		for(var i in this.ztreeObj)
		{
			var obj = this.ztreeObj[i];
			var index = obj.id.lastIndexOf("_");
			var leve = obj.id.substring(0,index);
			if(leve == "LEVEL_2" || leve == "LEVEL_1")
			{
				arr.push(obj);
			}
		}
		ztree = $.fn.zTree.init($("#stree"), setting, arr);
	}
	else
	{
		ztree = $.fn.zTree.init($("#stree"), setting, this.ztreeObj);
	}
	var node = ztree.getNodes();
	ztree.selectNode(node[0]);
	
	var inde = node[0].id.lastIndexOf("_");
	var val1 = node[0].id.substring(0,inde);
	var val2 = node[0].id.substring(inde+1,node[0].id.length);
	this.startUnitLevel = val1;
	this.startUnitCode = val2;
	$("#startUnitLevelId").val(val1);
	$("#startUnitCodeId").val(val2);
	$("#startUnitNameId").val(node[0].name);
	
	this.key = $("#key");
	document.onkeyup = function (e)
	{
		if(!WebUtil.isNull(e))
		{
			var act = document.activeElement.id; //获得文本框焦点的ID
			var key = (e.keyCode) || (e.which) || (e.charCode);
			if (key == "13")/*回车*/
			{		
				if(act=="key")
				{
					searchNode();
				}
			}
		}
	}
}

UnitStree.prototype.checkNode = function()
{
	var vthis = this;
	var arr = new Array();
	var nztree;
	var settingg = {
			data : {
				simpleData : {
					enable : true
				}
			},
			view : {
				nameIsHTML : true
			},
			async:
			{
				enable:true
			},
			callback : {
				beforeClick : beforeClick,
				onClick : onClick
			}
		}
	if($("#unitId").attr("checked") == false)//是否显示下级单位
	{
		for(var i in this.array)
		{
			var obj = this.array[i];
			var index = obj.id.lastIndexOf("_");
			var leve = obj.id.substring(0,index);
			if(leve == "LEVEL_2" || leve == "LEVEL_1")
			{
				arr.push(obj);
			}
		}
		nztree = $.fn.zTree.init($("#stree"), settingg, arr);
	}
	else
	{
		nztree = $.fn.zTree.init($("#stree"), settingg, this.array);
	}
	nztree.refresh();
	
	var node = nztree.getNodes();
	nztree.selectNode(node[0]);
	
	var inde = node[0].id.lastIndexOf("_");
	var val1 = node[0].id.substring(0,inde);
	var val2 = node[0].id.substring(inde+1,node[0].id.length);
	this.startUnitLevel = val1;
	this.startUnitCode = val2;
	$("#startUnitLevelId").val(val1);
	$("#startUnitCodeId").val(val2);
	$("#startUnitNameId").val(node[0].name);
}

function beforeClick(treeId, treeNode, clickFlag)
{
    if(treeNode.click == undefined)return true;
	return eval(treeNode.click);
}

function onClick(event, treeId, treeNode, clickFlag)
{		
	var inde = treeNode.id.lastIndexOf("_");
	var val1 = treeNode.id.substring(0,inde);
	var val2 = treeNode.id.substring(inde+1,treeNode.id.length);
	startUnitLevel = val1;
	startUnitCode = val2;
	$("#startUnitLevelId").val(val1);
	$("#startUnitCodeId").val(val2);
	$("#startUnitNameId").val(treeNode.name);
}

UnitStree.prototype.getStartUnitCode = function()
{
	return this.startUnitCode;
}

UnitStree.prototype.getStartUnitLevel = function()
{
	return this.startUnitLevel;
}

function searchNode(e) {
	var vthis = this;
	var value = $("#key").val();
//	if (this.lastValue === value) return;
//
//	this.lastValue = value;
//	if (value === "")
//	{
//		$.fn.zTree.init($("#stree"), settingg, this.array);
//		return;
//	}
	var result = "";
	var arr = new Array();
	var nztree;
	var settingg = {
			data : {
				simpleData : {
					enable : true
				}
			},
			view : {
				nameIsHTML : true
			},
			async:
			{
				enable:true
			},
			callback : {
				beforeClick : beforeClick,
				onClick : onClick
			}
		}
	if($("#unitId").attr("checked"))//是否显示下级单位
	{
		for(var i in UnitStree.data)
		{
			var obj = UnitStree.data[i];
			var index = obj.id.lastIndexOf("_");
			var leve = obj.id.substring(0,index);
			if(leve == "LEVEL_2" || leve == "LEVEL_1")
			{
				arr.push(obj);
			}
		}
		nztree = $.fn.zTree.init($("#stree"), settingg, arr);
	}
	else
	{
		nztree = $.fn.zTree.init($("#stree"), settingg, UnitStree.data);
	}
	var node;
//	var nztree = $.fn.zTree.init($("#stree"), settingg, this.array);
	var bool = WebUtil.isNumber(value);
	if(bool)
	{
		node = nztree.getNodesByParamFuzzy("id", value);
	}
	else
	{
		node = nztree.getNodesByParamFuzzy("name", value);
	}
	
	
	var tree = $.fn.zTree.init($("#stree"), settingg, node);
	tree.refresh();
}

