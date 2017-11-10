
function LPCaseInput(requriedCol,updateCol,defValue,colLens)
{
	this.requriedCol	= requriedCol;
	this.updateCol		= updateCol;
	this.defValue		= defValue;
	this.colLens		= colLens;
	this.init();
}

LPCaseInput.prototype.init = function()
{
	this.txtWidget = new LPCaseEditPage(this.requriedCol,this.updateCol,this.defValue,LPTxtMode.EDIT);
	this.txtWidget.registerChangeListener(txtChange);
	
	if(this.colLens != null)
	{
		this.txtWidget.setValidateColumns(this.colLens);
	}
	
	var nThis = this;
	function txtChange(id,value,data)
	{
		var txtChange = nThis.txtWidget.isTxtInfoChanged();
		var txtFinish = nThis.txtWidget.validateRequired();
	}
	
	// 保存按钮
	this.open		= WebUI.createWebButton("open",WebUI.BntType.B_100_28,"",open);
	this.scanBnt1 	= WebUI.createWebButton("submit1",WebUI.BntType.B_100_28,"",callBack);
	this.scanBnt2 	= WebUI.createWebButton("submit2",WebUI.BntType.B_100_28,"",callBack);
	
	function open()
	{
		nThis.openCaseWindow();
	}
	
	function callBack()
	{
		nThis.save();
	}
}

LPCaseInput.prototype.openCaseWindow = function()
{
	if (this.window == null) 
	{
		this.window = ABISWindowUtil.openLPCase("lpcase", null, null,invoke, false, CaseEventCol.CREATE_TIME, WebTable.DES);
	} 
	else 
	{
//		this.window.setData({dbidMask : this.dbidMask});
		this.window.open();
	}

	var nThis = this;
	function invoke(rows) 
	{
		if (!WebUtil.isEmpty(rows)) 
		{
			var result = rows[0];
			nThis.openCase(rows);
		}
	}
}

LPCaseInput.prototype.openCase = function(rows)
{
	var nThis = this;
	if(!WebUtil.isEmpty(rows))
	{
		WebUtil.Wait();
		var result = rows[0];
		this.caseId = result.ID;
		var url = WebVar.VarPath + "/lp/lpinputedit/get/" + this.caseId;
		jQuery.ajax
		( 
	        {
				type 		: 'POST',
				contentType : 'application/json',
				url 		: url,
				data 		: null,
				dataType 	: 'json',
				timeout		: WebVar.TimeOut,
				success 	: function(data) 
				{   
					WebUtil.NoWait();
					if(data.status == "ok")
					{
						var caseObj = data.data;
						nThis.txtWidget.setLPCaseObject(caseObj);
						nThis.txtWidget.initUIStatus(LPTxtMode.EDIT);
					}
					else
					{
						DialogUtil.openSimpleDialog(data.msg);
					}
				},   
				error : function(e,status,error) 
				{   
					WebUtil.NoWait();
					if(status == "timeout")
					{
						DialogUtil.openSimpleDialog(nThis.language.SvrNoResponse);
					}	
				}   
			}
		);
	}
}

LPCaseInput.prototype.save = function()
{
	if(!this.checkSave())return;
	
	WebUtil.Wait();
	
	var caseTxt = this.txtWidget.getLPCaseObject();
	var url = WebVar.VarPath + "/lp/lpinputedit/save";
	var jsonData = $.toJSON(caseTxt);
	
	
	var nThis = this;
	$.ajax
	( 
        {
			type 		: 'POST',
			contentType : 'application/json',
			url 		: url,
			data 		: jsonData,
			dataType 	: 'json',
			success 	: function(data) 
			{   
				WebUtil.NoWait();
				
				if(data.status == "ok")
				{
					DialogUtil.openSimpleDialog(data.msg);
					nThis.txtWidget.reSet();
					nThis.txtWidget.initUIStatus(LPTxtMode.INPUT);
				}
				else
				{
					DialogUtil.openSimpleDialog(data.msg);
				}
			},   
			error : function(e) 
			{
				WebUtil.NoWait();
			}
		}
	);
}


LPCaseInput.prototype.checkSave = function()
{
	//检查必填项
	var b = this.txtWidget.isPassValidate();
	if(!b)
	{
		DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert.IncompleteErrorInfo);
		return false;
	}
	return true;
}