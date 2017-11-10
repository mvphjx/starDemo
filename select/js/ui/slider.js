
//滑块
function Slider(parentId, min, max, value,invoke)
{
	this.parentId 		= parentId;
	this.min 			= min;
	this.max 			= max;
	this.value 			= value;
	this.invoke 		= invoke;
	this.mouseDown 		= false;
	this.clickBar		= false;
	this.barId 			= this.parentId + "_SliderBar";
	this.sliderId 		= this.parentId + "_Slider";
	this.txtId 			= this.parentId + "_Txt";
	this.slider			= null;
	this.init();
}


Slider.prototype.init = function()
{
	$parent = $("#" + this.parentId);

	$txt = $("<input id=\""+this.txtId+"\" type=\"text\" class=\"SliderTxt\"></input>");
	$txt.val(this.value);
	
	$parent.append($txt);

	$sliderBar = $("<div id=\"" + this.barId + "\" class=\"SliderGround\"></div>");
	
	var left = $("<div class=\"left\"></div>");
	var right = $("<div class=\"right\"></div>");
	var center = $("<div class=\"center\"></div>");
	$sliderBar.append(left);
	$sliderBar.append(right);
	$sliderBar.append(center);
	
	$parent.append($sliderBar);

	this.slider = $("<div id=\"" + this.sliderId + "\" class=\"Slider\"></div>");
	$parent.append(this.slider);
	this.updateLocation();

	var nThis = this;

	$(window).resize(function()
	{
		nThis.updateLocation();
	});

	//左键按下滑块
	this.slider.mousedown(function(e)
	{
		var event = e || window.event;
		if (e.button == 0)
		{
			nThis.mouseDown = true;
			
		}
	});

	//左键弹起滑块
	this.slider.mouseup(function(e)
	{
		var event = e || window.event;
		if (e.button == 0)
		{
			nThis.mouseDown = false;
		}
	});

	$sliderBar.mouseup
	(
		function(e)
		{
			if(e.button == 0)
			{
				if(nThis.mouseDown == true)
				{
					nThis.mouseDown = false;
					nThis.doSlider(e.clientX);
				}
			}
		}
	);
	
	$sliderBar.mousedown
	(
		function(e)
		{
			if(e.button == 0)
			{
				nThis.clickBar = true;
				nThis.doSlider(e.clientX);
			}
		}
	);
	
	$(window).mouseup
	(
		function(e)
		{
			nThis.clickBar	= false;
			nThis.mouseDown = false;
		}
	);
	/**
	 * 左键拖动滑块
	 * @param {Object} e
	 */
	$(document).mousemove(function(e)
	{
		if (nThis.mouseDown)
		{
			nThis.doSlider(e.clientX);
		}
	});

	//左键单击滑块条
	$sliderBar.click(function(e)
	{
		if (e.button == 0)
		{
			nThis.doSlider(e.clientX);
		}
	});

	$txt.keydown(function(e)
	{
		if(e.keyCode == 13)//回车
		{
			$(this).blur();
			return;
		}
		if (e.keyCode == 8 || e.keyCode == 46)//退格键和删除键
		{
			return;
		}
		if(e.keyCode == 37 || e.keyCode == 39)return;//左右光标键
		
		var keyCode = e.keyCode;
		if (((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) )//数字键
		{
			if(keyCode >= 96 && keyCode <= 105)
			{
				keyCode -= 48;
			}
			//验证输入后的值是否超过MAX值
			var txt = document.getElementById(nThis.txtId);
			
			//获取光标所在位置
			var range = document.selection.createRange();
			range.setEndPoint("StartToStart", txt.createTextRange());
			var pos = range.text.length;
			
			//获取选中的文本
			range = document.selection.createRange();
			var selectLen = range.text.length;
			var startIndex = pos;
			if (selectLen > 0)
			{
				startIndex = pos - selectLen;
			}
			var word = $(this).val();
			var startStr = word.slice(0,startIndex);
			var endStr = word.slice(pos,word.length);
			var newChar = String.fromCharCode(keyCode);
			var newStr = startStr+newChar+endStr;
			var newValue  = parseInt(newStr);
			if(newValue < nThis.min || newValue > nThis.max)
			{
				e.preventDefault();
				return;
			}
			return;
		}
		e.preventDefault();
	});
	
	$txt.focus
	(
		function()
		{
			$(this).addClass("FouceTxt");
			$(this).attr("prevValue",$(this).val());

		}
	);
	
	$txt.blur
	(
		function(e)
		{
			$(this).removeClass("FouceTxt");
			//按照输入值，变更参数
			var prevValue = $(this).attr("prevValue");
			var text = $(this).val();
			if(text == "" || text == prevValue)
			{
				$(this).val(prevValue);
			}
			else
			{
				nThis.value = parseInt(text);
				nThis.updateLocation();
				nThis.notify();
			}
		}
	);
}

Slider.prototype.hide = function()
{
	this.slider.hide();
}

Slider.prototype.show = function()
{
	this.slider.show();
}

/**
 * 设置滑块当前值
 * @param {Object} value
 * @memberOf {TypeName} 
 */
Slider.prototype.setValue = function(value)
{
	if(value < this.min)
	{
		value = this.min;
	}
	if(value > this.max)
	{
		value = this.max;
	}
	this.value = value;
	
	//更新文本框
	$("#"+this.txtId).val(Math.round(this.value));
	
	//更新滑块位置
	this.updateLocation();
}

/**
 * 获取滑块当前值
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
Slider.prototype.getValue = function()
{
	return this.value;
}

/**
 * 通知外界当前值发生变化
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
Slider.prototype.notify = function()
{
	if(this.invoke == null)return;
	this.invoke(this.parentId,this.value);
}

/**
 * 移动滑块处理函数
 * @param {Object} x
 * @memberOf {TypeName} 
 */
Slider.prototype.doSlider = function(x)
{
	var $bar = $("#" + this.barId);
	var barLeft = $bar.offset().left;
	var barWidth = parseInt($bar.css("width"));
	var k = $(".Slider").width();
	
	// 滑块中心位置
	var half = k / 2;
	
	var width = x - barLeft;
	if (width < half)
	{
		this.value = this.min;
	}
	else if (width > barWidth - half)
	{
		this.value = this.max;
	}
	else
	{
		var realW = width - half;
		var realBarW = barWidth - k;
		var precent = realW / realBarW;
		var tValue = (this.max - this.min) * precent;
		this.value = Math.round(tValue + this.min);
	}
	//更新文本框
	$("#"+this.txtId).val(this.value);
	
	//通知
	this.notify();
	
	//更新滑块位置
	this.updateLocation();
}

/**
 * 根据当前VALUE值调整滑块位置
 */
Slider.prototype.updateLocationbak = function()
{
	var $bar = $("#" + this.barId);
	var $slider = $("#" + this.sliderId);
	var sliderWidth = parseInt($slider.css("width"));
	
	//调整纵向位置
	var barTop = $bar.offset().top;
	var barHeight = parseInt($bar.css("height"));
	var sliderHeight = parseInt($slider.css("height"));
	var offsetH = (sliderHeight - barHeight) / 2;
	var sliderTop = barTop - offsetH;
	$slider.css("top", sliderTop + "px");
	//调整横向位置
	var barLeft = $bar.offset().left;
	var barWidth = parseInt($bar.css("width")) + 2 - sliderWidth;
	var precent = (this.value - this.min) / (this.max - this.min);
	var tempLeft = precent * barWidth;
	var sliderLeft = barLeft + tempLeft -1;
		
	if(this.clickBar == true)
	{
		$slider.animate({left:sliderLeft + "px "},100);
	}
	else
	{
		$slider.css("left", sliderLeft + "px");
	}
	$slider.show();
}

/**
 * 根据当前VALUE值调整滑块位置
 * 改为相对定位
 */
Slider.prototype.updateLocation = function()
{
	var $slider = $("#" + this.sliderId);
	var $bar = $("#" + this.barId);
	var precent = (this.value - this.min) / (this.max - this.min);
	var sliderLeft = precent * parseInt($bar.find(".center").css('width'));	
	if(this.clickBar == true)
	{
		$slider.animate({left:sliderLeft + "px "},100);
	}
	else
	{
		$slider.css("left", sliderLeft + "px");
	}
	$slider.show();
}
