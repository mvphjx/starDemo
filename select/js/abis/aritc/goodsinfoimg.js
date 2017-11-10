function GoodsInfoImage(id,giItemId,name)
{
	this.id 	= id;
	this.giItemId = giItemId;
	this.nameTxt=name;
	this.create();
}
GoodsInfoImage.prototype.loadData = function()
{
	var obj=document.getElementById("giItemphoto_" + this.id)
	if(!WebUtil.isNull(obj))
	{
		obj.src=WebVar.VarPath+"/artic/personinfo/img/"+this.giItemId;
		this.wait.hide();
		this.img.show();
	}
}
GoodsInfoImage.prototype.create = function()
{
	this.parent=$("#"+this.id);
	this.imgPanel = WebUI.createDiv(this.id + "_panel", "");	
	//电子物证图片	
	this.img = $("<img></img>");
	this.img.attr("id","giItemphoto_" + this.id);
	//this.img.attr("name","giItemname_" + this.id);
	this.img.attr("width","400");
	this.img.attr("height","300");
	this.imgPanel.append(this.img);
	
	//等待图标
	var wait_panel  = WebUI.createDiv(this.id+"_wait_panel","wait_panel");
	this.imgPanel.append(wait_panel);
	
	this.wait		= WebUI.createDiv(this.id+"_wait","wait");
	var icon 		= $("<img></img>");
	icon.attr("src",WebVar.VarPath+"/image/ui/common/wait_gray.gif");
	this.wait.append(icon);
	wait_panel.append(this.wait);
	
	//文本信息
	this.txtpanel 	= WebUI.createDiv(this.id+"_txtpanel","txtpanel");
	this.nameTxtDiv = WebUI.createDiv(this.id+"_name","name_txt");
	this.nameTxtDiv.html(this.nameTxt);
	this.txtpanel.append(this.nameTxtDiv);
	this.parent.append(this.imgPanel);
	this.parent.append(this.txtpanel);
	//alert($("#giItem1").html());
	this.showWait();
}

GoodsInfoImage.prototype.showWait = function()
{
	var ocxW 	= this.img.width();
	var ocxH 	= this.img.height();
	var y 		= (ocxH - 32) / 2;
	this.wait.css("marginTop", y+"px");	
	this.img.hide();
	this.wait.show();
}
