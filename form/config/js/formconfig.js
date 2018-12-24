

var FormConfig = function () {
    var config,zTree,$content,$tool,columnConfigs;
    /**
     * 构造器
     * @param setting{callback:{ready:function(){}}}
     * @constructor
     */
    var FormConfigClass = function (setting) {
        config = setting;
        $content = $(".content");
        $tool = $(".tool");
        init.call(this);

    };
    FormConfigClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        getObject:function(){
            var  result = {columnConfigs:[],columnCatlogs:""};
            $content.find(".item").each(function(){
                var itemConfig = $(this).data("options");
                var columnConfig = itemConfig.getObject();
                result.columnConfigs.push(columnConfig);
                if(columnConfig.inputType!=ABISCode.InputType.Title){
                    if(result.columnCatlogs){
                        result.columnCatlogs =result.columnCatlogs+","+columnConfig.columnName
                    }else{
                        result.columnCatlogs=columnConfig.columnName
                    }
                }
            });
            return result;
        },
        setObject:function(textInfoConfig){
            textInfoConfig = textInfoConfig.columnConfigs;
            $.each(textInfoConfig,function(index,columnConfig){
                var id = columnConfig.id;
                $.each(columnConfigs,function (index,model){
                    if(id==model.id){
                        columnConfig.columnCatlog = model.columnCatlog;
                    }
                });
                new ItemConfig({$parent:$content,columnConfig:columnConfig});
            });
            refreshTree();
        }
    };


    /**
     * 内部类 单个配置标题、字段
     * @param setting
     * @constructor
     */
    var ItemConfig = function (setting) {
        this.config = setting;
        this.$parent = setting.$parent;
        this.columnConfig = setting.columnConfig;
        this.init();
    };
    ItemConfig.prototype = {
        init: function (){
            var $div = $('<div class="item"><label class="item_title"></label>');
            var inputType = this.columnConfig.inputType;
            var title;
            if(inputType==ABISCode.InputType.Title){
                title = this.columnConfig.title;
            }else{
                if(this.columnConfig.columnCatlog){
                    $div.addClass("Column");
                    title = this.columnConfig.columnCatlog.colDispName;
                }
            }
            initTool.call(this);
            $div.find(".item_title").html(title);
            $div.data("options",this);
            this.$div = $div;
            this.$parent.append($div);
            function initTool(){
                var $tool = $("<div class='item_tool'></div>")
                if(this.columnConfig.columnCatlog){
                    if(!this.columnConfig.validate){
                        this.columnConfig.validate={};
                    }
                    var notUpdata =this.columnConfig.validate.notUpdata,isRequired=this.columnConfig.validate.isRequired;
                    if(isRequired){
                        $tool.append('<input id="required" type="checkbox" checked="checked">必填</input>');
                    }else{
                        $tool.append('<input id="required" type="checkbox">必填</input>');
                    }
                    if(notUpdata){
                        $tool.append('<input id="notUpdata" type="checkbox" checked="checked">不可更新</input>');
                    }else{
                        $tool.append('<input id="notUpdata" type="checkbox">不可更新</input>');
                    }
                }
                $tool.append('<span class="item_delete" >   删除</span>')
                $div.append($tool);
            }
        },
        getObject:function(){
            var notUpdata =this.$div.find("#notUpdata").prop("checked");
            var isRequired =this.$div.find("#required").prop("checked");
            if(!this.columnConfig.validate){
                this.columnConfig.validate = {};
            }
            this.columnConfig.validate.notUpdata=notUpdata;
            this.columnConfig.validate.isRequired=isRequired;
            return this.columnConfig;
        },
        getId:function(){
            return this.columnConfig.id;
        },
        delete:function(){
            this.$div.remove();
        }
    };


    return FormConfigClass;


    function init() {
        var _this = this;
        initContent.call(this);
        initLeftTree.call(this).then(function(){
            initEvent.call(_this);
            //加载完成回调
            _this.ready=true;
            config&&config.callback&&config.callback.ready&&config.callback.ready.call(_this);
        });
    }

    function initLeftTree() {
        var _this = this;
        var def = $.Deferred();
        var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false
            },
            data: {
                keep: {
                    parent: true,
                    leaf: true
                },
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onDblClick:dropTree2Dom,
                onDrop: dropTree2Dom
            },
            view: {
                selectedMulti: false
            }
        };
        var zNodes = [
            {id: "__columns__", pId: 0, name: "列配置", isParent: true, open: true},
            {id: "title", pId: 0, name: "标题", isParent: true, open: true},
            {id: "title1", pId: "title", name: "基础信息" ,columnConfig:{inputType:ABISCode.InputType.Title,title:"基础信息"}},
            {id: "title2", pId: "title", name: "必填项" ,columnConfig:{inputType:ABISCode.InputType.Title,title:"必填项"}},
            {id: "title3", pId: "title", name: "其他信息" ,columnConfig:{inputType:ABISCode.InputType.Title,title:"其他信息"}}
        ];
        getColumnConfigs().then(function(columnConfigs){
            $.each(columnConfigs,function(index,columnConfig){
                var node = getNodeFromColumnConfig(columnConfig);
                node&&zNodes.push(node);
            });
            zTree = $.fn.zTree.init($(".ztree"), setting, zNodes);
            def.resolve();
        });
        return def.promise();
    }
    function getNodeFromColumnConfig(columnConfig){
        if(!columnConfig||!columnConfig.id){
            return null;
        }
        var node = {id: "", pId: "__columns__", name: "",columnConfig:""};
        node.id = columnConfig.id;
        if(columnConfig.columnCatlog){
            node.name = columnConfig.columnCatlog.colDispName;
        }else{
            node.name = columnConfig.columnName;
        }
        node.columnConfig = columnConfig;
        return node;
    }

    function initContent() {

    }
    function initEvent(){
        var _this = this;
        $content.on("dblclick",".item",function(){
            editDom.call(this)
        });
        $content.on("click",".item_delete",function(){
            deleteDom.call($(this).parent().parent())
        });

        $content.sortable({//可排序
            handle: ".item_title"
        });
        var html = '            <div class="toolBotton" id="showEditPage">编辑页预览</div>\n' +
            '            <div class="toolBotton" id="showDetailPage">普通详情页预览</div>\n' +
            '            <div class="toolBotton" id="showCheckDetailPage">认定详情页预览</div>\n' +
            '            <div class="toolBotton">撤销</div>\n' +
            '            <div class="toolBotton" id="saveForm">保存</div>'
        $tool.append(html)
        //save
        //show
        $tool.find("#showEditPage").click(function(){
            var index = layer.open({
                type: 2,
                content: '../editpage/tpcardtxtedit.html',
                area: ['320px', '195px'],
                maxmin: true,
                success:function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    //得到iframe页的窗口对象，执行iframe页的方法：
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    var config = _this.getObject();
                    iframeWin.form(null,0,null,null,config);
                }
            });
            layer.full(index);
        });
        $tool.find("#showDetailPage").click(function(){
            var index = layer.open({
                type: 2,
                content: '../detailpage/tpcardinfo.html',
                area:  ['550px', '800px'],
                maxmin: true,
                success:function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    //得到iframe页的窗口对象，执行iframe页的方法：
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    var config = _this.getObject();
                    iframeWin.setObject({},null,config);
                }
            });
            layer.full(index);
        });
        $tool.find("#showCheckDetailPage").click(function(){
            var index = layer.open({
                type: 2,
                content: '../detailpage/tpcardinfo_check.html',
                area: ['550px', '800px'],
                maxmin: true,
                success:function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    //得到iframe页的窗口对象，执行iframe页的方法：
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    var config = _this.getObject();
                    iframeWin.setObject({},null,config);
                }
            });
        });
        $tool.find("#saveForm").click(function(){
            var formConfig = _this.getObject();
            var jsonStr = JSON.stringify(formConfig,null,2);
            var $showColumn = $("#showColumn ");
            $showColumn.empty();
            $showColumn.append('<pre></pre>')
            $showColumn.find("pre").html(jsonStr)
            layer.open({
                type: 1,
                content: $showColumn
            });
        });

    }
    /**
     * 获取所有元数据
     */
    function getColumnConfigs() {
        var def = $.Deferred();
        // if(tpColumnConfigsDemo){
        //     columnConfigs= tpColumnConfigsDemo;
        //     def.resolve(tpColumnConfigsDemo);
        //     return def.promise();
        // }
        if(columnConfigs){
            def.resolve(columnConfigs);
        }else{//不存在去查询
            columnConfigs = baseColumnConfigs.TPCARD;
            var columnNames = [];
            $.each(columnConfigs,function(index,columnConfig){
                columnNames.push(columnConfig.columnName)
            });
            var url = WebVar.VarPath + "/ctrl/cols/query";
            $.post(url,{columnNames:columnNames},
                function(data)
                {
                    if (data.status === WebCode.WebResultStatus.ok)
                    {
                        var columnCatlogMap = WebUtil.string2Json(data.data);
                        $.each(columnConfigs,function(index,columnConfig) {
                            var uniqueColumnName = columnConfig.columnName;
                            columnConfig.columnCatlog = columnCatlogMap[uniqueColumnName]
                        });
                        def.resolve(columnConfigs);
                    }else{
                        DialogUtil.openSimpleDialogForOcx(data.msg);
                    }

                }
            );

        }
        return def.promise();
    }
    //将树节点拖拽到 模板页
    function dropTree2Dom(e, treeId, treeNodes, targetNode, moveType) {
        var thisNode = treeNodes[0]||treeNodes;
        new ItemConfig({$parent:$content,columnConfig:thisNode.columnConfig});
        var inputType = thisNode.columnConfig.inputType;
        if(inputType!=ABISCode.InputType.Title){
            zTree.removeNode(thisNode);
        }
    }
    //将dom删除，回到树中
    function deleteDom(){
        var itemConfig = $(this).data("options");
        itemConfig.delete();
        var columnConfig = itemConfig.getObject();
        var node = getNodeFromColumnConfig(columnConfig);
        var parentNode = zTree.getNodeByParam("id","__columns__");
        zTree.addNodes(parentNode,node);
    }
    //编辑元数据
    function editDom(){
        var itemConfig = $(this).data("options");
        var columnConfig = itemConfig.getObject();
        var jsonStr = JSON.stringify(columnConfig,null,2);
        var $showColumn = $("#showColumn ");
        $showColumn.empty();
        $showColumn.append('<pre></pre>')
        $showColumn.find("pre").html(jsonStr)
        layer.open({
            type: 1,
            content: $showColumn
        });
    }
    /**
     * 同步树节点与正文内容
     */
    function refreshTree(){
        $content.find(".item").each(function(){
            var itemConfig = $(this).data("options");
            var id = itemConfig.getId();
            var node = zTree&&zTree.getNodeByParam("id",id);
            if(node){
                zTree.removeNode(node);
            }
        });
    }

}();


//元数据
var baseColumnConfigs = {"TPCARD":[],"LPCARD":[],"LPCASE":[]};
baseColumnConfigs.TPCARD = [
    {
        'id': 'mainInfo_And_personNum',
        'columnName': 'TP_CARD_VIEW|PERSON_NUM',
        'inputType': '1',
        'validate': {notUpdata:true,isRequired:true,'maxlength': 23, minlength: 23}
    }
    , {
        'id': 'tpCardInfo_And_cardNum',
        'columnName': 'TP_CARD_VIEW|CARD_NUM',
        'inputType': '1',
        'validate': {'maxlength': 22, minlength: 22}
    }
    , {'id': 'tpCardInfo_And_printDate', 'columnName': 'TP_CARD_VIEW|PRINT_DATE', 'inputType': '2'}
    , {'id': 'tpCardInfo_And_printBy', 'columnName': 'TP_CARD_VIEW|PRINT_BY', 'inputType': '1', 'validate': {'maxlength': 40}}
    , {
        'id': 'tpCardInfo_And_printUnitCode',
        'showText': false,
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|PRINT_UNIT_CODE',
        'relatid': 'tpCardInfo_And_printUnitNamediv',
        'all': false
    }
    , {
        'id': 'tpCardInfo_And_printUnitName',
        'columnName': 'TP_CARD_VIEW|PRINT_UNIT_NAME',
        'inputType': '5',
        'validate': {'maxlength': 70}
    }
    , {
        'id': 'personTextInfo_And_Name',
        'columnName': 'TP_CARD_VIEW|NAME',
        'inputType': '1',
        'validate': {'maxlength': 50}
    }
    , {
        'id': 'personTextInfo_And_NamePinyin',
        'columnName': 'TP_CARD_VIEW|NAME_PINYIN',
        'inputType': '1',
        'validate': {'maxlength': 60}
    }
    , {
        'id': 'personTextInfo_And_ShenfenId',
        'columnName': 'TP_CARD_VIEW|SHENFEN_ID',
        'inputType': '1',
        'validate': {'shenfenid': true}
    }
    , {'id': 'personTextInfo_And_BirthDate', 'columnName': 'TP_CARD_VIEW|BIRTH_DATE', 'inputType': '2'}
    , {
        'id': 'personTextInfo_And_SexCode',
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|SEX_CODE'
    }
    , {'id': 'personTextInfo_And_Nation', 'inputType': '0', 'columnName': 'TP_CARD_VIEW|NATION', 'all': false}
    , {'id': 'personTextInfo_And_MinZu', 'inputType': '0', 'columnName': 'TP_CARD_VIEW|MIN_ZU'}
    , {'id': 'personTextInfo_And_Alias', 'inputType': '1', 'validate': {'maxlength': 50},'columnName': 'TP_CARD_VIEW|ALIAS'}
    , {
        'id': 'personTextInfo_And_CaseInfo_And_CaseNum',
        'columnName': 'TP_CARD_VIEW|CASE_NUM',
        'inputType': '1',
        'validate': {'maxlength': 23, minlength: 23}
    }
    , {
        'id': 'personTextInfo_And_CaseInfo_And_PersonClassCode',
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|PERSON_CLASS_CODE'
    }
    , {
        'id': 'personTextInfo_And_CaseInfo_And_CaseClassCode1',
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|CASE_CLASS_CODE_1',
        'all': false
    }
    , {
        'id': 'personTextInfo_And_CaseInfo_And_CaseClassCode2',
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|CASE_CLASS_CODE_2',
        'all': false
    }
    , {
        'id': 'personTextInfo_And_CaseInfo_And_CaseClassCode3',
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|CASE_CLASS_CODE_3',
        'all': false
    }
    , {
        'id': 'personTextInfo_And_CaseInfo_And_IsCriminal',
        'inputType': '0',
        'columnName': 'TP_CARD_VIEW|IS_CRIMINAL'
    }
    , {
        'id': 'personTextInfo_And_CaseInfo_And_CriminalRecord',
        'columnName': 'TP_CARD_VIEW|criminal_record',
        'inputType': '3'
    }
    , {
        'id': 'personTextInfo_And_Comments',
        'columnName': 'TP_CARD_VIEW|COMMENTS',
        'inputType': '3',
        'validate': {'maxlength': 1000}
    }
    , {
        'id': 'personTextInfo_And_BodyInfo_And_BodyHeight',
        'columnName': 'TP_CARD_VIEW|BODY_HEIGHT',
        'inputType': '1',
        'validate': {'isdigital': true, 'maxlength': 6, 'maxvalue': 300}
    }
    , {
        'id': 'personTextInfo_And_BodyInfo_And_FootLength',
        'columnName': 'TP_CARD_VIEW|FOOT_LENGTH',
        'inputType': '1',
        'validate': {'isdigital': true, 'maxlength': 6}
    }
    , {
        'id': 'personTextInfo_And_BodyInfo_And_BodyWeight',
        'columnName': 'TP_CARD_VIEW|BODY_WEIGHT',
        'inputType': '1',
        'validate': {'isdigital': true, 'maxlength': 6}
    }
];
//元数据扩展
baseColumnConfigs.TPCARD.push({
    'id': 'mainInfo_And_createUser',
    'columnName': 'TP_CARD_VIEW|CREATE_USER',
    'inputType': '1',
    'validate': {'isdigital': true, 'maxlength': 20}
});
baseColumnConfigs.TPCARD.push({
    'id': 'personTextInfo_And_DiyInfo_And_AuditionCap',
    'columnName': 'TP_CARD_VIEW|AUDITION_CAP',
    'inputType': '0',
    'validate': {'isdigital': true, 'maxlength': 20}
});






var defaultPageConfig = {"TPCARD":[],"LPCARD":[],"LPCASE":[]};
defaultPageConfig.TPCARD = {"columnConfigs":[{"inputType":"Title","title":"基础信息","validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_personNum","columnName":"TP_CARD_VIEW|PERSON_NUM","inputType":"1","validate":{"notUpdata":true,"isRequired":true,"maxlength":23,"minlength":23},"columnCatlog":{"id":14879,"tableName":"_BASE_8CDD25A0_","columnName":"PERSON_NUM","colDispName":"人员编号","colDispWidth":185,"inputCode":"RYBH","entityAttrType":null,"description":"PERSON_NUM","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"tpCardInfo_And_printDate","columnName":"TP_CARD_VIEW|PRINT_DATE","inputType":"2","columnCatlog":{"id":14910,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_DATE","colDispName":"捺印日期","colDispWidth":100,"inputCode":"NYRQ","entityAttrType":null,"description":"PRINT_DATE","codeTableName":null,"storageFmt":2,"dataType":3,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"tpCardInfo_And_cardNum","columnName":"TP_CARD_VIEW|CARD_NUM","inputType":"1","validate":{"maxlength":22,"minlength":22,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13947,"tableName":"_BASE_8CDD25A0_","columnName":"CARD_NUM","colDispName":"卡片号码","colDispWidth":180,"inputCode":"KPHM","entityAttrType":null,"description":"CARD_NUM","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"tpCardInfo_And_printBy","columnName":"TP_CARD_VIEW|PRINT_BY","inputType":"1","validate":{"maxlength":40,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14909,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_BY","colDispName":"捺印人","colDispWidth":100,"inputCode":"NYR","entityAttrType":null,"description":"PRINT_BY","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"tpCardInfo_And_printUnitCode","showText":false,"inputType":"0","columnName":"TP_CARD_VIEW|PRINT_UNIT_CODE","relatid":"tpCardInfo_And_printUnitNamediv","all":false,"columnCatlog":{"id":14914,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_UNIT_CODE","colDispName":"捺印单位代码","colDispWidth":100,"inputCode":"NYDWDM","entityAttrType":null,"description":"PRINT_UNIT_CODE","codeTableName":"_BASE_8CDD25A0_ORGANIZATION_CODE","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":6,"macroType":2},"validate":{"notUpdata":false,"isRequired":false}},{"id":"tpCardInfo_And_printUnitName","columnName":"TP_CARD_VIEW|PRINT_UNIT_NAME","inputType":"5","validate":{"maxlength":70,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14915,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_UNIT_NAME","colDispName":"捺印单位名称","colDispWidth":100,"inputCode":"NYDWMC","entityAttrType":null,"description":"PRINT_UNIT_NAME","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_Name","columnName":"TP_CARD_VIEW|NAME","inputType":"1","validate":{"maxlength":50,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13732,"tableName":"TP_CARD_VIEW","columnName":"NAME","colDispName":"姓名","colDispWidth":100,"inputCode":"XM","entityAttrType":null,"description":"NAME","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_NamePinyin","columnName":"TP_CARD_VIEW|NAME_PINYIN","inputType":"1","validate":{"maxlength":60,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14782,"tableName":"_BASE_8CDD25A0_","columnName":"NAME_PINYIN","colDispName":"拼音","colDispWidth":50,"inputCode":"PY","entityAttrType":null,"description":"NamePinyin","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_ShenfenId","columnName":"TP_CARD_VIEW|SHENFEN_ID","inputType":"1","validate":{"shenfenid":true,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":15109,"tableName":"_BASE_8CDD25A0_","columnName":"SHENFEN_ID","colDispName":"身份证号码","colDispWidth":150,"inputCode":"SFZHM","entityAttrType":null,"description":"ShenfenId","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_BirthDate","columnName":"TP_CARD_VIEW|BIRTH_DATE","inputType":"2","columnCatlog":{"id":13885,"tableName":"_BASE_8CDD25A0_","columnName":"BIRTH_DATE","colDispName":"出生日期","colDispWidth":80,"inputCode":"SCRQ","entityAttrType":null,"description":"BIRTH_DATE","codeTableName":null,"storageFmt":2,"dataType":3,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_SexCode","inputType":"0","columnName":"TP_CARD_VIEW|SEX_CODE","columnCatlog":{"id":15105,"tableName":"_BASE_8CDD25A0_","columnName":"SEX_CODE","colDispName":"性别","colDispWidth":80,"inputCode":"XB","entityAttrType":null,"description":"SEX_CODE","codeTableName":"SEX","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_Nation","inputType":"0","columnName":"TP_CARD_VIEW|NATION","all":false,"columnCatlog":{"id":14784,"tableName":"_BASE_8CDD25A0_","columnName":"NATION","colDispName":"国家","colDispWidth":60,"inputCode":"GJ","entityAttrType":null,"description":"NATION","codeTableName":"NATION","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_MinZu","inputType":"0","columnName":"TP_CARD_VIEW|MIN_ZU","columnCatlog":{"id":14758,"tableName":"_BASE_8CDD25A0_","columnName":"MIN_ZU","colDispName":"民族","colDispWidth":60,"inputCode":"MZ","entityAttrType":null,"description":"MIN_ZU","codeTableName":"NATIONALITY","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_Alias","inputType":"1","validate":{"maxlength":50,"notUpdata":false,"isRequired":false},"columnName":"TP_CARD_VIEW|ALIAS","columnCatlog":{"id":13838,"tableName":"_BASE_8CDD25A0_","columnName":"ALIAS","colDispName":"别名","colDispWidth":60,"inputCode":"BM","entityAttrType":null,"description":"ALIAS","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_CaseInfo_And_CaseNum","columnName":"TP_CARD_VIEW|CASE_NUM","inputType":"1","validate":{"maxlength":23,"minlength":23,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13977,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_NUM","colDispName":"GA标准案事件编号","colDispWidth":185,"inputCode":"AJHM","entityAttrType":null,"description":"CASE_NUM","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_CaseInfo_And_PersonClassCode","inputType":"0","columnName":"TP_CARD_VIEW|PERSON_CLASS_CODE","columnCatlog":{"id":14871,"tableName":"_BASE_8CDD25A0_","columnName":"PERSON_CLASS_CODE","colDispName":"人员类别","colDispWidth":60,"inputCode":"RYLB","entityAttrType":null,"description":"PERSON_CLASS_CODE","codeTableName":"PERSON_CLASS_CODE","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CaseClassCode1","inputType":"0","columnName":"TP_CARD_VIEW|CASE_CLASS_CODE_1","all":false,"columnCatlog":{"id":13965,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_CLASS_CODE_1","colDispName":"案件类别1","colDispWidth":100,"inputCode":"AJLB1","entityAttrType":null,"description":"CASE_CLASS_CODE_1","codeTableName":"CASE_CLASS","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CaseClassCode2","inputType":"0","columnName":"TP_CARD_VIEW|CASE_CLASS_CODE_2","all":false,"columnCatlog":{"id":13966,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_CLASS_CODE_2","colDispName":"案件类别2","colDispWidth":100,"inputCode":"AJLB2","entityAttrType":null,"description":"CASE_CLASS_CODE_2","codeTableName":"CASE_CLASS","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CaseClassCode3","inputType":"0","columnName":"TP_CARD_VIEW|CASE_CLASS_CODE_3","all":false,"columnCatlog":{"id":13967,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_CLASS_CODE_3","colDispName":"案件类别3","colDispWidth":100,"inputCode":"AJLB3","entityAttrType":null,"description":"CASE_CLASS_CODE_3","codeTableName":"CASE_CLASS","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_IsCriminal","inputType":"0","columnName":"TP_CARD_VIEW|IS_CRIMINAL","columnCatlog":{"id":14562,"tableName":"_BASE_8CDD25A0_","columnName":"IS_CRIMINAL","colDispName":"是否前科人员","colDispWidth":100,"inputCode":"SFQK","entityAttrType":null,"description":"CaseInfo.IsCriminal","codeTableName":"BOOL_CODE_NUM","storageFmt":0,"dataType":6,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CriminalRecord","columnName":"TP_CARD_VIEW|criminal_record","inputType":"3","columnCatlog":{"id":14127,"tableName":"_BASE_8CDD25A0_","columnName":"CRIMINAL_RECORD","colDispName":"前科劣迹情况","colDispWidth":100,"inputCode":"QKLJQK","entityAttrType":null,"description":"CaseInfo.CriminalRecord","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_Comments","columnName":"TP_CARD_VIEW|COMMENTS","inputType":"3","validate":{"maxlength":1000,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14075,"tableName":"_BASE_8CDD25A0_","columnName":"COMMENTS","colDispName":"备注","colDispWidth":100,"inputCode":"BZ","entityAttrType":null,"description":"COMMENTS","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"inputType":"Title","title":"其他信息","validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_BodyInfo_And_BodyHeight","columnName":"TP_CARD_VIEW|BODY_HEIGHT","inputType":"1","validate":{"isdigital":true,"maxlength":6,"maxvalue":300,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13892,"tableName":"_BASE_8CDD25A0_","columnName":"BODY_HEIGHT","colDispName":"身高","colDispWidth":100,"inputCode":"SG","entityAttrType":null,"description":"BODY_HEIGHT","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_BodyInfo_And_FootLength","columnName":"TP_CARD_VIEW|FOOT_LENGTH","inputType":"1","validate":{"isdigital":true,"maxlength":6,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14349,"tableName":"_BASE_8CDD25A0_","columnName":"FOOT_LENGTH","colDispName":"足长","colDispWidth":100,"inputCode":"ZC","entityAttrType":null,"description":"BodyInfo.FootLength","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_BodyInfo_And_BodyWeight","columnName":"TP_CARD_VIEW|BODY_WEIGHT","inputType":"1","validate":{"isdigital":true,"maxlength":6,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13893,"tableName":"_BASE_8CDD25A0_","columnName":"BODY_WEIGHT","colDispName":"体重","colDispWidth":100,"inputCode":"TZ","entityAttrType":null,"description":"BodyInfo.BodyWeight","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}}],"columnCatlogs":"TP_CARD_VIEW|PERSON_NUM,TP_CARD_VIEW|PRINT_DATE,TP_CARD_VIEW|CARD_NUM,TP_CARD_VIEW|PRINT_BY,TP_CARD_VIEW|PRINT_UNIT_CODE,TP_CARD_VIEW|PRINT_UNIT_NAME,TP_CARD_VIEW|NAME,TP_CARD_VIEW|NAME_PINYIN,TP_CARD_VIEW|SHENFEN_ID,TP_CARD_VIEW|BIRTH_DATE,TP_CARD_VIEW|SEX_CODE,TP_CARD_VIEW|NATION,TP_CARD_VIEW|MIN_ZU,TP_CARD_VIEW|ALIAS,TP_CARD_VIEW|CASE_NUM,TP_CARD_VIEW|PERSON_CLASS_CODE,TP_CARD_VIEW|CASE_CLASS_CODE_1,TP_CARD_VIEW|CASE_CLASS_CODE_2,TP_CARD_VIEW|CASE_CLASS_CODE_3,TP_CARD_VIEW|IS_CRIMINAL,TP_CARD_VIEW|criminal_record,TP_CARD_VIEW|COMMENTS,TP_CARD_VIEW|BODY_HEIGHT,TP_CARD_VIEW|FOOT_LENGTH,TP_CARD_VIEW|BODY_WEIGHT"};
//单机元数据测试
var tpPageDemo ={"columnConfigs":[{"inputType":"Title","title":"基础信息","validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_personNum","columnName":"TP_CARD_VIEW|PERSON_NUM","inputType":"1","validate":{"notUpdata":true,"isRequired":true,"maxlength":23,"minlength":23},"columnCatlog":{"id":14879,"tableName":"_BASE_8CDD25A0_","columnName":"PERSON_NUM","colDispName":"人员编号","colDispWidth":185,"inputCode":"RYBH","entityAttrType":null,"description":"PERSON_NUM","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"tpCardInfo_And_printDate","columnName":"TP_CARD_VIEW|PRINT_DATE","inputType":"2","columnCatlog":{"id":14910,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_DATE","colDispName":"捺印日期","colDispWidth":100,"inputCode":"NYRQ","entityAttrType":null,"description":"PRINT_DATE","codeTableName":null,"storageFmt":2,"dataType":3,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"tpCardInfo_And_cardNum","columnName":"TP_CARD_VIEW|CARD_NUM","inputType":"1","validate":{"maxlength":22,"minlength":22,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13947,"tableName":"_BASE_8CDD25A0_","columnName":"CARD_NUM","colDispName":"卡片号码","colDispWidth":180,"inputCode":"KPHM","entityAttrType":null,"description":"CARD_NUM","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"tpCardInfo_And_printBy","columnName":"TP_CARD_VIEW|PRINT_BY","inputType":"1","validate":{"maxlength":40,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14909,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_BY","colDispName":"捺印人","colDispWidth":100,"inputCode":"NYR","entityAttrType":null,"description":"PRINT_BY","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"tpCardInfo_And_printUnitCode","showText":false,"inputType":"0","columnName":"TP_CARD_VIEW|PRINT_UNIT_CODE","relatid":"tpCardInfo_And_printUnitNamediv","all":false,"columnCatlog":{"id":14914,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_UNIT_CODE","colDispName":"捺印单位代码","colDispWidth":100,"inputCode":"NYDWDM","entityAttrType":null,"description":"PRINT_UNIT_CODE","codeTableName":"_BASE_8CDD25A0_ORGANIZATION_CODE","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":6,"macroType":2},"validate":{"notUpdata":false,"isRequired":false}},{"id":"tpCardInfo_And_printUnitName","columnName":"TP_CARD_VIEW|PRINT_UNIT_NAME","inputType":"5","validate":{"maxlength":70,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14915,"tableName":"_BASE_8CDD25A0_","columnName":"PRINT_UNIT_NAME","colDispName":"捺印单位名称","colDispWidth":100,"inputCode":"NYDWMC","entityAttrType":null,"description":"PRINT_UNIT_NAME","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_Name","columnName":"TP_CARD_VIEW|NAME","inputType":"1","validate":{"maxlength":50,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13732,"tableName":"TP_CARD_VIEW","columnName":"NAME","colDispName":"姓名","colDispWidth":100,"inputCode":"XM","entityAttrType":null,"description":"NAME","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_NamePinyin","columnName":"TP_CARD_VIEW|NAME_PINYIN","inputType":"1","validate":{"maxlength":60,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14782,"tableName":"_BASE_8CDD25A0_","columnName":"NAME_PINYIN","colDispName":"拼音","colDispWidth":50,"inputCode":"PY","entityAttrType":null,"description":"NamePinyin","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_ShenfenId","columnName":"TP_CARD_VIEW|SHENFEN_ID","inputType":"1","validate":{"shenfenid":true,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":15109,"tableName":"_BASE_8CDD25A0_","columnName":"SHENFEN_ID","colDispName":"身份证号码","colDispWidth":150,"inputCode":"SFZHM","entityAttrType":null,"description":"ShenfenId","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_BirthDate","columnName":"TP_CARD_VIEW|BIRTH_DATE","inputType":"2","columnCatlog":{"id":13885,"tableName":"_BASE_8CDD25A0_","columnName":"BIRTH_DATE","colDispName":"出生日期","colDispWidth":80,"inputCode":"SCRQ","entityAttrType":null,"description":"BIRTH_DATE","codeTableName":null,"storageFmt":2,"dataType":3,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_SexCode","inputType":"0","columnName":"TP_CARD_VIEW|SEX_CODE","columnCatlog":{"id":15105,"tableName":"_BASE_8CDD25A0_","columnName":"SEX_CODE","colDispName":"性别","colDispWidth":80,"inputCode":"XB","entityAttrType":null,"description":"SEX_CODE","codeTableName":"SEX","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_Nation","inputType":"0","columnName":"TP_CARD_VIEW|NATION","all":false,"columnCatlog":{"id":14784,"tableName":"_BASE_8CDD25A0_","columnName":"NATION","colDispName":"国家","colDispWidth":60,"inputCode":"GJ","entityAttrType":null,"description":"NATION","codeTableName":"NATION","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_MinZu","inputType":"0","columnName":"TP_CARD_VIEW|MIN_ZU","columnCatlog":{"id":14758,"tableName":"_BASE_8CDD25A0_","columnName":"MIN_ZU","colDispName":"民族","colDispWidth":60,"inputCode":"MZ","entityAttrType":null,"description":"MIN_ZU","codeTableName":"NATIONALITY","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_Alias","inputType":"1","validate":{"maxlength":50,"notUpdata":false,"isRequired":false},"columnName":"TP_CARD_VIEW|ALIAS","columnCatlog":{"id":13838,"tableName":"_BASE_8CDD25A0_","columnName":"ALIAS","colDispName":"别名","colDispWidth":60,"inputCode":"BM","entityAttrType":null,"description":"ALIAS","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_CaseInfo_And_CaseNum","columnName":"TP_CARD_VIEW|CASE_NUM","inputType":"1","validate":{"maxlength":23,"minlength":23,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13977,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_NUM","colDispName":"GA标准案事件编号","colDispWidth":185,"inputCode":"AJHM","entityAttrType":null,"description":"CASE_NUM","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_CaseInfo_And_PersonClassCode","inputType":"0","columnName":"TP_CARD_VIEW|PERSON_CLASS_CODE","columnCatlog":{"id":14871,"tableName":"_BASE_8CDD25A0_","columnName":"PERSON_CLASS_CODE","colDispName":"人员类别","colDispWidth":60,"inputCode":"RYLB","entityAttrType":null,"description":"PERSON_CLASS_CODE","codeTableName":"PERSON_CLASS_CODE","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CaseClassCode1","inputType":"0","columnName":"TP_CARD_VIEW|CASE_CLASS_CODE_1","all":false,"columnCatlog":{"id":13965,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_CLASS_CODE_1","colDispName":"案件类别1","colDispWidth":100,"inputCode":"AJLB1","entityAttrType":null,"description":"CASE_CLASS_CODE_1","codeTableName":"CASE_CLASS","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CaseClassCode2","inputType":"0","columnName":"TP_CARD_VIEW|CASE_CLASS_CODE_2","all":false,"columnCatlog":{"id":13966,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_CLASS_CODE_2","colDispName":"案件类别2","colDispWidth":100,"inputCode":"AJLB2","entityAttrType":null,"description":"CASE_CLASS_CODE_2","codeTableName":"CASE_CLASS","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CaseClassCode3","inputType":"0","columnName":"TP_CARD_VIEW|CASE_CLASS_CODE_3","all":false,"columnCatlog":{"id":13967,"tableName":"_BASE_8CDD25A0_","columnName":"CASE_CLASS_CODE_3","colDispName":"案件类别3","colDispWidth":100,"inputCode":"AJLB3","entityAttrType":null,"description":"CASE_CLASS_CODE_3","codeTableName":"CASE_CLASS","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_IsCriminal","inputType":"0","columnName":"TP_CARD_VIEW|IS_CRIMINAL","columnCatlog":{"id":14562,"tableName":"_BASE_8CDD25A0_","columnName":"IS_CRIMINAL","colDispName":"是否前科人员","colDispWidth":100,"inputCode":"SFQK","entityAttrType":null,"description":"CaseInfo.IsCriminal","codeTableName":"BOOL_CODE_NUM","storageFmt":0,"dataType":6,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_CaseInfo_And_CriminalRecord","columnName":"TP_CARD_VIEW|criminal_record","inputType":"3","columnCatlog":{"id":14127,"tableName":"_BASE_8CDD25A0_","columnName":"CRIMINAL_RECORD","colDispName":"前科劣迹情况","colDispWidth":100,"inputCode":"QKLJQK","entityAttrType":null,"description":"CaseInfo.CriminalRecord","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_Comments","columnName":"TP_CARD_VIEW|COMMENTS","inputType":"3","validate":{"maxlength":1000,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14075,"tableName":"_BASE_8CDD25A0_","columnName":"COMMENTS","colDispName":"备注","colDispWidth":100,"inputCode":"BZ","entityAttrType":null,"description":"COMMENTS","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"inputType":"Title","title":"其他信息","validate":{"notUpdata":false,"isRequired":false}},{"id":"personTextInfo_And_BodyInfo_And_BodyHeight","columnName":"TP_CARD_VIEW|BODY_HEIGHT","inputType":"1","validate":{"isdigital":true,"maxlength":6,"maxvalue":300,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13892,"tableName":"_BASE_8CDD25A0_","columnName":"BODY_HEIGHT","colDispName":"身高","colDispWidth":100,"inputCode":"SG","entityAttrType":null,"description":"BODY_HEIGHT","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_BodyInfo_And_FootLength","columnName":"TP_CARD_VIEW|FOOT_LENGTH","inputType":"1","validate":{"isdigital":true,"maxlength":6,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":14349,"tableName":"_BASE_8CDD25A0_","columnName":"FOOT_LENGTH","colDispName":"足长","colDispWidth":100,"inputCode":"ZC","entityAttrType":null,"description":"BodyInfo.FootLength","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"personTextInfo_And_BodyInfo_And_BodyWeight","columnName":"TP_CARD_VIEW|BODY_WEIGHT","inputType":"1","validate":{"isdigital":true,"maxlength":6,"notUpdata":false,"isRequired":false},"columnCatlog":{"id":13893,"tableName":"_BASE_8CDD25A0_","columnName":"BODY_WEIGHT","colDispName":"体重","colDispWidth":100,"inputCode":"TZ","entityAttrType":null,"description":"BodyInfo.BodyWeight","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0}},{"id":"mainInfo_And_createUser","columnName":"CASE_EVENT|CREATE_USER","dataType":"1","columnCatlog":{"id":14125,"tableName":"_BASE_8CDD25A0_","columnName":"CREATE_USER","colDispName":"创建人","colDispWidth":120,"inputCode":"CJR","entityAttrType":null,"description":"CREATE_USER","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":1},"validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_createTime","columnName":"CASE_EVENT|CREATE_TIME","dataType":"2","columnCatlog":{"id":14123,"tableName":"_BASE_8CDD25A0_","columnName":"CREATE_TIME","colDispName":"创建时间","colDispWidth":200,"inputCode":"CJRQ","entityAttrType":null,"description":"CREATE_TIME","codeTableName":null,"storageFmt":5,"dataType":5,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_updateUser","columnName":"CASE_EVENT|UPDATE_USER","dataType":"1","columnCatlog":{"id":15376,"tableName":"_BASE_8CDD25A0_","columnName":"UPDATE_USER","colDispName":"更新人","colDispWidth":100,"inputCode":"GXR","entityAttrType":null,"description":"UPDATE_USER","codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":1},"validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_updateTime","columnName":"CASE_EVENT|UPDATE_TIME","dataType":"2","columnCatlog":{"id":15374,"tableName":"_BASE_8CDD25A0_","columnName":"UPDATE_TIME","colDispName":"更新时间","colDispWidth":200,"inputCode":"GXSJ","entityAttrType":null,"description":"UPDATE_TIME","codeTableName":null,"storageFmt":5,"dataType":5,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0,"macroType":0},"validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_createUnitCode","dataType":"0","columnName":"CASE_EVENT|CREATE_UNIT_CODE","all":"false","showText":"false","columnCatlog":{"id":14124,"tableName":"_BASE_8CDD25A0_","columnName":"CREATE_UNIT_CODE","colDispName":"创建单位代码","colDispWidth":120,"inputCode":"CJDWDM","entityAttrType":null,"description":"CREATE_UNIT_CODE","codeTableName":"_BASE_8CDD25A0_ORGANIZATION_CODE","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":6,"macroType":2},"validate":{"notUpdata":false,"isRequired":false}},{"id":"mainInfo_And_updateUnitCode","dataType":"0","columnName":"CASE_EVENT|UPDATE_UNIT_CODE","all":"false","showText":"false","columnCatlog":{"id":15375,"tableName":"_BASE_8CDD25A0_","columnName":"UPDATE_UNIT_CODE","colDispName":"更新单位代码","colDispWidth":120,"inputCode":"GXDWDM","entityAttrType":null,"description":"UPDATE_UNIT_CODE","codeTableName":"_BASE_8CDD25A0_ORGANIZATION_CODE","storageFmt":0,"dataType":2,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":6,"macroType":2},"validate":{"notUpdata":false,"isRequired":false}}],"columnCatlogs":"TP_CARD_VIEW|PERSON_NUM,TP_CARD_VIEW|PRINT_DATE,TP_CARD_VIEW|CARD_NUM,TP_CARD_VIEW|PRINT_BY,TP_CARD_VIEW|PRINT_UNIT_CODE,TP_CARD_VIEW|PRINT_UNIT_NAME,TP_CARD_VIEW|NAME,TP_CARD_VIEW|NAME_PINYIN,TP_CARD_VIEW|SHENFEN_ID,TP_CARD_VIEW|BIRTH_DATE,TP_CARD_VIEW|SEX_CODE,TP_CARD_VIEW|NATION,TP_CARD_VIEW|MIN_ZU,TP_CARD_VIEW|ALIAS,TP_CARD_VIEW|CASE_NUM,TP_CARD_VIEW|PERSON_CLASS_CODE,TP_CARD_VIEW|CASE_CLASS_CODE_1,TP_CARD_VIEW|CASE_CLASS_CODE_2,TP_CARD_VIEW|CASE_CLASS_CODE_3,TP_CARD_VIEW|IS_CRIMINAL,TP_CARD_VIEW|criminal_record,TP_CARD_VIEW|COMMENTS,TP_CARD_VIEW|BODY_HEIGHT,TP_CARD_VIEW|FOOT_LENGTH,TP_CARD_VIEW|BODY_WEIGHT,CASE_EVENT|CREATE_USER,CASE_EVENT|CREATE_TIME,CASE_EVENT|UPDATE_USER,CASE_EVENT|UPDATE_TIME,CASE_EVENT|CREATE_UNIT_CODE,CASE_EVENT|UPDATE_UNIT_CODE"};
var tpColumnConfigsDemo = [];
$.each(tpPageDemo.columnConfigs,function(index,columnConfig){
    if(columnConfig.id){
        tpColumnConfigsDemo.push(columnConfig);
    }
});