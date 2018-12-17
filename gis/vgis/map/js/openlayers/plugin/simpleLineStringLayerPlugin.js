
/**
 * 简单图层，鼠标放到点上可以显示名称属性
 * 支持最简单的线数据
 * type:LineString MultiLineString
 * properties 
 * name 线名称
 * 	colour 颜色 rgb 或颜色值  eg：rgb(1,1,1,0.1) #ffcc33 red
 * 	width 线条宽度
 * 导入数据 
 * var line = {'type': 'FeatureCollection','features': [{'type': 'Feature','properties': {'id':'123','name':'test', 'colour':'rgb(1,1,1,0.1)', 'width':1},'geometry': {'type': 'LineString','coordinates': [[84.2578125,32.84267363195431],[120.76,45.08]]}}]};
 * 
 * @param id
 * @returns
 */
function SimpleLineStringLayerPlugin(id){
	this.id=id;
	this.layer = new ol.layer.Vector({
			source: new ol.source.Vector({}),
			
			style: function(feature) {
					feature.set("_type_", id);
					var colour = feature.get("color")==null?"#ffcc33":feature.get("color");
					var width = feature.get("width")==null? 2 : feature.get("width");
					return  [ new ol.style.Style({
					            stroke: new ol.style.Stroke({
					              color: colour,
					              width: width
					            })
					          })
					        ];
				}
				
			});
	appMap.map.addLayer(this.layer);
	//泡泡
	this.popup = new ol.Overlay.Popup();
	appMap.map.addOverlay(this.popup);
}

SimpleLineStringLayerPlugin.prototype = new MapPlugin();

/**
 * 支持geojson 格式数据 只支持 type=Point
 * properties name 显示名称 icon 支持图片
 * 
 */
SimpleLineStringLayerPlugin.prototype.geojson = function(result,clear){
	if (clear!=null&&clear==true)
		this.clearAll();
	this.layer.getSource().addFeatures((new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()})).readFeatures(result));//
}


/**
 * 返回所有的geojson //数据
 */
SimpleLineStringLayerPlugin.prototype.getGeojson = function(){
	return new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()}).writeFeatures(this.layer.getSource().getFeatures());
}

/**
 * 鼠标移动到线上
 */
SimpleLineStringLayerPlugin.prototype.pointermove = function(feature, event){
	this.popup.hide();
	if (feature!=null&&feature.get("_type_")==this.id){
		if (feature.get("name")!=null&&feature.get("name")!='')
			this.popup.show(event.coordinate, feature.get("name")); //event.coordinate
	}
}


/**
 * 清空数据
 */
SimpleLineStringLayerPlugin.prototype.clearAll = function(){
	this.layer.getSource().clear();
}

var simpleLineStringLayerPlugin = new SimpleLineStringLayerPlugin('SimpleLineStringLayerPlugin');
globalconstant.plugin.push(simpleLineStringLayerPlugin);