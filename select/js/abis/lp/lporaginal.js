LPOraginal.prototype.imgOcx = 123;

function LPOraginal(btyInfo,btyspec)
{
    this.btyspec	= btyspec;
    this.btyInfo 	= btyInfo;
	this.init();	
}
LPOraginal.prototype.init = function()
{
	this.initImgTool();
	this.initOcx();
	var nThis = this;
	$(window).resize
	(
		function()
		{
			nThis.defaultLayout();
		}
	);
}

LPOraginal.prototype.initImgTool = function()
{
	var toolIds = [];
	toolIds.push(ToolId.Move);
	toolIds.push(ToolId.ZoomIn);
	toolIds.push(ToolId.ZoomOut);
	toolIds.push(ToolId.Precent50);
	toolIds.push(ToolId.Precent100);
	toolIds.push(ToolId.Precent150);
	toolIds.push(ToolId.Precent200);
	toolIds.push(ToolId.ViewPort);
	toolIds.push(ToolId.FitWidth);
	toolIds.push(ToolId.FitHeight);
	new ImageTool("ImgOper","ImageOcx",toolIds,OCX.OcxType.EDIT);
}
LPOraginal.prototype.switchCard = function(cardId, bty, cid, imgType, gid)
{
    // var nThis = this;
    // var obj 		= {};
    // obj.cardId 		= 34352;
    // obj.bty 		= 1;
    // obj.vid 		= 0;
    // obj.fgp 		= 1;
    // obj.cid 		= 0;
    // obj.gid 		= 0;
    // obj.imgType 	= 3;
    // obj.dataType 	= 0;
    // var json = jQuery.toJSON(obj);
    // var url = WebVar.VarPath + "/tp/data/";
    // jQuery.ajax({
    //     type : 'POST',
    //     contentType : 'application/json',
    //     url : url,
    //     data : json,
    //     dataType : 'json',
    //     success : function(data)
    //     {
    //         if (data != null)
    //         {
    //             var img = null;
    //             if (data.img != null)
    //             {
    //                 if (!WebUtil.isEmpty(data.img.item))
    //                 {
    //                     img = data.img.item.data;
    //                     nThis.imgOcx.HS_OCX_SetImageMnt(img, "", "", "");
    //
    //                 }
    //             }
    //         }
    //     },
    //     error : function(e, status, error)
    //     {
    //         //清空 ocx nThis.imgOcx
    //
    //         //dstFactory.getSwitchControl().set6E(0, 0, 0, dstcid, imgType, dstgid);
    //     }
    // });


	var url = WebVar.VarPath +"/lp/original/img/"+gid+"/"+cardId;
	var nThis = this;
	jQuery.ajax(
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : null,
		dataType : 'json',
		success : function(resInfo)
		{
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data=resInfo.data
                if(data != null)
                {
                    var img = data.img.item.data;
                    nThis.imgOcx.HS_OCX_SetImageMnt(img, "", "", "");
                }
            }else{
                DialogUtil.openSimpleDialogForOcx(resInfo.msg);
            }

		},
		error : function(e)
		{
			alert(AbisMessageResource['SearchError']);
		}
	});
};

LPOraginal.prototype.initOcx = function()
{
	try
	{
		this.imgOcx = document.getElementById("ImageOcx");
        this.imgOcx.HS_OCX_SetID("ImageOcx");
        if ( !WebUtil.isNull(this.imgOcx) )
        {
            this.imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);
        }
	}
	catch(e)
	{
		alert(e);
		this.imgOcx = null;
	}
};

/** 自动调整控件尺寸 */
LPOraginal.prototype.defaultLayout = function()
{
    var ch = WebUtil.getClientHeight();
    var rightTop = $(".RightLayout").offset().top;
    var rightH = $(".RightLayout").outerHeight(true);
    var height = ch - rightTop;
    // 使用控件区域进行空间填充
    var cMaginBorder = 4;
    $(".RightLayout").animate({"height":height+"px"},150);

    var swtichH = $(".LeftFgpLayout").outerHeight(true);
    var ocx = $(".FgpFrame");
    var ocxH = ocx.outerHeight(true);
    var downHeight = $(".DownArea").outerHeight(true) ;
    if(!$(".DownArea").is(":visible")){
        downHeight = 0;
    }
    var ocxHeight = height - downHeight - swtichH - cMaginBorder;
    ocx.height(ocxHeight);


}

