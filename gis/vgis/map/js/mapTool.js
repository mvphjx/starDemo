/**
 * 这是个自定义地图工具类
 */
var mapTool={
    /**
     * 地图初始化
     */
    init:function(_options){
         globalconstant.tileUrl=_options.tileUrl;
         //地图默认点心点位置，级别
         globalconstant.defaultLon =_options.defaultLon;
         globalconstant.defaultLat = _options.defaultLat;
         globalconstant.defaultlevel =_options.defaultlevel;
         globalconstant.minlevel =_options.minlevel;
         globalconstant.maxlevel = _options.maxlevel;
         globalconstant.geoserverWfs=_options.geoserverWfs;

        if(_options.imgUrl!=null && _options.imgUrl!=undefined && _options.imgUrl!=''){//覆盖默认目标dom
            globalconstant.imgUrl=_options.imgUrl;
        }
        if(_options.target!=null && _options.target!=undefined && _options.target!=''){//覆盖默认目标dom
            globalconstant.target=_options.target;
            appMap.map.setTarget(globalconstant.target);//设置dom
        }
        appMap.map.addLayer(new ol.layer.Tile({//设置瓦片
            source: new ol.source.XYZ({
                url: _options.tileUrl+'/roadmap/{z}/{x}/{y}.png'
            }),
            zIndex:-1
        }));
        appMap.map.setView(new ol.View({//设置视图
           projection: "EPSG:3857",
           center: ol.proj.fromLonLat([_options.defaultLon, _options.defaultLat]),
           minZoom: _options.minlevel,
           maxZoom: _options.maxlevel,
           zoom: _options.defaultlevel  //默认缩放级别
       }));
        if(_options.colorFilter==true){//设置滤镜
            var filter = new ol.filter.Colorize();
            filter.setFilter({ operation: "difference", red: 242, green: 220, blue: 195, value: 0.9 });//color
            appMap.map.addFilter(filter);
        }
        appMap.map.render();
        //alert("地图初始化完成！！！");
    },
    createLayer:function(_layerId,_layerType,zIndex){
        if (_layerType=='heat'){//热力图
            globalconstant.layers[_layerId] = new ol.layer.Heatmap({
                gradient:['#09208F' , '#5918CB', '#6518EA', '#189BE2', '#18E0E6'],
                source:new ol.source.Vector({}),
                blur: 50,
                radius: 20
            });
        }else if (_layerType=='cluster'){//聚合
            globalconstant.layers[_layerId] = new ol.layer.Vector({
                source:new ol.source.Cluster({ distance:100,source: new ol.source.Vector({ })}),
                style:function (feature) {
                    var size = feature.get('features').length;
                    var style = globalconstant.clusterStyleCache[size];
                    feature.set("type",_layerId);
                    if (!style) {
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                        radius: 10,
                        stroke: new ol.style.Stroke({
                            color: '#fff'
                        }),
                        fill: new ol.style.Fill({
                            color: '#3399CC'
                        })
                        }),
                        text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({
                            color: '#fff'
                        })
                        })
                    });
                    globalconstant.clusterStyleCache[size] = style;
                    }
                    return style;
                }
               });
        }
        // else if(_layerType=='modify'){
        //     //var source=new ol.source.Vector({});
        //     //globalconstant.layers[_layerId] = new ol.layer.Vector({source: source});


        // }
        else{
            globalconstant.layers[_layerId] = new ol.layer.Vector({source: new ol.source.Vector({})});
        }
        if(zIndex!=undefined){
            globalconstant.layers[_layerId].setZIndex(zIndex);
        }
        appMap.map.addLayer(globalconstant.layers[_layerId]);
        globalconstant.layers[_layerId].set("vectorType",_layerType);
        callback.createVectorCallback(_layerId);
        return globalconstant.layers[_layerId];
    },
    showPoint:function(_data,_layerId){
        var features=[];
        for(var i=0;i<_data.length;i++){
            var point=_data[i];
            var feature = new ol.Feature({geometry:new ol.geom.Point(ol.proj.transform([point.lon, point.lat], 'EPSG:4326', appMap.map.getView().getProjection()))});
            for (var prop in point) {
                feature.set(prop, point[prop]);
            }
            if (feature.get("icon")) {
                var style = new ol.style.Style();
                style.setImage(new ol.style.Icon({ src: globalconstant.imgUrl + feature.get("icon") }))
                feature.setStyle(style);
             }
            features.push(feature);
            //泡泡
            var tip =null;
            if(point.overlay){
                var geom = feature.getGeometry();
                var tipElement = document.createElement('div');
                tipElement.id=feature.get("type")+"_"+feature.get("id");
                if(point.overlay.type!=null && point.overlay.type!=undefined){
                    tipElement.setAttribute("tiptype", point.overlay.type);
                }
                tip= new ol.Overlay({
                    element:tipElement
                });
                tip.setPosition(geom.getLastCoordinate());
                appMap.map.addOverlay(tip);
            }
            callback.createFeatureCallback (feature,tip);
        }

        this.getSource(_layerId).addFeatures(features);
    },
    showLine:function (_data,_layerId){

        var features=[];
        for(var i=0;i<_data.length;i++){
            var obj=_data[i];
            var coordinates=[];
            for(var k=0;k<obj.coordinates.length;k++){
                coordinates.push(ol.proj.transform(obj.coordinates[k], 'EPSG:4326', appMap.map.getView().getProjection()));
            }
            var feature = new ol.Feature({geometry:new ol.geom.LineString(coordinates)});
            for (var prop in obj) {
                feature.set(prop, obj[prop]);
            }
            features.push(feature);
            callback.createLineCallback(feature);
        }
        this.getSource(_layerId).addFeatures(features);
    },
    showPolygon:function (_data,_layerId){
        var features=[];
        for(var i=0;i<_data.length;i++){
            var obj=_data[i];
            var coordinates=[];
            for(var k=0;k<obj.coordinates.length;k++){
                coordinates.push(ol.proj.transform(obj.coordinates[k], 'EPSG:4326', appMap.map.getView().getProjection()));
            }
            var feature = new ol.Feature({geometry:new ol.geom.Polygon([coordinates])});
            for (var prop in obj) {
                feature.set(prop, obj[prop]);
            }
            if(feature.get("style")){
                var style=feature.get("style");
                var strokeColor='#3399CC';
                var strokeWidth=1.25;
                var fillColor='rgba(255,255,255,0.4)';
                if(style.strokeColor) strokeColor=style.strokeColor;
                if(style.strokeWidth) strokeWidth=parseInt(style.strokeWidth);
                if(style.strokeWidth) fillColor=style.fillColor;
                feature.setStyle(new ol.style.Style({
                    fill:new ol.style.Fill({ color: fillColor}),
                    stroke:new ol.style.Stroke({color:strokeColor,width:strokeWidth})
                }))
            }

            features.push(feature);
        }
        this.getSource(_layerId).addFeatures(features);
    },
    showData:function (_data,_layerId){
        var features=[];
        for(var i=0;i<_data.length;i++){
            var obj=_data[i];
            var feature=null;

            if(obj.gType=='point'){/*** 点*/
            feature = new ol.Feature({geometry:new ol.geom.Point(ol.proj.transform([obj.lon, obj.lat], 'EPSG:4326', appMap.map.getView().getProjection()))});
                if(obj.icon!=null){
                    feature.setStyle( new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl+obj.icon})}));
                }
            }else if(obj.gType=='line'){/***线*/
            var coordinates=[]
                for(var k=0;k<obj.coordinates.length;k++){
                    coordinates.push(ol.proj.transform(obj.coordinates[k], 'EPSG:4326', appMap.map.getView().getProjection()));
                }
                feature= new ol.Feature({geometry:new ol.geom.LineString(coordinates)});
            }else{
            }
            for (var prop in obj) {/***设置属性*/
              feature.set(prop, obj[prop]);
            }
            callback.showDataCallback(feature);
            features.push(feature);
        }
        this.getSource(_layerId).addFeatures(features);
    },
    importData:function (_geoJsonData,_layerId){
        var geoGson=new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()});
        this.getSource(_layerId).addFeatures(geoGson.readFeatures(_geoJsonData));
    },
    exportData:function(_layerId){
        var geoGson=new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()});
        return  geoGson.writeFeatures(this.getSource(_layerId).getFeatures())
    },
    clear:function (_layerId){
        appMap.select.getFeatures().clear();
        var features=this.getSource(_layerId).getFeatures();
        this.getSource(_layerId).clear();
        for (var i = 0; i < features.length; i++) {
            var feature=features[i];
            var the_overlay=$("#"+feature.get("type")+"_"+feature.get("id"));
            if(the_overlay!=null && the_overlay!=undefined){
                the_overlay.remove();
            }
        }
    },
    removeFeature:function (_featureId,_layerId){
        var source = globalconstant.layers[_layerId].getSource();
        var features = source.getFeatures();
        for (var i = 0; i < features.length; i++) {
            if (_featureId == features[i].get("id")) {
                var feature=features[i];
                source.removeFeature(feature);
                var the_overlay=$("#"+feature.get("type")+"_"+feature.get("id"));
                if(the_overlay!=null && the_overlay!=undefined){
                    the_overlay.remove();
                }
                break;
            }
        }
    },
    getCenter:function (){
        return appMap.map.getView().getCenter();
    },
    setCenter:function (_lon,_lat){
        var center = ol.proj.fromLonLat([_lon,_lat], appMap.map.getView().getProjection(), 'EPSG:4326');
        appMap.map.getView().setCenter(center);
    },
    setFeatureStyle:function(_layerId,_featureId,_type,_style){
        var feature =null;
        var vectorType=globalconstant.layers[_layerId].get("vectorType");
        if(vectorType=='cluster'){
            feature=this.getClusterFeature(_layerId,_featureId);
        }else{
            feature=this.getFeature(_layerId,_featureId,_type);
        }
        var style=null;
        if(_style!==null && _style!=undefined){
            if(_style.icon!=null && _style.icon!=undefined){
                if(style==null){
                    style=new ol.style.Style();
                }
                style.setImage(new ol.style.Icon({src:globalconstant.imgUrl+_style.icon}))
            }
            if(_style.text!=null && _style.text!=undefined){
                if(style==null){
                    style=new ol.style.Style();
                }
                style.setText(new ol.style.Text({text:_style.text+""}))
                if(_style.textColor!=null && _style.textColor!=undefined){
                    style.getText().setFill(new  ol.style.Fill({color:_style.textColor}))
                }
            }
        }
        feature.setStyle(style);
    },
    setTipVisibleByType:function(type,visible){
        if(visible){
            $("div[tiptype='"+type+"']").parent().show();
        }else{
            $("div[tiptype='"+type+"']").parent().hide();
        }

    },
    getZoom:function (){
        return appMap.map.getView().getZoom();
    },
    setZoom:function(_zoom){
        appMap.map.getView().setZoom(_zoom);
    },
    getSource:function(_layerId){
        var vectorType=globalconstant.layers[_layerId].get("vectorType");
        if(vectorType=='cluster'){
            return globalconstant.layers[_layerId].getSource().getSource();
        }else{
           return globalconstant.layers[_layerId].getSource();
        }
    },
    getFeature:function(_layerId,_featureId,_type){
        var features=globalconstant.layers[_layerId].getSource().getFeatures();
        for(var i=0;i<features.length;i++){
            var id=features[i].get("id");
            var type=features[i].get("type");
            if(id==_featureId &&  _type==type){
                return features[i];
            }
        }
    },
    getClusterFeature:function(_layerId,_featureId){
        var  features=globalconstant.layers[_layerId].getSource().getFeatures();
        for(var i=0;i<features.length;i++){
           var ffs=features[i].get("features");
           var flag=false;
           for(var j=0;j<ffs.length;j++){
               var id=ffs[j].get("id");
               if(id==_featureId  ){
                   flag=true;
                   break;
               }
           }
           if(flag){
               return features[i];
           }
        }
    },
    createTip:function(coordinate,_data){
        var tipElement = document.createElement('div');
        if(_data ){
            if(_data.id){
                tipElement.id=_data.id;
            }
            if(_data.type!=null && _data.type!=undefined){
                tipElement.setAttribute("tiptype", _data.type);
            }
        }

        var tip= new ol.Overlay({
            element:tipElement
        });
        if(coordinate){
            tip.setPosition(coordinate);
        }
        appMap.map.addOverlay(tip);
        callback.createTipCallback(tip,_data);
        return tip;
    },
    transform:function(lon,lat){
        return ol.proj.transform([lon,lat], 'EPSG:4326', appMap.map.getView().getProjection())
    },
    toLonLat:function(coordinate){
        return ol.proj.toLonLat(coordinate,appMap.map.getView().getProjection())
    },
    pixelToLonlat:function(x,y){
        return  this.toLonLat(appMap.map.getCoordinateFromPixel([x,y]));
    },
    lonlatToPixel:function(lon,lat){
        return  appMap.map.getPixelFromCoordinate(this.transform(lon,lat));
    },
    geoJsonToFeature:function(geoJson){
        var geoGson=new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()});
        return geoGson.readFeature(geoJson);
    },
    getLineLength:function(points){
        var coordinates=[];
        for(var k=0;k<points.length;k++){
            coordinates.push(ol.proj.transform(points[k], 'EPSG:4326', appMap.map.getView().getProjection()));
        }
        return ol.Sphere.getLength(new ol.geom.LineString(coordinates))
    },
    animation:function(data){
        var coordinates=data.line;
        var points=[];
        for(var i=0;i<coordinates.length;i++){
            var  lon_lat=coordinates[i];
            points.push({lon:lon_lat[0],lat:lon_lat[1]});
        }
        pathPlugin.customPath(data.id,points, data.distance,data.showline,data.icon,data.endStatus,callback.animationCallback);
    },
    animationStop:function(_layerId,_id){
        pathPlugin.stop();
    },
    animationRemove:function(_layerId,_id){
        pathPlugin.remove();
    },
    parseGeoserverParam:function(geoType,param){
        var parseResult={
                         filter:null,//格式化后的查询条件
                         startIndex:undefined,//分页起始记录index
                         maxFeatures:undefined,
                         viewParams:''
                      };
        if(param!=undefined && param!=null && param !=""){
            var filterType=param.filterType;
            var propertyName=param.propertyName;
            if(filterType=='like'){
                var table_name="";
                var column_id="";
                if(geoType=='camera'){
                    table_name="e_camera";
                    column_id="CAMERA_ID";
                }else if(geoType=="poi"){
                     table_name="gis_poi"
                    column_id="ID"
                }
                var key_array=param.key.split(" ");//关键字切割后的数组
                var UNION_sql="";
                for(var i=0;i<key_array.length;i++){
                    if(key_array[i]!=""){
                        if(UNION_sql.length>0){
                            UNION_sql=UNION_sql+" UNION ALL ";
                        }
                        UNION_sql=UNION_sql+" select "+column_id+" from "+table_name+" where "+propertyName+" like '%"+key_array[i]+"%'";
                    }
                }
                if(UNION_sql.length>0){
                    var where="INNER JOIN (      "+
                        "          SELECT "+
                        "               t1."+column_id+" "+
                        "          FROM"+
                        "                         ( "+UNION_sql+
                        "                         ) t1"+
                        "          GROUP BY  t1."+column_id+
                        "          ORDER BY  count(t1."+column_id+") DESC "+
                        "     ) t2 ON t."+column_id+" = t2."+column_id;
                    parseResult.viewParams='where:'+where;
                }
            }else if(filterType=='within'){
                var  geometry=param.geometry;
                var polygon=null;
                if('circle'==geometry.type){//点周边
                    var circle=turf.circle(geometry.coordinates, geometry.radius, {units: 'meters'});//构造缓冲区边界
                    polygon=new ol.geom.Polygon(circle.geometry.coordinates);//通过缓冲区边界构造多边形
                }else if('line'==geometry.type){//线周边
                    var line=turf.lineString(geometry.coordinates,null);//构造线条
                    var buffer=turf.buffer(line,geometry.radius, {units: 'meters'});//构造线条缓冲区边界
                    polygon=new ol.geom.Polygon(buffer.geometry.coordinates);//通过缓冲区边界构造多边形
                }else if('polygon'==geometry.type){//多边形
                    polygon=new ol.geom.Polygon([geometry.coordinates]);//构造多边形
                }
                if(polygon!=null){
                    parseResult.filter=ol.format.filter.within('geom', polygon, 'urn:ogc:def:crs:EPSG::4326');
                }
            }
            if(!isNaN(param.pageNo)){//设置分页
                if(param.pageNo<1){
                    param.pageNo=1;//默认从第一页
                }
                if(!isNaN(param.pageSize)){
                    parseResult.maxFeatures=param.pageSize;
                }else{
                    parseResult.maxFeatures=20;//默认20条
                }

                parseResult.startIndex=(param.pageNo-1)*parseResult.maxFeatures;
            }
        }
        return parseResult;
    },
    queryGeoServerData:function(geoType,param){
         var paramResult=this.parseGeoserverParam(geoType,param);//格式化参数
         var featureRequest = new ol.format.WFS().writeGetFeature({
             srsName: 'urn:ogc:def:crs:EPSG::4326',
             featureNS: globalconstant.featureNS,    //命名空间
             featurePrefix: globalconstant.featurePrefix,               //工作区域
             featureTypes: [geoType],       //geo数据类型
             outputFormat: 'application/json',
             filter:paramResult.filter,
             startIndex:paramResult.startIndex,
             maxFeatures:paramResult.maxFeatures,
             viewParams:paramResult.viewParams
         });
         var _this=this;
         fetch(globalconstant.geoserverWfs, {
             method: 'POST',
             body: new XMLSerializer().serializeToString(featureRequest)
         }).then(function(response) {
             return response.json();
         }).then(function(json) {
             callback.queryGeoServerDataCallback(geoType,json);
         }).catch(function(e){
             console.log(e)
              alert("查询失败，请联系管理员！")
        });
    },
    showBaselayer:function(geoType,param){
        var _layerId=geoType;
        var filter=null;
         if(param!=null && param !=""){
             filter=callback.parseParamCallback(geoType,param);
         }
         var featureRequest = new ol.format.WFS().writeGetFeature({
             srsName: 'EPSG:4326',
             featureNS: globalconstant.featureNS,    //命名空间
             featurePrefix: globalconstant.featurePrefix,               //工作区域
             featureTypes: [geoType],       //图层名
             outputFormat: 'application/json',
             filter: filter    //todo 条件查询过滤
         });

         // then post the request and add the received features to a layer
         var _this=this;
         fetch(globalconstant.geoserverWfs, {
             method: 'POST',
             body: new XMLSerializer().serializeToString(featureRequest)
         }).then(function(response) {
             return response.json();
         }).then(function(json) {
               _this.getSource(_layerId).clear();
               _this.importData(json,_layerId);
               var geoJson=new ol.format.GeoJSON({defaultDataProjection:"EPSG:4326", featureProjection:appMap.map.getView().getProjection()});
               callback.showBaseLayerCallback(_layerId,geoJson.readFeatures(json));
         });
    },
    createDraw:function(id,_layerId,type) {
        var _this=this;
        var draw = new ol.interaction.Draw({
            source: _this.getSource(_layerId),
            type: type
        });
        globalconstant.draws[id]=draw;
        draw.on('drawend',function(event){
            callback.drawEndCallback(_layerId,event);
        } )
        appMap.map.addInteraction(draw);
    },
    createSelect:function(id,_layerIds,type){
        var condition =null;
        if('pointerMove'==type){
            condition=ol.events.condition.pointerMove;
        }else if('singleclick'==type) {
            condition=ol.events.condition.singleClick
        }else{
            condition=ol.events.condition.click
        }
        var layers=[];
        var layserId_array=_layerIds.split(",");
        for(var i=0;i<layserId_array.length;i++){
            layers.push(globalconstant.layers[layserId_array[i]])
        }
        var select = new ol.interaction.Select({
            condition:condition,
            layers:layers
        });
        globalconstant.selects[id]=select;
        appMap.map.addInteraction(select);
    }
}

