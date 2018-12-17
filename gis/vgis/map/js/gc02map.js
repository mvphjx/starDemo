/**
 * 支持gc02类型的地图
 * google 高德 EPSG:3857 投影
 * 
 */
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
	  ],
  	/* view: new ol.View({
		projection: "EPSG:3857",
		center: ol.proj.fromLonLat([globalconstant.defaultLon, globalconstant.defaultLat]),
		minZoom: globalconstant.minlevel,
		maxZoom: globalconstant.maxlevel,
		zoom: globalconstant.defaultlevel  //默认缩放级别
  	})*/
});

appMap.popup = new ol.Overlay.Popup();
appMap.map.addOverlay(appMap.popup);

appMap.modify.on("modifyend",function(event){//编辑事件
	var array=appMap.select.getFeatures().getArray();
	if(event.features.array_[0]){
	    callback.modifyEndCallback(event.features.array_[0],event);
	}
})
/**
 * 单击点击
 */
appMap.map.on('singleclick', function(event) {
	var feature = appMap.map.forEachFeatureAtPixel(event.pixel,
			function(feature) {
				return feature;
			});
	callback.singleclickCallback(feature, event);
});

// appMap.map.on('pointerdrag', function(event) {
// 	var feature = appMap.map.forEachFeatureAtPixel(event.pixel,
// 			function(feature) {
// 				return feature;
// 			});
// 	callback.pointerdragCallback(feature, event);
// });


/**
 * 鼠标移动
 */
appMap.map.on('pointermove', function(event){
	appMap.map.getTargetElement().style.cursor = '';
	var feature = null;
	if (appMap.map.hasFeatureAtPixel(event.pixel)){
		feature = appMap.map.forEachFeatureAtPixel(event.pixel,
				function(feature) {
	              return feature;
	    	});
	}
	callback.pointermoveCallback(feature, event);
});


appMap.map.on('dblclick', function(event){
	var feature = null;
	if (appMap.map.hasFeatureAtPixel(event.pixel)){
		feature = appMap.map.forEachFeatureAtPixel(event.pixel,
				function(feature) {
	              return feature;
	    	});
	}
	if(feature!=null){
		appMap.setDoubleClickAble(false);
		callback.dblclickCallback(feature, event);
		appMap.setDoubleClickAble(true);
	}
});

/**
 * 图层变更事件
 */
appMap.map.on('moveend', function(event){
	var center = ol.proj.transform(appMap.map.getView().getCenter(), appMap.map.getView().getProjection(), 'EPSG:4326');
   	var zoom = appMap.map.getView().getZoom();
	  callback.moveendCallback(center, zoom, event);
});

/**
 * 设置地图双击放大是否可用    主要是为了解决工具栏画框双击会放大的问题
 */
appMap.setDoubleClickAble=function(isAble){
	if(!isAble){
		appMap.doubleClickInteractions.setActive(false);//关闭双击变大事件
	}else{
		setTimeout(function(){//激活双击放大事件
			appMap.doubleClickInteractions.setActive(true);
		},1000)
	}
}

var _tem_center
var _tem_zoom;
appMap.isLoad = function(){
	var center = appMap.map.getView().getCenter(); //var center = ol.proj.transform(appMap.map.getView().getCenter(), appMap.map.getView().getProjection(), "EPSG:900913");
	var zoom = appMap.map.getView().getZoom();
	if (_tem_center==null){
		_tem_center = center;
		return true;
	}
	if (zoom==null||zoom!=_tem_zoom){
		_tem_zoom = zoom;
		return true;
	}
	var _tem = Math.pow(2,(20-zoom))*20;  //50距离
	//console.log(_tem);
	//console.log(Math.abs(center[0]-_tem_center[0]));
	//console.log(Math.abs(center[1]-_tem_center[1]));
	if (Math.abs(center[0]-_tem_center[0])<=_tem && Math.abs(center[1]-_tem_center[1])<=_tem){
		return false;
	} else {
		_tem_center = center;
		return true;
	}
}

/**
 * 增加边界
 */
appMap.boundaries = function(url){
	 var vectorSource = new ol.source.Vector({
	        url: url,
	        format: new ol.format.GeoJSON()
	 });
	 var Vector = new ol.layer.Vector({
	 source: vectorSource,
	 style:  new ol.style.Style({
	     fill: new ol.style.Fill({
	       color: "rgba(85, 85, 85, 0)"
	     }),
	     stroke: new ol.style.Stroke({
	       color: "rgba(85, 85, 85)",
	       width: 1
	     })
	   })
	});
	appMap.map.addLayer(Vector);
}