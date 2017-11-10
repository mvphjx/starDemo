TableConfig.prototype.table = null;
TableConfig.prototype.isCreate = false;
TableConfig.prototype.moduleId = null;
TableConfig.prototype.cfgType = null;
TableConfig.prototype.tableName = null;
TableConfig.prototype.invoke = null;
TableConfig.prototype.defaultCols = null;

function TableConfig(moduleId, cfgType, tableName, invoke, defaultCols) {
    this.moduleId = moduleId;
    this.cfgType = cfgType;
    this.tableName = tableName;
    this.invoke = invoke;
    this.defaultCols = defaultCols;
}

TableConfig.prototype.open = function () {
    if (!this.isCreate) {
        this.create();
        this.isCreate = true;
    }
    this.show();
}

TableConfig.prototype.initTabData = {
    ColConfig_Li: "TableConfigPage",
    ColorConfig_Row_Li: "ColorConfig_Row",
    ColorConfig_Line_Li: "ColorConfig_Line"
};
TableConfig.prototype.create = function () {
    WebUI.createWebButton("TopBnt", WebUI.BntType.B_60_24, null, top);
    WebUI.createWebButton("UpBnt", WebUI.BntType.B_60_24, null, up);
    WebUI.createWebButton("DownBnt", WebUI.BntType.B_60_24, null, down);
    WebUI.createWebButton("EndBnt", WebUI.BntType.B_60_24, null, bottom);
    WebUI.createWebButton("AllBnt", WebUI.BntType.B_60_24, null, all);
    WebUI.createWebButton("InvertBnt", WebUI.BntType.B_60_24, null, invert);

    var setting =
        {
            isCheck: true,
            canSort: false,
            multiSelect: false
        };

    this.table = new WebTable("ColTable", setting);
    var nThis = this;
    var _this = this;

    function top() {
        nThis.table.top();
    }

    function up() {
        nThis.table.up();
    }

    function down() {
        nThis.table.down();
    }

    function bottom() {
        nThis.table.bottom();
    }

    function all() {
        nThis.table.checkAllRows();
    }

    function invert() {
        nThis.table.checkInvertRows();
    }

    var param =
        {
            moduleId: this.moduleId,
            cfgType: this.cfgType,
            tableName: this.tableName,
            defaultCols: this.defaultCols
        };
    var jsonData = $.toJSON(param);
    var url = WebVar.VarPath + "/tblcfg/";
    jQuery.ajax
    (
        {
            type: 'POST',
            contentType: 'application/json',
            url: url,
            data: jsonData,
            dataType: 'json',
            success: function (resInfo) {
                if (resInfo.status === WebCode.WebResultStatus.ok)
                {
                    _this.table.setInput(resInfo.data.tableData.input);
                    _this.rowStyles = resInfo.data.rowStyles;
                    _this.lineStyles = resInfo.data.lineStyles;
                }else{
                    DialogUtil.openSimpleDialogForOcx(resInfo.msg);
                }
            }
        }
    );
    //初始化颜色配置界面
    var initTabData = this.initTabData;
    var setting = {onClick: switchTab};
    var tab = new WebTab(initTabData, setting);

    function switchTab(id) {
        if (id === "ColConfig_Li") {
            return;
        }
        var $dom = $("#" + initTabData[id]);
        $dom.html("");
        var items = nThis.table.getCheckItems();
        var colNameList = [];
        nThis[initTabData[id]] = [];
        var abisInputs = nThis[initTabData[id]];
        if (id === "ColorConfig_Line_Li") {//列配置
            for (var i = 0; i < items.length; i++) {
                var model = items[i];
                var column = nThis.getColdata(nThis.tableName)[model.ColName];
                var colInputId = "colInput_" + id + column.columnName;
                var colInputDivId = "colInput_" + id + column.columnName + "div";
                var colorInputId = "colorInput_" + id + column.columnName;
                if (!WebUtil.isEmpty(column.codeTableName)) {

                    var htmlStr =
                        '<tr class="table-config line-styles" >'
                        + '<td name="colName" class="config-colName" columnname="'+column.columnName+'">' + column.colDispName + '</td>'
                        + '<td name="colInput" class="config-colInput" id="' + colInputDivId + '" ></td>'
                        + '<td name="color" class="config-color"><input id="' + colorInputId + '" type="text" name="colorInput" value="#FF00FF" /></td></tr>'
                    $dom.append(htmlStr);
                    var itemType = 0;
                    var showCode = false;
                    var columnName = column.columnName;
                    var tableName = nThis.tableName||column.tableName;
                    if (column.codeDispStyle == ABISCode.CodeDispStyleType.CODE) {
                        showCode = true;
                        itemType = 2;
                    }
                    colNameList.push(tableName + "|" + columnName);
                    var abisInput = WebUI.createMultipleCombo(colInputDivId, colInputId, null, null, showCode, false, null, tableName + "|" + columnName, itemType);
                    //样式问题 暂且处理 待完善{overflow:hidden;}
                    $("#" + colInputDivId + " .Field_Body").css("overflow", "visible");
                    abisInputs.push(abisInput);
                }
            }
            var colFilterRgxs = "";
            WebComboUtil.getCodeTable(colNameList, getComboData, colFilterRgxs)
            function getComboData(data) {
                if (WebUtil.isNull(data)) return;
                if (typeof data == 'string') {
                    data = JSON.parse(data);
                }
                for (var i = 0; i < abisInputs.length; i++) {
                    var abisInput = abisInputs[i];
                    var columnName = abisInput.columnName
                    if (!WebUtil.isEmpty(columnName)) {
                        var codes = data[columnName.toUpperCase()] || data[columnName.toLowerCase()];
                        abisInput.setComboData(codes);
                    }
                }
                _this.setLineStyles(_this.lineStyles);
            }
        } else if (id === "ColorConfig_Row_Li") {//行配置
            var columns =[];
            for(var i = 0;i<items.length;i++){
                columns.push(items[i]["ColName"]);
            }
            var htmlStr =
                '<tr class="table-config">'
                + '<td name="colName" class="config-colName"><div id="searchInfoButton0"></div></td>'
                +'<td><div id="searchInfoDiv0" class=""></div></td>'
                + '<td name="color" class="config-color"><input id="' + "searchInfoColor0" + '" type="text" name="colorInput" value="#ff0000" /></td>' +
                '</tr>'
                +
                '<tr class="table-config">'
                + '<td name="colName" class="config-colName"><div id="searchInfoButton1"></div></td>'
                +'<td><div id="searchInfoDiv1" class=""></div></td>'
                + '<td name="color" class="config-color"><input id="' + "searchInfoColor1" + '" type="text" name="colorInput" value="#00ff00" /></td>' +
                '</tr>'
                +
                '<tr class="table-config">'
                + '<td name="colName" class="config-colName">' + "" + '<div id="searchInfoButton2"></div></div></td>'
                +'<td><div id="searchInfoDiv2" class=""></div></td>'
                + '<td name="color" class="config-color"><input id="' + "searchInfoColor2" + '" type="text" name="colorInput" value="#FF00FF" /></td>' +
                '</tr>';
            $dom.append(htmlStr);
            for(var i =0 ;i<3;i++){
                WebUI.createWebButton("searchInfoButton"+i, WebUI.BntType.B_80_28, "left-button", openSearch).setText(AbisMessageResource.SettingCondition);
                _this["searchInfo"+i] =WebUI.createMulText("searchInfoDiv"+i, "searchInfo"+i,"WebTextArea_Auto").setEditable(false);
            }
            _this.setRowStyles(_this.rowStyles);
            function openSearch(id) {
                var index = id.split("")[id.length-1];
                var jdata = {};
                jdata.tableName = _this.tableName;
                jdata.callback = invoke;
                jdata.loadLastCfg = false;
                jdata.data = {};
                jdata.data.SimpFilters = [];
                if(_this['searchInfo'+index]&&!WebUtil.isEmpty(_this['searchInfo'+index].getText())){
                    jdata.data.SimpFilters.push(_this['searchInfo'+index].getText());
                }
                jdata.data.columns =columns;
                ABISWindowUtil.openSearch(jdata);
                function invoke(data) {
                    _this['searchInfo'+index].setValue(data.SimpFilter_Filter);
                }
            }
        }
        $('input[name=colorInput]').colorPicker({showHexField: false});

    }
}
/**
 * 获取列描述
 */
TableConfig.prototype.getColdata = function (tabname, colwhere) {
    if (!WebUtil.isEmpty(this.columns)) {
        return this.columns;
    } else if (!WebUtil.isEmpty(coldata)) {
        this.columns = covert(coldata);
        return this.columns;
    }
    var _this = this;
    if (colwhere == "" || colwhere == undefined)
        colwhere = null;
    var url = WebVar.VarPath + "/ctrl/cols/" + tabname + "/" + colwhere;
    coldata = "";
    jQuery.ajax
    (
        {
            type: 'POST',
            contentType: 'application/json',
            url: url,
            data: null,
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data != null) {
                    /*  后端返回   ColumnCatlogs  json格式
                     * codeDispStyle:0,codeFmt:null,codeTableName:"UNIT_CODE",colDispName:"更新单位代码",
                     * colDispWidth:100,columnName:"UPDATE_UNIT_CODE",
                     * cpCodeCol:null,dataFmt:null,dataType:2,description:"UPDATE_UNIT_CODE",
                     * entityAttrType:null,id:1246,inputCode:"GXDW",storageFmt:0,tableName:"MIS_PERSON"
                     */
                    var da = eval("(" + data + ")");
                    this.columns = covert(da);
                    return this.columns;

                }
            },
            error: function (e) {

            }
        }
    );
    /*
     转换一下 列描述数据  数组变为map
     */
    function covert(columns) {
        var result = {};
        if (WebUtil.isEmpty(columns)) {
            return result;
        }
        for (var i in columns) {
            var model = columns[i]
            result[model.columnName] = model;
        }
        return result;
    }
}
TableConfig.prototype.show = function () {
    var nThis = this;
    var _this = this;
    $.dialog
    ({
        title: AbisMessageResource["ListConfig"],
        content: document.getElementById('TableConfigPagePlus'),
        okValue: AbisMessageResource['OK'],
        cancelValue: AbisMessageResource['Cancel'],
        ok: function () {
            var bool = ok();
            return bool;
        },
        cancel: function () {
        }
    });
    $("div[role='dialog']").draggable&&$("div[role='dialog']").draggable({ handle: ".d-header"});
    function ok() {
        var items = nThis.table.getCheckItems();
        if (WebUtil.isEmpty(items)) {
            DialogUtil.openSimpleDialog(AbisMessageResource.Alert.PleaseAtLeastSelectOne);
            return false;
        }
        var columns = new Array();
        for (var i in items) {
            var item = items[i];
            var c = {};
            c.name = item.ColName;
            c.width = item.ColWidth;
            columns.push(c);
        }
        var rowStyles = _this.getRowStyles();
        var lineStyles =_this.getLineStyles();//列颜色配置
        var param =
            {
                moduleId: nThis.moduleId,
                cfgType: nThis.cfgType,
                columns: columns,
                rowStyles:rowStyles,
                lineStyles:lineStyles
            };

        var jsonData = $.toJSON(param);

        var url = WebVar.VarPath + "/tblcfg/save";
        jQuery.ajax
        (
            {
                type: 'POST',
                contentType: 'application/json',
                url: url,
                data: jsonData,
                dataType: 'json',
                success: function (data) {
                    if (data.status == "ok") {
                        //同步颜色配置
                        _this.rowStyles = rowStyles;
                        _this.lineStyles =lineStyles;
                        if (WebUtil.isFunction(nThis.invoke)) {
                            nThis.invoke();
                        }
                    }
                    else {
                        alert(AbisMessageResource.Alert["SaveListConfigFailed"]);
                    }
                }
            }
        );
    }
};
TableConfig.prototype.getRowStyles = function () {
    var _this = this;
    var rowStyles = [];
    if(_this.searchInfo0){
        rowStyles.push({"color":$("#searchInfoColor0").val(),"xmlFilter":_this.searchInfo0&&_this.searchInfo0.getText()});
        rowStyles.push({"color":$("#searchInfoColor1").val(),"xmlFilter":_this.searchInfo1&&_this.searchInfo1.getText()});
        rowStyles.push({"color":$("#searchInfoColor2").val(),"xmlFilter":_this.searchInfo2&&_this.searchInfo2.getText()});
    }else{
        rowStyles = _this.rowStyles||[];
    }
    return rowStyles;
};
TableConfig.prototype.getLineStyles = function () {
    var _this = this;
    var lineStyles = [];//列颜色配置
    $(".line-styles").each(
        function(index,element){
            var columnName  = $(this).children().first().attr("columnname");
            var values = _this[_this.initTabData.ColorConfig_Line_Li][index].getValue();
            var color = $(this).children().last().find("input").val();
            lineStyles.push({columnName:columnName,values:values,color:color});
        }
    );
    if($(".line-styles").length===0){
        lineStyles = _this.lineStyles||[];
    }
    return lineStyles;
};
TableConfig.prototype.setRowStyles = function (rowStyles) {
    var _this = this;
    if(WebUtil.isEmpty(rowStyles)){
        return;
    }
    for(var i=0;i<rowStyles.length;i++){
        var rowStyle = rowStyles[i];
        $("#searchInfoColor"+i).val(rowStyle.color||"#ff0000");
        if(_this["searchInfo"+i]){
            _this["searchInfo"+i].setValue(rowStyle.xmlFilter)
        }
    }
};
TableConfig.prototype.setLineStyles = function (lineStyles) {
    if(WebUtil.isEmpty(lineStyles)){
        return;
    }
    var _this = this;
    $(".line-styles").each(
        function(index,element){
            var columnName  = $(this).children().first().attr("columnname");
            for(var i=0;i<lineStyles.length;i++){
                var lineStyle = lineStyles[i];
                if(columnName===lineStyle.columnName){
                    _this[_this.initTabData.ColorConfig_Line_Li][index].setValue(lineStyle.values);
                    $(this).children().last().find("input").val(lineStyle.color);
                }
            }
        }
    );
};