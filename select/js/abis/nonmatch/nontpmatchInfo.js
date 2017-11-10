/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddNonTPMatch(requiredField,updateField)
{	
	this.crolArray=new Array();
	this.requiredField=requiredField;
	this.updateField=updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#AddNonTPMatch").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
     );
}
var tpbtyId1;
var tpfgpId1;
var tpbtyId2;
var tpfgpId2;
AddNonTPMatch.prototype.init = function()
{
	//必填项
	this.requiredMap=new Array();
	//更新项
	this.updateMap=new Array();
	this.changeField={};
	// 卡片文本信息
	var textArray1=new Array();
	
	//卡片1						
//	this.personId1			 	= WebUI.createText("personId1","PERSON_NUM1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.personId1);
//	this.personType1 				= WebUI.createText("personType1","PERSON_TYPE1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.personType1);
//	this.cardNum1 				= WebUI.createText("cardNum1","CARD_NUM1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.cardNum1);
//	this.printBy1				= WebUI.createText("printBy1","PRINT_BY1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.printBy1);
//	this.name1 					= WebUI.createText("name1","NAME1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.name1);
//	this.alias1 				= WebUI.createText("alias1","ALIAS1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.alias1);
//	this.birthdate1 			= WebUI.createText("birthdate1","BIRTH_DATE1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.birthdate1);
//	this.sexCode1 				= WebUI.createText("sexCode1","SEX_CODE1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.sexCode1);
//	this.nation1 				= WebUI.createText("nation1","NATION1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.nation1);
//	this.nationality1 			= WebUI.createText("nationality1","NATIONALITY1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.nationality1);
//	this.shenfenId1 			= WebUI.createText("shenfenId1","SHENFEN_ID1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.shenfenId1);
//	this.namePinYin1 			= WebUI.createText("namePinYin1","NAME_PINYIN1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.namePinYin1);
//	this.politicalAffiliation1 	= WebUI.createText("politicalAffiliation1","POLITICAL_AFFILIATION1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.politicalAffiliation1);
//	this.religiousFaith1 		= WebUI.createText("religiousFaith1","RELIGIOUS_FAITH1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.religiousFaith1);
//	this.maritalStatus1 		= WebUI.createText("maritalStatus1","MARITAL_STATUS1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.maritalStatus1);
//	this.highestEdu1 			= WebUI.createText("highestEdu1","HIGHEST_EDU_DEGREE1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.highestEdu1);
//	this.militartSvrStatus1 	= WebUI.createText("militartSvrStatus1","MILITARY_SERVICE_STATUS1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.militartSvrStatus1);
	
	tpbtyId1					= WebUI.createCombo("tpbtyId1","TPBTY1",null,null,true,false,"TP_LOBS|BTY","",this.requiredField);
	this.initMap(textArray1,tpbtyId1);
	//tpfgpId1					= WebUI.createCombo("tpfgpId1","TPFGP1",null,null,true,false,"TP_LOBS|FGP","",this.requiredField);
	//this.initMap(textArray1,tpfgpId1);
	this.crolArray["tpcard1"] = textArray1;	
	
	var textArray2=new Array();
	//卡片2	
//	this.personId2			 	= WebUI.createText("personId2","PERSON_NUM2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.personId2);
//	this.personType2 			= WebUI.createText("personType2","PERSON_TYPE2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.personType2);
//	this.cardNum2 				= WebUI.createText("cardNum2","CARD_NUM2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.cardNum2);
//	this.printBy2				= WebUI.createText("printBy2","PRINT_BY2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.printBy2);
//	this.name2 					= WebUI.createText("name2","NAME2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.name2);
//	this.alias2 				= WebUI.createText("alias2","ALIAS2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.alias2);
//	this.birthdate2 			= WebUI.createText("birthdate2","BIRTH_DATE2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.birthdate2);
//	this.sexCode2 				= WebUI.createText("sexCode2","SEX_CODE2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.sexCode2);
//	this.nation2 				= WebUI.createText("nation2","NATION2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.nation2);
//	this.nationality2 			= WebUI.createText("nationality2","NATIONALITY2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.nationality2);
//	this.shenfenId2 			= WebUI.createText("shenfenId2","SHENFEN_ID2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.shenfenId2);
//	this.namePinYin2 			= WebUI.createText("namePinYin2","NAME_PINYIN2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.namePinYin2);
//	this.politicalAffiliation2 	= WebUI.createText("politicalAffiliation2","POLITICAL_AFFILIATION2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.politicalAffiliation2);
//	this.religiousFaith2 		= WebUI.createText("religiousFaith2","RELIGIOUS_FAITH2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.religiousFaith2);
//	this.maritalStatus2 		= WebUI.createText("maritalStatus2","MARITAL_STATUS2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.maritalStatus2);
//	this.highestEdu2 			= WebUI.createText("highestEdu2","HIGHEST_EDU_DEGREE2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.highestEdu2);
//	this.militartSvrStatus2 	= WebUI.createText("militartSvrStatus2","MILITARY_SERVICE_STATUS2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.militartSvrStatus2);
	
	tpbtyId2					= WebUI.createCombo("tpbtyId2","TPBTY2",null,null,true,false,"TP_LOBS|BTY","",this.requiredField);
	this.initMap(textArray2,tpbtyId2);
	//tpfgpId2					= WebUI.createCombo("tpfgpId2","TPFGP2",null,null,true,false,"TP_LOBS|FGP","",this.requiredField);
	//this.initMap(textArray2,tpfgpId2);
	this.crolArray["tpcard2"] = textArray2;	
	
//	$("#PERSON_NUM1").attr({"disabled":"disabled"});
//	$("#PERSON_TYPE1").attr({"disabled":"disabled"});
//	$("#CARD_NUM1").attr({"disabled":"disabled"});
//	$("#PRINT_BY1").attr({"disabled":"disabled"});
//	$("#NAME1").attr({"disabled":"disabled"});
//	$("#ALIAS1").attr({"disabled":"disabled"});
//	$("#BIRTH_DATE1").attr({"disabled":"disabled"});
//	$("#SEX_CODE1").attr({"disabled":"disabled"});
//	$("#NATION1").attr({"disabled":"disabled"});
//	$("#NATIONALITY1").attr({"disabled":"disabled"});
//	$("#SHENFEN_ID1").attr({"disabled":"disabled"});
//	$("#NAME_PINYIN1").attr({"disabled":"disabled"});
//	$("#POLITICAL_AFFILIATION1").attr({"disabled":"disabled"});
//	$("#RELIGIOUS_FAITH1").attr({"disabled":"disabled"});
//	$("#MARITAL_STATUS1").attr({"disabled":"disabled"});
//	$("#HIGHEST_EDU_DEGREE1").attr({"disabled":"disabled"});
//	$("#MILITARY_SERVICE_STATUS1").attr({"disabled":"disabled"});
//	
//	$("#PERSON_NUM2").attr({"disabled":"disabled"});
//	$("#PERSON_TYPE2").attr({"disabled":"disabled"});
//	$("#CARD_NUM2").attr({"disabled":"disabled"});
//	$("#PRINT_BY2").attr({"disabled":"disabled"});
//	$("#NAME2").attr({"disabled":"disabled"});
//	$("#ALIAS2").attr({"disabled":"disabled"});
//	$("#BIRTH_DATE2").attr({"disabled":"disabled"});
//	$("#SEX_CODE2").attr({"disabled":"disabled"});
//	$("#NATION2").attr({"disabled":"disabled"});
//	$("#NATIONALITY2").attr({"disabled":"disabled"});
//	$("#SHENFEN_ID2").attr({"disabled":"disabled"});
//	$("#NAME_PINYIN2").attr({"disabled":"disabled"});
//	$("#POLITICAL_AFFILIATION2").attr({"disabled":"disabled"});
//	$("#RELIGIOUS_FAITH2").attr({"disabled":"disabled"});
//	$("#MARITAL_STATUS2").attr({"disabled":"disabled"});
//	$("#HIGHEST_EDU_DEGREE2").attr({"disabled":"disabled"});
//	$("#MILITARY_SERVICE_STATUS2").attr({"disabled":"disabled"});
	
	this.initComboData();
}

AddNonTPMatch.prototype.setRows1 = function(rows,searchStr)
{
	//$("#lp_card_numId1").html(ROWS[0].CARD_NUM);//BTY,ID,HAS_TP_MATCH,CREATE_TIME,CE_ID
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
						$("#personId1").html(mainInfo.personNum); 
						$("#personType1").html(mainInfo.personTypeText); 
					}
					if (!WebUtil.isNull(tpCardInfo)) 
					{
						$("#cardNum1").html(tpCardInfo.cardNum);
						$("#printBy1").html(tpCardInfo.printBy);
					}
					if (!WebUtil.isNull(basicInfo)) 
					{
						$("#name1").html(basicInfo.name);
						$("#alias1").html(basicInfo.alias);
						$("#birthdate1").html(basicInfo.birthDateText);
						$("#sexCode1").html(basicInfo.sexCodeText);
						$("#nation1").html(basicInfo.nationText);
						$("#nationality1").html(basicInfo.nationalityText);
						$("#shenfenId1").html(basicInfo.shenfenId);
						$("#namePinYin1").html(basicInfo.namePinyin);
						$("#politicalAffiliation1").html(basicInfo.politicalAffiliationText);
						$("#religiousFaith1").html(basicInfo.religiousFaithText);
						$("#maritalStatus1").html(basicInfo.maritalStatusText);
						$("#highestEdu1").html(basicInfo.highestEduDegreeText);
						$("#militartSvrStatus1").html(basicInfo.militaryServiceStatusText);
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

AddNonTPMatch.prototype.setRows2 = function(rows)
{
	//$("#lp_card_numId1").html(ROWS[0].CARD_NUM);//BTY,ID,HAS_TP_MATCH,CREATE_TIME,CE_ID
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
						$("#personId2").html(mainInfo.personNum); 
						$("#personType2").html(mainInfo.personTypeText); 
					}
					if (!WebUtil.isNull(tpCardInfo)) 
					{
						$("#cardNum2").html(tpCardInfo.cardNum);
						$("#printBy2").html(tpCardInfo.printBy);
					}
					if (!WebUtil.isNull(basicInfo)) 
					{
						$("#name2").html(basicInfo.name);
						$("#alias2").html(basicInfo.alias);
						$("#birthdate2").html(basicInfo.birthDateText);
						$("#sexCode2").html(basicInfo.sexCodeText);
						$("#nation2").html(basicInfo.nationText);
						$("#nationality2").html(basicInfo.nationalityText);
						$("#shenfenId2").html(basicInfo.shenfenId);
						$("#namePinYin2").html(basicInfo.namePinyin);
						$("#politicalAffiliation2").html(basicInfo.politicalAffiliationText);
						$("#religiousFaith2").html(basicInfo.religiousFaithText);
						$("#maritalStatus2").html(basicInfo.maritalStatusText);
						$("#highestEdu2").html(basicInfo.highestEduDegreeText);
						$("#militartSvrStatus2").html(basicInfo.militaryServiceStatusText);
					}
				}
			},   
			error : function(e) 
			{   
				alert(AbisMessageResource.Alert['SearchError']);
			}   
		}
	);
}



AddNonTPMatch.prototype.initMap = function(map,contro)
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
AddNonTPMatch.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddNonTPMatch.prototype.initComboData=function()
{
	var columnnames = ['TP_LOBS|BTY','TP_LOBS|FGP'];	
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis=this;
    function getComboData(data)
    {
    	nthis.getComboData(data);
    }
}
AddNonTPMatch.prototype.getComboData=function (data)
{
	data = eval('(' + data + ')');			
	tpbtyId1.setComboData(data['tp_lobs|bty']);			
	//tpfgpId1.setComboData(data['tp_lobs|fgp']);
	tpbtyId2.setComboData(data['tp_lobs|bty']);			
	//tpfgpId2.setComboData(data['tp_lobs|fgp']);
}
AddNonTPMatch.prototype.register = function(contro)
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
AddNonTPMatch.prototype.isTxtInfoChanged = function()
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
AddNonTPMatch.prototype.validateRequired = function()
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
AddNonTPMatch.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddNonTPMatch.prototype.update = function(field)
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

