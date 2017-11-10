
var treeMenu ={//可以支持的菜单
    "expfpt":{id:"expfpt",attr:[],searchCfg:{}},
    "expfpttp":{id:"expfpttp"},
    "expfptlp":{id:"expfptlp"},
    "impfpt":{id:"impfpt"},
    "impfpttp":{id:"impfpttp"},
    "impfptlp":{id:"impfptlp"}
};
/*

参数说明：
    左侧菜单树结构
    点击切换的url
功能：
  各个  导入导出数据记录列表  的切换
 */

function ExpImpMgr() {
    var _this=this;
    var mgr = {};
    init();
    function init(){
        _this.treeId = "stree";
        _this.treeObj = null;//左侧ztree树 对象
        _this.pageNumStr = pageNumStr;//表格分页语言包
        _this.searchStr = searchStr;//检索控件语言包
        _this.tableid = "table";
        _this.searchid = "searchConId";
        var h=WebUtil.getContentHeight();
        $("#treediv").height(h);
    }
    ExpImpMgr.prototype.createTree=function(treeData){
        var setting = {
            data : {
                simpleData : {
                    enable : true
                }
            },
            view : {
                nameIsHTML : true
            },
            callback : {
                beforeClick : beforeClick,
                onClick : onClick
            }
        };
        function beforeClick(treeId, treeNode, clickFlag) {
            if(treeNode.click===false){
                return false;
            }
        }
        function onClick(event, treeId, treeNode, clickFlag)
        {
            if(_this.menuId!==treeNode.id&&treeNode.id&&mgr[treeNode.id]){
                $("#searchConId").html("");
                $("#SubPage").html("");
                mgr[treeNode.id].createTable();
                _this.menuId = treeNode.id;
                if(treeNode.name){
                    $(".content .TableTitle .Header").html(treeNode.name);
                }
            }

        }
        $.fn.zTree.init($("#"+this.treeId), setting, treeData);
        // 初始化后 选中第一个节点
        this.treeObj = $.fn.zTree.getZTreeObj(this.treeId);
        if(this.treeObj.getNodes()[0].click){
            this.treeObj.selectNode(this.treeObj.getNodes()[0]);
        }else{
            this.treeObj.selectNode(this.treeObj.getNodes()[0].children[0]);
        }
        onClick(null,null,this.treeObj.getSelectedNodes()[0],null);
    };

    //导入fpt
    mgr[treeMenu.impfpt.id]={
        tableName :"DATA_IMPORT_LOG",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.impfpt.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.impfpt.searchCfg);

        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/datalog/expimp/query";
            var cols = new Array();
            cols.push("ID","IMPORT_METHOD","FILE_NAME","IMPORT_USER","IMPORT_TIME","COMPUTER_NAME","COMPUTER_IP");
            var tblParam =
                {
                    tblId:_this.tableid,
                    tblName:this.tableName,
                    cols:cols,
                    url:path,
                    orderCol:"ID",
                    order:WebTable.DES,
                    pageBarId:"SubPage",
                    sort:{colName:"ID",order:WebTable.DES},
                    multiSelect:true,
                    link:{cols:["ID"],callBack:clickLink},
                    language:_this.pageNumStr
                };
            function clickLink(){

            }
            tblMgr = new TableControlMgr(tblParam);
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);

        }


    };
    //导入tpfpt
    mgr[treeMenu.impfpttp.id]={
        tableName :"TP_IMPORT_DETAIL_INFO_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.impfpttp.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.impfpttp.searchCfg);

        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/datalog/expimp/query";
            var cols = new Array();
            cols.push("ID","CARD_ID","CARD_NUM","PERSON_NUM","IMPORT_TIME","IMPORT_USER","FILE_NAME");
            var tblParam =
                {
                    tblId:_this.tableid,
                    tblName:this.tableName,
                    cols:cols,
                    url:path,
                    orderCol:"ID",
                    order:WebTable.DES,
                    pageBarId:"SubPage",
                    sort:{colName:"ID",order:WebTable.DES},
                    multiSelect:true,
                    link:{cols:["CARD_NUM"],callBack:clickLink},
                    language:_this.pageNumStr
                };
            function clickLink(){

            }
            tblMgr = new TableControlMgr(tblParam);
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);

        }


    };
    //导入lpfpt
    mgr[treeMenu.impfptlp.id]={
        tableName :"LP_IMPORT_DETAIL_INFO_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.impfptlp.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.impfptlp.searchCfg);

        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/datalog/expimp/query";
            var cols = new Array();
            cols.push("ID","CARD_ID","CARD_NUM","CE_ID","CE_NUM","IMPORT_TIME","IMPORT_USER","FILE_NAME");
            var tblParam =
                {
                    tblId:_this.tableid,
                    tblName:this.tableName,
                    cols:cols,
                    url:path,
                    orderCol:"ID",
                    order:WebTable.DES,
                    pageBarId:"SubPage",
                    sort:{colName:"ID",order:WebTable.DES},
                    multiSelect:true,
                    link:{cols:["ID"],callBack:clickLink},
                    language:_this.pageNumStr
                };
            function clickLink(){

            }
            tblMgr = new TableControlMgr(tblParam);
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);

        }


    };
    //导出fpt
    mgr[treeMenu.expfpt.id]={
        tableName :"DATA_EXPORT_LOG",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.expfpt.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.expfpt.searchCfg);

        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/datalog/expimp/query";
            var cols = ["ID","PRINT_TYPE","EXPORT_METHOD","EXPORT_USER","EXPORT_TIME","COMPUTER_NAME","COMPUTER_IP"];
            var tblParam =
                {
                    tblId:_this.tableid,
                    tblName:this.tableName,
                    cols:cols,
                    url:path,
                    orderCol:"ID",
                    order:WebTable.DES,
                    pageBarId:"SubPage",
                    sort:{colName:"ID",order:WebTable.DES},
                    multiSelect:true,
                    link:{cols:["ID"],callBack:clickLink},
                    language:_this.pageNumStr
                };
            function clickLink(){

            }
            tblMgr = new TableControlMgr(tblParam);
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);

        }

    };
    //导出tpfpt
    mgr[treeMenu.expfpttp.id]={
        tableName :"TP_EXPORT_DETAIL_INFO_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.expfpttp.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.expfpttp.searchCfg);

        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/datalog/expimp/query";
            var cols = new Array();
            cols.push("ID","CARD_ID","CARD_NUM","PERSON_NUM","EXPORT_TIME","EXPORT_USER","EXPORT_METHOD");
            var tblParam =
                {
                    tblId:_this.tableid,
                    tblName:this.tableName,
                    cols:cols,
                    url:path,
                    orderCol:"ID",
                    order:WebTable.DES,
                    pageBarId:"SubPage",
                    sort:{colName:"ID",order:WebTable.DES},
                    multiSelect:true,
                    link:{cols:["CARD_NUM"],callBack:clickLink},
                    language:_this.pageNumStr
                };
            function clickLink(){

            }
            tblMgr = new TableControlMgr(tblParam);
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);

        }


    };
    //导出lpfpt
    mgr[treeMenu.expfptlp.id]={
        tableName :"LP_EXPORT_DETAIL_INFO_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.expfptlp.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.expfptlp.searchCfg);
        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/datalog/expimp/query";
            var cols = new Array();
            cols.push("ID","CARD_ID","CARD_NUM","CE_ID","CE_NUM","EXPORT_TIME","EXPORT_USER","EXPORT_METHOD");
            var tblParam =
                {
                    tblId:_this.tableid,
                    tblName:this.tableName,
                    cols:cols,
                    url:path,
                    orderCol:"ID",
                    order:WebTable.DES,
                    pageBarId:"SubPage",
                    sort:{colName:"ID",order:WebTable.DES},
                    multiSelect:true,
                    link:{cols:["ID"],callBack:clickLink},
                    language:_this.pageNumStr
                };
            function clickLink(){

            }
            tblMgr = new TableControlMgr(tblParam);
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);

        }


    };

}
