var NonMatchListTableMgr =
{
		nonMatchTableMgr:function(type,id,pageNumStr)
		{
			if(type == "lpNoMatchId")
			{
				var path=WebVar.VarPath + "/lp/nonmatchlp/query";
				var cols = ["LP_CARD_ID_1","LP_CARD_ID_2","UPDATE_TIME","UPDATE_USER","INI_ENROLL_TIME","INI_ENROLL_USER"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"NON_MATCH_LP_CARD",
					cols:cols,
					url:path,
					orderCol:"LP_CARD_ID_1",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"INI_ENROLL_TIME",order:WebTable.DES},
					multiSelect:true,
					//link:{cols:["LP_CARD_ID_1"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "lptpNoMatchId")
			{
				var path=WebVar.VarPath + "/lp/nonmatchlptp/query";
				var cols = ["LP_CARD_ID","UNI_PERSON_ID","FGP","INI_ENROLL_USER","INI_ENROLL_TIME","UPDATE_USER","UPDATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"NON_MATCH_TP_LP_CARD",
					cols:cols,
					url:path,
					orderCol:"LP_CARD_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"UPDATE_TIME",order:WebTable.DES},
					multiSelect:true,
					//link:{cols:["LP_CARD_ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "tpNoMatchId")
			{
				var path=WebVar.VarPath + "/tp/nonmatchperson/query";
				var cols = ["UNI_PERSON_ID_1","UNI_PERSON_ID_2","INI_ENROLL_USER","INI_ENROLL_TIME","UPDATE_USER","UPDATE_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"NON_MATCH_PERSON",
					cols:cols,
					url:path,
					orderCol:"UNI_PERSON_ID_1",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"UPDATE_TIME",order:WebTable.DES},
					multiSelect:true,
					//link:{cols:["UNI_PERSON_ID_1"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
		},
		webSearchMgr:function(type,id,tarr,searchStr)
		{
			if(type == "lpNoMatchId")
			{
				var tarr = 
	        		[
	        			{colName:"LP_CARD_ID_1",dispName:tarr.LP_CARD_ID_1,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"LP_CARD_ID_2",dispName:tarr.LP_CARD_ID_2,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UPDATE_USER",dispName:tarr.UPDATE_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UPDATE_TIME",dispName:tarr.UPDATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
	        			{colName:"INI_ENROLL_USER",dispName:tarr.INI_ENROLL_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INI_ENROLL_TIME",dispName:tarr.INI_ENROLL_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"NON_MATCH_LP_CARD",null,searchStr);
	        		return searchMgr;
			}
			if(type == "lptpNoMatchId")
			{
				var tarr = 
	        		[
	        			{colName:"LP_CARD_ID",dispName:tarr.LP_CARD_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UNI_PERSON_ID",dispName:tarr.UNI_PERSON_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"FGP",dispName:tarr.FGP,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"NON_MATCH_TP_LP_CARD|FGP"},
	        			{colName:"INI_ENROLL_USER",dispName:tarr.INI_ENROLL_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INI_ENROLL_TIME",dispName:tarr.INI_ENROLL_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
	        			{colName:"UPDATE_USER",dispName:tarr.UPDATE_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UPDATE_TIME",dispName:tarr.UPDATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"NON_MATCH_TP_LP_CARD",null,searchStr);
	        		return searchMgr;
			}
			if(type == "tpNoMatchId")
			{
				var cols = ["UNI_PERSON_ID_1","UNI_PERSON_ID_2","INI_ENROLL_USER","INI_ENROLL_TIME","UPDATE_USER","UPDATE_TIME"];
				var tarr = 
	        		[
	        			{colName:"UNI_PERSON_ID_1",dispName:tarr.UNI_PERSON_ID_1,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UNI_PERSON_ID_2",dispName:tarr.UNI_PERSON_ID_2,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INI_ENROLL_USER",dispName:tarr.INI_ENROLL_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"INI_ENROLL_TIME",dispName:tarr.INI_ENROLL_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
	        			{colName:"UPDATE_USER",dispName:tarr.UPDATE_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"UPDATE_TIME",dispName:tarr.UPDATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"NON_MATCH_PERSON",null,searchStr);
	        		return searchMgr;
			}
		},
		nonMatchCfgMgr:function(type)
		{
			var tblCfg;
			if(type == "lpNoMatchId")
			{
				tblCfg = new TableConfig(UIModuleId.WEB_NOMATCHT_LP_LIST,CfgTypeCode.NOMATCHT_LP_LIST,"NON_MATCH_LP_CARD",saveEnd);

			}
			if(type == "tpNoMatchId")
			{
				tblCfg = new TableConfig(UIModuleId.WEB_NOMATCH_TP_LIST,CfgTypeCode.NOMATCH_TP_LIST,"NON_MATCH_PERSON",saveEnd);

			}
			if(type == "lptpNoMatchId")
			{
				tblCfg = new TableConfig(UIModuleId.WEB_NOMATCH_TP_LP_LIST,CfgTypeCode.NOMATCH_TP_LP_LIST,"NON_MATCH_TP_LP_CARD",saveEnd);
			}
			return tblCfg;
		}
}