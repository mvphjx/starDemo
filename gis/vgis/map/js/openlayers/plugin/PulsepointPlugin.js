/**
 *  * 点动画跳动
 * pulsepointPlugin.animate(data);
 * pulsepointPlugin.clearAll()
 */


function PulsepointPlugin(id){
	this.id=id;
	this.pointvector = null;
	this.pointsource = null;
	this.time = null;
	this.stop = false;
}

PulsepointPlugin.prototype = new MapPlugin();

/**
 * 点动画
 * 
 */
PulsepointPlugin.prototype.animate = function(data){
	globalconstant.stopEvent();
	this.stop = false;
	var plugin = this;
    if (this.pointsource==null){
    	this.pointsource = new ol.source.Vector({wrapX: false});
    	this.pointsource.on('addfeature', function(e) {
    		plugin.flash(e.feature);
    	});
    }
    this.pointsource.addFeatures(this.getFeatures(data));
    if (this.pointvector==null){
    	this.pointvector = new ol.layer.Vector({source:this.pointsource});
	    appMap.map.addLayer(this.pointvector);
    }
}

PulsepointPlugin.prototype.flash = function(feature) {
	var start = new Date().getTime();
	var listenerKey=null;
	var plugin = this;
	function animate(event) {
		var time = event.frameState.time ;
		if (plugin.stop){//停止
			ol.Observable.unByKey(listenerKey);
			return;
		}
		if ((time-start)>200){//200毫秒
			start = time;
			var style = feature.get('style');
			if (style.indexOf("_on")>0){
				style = style.replace("_on", "");
			} else {
				style = style+"_on";
			}
			feature.set("style", style);
			feature.setStyle(globalconstant.customStyle(style));
		}
		appMap.map.render();
	}
	listenerKey = appMap.map.on('postcompose', animate);
}


PulsepointPlugin.prototype.getFeature = function(point){
	var feature = new ol.Feature({geometry:new ol.geom.Point(ol.proj.transform([point.lon, point.lat], 'EPSG:4326', appMap.map.getView().getProjection()))});
	feature.set("_type", this.id);
	for (var prop in point) {
		feature.set(prop, point[prop]);
	}
	feature.setStyle(globalconstant.customStyle(point.style));
	return feature;
}

PulsepointPlugin.prototype.getFeatures = function (result){
	var features = new Array(result.length);
	for (var i=0;i<result.length;i++){
		features[i] = this.getFeature(result[i]);
	}
	return features;
}




//========================================
/**
 * 清空所有的
 */
PulsepointPlugin.prototype.clearAll = function(){
	//清除定时器
	this.stop = true;
	if (this.pointvector!=null)
		appMap.map.removeLayer(this.pointvector);
	this.pointvector = null;
	this.pointsource = null;
	this.time = null;
}
var pulsepointPlugin = new PulsepointPlugin('pulsepoint');
globalconstant.plugin.push(pulsepointPlugin);