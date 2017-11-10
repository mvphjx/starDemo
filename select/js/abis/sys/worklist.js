var WorkListTableMgr =
{
		workTableMgr:function(type,id,pageNumStr)
		{
			if(type == "liveQualCheckId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","CARD_ID","CARD_NUM","INPUT_USER_NAME","INPUT_UNIT_CODE","CHECK_USER_NAME","CHECK_UNIT_CODE","CHECK_DATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"LIVE_SCAN_QUAL_CHECK_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CHECK_DATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			else if(type == "liveRescanId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","CARD_ID","CARD_NUM","INPUT_USER_NAME","INPUT_UNIT_CODE","FINISH_USER_NAME","FINISH_UNIT_CODE","FINISH_DATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"LIVE_RESCAN_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"FINISH_DATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			else if(type == "cardMexId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","PRINT_TYPE","CARD_NUM","STATUS","FINISH_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"CARD_MEX_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"FINISH_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			else if(type == "cardMexErrId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","PRINT_TYPE","CARD_NUM","BTY","FGP","CREATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"CARD_MEX_ERR_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			else
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","USER_NAME","UNIT_CODE","WORK_DATE","COMPUTER_NAME","COMPUTER_IP","NUM_ID","EXTRA_INFO"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"WORK_LOG",
					cols:cols,
					url:path,
					initWhere:[{colName: "WORK_TYPE", dataType: 2, value1: type}],
					orderCol:"WORK_DATE",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"WORK_DATE",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			
		},
		webSearchMgr:function(type,id,tarr,searchStr)
		{
			if(type == "liveQualCheckId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INPUT_USER_NAME",dispName:tarr.INPUT_USER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INPUT_UNIT_CODE",dispName:tarr.INPUT_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|UNIT_CODE"},
	        			{colName:"CHECK_USER_NAME",dispName:tarr.CHECK_USER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CHECK_UNIT_CODE",dispName:tarr.CHECK_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|UNIT_CODE"},
	        			{colName:"CHECK_DATE_TIME",dispName:tarr.CHECK_DATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"LIVE_SCAN_QUAL_CHECK_LOG",null,searchStr);
	        		searchMgr.hideConfg();
	        		return searchMgr;
			}
			else if(type == "liveRescanId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INPUT_USER_NAME",dispName:tarr.INPUT_USER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INPUT_UNIT_CODE",dispName:tarr.INPUT_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_RESCAN_LOG|UNIT_CODE"},
	        			{colName:"FINISH_USER_NAME",dispName:tarr.FINISH_USER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"FINISH_UNIT_CODE",dispName:tarr.FINISH_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"LIVE_RESCAN_LOG|UNIT_CODE"},
	        			{colName:"FINISH_DATE_TIME",dispName:tarr.FINISH_DATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"LIVE_RESCAN_LOG",null,searchStr);
	        		searchMgr.hideConfg();
	        		return searchMgr;
			}
			else if(type == "cardMexId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PRINT_TYPE",dispName:tarr.PRINT_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_LOG|PRINT_TYPE"},
	        			{colName:"STATUS",dispName:tarr.STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_LOG|STATUS"},
	        			{colName:"FINISH_TIME",dispName:tarr.FINISH_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"CARD_MEX_LOG",null,searchStr);
	        		searchMgr.hideConfg();
	        		return searchMgr;
			}
			else if(type == "cardMexErrId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PRINT_TYPE",dispName:tarr.PRINT_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_ERR_LOG|PRINT_TYPE"},
	        			{colName:"BTY",dispName:tarr.BTY,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_ERR_LOG|BTY"},
	        			{colName:"FGP",dispName:tarr.FGP,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"CARD_MEX_ERR_LOG|FGP"},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"CARD_MEX_ERR_LOG",null,searchStr);
	        		searchMgr.hideConfg();
	        		return searchMgr;
			}
			else
			{
				var tarr = 
	        		[
	        			{colName:"USER_NAME",dispName:tarr.USER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UNIT_CODE",dispName:tarr.UNIT_CODE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"WORK_DATE",dispName:tarr.WORK_DATE,dataType:ABISCode.StorageDataType.DATE,codeName:null},
	        			{colName:"COMPUTER_NAME",dispName:tarr.COMPUTER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_IP",dispName:tarr.COMPUTER_IP,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NUM_ID",dispName:tarr.NUM_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"WORK_LOG",null,searchStr);
	        		searchMgr.hideConfg();
	        		return searchMgr;
			}
			
		}
}