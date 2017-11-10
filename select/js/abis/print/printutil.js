var importdialog=null;
var exporttpdialog=null;
var exportlpdialog=null;
var exportcasedialog=null;
var tableitems=null;
var exporttype=null;
var exportContent=null;
var PrintUtil = 	
{   	
    openTPFile:function(id) 
		{
    	var p=WebVar.VarPath;
    	$.dialog({
    	    title: AbisMessageResource['SelectPrintTemplate'],
    	    id:'TP',
    	    content: "<form id='form' enctype='multipart/form-data' action='"+p+"/print/tp/"+id+"' method='post'><table class='printtable'><tr><td><div>" + AbisMessageResource['PrintTemplatePath'] +":<input id='tempfile'class='printText' type='file' name='tempfile'></div></td></tr></table></form>",	   
    	    okValue: AbisMessageResource['OK'],
    	    cancelValue:AbisMessageResource['Cancel'],	 
    	    ok: function () {printjob(id);},
    	   cancel: function () {        
            }
    	   });  	
		},		
	openLPFile:function(id)
		{
    	var p=WebVar.VarPath;
    	$.dialog({
    	    title: AbisMessageResource['SelectPrintTemplate'],
    	    id:'LP',
    	    content: "<form id='form' enctype='multipart/form-data' action='"+p+"/print/lp/"+id+"' method='post'><table class='printtable'><tr><td><div>" + AbisMessageResource['PrintTemplatePath'] +":<input id='tempfile'class='printText' type='file' name='tempfile'></div></td></tr><tr><td><div>"+AbisMessageResource['ConfigFilePath']+":<input id='bindfile'class='printText' type='file' name='bindfile'></div></td></tr></table></form>",	   
    	    okValue: AbisMessageResource['OK'],
    	    cancelValue:AbisMessageResource['Cancel'],	 
    	    ok: function () {printjob(id);},
    	   cancel: function () {        
            }
    	   }); 
		},		
	openCaseFile:function(id)
		{
		//兼容ocx插件
		var iframe  ='<iframe id="iframe2" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;width:478px; height:200px;z-index:-1; filter:alpha(opacity=0);"></iframe>'
    	var p=WebVar.VarPath;
    	$.dialog({
    	    title: AbisMessageResource['SelectPrintTemplate'],
    	    id:'CASE',
    	    content: "<form id='form' enctype='multipart/form-data' action='"+p+"/print/case/"+id+"' method='post'><table class='printtable'><tr><td><div>" + AbisMessageResource['PrintTemplatePath'] +":<input id='tempfile'class='printText' type='file' name='tempfile'></div></td></tr><tr><td><div>"+AbisMessageResource['ConfigFilePath']+":<input id='bindfile'class='printText' type='file' name='bindfile'></div></td></tr></table>"+iframe+"</form>",	   
    	    okValue: AbisMessageResource['OK'],
    	    cancelValue:AbisMessageResource['Cancel'],	 
    	    ok: function () {printjob(id);},
    	   cancel: function () {        
            }
    	   }); 
		},
	print:function(id)
	{
		window.open(WebVar.VarPath + "/print/tp/"+id,"_blank");
	}
}

function printjob(id)
{    
	var url = WebVar.VarPath +"/print/tp/"+id;
	$.post(url,null,
			function(data)
			{		
			});
}

