
var num = 1;
var sid;
var lpcardId;
var lpcardWindow;
var selNum;
var falg = "";
function LPCeGroup(id)
{
	this.id = id;
}

LPCeGroup.prototype.save = function()
{
	var caseIdList = new Array();
	for(var i = 1;i <= selNum;i++)
	{
		if($("#caseId"+i+"").html() != null && $("#caseId"+i+"").html() != "")
		{
			caseIdList.push($("#caseId"+i+"").html());
		}
	}
	var url = "";
	var reData = {};
	if(falg != null && falg != "")
	{
		reData.id = falg;
		url = WebVar.VarPath + "/lp/addcegroups/update";
	}
	else
	{
		reData.id = "";
		url = WebVar.VarPath + "/lp/addcegroups/save";
	}
	reData.list = caseIdList;
	var jData = $.toJSON(reData);
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jData,
		dataType : 'json',
		success : function(data) 
		{   
			window.location.reload();
		},   
		error : function(e) 
		{   
		}   
	});
}

LPCeGroup.prototype.add = function()
{
	sid = this.id;
	if(num > 8)
	{
		alert(AbisMessageResource["UpTo8"]);
		return;
	}
	selNum = num;
	if (lpcardWindow == null) 
	{
		lpcardWindow = ABISWindowUtil.openLPCase("lpcase", null, null,selectedLPCard, false, "CREATE_TIME",WebTable.DES);
	}
	else
	{
		lpcardWindow.setData({dbid:this.dbid});
		lpcardWindow.open();
	}
	num++;
}

function selectedLPCard(rows) 
{
	var url = WebVar.VarPath + "/tp/addwanted/getCLPCase/" + rows[0].ID;
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
					var basicInfo = data.basicInfo;
//					var breakInfo = data.breakInfo;
//					var acceptInfo = data.acceptInfo;
//					var registerInfo = data.registerInfo;
					var ceOccurDate="";
					if(basicInfo!=null&&basicInfo.ceOccurDate!=null){
						ceOccurDate = basicInfo.ceOccurDate;
					}

					var tdiv =  "<table class=\"stable\">" +
									"<tr class=\"ldtd\">" +
										"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseNum"] + "</td>" +
										"<td class=\"rdtd\">"+mainInfo.ceNum+"</td>" +
										"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseName"] + "</td>" +
										"<td class=\"rdtd\">"+mainInfo.ceName+"</td>" +
										"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseType"] + "</td>" +
										"<td class=\"rdtd\">"+mainInfo.ceTypeText+"</td>" +
										"<td class=\"ldtd\" style=\"float:right;\"><input type=\"button\" value=\""+ AbisMessageResource["Delete"] +"\" class=\"delBtn\" onclick=\"del(this);\"/></td>" +
									"</tr>" +
									"<tr class=\"ldtd\">" +
										"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseStatus"] + "</td>" +
										"<td class=\"rdtd\">"+mainInfo.ceStatusText+"</td>" +
										"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseOccurTime"] + "</td>" +
										"<td class=\"rdtd\">"+ceOccurDate+"</td>" +
										"<td style=\"display:none\" class=\"ldtd\">" + AbisMessageResource.Case["CaseSerialNum"] + "</td>" +
										"<td style=\"display:none\" class=\"rdtd\"><div id=\"caseId"+selNum+"\">"+mainInfo.id+"</div></td>" +
										"<td class=\"ldtd\"></td>" +
									"</tr>";
					$("#"+sid+"").append(tdiv); 
				}
			},   
			error : function(e) 
			{   
			}   
		}
	);
}

LPCeGroup.prototype.setInfo = function(data)
{
	var caselist = data.caselist;
	var grouplist = data.grouplist;
	var lpCeGroup = data.lpCeGroup;
	falg = lpCeGroup.id;
	if(caselist != null && caselist != "")
	{
		for(var i = 0;i < caselist.length;i++)
		{
			selNum = num;
			var mainInfo = caselist[i].mainInfo;
			var basicInfo = caselist[i].basicInfo;
			var ceOccurDate = basicInfo.ceOccurDate;
			if(ceOccurDate == null)
			{
				ceOccurDate = "";
			}
			var tdiv =  "<table class=\"stable\">" +
			"<tr class=\"ldtd\">" +
			"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseNum"] + "</td>" +
			"<td class=\"rdtd\">"+mainInfo.ceNum+"</td>" +
			"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseName"] + "</td>" +
			"<td class=\"rdtd\">"+mainInfo.ceName+"</td>" +
			"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseType"] + "</td>" +
			"<td class=\"rdtd\">"+mainInfo.ceTypeText+"</td>" +
			"<td class=\"ldtd\" style=\"float:right;\"><input type=\"button\" value=\""+ AbisMessageResource["Delete"] +"\" class=\"delBtn\" onclick=\"del(this);\"/></td>" +
			"</tr>" +
			"<tr class=\"ldtd\">" +
			"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseStatus"] + "</td>" +
			"<td class=\"rdtd\">"+mainInfo.ceStatusText+"</td>" +
			"<td class=\"ldtd\">" + AbisMessageResource.Case["CaseOccurTime"] + "</td>" +
			"<td class=\"rdtd\">"+ceOccurDate+"</td>" +
			"<td style=\"display:none\" class=\"ldtd\">" + AbisMessageResource.Case["CaseSerialNum"] + "</td>" +
			"<td style=\"display:none\" class=\"rdtd\"><div id=\"caseId"+selNum+"\">"+mainInfo.id+"</div></td>" +
			"<td class=\"ldtd\"></td>" +
			"</tr>";
			$("#"+this.id+"").append(tdiv); 
			num++;
		}
	}
}

function del(obj)
{
	$(obj).parent().parent().parent().parent().remove(); 
	num--;
}
