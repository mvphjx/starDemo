var QueueTaskMgr=
{
		
		taskTableMgr:function(type,id,pageNumStr)
		{
			if(type==QueueTaskTypeCode.LiveScanQualCheckTaskNode)
				return QueueTaskMgr.LiveScanQualTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.RmtTaskQueue)
				return QueueTaskMgr.RmtTaskQueueTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.LiveRescanTaskNode)
				return QueueTaskMgr.LiveRescanTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.LPCardQualCheckTaskNode)
				return QueueTaskMgr.LPCardQualTableMgr(id,pageNumStr);
			//捺印卡片质量检查任务
			else if(type==QueueTaskTypeCode.TPCardQualCheckTaskNode)
				return QueueTaskMgr.TPCardQualTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.LPEditTaskNode)
				return QueueTaskMgr.LPEditTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.TPEditTaskNode)
				return QueueTaskMgr.TPEditTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.QryVerifyQueTaskNode)
				return QueueTaskMgr.QryVerifyQueTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.TPTextInputTaskNode)
				return QueueTaskMgr.TPTextInputTableMgr(id,pageNumStr);
			else if(type==QueueTaskTypeCode.CardMexTaskNode)
				return QueueTaskMgr.CardMexTableMgr(id,pageNumStr);
			//else if(type==QueueTaskTypeCode.RmtTaskQueue)
			//	return QueueTaskMgr.RmtTaskQueueTableMgr(id,pageNumStr);
		},
		webSearchMgr:function(type,id,searchStr,textarray)
		{
			if(type==QueueTaskTypeCode.LiveScanQualCheckTaskNode)
				return QueueTaskMgr.LiveScanQualWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.LiveRescanTaskNode)
				return QueueTaskMgr.LiveRescanWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.RmtTaskQueue)
				return QueueTaskMgr.RmtTaskQueueWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.LPCardQualCheckTaskNode)
				return QueueTaskMgr.LPCardQualWebSearchMgr(id,searchStr,textarray);
			//捺印卡片质量检查任务
			else if(type==QueueTaskTypeCode.TPCardQualCheckTaskNode)
				return QueueTaskMgr.TPCardQualWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.LPEditTaskNode)
				return QueueTaskMgr.LPEditWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.TPEditTaskNode)
				return QueueTaskMgr.TPEditWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.QryVerifyQueTaskNode)
				return QueueTaskMgr.QryVerifyQueWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.TPTextInputTaskNode)
				return QueueTaskMgr.TPTextInputWebSearchMgr(id,searchStr,textarray);
			else if(type==QueueTaskTypeCode.CardMexTaskNode)
				return QueueTaskMgr.CardMexWebSearchMgr(id,searchStr,textarray);
			//else if(type==QueueTaskTypeCode.RmtTaskQueue)
			//	return QueueTaskMgr.RmtTaskQueueWebSearchMgr(id,searchStr,textarray);
		},
		RmtTaskQueueWebSearchMgr:function(id,searchStr,textarray)
		{   		
			var tarr = 
        		[
        			{colName:"ID",dispName:"ID",dataType:ABISCode.StorageDataType.STRING,codeName:null},
        			{colName:"RMT_UNIT_CODE",dispName:AbisMessageResource['RMTUnitCode'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|RMT_UNIT_CODE"},
        			{colName:"SVR_UNIT_CODE",dispName:AbisMessageResource['SVRUnitCode'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|SVR_UNIT_CODE"},
        			{colName:"DATA_TYPE",dispName:AbisMessageResource['DataType'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|DATA_TYPE"},
        			{colName:"IS_DOWNLOAD",dispName:AbisMessageResource['IsDownload'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|IS_DOWNLOAD"},
        			{colName:"IS_QRY_CAND",dispName:AbisMessageResource['IsQryCand'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|IS_QRY_CAND"},
        			{colName:"SOURCE",dispName:AbisMessageResource['Source'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|SOURCE"},
        			{colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|STATUS"},
        			{colName:"PRIORITY",dispName:AbisMessageResource['Priority'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"RMT_TASK_QUEUE|PRIORITY"}
        		];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				rmtTaskColInfo = eval('(' + rmtTaskColInfo + ')');
				rmtTaskColInfo.cols = columnInfos;
				rmtTaskColInfo = $.toJSON(rmtTaskColInfo);
			}
    		var searchMgr = new WebSearchMgr(id,tarr,3,"RMT_TASK_QUEUE",null,searchStr,null,null,rmtTaskColInfo,resetFunction);
    		return searchMgr;
		},
		RmtTaskQueueTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
    		var cols = ["ID","RMT_UNIT_CODE","SVR_UNIT_CODE","DATA_TYPE","KEY_NUM","IS_DOWNLOAD","SOURCE","STATUS","PRIORITY"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"RMT_TASK_QUEUE",
				cols:cols,
				url:path,				
				orderCol:"ID",
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				sort:{colName:"ID",order:WebTable.DES},
				multiSelect:true,
				//link:{cols:["ID"],callBack:clickLink},
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		LiveScanQualWebSearchMgr:function(id,searchStr,textarray)
		{			
			var tarr = 
				[
				 {colName:"NAME",dispName:textarray.name,dataType:ABISCode.StorageDataType.STRING,codeName:null},				 
				 {colName:"SEX_CODE",dispName:textarray.sexCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK_VIEW|SEX_CODE"},
				 {colName:"SHENFEN_ID",dispName:textarray.shenfenId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"STATUS",dispName:textarray.status,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|STATUS"},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|PRIORITY"},
				 {colName:"START_CHECK_TIME",dispName:textarray.startCheckTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"FINISH_CHECK_TIME",dispName:textarray.finishCheckTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"CHECK_RESULT",dispName:textarray.checkResult,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|CHECK_RESULT"},
				 {colName:"RESCAN_RESULT",dispName:textarray.rescanResult,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|RESCAN_RESULT"}
				 ];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				liveScanColInfo = eval('(' + liveScanColInfo + ')');
				liveScanColInfo.cols = columnInfos;
				liveScanColInfo = $.toJSON(liveScanColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"LIVE_SCAN_QUAL_CHECK_TASK",null,searchStr,null,null,liveScanColInfo,resetFunction);
			return searchMgr;
		},
		LiveScanQualTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
    		var cols = ["NAME","SEX_CODE","CARD_ID","SHENFEN_ID","CARD_NUM","STATUS","PRIORITY","START_CHECK_TIME","FINISH_CHECK_TIME","CHECK_RESULT","RESCAN_RESULT"];
			
    		var wheresin = new Array();
			var wh = {};
			wh.colName = "STATUS";
			wh.dataType = ABISCode.StorageDataType.STRING;
			wh.oper="IN";
			var values=new Array();
			values.push(1);
			values.push(2);
			//values.push(3);
			wh.values=values;
			wheresin.push(wh);
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"LIVE_SCAN_QUAL_CHECK_TASK_VIEW",
				cols:cols,
				url:path,
				initWhere:wheresin,
				where:null,
				orderCol:"START_CHECK_TIME",
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
		LiveRescanWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
     			 {colName:"NAME",dispName:textarray.name,dataType:ABISCode.StorageDataType.STRING,codeName:null},
    			 {colName:"SEX_CODE",dispName:textarray.sexCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_RESCAN_TASK_VIEW|SEX_CODE"},
    			 {colName:"SHENFEN_ID",dispName:textarray.shenfenId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"STATUS",dispName:textarray.status,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK|STATUS"},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_RESCAN_TASK|PRIORITY"}			
				 ];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				liveRescanColInfo = eval('(' + liveRescanColInfo + ')');
				liveRescanColInfo.cols = columnInfos;
				liveRescanColInfo = $.toJSON(liveRescanColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"LIVE_SCAN_QUAL_CHECK_TASK",null,searchStr,null,null,liveRescanColInfo,resetFunction);
			return searchMgr;
		},
		LiveRescanTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["NAME","SEX_CODE","SHENFEN_ID","CARD_NUM","CARD_ID","STATUS","PRIORITY","CREATE_TIME"];
			
    		var wheresin = new Array();
			var wh = {};
			wh.colName = "STATUS";
			wh.dataType = ABISCode.StorageDataType.STRING;
			wh.oper="IN";
			var values=new Array();
			values.push(3);
			values.push(4);
			values.push(5);
			values.push(6);
			wh.values=values;
			wheresin.push(wh);
			
			var tblParam =
			{
					tblId:tableid,
					tblName:"LIVE_SCAN_QUAL_CHECK_TASK_VIEW",
					cols:cols,
					url:path,					
					initWhere:wheresin,
					where:null,
					orderCol:"CREATE_TIME",
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
		LPCardQualWebSearchMgr:function(id,searchStr,textarray)
		{    		
			var tarr = 
				[
				 {colName:"CARD_NUM",dispName:textarray.cardNum,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CE_ID",dispName:textarray.ceId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CARD_ID",dispName:textarray.cardId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LP_CARD_QUAL_CHECK_TASK|STATUS"},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LP_CARD_QUAL_CHECK_TASK|PRIORITY"},
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"START_CHECK_TIME",dispName:textarray.startCheckTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
				 ];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				lpCardColInfo = eval('(' + lpCardColInfo + ')');
				lpCardColInfo.cols = columnInfos;
				lpCardColInfo = $.toJSON(lpCardColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"LP_CARD_QUAL_CHECK_TASK_VIEW",null,searchStr,null,null,lpCardColInfo,resetFunction);
			return searchMgr;
		},
		//捺印卡片质量检查任务
		TPCardQualWebSearchMgr:function(id,searchStr,textarray)
		{    		
			var tarr = 
				[
				 {colName:"CARD_NUM",dispName:textarray.cardNum,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CE_ID",dispName:textarray.ceId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CARD_ID",dispName:textarray.cardId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LP_CARD_QUAL_CHECK_TASK|STATUS"},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LP_CARD_QUAL_CHECK_TASK|PRIORITY"},
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"START_CHECK_TIME",dispName:textarray.startCheckTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
				 ];   
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				tpCardColInfo = eval('(' + tpCardColInfo + ')');
				tpCardColInfo.cols = columnInfos;
				tpCardColInfo = $.toJSON(tpCardColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"TP_CARD_QUAL_CHECK_TASK_VIEW",null,searchStr,null,null,tpCardColInfo,resetFunction);
			return searchMgr;
		},
		LPCardQualTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["CARD_NUM","CE_ID","LEFT_LOCATION","CARD_ID","STATUS","PRIORITY","CREATE_TIME","START_CHECK_TIME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"LP_CARD_QUAL_CHECK_TASK_VIEW",
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
		//捺印卡片质量检查任务
		TPCardQualTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["NAME","SEX_CODE","SHENFEN_ID","CARD_NUM","CARD_ID","PRIORITY","STATUS","CREATE_TIME","START_CHECK_TIME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"TP_CARD_QUAL_CHECK_TASK_VIEW",
					cols:cols,
					url:path,
					pageSize:25,
					orderCol:"CREATE_TIME",
                	order:"1",
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
		TPEditWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
     			 {colName:"NAME",dispName:textarray.name,dataType:ABISCode.StorageDataType.STRING,codeName:null},
    			 {colName:"SEX_CODE",dispName:textarray.sexCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_EDIT_TASK_VIEW|SEX_CODE"},
    			 {colName:"SHENFEN_ID",dispName:textarray.shenfenId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CARD_ID",dispName:textarray.cardId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_EDIT_TASK|PRIORITY"},
				 {colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_EDIT_TASK|STATUS"},
				 {colName:"START_EDIT_TIME",dispName:textarray.startEditTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
				 ];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				tpEditColInfo = eval('(' + tpEditColInfo + ')');
				tpEditColInfo.cols = columnInfos;
				tpEditColInfo = $.toJSON(tpEditColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"TP_EDIT_TASK_VIEW",null,searchStr,null,null,tpEditColInfo,resetFunction);
			return searchMgr;
		},
		TPEditTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["NAME","SEX_CODE","SHENFEN_ID","CARD_NUM","CARD_ID","CREATE_TIME","PRIORITY","STATUS","START_EDIT_TIME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"TP_EDIT_TASK_VIEW",
					cols:cols,
					url:path,
					orderCol:"CREATE_TIME",
                	order:"1",
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
		LPEditWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"CARD_NUM",dispName:textarray.cardNum,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CE_ID",dispName:textarray.ceId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CARD_ID",dispName:textarray.cardId,dataType:ABISCode.StorageDataType.STRING,codeName:null},				
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_EDIT_TASK|PRIORITY"},
				 {colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_EDIT_TASK|STATUS"},
				 {colName:"START_EDIT_TIME",dispName:textarray.startEditTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
				 ];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				lpEditColInfo = eval('(' + lpEditColInfo + ')');
				lpEditColInfo.cols = columnInfos;
				lpEditColInfo = $.toJSON(lpEditColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"LP_EDIT_TASK_VIEW",null,searchStr,null,null,lpEditColInfo,resetFunction);
			return searchMgr;
		},
		LPEditTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["CARD_NUM","CE_ID","LEFT_LOCATION","CARD_ID","CREATE_TIME","PRIORITY","STATUS","START_EDIT_TIME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"LP_EDIT_TASK_VIEW",
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
		QryVerifyQueWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"CARD_NUM",dispName:"",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"PERSON_NUM",dispName:"",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"PERSON_CLASS_CODE",dispName:"",dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON|PERSON_TYPE"},
				 {colName:"NAME",dispName:"",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"SEX_CODE",dispName:"",dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
				 {colName:"SHENFEN_ID",dispName:"",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"PRINT_BY",dispName:"",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"PRINT_UNIT_CODE",dispName:"",dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_CARD_INFO|PRINT_UNIT_CODE"},
				 {colName:"NATION",dispName:"",dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|NATION"}
				 ];        		
			var searchMgr = new WebSearchMgr(id,tarr,3,"TP_CARD_VIEW",null,searchStr);
			return searchMgr;
		},
		QryVerifyQueTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["CARD_NUM","PERSON_NUM","PERSON_TYPE","NAME","SEX_CODE","SHENFEN_ID","NATION","CREATE_TIME","CREATE_USER"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"tp_card_view",
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
		TPTextInputWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
     			 {colName:"NAME",dispName:textarray.name,dataType:ABISCode.StorageDataType.STRING,codeName:null},
    			 {colName:"SEX_CODE",dispName:textarray.sexCode,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_EDIT_TASK_VIEW|SEX_CODE"},
    			 {colName:"SHENFEN_ID",dispName:textarray.shenfenId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CARD_ID",dispName:textarray.cardId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_TEXT_INPUT_TASK_VIEW|PRIORITY"},
				 {colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TP_TEXT_INPUT_TASK_VIEW|STATUS"},
				 {colName:"START_WORKING_TIME",dispName:textarray.startWorkTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
				 ];     
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				tpTextInputColInfo = eval('(' + tpTextInputColInfo + ')');
				tpTextInputColInfo.cols = columnInfos;
				tpTextInputColInfo = $.toJSON(tpTextInputColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"TP_TEXT_INPUT_TASK_VIEW",null,searchStr,null,null,tpTextInputColInfo,resetFunction);
			return searchMgr;
		},
		TPTextInputTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["NAME","SEX_CODE","SHENFEN_ID","CARD_NUM","CARD_ID","CREATE_TIME","PRIORITY","STATUS","START_WORKING_TIME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"TP_TEXT_INPUT_TASK_VIEW",
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
		CardMexWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"PRINT_TYPE",dispName:textarray.printType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_TASK|PRINT_TYPE"},
				 {colName:"CARD_ID",dispName:textarray.cardId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"STATUS",dispName:AbisMessageResource['Status'],dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_TASK|STATUS"},
				 //{colName:"CREATE_TIME",dispName:textarray.createTime,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
				 {colName:"PRIORITY",dispName:textarray.priority,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_TASK|PRIORITY"}
				 ];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				cardMexColInfo = eval('(' + cardMexColInfo + ')');
				cardMexColInfo.cols = columnInfos;
				cardMexColInfo = $.toJSON(cardMexColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"CARD_MEX_TASK",null,searchStr,null,null,cardMexColInfo,resetFunction);
			return searchMgr;
		},
		CardMexTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/queuetask/query";
			var cols = ["ID","PRINT_TYPE","CARD_ID","CREATE_TIME","STATUS","PRIORITY"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"CARD_MEX_TASK",
					cols:cols,
					url:path,
					orderCol:"CREATE_TIME",
					order:WebTable.DES,
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					//link:{cols:["CARD_ID"],callBack:clickLink},
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
			return tblMgr;
		}
		
}