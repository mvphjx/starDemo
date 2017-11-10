


LPCardEditPage.prototype.btyValue = null;

//文本编辑模式(编辑|扫描)

var LPTxtMode=
{
	SCAN:0,
	EDIT:1
}
LPCardEditPage.prototype.ridgeColorDefault  = 9; //缺省值

/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 */

function LPCardEditPage(requiredField,updateField,mode)
{	
	this.crolArray=new Array();
	this.requiredField=requiredField;
	this.updateField=updateField;
	this.mode = mode;
	this.init();
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#lpcardeditpage").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
     );
}


LPCardEditPage.prototype.setSeq = function(value)
{
	this.seqNo.setValue(value);
}

LPCardEditPage.prototype.setCardNum = function(value)
{
	this.cardNum.setValue(value);
}

LPCardEditPage.prototype.setBty = function(bty,text)
{
	if(bty==null) return;
	this.btyValue = bty;
	this.bty.setValue(text);
	this.initCheckBox(bty);
}

LPCardEditPage.prototype.setValue = function(colName,value)
{
	for(var key in this.crolArray)
	{
		var arr = this.crolArray[key];
		for(var id in arr)
		{
			var obj = arr[id];
			if(obj.getId() == colName)
			{
				
			}
		}
	}
}

LPCardEditPage.prototype.initUIStatus = function()
{
	if(this.mode == LPTxtMode.SCAN)
	{
		$("#hide_line_1").hide();
		$("#hide_line_2").hide();
		$("#hide_line_3").hide();
		$("#hide_line_4").hide();
		$("#hide_line_5").hide();
	}
	else
	{
		
	}
}

LPCardEditPage.prototype.init = function()
{
	this.initUIStatus();
	
	//必填项
	this.requiredMap=new Array();
	//更新项
	this.updateMap=new Array();
	this.changeField={};
	// 卡片文本信息
	var textArray=new Array();
	this.isNamelessCorpse=WebUI.createCombo("lpcardText_isNamelessCorpse","isNamelessCorpse",null,null,true,true,"LP_CARD_TEXT_INFO|IS_NAMELESS_CORPSE","",this.requiredField);
	this.initMap(textArray,this.isNamelessCorpse);
	this.namelessCorpseId=WebUI.createText("lpcardText_namelessCorpseId","namelessCorpseId","WebTextField","",this.requiredField);	
	this.initMap(textArray,this.namelessCorpseId);
	this.leftLocation=WebUI.createText("lpcardText_leftLocation","leftLocation","WebTextField","",this.requiredField);
	this.initMap(textArray,this.leftLocation);
	this.startFgp=WebUI.createText("lpcardText_startFgp","startFgp","WebTextField","",this.requiredField);
	this.initMap(textArray,this.startFgp);
	this.endFgp=WebUI.createText("lpcardText_endFgp","endFgp","WebTextField","",this.requiredField);
	this.initMap(textArray,this.endFgp);
	this.mntExtractMethod=WebUI.createCombo("lpcardText_mntExtractMethod","mntExtractMethod",null,null,true,true,"LP_CARD_TEXT_INFO|MNT_EXTRACT_METHOD","",this.requiredField);	
	this.initMap(textArray,this.mntExtractMethod);
	this.ridgeColor=WebUI.createCombo("lpcardText_ridgeColor","ridgeColor",null,null,true,true,"LP_CARD_TEXT_INFO|RIDGE_COLOR","",this.requiredField);	
	this.initMap(textArray,this.ridgeColor);
	this.senderId=WebUI.createText("lpcardText_senderId","senderId","WebTextField","",this.requiredField);
	this.initMap(textArray,this.senderId);	
	this.comments=WebUI.createMulText("lpcardInfo_comments", "comments", "WebTextArea_Auto","",this.requiredField);	
	this.initMap(textArray,this.comments);		
	this.initCheckBox();
	this.crolArray["lpCardText"]=textArray;	
	
	var infoArray=new Array();
	this.ceId=WebUI.createLabel("lpcardInfo_ceId", "ceId", "");
	infoArray.push(this.ceId);
	this.seqNo=WebUI.createLabel("lpcardInfo_seqNo", "seqNo", "");
	infoArray.push(this.seqNo);
	this.bty=WebUI.createLabel("lpcardInfo_bty", "btyText", "");
	infoArray.push(this.bty);
	this.cardNum=WebUI.createLabel("lpcardInfo_cardNum", "cardNum", "");
	infoArray.push(this.cardNum);
	this.hasTpMatch=WebUI.createLabel("lpcardInfo_hasTpMatch", "hasTpMatchText", "");
	infoArray.push(this.hasTpMatch);
	this.createTime=WebUI.createLabel("lpcardInfo_createTime", "createTime", "");
	infoArray.push(this.createTime);
	this.createUser=WebUI.createLabel("lpcardInfo_createUser", "createUser", "");
	infoArray.push(this.createUser);
	this.updateTime=WebUI.createLabel("lpcardInfo_updateTime", "updateTime", "");
	infoArray.push(this.updateTime);
	this.updateUser=WebUI.createLabel("lpcardInfo_updateUser", "updateUser", "");
	infoArray.push(this.updateUser);
	this.crolArray["lpCardInfo"]=infoArray;	
	
	var enrollArray=new Array();
	this.iniEnrollUser=WebUI.createLabel("enrollInfo_iniEnrollUser", "iniEnrollUser", "");
	enrollArray.push(this.iniEnrollUser);
	this.iniEnrollUnitCode=WebUI.createLabel("enrollInfo_iniEnrollUnitCode", "iniEnrollUnitCodeText", "");
	enrollArray.push(this.iniEnrollUnitCode);
	this.iniSysId=WebUI.createLabel("enrollInfo_iniSysId", "iniSysId", "");
	enrollArray.push(this.iniSysId);
	this.iniEnrollTime=WebUI.createLabel("enrollInfo_iniEnrollTime", "iniEnrollTime", "");
	enrollArray.push(this.iniEnrollTime);
	this.objectType=WebUI.createLabel("enrollInfo_objectType", "objectTypeText", "");
	enrollArray.push(this.objectType);
	this.deviceType=WebUI.createLabel("enrollInfo_deviceType", "deviceTypeText", "");
	enrollArray.push(this.deviceType);
	this.enrollSiteId=WebUI.createLabel("enrollInfo_enrollSiteId", "enrollSiteId", "");
	enrollArray.push(this.enrollSiteId);
	this.crolArray["enrollInfo"]=enrollArray;	
	
	this.initComboData();	
	this.setValidateColumns();
}
LPCardEditPage.prototype.defaultFgps = "0000000000";
LPCardEditPage.prototype.initCheckBox=function(bty)
{
		$('#lpcardText_candFgps').html("");
	    var data = null;
		if(bty==1){
			data = AbisCheckData.candFgps;
			this.defaultFgps="0000000000";
		}else if(bty==2){
			data = AbisCheckData.candFgps_zw;
			this.defaultFgps="0000";
		}else {
			return;
		}
		var bntSetting = 
		{
			param:		{colCount:5},
			callback:	{onClick: candFgpsClick}
		}
		
		this.candFgps = new CheckBnt("lpcardText_candFgps",data,bntSetting);
		var nthis=this;
		function candFgpsClick()
		{
			nthis.candFgpsClick();
		}
}

LPCardEditPage.prototype.candFgpsClick=function()
{
	var newCandFgps=this.getCandFgpsData();
	if(this.srcCardObj != null)
	{
		var oldCandFgps=this.srcCardObj['candFgps'];
		if(newCandFgps==oldCandFgps)
		{
			this.changeField['candFgps']=false;
			if(this.changeListener != null)
			{
				this.changeListener(false);
			}
		}
		else
		{
			this.changeField['candFgps']=true;	
			if(this.changeListener != null)
			{
				this.changeListener(true);
			}
		}
	}
	return newCandFgps == this.defaultFgps;
}

LPCardEditPage.prototype.getCandFgpsData = function() {
	var arr = this.candFgps.getSelectData();
	var data = new Array();
	for(var i = 0; i < this.defaultFgps.length; i++) {
		data[i] = 0;
	}
	for(var i = 0; i < arr.length; i++) {
		var index = parseInt(arr[i].id);
		data[index] = 1;
	}
	var candFgps = data.toString();
	return candFgps.replace(/,/g, '');
}

LPCardEditPage.prototype.setCandFgpsData=function(data)
{	
	if(data == null) {
		data=this.defaultFgps;
	}
	for(var i = 0; i < data.length; i++) {
		if(data.substr(i, 1) == '1') {
			this.candFgps.setSelected(i, true);
		} else {
			this.candFgps.setSelected(i, false);
		}
	}
}
LPCardEditPage.prototype.initMap = function(map,contro)
{
	map.push(contro);
	var required=WebArrayUtil.containsToIgnoreCase(this.requiredField,contro.getId());
	var update=WebArrayUtil.containsToIgnoreCase(this.updateField,contro.getId());
	if(required)
	{
		this.requiredMap.push(contro);	
	}
	if(update)
	{
		this.updateMap.push(contro);	
	}
}

//为所有文本框注册当前文本是否发生了变化，编辑页面赋值后调用。
LPCardEditPage.prototype.Txtchange = function()
{
	var nthis=this;	
	for(var name in this.crolArray['lpCardText'])
		{		  
			   var contro=this.crolArray['lpCardText'][name];
			   nthis.register(contro);		   
		}
	this.register(this.comments);	
}
//参数 webinput
LPCardEditPage.prototype.register = function(contro)
{
	var nthis = this;
	contro.addChangeListener(textChange);
	function textChange()
	{				
		 var id=contro.getId();		 
		 var oldtext=nthis.srcCardObj[id];		
		if(oldtext == null) oldtext = "";
		oldtext += "";
		 var text=contro.getValue();		
		 if(text!=oldtext)
			 {
			    nthis.changeField[id]=true;		  
			    flag=true;
			 }	
		 else
			{
			    nthis.changeField[id]=false;
			    flag=false;
			}
		if(WebUtil.isFunction(nthis.changeListener))
		{
			nthis.changeListener(flag);	
		}
	}
}

//编辑页面的信息是否发生了变化
LPCardEditPage.prototype.isTxtInfoChanged = function()
{	
	var flag=false;
	for(var name in this.changeField)
	{
		if(this.changeField[name])
		{
			flag=true;
		    break;
		}					 
	}	    
	return flag;
}
//验证所有必填项是否都填了
LPCardEditPage.prototype.validateRequired = function()
{
	var flag=true;
	//验证必填项是否都填了
	var n=0;
	for(var i=0;i<this.requiredMap.length;i++)
	{
		 var text=this.requiredMap[i].getText();
		 if(text==null||text=="")
			 n=n+1;
	}		
	if(n>0)
	{
		flag=false;
	}
	return flag;
}
/**
 * 注册文本改变事件
 * @param {Object} listener
 */
LPCardEditPage.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}

LPCardEditPage.prototype.initComboData=function()
{
	var columnnames = ['LP_CARD_TEXT_INFO|IS_NAMELESS_CORPSE','LP_CARD_TEXT_INFO|MNT_EXTRACT_METHOD','LP_CARD_TEXT_INFO|RIDGE_COLOR'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis=this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}

LPCardEditPage.prototype.getComboData=function(data)
{
	data = eval('(' + data + ')');
	this.isNamelessCorpse.setComboData(data['lp_card_text_info|is_nameless_corpse']);	
	this.mntExtractMethod.setComboData(data['lp_card_text_info|mnt_extract_method']);	
	this.ridgeColor.setComboData(data['lp_card_text_info|ridge_color']);	
	this.ridgeColor.setText(this.ridgeColorDefault);
}

LPCardEditPage.prototype.getLPCardObject = function()
{	
	var newObj = {};
	$.extend(newObj,this.oldObj);
	if(this.oldObj == null)
	{
		this.oldObj = {};
	}
	if(WebUtil.isNull(this.oldObj.lpCardText))
	{
		this.oldObj.lpCardText = {};		
	}
	this.oldObj.lpCardText.isNamelessCorpse=this.isNamelessCorpse.getValue();
	this.oldObj.lpCardText.namelessCorpseId=this.namelessCorpseId.getValue();
	this.oldObj.lpCardText.leftLocation=this.leftLocation.getValue();
	this.oldObj.lpCardText.startFgp=this.startFgp.getValue();
	this.oldObj.lpCardText.endFgp=this.endFgp.getValue();
	this.oldObj.lpCardText.mntExtractMethod=this.mntExtractMethod.getValue();
	this.oldObj.lpCardText.ridgeColor=this.ridgeColor.getValue()==""?this.ridgeColorDefault:this.ridgeColor.getValue();
	this.oldObj.lpCardText.senderId=this.senderId.getValue();
	this.oldObj.lpCardText.candFgps=this.getCandFgpsData();
	this.oldObj.lpCardText.comments = this.comments.getValue();
    newObj.lpCardText=this.oldObj.lpCardText;
	if(WebUtil.isNull(this.oldObj.lpCardInfo))
	{
		this.oldObj.lpCardInfo = {};		
	}

	if(this.mode == LPTxtMode.SCAN)
	{
		newObj.enrollInfo={};
		newObj.enrollInfo.iniEnrollUser 	= this.iniEnrollUser.getValue();
		newObj.enrollInfo.iniEnrollUnitCode = this.iniEnrollUnitCode.getValue();
		
		newObj.lpCardInfo={};
		newObj.lpCardInfo.cardNum 	= this.cardNum.getValue();
		newObj.lpCardInfo.seqNo 	= this.seqNo.getValue();
		newObj.lpCardInfo.bty 		= this.btyValue;
	}
	else
	{
		newObj.enrollInfo = null;
	}
	
	if(this.mode==LPTxtMode.EDIT)
	{
		//this.oldObj.lpCardInfo.comments=this.comments.getValue();
	    //newObj.lpCardInfo=this.oldObj.lpCardInfo; 
	}
	return newObj;
}

LPCardEditPage.prototype.setLPCardObject = function(obj)
{
	this.srcCardObj = new Array();
	this.oldObj 	= obj;
	var textArray	= this.crolArray["lpCardText"];
	var infoArray 	= this.crolArray["lpCardInfo"];
	var enrollArray	= this.crolArray["enrollInfo"];
	if(obj["lpCardInfo"]!=null)
	{
		for(var i=0;i<infoArray.length;i++)
		{
			var contral=infoArray[i];	
			var id=contral.getId();
			var value=obj["lpCardInfo"][id];
			this.srcCardObj[id]=value;	
			contral.setText(value);
		}
		this.setBty(obj["lpCardInfo"].bty,obj["lpCardInfo"].btyText)
	}
	else
	{
		for(var i=0;i<infoArray.length;i++)
		{
			var contral=infoArray[i];	
			var id		= contral.getId();
			this.srcCardObj[id]="";	
			contral.setText("");
		}
	}
	if(obj["lpCardText"]!=null)
	{
		for(var i=0;i<textArray.length;i++)
		{
			var contral	= textArray[i];	
		    var id		= contral.getId();
		    var value	= obj["lpCardText"][id];	  
		    this.srcCardObj[id]=value;		
		    contral.setText(value);
		}
		
		if(obj["lpCardText"]['candFgps']!=null&&obj["lpCardText"]['candFgps']!="")
		{
			this.srcCardObj['candFgps']=obj["lpCardText"]['candFgps'];
			this.setCandFgpsData(obj["lpCardText"]['candFgps']);
		}
		else
		{
			this.srcCardObj['candFgps']=this.defaultFgps;
		}
	}
	else
	{
		for(var i=0;i<textArray.length;i++)
		{
			var contral	= textArray[i];	
			var id		= contral.getId();
			this.srcCardObj[id]="";	
		    contral.setText("");
		}
	}

	if(obj["enrollInfo"]!=null)
	{
		for(var i=0;i<enrollArray.length;i++)
		{
			var contral=enrollArray[i];	
			var id=contral.getId();
			var value=obj["enrollInfo"][id];
			this.srcCardObj[id]=value;	
			contral.setText(value);
		}
	}
	else
	{
		for(var i=0;i<enrollArray.length;i++)
		{
			var contral=enrollArray[i];	
			var id=contral.getId();
			this.srcCardObj[id]="";	
			contral.setText("");
		}
	}
	this.Txtchange();
}
LPCardEditPage.prototype.update = function(field)
{	
	for(var i=0;i<this.crolArray.length;i++)
		{
		     var contral=crolArray[i];	
		     var id=contral.getId();
		     //禁止更新项验证
		     var forbidden = WebArrayUtil.containsToIgnoreCase(field,id);
		     if(!forbidden)
		    	 contral.setEditable(false);
		}
}

LPCardEditPage.prototype.isChanged=function(src,des)
{
	if(src==null&&des=="")
	{
		return false;
	}
	else if(src==des)
	{
		return false;
	}
	else
	{
		return true;
	}
}

LPCardEditPage.prototype.clear = function()
{
	this.old = null;
	this.isNamelessCorpse.clear();
	this.namelessCorpseId.clear();
	this.leftLocation.clear();
	this.startFgp.clear();
	this.endFgp.clear();
	this.mntExtractMethod.clear();
	this.ridgeColor.clear();
	this.senderId.clear();
	this.comments.clear();
	this.candFgps.setAllSelected(false);
}

LPCardEditPage.prototype.setValidateColumns = function()
{
	var commentsparam={};	
	commentsparam.maxlength= 100;
	this.comments.setValidateType(commentsparam);	
	this.comments.setErrorTip("lpcardInfo_comments_tip");
	var namelessCorpseIdparam={};	
	namelessCorpseIdparam.maxlength= 32;
	this.namelessCorpseId.setValidateType(namelessCorpseIdparam);	
	this.namelessCorpseId.setErrorTip("lpcardText_namelessCorpseId_tip");
	var leftLocationparam={};	
	leftLocationparam.maxlength= 30;
	this.leftLocation.setValidateType(leftLocationparam);	
	this.leftLocation.setErrorTip("lpcardText_leftLocation_tip");
	var startFgpparam={};	
	startFgpparam.maxlength= 2;
	startFgpparam.isdigital= true;
	this.startFgp.setValidateType(startFgpparam);	
	this.startFgp.setErrorTip("lpcardText_startFgp_tip");
	var endFgpparam={};	
	endFgpparam.maxlength= 2;
	endFgpparam.isdigital= true;
	this.endFgp.setValidateType(endFgpparam);	
	this.endFgp.setErrorTip("lpcardText_endFgp_tip");

}

//是否通过了长度验证，既页面中存在红色字体提示长度不符合时不予保存
LPCardEditPage.prototype.isPassLenValidate = function()
{
	for(var parent in this.crolArray)
	{
		for( var name in this.crolArray[parent])
		{
			var contro = this.crolArray[parent][name];	
			var tip = contro.getErrorTip();
			if(tip == null) 	
			{
				continue;
			}
			var errorinfo = contro.getErrorTip().html()
			if(!WebUtil.isEmpty(errorinfo)){
				return false;
			}
		}
	}
	return true;
}

//是否通过了验证，包括长度验证和必填项验证
LPCardEditPage.prototype.isPassValidate	= function()
{
	return this.isPassLenValidate() && this.validateRequired();
}
//指纹 掌纹 checkbox数据
var AbisCheckData = {}
AbisCheckData.candFgps = [{
						id: "0",
						text: AbisMessageResource.FingerPosition['RightThumb'],
						enabled: true
					}, {
						id: "1",
						text: AbisMessageResource.FingerPosition['RightIndex'],
						enabled: true
					}, {
						id: "2",
						text: AbisMessageResource.FingerPosition['RightMiddle'],
						enabled: true
					}, {
						id: "3",
						text: AbisMessageResource.FingerPosition['RightRing'],
						enabled: true
					}, {
						id: "4",
						text: AbisMessageResource.FingerPosition['RightLittle'],
						enabled: true
					}, {
						id: "5",
						text: AbisMessageResource.FingerPosition['LeftThumb'],
						enabled: true
					}, {
						id: "6",
						text: AbisMessageResource.FingerPosition['LeftIndex'],
						enabled: true
					}, {
						id: "7",
						text: AbisMessageResource.FingerPosition['LeftMiddle'],
						enabled: true
					}, {
						id: "8",
						text: AbisMessageResource.FingerPosition['LeftRing'],
						enabled: true
					}, {
						id: "9",
						text: AbisMessageResource.FingerPosition['LeftLittle'],
						enabled: true
					}];
AbisCheckData.candFgps_zw = [{
						id: "0",
						text: AbisMessageResource.FingerPosition['RightPalm'],
						enabled: true
					}, {
						id: "1",
						text: AbisMessageResource.FingerPosition['LeftPalm'],
						enabled: true
					}, {
						id: "2",
						text: AbisMessageResource.FingerPosition['LeftFourFingers'],
						enabled: true
					}, {
						id: "3",
						text: AbisMessageResource.FingerPosition['RightFourFingers'],
						enabled: true
					}];