
/**
 * 简单图层，鼠标放到点上可以显示名称属性
 * 支持最简单的多边型
 * type:Polygon MultiPolygon
 * properties 
 * name 线名称
 * 	colour 颜色 rgb 或颜色值  eg：rgba(1,1,1,0.1) #ffcc33 red
 * 	width 线条宽度
 * fillcolor 填充色 eg：rgba(1,1,1,0.1) #ffcc33 red
 * 导入数据 
 * var polygon = {'type': 'FeatureCollection','features': [{'type': 'Feature','properties': {'id':'123','name':'test', 'colour':'rgba(1,1,1,0.1)', 'width':1, 'fillcolor':'rgba(1,1,1,0.1)'},'geometry': {'type': 'Polygon','coordinates': [[[112.1044921875,39.095962936305476],[109.8193359375,35.782170703266075],[113.6865234375,34.125447565116126],[116.1474609375,36.94989178681327],[112.1044921875,39.095962936305476]]]}}]};
 * 
 *  var geojsonObject = { 'type': 'FeatureCollection',
		        'features': [{
		          'type': 'Feature',
		          'properties': {
			            'name': 'EPSG:3857',
			            'id':'123',
			            'name':'aa', 
			            'colour':'red',
			            'width':2, 
			            'fillcolor':'rgba(1,1,1,0.2)'
			          },
		          'geometry': {
		            'type': 'MultiPolygon',
		            'coordinates': [
		                [ 
		                	[[90.791015625,21.207458730482642],[122.16796875,21.207458730482642],[122.16796875,40.713955826286046],[90.791015625,40.713955826286046],[90.791015625,21.207458730482642]],
		                	[[100.37109375,28.304380682962783],[112.8515625,28.304380682962783],[112.8515625,34.59704151614417],[100.37109375,34.59704151614417],[100.37109375,28.304380682962783]]
		                ]
		              ]

		          }
		        }]
		      };
 * @param id
 * @returns
 */
function SimplePolygonLayerPlugin(id){
	this.id=id;
	this.layer = new ol.layer.Vector({
			source: new ol.source.Vector({}),
			
			style: function(feature) {
					feature.set("_type_", id);
					var colour = feature.get("colour")==null?"#ffcc33":feature.get("colour");
					var width = feature.get("width")==null? 2 : feature.get("width");
					var fillcolor = feature.get("fillcolor")==null? 'rgba(0,0,0,0.0)' : feature.get("fillcolor");
					return  [ new ol.style.Style({
					            stroke: new ol.style.Stroke({
					              color: colour,
					              width: width
					            }),
					            fill: new ol.style.Fill({
					                color: fillcolor
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

SimplePolygonLayerPlugin.prototype = new MapPlugin();

/**
 * 支持geojson 格式数据 只支持 type=Point
 * properties name 显示名称 icon 支持图片
 * 
 */
SimplePolygonLayerPlugin.prototype.geojson = function(result,clear){
	if (clear!=null&&clear==true)
		this.clearAll();
	this.layer.getSource().addFeatures((new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()})).readFeatures(result));//
}


/**
 * 返回所有的geojson //数据
 */
SimplePolygonLayerPlugin.prototype.getGeojson = function(){
	return new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()}).writeFeatures(this.layer.getSource().getFeatures());
}

/**
 * 鼠标移动到线上
 */
SimplePolygonLayerPlugin.prototype.pointermove = function(feature, event){
	this.popup.hide();
	if (feature!=null&&feature.get("_type_")==this.id){
		if (feature.get("name")!=null&&feature.get("name")!='')
			this.popup.show(event.coordinate, feature.get("name")); //event.coordinate
	}
}


/**
 * 清空数据
 */
SimplePolygonLayerPlugin.prototype.clearAll = function(){
	this.layer.getSource().clear();
}

var simplePolygonLayerPlugin = new SimplePolygonLayerPlugin('simplePolygonLayerPlugin');
globalconstant.plugin.push(simplePolygonLayerPlugin);