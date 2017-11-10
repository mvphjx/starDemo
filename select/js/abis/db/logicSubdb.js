function LogicSubDb(radioValArr,radioTxtArr) {
    this.radioValArr = radioValArr;
    this.radioTxtArr = radioTxtArr;
    this.init();
}

LogicSubDb.prototype.init = function () {
    this.initDataTypeRadio();

    toDbid.addChangeListener(
        function(id,value,txt){
            if(typeof value=='undefined'){
                return;
            }
            configTblMgr.table.clear(true);
            $("#searchConfig").text('');
            $("#toSubDbid").html('');
            $("#dataCount").html('');
            loadSubDb(value);
        }
    );
}


LogicSubDb.prototype.initDataTypeRadio = function () {
    for(var i in this.radioValArr){
        var val = this.radioValArr[i];
        var txt = this.radioTxtArr[i];
        var $radio = $("<input type='radio' name='dataType' id='dataType"+i+"' value='"+val+"'>");
        $radio.bind("click",function () {
            var checkType = $(this).val();
            if(checkType==ABISCode.DBTypeCode.TENRPINT_DB){
                configTblMgr.qryParam.colList = tblCols.tpCols;
                configTblMgr.qryParam.tblName = tblName.tp;
            }else if(checkType==ABISCode.DBTypeCode.LATENT_DB){
                configTblMgr.qryParam.colList = tblCols.lpCols;
                configTblMgr.qryParam.tblName = tblName.lp;
            }else{
                configTblMgr.qryParam.colList = tblCols.qryCols;
                configTblMgr.qryParam.tblName = tblName.qry;
            }
            configTblMgr.qryParam.xml = "";
            configTblMgr.refresh();
            clearSubDb();
            loadDb(checkType);
        });
        var $radioTxt = $('<label for="dataType'+i+'">'+txt+'</label>')
        var $div = $('<div class="radio" id="radio'+i+'"></div>');
        $div.append($radio);
        $div.append($radioTxt);
        $("#dataType").append($div);
    }
}
function loadDb(dbType){
    $.ajax(
        {
            type: 'Get',
            contentType: 'application/json',
            url: WebVar.VarPath + "/logicdb/loaddb/" + dbType,
            data: null,
            dataType: 'json',
            success: function (resultInfo) {
                if (resultInfo.status === WebCode.WebResultStatus.ok) {
                    var data = resultInfo.data;
                    toDbid.setComboData(data);
                    toDbid.setEditable(true)
                } else {
                    DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
                }
            }
        });
}
function loadSubDb(value) {
    $.ajax({
        type:"Get",
        contentType:"application/json",
        url:WebVar.VarPath+"/logicdb/logicdbs/"+value,
        dataType:"json",
        data:null,
        success:function (resultInfo) {
            if(resultInfo.status === WebCode.WebResultStatus.ok){
                $("#toSubDbid").html('');
                var data = resultInfo.data;
                for(i in data){
                    var subdb = data[i];
                    var $input = $('<input type="checkbox" name="subdb" id="subdb'+i+'" data_dbmask="'+subdb.subDbMask+'" value="'+subdb.maskIndex+'"/>');
                    var $label = $('<label for="subdb'+i+'">'+subdb.subDbName+'</label>');
                    var $div = $('<div class="checkSubDb"></div>')
                    $div.append($input);
                    $div.append($label);
                    $("#toSubDbid").append($div);
                }
            }else {
                DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
            }
        }
    })
}
function clearSubDb() {
    searchWindow = null;
    // toDbid.setEditable(false);
    // toDbid.setValue('');
    // $("#toSubDbid").html('');
    $("#dataCount").html('');
    configTblMgr.table.clear(true);
    $("#searchConfig").text('');
}
function clickLink_logicdb(row,colName)
{
    switch(colName)
    {
        case "ID":
            showInfo(row);
            break;
    }

}
function transferSubDb() {
    var _dataFrom = $("input[name='dataFrom']:checked").val();
    if(_dataFrom=='1'){//数据来源为选中的表格数据
        var refreshTable = function () {
            refreshInvoke();
            var rows = configTblMgr.table.getAllItems();
            if(!WebUtil.isEmpty(rows)){
                var _dbid = rows[0].DBID;
                for(var i=0,arrLen=rows.length;i<arrLen;i++){
                    var cur_dbid = rows[i].DBID;
                    if(cur_dbid!=_dbid){
                        return DialogUtil.openSimpleDialog(textArr_subDb.DbidDifferent);
                        break;
                    }
                }
                //设置数据库为选中的数据的数据库
                toDbid.setValue(_dbid);
                toDbid.setEditable(false);
                // 加载对应类型的子库
                loadSubDb(_dbid);
            }else{
                return DialogUtil.openSimpleDialog(textArr_subDb.HaveNoSelectedTableRecord);
            }
        }
        refreshTable_dataFromTable(refreshTable);
    }

    var buttons = [
        {
            value: AbisMessageResource.ToolTipText["Next"],
            callback: function () {
                return executeTransfer();
            }
        },
        {
            value: AbisMessageResource.ToolTipText['Cancel'],
            callback: function () {
                clearSubDb();
                return true;
            }
        }
    ]
    DialogUtil.openDialog(textArr_subDb.BatchAddData, document.getElementById('chooseDataDialog'), buttons);
}
function executeTransfer() {
    if($("#dataCount").hasClass("alarmCount")){
        DialogUtil.openSimpleDialogForOcx(textArr_subDb.SetSubDbNumLimited);
        return false;
    }else if(!WebUtil.isEmpty(configTblMgr.table.getAllItems())){
        var buttons = [
            {
                value: AbisMessageResource.ToolTipText["Previous"],
                callback: function () {
                    transferSubDb();
                    return true;
                }
            },
            {
                value: AbisMessageResource.ToolTipText["Save"],
                callback: function () {
                    return saveDataToSubDb();
                }
            },
            {
                value: AbisMessageResource.ToolTipText['Cancel'],
                callback: function () {
                    clearSubDb();
                    return true;
                }
            }
        ]
        DialogUtil.openDialog(textArr_subDb.BatchAddData, document.getElementById('excuteDialog'), buttons);

    }else{
        DialogUtil.openSimpleDialog(textArr_subDb.PleaseSetSearchCondition);
        return false;
    }
}
function addDB()
{
    window.open(WebVar.VarPath+"/logicdb/add");
}
function editDB()
{
    var row = tblMgr.getTable().getSelectItems();
    if(WebUtil.isEmpty(row)){
        DialogUtil.openSimpleDialog(textArr.NoRecordSelected);
        return;
    }else if(row.length>1){
        DialogUtil.openSimpleDialog(textArr.OnlyChooseOneToModify);
        return;
    }
    window.open(WebVar.VarPath+"/logicdb/edit/"+row[0].DBID+"/"+row[0].MASK_INDEX+"/"+row[0].SUB_DB_MASK);
}
function validata()
{
    var _dbname=dbname.getValue();
    if(WebUtil.isEmpty(_dbname))
        return false;
    var _maskIndex=maskIndex.getValue();
    if(!WebUtil.isEmpty(dbid.getValue())&&WebUtil.isEmpty(_maskIndex))
        return false;
    var _dbMask=dbMask.getValue();
    if(!WebUtil.isEmpty(dbid.getValue())&&WebUtil.isEmpty(_dbMask))
        return false;
    return true;
}
function finish()
{
    var type = $("#saveSubDbType").val();
    var f=validata();
    if(f)
    {
        var re = /^[0-9]*$/;
        var _dbname = dbname.getValue();
        if(re.test(_dbname)){
            DialogUtil.openSimpleDialog(textArr_subDb.AlertdbNum+'!');
            return false;
        }
        var dbobj={};
        dbobj.dbid = dbid.getValue();
        dbobj.subDbName = dbname.getValue();
        dbobj.maskIndex = maskIndex.getValue();
        dbobj.subDbMask = dbMask.getValue();
        dbobj.description = dbDesc.getValue();
        var jData = $.toJSON(dbobj);
        jQuery.ajax({
            type : 'POST',
            contentType : 'application/json',
            dataType : 'json',
            url : WebVar.VarPath+"/logicdb/save/"+type,
            data : jData,
            success : function(data)
            {
                if(type==0&&data.status === WebCode.WebResultStatus.ok) {
                    DialogUtil.dialogAfterSaveOK(clear,closepage);
                    dbname.clear();
                    dbMask.clear();
                    dbDesc.clear();
                }else if(type==1&&data.status === WebCode.WebResultStatus.ok) {
                    closepage();
                }else if(data.status === WebCode.WebResultStatus.error&&!WebUtil.isEmpty(data.msg)){
                    DialogUtil.openSimpleDialogForOcx(data.msg);
                }
                else
                {
                    DialogUtil.openSimpleDialog(textArr_subDb.saveFail);
                }
            }
        });
    }
    else
    {
        DialogUtil.openSimpleDialog(textArr_subDb.IncompleteInformation);
    }
}

function clear()
{
    dbname.setValue("");
    dbMask.setValue("");
    dbDesc.setValue("");
}
function closepage()
{
    if(window.opener){
        window.opener = null;
        window.close&&window.close();
    }
}
function deleteDB()
{
    DialogUtil.openComfirmDialogForOcx(textArr.DeleteConfirmInfoTip,deleteR);
}
function deleteR()
{
    var rows = tblMgr.getTable().getSelectItems();
    var dbArr = new Array();
    for(var i in rows)
    {
        var row = rows[i];
        var dbobj={};
        dbobj.dbid = row.DBID;
        dbobj.maskIndex = row.MASK_INDEX;
        dbobj.subDbMask = row.SUB_DB_MASK;
        dbArr.push(dbobj);
    }
    var jData = {};
    jData.list = dbArr;
    jData = $.toJSON(jData);
    jQuery.ajax({
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        url : WebVar.VarPath+"/logicdb/delete/",
        data : jData,
        success : function(data)
        {
            if(data.status === WebCode.WebResultStatus.ok)
                tblMgr.refresh();
            else
                DialogUtil.openSimpleDialogForOcx(data.msg);
        }
    });
}

function selectItem(row)
{
}
function refresh()
{
    tblMgr.refresh();
}


function showInfo(row)
{
    var qryParam =
        {
            tblName		: 'DB_SUB_MASK',
            colList		: ["DBID","MASK_INDEX","SUB_DB_MASK","SUB_DB_NAME","DESCRIPTION"],
            where		:[{colName: "DBID", dataType: 2, value1: row.DBID},{colName: "MASK_INDEX", dataType: 2,
                value1: row.MASK_INDEX},{colName: "SUB_DB_MASK", dataType: 2, value1: row.SUB_DB_MASK}],
            pageSize	: 1,
            qryCnt		: false
        };
    jsonData = $.toJSON(qryParam);
    $.ajax({
        type:'post',
        contentType:'application/json',
        dataType:'json',
        url:WebVar.VarPath+"/logicdb/query/",
        data:jsonData,
        success:function(data){
            if(!WebUtil.isEmpty(data.tblData.result)) {
                var dbObj = data.tblData.result[0].data;
                $("#showDbid").html(dbObj.DBID.split(WebTable.splitChar)[1]);
                $("#showMaskIndex").html(dbObj.MASK_INDEX.split(WebTable.splitChar)[1]);
                $("#showSubDbMask").html(dbObj.SUB_DB_MASK);
                $("#showSubDbName").html(dbObj.SUB_DB_NAME);
                $("#showDesc").html(dbObj.DESCRIPTION);
                var buttons = [
                    {
                        value: textArr.cancel,
                        callback: function () {
                            clear();
                            return true;
                        }
                    }
                ];
                DialogUtil.openDialog(textArr.DetailInfo, document.getElementById('showDBdialog'), buttons);
            }
        }
    })
}

function saveDataToSubDb() {
    var searchCondition = $("#searchConfig").text();
    var databaseId = toDbid.getValue();
    var subKeyArr = new Array();

    var $checkOpType = $("input[name='opType']:checked").val();
    if($checkOpType==4){

    }else{
        $("input[name='subdb']:checked").each(function (i,obj) {
            var $this = $(this);
            var subIndex = $this.val();
            var subMask = $this.attr("data_dbmask");
            var subKey = {};
            subKey.maskIndex = subIndex;
            subKey.subDbMask = subMask;
            subKey.dbid = databaseId;
            subKeyArr.push(subKey);
        });
    }
    var _dataFrom = $("input[name='dataFrom']:checked").val();
    if(_dataFrom=='1'&&WebUtil.isEmpty(selectIdArr)) {
        DialogUtil.openSimpleDialog(textArr_subDb.HaveNoSelectedTableRecord);
        return false;
    }else if(_dataFrom=='2'&&WebUtil.isEmpty(searchCondition)){
        DialogUtil.openSimpleDialog(textArr_subDb.SearchCondition+textArr_subDb.isEmpty);
        return false;
    }else if(WebUtil.isEmpty(databaseId)){
        DialogUtil.openSimpleDialog(textArr_subDb.SysDatabase+textArr_subDb.isEmpty);
        return false;
    }else if($checkOpType<4&&WebUtil.isEmpty(subKeyArr)){
        DialogUtil.openSimpleDialog(textArr_subDb.DestSubDb+textArr_subDb.isEmpty);
        return false;
    }else{
        var dbtype = $("input[name='dataType']:checked").val();
        var jData = {};
        jData.xml = searchCondition;
        jData.dbid = databaseId;
        jData.subDbKeyList = subKeyArr;
        jData.type = $checkOpType;
        jData.dbtype = dbtype;
        jData.cardIdList = selectIdArr;
        jData = $.toJSON(jData);
        $.ajax({
            type:'post',
            contentType:'application/json',
            dataType:'json',
            data:jData,
            url:WebVar.VarPath+'/logicdb/saveDataToSubDb/',
            success:function (data) {
                if(data.status === WebCode.WebResultStatus.ok){
                    tblMgr.refresh();
                    return DialogUtil.openSimpleDialog(textArr_subDb.operateSuccess);
                }else {
                    DialogUtil.openSimpleDialogForOcx(data.msg);
                    return false;
                }
            }
        })
    }
}

function getSelectRows() {

    selectIdArr = new Array();
    whereArr = new Array();
    var rows = tblMgr.table.getSelectItems();
    if(!WebUtil.isEmpty(rows)){
        for(var i=0,arrLen = rows.length;i<arrLen;i++){
            var row = rows[i];
            selectIdArr.push(row.ID);
            var where = {colName: "ID", dataType: ABISCode.DBDataType.DB_INT, value1: row.ID};
            whereArr.push(where);
        }
    }else{
        var where = {colName: "ID", dataType: ABISCode.DBDataType.DB_INT, value1: "0"};
        whereArr.push(where);
    }
}
function refreshTable_dataFromTable(refreshTable) {
    getSelectRows();

    if (cardType == ABISCode.DBTypeCode.TENRPINT_DB) {
        configTblMgr.qryParam.tblName = tblName.tp;
        configTblMgr.qryParam.colList = tblCols.tpCols;
    } else if (cardType == ABISCode.DBTypeCode.LATENT_DB) {
        configTblMgr.qryParam.tblName = tblName.lp;
        configTblMgr.qryParam.colList = tblCols.lpCols;
    } else {
        configTblMgr.qryParam.tblName = tblName.qry;
        configTblMgr.qryParam.colList = tblCols.qryCols;
    }
    configTblMgr.qryParam.where = whereArr;
    configTblMgr.qryParam.xml = '';
    if(!WebUtil.isNull(refreshTable)&&WebUtil.isFunction(refreshTable)){
        configTblMgr.refresh(refreshTable);
    }else{
        configTblMgr.refresh(refreshInvoke);
    }

}