
function TPText(tpCardId)
{
	this.tpCardId 	= tpCardId;
	this.isLoad		= false;
	this.scFactory 	= eval('('+"srcFactory"+')');
	this.qualReasons = new Array();
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
    $("#ImgOper").empty();
    var imageTool = new ImageTool("ImgOper","ImageOcx",idList,OCX.OcxType.EDIT);
}
TPText.prototype.getSwitch = function()
{
	return this.scFactory.getSwitchControl();
}

TPText.prototype.init = function()
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
	$("#ImgOper").empty();
	var imageTool = new ImageTool("ImgOper","ImageOcx",idList,OCX.OcxType.EDIT);
	this.qualReasons.push({
		"id" : "0",
		"txt" : AbisMessageResource.QualReason["NotDescribed"]
	});
	this.qualReasons.push({
		"id" : "1",
		"txt" : AbisMessageResource.QualReason["Scar"]
	});
	this.qualReasons.push({
		"id" : "2",
		"txt" : AbisMessageResource.QualReason["Peeling"]
	});
	this.qualReasons.push({
		"id" : "9",
		"txt" : AbisMessageResource.QualReason["Other"]
	});

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
	//this.imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);
}

TPText.prototype.getQualReason = function(id)
{
	for (var i = 0; i < this.qualReasons.length; i++)
	{
		var qualReson = this.qualReasons[i];
		if(id==qualReson.id)
		{
			return qualReson.txt;
		}
	}
	return "";
}

TPText.prototype.refresh = function()
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

TPText.prototype.load = function()
{
	if(this.isLoad)return;
	this.isLoad = true;
	this.setLayoutType(WebCode.LayoutType.Multi);
	this.layout();
	//srcFactory.init(this.tpCardId);
}

TPText.prototype.searchTP = function(cardId,bty,vid, fgp, cid, gid, dataType, imgType)
{
    var obj 	= {};
    obj.bty 	= bty;
    obj.vid 	= vid;
    obj.fgp 	= fgp;
    obj.cid 	= cid;
    obj.gid		= gid;
    obj.imgType = imgType;
    obj.cardId 	= cardId;
    var jsonData = $.toJSON(obj);
    var url = WebVar.VarPath +"/tp/data/";
    var nThis = this;
    jQuery.ajax(
        {
            type : 'POST',
            contentType : 'application/json',
            url : url,
            data : jsonData,
            dataType : 'json',
            success : function(data)
            {
                if(data != null)
                {
                    nThis.img = "";
                    nThis.mnt = "";
                    nThis.lobImg = data.img;
                    nThis.lobMnt = data.mnt;
                    if(nThis.lobImg != null && !WebUtil.isEmpty(nThis.lobImg.item))
                    {
                        nThis.img = nThis.lobImg.item.data;
                    }
                    if(nThis.lobMnt != null && !WebUtil.isEmpty(nThis.lobMnt.item))
                    {
                        nThis.mnt = nThis.lobMnt.item.data;
                    }
                    var imgOcx = document.getElementById("ImageOcx");
                    if(nThis.mnt==null){
                        nThis.mnt="";
                    }
                    imgOcx.HS_OCX_SetImageMnt(nThis.img, "", nThis.mnt, "");
                   // nThis.showOcx();
                }
            },
            error : function(e)
            {

            }

        });
}
TPText.prototype.switchFgp = function(bty, vid, fgp, cid, imgType, gid)
{
	if(this.tpCardId == null)return;
	if(this.layoutType == WebCode.LayoutType.Multi)
	{
		if(!this.layoutMgr.isLoad())
		{
			var data = srcFactory.getData();
			var struct = null;
			if(data != null)
			{
				struct = data.downList;
			}
			var sc 		= srcFactory.getSwitchControl();
			var imgType = sc.getImgId();
			var gid 	= sc.getGid();
			this.layoutMgr.load(struct,imgType,gid);
		}
		else
		{
			this.layoutMgr.select(bty,vid,fgp);
		}
	}
	else
	{
		var findImg = true;
		var findMnt = true;
		
		var imgOcx = this.layoutMgr.getImgOcx(bty,vid,fgp);
		var lobImg = imgOcx.getLobImg();
		var lobMnt = imgOcx.getLobMnt();
		
		if(imgType == ABISCode.ImageShowType.PriCpr || imgType == ABISCode.ImageShowType.Cpr)
		{
			if(lobImg != null)
			{
				if(lobImg.lob.gid == ABISCode.ImageGroupIdCode.CPR)
				{
					findImg = false;
				}
			}
		}
		else if(imgType == ABISCode.ImageShowType.PriLoseLess || imgType == ABISCode.ImageShowType.LoseLess)
		{
			if(lobImg != null)
			{
				if(lobImg.lob.gid == ABISCode.ImageGroupIdCode.LOSELESS)
				{
					findImg = false;
				}
			}
		}
		else
		{
			findImg = true;
		}
		if(lobMnt != null)
		{
			if(lobMnt.lob.gid == gid)
			{
				findMnt = false;
			}
		}
		if(findImg == false && findMnt == false)
		{
			if(lobImg != null)
			{
				img = lobImg.item.data;
			}
			if(lobMnt != null)
			{
				mnt = lobMnt.item.data;
			}
			this.imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
			this.showQuality();

		}
		else
		{
			var obj 	= {};
			obj.bty 	= bty;
			obj.vid 	= vid;
			obj.fgp 	= fgp;
			obj.cid 	= cid;
			obj.imgType = imgType;
			obj.gid		= gid;
			obj.cardId 	= this.tpCardId;
			if(findImg == true && findMnt == true)
			{
				obj.dataType = ABISCode.FGPDataType.ALL;
			}
			else if(findImg == true)
			{
				obj.dataType = ABISCode.FGPDataType.IMG;
			}
			else
			{
				obj.dataType = ABISCode.FGPDataType.MNT;
			}
			var jsonData = $.toJSON(obj);
			var url = WebVar.VarPath +"/tp/data/";
			var nThis = this;
			jQuery.ajax( 
		    {
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : jsonData,
				dataType : 'json',
				success : function(data) 
				{   
					if(data != null)
					{
						var img = "";
						var mnt = "";
						if(findImg == true)
						{
							var imgObj = data.img;
							if(imgObj != null && !WebUtil.isEmpty(imgObj.item))
							{
								img = imgObj.item.data;
							}
						}
						else
						{
							if(lobImg != null)
							{
								img = lobImg.item.data;
							}
						}
						if(findMnt == true)
						{
							var mntObj = data.mnt;
							if(mntObj != null && !WebUtil.isEmpty(mntObj.item))
							{
								mnt = mntObj.item.data;
							}
						}
						else
						{
							if(lobMnt != null)
							{
								mnt = lobMnt.item.data;
							}
						}
						nThis.imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
						nThis.showQuality();
					}
				},   
				error : function(e) 
				{   
					//alert(AbisMessageResource.Alert['SearchError']);
				}   
			});
		}
		this.layoutMgr.select(bty,vid,fgp);
	}
}

TPText.prototype.showQuality = function ()
{
	//图像质量和特征
	var imgmnt = this.imgOcx.HS_SHOWIMGMEX_GetImgMexInfo(0);
	var objMnt = this.strToJson(imgmnt);
	if(!WebUtil.isNull(objMnt))
	{
		if(!WebUtil.isNull(objMnt.quality))
		{
			$("#ImgQual").html(objMnt.quality);
		}
		else
		{
			$("#ImgQual").html("");
		}
		if(!WebUtil.isNull(objMnt.core))
		{
			$("#CoreQual").html(objMnt.core);
		}
		else
		{
			$("#CoreQual").html("");
		}
		if(!WebUtil.isNull(objMnt.vicecore))
		{
			$("#VCoreQual").html(objMnt.vicecore);
		}
		else
		{
			$("#VCoreQual").html("");
		}
		if(!WebUtil.isNull(objMnt.leftdelta))
		{
			$("#LeftDeltaQual").html(objMnt.leftdelta);
		}
		else
		{
			$("#LeftDeltaQual").html("");
		}
		if(!WebUtil.isNull(objMnt.rightdelta))
		{
			$("#RightDeltaQual").html(objMnt.rightdelta);
		}
		else
		{
			$("#RightDeltaQual").html("");
		}
		if(!WebUtil.isNull(objMnt.mnt))
		{
			$("#MntCountQual").html(objMnt.mnt);
		}
		else
		{
			$("#MntCountQual").html("");
		}	
		if(!WebUtil.isNull(objMnt.cause))
		{
			$("#QualObjectiveReason").html(this.getQualReason(objMnt.cause));
		}
	}
}

TPText.prototype.strToJson = function (str)
{ 
	var json;
	if(!WebUtil.isNull(str))
	{
		var json = eval('(' + str + ')');
	}
	return json; 
} 

TPText.prototype.layout = function()
{
	var nThis = this;
	switch(this.layoutType)
	{
		case WebCode.LayoutType.Single:
			$("#MutilLayer").hide();
			$("#SingleLayer").show();
			$("#qualinfo").show();
			tpCardImg.refresh();
			//设置图像
			if(this.layoutMgr != null)
			{
				var ocxObj = this.layoutMgr.getCurrentOcx();
				if(ocxObj != null)
				{
					var img = ocxObj.getImg();
					var mnt = ocxObj.getMnt();
					this.imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
					this.showQuality();
				}
			}
			break;
		case WebCode.LayoutType.Multi:
			if(this.layoutMgr == null)
			{
				var setting = 
				{
					onClick		:click,
					onDblClick	:dblClick
				}
				this.layoutMgr = new TPLayoutMgr("MutilLayer",this.tpCardId,setting);
			}
			else
			{
				var control = this.scFactory.getSwitchControl();
				var bty = control.getBty();
				var vid = control.getVid();
				var fgp = control.getFgp();
				this.layoutMgr.select(bty,vid,fgp);
			}
			$("#SingleLayer").hide();
			$("#MutilLayer").show();
			$("#qualinfo").hide();
			break;
	}
	
	function click(bty,vid,fgp,cid,gid)
	{
		var control = srcFactory.getSwitchControl();
		control.set5E(bty,vid,fgp,cid,gid);
	}
	
	function dblClick(bty,vid,fgp,cid,gid,img,mnt)
	{
		nThis.layoutType = WebCode.LayoutType.Single;
		nThis.layout();
	}
}

TPText.prototype.setCardId = function(cardId)
{
	this.tpCardId = cardId;
}

TPText.prototype.setLayoutType = function(layoutType)
{
	this.layoutType = layoutType;
}

TPText.prototype.getLayoutType = function()
{
	return this.layoutType;
}