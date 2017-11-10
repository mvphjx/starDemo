/**
 * 
 * @param requiredField 必填项
 * @param forbiddenUpdateField 禁止更新项
 * @returns
 */
function AddNonLPMatch(requiredField,updateField)
{	
	this.crolArray=new Array();
	this.requiredField=requiredField;
	this.updateField=updateField;
	this.init();	
	//this.update(updateField);	//现行阶段毙掉更新项
	//内嵌编辑页面时，需要对div滚动条增加事件，滚动时隐藏代码层
	var pageparent=$("#AddNonLPMatch").parent();
	pageparent.scroll(function()
	   {  		  
		  $(".newMenu").css('display','none');
       }
     );
}
AddNonLPMatch.prototype.init = function()
{
	//必填项
	this.requiredMap=new Array();
	//更新项
	this.updateMap=new Array();
	this.changeField={};
	// 卡片文本信息
	var textArray1=new Array();
	
	//现场卡片1						
//	this.lp_card_numId1			 	= WebUI.createText("lp_card_numId1","CARD_NUM1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.lp_card_numId1);
//	this.btyId1 					= WebUI.createText("btyId1","BTY1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.btyId1);
//	this.hasTpMatchId1 				= WebUI.createText("hasTpMatchId1","HAS_TP_MATCH1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.hasTpMatchId1);
//	this.isNamelessCorpseId1		= WebUI.createText("isNamelessCorpseId1","IS_NAMELESS_CORPSE1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.isNamelessCorpseId1);
//	this.startFgpId1 				= WebUI.createText("startFgpId1","START_FGP1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.startFgpId1);
//	this.endFgpId1 					= WebUI.createText("endFgpId1","END_FGP1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.endFgpId1);
//	this.leftLocationId1 			= WebUI.createText("leftLocationId1","LEFT_LOCATION1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.leftLocationId1);
//	this.ridge_colorId1 			= WebUI.createText("ridge_colorId1","RIDGE_COLOR1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.ridge_colorId1);
//	this.createUserId1 				= WebUI.createText("createUserId1","CREATE_USER1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.createUserId1);
//	this.createTimeId1 				= WebUI.createText("createTimeId1","CREATE_TIME1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.createTimeId1);
//	this.updateUserId1 				= WebUI.createText("updateUserId1","UPDATE_USER1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.updateUserId1);
//	this.updateTimeId1 				= WebUI.createText("updateTimeId1","UPDATE_TIME1","WebTextField","",this.requiredField);
//	this.initMap(textArray1,this.updateTimeId1);
//	this.crolArray["lpcard1"] = textArray1;	
//	
//	var textArray2=new Array();
//	//现场卡片2	
//	this.lp_card_numId2			 	= WebUI.createText("lp_card_numId2","CARD_NUM2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.lp_card_numId2);
//	this.btyId2 					= WebUI.createText("btyId2","BTY2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.btyId2);
//	this.hasTpMatchId2 				= WebUI.createText("hasTpMatchId2","HAS_TP_MATCH2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.hasTpMatchId2);
//	this.isNamelessCorpseId2		= WebUI.createText("isNamelessCorpseId2","IS_NAMELESS_CORPSE2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.isNamelessCorpseId2);
//	this.startFgpId2 				= WebUI.createText("startFgpId2","START_FGP2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.startFgpId2);
//	this.endFgpId2 					= WebUI.createText("endFgpId2","END_FGP2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.endFgpId2);
//	this.leftLocationId2 			= WebUI.createText("leftLocationId2","LEFT_LOCATION2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.leftLocationId2);
//	this.ridge_colorId2 			= WebUI.createText("ridge_colorId2","RIDGE_COLOR2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.ridge_colorId2);
//	this.createUserId2 				= WebUI.createText("createUserId2","CREATE_USER2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.createUserId2);
//	this.createTimeId2 				= WebUI.createText("createTimeId2","CREATE_TIME2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.createTimeId2);
//	this.updateUserId2 				= WebUI.createText("updateUserId2","UPDATE_USER2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.updateUserId2);
//	this.updateTimeId2 				= WebUI.createText("updateTimeId2","UPDATE_TIME2","WebTextField","",this.requiredField);
//	this.initMap(textArray2,this.updateTimeId2);
//	this.crolArray["lpcard2"] = textArray2;	
	
	//$("#BTY1").setEditable(false);
//	$("#CARD_NUM1").attr({"disabled":"disabled"});
//	$("#BTY1").attr({"disabled":"disabled"});
//	$("#HAS_TP_MATCH1").attr({"disabled":"disabled"});
//	$("#IS_NAMELESS_CORPSE1").attr({"disabled":"disabled"});
//	$("#START_FGP1").attr({"disabled":"disabled"});
//	$("#END_FGP1").attr({"disabled":"disabled"});
//	$("#LEFT_LOCATION1").attr({"disabled":"disabled"});
//	$("#RIDGE_COLOR1").attr({"disabled":"disabled"});
//	$("#CREATE_USER1").attr({"disabled":"disabled"});
//	$("#CREATE_TIME1").attr({"disabled":"disabled"});
//	$("#UPDATE_USER1").attr({"disabled":"disabled"});
//	$("#UPDATE_TIME1").attr({"disabled":"disabled"});
//	
//	$("#CARD_NUM2").attr({"disabled":"disabled"});
//	$("#BTY2").attr({"disabled":"disabled"});
//	$("#HAS_TP_MATCH2").attr({"disabled":"disabled"});
//	$("#IS_NAMELESS_CORPSE2").attr({"disabled":"disabled"});
//	$("#START_FGP2").attr({"disabled":"disabled"});
//	$("#END_FGP2").attr({"disabled":"disabled"});
//	$("#LEFT_LOCATION2").attr({"disabled":"disabled"});
//	$("#RIDGE_COLOR2").attr({"disabled":"disabled"});
//	$("#CREATE_USER2").attr({"disabled":"disabled"});
//	$("#CREATE_TIME2").attr({"disabled":"disabled"});
//	$("#UPDATE_USER2").attr({"disabled":"disabled"});
//	$("#UPDATE_TIME2").attr({"disabled":"disabled"});
	
}

AddNonLPMatch.prototype.setRows1 = function(rows,nonlpmatch)
{
	//$("#lp_card_numId1").html(ROWS[0].CARD_NUM);//BTY,ID,HAS_TP_MATCH,CREATE_TIME,CE_ID
	//$("#CARD_NUM1").val(rows[0].CARD_NUM); 
	$("#lp_card_numId1").html(rows[0].CARD_NUM);
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
					if (!WebUtil.isNull(cardInfo)) 
					{
						$("#btyId1").html(cardInfo.btyText); 
						$("#hasTpMatchId1").html(cardInfo.hasTpMatchText);
						$("#createUserId1").html(cardInfo.createTime);
						$("#createTimeId1").html(cardInfo.createUser);
						$("#updateUserId1").html(cardInfo.updateUser);
						$("#updateTimeId1").html(cardInfo.updateTime);
					}
					if (!WebUtil.isNull(cardText)) 
					{
						$("#isNamelessCorpseId1").html(cardText.isNamelessCorpseText);
						$("#startFgpId1").html(cardText.startFgp);
						$("#endFgpId1").html(cardText.endFgp);
						$("#leftLocationId1").html(cardText.leftLocation);
						$("#ridge_colorId1").html(cardText.ridgeColorText);
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

AddNonLPMatch.prototype.setRows2 = function(rows,nonlpmatch)
{
	//$("#lp_card_numId1").html(ROWS[0].CARD_NUM);//BTY,ID,HAS_TP_MATCH,CREATE_TIME,CE_ID
	//$("#CARD_NUM2").val(rows[0].CARD_NUM);
	$("#lp_card_numId2").html(rows[0].CARD_NUM);
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
					if (!WebUtil.isNull(cardInfo)) 
					{
						$("#btyId2").html(cardInfo.btyText); 
						$("#hasTpMatchId2").html(cardInfo.hasTpMatchText);
						$("#createUserId2").html(cardInfo.createTime);
						$("#createTimeId2").html(cardInfo.createUser);
						$("#updateUserId2").html(cardInfo.updateUser);
						$("#updateTimeId2").html(cardInfo.updateTime);
					}
					if (!WebUtil.isNull(cardText)) 
					{
						$("#isNamelessCorpseId2").html(cardText.isNamelessCorpseText);
						$("#startFgpId2").html(cardText.startFgp);
						$("#endFgpId2").html(cardText.endFgp);
						$("#leftLocationId2").html(cardText.leftLocation);
						$("#ridge_colorId2").html(cardText.ridgeColorText);
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



AddNonLPMatch.prototype.initMap = function(map,contro)
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
AddNonLPMatch.prototype.register = function(contro)
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
AddNonLPMatch.prototype.isTxtInfoChanged = function()
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
AddNonLPMatch.prototype.validateRequired = function()
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
AddNonLPMatch.prototype.registerChangeListener = function(listener)
{
	this.changeListener = listener;
}
AddNonLPMatch.prototype.update = function(field)
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

