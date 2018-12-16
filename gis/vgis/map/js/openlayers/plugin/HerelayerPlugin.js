/**
*这是一个多层插件
*/



function HerePlugin(id){
	this.id=id;
	//保存图层
	this.vectorLayer =  new ol.layer.Vector({source: new ol.source.Vector({})});;
	appMap.map.addLayer(this.vectorLayer);
	this.style = [new ol.style.Style({image: new ol.style.Icon(({
        anchor: [0.5, 32],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.95,
        src: globalconstant.imgUrl+'map0_on.png'
      }))})];
}

HerePlugin.prototype = new MapPlugin();


HerePlugin.prototype.here = function(point){
	var feature = new ol.Feature({geometry:new ol.geom.Point(ol.proj.transform([point.lon, point.lat], 'EPSG:4326', appMap.map.getView().getProjection()))});
	feature.set("_type", this.id);
	for (var prop in point) {
		feature.set(prop, point[prop]);
	}
	feature.setStyle(this.style);
	this.vectorLayer.getSource().addFeature(feature);
	appMap.map.getView().setCenter(ol.proj.transform([point.lon, point.lat], 'EPSG:4326', appMap.map.getView().getProjection()));
	return feature;
}


//=========================================
HerePlugin.prototype.pointermove = function(feature, event){
	
}
/**
 * 清空所有的
 */
HerePlugin.prototype.clearAll = function(){
	this.vectorLayer.getSource().clear();
}

var herePlugin = new HerePlugin('HerePlugin');
globalconstant.plugin.push(herePlugin);
