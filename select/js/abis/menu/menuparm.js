
function MenuParm()
{	
}

MenuParm.prototype.setMenuValue = function(data)
{
//	$("#jianId").val(data.nameId);
	$("#zhongId").val(data.name);
	$("#yinId").val(data.yname);
}

MenuParm.prototype.setPageValue = function(data)
{
//	if(data.linkMode == 1)
//	{
//		$("#isRadioId").attr("checked",false);
//	}
//	else
//	{
//		$("#isRadioId").attr("checked",true);
//	}
//	$("#menuParmLinkId").val(data.linkId);
	$("#zhongId").val(data.name);
	$("#yinId").val(data.yname);
	$("#yzhongId").html(data.oname);
	$("#yyinId").html(data.oyname);
}

MenuParm.prototype.getMenuData = function()
{
	var menuData = {};
//	menuData.jian = $("#jianId").val();
	menuData.zhong = $("#zhongId").val();
	menuData.yin = $("#yinId").val();
	return menuData;
}

MenuParm.prototype.getPageData = function()
{
	var pageData = {};
//	pageData.isPage = $("#isRadioId").attr("checked");
//	pageData.link = $("#menuParmLinkId").val();
	pageData.zhong = $("#zhongId").val();
	pageData.yin = $("#yinId").val();
	return pageData;
}

MenuParm.prototype.getObjData = function()
{
	var data = {};
//	data.jian = $("#jianId").val();
	data.zhong = $("#zhongId").val();
	data.yin = $("#yinId").val();
//	data.isPage = $("#isRadioId").attr("checked");
	data.link = $("#menuParmLinkId").val();
	return data;
}


