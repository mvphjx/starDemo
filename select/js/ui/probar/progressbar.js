
ProgressBar.prototype.maxValue = 100;
ProgressBar.prototype.minValue = 0;
ProgressBar.ProgressName = "_progress";
ProgressBar.progressHeight = 12;

ProgressBar.BarStyle = 
{
	//"1":{"image":GLOBAL.NAMESPACE + "/images/widget/progressbar/progress_orange.png","border":"1px solid #F88335"}
};

/**
 * 初始化进度条样式
 * @memberOf {TypeName} 
 */
ProgressBar.prototype.init = function()
{
	var $par = $("#"+this.id);
	var labWidth = 55;
	var labMarginLeft = 3;
	
	//创建进度条
	var $progress = $("<div></div>");
	$par.append($progress);
	var width = parseInt($par.css("width"));
	var height = parseInt($par.css("height"));
	var marginTop = ((height - ProgressBar.progressHeight) / 2 - 1);//因为需要边框所以-1
	var proWidth = width - 60;
	$progress.css("float","left");
	$progress.css("marginTop",marginTop+"px");
	$progress.css("width", proWidth);
	$progress.css("height",ProgressBar.progressHeight+"px");
	//$progress.css("border",ProgressBar.BarStyle["1"].border);
	
	//创建进度显示条
	var $bar = $("<div id='"+this.id+"_bar"+"'></div>");
	$progress.append($bar);
	$bar.css("marginTop","0px");
	$bar.css("paddingTop","0px");
	//$bar.css("background","url("+ ProgressBar.BarStyle["1"].image +") repeat-x");
	$bar.css("width","0px");
	$bar.css("height",ProgressBar.progressHeight+"px");
	$bar.css("lineHeight",ProgressBar.progressHeight+"px");
	$bar.css("textIndent","2px");
	$bar.css("verticalAlign","middle");
	$bar.css("fontSize","12px");
	
	//创建标签
	var $lab = $("<div id='"+this.id+"_lab"+"'></div>");
	$par.append($lab);
	$lab.css("margin","0px");
	$lab.css("padding","0px");
	$lab.css("float","left");
	$lab.css("marginTop",marginTop+"px");//标签没有边框所以边距+1
	$lab.css("marginLeft",labMarginLeft+"px");
	$lab.css("width",labWidth+"px");
	$lab.css("height",(ProgressBar.progressHeight + 2)+"px");
	$lab.css("lineHeight",(ProgressBar.progressHeight+ 2)+"px");
	$lab.css("textAlign","center");
	$lab.css("verticalAlign","middle");
	$lab.css("fontSize","10px");
	
	this.setValue(this.value);
}

/**
 * 进度条控件
 * @param {Object} id 父容器
 * @param {Object} value 初始值
 * @param {Object} maxValue 最大值
 * @param {Object} minValue 最小值
 * @memberOf {TypeName} 
 */
function ProgressBar(id,minValue,maxValue,value)
{
	this.id = id;
	this.value = value;
	if(this.value == null)
	{
		this.value = 0;
	}
	if(maxValue != "undefined")
	{
		this.maxValue = maxValue;
	}
	if(minValue != "undefined")
	{
		this.minValue = minValue;
	}
	this.init();
}

/**
 * 设置进度条当前值
 * @param {Object} value
 * @memberOf {TypeName} 
 */
ProgressBar.prototype.setValue = function(value)
{
	if(value == undefined || value == null || value== "")return;
	this.setValueParam(value);
	
	//执行动画效果
	if(value != null && value != 0)
	{
		var par  = (parseFloat(value) / parseFloat(this.maxValue)) * 100;
		var $bar = $("#"+this.id+"_bar");
		$bar.animate({width:par+"%"},300);
	}
}

/**
 * 此方法由控件内部使用
 * @param {Object} value
 * @memberOf {TypeName} 
 */
ProgressBar.prototype.setValueParam = function(value)
{
	this.value = value;
	//更新进度条
	var $bar = $("#"+this.id+"_bar");
	$bar.css("background","url("+ ProgressBar.BarStyle["1"].image +") repeat-x");
	$bar.css("width","0px");
	//$bar.css("height",ProgressBar.progressHeight+"px");
	//$bar.css("lineHeight",ProgressBar.progressHeight+"px");
	$bar.css("textIndent","2px");
	if(this.value != 0)
	{
		$bar.html(this.value+"");
	}
	else
	{
		$bar.html("");
	}
	//更新标签
	$lab = $("#"+this.id+"_lab");
	$lab.html(this.value+"/"+this.maxValue);
}

/**
 * 重置进度条
 * @memberOf {TypeName} 
 */
ProgressBar.prototype.reSet = function()
{
	this.setValueParam(0);
}

ProgressBar.prototype.setMaxValue = function(maxValue)
{
	this.maxValue = parseInt(maxValue);
}

ProgressBar.prototype.setMinValue = function(minValue)
{
	this.minValue = parseInt(minValue);
}
