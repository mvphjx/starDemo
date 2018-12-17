/**
 * 区域选择工具
 * areatoolPlugin.draw("Polygon")
 */

function AreatoolPlugin(id){
	this.id= id;
	this.selfPlugin = this;
	var plugin = this;
	this.distance = null;//距离
	this.callback = null;//回调函数
	this.style = [new ol.style.Style({
    	stroke: new ol.style.Stroke({
    		color: 'rgba(51,153,204,0.8)',
    		lineDash: [8],
    		width: 2
    	}),
    	fill: new ol.style.Fill({
    		color: 'rgba(51,153,204,0.2)'
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
				this.Point.on('drawstart',function(event) {});
				this.Point.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false,'Point');
					plugin.areaPoint(event);
				});
				appMap.map.addInteraction(this.LineString);
				this.LineString.setActive(false);
				this.LineString.on('drawstart',function(event) {});
				this.LineString.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false, 'LineString');
					plugin.areaLine(event);
				});
				appMap.map.addInteraction(this.Polygon);
				this.Polygon.setActive(false);
				this.Polygon.on('drawstart',function(event) {});
				this.Polygon.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false, 'Polygon');
					plugin.areaPolygon(event);
				});
				appMap.map.addInteraction(this.Circle);
				this.Circle.setActive(false);
				this.Circle.on('drawstart',function(event) {});
				this.Circle.on('drawend',function(event) {
					event.feature.set('_type', plugin.id);
					this.setActive(false, 'Circle');
					//求米
					//plugin.distance = event.feature.getGeometry().getRadius();  //getFirstCoordinate getLastCoordinate
					var firstCoordinate = event.feature.getGeometry().getFirstCoordinate();
					var lastCoordinate = event.feature.getGeometry().getLastCoordinate();
				    var sourceProj = appMap.map.getView().getProjection();
				    var c1 = ol.proj.transform(firstCoordinate, sourceProj, 'EPSG:4326');
				    var c2 = ol.proj.transform(lastCoordinate, sourceProj, 'EPSG:4326');
				    plugin.distance = appMap.wgs84Sphere.haversineDistance(c1, c2);
					plugin.areaPoint(event); //getCenter
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
		Circle: new ol.interaction.Draw({
			source: plugin.drawVector.getSource(),
			style:plugin.style,
			type: ('Circle')
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

AreatoolPlugin.prototype = new MapPlugin();

/**
 * 画区域
 * @param type
 */
AreatoolPlugin.prototype.draw = function (type, distance, callback){
	globalconstant.stopEvent();
	this.Draw.setActive(true, type);
	this.distance = distance;
	this.callback = callback;
}

/**
 * 计算区域
 * @param event
 */
AreatoolPlugin.prototype.areaPolygon = function(event){
	var coordinates = event.feature.getGeometry().getCoordinates(); 
	var ls = {
			  "type": "Feature",
			  "geometry": {
				  "type": "Polygon",
				  "coordinates": coordinates
			  }
			};
	var unit = 'meters';//meters
	var mileOut = turf.buffer(ls, 0, unit);
	coordinates = mileOut.geometry.coordinates;
	/*
	var param = {};
	for (var i in coordinates){
		param[i] = coordinates[i].toString();
	}
	*/
	this.callback(coordinates, event, mileOut, this.selfPlugin);
	/*
	console.log(param);
	var plugin = this;
	$.ajax({
        url:'/test',
        type:'post',
        data:param,
        success:function(msg){
        	plugin.resultEvent(event)
        	plugin.boundary(mileOut);	
        }
    });
    */
}

/**
 * 点周边
 * @param event
 * @param distance
 */
AreatoolPlugin.prototype.areaPoint = function(event){
	var coordinates = event.feature.getGeometry().getFirstCoordinate(); 
	var ls = {
			  "type": "Feature",
			  "geometry": {
				  "type": "Point",
				  "coordinates": coordinates
			  }
			};
	var unit = 'meters';//meters
	var mileOut = turf.buffer(ls, this.distance, unit); //100000米
	coordinates = mileOut.geometry.coordinates;
	
	this.callback(coordinates, event, mileOut, this.selfPlugin);
}

/**
 * 线周边
 * @param event
 * @param distance
 */
AreatoolPlugin.prototype.areaLine = function(event, distance){
	var coordinates = event.feature.getGeometry().getCoordinates(); 
	var ls = {
			  "type": "Feature",
			  "geometry": {
				  "type": "LineString",
				  "coordinates": coordinates
			  }
			};
	var unit = 'meters';//meters
	var mileOut = turf.buffer(ls, this.distance, unit); //100000米
	coordinates = mileOut.geometry.coordinates;
	
	/*
	var param = {};
	for (var i in coordinates){
		param[i] = coordinates[i].toString();
	}
	*/
	this.callback(coordinates, event, mileOut, this.selfPlugin);
}

/**
 * 选择结果
 * @param coordinates
 * @param event
 * @param mileOut
 * @returns {Array}
 */
AreatoolPlugin.prototype.select = function(coordinates, event, mileOut){
	var points = new Array();
	var layers = appMap.map.getLayers();
	layers.forEach(function(layer, index){
		if (layer instanceof ol.layer.Layer){
			if (layer.getVisible()){
				var source = layer.getSource();
				if (source!=null && source instanceof ol.source.Vector){
					var features = source.getFeatures()
					for (var y=0;y<features.length;y++){
						var feature = features[y];
						if (feature!=null){
							for (var i in coordinates){
								var result = pointInPolygon(feature.getGeometry().getCoordinates(), coordinates[i]);
								if (result>0&&i==0){
									points.push(feature);
								} else {
									if (result>0){
										break;
									}
								}
							}
						}
					}
				}
			}
		}
	});
	this.boundary(mileOut);
	return points;
}

/**
 * 在次画图
 * @param mileOut
 */
AreatoolPlugin.prototype.boundary = function(mileOut){
	this.drawVector.getSource().addFeatures((new ol.format.GeoJSON()).readFeatures(mileOut));
}

/**
 * 清除画的图
 * @param event
 */
AreatoolPlugin.prototype.resultEvent = function(event){
	this.drawVector.getSource().removeFeature(event.feature);
}
//================================

AreatoolPlugin.prototype.stopEvent = function(){
	this.Draw.setActive(false,'Point');
}

AreatoolPlugin.prototype.clearAll = function(){
	this.stopEvent();
	this.drawVector.getSource().clear();
}

var areatoolPlugin = new AreatoolPlugin('areatool');
areatoolPlugin.Draw.init();
globalconstant.plugin.push(areatoolPlugin);
