WebWindow.prototype.dialogId = null;
WebWindow.prototype.delay = 500;
WebWindow.prototype.setting = null;

/**
 * @param {Object} id
 * @param {Object} setting
 * {
 * 	title:"text",
 *  icon:"path",
 * 	page:"path",
 * 	showCtrl:false, 是否显示底部工具栏（确定和取消按钮）
 * 	button:{},
 * 	initData:{}
 * 	call:{init:"函数名",get:"函数名",set:"函数名",...}
 * 	callBack:{ok:"funcName",cancel:"funcName",...}
 * }
 */
function WebWindow(id, setting)
{
	this.dialogId = id;
	this.setting = setting;
	this.createShadow();

	var str = "";
	WebUtil.initVersion();
	if(!WebUtil.isNull(WebUtil.version.ie))
	{
		if(WebUtil.version.ie == "9.0")
		{
			str = ' width="0" height="0" ';
		}
		else
		{
			str = ' height="1" ';
		}
	}
		
	//创建对话框
	$("#"+id).remove();
	$dialog = $('<iframe id="' + id + '" name="' + id
	        + '_gDialog"  class="dialog"  frameborder="0" marginheight="0" marginwidth="0" scrolling="no" '+ str +'></iframe>');
	var obj = this;
	$dialog.load(function()
	{
		var gDialog = eval(id + "_gDialog");
		gDialog.WebWindowPage.init(obj.setting, obj,obj.setting.language);
		//到此为止尺寸已经确定了
		obj.hidd();
		obj.reSize();
		obj.show();
	});

	//$dialog.attr("src", WebVar.VarPath + "/jsp/widget/web_window_page.jsp?page=" + setting.page + "&showCtrl=" + setting.showCtrl);
	$dialog.attr("src", WebVar.VarPath + "/webwindow/open?page=" + setting.page + "&showCtrl=" + setting.showCtrl);
	$("body").append($dialog);
	
	window.onresize = function()
	{
		obj.reSize();
	}
}

WebWindow.prototype.hidd = function()
{
	var $dialog = $("#" + this.dialogId);
	$dialog.hide();
}

WebWindow.prototype.show = function()
{
	var $dialog = $("#" + this.dialogId);
	$dialog.fadeIn(300);
}

WebWindow.prototype.setData = function(data)
{
	var gDialog = eval(this.dialogId + "_gDialog");
	gDialog.WebWindowPage.setData(data);
}

WebWindow.prototype.createShadow = function()
{
	WebUtil.initVersion();
	if(!WebUtil.isNull(WebUtil.version.ie))
	{
		var vn = parseInt(WebUtil.version.ie);
		if(vn > 8)
		{
			var $shadow;
			//创建遮盖层
			if (typeof ($("#DialogShadow")[0]) == "undefined")
			{
				var clientWidth = document.body.clientWidth;
				var clientHeight = document.documentElement.scrollHeight;
				$shadow = $("<div id='DialogShadow'></div>");
				$shadow.css("width", clientWidth + "px");
				$shadow.css("height", clientHeight + "px");
				$shadow.css("display", "none");
				$("body").prepend($shadow);
				$shadow.fadeIn(this.delay);
			}
		}
	}

}

WebWindow.prototype.removeShadow = function()
{
	if (typeof ($("#DialogShadow")[0]) != "undefined")
	{
		var $shadow = $("#DialogShadow");
		$shadow.fadeOut(this.delay, function()
		{
			$shadow.remove();
		});
	}
}

WebWindow.prototype.close = function(callBack)
{
	this.removeShadow();
	var $dialog = $("#" + this.dialogId);
	$dialog.fadeOut(100);
}

WebWindow.prototype.open = function()
{
	this.createShadow();
	this.reSize();
	var $dialog = $("#" + this.dialogId);
	$dialog.fadeIn(this.delay);
}

WebWindow.prototype.reSize = function()
{
	var $dialog = $("#" + this.dialogId);
	
	//计算对话框高度
	var gDialog = eval(this.dialogId + "_gDialog");
	var frame = this.getIFrame(this.dialogId);
	var width 	= frame.contentWindow.dialogWidth;
	var height 	= frame.contentWindow.dialogHeight;
	
//	var body = $(frame.contentWindow).find("body");
//	var $childBody = $(body.prevObject[0].frameElement.contentDocument.body);
//	width 	= $childBody.outerWidth(true);
//	height	= $childBody.outerHeight(true);
	$dialog.css("width", width + "px");
	$dialog.css("height", height + "px");
	
	//计算对话框初始位置
	var clientWidth = document.body.clientWidth;
	var clientHeight =window.screen.availHeight;//屏幕分辨率的高
	//$(document.documentElement).height();
	//document.documentElement.scrollHeight;
	var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//被卷起的高度  兼容不同浏览器
	var locX = (clientWidth - width) / 2;
	//保证窗口定位  top  不能为负数  hjx  2016年11月4日
	clientHeight = clientHeight>height?clientHeight:height;
	var locY = (clientHeight - height) / 2 + top;
	$dialog.css("left", locX);
	$dialog.css("top", locY);
}

WebWindow.prototype.getIFrame = function(id)
{
	return document.getElementById(id)||document.frames[id];
}

WebWindow.prototype.getIFrameDOM = function(id)
{
	return document.getElementById(id).contentDocument||document.frames[id].document;
}
