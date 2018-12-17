/**
*这是一个多层插件
*manylayerPluginr.json(result, layerid) //数据
*manylayerPluginr.clear(layerid)
*manylayerPluginr.toggle(layerid); 切换
*manylayerPluginr.toggleheatmap(); 热图
*manylayerPluginr.clearAll()
*/



function ManylayerPlugin(id){
	this.id=id;
	//保存图层
	this.vectorLayer = {};
	//默认图层
	this.defaultLayer= "default";
	//热图
	this.heatmap = false;
}

ManylayerPlugin.prototype = new MapPlugin();

/**
 * @param result json 数组
 * @param layerid 层id 默认 default
 */
ManylayerPlugin.prototype.json = function(result, layerid){
	var vector = this.getLayout(layerid);
	vector.set("_result", result);
	vector.getSource().addFeatures(this.getFeatures(result));
}

ManylayerPlugin.prototype.toggleHeatmap = function(){
	this.heatmap = !this.heatmap;
	//manylayer.clearAll();
	for(var prop in this.vectorLayer){
	    if(this.vectorLayer.hasOwnProperty(prop)){
	    	var result = this.vectorLayer[prop].get("_result");
	    	if (result!=null){
		    	appMap.map.removeLayer(this.vectorLayer[prop]);
		    	this.vectorLayer[prop] = null;
		    	this.json(result, prop);
	    	}
	    }
	}
	//manylayer.vectorLayer = {};
	return this.heatmap;
}

/**
 * @param layerid 层id 默认 default
 */
ManylayerPlugin.prototype.clear = function(layerid){
	this.getLayout(layerid).getSource().clear();
}

/**
 * 获取图层
 * @param 层id 默认 default
 */
ManylayerPlugin.prototype.getLayout = function(layerid){
	if (layerid==null){
		layerid = this.defaultLayer;
	} 
	var _layer = this.vectorLayer[layerid];
	if (_layer==null){
		if (this.heatmap){
			_layer = new ol.layer.Heatmap({source:new ol.source.Vector({}),blur: 50, radius: 20});//new ol.layer.Vector({source: new ol.source.Vector({})});
		} else {
			_layer = new ol.layer.Vector({source: new ol.source.Vector({})});
		}
		this.vectorLayer[layerid] = _layer;
		appMap.map.addLayer(_layer);
	}
	return _layer;
}
/**
 * 切换元素的可见状态
 * @param 层id 默认 default
 */
ManylayerPlugin.prototype.toggle = function(layerid){
	this.getLayout(layerid).setVisible(!this.getLayout(layerid).getVisible());
}

ManylayerPlugin.prototype.getFeature = function(point){
	var feature = new ol.Feature({geometry:new ol.geom.Point(ol.proj.transform([point.lon, point.lat], 'EPSG:4326', appMap.map.getView().getProjection()))});
	feature.set("_type", this.id);
	for (var prop in point) {
		feature.set(prop, point[prop]);
	}
	if (this.heatmap==false)
		feature.setStyle(globalconstant.customStyle(point.style, point.text));
	return feature;
}

ManylayerPlugin.prototype.getFeatures = function (result){
	var features = new Array(result.length);
	for (var i=0;i<result.length;i++){
		features[i] = this.getFeature(result[i]);
	}
	return features;
}

/**
 * 根据id 类型查询到对应的Feature
 * @param id
 * @param type
 */
ManylayerPlugin.prototype.getIdFeature = function(id, type){
	for(var prop in this.vectorLayer){
	    if(this.vectorLayer.hasOwnProperty(prop)){
	    	var features = this.vectorLayer[prop].getSource().getFeatures();
	    	for (var i=0;i<features.length;i++){
	    		if (features[i].get("id")==id&&features[i].get("type")==type){
	    			return features[i];
	    		}
	    	}
	    }
	}
}

//=========================================
ManylayerPlugin.prototype.pointermove = function(feature, event){
	/*
	if (this.heatmap==false && feature!=null&&this.id==feature.get("_type")){
		appMap.map.getTargetElement().style.cursor = 'pointer';
		//console.log(feature.getGeometry().getLastCoordinate());
		appMap.popup.show(feature.getGeometry().getLastCoordinate(), '<div>' + feature.get("name") + '</div>');
		//appMap.popup.show(event.coordinate, '<div>' + feature.get("name") + '</div>');
	}
	*/
}
/**
 * 清空所有的
 */
ManylayerPlugin.prototype.clearAll = function(){
	for(var prop in this.vectorLayer){
	    if(this.vectorLayer.hasOwnProperty(prop)){
	    	//manylayer.vectorLayer[prop].getSource().clear();
	    	appMap.map.removeLayer(this.vectorLayer[prop]);
	    }
	}
	this.vectorLayer = {};
}

var manylayerPlugin = new ManylayerPlugin('resultmanylayer');
globalconstant.plugin.push(manylayerPlugin);
