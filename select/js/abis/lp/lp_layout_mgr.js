/**
 *
 * @param id
 * @param setting
 {
     onClick:单击,
     onDblClick:双击
 }
 * @constructor
 */
function LPLayoutMgr(id,setting)
{
	this.id 			= id;
	this.setting		= setting;
	this.fgpCnt	 		= 0;
	this.alreadyLoad 	= false;
	this.ocxList 		= {};
}

LPLayoutMgr.prototype.init = function()
{
	if(this.lpStruct == null)return;
	var parent = $("#" + this.id);
	for(var index in this.lpStruct)
	{
		var btyObj = this.lpStruct[index];
		this.createBtyArea(btyObj,btyObj.bty==2?3:6);
	}
}

LPLayoutMgr.prototype.createBtyArea = function(btyObj,lineCnt)
{
	var parent = $("#" + this.id);
	var btyPanel = WebUI.createDiv(btyObj.bty+"_panel","bty_panel");
	parent.append(btyPanel);
	
	var btyTitle = WebUI.createDiv(btyObj.bty+"_title","bty_title",btyObj.btyText);
	btyPanel.append(btyTitle);
	
	var table  = $("<table cellspacing=\"0\" cellpadding=\"0\" class=\"bty_table\"></table>");
	btyPanel.append(table);
	var fgpList = btyObj.vidList[0].fgpList;
	var tr;
	var lineCnt = lineCnt||6;
	
	for(var i=0 ;i<fgpList.length;i++)
	{
		if(i % lineCnt == 0)
		{
			tr = $("<tr></tr>");
			table.append(tr);
		}
		var fgpObj = fgpList[i];
		var cids = fgpObj.cids;
		for(var j=0;j< cids.length;j++)
		{
			var td = $("<td></td>");
			tr.append(td);
			var cidObj = cids[j];
			var imgOcx = new ImageOcxObj(td,btyObj,fgpObj,cidObj,this);
			imgOcx.setCidVisible(j > 0);
			var id = imgOcx.getId();
			this.ocxList[id] = imgOcx;
			this.fgpCnt++;
			if(i == 0 && j == 0)
			{
				this.active(id);
			}
		}
	}
	//补TD
	var n = lineCnt - this.fgpCnt % lineCnt;
	if(n != lineCnt)
	{
		for(var i=0;i<n;i++)
		{
			var td = $("<td></td>");
			tr.append(td);
		}
	}
	
}

LPLayoutMgr.prototype.updateOcxStatus = function(id)
{
	if(WebUtil.isEmpty(this.ocxList))return;
	this.currentOcx = null;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(ocxObj.getId() == id)
		{
			ocxObj.active();
			this.currentOcx = ocxObj;
		}
		else
		{
			ocxObj.deActive();
		}
	}
}

LPLayoutMgr.prototype.active = function(id)
{
	this.updateOcxStatus(id);
	this.notifyClick();
}

LPLayoutMgr.prototype.notifyClick = function()
{
	if(this.currentOcx != null)
	{
		if(!WebUtil.isNull(this.setting))
		{
			if(WebUtil.isFunction(this.setting.onClick))
			{
				var bty = this.currentOcx.getBty();
				var vid = 0;
				var fgp = this.currentOcx.getSeq();
				var cid = this.currentOcx.getCid();
				var gid	= this.currentOcx.getGid();
				this.setting.onClick(bty,vid,fgp,cid,gid);
			}
		}
	}
}

LPLayoutMgr.prototype.dblClick = function(ocxId)
{
	if(this.currentOcx != null)
	{
		if(!WebUtil.isNull(this.setting))
		{
			if(WebUtil.isFunction(this.setting.onDblClick))
			{
				var bty = this.currentOcx.getBty();
				var vid = 0;
				var fgp = this.currentOcx.getSeq();
				var cid = this.currentOcx.getCid();
				var gid	= this.currentOcx.getGid();
				var img = this.currentOcx.getImg();
				var mnt = this.currentOcx.getMnt();
				this.setting.onDblClick(bty,vid,fgp,cid,gid,img,mnt);
			}
		}
	}
}

LPLayoutMgr.prototype.getCurrentOcx = function()
{
	return this.currentOcx;
}

LPLayoutMgr.prototype.select = function(bty,fgp,cid,imgType, gid)
{
	if(WebUtil.isEmpty(this.ocxList))return;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(ocxObj.getBty() == bty && ocxObj.getSeq() == fgp && ocxObj.getCid() == cid)
		{
			this.updateOcxStatus(ocxObj.getId());
		}
	}
}
//改变 平铺的所有控件的 特征组（gid）
LPLayoutMgr.prototype.changeAllGid = function(gid)
{
	if(WebUtil.isEmpty(this.ocxList))return;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(!WebUtil.isNull(gid)&&ocxObj.gid!==gid){	
			ocxObj.gid = gid; 
			ocxObj.loadData(null, gid);
		}
	}
}

LPLayoutMgr.prototype.getImgOcx = function(bty,fgp,cid)
{
	if(WebUtil.isEmpty(this.ocxList))return null;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(ocxObj.getBty() == bty && ocxObj.getSeq() == fgp && ocxObj.getCid() == cid)
		{
			return ocxObj;
		}
	}
	return null;
}

LPLayoutMgr.prototype.load = function(lpStruct,imgType,gid)
{
	this.lpStruct	= lpStruct;
	this.imgType	= imgType;
	this.gid		= gid;
	this.init();
	if(this.ocxList != null && !this.alreadyLoad)
	{
		this.alreadyLoad = true;
		for(var key in this.ocxList)
		{
			var ocxObj = this.ocxList[key];
			ocxObj.loadData(this.imgType,this.gid);
		}
	}
}

LPLayoutMgr.prototype.isLoad = function()
{
	return this.alreadyLoad;
}


function ImageOcxObj(parent,btyObj,fgpObj,cidObj,layoutMgr)
{
	this.parent 	= parent;
	this.btyObj 	= btyObj;
	this.fgpObj 	= fgpObj;
	this.cidObj	 	= cidObj
	this.layoutMgr	= layoutMgr;
	this.cardId 	= fgpObj.cardId;
	this.bty 		= btyObj.bty;
	this.seq		= fgpObj.fgp;
	this.cid		= cidObj.cid;
	this.gid		= null;
	this.img		= null;
	this.mnt		= null;
	this.showCidLab	= true;
	this.init();
}

ImageOcxObj.prototype.loadData = function(imgType, gid)
{
	if(this.cardId == null)return;
	this.gid 	= gid;
	var obj 	= {};
	obj.cardId 	= this.cardId;
	obj.bty 	= this.bty;
	obj.cid 	= this.cid;
	obj.gid		= this.gid;
	obj.imgType = imgType;
	var jsonData = $.toJSON(obj);
	var url = WebVar.VarPath +"/lp/data/";
	var nThis = this;
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jsonData,
		dataType : 'json',
//		async: false,
		success : function(resInfo)
		{
            if (resInfo.status === WebCode.WebResultStatus.ok)
            {
                var data=resInfo.data
                if(data != null)
                {
                    nThis.img = "";
                    nThis.mnt = "";

                    var imgLob = data.img;
                    var mntLob = data.mnt;
                    if(imgLob != null && !WebUtil.isEmpty(imgLob.item))
                    {
                        nThis.img = imgLob.item.data;
                    }
                    if(mntLob != null && !WebUtil.isEmpty(mntLob.item))
                    {
                        nThis.mnt = mntLob.item.data;
                    }
                    var imgOcx = document.getElementById(nThis.ocxId);
                    imgOcx.HS_OCX_SetImageMnt(nThis.img, "", nThis.mnt, "");
                    nThis.wait.hide();
                    nThis.ocx.show();
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

ImageOcxObj.prototype.init = function()
{
	var id = this.cardId +"_"+ this.bty +"_"+ this.seq +"_"+ this.cid;
	var ocxCss = null;
	switch(this.bty)
	{
		case ABISCode.Bty.BTY_FINGER:	ocxCss = "ocx_finger";	break;
		case ABISCode.Bty.BTY_PALM:		ocxCss = "ocx_palm";	break;
		case ABISCode.Bty.BTY_FACE:		ocxCss = "ocx_face";	break;
//		case ABISCode.Bty.BTY_SHOES:	ocxCss = "ocx_shoes";	break;
	}
	this.ocxPanel = WebUI.createDiv(id + "_panel", "ocx_panel " + ocxCss);
	
	//控件
	this.ocxId = id + "_ocx";
	this.ocx = $("<object></object>");
	this.ocx.attr("id",this.ocxId);
	this.ocx.attr("classid","CLSID:5C735782-D62B-4028-9648-ACD8EA8EAD6B");
	this.ocx.attr("width","100%");
	this.ocx.attr("height","100%");
	this.ocxPanel.append(this.ocx);
	
	//等待图标
	var wait_panel  = WebUI.createDiv(id+"_wait_panel","wait_panel");
	this.wait		= WebUI.createDiv(id+"_wait","wait");
	var icon 		= $("<img></img>");
	icon.attr("src",WebVar.VarPath+"/image/ui/common/wait_gray.gif");
	this.wait.append(icon);
	wait_panel.append(this.wait);
	this.ocxPanel.append(wait_panel);
	
	//文本信息
	this.txt_panel = WebUI.createDiv(id+"_txtpanel","txtpanel");
	
	//卡号
	var cardNum = $("<a target=\"_blank\"></a>");
	cardNum.html(this.fgpObj.cardNum);
	var url = WebVar.VarPath+"/lp/detail/"+this.cardId+"/"+this.cid;
	cardNum.attr("href",url);
	this.txt_panel.append(cardNum);
	
	//序号和份数索引
	this.secondLine = WebUI.createDiv();
	this.seqLab = WebUI.createSpan("","seq_lab",AbisMessageResource['SerialNo']+":");
	this.seqTxt = WebUI.createSpan("","seq_text",this.fgpObj.text);
	this.cidTxt = WebUI.createSpan("","cid_text",this.cidObj.text);
	this.secondLine.append(this.seqLab);
	this.secondLine.append(this.seqTxt);
	this.secondLine.append(this.cidTxt);
	this.txt_panel.append(this.secondLine);
	
	this.parent.append(this.ocxPanel);
	this.parent.append(this.txt_panel);
	
	//调整等待图标位置
	var x,y;
	switch(this.bty)
	{
		case ABISCode.Bty.BTY_FINGER:
			x = 85;
			y = 85;
			break;
		case ABISCode.Bty.BTY_PALM:
			x = 184;
			y = 184;
			break;
		case ABISCode.Bty.BTY_FACE:
			x = 34;
			y = 59;
			break;
	}
	this.wait.css("marginLeft",x+"px");
	this.wait.css("marginTop", y+"px");
	this.ocx.hide();
	this.wait.show();
	
	var imgOcx = document.getElementById(this.ocxId);
	imgOcx.HS_OCX_SetBackColor(WebVar.ImgOcxBg);
	imgOcx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_WHEEL,OCX.MouseMode.MOUSE_MODE_NONE);
	imgOcx.HS_OCX_SetMouseButtonMode(OCX.MouseButton.BUTTON_LEFT,OCX.MouseMode.MOUSE_MODE_NONE);
	imgOcx.HS_OCX_SetID(id);
	var nThis = this;
	imgOcx.attachEvent('HS_OCX_NotifyMsgInfoEvent', ocxEvent);
	function ocxEvent(id, eventId, x, y, option, desc)
	{
		switch(eventId)
		{
			case OCX.OcxMouseMessage.OCX_WM_LBUTTONDOWN:
				nThis.layoutMgr.active(id);
				break;
			case OCX.OcxMouseMessage.OCX_WM_LBUTTONDBLCLK:
				nThis.layoutMgr.dblClick(id);
				break;
		}
	}
}

ImageOcxObj.prototype.setCidVisible = function(visible)
{
	this.showCidLab = visible;
	if(this.showCidLab == true)
	{
		this.cidTxt.show();
	}
	else
	{
		this.cidTxt.hide();
	}
}

ImageOcxObj.prototype.active = function()
{
	this.ocxPanel.addClass("ocx_panel_select");
}

ImageOcxObj.prototype.deActive = function()
{
	this.ocxPanel.removeClass("ocx_panel_select");
}

ImageOcxObj.prototype.getId = function()
{
	var imgOcx = document.getElementById(this.ocxId);
	var id = imgOcx.HS_OCX_GetID();
	return id;
}

ImageOcxObj.prototype.getCardId = function()
{
	return this.cardId;
}

ImageOcxObj.prototype.getBty = function()
{
	return this.bty;
}

ImageOcxObj.prototype.getSeq = function()
{
	return this.seq;
}

ImageOcxObj.prototype.getCid = function()
{
	return this.cid;
}

ImageOcxObj.prototype.getGid = function()
{
	return this.gid;
}

ImageOcxObj.prototype.getImg = function()
{
	return this.img;
}

ImageOcxObj.prototype.getMnt = function()
{
	return this.mnt;
}
