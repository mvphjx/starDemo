
function LPCaseImage(lpCaseId)
{
	this.lpCaseId 	= lpCaseId;
	this.isLoad		= false;
	this.scFactory 	= eval('('+"srcFactory"+')');
	this.init();
}

LPCaseImage.prototype.init = function()
{
	var idList = new Array();
	idList.push(ToolId.Move);
	idList.push(ToolId.ZoomIn);
	idList.push(ToolId.ZoomOut);
	idList.push(ToolId.RotateLeft);
	idList.push(ToolId.RotateRight);
	idList.push(ToolId.Precent50);
	idList.push(ToolId.Precent100);
	idList.push(ToolId.Precent150);
	idList.push(ToolId.Precent200);
	idList.push(ToolId.ViewPort);
	idList.push(ToolId.FitWidth);
	idList.push(ToolId.FitHeight);
	idList.push(ToolId.Rotate0);
	idList.push(ToolId.Rotate90);
	idList.push(ToolId.Rotate180);
	idList.push(ToolId.Rotate270);
    idList.push(ToolId.ShowCentre);
    idList.push(ToolId.ShowTriangle);
    idList.push(ToolId.ShowMnt);
	var imageTool = new ImageTool("ImgOper","ImageOcx",idList);
	
	var nThis = this;
	$(window).resize
	(
		function() 
		{
			var visible = $(".img_content").is(":visible");
			if(visible)
			{
				nThis.refresh();
			}
		}
	);
	
	this.imgOcx = document.getElementById("ImageOcx");
	if(this.imgOcx){
		this.imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);
	}	
}
LPCaseImage.prototype.setLayout = function(layoutType)
{
	this.layoutType = layoutType;
}
/*
页面布局改变 实现
 */
LPCaseImage.prototype.layout = function()
{
	var nThis = this;
	switch(this.layoutType)
	{
		case WebCode.LayoutType.Single:
            $("#MutilLayer").hide();
			$("#SingleLayer").show();
			lpCaseImg.refresh();
			if(this.layoutMgr != null)
			{
				var ocxObj = this.layoutMgr.getCurrentOcx();
				if(ocxObj != null)
				{
					var img = ocxObj.getImg();
					var mnt = ocxObj.getMnt();
					this.imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
				}
			}
			break;
		case WebCode.LayoutType.Multi:
            $("#SingleLayer").hide();
			$("#MutilLayer").show();
			var setting = 
			{
				onClick		:click,
				onDblClick	:dblClick
			}
			if(this.layoutMgr == null)
			{
				this.layoutMgr = new LPLayoutMgr("MutilLayer",setting);
			}
			else
			{
				var control = this.scFactory.getSwitchControl();
				var bty = control.getBty();
				var vid = control.getVid();
				var fgp = control.getFgp();
				this.layoutMgr.select(bty,vid,fgp);
			}
			break;
	}
	
	function click(bty,vid,fgp,cid,gid)
	{
		var control = nThis.scFactory.getSwitchControl();
		control.set5E(bty,vid,fgp,cid,gid);
	}
	
	function dblClick(bty,vid,fgp,cid,gid,img,mnt)
	{
        nThis.setLayoutType(WebCode.LayoutType.Single);
		nThis.layout();
	}
}

LPCaseImage.prototype.load = function()
{
	if(this.isLoad)return;
	this.isLoad = true;
	this.setLayoutType(WebCode.LayoutType.Multi);
	this.layout();
	srcFactory.init(this.lpCaseId);
}


LPCaseImage.prototype.refresh = function()
{
    var height = $(window).height();
    var ocxH = 640;
    var ocxTop = $("#ImageOcx").offset().top;
 	var tempH = height - ocxTop - LayoutParam.footerH - 3;
 	if(tempH > ocxH)
 	{
 		ocxH = tempH;
 	}
 	$(".ocx").height(ocxH);
}

LPCaseImage.prototype.switchFgp = function(bty, vid, fgp, cid, imgType, gid, cardId)
{
	if(cardId == null)return;
	if (WebUtil.isNull(this.layoutMgr) ) return;
	if(this.layoutType == WebCode.LayoutType.Multi)
	{
		if(!this.layoutMgr.isLoad())
		{
			var data = this.scFactory.getData();
			var struct = null;
			if(data != null)
			{
				struct = data.downList;
			}
			var sc 		= this.scFactory.getSwitchControl();
			var imgType = sc.getImgId();
			var gid 	= sc.getGid();
			this.layoutMgr.load(struct,imgType,gid);
		}
		else
		{
			this.layoutMgr.select(bty,fgp,cid,imgType,gid);
			this.layoutMgr.changeAllGid(gid);
		}
	}
	else
	{
		var imgOcx = this.layoutMgr.getImgOcx(bty,fgp,cid);
		var img = imgOcx.getImg();
		var mnt = imgOcx.getMnt();
		if(imgOcx.gid === gid&&imgOcx.imgType === imgType){
			var imgOcx = document.getElementById("ImageOcx");
			imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
		}else{
			var obj 		= {};
			obj.cardId 		= cardId;
			obj.bty 		= bty;
			obj.cid 		= cid;
			obj.imgType 	= imgType;
			obj.gid			= gid;
			var jsonData	= $.toJSON(obj);
			var url = WebVar.VarPath +"/lp/data/";
			jQuery.ajax(
					{
						type 		: 'POST',
						contentType : 'application/json',
						url 		: url,
						data 		: jsonData,
						dataType 	: 'json',
						success 	: function(resInfo)
						{
                            if (resInfo.status === WebCode.WebResultStatus.ok)
                            {
                                var data=resInfo.data
                                if(data != null)
                                {
                                    var imgData = data.img&&data.img.item&&data.img.item.data||{}
                                    var mntData = data.mnt&&data.mnt.item&&data.mnt.item.data||{}
                                    var imgOcx = document.getElementById("ImageOcx");
                                    imgOcx.HS_OCX_SetImageMnt(imgData, "", mntData, "");
                                }
                            }else{
                                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                            }

						},   
						error: function (res, error) 
						{
							alert(error);
						}
					});
			
		}
		this.layoutMgr.select(bty,fgp,cid,imgType,gid);
		this.layoutMgr.changeAllGid(gid);
		
		
	}
}

LPCaseImage.prototype.setLayoutType = function(layoutType)
{
	this.layoutType = layoutType;
	srcFactory.switchControl.layout = layoutType;//同步switchControl的布局参数

}

LPCaseImage.prototype.getLayoutType = function()
{
	return this.layoutType;
}