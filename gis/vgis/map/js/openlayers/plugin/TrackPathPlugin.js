/**
 * 路径轨迹
 * @param id
 * @returns
 */
function TrackPathPlugin(id){
	this.plugin = this;
	this.id = id;
	this.distance = 0.1;
	//保存动画层
	this.gpsvector = null;
	this.gpssource = null;
	this.time = null;
	this.pathFeature = null;
	
	
}
TrackPathPlugin.prototype = new MapPlugin();

/**
 * 生成图
 * @param source
 */
TrackPathPlugin.prototype.animate = function(source, distance){
	globalconstant.stopEvent();
	if (distance!=null)
		this.distance = distance;
	var points = this.dividePoints(source);
	
	var lineStringPoints = new Array();
	for (var i in points){
		lineStringPoints[i]=ol.proj.transform([points[i].lon, points[i].lat], 'EPSG:4326', appMap.map.getView().getProjection());
	}
	var feature = new ol.Feature({geometry:new ol.geom.LineString(lineStringPoints)});
	this.gpssource = new ol.source.Vector();
	this.gpssource.addFeature(feature);
	this.gpsvector = new ol.layer.Vector({source: this.gpssource});
	appMap.map.addLayer(this.gpsvector);
	
	if (this.time!=null){
		window.clearInterval(this.time);
	}
	var i=0;
	
	if (this.pathFeature==null)
		this.pathFeature = new ol.Feature(new ol.geom.Point(lineStringPoints[0]));
	var dx = lineStringPoints[1][0] - lineStringPoints[0][0];
	var dy = lineStringPoints[1][1] - lineStringPoints[0][1];
	var rotation = Math.atan2(dy, dx);
	var style = [new ol.style.Style({image: new ol.style.Icon({
											src: globalconstant.imgUrl+'trackpath.png',
											rotation: -rotation
										})
									})]
	this.pathFeature.setStyle(style);
	var selfPlugin = this;
	this.gpssource.addFeature(this.pathFeature);
	this.time = window.setInterval(function(){
		if (i==lineStringPoints.length){
			selfPlugin.stop();
			//clearInterval(this);
			return;
		}
		if (i+1<lineStringPoints.length){
			var dx = lineStringPoints[i+1][0] - lineStringPoints[i][0];
			var dy = lineStringPoints[i+1][1] - lineStringPoints[i][1];
			var rotation = Math.atan2(dy, dx);
			selfPlugin.pathFeature.getStyle()[0].getImage().setRotation(-rotation);
		}
		selfPlugin.pathFeature.setGeometry(new ol.geom.Point(lineStringPoints[i]));
		++i;
	},50);
	
}

/**
 * 把点平分成若干份
 */
TrackPathPlugin.prototype.dividePoints = function(source){
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
 * 停止事件
 */
TrackPathPlugin.prototype.stop = function(){
	if (this.time!=null)
		window.clearInterval(this.time);
}

TrackPathPlugin.prototype.clearAll = function(){
	if (this.time!=null)
		window.clearInterval(this.time);
	if (this.gpsvector!=null)
		appMap.map.removeLayer(this.gpsvector);
	this.gpsvector = null;
	this.gpssource = null;
}

var trackPathPlugin = new TrackPathPlugin("trackPathPlugin");
globalconstant.plugin.push(trackPathPlugin);