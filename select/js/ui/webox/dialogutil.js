var DialogUtil =
{
	dialogLevel:function(level){
        var levelClass = "warndialog";
        if(level==1){
            levelClass = "errordialog";
        }else if(level==2){
            levelClass = "warndialog";
        }else if(level==3){
            levelClass = "askdialog";
        }else if(level==0){
            levelClass = "okdialog";
        }
        return levelClass;
	},
	openSimpleErrorDialog:function()
	{
		$.dialog({
		    title: AbisMessageResource['Prompt'],
		    content: "<div style='width:400px;height:60px;margin:30px 0 0 0;'><div class='errordialog'></div><div" +
            " class='dialogtext'>" + AbisMessageResource['OperationFailed'] + "</div></div>",
		    okValue:  AbisMessageResource['OK'],		    	 
		    ok: function () {return true;}		 
		});
	},
	openSimpleDialog:function(info,level)
	{
        var levelClass = "warndialog";
        if(!(typeof level == "undefined")){
            levelClass = this.dialogLevel(level);
        }
		$.dialog({
			title:  AbisMessageResource['Prompt'],
		  	content: "<div style='width:400px;height:60px;margin:30px 0 0 0;'><div class='"+levelClass+"'></div><div" +
            " class='dialogtext'>"+info+"</div></div>",
		  	okValue: AbisMessageResource['OK'],		    	 
		  	ok: function () {return true;}		 
		});
		$("div[role='dialog']").draggable&&$("div[role='dialog']").draggable({ handle: ".d-header"});
	},
	// info文本信息 callback 点击确定回调  timeout 倒计时自动关闭
	openSimpleDialogForOcx:function(info,callback,timeout,level)
	{//兼容ocx插件
        var levelClass = "warndialog";
        if(!(typeof level == "undefined")){
            levelClass = this.dialogLevel(level);
        }
		var iframeId = "iframe"+new Date().getTime();
		var iframe  ='<iframe id="'+iframeId+'" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;width:230px; height:140px;z-index:-1; filter:alpha(opacity=0);"></iframe>'
		var aDialog =$.dialog({
			title:  AbisMessageResource['Prompt'],
		  	content: "<div style='padding:20px 5px 5px 10px;padding-top:15px;padding-left:10px;height:50px;width:400px;'>" +
			"<div class='"+levelClass+"'></div>" +
			"<div class='dialogtext'>"+info+"</div>"+iframe+"</div>",
		  	okValue: AbisMessageResource['OK'],		    	 
		  	ok: function () {
		  		if(WebUtil.isFunction(callback)){
		  			callback();
		  		}else{
		  			return true;
		  		}
		  	}		 
		});
		if(timeout&&WebUtil.isNumber(timeout)){
			setTimeout(function(){
				aDialog.close();
			},timeout)
		} 
		//reSize重置，自适应 iframe的大小
		$("#"+iframeId+"").width($("#"+iframeId+"").parents().find('.d-border').width())
		$("#"+iframeId+"").height($("#"+iframeId+"").parents().find('.d-border').height())
        $("div[role='dialog']").draggable&&$("div[role='dialog']").draggable({ handle: ".d-header"});
	},
	openComfirmDialogForOcx:function(info,callback,timeout)
	{//兼容ocx插件
		var iframeId = "iframe"+new Date().getTime();
		var iframe  ='<iframe id="'+iframeId+'" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;width:230px; height:140px;z-index:-1; filter:alpha(opacity=0);"></iframe>'
		var aDialog =$.dialog({
			title:  AbisMessageResource['Prompt'],
		  	content: "<div style='padding:5px;padding-left:10px;height:50px;width:400px;'>" +
			"<div style='background:url(../../../image/ui/webox/ask.png) no-repeat;width:28px;height:28px;margin:" +
			" 15px 0 0 35px;padding-top: 15px;float:left;'></div><div" +
            " style='float:right;margin: 15px 0 0 20px;width:300px;'>"+info+"</div>"+iframe+"</div>",
		  	okValue: AbisMessageResource['OK'],
			cancelValue:AbisMessageResource['Cancel'],
			cancel: function () {}	,	    	 
		  	ok: function () {
		  		if(WebUtil.isFunction(callback)){
		  			callback();
		  		}else{
		  			return true;
		  		}
		  	}
		});
		if(timeout&&WebUtil.isNumber(timeout)){
			setTimeout(function(){
				aDialog.close();
			},timeout)
		}
		//reSize重置，自适应 iframe的大小
		$("#"+iframeId+"").width($("#"+iframeId+"").parents().find('.d-border').width())
		$("#"+iframeId+"").height($("#"+iframeId+"").parents().find('.d-border').height())
        $("div[role='dialog']").draggable&&$("div[role='dialog']").draggable({ handle: ".d-header"});
	},
	openComfirmDialogPlusForOcx:function(info,button,timeout,level)
	{//兼容ocx插件    提供多种选择操作
		var iframeId = "iframe"+new Date().getTime();
		var buttonDemo =  [
			  	        {
			  	            value: '同意',
			  	            callback: function () {
			  	                this
			  	                .content('你同意了')
			  	                 .button({
			  	                    id: 'button-disabled',
			  	                    value: '我变成有效按钮了',
			  	                    disabled: false
			  	                 });
			  	                return false;
			  	            },
			  	            focus: true
			  	        },
			  	        {
			  	            value: '不同意',
			  	            callback: function () {
			  	                alert('你不同意')
			  	            }
			  	        },
			  	        {
			  	            id: 'button-disabled',
			  	            value: '2无效按钮12312313',
			  	            disabled: true
			  	        },
			  	        {
			  	            value: '关闭我'
			  	        }
			  	    ];
		if(!button){
			button = buttonDemo;
		}
		var iframe  ='<iframe id="'+iframeId+'" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;left:0px;width:230px; height:140px;z-index:-1; filter:alpha(opacity=0);"></iframe>'
			var aDialog =$.dialog({
			title:  AbisMessageResource['Prompt'],
		  	content: "<div style='padding:5px;padding-left:10px;height:30px;width:400px;'><div style='background:url(../../../image/ui/webox/ask.png) no-repeat;width:28px;height:28px;margin:" +
            " 15px 0 0 35px;padding-top: 15px;float:left;'></div><div" +
            "  style='float:right;margin: 15px 0 0 20px;width:300px;'>"+info+"</div>"+iframe+"</div>",
		  	drag:true,
		  	button:button
		});
		if(timeout&&WebUtil.isNumber(timeout)){
			setTimeout(function(){
				aDialog.close();
			},timeout)
		}
		//reSize重置，自适应 iframe的大小
		$("#"+iframeId+"").width($("#"+iframeId+"").parents().find('.d-border').width())
		$("#"+iframeId+"").height($("#"+iframeId+"").parents().find('.d-border').height())
        $("div[role='dialog']").draggable&&$("div[role='dialog']").draggable({ handle: ".d-header"});

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
		    content: "<div style='width:400px;height:60px;margin:30px 0 0 0;'><div class='okdialog'></div><div" +
            " class='dialogtext'>"+ AbisMessageResource.Alert["SaveSuccessContinueInput"]+"</div></div>",
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
	showComfirm:function(msg,invoke,level)
	{
		var levelClass = "askdialog";
        if(!(typeof level == "undefined")){
            levelClass = this.dialogLevel(level);
        }
		$.dialog({
			title:  AbisMessageResource['Prompt'],
			content: "<div style='width:400px;height:60px;margin:30px 0 0 0;'><div class='"+levelClass+"'></div><div" +
			" class='dialogtext'>"+msg+"</div></div>",
			okValue: AbisMessageResource['OK'],
			cancelValue:AbisMessageResource['Cancel'],
			ok: function () {invoke();},
			cancel: function () {}
		});
	},
	openComfirmDialog:function(msg,level,callback)
	{
		var levelClass = "askdialog";
		var width = "";
		if(level==1){
			levelClass = "errordialog";
			width = "style='width: 30px;'";
		}else if(level==2){
			levelClass = "warndialog";
			width = "style='width: 30px;'";
		}else if(level==3){
			levelClass = "askdialog";
		}
		$.dialog({
			  title:  AbisMessageResource['Prompt'],
			  content: "<div style='width:400px;height:60px;margin:30px 0 0 0;'><div class='"+levelClass+"' "+width+"></div><div class='dialogtext'>"+msg+"</div></div>",
			  okValue: AbisMessageResource['OK'],
			  cancelValue:AbisMessageResource['Cancel'],
			  ok: function () {
				  if(WebUtil.isFunction(callback)){
			  			callback();
			  		}else{
			  			return true;
			  		}
				  },
			  cancel: function () {
				  return true;
			  }
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
	},
	openDialog:function (title,content,button,timeout) {
            var buttonDemo =  [
                {
                    value: '同意',
                    callback: function () {
                        this
                            .content('你同意了')
                            .button({
                                id: 'button-disabled',
                                value: '我变成有效按钮了',
                                disabled: false
                            });
                        return false;
                    },
                    focus: true
                },
                {
                    value: '不同意',
                    callback: function () {
                        alert('你不同意')
                    }
                },
                {
                    id: 'button-disabled',
                    value: '2无效按钮12312313',
                    disabled: true
                },
                {
                    value: '关闭我'
                }
            ];
            if(!button){
                button = buttonDemo;
            }
           var aDialog =$.dialog({
                title:  title,
                content: content,
                drag:true,
                button:button
            });
            if(timeout&&WebUtil.isNumber(timeout)){
                setTimeout(function(){
                    aDialog.close();
                },timeout)
            }
        	$("div[role='dialog']").draggable&&$("div[role='dialog']").draggable({ handle: ".d-header"});
        }
}

