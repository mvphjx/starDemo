
function LPCardImage(lpCardId,cid)
{
	this.lpCardId 	= lpCardId;
	this.cid		= cid;
	this.isLoad		= false;
	this.init();
}

LPCardImage.prototype.init = function()
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
	var imageTool = new ImageTool("ImgOper","ImageOcx",idList,OCX.OcxType.EDIT);
	
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
	
	var imgOcx = document.getElementById("ImageOcx");
	imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);
}

LPCardImage.prototype.load = function()
{
	if(this.isLoad)return;
	this.isLoad = true;
	srcFactory.init(this.lpCardId,null,null,null,this.cid);
}

LPCardImage.prototype.refresh = function()
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

LPCardImage.prototype.switchFgp = function(bty, cid, imgType, gid)
{
	if(this.lpCardId == null)return;
	//if(WebUtil.isNull(this.layoutMgr) ) return;
	var obj 	= {};
	obj.bty 	= bty;
	obj.cid 	= cid;
	obj.imgType = imgType;
	obj.gid		= gid;
	obj.cardId 	= this.lpCardId;
	var jsonData = $.toJSON(obj);
	var url = WebVar.VarPath +"/lp/data/";
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jsonData,
		dataType : 'json',
		success : function(resInfo)
		{
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data=resInfo.data
                if(data != null)
                {
                    var img = "";
                    var mnt = "";
                    var imgLob = data.img;
                    var mntLob = data.mnt;
                    if(imgLob != null && !WebUtil.isEmpty(imgLob.item))
                    {
                        img = imgLob.item.data;
                    }
                    if(mntLob != null && !WebUtil.isEmpty(mntLob.item))
                    {
                        mnt = mntLob.item.data;
                    }
                    var imgOcx = document.getElementById("ImageOcx");
                    imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }

		},   
		error : function(e) 
		{   
			alert(AbisMessageResource.Alert['SearchError']);
		}   
	});
}