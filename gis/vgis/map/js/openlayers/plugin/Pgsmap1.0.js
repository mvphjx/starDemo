/**
 * 支持pgs1.0类型的地图
 * 高德 EPSG:4326 投影
 * 
 */
window.appMap = {};
var appMap = window.appMap;
appMap.id='appMap';
appMap.projection = ol.proj.get('EPSG:4326');
appMap.wgs84Sphere = new ol.Sphere(6378137);
appMap.layers = [
 	          	new ol.layer.Tile({
 	          	 	projection: appMap.projection,
 	          	  	source: new ol.source.XYZ({
 	          	  		tileGrid:ol.tilegrid.createXYZ({
	 	          	        extent: [-256, -256, 256, 256],
	 	          	        maxZoom: 6,
	 	          	        tileSize: [256,256]
	 	          	      }), 
 	          	  		projection: appMap.projection,
 	          			url: 'http://192.168.0.41/pic/world/{z}/{x}/{y}.png',
 	          			wrapX:false
 	          	  	})
 	          	})
             ];
appMap.map = new ol.Map({
	//renderer: 'canvas', //dom canvas 
  	target: globalconstant.target,
  	logo:null,  //版权log
  	loadTilesWhileAnimating:true,
  	loadTilesWhileInteracting:true,
  	layers:appMap.layers,
  	view: new ol.View({
		projection: appMap.projection,
		center: [globalconstant.defaultLon, globalconstant.defaultLat],
		minZoom: globalconstant.minlevel,
		maxZoom: globalconstant.maxlevel,
		//extent: [-256, -256, 256, 256],
		zoom: 3//global.defaultlevel   //默认缩放级别
  	})
});

appMap.popup = new ol.Overlay.Popup();
appMap.map.addOverlay(appMap.popup);

/**
 * 单击点击
 */
appMap.map.on('singleclick', function(event) {
	appMap.popup.hide();
	var feature = appMap.map.forEachFeatureAtPixel(event.pixel,
			function(feature) {
				return feature;
			});
	globalconstant.singleclick(feature, event);
	//console.log(coordinate, feature, event);
});

/*
appMap.map.on('dblclick', function(event){
	var feature = null;
	if (appMap.map.hasFeatureAtPixel(event.pixel)){
		feature = appMap.map.forEachFeatureAtPixel(event.pixel,
				function(feature) {
	              return feature;
	    	});
	}
	globalconstant.dblclick(feature, event);
});
*/
/**
 * 鼠标移动
 */
appMap.map.on('pointermove', function(event){
	appMap.map.getTargetElement().style.cursor = '';
	appMap.popup.hide();
	//appMap.map.getTargetElement().style.cursor = '';
	//appMap.map.getTargetElement().style.cursor = appMap.map.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';
	var feature = null;
	if (appMap.map.hasFeatureAtPixel(event.pixel)){
		feature = appMap.map.forEachFeatureAtPixel(event.pixel,
				function(feature) {
	              return feature;
	    	});
	}
	globalconstant.pointermove(feature, event);
});

/**
 * 图层变更事件
 */
appMap.map.on('moveend', function(event){
	var center = ol.proj.transform(appMap.map.getView().getCenter(), appMap.map.getView().getProjection(), 'EPSG:4326');
   	var zoom = appMap.map.getView().getZoom();
   	globalconstant.moveend(center, zoom, event);
});

