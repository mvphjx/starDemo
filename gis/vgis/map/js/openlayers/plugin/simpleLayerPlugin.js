
/**
 * 简单图层，鼠标放到点上可以显示名称属性
 * 支持最简单的 点、线、多边型
 * type:point, LineString Polygon MultiPolygon
 * properties 
 * 	name 线名称
 * 	icon 图标
 * 	colour 颜色 rgb 或颜色值  eg：rgb(1,1,1,0.1) #ffcc33 red
 * 	width 线条宽度
 *  fillcolor 填充色
 * 导入数据 
 * @param id
 * @returns
 */
function SimpleLayerPlugin(id){
	this.id=id;
	this.layer = new ol.layer.Vector({
			source: new ol.source.Vector({}),
			
			style: function(feature) {
					feature.set("_type_", id);
					var type = feature.getGeometry().getType();
					if (type=='Point'||type=='MultiPoint') {//点
						return [new ol.style.Style({anchor: [0.5, 32],image: new ol.style.Icon({src: globalconstant.imgUrl+'default.png'})})];
					} else {
						var colour = feature.get("colour")==null?"#ffcc33":feature.get("colour");
						var width = feature.get("width")==null? 2 : feature.get("width");
						var fillcolor = feature.get("fillcolor")==null? 'rgba(0,0,0,0.0)' : feature.get("fillcolor");
						return  [new ol.style.Style({
						            stroke: new ol.style.Stroke({
						              color: colour,
						              width: width
						            }),
						            fill: new ol.style.Fill({
						                color: fillcolor
						            }),
						            
						          })
						];
					}
				}
				
			});
	appMap.map.addLayer(this.layer);
	//泡泡
	this.popup = new ol.Overlay.Popup();
	appMap.map.addOverlay(this.popup);
}

SimpleLayerPlugin.prototype = new MapPlugin();

/**
 * 支持geojson 格式数据
 * properties name 显示名称 icon 支持图片
 * 
 */
SimpleLayerPlugin.prototype.geojson = function(result,clear){
	if (clear!=null&&clear==true)
		this.clearAll();
	this.layer.getSource().addFeatures((new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()})).readFeatures(result));//
}


/**
 * 返回所有的geojson //数据
 */
SimpleLayerPlugin.prototype.getGeojson = function(){
	return new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()}).writeFeatures(this.layer.getSource().getFeatures());
}

/**
 * 鼠标移动到线上
 */
SimpleLayerPlugin.prototype.pointermove = function(feature, event){
	this.popup.hide();
	if (feature!=null&&feature.get("_type_")==this.id){
		if (feature.get("name")!=null&&feature.get("name")!='')
			this.popup.show(event.coordinate, feature.get("name")); //event.coordinate
	}
}


/**
 * 清空数据
 */
SimpleLayerPlugin.prototype.clearAll = function(){
	this.layer.getSource().clear();
}

var simpleLayerPlugin = new SimpleLayerPlugin('simpleLayerPlugin');
globalconstant.plugin.push(simpleLayerPlugin);