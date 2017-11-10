var treeMenu ={//可以支持的菜单
    "tp":{id:"tp",attr:[],searchCfg:{}},
    "lp":{id:"lp"},
    "lpcard":{id:"lpcard"}
};
var urlConstant = {
    "delete":"delete",
    restore:"restore",
    link:"restore"
};
/*

参数说明：
    左侧菜单树结构
    点击切换的url
功能：
  各个  导入导出数据记录列表  的切换
 */

function RecyclBinMgr() {
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
    RecyclBinMgr.prototype.createTree=function(treeData){
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
            if((_this.menuId!==treeNode.id)&&treeNode.id&&mgr[treeNode.id]){
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

    //tp
    mgr[treeMenu.tp.id]={
        tableName :"TP_CARD_DELETE_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.tp.tarr,3,this.tableName,null,_this.searchStr,null,null,treeMenu.tp.searchCfg);
        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/sys/recyclebinmgr/query";
            var cols = [];
            cols.push(MisPersonBasicInfoCol.ID);
            cols.push(TPCardInfoCol.CARD_NUM);
            cols.push(MisPersonCol.PERSON_NUM);
            cols.push(MisPersonCEInfoCol.PERSON_CLASS_CODE);
            cols.push(MisPersonBasicInfoCol.NAME);
            cols.push(MisPersonBasicInfoCol.SEX_CODE);
            cols.push(MisPersonBasicInfoCol.SHENFEN_ID);
            cols.push(TPCardInfoCol.PRINT_BY);
            cols.push(TPCardInfoCol.PRINT_UNIT_CODE);
            cols.push(TPCardInfoCol.CREATE_TIME);
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
            function clickLink(row,colName){
                switch(colName)
                {
                    case TPCardInfoCol.CARD_NUM:
                        window.open(WebVar.VarPath + "/tp/detail/" + row.ID, "_blank");
                        break;
                }

            }
            tblMgr = new TableControlMgr(tblParam);
            tblMgr.urls = {};
            tblMgr.urls[urlConstant["delete"]]="/tp/listcolumn/delTPs";
            tblMgr.urls[urlConstant.restore]="/tp/listcolumn/restoreTPs";
            tblCfg = new TableConfig(UIModuleId.WEB_TPCARD_LIST,CfgTypeCode.TP_CARD_LIST,this.tableName,saveEnd);
        }


    };
    //lp
    mgr[treeMenu.lp.id]={
        tableName :"LP_CASE_DELETE_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.lp.tarr,3,this.tableName,null,_this.searchStr,null,null);
        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/sys/recyclebinmgr/query";
            var cols = new Array();
            cols.push(CaseEventCol.ID);
            cols.push(CaseEventCol.DBID_MASK);
            cols.push(CaseEventCol.CE_TYPE);
            cols.push(CaseEventCol.CE_STATUS);
            cols.push(CaseEventCol.CE_NUM);
            cols.push(CaseEventCol.CE_NAME);
            cols.push(CEBasicInfoCol.HAS_PERSON_KILLED);
            cols.push(CEBasicInfoCol.SUPERVISE_LEVEL);
            cols.push(CaseRegisterInfoCol.REGI_UNIT_CODE);
            cols.push(CaseRegisterInfoCol.REGI_UNIT_NAME);
            cols.push(CaseRegisterInfoCol.REGI_TIME);
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
            tblMgr.urls = {};
            tblMgr.urls[urlConstant["delete"]]="/lp/caselist/delLPCases";
            tblMgr.urls[urlConstant.restore]="/lp/caselist/restoreLPCases";
            tblCfg = new TableConfig(UIModuleId.WEB_LPCASE_LIST,CfgTypeCode.LP_CASE_LIST,this.tableName,saveEnd);
        }
    };
    //lpcard
    mgr[treeMenu.lpcard.id]={
        tableName :"LP_CARD_DELETE_VIEW",
        createTable  : function () {
            this.createSearchMgr();
            this.createTableMgr();
        },
        createSearchMgr:function(){
            //检索组件
            searchMgr = new WebSearchMgr(_this.searchid,treeMenu.lpcard.tarr,3,this.tableName,null,_this.searchStr,null,null);
        },
        createTableMgr:function(){
            //表格组件
            var path=WebVar.VarPath + "/sys/recyclebinmgr/query";
            var cols = [];
            cols.push(LPCardInfoCol.ID);
            cols.push(LPCardInfoCol.BTY);
            cols.push(CaseEventCol.CE_NUM);
            cols.push(LPCardInfoCol.CARD_NUM);
            cols.push(LPCardInfoCol.SEQ_NO);
            cols.push(LPCardInfoCol.HAS_TP_MATCH);
            cols.push(CaseRegisterInfoCol.REGI_UNIT_CODE);
            cols.push(CaseRegisterInfoCol.REGI_UNIT_NAME);
            cols.push(CaseRegisterInfoCol.REGI_TIME);
            cols.push(LPCardEnrollInfoCol.INI_ENROLL_USER);
            cols.push(LPCardEnrollInfoCol.INI_ENROLL_UNIT_CODE);
            cols.push(LPCardEnrollInfoCol.INI_ENROLL_TIME);
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
            tblMgr.urls = {};
            tblMgr.urls[urlConstant["delete"]]="/lp/cardlistcolumn/delLPCards";
            tblMgr.urls[urlConstant.restore]="/lp/cardlistcolumn/restoreLPCards";
            tblCfg = new TableConfig(UIModuleId.WEB_USER_MGR,CfgTypeCode.USER_LIST,this.tableName,saveEnd,cols);
        }


    };


}
