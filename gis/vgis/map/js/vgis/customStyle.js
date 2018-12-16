/**
 * 这是各个图层及图层上元素自定义文件
 */
var custormStyle = {
    layer: {//这里自定义图层样式
        camera: function () {//这是自定义摄像头样式
            //获取摄像头图层默认样式
            var _old_style = globalconstant.layers['camera'].getStyle();
            //重新覆盖摄像头图层默认样式
            globalconstant.layers['camera'].setStyle(function (feature) {
                if (feature.get('features').length == 1) {
                    var _style = globalconstant.clusterStyleCache['single'];
                    if (!_style) {
                        _style = new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'lwCamera.png'})});
                        globalconstant.clusterStyleCache['single'] = _style;
                    }
                    feature.set('type', 'camera');
                    return _style;
                } else {
                    return _old_style(feature);
                }
            })
        },
        policeMan: function () {//这是自定义警力样式
            globalconstant.layers['policeMan'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'policeMan.png'})}) )
        },
        policeCar: function () {//这是自定义警力样式
            globalconstant.layers['policeCar'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'policeCar.png'})}) )
        },
        wifi: function () {//这是自定义警力样式
            globalconstant.layers['wifi'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'wifi.png'})}) )
        },
        cases: function () {//这是自定义案件图标样式
            globalconstant.layers['cases'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'cases.png'})}) )
        },
        jq: function () {//这是自定义案件图标样式
            globalconstant.layers['jq'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'jq.png'})}) )
        },
        xuexiao: function () {//这是自定义学校图标样式
            globalconstant.layers['xuexiao'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'xuexiao.png'})}) )
        },
        jiudian: function () {//这是自定义案件图标样式
            globalconstant.layers['jiudian'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'jiudian.png'})}) )
        },
        wangba: function () {//这是自定义案件图标样式
            globalconstant.layers['wangba'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'wangba.png'})}) )
        },
        shangchang: function () {//这是自定义案件图标样式
            globalconstant.layers['shangchang'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'shangchang.png'})}) )
        },
        chuzuwu: function () {//这是自定义案件图标样式
            globalconstant.layers['chuzuwu'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'chuzuwu.png'})}) )
        },
        lvyegongyu: function () {//这是自定义案件图标样式
            globalconstant.layers['lvyegongyu'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'lvyegongyu.png'})}) )
        },
        yhqcyry: function () {//这是自定义案件图标样式
            globalconstant.layers['yhqcyry'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'yhqcyry.png'})}) )
        },
        yulechangsuo: function () {//这是自定义案件图标样式
            globalconstant.layers['yulechangsuo'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'yulechangsuo.png'})}) )
        },
        xiyuzhongxin: function () {//这是自定义案件图标样式
            globalconstant.layers['xiyuzhongxin'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'xiyuzhongxin.png'})}) )
        },
        zuliaodian: function () {//这是自定义案件图标样式
            globalconstant.layers['zuliaodian'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'zuliaodian.png'})}) )
        },
        shCamera: function () {//这是自定义案件图标样式
            globalconstant.layers['shCamera'].setStyle(new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'shCamera.png'})}) )
        },
        qywgh: function () {//自定义区域网格化样式
            globalconstant.layers['qywgh'].setStyle(function(feature){
                var zoom=appMap.map.getView().getZoom();
                var level=feature.get("level");
                var coordinates=feature.getGeometry().getCoordinates();
                var fillCorlor=globalconstant.gridFillColor[(feature.ol_uid%7)];
                for(var i=0;i<globalconstant.qyGridConfig.length;i++){//循环配置项，然后匹配当前feature的level
                    var config=globalconstant.qyGridConfig[i];
                    if(level==config.level && zoom>=config.zoomScope[0] && zoom<=config.zoomScope[1]){
                        return new ol.style.Style({
                            fill:new ol.style.Fill({ color: fillCorlor}),
                            stroke:new ol.style.Stroke({color:'rgb(237,210,185,0.5)',width:5})
                        })
                    }
                }
                return null;
            })
        },
        rywgh: function () {//这是自定义案件图标样式
            globalconstant.layers['rywgh'].setStyle(function(feature){
                var fillCorlor=globalconstant.gridFillColor[(feature.ol_uid%7)];
                return new ol.style.Style({
                    fill:new ol.style.Fill({ color: fillCorlor}),
                    stroke:new ol.style.Stroke({color:'rgb(237,210,185,0.5)',width:5})
                })
            })
        }
    },
    feature: {//这里自定义元素样式
    },
    tip: {//这里自定义泡泡内容

    }
}
