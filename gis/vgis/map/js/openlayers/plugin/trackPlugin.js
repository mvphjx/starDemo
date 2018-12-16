/**
 * trackPlugin.path(xml,100);
 * trackPlugin.path(url,100);
 * 动画轨迹
 */
function TrackPlugin(id){
	this.id = id;
	//保存动画层
	this.gpxvector = null;
	this.gpxsource = null;
	//样式
	this.trackstyles = [
	           	   new ol.style.Style({
	           	     image: new ol.style.Icon({
	           	    	 src: globalconstant.imgUrl+'/path.png',
	           	    	 anchor:[0.5,0.5]
	           	     }),
	           	     fill: new ol.style.Fill({
	           	    	   color: 'rgba(255,255,255,0.4)'
	           	     }),
	           	     stroke: new ol.style.Stroke({
	           	    	   color: '#3399CC',
	           	    	   width: 2
	           	    	 })
	           	   })
	           	 ];
}

TrackPlugin.prototype = new MapPlugin();

/**
 * 运动轨迹
 * @par source xml | url
 * @param speed 速度 200
 */
TrackPlugin.prototype.path = function(source, speed, clean){
	if (clean!=null&&clean==true)
		this.clearAll();
	var gpx = new ol.format.GPX();
	if (source.indexOf('xml')<0){
		var gpxsource = new ol.source.Vector({url: source, format: gpx });
		if (this.gpxvector==null){
			this.gpxvector = new ol.layer.Vector({source: gpxsource, style: this.trackstyles});
			appMap.map.addLayer(this.gpxvector);
		} else {
			this.gpxvector.setSource(gpxsource);
		}
		var plugin = this;
		gpxsource.once('change',function(e) {	
			if (gpxsource.getState() === 'ready')  {	
				var features = gpxsource.getFeatures();
				for (var i=0;i<features.length;i++){
					_animategpx(features[i], speed, plugin);
				}
			}
		});
	} else {//xml
		if (this.gpxsource==null){
			this.gpxsource = new ol.source.Vector({
				//features:gpx.readFeatures(xml,{dataProjection:ol.proj.get('EPSG:4326'),featureProjection:appMap.map.getView().getProjection()})
			});
			if (this.gpxvector==null){
				this.gpxvector = new ol.layer.Vector({source: this.gpxsource, style: this.trackstyles});
				appMap.map.addLayer(this.gpxvector);
			} else {
				this.gpxvector.setSource(this.gpxsource);
			}
		}
		var features = gpx.readFeatures(source, {dataProjection:ol.proj.get('EPSG:4326'),featureProjection:appMap.map.getView().getProjection()});
		this.gpxsource.addFeatures(features);
		for (var i=0;i<features.length;i++){
			_animategpx(features[i], speed, this);
		}
	}
}


function _animategpx(feature, speed, trackPlugin){
	var f = new ol.Feature(new ol.geom.Point([0,0]));
	var anim = new ol.featureAnimation.Path({	
		path: feature,
		repeat:100000,//重复次数 默认为0
		easing: ol.easing['linear'], //easeOut easeIn inAndOut linear
		speed: speed
	});
	trackPlugin.gpxvector.animateFeature(f, anim);
}
//========================================

TrackPlugin.prototype.clearAll = function(){
	if (this.gpxvector!=null)
		appMap.map.removeLayer(this.gpxvector);
	this.gpxvector = null;
	this.gpxsource = null;
}

var trackPlugin = new TrackPlugin('trackPlugin');
globalconstant.plugin.push(trackPlugin);