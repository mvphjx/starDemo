/**
 * 增加远程通信服务器配置的脚本。
 * 北京众联云生信息技术有限公司
 * 版权所有(c) 2013-2015  
 */



function AddRmtServerCfg(requiredField,updateField,colLens,server)
{	
	this.crolArray = new Array();
	//必填项
	this.requiredField = requiredField;
	//更新项
	this.updateField = updateField;
	this.colLens = colLens;
	this.server=server;
	//this.update(updateField);	//现行阶段毙掉更新项
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

AddRmtServerCfg.prototype.init = function()
{
	//必填项
	this.requiredMap =new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	this.id  					=WebUI.createText("idId","id","WebTextField","",this.requiredField);
	this.initMap(textArray,this.id);
	this.name					=WebUI.createText("nameId","name","WebTextField","",this.requiredField);
	this.initMap(textArray,this.name);
	this.unit_code				=WebUI.createCombo("unit_codeId","unit_code",null,"unit_NameId",false,false,"RMT_SERVER|UNIT_CODE",null,this.requiredField);
	this.initMap(textArray,this.unit_code);
	this.address				=WebUI.createText("addressId","address","WebTextField","",this.requiredField);
	this.initMap(textArray,this.address);
	this.port					=WebUI.createText("portId","port","WebTextField","",this.requiredField);
	this.initMap(textArray,this.port);
	this.username				=WebUI.createText("usernameId","username","WebTextField","",this.requiredField);
	this.initMap(textArray,this.username);
	this.password				=WebUI.createText("passwordId","password","WebTextField","",this.requiredField);
	this.initMap(textArray,this.password);
	this.is_direct_link			=WebUI.createCombo("is_direct_linkId","is_direct_link",null,"is_direct_link_NameId",false,false,"RMT_SERVER|IS_DIRECT_LINK",null,this.requiredField);
	this.initMap(textArray,this.is_direct_link);
	this.is_direct_superior		=WebUI.createCombo("is_direct_superiorId","is_direct_superior",null,"is_direct_superior_NameId",false,false,"RMT_SERVER|IS_DIRECT_SUPERIOR",null,this.requiredField);
	this.initMap(textArray,this.is_direct_superior);
	this.is_front_server		=WebUI.createCombo("is_front_serverId","is_front_server",null,"is_front_server_NameId",false,false,"RMT_SERVER|IS_FRONT_SERVER",null,this.requiredField);	
	this.initMap(textArray,this.is_front_server);
	this.comments 				= WebUI.createMulText("commentsId","comments","WebTextArea",null,this.requiredField);
	this.initMap(textArray,this.comments);
	
	
	
	this.initComboData();	
	this.setValidateColumns();
	this.setServer(this.server);
}
AddRmtServerCfg.prototype.initMap = function(map,contro)
{
	map.push(contro);
	var required = WebArrayUtil.containsToIgnoreCase(this.requiredField,contro.getId());
	var update = WebArrayUtil.containsToIgnoreCase(this.updateField,contro.getId());
	if(required)
	{
		this.requiredMap.push(contro);	
	}
	if(update)
	{
		this.updateMap.push(contro);	
	}
}
AddRmtServerCfg.prototype.register = function(contro)
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
AddRmtServerCfg.prototype.isTxtInfoChanged = function()
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
AddRmtServerCfg.prototype.validateRequired = function()
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
AddRmtServerCfg.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddRmtServerCfg.prototype.initComboData=function()
{
	var columnnames = ['RMT_SERVER|UNIT_CODE','RMT_SERVER|IS_DIRECT_LINK','RMT_SERVER|IS_DIRECT_SUPERIOR',
	                   'RMT_SERVER|IS_FRONT_SERVER'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
//初始化 控件
AddRmtServerCfg.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.unit_code.setComboData(data['rmt_server|unit_code']);
	this.is_direct_link.setComboData(data['rmt_server|is_direct_link']);
	this.is_direct_superior.setComboData(data['rmt_server|is_direct_superior']);
	this.is_front_server.setComboData(data['rmt_server|is_front_server']);
}
AddRmtServerCfg.prototype.update = function(field)
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
AddRmtServerCfg.prototype.setValidateColumns = function()
{
	if(this.colLens != null)
	{
		var srcCaseId = {};	
		srcCaseId.maxlength = this.colLens["RMT_SERVER"][LLHitlogMainCol.SRC_CASE_ID];
		this.srcCaseId.setValidateType(srcCaseId);
		
	}
}

AddRmtServerCfg.prototype.setLPRows = function(rows,searchStr)
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
AddRmtServerCfg.prototype.setServer= function(server)
{
	this.server = server;
	if(server == null)return;
	// 卡片文本信息
	this.id.setValue(server.id);
	this.name.setValue(server.name);
	this.unit_code.setValue(server.unitCode);				
	this.address.setValue(server.address);				
	this.port.setValue(server.port);					
	this.username.setValue(server.userName);				
	this.password.setValue(server.password);
	this.is_direct_link.setValue(this.formatBoolean(server.directLink));			
	this.is_direct_superior.setValue(this.formatBoolean(server.directSuperior));		
	this.is_front_server.setValue(this.formatBoolean(server.frontServer));		
	this.comments.setValue(server.comments);	
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

