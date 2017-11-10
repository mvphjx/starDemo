/**
 * 有两套控件 
 * 
 * 单个指纹 this.imgOcx
 * 平铺 this.layoutMgr
 */
TPCardImage.prototype.selBfvc = {}

function TPCardImage(tpCardId)
{
	this.tpCardId 	= tpCardId;
	this.isLoad		= false;
	this.scFactory 	= eval('('+"srcFactory"+')');
	this.init();
}

TPCardImage.prototype.init = function()
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

	this.imgOcx = document.getElementById("ImageOcx");
	if ( !WebUtil.isNull(this.imgOcx) )
	{
		this.imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);		
	}
}

TPCardImage.prototype.refresh = function()
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

TPCardImage.prototype.load = function()
{
	if(this.isLoad)return;
	this.isLoad = true;
	this.setLayoutType(WebCode.LayoutType.Multi);
	this.layout();
	srcFactory.init(this.tpCardId);
	srcFactory.showLayoutBnt();

}
/*
    根据生物特征 动态加载其他的  生物特征信息（例如文本信息）

 */
TPCardImage.prototype.loadOther = function(){
    var objData = [];
    //文本信息
    if(WebUtil.isNull(this.isLoadCardImage)||this.isLoadCardImage===false){
        if(srcFactory.data&&srcFactory.data.treeList){
            for(var i=0;i<srcFactory.data.treeList.length;i++){
                var fgp = srcFactory.data.treeList[i];
                if(fgp.bty==ABISCode.Bty.BTY_CARDIMAGE&&fgp.fgp>=0){
                    if(WebUtil.isEmpty(objData)){
                        objData.push({bty:10,btyText:AbisMessageResource.ToolIdText.TextInfo,vids:[{vid:0,vidText:"",fgpList:[]}]})
                    }
                    var fgps=objData[0].vids[0].fgpList;
                    fgps.push({fgp:fgp.fgp,fgpText:fgp.name});
                }
            }
        }
    }
    this.layoutMgr.create(objData);
    this.isLoadCardImage=true;
}

TPCardImage.prototype.switchFgp = function(bty, vid, fgp, cid, imgType, gid)
{
	
	if(this.tpCardId == null)return;
	if ( WebUtil.isNull(this.layoutMgr) ) return;
	this.selBfvc.bty = bty;
	this.selBfvc.vid = vid;
	this.selBfvc.fgp = fgp;
	this.selBfvc.cid = cid;
	if(this.layoutType == WebCode.LayoutType.Multi && !WebUtil.isNull(this.layoutMgr) )
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
			var sc 		= srcFactory.getSwitchControl();
			var imgType = sc.getImgId();
			var gid 	= sc.getGid();
			var imgOcx = this.layoutMgr.getImgOcx(bty,vid,fgp);
			this.layoutMgr.select(bty,vid,fgp,cid,imgType,gid);
			this.layoutMgr.changeAllGid(gid);
		}
	}
	else
	{
		var findImg = true;
		var findMnt = true;
		var imgOcx = this.layoutMgr.getImgOcx(bty,vid,fgp);
		if(imgOcx){
            var lobImg = imgOcx.getLobImg();
            var lobMnt = imgOcx.getLobMnt();
            if(imgType == ABISCode.ImageShowType.PriCpr || imgType == ABISCode.ImageShowType.Cpr)
            {
                if(lobImg.lob.gid == ABISCode.ImageGroupIdCode.CPR)
                {
                    findImg = false;
                }
            }
            else if(imgType == ABISCode.ImageShowType.PriLoseLess || imgType == ABISCode.ImageShowType.LoseLess)
            {
                if(lobImg.lob.gid == ABISCode.ImageGroupIdCode.LOSELESS)
                {
                    findImg = false;
                }
            }
            else
            {
                findImg = true;
            }
            if(lobMnt != null && lobMnt.lob.gid == gid)
            {
                findMnt = false;
            }
            if(imgOcx.cid !==cid){
                //cid 切换实现
                findImg =true ;
                findMnt =true;
            }
            if(findImg == false && findMnt == false)
            {
                img = lobImg.item.data;
                mnt = lobMnt.item.data;
                this.imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
            }
            else
            {
                this.getDataForOcx(findImg,findMnt,imgType,gid);
            }
		}else{
		    //平铺时 控件不存在
            this.getDataForOcx(findImg,findMnt,imgType,gid);
		}
		this.layoutMgr.select(bty,vid,fgp,cid,imgType,gid);
		this.layoutMgr.changeAllGid(gid);
	}
}
/**
 * 单个指纹控件 通过 ajax 从后台 加载数据  
 * 
 * needLoadImg 是否需要 加载图像
 * needLoadMnt 是否需要 加载特征
 * imgType 图像类型
 * gid ...
 */
TPCardImage.prototype.getDataForOcx= function (needLoadImg,needLoadMnt,imgType,gid){
	var obj 	= {};
	obj.bty 	= this.selBfvc.bty;
	obj.vid 	= this.selBfvc.vid;
	obj.fgp 	= this.selBfvc.fgp;
	obj.cid 	= this.selBfvc.cid;
	obj.imgType = imgType;
	obj.gid		= gid;
	obj.cardId 	= this.tpCardId;
	var imgOcx = this.layoutMgr.getImgOcx(this.selBfvc.bty,this.selBfvc.vid, this.selBfvc.fgp);
	var lobImg = imgOcx?imgOcx.getLobImg():null;
	var lobMnt = imgOcx?imgOcx.getLobMnt():null;
	if(needLoadImg == true && needLoadMnt == true)
	{
		obj.dataType = ABISCode.FGPDataType.ALL;
	}
	else if(needLoadImg == true)
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
				if(needLoadImg == true)
				{
					var imgObj = data.img;
					if(imgObj != null && !WebUtil.isEmpty(imgObj.item))
					{
						img = imgObj.item.data;
					}
				}
				else
				{
					img = lobImg.item.data;
				}
				if(needLoadMnt == true)
				{
					var mntObj = data.mnt;
					if(mntObj != null && !WebUtil.isEmpty(mntObj.item))
					{
						mnt = mntObj.item.data;
					}
				}
				else
				{
					mnt = lobMnt.item.data;
				}
				nThis.imgOcx.HS_OCX_SetImageMnt(img, "", mnt, "");
			}
		},   
		error : function(e) 
		{   
			alert(AbisMessageResource.Alert['SearchError']);
		}   
	});
}
/*
 页面布局改变 实现
 */
TPCardImage.prototype.layout = function()
{
	var nThis = this;
	switch(this.layoutType)
	{
		case WebCode.LayoutType.Single:
            $("#MutilLayer").hide();
			$("#SingleLayer").show();
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
				}
			}
			break;
		case WebCode.LayoutType.Multi:
            $("#SingleLayer").hide();
			$("#MutilLayer").show();
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
			break;
	}
	
	function click(bty,vid,fgp,cid,gid)
	{
		var control = srcFactory.getSwitchControl();
		nThis.selBfvc.bty = bty;
		nThis.selBfvc.vid = vid;
		nThis.selBfvc.fgp = fgp;
		nThis.selBfvc.cid = cid;
		control.set5E(bty,vid,fgp,cid,gid);
	}
	
	function dblClick(bty,vid,fgp,cid,gid,img,mnt)
	{
		nThis.setLayoutType(WebCode.LayoutType.Single);
		nThis.layout();
	}
}

TPCardImage.prototype.setLayoutType = function(layoutType)
{
	this.layoutType = layoutType;
	srcFactory.switchControl.layout = layoutType;//同步switchControl的布局参数
}

TPCardImage.prototype.getLayoutType = function()
{
	return this.layoutType;
}