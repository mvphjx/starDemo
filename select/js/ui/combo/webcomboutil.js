var WebComboUtil = 
{
	getCodeTable:function(colNameList,invoke,colFilterRgxs)
	{
		if(colNameList!=null&&colNameList!=""){
			$.post(WebVar.VarPath + "/util/combo/data/"+colNameList,{colFilterRgxs:colFilterRgxs},
					function(data)
					{
						invoke(data||"[]");
					}
				);
		}
		WebComboUtil.addClickListener();
		WebComboUtil.addScrollListener();
		WebComboUtil.addTextInputFocusListener();
	},
	//翻译字典
	//Table|colname  code
	getCodeText: function(columnName, code) {
		var url = WebVar.VarPath + "/util/combo/find/" + columnName + "/" + code;
		var result = code;
		jQuery.ajax({
			async: false,
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: {
				filterRgx: ""
			},
			dataType: 'json',
			success: function(data) {
				if(data != null) {
					if(typeof data =='string'){
						data = eval('(' + data + ')');
					}
					if(data.length > 0) {
						var entity = data[0];
						result = entity.text
					}
				}
			}
		});
		return result;
	},
	getDBCodeText: function(dbType, code) {
		var url = WebVar.VarPath + "/db/mgr/dbinfo/" + dbType;
		var result = code;
		jQuery.ajax({
			async: false,
			type: 'POST',
			contentType: 'application/json',
			url: url,
			data: {
				filterRgx: ""
			},
			dataType: 'json',
			success: function(data) {
				if(data != null) {
					if(typeof data =='string'){
						data = eval('(' + data + ')');
					}
					$.each(data, function(index, entity) {
						if(entity.code == code) {
							result = entity.text
						}
					});
				}
			}
		});
		return result;

	},
   addClickListener:function()
   {        
        $(document).click(
        	function(e)
        	{
        		docClick(e);
        	}
        );
           
   },
   addScrollListener:function()
   {
	  $('#scroll').scroll(function(){  
       
     })
   },
   addTextInputFocusListener:function()
   {
	 $("input").filter(".FieldInput").focus(function(){$(".newMenu").css('display','none');});
   }
}

function docClick(event)
{
	var e 	= event || window.event;
    var t	= e.srcElement || e.target;   
    var id= t.id;      
    var type=t.type;  
    var ss=id.split("_");
    var list="";
    if(ss.length==2)
    {
    	list=ss[1]
    }    
    var tempbutton=id.substr(id.length-6);    
    var tempbuttonup=id.substr(id.length-8);    
    var tempbuttondown=id.substr(id.length-10);    
	if(list!='searchlist'&&list!='checktextLabel'&&list!='checkcodeLabel'&&type!='checkbox'&&tempbutton!='button'&&tempbuttonup!='buttonup'&&tempbuttondown!='buttondown'&&id.indexOf("textfield")==-1) 
	{
	 	$(".newMenu").css('display','none');
	}	
}
