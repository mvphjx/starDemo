/**
 * 测量
 * measurePlugin.lengthArea('LineString')
 * measurePlugin.lengthArea('Polygon')
 * measurePlugin.clearAll()
 */


function MeasurePlugin(id){
	this.id=id;
	this.lengthAreaVector = {};  //保存数据
	this.lengthAreaVector_id = 1; //标记数据
	this.measureTooltipElement = null;
	this.measureTooltip = null;
	this.draw = null;
}

MeasurePlugin.prototype = new MapPlugin();

MeasurePlugin.prototype.styleDraw = function(feature) {
    var styles = [new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255, 255, 255, 0.1)'
		}),
		stroke: new ol.style.Stroke({
			color: 'rgba(255, 0, 0, 0.9)',
			width: 2
		}),
		image:new ol.style.Icon({ 
			anchor: [0, 16],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			src: globalconstant.imgUrl+'measure_draw.png'
		})
	})];
    
    var geometry = feature.getGeometry();
    if (geometry instanceof ol.geom.LineString){
	    geometry.forEachSegment(function(start, end) {
		    var dx = end[0] - start[0];
		    var dy = end[1] - start[1];
		    var rotation = Math.atan2(dy, dx);
		    styles.push(new ol.style.Style({
	    		geometry: new ol.geom.Point(end),
	    		image: new ol.style.Icon({
		    		src: globalconstant.imgUrl+'measure_point.png',
		    		anchor: [0.5, 0.5],
		    		rotateWithView: false,
		    		rotation: -rotation
	    		})
	    	}));
		    styles.push(new ol.style.Style({
	    		geometry: new ol.geom.Point(start),
	    		image: new ol.style.Icon({
		    		src: globalconstant.imgUrl+'measure_point.png',
		    		anchor: [0.5, 0.5],
		    		rotateWithView: false,
		    		rotation: -rotation
	    		})
	    	}));
	    });
	}
	return styles;
};	

//measure.html
//Polygon LineString
MeasurePlugin.prototype.lengthArea = function (type){
	var plugin = this;
	globalconstant.stopEvent();
	//global.stopEvent();
	this.lengthAreaVector_id++;
	//创建标记提示
	this.createMeasureTooltip();
	//删除其它画面
	//appMap.removeDraw();
	var source = new ol.source.Vector();
	var vector = new ol.layer.Vector({
		  source: source,
		  style: this.styleDraw
	});
	
	this.lengthAreaVector[this.lengthAreaVector_id] = vector;
	
	function addInteraction(type) {
		plugin.draw = new ol.interaction.Draw({
			source: source,
			type:  (type),
			style:plugin.styleDraw
		});
	}

	addInteraction(type);	
	appMap.map.addLayer(vector);
	appMap.map.addInteraction(this.draw);	
  
	var listener;
	this.draw.on('drawstart', function(evt) {
	    	sketch = evt.feature;
	    	sketch.set('_type', plugin.id);//==========================
	    	sketch.set('xh',plugin.lengthAreaVector_id);
	        var tooltipCoord = evt.coordinate;
	        listener = sketch.getGeometry().on('change', function(evt) {
	        	var geom = evt.target;
	        	var output;
	        	if (geom instanceof ol.geom.Polygon) {
	        		output = plugin.formatArea((geom));
	        		tooltipCoord = geom.getInteriorPoint().getCoordinates();
	            } else if (geom instanceof ol.geom.LineString) {
	            	output = plugin.formatLength(  (geom));
	            	tooltipCoord = geom.getLastCoordinate();
	            } else if (geom instanceof ol.geom.Circle){
	            	output = plugin.formatCircle(geom);
	            	tooltipCoord = geom.getCenter();
	            }
	           // output = formatLength((geom));
	           // tooltipCoord = geom.getLastCoordinate();
	        	plugin.measureTooltipElement.innerHTML = output+"<a href='javascript:void(0)' onclick='measurePlugin.closeDistance("+plugin.lengthAreaVector_id+")'>X</a>";
	        	plugin.measureTooltip.setPosition(tooltipCoord);
				plugin.lengthAreaVector[plugin.lengthAreaVector_id+"_1"] = plugin.measureTooltip;
	        });
	    }, this);

	this.draw.on('drawend', function(evt) {
			plugin.measureTooltipElement.className = 'measuretooltip measuretooltip-static';
			plugin.measureTooltip.setOffset([0, -7]);
	        sketch = null;
	        plugin.measureTooltipElement = null;
	        plugin.createMeasureTooltip();
	        ol.Observable.unByKey(listener);
	        //不可以删除
			appMap.map.removeInteraction(plugin.draw);
	}, this);
}
MeasurePlugin.prototype.formatLength = function(line) {
	//var length = Math.round(line.getLength() * 100) / 100;
	/**/
	
	var coordinates = line.getCoordinates();
    length = 0;
    var sourceProj = appMap.map.getView().getProjection();
    for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    	var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
    	var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
    	length += appMap.wgs84Sphere.haversineDistance(c1, c2);
    }
	var output;
	if (length > 600) {
		output = (Math.round(length / 1000 * 100) / 100) +  '' + 'km';
	} else {
		output = (Math.round(length * 100) / 100) + '' + 'm';
	}
	return output;
};

MeasurePlugin.prototype.formatArea = function(polygon) {
	//var area = polygon.getArea();
	
	/**/
	var sourceProj = appMap.map.getView().getProjection();
    var geom = (polygon.clone().transform(sourceProj, 'EPSG:4326'));
    var coordinates = geom.getLinearRing(0).getCoordinates();
    var area = Math.abs(appMap.wgs84Sphere.geodesicArea(coordinates));
	
	var output;
	if (area > 10000) {
		output = (Math.round(area / 1000000 * 100) / 100) + '' + 'km<sup>2</sup>';
	} else {
		output = (Math.round(area * 100) / 100) + '' + 'm<sup>2</sup>';
	}
	return output;
};

MeasurePlugin.prototype.formatCircle = function(circle) {
	var radius = circle.getRadius();
	var area = radius*radius*3.1415926
	var output;
	if (area > 10000) {
	    output = (Math.round(area / 1000000 * 100) / 100) + '' + 'km<sup>2</sup>';
	} else {
	    output = (Math.round(area * 100) / 100) + '' + 'm<sup>2</sup>';
	}
	return output;
};


MeasurePlugin.prototype.createMeasureTooltip = function () {
	if (this.measureTooltipElement) {
		this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
	}
	this.measureTooltipElement = document.createElement('div');
	this.measureTooltipElement.className = 'measuretooltip measuretooltip-measure';
	this.measureTooltip = new ol.Overlay({
		element:this.measureTooltipElement,
	    offset: [0, -15],
	    positioning: 'bottom-center'
	});
	appMap.map.addOverlay(this.measureTooltip);
}	

MeasurePlugin.prototype.closeDistance = function (distancevector_id){
	this.lengthAreaVector[distancevector_id+"_1"].setPosition(undefined);
	appMap.map.removeLayer(this.lengthAreaVector[distancevector_id]);
	this.lengthAreaVector[distancevector_id+"_1"]=null;
	this.lengthAreaVector[distancevector_id]=null;
}




MeasurePlugin.prototype.del = function(feature){
	if (feature!=null && measure.id==feature.get("_type")){
		var i = feature.get("xh");
		var areaVector = this.lengthAreaVector[i];
		if (areaVector!=null){
			//areaVector.getSource().clear();
			appMap.map.removeLayer(areaVector);
		}
		var areaPosition = this.lengthAreaVector[i+"_1"];
		if (areaPosition!=null){
			areaPosition.setPosition(undefined);
		}
	}
}



//========================================
MeasurePlugin.prototype.stopEvent = function(){
	if (this.draw!=null)
		appMap.map.removeInteraction(this.draw);
}

/**
 * 清空所有的
 */
MeasurePlugin.prototype.clearAll = function(){
	for (var i in this.lengthAreaVector){
		var areaVector = this.lengthAreaVector[i];
		if (areaVector!=null){
			if (areaVector instanceof ol.layer.Vector){
				//areaVector.getSource().clear();
				appMap.map.removeLayer(areaVector);
		   } else {
				areaVector.setPosition(undefined);
		   }
		}
	}
	this.lengthAreaVector = {};
}

var measurePlugin = new MeasurePlugin('measure');
globalconstant.plugin.push(measurePlugin);
