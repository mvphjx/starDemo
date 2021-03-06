/**
 * 表格前台操作的一些帮助方法
 *
 * 这个是页面缓存的表格
 *      设计参考MVVM
 *      this.data存放所有数据

 *      [
 *      {data:[col1:"",col2:""]},
 *      {data:[col1:"",col2:""]}
 *      ]
 *
 */

function WebTableMgr(tblId, pageBarId, pageSize, param) {
    this.tblId = tblId;
    this.pageBarId = pageBarId;
    this.pageSize = pageSize;
    this.param = param;
    this.curPage = 1;
    this.init();
}

WebTableMgr.prototype.init = function () {
    var setparam = null;
    var callparam = null;
    var sortparam = null;
    var mulparam = null;
    var menu = null;
    var language = null;
    var isCheck = null;
    var orderCol,order;
    if (!WebUtil.isEmpty(this.param)) {
        setparam = this.param.link;
        callparam = this.param.callBack;
        sortparam = this.param.sort;
        mulparam = this.param.multiSelect;
        menu = this.param.menu;
        language = this.param.language;
        isCheck = this.param.isCheck;
        orderCol=this.param.orderCol;
        order=this.param.order;
    }

    var setting =
        {
            link: setparam,
            callBack: callparam,
            sort: sortparam,
            multiSelect: mulparam,
            menu: menu,
            isCheck: isCheck,
            orderCol:orderCol,
            order:order
        };
    this.table = new WebTable(this.tblId, setting);
    this.pager = new WebTablePageNumber(this.pageBarId, '', language);
}

WebTableMgr.prototype.setInput = function (input) {
    this.input = input;
    var data = [];
    if (this.input != null) {
        data = this.input.result;
        this.input.result = null;
    }
    this.table.setInput(this.input);
    this.setData(data);
};
//增加一行记录
WebTableMgr.prototype.addRow = function (row) {
    this.data.push(row);
    this.reFresh(this.data);
};
//清空记录
WebTableMgr.prototype.clear = function () {
    this.input.result=[];
    this.data=[];
    this.reFresh([]);
};
//分页情况下，修改/增加/删除 后       刷新Table
WebTableMgr.prototype.reFresh = function (data) {
    var setparam = null;
    var callparam = null;
    var sortparam = null;
    var mulparam = null;
    var menu = null;
    var language = null;
    if (!WebUtil.isEmpty(this.param)) {
        setparam = this.param.link;
        callparam = this.param.callBack;
        sortparam = this.param.sort;
        mulparam = this.param.multiSelect;
        menu = this.param.menu;
        language = this.param.language
    }

    var setting =
        {
            link: setparam,
            callBack: callparam,
            sort: sortparam,
            multiSelect: mulparam,
            menu: menu
        };
    $("#" + this.tblId).html("");
    $("#" + this.pageBarId).html("");
    this.table = new WebTable(this.tblId, setting);
    this.pager = new WebTablePageNumber(this.pageBarId, '', language);
    this.table.setInput(this.input);
    this.setData(data||this.data);
}
/*
填充数据 但是不能填充checkbox 相关数据
 */
WebTableMgr.prototype.setData = function (data) {
    this.data = data||[];
    if (WebUtil.isEmpty(this.data)) {
        return;
    }
    var rowCnt = this.data.length;
    var remainder = (rowCnt % this.pageSize) > 0 ? 1 : 0;
    var pNum = parseInt(rowCnt / this.pageSize);
    var pageCount = pNum + remainder;

    if (rowCnt > this.pageSize) //如果大于设置的显示数才显示分页
    {
        //设置分页码数据
        this.pager.setPageCnt(pageCount, this.pageSize);
        this.pager.setSelectChangeListener(callBack);
        this.pager.setRecordCnt(rowCnt);
    }

    //根据当前的页码获取数据设置给表格显示
    var rowList = this.findCurPageData();
    this.table.setRows(rowList);

    var nThis = this;

    function callBack(pid, pageNum) {
        nThis.curPage = pageNum;
        var rows = nThis.findCurPageData();
        nThis.table.setRows(rows);
        //重新渲染  填充数据 翻页后  回调
        if (nThis.param && nThis.param.callBack) {
            if (WebUtil.isFunction(nThis.param.callBack.refresh)) {
                nThis.param.callBack.refresh();
            }
        }
    }
}

WebTableMgr.prototype.findCurPageData = function () {
    if (WebUtil.isNull(this.curPage))return null;
    if (WebUtil.isEmpty(this.data))return null;
    var startIndex = (this.curPage - 1 ) * this.pageSize;
    var endIndex = startIndex + this.pageSize;
    var rowList = new Array();
    for (var i = startIndex; i < endIndex; i++) {
        rowList.push(this.data[i]);
    }
    return rowList;
}
//判断 列在表格 缓存数据中的位置
WebTableMgr.prototype.indexOf = function(row){
    var num = -1;
    if(this.data){
        for(var i =0;i<this.data.length;i++){
            if(WebUtil.equals(this.data[i],row)){
                num = i;
                break;
            }
        }
    }
    return num;
}
//判断是否重复 row{data:[col]}
WebTableMgr.prototype.isExist = function(row){
    return this.indexOf(row)>-1
};
//删除选中列
WebTableMgr.prototype.deleteSelectRow = function () {
    if(this.data){
        var deleteList = this.getTable().getSelectItems();
        for(var i = 0 ;i<deleteList.length;i++){
            var row = {data:deleteList[i]};
            var index = this.indexOf(row);
            this.data.splice(index,1);
        }
        this.getTable().deleteSelectRow();
        this.reFresh();
    }

};
WebTableMgr.prototype.getData = function () {
    return this.data;
}

WebTableMgr.prototype.getTable = function () {
    return this.table;
}
