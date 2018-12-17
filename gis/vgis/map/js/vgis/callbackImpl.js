/**
 * 这是个地图各种回调实现  覆盖callback 的方法
 */
var callbackImpl = callback;
callbackImpl.parseParamCallback = function (layerName,param) {
    if (layerName=='camera') {//摄像头图层查询过滤器
        return ol.format.filter.like('title', "*"+param+"*");
    }else{
        return null;
    }
}
callbackImpl.createVectorCallback = function (_layerId) {
    if (custormStyle.layer[_layerId]) {
        custormStyle.layer[_layerId]();//设置该图层样式
    }
};

callbackImpl.modifyEndCallback = function (feature, event) {
    if (feature != null) {
        var cds=feature.getGeometry().getCoordinates();
        if('tagPoint'==feature.get("type")){
            var data={type:'tagPoint',data:mapTool.toLonLat(cds)};
            parent.postMessage(data,window.fromOrigin);
            appMap.select.getFeatures().remove(feature);
        }

    }
}
callbackImpl.drawEndCallback = function (_layerId, event) {
    if('orgGridDrawLayer'==_layerId){
        var lon_lat_array=[];
        event.feature.getGeometry().getCoordinates()[0].forEach(function(item){
            var lon_lat=mapTool.toLonLat(item);
            lon_lat_array.push(lon_lat);
        })
        var data={type:'orgGridData',data:lon_lat_array};
        parent.postMessage(data,window.fromOrigin);
    }else if('userGridDrawLayer'==_layerId){
        var lon_lat_array=[];
        event.feature.getGeometry().getCoordinates()[0].forEach(function(item){
            var lon_lat=mapTool.toLonLat(item);
            lon_lat_array.push(lon_lat);
        })
        var data={type:'userGridData',data:lon_lat_array};
        parent.postMessage(data,window.fromOrigin);
    }
}