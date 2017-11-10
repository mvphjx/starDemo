var SysListTableMgr =
{
		sysTableMgr:function(type,id,pageNumStr)
		{
			if(type == "operTableId")
			{
				var path=WebVar.VarPath + "/sys/list/query";
				var cols = ["ID","REC_ID","EVENT_OBJECT_ID","REC_KEY_NUM","EVENT_TYPE","TABLE_NAME","OP_USER","OP_UNIT_CODE","OP_TYPE","OP_CTX","OP_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"TABLE_OPER_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					order:WebTable.DESC,
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
                    order:WebTable.DES,
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					//link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "selectTableId")
			{
				var path=WebVar.VarPath + "/sys/list/query";
				var cols = ["ID","EVENT_OBJ_ID","EVENT_TYPE","TABLE_NAME","SQL_STMT","MAX_RESULT_CNT","RESULT_OFFSET","PROJ_COLS","OP_USER","OP_UNIT_CODE","OP_TYPE","OP_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"TABLE_SELECT_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
                    order:WebTable.DES,
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					//link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "colUpdateTableId")
			{
				var path=WebVar.VarPath + "/sys/list/query";
				var cols = ["ID","REC_ID","EVENT_OBJECT_ID","EVENT_TYPE","REC_KEY_NUM","OLD_VALUE","NEW_VALUE","TABLE_NAME","COL_NAME","OP_USER","OP_UNIT_CODE","OP_TYPE","OP_TIME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"TABLE_COL_UPDATE_LOG",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
                    order:WebTable.DES,
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
			if(type == "operTableId")
			{
				var tarr = 
	        		[
	        			{colName:"EVENT_OBJECT_ID",dispName:tarr.EVENT_OBJECT_ID,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_OPER_LOG|EVENT_OBJ_ID"},
	        			{colName:"EVENT_TYPE",dispName:tarr.EVENT_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_OPER_LOG|EVENT_TYPE",readonly:true},
	        			{colName:"TABLE_NAME",dispName:tarr.TABLE_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"OP_USER",dispName:tarr.OP_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"OP_UNIT_CODE",dispName:tarr.OP_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_OPER_LOG|UNIT_CODE"},
	        			{colName:"OP_TIME",dispName:tarr.OP_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		]; 
				//回调函数修改页面缓存的检索项
				var resetFunction = function(columnInfos){
					operTableColInfo = eval('(' + operTableColInfo + ')');
					operTableColInfo.cols = columnInfos;
					operTableColInfo = $.toJSON(operTableColInfo);
				}
        		var searchMgr = new WebSearchMgr(id,tarr,3,"TABLE_OPER_LOG",null,searchStr,null,null,operTableColInfo,resetFunction);
        		return searchMgr;
			}
			if(type == "selectTableId")
			{
				var tarr = 
	        		[
	        			{colName:"EVENT_OBJ_ID",dispName:tarr.EVENT_OBJECT_ID,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_SELECT_LOG|EVENT_OBJ_ID"},
	        			{colName:"EVENT_TYPE",dispName:tarr.EVENT_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_SELECT_LOG|EVENT_TYPE",readonly:true},
	        			{colName:"TABLE_NAME",dispName:tarr.TABLE_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"OP_USER",dispName:tarr.OP_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"OP_UNIT_CODE",dispName:tarr.OP_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_SELECT_LOG|UNIT_CODE"},
	        			{colName:"OP_TIME",dispName:tarr.OP_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];
				//回调函数修改页面缓存的检索项
				var resetFunction = function(columnInfos){
					selectTableColInfo = eval('(' + selectTableColInfo + ')');
					selectTableColInfo.cols = columnInfos;
					selectTableColInfo = $.toJSON(selectTableColInfo);
				}
        		var searchMgr = new WebSearchMgr(id,tarr,3,"TABLE_SELECT_LOG",null,searchStr,null,null,selectTableColInfo,resetFunction);
        		return searchMgr;
			}
			if(type == "colUpdateTableId")
			{
				var tarr = 
	        		[
	        			{colName:"EVENT_OBJECT_ID",dispName:tarr.EVENT_OBJECT_ID,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_COL_UPDATE_LOG|EVENT_OBJ_ID"},
	        			{colName:"EVENT_TYPE",dispName:tarr.EVENT_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_COL_UPDATE_LOG|EVENT_TYPE",readonly:true},
	        			{colName:"TABLE_NAME",dispName:tarr.TABLE_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"OP_USER",dispName:tarr.OP_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"OP_UNIT_CODE",dispName:tarr.OP_UNIT_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"TABLE_COL_UPDATE_LOG|UNIT_CODE"},
	        			{colName:"OP_TIME",dispName:tarr.OP_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"TABLE_COL_UPDATE_LOG",null,searchStr);
	        		return searchMgr;
			}
		}
}