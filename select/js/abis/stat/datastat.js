var WorkListTableMgr =
{
		workTableMgr:function(type,id,pageNumStr)
		{
			if(type == "allStatCountId")
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
			if(type == "liveRescanId")
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
			if(type == "lpQualCheckId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","CARD_ID","CARD_NUM","CASE_NUM","CHECKER","CHECKER_UNIT_CODE","QUAL_CHECK_RESULT","CREATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"LP_CARD_QUAL_CHECK_LOG",
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
			if(type == "tpEditId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","CARD_ID","CARD_NUM","PRIORITY","EDIT_USER","EDIT_UNIT_CODE","EDIT_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"TP_EDIT_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"EDIT_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "lpEditId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["ID","CARD_ID","EDIT_USER","EDIT_TIME","PRIORITY","CREATE_USER","CREATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"LP_EDIT_LOG",
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
			if(type == "qryVerifyQueId")
			{
				var path=WebVar.VarPath + "/sys/worklist/query";
	    		var cols = ["QRY_ID","TASK_TYPE","VERIFY_PRIORITY","VERIFY_RESULT","CREATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"QRY_VERIFY_QUE_LOG",
					cols:cols,
					url:path,
					orderCol:"QRY_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"CREATE_TIME",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["QRY_ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "cardMexId")
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
			if(type == "cardMexErrId")
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
		},
		webSearchMgr:function(type,id,tarr,searchStr)
		{
			if(type == "liveQualCheckId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"INPUT_USER_NAME",dispName:tarr.INPUT_USER_NAME,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"INPUT_UNIT_CODE",dispName:tarr.INPUT_UNIT_CODE,dataType:ABISCode.QryFieldType.CODE,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|UNIT_CODE"},
	        			{colName:"CHECK_USER_NAME",dispName:tarr.CHECK_USER_NAME,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"CHECK_UNIT_CODE",dispName:tarr.CHECK_UNIT_CODE,dataType:ABISCode.QryFieldType.CODE,codeName:"LIVE_SCAN_QUAL_CHECK_TASK|UNIT_CODE"},
	        			{colName:"CHECK_DATE_TIME",dispName:tarr.CHECK_DATE_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"LIVE_SCAN_QUAL_CHECK_TASK",null,searchStr);
	        		return searchMgr;
			}
			if(type == "liveRescanId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"INPUT_USER_NAME",dispName:tarr.INPUT_USER_NAME,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"INPUT_UNIT_CODE",dispName:tarr.INPUT_UNIT_CODE,dataType:ABISCode.QryFieldType.CODE,codeName:"LIVE_RESCAN_LOG|UNIT_CODE"},
	        			{colName:"FINISH_USER_NAME",dispName:tarr.FINISH_USER_NAME,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"FINISH_UNIT_CODE",dispName:tarr.FINISH_UNIT_CODE,dataType:ABISCode.QryFieldType.CODE,codeName:"LIVE_RESCAN_LOG|UNIT_CODE"},
	        			{colName:"FINISH_DATE_TIME",dispName:tarr.FINISH_DATE_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"LIVE_RESCAN_LOG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "lpQualCheckId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"CHECKER",dispName:tarr.CHECKER,dataType:ABISCode.QryFieldType.CODE,codeName:"LP_CARD_QUAL_CHECK_LOG|UNIT_CODE"},
	        			{colName:"CHECKER_UNIT_CODE",dispName:tarr.CHECKER_UNIT_CODE,dataType:ABISCode.QryFieldType.CODE,codeName:"LP_CARD_QUAL_CHECK_LOG|UNIT_CODE"},
	        			{colName:"QUAL_CHECK_RESULT",dispName:tarr.QUAL_CHECK_RESULT,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"LP_CARD_QUAL_CHECK_LOG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "tpEditId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"PRIORITY",dispName:tarr.PRIORITY,dataType:ABISCode.QryFieldType.CODE,codeName:"TP_EDIT_LOG|PRIORITY"},
	        			{colName:"EDIT_USER",dispName:tarr.EDIT_USER,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"EDIT_UNIT_CODE",dispName:tarr.EDIT_UNIT_CODE,dataType:ABISCode.QryFieldType.CODE,codeName:"TP_EDIT_LOG|UNIT_CODE"},
	        			{colName:"EDIT_TIME",dispName:tarr.EDIT_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"TP_EDIT_LOG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "lpEditId")
			{
				var tarr = 
	        		[
	        			{colName:"PRIORITY",dispName:tarr.PRIORITY,dataType:ABISCode.QryFieldType.CODE,codeName:"LP_EDIT_LOG|PRIORITY"},
	        			{colName:"CREATE_USER",dispName:tarr.CREATE_USER,dataType:ABISCode.QryFieldType.TEXT,codeName:"LP_EDIT_LOG|UNIT_CODE"},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null},
	        			{colName:"EDIT_USER",dispName:tarr.EDIT_USER,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"EDIT_TIME",dispName:tarr.EDIT_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"LP_EDIT_LOG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "qryVerifyQueId")
			{
				var tarr = 
	        		[
	        			{colName:"TASK_TYPE",dispName:tarr.TASK_TYPE,dataType:ABISCode.QryFieldType.CODE,codeName:"QRY_VERIFY_QUE_LOG|TASK_TYPE"},
	        			{colName:"VERIFY_PRIORITY",dispName:tarr.VERIFY_PRIORITY,dataType:ABISCode.QryFieldType.CODE,codeName:"QRY_VERIFY_QUE_LOG|VERIFY_PRIORITY"},
	        			{colName:"VERIFY_RESULT",dispName:tarr.VERIFY_RESULT,dataType:ABISCode.QryFieldType.CODE,codeName:"QRY_VERIFY_QUE_LOG|VERIFY_RESULT"},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"QRY_VERIFY_QUE_LOG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "cardMexId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"PRINT_TYPE",dispName:tarr.PRINT_TYPE,dataType:ABISCode.QryFieldType.CODE,codeName:"CARD_MEX_LOG|PRINT_TYPE"},
	        			{colName:"STATUS",dispName:tarr.STATUS,dataType:ABISCode.QryFieldType.CODE,codeName:"CARD_MEX_LOG|STATUS"},
	        			{colName:"FINISH_TIME",dispName:tarr.FINISH_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"CARD_MEX_LOG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "cardMexErrId")
			{
				var tarr = 
	        		[
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.QryFieldType.TEXT,codeName:null},
	        			{colName:"PRINT_TYPE",dispName:tarr.PRINT_TYPE,dataType:ABISCode.QryFieldType.CODE,codeName:"CARD_MEX_ERR_LOG|PRINT_TYPE"},
	        			{colName:"BTY",dispName:tarr.BTY,dataType:ABISCode.QryFieldType.CODE,codeName:"CARD_MEX_ERR_LOG|BTY"},
	        			{colName:"FGP",dispName:tarr.FGP,dataType:ABISCode.QryFieldType.CODE,codeName:"CARD_MEX_ERR_LOG|FGP"},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.QryFieldType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"CARD_MEX_ERR_LOG",null,searchStr);
	        		return searchMgr;
			}
		}
}