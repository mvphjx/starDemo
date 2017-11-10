
FPTUtil.prototype.num  = 1;
FPTUtil.prototype.tpdb = null;
FPTUtil.prototype.tpdbId = null;
FPTUtil.prototype.lpdb = null;
FPTUtil.prototype.lpdbId = null;
FPTUtil.prototype.param = null;

function FPTUtil(data)
{
	this.data = data;
	this.init(this.data);
}

FPTUtil.prototype.init = function(data)
{
	data = eval('(' + data + ')');
	if(!WebUtil.isEmpty(data))
	{
		var cfgs = data.cfgs;
		var level = data.level;
		var priority = data.priority;
		var cfgData = data.cfgData;
		var tpdb = data.tpdb;
		var lpdb = data.lpdb;
		var unitCode = data.unitCode;
		if(!WebUtil.isEmpty(cfgs))
		{
			for ( var i = 0; i < cfgs.length; i++)
            {
	        	$("#selectcfg").append("<span class='cfgs'><input type='checkbox' onchange='' class='cfgs' name='cfgs' value='"+cfgs[i].groupId+"' id='"+cfgs[i].groupId+"'/>&nbsp;"+cfgs[i].description+"</span></br>" );
            }
			$("input[name='cfgs']").each(function () 
			{          
				var a = $(this).val();
				if ($(this).val() == 0)
				{                        
					$(this).attr("checked",true);                    
				}                
			});
		}
		if(!WebUtil.isEmpty(level))
		{
			for(var i = 0;i < level.length; i++)
			{
				$("#xcjbId").append("<option value="+level[i].code+">"+level[i].text+"</option>");
			}
			$("#xcjbId").val(ABISCode.CaseLevelCodeV4.C);
		}
		if(!WebUtil.isEmpty(priority))
		{
			for(var i = 0;i < priority.length; i++)
			{
				$("#yxjId").append("<option value="+priority[i].code+">"+priority[i].text+"</option>");
			}
		}
	}
	if(!WebUtil.isEmpty(cfgData))
	{
		if(cfgData.boolAJ)
		{
			$("#ajId").attr("checked",true);
			$("#qsNumId").attr("disabled",false);
			$("#axlId").attr("disabled",false);
		}
		else
		{
			$("#ajId").attr("checked",false);
			$("#qsNumId").attr("disabled",true);
			$("#axlId").attr("disabled",true);
		} 
		if(cfgData.boolDT)
		{
			$("#dtId").attr("checked",true);
		}
		else
		{
			$("#dtId").attr("checked",false);
		}
		if(cfgData.boolGX)
		{
			$("#gxId").attr("checked",true);
		}
		else
		{
			$("#gxId").attr("checked",false);
		}
		if(cfgData.boolJK)
		{
			$("#jkId").attr("checked",true);
		}
		else
		{
			$("#jkId").attr("checked",false);
		}
		if(cfgData.boolJRDL)
		{
			$("#zrdlId").attr("checked",true);
			$("#yxjId").attr("disabled",false);
		}
		else
		{
			$("#zrdlId").attr("checked",false);
			$("#yxjId").attr("disabled",true);
		}
		if(cfgData.boolKH)
		{
			$("#nyId").attr("checked",true);
			$("#nsNumId").attr("disabled",false);
			$("#nxlId").attr("disabled",false);
		}
		else
		{
			$("#nyId").attr("checked",false);
			$("#nsNumId").attr("disabled",true);
			$("#nxlId").attr("disabled",true);
		}
		if(cfgData.boolLOG)
		{
			$("#logId").attr("checked",true);
		}
		else
		{
			$("#logId").attr("checked",false);
		}
		if(cfgData.boolM)
		{
			$("input[type=radio]").attr("checked",cfgData.boolM);
		}
		else
		{
			$("input[type=radio]").attr("checked","0");
		}
		if(cfgData.textTZD)
		{
			$("#tzdId").val(cfgData.textTZD);
		}
		else
		{
			$("#tzdId").val("");
		}
		if(cfgData.textTZX)
		{
			$("#tzxId").val(cfgData.textTZX);
		}
		else
		{
			$("#tzxId").val("");
		}
		if(cfgData.valueCLYXJ)
		{
			$("#zrdlId").attr("checked",true);
			$("#yxjId").val(cfgData.valueCLYXJ);
		}
		else
		{
			$("#zrdlId").attr("disabled",false);
//			$("#yxjId").val("");
		}
		if(cfgData.valueXC)
		{
			$("#xcjbId").val(cfgData.valueXC);
		}
		else
		{
			$("#xcjbId").val(ABISCode.CaseLevelCodeV4.C);
		}
	}
	else
	{
		if($("#zrdlId").is(":checked"))
		{
			$("#yxjId").attr("disabled",false);
		}
		else
		{
			$("#yxjId").attr("disabled",true);
		}
		if($("#ajId").is(":checked"))
		{
			$("#qsNumId").attr("disabled",false);
			$("#axlId").attr("disabled",false);
		}
		else
		{
			$("#qsNumId").attr("disabled",true);
			$("#axlId").attr("disabled",true);
		} 
		if($("#nyId").is(":checked"))
		{
			$("#nsNumId").attr("disabled",false);
			$("#nxlId").attr("disabled",false);
		}
		else
		{
			$("#nsNumId").attr("disabled",true);
			$("#nxlId").attr("disabled",true);
		} 
		$("#zcId").attr("checked","checked");
	}
	
	//设置默认数据库
	if(!WebUtil.isEmpty(tpdb))
	{
		$("#nydbId").val(tpdb.dispName);
		this.tpdbId = tpdb.dbid;
	}
	if(!WebUtil.isEmpty(lpdb))
	{
		$("#xcdbId").val(lpdb.dispName);
		this.lpdbId = lpdb.dbid;
	}
	
	$("#nydbId").attr("disabled",true); //禁用文本框
	$("#xcdbId").attr("disabled",true); 
	if(!WebUtil.isEmpty(unitCode))
	{
		if(unitCode.length != 12)
		{
			for(var i = unitCode.length; i < 12;i++)
			{
				unitCode += "0";
			}
		}
		var time = new Date();			
		time = time.getFullYear() + "";
		time = time.substring(2, 4); 
		$("#qsNumId").val(unitCode + time);
		$("#axlId").val("00000001");
		
		$("#nsNumId").val(unitCode + time);
		$("#nxlId").val("00000001");
	}
		
}

FPTUtil.prototype.addFTP = function()
{
	if(this.num > 7)
	{
		alert(AbisMessageResource['ImportNumLimited']);
		return;
	}
	var fptfile = "<tr><td align='center'>"+AbisMessageResource['FPTFilePath']+":<input id='file"+this.num+"'class='fptText' type='file' name='file"+this.num+"'><input type='button' class='delBtn' onclick='removefpt(this);'/></td></tr>"; 
	$("#tableform").append(fptfile); 
	this.num++;
}

FPTUtil.prototype.removefpt = function(obj)
{
	$(obj).parent().parent().remove(); 
	this.num--;
}

FPTUtil.prototype.removeAll = function()
{
	for(var v=0;v<this.num;this.num--)
	{
		$("#file1").parent().parent().parent().remove();
	}
}

FPTUtil.prototype.addTPDB = function()
{
	var _this = this;
	if(this.tpdb == null)
	{
		this.tpdb = ABISWindowUtil.openDB("TPDbDialog",ABISCode.DBTypeCode.TENRPINT_DB,ABISCode.DBPurposeCode.NORMAL,selectedTP);
	}
	else
	{
		this.tpdb.open();
	}
	function selectedTP(rows) 
	{
		$("#nydbId").val(rows[0].DB_NAME);
		_this.tpdbId = rows[0].DBID;
	}
}

FPTUtil.prototype.addLPDB = function()
{
	var _this = this;
	if(this.lpdb == null)
	{
		this.lpdb = ABISWindowUtil.openDB("LPDbDialog",ABISCode.DBTypeCode.LATENT_DB,ABISCode.DBPurposeCode.NORMAL,selectedLP);
	}
	else
	{
		this.lpdb.open();
	}
	function selectedLP(rows) 
	{
		$("#xcdbId").val(rows[0].DB_NAME);
		_this.lpdbId = rows[0].DBID;
	}
}

FPTUtil.prototype.zrdlclick = function()
{
	if($("#zrdlId").is(":checked"))
	{
		$("#yxjId").attr("disabled",false);
	}
	else
	{
		$("#yxjId").attr("disabled",true);
	} 
}

FPTUtil.prototype.ajclick = function()
{
	if($("#ajId").is(":checked"))
	{
		$("#qsNumId").attr("disabled",false);
		$("#axlId").attr("disabled",false);
	}
	else
	{
		$("#qsNumId").attr("disabled",true);
		$("#axlId").attr("disabled",true);
	} 
}

FPTUtil.prototype.nyclick = function()
{
	if($("#nyId").is(":checked"))
	{
		$("#nsNumId").attr("disabled",false);
		$("#nxlId").attr("disabled",false);
	}
	else
	{
		$("#nsNumId").attr("disabled",true);
		$("#nxlId").attr("disabled",true);
	} 
}

FPTUtil.prototype.fptsubmint = function()
{
	var obj 	= {};
	obj.boolGX = $("#gxId").is(":checked"); 
	obj.boolJK = $("#jkId").is(":checked"); 
	obj.textTZD = $("#tzdId").val();
	obj.textTZX = $("#tzxId").val();
	obj.valueXC = $("#xcjbId").val();
	obj.boolJRDL = $("#zrdlId").is(":checked"); 
	obj.valueCLYXJ = $("#yxjId").val();
	obj.boolLOG = $("#logId").is(":checked");
	obj.boolDT = $("#dtId").is(":checked");
	obj.boolAJ = $("#ajId").is(":checked");
	obj.textAJ = $("#qsNumId").val() + $("#axlId").val();
	obj.fileAB = $("#axlId").val();
	obj.boolKH = $("#nyId").is(":checked");
	obj.textKH = $("#nsNumId").val() + $("#nxlId").val();
	obj.filekB = $("#nxlId").val();
	obj.boolM = $('input:radio[name="mobli"]:checked').val();
	this.param = $.toJSON(obj);
	
	var vfile = "";
	for(var v = 1;v < this.num;v++)
	{
		if(!WebUtil.isEmpty($("#file"+v+"").val()))
		{
			vfile += $("#file"+v+"").val() + ",";
			
			var fileInput = $("#"+field_id)[0];
	        byteSize  = fileInput.files[0].fileSize;
			
//			 function findSize(field_id)
//			 {
//		           var fileInput = $("#"+field_id)[0];
//		           byteSize  = fileInput.files[0].fileSize;
//			        return ( Math.ceil(byteSize / 1024) ); // Size returned in KB.
//			}
		}
	}
	vfile = vfile.substring(0,vfile.length - 1);
	if(WebUtil.isNull(vfile))
	{
		alert(AbisMessageResource['PleaseSelectFPTFile']);
		return;
	}
	$("input[name='files']").val(vfile);
	$("input[name='param']").val(this.param);
//	$.post("${pageContext.request.contextPath}/import/fpt/importfpt", {file:vfile}, 
//		function(data)
//	    {
//			if(data == "success")
//			{
//				window.open(WebVar.VarPath+"/jsp/abis/import/impsuccess.jsp","_blank");
//			}
//			else
//			{
//				window.open(WebVar.VarPath+"/jsp/abis/import/imperror.jsp","_blank");
//			}
//	    }
//	);
	var fptform = document.getElementById("fptform");
	fptform.submit();
}

FPTUtil.prototype.getTPDBId = function()
{
	return this.tpdbId;
}

FPTUtil.prototype.getLPDBId = function()
{
	return this.lpdbId;
}

FPTUtil.prototype.getCfgs = function()
{
	var isc = "";
	$("input[name=cfgs]").each(function()
	{ 
        if($(this).attr("checked")) //如果被选中 
        {
        	isc += $(this).val() + ","; //获取被选中的值 
        }
    });
	if(isc.length > 0) //如果获取到 
	{
		isc = isc.substring(0, isc.length - 1); //把最后一个逗号去掉
	}
	return isc;
}


