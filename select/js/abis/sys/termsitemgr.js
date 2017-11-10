var SysListTableMgr =
{
		sysTableMgr:function(type,id,pageNumStr)
		{
			if(type == "server")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["SITE_ID","SITE_NO","UNIT_NAME","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_SITE_SERVICE_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"OP_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "termPer")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","SITE_NO","HS_SERVICE_NUM","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS","SAMPLE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_COMPUTER_MONITOR_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "serverPer")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","SITE_NO","SERVICE_NAME","SERVICE_TYPE","HS_SERVICE_NUM","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS","SAMPLE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_SERVICE_MONITOR_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "processPer")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","PROCESS_NAME","PROCESS_TYPE","SITE_NO","HS_SERVICE_NUM","COMPUTER_TYPE","COMPUTER_STATUS","SAMPLE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_PROCESS_MONITOR_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "dbaPer")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","DB_TYPE","SITE_NO","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS","SAMPLE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_DATABASE_MONITOR_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "reqPer")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","SERVICE_NAME","SERVICE_TYPE","SITE_NO","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS","SAMPLE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_SVC_REQ_MONITOR_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "liveServerId")
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","SITE_NO","UNIT_NAME","CONTACTER_NAME","CONTACTER_PHONE","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_COLLECT_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			else
			{
				var path=WebVar.VarPath + "/sys/termsitemgr/query";
				var cols = ["ID","SITE_NO","HS_SERVICE_NUM","UNIT_NAME","CONTACTER_NAME","CONTACTER_PHONE","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS","CREATE_TIME"];
				var where = new Array();
				var wh = {};
				if(type == "applicationServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "1";
					where.push(wh);
				}
				if(type == "webServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "2";
					where.push(wh);
				}
				if(type == "qryServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "3";
					where.push(wh);
				}
				if(type == "comparedId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "4";
					where.push(wh);
				}
				if(type == "backUpServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "5";
					where.push(wh);
				}
				if(type == "msgServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "6";
					where.push(wh);
				}
				if(type == "generalServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "7";
					where.push(wh);
				}
				if(type == "lochostServerId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "8";
					where.push(wh);
				}
				if(type == "webClientId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "10";
					where.push(wh);
				}
				if(type == "generalClientId")
				{
					wh.colName = "MAJOR_ROLE";
					wh.dataType = ABISCode.StorageDataType.STRING;
					wh.value1 = "11";
					where.push(wh);
				}
	    		var tblParam =
				{
					tblId:id,
					tblName:"HS_TERM_SITE_VIEW",
					cols:cols,
					url:path,
					where:where,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
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
			if(type == "server")
			{
				var cols = ["SITE_ID","SITE_NO","UNIT_NAME","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UNIT_NAME",dispName:tarr.UNIT_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_SITE_SERVICE_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "termPer")
			{
				var cols = ["ID","SITE_NO","HS_SERVICE_NUM","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"HS_SERVICE_NUM",dispName:tarr.HS_SERVICE_NUM,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_COMPUTER_MONITOR_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "serverPer")
			{
				var cols = ["ID","SITE_NO","SERVICE_NAME","SERVICE_TYPE","HS_SERVICE_NUM","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"SERVICE_NAME",dispName:tarr.SERVICE_NAME,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"SERVICE_TYPE",dispName:tarr.SERVICE_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"HS_SERVICE_NUM",dispName:tarr.HS_SERVICE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_SERVICE_MONITOR_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "processPer")
			{
				var cols = ["ID","PROCESS_NAME","PROCESS_TYPE","SITE_NO","HS_SERVICE_NUM","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"PROCESS_NAME",dispName:tarr.PROCESS_NAME,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"PROCESS_TYPE",dispName:tarr.PROCESS_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"HS_SERVICE_NUM",dispName:tarr.HS_SERVICE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_PROCESS_MONITOR_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "dbaPer")
			{
				var cols = ["ID","DB_TYPE","DB_NAME","SITE_NO","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"DB_TYPE",dispName:tarr.DB_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"DB_NAME",dispName:tarr.DB_NAME,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_DATABASE_MONITOR_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "reqPer")
			{
				var cols = ["ID","SERVICE_NAME","SERVICE_TYPE","SITE_NO","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"SERVICE_NAME",dispName:tarr.SERVICE_NAME,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"SERVICE_TYPE",dispName:tarr.SERVICE_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_SVC_REQ_MONITOR_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "liveServerId")
			{
				var cols = ["ID","SITE_NO","UNIT_NAME","CONTACTER_NAME","CONTACTER_PHONE","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"CONTACTER_NAME",dispName:tarr.CONTACTER_NAME,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null},
	        			{colName:"CONTACTER_PHONE",dispName:tarr.CONTACTER_PHONE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_COLLECT_VIEW",null,searchStr);
	        		return searchMgr;
			}
			else
			{
				var cols = ["ID","SITE_NO","HS_SERVICE_NUM","UNIT_NAME","CONTACTER_NAME","CONTACTER_PHONE","MODEL_NAME","COMPUTER_TYPE","COMPUTER_STATUS"];
				var tarr = 
	        		[
	        			{colName:"SITE_NO",dispName:tarr.SITE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CONTACTER_NAME",dispName:tarr.CONTACTER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CONTACTER_PHONE",dispName:tarr.CONTACTER_PHONE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MODEL_NAME",dispName:tarr.MODEL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_TYPE",dispName:tarr.COMPUTER_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMPUTER_STATUS",dispName:tarr.COMPUTER_STATUS,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"HS_TERM_SITE_COMPUTER_STATUS|COMPUTER_STATUS"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"HS_TERM_SITE_VIEW",null,searchStr);
	        		return searchMgr;
			}
		}
}