var SIMCardInfo =
{
		infoTableMgr:function(type,id,pageNumStr,cardId)
		{
			var wheres = new Array();
			var where = {};
			where.colName = "GI_ID";
			where.dataType = "0";
			where.value1 = "" + cardId + "";
			wheres.push(where);
			if(type == "shortmesId")
			{
				var path=WebVar.VarPath + "/artic/simcardlist/query";
				var cols = ["ID","GI_ID","SENDER_PHONE_NUM","RECEIVER_PHONE_NUM","MSG","SENT_TIME","SMS_CENTER_NO"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"ZLYC_PHONE_MSG",
					where:wheres,
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"SENDER_PHONE_NUM",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "contacId")
			{
				var path=WebVar.VarPath + "/artic/simcardlist/query";
				var cols = ["ID","GI_ID","NAME","TITLE","PHONE_NUM","PHONE_NUM_TYPE","COMMENTS"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"ZLYC_PHONE_CONTACTER",
					cols:cols,
					where:wheres,
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
			if(type == "callrecordId")
			{
				var path=WebVar.VarPath + "/artic/simcardlist/query";
				var cols = ["ID","GI_ID","CALLER_PHONE_NUM","CALLED_PHONE_NUM","START_TIME","END_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"ZLYC_PHONE_CALL_REC",
					cols:cols,
					where:wheres,
					url:path,
					orderCol:"ID",
					pageBarId:"ID",
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
			if(type == "shortmesId")
			{
				var tarr = 
	        		[
	        			{colName:"SENDER_PHONE_NUM",dispName:tarr.SENDER_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"RECEIVER_PHONE_NUM",dispName:tarr.RECEIVER_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MSG",dispName:tarr.MSG,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SENT_TIME",dispName:tarr.SENT_TIME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SMS_CENTER_NO",dispName:tarr.SMS_CENTER_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		]; 
				
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"ZLYC_PHONE_MSG",null,searchStr);
	        		return searchMgr;
			}
			if(type == "contacId")
			{
				var tarr = 
	        		[
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"TITLE",dispName:tarr.TITLE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PHONE_NUM",dispName:tarr.PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PHONE_NUM_TYPE",dispName:tarr.PHONE_NUM_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"COMMENTS",dispName:tarr.COMMENTS,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"ZLYC_PHONE_CONTACTER",null,searchStr);
	        		return searchMgr;
			}
			if(type == "callrecordId")
			{
				var tarr = 
	        		[
	        			{colName:"CALLER_PHONE_NUM",dispName:tarr.CALLER_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CALLED_PHONE_NUM",dispName:tarr.CALLED_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"START_TIME",dispName:tarr.START_TIME,dataType:ABISCode.StorageDataType.DATE,codeName:null},
	        			{colName:"END_TIME",dispName:tarr.END_TIME,dataType:ABISCode.StorageDataType.DATE,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"ZLYC_PHONE_CALL_REC",null,searchStr);
	        		return searchMgr;
			}
		}
}