
MultiProgressParam =
{
		SiteWidth		: 2,
		HasSite			: true
}

/**
 * 
 * @param {Object} pid
 * @param {Object} setting 格式
 * setting = 
 * {
 * 		model:
 * 		[
 * 			{
 * 				id			:"主键(非空、命名方法遵循变量命名)",
 * 				unit		:"百分比([0-00]非空)",
 * 				percent		:"当前进度(可空)",
 * 				text		:"显示文本",
 * 				tipId		:"鼠标经过时显示层ID,在外界设置一个DIV可将其ID传入(可空)"
 * 			},...
 * 		]
 * }
 */
function MultiProgress(pid, setting)
{
	this.pid 		= pid;
	this.setting 	= setting;
	this.init();
}

MultiProgress.prototype.initParam = function()
{
	this.body 		= null;	
}

MultiProgress.prototype.init = function()
{
	if(AfisHelper.isNull(this.setting))return;
	var model = this.setting.model;
	if(AfisHelper.isEmpty(model))return;
	this.initParam();
	var parent 	= $("#"+this.pid);
	var bodyId	= this.pid+"_"+"Body";
	this.body 	= $("<div class=\"MProgress\"></div>");
	this.body.attr("id",bodyId);
	this.body.bind("selectstart",function(){return false;});
	parent.append(this.body);
	var bodyWidth 	= this.body.width();
	var siteWidth 	= 0;
	if(MultiProgressParam.HasSite == true)
	{
		siteWidth = (model.length + 1) * (MultiProgressParam.SiteWidth);
	}
	var width		= bodyWidth - siteWidth;//可使用的宽度
	var proWidthCnt	= 0;
	var totalTime = 0;
	for(var i=0;i<model.length;i++)
	{
		totalTime += parseInt(model[i].unit);
	}
	for(var i=0;i<model.length;i++)
	{
		if(MultiProgressParam.HasSite == true)
		{
			this.addSite();
		}
		//添加进度对象
		var m 			= 	model[i];
		//计算进度百分比对应长度
		var proWidth 	= 	parseInt(width * (m.unit / totalTime));
		if(i == model.length - 1)
		{
			m.width		=	width - proWidthCnt;
		}
		else
		{
			m.width		= 	proWidth;
		}
		proWidthCnt 	+= 	proWidth;
		this.addProgress(m);
	}
	if(MultiProgressParam.HasSite == true)
	{
		this.addSite();
	}
	this.initEvent();
}

/**
 * 获取所有进度条的进度
 * @return {Object} obj = {id:percent,...} 
 */
MultiProgress.prototype.getAllPercent = function()
{
	var obj = null;
	if(!AfisHelper.isEmpty(this.progressList))
	{
		obj = {};
		for(var i=0;i<this.progressList.length;i++)
		{
			var p = this.progressList[i];
			obj[p.getId()] = parseInt(p.getPercent());
		}
	}
	return obj;
}

MultiProgress.prototype.reSet = function()
{
	if(!AfisHelper.isEmpty(this.progressList))
	{
		for(var i=0;i<this.progressList.length;i++)
		{
			var p = this.progressList[i];
			p.reSet();
		}
	}
}

/**
 * 获取指定进度条的当前进度
 * @param {Object} id 进度ID
 * @return {Number} [0-100]
 */
MultiProgress.prototype.getPercent = function(id)
{
	var percent = null;
	if(!AfisHelper.isEmpty(this.progressList))
	{
		for(var i=0;i<this.progressList.length;i++)
		{
			var p = this.progressList[i];
			if(p.getId() == id)
			{
				percent = parseInt(p.getPercent());
				break;
			}
		}
	}
	return percent;
}

/**
 * 设置指定进度条的当前进度
 * @param {Object} id 进度ID
 * @param {Object} percent 进度值[0-100]
 */
MultiProgress.prototype.setPercent = function(id,percent,delay)
{
	var progress = null;
	for(var i=0;i<this.progressList.length;i++)
	{
		var p = this.progressList[i];
		if(p.getId() == id)
		{
			progress = p;
			break;
		}
	}
	if(!AfisHelper.isNull(progress))
	{
		progress.setPercent(percent,delay);
	}
}

/** 添加分割点 */
MultiProgress.prototype.addSite = function()
{
	var site = $("<div class=\"Site\"></div>");
	this.body.append(site);
}

/** 初始化事件 */
MultiProgress.prototype.initEvent = function()
{
	var thisObj = this;
	this.body.resize
	(
		function()
		{
			thisObj.reSize();
		}
	); 
}

MultiProgress.prototype.reSize = function()
{
	if(AfisHelper.isNull(this.setting))return;
	if(AfisHelper.isNull(this.progressList))return;
	var model		= this.setting.model;
	var bodyWidth 	= this.body.width();
	var siteWidth 	= 0;
	if(MultiProgressParam.HasSite == true)
	{
		siteWidth = (model.length + 1) * (MultiProgressParam.SiteWidth);
	}
	var width		= bodyWidth - siteWidth;//可使用的宽度
	var proWidthCnt	= 0;
	var totalTime = 0;
	for(var i=0;i<model.length;i++)
	{
		totalTime += parseInt(model[i].unit);
	}
	for(var i=0;i<this.progressList.length;i++)
	{
		var p 		= this.progressList[i];
		var param 	= p.getParam();
		var proWidth 	= 	parseInt(width * (param.unit / totalTime));
		if(i == model.length - 1)
		{
			param.width	= width - proWidthCnt;
		}
		else
		{
			param.width	= proWidth;
		}
		proWidthCnt 	+= 	param.width;
		p.reSize();
	}
}

MultiProgress.prototype.addProgress = function(modelParam)
{
	
	if(AfisHelper.isNull(modelParam))return;
	if(AfisHelper.isEmpty(this.progressList))
	{
		this.progressList = new Array();
	}
	var p = new SingleProgress(modelParam,this);
	this.progressList.push(p);
	
}

MultiProgress.prototype.getBody = function()
{
	return this.body;	
}

/************************************************************/
/**							单个进度							*/
/************************************************************/

function SingleProgress(param,parent)
{
	this.parent = parent;
	this.param 	= param;
	this.init();
}

SingleProgress.prototype.init = function()
{
	var body 		= this.parent.getBody();
	this.proBar 	= new $("<div class=\"SProgress\"></div>");
	this.proBar.width(this.param.width);
	body.append(this.proBar);
	
	this.valueBar 	= new $("<div class=\"ValueBar\"></div>");
	this.proBar.append(this.valueBar);
	if(!AfisHelper.isNull(this.param.percent))
	{
		var perWidth = parseInt(this.proBar.width() * (this.param.percent / 100));
		this.valueBar.width(perWidth);
	}
	this.txtBar 	= new $("<div class=\"TxtBar\"></div>");
	this.txtBar.html(this.param.text+"("+this.param.percent+"%)");
	this.valueBar.append(this.txtBar);
	this.txtBar.width(this.proBar.width());
}
SingleProgress.prototype.getId = function()
{
	if(AfisHelper.isNull(this.param))return null;
	return this.param.id;
}

SingleProgress.prototype.getParam = function()
{
	return this.param;
}

SingleProgress.prototype.getPercent = function()
{
	if(AfisHelper.isNull(this.param))return null;
	return this.param.percent;	
}

SingleProgress.prototype.setPercent = function(percent,delay)
{
	this.param.percent = percent;
	this.txtBar.html(this.param.text+"("+this.param.percent+"%)");
	var perWidth = parseInt(this.proBar.width() * (this.param.percent / 100));
	if(delay == true)
	{
		//this.valueBar.width(0);
		this.valueBar.animate({width:perWidth+"px"},800);
	}
	else
	{
		this.valueBar.width(perWidth);
	}
	
}

SingleProgress.prototype.reSet = function()
{
	this.valueBar.width(0);
	this.txtBar.html(this.param.text+"(0%)");
}

SingleProgress.prototype.reSize = function()
{
	this.proBar.width(this.param.width);
	if(!AfisHelper.isNull(this.param.percent))
	{
		var perWidth = parseInt(this.proBar.width() * (this.param.percent / 100));
		this.valueBar.width(perWidth);
	}
	this.txtBar.width(this.proBar.width());
}
	