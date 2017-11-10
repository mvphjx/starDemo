var DataFilter=
{dataFilterTableMgr:function(type,id,pageNumStr)
		{
			if(type==menuType.DataFilterCfgList)
				return DataFilter.DataFilterCfgListTableMgr(id,pageNumStr);
			else if(type==menuType.DataFilterGroupCfgList)
				return DataFilter.DataFilterGroupCfgListTableMgr(id,pageNumStr);
			
			else if(type==menuType.UserDataFilterCfg)
				return DataFilter.UserDataFilterTableMgr(id,pageNumStr);
			else if(type==menuType.UserDataFilterGroupCfg)
				return DataFilter.UserDataFilterGroupTableMgr(id,pageNumStr);
		},
		webSearchMgr:function(type,id,searchStr,textarray)
		{
			if(type==menuType.DataFilterCfgList)
				return DataFilter.DataFilterCfgListWebSearchMgr(id,searchStr,textarray);
			else if(type==menuType.DataFilterGroupCfgList)
				return DataFilter.DataFilterGroupCfgListWebSearchMgr(id,searchStr,textarray);
			
			else if(type==menuType.UserDataFilterCfg)
				return DataFilter.UserDataFilterCfgMgr(id,searchStr,textarray);
			else if(type==menuType.UserDataFilterGroupCfg)
				return DataFilter.UserDataFilterGroupCfgMgr(id,searchStr,textarray);
		},
		DataFilterCfgListWebSearchMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"ID",dispName:textarray.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},				 
				 {colName:"OBJ_TYPE",dispName:textarray.objType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"DATA_FILTER_ITEM_VIEW|OBJ_TYPE"},
				 {colName:"OBJ_ID",dispName:textarray.objID,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"DATA_FILTER_ITEM_VIEW|OBJ_ID",readonly:true},
				 {colName:"PRIV",dispName:textarray.priv,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"DATA_FILTER_ITEM_VIEW|PRIV"},
				 {colName:"FILTER_NAME",dispName:textarray.filterName,dataType:ABISCode.StorageDataType.STRING,codeName:null}
				];  
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				SearchMgrColInfo = eval('(' + SearchMgrColInfo + ')');
				SearchMgrColInfo.cols = columnInfos;
				SearchMgrColInfo = $.toJSON(SearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"DATA_FILTER_ITEM_VIEW",null,searchStr,null,null,SearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		DataFilterCfgListTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/datafilter/query";
    		var cols = ["ID","OBJ_TYPE","OBJ_ID","PRIV","FILTER_NAME","FILTER_DESCRIPTION","CREATE_USER","CREATE_TIME","UPDATE_USER","UPDATE_TIME"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"DATA_FILTER_ITEM_VIEW",
				cols:cols,
				url:path,
				where:null,
				orderCol:"CREATE_TIME",
                order:WebCode.Order.DESC,
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				multiSelect:true,
				//link:{cols:["ID"],callBack:clickLink},
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		DataFilterGroupCfgListWebSearchMgr:function(id,searchStr,textarray)
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
        		var searchMgr = new WebSearchMgr(id,tarr,3,"PRIV_DATA_FILTER_GROUP",null,searchStr,null,null,groupSearchMgrColInfo,resetFunction);
        		return searchMgr;
		},
		DataFilterGroupCfgListTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/datafilter/query";
    		var cols = ["ID","GROUP_NAME","GROUP_DESCRIPTION","CREATE_USER","CREATE_TIME","UPDATE_USER","UPDATE_TIME"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"PRIV_DATA_FILTER_GROUP",
				cols:cols,
				url:path,				
				orderCol:"CREATE_TIME",
                order:WebCode.Order.DESC,
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				sort:{colName:"CREATE_TIME",order:WebTable.DES},
				multiSelect:true,
				//link:{cols:["ID"],callBack:clickLink},
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		
		UserDataFilterCfgMgr:function(id,searchStr,textarray)
		{
			var tarr = 
				[
				 {colName:"NAME",dispName:textarray.userName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"USER_ID",dispName:textarray.urid,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"FILTER_NAME",dispName:textarray.filterName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"OBJ_TYPE",dispName:textarray.objType,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"PRIV_DATA_FILTER_ITEM|OBJ_TYPE"},
				{colName:"OBJ_ID",dispName:textarray.objID,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"PRIV_DATA_FILTER_ITEM|OBJ_ID",readonly:true},
				 {colName:"PRIV",dispName:textarray.priv,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"USER_DATA_FILTER|PRIV"}
				];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				userSearchMgrColInfo = eval('(' + userSearchMgrColInfo + ')');
				userSearchMgrColInfo.cols = columnInfos;
				userSearchMgrColInfo = $.toJSON(userSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_DATA_FILTER_VIEW",null,searchStr,null,null,userSearchMgrColInfo,resetFunction);
			return searchMgr;
		},
		UserDataFilterTableMgr:function(tableid,pageNumStr)
		{
			filterItemsTblMgr.refresh();
			var path=WebVar.VarPath + "/sys/datafilter/query";
    		var cols = ["ID","NAME","USER_ID","FILTER_NAME","FILTER_ID","OBJ_TYPE","OBJ_ID","PRIV"];
			
    		var tblParam =
			{
				tblId:tableid,
				tblName:"USER_DATA_FILTER_VIEW",
				cols:cols,
				url:path,
				where:null,
				orderCol:"ID",
                order:WebCode.Order.DESC,
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				sort:{colName:"ID",order:WebTable.ASC},
				multiSelect:true,
				/*link:{cols:["ID"],callBack:clickLink},*/
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		UserDataFilterGroupCfgMgr:function(id,searchStr,textarray)
		{
			filterGroupTblMgr.refresh();
			var tarr = 
				[
				 {colName:"ID",dispName:"ID",dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"NAME",dispName:textarray.GroupUrName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
				 {colName:"USER_ID",dispName:textarray.GroupUrId,dataType:ABISCode.StorageDataType.STRING,codeName:null},
                 {colName:"GROUP_NAME",dispName:textarray.groupName,dataType:ABISCode.StorageDataType.STRING,codeName:null},
                 {colName:"GROUP_ID",dispName:textarray.propId,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:null}
				];
			//回调函数修改页面缓存的检索项
			var resetFunction = function(columnInfos){
				userGroupSearchMgrColInfo = eval('(' + userGroupSearchMgrColInfo + ')');
				userGroupSearchMgrColInfo.cols = columnInfos;
				userGroupSearchMgrColInfo = $.toJSON(userGroupSearchMgrColInfo);
			}
			var searchMgr = new WebSearchMgr(id,tarr,3,"USER_DATA_FILTER_GROUP_VIEW",null,searchStr,null,null,userGroupSearchMgrColInfo,resetFunction);
            searchMgr.hideConfg();
			return searchMgr;
		},
		UserDataFilterGroupTableMgr:function(tableid,pageNumStr)
		{
			var path=WebVar.VarPath + "/sys/datafilter/query";
    		var cols = ["ID","NAME","USER_ID","GROUP_NAME","GROUP_ID"];
    		var tblParam =
			{
				tblId:tableid,
				tblName:"USER_DATA_FILTER_GROUP_VIEW",
				cols:cols,
				url:path,
				orderCol:"ID",
                order:WebCode.Order.DESC,
				pageSize:25,
				pageBarId:"SubPage",
				callBack:{onClick:selectItem},
				sort:{colName:"ID",order:WebTable.ASC},
				multiSelect:true,
				/*link:{cols:["ID"],callBack:clickLink},*/
				language:pageNumStr
			}
			var tblMgr = new TableControlMgr(tblParam);	
    		return tblMgr;
		},
		GetPrivs:function(selectObjType,selectObjId){
			var selectObjTypeText = '';
			var _privs = new Array();
			if(selectObjType==ABISCode.PrivObjType.TP_TYPE&&selectObjId==ABISCode.PrivObjId.TP_MIS_PERSON){
				selectObjTypeText = textArray.personnelDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code!=ABISCode.UserPriv.USER_LOGIN){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.LP_TYPE&&selectObjId==ABISCode.PrivObjId.LP_CASE){
				selectObjTypeText = textArray.caseDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code!=ABISCode.UserPriv.USER_LOGIN){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.LP_TYPE&&selectObjId==ABISCode.PrivObjId.LP_CARD){
				selectObjTypeText = textArray.latentDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code!=ABISCode.UserPriv.USER_LOGIN){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.QUERY_TYPE&&selectObjId==ABISCode.PrivObjId.QRY_QUE){
				selectObjTypeText = textArray.matchTaskDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code!=ABISCode.UserPriv.USER_LOGIN){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.USER_ROLE&&selectObjId==ABISCode.PrivObjId.USER){
				selectObjTypeText = textArray.userLoginDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code==ABISCode.UserPriv.USER_LOGIN){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.SYS_PARAM&&selectObjId==ABISCode.PrivObjId.SYS_PARAM_DB_CATLOG){
				selectObjTypeText = textArray.databaseDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code==ABISCode.UserPriv.DATA_GET||n.code==ABISCode.UserPriv.DATA_SELECT){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.SYS_PARAM&&selectObjId==ABISCode.PrivObjId.SYS_PARAM_MATCH_PART){
				selectObjTypeText = textArray.matchPartitionDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code==ABISCode.UserPriv.DATA_GET||n.code==ABISCode.UserPriv.DATA_SELECT){
						_privs.push(n);
					}
				});
			}
			else if(selectObjType==ABISCode.PrivObjType.HITLOG&&selectObjId==ABISCode.PrivObjId.HITLOG_LTL){
				selectObjTypeText = textArray.matchRecordDataFilter;
				$.each(dataFilterPrivArray,function(i,n){
					if(n.code!=ABISCode.UserPriv.USER_LOGIN){
						_privs.push(n);
					}
				});
			}
			var privObj = {};
			privObj.privs = _privs;
			privObj.text = selectObjTypeText;
			return privObj;
		},
		AddDataFilter:function(){
		var $selectFilter = $(".cur").find("input");
		var selectObjType = $selectFilter.val();
		var selectObjId = $selectFilter.attr("data_objId");
		var privObj = DataFilter.GetPrivs(selectObjType,selectObjId);
		var selectObjTypeText = privObj.text;
		var _privs = privObj.privs;
		
    	var dialogId = 'adddialog_page2'; 
    	var dialogTitle = textArray.addDataFilter+"-"+selectObjTypeText;
            DataFilter.clearFilterInput_AddDialog();
    	dataFilterOpType.setComboData(_privs);
    	if(selectObjType==ABISCode.PrivObjType.USER_ROLE&&selectObjId==ABISCode.PrivObjId.USER){
         	  dataFilterOpType.setValue(ABISCode.UserPriv.USER_LOGIN);
         	  dataFilterOpType.setEditable(false);
           }else{
        	   dataFilterOpType.setEditable(true);
           }
    	searchWindow = null;
    	$.dialog({
            title: dialogTitle,
            content: document.getElementById(dialogId),  
            button: [
                     {
                    	 value: AbisMessageResource.ToolTipText["Previous"],
                         callback: function () {
                        	 dataFilterFilterCondition.setValue('');
                             $("#filter_content").val('');
                        	 add();
                        	 return true;
                         }
                     },
                     {
                         value: AbisMessageResource.ToolTipText["Save"],
                         callback: function () {
                        	 return DataFilter.Save();
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
    Save:function(){//保存新增的数据过滤
    	var saveData = new Array();
		 var selectObjType ;
		 var selectObjId ;
		 if($("#filterid").val()==0){
			var $selectFilter = $(".cur").find("input");
		    selectObjType = $selectFilter.val();
		    selectObjId = $selectFilter.attr("data_objId");
		 }else{
			 selectObjType = $("#objType2").val();
			 selectObjId = $("#objId2").val();
		 }
       	 var filterCondition_input =$("#filter_content").val();;
       	  
       	  if(WebUtil.isEmpty(dataFilterName.getValue())){
		    		//名称为空
		    		DialogUtil.openSimpleDialog(textArray.dataFilterNameIsEmpty);
					return false;
		    		}
       	  if(WebUtil.isEmpty(dataFilterOpType.getValue())){
       		  //操作类型为空
       		  DialogUtil.openSimpleDialog(textArray.operationTypeIsEmpty);
       		  return false;
       	  }
       	  if(WebUtil.isEmpty(filterCondition_input)){
       		  //条件为空
       		  DialogUtil.openSimpleDialog(textArray.filterConditionIsEmpty);
       		  return false;
       	  }
	   	  var jdata = {};

        if(selectObjType==ABISCode.PrivObjType.USER_ROLE&&selectObjId==ABISCode.PrivObjId.USER){
            dataFilterOpType.setValue(ABISCode.UserPriv.USER_LOGIN);
	   	  }
	   	  jdata.objType = selectObjType;
	   	  jdata.objId = selectObjId;
	   	  jdata.id=$("#filterid").val();
	   	  if(jdata.id==''){
	   		jdata.id = 0; 
	   	  }
	   	  jdata.priv = dataFilterOpType.getValue();
	   	  jdata.filterName = dataFilterName.getValue();
	   	  jdata.rowFilter=filterCondition_input;
	   	  jdata.filterDescription = $("#dataFilterDescription textarea").val();
	   	  jdata = $.toJSON(jdata);
	   	  jQuery.ajax({
             type : 'POST',
             contentType : 'application/json',
             dataType : 'json',
             url : WebVar.VarPath+"/sys/datafilter/saveDataFilter/",
             data : jdata,
             success : function(data) 
             {
                 if(data == null)return true;
                 if(data.status == "ok")
                 {
                     DataFilter.clearFilterInput_AddDialog();
                     $("#filterid").val('0');
                     $("#objType2").val('');
                     $("#objId2").val('');
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
    clearFilterInput_AddDialog:function () {
        dataFilterName.setValue('');
        dataFilterDescription.setValue('');
        dataFilterOpType.clear();
        dataFilterFilterCondition.setValue('');
        $("#filter_content").val('');
    },
    addToGroup:function(){
    	DataFilter.clearDataFilters_GroupItem();
    	var path=WebVar.VarPath + "/sys/datafilter/query";
		var cols = ["ID","OBJ_TYPE","OBJ_ID","PRIV","FILTER_NAME","FILTER_DESCRIPTION"];
		var tableId = "ColTable_group_table_search";
		if(groupSubPageTblMgr ==undefined){
			$("#groupSubPage").html("");
			
			var tblParam =
			{
				tblId:tableId,
				tblName:"PRIV_DATA_FILTER_ITEM",
				cols:cols,
				url:path,
				where:null,
				orderCol:"ID",
                order:WebCode.Order.DESC,
				pageSize:25,
				isCheck:true,
				checkedIds:GroupMemberId,
				pageBarId:"groupSubPage",
				/*callBack:{onClick:selectItem},*/
				sort:{colName:"ID",order:WebTable.ASC},
				multiSelect:true,
				checkAll:false,
				/*link:{cols:["ID"],callBack:clickLink},*/
				language:pageNumStr
			}
    		groupSubPageTblMgr = new TableControlMgr(tblParam);	
    		
		}else{
			groupSubPageTblMgr.qryParam.where=null;
			groupSubPageTblMgr.param.checkedIds = GroupMemberId;
			groupSubPageTblMgr.qryParam.checkedIds = GroupMemberId;
			groupSubPageTblMgr.refresh();
		}
		objId.setEditable(false);
		webInputCascadingListener(objType,objId,WebVar.VarPath + "/sys/datafilter/ObjType","objIdInput");
		
    	$.dialog({
            title:  textArray.AddDataFilterEntries,
            content: document.getElementById('addGroupDialog_search'),     
            okValue: AbisMessageResource.ToolTipText["Save"],
            cancelValue:AbisMessageResource.ToolTipText["Cancel"],     
            ok: function () {
            	GroupMemberId = GroupMemberIdNew;
            	GroupMemberObjId = GroupMemberObjIdNew;
            	GroupMemberPriv = GroupMemberPrivNew;
            	 DataFilter.addAppendRowsToGroup();
            	 return true;
            	},
            cancel: function () {
            	GroupMemberIdNew = GroupMemberId;
            	GroupMemberObjIdNew = GroupMemberObjId;
            	GroupMemberPrivNew = GroupMemberPriv;
               return true;
            }
        });
    	
    },
    searchDataFilters:function(){
    	var whereParam = new Array();
    	if(objType.getValue()!=null&&objType.getValue()!=''){
    		var where = {};
        	where.colName="OBJ_TYPE";
        	where.dataType=2;
        	where.value1=objType.getValue();
        	whereParam.push(where);
    	}
    	if(objId.getValue()!=null&&objId.getValue()!=''){
    		var where = {};
        	where.colName="OBJ_ID";
        	where.dataType=2;
        	where.value1=objId.getValue();
        	whereParam.push(where);
    	}
    	if(opType.getValue()!=null&&opType.getValue()!=''){
    		var where = {};
    		where.colName="PRIV";
    		where.dataType=2;
    		where.value1=opType.getValue();
    		whereParam.push(where);
    	}
    	if(filterName.getValue()!=null&&filterName.getValue()!=''){
    		var where = {};
    		where.colName="FILTER_NAME";
    		where.dataType=2;
    		where.value1=filterName.getValue();
    		whereParam.push(where);
    	}
    	
    	groupSubPageTblMgr.setQryParam(whereParam);
    	groupSubPageTblMgr.refresh();
    },
    clearDataFilters_GroupItem:function(){
    	objType.setValue('');
    	objId.setEditable(false);
    	objId.setValue('');
    	opType.setValue('');
    	filterName.setValue('');
    },
    addAppendRowsToGroup:function(){
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
        groupTblMgr.qryParam.colList=["ID","OBJ_ID","OBJ_TYPE","PRIV","FILTER_NAME","FILTER_DESCRIPTION"];;
    	groupTblMgr.qryParam.tblName="priv_data_filter_item";
    	groupTblMgr.qryParam.where=whereParam;
   	 	groupTblMgr.refresh();
    },
    delGroupMember:function(){
    	var delRows = groupTblMgr.table.getSelectItems();
    	if(delRows.length<=0){
            DialogUtil.openSimpleDialog(textArray.NoRecordSelected);
            return;
       }
       var callback = function() {
        	$.each(delRows,function(i,n){
            	var delId = n.ID;
            	GroupMemberId.splice($.inArray(delId,GroupMemberId),1);
            	GroupMemberObjId.splice($.inArray(delId,GroupMemberId),1);
            	GroupMemberPriv.splice($.inArray(delId,GroupMemberId),1);

            	GroupMemberIdNew.splice($.inArray(delId,GroupMemberIdNew),1);
            	GroupMemberObjIdNew.splice($.inArray(delId,GroupMemberIdNew),1);
            	GroupMemberPrivNew.splice($.inArray(delId,GroupMemberIdNew),1);
        	});
        	DataFilter.addAppendRowsToGroup();
        }
        DialogUtil.openComfirmDialogForOcx(textArray.DeleteConfirmInfoTip,callback);
    },
    saveGroup:function(){
    	if(groupName.getValue()==''){
    		DialogUtil.openSimpleDialog(textArray.GroupName2IsEmpty);
    		return false;
    	}
    	var data = {};
    	var idArr = new Array();
    	var objIdArr = new Array();
    	var privArr = new Array();
    	data.groupId = $("#groupId").val();
    	data.groupName = groupName.getValue();
    	data.groupDesc = groupDescription.getValue();
    	data.existIds = $("#existIds").val();
    	
    	var rows = groupTblMgr.table.getAllItems();
    	for(var i in rows){
    		var row = rows[i];
    		idArr.push(row.ID);
    		objIdArr.push(row.OBJ_ID);
    		privArr.push(row.PRIV);
    	}
    	
    	if(idArr.length==0){
    		DialogUtil.openSimpleDialog(textArray.DataFilterItemsInThisGroupIsEmpty);
    		return false;
    	}
    	data.ids=idArr;
    	data.objIds = objIdArr;
    	data.privs = privArr;
    	var formData = $.toJSON(data);
    	
          jQuery.ajax({
        	  type:"POST",
        	  contentType:'application/json',
        	  dataType:'json',
        	  url:WebVar.VarPath+"/sys/datafilter/saveDataFilterGroup/",
        	  data:formData,
        	  success:function(data){
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
        	  error:function(e){
        		  DialogUtil.openSimpleDialog(e);
        		  return false;
        	  }
          });
    },
	advSearch:function(){
		var tableName = "";
		var selectObjType ;
		 var selectObjId ;
		 var defaultCondition = "";
		 if($("#filterid").val()==0){
			var $selectFilter = $(".cur").find("input");
		    selectObjType = $selectFilter.val();
		    selectObjId = $selectFilter.attr("data_objId");
		 }else{
			 selectObjType = $("#objType2").val();
			 selectObjId = $("#objId2").val();
		 }
		 var opType = dataFilterOpType.getValue();
		 if(selectObjType==2&&selectObjId==1){
			 tableName="TP_CARD_FOR_DATAFILTER_VIEW";
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.tpCardDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.tpCardDataFilter;
			 }
			 
		 }
		 else if(selectObjType==3&&selectObjId==10){
			 tableName="LP_CASE_FOR_DATAFILTER_VIEW"; 
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.lpCaseDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.lpCaseDataFilter;
			 }
		 }
		 else if(selectObjType==3&&selectObjId==11){
			 tableName="LP_CARD_FOR_DATAFILTER_VIEW"; 
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.lpCardDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.lpCardDataFilter;
			 }
		 }
		 else if(selectObjType==4&&selectObjId==20){
			 tableName="MATCH_FOR_DATAFILTER_VIEW"; 
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.matchDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.matchDataFilter;
			 }
		 }
		 else if(selectObjType==10&&selectObjId==30){
			 tableName="USER_IDENTITY_INFO_VIEW"; 
			 defaultCondition = DefaultSearchNodes.userDataFilter;
		 }
		 else if(selectObjType==13&&selectObjId==110){
			 tableName="DB_CATLOG_FOR_DATAFILTER_VIEW"; 
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.dbDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.dbDataFilter;
			 }
		 }
		 else if(selectObjType==13&&selectObjId==111){
			 tableName="MATCH_PART_FOR_DATAFILTER_VIEW";
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.matchPartitionDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.matchPartitionDataFilter;
			 }
		 }
		 else if(selectObjType==11&&selectObjId==50){
			 tableName="LTL_HITLOG_FOR_DATAFILTER_VIEW"; 
			 if(opType==1){
				 defaultCondition = DefaultSearchNodes.LTLHitLogDataFilter_add;
			 }else{
				 defaultCondition = DefaultSearchNodes.LTLHitLogDataFilter;
			 }
		 }
		var jdata = {};
		jdata.tableName = tableName;
		jdata.callback = function (data){
			if(data.SimpFilter_Filter.indexOf("ColNode")>=0){
				dataFilterFilterCondition.setValue(data.xml_Filter);
                $("#filter_content").val(data.xml_Filter);
			}
		};
		var dataJson = {};
		
		if(dataFilterFilterCondition.getValue())
		{
			dataJson.xmls = new Array();
			dataJson.xmls.push(defaultCondition);
			dataJson.xmls.push($("#filter_content").val());
		}else{
			dataJson.xml = defaultCondition;
		}
		
		jdata.data = dataJson;
		searchWindow=ABISWindowUtil.openSearch(jdata)
	},
	saveUserDataFilter:function(flag){//保存用户数据过滤，flag:true新增 false编辑
		var itemList = new Array();
		if(flag){
			if(UserMemberIdNew!=null && UserMemberIdNew.length>0){
				for(var i=0;i<UserMemberIdNew.length;i++){
					var itemObj = {};
					itemObj.objId = UserMemberObjIdNew[i];
					itemObj.priv = UserMemberPrivNew[i];
					itemObj.filterId = UserMemberIdNew[i];
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
					itemObj.objId = UserMemberObjIdNew[i];
					itemObj.priv = UserMemberPrivNew[i];
					itemObj.filterId = UserMemberIdNew[i];
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
			url : WebVar.VarPath+"/sys/datafilter/saveUserDataFilter/",
			data : $.toJSON(model),
			async : false,
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
    saveUserDataFilterGroup:function(flag){//保存用户数据过滤组，flag:true新增 false编辑
        if( UserGroupIdNew == null){
            DialogUtil.openSimpleDialog(AbisMessageResource.Alert['PleaseChooseDataItem']);
            return false;
        }
        var model = {};
        model.flag = flag;
        model.urIds = UserIdNew;
        model.propId = UserPropIDCode.DATA_FILTER;
        model.propValue = UserGroupIdNew;

        jQuery.ajax({
            type : 'POST',
            contentType : 'application/json',
            dataType : 'json',
            url : WebVar.VarPath+"/sys/datafilter/saveUserDataFilterGroup/",
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
                url         : WebVar.VarPath + "/sys/datafilter/qryAllFilterObjType/",
                data        : {},
                dataType    : 'json',
                success     : function(data)
                {
                    objType_s.setComboData(eval('(' + data + ')'));
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
                url         : WebVar.VarPath + "/sys/datafilter/qryAllFilterObjId/",
                data        : {},
                dataType    : 'json',
                success     : function(data)
                {
                    objId_s.setComboData(eval('(' + data + ')'));
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
                url         : WebVar.VarPath + "/sys/datafilter/qryAllFilterPriv/",
                data        : {},
                dataType    : 'json',
                success     : function(data)
                {
                    priv_s.setComboData(eval('(' + data + ')'));
                },
                error : function(e)
                {
                    WebUtil.NoWait();
                }
            }
        );
    }
}

function addFilters(wheres,callback){
    var jdata = {
            colList:["ID","FILTER_ID","OBJ_ID","PRIV"],
            curPage:1,
            orderCol:"ID",
            pageSize:10000,
            qryCnt:false,
            tblName:"USER_DATA_FILTER_VIEW",
            where:wheres
            };
    jdata = $.toJSON(jdata);
    var url = WebVar.VarPath+'/sys/datafilter/query/';
    var successCallback = function(data){
        if(data == null)return false;
        if(data.tblData.result.length>0){
            var result = data.tblData.result;
            for(var i in result){
                var uD = result[i];
                UserMemberIdNew.push(uD.data.FILTER_ID);
                UserMemberObjIdNew.push(uD.data.OBJ_ID.split(WebTable.splitChar)[0]);
                UserMemberPrivNew.push(uD.data.PRIV.split(WebTable.splitChar)[0]);
            }
            if(WebUtil.isFunction(callback)){
                callback();
            }
        }
    };
    ajaxSubmit(url,jdata,successCallback);
}
function addUsers(wheres,callback){
    var jdata = {
            colList:["ID"],
            curPage:1,
            orderCol:"ID",
            pageSize:10000,
        	disColName:"ID",
       		distinct:true,
            qryCnt:false,
            tblName:"USER_LIST_VIEW",
            where:wheres
            };
    jdata = $.toJSON(jdata);
    var url = WebVar.VarPath+'/sys/datafilter/query/';
    var successCallback = function(data){
        if(data == null)return false;
        if(data.tblData.result.length>0){
            var result = data.tblData.result;
            for(var i in result){
                var uD = result[i];
                if($.inArray(uD.data.ID,UserIdNew)<0){
                    UserIdNew.push(uD.data.ID);
                }
            }
            if(WebUtil.isFunction(callback)){
                callback();
            }
        }
    };
    ajaxSubmit(url,jdata,successCallback);
}

function checkFilterItems(_this,_tblMgr,_tblId,_tblType){
  	 var row = _tblMgr.getTable().getSelectItem();
       var id = row.ID;
       var objId_temp = row.OBJ_ID;
       var priv_temp = row.PRIV;
       var _memberId;
       var _memberObjId;
       var _memberPriv;
       if(_tblType=='user'){
       	_memberId = UserMemberIdNew;
       	_memberObjId = UserMemberObjIdNew;
       	_memberPriv = UserMemberPrivNew;
       }else if(_tblType=='group'){
       	_memberId = GroupMemberIdNew;
       	_memberObjId = GroupMemberObjIdNew;
       	_memberPriv = GroupMemberPrivNew;
       }
       
       if(_this.checked){
           if($.inArray(id,_memberId)>=0){
               DialogUtil.openSimpleDialog(textArray.AlreadyExist);
               var objIndex = _tblMgr.table.getCheckObjIndex();
               _tblMgr.table.input.result[objIndex].isCheck = false;
              $(_this).attr("checked",false);
               return;
           }else if($.inArray(objId_temp,_memberObjId)>=0){
               var rowIndexs = _tblMgr.table.getCheckRowIndices();
               var objIndexs = _tblMgr.table.getCheckObjIndices();
               $.each(_tblMgr.table.getCheckItems(),function(i,n){
                   var _id = n.ID;
                   var _objId = n.OBJ_ID;
                   var _priv = n.PRIV;
                   if(_objId==objId_temp&&_priv==priv_temp&&id!=_id){
                       $("#"+_tblId).find("TBODY").find("tr:eq(" + (rowIndexs[i]+1) + ")").find('input').first().attr("checked", false);
                       _tblMgr.table.input.result[objIndexs[i]].isCheck = false;
                       var _id_inArray = $.inArray(_id,_memberId);
                       _memberId.splice(_id_inArray,1);
                       _memberObjId.splice(_id_inArray,1);
                       _memberPriv.splice(_id_inArray,1);
                   }
                   });
                   $.each(_memberId,function(i,n){
                       var _id = n;
                       var _objId = _memberObjId[$.inArray(_id,_memberId)];
                       var _priv = _memberPriv[$.inArray(_id,_memberId)];
                       if(_objId==objId_temp&&_priv==priv_temp&&id!=_id){
                           var _id_inArray = $.inArray(_id,_memberId);
                           _memberId.splice(_id_inArray,1);
                           _memberObjId.splice(_id_inArray,1);
                           _memberPriv.splice(_id_inArray,1);
                       }
                   });
              _memberId.push(id); 
              _memberObjId.push(objId_temp);
              _memberPriv.push(priv_temp);
           }else{
               _memberId.push(id); 
               _memberObjId.push(objId_temp);
               _memberPriv.push(priv_temp);
           }
       }else{
           var _id_inArray = $.inArray(id,_memberId);
          _memberId.splice(_id_inArray,1);
          _memberObjId.splice(_id_inArray,1);
          _memberPriv.splice(_id_inArray,1);
       }
       
       if(_tblType=='user'){
       	UserMemberIdNew = _memberId;
       	UserMemberObjIdNew = _memberObjId;
       	UserMemberPrivNew = _memberPriv;
       }else if(_tblType=='group'){
       	GroupMemberIdNew = _memberId;
       	GroupMemberObjIdNew = _memberObjId;
       	GroupMemberPrivNew = _memberPriv;
       }
       
       if(_tblMgr!=undefined){
           _tblMgr.qryParam.checkedIds = _memberId;
           _tblMgr.param.checkedIds = _memberId;
     }
   }