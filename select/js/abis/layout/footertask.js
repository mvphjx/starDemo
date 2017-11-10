	
var LayoutParam =
{
	headerH:100,
	footerH:70
}

var FooterHelper = 
{
	refresh :function()
	{
		var content = $("#LayoutContent");
		var f = document.getElementById("AbisFooter");
		var bodyHeight = document.documentElement.clientHeight;
		var tempHeight = LayoutParam.headerH + LayoutParam.footerH + content.outerHeight(true);
		var contentBottomHeight = LayoutParam.headerH + content.outerHeight(true)+2;
		if(f == null)return;
		if (tempHeight <= bodyHeight) 
		{
			f.style.position = "absolute";
			f.style.bottom = "0px";
			f.style.zIndex = 0;
		} 
		else 
		{
			f.style.position = "relative";
//			f.style.position = "absolute";
//			f.style.top = ""+contentBottomHeight+"px";
//			f.style.zIndex = 0;
		}
		this.show();
	},
	show:function()
	{
		$(".AbisFooter").css("visibility","visible");
		$(".AbisFooter").show();
	},
	hidden:function()
	{
		$(".AbisFooter").hide();
	}
}

window.onload = function()
{
	FooterHelper.refresh();
	FooterHelper.show();
};

window.onscroll = function()
{
	FooterHelper.refresh();
};

window.onresize = function()
{
	var f = document.getElementById("AbisFooter");
	FooterHelper.refresh();
};
