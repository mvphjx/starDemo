//var cgflist = new Array();
//var gflist = new Array();
//var jgflist = new Array();
//var cpflist = new Array();
//var pflist = new Array();
//var jpflist = new Array();
//var cplist = new Array();
//var plist = new Array();
//var jplist = new Array();
//var cflist = new Array();
//var flist = new Array();
//var jflist = new Array();
//
//var gflists = new Array();
//var pflists = new Array();
//var plists = new Array();
//var flists = new Array();
//
//function LiveScanCfg(id,data)
//{
//	
//}
//
//LiveScanCfg.prototype.crtcfglog = function()
//{
//	
//}
//
//LiveScanCfg.prototype.save = function()
//{
//	var cdatalist = new Array();
//	var jdatalist = new Array();
//	var cgflisdata = document.getElementById('cgflist');
//	var jgflisdata = document.getElementById('jgflist');
//	
//	var cpflisdata = document.getElementById('cpflist');
//	var jpflisdata = document.getElementById('jpflist');
//	var cplisdata = document.getElementById('cplist');
//	var jplisdata = document.getElementById('jplist');
//	var cflisdata = document.getElementById('cflist');
//	var jflisdata = document.getElementById('jflist');
//	for(var i = 0;i<cgflisdata.options.length;i++)
//	{
//		for(var k = 0;k<gflists.length;k++)
//		{
//			if(gflists[k].fgp == cgflisdata.options[i].value)
//			{
//				cdatalist.push(gflists[k]);
//			}
//		}
//	}
//	for(var i = 0;i<jgflisdata.options.length;i++)
//	{
//		for(var k = 0;k<gflists.length;k++)
//		{
//			if(gflists[k].fgp == jgflisdata.options[i].value)
//			{
//				jdatalist.push(gflists[k]);
//			}
//		}
//	}
//	var reData = {};
//	reData.clist = cdatalist;
//	reData.jlist = jdatalist;
//	var jData = $.toJSON(reData);
//	var url = WebVar.VarPath + "/sys/livescancfg/add";
//	jQuery.ajax( 
//    {
//		type : 'POST',
//		contentType : 'application/json',
//		url : url,
//		data : jData,
//		dataType : 'json',
//		success : function(data) 
//		{   
//			
//		},   
//		error : function(e) 
//		{   
//			alert("<s:message code="QueryError"></s:message>");
//		}   
//	});
//}
//
//
//
