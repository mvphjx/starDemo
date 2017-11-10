var oldobj = null;
var index = 0;
var timeoutId;
var showbutton = null;
var showlist = null;

var WebComboType=
{
		PAGE 	: 0,
		BOX 	: 1	
}

var ComboItemType =
{
		Full : 0,
		Code : 1,
		Text : 2
}

/**
 * 支持模糊查找的下拉列表空间
 * id 下拉文本框id，对应jsp中div的id
 * rId  关联变化时关联字段的id
 * data (json)
 * f	(代码值|显示文本)
 * qryAll 初始化时查询的数据量。全部加载还是部分加载。这里部分加载的只是地址信息（户籍，现住址，国家等涉及地址类和数量超过100的代码表信息的信息）
 * colName 列名，必须传。不能为null。用于后面查询（新版）。
 * type 表示该下拉框是在普通页面中还是在弹出框中
 * itemtype 表示下拉列表中的显示格式。0：同时显示code和value;1：只显示code;2:只显示txt
 */
function WebCombo(id, rId, data, f, qryAll, colName,type,itemtype)
{
	this.id = id;
	this.data = data;
	this.rId = rId;
	this.flag = f;
	this.qryAll = qryAll;//为什么要把 属性 拼到dom的id中？
	this.colName = colName;	
	this.type=type;
	this.itemtype=itemtype;
	this.init();	
	this.registHotKey($("#"+this.id + "textfield" + this.qryAll));//注册热键
	this.selectli = null;
	this.focuslist = null;
	this.editable=true;
	this.inputField=$("#" + id + "textfield" + this.qryAll);//文本框
	this.textField=$("#" + id + "text");//文本值隐藏域
	this.codeField=$("#" + id + "code");//代码值隐藏域
	this.initEvent();
	this.relatinput = null;
	this.qryLimit  = false;//限制 检索后台数据
	
}

/** 注册代码选择事件 */
WebCombo.prototype.addSelectionListener = function(listener)
{
	this.listener = listener;
}

/** 注册键盘上下选择和回车事件 */
WebCombo.prototype.registHotKey = function(obj)
{
	var nThis = this;
	obj.keydown(function(e)
	{
		var key = (e.keyCode) || (e.which) || (e.charCode);
		if (key == "40")//向下	
		{									
			if (nThis.selectli == null)
			{
				nThis.selectli = nThis.focuslist.find('.liitemparent').find('.lidiv:visible').first();
				nThis.selectli.addClass("select");
			}
			else
			{
				nThis.selectli.removeClass("select");				
				var tempselectli = nThis.selectli.nextAll("div:visible").first();				
				if (tempselectli.find('.codediv').text() == null || tempselectli.find('.codediv').text() == '')
				{						
					tempselectli = nThis.selectli.prevAll('div:visible').last();					
				}				
				nThis.selectli = tempselectli;
				nThis.selectli.addClass("select");
				var parent=$("#"+nThis.id);
				var parentmenu=$("#"+nThis.id+"list")[0];//为什么要[0]?							
				var parentul=$("#" + nThis.id + "list").find(".liitemparent");	
				var maxHeight_lis = $("#"+nThis.id+"list").height();//滚动条  翻页范围
				//maxHeight_lis = maxHeight_lis>250?250:maxHeight_lis ;
				var maxHeight=parent.offset().top+maxHeight_lis;
				var selectliHeight=nThis.selectli.offset().top;
				var selectulHeight=parentul.height();				
				if(selectliHeight>maxHeight)
				{						
					parentmenu.scrollTop=parentmenu.scrollTop+parentmenu.scrollHeight*(maxHeight_lis/selectulHeight)-15; 
				}else if(selectliHeight<0||maxHeight-selectliHeight>maxHeight_lis){
					parentmenu.scrollTop=0;
				}
			}
		}
		if (key == "38")//向上
		{			
			if (nThis.selectli == null)
			{
                nThis.selectli = nThis.focuslist.find('.liitemparent').find('.lidiv:visible').last();
				nThis.selectli.addClass("select");
				var parentmenu=$("#"+nThis.id+"list")[0];	
				parentmenu.scrollTop=parentmenu.scrollHeight; 
			}
			else
			{
				nThis.selectli.removeClass("select");				
				var tempselectli = nThis.selectli.prevAll("div:visible").first();					
				if (tempselectli.find('.codediv').text() == null || tempselectli.find('.codediv').text() == '')
				{	
					tempselectli = nThis.selectli.nextAll('div:visible').last();
				}
				nThis.selectli = tempselectli;
				nThis.selectli.addClass("select");
				
			    var parent=$("#"+nThis.id);
				var parentmenu=$("#"+nThis.id+"list")[0];//为什么要[0]?	
				var parentul=$("#" + nThis.id + "list").find(".liitemparent");				
				var parentTop=parent.offset().top;
				var selectliTop=nThis.selectli.offset().top;
				var selectulHeight=parentul.height();
				var height=selectliTop-parentTop;
				var maxHeight_lis = $("#"+nThis.id+"list").height();//滚动条  翻页范围
				//maxHeight_lis = maxHeight_lis>250?250:maxHeight_lis ;
				if(height<40)
				{
					parentmenu.scrollTop=parentmenu.scrollTop-parentmenu.scrollHeight*(maxHeight_lis/selectulHeight)+15; 
				}else if(height>maxHeight_lis&&parentmenu.scrollTop===0){
					parentmenu.scrollTop=parentmenu.scrollHeight; 
				}
			}
		}
		if (key == "13")/*回车*/
		{	
			var nodeli = (nThis.selectli&&nThis.selectli.is(':visible')&&nThis.selectli) ||nThis.focuslist.find('.liitemparent').find('.lidiv:visible').first();
			var value 	= nodeli.find('.codediv').text();
			var text 	= nodeli.find('.textdiv').text();	
			if(nThis.flag==true)
			{
				nThis.inputField.val(text);
			}
			else
			{
				nThis.inputField.val(value);			
			}
		
			$("#"+nThis.id+'code').val(value);
			$("#"+nThis.id+'text').val(text);
			nThis.updateRelationField(text);
			nThis.focuslist.hide();
			if(nThis.listener != null)
			{
				nThis.listener(nThis.id,value,text);
			}
		}
	});
}

WebCombo.prototype.cancelRequiredTip = function()
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("requiredCombo").removeClass("ErrorCombo").addClass("combolist");
}

WebCombo.prototype.requiredTip = function()
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("combolist").removeClass("ErrorCombo");
	$combo.addClass("requiredCombo");
}

WebCombo.prototype.cancelErrorTip = function()
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("ErrorCombo").removeClass("requiredCombo").addClass("combolist");
}

WebCombo.prototype.ErrorTip = function()
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("combolist").removeClass("requiredCombo");
	$combo.addClass("ErrorCombo");
}

WebCombo.prototype.reStyle = function()
{
	var $combo = $("#" + this.id + "combo");
	$combo.addClass("combolist");
	$combo.removeClass("requiredCombo");
}

/** 获取文本框对象 */
WebCombo.prototype.getTextWidget = function()
{
	var $text = $("#" + this.id + "textfield" + this.qryAll);
	return $text;
}

/**
 * 初始化
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
WebCombo.prototype.init = function()
{
	if (this.id == null)
	{
		return;
	}
	if(typeof $("#" + this.id) == 'undefined'){
		//console.log(this.id+' not  exist ');
		return;
	}
	var w = $("#" + this.id).css('width');
	var pw = $("#" + this.id).parent().css('width');
	//debugger
	var listw = '200px';
	var textw = '181px';
	var texttypestr = '';
	var buttonstr = '';
	if (w == '0px'||typeof  w =='undefined')
	{
		w = '200px';
		$("#" + this.id).css('width', "202px");
	}
	else
	{
		var tempw = w.substr(0, w.length - 2);
		/*
		 * TODO 临时修改样式判断bug  2017年3月16日
		 * 初始化的控件高度宽度 以后不要js控制,用新样式控制
		 */
		if(parseInt(tempw)<20){
			tempw=200;
			w='200px'
		}
		//end 
		textw = tempw - 18;
		listw = tempw - 2 ;
		textw = textw + "px";
		listw = listw + "px";
		$("#" + this.id).css('width', parseInt(tempw) + "px");
	}
	var h = $("#" + this.id).css('height');
	if (h == undefined || h == '0px')
	{
		h = '22px';
		texttypestr = "<input type=text class=combotext id=" + this.id + "textfield" + this.qryAll + " style='width:" + textw + ";height:" + h
				+ "'>";
		buttonstr = "<div id=\""+ this.id +"bnt_bg\" style=\"overflow:hidden;\"><div class=combo_bnt  id=" + this.id + "button ></div></div>";
	}
	else
	{
		texttypestr = "<textArea class=combotext id=" + this.id + "textfield" + this.qryAll + " style='overflow:hidden;width:" + textw
				+ ";height:" + h + "' />";
		var temph = h.substr(0, h.length - 2);
		var lefth = temph - 24;
		var halfh = lefth / 2;
		buttonstr = "<div style='float:right;width:18px;height:" + h + "'>" + "<div id=" + this.id + "buttonheader class='fill'></div>"
				+ "<div id=" + this.id + "buttonup class='up_border' style='width:18px;height:" + halfh + "px'></div>"
				+ "<div class=combo_bnt  id=" + this.id + "button ></div>" + "<div id=" + this.id
				+ "buttondown class='bottom_border' style='width:18px;height:" + halfh + "px'></div></div>";
	}
	var inputtext = "<div class=combolist id=" + this.id + "combo style='width:" + listw + ";height:" + h + "'>" + texttypestr;
	var inputbutton = buttonstr + "<input type=hidden id=" + this.id + "code name=" + this.id + "code ><input type=hidden id=" + this.id
			+ "text name=" + this.id + "text ></div>";
	var combolist = "<div class=newMenu id=" + this.id + "list style='width:" + listw
			+ "' onmouseover='temshowTag=true' onmouseout='temshowTag=false'><a>" + AbisMessageResource["NoData"] + "</a></div>";
	$("#" + this.id).append(inputtext + inputbutton + combolist);
	
	var nThis = this;
	
	if (this.data != null)
	{
		this.setData(data);
	}

}
/** 大数据量检索时使用的方法 :itemtype为0时才能正常工作**/
WebCombo.prototype.search=function(value)
{
	this.selectli=null;
	var nThis=this;
	var $results= null;
	if (value != null && value != "")
	{		
		value = encodeURI(value);
		$.post(WebVar.VarPath + "/util/combo/search/"+this.colName +"/"+ value,
		{filterRgx:nThis.filterRgx}, function(data)
		{
			var tempstr = "";			
			data = eval('(' + data + ')');			
			var liarr = new Array();
			$("#" + nThis.id + "list").find(".lidiv").each(function()
			{				
				liarr.push($(this).find('.codediv').text());
			});			
			if (data != null && data.length != 0)
			{
				for ( var i = 0; i < data.length; i++)
				{
					var tempflag = true;
					for ( var j = 0; j < liarr.length; j++)
					{
						var temp1 = data[i]['code'] + "";
						var temp2 = liarr[j] + "";						
						if (temp1.replace(/^\s+|\s+$/g, "") == temp2.replace(/^\s+|\s+$/g, ""))
						{							
							tempflag = false;
							break;
						}
					}					
					if (tempflag)
					{						
						tempstr = tempstr + "<div class='liitem"+nThis.id+" lidiv'  height=20 ><div class='codediv'><a>" + data[i]['code'] + "</a></div><div class='textdiv'><a>" + data[i]['text']
								+ "</a></div><div class='pinyindiv'><a>" + data[i]['pinyin'].toLowerCase() + "</a></div></div>";
					}
				}
			}			
			$("#" + nThis.id + "list").find(".liitemparent").append(tempstr);			
			value = decodeURI(value);
            $results = $("#" + nThis.id + "list .lidiv").hide().filter(":contains('" + (value) + "')")
            $results.show();
			$("#" + nThis.id + "list").show();
			$('.liitem'+nThis.id).mouseover(function(){nThis.tabletdover(this)})//这两句放在最后面会出问题，因为post方法为异步的。此2句执行的时候，html还未初始好
	        $('.liitem'+nThis.id).click(function(){nThis.tabletdclick(this)});
            nThis.selectli = $results.first();
            nThis.selectli.addClass("select");
		})
	}
	else
	{
        $results = $("#" + nThis.id + "list .lidiv").hide().filter(":contains('')");
        $results.show();
        nThis.selectli = $results.first();
        nThis.selectli.addClass("select");
		$("#" + nThis.id + "list").show();
		nThis.clear();
		nThis.listener&&nThis.listener();
	}	
}
/** 注册代码表按钮事件，模糊查找的键盘事件，代码表文本框得到焦点和失去焦点的方法 **/
WebCombo.prototype.initEvent = function()
{	
	this.buttonEventListener();
	this.inputKeyUp();
	this.inputBlur();
	this.inputFocus();
}


/** 代码表控件文本值 */
WebCombo.prototype.getText = function()
{
	var textval = $("#" + this.id + "text").val();
	if (textval == null || textval == "")
	{	
		var v=$("#"+this.id + "textfield" + this.qryAll).val();
		if(v!=null&&v!="")
		textval = v;
		else
		textval = null;
	}	
	return textval;
}

/**
 * 获取选中代码的对象
 */
WebCombo.prototype.getObject = function()
{
	if(this.data == null)return null;
	var code = this.getCode();
	if(code == null)return null;
	
	for(var i in this.data)
	{
		var d = this.data[i];
		if(d.code == code)
		{
			return d;
		}
	}
	return null;
}

/** 代码表控件代码值 */
WebCombo.prototype.getCode = function()
{
	var codeval = $("#" + this.id + "code").val();
	if (codeval == null || codeval == "")
	{
		var v=$("#"+this.id + "textfield" + this.qryAll).val();
		if(v!=null&&v!="")
		  codeval = v;
		else
		  codeval = null;
	}
	return codeval;
}

/** 根据code值在文本框显示相应的中文 */
WebCombo.prototype.setText = function(code,notify)
{
	if(code==null||code=="")return;
	this.findValue(this.flag,code,notify);
}

/** 根据code值在文本框显示相应的code */
WebCombo.prototype.setCode = function(code,notify)
{
//	if(code==null||code=="")return;
	this.findValue(this.flag,code,notify);
}

/** 内部方法，供setText和setCode调用 */
WebCombo.prototype.findValue= function(flag, code,notify)
{
	var newid = this.id;
	var nThis = this;
	nThis.codeField.val(code);	
	var hasfind = true;
	$("#" + newid + "list").find(".lidiv").each(function()
	{
		if (hasfind)
		{
			var tempcode = $(this).find('.codediv').text();
			if(WebUtil.equals(tempcode,code))
			{
				var temptext = $(this).find('.textdiv').text();								
				nThis.textField.val(temptext);				
				if(flag)	
				{
					nThis.inputField.val(temptext);
				}
				else
				{
					nThis.inputField.val(code);
				}
				nThis.updateRelationField(temptext);
				hasfind = false;
			}
		}
	});
	if (hasfind)
	{
		if(WebUtil.isEmpty(nThis.colName)||WebUtil.isEmpty(code)||(code.trim&&code.trim().length===0)){
			return;//列描述都没有  禁用后台检索  韩健祥 2017年5月27日16:34:41
		}
		var url = WebVar.VarPath +"/util/combo/abiscode/"+nThis.colName+"/"+code;
		if(!WebUtil.isEmpty(code)&&code.indexOf&&code.indexOf('/')>-1){
			url = WebVar.VarPath +"/util/combo/abiscode/"+nThis.colName+"/"+'null';
		}
		$.post(url,{filterRgx:nThis.filterRgx,specialCode:code},
			function(data)
			{
				if(!WebUtil.isNull(data))
				{
					/* 回调方法里不能之间使用this对象，this对象以改变;*/
					nThis.codeField.val(data.code);
					nThis.textField.val(data.text);
					if(flag)	
					{
						nThis.inputField.val(data.text);
					}
					else
					{
						nThis.inputField.val(data.code);
					}
					nThis.updateRelationField(data.text);
				}
				else
				{
					nThis.inputField.val(code);
					nThis.codeField.val(code);
					nThis.textField.val("");
				}
				if(nThis.listener != null && notify == true)
				{
					nThis.listener(nThis.id,code,data.text);
				}
			}
		);
	}
}

/***
 * 更新关联文本字段
 */
WebCombo.prototype.updateRelationField = function(text)
{
	if(this.rId != null)
	{
		this.relatinput = $("#" + this.rId);  //关联字段	
		if(this.relatinput != null)
		{
			var labeltext = this.relatinput.find(".First_Input");
			if(labeltext != null && typeof(labeltext.html()) != "undefined")
			{
				var lastInput  = this.relatinput.find(".Last_Input");
				var lastTxt = lastInput.val();
				if (lastInput != null && typeof(lastInput) != "undefined")
				{
					var index = lastTxt.indexOf(text);
					if(index != -1)
					{
						lastTxt = lastTxt.replace(text,"");
						lastInput.val(lastTxt);
					}
				}
				labeltext.val(text);
			}
			else
			{
				var txtText = this.relatinput.find(".Field_Input");
				if(txtText != null && typeof(txtText.html()) != "undefined")
				{
					txtText.val(text);
				}
				else
				{
					if(this.relatinput.attr("tagName") == "DIV")
					{
				 		this.relatinput.html(text);
					}
					else
					{
						this.relatinput.val(text);
					}
				}
			}
		}
	}
}

//根据text中文，获得对应的code值，并赋给指定的id文本框显示。flag标志用于判断是普通文本框(true)还是下拉框(false)
WebCombo.prototype.setCodeByText = function(columnname, text, id, flag)
{
	var newid = this.id;
	var nThis = this;
	var hasfind = true;
	$("#" + newid + "list ul li").each(function()
	{
		if (hasfind)
		{
			var temptext = $(this).find('.textdiv').text();
			var n = text.indexOf(temptext);
			if (n != -1)
			{
				var tempcode = $(this).find('.codediv').text();
				if (flag)
				{
					$("#" + id).val(tempcode);
				}
				else
				{		
					nThis.codeField.val(tempcode);
				    nThis.textField.val(temptext);
				    nThis.inputField.val(tempcode);
				}
				hasfind = false;
			}
		}
	});
	if (hasfind)
	{
		var url = WebVar.VarPath + "/util/combo/text/" + nThis.colName+"/"+text;
		$.post
		(
			url,{}, 
			function(data)
			{
				if (flag)
				{
					$("#" + id).val(data);	
				}
				else
				{
						nThis.codeField.val(data);
					    nThis.textField.val(text);
					    nThis.inputField.val(data);
				}
			}
		);
	}

}
/** 清空方法 */
WebCombo.prototype.clear = function()
{
	this.codeField.val("");
	this.textField.val("");
	this.inputField.val("");
}

WebCombo.prototype.sort = function(data)
{
	if(WebUtil.isEmpty(data))return;
	var v1,v2;
	data.sort
	(
		function(o1,o2)
		{
			v1	= o1.code;
			v2 	= o2.code;
			flag = v2 - v1 > 0 ? -1 : 1;
			return flag;
		}
	); 

}

/** 赋值方法,data为json数组 */
WebCombo.prototype.setData = function(data)
{
	this.data = data;
	var showcontent = "";	
	var nThis=this;
	/*if(nThis.itemtype!=0){
	
	}*/
	//this.sort(data); 后端按照权重排序
	if (data != null && data.length != 0)
	{
		if(nThis.itemtype==2)
		{
			for ( var i = 0; i < data.length; i++)
			{
				showcontent = showcontent + "<div class='liitem"+nThis.id+" lidiv'><div class='codediv' style='margin-right:-10px;display:none'><a>" + data[i]['code'] + "</a></div><div class='textdiv' style='margin-left:10px;'><a>" + data[i]['text']
						+ "</a></div><div class='pinyindiv'><a>" + data[i]['pinyin'].toLowerCase() + "</a></div></div>";
			}
		}
		else if(nThis.itemtype==1)
		{
			for ( var i = 0; i < data.length; i++)
			{
				showcontent = showcontent + "<div class='liitem"+nThis.id+" lidiv'><div class='codediv' style='margin-left:10px;'><a>" + data[i]['code'] + "</a></div><div class='textdiv' style='display:none'><a>" + data[i]['text']
						+ "</a></div><div class='pinyindiv'><a>" + data[i]['pinyin'].toLowerCase() + "</a></div></div>";
			}
		}
		/*else if(nThis.itemtype==0)
		{
			for ( var i = 0; i < data.length; i++)
			{
				showcontent = showcontent + "<div class='liitem"+nThis.id+" lidiv'><div class='codediv' style='margin-left:10px;margin-right:10px;'><a>" + data[i]['code'] + "</a></div><div class='textdiv' style='margin-right:10px;'><a>" + data[i]['text']
						+ "</a></div></div>";
			}
		}*/
		else
		{
			for ( var i = 0; i < data.length; i++)
			{
				showcontent = showcontent + "<div class='liitem"+nThis.id+" lidiv'><div class='codediv'><a>" + data[i]['code'] + "</a></div><div class='textdiv'><a>" + data[i]['text']
						+ "</a></div><div class='pinyindiv'><a>" + data[i]['pinyin'].toLowerCase() + "</a></div></div>";
			}
		}
		showcontent = "<div class='liitemparent'>" + showcontent + "</div>";
		$("#" + this.id + "list").html("").append(showcontent);
		/*易用性优化化  根据下拉选数量  决定文本框操作形式
		 * 1 如果记录数 <6 不提供检索功能,文本框不可输入
		 * 2 如果记录数 <40 不提供 检索后台数据的功能
		 * 3  如果记录数 >40 根据issearchall 决定是否提供  检索后台数据的功能
		 * hjx 2017年5月16日
		 */
		if(data.length<6){
			this.qryLimit  = true;//限制 检索后台数据
			//this.inputField.attr("readonly","readonly");
		}else if(data.length<40){
			this.qryLimit  = true;//限制 检索后台数据
		}else{
			this.qryLimit  = false;//限制 检索后台数据
		}
	}
	else
	{
		showcontent = "<div class='liitem"+nThis.id+" lidiv'><div class='textdiv'><a>" + AbisMessageResource["CodeTableLoadFailed"] + "</a></div></div>";
		
		showcontent = "<div class='liitemparent'>" + showcontent + "</div>";
		$("#" + this.id + "list").html("").append(showcontent);
	}
	$('.liitem'+this.id).mouseover(function(){nThis.tabletdover(this)})
	$('.liitem'+this.id).click(function(){nThis.tabletdclick()});
	
}
/** 赋值方法,url为一个action路径,用于自己构造自定义的数据,返回的是json数组 */
WebCombo.prototype.setUrl = function(url)
{
	var showcontent = "";
	var divitemwidth = 196;
	var nThis=this;
	$.post(url,{},function(data)
		{		
		    data=eval('('+data+')');		    
			if (data != null && data.length != 0)
			{
				for ( var i = 0; i < data.length; i++)
				{					
				
			     showcontent = showcontent + "<div class='liitem"+nThis.id+" lidiv' ><div class='codediv'><a>" + data[i]['code'] + "</a></div><div class='textdiv'><a>" + data[i]['text']
					+ "</a></div><div class='pinyindiv'><a>" + data[i]['pinyin'].toLowerCase() + "</a></div></div>";
		        }
		   showcontent = "<div class='liitemparent'>" + showcontent + "</div>";
		   $("#" + nThis.id + "list").html("").append(showcontent);
			}
			$('.liitem'+nThis.id).mouseover(function(){nThis.tabletdover(this)})
			$('.liitem'+nThis.id).click(function(){nThis.tabletdclick()});
	   }
	)
}
WebCombo.prototype.getTextByCode = function(code)
{
	var newid = this.id;
	var nThis = this;
	var temptext = null;
	$("#" + newid + "list div div").each(function()
	{
		var tempcode = $(this).find('.codediv').text();
		if (tempcode == code)
		{
			temptext = $(this).find('.textdiv').text();
		}
	});
	return temptext;
}

WebCombo.prototype.tabletdover = function(obj)
{
	if (this.selectli != null)
	{
		this.selectli.removeClass("select");	
	}
	$(obj).addClass("select");
	this.selectli = $(obj);
}
WebCombo.prototype.tabletdclick = function ()
{
	if (this.flag == true)
	{
	  var textvalue=this.selectli.find('.textdiv').text();		 	
	  this.inputField.val(textvalue);
	}		
	else
	{
	  var codevalue=this.selectli.find('.codediv').text();		
	  this.inputField.val(codevalue);
	}	
	var value 	= this.selectli.find('.codediv').text();
	var text 	= this.selectli.find('.textdiv').text();
			
	this.codeField.val(value);
	this.textField.val(text);
	var txtStr = this.selectli.find('.textdiv').text();
	this.updateRelationField(txtStr);
	this.selectli.parent().parent().hide();
	if(this.listener != null)
	{
		this.listener(this.id,value,text);
	}
}
/**解析一整段文本并为二段式文本赋值的方法**/
WebCombo.prototype.setFullText = function (fulltext,secondtextid)
{	
	var shengIndex = fulltext.indexOf("省");
	var lastChar = "省";
	if(shengIndex != -1)
	{
		//有省则去除"省"字
		fulltext = fulltext.replace("省", "");
	}
	else
	{
		var shiIndex = fulltext.indexOf("市");
		if(shiIndex != -1)
		{
			//有市取到市
			lastChar = "市";
			fulltext = fulltext.replace("市", "");
		}
				
		var quIndex = fulltext.indexOf("区");
		if(quIndex != -1)
		{
			lastChar = "区";
		}
		else
		{
			var xianIndex = fulltext.indexOf("县");
			if(xianIndex != -1)
			{
				lastChar = "县";
			}
		}
	}
	var indexpos 	= fulltext.indexOf(lastChar);
	if(indexpos!=-1)
	{
		var hukouaddress	= fulltext.substring(0,indexpos + 1);		  
		var hukoudetail		= fulltext.substring(indexpos + 1);
		this.findCodeByText(hukouaddress);	
		var field = $("#"+secondtextid);
		if(field.attr("tagName") == "DIV")
		{
	 		field.html(hukoudetail);
		}
		else
		{
			field.val(hukoudetail);
		}
	}
	
}
/**解析身份证号码为二段式赋值的方法**/
WebCombo.prototype.setFullTextByShenFenId = function (shenfenid,secondtextid)
{	
	var hukoucode=shenfenid.substring(0,6);
	this.setCode(hukoucode,true);	
	
}

/** 设置是否可以编辑 */
WebCombo.prototype.setEditable = function (editable)
{	
	this.editable = editable;
	var textinput = $("#"+this.id + "textfield" + this.qryAll);
	var flag		= "";
	var addCss 		= "";
	var removeCss	= "";
	if(editable == true)
	{
		flag 		= "";	
		addCss 		= "";
		removeCss 	= "Field_Disable";
	}
	else
	{
		flag 		= "readonly";	
		addCss 		= "Field_Disable";
		removeCss 	= "";
	}
	textinput.attr("readonly",flag);	
	textinput.removeClass(removeCss).addClass(addCss);
	var bntBg = $("#"+this.id + "bnt_bg");
	bntBg.removeClass(removeCss).addClass(addCss);
}
/** 内部方法，文本框得到焦点 */
WebCombo.prototype.inputFocus = function ()
{	    
    var nThis=this;
    this.inputField.focus(function()
	{  	
    	if(nThis.editable == false)return;
    	$("#"+nThis.id+"button").css('background-color','#FCFCD8');
		if(nThis.type==1)
			nThis.showListBox();
		else
			nThis.showList();
	});
}

/**
 * 显示下拉列表框
 */
WebCombo.prototype.showList = function()
{
	if(this.editable == false)return;
	if(this.focuslist==null)
	{
		this.focuslist=$('#' + this.id + 'list');
	}
	$(".newMenu").hide();			
	$("#" + this.id + "list .lidiv").show();	
//	var comboTop 	= $('#' + this.id + 'combo').offset().top;
//	var comboHeight = $('#' + this.id + 'combo').outerHeight(true);
//	var selfTop = comboTop + comboHeight;
//	$('#' + this.id + 'list').css({"top":selfTop+"px"});
	$('#' + this.id + 'list').show();
}
/**
 * 内部方法，用于弹出框里。
 */
WebCombo.prototype.showListBox = function()
{
	if(this.editable == false)return;
	if(this.focuslist==null)
	{
		this.focuslist=$('#' + this.id + 'list');
	}
	$(".newMenu").hide();			
	$("#" + this.id + "list .lidiv").show();
	$('#' + this.id + 'list').show();
}
/**解绑 失去焦点的校验事件   比如检索框不需要校验，支持 模糊匹配*/
WebCombo.prototype.cancelInputBlur = function (){
	this.inputField.unbind("blur");
} 
/** 内部方法，文本框失去焦点 */
WebCombo.prototype.inputBlur = function ()
{	    
	    var nThis=this;
	    this.inputField.blur(function()
    	{	
    		
    	    if(nThis.editable == false)return;
    	    var temptext=nThis.inputField.val();
    	    $("#"+nThis.id+"button").css('background-color','');
    	    //失去焦点后判断文本框中的值是否被清空，清空的话，同时清空text和code
			if(WebUtil.isNull(temptext))
			{		
				nThis.textField.val('');
			 	nThis.codeField.val('');
			 	nThis.updateRelationField('');
				var value = nThis.codeField.val();
				if(!WebUtil.isNull(value))
				{						
					if(WebUtil.isFunction(nThis.listener))
					{
						nThis.listener(nThis.id,"","");
					}
				}
			}
			//判断是否手工输入了正确的代码
			else
			{
				var text =nThis.textField.val();
				var code =nThis.codeField.val();
				if(temptext!=text&&temptext!=code)
				{
					if(WebUtil.isEmpty(nThis.colName)){
						nThis.inputField.val("");
						return;//列描述都没有  禁用后台检索 韩健祥 2017年5月27日16:34:50
					}
					//判断输入值是否在下拉列表里
					temptext = encodeURI(temptext);
					$.post(WebVar.VarPath + "/util/combo/find/"+nThis.colName +"/"+ temptext,
							{filterRgx:nThis.filterRgx}, function(data)
							{
								data = eval('(' + data + ')');
								if(data.length>0)
								{
									var entity=data[0];
									if(nThis.flag)nThis.inputField.val(entity.text);
									else nThis.inputField.val(entity.code);
									nThis.textField.val(entity.text);
								 	nThis.codeField.val(entity.code);
								}
								//输入值不再下拉框里，清空输入值
								else
								{
									nThis.inputField.val("");
								}
							}
							);
					
				}
			}
    	});
}
/** 内部方法，键盘模糊搜索事件 */
WebCombo.prototype.inputKeyUp = function ()
{	 
	var nThis=this;
    var $results= null;
	this.inputField.keyup(function(event)
	{			
		if(!nThis.editable) return;
		if ((event.which >=48 && event.which <=57)||(event.which >=65 && event.which <=90)||(event.which >=96 && event.which <=105)||event.which==8||event.which==46||event.which==32)//这里不屏蔽回车。如果用户使用的是搜狗输入法，用回车搜索拼音字段。
		{	
			if (nThis.rId != null)
				nThis.relatinput = $("#" + nThis.rId);
			$(".newMenu").hide();
			var tempvalue="";
            nThis.selectli&&nThis.selectli.removeClass("select");
			if(nThis.qryAll||nThis.qryLimit)
				{						
				    tempvalue=nThis.inputField.val();
                    $results = $("#" + nThis.id + "list .lidiv").hide().filter(":contains('" + (nThis.inputField.val()) + "')");
                    $results.show();
                    nThis.selectli = $results.first();
                    nThis.selectli.addClass("select");
					$("#" + nThis.id + "list").show();	
					if(tempvalue==null||tempvalue=="")
					{
						nThis.clear();
						nThis.listener&&nThis.listener();
					}
				}
			else
				{
					var value = $(this).val();
					clearTimeout(timeoutId);
					timeoutId = setTimeout(function()
					{
						nThis.search(value)
					}, 1000);
				}
		}
	})
}
/** 内部方法，按钮事件 */
WebCombo.prototype.buttonEventListener = function ()
{	 
	var nThis=this;
	$("#" + nThis.id + "buttonup").mousedown(function()
	{
		if(nThis.editable)
		     nThis.buttonDownListener();
	});
	$("#" + nThis.id + "buttondown").mousedown(function()
	{
		if(nThis.editable)
		     nThis.buttonDownListener();
	});
	$("#" + nThis.id + "button").mousedown(function()
	{		
		if(nThis.editable)
		     nThis.buttonDownListener();
	});
	$("#" + nThis.id + "buttonup").mouseup(function()
	{
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttondown").mouseup(function()
	{
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "button").mouseup(function()
	{
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttonup").mouseover(function()
	{
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttondown").mouseover(function()
	{
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "button").mouseover(function()
	{
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttonup").mouseout(function()
	{
		nThis.buttonOutListener();
	});
	$("#" + nThis.id + "buttondown").mouseout(function()
	{
		nThis.buttonOutListener();
	});
	$("#" + nThis.id + "button").mouseout(function()
	{
		nThis.buttonOutListener();
	});

}
/** 内部方法 */
WebCombo.prototype.buttonDownListener = function ()
{	 
	if(this.editable == false)return;	
	if (this.selectli != null)
	{
		this.selectli.removeClass('select');
	}
	$("#" + this.id + "button").removeClass();
	$("#" + this.id + "button").addClass('combo_bnt_down');
	$("#" + this.id + "buttonheader").removeClass();
	$("#" + this.id + "buttonheader").addClass('fill_down');
	$("#" + this.id + "buttonup").removeClass();
	$("#" + this.id + "buttonup").addClass('up_border_down');
	$("#" + this.id + "buttondown").removeClass();
	$("#" + this.id + "buttondown").addClass('bottom_border_down');
	var cur = 	$('#' + this.id + 'list');	
	if(cur.is(":hidden"))
	{
		cur.attr("current","false");	   
	}
	else
	{
		cur.attr("current","true");			
	}
	if(cur.attr("current") != "true")
	{
		if(this.type==1)
			this.showListBox();
		else
			this.showList();
	}
	else
	{		
		cur.attr("current","false").hide();		
		this.inputField.blur();		
	}	 
	temshowTag = true;	
}
/** 内部方法 */
WebCombo.prototype.buttonOverListener = function ()
{	 
	if(this.editable == false)return;
	$("#" + this.id + "button").removeClass();
	$("#" + this.id + "button").addClass('combo_bnt_hover');
	$("#" + this.id + "buttonheader").removeClass();
	$("#" + this.id + "buttonheader").addClass('fill_hover');
	$("#" + this.id + "buttonup").removeClass();
	$("#" + this.id + "buttonup").addClass('up_border_hover');
	$("#" + this.id + "buttondown").removeClass();
	$("#" + this.id + "buttondown").addClass('bottom_border_hover');
}
/** 内部方法 */
WebCombo.prototype.buttonOutListener = function ()
{	 
	if(this.editable == false)return;
	$("#" + this.id + "button").removeClass();
	$("#" + this.id + "button").addClass('combo_bnt');
	$("#" + this.id + "buttonheader").removeClass();
	$("#" + this.id + "buttonheader").addClass('fill');
	$("#" + this.id + "buttonup").removeClass();
	$("#" + this.id + "buttonup").addClass('up_border');
	$("#" + this.id + "buttondown").removeClass();
	$("#" + this.id + "buttondown").addClass('bottom_border');
}
/** 内部方法,根据code值得到text值 */
WebCombo.prototype.findTextByCode = function (code)
{	 

}
/** 内部方法,根据text值得到code值 */
WebCombo.prototype.findCodeByText = function (text)
{
	var nThis=this;
	$.post(WebVar.VarPath +"/util/combo/text/"+text+"/"+nThis.colName,{},
			function(data)
			{
	           nThis.setCode(data,true);
			}
   );
}
/** 向下拉列表中增加一条记录 */
WebCombo.prototype.addItem = function (code,text,pinyin)
{
	var item=$("<div></div>");
	item.addClass("liitemunitcode");
	item.addClass("lidiv");
	
	var c=$("<div></div>");
	c.addClass("codediv");
	c.html("<a>"+code+"</a>");
	var t=$("<div></div>");
	t.addClass("textdiv");
	t.html("<a>"+text+"</a>");
	var p=$("<div></div>");
	p.addClass("pinyindiv");
	p.html("<a>"+pinyin+"</a>");
	
	item.append(c).append(t).append(p);
	$("#"+this.id+"list").find(".liitemparent").append(item);
}

//目前大数据量检索的时候才会用该方法
WebCombo.prototype.setFilterRgx = function (filterRgx)
{
	this.filterRgx=filterRgx;
}
/*
 * 暴露一个方法  可以调整 下拉框的高度，避免显示不下的情形
 */
WebCombo.prototype.setListStyle = function(css){
	if(WebUtil.isNull(css)) return;
	if(this.editable == false) return;
	if(WebUtil.isNumber(css.height)) {
		$("#"+this.id+"list").height(css.height);//;
	}
}