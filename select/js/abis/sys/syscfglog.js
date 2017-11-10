

function SysCfgLog(divId,data)
{
	this.divId = divId;
	this.data = data;
	this.crtcfglog(divId,data);
}
/*
 * 初始化控件 checkbox
 */
SysCfgLog.prototype.crtcfglog = function()
{
	$("#" + this.divId + "").html("");
	var num = 1;
	for(d in this.data)
	{
		if(num % 4 == 0)
		{
        	$("#" + this.divId + "").append("<span class='worktypediv'><input type='checkbox' onchange='getWorkTypeId(this)' class='worktype' name='"+this.divId+"' value='"+this.data[d].code+"' id='"+this.divId+"_"+this.data[d].code+"'/>&nbsp;"+this.data[d].text+"</span>" );
        	$("#" + this.divId + "").append("</br></br>");
		}
    	else
    	{
    		$("#" + this.divId + "").append("<span class='worktypediv'><input type='checkbox' onchange='getWorkTypeId(this)' class='worktype' name='"+this.divId+"' value='"+this.data[d].code+"' id='"+this.divId+"_"+this.data[d].code+"'/>&nbsp;"+this.data[d].text+"</span>");
    	}
       num++;
	}	
	num --;
	if(num % 4 != 0)
	{
		$("#" + this.divId + "").append("</br></br>");
	}
}

var typelist = {};
/*
 * 获取 选中的参数
 * 格式为
 * divid:checkboxid,...
 * event_type_work_lp:1,2,3,4;event_type_wanted:1,2,3,4,5;
 */
SysCfgLog.prototype.getWorkTypeId = function(obj)
{
	var systype = "";
	var workTypeId="";
	$("#"+obj.name+"").find("input[name="+obj.name+"]").each(function(){
		//console.log($(this).attr("checked")+'++++'+$(this).attr("id"));
		if($(this).prop("checked"))
		{
			workTypeId += $(this).val()+",";
		}
		else if(!$(this).prop("checked"))
		{
			workTypeId += "";
		}
	});
	if(!WebUtil.isEmpty(workTypeId))
	{
		workTypeId = workTypeId.substring(0, workTypeId.length - 1);
	}
	if(!WebUtil.isEmpty(workTypeId))
	{
		typelist[obj.name] = obj.name + ":"+ workTypeId + ";";
	}
	for(var key in typelist)
	{
		typelist[obj.name] = obj.name + ":"+ workTypeId + ";";
	}
	for(var key in typelist)
	{
		systype += typelist[key];
	}
	return systype;
}

SysCfgLog.prototype.setTypeId = function(obj)
{
	for(var i = 0;i < obj.length;i++)
	{
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.REMOTE_COMMAND)
		{
			$("#event_type_work_remmd").find("input[name=event_type_work_remmd]").each(function(){
				$("#event_type_work_remmd_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.WORK_LATENT)
		{
			$("#event_type_work_lp").find("input[name=event_type_work_lp]").each(function(){
				$("#event_type_work_lp_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.TENPRINT_WANTED)
		{
			$("#event_type_wanted").find("input[name=event_type_wanted]").each(function(){
				$("#event_type_wanted_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.TENPRINT_CARD)
		{
			$("#event_type_tpcard").find("input[name=event_type_tpcard]").each(function(){
				$("#event_type_tpcard_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_WORKFLOW)
		{
			$("#event_type_sys_work").find("input[name=event_type_sys_work]").each(function(){
				$("#event_type_sys_work_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_WANTED_INFO)
		{
			$("#event_type_sys_wanted").find("input[name=event_type_sys_wanted]").each(function(){
				$("#event_type_sys_wanted_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_USER_MGR)
		{
			$("#event_type_sys_user_mgr").find("input[name=event_type_sys_user_mgr]").each(function(){
				$("#event_type_sys_user_mgr_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_USER_ACCESS)
		{
			$("#event_type_sys_user_acs").find("input[name=event_type_sys_user_acs]").each(function(){
				$("#event_type_sys_user_acs_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_STATISTICS)
		{
			$("#event_type_sys_stat").find("input[name=event_type_sys_stat]").each(function(){
				$("#event_type_sys_stat_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_REMOTE_PARAM)
		{
			$("#event_type_sys_rem").find("input[name=event_type_sys_rem]").each(function(){
				$("#event_type_sys_rem_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_MATCH_PART)
		{
			$("#event_type_sys_match_part").find("input[name=event_type_sys_match_part]").each(function(){
				$("#event_type_sys_match_part_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_LOCAL_PARAM)
		{
			$("#event_type_sys_loc").find("input[name=event_type_sys_loc]").each(function(){
				$("#event_type_sys_loc_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_DB_CATLOG)
		{
			$("#event_type_sys_db").find("input[name=event_type_sys_db]").each(function(){
				$("#event_type_sys_db_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_CODE_TABLE_ENTRY)
		{
			$("#event_type_sys_code_ent").find("input[name=event_type_sys_code_ent]").each(function(){
				$("#event_type_sys_code_ent_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_CODE_TABLE)
		{
			$("#event_type_sys_code").find("input[name=event_type_sys_code]").each(function(){
				$("#event_type_sys_code_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SYSTEM_CAPTURED_INFO)
		{
			$("#event_type_sys_captured").find("input[name=event_type_sys_captured]").each(function(){
				$("#event_type_sys_captured_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.SERVICE_EXF_SVR)
		{
			$("#event_type_svr").find("input[name=event_type_svr]").each(function(){
				$("#event_type_svr_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.REMOTE_QRY)
		{
			$("#event_type_rem_qry").find("input[name=event_type_rem_qry]").each(function(){
				$("#event_type_rem_qry_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.QUERY_QUERY)
		{
			$("#event_type_query").find("input[name=event_type_query]").each(function(){
				$("#event_type_query_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.LATENT_CASE)
		{
			$("#event_type_lpcase").find("input[name=event_type_lpcase]").each(function(){
				$("#event_type_lpcase_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.LATENT_CARD_GROUP)
		{
			$("#event_type_lpcard_group").find("input[name=event_type_lpcard_group]").each(function(){
				$("#event_type_lpcard_group_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.LATENT_CARD)
		{
			$("#event_type_lpcard").find("input[name=event_type_lpcard]").each(function(){
				$("#event_type_lpcard_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.HITLOG_HITLOG)
		{
			$("#event_type_hitlog").find("input[name=event_type_hitlog]").each(function(){
				$("#event_type_hitlog_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.DEVICE_COMPUTER)
		{
			$("#event_type_dve_cpt").find("input[name=event_type_dve_cpt]").each(function(){
				$("#event_type_dve_cpt_"+obj[i].eventType+"").attr("checked",true);
			});
		}
		if(obj[i].eventObjId == ABISCode.EventObjcetIdCode.LATENT_CASE_GROUP)
		{
			$("#event_type_case_group").find("input[name=event_type_case_group]").each(function(){
				$("#event_type_case_group_"+obj[i].eventType+"").attr("checked",true);
			});
		}
	}
}

