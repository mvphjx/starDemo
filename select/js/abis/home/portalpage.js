
PortalPage.prototype.width		= null;
PortalPage.prototype.height		= null;
PortalPage.prototype.colCfg		= null;
PortalPage.prototype.maxHeight 	= 0;

function PortalPage(width,height,colCfg)
{
	this.width 	= width;
	this.height = height;
	this.colCfg = colCfg;
	this.frames = new Array();
	
	this.init = function()
	{
		var content = $("#LayoutContent");
		var x = content.offset().left;
		var y = content.offset().top;
		
		if(!WebUtil.isEmpty(this.colCfg) && !WebUtil.isEmpty(this.colCfg.cols))
		{

			for(var i in this.colCfg.cols)
			{
				var col = this.colCfg.cols[i];
				var vy = parseInt(this.colCfg.height * col.y);
				var vh = parseInt(this.colCfg.height * col.height);
				if(this.maxHeight < vy + vh)
				{
					this.maxHeight = vy + vh;
				}
			}
			
			var maxH = WebUtil.getContentHeight();
			var barW = 0;
			if(this.maxHeight > maxH)
			{
				barW = 15;
			}
			
			for(var i in this.colCfg.cols)
			{
				var col = this.colCfg.cols[i];
				var vx = parseInt(this.width * col.x);
				var vy = parseInt(this.colCfg.height * col.y);
				var vw = parseInt(this.width * col.width);
				var vh = parseInt(this.colCfg.height * col.height);
				if(maxH < vy + vh)
				{
					maxH = vy + vh;
				}
				
				var left = vx + x - barW;
				var top	= vy + y;
				
				// 创建栏目
				var tpl = $("#coltpl").clone(true);
				tpl.attr("id","coltpl_"+col.id);
				tpl.attr("offsetX",vx);
				tpl.attr("offsetY",vy);
				$("#portal_panel").append(tpl);
				
				tpl.css({"left" : left, "top" : top, "width" : vw, "height" : vh});
				tpl.show();
				
				var url = WebVar.VarPath + col.url + "/" + vw + "/" + vh;
				var frame = tpl.find("iframe");
				frame.css({"width" : vw, "height" : vh});
				frame.attr("src",url);
				frame.attr("name",'portal_panel_iframe');
				
				this.frames.push(tpl);
			}
			
			// 设置页面高度
			content.height(maxH);
			$("#portal_panel").height(maxH);
		}
		
		var nThis = this;
		$(window).resize
		(
			function()
			{
				var content = $("#LayoutContent");
				var x = content.offset().left;
				var y = content.offset().top;
				
				var maxH = WebUtil.getContentHeight();
				var barW = 0;
				if(this.maxHeight > maxH)
				{
					barW = parseInt(15/ 2);
				}
				
				for(var i in nThis.frames)
				{
					var f = nThis.frames[i];
					var ox = parseInt(f.attr("offsetX"));
					var oy = parseInt(f.attr("offsetY"));

					var left = x + ox - barW;
					var top = y + oy;
					f.css({"left" : left, "top" : top});
				}
			}
		);
	}
	
	this.init();
	//兼容iframe 的事件 
	setTimeout(function(){
		$("[name=portal_panel_iframe]").focus(function(){
			$(".UserInfo").hide(); //隐藏用户
			menuObj.hiddenOther(null);//隐藏菜单
		});
	},500);
}

