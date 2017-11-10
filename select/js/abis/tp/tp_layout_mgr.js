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

function TPLayoutMgr(id,cardId,setting)
{
	this.id 			= id;
	this.cardId			= cardId;
	this.setting 		= setting;
	this.ocxList 		= {};
	this.panels  		= new Array();
	this.alreadyLoad 	= false;
	this.init();
}

TPLayoutMgr.prototype.getCardId = function()
{
	return this.cardId;
}

TPLayoutMgr.prototype.isLoad = function()
{
	return this.alreadyLoad;
}

TPLayoutMgr.prototype.load = function(tpStruct,imgType,gid)
{
	this.tpStruct		= tpStruct;
	this.imgType		= imgType;
	this.gid			= gid;
	if(!WebUtil.isEmpty(this.tpStruct) && !this.alreadyLoad)
	{
		this.alreadyLoad = true;
		var btyObj;
		var vidObj;
		var fgpObj;
		var select = false;//只加载一次 选择一个图片就好  优先级 指纹->掌纹->人像
		for(var i=0;i<this.tpStruct.length;i++)
		{
			btyObj = this.tpStruct[i];
			if(!WebUtil.isEmpty(btyObj.vidList))
			{
				for(var j=0;j<btyObj.vidList.length;j++)
				{
					vidObj = btyObj.vidList[j];
					if(!WebUtil.isEmpty(vidObj.fgpList))
					{
						for(var k=0;k<vidObj.fgpList.length;k++)
						{
							fgpObj = vidObj.fgpList[k];
							if(WebUtil.isEmpty(fgpObj.cids))
							{
								//该指位没有数据
								continue;
							}
							var cid = fgpObj.cids[0].cid;
							var bty = btyObj.bty;
							var vid = vidObj.vid;
							var fgp = fgpObj.fgp;
							
							var id = bty + "_" + vid + "_" + fgp;
							var ocxObj = this.ocxList[id];
							if(ocxObj != null)
							{
								ocxObj.loadData(cid,this.imgType,this.gid);
							}
							if(!select&&k == 0)
							{
								select=true;
								this.active(id);
							}
						}
					}
				}
			}
		}
	}
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(ocxObj.isLoad())continue;
		ocxObj.showNotFpt();
	}
	
	//折叠没有数据的项
//	for(var i=0;i<this.panels.length;i++)
//	{
//		var obj = this.panels[i];
//		var btyPanel = obj.btyPanel;
//		var ids = obj.ids;
//		var notLoad = true;
//		for(var j;j<ids.length;j++)
//		{
//			var ocxObj = this.ocxList[ids[j]];
//			if(ocxObj.isLoad())
//			{
//				notLoad = false;
//				break;
//			}
//		}
//		if(notLoad)
//		{
//			btyPanel.hide();
//			btyPanel.attr("isShow",false);
//		}
//		else
//		{
//			btyPanel.attr("isShow",true);
//		}
//	}
}

TPLayoutMgr.prototype.init = function()
{
	var parent = $("#" + this.id);
	this.obj = 
	[
	 	{
	  		bty:ABISCode.Bty.BTY_FACE,btyText:AbisMessageResource["Photo"],
	   		vids:
	   		[
	   			{
			   		vid:ABISCode.FaceVid.LEFT_SIDE,	vidText:AbisMessageResource.PhotoPosition["LeftPortrait"],
				   	fgpList:
				   	[
				   		{fgp:0,fgpText:"0"}
				   	]
		   		},
		   		{
			   		vid:ABISCode.FaceVid.FRONT,vidText:AbisMessageResource.PhotoPosition["FrontPortrait"],
				   	fgpList:
				   	[
				   		{fgp:0,fgpText:"0"}
				   	]
		   		},
		   		{
			   		vid:ABISCode.FaceVid.RIGHT_SIDE,vidText:AbisMessageResource.PhotoPosition["RightPortrait"],
				   	fgpList:
				   	[
				   		{fgp:0,fgpText:"0"}
				   	]
		   		}
			]
		},
		{
			bty:ABISCode.Bty.BTY_FINGER,btyText:AbisMessageResource["RollFinger"],
	   		vids:
	   		[
		   		{
			   		vid:ABISCode.FingerVid.ROLL,vidText:AbisMessageResource["Roll"],
				   	fgpList:
				   	[
				   		{fgp:ABISCode.FingerPos.RTHUMB,		fgpText:AbisMessageResource.FingerPosition["RightThumb"]},
			   			{fgp:ABISCode.FingerPos.RINDEX,		fgpText:AbisMessageResource.FingerPosition["RightIndex"]},
			   			{fgp:ABISCode.FingerPos.RMIDDLE,	fgpText:AbisMessageResource.FingerPosition["RightMiddle"]},
			   			{fgp:ABISCode.FingerPos.RRING,		fgpText:AbisMessageResource.FingerPosition["RightRing"]},
			   			{fgp:ABISCode.FingerPos.RLITTLE,	fgpText:AbisMessageResource.FingerPosition["RightLittle"]},
			   			{fgp:ABISCode.FingerPos.LTHUMB,		fgpText:AbisMessageResource.FingerPosition["LeftThumb"]},
			   			{fgp:ABISCode.FingerPos.LINDEX,		fgpText:AbisMessageResource.FingerPosition["LeftIndex"]},
			   			{fgp:ABISCode.FingerPos.LMIDDLE,	fgpText:AbisMessageResource.FingerPosition["LeftMiddle"]},
			   			{fgp:ABISCode.FingerPos.LRING,		fgpText:AbisMessageResource.FingerPosition["LeftRing"]},
			   			{fgp:ABISCode.FingerPos.LLITTLE,	fgpText:AbisMessageResource.FingerPosition["LeftLittle"]}
				   	]
		   		}
			]
		},
		{
			bty:ABISCode.Bty.BTY_FINGER,btyText:AbisMessageResource["FlatFinger"],
	   		vids:
	   		[
		   		{
			   		vid:ABISCode.FingerVid.FLAT,vidText:AbisMessageResource["Flat"],
				   	fgpList:
				   	[
				   		{fgp:ABISCode.FingerPos.RTHUMB,		fgpText:AbisMessageResource.FingerPosition["RightThumb"]},
			   			{fgp:ABISCode.FingerPos.RINDEX,		fgpText:AbisMessageResource.FingerPosition["RightIndex"]},
			   			{fgp:ABISCode.FingerPos.RMIDDLE,	fgpText:AbisMessageResource.FingerPosition["RightMiddle"]},
			   			{fgp:ABISCode.FingerPos.RRING,		fgpText:AbisMessageResource.FingerPosition["RightRing"]},
			   			{fgp:ABISCode.FingerPos.RLITTLE,	fgpText:AbisMessageResource.FingerPosition["RightLittle"]},
			   			{fgp:ABISCode.FingerPos.LTHUMB,		fgpText:AbisMessageResource.FingerPosition["LeftThumb"]},
			   			{fgp:ABISCode.FingerPos.LINDEX,		fgpText:AbisMessageResource.FingerPosition["LeftIndex"]},
			   			{fgp:ABISCode.FingerPos.LMIDDLE,	fgpText:AbisMessageResource.FingerPosition["LeftMiddle"]},
			   			{fgp:ABISCode.FingerPos.LRING,		fgpText:AbisMessageResource.FingerPosition["LeftRing"]},
			   			{fgp:ABISCode.FingerPos.LLITTLE,	fgpText:AbisMessageResource.FingerPosition["LeftLittle"]}
				   	]
		   		}
			]
		},
		{
			bty:ABISCode.Bty.BTY_PALM,btyText:AbisMessageResource.FingerPosition["FourFingers"],
	   		vids:
	   		[
		   		{
			   		vid:0,
				   	vidText:"",
				   	fgpList:
				   	[
				   		{fgp:ABISCode.PalmPos.L_FOUR,	fgpText:AbisMessageResource.FingerPosition["LeftFourFingers"]},
				   		{fgp:ABISCode.PalmPos.RL_THUMB,	fgpText:AbisMessageResource.FingerPosition["TwoThumbs"]},
				   		{fgp:ABISCode.PalmPos.R_FOUR,	fgpText:AbisMessageResource.FingerPosition["RightFourFingers"]}
				   		
				   	]
		   		}
			]
		},
		{
			bty:ABISCode.Bty.BTY_PALM,btyText:AbisMessageResource["Palm"],
	   		vids:
	   		[
		   		{
			   		vid:0,vidText:"",
				   	fgpList:
				   	[
				   		{fgp:ABISCode.PalmPos.L_PALM,fgpText:AbisMessageResource.FingerPosition["LeftPalm"]},
				   		{fgp:ABISCode.PalmPos.R_PALM,fgpText:AbisMessageResource.FingerPosition["RightPalm"]}
				   	]
		   		}
			]
		},
		{
			bty:ABISCode.Bty.BTY_PALM,btyText:AbisMessageResource["PalmWriter"],
	   		vids:
	   		[
		   		{
			   		vid:0,vidText:"",
				   	fgpList:
				   	[//掌侧
				   		{fgp:ABISCode.PalmPos.L_WRITER,fgpText:AbisMessageResource.FingerPosition["LeftPalmWriter"]},
				   		{fgp:ABISCode.PalmPos.R_WRITER,fgpText:AbisMessageResource.FingerPosition["RightPalmWriter"]}
				   	]
		   		}
			]
		},
        {
            bty:ABISCode.Bty.BTY_SHOES,btyText:AbisMessageResource.Foot["FootPrint"],
            vids:
                [
                    {
                        vid:0,vidText:"",
                        fgpList:
                            [
                                {fgp:ABISCode.ShoesPos.LEFT_SHOE,fgpText:AbisMessageResource.Foot["LeftFoot"]},
                                {fgp:ABISCode.ShoesPos.RIGHT_SHOE,fgpText:AbisMessageResource.Foot["RightFoot"]}
                            ]
                    }
                ]
        }
	];
	this.create(this.obj);
}

TPLayoutMgr.prototype.create = function(obj)
{
	var nThis = this;
	var parent = $("#" + this.id);
	
	for(var q=0;q<obj.length;q++)
	{
		var btyPanel = WebUI.createDiv("","bty_panel");
		parent.append(btyPanel);
		var btyObject 	= obj[q];
		var bty 		= btyObject.bty;
		var btyTitle 	= WebUI.createDiv("","bty_title",btyObject.btyText);
		btyTitle.bind("selectstart", function(){return false;});
		btyTitle.click
		(
			function(e)
			{
				var id = $(this).attr("div_id");
				var isShowStr = $(this).parent().attr("isShow");
				var isShow = eval('('+ isShowStr + ')');
				if(!isShow)
				{
					$("#"+id).slideDown(150);
					$(this).parent().attr("isShow",true);
				}
				else
				{
					$("#"+id).slideUp(150);
					$(this).parent().attr("isShow",false);
				}
				
			}
		);
		btyPanel.append(btyTitle);
		var bty_div_id = "bty_div_"+q;
		btyTitle.attr("div_id",bty_div_id);
		var bty_div = WebUI.createDiv(bty_div_id,"bty_div");
		var table  = $("<table cellspacing=\"0\" cellpadding=\"0\" class=\"bty_table\"></table>");
		bty_div.append(table);
		btyPanel.append(bty_div);
		
		var tr = null;
		var ids = new Array();
		for(var i=0;i< btyObject.vids.length;i++)
		{
			var vidObject = btyObject.vids[i];
			var imgOcx = null;
			var id = null;
			if(bty == ABISCode.Bty.BTY_FACE)
			{
				if(tr == null)
				{
					tr = $("<tr></tr>");
					table.append(tr);
				}
				var td = $("<td></td>");
				tr.append(td);
				imgOcx = new ImageOcxObj(td,bty,vidObject.vid,ABISCode.FacePos.NORMAL,vidObject.vidText,this);
				id = bty + "_" + vidObject.vid + "_" + ABISCode.FacePos.NORMAL;
				ids.push(id);
				this.ocxList[id] = imgOcx;
				
			}
			else
			{
				var fgpList = vidObject.fgpList;
				var lineNums = 5;//每一行显示图片
				if(bty === ABISCode.Bty.BTY_CARDIMAGE){
                    lineNums=2
                }
				for(var j=0;j<fgpList.length;j++)
				{
					if(j % lineNums == 0 )
					{
						tr = $("<tr></tr>");
						table.append(tr);
					}
					var td = $("<td valign=\"bottom\"></td>");
					tr.append(td);
					var fgpObject = fgpList[j];
					imgOcx = new ImageOcxObj(td,bty,vidObject.vid,fgpObject.fgp,fgpObject.fgpText,this);
					id = bty + "_" + vidObject.vid + "_" + fgpObject.fgp;
					ids.push(id);
					this.ocxList[id] = imgOcx;
				}
			}
			
		}
		this.panels.push(
				{
					"btyPanel":btyPanel,
					"ids":ids
				}
		);
	}
}
//根据实际 生物特征信息，调整平铺页面
TPLayoutMgr.prototype.reset = function(obj){


}
TPLayoutMgr.prototype.updateOcxStatus = function(id)
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

TPLayoutMgr.prototype.active = function(id)
{
	this.updateOcxStatus(id);
	this.notifyClick();
}

TPLayoutMgr.prototype.notifyClick = function()
{
	if(this.currentOcx != null)
	{
		if(!WebUtil.isNull(this.setting))
		{
			if(WebUtil.isFunction(this.setting.onClick))
			{
				var bty = this.currentOcx.getBty();
				var vid = this.currentOcx.getVid();
				var fgp = this.currentOcx.getFgp();
				var cid = this.currentOcx.getCid();
				var gid	= this.currentOcx.getGid();
				this.setting.onClick(bty,vid,fgp,cid,gid);
			}
		}
	}
}

TPLayoutMgr.prototype.dblClick = function(ocxId)
{
	if(this.currentOcx != null)
	{
		if(!WebUtil.isNull(this.setting))
		{
			if(WebUtil.isFunction(this.setting.onDblClick))
			{
				var bty = this.currentOcx.getBty();
				var vid = this.currentOcx.getVid();
				var fgp = this.currentOcx.getFgp();
				var cid = this.currentOcx.getCid();
				var gid	= this.currentOcx.getGid();
				var img = this.currentOcx.getImg();
				var mnt = this.currentOcx.getMnt();
				this.setting.onDblClick(bty,vid,fgp,cid,gid,img,mnt);
			}
		}
	}
}

TPLayoutMgr.prototype.getCurrentOcx = function()
{
	return this.currentOcx;
}


TPLayoutMgr.prototype.select = function(bty,vid,fgp,cid,imgType, gid)
{
	if(WebUtil.isEmpty(this.ocxList))return;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(ocxObj.getBty() == bty && ocxObj.getVid() == vid && ocxObj.getFgp() == fgp)
		{
			this.updateOcxStatus(ocxObj.getId());
			if(!WebUtil.isNull(cid)&&ocxObj.cid!==cid){	
				ocxObj.cid = cid; 
				ocxObj.loadData(cid,imgType, gid);
			}
			if(!WebUtil.isNull(gid)&&ocxObj.gid!==gid){	
				ocxObj.gid = gid; 
				ocxObj.loadData(cid,imgType, gid);
			}
		}
	}
}
//改变 平铺的所有控件的 特征组（gid）
TPLayoutMgr.prototype.changeAllGid = function(gid)
{
	if(WebUtil.isEmpty(this.ocxList))return;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(!WebUtil.isNull(gid)&&ocxObj.gid!==gid){	
			ocxObj.gid = gid; 
			ocxObj.loadData(null,null, gid);
		}
	}
}

TPLayoutMgr.prototype.getImgOcx = function(bty,vid,fgp)
{
	if(WebUtil.isEmpty(this.ocxList))return null;
	for(var key in this.ocxList)
	{
		var ocxObj = this.ocxList[key];
		if(ocxObj.getBty() == bty && ocxObj.getVid() == vid && ocxObj.getFgp() == fgp)
		{
			return ocxObj;
		}
	}
	return null;
}
/**
 * oxc控件封装
 * 
 * 简化，控件初始化，数据加载，等操作
 */
function ImageOcxObj(parent,bty,vid,fgp,fgpText,layoutMgr)
{
	this.parent 	= parent;
	this.bty 		= bty;
	this.vid		= vid;
	this.fgp		= fgp;
	this.cid 		= null;
	this.gid		= null;
	this.img		= "";
	this.mnt		= "";
	this.fgpText	= fgpText;
	this.layoutMgr 	= layoutMgr;
	this.load		= false;
	this.init();
}
/*
 * cid第几份 imgType图像类型  gid 特征组
 */
ImageOcxObj.prototype.loadData = function(cid, imgType, gid)
{
	var cardId = this.layoutMgr.getCardId();
	if(cardId == null)return;
	this.load	= true;
	this.cid	= cid||this.cid;
	this.gid 	= gid||this.gid;
	this.imgType  = imgType || this.imgType;
	var obj 	= {};
	obj.bty 	= this.bty;
	obj.vid 	= this.vid;
	obj.fgp 	= this.fgp;
	obj.cid 	= this.cid;
	obj.gid		= this.gid;
	obj.imgType = this.imgType;
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
				var imgOcx = document.getElementById(nThis.ocxId);
				if(nThis.mnt==null){
					nThis.mnt="";
				}
				imgOcx.HS_OCX_SetImageMnt(nThis.img, "", nThis.mnt, "");
				nThis.showOcx();
			}
		},   
		error : function(e) 
		{   
			
		}   
	});
}

ImageOcxObj.prototype.init = function()
{
	var id = this.bty +"_"+ this.vid +"_"+ this.fgp;
	var ocxCss = null;
	switch(this.bty)
	{
		case ABISCode.Bty.BTY_FINGER:	
			ocxCss = "ocx_finger";	
			break;
		case ABISCode.Bty.BTY_PALM:
			switch(this.fgp)
			{
				case ABISCode.PalmPos.L_FOUR:
				case ABISCode.PalmPos.R_FOUR:
					ocxCss = "ocx_palm_four";
					break;
				case ABISCode.PalmPos.RL_THUMB:
					ocxCss = "ocx_palm_rl_thurm";
					break;
				case ABISCode.PalmPos.L_PALM:
				case ABISCode.PalmPos.R_PALM:
				case ABISCode.PalmPos.L_WRITER:
				case ABISCode.PalmPos.R_WRITER:
					ocxCss = "ocx_palm";	
					break;
			}
			break;
		case ABISCode.Bty.BTY_FACE:		
			ocxCss = "ocx_face";	
			break;
		case ABISCode.Bty.BTY_SHOES:
        case ABISCode.Bty.BTY_CARDIMAGE:
			ocxCss = "ocx_shoes";	
			break;
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
	this.ocxPanel.append(wait_panel);
	
	this.wait		= WebUI.createDiv(id+"_wait","wait");
	var icon 		= $("<img></img>");
	icon.attr("src",WebVar.VarPath+"/image/ui/common/wait_gray.gif");
	this.wait.append(icon);
	wait_panel.append(this.wait);
	
	//缺指图标
	this.notFgp		= WebUI.createDiv(id+"_notFpt","notFpt");
	var h1			= $("<h1 class=\"txt\">" + AbisMessageResource["Nothing"] + "</h1>");
	this.notFgp.append(h1);
	wait_panel.append(this.notFgp);
	
	//文本信息
	this.txtpanel 	= WebUI.createDiv(id+"_txtpanel","txtpanel");
	this.fgpTxtDiv = WebUI.createDiv("","fgp_txt");
	this.fgpTxtDiv.html(this.fgpText);
	this.txtpanel.append(this.fgpTxtDiv);
	
	this.parent.append(this.ocxPanel);
	this.parent.append(this.txtpanel);
	
	this.showWait();
	
	var imgOcx = document.getElementById(this.ocxId);
	imgOcx.HS_OCX_SetBackColor(0XFFFFFF);
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

ImageOcxObj.prototype.active = function()
{
	this.ocxPanel.addClass("ocx_panel_select");
	this.fgpTxtDiv.addClass("fgp_txt_select");
}

ImageOcxObj.prototype.deActive = function()
{
	this.ocxPanel.removeClass("ocx_panel_select");
	this.fgpTxtDiv.removeClass("fgp_txt_select");
}

ImageOcxObj.prototype.getId = function()
{
	var imgOcx = document.getElementById(this.ocxId);
	var id = imgOcx.HS_OCX_GetID();
	return id;
}

ImageOcxObj.prototype.showOcx = function()
{
	this.notFgp.hide();
	this.wait.hide();
	this.ocx.show();
}

ImageOcxObj.prototype.showWait = function()
{
	var _this = this;
	var ocxW 	= this.ocx.width();
	var ocxH 	= this.ocx.height();
	var y 		= (ocxH - 32) / 2;
	this.wait.css("marginTop", y+"px");
	this.notFgp.hide();
	this.ocx.hide();
	this.wait.show();
	setTimeout(function(){
		if(!_this.isLoad()){
			_this.showNotFpt();
		}
	},10000);
	
}

ImageOcxObj.prototype.showNotFpt = function()
{
	var ocxW 	= this.ocxPanel.width();
	var ocxH 	= this.ocxPanel.height();
	var nw 		= this.notFgp.width();
	var nh 		= this.notFgp.height();
	var x 		= (ocxW - nw) / 2;
	var y 		= (ocxH - nh) / 2;
	this.notFgp.css("marginLeft", x + "px");
	this.notFgp.css("marginTop", y + "px");
	this.notFgp.show();
	this.ocx.hide();
	this.wait.hide();
}

ImageOcxObj.prototype.getBty = function()
{
	return this.bty;
}

ImageOcxObj.prototype.getVid = function()
{
	return this.vid;
}

ImageOcxObj.prototype.getFgp = function()
{
	return this.fgp;
}

ImageOcxObj.prototype.getCid = function()
{
	return this.cid;
}

ImageOcxObj.prototype.getGid = function()
{
	return this.gid;
}

ImageOcxObj.prototype.getLobImg = function()
{
	return this.lobImg;
}

ImageOcxObj.prototype.getLobMnt = function()
{
	return this.lobMnt;
}

ImageOcxObj.prototype.getImg = function()
{
	return this.img;
}

ImageOcxObj.prototype.getMnt = function()
{
	return this.mnt;
}

ImageOcxObj.prototype.isLoad = function()
{
	return this.load;
}