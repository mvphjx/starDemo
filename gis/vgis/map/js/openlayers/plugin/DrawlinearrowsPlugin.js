/**
 * 画箭头线
 * drawlinearrows.draw()
 *清空
 * drawlinearrows.clearAll()
 */


var propertieslinearrows = '';

propertieslinearrows += '<div class="select_properties">                                                                                  ';
propertieslinearrows += '<div class="select-header">                                                                                      ';
propertieslinearrows += '      <span class="select-current">样式属性选择</span>                                                           ';
propertieslinearrows += '      <span class="select-panel-close">                                                                          ';
propertieslinearrows += '            <a class="fa fa-close" href="javascript:void(0)" onclick="drawlinearrowsPlugin.tooltip.setPosition(undefined)"></a>             ';
propertieslinearrows += '      </span>                                                                                                    ';
propertieslinearrows += '</div>                                                                                                           ';
propertieslinearrows += '<div class="properties_title">颜色</div>                                                                 ';
propertieslinearrows += '<div class="properties_cont">                                                                                    ';
propertieslinearrows += '    <div class="stroke">                                                                                          ';
propertieslinearrows += '         <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.style(\'#0000FF\', \'arrowblue.png\')" class="a1 on"></a>                                                                             ';
propertieslinearrows += '         <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.style(\'#FF0000\', \'arrowred.png\')" class="a2"></a>                                                                             ';
propertieslinearrows += '         <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.style(\'#FFFF00\', \'arrowyellow.png\')" class="a3"></a>                                                                          ';
propertieslinearrows += '         <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.style(\'#008000\', \'arrowgreen.png\')" class="a4"></a>                                                                             ';
propertieslinearrows += '         <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.style(\'#800080\', \'arrowpurple.png\')" class="a5"></a>                                                                             ';
propertieslinearrows += '         <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.style(\'#000000\', \'arrowblack.png\')" class="a6"></a>                                                                             ';
propertieslinearrows += '    </div>                                                                                                       ';
propertieslinearrows += '</div>                                                                                                           ';
propertieslinearrows += '<div class="properties_btn">                                                                                     ';
propertieslinearrows += '     <a href="javascript:void(0)" onclick="drawlinearrowsPlugin.tooltip.setPosition(undefined)">保存</a><a href="javascript:void(0)" onclick="drawlinearrowsPlugin.del()">删除</a> ';
propertieslinearrows += '</div>                                                                                                           ';
propertieslinearrows += '</div>                                                                                                           ';


function DrawlinearrowsPlugin(id){
	var _DrawlinearrowsPlugin = this;
	this.id = id;
	this.tooltipfeature;
	this.tooltipelement;
	this.tooltip;
	this.createTooltip();
	this.source = new ol.source.Vector();
	
	this.vector = new ol.layer.Vector({
		source: this.source,
		zIndex: 3,
		style: this.styleBlue
	});
	appMap.map.addLayer(this.vector);
	
	var modify = new ol.interaction.Modify({source: this.source});
	appMap.map.addInteraction(modify);

	this.drawlinearrows = new ol.interaction.Draw({
	    source: this.source,
	    type: ('LineString')
	});

	/**
	 * 开始画
	 */
	this.drawlinearrows.on('drawstart',function(event) {
	});

	/**
	 * 结束画
	 */
	this.drawlinearrows.on('drawend',function(event) {
		event.feature.set('_type', _DrawlinearrowsPlugin.id);
		_DrawlinearrowsPlugin.stopEvent();
		_DrawlinearrowsPlugin.tooltipshow(event.feature);
	});
}

DrawlinearrowsPlugin.prototype = new MapPlugin();

DrawlinearrowsPlugin.prototype.styleBlue = function(feature) {
	return _styleArrows("#0000FF", 'arrowblue.png', feature);
};


function _styleArrows(color, img, feature){
    var geometry = feature.getGeometry();
    var styles = [
        new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: color,
				width: 1
			})
    	})
	];
    geometry.forEachSegment(function(start, end) {
    	var dx = end[0] - start[0];
    	var dy = end[1] - start[1];
    	var rotation = Math.atan2(dy, dx);
    	styles.push(new ol.style.Style({
    		geometry: new ol.geom.Point(end),
    		image: new ol.style.Icon({
    			src: globalconstant.imgUrl+img,
    			anchor: [0.75, 0.5],
    			rotateWithView: false,
    			rotation: -rotation
    		})
    	}));
    });
    return styles;
}


DrawlinearrowsPlugin.prototype.createTooltip = function () {
	if (this.TooltipElement) 
		this.TooltipElement.parentNode.removeChild(this.tooltipelement);
	this.tooltipelement = document.createElement('div');
	this.tooltipelement.className = 'popup tooltip-drawlinearrows';
	this.tooltip = new ol.Overlay({
		element:this.tooltipelement,
	    offset: [0, -15],
	    positioning: 'bottom-center'
	});
	appMap.map.addOverlay(this.tooltip);
}

/**
 * 修改属性框
 */
DrawlinearrowsPlugin.prototype.tooltipshow = function(feature){
	this.tooltipfeature = feature;
	this.tooltipelement.innerHTML = propertieslinearrows;
	var geom = feature.getGeometry();
	this.tooltip.setPosition(geom.getLastCoordinate());
}

/**
 * 画
 */
DrawlinearrowsPlugin.prototype.draw = function(line){
	globalconstant.stopEvent();
	if (line==null)
		appMap.map.addInteraction(this.drawlinearrows);
	else {
		var lineString = [];
		for (var i=0;i<line.length;i++){
			lineString[i]=ol.proj.transform(line[i], 'EPSG:4326', appMap.map.getView().getProjection());
		}
		var feature = new ol.Feature({
			  geometry: new ol.geom.LineString(lineString)
		});
		feature.set('_type', this.id);
		this.source.addFeature(feature);
	}
}


/**
 * 变更样式
 */
DrawlinearrowsPlugin.prototype.style = function(color, img){
	this.tooltipfeature.setStyle(_styleArrows(color, img, this.tooltipfeature));
}


/**
 * 删除
 */
DrawlinearrowsPlugin.prototype.del = function(){
	if (this.tooltipfeature!=null){
		this.source.removeFeature(this.tooltipfeature);
	}
	this.tooltip.setPosition(undefined);
}

//========================================
DrawlinearrowsPlugin.prototype.stopEvent = function(){
	appMap.map.removeInteraction(this.drawlinearrows);
}

DrawlinearrowsPlugin.prototype.pointermove = function(feature, event){
	if (feature!=null && this.id==feature.get("_type")){
		appMap.map.getTargetElement().style.cursor = 'pointer';
	}
}

DrawlinearrowsPlugin.prototype.singleclick = function(feature, event){
	if (feature!=null&&this.id==feature.get("_type"))
		this.tooltipshow(feature);
	
}
	
/**
 * 清空所有的
 */
DrawlinearrowsPlugin.prototype.clearAll = function(){
	this.tooltip.setPosition(undefined);
	this.vector.getSource().clear();
}

var drawlinearrowsPlugin = new DrawlinearrowsPlugin('drawlinearrows');
globalconstant.plugin.push(drawlinearrowsPlugin);