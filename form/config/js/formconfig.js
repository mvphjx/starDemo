var FormConfig = function () {
    var config,zTree,$content,columnConfigs;
    /**
     * 构造器
     * @param setting{}
     * @constructor
     */
    var FormConfigClass = function (setting) {
        config = setting;
        $content = $(".content");
        init.call(this);

    };
    FormConfigClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        getObject:function(){
            var  result = [];
            $content.find(".item").each(function(){
                var itemConfig = $(this).data("options");
                result.push(itemConfig.getObject())
            });
            return result;
        },
        setObject:function(textInfoConfig){
            getColumnConfigs().then(function(columnConfigs){
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
            });
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
            var $div = $('<div class="item"><label class="item-title"></label>');
            var inputType = this.columnConfig.inputType;
            var title;
            if(inputType==InputType.Title){
                title = this.columnConfig.title;
            }else{
                if(this.columnConfig.columnCatlog){
                    $div.addClass("Column");
                    title = this.columnConfig.columnCatlog.colDispName;
                    var notUpdata =this.columnConfig.validate&&this.columnConfig.validate.notUpdata,isRequired=this.columnConfig.validate&&this.columnConfig.validate.isRequired;
                    initNotUpdata(notUpdata);
                    initRequired(isRequired);
                }
            }
            $div.find(".item-title").html(title);
            $div.data("options",this);
            this.$div = $div;
            this.$parent.append($div);
            function initNotUpdata(boolean){
                if(boolean){
                    $div.append('<input id="notUpdata" type="checkbox" checked="checked">不可更新</input>');
                }else{
                    $div.append('<input id="notUpdata" type="checkbox">不可更新</input>');
                }
            }
            function initRequired(boolean){
                if(boolean){
                    $div.append('<input id="required" type="checkbox" checked="checked">必填</input>');
                }else{
                    $div.append('<input id="required" type="checkbox">必填</input>');
                }
            }
        },
        getObject:function(){
            var notUpdata =this.$div.find("#notUpdata").attr("checked")=="checked";
            var isRequired =this.$div.find("#required").attr("checked")=="checked";
            if(!this.columnConfig.validate){
                this.columnConfig.validate = {};
            }
            this.columnConfig.validate.notUpdata=notUpdata;
            this.columnConfig.validate.isRequired=isRequired;
            return this.columnConfig;
        },
        getId:function(){
            return this.columnConfig.id;
        }
    }
    return FormConfigClass;


    function init() {
        initLeftTree.call(this);
        initContent.call(this);
        initEvent.call(this);
    }

    function initLeftTree() {
        var _this = this;
        var setting = {
            edit: {
                enable: true,
                showRemoveBtn: false,
                showRenameBtn: false,
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
                beforeDrag: function () {
                    console.log("beforeDrag");
                },
                onDrop: dropTree2Dom,
                onDragMove: function () {
                    console.log("onDragMove");
                },
                onMouseUp: function () {
                    console.log("onMouseUp");
                    return true;
                }
            },
            view: {
                selectedMulti: false
            }
        };
        var zNodes = [
            {id: "columns", pId: 0, name: "列配置", isParent: true, open: true},
            {id: "title", pId: 0, name: "标题", isParent: true, open: true},
            {id: "title1", pId: "title", name: "基础信息" ,columnConfig:{inputType:InputType.Title,title:"基础信息"}},
            {id: "title2", pId: "title", name: "必填项" ,columnConfig:{inputType:InputType.Title,title:"必填项"}},
            {id: "title3", pId: "title", name: "其他信息" ,columnConfig:{inputType:InputType.Title,title:"其他信息"}}
        ];
        createNode(zNodes);
        zTree = $.fn.zTree.init($(".ztree"), setting, zNodes);
        refreshTree();
        function createNode(zNodes,columnConfig){
            getColumnConfigs().then(function(columnConfigs){
                $.each(columnConfigs,function(index,columnConfig){
                    var node = {id: "", pId: "columns", name: "",columnConfig:""};
                    node.id = columnConfig.id;
                    node.name = columnConfig.columnCatlog.colDispName;
                    node.columnConfig = columnConfig;
                    zNodes.push(node);
                })
            });
        }
    }

    function initContent() {

    }
    function initEvent(){
        $content.on("dblclick",".item",function(){
            $(this).remove();
        });
        $content.sortable({//可排序
            handle: ".item-title"
        });

    }
    /**
     * 获取所有元数据
     */
    function getColumnConfigs() {
        var def = $.Deferred();
        if(columnConfigs){
            def.resolve(columnConfigs);
        }else{//不存在去查询
            columnConfigs = demoColumnConfigs;
            def.resolve(columnConfigs);
        }
        return def.promise();
    }
    //将树节点拖拽到 模板页
    function dropTree2Dom(e, treeId, treeNodes, targetNode, moveType) {
        var thisNode = treeNodes[0];
        new ItemConfig({$parent:$content,columnConfig:thisNode.columnConfig});
        zTree.removeNode(treeNodes[0]);
    }
    function deleteDom(){

    }
    /**
     * 同步树节点与正文内容
     */
    function refreshTree(){
        $content.find(".item").each(function(){
            var itemConfig = $(this).data("options");
            var id = itemConfig.getId();
            var node = zTree.getNodeByTId(id);
            if(node){
                console.log(node);
            }
        });
    }

}();

var  formConfig = new  FormConfig();
formConfig.setObject(tpTextInfoConfig);