//========================== 画布 =============================
	
ColumnCanvas.prototype.bColor		= "#bcd1f1";
ColumnCanvas.prototype.curRect		= null;
ColumnCanvas.prototype.curSelect	= null;
ColumnCanvas.prototype.name			= null;
ColumnCanvas.prototype.p			= 10;
ColumnCanvas.prototype.rects		= new Array();
ColumnCanvas.prototype.param		= null;


//========================参数说明============================
/**
 * ColumnCanvas.prototype.param = 
 * {
 * 		onDelete : function(id){}
 * }
 */

function ColumnCanvas(name,param)
{
	this.name	= name;
	this.param	= param;
	this.canvas	= document.getElementById(this.name);
	this.$canvas= $("#"+name);
	
	// 常量
	this.hBorderCnt = 10;
	
	this.initEvent = function()
	{
		var nThis = this;

		$(document).mouseup(function(e){
			for(var i = 0;i < nThis.rects.length;i++)
			{
				var r = nThis.rects[i];
				var b = r.getBounds();
				var x = e.clientX;
				var y = e.clientY;
				if(x >= b.x && x <= b.x + b.width && y >= b.y && y<= b.y + b.height)
				{
					
				}
				else
				{
					r.setSelection(false);
				}
			}
			
			if(nThis.curRect == null) return;
			if(nThis.curRect.isCanReSize() == true)
			{
				if(!nThis.curRect.isFinish()) return;
			}
			nThis.curRect = null;	
		});

		$(document).mousemove(function(e){
			if(nThis.curRect != null)
			{
				nThis.curRect.update(e.clientX,e.clientY);
			}	
		});
		
		$(document).mousedown(function(e){
			
		});
		
		$(document).keyup(function(e){
			if(e.keyCode == 46)
			{
				// 删除
				if(nThis.curSelect != null)
				{
					nThis.curSelect.remove();
					nThis.remove(nThis.curSelect);
					if(nThis.param.onDelete != null)
					{
						nThis.param.onDelete(nThis.curSelect.getId());
					}
				}
			}
		});
		
		function reSize()
		{
			refresh();
		}
		
		function refresh()
		{
			nThis.refresh();
		}
		
		window.onresize = reSize;
	}

	this.init = function()
	{
		this.initColumnCanvasSize();
		this.draw();
	}

	this.init();
	this.initEvent();
}

ColumnCanvas.prototype.initColumnCanvasSize = function()
{
	var leftW 	= $("#left_part").width();
	var rightW 	= $("#right_part").width();
	
	var width 	= $(window).width() - leftW - rightW - this.hBorderCnt;
	var height  = $(window).height() - this.getOffsetY() - LayoutParam.footerH -2;
	this.canvas.width	= width;
	this.canvas.height	= height;

}

ColumnCanvas.prototype.refresh = function()
{
	
	// 检查所有元素的高度并更新画布的高度
	var maxH = 0;
	for(var i = 0; i < this.rects.length; i++)
	{
		var r = this.rects[i];
		var h = r.getTop() + r.getHeight();
		if(h > maxH) maxH = h;
	}
	var width = $(window).width();
	var vBarW = 0;
	
	var windowH = $(window).height() - LayoutParam.footerH;
	if(maxH < windowH)
	{
		maxH = windowH;
		if($(window).width() < $(document).width())
		{
			vBarW = -17;
		}
	}
	else
	{
		if($(window).width() == $(document).width())
		{
			vBarW = 17;
		}

	}
	
	
	var leftW 	= $("#left_part").width();
	var rightW 	= $("#right_part").width();
	
	var width 	= $(window).width() - leftW - rightW - this.hBorderCnt - vBarW;
	var height  = maxH - LayoutParam.headerH - 3 ;
	
	this.canvas.width	= width;
	this.canvas.height	= height;
	
	this.draw();
	
	FooterHelper.refresh();
}

ColumnCanvas.prototype.draw = function()
{			
	if (this.canvas.getContext)
	{
		var gc = this.canvas.getContext('2d');

		gc.clearRect(0,0,this.canvas.width,this.canvas.height);
	
		var hm = parseInt(this.canvas.width / this.p);
		var hn = this.canvas.width % this.p;
		for(var i = 0; i <= hm; i++)
		{
			var x = i * this.p;
			if(i == hm) x--;
			gc.strokeStyle = this.bColor;
			gc.beginPath();
			gc.lineWidth = 1;
			gc.moveTo(x + 0.5, 0);
			gc.lineTo(x + 0.5, this.canvas.height);
			gc.stroke();
		}
		// 补线
		if(hn > 0 )
		{
			var x = hm * this.p;
			hn--;
			gc.strokeStyle = this.bColor;
			gc.beginPath();
			gc.lineWidth = 1;
			gc.moveTo(x + hn + 0.5, 0);
			gc.lineTo(x + hn + 0.5, this.canvas.height);
			gc.stroke();
		}
		
		var vm = parseInt(this.canvas.height / this.p);
		for(var i = 0; i <= vm; i++)
		{
			var y = i * this.p;
			gc.strokeStyle = this.bColor;
			gc.beginPath();
			gc.lineWidth = 1;
			gc.moveTo(0, y + 0.5);
			gc.lineTo(this.canvas.width, y + 0.5);
			gc.stroke();
		}
	}
}

ColumnCanvas.prototype.clear = function()
{		
	for(var i in this.rects)
	{
		var r = this.rects[i];
		r.remove();
	}
	this.refresh();
}

ColumnCanvas.prototype.getBounds = function()
{
	if(this.bounds == null) this.bounds = {};
	this.bounds.x = this.getOffsetX();
	this.bounds.y = this.getOffsetY();
	this.bounds.width = this.getWidth();
	this.bounds.height = this.getHeight();
	return this.bounds;
}

ColumnCanvas.prototype.getOffsetX = function()
{
	var left = this.$canvas.offset().left;
	return left;
}

ColumnCanvas.prototype.getOffsetY = function()
{
	var top	= this.$canvas.offset().top;
	return top;
}

ColumnCanvas.prototype.getWidth = function()
{
	return this.$canvas.width();
}

ColumnCanvas.prototype.getHeight = function()
{
	return this.$canvas.height();
}

ColumnCanvas.prototype.setHeight = function(height)
{
	var h = this.canvas.height;
	if(h > height) return;
	
	var windowH = $(window).height() - LayoutParam.footerH;
	if(height > windowH)
	{
		this.canvas.width -= 17;
	}	
	this.canvas.height = height;
	this.draw();
	FooterHelper.refresh();
}

ColumnCanvas.prototype.getCurRect = function()
{
	return this.curRect;
}

ColumnCanvas.prototype.setCurRect = function(rect)
{
	this.curRect = rect;
}

ColumnCanvas.prototype.getGridPix = function()
{
	return this.p;
}

ColumnCanvas.prototype.getRects = function()
{
	return this.rects;
}

ColumnCanvas.prototype.add = function(rect)
{
	this.rects.push(rect);
}

ColumnCanvas.prototype.remove = function(rect)
{
	var index = -1;
	for(var i = 0;i<this.rects.length;i++)
	{
		var r = this.rects[i];
		if(r.getId() == rect.getId())
		{
			index = i;
			break;
		}
	}
	if(index != -1)
	{
		var start = this.rects.slice(0, index);
		var end = [];
		if(index + 1 < this.rects.length)
		{
			end = this.rects.slice(index+1, this.rects.length);
		}
		this.rects = start.concat(end);
		this.curRect = null;
	}
}

ColumnCanvas.prototype.setCurSelect = function(curSelect)
{
	this.curSelect = curSelect;
	for(var i = 0;i<this.rects.length;i++)
	{
		var r = this.rects[i];
		if(r.getId != curSelect.getId)
		{
			r.setSelection(false);
		}
	}
}

//======================= 栏目对象 =================================

ColRect.prototype.canReSize = false;	// 是否可改变
ColRect.prototype.canMove	= false;	// 是否可移动
ColRect.prototype.finish	= false;	// 改变大小已完成
ColRect.prototype.minW		= 100;
ColRect.prototype.minH		= 100;
ColRect.prototype.canvas	= null;
ColRect.prototype.param		= null;

/*
	param
	{
		obj	: cn.unibc.abis.orm.portal.ent.PortalColumns
		cfg	: cn.unibc.ysabis.web.abis.data.sys.protal.PortalCol
	}
 */
function ColRect(canvas,param)
{
	this.canvas = canvas;
	this.param 	= param;
	this.init();
	this.canvas.add(this);
}

ColRect.prototype.init = function()
{
	this.div = $("#rect").clone(true);
	this.div.bind("selectstart", function(){return false});
	$("body").append(this.div);
	var url = WebVar.VarPath + this.param.obj.url;
	this.div.find(".frame").prop("src",url);
	
	this.div.width(this.param.obj.defWidth);
	this.div.height(this.param.obj.defHeight);
	
	this.getHBorder = function()
	{
		var fw	= this.div.outerWidth(true);
		var w	= this.div.width();
		return fw - w;
	}
	
	this.getVBorder = function()
	{
		var fh	= this.div.outerHeight(true);
		var h	= this.div.height();
		return fh - h;
	}
	
	var nThis = this;
	this.shadow = this.div.find(".drag");
	this.shadow.mousemove(function(e){
	
		if(nThis.canMove == true)return;
		if(nThis.canReSize == true)return;
		if(nThis.canvas.getCurRect() != null)return;
	
		//判断是否可以移动
		var x		= $(this).offset().left + $(this).width();
		var y		= $(this).offset().top + $(this).height();
		nThis.dx	= x - e.clientX ;
		nThis.dy	= y - (e.clientY + $(document).scrollTop());
		//console.info(x+":"+y+":"+ox+":"+oy);
		if(nThis.dx > -5 && nThis.dx < 15 && nThis.dy > -5 && nThis.dy < 15)
		{
			nThis.inReSizeArea	= true;
			$(this).css({cursor:"nw-resize"});
		}
		else
		{
			nThis.inReSizeArea = false;
			$(this).css({cursor:"pointer"});
			nThis.canvas.setCurRect(null);
		}
	});
	
	this.shadow.mouseover(function(){
		nThis.div.find(".img").show();
	});
	
	this.shadow.mouseout(function(e){
		nThis.div.find(".img").hide();
		if(nThis.canMove == true)
		{
			nThis.checkLocation(true);
			nThis.canvas.refresh();
		}
	});
	
	this.shadow.mousedown(function (e) 
	{
		//console.info(nThis.canReSize);
		if(e.which == 1)
		{
			// 设置选中当前对象
			nThis.setSelection(true);
			nThis.canvas.setCurSelect(nThis);
			
			if(nThis.inReSizeArea == true)
			{
				nThis.finish	= false;
				nThis.canReSize	= true;
				nThis.canMove	= false;
			}
			else
			{
				var offset		= nThis.div.offset();
				nThis.ox		= e.offsetX;
				nThis.oy		= e.offsetY;
				//console.info(e.offsetX+":"+e.offsetY);
				nThis.canMove	= true;
				nThis.canReSize = false;
			}
			nThis.canvas.setCurRect(nThis);
		}
	});
	
	// 鼠标弹起
	this.shadow.mouseup(function(e)
	{
		if(e.which == 1)
		{
			if(nThis.canMove == true)
			{
				nThis.uploadLocation(true);
			}
			else
			{
				nThis.finish = true;
				nThis.updateSize();
			}
			curRect			= null;
			nThis.canMove	= false;
			nThis.canReSize	= false;
			nThis.canvas.refresh();
		}
	});
	
	this.initBounds = function()
	{
		// 根据配置更新坐标以及尺寸然后再显示
		var cfg = this.param.cfg;
		if(cfg == null) return;
		
		var w = this.canvas.getWidth();
		var h = this.canvas.getHeight();
		
		var ox 	= this.canvas.getOffsetX();
		var oy 	= this.canvas.getOffsetY();
		
		var css = {};
		css.left 	= parseInt(w * cfg.x) + ox;
		css.top	 	= parseInt(h * cfg.y) + oy;
		css.width 	= parseInt(w * cfg.width);
		css.height	= parseInt(h * cfg.height);
		
		this.div.css(css);
	}
	
	// 调整尺寸后优先单元格匹配尺寸
	this.updateSize = function()
	{
		var ox	= this.canvas.getOffsetX();
		var oy	= this.canvas.getOffsetY();
	
		
		var x	= this.div.offset().left - ox;
		var y	= this.div.offset().top - oy;
		//console.info("x="+x+"y="+y);
	
		var aw	= x + this.div.outerWidth(true);
		var ah	= y + this.div.outerHeight(true);
		//console.info("aw="+aw+"ah="+ah);
	
		var hBorder = this.div.outerWidth(true) -  this.div.width();
		
		var p	= this.canvas.getGridPix();
		var hp	= p / 2;
		var nw	= aw % p;
		var nh	= ah % p;
//		console.info("hp=" + hp + " nw=" + nw + " nh="+nh);
		
		var nx	= parseInt(aw / p);
		var ny	= parseInt(ah / p);
//		console.info("nx=" + nx + " ny=" + ny);
	
		if(nw > hp) nx++;
		if(nh > hp) ny++;
//		console.info("nx=" + nx + " ny=" + ny);
		
		var w = nx * p;
		var h = ny * p;
		//console.info("w="+w+"h="+h);
	
		w -= x;
		h -= y;
		
		w -= 1;
		h -= 1;
		
		this.div.css({width:w,height:h});
	
		var nThis = this;
		function callBack()
		{	
			nThis.updateContent();
		}
		this.checkSize(callBack);
	
	}
	
	// 单元格定位
	this.uploadLocation = function(delay)
	{
		var ox	= this.canvas.getOffsetX();
		var oy	= this.canvas.getOffsetY();
		
		var x	= this.div.offset().left - ox;
		var y	= this.div.offset().top - oy;
		//console.info("x="+x+"y="+y);

		var p	= this.canvas.getGridPix();
		var hp	= p / 2;
		var fx	= x % p;
		var fy	= y % p;
		var nx	= parseInt(x / p);
		var ny	= parseInt(y / p);
		if(fx > hp) nx++;
		if(fy > hp) ny++;
		x = nx * p;
		y = ny * p;
		x+= ox;
		y+= oy;
		
		this.div.css({left:x,top:y});
	
		this.checkLocation(false);
	}
	
	// 检查改变后的尺寸是否超出范围
	this.checkSize = function(callBack)
	{	
		var cx = this.canvas.getOffsetX();
		var cw = this.canvas.getWidth();
	
		var dx = this.div.offset().left;
		var dw =  this.div.outerWidth(true);
	
		var border = dw - this.div.width();
		if(dx + dw > cx + cw)
		{
			var w = cx + cw - dx - border;
			this.div.animate({width:w},100,callBack);
		}
		else
		{
			callBack();
		}
	}
	
	// 检查是否超出范围(下边界不判断)
	this.checkLocation = function(delay)
	{
		var cx = this.canvas.getOffsetX();
		var cy = this.canvas.getOffsetY();
		var cw = this.canvas.getWidth();
	
		var dx = this.div.offset().left;
		var dy = this.div.offset().top;
		var dw = this.div.outerWidth(true);
	
		var stop = false;
		var css = {};
		// 上边界
		if(dy < cy)
		{
			stop = true;
			css.top = cy;
		}
	
		// 左边界
		if(dx < cx)
		{
			stop = true;
			css.left = cx;
		}
	
		// 右边界
		if(dx + dw > cx + cw)
		{
			stop = true;
			dx = cx + cw - dw;
			css.left = dx;
		}
		
		if(stop == true)
		{		
			this.canvas.setCurRect(null);
			this.canMove = false;
			if(delay)
			{
				this.div.animate(css,100);
			}
			else
			{
				this.div.animate(css,0);
			}
		}
	}
	
	// 改变位置
	this.move = function(ex,ey)
	{
		ey += $(document).scrollTop();
		var x = ex - this.ox - this.getHBorder();
		var y = ey - this.oy - this.getVBorder();
		this.div.css({left:x,top:y});
	}
	
	// 改变尺寸
	this.reSize = function(ex,ey)
	{
		var x	= this.div.offset().left;
		var y	= this.div.offset().top;
		var w	= ex - x + this.dx;
		var h	= ey - y + this.dy + $(document).scrollTop();
		
		if(w >= this.minW)
		{
			this.div.css({width:w});
		}
		if(h >= this.minH)
		{
			this.div.css({height:h});
		}
		this.updateContent();
	}
	
	this.updateContent = function()
	{
		var h = this.div.height();
	
		// 调整iframe大小
		this.div.find(".frame").height(h);
	
		// 调整遮盖层大小
		var shadow = this.div.find(".drag");
		shadow.height(this.div.height());
	
		//更新下拉图标位置
		var size = this.div.find(".img").width();
		var x = shadow.width() - size;
		var y = shadow.height() - size;
		this.div.find(".img").css({left:x,top:y});
	}
	
	// function call start 
	
	var nThis = this;
	function callBack()
	{	
		nThis.updateContent();
	}
	
	
	if(this.param.cfg != null)
	{
		this.initBounds();
		this.div.show();
		this.checkSize(callBack);
		this.uploadLocation(false);
		this.updateSize();
	}
	else
	{
		this.div.show();
		this.checkSize(callBack);
		this.uploadLocation(false);
		this.updateSize();
	}
}

ColRect.prototype.getBounds = function()
{
	if(this.bounds == null) this.bounds = {};
	this.bounds.x = this.div.offset().left;
	this.bounds.y = this.div.offset().top;
	this.bounds.width = this.div.outerWidth(true);
	this.bounds.height = this.div.outerHeight(true);
	return this.bounds;
}

ColRect.prototype.getRelativeBounds = function()
{
	var b = this.getBounds();
	var cb = this.canvas.getBounds();
	var bounds		= {};
	bounds.x 		= WebUtil.formatNum((b.x - cb.x) / cb.width,3);
	bounds.y 		= WebUtil.formatNum((b.y - cb.y) / cb.height,3);
	bounds.width	= WebUtil.formatNum(b.width / cb.width,3);
	bounds.height	= WebUtil.formatNum(b.height / cb.height,3);
	return bounds;
}

ColRect.prototype.update = function(ex,ey)
{
	if(this.canReSize == true)
	{
		this.reSize(ex,ey);
	}
	else if(this.canMove == true)
	{
		this.move(ex,ey);
	}
}

ColRect.prototype.setSelection = function(selected)
{
	if(selected == true)
	{
		this.div.removeClass("normal").addClass("hover");
	}
	else
	{
		this.div.removeClass("hover").addClass("normal");
	}
}

ColRect.prototype.remove = function()
{
	this.div.remove();
}

ColRect.prototype.getId = function()
{
	return this.param.id;
}

ColRect.prototype.getUrl = function()
{
	return this.param.url;
}

ColRect.prototype.getTop = function()
{
	return this.div.offset().top;
}

ColRect.prototype.getHeight = function()
{
	return this.div.outerWidth(true);
}

ColRect.prototype.getHeight = function()
{
	return this.div.outerHeight(true);
}

ColRect.prototype.getDiv = function()
{
	return this.div;
}

ColRect.prototype.isCanMove = function()
{
	return this.canMove;
}

ColRect.prototype.isCanReSize = function()
{
	return this.canReSize;
}

ColRect.prototype.isFinish = function()
{
	return this.finish;
}