/**
 * 支持gc02类型的地图
 * google 高德 EPSG:3857 投影
 *
 */
var globalconstant={};
//地图默认标识
globalconstant.target = "map";
window.appMap = {};
var appMap = window.appMap;
appMap.id='appMap';
appMap.wgs84Sphere = new ol.Sphere(6378137);

appMap.layers = [ new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: globalconstant.mapUrl+'/roadmap/{z}/{x}/{y}.png'
    })
})
];
appMap.doubleClickInteractions=new ol.interaction.DoubleClickZoom();
appMap.select = new ol.interaction.Select();//选中
appMap.select.setActive(false);//默认false
appMap.modify = new ol.interaction.Modify({features: appMap.select.getFeatures()});//编辑
appMap.map = new ol.Map({
    renderer: 'canvas', //dom canvas
    target: globalconstant.target,
    logo:null,  //版权log
    loadTilesWhileAnimating:true,
    loadTilesWhileInteracting:true,
    //layers:appMap.layers,
    interactions:[
        appMap.doubleClickInteractions,
        new ol.interaction.MouseWheelZoom(),
        new ol.interaction.DragPan(),
        appMap.select,
        appMap.modify
    ]
});

/**
 * 这是个自定义地图工具类
 */
var mapTool={
    /**
     * 地图初始化
     */
    init:function(_options){
         globalconstant.tileUrl=_options.tileUrl;
         //地图默认点心点位置，级别
         globalconstant.defaultLon =_options.defaultLon;
         globalconstant.defaultLat = _options.defaultLat;
         globalconstant.defaultlevel =_options.defaultlevel;
         globalconstant.minlevel =_options.minlevel;
         globalconstant.maxlevel = _options.maxlevel;
         globalconstant.geoserverWfs=_options.geoserverWfs;

        if(_options.imgUrl!=null && _options.imgUrl!=undefined && _options.imgUrl!=''){//覆盖默认目标dom
            globalconstant.imgUrl=_options.imgUrl;
        }
        if(_options.target!=null && _options.target!=undefined && _options.target!=''){//覆盖默认目标dom
            globalconstant.target=_options.target;
            appMap.map.setTarget(globalconstant.target);//设置dom
        }
        appMap.map.addLayer(new ol.layer.Tile({//设置瓦片
            source: new ol.source.XYZ({
                url: _options.tileUrl+'/roadmap/{z}/{x}/{y}.png'
            }),
            zIndex:-1
        }));
        appMap.map.setView(new ol.View({//设置视图
           projection: "EPSG:3857",
           center: ol.proj.fromLonLat([_options.defaultLon, _options.defaultLat]),
           minZoom: _options.minlevel,
           maxZoom: _options.maxlevel,
           zoom: _options.defaultlevel  //默认缩放级别
       }));
        if(_options.colorFilter==true){//设置滤镜
            var filter = new ol.filter.Colorize();
            filter.setFilter({ operation: "difference", red: 242, green: 220, blue: 195, value: 0.9 });//color
            appMap.map.addFilter(filter);
        }
        appMap.map.render();
        //alert("地图初始化完成！！！");
    }
}

