/**
 * 这是自定义列表及函数文件
 */

/**
 * 搜索框对象
 */
var searchBoxObj = {
    id: '.search_box',
    init:function(){
        $(".theme_list").find("span").bind("click",function(){
            $(this).parent().children().removeClass("on");
            $(this).addClass("on");
            searchBoxObj.doSearch($(this).attr("name"))
        })
        $(".clear").click(function(){
            $(".searchInput").val("");
            $(".left_box").hide();
            $(".ul_details .details_text_box").empty();
            $("#searchCount").text('0');
        })
    },
    onfocus: function () {
        $("div.search_theme.camera_tree").hide();
        $('div.left_box, .source_type').show()
    },
    doSearch: function () {//搜索
        var typeName=$("span.on").attr("typeName");
        if(!typeName){
            //typeName='camera';
            $(".ul_details").show();
            $(".loading").next().show();
            $("#searchCount").text("0")
            $(".loading").hide();
            $(".details_text_box").html("")

             return false;
        }
        var text = $(this.id).find("input").val();
        $(".ul_details").slideDown(50);
        $(".ul_details .details_text_box").empty();
        $("#searchCount").text('');

        $('div.left_box, .source_type').show();
        $(".loading").next().hide();
        $(".loading").show();
        $('div.left_box').show();
        //数据铺到地图并回调渲染列表
        queryGeoServerData(typeName, {filterType:'like',propertyName:'title',key:text});
    },
    showCameraTree: function () {
        $("div.search_theme.source_type").hide();
        $('div.left_box, .camera_tree').show()
    },
    hide:function(){
        $(this.id).hide();
    },
    show:function(){
        $(this.id).show();
    }
}
searchBoxObj.init();
//搜索列表
var ulDetailsObj = {
    id: ".ul_details",
    data: [],//数据
    content: {//页面列表等内容
        camera: function () {//摄像头列表
            for (var i = 0; i < ulDetailsObj.data.length; i++) {
                var elem = ulDetailsObj.data[i];
                var id = elem.properties.id;
                var title = elem.properties.title;
                var coordinates = elem.geometry.coordinates;
                var html =
                    '<div class="details_text" id="' + id + '" ' +
                    '   onclick="ulDetailsObj.methods.detail(this,' + coordinates[0] + ',' + coordinates[1] + ')">' +
                    '   <p>' +
                    '       <span></span>' + title +
                    '   </p>' +
                    /*'   <ul>' +
                    '       <li class="btn_box" cameraId="' + id + '">' +
                    '             <button name="11" onclick="ulDetailsObj.methods.anniu(' + i + ')">按钮1</button>' +
                    '             <button name="22" onclick="ulDetailsObj.methods.anniu(' + i + ')">按钮2</button>' +
                    '       </li>' +
                    '   </ul>' +*/
                    '</div>';
                $(".ul_details .details_text_box").append(html);
            }
        },
        cases: function () {//案件列表

        }
    },
    methods: {//页面单击事件函数
        detail: function (_this, lon, lat) {
            $('.details_text').removeClass('on');
            $(_this).addClass('on');
            mapTool.setCenter(lon, lat);
        },
        anniu: function (index) {
            var data = ulDetailsObj.data[index].properties;
            data.btnFuncType = $(this).attr('name');
            window.VisMapJsInteract.singleclickCallback(JSON.stringify(data));
        }
    },
    renderData: function (_dataType, result) {//渲染列表
        ulDetailsObj.data = result.features;
        var length=0;
        $(".loading").next().show();
        $(".loading").hide();
        $(".ul_details .details_text_box").html("");
        if(result.features!=null && result.features!=undefined){
            length=result.features.length;
            ulDetailsObj.content[_dataType]()
        }
        $("#searchCount").text(length);

    },
    show: function ul_details_show() {//列表显示
        $(this.id).show();
    },
    hide: function ul_details_close() {//列表隐藏
       // $(".theme_list span").removeClass("on");
        $(this.id).hide();
    }
}

/**
 * 摄像头树
 * @type {{id: string, bingClick: cameraOrgTree.bingClick}}
 */
var treeObj;
var cameraOrgTree = {
    id: '#camera_org_tree',
    init: function () {
        treeObj = $.fn.zTree.init($(this.id), {
            view: {
                showIcon: false
            },
            async: {
                enable: true,
                url: 'http://localhost:8080/CameraOrgTree/findChildrenTree',
                autoParam: ["id"],
                dataFilter: this.filter
            },
            callback: {
                onClick: this.clickNode,
                onAsyncSuccess: this.loadOrgCamerasToTree
            }
        })
    },
    //节点数据整理
    filter: function (treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i = 0, l = childNodes.length; i < l; i++) {
            childNodes[i].name = childNodes[i].text.replace(/\.n/g, '.');
            childNodes[i].isParent = true;
            childNodes[i].type = 'org';
            if (childNodes[i].childrenNum > 0) {
                childNodes[i].isEnd = false;
            } else {
                childNodes[i].isEnd = true;
            }
        }

        var nodes = {type: 'root', id: 'camera_tree', name: '摄像头树列表', isParent: true, open: true};
        if (parentNode) {
            nodes = childNodes;
        } else {
            nodes.children = childNodes;
        }
        return nodes;
    },
    //单击节点
    clickNode: function (event, treeId, treeNode) {
        if (treeNode) {
            var type = treeNode.type;

            if (type == 'org') { //节点类型为机构，将该机构摄像头数据加载到地图
                var org_id = treeNode.id;
                var cql_filter = "ORG_ID = '" + org_id + "'";
                mapTool.showGeoServerData('camera', 'camera', cql_filter);

            } else if (type == 'camera') { //节点类型为摄像头，对中地图中心点
                var coordinates = treeNode.coordinates;
                mapTool.setCenter(coordinates[0], coordinates[1]);
            }
        }
    },
    //追加摄像头节点
    loadOrgCamerasToTree: function (event, treeId, treeNode) {
        if (treeNode) {
            var cql_filter = "ORG_ID = '" + treeNode.id + "'";
            mapTool.queryGeoServerData('camera', cql_filter, function (layerId, result) {
                var features = result.features;
                var nodes = {type: 'root', id: 'camera_datas', name: '摄像头数据', isParent: true, open: true, children: []};
                for (var i = 0; i < features.length; i++) {
                    var elem = features[i];
                    var id = elem.get("id");
                    var title = elem.get("title");
                    var coordinates = elem.geometry.coordinates;

                    var node = {id: id, name: title, type: 'camera', isParent: false, coordinates: coordinates};
                    nodes.children.push(node);
                }

                treeObj.addNodes(treeNode, nodes);
            });
        }
    }
};

/**
 * 操作盘对象
 */
var controlDisk={
    data:null,
    element:null,
    circ:null,
    create:function(element,btns,data){
        this.element=element;
        this.data=data;
        element.innerHTML='<div id="controlPanel01" class="controlPanelOut">' +
        '   <div class="controlPanel">' +
        '       <ul>'+
                           btns+
        '       </ul>' +
        '       <div class="btn open"><img id="cpbtn" src="../../images/close_n.png"></div>' +
        '   </div>' +
        '</div>';
        this.init();
    },
    init:function(){
        this.circ = $(".controlPanel").circular({
            centerDeg: 90,//扇形中心线角度，单位：度，默认：90
            allDeg: 359,//整个扇形角度，单位：度，默认：180
            inner: 50,//内部圆形百分比，默认：50
            hidden: true,//开始时是否隐藏，默认：false
            animation: "clockwise",//动画类型，默认：zoom，其他：clockwise：顺时针展开，counterclockwise：逆时针展开，bothside：两侧展开
            spacing: 1,//间距，单位：度，默认：0
            time: 0.5//动画时间，单位：秒，默认：0.5
        });
        this.circ.toShow();

        $(".controlPanel .btn").click(function () {
            controlDisk.circ.toHidden();
            controlDisk.element.innerHTML = '';
        });
        $(".controlPanel ul li a").click(function () {
            controlDisk.methods.operatingdiskCallback($(this).attr("name"));
            controlDisk.circ.toHidden();//隐藏方法
            controlDisk.element.innerHTML = '';
        });
        $(".controlPanel a").hover(function () {
            $(this).css("background", "radial-gradient(transparent 35.3553%, rgba(230, 220, 50,0.8) 35.3553%)");
        }, function () {
            $(this).css("background", "radial-gradient(transparent 35.3553%, rgba(0,130,180,0.8) 35.3553%)");

        });
    },
    methods:{
        operatingdiskCallback:function(btnType){
            if(btnType!=""){
                controlDisk.data.btnType=btnType;
                window.VisMapJsInteract.operatingdiskCallback(JSON.stringify(controlDisk.data));
            }
        }
    }
}
var featureDetail={
    creatContent:function(element,ulContent){
                        element.innerHTML=`<div class="pop_box_wrap">
                                            <b onclick="featureDetail.close(this)"></b>
                                            <span class="wrap_line_top"></span>
                                            <div class="pop_box">
                                                <div class="pop_text" >
                                                    <ul style="display: block;">`+
                                                    ulContent+
                                                    `</ul>
                                                </div>
                                            </div>
                                            <span class="wrap_line_bottom"></span>
                                        </div>`;
    },
    close:function(_this){
         $(_this).parents(".pop_box_wrap").remove();
    }
}
var buttonList={
    data:[],
    init:function(){
        $("ul.button_list li button").click(function () {
            var func_type = $(this).attr("name");
            if(func_type=="cancel"){
                $('ul.button_list').hide();
                toolBoxObj.clearSelect();
            }else{
                var pros = [];
                for (var i = 0; i < buttonList.data.length; i++) {
                    var pro = buttonList.data[i].getProperties();
                    delete pro.geometry;
                    pros.push(pro);
                }
                window.VisMapJsInteract.boxselectionCallback(JSON.stringify({ btnType: func_type, data: pros }));
            }
        });
    },
    setData(data){
        this.data=data;
    }
}
buttonList.init();