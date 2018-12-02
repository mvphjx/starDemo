var WebVar = {VarPath: "abisweb/", ImgOcxBg: 9211275, TimeOut: 10000, Local: "zh", CustPath: "cust/pku"};
var GisHelper = function () {
    var gismap, overlays = [],_this;
    var levelMap = {

    };
    /**
     * 构造器
     * @param setting{map}
     * @constructor
     */
    var GisHelperClass = function (setting) {
        init(setting.id);
        _this=this;
    };
    GisHelperClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        getMap: function () {
            return gismap;
        },
        loadData:function(){//加载当前图层的数据
            loadData(gismap.getZoom())
        },
        loadCaseData:function(param){//刷新案件列表
            if(gismap.getZoom()>14){
                return;//14以上不需要单独 刷新案件列表
            }
            getCaseData(param).then(function (data) {
                var result  = data.tblData.result;
                $(".gis-list").empty();
                var num=0;
                for (var i = 0; i < result.length; i++) {
                    var model = result[i].data;
                    var address=model.CE_OCCUR_PLACE;
                    getGeocoder(address,function(setting){
                        if(num<10){
                            num++;
                            addCaseList(setting);
                        }
                    },model);
                }
            })
        }
    };
    return GisHelperClass;

    function init(id) {
        gismap = new IMAP.Map(id, {
            minZoom: 5,
            zoom: 5,//设置地图初始化级别
            //tileUrl: ["http://{s}/v3/tile?z={z}&x={x}&y={y}",[host+":25333",host+":25333"]],
            center: new IMAP.LngLat(116.404269, 39.917591),//设置地图中心点坐标
            animation: true//设置地图缩放动画效果
        });
        var navi = new IMAP.NavigationControl({
            visible: true
        });
        var scale = new IMAP.ScaleControl({
            visible: true
        });
        gismap.addControl(navi);
        gismap.addControl(scale);
        gismap.addEventListener(IMAP.Constants.ZOOM_CHANGED, function (type, target, zoom) {//事件绑定
            var zoom = type.zoom;
            loadData(zoom);

        }, gismap);
        return;
        var $switchRight = $(".switch-right");
        var slideBar = $(".slideBar");
        $switchRight.on('click', changeBar);//点击更多显示slide
        function changeBar() {
            var maigin_right = 5;
            var right = slideBar.css("right");
            if(right==maigin_right+"px"){
                slideBar.css('right', - slideBar.width()-maigin_right) ;//修改CSS
                $switchRight.addClass("switch-toleft");
                $switchRight.removeClass("switch-toright");
            }else{
                slideBar.css('right', maigin_right); //修改CSS
                $switchRight.addClass("switch-toright");
                $switchRight.removeClass("switch-toleft");
            }
        }
        var $switchLeft = $(".switch-left");
        var $homelist = $(".homelist");
        var $gisMap = $(".gisMap");
        var leftWidth = 300;
        $switchLeft.on('click', function(){
            if($homelist.is(":hidden")){
                $homelist.show();
                $homelist.animate({"width": leftWidth}, 300, function () {
                    $gisMap.css("padding-left",leftWidth);
                    gismap.autoResize();
                    $switchLeft.addClass("switch-toleft");
                    $switchLeft.removeClass("switch-toright");
                    $switchLeft.css("left",leftWidth);
                });
            }else{
                $homelist.animate({"width": 0}, 300, function () {
                    $homelist.hide();
                    $gisMap.css("padding-left","0");
                    gismap.autoResize();
                    $switchLeft.addClass("switch-toright");
                    $switchLeft.removeClass("switch-toleft");
                    $switchLeft.css("left",0);
                });
            }
        });
        initHomeList();
        initSearch();
    }
    function initHomeList() {
        WebUI.createLinkButton("homListCfgBtn",LinkButtonCfg.Cfg,function(){

        });
    }

/*
检索模块
 */
    var timeBegin,timeEnd,area,caseCommitType,caseClassCode,searchButton;
    function initSearch() {
        var chosenOption = {
            single: true,
            allow_single_deselect: true
            //max_selected_options: 1
        };
        //timeBegin = WebUI.createDateTimeText("timeBegindiv","timeBegin","shortWh Text_Input","",null,{});
        //timeEnd = WebUI.createDateTimeText("timeEnddiv","timeEnd","shortWh Text_Input","",null,{startDate:'%y-%M-%d 23:59:59',maxDate:"",minDate:'#F{$dp.$D(\''+"timeBegin"+'\')}'});
        timeBegin = WebUI.createDateText("timeBegindiv","timeBegin","shortWh Text_Input","",null,{});
        timeEnd = WebUI.createDateText("timeEnddiv","timeEnd","shortWh Text_Input","",null,{startDate:'%y-%M-%d 23:59:59',maxDate:"",minDate:'#F{$dp.$D(\''+"timeBegin"+'\')}'});
        area =WebUI.createMultipleCombo("areadiv", "area", null, null, false, true, null, "LP_CASE_VIEW|CE_OCCUR_PLACE_CODE", null, chosenOption);
        caseCommitType =WebUI.createMultipleCombo("caseCommitTypediv", "caseCommitType", null, null, false, true, null, "LP_CASE_VIEW|CASE_COMMIT_TYPE", null);
        caseClassCode=WebUI.createMultipleCombo("caseClassCodediv", "caseClassCode", null, null, false, true, null, "LP_CASE_VIEW|CASE_CLASS_CODE", null);
        searchButton=  WebUI.createLinkButton("searchBtn",LinkButtonCfg.Qry,submit);
        var columnnames = ["LP_CASE_VIEW|CE_OCCUR_PLACE_CODE","LP_CASE_VIEW|CASE_COMMIT_TYPE","LP_CASE_VIEW|CASE_CLASS_CODE"];
        WebComboUtil.getCodeTable(columnnames, getComboData);
        function getComboData(data)
        {
            data = WebUtil.string2Json(data);
            var areaData = data['lp_case_view|ce_occur_place_code'];
            areaData.splice(0,0,{code:"*",pinyin:"qg",text:"全国"});
            area.setComboData(areaData);
            caseCommitType.setComboData(data['lp_case_view|case_commit_type']);
            caseClassCode.setComboData(data['lp_case_view|case_class_code']);
        }
        function submit(){
            _this.loadData();
            _this.loadCaseData();
        }
    }

    /**
     * 获取查询条件  返回
     * [{colName: "UNI_PERSON_ID", dataType: ABISCode.StorageDataType.NUMBER, value1:uniPersonId}];
     */
    function getSearch() {
        var where = [];
        return where;
        if(!WebUtil.isEmpty(area.getValue())){
            var areaCode =  area.getValue();
            var subStr=new RegExp('0*$');//创建正则表达式对象
            areaCode=areaCode.replace(subStr,"*");//把'0'替换为*
            where.push({colName: "CE_OCCUR_PLACE_CODE", dataType: ABISCode.StorageDataType.STRING, value1:areaCode})
        }
        if(!WebUtil.isEmpty(caseCommitType.getValue())){
            //where.push({colName: "CASE_COMMIT_TYPE", dataType: ABISCode.StorageDataType.STRING, values:caseCommitType.getValue()})
        }
        if(!WebUtil.isEmpty(caseClassCode.getValue())){
            where.push({colName: "CE_CLASS_CODE_1", dataType: ABISCode.StorageDataType.STRING, values:caseClassCode.getValue()})
        }
        //timeBegin,timeEnd
        var time1 = timeBegin.getValue();
        var time2 = timeEnd.getValue();
        if(!WebUtil.isEmpty(time1)||!WebUtil.isEmpty(time2)){
            where.push({colName: "EXTRACT_DATE", dataType: ABISCode.StorageDataType.DATE, value1:time1, value2:time2})
        }
        //经纬度范围
        var bounds=gismap.getLimitBounds();
        var minLon = bounds[0].lng;
        var maxLon = bounds[1].lng;
        var minLat = bounds[0].lat;
        var maxLat = bounds[1].lat;
        return where;
    }
    function loadData(zoom) {
        gismap.getOverlayLayer().clear();
        switch (zoom) {
            case 5:
                addUnit({level:0});
                break;
            case 6:
                addUnit({level:0});
                break;
            case 7:
                addUnit({level:0});
                break;
            case 8:
                addUnit({level:1});
                break;
            case 9:
                addUnit({level:1});
                break;
            case 10:
                addUnit({level:2});
                break;
            case 11:
                addUnit({level:2});
                break;
            case 12:
                addUnit({level:2});
                break;
            case 13:
                addUnit({level:3});
                break;
            case 14:
                addUnit({level:3});
                break;
            case 15:
            default:
                addCase();
                break;
        }
    }

    /**
     *
     * @param param
     * {
        level: 2
        minLon: 121.2698773
        maxLon: 121.7114117
        minLat: 31.101482999999998
        maxLat: 31.279419
        where:[]
     * }
     *
     */
    function getData(param) {
        var def = $.Deferred();
        var url = WebVar.VarPath + "/gis/lpcase/data";
        param.where = getSearch();
        jQuery.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json',
            url: url,
            data: $.toJSON(param),
            dataType: 'json',
            success: function (resInfo) {
                var data = resInfo.data;
                if (resInfo.status === WebCode.WebResultStatus.ok) {

                } else {
                    layer.alert(resInfo.msg, {icon: AbisLayer.alertLevel.error});
                }
                if(param.level==1){//市级查询
                    var data = WebUtil.string2Json(data);
                    var citys = ["110000","120000","310000","500000"];// 直辖市规范化
                    //{"unitName":"110100000000","city":"北京","unitCode":"110100000000","count":"138"}
                    $.each(citys,function(index,code){
                        var realModel;
                        var realCount=0;
                        $.each(data.result,function(index,model){
                            if(model.unitCode.substr(0,2)===code.substr(0,2)){
                                realCount = realCount+parseInt(model.count);
                                if(model.unitCode.substr(0,4)===code.substr(0,4)){
                                    realModel = model;
                                }
                            }
                        });
                        if(realModel){
                            realModel.count = realCount;
                        }
                    })
                }
                def.resolve(WebUtil.string2Json(data));
            }
        });
        return def.promise();


    }
    //地理编码
    function getGeocoder(address,callback,model){
        var setting = {};
        setting.model = model;
        var city = "";
        if(model.level==2){
            city = model.city;//gis api 要求 查询区县的经纬度 需要先指定城市
        }
        gismap.plugin(['IMAP.Geocoder'], function(){
            geocoder=new IMAP.Geocoder({city:city, pois:false});
            geocoder.getLocation(address,function(status,results){
                if(status==0){
                    var datas=results.results, plnglat,lnglat;
                    var data = datas[datas.length-1];
                    var plnglat = data.location;
                    setting.position = new IMAP.LngLat(plnglat.lng,plnglat.lat);
                    callback(setting)
                }
            });
        });
    }
    //{"level":2};
    function addUnit(param) {
        if (gismap) {
            getData(param).then(function (data) {
                var level = data.level;
                var data  = data.result;
                for (var i = 0; i < data.length; i++) {
                    var area = data[i];
                    area.level = level;
                    var address = area.unitName;
                    getGeocoder(address,function(setting){
                        drawUnit(setting);
                    },area);
                }
            })
        }
    }
    /**
     *
     * @param setting
     * {position:IMAP.LngLat}
     */
    function drawUnit(setting){
        var vectors = [];
        if(WebUtil.isEmpty(setting)||WebUtil.isEmpty(setting.position)){
            return;
        }
        var position = setting.position;
        var area = setting.model;
        var html = '<div class="vector" level="'+area.level+'"><p class="name">';
        html += area.unitName;
        html += '</p>';
        html += '<p class="num">';
        html += area.count;
        html += '</p></div>';
        var label = new IMAP.Label(html
            , {
                zIndex: 10,
                type: IMAP.Constants.OVERLAY_LABEL_HTML,
                position: position,//基点位置
                offset: new IMAP.Pixel(0, 15),//相对于基点的位置
                anchor: IMAP.Constants.BOTTOM_CENTER,
                title: "label",
                fontName: "宋体",
                fontColor: "#ff1f24",
                fontSize: 12,
                fontBold: false,//在html5 marker的情况下，是否允许marker有背景
                editabled: true
            });
        label.addEventListener(IMAP.Constants.MOUSE_OVER, function (type, target, zoom) {
            var content = this.getContent();
            this.setZIndex(300);
            // var name = $(content).find(".name").html();
            // var reg = new RegExp(/\u5206\u5c40/);
            // name = name.replace(reg, "");
            // showArea(name);
        });
        label.addEventListener(IMAP.Constants.MOUSE_OUT, function (type, target, zoom) {
            this.setZIndex(210);
            // gismap.getOverlayLayer().clear(overlays);
            // overlays = [];
        });
        label.addEventListener(IMAP.Constants.CLICK, function (type, target, zoom) {
            var position = this.getPosition();
            var level = $(this.getContent()).attr("level");
            var zoom = gismap.getZoom();
            switch (level){
                case "0":
                    zoom = 8;
                    break;
                case "1":
                    zoom = 10;
                    break;
                case "2":
                    zoom = 13;
                    break;
                case "3":
                    zoom = 15;
                    break;
            }
            gismap.setCenter(new IMAP.LngLat(position.lng, position.lat), zoom);
        });
        vectors.push(label);
        gismap.getOverlayLayer().addOverlays(vectors, false);
    }


    //case
    function addCase(param) {
        if (gismap) {
            getCaseData(param).then(function (data) {
                var result  = data.tblData.result;
                $(".gis-list").empty();
                var num=0;
                for (var i = 0; i < result.length; i++) {
                    var model = result[i].data;
                    var address=model.CE_OCCUR_PLACE;
                    getGeocoder(address,function(setting){
                        drawCase(setting);
                        if(num<10){
                            num++;
                            addCaseList(setting);
                        }
                    },model);
                }
            })
        }
    }
    function addCaseList(setting) {
        var model = setting.model;
        var positon = setting.position;
        var $gisList  = $(".gis-list");
        var $title = $('<p class="title">'+model.ABIS_CE_NUM+'</p>');
        var $title2 = $('<p class="title2"><b>'+model.EXTRACT_DATE+'</b></p>');
        var $position =$( '<div class="position"></div>');
        $position.on('click', function(event){
            if(gismap.getZoom()<15){
                gismap.setCenter(positon, 15);
            }else{
                gismap.panTo(positon);
            }
            event.stopPropagation();
            return false;
        });//点击更多显示slide
        var $h2 = $( '<h2 class="clearfix"></h2>');
        var url = WebVar.VarPath+"/lp/case/"+model.ID;
        var $a = $( '<a class="" href="'+url+'" target="_blank"></a>');
        var $gisItem = $( '<div class="gis-item"> </div>');
        $h2.append($position);
        $h2.append($title2);
        $h2.append($title);
        $a.append($h2);
        $gisItem.append($a);
        $gisList.append($gisItem);

    }
    function getCaseData() {
        var cols = ["ID", "ABIS_CE_NUM", "CE_NUM", "CE_NAME", "CE_CLASS_CODE_1", "CE_CLASS_CODE_2", "CE_CLASS_CODE_3", "EXTRACT_DATE", "EXTRACT_UNIT_CODE", "EXTRACT_UNIT_NAME", "CE_OCCUR_PLACE", "CE_OCCUR_PLACE_CODE"];
        var advWhere= "EXTRACT_UNIT_CODE IS NOT NULL AND CE_OCCUR_PLACE IS NOT NULL AND EXTRACT_UNIT_CODE IN (SELECT UNIT_CODE FROM ORGANIZATION_CODE)";
        var where = getSearch();
        var qryParam =
            {
                tblName		: "LP_CASE_VIEW",
                colList		: cols,
                curPage		: 1,
                where		: where,
                pageSize	: 1000,
                order		: null,
                orderCol	: null,
                qryCnt		: false,
                advWhere :advWhere
            };
        var def = $.Deferred();
        var url = WebVar.VarPath + "/locbase/table/";
        jQuery.ajax({
            async: false,
            type: 'POST',
            contentType: 'application/json',
            url: url,
            data: $.toJSON(qryParam),
            dataType: 'json',
            success: function (data) {
                def.resolve(WebUtil.string2Json(data));
            }
        });
        return def.promise();
    }
    /**
     *
     * @param setting
     * {position:IMAP.LngLat}
     */
    function drawCase(setting) {
        var model = setting.model;
        var position = setting.position;
        if (gismap) {
            var opts = new IMAP.MarkerOptions();
            opts.anchor = IMAP.Constants.BOTTOM_CENTER;
            opts.icon = new IMAP.Icon(IMAP.MapConfig.API_REALM_NAME + "images/point_1.png", {
                "size": new IMAP.Size(35, 30),
                "offset": new IMAP.Pixel(1, 0)
            });
            if (position) {
                var marker = new IMAP.Marker(position, opts);
                gismap.getOverlayLayer().addOverlay(marker, false);
                marker.setLabel(model.name, {"anchor": IMAP.Constants.TOP_CENTER});
                marker.addEventListener(IMAP.Constants.CLICK,function(model1){
                    marker.openInfoWindow('<div style="padding:0px 0px 0px 4px;">'+model.ABIS_CE_NUM+'<br>'+model.CE_NAME+'</div>', {
                        "size": new IMAP.Size(300, 200),
                        "offset": new IMAP.Pixel(-5, -35),
                        "title": "案件详情",
                        visible: true
                    });
                })
            }
        }
    }

}();


var gisMap = new  GisHelper({id:"map"});
gisMap.getMap().setCenter(new IMAP.LngLat(116.33766, 40.10329), 10);
gisMap.loadData();