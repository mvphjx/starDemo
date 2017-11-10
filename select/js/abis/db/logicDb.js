function LogicDb(radioValArr, radioTxtArr) {
    this.radioValArr = radioValArr;
    this.radioTxtArr = radioTxtArr;
    this.init();
}

LogicDb.prototype.init = function () {
    this.initDataTypeRadio();
    dbid.addChangeListener(
        function(id,value,txt){
            if(typeof value=='undefined'){
                return;
            }
            configTblMgr_db.table.clear(true);
            $("#searchConfig").text('');
            $("#dataCount").html('');
        }
    );
}
LogicDb.prototype.initDataTypeRadio = function () {
    for(var i in this.radioValArr){
        var val = this.radioValArr[i];
        var txt = this.radioTxtArr[i];
        var $radio = $("<input type='radio' name='dataType_db' id='dataType_db"+i+"' value='"+val+"'>");
        $radio.bind("click",function () {
            var checkType = $(this).val();
            if(checkType==ABISCode.DBTypeCode.TENRPINT_DB){
                configTblMgr_db.qryParam.colList = tblCols_db.tpCols;
                configTblMgr_db.qryParam.tblName = tblName_db.tp;
            }else if(checkType==ABISCode.DBTypeCode.LATENT_DB){
                configTblMgr_db.qryParam.colList = tblCols_db.lpCols;
                configTblMgr_db.qryParam.tblName = tblName_db.lp;
            }else{
                configTblMgr_db.qryParam.colList = tblCols_db.qryCols;
                configTblMgr_db.qryParam.tblName = tblName_db.qry;
            }
            configTblMgr_db.qryParam.xml = "";
            configTblMgr_db.refresh();
            clearDb();
            var dataType = $("input[type=radio]:checked").val();
            loadDb_db(dataType);
        });
        var $radioTxt = $('<label for="dataType'+i+'">'+txt+'</label>')
        var $div = $('<div class="radio" id="radio'+i+'"></div>');
        $div.append($radio);
        $div.append($radioTxt);
        $("#dataType_db").append($div);
    }
}

//加载指定类型的数据库
function loadDb_db(dbType){
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
                    dbid.setComboData(data);
                    dbid.setEditable(true);
                    var from = $("input[name=dataFrom_db]:checked").val();
                    if(!WebUtil.isNull(dbid_val)&&from==1){
                        dbid.setValue(dbid_val);
                        dbid.setEditable(false);
                    }
                } else {
                    DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
                }
            }
        });
}
