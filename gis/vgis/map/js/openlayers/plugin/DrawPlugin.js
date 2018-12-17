/**
 * draw.draw('LineString') //线
 * draw.draw('Point') //点
 * draw.draw('Polygon') //多边型
 * draw.draw('Circle') //圆
 * draw.modify()//修改加删除
 * draw.clearAll() //删除所有的
 */

//================================
var propertiesPolygon = '';

propertiesPolygon += '<div class="select_properties">                                                                                  ';
propertiesPolygon += '<div class="select-header">                                                                                      ';
propertiesPolygon += '      <span class="select-current">样式设置</span>                                                           ';
propertiesPolygon += '      <span class="select-panel-close">                                                                          ';
propertiesPolygon += '            <a class="fa fa-close" href="javascript:void(0)" onclick="drawPlugin.tooltip.setPosition(undefined)"></a>             ';
propertiesPolygon += '      </span>                                                                                                    ';
propertiesPolygon += '</div>                                                                                                           ';
propertiesPolygon += '<div class="properties_title">外边框线颜色</div>                                                                 ';
propertiesPolygon += '<div class="properties_cont">                                                                                    ';
propertiesPolygon += '    <div class="stroke">                                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,0,255" class="a1"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="255,0,0" class="a2"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="255,255,0" class="a3 on"></a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,128,0" class="a4"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="128,0,128" class="a5"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,0,0" class="a6"></a>                                                                             ';
propertiesPolygon += '    </div>                                                                                                       ';
propertiesPolygon += '</div>                                                                                                           ';
propertiesPolygon += '<div class="properties_title">线粗细</div>                                                                 ';
propertiesPolygon += '<div class="properties_cont">                                                                                    ';
propertiesPolygon += '    <div class="width">                                                                                           ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="1" class="a1">1PX</a>                                                                       ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="2" class="a1 on">2PX</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="3" class="a1">3PX</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="4" class="a1">4PX</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="6" class="a1">6PX</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="8" class="a1">8PX</a>                                                                          ';
propertiesPolygon += '    </div>                                                                                                       ';
propertiesPolygon += '</div>                                                                                                           ';
propertiesPolygon += '<div class="properties_title">内部填充颜色</div>                                                                 ';
propertiesPolygon += '<div class="properties_cont">                                                                                    ';
propertiesPolygon += '    <div class="fill">                                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,0,255" class="a1"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="255,0,0" class="a2"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="255,255,0" class="a3"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,128,0" class="a4 on"></a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="128,0,128" class="a5"></a>                                                                             ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,0,0" class="a6"></a>                                                                             ';
propertiesPolygon += '    </div>                                                                                                       ';
propertiesPolygon += '</div>                                                                                                           ';
propertiesPolygon += '<div class="properties_title">内部填充颜色透明度</div>                                                           ';
propertiesPolygon += '<div class="properties_cont">                                                                                    ';
propertiesPolygon += '     <div class="alpha">                                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="1" class="a1">10%</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0.8" class="a1">25%</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0.6" class="a1">50%</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0.3" class="a1">75%</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0.1" class="a1">85%</a>                                                                          ';
propertiesPolygon += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0" class="a1 on">100%</a>                                                                      ';
propertiesPolygon += '    </div>                                                                                                       ';
propertiesPolygon += '</div>                                                                                                           ';
propertiesPolygon += '<div class="properties_btn">                                                                                     ';
propertiesPolygon += '     <a href="javascript:void(0)" onclick="drawPlugin.save()">保存</a><a href="javascript:void(0)" onclick="drawPlugin.delSelect()">删除</a> ';
propertiesPolygon += '</div>                                                                                                           ';
propertiesPolygon += '</div>                                                                                                           ';

//============================
var propertiesLine = '';
propertiesLine += '<div class="select_properties">                                                                                  ';
propertiesLine += '<div class="select-header">                                                                                      ';
propertiesLine += '      <span class="select-current">样式设置</span>                                                           ';
propertiesLine += '      <span class="select-panel-close">                                                                          ';
propertiesLine += '            <a class="fa fa-close" href="javascript:void(0)" onclick="drawPlugin.tooltip.setPosition(undefined)"></a>             ';
propertiesLine += '      </span>                                                                                                    ';
propertiesLine += '</div>                                                                                                           ';
propertiesLine += '<div class="properties_title">外边框线颜色</div>                                                                 ';
propertiesLine += '<div class="properties_cont">                                                                                    ';
propertiesLine += '    <div class="stroke">                                                                                          ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,0,255" class="a1"></a>                                                                             ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="255,0,0" class="a2"></a>                                                                             ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="255,255,0" class="a3 on"></a>                                                                          ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,128,0" class="a4"></a>                                                                             ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="128,0,128" class="a5"></a>                                                                             ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="0,0,0" class="a6"></a>                                                                             ';
propertiesLine += '    </div>                                                                                                       ';
propertiesLine += '</div>                                                                                                           ';
propertiesLine += '<div class="properties_title">线粗细</div>                                                                 ';
propertiesLine += '<div class="properties_cont">                                                                                    ';
propertiesLine += '    <div class="width">                                                                                           ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="1" class="a1">1PX</a>                                                                       ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="2" class="a1 on">2PX</a>                                                                          ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="3" class="a1">3PX</a>                                                                          ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="4" class="a1">4PX</a>                                                                          ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="6" class="a1">6PX</a>                                                                          ';
propertiesLine += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="8" class="a1">8PX</a>                                                                          ';
propertiesLine += '    </div>                                                                                                       ';
propertiesLine += '</div>                                                                                                           ';
propertiesLine += '<div class="properties_btn">                                                                                     ';
propertiesLine += '     <a href="javascript:void(0)" onclick="drawPlugin.save()">保存</a><a href="javascript:void(0)" onclick="drawPlugin.delSelect()">删除</a> ';
propertiesLine += '</div>                                                                                                           ';
propertiesLine += '</div>                                                                                                           ';


var propertiesPoint = '';

propertiesPoint += '<div class="select_properties">                                                                                  ';
propertiesPoint += '<div class="select-header">                                                                                      ';
propertiesPoint += '      <span class="select-current">样式设置</span>                                                           ';
propertiesPoint += '      <span class="select-panel-close">                                                                          ';
propertiesPoint += '            <a class="fa fa-close" href="javascript:void(0)" onclick="drawPlugin.tooltip.setPosition(undefined)"></a>';
propertiesPoint += '      </span>                                                                                                    ';
propertiesPoint += '</div>                                                                                                           ';
propertiesPoint += '<div class="properties_title">图标样式</div>                                                                     ';
propertiesPoint += '<div class="properties_cont">                                                                                    ';
propertiesPoint += '     <div class="image">                                                                                        ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local1" class="a1 on"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local2" class="a2"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local3" class="a3"></a>                                                                            ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local4" class="a4"></a>                                                                            ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local5" class="a5"></a>                                                                            ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local6" class="a6"></a>                                                                            ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local7" class="a7"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local8" class="a8"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local9" class="a9"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local10" class="a10"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local11" class="a11"></a>                                                                             ';
propertiesPoint += '         <a href="javascript:void(0)" onclick="drawPlugin.setStyle(this)" value="local12" class="a12"></a>                                                                             ';
propertiesPoint += '    </div>                                                                                                       ';
propertiesPoint += '</div>                                                                                                           ';
propertiesPoint += '<div class="properties_btn">                                                                                     ';
propertiesPoint += '<a href="javascript:void(0)" onclick="drawPlugin.save()">保存</a><a href="javascript:void(0)" onclick="drawPlugin.delSelect()">删除</a>';
propertiesPoint += '</div>                                                                                                           ';
propertiesPoint += '</div>                                                                                                           ';

//==============================


function DrawPlugin(id){
	this.id = id;
	this._modify_tag = 1;//修改标记
	this.tooltipfeature = null;
	this.createTooltip();
	this.source=new ol.source.Vector();
	this.drawVector = new ol.layer.Vector({source: this.source});
	appMap.map.addLayer(this.drawVector);
	var modify = new ol.interaction.Modify({source: this.source});
            appMap.map.addInteraction(modify);
	
	/*
	var snap = new ol.interaction.Snap({
		  source: this.drawVector.getSource()
		});
	appMap.map.addInteraction(snap);
	*/
	var _drawPlugin = this;
	this.tooltipelement;
	this.tooltip;
	this.createTooltip();
	this.Modify = {
			init: function() {
				this.select = new ol.interaction.Select({layers:[_drawPlugin.drawVector]});
				appMap.map.addInteraction(this.select);
				this.modify = new ol.interaction.Modify({
					features: this.select.getFeatures()
				});
				appMap.map.addInteraction(this.modify);
				this.setEvents();
				//开始
				this.modify.on('modifystart',function(evt) {
					//console.log(evt.features);
					//var geom = evt.target;
					//console.log(geom);
				});
				//结束
				this.modify.on('modifyend',function(evt) {
				
				});
				//选中
				this.select.on('select',function(f){
					//console.log(f.selected);
					//this.setActive(false);//不能选中
				});
			},
			setEvents: function() {
				var selectedFeatures = this.select.getFeatures();
				this.select.on('change:active', function() {
					selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
				});
			},
			setActive: function(active) {
				this.select.setActive(active);
				this.modify.setActive(active);
			}
		};
	this.Draw = {
			init: function() {
				appMap.map.addInteraction(this.Point);
				this.Point.setActive(false);
				this.Point.on('drawstart',function(event) {
				});
				this.Point.on('drawend',function(event) {
					event.feature.set('_type', _drawPlugin.id);
					this.setActive(false,'Point');
					_drawPlugin.tooltipshow(event.feature)
				});
				appMap.map.addInteraction(this.LineString);
				this.LineString.setActive(false);
				this.LineString.on('drawstart',function(event) {
				});
				this.LineString.on('drawend',function(event) {
					event.feature.set('_type', _drawPlugin.id);
					this.setActive(false, 'LineString');
					_drawPlugin.tooltipshow(event.feature);
				});
				appMap.map.addInteraction(this.Polygon);
				this.Polygon.setActive(false);
				this.Polygon.on('drawstart',function(event) {
				});
				this.Polygon.on('drawend',function(event) {
					event.feature.set('_type', _drawPlugin.id);
					this.setActive(false, 'Polygon');
					_drawPlugin.tooltipshow(event.feature);
				});
				appMap.map.addInteraction(this.Circle);
				this.Circle.setActive(false);
				this.Circle.on('drawstart',function(event) {
				});
				this.Circle.on('drawend',function(event) {
					event.feature.set('_type', _drawPlugin.id);
					this.setActive(false, 'Circle'); 
					_drawPlugin.tooltipshow(event.feature);
				});
			},
			Point: new ol.interaction.Draw({
				source: _drawPlugin.drawVector.getSource(),
				type: ('Point')
			}),
			LineString: new ol.interaction.Draw({
				source: _drawPlugin.drawVector.getSource(),
				type:  ('LineString')
			}),
			Polygon: new ol.interaction.Draw({
				source: _drawPlugin.drawVector.getSource(),
				type: ('Polygon')
			}),
			Circle: new ol.interaction.Draw({
				source: _drawPlugin.drawVector.getSource(),
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
	this.snap = new ol.interaction.Snap({source: this.drawVector.getSource()});
	appMap.map.addInteraction(this.snap);
}

DrawPlugin.prototype = new MapPlugin();



DrawPlugin.prototype.draw = function (type){
	globalconstant.stopEvent();
	this.Draw.setActive(true, type);
	this.Modify.setActive(false, type);
}


DrawPlugin.prototype.modify = function (){
	globalconstant.stopEvent();
	this._modify_tag=0;
	this.Draw.setActive(false, 'LineString');
	this.Modify.setActive(true, 'LineString');
}


DrawPlugin.prototype.dels = function (){
	var select = this.Modify.select;
	plugin = this;
	if (select!=null){
		var selectedFeatures = select.getFeatures();
		selectedFeatures.forEach(function(feature){
			plugin.drawVector.getSource().removeFeature(feature);
			plugin.Modify.select.setActive(true);
		},selectedFeatures);
	}
}

/**
 * 泡泡
 */

DrawPlugin.prototype.createTooltip = function () {
	if (this.tooltipelement) 
		this.tooltipelement.parentNode.removeChild(this.tooltipelement);
	this.tooltipelement = document.createElement('div');
	this.tooltipelement.className = 'popup tooltip-draw';
	this.tooltip = new ol.Overlay({
		element:this.tooltipelement,
	    offset: [0, -15],
	    positioning: 'bottom-center'
	});
	appMap.map.addOverlay(this.tooltip);
}


DrawPlugin.prototype.tooltipshow = function(feature){
	this.tooltipfeature = feature;
	var geom = feature.getGeometry();
	if (geom instanceof ol.geom.Polygon){
		this.tooltipelement.innerHTML = propertiesPolygon;
		$(".tooltip-draw").css("bottom", "450px");
		this.tooltip.setPosition(geom.getLastCoordinate());
	} else if (geom instanceof ol.geom.LineString){
		this.tooltipelement.innerHTML = propertiesLine;
		$(".tooltip-draw").css("bottom", "260px");
		this.tooltip.setPosition(geom.getLastCoordinate());
	} else if (geom instanceof ol.geom.Circle){
		this.tooltipelement.innerHTML = propertiesPolygon;
		$(".tooltip-draw").css("bottom", "450px");
		this.tooltip.setPosition(geom.getCenter());
	} else if (geom instanceof ol.geom.Point){
		this.tooltipelement.innerHTML = propertiesPoint;
		$(".tooltip-draw").css("bottom", "250px");
		this.tooltip.setPosition(geom.getLastCoordinate());
	}
}

/**
 * 画线
 */
DrawPlugin.prototype.drawLine = function(line){
	globalconstant.stopEvent();
	if (line==null){
	} else {
		var lineString = [];
		for (var i=0;i<line.length;i++){
			lineString[i]=ol.proj.transform(line[i], 'EPSG:4326', appMap.map.getView().getProjection());
		}
		var feature = new ol.Feature({
			  geometry: new ol.geom.LineString(lineString)
		});
		feature.set('_type', this.id);
		this.drawVector.getSource().addFeature(feature);
	}
}

//========
DrawPlugin.prototype.setStyle = function (a){
	$(a).parent().children().removeClass("on");
	$(a).addClass("on");
    var stroke=$(".tooltip-draw").find(".stroke .on").attr("value");
	var style = this.style($(".fill .on").attr("value"), $(".width .on").attr("value"), stroke, $(".alpha .on").attr("value"), $(".image .on").attr("value"));
	this.tooltipfeature.setStyle(style);
}
DrawPlugin.prototype.save =  function(){
    var stroke=$(".tooltip-draw").find(".stroke .on").attr("value");
	var style = this.style($(".fill .on").attr("value"), $(".width .on").attr("value"), stroke, $(".alpha .on").attr("value"), $(".image .on").attr("value"));
	this.tooltipfeature.setStyle(style);
	this.tooltip.setPosition(undefined);
	this.tooltip.changed();
}

DrawPlugin.prototype.delSelect = function(){
	this.tooltip.setPosition(undefined);
	this.drawVector.getSource().removeFeature(this.tooltipfeature);
	this.tooltipfeature = null;
	this.stopEvent();
}

DrawPlugin.prototype.style = function(fill, width, stroke, alpha, image){
	if (fill==null)
		fill = "0,0,0";
	if (width==null)
		width = 2;
	width = parseInt(width);
	if (stroke==null)
		stroke = "0,0,0";
	if (image==null)
		image = "local1";
    var styles = [
              	new ol.style.Style({
              		fill: new ol.style.Fill({
            			color: 'rgba('+fill+', '+alpha+')'
            		}),
            		stroke: new ol.style.Stroke({
            			color: 'rgba('+stroke+', 1)',
            			width: width
            		}),
            		image: new ol.style.Icon({ 
            			src: globalconstant.imgUrl+image+'.png'
            		})
            		//,text: new ol.style.Text({text:'aaaaaaaaa'})
               })
             ];
    return styles;
}

//========================================
DrawPlugin.prototype.stopEvent = function(){
	this.Draw.setActive(false, 'Point');
	this.Modify.setActive(false, 'Point');
	this.tooltip.setPosition(undefined);
	this._modify_tag = 1;
}

DrawPlugin.prototype.pointermove = function(feature, event){
	//console.log(feature.get("_type"));
	if (feature!=null && this.id==feature.get("_type")){
		appMap.map.getTargetElement().style.cursor = 'pointer';
	}
}

DrawPlugin.prototype.singleclick = function(feature, event){
	/*
	if (draw._modify_tag==0 
			&& feature!=null
			&&draw.id==feature.get("_type")){
		draw.tooltipshow(feature);
	}
	*/
	if (feature!=null
			&&this.id==feature.get("_type")){
		this.tooltipshow(feature);
	}
	
}


/**
 * 清空所有的
 */
DrawPlugin.prototype.clearAll = function(){
	this.tooltip.setPosition(undefined);
	this.drawVector.getSource().clear();
}

var drawPlugin = new DrawPlugin('draw');
drawPlugin.Modify.init();
drawPlugin.Draw.init();
drawPlugin.stopEvent();
globalconstant.plugin.push(drawPlugin);

//=========================================

