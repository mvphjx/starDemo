
function ComboParam() 
{
	/**
	 * 外部DIV Id
	 */
	this.pId 			= null;
	
	/**
	 * 
	 */
	this.id 			= null;
	
	/**
	 * 样式
	 */
	this.cssName 		= null;
	
	/**
	 * 关联的文本控件ID
	 */
	this.relatid 		= null;
	
	/**
	 * 显示文本为真否则显示代码
	 */
	this.flag			= true;
	
	/**
	 * 是否去检索代码表
	 */
	this.issearchall	= false;
	
	/**
	 * 列名称
	 */
	this.columnName		= null;
	
	/**
	 * 提示
	 */
	this.tip			= null;
	
	this.requriedList	= null;
	
	/**
	 * see WebComboType
	 * [0 page | 1 window] 
	 */
	this.combotype		= WebComboType.PAGE;
	
	/**
	 * see ComboItemType
	 * [0 full | 1 code | 2 text]
	 */
	this.itemtype		= ComboItemType.Full;
}


var WebUI =
{
	createDiv:function(id,cssName,txt)
	{
		var $div  = $("<div></div>");
		if(!WebUtil.isNull(id))
		{
			$div.attr("id",id);
		}
		if(!WebUtil.isNull(cssName))
		{
			$div.attr("class",cssName);
			//$div.addClass(cssName);
		}
		if(!WebUtil.isNull(txt))
		{
			$div.html(txt);
		}
		return $div;
	},
	createSpan:function(id,cssName,txt)
	{
		var $span  = $("<span></span>");
		if(!WebUtil.isNull(id))
		{
			$span.attr("id",id);
		}
		if(!WebUtil.isNull(cssName))
		{
			$span.attr("class",cssName);
			//$span.addClass(cssName);
		}
		if(!WebUtil.isNull(txt))
		{
			$span.text(txt);
		}
		return $span;
	},
	createNormalButton:function(id,nCss,hCss,dCss,invoke)
	{
		var button = $("#"+id);
		button.attr("class",nCss);
		//button.addClass(nCss);
		button.bind("selectstart",function(){return false});
		button.mouseout
		(
			function()
			{
				$(this).attr("class",nCss);
				//$(this).addClass(nCss);
			}
		);
		button.mouseover
		(
			function()
			{
				$(this).addClass(hCss);
			}
		);
		button.mouseup
		(
			function()
			{
				$(this).removeClass(downCss);
				$(this).addClass(hoverCss);
			}
		);
		button.mousedown
		(
			function()
			{
				$(this).removeClass(hCss);
				$(this).addClass(dCss);
				invoke();
			}
		);
	},
	BntType:
	{
		B_LOGIN :"LOGIN",
		B_40_24	:"40_24",
		B_60_24	:"60_24",
		B_80_24	:"80_24",
		B_100_24:"100_24",
		B_120_24:"120_24",
		B_40_28	:"40_28",
		B_60_28	:"60_28",
		B_80_28	:"80_28",
		B_100_28:"100_28",
		B_120_28:"120_28",
		B_40_32	:"40_32",
		B_60_32	:"60_32",
		B_80_32	:"80_32",
		B_100_32:"100_32",
		B_120_32:"120_32"
	},
	createWebButton: function(id,type,css,invoke)
	{
		var bnt = new WebButton(id,type,css,invoke);
		return bnt;
	},
	WebInputType:
	{
		Text		:"Text",
		Date		:"Date",
		DateTime	:"DateTime",
		CodeText	:"CodeText",
		MultiText	:"MultiText",
		Combo		:"Combo",
		SearchCombo :"SearchCombo",//多选下拉框
		Label       :"Label",
		Password	:"Password",
		MultipleCombo :"MultipleCombo"//多选下拉框
	},
	createLabel:function(pId,id,cssName)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.Label,null,false,false,null,null,null);
		return webField;
	},
	createText:function(pId,id,cssName,title,colNameList)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.Text,null,false,false,null,title,colNameList);
		return webField;
	},
	createDateText:function(pId,id,cssName,title,colNameList,my97Options)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.Date,null,false,false,null,title,colNameList,null,null,null,my97Options);
		return webField;
	},
	createDateTimeText:function(pId,id,cssName,title,colNameList)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.DateTime,null,false,false,null,title,colNameList);
		return webField;
	},
	createCodeText:function(pId,id,cssName,title,colNameList)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.CodeText,null,false,false,null,title,colNameList);
		return webField;
	},
	createMulText:function(pId,id,cssName,title,colNameList)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.MultiText,null,false,false,null,title,colNameList);
		return webField;
	},
	createCombo1:function(p)
	{
		var webField = new WebInput(p.pId,p.id,p.cssName,this.WebInputType.Combo,p.relatid,p.flag,p.issearchall,p.columnName,p.tip,p.requriedList,p.combotype,p.itemtype);
		return webField;
	},
	/**
	 * 创建下拉选
	 * @param pId  父容器ID
	 * @param id   控件id
	 * @param cssName  样式
	 * @param relatid	关联变化时关联字段的id
	 * @param flag	显示代码/文本
	 * @param issearchall  全搜索
	 * @param columnName	表名|字典名
	 * @param title			标题
	 * @param colNameList	必填字段数组
	 * @param combotype		表示该下拉框是在普通页面中还是在弹出框中
	 * @param itemtype		表示下拉列表中的显示格式。0：同时显示code和value;1：只显示code;2:只显示txt
	 * @returns {WebInput}
	 */
	createCombo:function(pId,id,cssName,relatid,flag,issearchall,columnName,title,colNameList,combotype,itemtype)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.Combo,relatid,flag,issearchall,columnName,title,colNameList,combotype,itemtype);
		return webField;
	},
	createMultipleCombo:function(pId,id,cssName,combotype,flag,colNameList,colName)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.MultipleCombo,null,flag,false,colName,null,colNameList,combotype);
		return webField;
	},
	createSearchCombo:function(pId,id,cssName,combotype,flag,colNameList,colName)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.SearchCombo,null,flag,false,colName,null,colNameList,combotype);
		return webField;
	},
	createPasswordText:function(pId,id,cssName,title,colNameList)
	{
		var webField = new WebInput(pId,id,cssName,this.WebInputType.Password,null,false,false,null,title,colNameList);
		return webField;
	},
	/**
	 * 创建链接按钮
	 * @param {Object} id 			父容器ID
	 * @param {Object} type			类型 WebUI.LinkTypeCode
	 * @param {Object} css			样式通常指定外边据
	 * @param {Object} invoke		回调函数
	 * @param {Object} text			文本(优先使用)
	 * @param {Object} img			图标(type为DEFINED启作用)
	 * @param {Object} hImg			鼠标划过图标(type为DEFINED启作用)
	 */
	createLinkButton:function(id,cfgParam,invoke)
	{
		var webLink = new WebLinkButton(id,cfgParam,invoke);
		return webLink;
	},
	createToolBnt:function(id,css,disableCss,invoke)
	{
		var toolBnt = new WebToolButton(id, css, disableCss, invoke);
		return toolBnt;
	},
	TxtBntType:
	{
		PUSH	:0,
		TOGGLE	:1
	},
	/**
	 * 文本按钮(用于工具栏上)
	 * @param id div id
	 * @param type {@link TxtBntType}
	 * @param invoke 
	 */
	createTxtBnt:function(id,type,invoke,checked)
	{
		var bnt = new WebTextButton(id,type,invoke,checked);
		return bnt;
	}
}

/**
 * 超链接按钮
 * @param id
 * @param param {normal:"",hover:"",disable:"",txt:""}
 * @param css
 * @param invoke
 */
function WebLinkButton(id,param,invoke)
{
	this.id 		= id;
	this.param		= param;
	this.invoke 	= invoke;
	this.txt 		= param.txt;
	this.icon		= param.normal;
	this.hoverIcon	= param.hover;
	this.disableIcon= param.disable;
	this.init();
}

WebLinkButton.prototype.init = function()
{
	if(WebUtil.isNull(this.id))return;
	$parent = $("#"+this.id);
	$parent.addClass("LinkBnt_28_Right");
	
	this.linkBnt = $("<div id=\""+this.id+"_bnt\" class=\"LinkButton\"></div>");
	this.linkImg = $("<div id=\""+this.id+"_img\"></div>");
	this.linkImg.addClass("Image");
	this.linkImg.addClass(this.icon);
	this.linkTxt = $("<div id=\""+this.id+"_txt\"></div>");
	this.linkTxt.addClass("Text");
	this.linkTxt.html(this.txt);
	
	this.linkBnt.append(this.linkImg);
	this.linkBnt.append(this.linkTxt);
	
	$parent.append(this.linkBnt);
	
	var nThis = this;
	this.linkBnt.mouseover
	(
		function()
		{
			if(nThis.enabled == false)return;
			nThis.linkImg.removeClass(nThis.icon);
			nThis.linkImg.addClass(nThis.hoverIcon);
			nThis.linkTxt.addClass("Hover_Text");		
		}
	);
	this.linkBnt.mouseout
	(
		function()
		{
			nThis.linkImg.removeClass(nThis.hoverIcon);
			nThis.linkImg.addClass(nThis.icon);
			nThis.linkTxt.removeClass("Hover_Text");
		}
	);
	this.linkBnt.click
	(
		function()
		{
			
			if(nThis.enabled == false)return;
			if(WebUtil.isFunction(nThis.invoke))
			{
				nThis.invoke(nThis.id);
			}
		}
	);
}
WebLinkButton.prototype.setVisible = function(visible)
{
	this.visible = visible;
	if(this.visible == true)
	{
		
	}
}

WebLinkButton.prototype.setEnabled = function(enabled)
{
	this.enabled 	= enabled;
	if(this.enabled == false)
	{
		this.linkTxt.addClass("Text_Disable");
		this.linkImg.removeClass(this.icon);
		this.linkImg.removeClass(this.hoverIcon);
		this.linkImg.addClass(this.disableIcon);
	}	
	else
	{
		this.linkTxt.removeClass("Text_Disable");
		this.linkImg.removeClass(this.disableIcon);
		this.linkImg.removeClass(this.hoverIcon);
		this.linkImg.addClass(this.icon);
	}
}
/**
 * 创建控件
 * @param pId  		父容器ID
 * @param id   		控件id
 * @param css  		样式
 * @param type		类型(文本|下拉框)	缺省为文本框
 * @param rId		关联变化时关联字段的id
 * @param flag		显示代码/文本
 * @param issearchall  全部加载还是部分加载
 * @param columnName	表名|字典名
 * @param title			标题
 * @param colNameList   必填字段数组
 * @param combotype	表示该下拉框是在普通页面中还是在弹出框中
 * @param itemtype	表示下拉列表中的显示格式。0：同时显示code和value;1：只显示code;2:只显示txt
 * @param placeType	data(json)
 */
function WebInput(pId,id,css,type,rId,flag,issearchall,columnName,title,colNameList,combotype,itemtype,placeType,my97Options)
{
	this.id 		= id;
	this.columnName = columnName; 
	this.type 		= type;
	this.editable	= true;
	this.prevValue	= null;
	this.$content 	= $("<div class=\"Field_Body\"></div>");
	this.data		= {};
	
	$("#"+pId).append(this.$content);
	
	if(WebUtil.isNull(css))
	{
		css = "";
	}
	var tWidget = null;
	if(WebUtil.isNull(type) || type == WebUI.WebInputType.Text || type == WebUI.WebInputType.Date ||  type == WebUI.WebInputType.DateTime)
	{
		this.text = $("<input></input>");
		this.text.attr("id",id);
		this.text.attr("name",id);
		this.text.attr("class","Text_Input Field_Input " + css);
		//this.text.addClass("Text_Input Field_Input").addClass(css);
		registerTextListener(id,this.text);
		this.$content.append(this.text);
		tWidget = this.text;
		if(type == WebUI.WebInputType.Date)
		{
			var settting  = {onpicked:cDayFunc};
			if(!WebUtil.isEmpty(my97Options)){
				$.extend(settting,my97Options)
			}
			var nThis = this;
			this.text.focus(function(){
					if(nThis.editable == true)
					{
						WdatePicker(settting);
					}
				});
		}else if(type == WebUI.WebInputType.DateTime) {
			var settting  ={
					dateFmt : 'yyyy-MM-dd HH:mm:ss',
					realDateFmt : "yyyy-MM-dd",
					startDate:'%y-%M-%d 00:00:00',
                	onpicked:cDayFunc,
					alwaysUseStartDate:true
					};
			if(!WebUtil.isEmpty(my97Options)){
				jquery.extend(settting,my97Options)
			}
			var nThis = this;
			this.text.focus(function(){
					if(nThis.editable == true)
					{
						WdatePicker(settting);
					}
				});
		}
		function cDayFunc() {
            $(this).keyup();
        }
	}
	else if(type == WebUI.WebInputType.Password)
	{
		this.text = $("<input type='password'></input>");
		this.text.attr("id",id);
		this.text.attr("name",id);
		this.text.attr("class","Text_Input Field_Input "+css);
		//this.text.addClass("Text_Input Field_Input").addClass(css);
		registerTextListener(id,this.text);
		this.$content.append(this.text);
		tWidget = this.text;
	}
	else if(type == WebUI.WebInputType.Label)
	{
		this.lab = $("<div></div>");
		this.lab.attr("id",id);		
		this.lab.attr("class","Field_Input Label_Input "+css);	
		//this.lab.addClass("Field_Input Label_Input").addClass(css);
		this.$content.append(this.lab);
		tWidget = this.lab;
	}
	else if(type == WebUI.WebInputType.CodeText)
	{
		this.$compositeField = $("<div class=\"Text_Input Composite_Input\"></div>");
		this.firstText = $("<input></input>");
		this.firstText.attr("id",id);
		this.firstText.attr("name",id);
		this.firstText.attr("class","Field_Input First_Input");
		//this.firstText.addClass("Field_Input First_Input");
		this.firstText.attr("readonly","readonly");
		this.$compositeField.append(this.firstText);
		
		this.secondText = $("<input></input");
		this.secondText.attr("id",id+"_AppText");
		this.secondText.attr("name",id+"_AppText");
		this.secondText.attr("class","Field_Input Last_Input "+ css);
		if("Address"===css){
			//根据样式决定是否需要第二个input 作为补充
			this.secondText.attr("style","display:none");
		}
		//this.secondText.addClass("Field_Input Last_Input").addClass(css);
		registerTextListener(id,this.secondText);
		this.$compositeField.append(this.secondText);
		tWidget = this.secondText;
		this.$content.append(this.$compositeField);
	}
	else if(type == WebUI.WebInputType.Combo)
	{
		this.comboDiv = $("<div></div>");
		this.comboDiv.attr("id",id);
		this.comboDiv.attr("class","Field_Input " + css);
		//this.comboDiv.addClass("Field_Input").addClass(css);
		this.$content.append(this.comboDiv);
	}
	else if(type == WebUI.WebInputType.SearchCombo)
	{
		this.srhComboDiv = $("<div></div>");
		this.srhComboDiv.attr("id",id);
		this.srhComboDiv.attr("class","Field_Input " + css);
		//this.srhComboDiv.addClass("Field_Input").addClass(css);
		this.$content.append(this.srhComboDiv);
	}
	else if(type == WebUI.WebInputType.MultipleCombo)
	{
		this.srhComboDiv = $("<div></div>");
		this.srhComboDiv.attr("id",id);
		//this.srhComboDiv.attr("class","Field_Input " + css);
		this.$content.append(this.srhComboDiv);
	}
	else
	{
		this.multiText = $("<textarea></textarea>");
		this.multiText.attr("id",id);
		this.multiText.attr("name",id);
		this.multiText.attr("class","Text_Input Field_Input " + css);
		//this.multiText.addClass("Text_Input Field_Input").addClass(css);
		registerTextListener(id,this.multiText);
		this.$content.append(this.multiText);
		tWidget = this.multiText;
	}
	//右图标区
	if(!WebUtil.isEmpty(colNameList))
	{
		$iconArea = $("<div class=\"Field_Image\"></div>");
		$upIcon = $("<div class=\"Field_Up_Image\"></div>");
		$downIcon = $("<div class=\"Field_Down_Image\"></div>");
		$iconArea.append($upIcon);
		$iconArea.append($downIcon);
		this.$content.append($iconArea);
	}
	var nThis = this;
	//如果是下拉框类型则创建下拉框
	if(type == WebUI.WebInputType.Combo)
	{
		//创建下拉框控件
		if(WebUtil.isNull(itemtype))
		{
			itemtype = 0;
		}
		this.combo = new WebCombo(id, rId, null, flag, issearchall, columnName,combotype,itemtype);
		this.combo.addSelectionListener
		(
			function(id,value,text)
			{
				if(WebUtil.isFunction(nThis.listener))
				{
					nThis.listener(id,value,text);
				}
			}
		);
		tWidget = this.combo.getTextWidget();
	}
	else if(type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo = new WebSearchCombo(id, placeType, flag, true, columnName, 0, false, change);
		var nThis = this;
		function change(value,checked)
		{
			if(!WebUtil.isNull(nThis.listener))
			{
				var code = nThis.searchCombo.getCode();
				nThis.listener(id,code,null);
			}
		}
		tWidget = this.searchCombo.getField();
	}else if(type == WebUI.WebInputType.MultipleCombo)
	{
		this.multipleCombo = new WebMultipleCombo(id, placeType, flag, true, columnName, 0, false, change);
		var nThis = this;
		function change(value,checked)
		{//TODO
			return;
			if(!WebUtil.isNull(nThis.listener))
			{
				var code = nThis.multipleCombo.getCode();
				nThis.listener(id,code,null);
			}
		}
		tWidget = null;
	}
	if(tWidget != null)
	{
		tWidget.attr("title",title);
		//注册文本框焦点事件
		tWidget.focus
		(
			function()
			{
				$(this).addClass("Input_Focus");
				$(this).removeClass("Input_Blur");
			}
		);
		tWidget.blur
		(
			function()
			{
				
				$(this).addClass("Input_Blur");
				$(this).removeClass("Input_Focus");
			}
	);
	}
	// 查看该控件是否属于必填项
	var isRequired = WebArrayUtil.containsToIgnoreCase(colNameList,id);
	this.setRequired(isRequired);
	
	function registerTextListener(id,text)
	{
		if(WebUtil.isNull(text))return;
		var txt = new RegExp(/["'<>%;)(&+]/);
		text.keypress
		(
			function(e)
			{
				if(!WebUtil.isNull(e)){
					var code = (e.keyCode) || (e.which) || (e.charCode);
				    var character = String.fromCharCode(code);
				    if(txt.test(character)){
				    	////验证输入框内不能输入特殊字符，输入前先作判断
				        if(document.all){
				            window.event.returnValue = false;
				        }else{
				            arguments.callee.caller.arguments[0].preventDefault();
				        }
				    }else{
				    	nThis.prevValue = $(this).val();
				    }
				}
			}
		);
		text.keyup
		(
			function(e)
			{
				var b = nThis.validateValue();//回调之前，增加一个校验 普通输入框可能会重复校验 
				//if(nThis.prevValue == $(this).val())return;//hjx 修改原因：rcp 复制后 触发keypress+keyup 有问题
				nThis.prevValue = $(this).val();
				if(WebUtil.isFunction(nThis.listener))
				{
					nThis.listener(id,$(this).val(),e);	
				}						
			}
		);
	}
}


WebInput.prototype.addChangeListener = function(listener)
{
	this.listener = listener;
}

WebInput.prototype.getId = function()
{
	return this.id;
}

WebInput.prototype.getType = function()
{
	return this.type;
}

WebInput.prototype.focus = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.focus();
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.focus();
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.secondText.focus();
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo.focus();
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.getTextWidget().focus();
	}
	else if(this.type == WebUI.WebInputType.MultipleCombo)
	{
		this.multipleCombo.focus();
	}
	else
	{
		alert(this.id+AbisMessageResource.Alert["DidNotImplementFocusMethod"]);
	}
}

WebInput.prototype.blur = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.blur();
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.blur();
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.secondText.blur();
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo.blur();
	}
	else if(this.type == WebUI.WebInputType.MultipleCombo)
	{
		this.multipleCombo.blur();
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.getTextWidget().blur();
	}
	else
	{
		alert(this.id+AbisMessageResource.Alert["DidNotImplementBlurMethod"]);
	}
}

WebInput.prototype.cancelRequiredTip = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.removeClass("Required_Input_Tip").removeClass("Error_Field_Tip").addClass("Text_Input");
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.removeClass("Required_Input_Tip").removeClass("Error_Field_Tip").addClass("Text_Input");
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.$compositeField.removeClass("Required_Input_Tip").removeClass("Error_Field_Tip").addClass("Text_Input");
	}
	else if(this.type ==WebUI.WebInputType.Combo)
	{
		this.combo.cancelRequiredTip();
	}
}


WebInput.prototype.requiredTip = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.removeClass("Text_Input").removeClass("Error_Field_Tip");
		this.text.addClass("Required_Input_Tip");
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.removeClass("Text_Input").removeClass("Error_Field_Tip");
		this.multiText.addClass("Required_Input_Tip");
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.$compositeField.removeClass("Text_Input").removeClass("Error_Field_Tip");
		this.$compositeField.addClass("Required_Input_Tip");
	}
	else if(this.type ==WebUI.WebInputType.SearchCombo)
	{
		var c = this.searchCombo.getCode();
	}
	else if(this.type ==WebUI.WebInputType.Combo)
	{
		this.combo.requiredTip();
	}
}

WebInput.prototype.cancelErrorTip = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.removeClass("Error_Field_Tip").removeClass("Required_Input_Tip").addClass("Text_Input");
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.removeClass("Error_Field_Tip").removeClass("Required_Input_Tip").addClass("Text_Input");
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.$compositeField.removeClass("Error_Field_Tip").removeClass("Required_Input_Tip").addClass("Text_Input");
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
			//TODO
	}
	else
	{
		this.combo.cancelErrorTip();
	}
}


WebInput.prototype.errorTip = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.removeClass("Text_Input").removeClass("Required_Input_Tip");
		this.text.addClass("Error_Field_Tip");
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.removeClass("Text_Input").removeClass("Required_Input_Tip");
		this.multiText.addClass("Error_Field_Tip");
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.$compositeField.removeClass("Text_Input").removeClass("Required_Input_Tip");
		this.$compositeField.addClass("Error_Field_Tip");
	}
	else
	{
		this.combo.ErrorTip();
	}
}

WebInput.prototype.setErrorTip = function(tipid)
{
	this.infotip = $("#" + tipid);
}

WebInput.prototype.getErrorTip = function()
{
	return this.infotip;
}

WebInput.prototype.setValidateType = function(param)
{
	this.validateParam=param;	
}

WebInput.prototype.getValidateType = function()
{
	if(this.validateParam == null)
	{
		this.validateParam = {};
	}
	return this.validateParam;
}
//设置参数
WebInput.prototype.setParamVal = function(param)
{
    this.paramVal=param;
}

WebInput.prototype.getParamVal = function()
{
    return this.paramVal;
}
WebInput.prototype.validateRequried = function()
{
	if(this.required != true) return true;
	if(this.editable != true) return true;
	var v = this.getValue();
	if(this.getType()=="CodeText"&&!this.secondText.is(":visible")){
        //第二个输入框隐藏的情况，只校验 第一个只读框
		v= this.getText()
	}
	if(v == null || v== "")
	{
		this.requiredTip();
		return false;
	}
	this.cancelRequiredTip();
	return true;
}

WebInput.prototype.validateValue = function()
{	
	if(this.editable != true) return true;
	var v = this.getValue();
	if(v != null && v != "" && this.validateParam != null)
	{
		if(this.validateParam.maxlength != null)
		{
			var ml = this.validateParam.maxlength;
			var vl = WebUtil.getLength(v);
			if(vl > ml)
			{
				this.errorTip();
				if(this.infotip != null)
				{
					this.infotip.html(AbisMessageResource.Alert["CanBeNoLongerThan"]+ml);
				}
				return false;
			}
		}
		if(this.validateParam.minlength!=null)
		{
			var ml=this.validateParam.minlength;
			var vl=WebUtil.getLength(v);
			if(vl<ml)
			{
				this.errorTip();
				if(this.infotip != null)
				{
					this.infotip.html(AbisMessageResource.Alert["CanNotBeLessThan"]+ml);
				}
				return false;
			}
		}
		if(this.validateParam.shenfenid != null)
		{
			var vl = WebUtil.getLength(v);
			if(vl=15)
			{
				v = WebUtil.IDNum15To18(v);			
			}
			var t = WebUtil.ValidataIDNum(v);
			if(!t)
			{
				this.errorTip();
				if(this.infotip != null)
				{
					this.infotip.html(AbisMessageResource.Alert["IDNumFormatNotCorrect"]);
				}
				return false;
			}			
		}
		if(this.validateParam.isdigital != null)
		{
			var t= WebUtil.isNumber(v);
			if(!t)
			{
				this.errorTip();
				if(this.infotip != null)
				{
					this.infotip.html(AbisMessageResource.Alert["PleaseEnterANum"]);
				}
				return false;	
			}			
		}
		if(this.validateParam.maxvalue != null)
		{
			var t= WebUtil.isNumber(v);
			if(t)
			{
				var ml = this.validateParam.maxvalue;
				if(v > ml){
					this.errorTip();
					if(this.infotip != null)
					{
						this.infotip.html(AbisMessageResource.Alert["CanBeNoBigerThan"]+ml);
					}
					return false;						
				}

			}			
		}
		if(this.validateParam.minvalue != null)
		{
			var t= WebUtil.isNumber(v);
			if(t)
			{
				var ml = this.validateParam.minvalue;
				if(v < ml){
					this.errorTip();
					if(this.infotip != null)
					{
						this.infotip.html(AbisMessageResource.Alert["CanNotBeSmallerThan"]+ml);
					}
					return false;						
				}

			}			
		}
        if(this.validateParam.regex != null)
        {//正则表达式
            var patt=new RegExp(this.validateParam.regex);
            if(!patt.test(v)){
                if(this.infotip != null)
                {
                    this.infotip.html(AbisMessageResource.Alert["InputIncorrect"]);
                }
                return false;
            }
        }
        //还可以加其他验证格式
	}
	this.cancelErrorTip();
	if(this.infotip){
		this.infotip.html("");
	}
	return true;
	function illegalChar(str)
	{
	    var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;  
	    if(pattern.test(str)){  
	        return false;     
	    }     
	    return true;  
	}
}

WebInput.prototype.keyUpListener = function(func)
{
	this.func = func;
}

WebInput.prototype.keyup = function()
{	
	var nThis = this;
	var retrFunc = null;
	this.text.keyup
	(
		function(e)
		{			
			if(nThis.validateParam!=null)
			{
				clearTimeout(retrFunc);
				retrFunc = setTimeout(
					function()
					{
						var b = nThis.validateValue();
						if(b == true && nThis.func != null)
						{
							nThis.func(nThis);
						}
					}, 600);
			}
		}
		
	);
}
WebInput.prototype.setVisible = function(visible)
{
	if(visible == true)
	{
		this.$content.show();
	}
	else
	{
		this.$content.hide();
	}
}

WebInput.prototype.isEditable = function()
{
	return this.editable;
}

WebInput.prototype.setEditable = function(e)
{
	this.editable  	= e;
	var str 		= "";
	var addCss 		= "";
	var removeCss	= "";
	if(e == true)
	{
		str 		= "";
		addCss 		= "";
		removeCss 	= "Field_Disable";
	}
	else
	{
		str 		= "readonly";
		addCss 		= "Field_Disable";
		removeCss 	= "";
		this.blur();
	}
	
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.DateTime|| this.type == WebUI.WebInputType.Date)
	{
		if(this.editable ==  true)
		{
			this.text.removeAttr("readonly");
		}
		else
		{
			this.text.attr("readonly",str);
		}
		this.text.removeClass(removeCss).addClass(addCss);
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		if(this.editable ==  true)
		{
			this.multiText.removeAttr("readonly");
		}
		else
		{
			this.multiText.attr("readonly",str);
		}
		this.multiText.removeClass(removeCss).addClass(addCss);
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		if(this.editable ==  true)
		{
			this.secondText.removeAttr("readonly");
		}
		else
		{
			this.secondText.attr("readonly",str);
		}
		this.secondText.removeClass(removeCss).addClass(addCss);
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo.setEditable(e)
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.setEditable(e);
	}
	else
	{
		alert(this.id+AbisMessageResource.Alert["DidNotImplementSetEditableMethod"]);
	}
}

WebInput.prototype.getWidget = function()
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.DateTime)
	{
		return this.text;
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		return this.multiText;
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		return this.secondText;
	}
	else
	{
		return this.combo;
	}
}

WebInput.prototype.reStyle = function()
{
	if(this.type == WebUI.WebInputType.Text)
	{
		this.text.addClass("Text_Input");
		this.text.removeClass("Required_Input_Tip");
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.addClass("Text_Input");
		this.multiText.removeClass("Required_Input_Tip");
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.$compositeField.addClass("Text_Input");
		this.$compositeField.removeClass("Required_Input_Tip");
	}
	else
	{
		this.combo.reStyle();
	}
}

WebInput.prototype.getComboData = function(data)
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		return this.combo.getData();
	}
	if(this.type == WebUI.WebInputType.SearchCombo)
	{
		return this.searchCombo.getData();
	}
	return null;
}


WebInput.prototype.setComboData = function(data)
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.setData(data);
	}
	if(this.type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo.setData(data);
	}
	if(this.type == WebUI.WebInputType.MultipleCombo)
	{
		this.multipleCombo.setData(data);
	}
}

WebInput.prototype.setComboCode = function(code)
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.setCode(code);
	}

}

WebInput.prototype.setComboClear = function()
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.clear();
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo.clear();
	}
}

WebInput.prototype.getText = function()
{
	var value = null;
	
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date||this.type==WebUI.WebInputType.Password|| this.type == WebUI.WebInputType.DateTime)
	{
		value =  this.text.val();
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		value = this.multiText.val();
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		value = this.firstText.val() + this.secondText.val();
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		value = this.combo.getText();
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		value = this.searchCombo.getCode();
	}
	else if(this.type == WebUI.WebInputType.Label)
	{
		value = this.lab.html();
	}
	
	return value;
}

WebInput.prototype.setText = function(text,notify)
{
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.val(text);
	}
	else if(this.type == WebUI.WebInputType.Label)
	{
		this.lab.html(text);
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.val(text);
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.secondText.val(text);
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		if(!WebUtil.isNull(text))
		{
			this.combo.setCode(text,notify);
		}
		else
		{
			this.combo.clear();
		}
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		if(!WebUtil.isNull(text))
		{
			var arr = text.split(","); 
			if(!WebUtil.isEmpty(arr))
			{
				var dbs = new Array();
				for(var i in arr)
				{
					dbs.push(arr[i]);
				}
				this.searchCombo.setChecked(dbs);
			}
		}
		else
		{
			this.searchCombo.clear();
		}
	}

	if(this.listener != null && notify == true)
	{
		this.listener(this.id,text,null);
	}
}

WebInput.prototype.clear = function()
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		this.combo.clear();
	}
	else if(this.type == WebUI.WebInputType.MultipleCombo)
	{
		this.multipleCombo.clear();
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		this.searchCombo.clear();
	}
	else if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date|| this.type == WebUI.WebInputType.DateTime)
	{
		this.text.val("");
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.val("");
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		this.firstText.val("");
		this.secondText.val("");
	}
	else
	{
		this.multiText.val("");
	}
}

WebInput.prototype.getObject = function()
{
	var value = null;
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date||this.type==WebUI.WebInputType.Password|| this.type == WebUI.WebInputType.DateTime)
	{
		value = this.text.val();
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		value = this.secondText.val();
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		value = this.multiText.val();
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		value = this.combo.getObject();
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		value = this.searchCombo.getCode();
	}
	else if(this.type == WebUI.WebInputType.MultipleCombo)
	{
		value = this.multipleCombo.getCode();
	}
	else if(this.type == WebUI.WebInputType.Label)
	{
		value = this.lab.html();
	}

	return value;
}

WebInput.prototype.getValue = function()
{
	var value = null;
	if(this.type == WebUI.WebInputType.Text || this.type == WebUI.WebInputType.Date||this.type==WebUI.WebInputType.Password|| this.type == WebUI.WebInputType.DateTime)
	{
		value = this.text.val();
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		value = this.secondText.val();
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		value = this.multiText.val();
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		value = this.combo.getCode(); 
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		value = this.searchCombo.getCode();
	}
	else if(this.type == WebUI.WebInputType.MultipleCombo)
	{
		value = this.multipleCombo.getCode();
	}	
	else if(this.type == WebUI.WebInputType.Label)
	{
		value = this.lab.html();
	}
	if(value!=null&&typeof value === "string" ){
		//特殊字符需要 转义 然后保存
		var reg = /[&<">'·](?:(amp|lt|quot|gt|#39|middot|nbsp|#\d+);)?/g  	
		value = value.replace(reg, function(a, b) {  
		    if(b) {  
		        return a;  
		    } else {  
		        return {  
		            '<': '&lt;',  
		            '&': '&',  
		            '"': '"',  
		            '>': '&gt;',  
		            '·': '·',  
		            "'": "'"  
		        }[a]  
		    }  
		})  
	}
	return value;
}

WebInput.prototype.setValue = function(value,notify)
{
	if(value == null) return null;
	
	if(this.type == WebUI.WebInputType.Text  || this.type == WebUI.WebInputType.Date  || this.type == WebUI.WebInputType.DateTime  || this.type == WebUI.WebInputType.Password)
	{
		this.text.val(value);
	}
	else if(this.type == WebUI.WebInputType.Label)
	{
		this.lab.html(value);
	}
	else if(this.type == WebUI.WebInputType.MultiText)
	{
		this.multiText.val(value);
	}
	else if(this.type == WebUI.WebInputType.CodeText)
	{
		if(value==""){
			this.firstText.val(value);
			this.secondText.val(value);
		}else{
			var txt = this.firstText.val();
			var index = value.indexOf(txt);
			if(index != -1)
			{
				value = value.replace(txt,"");
			}
			this.secondText.val(value);
		}		
	}
	else if(this.type == WebUI.WebInputType.Combo)
	{
		if(!WebUtil.isNull(value))
		{
			this.combo.setCode(value,notify);
		}
		else
		{
			this.combo.clear();
		}
	}
	else if(this.type == WebUI.WebInputType.SearchCombo)
	{
		if(!WebUtil.isNull(value))
		{
			value += "";
			var arr = value.split(",");
			if(!WebUtil.isEmpty(arr))
			{
				var dbs = new Array();
				for(var i in arr)
				{
					dbs.push(arr[i]);
				}
				this.searchCombo.setChecked(dbs);
			}
		}
		else
		{
			this.searchCombo.clear();
		}
	}
	else if(this.type == WebUI.WebInputType.MultipleCombo){
		this.multipleCombo.setCode(value);
	}

	if(this.listener != null && notify == true)
	{
		this.listener(this.id,value,null);
	}
}

WebInput.prototype.setData = function(key,value)
{
	this.data[key] = value;
}


WebInput.prototype.getData = function(key)
{
	return this.data[key];
}

WebInput.prototype.getCode = function()
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		return this.combo.getCode();
	}
	return null;
}

WebInput.prototype.getTextByCode = function(code)
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		return this.combo.getTextByCode(code);		
	}
}

WebInput.prototype.setRequired = function(required) 
{
	this.required = required;
	var $downIcon = this.$content.find(".Field_Down_Image");
	if(this.required == true)
	{
		$downIcon.addClass("Required_Image");
		$downIcon.attr("title","*");
	}
	else
	{
		$downIcon.removeClass("Required_Image");
		$downIcon.attr("title","");
	}
}

WebInput.prototype.setFilterRgx = function(filterrgx) 
{
	if(this.type == WebUI.WebInputType.Combo)
	{
		return this.combo.setFilterRgx(filterrgx);		
	}
}

function WebButton(id,type,css,invoke)
{
	this.button 	= $("#"+id);
	
	var cssName 	= "WebButton_" + type;
	var cssStyle	= "WebButton_" + type + "_N";
	if(css == null)
	{
		css = "";
	}
	cssName += " ";
	cssName += css;
	cssName += " ";
	cssName += cssStyle;
	
	this.button.attr("class",cssName);
	this.button.attr("bntStyle",type);
	this.button.attr("css",css);
	this.regButtonEvent(this.button,invoke);
	this.button.bind("selectstart",function(){return false});
	this.enable = true;
}

WebButton.prototype.setText = function(text)
{
	this.button.html(text);
}

WebButton.prototype.setVisible = function(visible,delay,invoke)
{
	this.visible = visible;
	if(this.visible == true)
	{
		if(delay != undefined)
		{
			if(invoke != undefined)
			{
				this.button.fadeIn(delay,invoke);
			}
			else
			{
				this.button.fadeIn(delay);
			}
		}
		else
		{
			if(invoke != undefined)
			{
				this.button.show(invoke);
			}
			else
			{
				this.button.show();
			}
		}
	}
	else
	{
		if(delay != undefined)
		{
			if(invoke != undefined)
			{
				this.button.fadeOut(delay,invoke);
			}
			else
			{
				this.button.fadeOut(delay);
			}
		}
		else
		{
			if(invoke != undefined)
			{
				this.button.hide(invoke);
			}
			else
			{
				this.button.hide();
			}
		}
	}
}

WebButton.prototype.setEnabled = function(enable)
{
	this.enable = enable;
	var s  	= this.button.attr("bntStyle");
	var cssName = "WebButton_"+s;
	var css 	= this.button.attr("css");
	var cssStyle ="";
	var cssStyleOld ="";
	if(this.enable == true)
	{
		cssStyle +=cssName + "_N";
		cssStyleOld +=cssName + "_U";
	}
	else
	{
		cssStyle +=cssName + "_U";
		cssStyleOld +=cssName + "_N";
	}
	var str 		= css.concat(" ").concat(cssName).concat(" ").concat(cssStyle);
	var strOld 		= css.concat(" ").concat(cssName).concat(" ").concat(cssStyleOld);
	this.button.attr("class",str);
	//this.button.removeClass(strOld);
	//this.button.addClass(str);
}

WebButton.prototype.regButtonEvent = function(button,invoke)
{
	var nThis = this;
	button.mouseover
	(
		function()
		{
			if(nThis.enable == false)return;
			var s  			= $(this).attr("bntStyle");
			var css 		= $(this).attr("css");
			var cssName 	= "WebButton_"+s;
			var cssStyle	= "WebButton_"+s+"_H";
			var str 		= css.concat(" ").concat(cssName).concat(" ").concat(cssStyle);
			$(this).attr("class",str);
			//$(this).addClass(str);
		}
	);
	button.mouseout
	(
		function()
		{
			if(nThis.enable == false)return;
			var s  			= $(this).attr("bntStyle");
			var css 		= $(this).attr("css");
			var cssName 	= "WebButton_"+s;
			var cssStyle	= "WebButton_"+s+"_N";
			var str 		= css.concat(" ").concat(cssName).concat(" ").concat(cssStyle);
			$(this).attr("class",str);
			//$(this).addClass(str);
		}
	);
	button.mousedown
	(
		function()
		{
			if(nThis.enable == false)return;
			var s  			= $(this).attr("bntStyle");
			var css 		= $(this).attr("css");
			var cssName 	= "WebButton_"+s;
			var cssStyle	= "WebButton_"+s+"_D";
			var str 		= css.concat(" ").concat(cssName).concat(" ").concat(cssStyle);
			$(this).attr("class",str);
			//$(this).addClass(str);
		}
	);
	button.mouseup
	(
		function()
		{
			if(nThis.enable == false)return;
			var s  			= $(this).attr("bntStyle");
			var css 		= $(this).attr("css");
			var cssName 	= "WebButton_"+s;
			var cssStyle	= "WebButton_"+s+"_H";
			var str 		= css.concat(" ").concat(cssName).concat(" ").concat(cssStyle);
			$(this).attr("class",str);
			//$(this).addClass(str);
			if(invoke != null)
			{
				invoke($(this).attr("id"));
			}
		}
	);
}

/***
 * 工具栏按钮
 */
function WebToolButton(id,css,disableCss,invoke)
{
	this.id 			= id;
	this.bntClass 		= css;
	this.disableClass 	= disableCss;
	this.invoke 		= invoke;
	this.enabled 		= true;
	this.isDown			= false;//表示按钮是否按下
	this.init();
}

WebToolButton.prototype.setEnabled = function(enabled)
{
	this.enabled = enabled;
	if(this.enabled == true)
	{
		this.$button.attr("class",this.bntClass);
		//this.$button.addClass(this.bntClass);
	}
	else
	{
		this.$button.attr("class",this.disableClass);
		//this.$button.addClass(this.disableClass);
	}
}


WebToolButton.prototype.init = function()
{
	$bnt = $("#"+this.id);
	$bnt.attr("class","ToolBnt");
	//$bnt.addClass("ToolBnt");
	this.bntClass.concat(" Button");
	this.$button = $("<div class=\"" + this.bntClass + "\"></div>");
	$bnt.append(this.$button);
	
	var thisObj = this;
	this.$button.click
	(
		function()
		{
			if(thisObj.enabled == false)return;
			thisObj.invoke(thisObj.id);
		}
	);
	this.$button.mouseover
	(
		function()
		{
			if(thisObj.enabled == false)return;
			if(!thisObj.isDown)
			{	
				var $parent = $(this).parent();
				$parent.attr("class","ToolBntHover");
				//$parent.addClass("ToolBntHover");
			}
		}
	);
	this.$button.mouseout
	(
		function()
		{
			if(!thisObj.isDown)
			{
				var $parent = $(this).parent();
				$parent.attr("class","ToolBnt");
				//$parent.addClass("ToolBnt");
			}
		}
	);
	this.$button.mousedown
	(
		function()
		{
			if(thisObj.enabled == false)return;
			var $parent = $(this).parent();
			$parent.attr("class","ToolBntDown");
			//$parent.addClass("ToolBntDown");
			thisObj.isDown = true;
		}
	);
	this.$button.mouseup
	(
		function()
		{
			if(thisObj.enabled == false)return;
			var $parent = $(this).parent();
			$parent.attr("class","ToolBntHover");
			//$parent.addClass("ToolBntHover");
			thisObj.isDown = false;
		}
	);
}

/**
 * 文本按钮
 */
function WebTextButton(id,type,invoke,checked)
{
	this.id 	= id;
	this.type 	= type;
	this.invoke = invoke;
	this.checked= false;
	if(checked != null)
	{
		this.checked = checked;
	}
	this.init();
}

WebTextButton.prototype.init = function()
{
	this.bnt = $("#"+ this.id);
	this.bnt.attr("class","TxtBnt");
	//this.bnt.addClass("TxtBnt");
	this.bnt.bind("selectstart",function(){return false;});
	
	var nThis = this;
	this.bnt.mouseover(function()
	{
		if(nThis.type == WebUI.TxtBntType.PUSH)
		{
			$(this).attr("class","TxtBntHover");
			//$(this).addClass("TxtBntHover");
		}
		else
		{
			if(!nThis.checked)
			{
				$(this).attr("class","TxtBntHover");
				//$(this).addClass("TxtBntHover");
			}
		}
		
	});
	this.bnt.mouseout(function()
	{
		if(nThis.type == WebUI.TxtBntType.PUSH)
		{
			$(this).attr("class","TxtBnt");
			//$(this).addClass("TxtBnt");
		}
		else
		{
			if(!nThis.checked)
			{
				$(this).attr("class","TxtBnt");
				//$(this).addClass("TxtBnt");
			}
		}
		
	});
	this.bnt.mousedown(function()
	{
		if(nThis.type == WebUI.TxtBntType.TOGGLE)
		{
			if(!nThis.checked)
			{
				nThis.checked = true;
				$(this).attr("class","TxtBntDown");
				//$(this).addClass("TxtBntDown");
			}
			else
			{
				nThis.checked = false;
				$(this).attr("class","TxtBnt");
				//$(this).removeClass("TxtBntDown");
				//$(this).addClass("TxtBnt");
			}
			if(nThis.invoke != null)
			{
				nThis.invoke(nThis.checked);
			}
		}
		else
		{
			$(this).attr("class","TxtBntDown");
			//$(this).addClass("TxtBntDown");
		}
	});
	
	this.bnt.mouseup(function()
	{
		if(nThis.type == WebUI.TxtBntType.PUSH)
		{
			//$(this).attr("class","TxtBnt");
			$(this).addClass("TxtBnt");
			if(nThis.invoke != null)
			{
				nThis.invoke();
			}
		}
	});
}

WebTextButton.prototype.isChecked = function()
{
	return this.checked;
}

WebTextButton.prototype.setChecked = function(checked)
{
	this.checked = checked;
	if(this.checked)
	{
		//this.bnt.attr("class","TxtBntDown");
		this.bnt.addClass("TxtBntDown");
	}
	else
	{
		//this.bnt.attr("class","TxtBnt");
		this.bnt.addClass("TxtBnt");
	}
}