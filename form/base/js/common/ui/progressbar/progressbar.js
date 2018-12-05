
var ImgParam =
{
	BorderWidth	:3
}

/**
 * 进度条控件
 * @param {Object} id
 */
function ProgressBar(id,width)
{
	this.id = id;
	this.width = parseInt(width);
	if(AfisHelper.isNull(this.width))
	{
		this.width = 300;
	}
	this.init();
}

ProgressBar.prototype.initParam = function()
{
	
}

ProgressBar.prototype.init = function()
{
	this.initParam();
	
	var $parent 		= $("#"+ this.id);
	this.$progress 		= $("<div class=\"Progress\"></div>");
	this.$progress.css("width",this.width + "px");
	$parent.append(this.$progress);
	
	this.$leftBorder 	= $("<div class=\"LeftBorder\"></div>");
	this.$rightBorder 	= $("<div class=\"RightBorder\"></div>");
	this.$barBody		= $("<div class=\"BarBody\"></div>");
	
	this.$progress.append(this.$leftBorder);
	this.$progress.append(this.$rightBorder);
	this.$progress.append(this.$barBody);
	
	this.$bodyUp 		= $("<div class=\"BodyUp\"></div>");
	this.$bodyDown		= $("<div class=\"BodyDown\"></div>");
	this.$bodyCenter	= $("<div class=\"BodyCenter\"></div>");
	this.$bar 			= $("<div class=\"CurProgressBar\"></div>");
	
	this.$barBody.append(this.$bodyUp);
	this.$barBody.append(this.$bar);
	this.$barBody.append(this.$bodyCenter);
	this.$barBody.append(this.$bodyDown);
	
	var $ProgressHeader = $("<div class=\"ProgressHeader\"></div>");
	var $ProgressFooter	= $("<div class=\"ProgressFooter\"></div>");
	var $ProgressBody	= $("<div class=\"ProgressBody\"></div>");
	
	this.$bodyCenter.append($ProgressHeader);
	this.$bodyCenter.append($ProgressFooter);
	this.$bodyCenter.append($ProgressBody);
	
	/** 初始化状态 */
	this.$leftBorder.hide();
	this.$rightBorder.hide();
}

ProgressBar.prototype.clear = function()
{
	
}

/**
 * value in [1-100]
 */
ProgressBar.prototype.setValue = function(value)
{
	if(value < 0 || value > 100)return;
	this.$leftBorder.show();
	var width = this.width - ImgParam.BorderWidth * 2 - 1 * 2;
	var bWidth = this.width - ImgParam.BorderWidth * 2;
	var precent = value / 100;
	var barWidth = precent * width;
	var borderWidth = precent * bWidth;
	this.$bar.animate({width:barWidth+"px "},50);
	this.$bodyUp.animate({width:borderWidth+"px "},50);
	this.$bodyDown.animate({width:borderWidth+"px "},50);
	if(value == 100)
	{
		this.$rightBorder.show();
	}
}