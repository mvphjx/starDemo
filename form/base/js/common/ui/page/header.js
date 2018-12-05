
Header.prototype.noticeMsgCnt = null;

function Header(noticeMsgCnt)
{
	this.noticeMsgCnt = noticeMsgCnt;
	if(WebUtil.isNull(this.noticeMsgCnt))
	{
		this.noticeMsgCnt = 0;
	}
	this.init();	
}

Header.prototype.init = function()
{
	this.initStatus();
	this.registerEvent();
}

Header.prototype.initStatus = function()
{
	//$(".AbisHeader").bind("selectstart",function(){return false;});
}

Header.prototype.registerEvent = function()
{	
	var nThis = this;
	
	$("#user").mouseover
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("user_h");				
		}
	);
	$("#user").mouseout
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("user");				
		}
	);
	$("#user").mouseup
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("user");	
			
			var left	= $(".user").offset().left;
			var top 	= $(".user").offset().top + $(".user").height();
			var width 	= $(".UserInfo").outerWidth();
			var windowWidth	= WebUtil.getClientWidth();
			
			if(left + width > windowWidth)
			{
				left = windowWidth - width;
			}
			
			$(".UserInfo").css("left",left);
			$(".UserInfo").css("top",top - 1);	
			$(".UserInfo").slideDown(200);
		}
	);
	
	if(this.noticeMsgCnt > 0 )
	{
		$("#msg").attr("class","msg_h");
	}
	else
	{
		$("#msg").attr("class","msg");
	}
	
	$("#msg").mouseover
	(
		function()
		{
			if(nThis.noticeMsgCnt == 0) return;
			
			var x = $(this).offset().left;
			var y = $(this).offset().top;
			var h = $(this).outerHeight(true);
			
			var msg = $("#msg_tip");
			msg.css({"left":x + "px","top":( y + h) + "px"});
			msg.html(nThis.noticeMsgCnt + AbisMessageResource["NotReadInfo"]);
			msg.slideDown(150);
			
//			$(this).attr("class","msg_h");
//			setTimeout
//			(
//					function()
//					{
//						$("#msg").attr("class","msg");
//					}
//			,500);
		}
	);
	
	$("#msg").mouseout
	(
		function()
		{
			var msg = $("#msg_tip");
			msg.hide();
		}
	);

	$("#msg").click
	(
		function()
		{
			if(nThis.noticeMsgCnt > 0)
			{
				window.open(WebVar.VarPath + "/notice/user/","_blank");
			}
		}
	);
	
	$(".SearchButton").mousedown
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("SearchButtonDown");		
		}
	);
	$(".SearchButton").mouseover
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("SearchButtonHover");
		}
	);
	$(".SearchButton").mouseout
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("SearchButton");
		}
	);
	$(".SearchButton").mouseup
	(
		function()
		{
			$(this).removeClass();
			$(this).addClass("SearchButton");
			nThis.search();
		}
	);
	
	$("input[name='SearchTxt']").keyup
	(
		function(e)
		{
			if(e.keyCode == 13)
			{
				var v = $(this).val();
				if(WebUtil.isNull(v)) return;
				nThis.search();
			}
		}
	);
	
	$("body").click
	(
		function(event)
		{
			var e = event || window.event;
			var ele = e.srcElement || e.target;
			if (ele.id == "user" || ele.id == "UserInfo")
			{
				return;
			}
			$(".UserInfo").hide();
		}
	);
}

Header.prototype.search = function()
{
	var v = $("input[name='SearchTxt']").val();
	if(WebUtil.isEmpty(v)) return;
	v = WebUtil.urlEncode(v);
	var url = WebVar.VarPath + "/search/" + v;
	window.open(url,"_blank");
}