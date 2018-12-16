/**
 * 选择工具
 * selectPlugin.draw(callback)
 */

function SelectPlugin(id){
	this.id= id;
	this.selfPlugin = this;
	var plugin = this;
	this.callback = null;//回调函数
	this.distance = null;//距离
	this.geoGson=new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()});
	this.style = [new ol.style.Style({
    	stroke: new ol.style.Stroke({
    		color: 'rgba(255,0,0,0.5)',
    		lineDash: [8],
    		width: 1.5
    	}),
    	fill: new ol.style.Fill({
    		color: 'rgba(59,143,166,0.8)'
    	}),
    	image:new ol.style.Icon({
			anchor: [0, 16],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			src: globalconstant.imgUrl+'areatool.png'
		})
    })];
	
	this.drawVector = new ol.layer.Vector({
		source: new ol.source.Vector(),
		style:this.style
	});
	appMap.map.addLayer(this.drawVector);
	
	
	this.Draw = {
			init: function() {
				appMap.map.addInteraction(this.Point);
				this.Point.setActive(false);
				this.Point.on('drawstart',function(event) {
				});
				this.Point.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false,'Point');
					plugin.areaPoint(event);
				});
				appMap.map.addInteraction(this.LineString);
				this.LineString.setActive(false);
				this.LineString.on('drawstart',function(event) {
				});
				this.LineString.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false, 'LineString');
					plugin.areaLine(event);
				});
				
				appMap.map.addInteraction(this.Polygon);
				this.Polygon.setActive(false);
				this.Polygon.on('drawstart',function(event) {
				});
				this.Polygon.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false, 'Polygon');
					plugin.areaPolygon(event);
				});
		},
		Point: new ol.interaction.Draw({
			source: plugin.drawVector.getSource(),
			style:plugin.style,
			type: ('Point')
		}),
		LineString: new ol.interaction.Draw({
			source: plugin.drawVector.getSource(),
			style:plugin.style,
			type:  ('LineString')
		}),
		Polygon: new ol.interaction.Draw({
			source: plugin.drawVector.getSource(),
			style:plugin.style,
			type: ('Polygon')
		}),
		getActive: function() {
			return this.activeType ? this[this.activeType].getActive() : false;
		},
		setActive: function(active, type) {
		    if (active) {
				this.activeType && this[this.activeType].setActive(false);
				this[type].setActive(true);
				this.activeType = type;
		    } else {
				this.activeType && this[this.activeType].setActive(false);
				this.activeType = null;
		    }
		}
	};

}

SelectPlugin.prototype = new MapPlugin();

/**
 * 画区域
 * @param type
 */
SelectPlugin.prototype.draw = function (type, distance, callback){
	globalconstant.stopEvent();
	this.distance = distance;
	this.Draw.setActive(true, type);
	this.callback = callback;
}

/**
 * 计算区域
 * @param event
 */
SelectPlugin.prototype.areaPolygon = function(event){
  var coordinates = event.feature.getGeometry().getCoordinates();
	 /*var ls = {
			  "type": "Feature",
			  "geometry": {
				  "type": "Polygon",
				  "coordinates": coordinates
			  }
			};
	var unit = 'meters';//meters
	var mileOut = turf.buffer(ls, 0, unit);
	var feature=(mileOut.features)[0];
	coordinates = feature.geometry.coordinates;*/
    var mileOut=this.geoGson.writeFeatureObject(event.feature);
	this.callback(coordinates, event, mileOut, this.selfPlugin);
	
}
/**
 * 点周边
 * @param event
 * @param distance
 */
SelectPlugin.prototype.areaPoint = function(event){
    /*var coordinates = event.feature.getGeometry().getFirstCoordinate();//.getCoordinates();
    var ls = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": coordinates
        }
    };
    var unit = 'kilometers';//meters kilometers
    var mileOut = turf.buffer(ls, 111.2286855*this.distance, {units: 'meters'});//var mileOut = turf.buffer(ls, this.distance, unit); //100000米 var mileOut = turf.buffer(ls, 111.2286855*this.distance, unit); //100000米
    var feature=(mileOut.features)[0];
    coordinates = feature.geometry.coordinates;
    this.callback(coordinates, event, mileOut, this.selfPlugin);*/
    var ls=this.geoGson.writeFeatureObject(event.feature)
	var lat=ls.geometry.coordinates[1];//获取纬度
	var RATIO=1/(0.965-(lat-20)/100)//该系数只针对中国国内（20--50纬度范围内有效，根据多次画图测量推测，大致准确）
    var mileOut = turf.buffer(ls, this.distance*RATIO, {units: 'meters'});
    coordinates = mileOut.geometry.coordinates;
    var array=(new ol.format.GeoJSON()).readFeature(mileOut);
    this.callback(coordinates, event, mileOut, this.selfPlugin);
}

/**
 * 线周边
 * @param event
 * @param distance
 */
SelectPlugin.prototype.areaLine = function(event){
	/*var coordinates = event.feature.getGeometry().getCoordinates();
	var ls = {
			  "type": "Feature",
			  "geometry": {
				  "type": "LineString",
				  "coordinates": coordinates
			  }
			};
	var unit = 'kilometers';//meters
	var mileOut = turf.buffer(ls, 111.2286855*this.distance, unit); //100000米
	var feature=(mileOut.features)[0];
	coordinates = feature.geometry.coordinates;
	this.callback(coordinates, event, mileOut, this.selfPlugin);*/

    var ls=this.geoGson.writeFeatureObject(event.feature);
    var lat=ls.geometry.coordinates[0][1];//获取纬度
    var RATIO=1/(0.965-(lat-20)/100)//该系数只针对中国国内（20--50纬度范围内有效，根据多次画图测量推测，大致准确）
    var mileOut = turf.buffer(ls, this.distance*RATIO, {units: 'meters'});
    coordinates = mileOut.geometry.coordinates;
    var array=(new ol.format.GeoJSON()).readFeature(mileOut);
    this.callback(coordinates, event, mileOut, this.selfPlugin);
}

/**
 * 选择结果
 * @param coordinates
 * @param event
 * @param mileOut
 * @returns {Array}
 */
SelectPlugin.prototype.select = function(coordinates, event, mileOut){
	var points = new Array();
	var layers = appMap.map.getLayers();
	var _this=this;
	layers.forEach(function(layer, index){
		if (layer instanceof ol.layer.Layer){
			if (layer.getVisible()){
				var source = layer.getSource();
				if (source!=null && source instanceof ol.source.Vector){
					var features = source.getFeatures()
					for (var y=0;y<features.length;y++){
						var feature = features[y];
						if (feature!=null && "Point"==feature.getGeometry().getType()){
                            if(turf.booleanPointInPolygon(_this.geoGson.writeFeatureObject(feature), mileOut)){
                                points.push(feature);
							}
							 /*for (var i in coordinates){
								 if("Point"==feature.getGeometry().getType()){
                                     var result = pointInPolygon(feature.getGeometry().getCoordinates(), coordinates[i]);
                                     if (result>0&&i==0){
                                         points.push(feature);
                                     } else {
                                         if (result>0){
                                             break;
                                         }
                                     }
								 }
							} */
						}
					}
				}
			}
		}
	});
	//this.boundary(mileOut);
	return points;
}

/**
 * 在次画图
 * @param mileOut
 */
SelectPlugin.prototype.boundary = function(mileOut){
    //var array=(new ol.format.GeoJSON()).readFeatures(mileOut);
    var feature=this.geoGson.readFeature(mileOut);
    this.drawVector.getSource().addFeature(feature);
}

/**
 * 清除画的图
 * @param event
 */
SelectPlugin.prototype.resultEvent = function(event){
	this.drawVector.getSource().removeFeature(event.feature);
}
//================================

SelectPlugin.prototype.stopEvent = function(){
	this.Draw.setActive(false,'Polygon');
}

SelectPlugin.prototype.clearAll = function(){
	this.stopEvent();
	this.drawVector.getSource().clear();
}

var selectPlugin = new SelectPlugin('selectPlugin');
selectPlugin.Draw.init();
globalconstant.plugin.push(selectPlugin);
