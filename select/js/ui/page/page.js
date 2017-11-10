function Page(type)
{
	this.type = type;	
	this.init();	
}
Page.prototype.init = function()
{
	switch (this.type) 
	{
     case PageTypeCodes.ADD:
    	 $("table input[type='text']").removeClass().addClass("WebTextField");
    	 $("table input[type='password']").removeClass().addClass("WebTextField");
    	 $("textarea").removeClass().addClass("WebTextField");
    	 break;
     case PageTypeCodes.EDIT:
    	 $("table input[type='text']").removeClass().addClass("WebTextField");
    	 $("table input[type='password']").removeClass().addClass("WebTextField");
    	 $("textarea").removeClass().addClass("WebTextField");
    	 break;
     case PageTypeCodes.SHOW:
    	 $("table input[type='text']").removeClass().addClass("showtextfield");
    	 $("table input[type='password']").removeClass().addClass("showtextfield");
    	 $("textarea").removeClass().addClass("showtextfield");
    	 $("table input[type='text']").attr("readonly",true);    	
    	 $("table input[type='password']").attr("readonly",true);    	
    	 $("textarea").attr("readonly",true); 
    	 $("tr").last().hide();
    	 break;
	}
}