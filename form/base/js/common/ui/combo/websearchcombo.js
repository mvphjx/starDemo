var oldobj = null;
var index = 0;
var timeoutId;
var showbutton = null;
var showlist = null;

/**
 * 注意：使用该文件的时候需要同时引入websearchcombo-position.js文件，不然会导致地址类，单位代码类代码表检索异常
 * 用于检索的代码表控件 id： 下拉文本框id，对应jsp中div的id 
 * placetype： 该代码框是放在页面上还是对话框里。参数PAGE = 1, BOX = 2
 * flag： (代码值|显示文本) true|false
 * qryAll： 初始化时查询的数据量。全部加载还是部分加载。这里部分加载的只是地址信息（户籍，现住址，国家等涉及地址类和数量超过60的代码表信息的信息） 
 * colName：列名，必须传。不能为null。用于后面查询（新版）。
 * type： 取值[0|1|2]。(0：一般代码表, 1:总数据量>60并且支持检索, 2:地址代码表)
 * showAll：下拉框中的显示类型。true：显示code和text；false：只显示text 
 * clickInvoke:单击时回调外面的方法
 * reId：关联的checkbox控件id。父控件的id
 * width:这是代码表空间的宽度，如果该代码表创建在一个隐藏的div区域内，那么设置给它的宽度，将永远是0.故在这里设置一下。
 */
function WebSearchCombo(id, placetype, flag, qryAll, colName, type, showAll,clickInvoke, reId, width) 
{
	this.id = id;
	this.placetype = placetype;
	this.flag = flag;
	this.qryAll = qryAll;
	this.showAll = showAll;
	this.colName = colName;
	this.type = type;
	this.width = width;
	this.init();
	this.registHotKey($("#" + this.id + "textfield" + this.qryAll));// 注册热键
	this.selectli = null;
	this.focuslist = null;
	this.editable = true;
	this.inputField = $("#" + id + "textfield" + this.qryAll);// 文本框
	this.initEvent();
	this.selectItem = new Array();
	this.itemNo = 0;
	this.invoke = clickInvoke;
	this.children = {};
}


/**
 * 代码表下拉框中的代码表项 id:chebox的name值 parent：父容器组件 data：ABISCode对象 checked：创建的时候是否被选中
 * true：选中 false：未选中 selectitem:name值相同的checkbox被选中的值 inputField：文本框
 * showcode：文本框中显示text还是code true：显示code，false：显示text itemno：下拉列表中的项目总数
 * showAll：显示code，还是显示code和text true：显示code和text,false:只显示text
 */
function ComboCheckBox(id, parent, data, checked, selectitem, inputField,
		showcode, itemno, showAll, invoke) {
	this.parentText = inputField;
	this.parent = parent;
	this.id = id;
	this.code = data.code;
	this.selectitem = selectitem;
	this.showcode = showcode;
	this.itemno = itemno;
	this.showAll = showAll;
	this.invoke = invoke;
	this.checkbox = $("<input></input>");
	this.checkbox.attr("name", id);
	this.checkbox.attr("type", "checkbox");
	this.checkbox.attr("checked", checked);
	this.checkbox.attr("value", data.code);
	this.checkboxdiv = $("<div></div>");
	this.checkboxdiv.attr("class", "checkbox");
	this.checkboxdiv.attr("type", "checkbox");
	this.checkboxdiv.append(this.checkbox);
	var nThis = this;
	this.checkbox.click
	(
		function()
		{
			nThis.checkboxclick(selectitem,true)
		}
	);
	if (!this.showAll) 
	{
		this.checkboxLabel = $("<div></div>");
		this.checkboxLabel.attr("class", "checkboxLabel liitem lidiv");
		this.checkcodeLabel = $("<div></div>");
		this.checkcodeLabel.attr("class", "hidetext");
		this.checkcodeLabel.html(data.code);
		this.checktextLabel = $("<div></div>");
		this.checktextLabel.attr("class", "labeltext");
		this.checktextLabel.html(data.text);
		this.checkboxLabel.append(this.checkcodeLabel).append(this.checktextLabel);	
	} 
	else
	{
		this.checkboxLabel = $("<div></div>");
		this.checkboxLabel.attr("class", "checkboxLabel lidiv liitem");
		this.checkcodeLabel = $("<div></div>");
		this.checkcodeLabel.attr("class", "codediv labeltext");
		this.checkcodeLabel.html(data.code);
		this.checktextLabel = $("<div></div>");
		this.checktextLabel.attr("class", "textdiv labeltext");
		this.checktextLabel.html(data.text);
		this.checkboxLabel.append(this.checkcodeLabel).append(this.checktextLabel);
	}
	this.checktextLabel.attr("id",this.code+"_checktextLabel");
	this.checkcodeLabel.attr("id",this.code+"_checkcodeLabel");
	
	this.checktextLabel.click(function()
	{
		nThis.checkboxclick(selectitem,false);
	});
	this.checkcodeLabel.click(function()
	{
		nThis.checkboxclick(selectitem,false);
	});
	this.checkboxLabel.hover
	(
		function()
		{		      	
			nThis.liitementer(this);
		},
		function()
		{				
			nThis.liitemleft(this);
		}
	);
	this.checkparent = $("<div></div>");
	this.checkparent.attr("class", "checkdiv");
	this.checkparent.attr("id", id + "_" + data.code);
	this.checkparent.append(this.checkboxdiv).append(this.checkboxLabel);
	parent.prepend(this.checkparent);//始终将新加入的的元素放在开始位置
}

/** 注册代码选择事件 */
WebSearchCombo.prototype.addSelectionListener = function(listener) 
{
	this.listener = listener;
}

WebSearchCombo.prototype.getContent = function()
{
	return $("#" + this.id + "combo");
}

WebSearchCombo.prototype.getField = function()
{
	return $("#" + this.id + "textfield" + this.qryAll);
}

/** 注册键盘上下选择和回车事件 */
WebSearchCombo.prototype.registHotKey = function(obj)
{
	var nThis = this;
	obj.keydown(
			function(e) 
			{
				var key = (e.keyCode) || (e.which) || (e.charCode);
				if (key == "40")// 向下
				{
					if (nThis.selectli == null) 
					{
						nThis.selectli = nThis.focuslist.find('.liitemparent').find('.checkdiv:visible').first();
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
						var parent = $("#" + nThis.id);
						var parentmenu = $("#" + nThis.id + "list")[0];// 为什么要[0]?
						var parentul = $("#" + nThis.id + "list").find(".liitemparent");
						var maxHeight = parent.offset().top + 250;
						var selectliHeight = nThis.selectli.offset().top;
						var selectulHeight = parentul.height();
						if (selectliHeight > maxHeight)
						{
							parentmenu.scrollTop = parentmenu.scrollTop
									+ parentmenu.scrollHeight
									* (250 / selectulHeight) - 10;
						}
					}
				}
				if (key == "38")// 向上
				{
					if (nThis.selectli == null) 
					{
						nThis.selectli = nThis.focuslist.find('.liitemparent').find('.checkdiv:visible').last();
						nThis.selectli.addClass("select");
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

						var parent = $("#" + nThis.id);
						var parentmenu = $("#" + nThis.id + "list")[0];// 为什么要[0]?
						var parentul = $("#" + nThis.id + "list").find(".liitemparent");
						var parentTop = parent.offset().top;
						var selectliTop = nThis.selectli.offset().top;
						var selectulHeight = parentul.height();
						var height = selectliTop - parentTop;
						if (height < 40) 
						{
							parentmenu.scrollTop = parentmenu.scrollTop	- parentmenu.scrollHeight * (250 / selectulHeight) + 10;
						}
					}
				}
				if (key == "13")/* 回车 */
				{
					if (nThis.flag == true) 
					{
						nThis.inputField.val(nThis.selectli.find('.textdiv').text());
					} 
					else 
					{
						nThis.inputField.val(nThis.selectli.find('.codediv').text());
					}
					var value = nThis.selectli.find('.codediv').text();
					var text = nThis.selectli.find('.textdiv').text();
					$("#" + nThis.id + 'code').val(value);
					$("#" + nThis.id + 'text').val(text);
					nThis.updateRelationField(text);
					nThis.focuslist.hide();
					if (nThis.listener != null) 
					{
						nThis.listener(nThis.id, value, text);
					}
				}
			});
}

WebSearchCombo.prototype.cancelRequiredTip = function() 
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("requiredCombo").removeClass("ErrorCombo").addClass("combolist");
}

WebSearchCombo.prototype.requiredTip = function() 
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("combolist").removeClass("ErrorCombo");
	$combo.addClass("requiredCombo");
}

WebSearchCombo.prototype.cancelErrorTip = function() 
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("ErrorCombo").removeClass("requiredCombo").addClass("combolist");
}

WebSearchCombo.prototype.ErrorTip = function() 
{
	var $combo = $("#" + this.id + "combo");
	$combo.removeClass("combolist").removeClass("requiredCombo");
	$combo.addClass("ErrorCombo");
}

WebSearchCombo.prototype.reStyle = function() 
{
	var $combo = $("#" + this.id + "combo");
	$combo.addClass("combolist");
	$combo.removeClass("requiredCombo");
}

/** 获取文本框对象 */
WebSearchCombo.prototype.getTextWidget = function() 
{
	var $text = $("#" + this.id + "textfield" + this.qryAll);
	return $text;
}

/**
 * 初始化
 */
WebSearchCombo.prototype.init = function() 
{
	if (this.id == null) 
	{
		return;
	}
	var w = $("#" + this.id).css('width');
	var pw = $("#" + this.id).parent().css('width');
	var listw = '200px';
	var textw = '181px';
	var texttypestr = '';
	var buttonstr = '';
	
	if (this.width != null) 
	{
		w = this.width + "px";
	}
	if (w == '0px') 
	{
		w = '200px';
		$("#" + this.id).css('width', "202px");
	} 
	else 
	{
		var tempw = w.substr(0, w.length - 2);
		textw = tempw - 18;
		listw = tempw;
		textw = textw + "px";
		listw = listw + "px";
		$("#" + this.id).css('width', parseInt(tempw) + 2 + "px");
	}
	var h = $("#" + this.id).css('height');
	if (h == undefined || h == '0px') 
	{
		h = '22px';
		texttypestr = $("<input></input>");
		texttypestr.attr("type", "text");
		texttypestr.attr("class", "combotext");
		texttypestr.attr("id", this.id + "textfield" + this.qryAll);
		texttypestr.attr("style", "width:" + textw + ";height:" + h);

		buttonstr = $("<div></div>");
		buttonstr.attr("id", this.id + "bnt_bg");
		buttonstr.attr("type", "overflow:hidden");

		var combobnt = $("<div></div>");
		combobnt.attr("class", "combo_bnt");
		combobnt.attr("id", this.id + "button");
		buttonstr.append(combobnt);
	} 
	else 
	{
		texttypestr = "<textArea class=combotext id=" + this.id + "textfield"
				+ this.qryAll + " style='overflow:hidden;width:" + textw
				+ ";height:" + h + "' />";
		var temph = h.substr(0, h.length - 2);
		var lefth = temph - 24;
		var halfh = lefth / 2;
		buttonstr = "<div style='float:right;width:18px;height:" + h + "'>"
				+ "<div id=" + this.id + "buttonheader class='fill'></div>"
				+ "<div id=" + this.id
				+ "buttonup class='up_border' style='width:18px;height:"
				+ halfh + "px'></div>" + "<div class=combo_bnt  id=" + this.id
				+ "button ></div>" + "<div id=" + this.id
				+ "buttondown class='bottom_border' style='width:18px;height:"
				+ halfh + "px'></div></div>";
	}
	var inputtext = $("<div></div>");
	inputtext.attr("class", "combolist");
	inputtext.attr("id", this.id + "combo");
	inputtext.attr("style", "width:" + w + ";height:" + h);
	inputtext.append(texttypestr).append(buttonstr);

	var combolist = $("<div></div>");
	combolist.attr("class", "newMenu");
	combolist.attr("id", this.id + "list");
	combolist.attr("style", "width:" + listw);
	combolist.attr("onmouseover", "temshowTag=true");
	combolist.attr("onmouseout", "temshowTag=false");
	combolist.html("<a>无数据</a>");

	$("#" + this.id).append(inputtext).append(combolist);
	var nThis = this;
	if (this.data != null) {
		this.setData(data);
	}

}


/** 大数据量检索时使用的方法 * */
WebSearchCombo.prototype.search = function(value) 
{
	this.selectli = null;
	var nThis = this;
	if (value != null && value != "")
	{
		/** 检索分三种情况 * */
		/** 第一种：设置数据的时候，所有数据项小于等于15项，一次性全部查过来，此时禁用检索* */
		if (nThis.qryAll && nThis.itemNo <= 20)
		{
			//alert("全部数据项在下面列表中，不需要检索");
		} 
		else if (nThis.qryAll && nThis.itemNo > 20)
		{
			$("#" + nThis.id + "list .checkdiv").hide();
			// var showlist=$("#" + nThis.id + "list
			// .checkboxLabel").hide().filter(":contains('" + (value) +
			// "')").parent();
			var showlist1 = $("#" + nThis.id + "list .labeltext").hide()
					.filter(":contains('" + (value) + "')").parent().parent();
			var showlist2 = $("#" + nThis.id + "list .hidetext").hide().filter(
					":contains('" + (value) + "')").parent().parent();
			showlist1.show();
			showlist1.find(".labeltext").show();
			showlist2.show();
			if (nThis.showAll) {
				showlist2.find(".hidetext").show();
			}
			showlist2.find(".labeltext").show();
			for ( var i = 0; i < nThis.selectItem.length; i++)
			{
				var item = nThis.selectItem[i];
				$("#" + item.code).show();
				if (nThis.showAll) 
				{
					$("#" + item.code).find(".hidetext").show();
				}
				$("#" + item.code).find(".labeltext").show();
			}
			$("#" + nThis.id + "list").show();
		} 
		else 
		{
			var selected = "";
			var parent = $("#" + nThis.id + "list").find(".selectedItem");
			parent.html("");
			for ( var i = 0; i < nThis.selectItem.length; i++) {
				var item = nThis.selectItem[i];
				if (item.text != "")
					var selectitem = new ComboCheckBox(nThis.id, parent, item,
							true, nThis.selectItem, nThis.inputField,
							nThis.flag, nThis.itemNo, nThis.showAll,
							nThis.invoke);
			}
			value = encodeURI(value);
			$.post(WebVar.VarPath + "/util/combo/search/" + this.colName + "/"+ value, {}, function(data)
			{
				var tempstr = "";
				data = eval('(' + data + ')');
				//var parent = $("#" + nThis.id + "list").find(".liitemparent").html("");
				var parent = $("#" + nThis.id + "list").find(".liitemparent");
				parent.find(".checkdiv").hide();
				if (data != null && data.length != 0) 
				{
					for ( var i = 0; i < data.length; i++) 
					{
						var tempflag = true;
						for ( var j = 0; j < nThis.selectItem.length; j++) 
						{
							var item = nThis.selectItem[j];
							var temp1 = data[i]['code'] + "";
							var temp2 = item.code;
							if (temp1.replace(/^\s+|\s+$/g, "") == temp2.replace(/^\s+|\s+$/g, "")) 
							{
								tempflag = false;
								break;
							}
						}
						if (tempflag)
						{
							//为了避免出现重复的元素，需要删除parent下和data重合的元素
							var obj=$("#"+nThis.id+"_"+data[i]['code']);
							if(obj!=null)
							{
								obj.remove();
							}
							var filteritem = new ComboCheckBox(nThis.id,
									parent, data[i], false, nThis.selectItem,
									nThis.inputField, nThis.flag, nThis.itemNo,
									nThis.showAll, nThis.invoke);
							nThis.children[data[i].code]=filteritem;
						}
					}
				}
				$("#" + nThis.id + "list").show();
				//$('.liitem' + nThis.id).mouseover(function() 
				//{
				//	nThis.tabletdover(this)
				//})// 这两句放在最后面会出问题，因为post方法为异步的。此2句执行的时候，html还未初始好

			});
		}
	}
	else
	{
		if (nThis.qryAll && nThis.itemNo <= 20)
		{
			this.showAllList();
		}
		else if (nThis.qryAll && nThis.itemNo > 20)
		{
			this.showList();
		} 
		else
		{
			this.showSelectedList();
			var parent = $("#" + nThis.id + "list").find(".liitemparent");
			parent.find(".checkdiv").show();			
		}
			
	}
}
/** 注册代码表按钮事件，模糊查找的键盘事件，代码表文本框得到焦点和失去焦点的方法 * */
WebSearchCombo.prototype.initEvent = function() 
{
	this.buttonEventListener();
	this.inputKeyUp();
	this.inputBlur();
	this.inputFocus();
}

/**
 * 获取ID
 */
WebSearchCombo.prototype.getId = function() 
{
	return this.id;
}

/** 代码表控件代码值,用,分割的一组值 */
WebSearchCombo.prototype.getCode = function() 
{
	var codevalue =  new Array();
	if (this.type != 2) 
	{
		for ( var i = 0;i < this.selectItem.length; i++) 
		{
			var item = this.selectItem[i];
			codevalue.push(item.code);
		}
	} 
	else 
	{
		var str  = this.inputField.val();
		if(str == null || str == "") return null;
		codevalue = str.split(",");
	}
	return codevalue;
}

/** 代码表控件代码值，返回一组ABISCode对象 */
WebSearchCombo.prototype.getABISCode = function() 
{
	return this.selectItem;
}

/** 清空方法 */
WebSearchCombo.prototype.clear = function() 
{
	this.inputField.val("");
    $("input[name='"+this.id+"']:checked").each(function(){$(this).removeAttr("checked");});
    this.selectItem.length = 0;
}

WebSearchCombo.prototype.sort = function(data) 
{
	if (WebUtil.isEmpty(data))
	{
		return;
	}
	var v1, v2;
	data.sort(function(o1, o2)
	{
		v1 = o1.code;
		v2 = o2.code;
		flag = v2 - v1 > 0 ? -1 : 0;
		return flag;
	});

}

WebSearchCombo.prototype.getData = function()
{
	return this.data;
}


WebSearchCombo.prototype.setData = function(data) 
{
	this.clear();
	var showcontent = "";
	var nThis = this;
	this.sort(data);
	this.data = data;
	this.itemNo = 0;
	if(!WebUtil.isEmpty(data))
	{
		this.itemNo = data.length;
		if (data != null && data.length != 0) 
		{
			if (data.length <= 20)
			{
				this.initData1(data);
			}
			else
			{
				this.initData2(data);
			}
		}
	}
}

WebSearchCombo.prototype.initData1 = function(data) 
{
	var showcontent = "<div class='liitemparent' id='"+this.id+"_searchlist'></div>";
	$("#" + this.id + "list").html("").append(showcontent);
	var parent = $("#" + this.id + "list").find(".liitemparent");
	for ( var i = 0; i < data.length; i++) 
	{
		var checkbox = new ComboCheckBox(this.id, parent, data[i], false,
				this.selectItem, this.inputField, this.flag, data.length,
				this.showAll, this.invoke);
		this.children[data[i].code] = checkbox;
	}
}
WebSearchCombo.prototype.initData2 = function(data) {
	var showcontent = "<div class='selectedItem'></div><div class='liitemparent' id='"+this.id+"_searchlist'></div>";
	$("#" + this.id + "list").html("").append(showcontent);
	var parent = $("#" + this.id + "list").find(".liitemparent");
	for ( var i = 0; i < data.length; i++) {
		var checkbox = new ComboCheckBox(this.id, parent, data[i], false,
				this.selectItem, this.inputField, this.flag, data.length,
				this.showAll, this.invoke);
		this.children[data[i].code] = checkbox;
	}
}

// 设置选中的checkbox
WebSearchCombo.prototype.setChecked = function(data) 
{
	for ( var i = 0; i < data.length; i++) 
	{
		var com = this.children[data[i]];
		if(com != null)
		{
			com.setChecked();
			
			// TODO
		}
	}
}

// 设置未选中的checkbox
WebSearchCombo.prototype.setNoChecked = function(data) 
{
	for ( var i = 0; i < data.length; i++) 
	{
		var com = this.children[data[i]];
		com.setNoChecked();
	}
}

/** 赋值方法,url为一个action路径,用于自己构造自定义的数据,返回的是json数组 */
WebSearchCombo.prototype.setUrl = function(url) 
{
	var showcontent = "";
	var divitemwidth = 196;
	var nThis = this;
	$.post(url, {},
			function(data) 
			{
				data = eval('(' + data + ')');
				if (data != null && data.length != 0) 
				{
					for ( var i = 0; i < data.length; i++) 
					{
						showcontent = showcontent + "<div class='liitem"
								+ nThis.id
								+ " lidiv' ><div class='codediv'><a>"
								+ data[i]['code']
								+ "</a></div><div class='textdiv'><a>"
								+ data[i]['text']
								+ "</a></div><div class='pinyindiv'><a>"
								+ data[i]['pinyin'].toLowerCase()
								+ "</a></div></div>";
					}
					showcontent = "<div class='liitemparent'>" + showcontent
							+ "</div>";
					$("#" + nThis.id + "list").html("").append(showcontent);
				}
				$('.liitem' + nThis.id).mouseover(function() {
					nThis.tabletdover(this)
				});
				$('.liitem' + nThis.id).click(function() {
					nThis.tabletdclick()
				});
			}
	);
}

WebSearchCombo.prototype.tabletdover = function(obj) {
	if (this.selectli != null) {
		this.selectli.removeClass("select");
	}
	$(obj).addClass("select");
	this.selectli = $(obj);
}

ComboCheckBox.prototype.liitementer = function(obj) 
{
	$(obj).find(".labeltext").addClass("select");	
}

ComboCheckBox.prototype.liitemleft = function(obj) 
{	
	$(obj).find(".labeltext").removeClass("select");
}

ComboCheckBox.prototype.setChecked = function() 
{
	this.checkbox.attr("checked", "true");
	var nThis = this;
	this.checkboxclick(nThis.selectitem,true);
}

ComboCheckBox.prototype.setNoChecked = function() 
{
	this.checkbox.removeAttr("checked");
	var nThis = this;
	this.checkboxclick(nThis.selectitem,true);
}

//增加了flag1参数，用于标志单击的是checkbox(true)还是显示的文本(false)，用于增大焦点，便于选择
ComboCheckBox.prototype.checkboxclick = function(selectitem,flag1) 
{
	// 单击checkbox的时候，先调用外部方法。
	var nThis = this;
	if(!flag1)
	{
		var c=this.checkbox.attr("checked");
		this.checkbox.attr("checked",!c);
	}
	var checked = this.checkbox.attr("checked");
	var code = this.checkbox.val();
	var text = "";
	if (this.showAll)
	{
		text = this.checkboxLabel.find(".textdiv").html();
	}
	else
	{
		text = this.checkboxLabel.find(".labeltext").html();
	}
	var nThis = this;
	if (checked) 
	{
		var flag = true;
		for ( var i = 0; i < selectitem.length; i++) 
		{
			var item = selectitem[i];
			if (item.code == code) 
			{
				flag = false;
				break;
			}
		}
		if (flag) {
			var im = {};
			im.code = code;
			im.text = text;
			selectitem.push(im);
		}

	} 
	else 
	{
		for ( var i = 0; i < selectitem.length; i++) 
		{
			var item = selectitem[i];
			if (item.code == code) 
			{
				selectitem.splice(i, 1);
				break;
			}
		}
		if (nThis.itemno > 20) 
		{
			//$("#" + this.id + "_" + this.code).remove();
			//var parent = $("#" + this.id + "list").find(".liitemparent");
			//var co = new ComboCheckBox(this.id, parent, item, false,
			//		this.selectitem, this.parentText, this.showcode,
			//		this.itemno, this.showAll, this.invoke);
		}
	}
	var textvalue = "";
	for ( var i = 0; i < selectitem.length; i++)
	{
		var item = selectitem[i];
		if (this.showcode)
		{
			textvalue = textvalue + "," + item.code;
		}
		else
		{
			textvalue = textvalue + "," + item.text;
		}
	}
	this.parentText.val(textvalue.substr(1));
	if (WebUtil.isFunction(nThis.invoke)) 
	{
		nThis.invoke(nThis.code, checked);
	}
}
WebSearchCombo.prototype.tabletdclick = function() 
{
	if (this.flag == true) 
	{
		var textvalue = "";
		var value = "";
		$("input[name='" + this.id + "']:checked").each(
			function() 
			{
				textvalue = textvalue + "," + $(this).next('label').html();
				value = value + "," + $(this).val();
			});
		this.inputField.val("");
		this.inputField.val(textvalue.substr(1));
	}
	else 
	{
		var codevalue = "";
		$("input[name='" + this.id + "']:checked").each(
				function() 
				{
					codevalue = codevalue + "," + $(this).val()
				});
		this.inputField.val(codevalue.substr(1));
	}
	var nthis = this;
	$("input[name='" + this.id + "']:checked").each(
		function() 
		{
			var item = {};
			item.code = $(this).val();
			item.text = $(this).next('label').html();
			var flag = true;
			for ( var i = 0; i < nthis.selectItem.length; i++) 
			{
				var temp = nthis.selectItem[i];
				if (temp.code == item.code) 
				{
					flag = false;
					break;
				}
			}
			if (flag) 
			{
				nthis.selectItem.push(item);
			}
		});
	if (this.listener != null) 
	{
		this.listener(this.id, value, text);
	}
}
/** 设置是否可以编辑 */
WebSearchCombo.prototype.setEditable = function(editable) 
{
	this.editable = editable;
	var textinput = $("#" + this.id + "textfield" + this.qryAll);
	var flag = "";
	var addCss = "";
	var removeCss = "";
	if (editable == true) 
	{
		flag = "";
		addCss = "";
		removeCss = "Field_Disable";
	} else 
	{
		flag = "readonly";
		addCss = "Field_Disable";
		removeCss = "";
	}
	textinput.attr("readonly", flag);
	textinput.removeClass(removeCss).addClass(addCss);
	var bntBg = $("#" + this.id + "bnt_bg");
	bntBg.removeClass(removeCss).addClass(addCss);
}
/** 内部方法，文本框得到焦点 */
WebSearchCombo.prototype.inputFocus = function() 
{
	var nThis = this;
	this.inputField.focus
	(
		function() 
		{
			if (!nThis.qryAll && nThis.type != 2)
				nThis.inputField.val("");
			if (nThis.editable == false)
				return;
			$("#" + nThis.id + "button").css('background-color', '#FCFCD8');
			if (nThis.qryAll && nThis.itemNo <= 20)
			{
				nThis.showAllList();
			}
			else if (nThis.qryAll && nThis.itemNo > 20) 
			{
				nThis.inputField.val("");
				nThis.showList();
			} 
			else
			{
				nThis.showSelectedList();
				var parent = $("#" + nThis.id + "list").find(".liitemparent");
				parent.find(".checkdiv").show();	
			}
			
		}
	);
}

WebSearchCombo.prototype.focus = function()
{
	var field = this.getField();
	field.focus();
}


WebSearchCombo.prototype.blur = function()
{
	var field = this.getField();
	field.blur();
}

/**
 * 显示下拉列表框：当数据量小于等于20的时候，选中和为选中的数据混合显示
 */
WebSearchCombo.prototype.showAllList = function() 
{
	if (this.editable == false)
		return;
	if (this.focuslist == null) 
	{
		this.focuslist = $('#' + this.id + 'list');
	}
	$(".newMenu").hide();
	$("#" + this.id + "list .checkdiv").show();
	if (this.placetype == 0) 
	{
		var comboTop = $('#' + this.id + 'combo').offset().top;
		var comboHeight = $('#' + this.id + 'combo').outerHeight(true);
		var selfTop = comboTop + comboHeight;
		$('#' + this.id + 'list').css({
			"top" : selfTop + "px"
		});
	}
	$('#' + this.id + 'list').show();
}

/**
 * 显示下拉列表框:当数据量大于20且一次都查过来的的时候，选中的数据在上方，位选中的在下方
 */
WebSearchCombo.prototype.showList = function() 
{
	if (this.editable == false)
		return;
	if (this.focuslist == null) 
	{
		this.focuslist = $('#' + this.id + 'list');
	}
	$(".newMenu").hide();
	var parent = $('#' + this.id + 'list').find(".selectedItem");
	var parent1 = $('#' + this.id + 'list').find(".liitemparent");
	var nThis=this;
	parent.find("input:checkbox").not("input:checked").each
	(
		function()
		{
			var code=$(this).val();
			var text=$(this).parent().next().find(".labeltext");
			var item={};
			item.code=code;
			item.text=text;
			$("#" + nThis.id + "_" + code).remove();
			var im = new ComboCheckBox(nThis.id, parent1, item, false,
			nThis.selectItem, nThis.inputField, nThis.flag, nThis.itemNo,
			nThis.showAll, nThis.invoke);
		}
	);
	parent.html("");
	if (this.selectItem.length > 0) 
	{
		for ( var i = 0; i < this.selectItem.length; i++) 
		{
			var item = this.selectItem[i];
			$("#" + this.id + "_" + item.code).remove();
			var im = new ComboCheckBox(this.id, parent, item, true,
					this.selectItem, this.inputField, this.flag, this.itemNo,
					this.showAll, this.invoke);
		}
	} 
	else 
	{
		this.initData2(this.data);
	}
	$("#" + this.id + "list .checkdiv").show();
	$("#" + this.id + "list .labeltext").show();
	if (this.showAll) 
	{
		$("#" + this.id + "list .hidetext").show();
	}
	
	// $("#" + this.id + "list .checkdiv").find(".labeltext").show();
	if (this.placetype == 0) 
	{
		var comboTop = $('#' + this.id + 'combo').offset().top;
		var comboHeight = $('#' + this.id + 'combo').outerHeight(true);
		var selfTop = comboTop + comboHeight;
		$('#' + this.id + 'list').css({
			"top" : selfTop + "px"
		});
	}
	$('#' + this.id + 'list').show();
}

/**
 * 显示下拉列表框:数据量很大的时候，一次性没有查询过来，上面显示已选择的数据，下面显示查询出来的数据
 * 此时文本框区域的功能是显示选中代码和提供检索的功能，此时删除文本框的区域的代码，不会删除选中的数据。如果要删除需要取消checkbox的选中
 */
WebSearchCombo.prototype.showSelectedList = function() 
{
	if (this.editable == false)
		return;
	$(".newMenu").hide();
	if (this.selectItem.length != 0) 
	{
		if (this.focuslist == null) 
		{
			this.focuslist = $('#' + this.id + 'list');
		}
		var parent = $('#' + this.id + 'list').find(".selectedItem");		
		parent.html("");		
		for ( var i = 0; i < this.selectItem.length; i++)
		{
			var item = this.selectItem[i];
			$("#"+this.id+"_"+item.code).remove();
			var im = new ComboCheckBox(this.id, parent, item, true,
					this.selectItem, this.inputField, this.flag,
					this.itemNo, this.showAll, this.invoke);					
		}
	} 
	else
	{
		var n = $("#" + this.id + "list .checkdiv").length;
		if (n == 0)
		{
			this.initData2(this.data);
		}
	}
	$("#" + this.id + "list .checkdiv").show();
	if (this.placetype == 0) 
	{
		var comboTop = $('#' + this.id + 'combo').offset().top;
		var comboHeight = $('#' + this.id + 'combo').outerHeight(true);
		var selfTop = comboTop + comboHeight;
		$('#' + this.id + 'list').css({
			"top" : selfTop + "px"
		});
	}
	$('#' + this.id + 'list').show();
}


/** 清空已选择的项目*/
WebSearchCombo.prototype.clearSelectSet  = function()
{
	this.selectItem.length = 0;
	this.clear();
}

/** 内部方法，文本框失去焦点 */
WebSearchCombo.prototype.inputBlur = function()
{
	var nThis = this;
	this.inputField.blur(function()
	{
		if (nThis.editable == false)
		{
			return;
		}
		var textvalue = "";
		if (nThis.type != 2)
		{
			for ( var i = 0; i < nThis.selectItem.length; i++) 
			{
				var item = nThis.selectItem[i];
				if (nThis.flag)
				{
					textvalue = textvalue + "," + item.code;
				}
				else
				{
					textvalue = textvalue + "," + item.text;
				}
			}
			nThis.inputField.val(textvalue.substr(1));
			$("#" + nThis.id + "button").css('background-color', '');
		} 
		else 
		{
			var values = nThis.inputField.val();
			var valuearry = values.split(",");
			if (nThis.selectItem.length > 0) 
			{
				for ( var j = 0; j < valuearry.length; j++) 
				{
					var flag = true;
					for ( var i = 0; i < nThis.selectItem.length; i++) 
					{
						var item = nThis.selectItem[i];
						if (item.code == valuearry[j]) 
						{
							flag = false;
							break;
						}
					}
					if (flag) 
					{
						var codestr = valuearry[j];
						if (codestr.indexOf("*") != -1) 
						{
							var it = {};
							it.code = valuearry[j];
							it.text = "";
							nThis.selectItem.push(it);
						}
					}
				}
			}
		}
	});
}
/** 内部方法，键盘模糊搜索事件 */
WebSearchCombo.prototype.inputKeyUp = function() {
	var nThis = this;
	this.inputField.keyup(function(event) {
		if (!nThis.editable)
			return;
		if ((event.which >= 48 && event.which <= 57)
				|| (event.which >= 65 && event.which <= 90)
				|| (event.which >= 96 && event.which <= 105)
				|| event.which == 8 || event.which == 46 || event.which == 32)// 这里不屏蔽回车。如果用户使用的是搜狗输入法，用回车搜索拼音字段。
		{
			$(".newMenu").hide();
			if (nThis.qryAll)
			{
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function()
				{
					nThis.search(nThis.inputField.val())
				}, 1000);
			} 
			else
			{
				var value = $(this).val();
				var position = $(this).position();// 光标位置				
				if (nThis.type == 2)
				{
					var arry = value.split(",");
					if (value.length == position)
					{
						value = arry[arry.length - 1];						
					}
					else if (arry.length > 1)
					{
						var n = 0;
						var m = 0;
						for ( var i = 0; i < arry.length - 1; i++) 
						{
							n = n + arry[i].length;
							m = n + arry[i + 1].length;
							if (position > n && position <= m)
							{
								value = arry[i];
								break;
							} 
							else if (position <= n)
							{
								value = arry[i];
								break;
							}
						}
					}
				}
				clearTimeout(timeoutId);
				timeoutId = setTimeout(function() {
					nThis.search(value)
				}, 1000);
			}
		}
	})
}
/** 内部方法，按钮事件 */
WebSearchCombo.prototype.buttonEventListener = function() {
	var nThis = this;
	$("#" + nThis.id + "buttonup").mousedown(function() {
		if (nThis.editable)
			nThis.buttonDownListener();
	});
	$("#" + nThis.id + "buttondown").mousedown(function() {
		if (nThis.editable)
			nThis.buttonDownListener();
	});
	$("#" + nThis.id + "button").mousedown(function() {
		if (nThis.editable)
			nThis.buttonDownListener();
	});
	$("#" + nThis.id + "buttonup").mouseup(function() {
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttondown").mouseup(function() {
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "button").mouseup(function() {
		nThis.buttonOverListener();
	});

	$("#" + nThis.id + "buttonup").mouseover(function() {
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttondown").mouseover(function() {
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "button").mouseover(function() {
		nThis.buttonOverListener();
	});
	$("#" + nThis.id + "buttonup").mouseout(function() {
		nThis.buttonOutListener();
	});
	$("#" + nThis.id + "buttondown").mouseout(function() {
		nThis.buttonOutListener();
	});
	$("#" + nThis.id + "button").mouseout(function() {
		nThis.buttonOutListener();
	});

}
/** 内部方法 */
WebSearchCombo.prototype.buttonDownListener = function() {
	if (this.editable == false)
		return;
	if (this.selectli != null) {
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
	var cur = $('#' + this.id + 'list');
	if (cur.is(":hidden")) {
		cur.attr("current", "false");
	} else {
		cur.attr("current", "true");
	}
	if (cur.attr("current") != "true") {
		if (this.qryAll && this.itemNo <= 20)
			this.showAllList();
		else if (this.qryAll && this.itemNo > 20) {
			this.showList();
		} else
		{
			this.showSelectedList();
			var parent = $("#" + this.id + "list").find(".liitemparent");
			parent.find(".checkdiv").show();
		}			
	} else {
		cur.attr("current", "false").hide();
		this.inputField.blur();
	}
	temshowTag = true;
}
/** 内部方法 */
WebSearchCombo.prototype.buttonOverListener = function() {
	if (this.editable == false)
		return;
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
WebSearchCombo.prototype.buttonOutListener = function() {
	if (this.editable == false)
		return;
	$("#" + this.id + "button").removeClass();
	$("#" + this.id + "button").addClass('combo_bnt');
	$("#" + this.id + "buttonheader").removeClass();
	$("#" + this.id + "buttonheader").addClass('fill');
	$("#" + this.id + "buttonup").removeClass();
	$("#" + this.id + "buttonup").addClass('up_border');
	$("#" + this.id + "buttondown").removeClass();
	$("#" + this.id + "buttondown").addClass('bottom_border');
}

