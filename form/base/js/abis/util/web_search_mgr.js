var cols 		= "";
var dialog 		= "";
var list1 		= "";
var list2 		= "";
var isExpand 	= true;
var isPositions = true;
var coldata 	= new Array();
var coldo 		= new Array();
var entarr 		= new Array();
var isHidden;
var colnum;
var index 		= 1;
var searchId 	= "";
var searchComboArray;

var wsm_g_This;
WebSearchMgr.prototype.wheres = null;

function WebSearchMgr(id,ent,num,tabname,extwhere,searchStr,bool,codebool)
{
	this.id=id;
	this.bool = bool;
	this.codebool = codebool;//下拉代码是否显示为代码名称
	searchId = id;
	this.ent = ent;
	this.num = num; //显示几列
	colnum = num;
	this.extwhere=extwhere;//额外的默认的检索条件	
	this.searchStr = searchStr;//翻译文本
	this.qryData(tabname,$("#qrytext").val());
	this.init();
	var nthis = this;
	wsm_g_This = this;
	document.onkeyup = function (e)
	{
		if(!WebUtil.isNull(e))
		{
			var key = (e.keyCode) || (e.which) || (e.charCode);
			if (key == "13")/*回车*/
			{	
				//TODO 有两个回车监听  暂时去掉这个   hanjianxiang
				//nthis.query();
			}
			var act = document.activeElement.id; //获得文本框焦点的ID
			if(act=="qrytext")
			{
				onoad();
			}
		}
	}
	
//	this.UpDown();
//	this.SupFix();
	$("#fdiv").slideDown(200);
	if(isPositions)
	{
		$(".fdivC").width($("#divCon").width() - 2);
	}
	
	if($("#divCon").width() < 1000)
	{
		$("td").removeClass("colName"); 
	}

	$("#qryId_"+searchId+"").show();
	$("#cleId_"+searchId+"").show();
	$("#fdiv").css("position","inherit");
	isPositions = false;

}

WebSearchMgr.prototype.init = function()
{
	entarr = this.ent;
	/* 创建检索条件 */
	var input = "";
	var td = "";
	var columnnames = new Array();
	var comboMgr = {};
	var comboList = new Array();
	
	var tabled = tablediv();
	var table = "<div id=\"mydiv\" class=\"mydiv\">" + tabled + "</div>";
	var from = "<form name=\"mgrform\" action=\"\" method=\"post\">" + table + "<form>";
	
	//工具栏
	var tool = "<div class=\"TableTitle\"><div class=\"Header\">"+this.searchStr.Searchterm+"</div><div class=\"Footer\"></div><div class=\"Tool\" ><input id=\"queryTextId\" name=\"queryTextId\" type=\"text\"  class=\"longWh Text_Input\"/>" +
				"<input id=\"queryBtnId\" type=\"button\" onclick=\"\" class=\"searchtext\" style=\"cursor:pointer;\"/>" +
				//"<div id=\"upDownId_"+this.id+"\"></div><div id=\"toolconfigId_"+this.id+"\"></div><div id=\"supFixId_"+this.id+"\"></div><div id=\"qryId_"+this.id+"\"></div><div id=\"cleId_"+this.id+"\"></div></div>";
				"<div id=\"upDownId_"+this.id+"\"></div><div id=\"toolconfigId_"+this.id+"\"></div><div id=\"qryId_"+this.id+"\"></div><div id=\"cleId_"+this.id+"\"></div></div>";
	var tdiv = "<div id=\"tdiv\">" + tool + "</div>"; //工具栏div
	var fdiv = "<div id=\"fdiv\" class=\"fdivC\">" + from  + "</div>";//检索div
	var disdiv = this.creDialog();//创建检索项
	var div = "<div class=\"divCon\" id=\"divCon\">" + tdiv + fdiv + disdiv + "</div>";
	$("#" + this.id).html(div);
	
	
	$("#queryBtnId").mouseup
	(
		function()
		{
			var v = $("input[name='queryTextId']").val();
			v = WebUtil.urlEncode(v);
			if(WebUtil.isNull(v))
			{
				alert(AbisMessageResource.Alert["PleaseEnterSearchContent"]);
				return;
			}
			var url = WebVar.VarPath + "/search/" + v;
			window.open(url,"_blank");
		}
	);
	
	if(this.bool != null)
	{
		if(this.bool)
		{
			$("#queryTextId").show();
			$("#queryBtnId").show();
		}
		else
		{
			$("#queryTextId").hide();
			$("#queryBtnId").hide();
		}
	}
	else
	{
		$("#queryTextId").hide();
		$("#queryBtnId").hide();
	}
		
	
	WebUI.createLinkButton("toolconfigId_"+this.id+"",LinkButtonCfg.Cfg,this.openSearChConfig);
	WebUI.createLinkButton("upDownId_"+this.id+"",LinkButtonCfg.UpDown,this.UpDown);
	//WebUI.createLinkButton("supFixId_"+this.id+"",LinkButtonCfg.SupFix,this.SupFix);
	WebUI.createLinkButton("qryId_"+this.id+"",LinkButtonCfg.Qry,query);
	WebUI.createLinkButton("cleId_"+this.id+"",LinkButtonCfg.Clean,this.cleanValues);
	
	
	var codeNameBool = true;
	if(!this.codebool && this.codebool != undefined)
	{
		codeNameBool = false;
	}
	for(var i=0;i<this.ent.length;i++)
	{
		var obj = this.ent[i];
		if(obj == null)continue;
		if(!WebUtil.isNull(obj.codeName) && obj.codeName != "null")
		{
			var combo = new WebCombo(obj.colName,null,null,codeNameBool,false,obj.codeName,1);
			comboMgr[obj.colName] = combo;
			comboList.push(comboMgr[obj.colName]);
			columnnames.push(obj.codeName);
		}else if(obj.dataType=="3"){
			WebUI.createDateText(obj.colName+"BeginDiv",obj.colName+"Begin","shortWh Text_Input","",null);
			WebUI.createDateText(obj.colName+"EndDiv",obj.colName+"End","shortWh Text_Input","",null);
		}
	}
	
	searchComboArray = comboMgr;
	var nThis = this;
	//加载数据 
	WebComboUtil.getCodeTable(columnnames, loadCodeTable);
	function loadCodeTable(data)
	{
		if(WebUtil.isNull(data))return;
		data = eval('(' + data + ')');
		for(var v = 0;v < comboList.length;v++)
		{
			comboList[v].setData(data[columnnames[v].toLowerCase()]);
		}
	}
	
	list1 = document.getElementById('list1');
	list2 = document.getElementById('list2');
	$("#qryId_"+searchId+"").hide();
	$("#cleId_"+searchId+"").hide();
	var nthis=this;
	function query()
	{
		nthis.query();
	}
}

//创建表格
function tablediv()
{
	td = "";
	index = 1;
	for(var i = 0; i < entarr.length; i++)
	{
		var obj = entarr[i];
		if(obj == null)continue;
		if(!WebUtil.isNull(obj.codeName) && obj.codeName != "null")
		{
			input = "<div id=\"" + obj.colName + "\"></div> ";
		}
		else
		{
			if(obj.dataType == ABISCode.StorageDataType.NUMBER || obj.dataType == ABISCode.StorageDataType.STRING)
			{
				input = "<input class=\"longWh Text_Input\" type=\"text\" name=\"" + obj.colName + "\" id=\"" + obj.colName+"\"></input>";
//				WebUI.createText(""+obj.colName+"",""+obj.colName+"","WebTextField","",null);	
			}
			else if(obj.dataType == ABISCode.StorageDataType.DATE)
			{
				//input = "<input class=\"shortWh Text_Input\" id=\"" + obj.colName + "Begin\" onclick=\"\" type=\"text\" name=\"" + obj.colName + "Begin\" value=\"\"/> - <input class=\"shortWh Text_Input\" id=\"" + obj.colName + "End\" onclick=\"\" type=\"text\" name=\"" + obj.colName + "End\" value=\"\"/>  (yyyymmdd)";
				//韩健祥 2016年11月17日  使用日期控件代替普通input
				input = "<div ><div id=\"" +  obj.colName + "BeginDiv\" style=display:inline-block ></div> <span style=position:absolute;>-</span>"+"<div id=\"" +  obj.colName + "EndDiv\" style=display:inline-block;margin-left:10px;></div> </div>";
			}
			else
			{
				input = "<input class=\"longWh Text_Input\" type=\"text\" name=\"" + obj.colName + "\" id=\"" + obj.colName+"\"></input>";
			}
		}
		index ++;
		td = td + "<td class=\"colName\">" + obj.dispName + "</td><td>" + input + "</td>";
		if(index > colnum && i != entarr.length - 1)//colnum
		{
			td = td + "</tr><tr>";
			index = 1;
		}
	}
	
	var tabled = "<table id=\"mytable\" class=\"ysabisControlTab\"><tr>" + td + "</tr></table>";
	return tabled;
}

/**
 * 该方法为表格导出服务
 * @returns {String}
 */
WebSearchMgr.prototype.searchColValues = function()
{
	var colsstr = "";
	var len = this.ent.length;
	for(var i = 0; i <len ; i++)
	{
		var obj = this.ent[i];
		var v = "";
		if(obj.dataType == 0)
		{
			v = $("input[name='" + obj.colName + "code']").val();
		}
		else
		{
			v = $("input[name='" + obj.colName + "']").val();
		}
		if(v != null && v != "")
		{
			colsstr = colsstr + "," + obj.colName + ":" + v;
		}
	}
	return colsstr;
}

WebSearchMgr.prototype.UpDown = function()
{
	isHidden = eval($("#fdiv").is(":hidden"));
	if(isHidden)
	{
		$("#fdiv").slideDown(200);
		if(isPositions)
		{
			$(".fdivC").width($("#divCon").width() - 2);
		}
		
		if($("#divCon").width() < 1000)
		{
			$("td").removeClass("colName"); 
		}

		$("#qryId_"+searchId+"").show();
		$("#cleId_"+searchId+"").show();
	}
	else
	{
		$("#fdiv").slideUp(200);
		$("#fdiv").css("border","1px solid #efefef;");
		$("#divCon").css("background","#efefef;");
		$("#qryId_"+searchId+"").hide();
		$("#cleId_"+searchId+"").hide();
	}
}

WebSearchMgr.prototype.SupFix = function()
{
	if(isPositions)
	{
		$("#fdiv").css("position","inherit");
		isPositions = false;
	}
	else
	{
		$("#fdiv").css("position","absolute");
		isPositions = true;
	}
	$("#fdiv").width($("#divCon").width() - 2);
}

WebSearchMgr.prototype.tabEvent = function(tabId)
{
}

WebSearchMgr.prototype.query = function()
{
	if(isPositions)
	{
		$("#fdiv").slideUp(200);
	}
	this.ent = "";
	this.ent = entarr;	
	// TODO 
	var whereParam = this.getValue(this.ent);
	if(!WebUtil.isEmpty(this.extwhere))
	{
	   for(var i=0;i<this.extwhere.length;i++)
	   {
		   whereParam.push(this.extwhere[i]);
	   }
	}		
	
	if(!WebUtil.isEmpty(this.wheres))
	{
	   for(var i=0;i<this.wheres.length;i++)
	   {
		   whereParam.push(this.wheres[i]);
	   }
	}
	// TODO 有空再修改
//	if(WebUtil.isFunction(this.callback))
//	{
//		this.callback(whereParam);
//	}
	// 我们假设tlbMgr存在，目前先这样做，以后有空再弱耦合实现
	tblMgr.setQryParam(whereParam);
	tblMgr.refresh();
}

WebSearchMgr.prototype.openSearChConfig = function()
{
	$.dialog({
	    title: ''+wsm_g_This.searchStr.CfgQueryTerm+'',
	    content: document.getElementById('tabdiv'),//tabdiv//disdiv
	    okValue: ''+wsm_g_This.searchStr.OK+'',
		cancelValue:''+wsm_g_This.searchStr.Cancel+'',	 
	    ok: function () 
	    {
	    	colConfig()
	    },
	    cancel: function () 
	    {        
	    }
	});
}

function colConfig()
{
	index = 1;
	var v = getColValue(list2);
	var entt = new Array();
	if(WebUtil.isEmpty(coldo)) return;
	document.getElementById("mydiv").innerHTML="";
	for(var i=0;i<coldo.length;i++) 
	{ 
		var coln = new Array();
		var datype = "";
		if(WebUtil.isNull(coldo[i]))
		{
			//判空不准确  hjx  2016年10月11日
			if(WebUtil.isEmpty(coldo[i])||coldo[i].colName==null){
				continue;
			}
		}
		if(!WebUtil.isNull(coldo[i].codeName) && coldo[i].codeName != "null")
		{
			datype = ABISCode.StorageDataType.STRING;
		}
		else
		{
			if(coldo[i].dataType == 1 || coldo[i].dataType == 2)
			{
				datype = ABISCode.StorageDataType.STRING;
			}
			if(coldo[i].dataType == 3)
			{
				datype = ABISCode.StorageDataType.DATE;
			}
		}
//		if(coldo[i].dataType == 3)
//		{
//			datype = ABISCode.QryFieldType.CODE;
//		}
		coln.colName = coldo[i].colName;
		coln.dispName = coldo[i].dispName;
		coln.dataType = datype;
		coln.codeName = coldo[i].codeName;
		entt.push(coln);
	}
	entarr = entt;
	var tabled = this.tablediv();
	$("#mydiv").html(tabled);
	
	var comboL = new Array();
	var comboM = {};
	var column = new Array();
	for(var i=0;i<entt.length;i++)
	{
		var ob = entt[i];
		if(ob == null)continue;
		if(!WebUtil.isNull(ob.codeName) && ob.codeName != "null")
		{
			var comb = new WebCombo(ob.colName,null,null,true,false,ob.codeName,1);
			comboM[ob.colName] = comb;
			comboL.push(comboM[ob.colName]);
			column.push(ob.codeName);
		}else if(ob.dataType=="3"){
			WebUI.createDateText(ob.colName+"BeginDiv",ob.colName+"Begin","shortWh Text_Input","",null);
			WebUI.createDateText(ob.colName+"EndDiv",ob.colName+"End","shortWh Text_Input","",null);
		}
	}
	//加载数据 
	WebComboUtil.getCodeTable(column, loadCodeT);
	function loadCodeT(data1)
	{
		if(WebUtil.isNull(data1))return;
		data1 = eval('(' + data1 + ')');
		for(var v=0;v<comboL.length;v++)
		{
			comboL[v].setData(data1[column[v].toLowerCase()]);
		}
	}
}

WebSearchMgr.prototype.cleanValues = function()
{
	var form=window.document.forms[0];
	   for(var i=0; i<form.elements.length; i++)
	   {
       if(form.elements[i].type=="text")
       {
    		form.elements[i].value="";
       }
       if(form.elements[i].type=="hidden")
       {
    		form.elements[i].value="";
       }
   }	   			  
}

WebSearchMgr.prototype.creDialog = function()
{
	var opt = "";
	var cthis = this;
	for(var i=0;i< coldata.length;i++)
	{
		opt = opt + "<option id="+coldata[i].dataType+" value="+coldata[i].tableName+"|"+coldata[i].codeTableName+" title="+coldata[i].columnName+">"+coldata[i].colDispName+"</option>";
	}
	var coltab = "<div id=\"tabdiv\" style=\"display:none;width:720px;height:380px;padding-bottom:10px;\"><form method=\"post\" name=\"myform\" action=\"/\">" +
					"<div class=\"colSelect\">" +
				        "<div style=\"width:270px;height:300px;margin-left: 20px;\"><div style=\"float:left;\">"+this.searchStr.CandQueryTerm+":</div>" +
				        	"<input type=\"text\" id=\"qrytext\" style=\"width:268px;text-indent:1px;border:1px solid #6f7780;border-bottom: 0;\"/>" +
				            "<select multiple=\"multiple\" id=\"list1\" size=\"12\" ondblclick=\"addOptions()\">" +
				            	opt +
				            "</select>" +
				        "</div>" +
				        "<div style=\"width:80px;margin-top:50px;\">" +
				            "<button onclick=\"addOptions()\" type=\"button\" title=\""+this.searchStr.Add+"\" style=\"width: 50px;\">>></button>" +
				            "<button onclick=\"delOptions()\" type=\"button\" title=\""+this.searchStr.Remove+"\" style=\"width: 50px;\"><<</button>" +
				        "</div>" +
				        "<div style=\"width:270px;height:320px;\"><div style=\"float:left;\">"+this.searchStr.QueryTerm+":</div>" +
				            "<select multiple=\"multiple\" size=\"12\" id=\"list2\" ondblclick=\"delOptions()\">" +
				            "</select>" +
				        "</div>" +
				        "<div style=\"width:80px;\margin-top:50px;\">" +
				            "<button onclick=\"changePos(-1)\" type=\"button\" title=\""+this.searchStr.Move+"\" style=\"width: 50px;\">↑</button>" +
				            "<button onclick=\"changePos(1)\" type=\"button\" title=\""+this.searchStr.Down+"\" style=\"width: 50px;\">↓</button>" +
				        "</div>" +
				     "</div>" +
				  "</form></div>";
	return coltab;
}

function onoad()
{
	var qryval = $("#qrytext").val().toUpperCase();
	var cold = coldata;
	var coll = coldo;
	
	var friens = $("#list1");
	friens.empty();
	for(var i=0;i<cold.length;i++) 
	{   
		var colfal = true;
		for(var c=0;c<coldo.length;c++)
		{
			var code = cold[i];
			if(code == null)continue;
			if(code.columnName == coldo[c].colName)
			{
				colfal = false
			}
		}
		if(colfal)
		{
			if(!WebUtil.isEmpty(cold[i].colDispName) && !WebUtil.isEmpty(cold[i].columnName) && !WebUtil.isEmpty(cold[i].inputCode))
			{
				if(cold[i].colDispName.indexOf(qryval) > -1 || cold[i].columnName.indexOf(qryval) > -1 || cold[i].inputCode.indexOf(qryval) > -1)
				{
					var value = null;
					if(!WebUtil.isNull(cold[i].codeTableName))
					{
						value = cold[i].tableName+"|"+cold[i].codeTableName;
					}
					var option = "<option id="+cold[i].dataType+" value="+value+" title="+cold[i].columnName+">"+cold[i].colDispName+"</option>";
					friens.append(option);
				}
			}
		}
	}
}

WebSearchMgr.prototype.qryData = function(tabname,colwhere)
{
	if(colwhere==""||colwhere==undefined)
		colwhere=null;
	var url = WebVar.VarPath + "/ctrl/cols/" + tabname+"/"+colwhere;
	coldata = "";
	jQuery.ajax 
	( 
        {
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : null,
			dataType : 'json',
			success : function(data) 
			{   
				if(data != null)
				{
					/*  后端返回   ColumnCatlogs  json格式
					 * codeDispStyle:0,codeFmt:null,codeTableName:"UNIT_CODE",colDispName:"更新单位代码",
					 * colDispWidth:100,columnName:"UPDATE_UNIT_CODE",
					 * cpCodeCol:null,dataFmt:null,dataType:2,description:"UPDATE_UNIT_CODE",
					 * entityAttrType:null,id:1246,inputCode:"GXDW",storageFmt:0,tableName:"MIS_PERSON"
					 */
					var da = eval("("+data+")");
					coldata = da;
					var friends = $("#list1");
					friends.empty();
					for(var i=0;i<da.length;i++) 
					{   
						var coln = new Array();
						var colfal = true;
						for(var c=0;c<entarr.length;c++)
						{
							var ent = entarr[c];
							if(ent == null)continue;
							if(ent.colName == da[i].columnName)
							{
								colfal = false
							}
						}
						if(colfal)
						{
							var value = null;
							if(!WebUtil.isNull(da[i].codeTableName))
							{
								value = da[i].tableName+"|"+da[i].codeTableName;
								value = da[i].tableName+"|"+da[i].columnName;
							}
							var option = "<option id="+da[i].dataType+" value="+value+" title="+da[i].columnName+">"+da[i].colDispName+"</option>";
							friends.append(option);
						}
					}
					var friends2 = $("#list2");
					coldo = entarr;
					for(var f=0;f<entarr.length;f++)
					{
						var value = null;
						var ent = entarr[f];
						if(ent == null)continue;
						//{colName: "SUPERVISE_LEVEL", dispName: "协查级别", dataType: 0, codeName: "CE_BASIC_INFO|SUPERVISE_LEVEL"}
						if(ent.codeName != null)
						{
							value = entarr[f].codeName;
						}
			            //console.log("<option id="+entarr[f].dataType+" value="+value+" title="+entarr[f].colName+">"+entarr[f].dispName+"</option>");
						var option = "<option id="+entarr[f].dataType+" value="+value+" title="+entarr[f].colName+">"+entarr[f].dispName+"</option>";
						friends2.append(option);
					}
				}
			},   
			error : function(e) 
			{   
				alert(""+wsm_g_This.searchStr.QueryError+"!");
			}   
		}
	);
}

function addOptions() 
{ 
	moveOptions1(list1, list2); 
}
function delOptions() 
{ 
	moveOptions2(list2, list1); 
}
/*
 * js缓存的字段信息 和  页面 option属性的对应关系
 * colName          	dispName 		dataType		codeName
 * Option.title			Option.text		Option.id		Option.value
 * ACCEPT_UNIT_CODE 	接警单位代码    			0  			LP_CASE_VIEW|ACCEPT_UNIT_CODE         
 */
function moveOptions1(e1, e2) 
{
    for (var i = e1.options.length - 1; i >= 0; i--) 
    {
        if (e1.options[i].selected) {
            var e = e1.options[i];

            var a = new Option(e.text, e.value,false,false);
            a.id = e.id;
            a.title = e.title;
            e2.options.add(a, e2.options.length);
//          console.log(a.title+"-"+a.text+"-"+a.id+"-"+a.value);
            e1.remove(i);
            var cod = new Array();
            var datype = "";
            if(!WebUtil.isNull(a.value) && a.value != "null")
    		{
            	datype = ABISCode.StorageDataType.STRING;
    		}
            else
            {
            	if(a.id == 1 || a.id == 2)
            	{
            		datype = ABISCode.StorageDataType.STRING;
            	}
            	if(a.id == 3)
            	{
            		datype = ABISCode.StorageDataType.DATE;
            	}
            }
    		cod.colName = a.title;
    		cod.dispName = a.text;
    		cod.dataType = datype;
    		cod.codeName = a.value;
            coldo.push(cod);
        }
    }
}

function moveOptions2(e1, e2) 
{
    for (var i = e1.options.length - 1; i >= 0; i--) 
    {
        if (e1.options[i].selected) 
        {
            var e = e1.options[i];
            var a = new Option(e.text, e.value,false,false);
            a.id = e.id;
            a.title = e.title;
            e2.options.add(a, e2.options.length);
            e1.remove(i);
            coldo.splice(i,1);
        }
    }
}

function getColValue(btn, list) 
{
    var value = "";
    if (!list) list = list2;
    for (var i = 0; i < list.options.length; i++) 
    {
        value += list.options[i].value + ",";
    }
    return value;
}

function changePos(index) 
{
    if (index == -1) 
    {
        if (list2.selectedIndex > 0) 
        {
            var temp = coldo[list2.selectedIndex];
            coldo[list2.selectedIndex]=coldo[list2.selectedIndex-1];
            coldo[list2.selectedIndex-1]=temp;
            list2.insertBefore(list2.options[list2.selectedIndex], list2.options[list2.selectedIndex - 1])

        }
    }
    else if (index == 1) 
    {
        if (list2.selectedIndex < list2.options.length - 1) 
        {
            var temp = coldo[list2.selectedIndex];
            coldo[list2.selectedIndex]=coldo[list2.selectedIndex+1];
            coldo[list2.selectedIndex+1]=temp;
            list2.insertBefore(list2.options[list2.selectedIndex + 1], list2.options[list2.selectedIndex]);

        }
    }
}  

WebSearchMgr.prototype.getValue = function(ent)
{
	var now = new Date();				
    var year = now.getFullYear();       /*年*/
    var month = now.getMonth() + 1;     /*月*/
    var day = now.getDate();            /*日*/
    var time = ""+year;					/*系统当前时间*/
    var prevtime = "19000101";
    
    if(month < 10)
    {
    	time += "0";
    }
    time += month;
    if(day < 10)
    {
    	time += "0";
    }
    time += day;
    
	var wheres = new Array();
	for(var i=0;i<ent.length;i++)
	{
		var where = {};
		var obj = ent[i];
		if(obj == null)continue;
		if(!WebUtil.isNull(obj.codeName) && obj.codeName != "null")
		{
			where.colName = obj.colName;
			where.dataType = ABISCode.StorageDataType.STRING;
			if(!WebUtil.isNull($("#"+ent[i].colName+"code").val()))
			{
				where.value1 = $("#"+ent[i].colName+"code").val();
			}
		}
		else
		{
			if(ent[i].dataType == ABISCode.StorageDataType.DATE)
			{
				where.colName = ent[i].colName;
				where.dataType = ABISCode.StorageDataType.DATE;
				if(!WebUtil.isNull($("#"+obj.colName+"Begin").val()))
				{
					where.value1 = $("#"+obj.colName+"Begin").val();
				}
				if(!WebUtil.isNull($("#"+obj.colName+"End").val()))
				{
					where.value2 = $("#"+obj.colName+"End").val();
				}
				if(!WebUtil.isNull(where.value1) && WebUtil.isNull(where.value2))
				{
					//如果开始时间有值，结束时间自动赋值 当前时间
					//4.5设计如此，现在新增了 赋值后显示 韩健祥 2016年11月17日
					where.value2 = time;
					$("#"+obj.colName+"End").val(time);
				}
				if(WebUtil.isNull(where.value1) && !WebUtil.isNull(where.value2))
				{
					where.value1 = prevtime;
				}
				if(where.value1 > where.value2)
				{
					//alert(AbisMessageResource.Alert["时间应按照前小后大填写!");
					alert(AbisMessageResource.Alert["StartTimeCanNotGreaterThanEndTime"]);
					return;
				}
			}
//			if(obj.dataType == ABISCode.StorageDataType.STRING || obj.dataType == ABISCode.StorageDataType.NUMBER)
//			{
//				where.colName = ent[i].colName;
//				where.dataType = ABISCode.StorageDataType.STRING;
//				if(!WebUtil.isNull($("#"+obj.colName+"").val()))
//				{
//					where.value1 = $("#"+obj.colName+"").val();
//				}
//			}
			else
			{
				where.colName = ent[i].colName;
				where.dataType = ABISCode.StorageDataType.STRING;
				if(!WebUtil.isNull($("#"+obj.colName+"").val()))
				{
					where.value1 = $("#"+obj.colName+"").val();
				}
			}
		}
		if(!WebUtil.isNull(where.value1) || !WebUtil.isNull(where.value2))
		{
			if(!WebUtil.isNull(where.value1))
			{
				where.value1 = this.trim(where.value1);
			}
			if(!WebUtil.isNull(where.value2))
			{
				where.value2 = this.trim(where.value2);
			}
			wheres.push(where);
		}
	}
	return wheres;
}

WebSearchMgr.prototype.trim=function(str ) {

    return str.replace(/(^\s*)|(\s*$)/g,'');
}


WebSearchMgr.prototype.getWhereStmt = function()
{
	var wheres = "";
	for(var i=0;i<this.ent.length;i++)
	{
		var where = {};
		var obj = this.ent[i];
		if(obj == null)continue;
		if(!WebUtil.isNull(obj.codeName))
		{
			wheres=wheres+","+obj.colName+":"+ABISCode.StorageDataType.STRING+":"+$("#"+obj.colName+"code").val();
		}
		else
		{
			if(obj.dataType == ABISCode.StorageDataType.STRING || obj.dataType == ABISCode.StorageDataType.NUMBER)
			{
				wheres=wheres+","+obj.colName+":"+ABISCode.StorageDataType.STRING+":"+$("#"+obj.colName+"").val();	
			}
			if(obj.dataType == ABISCode.StorageDataType.DATE)
			{
				wheres=wheres+","+obj.colName+":"+ABISCode.StorageDataType.DATE+":"+$("#"+obj.colName+"Begin").val()+":"+$("#"+obj.colName+"End").val();
			}
		}
	}
	return wheres.substr(1);
}

WebSearchMgr.prototype.getComboArray = function()
{
	return searchComboArray;
}

WebSearchMgr.prototype.setWheres = function(wheres)
{
	this.wheres = wheres;
}

