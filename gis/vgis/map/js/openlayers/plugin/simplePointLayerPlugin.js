
/**
 * 简单图层，鼠标放到点上可以显示名称属性
 * 支持最简单的点数据
 * type:point MultiPoint
 * properties 
 * 	name 泡泡名称
 * 	icon 定义样式图片
 * 导入数据 
 * {'type': 'FeatureCollection','features': [{'type': 'Feature','properties': {'id':'123','name':'test', 'icon':'default0.png'},'geometry': {'type': 'Point','coordinates': [114.2578125,32.84267363195431]}}, {'type': 'Feature','properties': {'id':'123', 'name':'test', 'icon':'default.png'},'geometry': {'type': 'Point','coordinates': [94.921875,36.879]}} ]};
 * 
 * @param id
 * @returns
 */

function SimplePointLayerPlugin(id){
	this.id=id;
	//样式定义器
	var _customStyle_ = new Array();
	_customStyle_["default"]=[new ol.style.Style({anchor: [0.5, 32],image: new ol.style.Icon({src: globalconstant.imgUrl+'default.png'})})];
	this.layer = new ol.layer.Vector({
			source: new ol.source.Vector({}),
			style: function(feature) {
					feature.set("_type_", id);
					var icon = feature.get("icon");
					if (icon==null){
						return _customStyle_["default"];
					} else {
						var _style_ = _customStyle_[icon];
						if (_style_==null){
							_style_ = [new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl+icon})})];
							_customStyle_[icon] = _style_;
						}
						return _style_;
					}
				}
			});
	appMap.map.addLayer(this.layer);
	//泡泡
	this.popup = new ol.Overlay.Popup();
	appMap.map.addOverlay(this.popup);
	
}

SimplePointLayerPlugin.prototype = new MapPlugin();

/**
 * 支持geojson 格式数据 只支持 type=Point
 * properties name 显示名称 icon 支持图片
 * 
 */
SimplePointLayerPlugin.prototype.geojson = function(result,clear){
	if (clear!=null&&clear==true)
		this.clearAll();
	this.layer.getSource().addFeatures((new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()})).readFeatures(result));//
}


/**
 * 返回所有的geojson //数据
 */
SimplePointLayerPlugin.prototype.getGeojson = function(){
	return new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()}).writeFeatures(this.layer.getSource().getFeatures());
}

//转化成Geojson工具
SimplePointLayerPlugin.prototype.utilGeojson = function(datas){
	var geojson = { type: "FeatureCollection", features: [] };
	//var datas = [{id:"123",name:"test", lon:118.9,lat:30.34},{id:"456",name:"test", lon:118.9,lat:34.34}];
	for (var i=0;i<datas.length;i++){
		var data = datas[i];
		var feature = { "type": "Feature",  "properties": {}, "geometry": { "type": "Point", "coordinates": [ ] }};
		feature.geometry.coordinates=[data.lon,data.lat];
		
		for (var prop in data) {
			feature.properties[prop]=data[prop];
		}
		geojson.features.push(feature);
	}
	return geojson;
}
/**
 * 鼠标移动到图片
 */
SimplePointLayerPlugin.prototype.pointermove = function(feature, event){
	this.popup.hide();
	if (feature!=null&&feature.get("_type_")==this.id){
		if (feature.get("name")!=null&&feature.get("name")!='')
			this.popup.show(feature.getGeometry().getFirstCoordinate(), feature.get("name")); //event.coordinate
	}
}

/**
 * 清空数据
 */
SimplePointLayerPlugin.prototype.clearAll = function(){
	this.layer.getSource().clear();
}

var simplePointLayerPlugin = new SimplePointLayerPlugin('simplePointLayerPlugin');
globalconstant.plugin.push(simplePointLayerPlugin);