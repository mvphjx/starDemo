var clickEle = ""; //全局变量 存储选中element
//保存初始赋值
DetailPage.prototype.type = null;
DetailPage.prototype.splitChar = '_And_';
//为了实现单例,外界不要修改
DetailPage.prototype.unique = null;
//候选指位 时间问题，checkbox控件未抽象出统一操作的对象，先特殊处理 
DetailPage.prototype.candFgps = null;
DetailPage.prototype.columns = null; //初始化编辑控件所包含的列
//一些字段 需要展示 代码值而不是文本
DetailPage.prototype.showCodeCols = [];
/**
 *
 * @param type
 * @param  columnConfigs 表单配置
 * @param columns
 * @param menu
 * @param param
 *
 * {
 *  detail:td
 *  edit:div
 *  supportEdit:true
 * }

 * @returns {null|DetailPage|*}
 * @constructor
 */
function DetailPage(type,columnConfigs, columns, menu,param,) {
    if(!WebUtil.isNull(DetailPage.prototype.unique)) {
        return DetailPage.prototype.unique;
    }
    DetailPage.prototype.unique = this;
    this.type = type;
    this.columns = columns;
    this.columnConfigs = columnConfigs;
    //根据哪些标签  创建页面对象
    this.param = {detail:".detailform",edit:".form",supportEdit:true};
    if(!WebUtil.isEmpty(param)){
        this.param = $.extend(this.param,param);
    }
    this.init();
    if((type>=0)||menu==true) {
        //右键菜单
        $(document).bind("contextmenu", function(e) {
            return false;
        });
        context.init({
            preventDoubleContext: true
        });
        context.settings({
            compress: true
        });
        context.attach('td', [{
            text: AbisMessageResource.copy||AbisMessageResource.Copy,
            action: function(e) {
                var msg = context.getClickEle().html();
                copyToClipboard(msg,context.getClickEle());
            }
        }

        ]);
        $(document).on('mouseover', '.me-codesta', function() {
            $('.finale h1:first').css({
                opacity: 0
            });
            $('.finale h1:last').css({
                opacity: 1
            });
        });
        $(document).on('mouseout', '.me-codesta', function() {
            $('.finale h1:last').css({
                opacity: 0
            });
            $('.finale h1:first').css({
                opacity: 1
            });
        });
    }
}
//普通控件缓存数组
DetailPage.prototype.webInputArr = [];
//表格控件缓存数组
DetailPage.prototype.webTableArr = [];
//初始化&缓存&加载字典项&提示信息
DetailPage.prototype.initCache = function(contro) {
    if(WebUtil.isNull(contro)) {
        return;
    }
    var type = contro.constructor;
    if(type == WebInput) {
        this.webInputArr.push(contro);
        if(!WebUtil.isNull(contro.columnName)) {
            contro.setComboData(null)
        }
    } else if(type == WebTableMgr) {
        this.webTableArr.push(contro);
    }
}
/**
 * 给表单赋值
 * @param jsonData json数据
 * @param writeOver 是否覆盖已有的内容，缺省覆盖
 */
DetailPage.prototype.setObject = function(jsonData,writeOver) {
    if(WebUtil.isNull(jsonData)) {
        return;
    } else if(typeof jsonData == 'string') {
        jsonData = WebUtil.string2Json(jsonData);
    }
    if(WebUtil.isNull(writeOver)){
        writeOver = true;
    }
    var nthis = this;
    //表格控件
    for(var i = 0, l = this.webTableArr.length; i < l; i++) {
        var webTable = this.webTableArr[i];
        var data = getJson(webTable.tblId, this.splitChar)
        if(WebUtil.isNull(data)) {
            //根据数据隐藏显示表格控件
            $('#' + webTable.tblId).parent().hide()
        } else {
            $('#' + webTable.tblId).parent().show()
        }
        this.setTableData(webTable, this.webInputArr, data, this);

    }
    var relatValueCatch = {};
    //只读td填充
    $(this.param.detail).each(function() {
        var $this = $(this);
        var settingStr = $(this).attr('setting');
        var setting = nthis.getSetting(settingStr);
        if(WebUtil.isNull(setting) || WebUtil.isNull(setting.id))
            return;
        var id = setting.id;
        var jsonvalue = getJson(id, nthis.splitChar);
        getValue(setting, jsonvalue, relatValueCatch,function(value){
            if(writeOver===true||!WebUtil.isNull(jsonvalue)){
                var $content = $this.find(".content");
                $content.html(value);
                $content.attr("title", value);
            }
        });
    });
    //解析json 获取值
    function getJson(id, splitChar) {
        var arr = new Array();
        arr = id.split(splitChar);
        var data = jsonData;
        for(var i = 0; i < arr.length; i++) {
            if(data[arr[i]] != undefined) {
                data = data[arr[i]]
            } else {
                data = null;
                break
            }
        }
        return data;
    }
    //按照类型翻译json数据
    function getValue(setting, value, relatValueCatch,callback) {
        var result = "";
        if(value == null) {
            callback(result);
            return;
        }
        if(WebUtil.isNull(setting.dataType)) {
            callback(value);
            return;
        }
        var dataType = setting.dataType;
        if(WebUtil.isNumber(dataType)) {
            dataType = Number(dataType);
        }
        switch(dataType) {
            case ABISCode.InputType.CODE:
                if(setting.showText===false||setting.showText==='false'){
                    result = value;
                    callback(result);
                }else if(!WebUtil.isNull(setting.columnName)) {
                    if(setting.columnName.indexOf(ABISCode.DBCodeName) > -1) {
                        //数据库特殊处理
                        if(setting.columnName.split(nthis.splitChar).length > 1) {
                            var dbType = setting.columnName.split(nthis.splitChar)[1];
                            WebComboUtil.getDBCodeText(dbType, value).then(callback)
                        }
                    } else {
                        WebComboUtil.getCodeText(setting.columnName,value).then(callback)
                    }
                }else{
                    result = value;
                    callback(result);
                }
                break;
            case ABISCode.InputType.DATE:
                //日期格式转换
                result = WebUtil.dateTime2Date(value);
                callback(result);
                break;
            case ABISCode.InputType.CandFgps:
                result = "";
                var bty =JsonUtil.getJsonValueById('cardInfo_And_bty',jsonData,'_And_');
                var data =AbisCheckData.candFgps;
                if(bty==2){
                    data =AbisCheckData.candFgps_zw;
                }
                var valuelen = data.length;
                for(var i = 0; i < valuelen; i++) {
                    if(value.substr(i, 1) == '1') {
                        if(result == '') {
                            result = data[i].text
                        } else {
                            result = result + "," + data[i].text
                        }
                    }
                }
                result == '' ? value : result
                callback(result);
                break;
            default:
                result = value;
                callback(result);
        }
    }
};
/*
 初始化
 控件
 字典
 编辑状态
 */
DetailPage.prototype.init = function() {
    var _this = this;
    initPageConfig();
    if(this.param.supportEdit){
        this.initUI();
        this.initTable();
    }
    function initPageConfig(){
        if(!_this.columnConfigs){
            return
        }
        var $abisdetail = $(".abisdetail");
        $.each(_this.columnConfigs,function(index,columnConfig){
            if(WebUtil.isNull(columnConfig)){
                return;
            }
            if(!columnConfig.validate){
                columnConfig.validate={}
            }
            var inputType = columnConfig.inputType;
            //创建标题
            if(inputType==ABISCode.InputType.Title){
                $abisdetail.append("<h4>"+columnConfig.title+"</h4>");
                return true;
            }
            //创建父容器
            var $div = $("<div class='detailform' setting='{{setting}}' ><label>{{title}}</label><div class='content'></div></div>")
            $div.find("label").html(columnConfig.columnCatlog.colDispName);
            $div.attr("setting",JSON.stringify(columnConfig));
            if(inputType==ABISCode.InputType.MULTEXT){
                $div.addClass("Sigle_Line_Div TextArea_Line_Div");
            }
            $abisdetail.append($div);
        });
    }
}
/*
 * 解析页面配置 翻译控件
 */
DetailPage.prototype.initUI = function() {
    var _this = this;
    $(this.param.edit).each(function() {
        var settingStr = $(this).attr('setting')
        var setting = _this.getSetting(settingStr);
        if(WebUtil.isNull(setting) || WebUtil.isNull(setting.id))
            return;
        var arr = setting.id.split(_this.splitChar);
        var id = setting.id;
        var dataType = setting.dataType;
        //创建父容器
        var divid = id + "div";
        $(this).append($("<div id=\"" + divid + "\"></div>"));
        var abisInput = null;
        if(dataType == ABISCode.InputType.CODE) {
            var codeName = "";
            if(!WebUtil.isNull(setting.columnName)) {
                codeName = setting.columnName;
            }
            var showText = true;
            if(!WebUtil.isNull(setting.showText)) {
                showText = setting.showText;
            }
            var relatid = null;
            if(!WebUtil.isNull(setting.relatid)) {
                relatid = setting.relatid;
                showText = false;
            }
            if(!showText){
                _this.showCodeCols.push(id);
            }
            var issearchall = true;
            if(!WebUtil.isNull(setting.all)) {
                issearchall = false;
            }
            abisInput = WebUI.createCombo(divid, id, null, null, true, issearchall, codeName, "", _this.requiredField);
        } else if(dataType == ABISCode.InputType.DATE) {
            abisInput = WebUI.createDateText(divid, id, "WebTextField", "", _this.requiredField);
        } else if(dataType == ABISCode.InputType.TEXT) {
            abisInput = WebUI.createText(divid, id, "WebTextField", "", _this.requiredField);
        } else if(dataType == ABISCode.InputType.MULTEXT) {
            abisInput = WebUI.createMulText(divid, id, "WebTextArea", "", _this.requiredField);
        } else if(dataType == ABISCode.InputType.TABLE) {
            $("#" + divid).attr('id', id);
            abisInput = new WebTableMgr(id, "", 20, null);
        } else {
            alert("非法模板配置："+settingStr)
        }
        _this.initCache(abisInput);
    });
}
function getColumnConfigs(columnConfigStr){
    var columnConfig = WebUtil.string2Json(columnConfigStr);
    try {
        //优先取div配置，如果没有，从传入的配置中找
        if(WebUtil.isNull(columnConfig) || WebUtil.isNull(columnConfig.id)){
            if(!WebUtil.isNull(_this.columns)&&!WebUtil.isNull(_this.columns[settingStr])){
                columnConfig = _this.columns[settingStr];
            }
        }
    } catch(e) {
        columnConfig=null;
    }
    return columnConfig;
}
/*
 * 获取当前dom标签的 setting配置
 */
DetailPage.prototype.getSetting = function(columnConfigStr) {
    var columnConfig = WebUtil.string2Json(columnConfigStr);
    try {
        //优先取div配置，如果没有，从传入的配置中找
        if(WebUtil.isNull(columnConfig) || WebUtil.isNull(columnConfig.id)){
            if(!WebUtil.isNull(this.columns)&&!WebUtil.isNull(this.columns[settingStr])){
                columnConfig = this.columns[settingStr];
            }
        }
    } catch(e) {
        columnConfig=null;
    }
    return columnConfig;

}
/*
 TableStart
 页面表格操作相关方法

 */
DetailPage.prototype.initTable = function() {
    var _this = this;
    //表格控件 初始化
    for(var i = 0, l = this.webTableArr.length; i < l; i++) {
        var webTable = this.webTableArr[i];
        initTableData(webTable);
    }

    function initTableData(tableMgr) {
        if(WebUtil.isNull(tableMgr)) {
            return null;
        }
        var tblId = tableMgr.tblId;
        var tableJson = $.extend(true, {}, tableJsonTemple);
        $.each(_this.webInputArr, function(index, input) {
            if(input.getId().indexOf(tblId) > -1) {
                var arr = new Array();
                arr = input.getId().split(_this.splitChar);
                var name = arr[arr.length - 1];
                tableJson["headerText"][name] = $("#" + input.getId() + "div").prev().html();
                tableJson["header"].push(name)
            }
        });
        tableMgr.setInput(tableJson);
    }
};
DetailPage.prototype.setTableData = function(tableMgr, webInputArr, data, _this) {
    if(WebUtil.isNull(tableMgr)) {
        return null;
    }
    var tblId = tableMgr.tblId;
    var table = tableMgr.getTable();
    if(!WebUtil.isNull(table)) {
        table.clear();
    }
    if(!WebUtil.isNull(data)) {
        $.each(data, function(index, rowdata) {
            var array = {
                'data': {}
            };
            $.each(webInputArr, function(index, input) {
                if(input.getId().indexOf(tblId) > -1) {
                    if(input.type !== "Combo") {
                        var arr = new Array();
                        arr = input.getId().split(_this.splitChar);
                        var name = arr[arr.length - 1];
                        var value = rowdata[name];
                        array.data[name] = value;
                    }
                }
            });
            var deferreds = [];
            $.each(webInputArr, function(index, input) {
                if(input.getId().indexOf(tblId) > -1) {
                    if(input.type == "Combo") {
                        var arr = new Array();
                        arr = input.getId().split(_this.splitChar);
                        var name = arr[arr.length - 1];
                        var value = rowdata[name];
                        if($.inArray(input.getId(), _this.showCodeCols) === -1){
                            deferreds .push(WebComboUtil.getCodeText(input.columnName, value).then(function(text){
                                value = value +WebTable.splitChar + text;
                                array.data[name] = value;
                            }));
                        }else{
                            array.data[name] = value;
                        }
                    }
                }
            });
            //WARN  参数不支持数据 先兼容两个<=2
            $.when(deferreds[0],deferreds[1]).then(function () {
                table.addRow(array);
            });
        });
    }
}
/*
 * 根据id 给表格控件赋值
 */
DetailPage.prototype.setValueById = function(id,value) {
    var _this = this;
    //只读td填充
    $(this.param.detail).each(function() {
        var settingStr = $(this).attr('setting')
        var setting = _this.getSetting(settingStr);
        if(WebUtil.isNull(setting) || WebUtil.isNull(setting.id))
            return;
        if(id===setting.id){
            var $content = $(this).find(".content");
            $content.html(value);
            $content.attr("title", value)
        }
    });
}