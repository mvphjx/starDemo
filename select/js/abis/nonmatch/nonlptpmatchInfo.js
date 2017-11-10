/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddNonLPTPMatch(requiredField,updateField)
{	
	this.crolArray=new Array();
	this.requiredField=requiredField;
	this.updateField=updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#AddNonLPTPMatch").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
     );
}
var tpbtyId;
var tpfgpId;
AddNonLPTPMatch.prototype.init = function()
{
	//必填项
	this.requiredMap=new Array();
	//更新项
	this.updateMap=new Array();
	this.changeField={};
	// 卡片文本信息
	var textArray1=new Array();
	
	//现场卡片1						
//	this.lp_card_numId			 	= WebUI.createText("lp_card_numId","CARD_NUM1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.lp_card_numId);
//	this.btyId 					= WebUI.createText("btyId","BTY","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.btyId);
//	this.hasTpMatchId				= WebUI.createText("hasTpMatchId","HAS_TP_MATCH","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.hasTpMatchId);
//	this.isNamelessCorpseId		= WebUI.createText("isNamelessCorpseId","IS_NAMELESS_CORPSE","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.isNamelessCorpseId);
//	this.startFgpId 				= WebUI.createText("startFgpId","START_FGP","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.startFgpId);
//	this.endFgpId 					= WebUI.createText("endFgpId","END_FGP","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.endFgpId);
//	this.leftLocationId 			= WebUI.createText("leftLocationId","LEFT_LOCATION","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.leftLocationId);
//	this.ridge_colorId 			= WebUI.createText("ridge_colorId","RIDGE_COLOR","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.ridge_colorId);
//	this.createUserId 				= WebUI.createText("createUserId","CREATE_USER","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.createUserId);
//	this.createTimeId 				= WebUI.createText("createTimeId","CREATE_TIME","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.createTimeId);
//	this.updateUserId 				= WebUI.createText("updateUserId","UPDATE_USER","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.updateUserId);
//	this.updateTimeId 				= WebUI.createText("updateTimeId","UPDATE_TIME","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.updateTimeId);
//	this.crolArray["lpcard1"] = textArray1;	
	
	var textArray2=new Array();
	//WebUI.createCombo("mainInfo_iniEnrollType","iniEnrollType",null,null,true,false,"MIS_PERSON|INI_ENROLL_TYPE","",this.requiredField);
	tpbtyId					= WebUI.createCombo("tpbtyId","TPBTY",null,null,true,false,"TP_LOBS|BTY","",this.requiredField);
	this.initMap(textArray2,tpbtyId);
	tpfgpId					= WebUI.createCombo("tpfgpId","TPFGP",null,null,true,false,"TP_LOBS|FGP","",this.requiredField);
	this.initMap(textArray2,tpfgpId);
	
	//卡片2	
//	this.personId			 	= WebUI.createText("personId","PERSON_NUM","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.personId);
//	this.personType 			= WebUI.createText("personType","PERSON_TYPE","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.personType);
//	this.cardNum				= WebUI.createText("cardNum","CARD_NUM2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.cardNum);
//	this.printBy				= WebUI.createText("printBy","PRINT_BY","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.printBy);
//	this.name					= WebUI.createText("name","NAME","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.name);
//	this.alias				= WebUI.createText("alias","ALIAS","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.alias);
//	this.birthdate 			= WebUI.createText("birthdate","BIRTH_DATE","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.birthdate);
//	this.sexCode 				= WebUI.createText("sexCode","SEX_CODE","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.sexCode);
//	this.nation 				= WebUI.createText("nation","NATION","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.nation);
//	this.nationality 			= WebUI.createText("nationality","NATIONALITY","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.nationality);
//	this.shenfenId 			= WebUI.createText("shenfenId","SHENFEN_ID","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.shenfenId);
//	this.namePinYin			= WebUI.createText("namePinYin","NAME_PINYIN","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.namePinYin);
//	this.politicalAffiliation 	= WebUI.createText("politicalAffiliation","POLITICAL_AFFILIATION","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.politicalAffiliation);
//	this.religiousFaith 		= WebUI.createText("religiousFaith","RELIGIOUS_FAITH","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.religiousFaith);
//	this.maritalStatus 		= WebUI.createText("maritalStatus","MARITAL_STATUS","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.maritalStatus);
//	this.highestEdu 			= WebUI.createText("highestEdu","HIGHEST_EDU_DEGREE","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.highestEdu);
//	this.militartSvrStatus 	= WebUI.createText("militartSvrStatus","MILITARY_SERVICE_STATUS","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.militartSvrStatus);
	this.crolArray["tpcard2"] = textArray2;	
	
	//$("#BTY1").setEditable(false);
//	$("#CARD_NUM1").attr({"disabled":"disabled"});
//	$("#BTY").attr({"disabled":"disabled"});
//	$("#HAS_TP_MATCH").attr({"disabled":"disabled"});
//	$("#IS_NAMELESS_CORPSE").attr({"disabled":"disabled"});
//	$("#START_FGP").attr({"disabled":"disabled"});
//	$("#END_FGP").attr({"disabled":"disabled"});
//	$("#LEFT_LOCATION").attr({"disabled":"disabled"});
//	$("#RIDGE_COLOR").attr({"disabled":"disabled"});
//	$("#CREATE_USER").attr({"disabled":"disabled"});
//	$("#CREATE_TIME").attr({"disabled":"disabled"});
//	$("#UPDATE_USER").attr({"disabled":"disabled"});
//	$("#UPDATE_TIME").attr({"disabled":"disabled"});
//	
//	$("#PERSON_NUM").attr({"disabled":"disabled"});
//	$("#PERSON_TYPE").attr({"disabled":"disabled"});
//	$("#CARD_NUM2").attr({"disabled":"disabled"});
//	$("#PRINT_BY").attr({"disabled":"disabled"});
//	$("#NAME").attr({"disabled":"disabled"});
//	$("#ALIAS").attr({"disabled":"disabled"});
//	$("#BIRTH_DATE").attr({"disabled":"disabled"});
//	$("#SEX_CODE").attr({"disabled":"disabled"});
//	$("#NATION").attr({"disabled":"disabled"});
//	$("#NATIONALITY").attr({"disabled":"disabled"});
//	$("#SHENFEN_ID").attr({"disabled":"disabled"});
//	$("#NAME_PINYIN").attr({"disabled":"disabled"});
//	$("#POLITICAL_AFFILIATION").attr({"disabled":"disabled"});
//	$("#RELIGIOUS_FAITH").attr({"disabled":"disabled"});
//	$("#MARITAL_STATUS").attr({"disabled":"disabled"});
//	$("#HIGHEST_EDU_DEGREE").attr({"disabled":"disabled"});
//	$("#MILITARY_SERVICE_STATUS").attr({"disabled":"disabled"});
	
	this.initComboData();
	
}

AddNonLPTPMatch.prototype.setRows1 = function(rows,searchStr)
{
	//$("#lp_card_numId1").html(ROWS[0].CARD_NUM);//BTY,ID,HAS_TP_MATCH,CREATE_TIME,CE_ID
	var url = WebVar.VarPath + "/lp/nonmatchlp/getCLPCard/" + rows[0].ID;
	coldata = "";
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
					var cardInfo = data.lpCardInfo;
					var cardText = data.lpCardText;
					$("#lp_card_numId").html(cardInfo.cardNum); 
					$("#btyId").html(cardInfo.btyText); 
					$("#hasTpMatchId").html(cardInfo.hasTpMatchText);
					$("#isNamelessCorpseId").html(cardText.isNamelessCorpseText);
					$("#startFgpId").html(cardText.startFgp);
					$("#endFgpId").html(cardText.endFgp);
					$("#leftLocationId").html(cardText.leftLocation);
					$("#ridge_colorId").html(cardText.ridgeColorText);
					$("#createUserId").html(cardInfo.createTime);
					$("#createTimeId").html(cardInfo.createUser);
					$("#updateUserId").html(cardInfo.updateUser);
					$("#updateTimeId").html(cardInfo.updateTime);
					
				}
			},   
			error : function(e) 
			{   
				alert(""+searchStr.QueryError+"!");
			}   
		}
	);
}

AddNonLPTPMatch.prototype.setRows2 = function(rows,searchStr)
{
	//$("#lp_card_numId1").html(ROWS[0].CARD_NUM);//BTY,ID,HAS_TP_MATCH,CREATE_TIME,CE_ID
	//$("#cardNum").html(rows[0].CARD_NUM);
	var url = WebVar.VarPath + "/tp/nonmatchperson/getCTPCard/" + rows[0].ID;
	coldata = "";
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
					var tpCardInfo = data.tpCardInfo;
					var basicInfo = data.basicInfo;
					if (!WebUtil.isNull(mainInfo)) 
					{
						$("#personId").html(mainInfo.personNum); 
						$("#personType").html(mainInfo.personTypeText); 
					}
					if (!WebUtil.isNull(tpCardInfo)) 
					{
						$("#cardNum").html(tpCardInfo.cardNum);
						$("#printBy").html(tpCardInfo.printBy);
					}
					if (!WebUtil.isNull(basicInfo)) 
					{
						$("#name").html(basicInfo.name);
						$("#alias").html(basicInfo.alias);
						$("#birthdate").html(basicInfo.birthDateText);
						$("#sexCode").html(basicInfo.sexCodeText);
						$("#nation").html(basicInfo.nationText);
						$("#nationality").html(basicInfo.nationalityText);
						$("#shenfenId").html(basicInfo.shenfenId);
						$("#namePinYin").html(basicInfo.namePinyin);
						$("#politicalAffiliation").html(basicInfo.politicalAffiliationText);
						$("#religiousFaith").html(basicInfo.religiousFaithText);
						$("#maritalStatus").html(basicInfo.maritalStatusText);
						$("#highestEdu").html(basicInfo.highestEduDegreeText);
						$("#militartSvrStatus").html(basicInfo.militaryServiceStatusText);
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

AddNonLPTPMatch.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddNonLPTPMatch.prototype.initComboData=function()
{
	var columnnames = ['TP_LOBS|BTY','TP_LOBS|FGP'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis=this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AddNonLPTPMatch.prototype.getComboData=function (data)
{
	data = eval('(' + data + ')');			
	tpbtyId.setComboData(data['tp_lobs|bty']);			
	tpfgpId.setComboData(data['tp_lobs|fgp']);
}

AddNonLPTPMatch.prototype.initMap = function(map,contro)
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
AddNonLPTPMatch.prototype.register = function(contro)
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
AddNonLPTPMatch.prototype.isTxtInfoChanged = function()
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
AddNonLPTPMatch.prototype.validateRequired = function()
{
	var flag = true;
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
AddNonLPTPMatch.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddNonLPTPMatch.prototype.update = function(field)
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

