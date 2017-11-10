var importdialog=null;
var exporttpdialog=null;
var exportlpdialog=null;
var exportcasedialog=null;
var tableitems=null;
var exporttype=null;
var exportContent=null;
var YpfUtil = 	
{   	
    importYpf:function() 
		{
    	window.open('${pageContext.request.contextPath}/import/ypf/',"_blank","");    	
		},		
	TPexportYpf:function(items,language)
		{
		    tableitems=items;
			exportContent='tpcard';
			var cardnum=items[0]['CARD_NUM'];
			var cardid = new Array();
	    	    for(var i = 0; i < items.length; i++)
	    	    {
	    		   cardid[cardid.length] = items[i].ID;	    		   
	    	    }  
				if(cardid.length == 0)
				{
					alert(language.NoFindSelectItem);
					return;
				}				
				if(cardid.length > 5)
				{
					alert(language.SelectMoreThen5);
					return;
				}
		    var Param = 			   
				{
					title:language.ExportYPF,
					page:"/jsp/abis/export/ypfexportpage.jsp",	
					initData:{cardsum:cardid.length,cardnum:cardnum,exportContent:exportContent,language:language},
					call:{get:"getFileInfo",init:"init",set:"setData"},
					callBack:{ok:exportjob},	
					language:language
				};
		     if(exporttpdialog==null)
		    	 {		    	 
				 exporttpdialog = new WebWindow("exportDialog",Param);	
				 }
		     else
		    	 {		    	 
		    	 exporttpdialog.setData({cardsum:cardid.length,cardnum:cardnum});
		    	 exporttpdialog.open();
		    	 }
		},		
	LPexportYpf:function(items,language)
		{
			tableitems=items;
			exportContent='lpcard';
			var cardnum=items[0]['CARD_NUM'];
			var cardid = new Array();
	    	    for(var i = 0; i < items.length; i++)
	    	    {
	    		   cardid[cardid.length] = items[i].ID;	    		   
	    	    }  
				if(cardid.length == 0)
				{
					alert(language.NoFindSelectItem);
					return;
				}				
				if(cardid.length > 5)
				{
					alert(language.SelectMoreThen5);
					return;
				}
		    var Param = 			   
				{
					title:language.ExportYPF,
					page:"/jsp/abis/export/ypfexportpage.jsp",	
					initData:{cardsum:cardid.length,cardnum:cardnum,exportContent:exportContent,language:language},
					call:{get:"getFileInfo",init:"init",set:"setData"},
					callBack:{ok:exportjob},
					language:language
				};
		     if(exportlpdialog==null)
		    	 {		    	 
				 exportlpdialog = new WebWindow("exportDialog",Param);	
				 }
		     else
		    	 {		    	 
		    	 exportlpdialog.setData({cardsum:cardid.length,cardnum:cardnum});
		    	 exportlpdialog.open();
		    	 }
		},		
	CaseExportYpf:function(items,language)
		{
			tableitems=items;
			exportContent='lpcase';
			var cardnum=items[0]['CE_NUM'];
			var cardid = new Array();
	    	    for(var i = 0; i < items.length; i++)
	    	    {
	    		   cardid[cardid.length] = items[i].ID;	    		   
	    	    }  
				if(cardid.length == 0)
				{
					alert(language.NoFindSelectItem);
					return;
				}				
				if(cardid.length > 5)
				{
					alert(language.SelectMoreThen5);
					return;
				}
		    var Param = 			   
				{
					title:language.ExportYPF,
					page:"/jsp/abis/export/ypfexportpage.jsp",	
					initData:{cardsum:cardid.length,cardnum:cardnum,exportContent:exportContent,language:language},
					call:{get:"getFileInfo",init:"init",set:"setData"},
					callBack:{ok:exportjob},
					language:language
				};
		     if(exportcasedialog==null)
		    	 {		    	 
				 exportcasedialog = new WebWindow("exportDialog",Param);	
				 }
		     else
		    	 {		    	 
		    	 exportcasedialog.setData({cardsum:cardid.length,cardnum:cardnum});
		    	 exportcasedialog.open();
		    	 }
		}		
}
function exportjob(result)
{	     	     	       
			result=eval('('+result+')');					
			filename=result['filename'];
			tpcardparam=result['param']['tpparam'];			
			lpcardparam=result['param']['lpparam'];			
			exporttype=result['param']['exporttype'];			
			var cardid = new Array();
	    	    for(var i = 0; i < tableitems.length; i++)
	    	    {
	    		   cardid[cardid.length] = tableitems[i].ID;	    		   
	    	    }
	    	    if(exporttype=='0')
	    	    {
	    	          window.open(WebVar.VarPath + "/export/ypf/"+exportContent+"?item=" + cardid.join(",")+"&filename="+filename+"&param="+tpcardparam,"_blank");
	    	    }
	    	    else
	    	    {
	    	    	for(var i = 0; i < tableitems.length; i++)
			    	    {
			    		    var id = tableitems[i].ID;
			    		    alert(id);
			    		    window.open(WebVar.VarPath + "/export/ypf/"+exportContent+"?item="+id+"&filename="+tableitems[i]['CARD_NUM']+".YPF&param="+tpcardparam,"_blank");
			    		   
			    	    }
	    	    }
		
}
function importjob(result)
{	     
	    result=result.replace(/\\/g,'/'); 
	    result=eval('('+result+')');
		$.post(GLOBAL.NAMESPACE + "/ypf/ypfImportAction!importYpf.action",{filePathList:result['filepath'],tpdbid:result['tpdb'],lpdbid:result['lpdb'],querydbid:result['querydb']},
						function(data)
						{	
			                data=eval('('+data+')');
			                if(data['error']!="")
							{    
			                	alert(data['error']);
							}
			                else
			                {
			                	alert(AbisMessageResource['ImportYPFSuccess']);
			                }
						}
					);
		
}
