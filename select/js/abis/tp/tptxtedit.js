
TPTxtEdit.prototype.cardId		= null;
TPTxtEdit.prototype.tpTxtWidget = null;
TPTxtEdit.prototype.colLens		= null;
TPTxtEdit.prototype.tblStruct	= null;
TPTxtEdit.prototype.requried	= null;
TPTxtEdit.prototype.update		= null;
TPTxtEdit.prototype.isFinish	= false;


function TPTxtEdit(cardId,colLens,tblStruct,requried,update)
{
	this.cardId 	= cardId;
	this.colLens 	= colLens;
	this.tblStruct	= tblStruct;
	this.requried	= requried;
	this.update		= update;
	this.init();
}

TPTxtEdit.prototype.init = function()
{
	this.tpTxtWidget = new TPCardEditPage(this.requried,this.update,null,TPTxtMode.EDIT);
	this.tpTxtWidget.registerChangeListener(txtChange);
	this.tpTxtWidget.setTableData(this.tblStruct);
	
	if(this.colLens != null)
	{
		this.tpTxtWidget.setValidateColumns(this.colLens);
	}
	
	var nThis = this;
	function txtChange(id, value, data) 
	{
		var txtChanged = nThis.tpTxtWidget.isTxtInfoChanged();
		var v = nThis.tpTxtWidget.isPassValidate();
		var canSave = txtChanged && v;
		nThis.saveBnt.setEnabled(canSave);
	}
	
	this.saveBnt = WebUI.createWebButton("save",WebUI.BntType.B_100_28,"",saveFunc);
	this.saveBnt.setEnabled(false);
	
	function saveFunc()
	{
		WebUtil.Wait();
		var bzoObj 				= nThis.tpTxtWidget.getTPCardObject();
		var tpCard 				= bzoObj.card;
		var editData = {};
		editData.cardObj 		= tpCard;
		editData.delAddrList 	= bzoObj.delAddrList;
		editData.delCertList 	= bzoObj.delCertList;
		editData.delCommList 	= bzoObj.delCommList;
		editData.delPhoneList 	= bzoObj.delPhoneList;

		var jData = $.toJSON(editData);
		var url = WebVar.VarPath + "/tp/edit/save";
		jQuery.ajax({
			type : 'POST',
			contentType : 'application/json',
			dataType : 'json',
			url : url,
			data : jData,
			success : function(data) 
			{
				WebUtil.NoWait();
				nThis.saveBnt.setEnabled(false);
				nThis.openCard(tpCard.mainInfo.id);
				alert(AbisMessageResource['SaveSuccess']);
			},
			error : function(e) 
			{
				alert(e);
			}
		});
	}
	
	if(this.cardId != null)
	{
		this.openCard(this.cardId);
	}
}


TPTxtEdit.prototype.openCard = function(cardId) 
{
	var nThis = this;
	this.cardId = cardId;
	if (this.cardObj != null) 
	{
		var id = this.cardObj.mainInfo.id;
		if (id == this.cardId) 
		{
			return;
		}
	}
	var url = WebVar.VarPath + "/tp/edit/" + this.cardId;
	WebUtil.Wait();
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : null,
		dataType : 'json',
		timeout : WebVar.TimeOut,
		success : function(data) 
		{
			WebUtil.NoWait();
			if (data != null) 
			{
				if(data.status===WebCode.WebResultStatus.ok){
                    nThis.cardObj = data.data.cardObj;
                    if (nThis.cardObj != null)
                    {
                        nThis.tpTxtWidget.setTPCardObject(nThis.cardObj);
                        var isFinish = nThis.tpTxtWidget.isPassValidate();
                        nThis.saveBnt.setEnabled(isFinish);
                    }
				}else{
                    DialogUtil.openSimpleDialogForOcx(data.msg);
				}

			}
		},
		error : function(e, status, error) 
		{
			if (status == "timeout") 
			{
				alert(AbisMessageResource["ConnectTimeOut"]);
			}
		}
	});

}