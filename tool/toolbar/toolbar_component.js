/**
 * 工具栏组件
 * @constructor
 */
var WebToolbarComponent = function () {
    /**
     * 构造器
     * @param setting{}
     * @constructor
     */
    var WebToolbarComponentClass = function (setting) {
        this.setting = setting;
        init.call(this)
    }
    WebToolbarComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
    }
    return WebToolbarComponentClass;

    function init() {
        this.$parent = this.setting.$parent;

        initUI.call(this);
    }

    function initUI() {
        //DOM Element that holds the element
        var $parent = this.setting.$parent;
        var items = this.setting.items;
        initItems.call(this,items);
    }

    function initItems(items) {
        addItems.call(this,null, items)
    }

    function addItems(id, items) {
        var _this = this;
        if (!Array.isArray(items)) items = [items];
        var _$parent = this.setting.$parent;
        if (id) {
            _$parent = _$parent.find("#" + id);
        }
        $.each(items, function (index, item) {
            //渲染 当前按钮、菜单项
            addItem(_$parent,item)
            //增加下级菜单
            if (item.items) {
                addItems.call(_this,item.id, item.items)
            }
        })
    }
    function addItem($parent,item){
        var itemStr = '<div id="{{id}}">{{text}}</div>'
        var $item = $(itemStr.replace("{{id}}", item.id).replace("{{text}}", item.text))
        $parent.append($item);

    }
}();

var item_template = {
    id: null, // command to be sent to all event handlers
    type: 'button', // button, check, radio, drop, menu, menu-radio, menu-check, break, html, spacer
    text: null,
    html: '',
    tooltip: null, // w2toolbar.tooltip should be
    count: null,
    hidden: false,
    disabled: false,
    checked: false, // used for radio buttons
    img: null,
    icon: null,
    route: null, // if not null, it is route to go
    arrow: true, // arrow down for drop/menu types
    style: null, // extra css style for caption
    group: null, // used for radio buttons
    items: null, // for type menu* it is an array of items in the menu
    selected: null, // used for menu-check, menu-radio
    overlay: {},
    color: null, // color value - used in color pickers
    options: {
        advanced: false, // advanced picker t/f - user in color picker
        transparent: true, // transparent t/f - used in color picker
        html: '' // additional buttons for color picker
    },
    onClick: null,
    onRefresh: null
};
