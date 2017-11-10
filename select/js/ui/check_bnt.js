CheckBnt.Param 		= "param";
CheckBnt.CallBack 	= "callback";
CheckBnt.Enabled	= "enabled";
CheckBnt.IsCheck	= "isCheck";
/**
 *
 * @param {Object} id
 * @param {Object} data 数据格式
 * [
 * 		{id:"",text:"",checked:true|false,enabled:true|false},
 * 		.....
 * ]
 * @param {Object} setting 控件参数
 *	{
 *		param: 		{colCount: Number,....},
 *		callback:	{onClick: functionName(id,checked),...}
 *	}
 * @param className  选择操作  相对应的样式
 */
function CheckBnt(id, data, setting ,className)
{
	this.id 		= id;
	this.data 		= data;
	this.setting 	= setting;
	this.className={};
	this.className.check = "check";
	this.className.ncheck = "ncheck";
	this.className.checkhover = "checkhover";
	this.className.ncheckhover = "ncheckhover";
	var _this = this;
	if(className){
		$.extend(true,_this.className,className)
	}
	this.init();
}

CheckBnt.prototype.initParam = function()
{
	if (this.setting != null)
	{
		//获取设置的列数
		for ( var key in this.setting)
		{
			if (key == CheckBnt.Param)
			{
				this.colCount = this.setting[key].colCount;
			}
			else if(key == CheckBnt.CallBack)
			{
				this.onClickFunc = this.setting[key].onClick;
			}
		}
	}
}

/**
 * 设置所有checkbox的可用状态
 */
CheckBnt.prototype.setAllEnabled = function(enabled)
{
	if (enabled == null)
	{
		enabled = false;
	}
	$parent = $("#" + this.id);
	$itemList = $parent.find(".sItem");
	var checkObj = this;
	$itemList.each(function(i)
	{
		checkObj.execEnabled($(this),enabled);
	});
}

CheckBnt.prototype.execEnabled = function($item, enabled)
{
	var $checkBnt = $item.find("div:eq(0)");
	var isCheck = eval($checkBnt.attr(CheckBnt.IsCheck));
	if (enabled == false)
	{
		if (isCheck == true)
		{
			$checkBnt.attr("class", "checkdisable");
//			$checkBnt.removeClass("ncheck");
//			$checkBnt.addClass("checkdisable");
		}
		else
		{
//			alert("属性是ncheckdisable");
			$checkBnt.attr("class", "ncheckdisable");
//			$checkBnt.removeClass("check checkdisable");
//			$checkBnt.addClass("ncheckdisable");
		}
	}
	else
	{
		if (isCheck == true)
		{
			$checkBnt.attr("class", this.className.check);
//			$checkBnt.removeClass("ncheck checkdisable ncheckdisable");
//			$checkBnt.addClass("check");
		}
		else
		{
//			alert("属性是ncheck");
			$checkBnt.attr("class", this.className.ncheck);
//			$checkBnt.removeClass("check checkdisable ncheckdisable");
//			$checkBnt.addClass("ncheck");
		}
	}

//	alert("before="+$checkBnt.attr("class"));

	$checkBnt.prop(CheckBnt.Enabled,enabled);
}

CheckBnt.prototype.addEvent = function($item)
{
	var checkObj = this;
	var _this =this;
	$item.mouseover(function()
	{
		var $checkBnt = $(this).find("div:eq(0)");
		var enabled = eval($checkBnt.prop(CheckBnt.Enabled));
		if (enabled == false)
			return;
		var isCheck = eval($checkBnt.attr(CheckBnt.IsCheck));
		var className = null;
		if (isCheck == true)
		{
			className = _this.className.checkhover;
		}
		else
		{
			className = _this.className.ncheckhover;
		}
//		$checkBnt.attr("class", className);
	});

	$item.mouseout(function()
	{
		var $checkBnt = $(this).find("div:eq(0)");
		var enabled = eval($checkBnt.prop(CheckBnt.Enabled));
		if (enabled == false)
			return;
		var isCheck = eval($checkBnt.attr(CheckBnt.IsCheck));
		var className = null;
		if (isCheck == true)
		{
			className = _this.className.check;
		}
		else
		{
			className = _this.className.ncheck;
		}
//		$checkBnt.attr("class", className);
	});

	$item.click(function()
	{
		var $checkBnt = $(this).find("div:eq(0)");
		var enabled = eval($checkBnt.prop(CheckBnt.Enabled));
		if (enabled == false)
			return;
		var isCheck = eval($checkBnt.attr(CheckBnt.IsCheck));
		isCheck = !isCheck;
		var className = null;
		if (isCheck == true)
		{
			className = "ncheckhover";
			$checkBnt.addClass(_this.className.checkhover);
			$checkBnt.addClass(_this.className.check);
		}
		else
		{
			className = "ncheckhover";
			$checkBnt.removeClass(_this.className.checkhover);
			$checkBnt.addClass(_this.className.ncheck);
		}
//		$checkBnt.attr("class", className);
		$checkBnt.attr("isCheck", isCheck);
		if(checkObj.onClickFunc != undefined)
		{
			var itemId = $(this).attr("id");
			var bntId = itemId.replace(checkObj.id+"_","");
			checkObj.onClickFunc(bntId,isCheck);
		}
	});
}

/**
 * 获取指定ID的选值
 */
CheckBnt.prototype.isChecked = function(id)
{
	var $item = $("#" + this.id + "_" + id);
	var $checkBnt = $item.find("div:eq(0)");
	return eval($checkBnt.attr(CheckBnt.IsCheck));
}

/**
 * 设置指定ID的checkbox可用状态
 * @param {Object} id checkbox ID
 */
CheckBnt.prototype.setEnabled = function(id, enabled)
{
	if (enabled == null)
	{
		enabled = false;
	}
	var $item = $("#" + this.id + "_" + id);
	this.execEnabled($item, enabled);
}

/**
 * 得到所有checkbox选值
 * {"id":bntId,"text": $text.html(),"checked":isCheck};
 */
CheckBnt.prototype.getData = function()
{
	$parent = $("#" + this.id);
	$itemList = $parent.find(".sItem");
	var checkObj = this;
	var result = new Array();
	$itemList.each(function(i)
	{
		var itemId  = $(this).attr("id");
		var bntId = itemId.replace(checkObj.id+"_","");
		var $checkBnt = $(this).find("div:eq(0)");
		var $text = $(this).find("div:eq(1)");
		var isCheck = checkObj.isChecked(bntId);
		var cause = {"id":bntId,"text": $text.html(),"checked":isCheck};
		result[result.length] = cause;
	});
	return result;
}

/**
 * 得到checkbox 已选中  对象
 * {"id":bntId,"text": $text.html(),"checked":isCheck};
 */
CheckBnt.prototype.getSelectData = function()
{
	$parent = $("#" + this.id);
	$itemList = $parent.find(".sItem");
	var checkObj = this;
	var result = new Array();
	$itemList.each(function(i)
	{
		var itemId  = $(this).attr("id");
		var bntId = itemId.replace(checkObj.id+"_","");
		var $checkBnt = $(this).find("div:eq(0)");
		var $text = $(this).find("div:eq(1)");
		var isCheck = checkObj.isChecked(bntId);
		if(isCheck)
		{
			var cause = {"id":bntId,"text": $text.html(),"checked":isCheck};
			result[result.length] = cause;
		}
	});
	return result;
}
/**
 * 得到checkbox 已选中 对象的id
 * [id1,id2...]
 */
CheckBnt.prototype.getSelectIds = function()
{
    $parent = $("#" + this.id);
    $itemList = $parent.find(".sItem");
    var checkObj = this;
    var result = new Array();
    $itemList.each(function(i)
    {
        var itemId  = $(this).attr("id");
        var bntId = itemId.replace(checkObj.id+"_","");
        var isCheck = checkObj.isChecked(bntId);
        if(isCheck)
        {
            result.push(bntId)
        }
    });
    return result;
}
/**
 * 给全部控件设置选中状态
 * @param {Object} checked
 */
CheckBnt.prototype.setAllSelected = function(checked)
{
	$parent = $("#" + this.id);
	$itemList = $parent.find(".sItem");
	var checkObj = this;
	$itemList.each(function(i)
	{
		var itemId  = $(this).attr("id");
		var bntId = itemId.replace(checkObj.id+"_","");
		checkObj.setSelected(bntId,checked);
	});
}

/**
 * 反选
 * @param {Object} checked
 */
CheckBnt.prototype.setInverse  = function()
{
	$parent = $("#" + this.id);
	$itemList = $parent.find(".sItem");
	var checkObj = this;
	$itemList.each(function(i)
	{
		var itemId  = $(this).attr("id");
		var btnId = itemId.replace(checkObj.id+"_","");
		checkObj.setSelected(btnId,!checkObj.isChecked(btnId));
	});
}

/**
 * 给指定ID的控件设置选中状态
 * @param {Object} id
 * @param {Object} checked
 * @memberOf {TypeName} 
 */
CheckBnt.prototype.setSelected = function(id,checked)
{
	var $item = $("#" + this.id + "_" + id);
	var $checkBnt = $item.find("div:eq(0)");
	var enabled = eval($checkBnt.prop(CheckBnt.Enabled));
	if(enabled == true)
	{
		if(checked == true)
		{
			$checkBnt.attr("class",this.className.check);
//			$checkBnt.addClass("check");
		}
		else
		{
			$checkBnt.attr("class",this.className.ncheck);
//			$checkBnt.addClass("ncheck");
		}
	}
	else
	{
		if(checked == true)
		{
			$checkBnt.attr("class","checkdisable");
//			$checkBnt.addClass("checkdisable");
		}
		else
		{
			$checkBnt.attr("class","ncheckdisable");
//			$checkBnt.addClass("ncheckdisable");
		}
	}
	$checkBnt.attr(CheckBnt.IsCheck,checked);
}

CheckBnt.prototype.setText = function(id,text)
{
	var $item = $("#" + this.id + "_" + id);
	var $txt = $item.find(".text");
	$txt.html(text);
}

/**
 * 
 * @param {Object} id
 * @param {Object} data 数据格式
 * [
 * 		{id:"",text:"",checked:true|false,enabled:true|false},
 * 		.....
 * ]
 * @param {Object} setting 控件参数
 *	{
 *		param: 		{colCount: Number,....},
 *		callback:	{onClick: functionName(id,checked),...}
 *	}
 * @memberOf {TypeName} 
 */
CheckBnt.prototype.init = function()
{
	this.initParam();
	//初始化控件
	var $parent = $("#" + this.id);
	
	var _this = this;

	if (this.data != null)
	{
		if (this.colCount == "undefind" || this.colCount == null)
		{
			this.colCount = 1;
		}
		if ( this.colCount<1 ) this.colCount = 1;
		
		var  p = (this.data.length % this.colCount) > 0 ?1:0;
		var rows = parseInt(this.data.length / this.colCount) + p ;
		for ( var i = 0; i < rows; i++)
		{
			var $row = $("<div class=\"rowItem\"></div>");
			$parent.append($row);
		}
		var per = 100 / this.colCount;
		for ( var i = 0; i < this.data.length; i++)
		{
			var d = this.data[i];
			var $item = $("<div></div>");
			$item.attr("id", this.id + "_" + d.id);
			$item.addClass("sItem");
			$item.css("width", per + "%");
			
			//获取到对应的行
			var rowIndex = parseInt( i / this.colCount);
			var $p = $parent.find(".rowItem:eq(" + rowIndex + ")");
			$p.append($item);
			
			var $checkBnt 	= $("<div></div>");
			var $text 		= $("<div class=\"text\"></div>");
			$item.append($checkBnt);
			$item.append($text);
			
			if (d.enabled != undefined && d.enabled == false)
			{
				$checkBnt.prop(CheckBnt.Enabled, false);
				$checkBnt.attr(CheckBnt.IsCheck, d.checked);
				if (d.checked == true)
				{
					$checkBnt.addClass("checkdisable");
				}
				else
				{
					$checkBnt.addClass("ncheckdisable");
				}
			}
			else
			{
				$checkBnt.prop(CheckBnt.Enabled, true);
				$checkBnt.attr(CheckBnt.IsCheck, d.checked);
				if (d.checked == true)
				{
					$checkBnt.addClass(_this.className.check);
				}
				else
				{
					$checkBnt.addClass(_this.className.ncheck);
				}
			}
			$text.html(d.text);
			this.addEvent($item);
		}
	}
}
