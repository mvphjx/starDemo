
/**
 * 远程终端
 * */
function AddRmtTerminal(requiredField,updateField,colLens,server)
{	
	this.crolArray = new Array();
	//必填项
	this.requiredField = requiredField;
	//更新项
	this.updateField = updateField;
	//this.colLens = colLens;
	this.server=server;
	this.init();	
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent = $("#AddRmtServerCfg").parent();
	pageparent.scroll(function()
	{  		  
		$(".newMenu").css('display','none');
    }
    );
}

var textArray = new Array();

AddRmtTerminal.prototype.init = function()
{
	//必填项
	this.requiredMap =new Array();
	//更新项
	//this.updateMap = new Array();
	this.changeField = {};
	// 远程终端信息
	this.unitCode  				=WebUI.createCombo("terUnitCodeId","terUnitCode",null,"terUnitCodeId",false,false,"ACCESSABLE_REMOTE_TERMINAL|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.unitCode);
	this.terminalName			=WebUI.createText("terNameId","terName","WebTextField","",this.requiredField);
	this.initMap(textArray,this.terminalName);
	this.userId			=WebUI.createText("terUserId","terUser","WebTextField","",this.requiredField);
	this.initMap(textArray,this.userId);
	this.serviceNum				=WebUI.createText("terServiceNumId","terServiceNum","WebTextField","",this.requiredField);
	this.initMap(textArray,this.serviceNum);
	this.ipAddrs				=WebUI.createText("terIpAddrsId","terIpAddrs","WebTextField","",this.requiredField);
	this.initMap(textArray,this.ipAddrs);
	this.macs				=WebUI.createText("terMacsId","terMacs","WebTextField","",this.requiredField);
	this.initMap(textArray,this.macs);
	
	this.initComboData();	
	this.setValidateColumns();
	this.setServer(this.server);
}
AddRmtTerminal.prototype.initMap = function(map,contro)
{
	map.push(contro);
	var required = WebArrayUtil.containsToIgnoreCase(this.requiredField,contro.getId());
	//var update = WebArrayUtil.containsToIgnoreCase(this.updateField,contro.getUnitCode());
	if(required)
	{
		this.requiredMap.push(contro);	
	}
	/*if(update)
	{
		this.updateMap.push(contro);	
	}*/
}
AddRmtTerminal.prototype.register = function(contro)
{
	var nthis = this;
	contro.addChangeListener(textChange);
	function textChange()
	{				
		var id = contro.getId();		 
		var oldtext = nthis.srcCardObj[id];		
		if(oldtext == null) oldtext = "";
		oldtext += "";
		var text = contro.getValue();		
		if(text != oldtext)
		{
		   nthis.changeField[id] = true;		  
		   flag = true;
		}
		else
		{
			nthis.changeField[id] = false;
			flag = false;
		}
		if(WebUtil.isFunction(nthis.changeListener))
		{
			nthis.changeListener(flag);	
		}
	}
}

//编辑页面的信息是否发生了变化
AddRmtTerminal.prototype.isTxtInfoChanged = function()
{	
	var flag = false;
	for(var name in this.changeField)
	{
		if(this.changeField[name])
		{
			flag = true;
		    break;
		}					 
	}	    
	return flag;
}
//验证所有必填项是否都填了
AddRmtTerminal.prototype.validateRequired = function()
{
	var flag = true;
	//验证必填项是否都填了
	var n = 0;
	for(var i = 0;i < this.requiredMap.length;i++)
	{
		 var text = this.requiredMap[i].getText();
		 if(text == null || text == "")
			 n = n+1;
	}		
	if(n > 0)
	{
		flag = false;
	}
	return flag;
}
/**
 * 注册文本改变事件
 * @param {Object} listener
 */
AddRmtTerminal.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddRmtTerminal.prototype.initComboData=function()
{
	var columnnames = ['accessable_remote_terminal|UNIT_CODE'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
//初始化 控件
AddRmtTerminal.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.unitCode.setComboData(data['accessable_remote_terminal|unit_code']);
}
AddRmtTerminal.prototype.update = function(field)
{	
	for(var i = 0;i < this.crolArray.length;i++)
	{
	    var contral = crolArray[i];	
	    var id = contral.getId();
	    //禁止更新项验证
	    var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
	    if(!forbidden)
    	{
	    	 contral.setEditable(false);
    	}
	}
}

/**  验证文本  */
AddRmtTerminal.prototype.setValidateColumns = function()
{
	if(this.colLens != null)
	{
		var srcCaseId = {};	
		srcCaseId.maxlength = this.colLens["RMT_SERVER"][LLHitlogMainCol.SRC_CASE_ID];
		this.srcCaseId.setValidateType(srcCaseId);
		
	}
}

AddRmtTerminal.prototype.setLPRows = function(rows,searchStr)
{
	var url = WebVar.VarPath + "/hitlog/lllist/getCLPCase/" + rows[0].ID;
	var vthis = this;
	jQuery.ajax 
	( 
        {
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : null,
			dataType : 'json',
			success : function(data) 
			{   
				if(data != null)
				{
					var mainInfo = data.mainInfo;
					var breakInfo = data.breakInfo;
					var basicInfo = data.basicInfo;
					var acceptInfo = data.acceptInfo;
					var registerInfo = data.registerInfo;
					var cards = data.cards;
					if(!WebUtil.isNull(mainInfo))
					{
						$("#srcCaseId").val(mainInfo.id); 
						$("#hitlogNum").val(mainInfo.ceNum); 
						$("#srcCaseNum").val(mainInfo.ceNum); 
					}
					if(!WebUtil.isNull(basicInfo))
					{
						vthis.srcCaseClassCode1.setComboCode(basicInfo.ceClassCode1);
						vthis.srcCaseClassCode2.setComboCode(basicInfo.ceClassCode2);
						vthis.srcCaseClassCode3.setComboCode(basicInfo.ceClassCode3);
						vthis.srcCaseSuperviseLevel.setComboCode(basicInfo.superviseLevel);
						$("#srcCaseOccurDate").val(basicInfo.ceOccurDate); 
					}
					if(!WebUtil.isNull(cards))
					{
						$("#srcCardId").val(cards[0].lpCardInfo.id); 
						$("#srcCardNum").val(cards[0].lpCardInfo.cardNum); 
					}
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

AddRmtServerCfg.prototype.setLPRows1 = function(rows,searchStr)
{	
	var url = WebVar.VarPath + "/hitlog/lllist/getCLPCase/" + rows[0].ID;
	var vthis = this;
	jQuery.ajax 
	( 
        {
			type : 'POST',
			contentType : 'application/json',
			url : url,
			data : null,
			dataType : 'json',
			success : function(data) 
			{   
				if(data != null)
				{
					var mainInfo = data.mainInfo;
					var breakInfo = data.breakInfo;
					var basicInfo = data.basicInfo;
					var acceptInfo = data.acceptInfo;
					var registerInfo = data.registerInfo;
					var cards = data.cards;
					if(!WebUtil.isNull(mainInfo))
					{
						$("#destCaseId").val(mainInfo.id); 
						$("#destCaseNum").val(mainInfo.ceNum); 
						$("#destCaseOccurDate").val(mainInfo.ceOccurDate); 
					}
					if(!WebUtil.isNull(basicInfo))
					{
						vthis.destCaseClassCode1.setComboCode(basicInfo.ceClassCode1);
						vthis.destCaseClassCode2.setComboCode(basicInfo.ceClassCode2);
						vthis.destCaseClassCode3.setComboCode(basicInfo.ceClassCode3);
						vthis.destCaseSuperviseLevel.setComboCode(basicInfo.superviseLevel);
					}
					if(!WebUtil.isNull(cards))
					{
						$("#destCardId").val(cards[0].lpCardInfo.id); 
						$("#destCardNum").val(cards[0].lpCardInfo.cardNum); 
					}
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}
//设置表单控件的值
AddRmtTerminal.prototype.setServer= function(server)
{
	this.server = server;
	if(server == null)return;
	this.unitCode.setValue(server.unitCode);
	this.terminalName.setValue(server.terminalName);
	this.userId.setValue(server.userId);
	this.serviceNum.setValue(server.serviceNum);				
	this.ipAddrs.setValue(server.ipAddrs);				
	this.macs.setValue(server.macs);					
}
//转换 true = 1 false = 0
AddRmtServerCfg.prototype.formatBoolean = function (boolean){
	if(boolean="true"){
		 return "1";
	}
	if(boolean="false"){
		 return "0";
	}
	return boolean;
}

