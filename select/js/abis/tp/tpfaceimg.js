function TPFaceImage(id,personid,name,shenfenid,birtdate,isTxtpanel)
{
	this.id 	= id;
	this.personId=personid;
	this.nameTxt=name;
	this.shenfenIdTxt=shenfenid;
	this.birtdateTxt=birtdate;
	this.isTxtpanel=isTxtpanel;
	this.create();
}
TPFaceImage.prototype.loadData = function()
{
	var obj=document.getElementById("facephoto_" + this.id + "_" + this.personId)
	obj.src=WebVar.VarPath+"/tp/tpface/img/"+this.personId;
	this.wait.hide();
	this.img.show();
}
TPFaceImage.prototype.create = function()
{
	this.parent=$("#"+this.id);
	this.imgPanel = WebUI.createDiv(this.id + "_panel", "");	
	//人像	
	this.img = $("<img></img>");
	this.img.attr("id","facephoto_" + this.id + "_" + this.personId);
	this.img.attr("name",this.id + "_" + this.personId);
	this.img.attr("width","150");
	this.img.attr("height","200");
	this.imgPanel.append(this.img);
	
	//等待图标
	var wait_panel  = WebUI.createDiv(this.id+"_wait_panel","wait_panel");
	this.imgPanel.append(wait_panel);
	
	this.wait		= WebUI.createDiv(this.id+"_wait","wait");
	var icon 		= $("<img></img>");
	icon.attr("src",WebVar.VarPath+"/image/ui/common/wait_gray.gif");
	this.wait.append(icon);
	wait_panel.append(this.wait);
	
	//失败图标
	//this.notFace		= WebUI.createDiv(this.id+"_notFace","notFace");
	//var h1			= $("<h1 class=\"txt\">人像解析失败</h1>");
	//this.notFace.append(h1);
	//wait_panel.append(this.notFace);
	
	this.nameTxtDiv = WebUI.createDiv(this.id+"_name","name_txt");
	this.shenfenidTxtDiv = WebUI.createDiv(this.id+"_shefenid","shenfen_txt");
	this.nameTxtDiv.html(this.nameTxt+"  "+this.birtdateTxt);
	this.shenfenidTxtDiv.html("<a href='javascript:gotoTPCardInfo("+this.personId+")'>"+this.shenfenIdTxt+"</a>");
	//文本信息
	if(WebUtil.isEmpty(this.isTxtpanel))
	{//是否显示文本信息
		this.txtpanel 	= WebUI.createDiv(this.id+"_txtpanel","txtpanel");
        this.txtpanel.append(this.nameTxtDiv);
        this.txtpanel.append(this.shenfenidTxtDiv);
	}
	this.parent.append(this.imgPanel);
	this.parent.append(this.txtpanel);
	
	this.showWait();
	
}
function gotoTPCardInfo(id)
{
	window.open(WebVar.VarPath+'/tp/detail/'+id,"_blank");
}
TPFaceImage.prototype.showWait = function()
{
	var ocxW 	= this.img.width();
	var ocxH 	= this.img.height();
	var y 		= (ocxH - 32) / 2;
	this.wait.css("marginTop", y+"px");	
	this.img.hide();
	this.wait.show();
}
