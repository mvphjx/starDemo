var RemoteConfigMgr=
{
		
		taskTableMgr:function(type,id,pageNumStr)
		{
			//作为远程服务器
			if(type==RemoteConfigTypeCode.RemoteServerComparisonConfigNode)
				return RemoteConfigMgr.RemoteServerComparisonTableMgr(id,pageNumStr);
			else if(type==RemoteConfigTypeCode.RemoteServerDataBaseConfigNode)
				return RemoteConfigMgr.RemoteServerDataBaseTableMgr(id,pageNumStr);
			else if(type==RemoteConfigTypeCode.RemoteTerServerConfigNode)
				return RemoteConfigMgr.RemoteTerServerTableMgr(id,pageNumStr);
			else if(type==RemoteConfigTypeCode.RemoteTerServerDataBaseConfigNode)
				return RemoteConfigMgr.RemoteTerServerDataBaseTableMgr(id,pageNumStr);
			else if(type==RemoteConfigTypeCode.RemoteTerServerAutoTaskConfigNode)
				return RemoteConfigMgr.RemoteTerServerAutoTaskTableMgr(id,pageNumStr);
			else if(type==RemoteConfigTypeCode.RemoteTerServerComparisonConfigNode)
				return RemoteConfigMgr.RemoteTerServerComparisonTableMgr(id,pageNumStr);
			else if(type==RemoteConfigTypeCode.RemoteTerminalNode)
				return RemoteConfigMgr.RemoteTerminalTableMgr(id,pageNumStr);
			
		},
		webSearchMgr:function(type,id,searchStr,textarray)
		{
			if(type==RemoteConfigTypeCode.RemoteServerComparisonConfigNode)
				return RemoteConfigMgr.RemoteServerComparisonWebSearchMgr(id,searchStr,textarray);
			else if(type==RemoteConfigTypeCode.RemoteServerDataBaseConfigNode)
				return RemoteConfigMgr.RemoteServerDataBaseMgr(id,searchStr,textarray);
			else if(type==RemoteConfigTypeCode.RemoteTerServerConfigNode)
				return RemoteConfigMgr.RemoteTerServerMgr(id,searchStr,textarray);
			else if(type==RemoteConfigTypeCode.RemoteTerServerDataBaseConfigNode)
				return RemoteConfigMgr.RemoteTerServerDataBaseMgr(id,searchStr,textarray);
			else if(type==RemoteConfigTypeCode.RemoteTerServerAutoTaskConfigNode)
				return RemoteConfigMgr.RemoteTerServerAutoTaskMgr(id,searchStr,textarray);
			else if(type==RemoteConfigTypeCode.RemoteTerServerComparisonConfigNode)
				return RemoteConfigMgr.RemoteTerServerComparisonMgr(id,searchStr,textarray);
			else if(type==RemoteConfigTypeCode.RemoteTerminalNode)
				return RemoteConfigMgr.RemoteTerminalMgr(id,searchStr,textarray);
			
		},
		RemoteServerComparisonTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
    		var cols = ["PART_ID","UNIT_CODE","CREATE_TIME","PART_TYPE","PRINT_TYPE","DESCRIPTION"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"MATCH_PART_FOR_RMT_CLIENT_VIEW",
				cols:cols,
				url:path,				
				orderCol:"CREATE_TIME",
                order:WebTable.DES,
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true,
				//link:{cols:["PART_ID"],callBack:clickLink},
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		RemoteServerDataBaseTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
    		var cols = ["REAL_DBID","MAP_DBID","UNIT_CODE","CREATE_TIME","DB_TYPE","DB_NAME","BTY_MASK","WRITABLE","READABLE"];
    		var tblParam =
			{
				tblId:tableid,
				tblName:"Db_For_Rmt_Client_VIEW",
				cols:cols,
				url:path,				
				orderCol:"CREATE_TIME",
                order:WebTable.DES,
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true,
				link:{cols:["ID"],callBack:clickLink},
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		RemoteTerServerTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
			var cols = ["ID","CREATE_TIME","UPDATE_TIME","NAME","UNIT_CODE","CREATE_USER","UPDATE_USER","IS_DIRECT_LINK","USERNAME","PORT"];
			
			var tblParam =
			{
					tblId:tableid,
					tblName:"RMT_SERVER",
					cols:cols,
					url:path,					
					orderCol:"CREATE_TIME",
                	order:WebTable.DES,
					pageSize:25,
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
			return tblMgr;
		},
		RemoteTerServerDataBaseTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
			var cols = ["CREATE_TIME","REAL_DBID","MAP_DBID","UNIT_CODE","CREATE_USER","DB_NAME","DB_TYPE","WRITABLE","READABLE","SEARCHABLE"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"RMT_SERVER_DATABASE",
					cols:cols,
					url:path,
					pageSize:25,
					orderCol:"CREATE_TIME",
                	order:WebTable.DES,
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
			return tblMgr;
		},
		RemoteTerServerAutoTaskTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
			var cols = ["ID","CREATE_TIME","PURPOSE","NAME","CREATE_USER","REC_SVR_UNIT_CODE","IS_DOWNLOAD","DO_TASK_UNIT_CODE","REC_DATA_TYPE","IS_ALLOW_FIRST"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"RMT_AUTO_TASK_CFG",
					cols:cols,
					url:path,
					pageSize:25,
					orderCol:"CREATE_TIME",
                	order:WebTable.DES,
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
			return tblMgr;
		},
		RemoteTerServerComparisonTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
			var cols = ["LOC_PART_ID","SVR_PART_ID","UNIT_CODE","SVR_UNIT_CODE","PART_TYPE","PRINT_TYPE"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"RMT_MATCH_PARTITION_VIEW",
					cols:cols,
					url:path,
					/*orderCol:"CREATE_TIME",
                	order:WebTable.DES,*/
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
			return tblMgr;
		},
		RemoteTerminalTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/rmt/config/query";
			var cols = ["UNIT_CODE","TERMINAL_NAME","USER_ID","SERVICE_NUM","IP_ADDRS","MACS","CREATE_USER","CREATE_TIME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"ACCESSABLE_REMOTE_TERMINAL",
					cols:cols,
					url:path,
					orderCol:"CREATE_TIME",
                	order:WebTable.DES,
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
			return tblMgr;
		},
		RemoteServerComparisonWebSearchMgr:function(id,searchStr,textarray)
		{			
			var tarr = 
				[
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"UNIT_CODE",dispName:textarray.unitCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"USER_MAIN|UNIT_CODE"},
				 {colName:"DESCRIPTION",dispName:textarray.description,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"PART_TYPE",dispName:textarray.partType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MATCH_PART_FOR_RMT_CLIENT_VIEW|PART_TYPE"},
				 ];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtServerComColInfo = eval('(' + rmtServerComColInfo + ')');
				rmtServerComColInfo.cols = columnInfos;
				rmtServerComColInfo = $.toJSON(rmtServerComColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"MATCH_PART_FOR_RMT_CLIENT_VIEW",null,searchStr,null,null,rmtServerComColInfo,resetFunction);
			return searchMgr;
		},
		RemoteServerDataBaseMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
     			 {colName:"REAL_DBID",dispName:textarray.realId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
     			 {colName:"MAP_DBID",dispName:textarray.mapId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
     			 {colName:"UNIT_CODE",dispName:textarray.unitCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"USER_MAIN|UNIT_CODE"},
				 {colName:"BTY_MASK",dispName:textarray.bty,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"Db_For_Rmt_Client|BTY_MASK"},
				 {colName:"DB_TYPE",dispName:textarray.dbType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"DB_CATLOG|DB_TYPE"}			
				 ];    
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtServerDbColInfo = eval('(' + rmtServerDbColInfo + ')');
				rmtServerDbColInfo.cols = columnInfos;
				rmtServerDbColInfo = $.toJSON(rmtServerDbColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"Db_For_Rmt_Client_VIEW",null,searchStr,null,null,rmtServerDbColInfo,resetFunction);
			return searchMgr;
		},
		RemoteTerServerMgr:function(id,searchStr,textarray)
		{   		
			var tarr = 
        		[
        			{colName:"NAME",				dispName: textarray.serverName,		dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			//{colName:"UPDATE_TIME",			dispName: textarray.serverUpdateTime,	dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"CREATE_UNIT_CODE",	dispName: textarray.serverCreateUnit,	dataType:ABISCode.StorageDataType.UNKNOWN,	codeName:"RMT_SERVER|CREATE_UNIT_CODE"},
        			{colName:"UPDATE_UNIT_CODE",	dispName: textarray.serverUpdateUnit,	dataType:ABISCode.StorageDataType.STRING,	codeName:"RMT_SERVER|UPDATE_UNIT_CODE"},
        			//{colName:"UNIT_CODE",			dispName: textarray.serverUnitCode,dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"CREATE_TIME",			dispName: textarray.serverCreateTime,	dataType:ABISCode.StorageDataType.DATETIME,		codeName:null},
        		];   
				//回调函数修改页面缓存的检索项
				var resetFunction = function(columnInfos){
					rmtTerServerColInfo = eval('(' + rmtTerServerColInfo + ')');
					rmtTerServerColInfo.cols = columnInfos;
					rmtTerServerColInfo = $.toJSON(rmtTerServerColInfo);
				}
        		var searchMgr = new WebSearchMgr(id,tarr,3,"RMT_SERVER",null,searchStr,null,null,rmtTerServerColInfo,resetFunction);
        		return searchMgr;
		},
		
		RemoteTerServerDataBaseMgr:function(id,searchStr,textarray)
		{    		
			var tarr = 
        		[
        			{colName:"UNIT_CODE",		dispName: textarray.unitCode,		dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"CREATE_TIME",		dispName: textarray.createTime,	dataType:ABISCode.StorageDataType.DATETIME,		codeName:null},
        			{colName:"MAP_DBID",		dispName: textarray.mapDbid,	dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"REAL_DBID",		dispName: textarray.realDbid,	dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"DB_TYPE",			dispName: textarray.dbType,	dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"DB_NAME",			dispName: textarray.dbName,	dataType:ABISCode.StorageDataType.STRING,	codeName:null}
        		];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtTerServerDbColInfo = eval('(' + rmtTerServerDbColInfo + ')');
				rmtTerServerDbColInfo.cols = columnInfos;
				rmtTerServerDbColInfo = $.toJSON(rmtTerServerDbColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"RMT_SERVER_DATABASE",null,searchStr,null,null,rmtTerServerDbColInfo,resetFunction);
			return searchMgr;
		},
		RemoteTerServerAutoTaskMgr:function(id,searchStr,textarray)
		{    		
			var tarr = 
        		[
        		 	{colName:"CREATE_TIME",			dispName: textarray.createTime,		dataType:ABISCode.StorageDataType.DATETIME,		codeName:null},
        			{colName:"NAME",				dispName: textarray.autoName,		dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"IS_DOWNLOAD",			dispName: textarray.autoIsDownload,	dataType:ABISCode.StorageDataType.STRING,	codeName:null},
        			{colName:"PURPOSE",				dispName: textarray.autoPurpose,	dataType:ABISCode.StorageDataType.STRING,	codeName:null}
        		]; 
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtTerServerAutoTaskColInfo = eval('(' + rmtTerServerAutoTaskColInfo + ')');
				rmtTerServerAutoTaskColInfo.cols = columnInfos;
				rmtTerServerAutoTaskColInfo = $.toJSON(rmtTerServerAutoTaskColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"RMT_AUTO_TASK_CFG",null,searchStr,null,null,rmtTerServerAutoTaskColInfo,resetFunction);
			return searchMgr;
		},
		RemoteTerServerComparisonMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"LOC_PART_ID",				dispName:textarray.localId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"UNIT_CODE",		dispName: textarray.unitCode,dataType:ABISCode.StorageDataType.UNKNOWN,	codeName:"RMT_MATCH_PARTITION_VIEW|UNIT_CODE"},
				 {colName:"PART_TYPE",		dispName:textarray.matPartType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_MATCH_PARTITION_VIEW|PART_TYPE"},				
				 {colName:"SVR_UNIT_CODE",dispName:textarray.svrUnitCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_MATCH_PARTITION_VIEW|SVR_UNIT_CODE"},
				 {colName:"SVR_PART_ID",dispName:textarray.svrId,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_MATCH_PARTITION|SVR_PART_ID"},
				];   
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtTerServerComColInfo = eval('(' + rmtTerServerComColInfo + ')');
				rmtTerServerComColInfo.cols = columnInfos;
				rmtTerServerComColInfo = $.toJSON(rmtTerServerComColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"RMT_MATCH_PARTITION_VIEW",null,searchStr,null,null,rmtTerServerComColInfo,resetFunction);
			return searchMgr;
		},
		
		RemoteTerminalMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"UNIT_CODE",				dispName:textarray.terunitcode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ACCESSABLE_REMOTE_TERMINAL|UNIT_CODE"},
				 {colName:"TERMINAL_NAME",		dispName: textarray.terminalName,dataType:ABISCode.StorageDataType.UNKNOWN,	codeName:null},
				 {colName:"USER_ID",		dispName:textarray.userId,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},				
				 {colName:"SERVICE_NUM",dispName:textarray.serviceNum,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
				]; 
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtTerminalColInfo = eval('(' + rmtTerminalColInfo + ')');
				rmtTerminalColInfo.cols = columnInfos;
				rmtTerminalColInfo = $.toJSON(rmtTerminalColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"ACCESSABLE_REMOTE_TERMINAL",null,searchStr,null,null,rmtTerminalColInfo,resetFunction);
			return searchMgr;
		}
}
var RemoteClearMgr=
{
		clearAccTerminal:function(){
			$("#terName").val("");
			$("#terUser").val("");
			$("#terServiceNum").val("");
			$("#terIpAddrs").val("");
			$("#terMacs").val("");
		},
		clearAutoTask:function (recOpTimeB,recOpTimeE){
			$("#id").val("");
			$("#editname").val("");
			$("#editrecSvrUnitCodetextfieldtrue").val("");
			$("#editrecSvrUnitCodecode").val("");
			$("#editrecDataTypetextfieldtrue").val("");
			$("#editrecDataTypecode").val("");
			$("#editrecSvrDbidtextfieldtrue").val("");
			$("#editrecSvrDbidcode").val("");
			$("#editrecOpTimeB").val("");
			$("#editrecOpTimeE").val("");
			$("#editrecCreateUserName").val("");
			$("#editrecUpdateUserName").val("");
			$("#editrecCreateUnitCode").val("");
			$("#editrecUpdateUnitCode").val("");
			$("#editrecAllowKeyNums").val("");
			$("#editrecForbidKeyNums").val("");
			$("#id").val("");
			//$("#name").val("");
			$("#recSvrUnitCodetextfieldtrue").val("");
			$("#recSvrUnitCodecode").val("");
			$("#recDataTypetextfieldtrue").val("");
			$("#recDataTypecode").val("");
			$("#recLocDbidtextfieldtrue").val("");
			$("#recSvrDbidtextfieldtrue").val("");
			$("#recSvrDbidcode").val("");
			$("#recOpTimeB").val(recOpTimeB);
	    	$("#recOpTimeE").val(recOpTimeE);
	    	$("#recOpTimeB").attr("realvalue","");
	    	$("#recOpTimeE").attr("realvalue","");
			$("#recCreateUserName").val("");
			$("#recUpdateUserName").val("");
			$("#recCreateUnitCode").val("");
			$("#recUpdateUnitCode").val("");
			$("#recAllowKeyNums").val("");
			$("#recForbidKeyNums").val("");
			$(":radio[name=downloadcode]").each(function () {
	            $(this).prop("checked", false);
	         })
            $(":radio[name=recordStatus]").each(function () {
                $(this).prop("checked", false);
            })
	         $("input[name=cutime]").each(function () {
	            $(this).prop("checked", false);
	         })
            $("input[name=flag1]").each(function () {
                $(this).prop("checked", false);
            })
		},
		clearServer:function (){
			$("#name").val("");
			$("#address").val("");
			$("#port").val("");
			$("#username").val("");
			$("#password").val("");
			$("#comments").val("");
			$("#unit_codetextfieldfalse").val("");
			$("#unit_codecode").val("");
			$("#is_direct_superiortextfieldfalse").val("");
			$("#is_direct_superiorcode").val("");
			$("#qry_rmttextfieldtrue").val("");
			$("#qry_localtextfieldtrue").val("");
			rmtServerCfg.clear();
		}
}
var creTableMgr=
{
		unitCodeCreTableInfo:function(pageNumStr){
		    var path=WebVar.VarPath + "/rmt/config/query";
			var cols = ["UNIT_CODE","TERMINAL_NAME","USER_ID","SERVICE_NUM","IP_ADDRS","MACS","CREATE_USER","CREATE_TIME"];
			var tblParam =
			{
				tblId:"unitCodeTableId",
				tblName:"ACCESSABLE_REMOTE_TERMINAL",
				cols:cols,
				url:path,
				orderCol:"ID",
				pageSize:25,
				pageBarId:"SubPage_c",
				callBack:{onClick:selectItem},
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true,
				language:pageNumStr
			}
			var parTblMgr = new TableControlMgr(tblParam);	
			return parTblMgr;
		}
}
var validateMgr=
{
		checkServerValidate:function (alertErr,alertPort,alertName,alertCode,opeType,alertIp){
			var check = true;
			if(WebUtil.isEmpty($("#name").val())||WebUtil.isEmpty($("#unit_codecode").val())){
		    	 //alert(alertPort);
                DialogUtil.openSimpleDialogForOcx(alertPort);
				 check = false;
				 return check;
		   	}
		   	if(check){//检查服务器单位代码
		    	var cheStatus = validateMgr.checkServerExiValidate("NAME",$("#name").val(),alertName,check,opeType);
		    	if(!cheStatus){
		    		check = false;
		    		return check;
		    	}
			}
		     if(check){//检查服务器名称是否重复
		    	 var cheStatus = validateMgr.checkServerExiValidate("UNIT_CODE",$("#unit_codecode").val(),alertCode,check,opeType);
		    	 if(!cheStatus){
		    		 check = false;
		    		 return check;
		    	}
			}
			var ipAddress = $("#address").val();
			var re =  /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
			if(!re.test(ipAddress)){
                DialogUtil.openSimpleDialogForOcx(alertIp);
				return false;
			}
		   	 var port = $("#port").val();
		     if(!WebUtil.isEmpty(port)&&check){
			     var re = /^[0-9]{1,5}$/;
			     if(!re.test(port)){
					//alert(alertErr);
                     DialogUtil.openSimpleDialogForOcx(alertErr);
					check = false;
					return check;
				}
			 }
			return check;
		},
		checkServerExiValidate:function (colName,value,alertVal,check,opeType){
			var param = {};
			var wheres = new Array();
			var wh = {};
	    	wh.colName = colName;
	    	wh.dataType = ABISCode.StorageDataType.STRING;
			wh.value1= value;
			wheres.push(wh);
			param.tblName = "RMT_SERVER";
			param.where=wheres;
			var jData 		= $.toJSON(param);
			url = WebVar.VarPath + "/rmt/config/query";
			jQuery.ajax({
	    		type : 'POST',
				contentType : 'application/json',
	            url: url,
	            data : jData,
	            async:false, 
	            dataType : 'json',                  
	            success: function(data) {
		            var resData = data.tblData.result;
	            	if(!WebUtil.isEmpty(resData))
					{
	            		var checkVal;
	            		if(colName=="NAME"){
	            			checkVal = resData[0].data.NAME;
	            		}else if(colName=="UNIT_CODE"){
	            			checkVal = resData[0].data.UNIT_CODE;
	            		}
	            		if(opeType=="edit"&&checkVal==value){
	            			check = true;
	            		}else{
	            			//alert(alertVal);
                            DialogUtil.openSimpleDialogForOcx(alertVal);
		            		check = false;
	            		}
	            		
					}else{
						check = true;
					}
	            }
	        });
			return check;
		}
}
