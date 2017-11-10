var Quota=
{
		
		quotaTableMgr:function(type,id,pageNumStr)
		{
			if(type==QuotaMenuType.QuotaConfigList)
				return Quota.QuotaConfigListTableMgr(id,pageNumStr);
			else if(type==QuotaMenuType.QuotaConfigGroupList)
				return Quota.QuotaConfigGroupListTableMgr(id,pageNumStr);
			
			
			else if(type==QuotaMenuType.UserQuotaConfig)
				return Quota.UserQuotaTableMgr(id,pageNumStr);
			else if(type==QuotaMenuType.UserQuotaGroupConfig)
				return Quota.UserQuotaGroupTableMgr(id,pageNumStr);
			
			else if(type==QuotaMenuType.PersonnelQuotaRecordConfig)
				return Quota.PersonnelQuotaTableMgr(id,pageNumStr);
			else if(type==QuotaMenuType.LatentQuotaRecordConfig)
				return Quota.LatentQuotaRecordConfigTableMgr(id,pageNumStr);
			
			else if(type==QuotaMenuType.MatchQuotaRecordConfig)
				return Quota.MatchQuotaRecordConfigTableMgr(id,pageNumStr);
			else if(type==QuotaMenuType.MatchOperationQuotaConfig)
				return Quota.MatchOperationQuotaConfigTableMgr(id,pageNumStr);
		},
		webSearchMgr:function(type,id,searchStr,textarray)
		{
			if(type==QuotaMenuType.QuotaConfigList)
				return Quota.QuotaConfigListWebSearchMgr(id,searchStr,textarray);
			else if(type==QuotaMenuType.QuotaConfigGroupList)
				return Quota.QuotaConfigGroupListWebSearchMgr(id,searchStr,textarray);
			
			else if(type==QuotaMenuType.UserQuotaConfig)
				return Quota.UserQuotaConfigWebSearchMgr(id,searchStr,textarray);
			else if(type==QuotaMenuType.UserQuotaGroupConfig)
				return Quota.UserQuotaGroupConfigWebSearchMgr(id,searchStr,textarray);
			
			else if(type==QuotaMenuType.PersonnelQuotaRecordConfig)
				return Quota.PersonnelQuotaRecordConfigWebSearchMgr(id,searchStr,textarray);
			else if(type==QuotaMenuType.LatentQuotaRecordConfig)
				return Quota.LatentQuotaRecordConfigWebSearchMgr(id,searchStr,textarray);
			
			else if(type==QuotaMenuType.MatchQuotaRecordConfig)
				return Quota.MatchQuotaRecordConfigWebSearchMgr(id,searchStr,textarray);
			else if(type==QuotaMenuType.MatchOperationQuotaConfig)
				return Quota.MatchOperationQuotaConfigWebSearchMgr(id,searchStr,textarray);
			
		},
		
		
		QuotaConfigListWebSearchMgr:function(id,searchStr,textarray)
		{			
			
			var tarr = 
				[
				 {colName:"ID",dispName:textarray.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},				 
				 {colName:"NAME",dispName:textarray.name,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CFG_TYPE",dispName:textarray.cfgType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"QUOTA_TYPE|CFG_TYPE"},
				 {colName:"OP_TYPE",dispName:textarray.opType,dataType:ABISCode.StorageDataType.UNKOWN,codeName:"QUOTA_CFG|OP_TYPE"}
				];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				SearchMgrColInfo = eval('(' + SearchMgrColInfo + ')');
				SearchMgrColInfo.cols = columnInfos;
				SearchMgrColInfo = $.toJSON(SearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"QUOTA_CFG_VIEW",null,searchStr,null,null,SearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		QuotaConfigListTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
    		var cols = ["ID","NAME","CFG_TYPE","OP_TYPE","DESCRIPTION","CREATE_USER","CREATE_TIME","UPDATE_USER","UPDATE_TIME"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"QUOTA_CFG_VIEW",
				cols:cols,
				url:path,
				where:null,
				orderCol:"CREATE_TIME",
				order:WebCode.Order.DESC,
				pageSize:25,
				pageBarId:"SubPage",
				/*callBack:{onClick:selectItem},*/
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true,
				/*link:{cols:["ID"],callBack:clickLink},*/
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		QuotaConfigGroupListWebSearchMgr:function(id,searchStr,textarray)
		{   		
			var tarr = 
        		[
        			{colName:"ID",dispName:"ID",dataType:ABISCode.StorageDataType.STRING,codeName:null},
        			{colName:"GROUP_NAME",dispName:textarray.groupName,dataType:ABISCode.StorageDataType.STRING,codeName:null}
        		];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				groupSearchMgrColInfo = eval('(' + groupSearchMgrColInfo + ')');
				groupSearchMgrColInfo.cols = columnInfos;
				groupSearchMgrColInfo = $.toJSON(groupSearchMgrColInfo);
			}
        		var searchMgr = new WebSearchMgr(id,tarr,3,"quota_cfg_group",null,searchStr,null,null,groupSearchMgrColInfo,resetFunction);
        		return searchMgr;
		},
		QuotaConfigGroupListTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
    		var cols = ["ID","GROUP_NAME","GROUP_DESCRIPTION","CREATE_USER","CREATE_TIME","UPDATE_USER","UPDATE_TIME"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"quota_cfg_group",
				cols:cols,
				url:path,				
				orderCol:"CREATE_TIME",
				order:WebCode.Order.DESC,
				pageSize:25,
				pageBarId:"SubPage",
				/*callBack:{onClick:selectItem},*/
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true,
				/*link:{cols:["ID"],callBack:clickLink},*/
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
    		return tblMgr;
		},

		UserQuotaConfigWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr =
				[
				 {colName:"NAME",dispName:textarray.userName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"USER_ID",dispName:textarray.URID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CFG_NAME",dispName:textarray.name,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"CFG_TYPE",dispName:textarray.cfgType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"USER_QUOTA_CFG|CFG_TYPE"},
				 {colName:"OP_TYPE",dispName:textarray.opType,dataType:ABISCode.StorageDataType.UNKOWN,codeName:"USER_QUOTA_CFG|OP_TYPE"}
				];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				userSearchMgrColInfo = eval('(' + userSearchMgrColInfo + ')');
				userSearchMgrColInfo.cols = columnInfos;
				userSearchMgrColInfo = $.toJSON(userSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_QUOTA_VIEW",null,searchStr,null,null,userSearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		UserQuotaTableMgr:function(tableid,pageNumStr)
		{
			quotaItemsTblMgr.refresh();
			var path=WebVar.VarPath + "/sys/quotalist/query";
			var cols = ["ID","NAME","USER_ID","CFG_NAME","CFG_ID","CFG_TYPE","OP_TYPE"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"USER_QUOTA_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					order:WebCode.Order.DESC,
					pageBarId:"SubPage",
					/*callBack:{onClick:selectItem},*/
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					/*link:{cols:["ID"],callBack:clickLink},*/
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
			return tblMgr;
		},
		UserQuotaGroupConfigWebSearchMgr:function(id,searchStr,textarray)
		{
			quotaGroupTblMgr.refresh();
			var tarr =
				[
				 {colName:"ID",dispName:"ID",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"NAME",dispName:textarray.GroupURName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"USER_ID",dispName:textarray.GroupURID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
                 {colName:"GROUP_NAME",dispName:textarray.groupName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
                 {colName:"PROP_ID GROUP_ID",dispName:textarray.propId,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null}
				];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				userGroupSearchMgrColInfo = eval('(' + userGroupSearchMgrColInfo + ')');
				userGroupSearchMgrColInfo.cols = columnInfos;
				userGroupSearchMgrColInfo = $.toJSON(userGroupSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_QUOTA_GROUP_VIEW",null,searchStr,null,null,userGroupSearchMgrColInfo,resetFunction);
            searchMgr.hideConfg();
			return searchMgr;
		},
		UserQuotaGroupTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
			var cols = ["ID","NAME","USER_ID","GROUP_ID","GROUP_NAME"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"USER_QUOTA_GROUP_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					order:WebCode.Order.DESC,
					pageBarId:"SubPage",
					/*callBack:{onClick:selectItem},*/
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					/*link:{cols:["ID"],callBack:clickLink},*/
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
			return tblMgr;
		},
		PersonnelQuotaRecordConfigWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr =
				[
				 {colName:"USER_ID",dispName:textarray.URID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"OP_TYPE",dispName:textarray.opType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"QUOTA_CFG|OP_TYPE"},
				 {colName:"QUOTA_DATE",dispName:textarray.quotaDate,dataType:ABISCode.StorageDataType.DATE,codeName:null}
				 ];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				personnelSearchMgrColInfo = eval('(' + personnelSearchMgrColInfo + ')');
				personnelSearchMgrColInfo.cols = columnInfos;
				personnelSearchMgrColInfo = $.toJSON(personnelSearchMgrColInfo);
			}
			/*var extwhere = [{colName:"CFG_TYPE",dataType:ABISCode.StorageDataType.STRING,value1:1}];*/
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_TP_QUOTA_REC_VIEW",null,searchStr,null,null,personnelSearchMgrColInfo,resetFunction);
			return searchMgr;
		},

		PersonnelQuotaTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
			var cols = ["ID","USER_ID","USERNAME","OP_TYPE","QUOTA_DATE","USAGE_CNT"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"USER_TP_QUOTA_REC_VIEW",
					cols:cols,
					url:path,
					initWhere:null,
					orderCol:"QUOTA_DATE",
					order:WebCode.Order.DESC,
					pageBarId:"SubPage",
					/*callBack:{onClick:selectItem},*/
					sort:{colName:"QUOTA_DATE",order:WebTable.DES},
					multiSelect:true,
					/*link:{cols:["URID"],callBack:clickLink},*/
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
			return tblMgr;
		},

		LatentQuotaRecordConfigWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr =
				[
				 {colName:"USER_ID",dispName:textarray.URID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"OP_TYPE",dispName:textarray.opType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"QUOTA_CFG|OP_TYPE"},
				{colName:"QUOTA_DATE",dispName:textarray.quotaDate,dataType:ABISCode.StorageDataType.DATE,codeName:null}
				 ];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				latentSearchMgrColInfo = eval('(' + latentSearchMgrColInfo + ')');
				latentSearchMgrColInfo.cols = columnInfos;
				latentSearchMgrColInfo = $.toJSON(latentSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_LP_QUOTA_REC_VIEW",null,searchStr,null,null,latentSearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		LatentQuotaRecordConfigTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
			var cols = ["ID","USER_ID","USERNAME","OP_TYPE","QUOTA_DATE","USAGE_CNT"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"USER_LP_QUOTA_REC_VIEW",
					cols:cols,
					url:path,
					initWhere:null,
					orderCol:"QUOTA_DATE",
					order:WebCode.Order.DESC,
					pageBarId:"SubPage",
					/*callBack:{onClick:selectItem},*/
					sort:{colName:"QUOTA_DATE",order:WebTable.DES},
					multiSelect:true,
					/*link:{cols:["URID"],callBack:clickLink},*/
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
			return tblMgr;
		},

		MatchQuotaRecordConfigWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr =
				[
				 {colName:"USER_ID",dispName:textarray.URID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"OP_TYPE",dispName:textarray.opType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"QUOTA_CFG|OP_TYPE"},
				 {colName:"QUOTA_DATE",dispName:textarray.quotaDate,dataType:ABISCode.StorageDataType.DATE,codeName:null}
				 ];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				submitSearchMgrColInfo = eval('(' + submitSearchMgrColInfo + ')');
				submitSearchMgrColInfo.cols = columnInfos;
				submitSearchMgrColInfo = $.toJSON(submitSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_QUOTA_USAGE4FILTER_VIEW",null,searchStr,null,null,submitSearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		MatchQuotaRecordConfigTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
			var cols = ["ID","USER_ID","USERNAME","OP_TYPE","QUOTA_DATE","USAGE_CNT","FILTER_ID"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"USER_QUOTA_USAGE4FILTER_VIEW",
					cols:cols,
					url:path,
					initWhere:[{colName:"CFG_TYPE",dataType:ABISCode.StorageDataType.STRING,value1:3}],
					orderCol:"QUOTA_DATE",
					order:WebCode.Order.DESC,
					pageBarId:"SubPage",
					/*callBack:{onClick:selectItem},*/
					sort:{colName:"QUOTA_DATE",order:WebTable.DES},
					multiSelect:true,
					/*link:{cols:["URID"],callBack:clickLink},*/
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
			return tblMgr;
		},
		MatchOperationQuotaConfigWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr =
				[
				 {colName:"USER_ID",dispName:textarray.URID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"OP_TYPE",dispName:textarray.opType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"QUOTA_CFG|OP_TYPE"},
				 {colName:"QUOTA_DATE",dispName:textarray.quotaDate,dataType:ABISCode.StorageDataType.DATE,codeName:null}
				 ];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				matchSearchMgrColInfo = eval('(' + matchSearchMgrColInfo + ')');
				matchSearchMgrColInfo.cols = columnInfos;
				matchSearchMgrColInfo = $.toJSON(matchSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_TASK_QUOTA_REC_VIEW",null,searchStr,null,null,matchSearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		MatchOperationQuotaConfigTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/quotalist/query";
			var cols = ["ID","USER_ID","USERNAME","OP_TYPE","QUOTA_DATE","USAGE_CNT"];
			var tblParam =
			{
					tblId:tableid,
					tblName:"USER_TASK_QUOTA_REC_VIEW",
					cols:cols,
					url:path,
					orderCol:"QUOTA_DATE",
					order:WebCode.Order.DESC,
					initWhere:null,
					pageBarId:"SubPage",
					/*callBack:{onClick:selectItem},*/
					sort:{colName:"QUOTA_DATE",order:WebTable.DES},
					multiSelect:true,
					/*link:{cols:["URID"],callBack:clickLink},*/
					language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);
			return tblMgr;
		},

		addQuotaCfgOpenPage2 :function(quotaOpTypes,dialogId,formId)
		{
			$.dialog({
                title: AbisMessageResource["quotaCfgTitle"],
                content: document.getElementById(dialogId),
                button: [
                         {
                        	 value: AbisMessageResource.ToolTipText["Previous"],
                             callback: function () {
                            	 add();
                            	 return true;
                             }
                         },
                         {
                             value: AbisMessageResource.ToolTipText["Save"],
                             callback: function () {
                            	 return Quota.save();
                             }
                         },
                         {
                             value: AbisMessageResource.ToolTipText['Cancel'],
                             callback: function () {

                            	 return true;
                             }
                         }

                     ]
            });


			function create(quotaOpTypes)
			{
				 var $selectQuota = $(".cur").find("input");
		        	var selectQuotaType = $selectQuota.val();
		        	var selectOpType = $selectQuota.attr("data_opType");
		          if(selectQuotaType==3&&selectOpType==6){

		          }else{
		        	  var quotaTypeHtml = "";
		                 $.each(quotaOpTypes,function(index,value){
		                	 if(value.code!='6'&&value.code!='7'){
		                		 quotaTypeHtml += '<tr class="drow" id="ColTable_table_'+(index+1)+'" cssname="drow">'+
			                     '<td class="cell first_cell"><input id="" name="quotaID'+index+'" type="hidden" rowid="ColTable_table_'+(index+1)+'" value="0"/>'+
			                     '<input name="quotaType'+index+'" type="checkbox" class="M_Left_8" rowid="ColTable_table_'+(index+1)+'"';
			                     /*if(value.isCheck){
			                         quotaTypeHtml += ' checked ';
			                     }*/
			                     quotaTypeHtml +=' value="'+value.code+'"></td>'+
			                     '<td class="cell cell_min_w"><div class="tableInput" id="quotaName'+index+'"></div></td>'+
			                     '<td class="cell cell_min_w"><div class="tableInput" id="quotaDesc'+index+'"></div></td>'+
			                     '<td class="cell cell_min_w"><div class="cntinput tableInput" id="quotaCnt'+index+'"></div></td>'+
			                 '</tr>';
		                	 }

		                 });

		                 $("#ColTable_table tbody").append(quotaTypeHtml);
		          }
			}

				create(quotaOpTypes);

		},
         save:function(){
        	 var jdata = {};
        	 var saveData = new Array();
        	 var $selectQuota = $(".cur").find("input");
	        	var selectQuotaType = $selectQuota.val();
	        	var selectOpType = $selectQuota.attr("data_opType");
			 var qTableId = "#ColTable_table";

	        var quotaOpTypeSel;
	        if($("#quotaFilterId").val()>0){
	        	var rowData = tblMgr.getTable().getRowDataPlus(tblMgr.getTable().getSelectIndex());
	        	selectQuotaType = rowData.CFG_TYPE;
	        	selectOpType = rowData.OP_TYPE;
	        }
	        jdata.quotaType = selectQuotaType;
	        jdata.opType = selectOpType;
			 if(selectQuotaType==3&&selectOpType==6){
				 var qcfgName;
			     var qcfgDescription;
				 qcfgName = quotacfgName_sub.getValue();
				 qcfgDescription = quotacfgDescription_sub.getValue();
	        	 quotaOpTypeSel = "";
	        	 qTableId = "#ColTable_filter_table";
	        	 if(WebUtil.isEmpty(qcfgName)){
  		    		//名称为空
  		    		DialogUtil.openSimpleDialog(textArray.QuotaNameEmpty);
						return false;
	  		    }
	        	 jdata.quotaCfgName = qcfgName;
	        	 jdata.quotaCfgDesc = qcfgDescription;
	        	 jdata.quotaId = $("#quotaFilterId").val();
	          }else{
	        	  quotaOpTypeSel = "input:checkbox";
	          }


	        	  var toSave = true;
	        	  $(qTableId).find("tr").each(function(){

	        		    var tdArr = $(this).children();
	        		    if((selectQuotaType==3&&selectOpType==6&&tdArr.eq(3).find("input").length>0)||tdArr.eq(0).find("input:checkbox").is(':checked')){

	        		    	if(WebUtil.isEmpty(tdArr.eq(3).find("input").val())){
	        		    		//限额为空
	        		    		DialogUtil.openSimpleDialog( $(tdArr.eq(1).find("input")).val()+" "+textArray.QuotaCntEmpty);
	        		    		toSave = false;
	        		    		return false;
	        		    	}

	        		    	var arr = {};

		   		        	if(selectQuotaType==ABISCode.UserQuotaCfgType.QUERY&&selectOpType==ABISCode.UserQuotaOpType.SUBMIT_QUERY){
		   		        		arr.quotaOpType = ABISCode.UserQuotaOpType.SUBMIT_QUERY;
		   		        		jdata.opType=ABISCode.UserQuotaOpType.SUBMIT_QUERY;

                            }else{
		   		        		jdata.opType=tdArr.eq(0).find(quotaOpTypeSel).val();
		   		        		arr.quotaOpType = tdArr.eq(0).find(quotaOpTypeSel).val();

                            }
		   		        	arr.quotaName=tdArr.eq(1).find("input").val();
		   		        	arr.quotaDesc=tdArr.eq(2).find("input").val();
		   		        	arr.quotaCnt=tdArr.eq(3).find("input").val();
                            arr.itemId = tdArr.eq(0).find(".quotaItemId").val();

		   		        	if(selectQuotaType==ABISCode.UserQuotaCfgType.QUERY&&selectOpType==ABISCode.UserQuotaOpType.SUBMIT_QUERY){
		   		        		arr.quotaFilter=tdArr.eq(0).find("[data-quotaFilter]").val();
		   		        	}
		   		        	saveData.push(arr);
	        		    }
	        		  });
	        	  if(!toSave)
	        	  {
	        		  return false;
	        		}else{
	        		  if(saveData.length==0){
		        		  DialogUtil.openSimpleDialog(textArray.NoRecordSelected);
			                return false;
		        	  }
	        	  }
	    	  jdata.quotas=saveData;
	    	  jdata = $.toJSON(jdata);
	    	  jQuery.ajax({
                  type : 'POST',
                  contentType : 'application/json',
                  dataType : 'json',
                  url : WebVar.VarPath+"/sys/quotalist/saveQuotaCfg/",
                  data : jdata,
                  success : function(data)
                  {
                      if(data == null)return false;
                      if(data.status == "ok")
                      {
                          tblMgr.refresh();
                          return true;
                      }
                      else
                      {
                          DialogUtil.openSimpleDialog(data.msg);
                          return false;
                      }
                  },
                  error : function(e)
                  {
                      DialogUtil.openSimpleDialog(e);
                      return false;
                  }
              });

	      },
	      updateQuota:function(formId){
				 var selectQuotaType = $(".cur").find("input").val();
		    	  var formData= $(formId).serialize();
		    	  var jdata = {};
		    	  jdata.quotaCfgId = $("#quotacfgId_update").val();
		    	  jdata.quotaName = quotacfgName_update.getValue();
		    	  jdata.quotaDesc = quotacfgDescription_update.getValue();
		    	  jdata.quotaCnt = quotaCnt_update.getValue();
		    	  jdata.itemId = quotaItemId_update.getValue();
		    	  jdata = $.toJSON(jdata);

		          jQuery.ajax({
		        	  type:"POST",
		        	  url:WebVar.VarPath+"/sys/quotalist/updateQuotaCfg/",
		        	  data:jdata,
		        	  contentType:"application/json",
		        	  dataType:'json',
		        	  success:function(data){
		        		  if(data == null)return;
							if(data.status == "ok")
							{
								tblMgr.refresh();
								quotacfgName_update.setValue('');
	                             quotacfgDescription_update.setValue('');
	                             quotaCnt_update.setValue('');
                                quotaItemId_update.setValue('');
	                             $("#filter_content").val('');
								return true;
							}
							else
							{
								DialogUtil.openSimpleDialog(data.msg);
								return false;
							}
		        	  },
		        	  error:function(e){
		        		  DialogUtil.openSimpleDialog(e);
		        		  return false;
		        	  }
		          });
		      },
		      addQuotaConfig:function(){
		    	  $("#ColTable_table .drow").remove();
		    	  var $selectQuota = $(".cur").find("input");
		        	var selectQuotaType = $selectQuota.val();
		        	var selectOpType = $selectQuota.attr("data_opType");
		        	var dialogId = 'adddialog_page2';
		        	var formId = 'addQuotaCfgForm';
		        	var dialogTitle = '';
		        	//新增配额配置页面 初始化
	        		$("#ColTable_filter_table tbody").html(textArray.filterHeaderHtml);
	        		$("#quotaFilterId").val(0);
	        		quotacfgName_sub.setValue('');
	                quotacfgDescription_sub.setValue('');

		        	if(selectQuotaType==ABISCode.UserQuotaCfgType.TPCARD){
		        		dialogTitle = textArray.PersonnelQuota;
		        	}else if(selectQuotaType==ABISCode.UserQuotaCfgType.LPCARD){
		        		dialogTitle = textArray.LatentQuota;
		        	}else if(selectQuotaType==ABISCode.UserQuotaCfgType.QUERY&&selectOpType==ABISCode.UserQuotaOpType.UNKNOWN){
		        		dialogTitle = textArray.LatentQuota;
		        	}else{
		        		formId = 'addQuotaCfgForm_filter';
		        		dialogId = "adddialog_page2_filter";
		        	}

		            Quota.addQuotaCfgOpenPage2(quotaOpTypes,dialogId,formId);


		            	 $.each(quotaOpTypes,function(i,n)
		                 {
		            		 if(n.code!=ABISCode.UserQuotaOpType.SUBMIT_QUERY&&n.code!=ABISCode.UserQuotaOpType.TASK_EXECUTE){
		            		 var qNameStr = '';
		            		 if(selectQuotaType==ABISCode.UserQuotaCfgType.TPCARD){
		            			 qNameStr = textArray.Personnel;
		 		        	}else if(selectQuotaType==ABISCode.UserQuotaCfgType.LPCARD){
		 		        		qNameStr = textArray.Latent;
		 		        	}else if(selectQuotaType==ABISCode.UserQuotaCfgType.QUERY&&selectOpType==ABISCode.UserQuotaOpType.UNKNOWN){
		 		        		qNameStr = textArray.MatchTask;
		 		        	}else{
		 		        		qNameStr = textArray.MatchTaskSubmit;
		 		        	}
		            		 qNameStr += n.text;
		            		 qName[i] = WebUI.createText("quotaName"+i,"quotaName"+i,"WebTextField",null,this.requiredField);
		            		 qName[i].setValue(qNameStr);
		            		 qName[i].setText(qNameStr);
		                     WebUI.createText("quotaDesc"+i,"quotaDesc"+i,"WebTextField",null,this.requiredField);
		                     WebUI.createText("quotaCnt"+i,"quotaCnt"+i,"WebTextField filtercnt",null,this.requiredField);
		            		 }
		            	});

		            return true;
		        },
		        addFilter:function(){
		        	quotaName_sub.setValue('');
                    quotacfgDescription_sub.setValue('');
		             quotaCnt_sub.setValue('');
		             quotaFilter_sub.setValue('');
		             $("#filter_content").val('')

		        	$.dialog({
		                title: AbisMessageResource["quotaCfgTitle"],
		                content: document.getElementById('adddialog_page2_filter_Sub'),
		                okValue: AbisMessageResource.ToolTipText["Save"],
		                cancelValue:AbisMessageResource.ToolTipText["Cancel"],
		                ok: function () {
		                	return Quota.addFilterAppendRows();
		                	},
		                cancel: function () {
		                   return true;
		                }
		            });
		        },
		         addFilterAppendRows:function(){
		        	var quotaName = quotaName_sub.getValue();
		        	var quotaDesc = quotaDescription_sub.getValue();
		        	var quotaCnt = quotaCnt_sub.getValue();
//		        	quotaFilter_sub.getValue()
		        	var quotaFilter = $("#filter_content").val();
		        	if(WebUtil.isEmpty(quotaFilter)){
		        		DialogUtil.openSimpleDialog(textArray.FilterEmpty);
		        		return false;
		        	}
		        	if(WebUtil.isEmpty(quotaCnt)){
		        		DialogUtil.openSimpleDialog(textArray.QuotaCntEmpty);
		        		return false;
		        	}
		        	 var quotaTypeHtml = "";
		                 quotaTypeHtml += '<tr id="ColTable_table_'+(filterRowID+1)+'" data-filterRowID="'+filterRowID+'">'+
		                 '<td style="display: none;"><textarea data-quotaFilter style="display:none">'+quotaFilter+'</textarea>'+
			             '<input name="quotaType'+filterRowID+'" class="quotaType" type="hidden" value="3"/></td>'+
		                 '<td   class="cell cell_min_w"><input data-quotaName readonly name="quotaName'+filterRowID+'" type="text" style="background:transparent;border:0px solid #ffffff" value="'+quotaName+'"/></td>'+
		                 '<td   class="cell cell_min_w"><input data-quotaDesc readonly name="quotaDesc'+filterRowID+'" type="text" style="background:transparent;border:0px solid #ffffff" value="'+quotaDesc+'"/></td>'+
		                 '<td   class="cell cell_min_w"><input data-quotaCnt class="filtercnt" readonly name="quotaCnt'+filterRowID+'" type="text" style="background:transparent;border:0px solid #ffffff" value="'+quotaCnt+'"/>'+
		                 '</td>'+
		             '</tr>';
		             filterRowID++;
		             $("#ColTable_filter_table tbody").append(quotaTypeHtml);

		             quotaName_sub.setValue('');
		             quotaDescription_sub.setValue('');
		             quotaCnt_sub.setValue('');
		             quotaFilter_sub.setValue('');
		             $("#filter_content").val('')
		             return true;
		        },
		         editFilter:function(){
		        	if($(".selrow").length<=0){
		                DialogUtil.openSimpleDialog(textArray.NoRecordSelected);
		                return;
		           }
		        	quotaName_sub.setValue($(".selrow [data-quotaName]").val());
		             quotaDescription_sub.setValue($(".selrow [data-quotaDesc]").val());
		             quotaCnt_sub.setValue($(".selrow [data-quotaCnt]").val());
		             quotaFilter_sub.setValue($(".selrow [data-quotaFilter]").val());
		             $("#filter_content").val($(".selrow [data-quotaFilter]").val());
		        	$.dialog({
		                title: AbisMessageResource["quotaCfgTitle"],
		                content: document.getElementById('adddialog_page2_filter_Sub'),
		                button: [
		                         {
		                             value: AbisMessageResource.ToolTipText["Save"],
		                             callback: function () {
		                            	 Quota.editFilterSave();
		                                 return true;
		                             }
		                         },
		                         {
		                             value: AbisMessageResource.ToolTipText['Cancel'],
		                             callback: function () {
		                                 return true;
		                             }
		                         }
		                     ]
		            });
		        },
		        editFilterSave:function(){
		            var quotaName = quotaName_sub.getValue();
		            var quotaDesc = quotaDescription_sub.getValue();
		            var quotaCnt = quotaCnt_sub.getValue();
		            var quotaFilter =$("#filter_content").val();
//		            	quotaFilter_sub.getValue();

		            $(".selrow [data-quotaName]").val(quotaName);
		            $(".selrow [data-quotaDesc]").val(quotaDesc);
		            $(".selrow [data-quotaCnt]").val(quotaCnt);
		            $(".selrow [data-quotaFilter]").val(quotaFilter);

		            quotaName_sub.setValue('');
		             quotaDescription_sub.setValue('');
		             quotaCnt_sub.setValue('');
		             quotaFilter_sub.setValue('');
		             $("#filter_content").val("");
		        },
		        delFilter:function(){
		        	if($(".selrow").hasClass("header")) return;
		            if($(".selrow:not(.header)").length<=0){
		                DialogUtil.openSimpleDialog(textArray.NoRecordSelected);
		                return;
		           }
		            var callback = function(){
		            	$(".selrow:not(.header)").remove().remove();
		            }
		            DialogUtil.openComfirmDialogForOcx(textArray.DeleteConfirmInfoTip,callback);
		        },
		        searchQuotaId:function(){

		        },
		        searchQuotas:function(){
		        	var whereParam = new Array();
		        	//quotaGroupSubPageTblMgr.setQryParam({colName: "NAME", dataType: 2, value1: "捺印*"});
		        	if(opType.getValue()!=null&&opType.getValue()!=''){
		        		var where = {};
			        	where.colName="OP_TYPE";
			        	where.dataType=2;
			        	where.value1=opType.getValue();
			        	whereParam.push(where);
		        	}
		        	if(objType.getValue()!=null&&objType.getValue()!=''){
		        		var where = {};
			        	where.colName="CFG_TYPE";
			        	where.dataType=2;
			        	where.value1=objType.getValue();
			        	whereParam.push(where);
		        	}

		        	quotaGroupSubPageTblMgr.setQryParam(whereParam);
		        	quotaGroupSubPageTblMgr.refresh();
		        },
		        addQuotaToGroup:function(){
		        	Quota.clearQuotas();
		        	var path=WebVar.VarPath + "/sys/quotalist/query";
		    		var cols = ["ID","NAME","CFG_TYPE","OP_TYPE","DESCRIPTION"];
		    		if(quotaGroupSubPageTblMgr ==undefined){
		    			$("#quotaGroupSubPage").html("");
		    			var tblParam =
						{
							tblId:"ColTable_group_table_searchQuota",
							tblName:"QUOTA_CFG",
							cols:cols,
							url:path,
							where:null,
							orderCol:"ID",
							order:WebCode.Order.DESC,
							pageSize:25,
							isCheck:true,
							checkedIds:GroupMemberId,
							pageBarId:"quotaGroupSubPage",
							/*callBack:{onClick:selectItem},*/
							sort:{colName:"ID",order:WebTable.ASC},
							multiSelect:true,
							checkAll:false,
							/*link:{cols:["ID"],callBack:clickLink},*/
							language:pageNumStr
						}
			    		quotaGroupSubPageTblMgr = new TableControlMgr(tblParam);	
			    		
		    		}else{
		    			quotaGroupSubPageTblMgr.qryParam.where=null;
		    			quotaGroupSubPageTblMgr.param.checkedIds = GroupMemberId;
		    			quotaGroupSubPageTblMgr.qryParam.checkedIds = GroupMemberId;
		    			quotaGroupSubPageTblMgr.refresh();
		    		}
		    		
		        	$.dialog({
		                title:  textArray.AddQuotaEntries,
		                content: document.getElementById('addQuotaCfgGroupDialog_searchQuota'),     
		                okValue: AbisMessageResource.ToolTipText["Save"],
		                cancelValue:AbisMessageResource.ToolTipText["Cancel"],     
		                ok: function () {
		                	GroupMemberId = GroupMemberIdNew;
		                	GroupMemberCfgType = GroupMemberCfgTypeNew
		                	 GroupMemberOpType = GroupMemberOpTypeNew;
		                	 Quota.addQuotaAppendRowsToGroup();
		                	 return true;
		                	},
		                cancel: function () {
		                	GroupMemberIdNew = GroupMemberId;
		                	 GroupMemberCfgTypeNew =  GroupMemberCfgType;
		                	 GroupMemberOpTypeNew =  GroupMemberOpType;
		                   return true;
		                }
		            });
		        	
		        },
		        addQuotaAppendRowsToGroup:function(){
		        	var whereParam = new Array();
		            if(GroupMemberId.length>0){
		            	$.each(GroupMemberId,function(i,n){
		            		var where = {};
		                	where.colName="ID";
		                	where.dataType=2;
		                	where.value1=n;
		                	whereParam.push(where);
		            	})
		            }else{
		            	var where = {};
	                	where.colName="ID";
	                	where.dataType=2;
	                	where.value1=0;
	                	whereParam.push(where);
		            }
		            groupTblMgr.qryParam.colList=["ID", "NAME", "CFG_TYPE", "OP_TYPE", "DESCRIPTION"];
	            	groupTblMgr.qryParam.tblName="QUOTA_CFG";
	            	groupTblMgr.qryParam.where=whereParam;
	           	 	groupTblMgr.refresh();
		        },
		        delGroupMember:function(){
		        	var delRows = groupTblMgr.table.getSelectItems();
		        	if(delRows.length<=0){
		                DialogUtil.openSimpleDialog(textArray.NoRecordSelected);
		                return;
		           }
		            var callback = function(){
		            	$.each(delRows,function(i,n){
		                	var delId = n.ID;
		                	GroupMemberId.splice($.inArray(delId,GroupMemberId),1);
		                	GroupMemberCfgType.splice($.inArray(delId,GroupMemberId),1);
		                	GroupMemberOpType.splice($.inArray(delId,GroupMemberId),1);

		                	GroupMemberIdNew.splice($.inArray(delId,GroupMemberIdNew),1);
		                	GroupMemberCfgTypeNew.splice($.inArray(delId,GroupMemberIdNew),1);
		                	GroupMemberOpTypeNew.splice($.inArray(delId,GroupMemberIdNew),1);
		            	});
		            	Quota.addQuotaAppendRowsToGroup();
		            }
		            DialogUtil.openComfirmDialogForOcx(textArray.DeleteConfirmInfoTip,callback);
		            
		        },
		        saveQuotaGroup:function(){
		        	if(groupName.getValue()==''){
		        		DialogUtil.openSimpleDialog(textArray.GroupName2IsEmpty);
		        		return false;
		        	}
		        	
		        	var data = {};
		        	var idArr = new Array();
		        	var cfgTypeArr = new Array();
		        	var opTypeArr = new Array();
		        	data.groupId = $("#groupId").val();
		        	data.groupName = groupName.getValue();
		        	data.groupDesc = groupDescription.getValue();
		        	
		        	var rows = groupTblMgr.table.getAllItems();
		        	for(var i in rows){
		        		var row = rows[i];
		        		idArr.push(row.ID);
		        		cfgTypeArr.push(row.CFG_TYPE);
		        		opTypeArr.push(row.OP_TYPE);
		        	}
		        	if(idArr.length==0){
		        		DialogUtil.openSimpleDialog(textArray.QuotaItemsInThisGroupIsEmpty);
		        		return false;
		        	}
		        	data.quotaIds=idArr;
		        	data.opTypes=opTypeArr;
		        	data.cfgTypes=cfgTypeArr;
		        	data.existIds= $("#existIds").val();
		        	var formData = $.toJSON(data);
		        	
			          jQuery.ajax({
			        	  type:"POST",
			        	  contentType:'application/json',
			        	  dataType:'json',
			        	  url:WebVar.VarPath+"/sys/quotalist/saveQuotaCfgGroup/",
			        	  data:formData,
			        	  success:function(data){
			        		  if(data == null)return false;
		                      if(data.status == "ok")
		                      {
	                             groupName.setValue("");
	                             groupDescription.setValue("");
		                          tblMgr.refresh();
		                          return true;
		                      }
		                      else
		                      {
		                          DialogUtil.openSimpleDialog(data.msg);
		                          return false;
		                      }
			        	  },
			        	  error:function(e){
			        		  DialogUtil.openSimpleDialog(e);
			        		  return false;
			        	  }
			          });
		        },
		        clearQuotas:function(){
		        	opType.setValue(null);
		        	objType.setValue(null);
		        	opType.setText(null);
		        	objType.setText(null);
		        },
		    	advSearch:function(){
		    		if(searchWindow){
		    			searchWindow.open();
		    		}else{
		    			var jdata = {};
		    			jdata.tableName = "MATCH_VIEW";
		    			jdata.callback = function (data){
		    				if(data.SimpFilter_Filter.indexOf("ColNode")>=0){
		    					quotaFilter_sub.setValue(data.SimpFilter_Filter);
			    				$("#filter_content").val(data.SimpFilter_Filter);
		    				}
		    			};
		    			var dataJson = {};
		    			if($("#filter_content").val())
		    			{
		    				dataJson.SimpFilters = new Array();
		    				var simpFilter = DefaultSearchNodes.matchTaskSubmitQuota;
		    				dataJson.SimpFilters.push(simpFilter);
		    				dataJson.SimpFilters.push($("#filter_content").val());
		    			}else{
		    				dataJson.SimpFilter = DefaultSearchNodes.matchTaskSubmitQuota;
		    			}
		    			
		    			jdata.data = dataJson;
		    			searchWindow=ABISWindowUtil.openSearch(jdata)
		    			
		    		}
		    	},
                saveUserQuota:function(flag){ //保存用户配额组，flag:true新增 false编辑
            		var itemList = new Array();
                	if(flag){
            			if(UserMemberIdNew!=null && UserMemberIdNew.length>0){
            				for(var i=0;i<UserMemberIdNew.length;i++){
            					var itemObj = {};
            					itemObj.cfgType = UserMemberCfgTypeNew[i];
            					itemObj.opType = UserMemberOpTypeNew[i];
            					itemObj.cfgId = UserMemberIdNew[i];
            					itemList.push(itemObj);
            				}
            			}else{
            				DialogUtil.openSimpleDialog(AbisMessageResource.Alert['PleaseChooseDataItem']);
            				return false;
            			}
                	}else{
            				if(UserMemberIdNew!=null && UserMemberIdNew.length>0){
                				for(var i=0;i<UserMemberIdNew.length;i++){
                					var itemObj = {};
                					itemObj.urid = $("#user_urid_old").val();
                					itemObj.cfgType = UserMemberCfgTypeNew[i];
                					itemObj.opType = UserMemberOpTypeNew[i];
                					itemObj.cfgId = UserMemberIdNew[i];
                					itemList.push(itemObj);
                				}
                			}else{
            				DialogUtil.openSimpleDialog(AbisMessageResource.Alert['PleaseChooseDataItem']);
            				return false;
            			}
                	}
            		
		    		var model = {};
		    		model.flag = flag;
		    		model.urIds = UserIdNew;
		    		model.itemList = itemList;
		    		model.pkList = pkList;
		    		jQuery.ajax({
		    			type : 'POST',
		    			contentType : 'application/json',
		    			dataType : 'json',
		    			url : WebVar.VarPath+"/sys/quotalist/saveUserQuota/",
		    			data : $.toJSON(model),
		    			success : function(data) 
		    			{
		    				WebUtil.NoWait();
		    		    	if(data.status == "ok")
		    		    	{
		    		    		DialogUtil.openSimpleDialog(AbisMessageResource['SaveSuccess']);
		    		    		tblMgr.refresh();
		    		    	}				    	
		    		    	else
		    		    	{
		    		    		DialogUtil.openSimpleDialog(data.msg);
		    		    		tblMgr.refresh();
		    		    	}
		    			},
		    			error : function(e) 
		    			{
		    				WebUtil.NoWait();
		    				DialogUtil.openSimpleDialog(AbisMessageResource.Alert["ConnectSvrException"]);
		    			}
		    		});
		        },
		    	saveUserQuotaGroup:function(flag){ //保存用户配额组，flag:true新增 false编辑
		    		if( UserGroupIdNew == null){
		    				DialogUtil.openSimpleDialog(AbisMessageResource.Alert['PleaseChooseDataItem']);
		    				return false;
		    			}
		    		var model = {};
		    		model.flag = flag;
		    		model.urIds = UserIdNew;
		    		model.propId = UserPropIDCode.QUOTA_CFG;
		    		model.propValue = UserGroupIdNew;
		    		
		    		jQuery.ajax({
		    			type : 'POST',
		    			contentType : 'application/json',
		    			dataType : 'json',
		    			url : WebVar.VarPath+"/sys/quotalist/saveUserQuotaGroup/",
		    			data : $.toJSON(model),
		    			success : function(data) 
		    			{
		    				WebUtil.NoWait();
		    		    	if(data.status == "ok")
		    		    	{
		    		    		DialogUtil.openSimpleDialog(AbisMessageResource['SaveSuccess']);
		    		    		tblMgr.refresh();
		    		    	}				    	
		    		    	else
		    		    	{
		    		    		DialogUtil.openSimpleDialog(data.msg);
		    		    		tblMgr.refresh();
		    		    	}
		    			},
		    			error : function(e) 
		    			{
		    				WebUtil.NoWait();
		    				DialogUtil.openSimpleDialog(AbisMessageResource.Alert["ConnectSvrException"]);
		    			}
		    		});
		        },
		        initUserCombo:function(){
		        	$.ajax
		            (
		                {
		                    type        : 'POST',
		                    url         : WebVar.VarPath + "/sys/datafilter/qryAllUnitCode/",
		                    data        : {},
		                    dataType    : 'json',
		                    success     : function(data)
		                    {
		                        unitCode_s.setComboData(eval('(' + data + ')'));
		                    },
		                    error : function(e)
		                    {
		                        WebUtil.NoWait();
		                    }
		                }
		            );
		        	$.ajax
		            (
		                {
		                    type        : 'POST',
		                    url         : WebVar.VarPath + "/sys/datafilter/qryAllRoleName/",
		                    data        : {},
		                    dataType    : 'json',
		                    success     : function(data)
		                    {
		                        roleName_s.setComboData(eval('(' + data + ')'));
		                    },
		                    error : function(e)
		                    {
		                        WebUtil.NoWait();
		                    }
		                }
		            );
		        	$.ajax
		            (
		                {
		                    type        : 'POST',
		                    url         : WebVar.VarPath + "/sys/quotalist/qryAllCfgType/",
		                    data        : {},
		                    dataType    : 'json',
		                    success     : function(data)
		                    {
		                        quotaType_q.setComboData(eval('(' + data + ')'));
		                    },
		                    error : function(e)
		                    {
		                        WebUtil.NoWait();
		                    }
		                }
		            );
		        	$.ajax
		            (
		                {
		                    type        : 'POST',
		                    url         : WebVar.VarPath + "/sys/quotalist/qryAllOpType/",
		                    data        : {},
		                    dataType    : 'json',
		                    success     : function(data)
		                    {
		                        opType_q.setComboData(eval('(' + data + ')'));
		                    },
		                    error : function(e)
		                    {
		                        WebUtil.NoWait();
		                    }
		                }
		            );
		        },
		        checkQuotaItems:function(_this,_tblMgr,_tblId,_tblType){
               	 var row = _tblMgr.getTable().getSelectItem();
                    var id = row.ID;
                    var cfgType_temp = row.CFG_TYPE;
                    var opType_temp = row.OP_TYPE;
                    var _memberId;
                    var _memberCfgType;
                    var _memberOpType;
                    if(_tblType=='user'){
                    	_memberId = UserMemberIdNew;
                    	_memberCfgType = UserMemberCfgTypeNew;
                    	_memberOpType = UserMemberOpTypeNew;
                    }else if(_tblType=='group'){
                    	_memberId = GroupMemberIdNew;
                    	_memberCfgType = GroupMemberCfgTypeNew;
                    	_memberOpType = GroupMemberOpTypeNew;
                    }
                    
                    if(_this.checked){
                        if($.inArray(id,_memberId)>=0){
                            DialogUtil.openSimpleDialog(textArray.AlreadyExist);
                            var objIndex = _tblMgr.table.getCheckObjIndex();
                            _tblMgr.table.input.result[objIndex].isCheck = false;
                           $(_this).attr("checked",false);
                            return;
                        }else if($.inArray(cfgType_temp,_memberCfgType)>=0){
                            var rowIndexs = _tblMgr.table.getCheckRowIndices();
                            var objIndexs = _tblMgr.table.getCheckObjIndices();
                            $.each(_tblMgr.table.getCheckItems(),function(i,n){
                                var _id = n.ID;
                                var _cfgType = n.CFG_TYPE;
                                var _opType = n.OP_TYPE;
                                if(_cfgType==cfgType_temp&&_opType==opType_temp&&id!=_id){
                                    $("#"+_tblId).find("TBODY").find("tr:eq(" + (rowIndexs[i]+1) + ")").find('input').first().attr("checked", false);
                                    _tblMgr.table.input.result[objIndexs[i]].isCheck = false;
                                    var _id_inArray = $.inArray(_id,_memberId);
                                    _memberId.splice(_id_inArray,1);
                                    _memberCfgType.splice(_id_inArray,1);
                                    _memberOpType.splice(_id_inArray,1);
                                }
                                });
                                $.each(_memberId,function(i,n){
                                    var _id = n;
                                    var _cfgType = _memberCfgType[$.inArray(_id,_memberId)];
                                    var _opType = _memberOpType[$.inArray(_id,_memberId)];
                                    if(_cfgType==cfgType_temp&&_opType==opType_temp&&id!=_id){
                                        var _id_inArray = $.inArray(_id,_memberId);
                                        _memberId.splice(_id_inArray,1);
                                        _memberCfgType.splice(_id_inArray,1);
                                        _memberOpType.splice(_id_inArray,1);
                                    }
                                });
                           _memberId.push(id); 
                           _memberCfgType.push(cfgType_temp);
                           _memberOpType.push(opType_temp);
                        }else{
                            _memberId.push(id); 
                            _memberCfgType.push(cfgType_temp);
                            _memberOpType.push(opType_temp);
                        }
                    }else{
                        var _id_inArray = $.inArray(id,_memberId);
                       _memberId.splice(_id_inArray,1);
                       _memberCfgType.splice(_id_inArray,1);
                       _memberOpType.splice(_id_inArray,1);
                    }
                    
                    if(_tblType=='user'){

                    	UserMemberIdNew = _memberId;
                    	UserMemberCfgTypeNew = _memberCfgType;
                    	UserMemberOpTypeNew = _memberOpType;
                    }else if(_tblType=='group'){
                    	GroupMemberIdNew = _memberId;
                    	GroupMemberCfgTypeNew = _memberCfgType;
                    	GroupMemberOpTypeNew = _memberOpType;
                    }
                    
                    if(_tblMgr!=undefined){
                        _tblMgr.qryParam.checkedIds = _memberId;
                        _tblMgr.param.checkedIds = _memberId;
                  }
                }
}