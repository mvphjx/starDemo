var DialogUtil =
{
	openSimpleErrorDialog:function()
	{
		$.dialog({
		    title: AbisMessageResource['Prompt'],
		    content: "<div style='padding:5px;height:25px;width:100px;'>" + AbisMessageResource['OperationFailed'] + "</div>",	   
		    okValue:  AbisMessageResource['OK'],		    	 
		    ok: function () {return true;}		 
		});
	},
	openSimpleDialog:function(info)
	{
		$.dialog({
			title:  AbisMessageResource['Prompt'],
		  	content: "<div style='padding:5px;padding-left:10px;height:30px;width:200px;'>"+info+"</div>",	   
		  	okValue: AbisMessageResource['OK'],		    	 
		  	ok: function () {return true;}		 
		});
	},
	openWHDialog:function(info,width,heigth)
	{
		$.dialog({
		  	title:  AbisMessageResource['Prompt'],
		  	content: "<div style='padding:5px;padding-left:10px;height:"+heigth+"px;width:"+width+"px;'>"+info+"</div>",	   
		  	okValue: AbisMessageResource['OK'],		    	 
		  	ok: function () {return true;}		 
		});
	},
	openCallBackDialog:function(invoke,text)
	{	
		$.dialog({
		    title:  AbisMessageResource['Prompt'],
		    content: "<div style='padding:5px;height:30px;width:200px;'>"+text+"</div>",	   
		    okValue: AbisMessageResource['OK'],
		    cancelValue: AbisMessageResource['Cancel'],	 
		    ok: function ()
		    {
		    	invoke();
		    },
		    cancel: function ()
		    { 
			   return true;
		    }
		});	
	},
	openDetailErrorDialog:function(info)
	{
		$.dialog({
			title:  AbisMessageResource['Prompt'],
		  	content: "<div style='width:460px;height:200px;'><div style='padding:5px;height:25px;width:450px;font-size:13px;font-weight:600'> " + AbisMessageResource.Alert["PleaseSelectDataItemToDelete"] + "</div><div style='padding:5px;width:450px;height:160px;overflow-y:auto;word-break:break-all;'>"+info+"</div></div>",	   
		  	okValue: AbisMessageResource['OK'],		  
		  	ok: function () {return true;}		 
		});
	},
	dialogAfterSaveOK:function(invoke1,invoke2)
	{	
		$.dialog({
		    title:  AbisMessageResource['Prompt'],
		    content: "<div style='padding:5px;height:40px;width:300px'>" + AbisMessageResource.Alert["SaveSuccessContinueInput"] + "</div>",	   
		    okValue: AbisMessageResource['Yes'],
		    cancelValue:AbisMessageResource['No'],	 
		    ok: function () {invoke1();},
		    cancel: function ()
		    { 
			   invoke2();
			   return true;
	        }
		});	
	},
	showError:function(msg,width,height)
	{		
		if(width==null||width==undefined) 
			width=460;
		if(height==null||height==undefined) 
			height=200;
		$.dialog({
			  title:  AbisMessageResource['Prompt'],
			  content: "<div style='width:"+width+"px;height:"+height+"px;'><div class='errordialog'></div><div class='dialogtext'>"+msg+"</div></div>",	   
			  okValue: AbisMessageResource['OK'],		  
			  ok: function () {return true;}		 
		  });
	},
	showComfirm:function(msg,invoke)
	{
		$.dialog({
			  title:  AbisMessageResource['Prompt'],
			  content: "<div style='width:400px;height:60px;'><div class='askdialog'></div><div class='dialogtext'>"+msg+"</div></div>",	   
			  okValue: AbisMessageResource['OK'],
			  cancelValue:AbisMessageResource['Cancel'],
			  ok: function () {invoke();},
			  cancel: function () {}
		  });
	},
	showMsg:function(msg,width,height)
	{
		if(width==null||width==undefined) 
			width=460;
		if(height==null||height==undefined) 
			height=200;
		$.dialog({
			  title:  AbisMessageResource['Prompt'],
			  content: "<div style='width:"+width+"px;height:"+height+"px;'><div class='warndialog'></div><div class='dialogtext'>"+msg+"</div></div>",	   
			  okValue: AbisMessageResource['OK'],
		  ok: function () {return true;}		 
	  });
	} 
}

