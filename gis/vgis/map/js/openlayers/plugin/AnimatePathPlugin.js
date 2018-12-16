//http://gis.stackexchange.com/search?q=openlayers+animation

/*
 * 
 * animatePathPlugin.animate(msg);
 * animatePathPlugin.animate(msg,1);
 * 
 */


function AnimatePathPlugin(id){
	//距离
	this.distance = 0.1;
	this.source = null;
	this.vector = null;
	this.routeStyles = new ol.style.Style({
		stroke: new ol.style.Stroke({
			 width: 3, color: [237, 212, 0, 0.8]
		})
	});
	this.pathStyles = new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [0.5, 0.5],
		   	src: globalconstant.imgUrl+'trackpath.png'
		})
	});
	this.moveFeatures = new Array();
}

AnimatePathPlugin.prototype = new MapPlugin();

/**
 * 动画效果
 * @param datas [{"lon":110.25,"lat":30.57},{"lon":117.11,"lat":39.04}]
 * @param distance
 * @returns {Function}
 */
AnimatePathPlugin.prototype.animate = function(datas, distance){
	if (distance!=null)
		this.distance = distance;
	var plugin = this;
	if (this.source==null && this.vector==null){
		this.source = new ol.source.Vector({});
		this.vector = new ol.layer.Vector({source: this.source,  style: function(feature, resolution) {
				if (feature.get('_type') === 'animatePathPluginicon') {
		 			return [];
		 		}
				return [plugin.routeStyles];
			}
		});
		appMap.map.addLayer(this.vector);
	}
	
	var points = this.dividePoints(datas);
	var lineStringPoints = new Array();
	for (var i in points){
		lineStringPoints[i]=ol.proj.transform([points[i].lon, points[i].lat], 'EPSG:4326', appMap.map.getView().getProjection());
	}
	var feature = new ol.Feature({geometry:new ol.geom.LineString(lineStringPoints)});
	feature.set("_type","animatePathPluginroute");
	
	var startMarker = new ol.Feature({
		_type: 'animatePathPluginicon',
		geometry: new ol.geom.Point(ol.proj.transform([points[0].lon, points[0].lat], 'EPSG:4326', appMap.map.getView().getProjection()))
	});
	var style = [this.pathStyles];
	startMarker.setStyle(style); 
	
	this.source.addFeature(feature);
	
	this.source.addFeature(startMarker);
	
	var routeLength = points.length;
	var speed = 50;
	var animating = true;
	var now = new Date().getTime();
	var moveFeature = function(event) {
		var vectorContext = event.vectorContext;
		var frameState = event.frameState;
		if (animating) {
		 	var elapsedTime = frameState.time - now;
		 	var index = Math.round(speed * elapsedTime / 1000);
		 	if (index >= routeLength-1) {
		 		appMap.map.un('postcompose', this);
		   		return;
			}
		 	startMarker.setStyle(null); 
		 	var currentPoint = new ol.geom.Point(ol.proj.transform([points[index].lon, points[index].lat], 'EPSG:4326', appMap.map.getView().getProjection()));
		 	var feature = new ol.Feature(currentPoint);
		 	var dx = points[index+1].lon - points[index].lon;
			var dy = points[index+1].lat - points[index].lat;
			var rotation = Math.atan2(dy, dx);
		 	plugin.pathStyles.getImage().setRotation(-rotation);
		 	vectorContext.drawFeature(feature, plugin.pathStyles);
		}
		appMap.map.render();
	};
	appMap.map.on('postcompose', moveFeature);
 	appMap.map.render();
 	this.moveFeatures.push(moveFeature);
 	return moveFeature;
}

/**
 * 停止动画
 * @param moveFeature
 */
AnimatePathPlugin.prototype.stop = function(moveFeature){
	appMap.map.un('postcompose', moveFeature);
}
/**
 * 根据距离平分一些点
 */
AnimatePathPlugin.prototype.dividePoints = function(source){
	var points = new Array();
	var y=0;
	for (var i=0;i<source.length;i++){
		points.push(source[i]);
		if (i==source.length-1){//最后一个
			break;
		} 
		//console.log(source[i], source[i+1]);
		var le = Math.sqrt(Math.pow(source[i].lon-source[i+1].lon,2) + Math.pow(source[i].lat-source[i+1].lat,2));
		if (le>this.distance){
			var lon = (source[i].lon+source[i+1].lon)/2;
			var lat = (source[i].lat+source[i+1].lat)/2;
			var point = new Object();
			point.lon=lon;
			point.lat=lat;
			points.push(point);
		} else {
			y++;
		}
	}
	if (y==source.length-1)
		return points;
	else
		return this.dividePoints(points);
}

/**
 * 清空所有的
 */
AnimatePathPlugin.prototype.clearAll = function(){
	
	for (var i in this.moveFeatures)
		appMap.map.un('postcompose', this.moveFeatures[i]);
	this.moveFeatures = new Array();
	if (this.vector!=null)
		appMap.map.removeLayer(this.vector);
	this.source = null;
	this.vector = null;
}

var animatePathPlugin = new AnimatePathPlugin("animatePathPlugin");
globalconstant.plugin.push(animatePathPlugin);

