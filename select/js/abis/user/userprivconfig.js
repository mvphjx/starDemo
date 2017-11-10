function UserPrivConfig(treedata) 
{
	this.initParam();	
	this.init(treedata);
}
UserPrivConfig.prototype.initParam = function() 
{
	this.oldprivconfig=null;
	this.treeObj=null;
	this.searchText=null;
	this.searchTreeButton=null;
	this.filterSelectText=null;
}

UserPrivConfig.prototype.init = function(treedata) 
{	
	this.initButton();
	this.initText();
	this.initTree(treedata);
	this.initTable();
}
UserPrivConfig.prototype.initTable = function () {
    var tblParamLanguage =
        {
            multiSelect:true
        };
    userPrivTbl = new WebTableMgr("privTable",null,1000,tblParamLanguage);
	privTblData.dataType={OBJ_TYPE:0,OBJ_ID:0,PRIV:0};
	privTblData.header=["OBJ_TYPE","OBJ_ID","PRIV"];
    userPrivTbl.setInput(privTblData);
    WebUI.createLinkButton("qryId_priv",LinkButtonCfg.Qry,query);
    WebUI.createLinkButton("cleId_priv",LinkButtonCfg.Clean,cleanValues);

    this.search_objType = WebUI.createCombo("search_objType","search_objType",null,null,true,true,"USER_ROLE|OBJ_TYPE","",null);;
    this.search_objId = WebUI.createCombo("search_objId","search_objId",null,null,true,true,"USER_ROLE|OBJ_ID","",null);;
    this.search_priv = WebUI.createCombo("search_priv","search_priv",null,null,true,true,"USER_ROLE|OP_TYPE","",null);
    var columnnames = ['USER_ROLE|OBJ_TYPE','USER_ROLE|OBJ_ID',"USER_ROLE|OP_TYPE"];
    WebComboUtil.getCodeTable(columnnames, getComboData);
    var nthis = this;
    function getComboData(data)
    {
        data = eval('(' + data + ')');
        nthis.search_objType.setComboData(data["user_role|obj_type"]);
        nthis.search_objId.setComboData(data["user_role|obj_id"]);
        nthis.search_priv.setComboData(data["user_role|op_type"]);
    }
    function query() {
        userPrivTbl.table.deSelectAll();

    	var _priv = nthis.search_priv.getValue();
    	var _objType = nthis.search_objType.getValue();
    	var _objId = nthis.search_objId.getValue();
    	var selectObj = {};
    	if(!WebUtil.isEmpty(_priv)){
            selectObj.PRIV = _priv;
        }
		if(!WebUtil.isEmpty(_objType)){
            selectObj.OBJ_TYPE = _objType;
        }
		if(!WebUtil.isEmpty(_objId)) {
            selectObj.OBJ_ID=_objId;
        }
        if(!WebUtil.isNull(selectObj)){
            var selIndexes = userPrivTbl.table.findData(selectObj);
            userPrivTbl.table.setSelectIndices(selIndexes)
        }
    }
    function cleanValues() {
		nthis.search_objId.clear();
		nthis.search_objType.clear();
		nthis.search_priv.clear();
    }
}
UserPrivConfig.prototype.initButton = function() 
{	
	//过滤已选权限文本框和按钮
	this.filterSelectText=WebUI.createText("filterSelect","filterSelect","WebTextField","",null);
	WebUI.createWebButton("filterButton",WebUI.BntType.B_120_24,null,filterSelectPriv); 
	//表格工具栏
	WebUI.createLinkButton("addPermitId",LinkButtonCfg.AddPermit,filterPermitPrivDialog);
	//WebUI.createLinkButton("addForbidId",LinkButtonCfg.AddForbid,filterForbidPrivDialog);
	WebUI.createLinkButton("delId",LinkButtonCfg.Del,delRow);
	/*WebUI.createLinkButton("selectall",LinkButtonCfg.SelectAll,selectAll);
	WebUI.createLinkButton("selectnone",LinkButtonCfg.SelectNone,selectNone);
	WebUI.createLinkButton("selectrever",LinkButtonCfg.SelectInverse,selectInvert);
	WebUI.createLinkButton("select2forbid",LinkButtonCfg.Permit2Forbid,permit2forbid);
	WebUI.createLinkButton("select2permit",LinkButtonCfg.Forbid2Permit,forbid2permit);*/		
	
	var nthis=this;
	function filterSelectPriv()
	{
		var v=nthis.filterSelectText.getValue();
		var arr1 = userPrivTbl.table.findData({PRIV:v});
		var arr2 = userPrivTbl.table.findData({OBJ_TYPE:v});
		var arr3 = userPrivTbl.table.findData({OBJ_ID:v});
		var selectArr = new Array();
		for(var i=0,arrlen=arr1.length;i<arrlen;i++){
            selectArr.push(arr1[i]);
		}
		for(var i=0,arrlen=arr2.length;i<arrlen;i++){
            selectArr.push(arr2[i]);
		}
		for(var i=0,arrlen=arr3.length;i<arrlen;i++){
            selectArr.push(arr3[i]);
		}
		userPrivTbl.table.setSelectIndices(selectArr);
		paintr1();
	}
	
	function filterPermitPrivDialog()
	{
		//每次打开对话框之前，先取消选中的节点。（隐藏的选中的节点也会变为非选中）
		var checknodes = nthis.treeObj.getCheckedNodes(true);
		if (checknodes.length>0)
		{			
			for(var i=0;i<checknodes.length;i++)
				{
				 nthis.treeObj.checkNode(checknodes[i], false, true);
				}			
		}
		$.dialog({
			    title: AbisMessageResource["AddAllowedPermission"],
			    content: document.getElementById('privadddialog'),	   
			    okValue: AbisMessageResource['OK'],
			    cancelValue:AbisMessageResource['Cancel'],	 
			    ok: function () {addPriv(0);return true;},
			    cancel: function () { 
				   return true;
		        }
			});	
	}
	
	function addPriv(b)
	{		
		var selectednodes = nthis.treeObj.getCheckedNodes(true);
		var tt="";
		if(b==1)
		{
			tt=AbisMessageResource["Prohibit"];
		}
		else
		{
			tt=AbisMessageResource["Allow"];
		}		
		for(var i=0;i<selectednodes.length;i++)
		{
			var node=selectednodes[i];
			if(!node.isHidden)
			{
				if(node.check_Child_State==-1)//不存在子节点
				{
					var idstr=node.id;
					var parentnode=node.getParentNode();
					var gridparent=parentnode.getParentNode();
					var indexpos=idstr.indexOf("_");
					var idarray=idstr.substr(indexpos+1);
                    var privTr = {};
                    var objType = node.id.split("_")[1];
                    var objId = node.id.split("_")[2];
                    var priv = node.id.split("_")[3];
                    var selectObj = {};
                        selectObj.PRIV = priv;
                        selectObj.OBJ_TYPE = objType;
                        selectObj.OBJ_ID=objId;
                        //目前的tbl表中无对应项时，追加
                    if(WebUtil.isEmpty(userPrivTbl.table.findData(selectObj))){
                        privTr.data = {
                            OBJ_TYPE:objType+WebTable.splitChar+gridparent.name,
                            OBJ_ID:objId+WebTable.splitChar+parentnode.name,
                            PRIV:priv+WebTable.splitChar+node.name};
                        privTblData.result.push(privTr);
                    }
					//nthis.treeObj.hideNode(node);
				}
				else if(node.check_Child_State==1)//子节点部分选中
				{
					
				}
				else if(node.check_Child_State==2)//子节点全部选中
				{
					//nthis.treeObj.hideNode(node);
				}
			}
		}
        userPrivTbl.setInput(privTblData);
		paintr1();
	}
	
	// 添加允许的权限
	function filterForbidPrivDialog()
	{
		//每次打开对话框之前，先取消选中的节点。（隐藏的选中的节点也会变为非选中）
		var checknodes = nthis.treeObj.getCheckedNodes(true);
		if (checknodes.length > 0)
		{			
			for(var i = 0;i < checknodes.length;i++)
			{
				nthis.treeObj.checkNode(checknodes[i], false, true);
			}			
		}
		$.dialog({
			    title: AbisMessageResource["AddForbid"],
			    content: document.getElementById('privadddialog'),	   
			    okValue: AbisMessageResource['OK'],
			    cancelValue:AbisMessageResource['Cancel'],	 
			    ok: function () {addPriv(1);},
			    cancel: function () { 
				   return true;
		        }
			});	
	}
	
	function delRow()
	{
		var selectedPrivs = userPrivTbl.table.getSelectItems();
		$(selectedPrivs).each
		(
			function()
			{
				var objType  = this.OBJ_TYPE;
				var objId = this.OBJ_ID;
				var priv = this.PRIV;
				var node = nthis.treeObj.getNodeByParam("id", "root_"+objType+"_"+objId+"_"+priv, null);
				var parentnode = node.getParentNode();
				var gridparent = parentnode.getParentNode();
				if(parentnode.isHidden)
				{
					nthis.treeObj.showNode(parentnode);
				}
				if(gridparent.isHidden)
				{
					nthis.treeObj.showNode(gridparent);
				}
				nthis.treeObj.showNode(node);
			}
		);
        userPrivTbl.table.deleteSelectRow();
		paintr1();
	}
	
	function paintr1()
	{
		var i=0;
		$("#selectedPriv").find("tr").each(
				function()
				{
					if(i%2==0)
					{
						$(this).removeClass("trcol2");
						$(this).addClass("trcol1");
					}
					else
					{
						$(this).removeClass("trcol1");
						$(this).addClass("trcol2");
					}
					i++;
				});
	}
	
	//全选
	function selectAll()
	{
		$("input[name='selectprivid']").each(function(){	
			if(!$(this).parent().parent().is(":hidden"))
			{
			$(this).prop("checked", true);
			}
		});		
	}
	//全不选
	function selectNone()
	{
		$("input[name='selectprivid']").each(function(){
			if(!$(this).parent().parent().is(":hidden"))
			{
			$(this).prop("checked", false);
			}
		});			
	}
	
	//反选
	function selectInvert()
	{		
		$("input[name='selectprivid']").each
		(
			function()
			{
				if(!$(this).parent().parent().is(":hidden"))
				{
					$(this).prop("checked", !$(this).prop("checked"));
				}
			}
		);	
	}
	
	// 添加禁止的权限
	function permit2forbid()
	{
		var b = 1;		
		var tt = AbisMessageResource["Prohibit"];			
		$("input[name='selectprivid']:checked").each
		(
			function()
			{
				var v = $(this).val();
				var index = v.lastIndexOf('_');
				v = v.substr(0,index + 1);			
				$(this).val(v + b);
				$(this).parent().prev().html(tt);
			}
		);
	}
	
	// 添加允许的权限
	function forbid2permit()
	{
		var b = 0;	
		var tt = AbisMessageResource["Allow"];		
		$("input[name='selectprivid']:checked").each
		(
			function()
			{
				var v = $(this).val();
				var index = v.lastIndexOf('_');
				v = v.substr(0,index + 1);			
				$(this).val(v + b);
				$(this).parent().prev().html(tt);
			}
		);
	}
}
UserPrivConfig.prototype.initText = function() 
{	
	this.searchText=WebUI.createText("searchText","searchText","WebTextField","",null);
	this.searchTreeButton=WebUI.createWebButton("searchButton",WebUI.BntType.B_60_24,null,searchNodes); 	
	var nthis=this;
	function searchNodes()
	{		
		var selectednodes = nthis.treeObj.getSelectedNodes();
		if (selectednodes.length>0) {			
			for(var i=0;i<selectednodes.length;i++)
				{
				 nthis.treeObj.cancelSelectedNode(selectednodes[i]);
				}			
		}
		var checknodes = nthis.treeObj.getCheckedNodes(true);
		if (checknodes.length>0) {			
			for(var i=0;i<checknodes.length;i++)
				{
				 nthis.treeObj.checkNode(checknodes[i], false, true);
				}			
		}
		searchvalue="";
		searchvalue=nthis.searchText.getValue();	
		if(searchvalue=="")
			return;		
		var nodes = nthis.treeObj.getNodesByFilter(filter);
		if (nodes.length>0) {			
			for(var i=0;i<nodes.length;i++)
				{
				nthis.treeObj.checkNode(nodes[i], true, true);
				nthis.treeObj.selectNode(nodes[i],true);
				}			
		}
	}
	
	function filter(node)
	{		
	    return (node.name.indexOf(searchvalue)>-1);
	}

}
UserPrivConfig.prototype.setPrivConfig = function(privconfig) 
{
	this.oldprivconfig = privconfig;
	var arr;
    if(WebUtil.isEmpty(privTblData.result)){
        arr = new Array();
    }else{
    	arr = privTblData.result;
	}
	for(var j=0;j<privconfig.length;j++)
	  {
		  var p=privconfig[j];
          var privTr = {};
			privTr.data = {
				OBJ_TYPE:p.objType+WebTable.splitChar+p.objTypeText,
				OBJ_ID:p.objId+WebTable.splitChar+p.objIdText,
				PRIV:p.priv+WebTable.splitChar+p.privText};
          arr.push(privTr);
		  // $("#selectedPriv").append("<tr><td class='otype'>"+p.objTypeText+"</td><td class='oid'>"+p.objIdText+"</td><td class='pid'>"+p.privText+"</td><td><input type='checkbox' name='selectprivid' value='"+p.objType+"_"+p.objId+"_"+p.priv+"_"+p.isDisabled+"'></input></td></tr>");
		  // var node=this.treeObj.getNodeByParam("id", "root_"+p.objType+"_"+p.objId+"_"+p.priv, null);
		  //this.treeObj.hideNode(node);  //没有hideNode 方法 注释了  2017年3月20日14:24:49 hjx
	  }
	  privTblData.result = arr;
	  userPrivTbl.setInput(privTblData);
	  //如果子节点全部隐藏的话，父节点也要隐藏掉
	  var nodes=this.treeObj.getNodes();
	  for(var i=0;i<nodes.length;i++)
	  {
		  	this.hideParentNode(nodes[i]);
	  }
}
UserPrivConfig.prototype.hideParentNode =function(parentnode)
{
	var nodes=parentnode.children;		
	if(nodes!=null&&nodes.length>0)
	{
		var f=true;
		for(var i=0;i<nodes.length;i++)
		{
			if(!nodes[i].isHidden)
			{
				f=false;
			}				
			this.hideParentNode(nodes[i]);
		}
		if(f)
		{				
			this.treeObj.hideNode(parentnode);
		}
	}
}
UserPrivConfig.prototype.initTree =function(treedata)
{
	  var setting = {
			data : {
				simpleData : {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: 0
				}
			},
			view : {
				nameIsHTML : true
			},
			check: {
				enable: true,
				chkStyle: "checkbox"
			},
			callback : {
				beforeClick : beforeClick,
				onClick : onClick,
				onCheck: OnCheck
			}
		}
		function beforeClick(treeId, treeNode, clickFlag)
		{
		    if(treeNode.click == undefined)return true;
			return eval(treeNode.click);
		}	
		function onClick(event, treeId, treeNode, clickFlag)
		{				

		}
		function OnCheck(event, treeId, treeNode) {
		   
		}
		$.fn.zTree.init($("#privatetree"), setting, treedata);
		this.treeObj = $.fn.zTree.getZTreeObj("privatetree");		
}

UserPrivConfig.prototype.getPrivConfig = function()
{
	var list=new Array();
	if(roleType==1){
		//用户
        var value="";
        $("input[name='selectprivid']").each(function(){
            value=$(this).val();
            var values=value.split("_");
            var config={};
            config.objType=values[0];
            config.objId=values[1];
            config.priv=values[2];
            config.isDisabled=values[3];
            //if(values.length==5)
            //{
            //	config.id=values[4];
            //}
            list.push(config);
        });
	}else{
		//角色
        var privArr = userPrivTbl.table.getAllItems();
        for(var i=0,len=privArr.length;i<len;i++){
            var privObj = privArr[i];
            var config={};
            config.objType=privObj.OBJ_TYPE;
            config.objId=privObj.OBJ_ID;
            config.priv=privObj.PRIV;
            config.isDisabled=0;
            list.push(config);
		}
	}
	return list;
}
UserPrivConfig.prototype.getDelPrivConfig = function()
{
	if(this.oldprivconfig==null||this.oldprivconfig.length==0)
		return null;
	var dellist=new Array();
	var list=this.getPrivConfig();
	for(var j=0;j<this.oldprivconfig.length;j++)
	  {
		 var old=this.oldprivconfig[j];
		 var newobj=null;
		 var f=true;
		 for(var i=0;i<list.length;i++)
		 {
			 newobj=list[i];
			 if(old.objType==newobj.objType&&old.objId==newobj.objId&&old.priv==newobj.priv)
			 {
				 //console.log("objType:"+old.objType+"-"+newobj.objType+"objID:"+old.objId+"-"+newobj.objId+"priv:"+old.priv+"-"+newobj.priv);
				 f=false;
			 }
		 }			 	  
         if(f)         
         {
        	 dellist.push(old);
         }         
	  }
	//var delvalues=$("input[name='delPriv']").val();
	//if(!WebUtil.isEmpty(delvalues))
	//{
	//	var delarray=delvalues.split(",");
	//	for(var m=0;m<delarray.length;m++)
	//	{
	//		var temp=delarray[m];
	//		if(WebUtil.isEmpty(temp)) continue;
	//		if(!WebArrayUtil.contains(dellist, temp))
	//		{
	//			dellist.push(temp);
	//		}
	//	}	
	//}
	return dellist;
}
