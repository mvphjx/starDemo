var treeMenu ={//可以支持的菜单
    "database":{id:"database"},
    "column":{id:"column"},
    "codetable":{id:"codetable"}
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
                //TODO
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

}
