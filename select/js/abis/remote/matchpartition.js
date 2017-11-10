/**
 * 增加远程通信服务器配置的脚本。
 * 北京众联云生信息技术有限公司
 * 版权所有(c) 2013-2015  
 */



function AddMatchServerCfg(requiredField,updateField,colLens,server)
{	
	/*this.crolArray = new Array();*/
	//必填项
	this.requiredField = requiredField;
	//更新项
	/*tthis.updateField = updateField;
	this.colLens = colLens;
	this.server=server;*/
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

AddMatchServerCfg.prototype.init = function()
{
	//必填项
	this.requiredMap =new Array();
	//更新项
	this.updateMap = new Array();
	this.changeField = {};
	// 卡片文本信息
	
	/*this.comments 				= WebUI.createMulText("commentsId","comments","WebTextArea",null,this.requiredField);
	this.initMap(textArray,this.comments);*/
	
	this.bty_mask 				= WebUI.createCombo("btyMaskId","bty_mask",null,"bty_mask_NameId",true,false,"MATCH_PARTITION|BTY_MASK",null,this.requiredField);
    this.bty_mask.setEditable(false);
    //this.bty_mask 			= WebUI.createText("btyMaskId","bty_mask","WebTextField","",this.requiredField);
	this.initMap(textArray,this.bty_mask);
	this.part_type 				= WebUI.createCombo("partTypeId","part_type",null,"part_type_NameId",true,false,"MATCH_PARTITION|PART_TYPE",null,this.requiredField);
    this.part_type.setEditable(false);
	this.initMap(textArray,this.part_type);
	this.match_fmt 				= WebUI.createCombo("matchFmtId","match_fmt",null,"match_fmt_NameId",true,false,"MATCH_PARTITION|MATCH_MNT_FMT",null,this.requiredField);
    this.match_fmt.setEditable(false);
	this.initMap(textArray,this.match_fmt);
	this.unit_code 				= WebUI.createCombo("unitCodeId","unit_code",null,"unit_code_NameId",false,false,"MATCH_PARTITION|UNIT_CODE",null,this.requiredField);
    this.unit_code.setEditable(false);
	this.initMap(textArray,this.unit_code);
	this.src_tp_mmid 				= WebUI.createCombo("srcTpMmidId","src_tp_mmid",null,"src_tp_mmid_NameId",true,false,"MATCH_PARTITION|SRC_TP_MMID",null,this.requiredField);
    this.src_tp_mmid.setEditable(false);
	this.initMap(textArray,this.src_tp_mmid);
	this.src_lp_mmid 				= WebUI.createCombo("srcLpMmidId","src_lp_mmid",null,"src_lp_mmid_NameId",true,false,"MATCH_PARTITION|SRC_LP_MMID",null,this.requiredField);
    this.src_lp_mmid.setEditable(false);
	this.initMap(textArray,this.src_lp_mmid);
	this.print_type 			= WebUI.createText("printTypeId","print_type","WebTextField","",this.requiredField);
	this.initMap(textArray,this.print_type);
	this.print_type.setEditable(false);
	this.match_ele 				= WebUI.createMulText("matchEleId","match_ele","WebTextArea","",this.requiredField);
	this.initMap(textArray,this.match_ele);
	this.match_ele.setEditable(false);
	this.des 				= WebUI.createMulText("desId","des","WebTextArea",null,this.requiredField);
	this.initMap(textArray,this.des);
	
	this.initComboData();	
	this.setValidateColumns();
	this.setServer(this.server);
}
AddMatchServerCfg.prototype.initMap = function(map,contro)
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
AddMatchServerCfg.prototype.setParamEditable = function(f)
{
    this.bty_mask.setEditable(f);
}
AddMatchServerCfg.prototype.setSelectVal = function(data)
{
    this.part_type.setText(data.PART_TYPE);
    this.match_fmt.setText(data.MATCH_MNT_FMT);
    debugger
    /*this.src_tp_mmid.setText(data.SRC_TP_MMID);
    this.src_lp_mmid.setText(data.SRC_LP_MMID);*/
    $("#src_tp_mmidtextfieldfalse").val(data.SRC_TP_MMID);
    $("#src_lp_mmidtextfieldfalse").val(data.SRC_LP_MMID);
    $("#src_tp_mmidcode").val(data.SRC_TP_MMID);
    $("#src_lp_mmidcode").val(data.SRC_LP_MMID);
    this.match_ele.setText(data.MATCH_ELEMENTS);
}
AddMatchServerCfg.prototype.register = function(contro)
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
AddMatchServerCfg.prototype.isTxtInfoChanged = function()
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
AddMatchServerCfg.prototype.validateRequired = function()
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
AddMatchServerCfg.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddMatchServerCfg.prototype.initComboData=function()
{
	var columnnames = ["MATCH_PARTITION|PART_TYPE","MATCH_PARTITION|BTY_MASK","MATCH_PARTITION|MATCH_MNT_FMT","MATCH_PARTITION|UNIT_CODE","MATCH_PARTITION|SRC_LP_MMID","MATCH_PARTITION|SRC_TP_MMID"];
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
//初始化 控件
AddMatchServerCfg.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.unit_code.setComboData(data['match_partition|unit_code']);
	this.bty_mask.setComboData(data['match_partition|bty_mask']);
	this.part_type.setComboData(data['match_partition|part_type']);
	this.match_fmt.setComboData(data['match_partition|match_mnt_fmt']);
	this.src_tp_mmid.setComboData(data['match_partition|src_tp_mmid']);
	this.src_lp_mmid.setComboData(data['match_partition|src_lp_mmid']);
}
AddMatchServerCfg.prototype.update = function(field)
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
AddMatchServerCfg.prototype.setValidateColumns = function()
{
	if(this.colLens != null)
	{
		var srcCaseId = {};	
		srcCaseId.maxlength = this.colLens["RMT_SERVER"][LLHitlogMainCol.SRC_CASE_ID];
		this.srcCaseId.setValidateType(srcCaseId);
		
	}
}

AddMatchServerCfg.prototype.setLPRows = function(rows,searchStr)
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

AddMatchServerCfg.prototype.setLPRows1 = function(rows,searchStr)
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
AddMatchServerCfg.prototype.setServer= function(server)
{
	this.server = server;
	if(server == null)return;
			
	this.comments.setValue(server.comments);
	
	this.part_type.setValue(this.formatBoolean(server.part_type));		
	this.bty_mask.setValue(this.formatBoolean(server.bty_mask));
	this.match_fmt.setValue(this.formatBoolean(server.match_fmt));		
	this.unit_code.setValue(this.formatBoolean(server.unit_code));
	this.print_type.setValue(this.formatBoolean(server.print_type));		
	this.match_ele.setValue(this.formatBoolean(server.match_ele));
	this.des.setValue(this.formatBoolean(server.des));		
	//this..setValue(this.formatBoolean(server.));
}
//转换 true = 1 false = 0
AddMatchServerCfg.prototype.formatBoolean = function (boolean){
	if(boolean="true"){
		 return "1";
	}
	if(boolean="false"){
		 return "0";
	}
	return boolean;
}

