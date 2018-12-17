/**
 * 这是个地图各种回调实现  覆盖callback 的方法
 */
var callbackImpl = callback;

callbackImpl.createVectorCallback = function (_layerId) {
    if (custormStyle.layer[_layerId]) {
        custormStyle.layer[_layerId]();//设置该图层样式
    }
};
callbackImpl.createFeatureCallback = function (feature, tip) {
    var type = feature.get("type");
    if (type) {
        if (custormStyle.feature[type]) {
            custormStyle.feature[type]();//设置该类型的元素样式
        }
        if (tip) {
            if(type=='caseObject'){
                custormStyle.tip.caseObjectDetail(feature, tip)
            }else{
                custormStyle.tip[type](feature, tip);//填充该类型的元素泡泡
            }
        }
    }

};
/**
 * 单击回调业务系统函数
 * @param feature
 */
callbackImpl.singleclickCallback = function (feature, event) {
    if (feature != null) {
        if(feature.get("modify")){//判断该点是不是可以编辑
            appMap.select.setActive(true);
        }else{
            appMap.select.setActive(false);
        }
        var data = feature.getProperties();
        var coordinate = data.geometry.getLastCoordinate();
        delete data.geometry;
        data.position = event.pixel;
        var type = feature.get("type");
        if(type){
            if (feature.get("features") ) {//聚合
                if(feature.get("features").length == 1){//聚合完全展开
                    if (type == 'camera') {
                        custormStyle.tip.cameraControl(data.features[0], controlTip);
                        controlTip.setPosition(coordinate);
                    }
                }else{//聚合非完全展开
               }
              }else{//非聚合 
                    if (type == 'case'  || type == 'caseCamera' || type == 'video' || type == 'caseObject' || type == 'selfCaseCamera') {
                      custormStyle.tip[type+"Control"](feature, controlTip);
                      controlTip.setPosition(event.coordinate); 
                    }
             }
        }else{
           // controlTip.setPosition(undefined)
        } 
    }
};
/**
 * 创建tip回调
 */
callbackImpl.createTipCallback = function (tip, _data) {
    if (_data) {
        var type = _data.type;
        if (custormStyle.tip[type]) {
            custormStyle.tip[type](_data, tip);
        }
    }

};
/**
 * 鼠标移动回调业务系统函数
 * @param feature
 */
callbackImpl.pointermoveCallback = function (feature, event) {
    //window.VisMapJsInteract.pointermoveCallback(JSON.stringify(feature.getProperties()));
},
    /**
     * 地图移动回调业务系统函数
     * @param feature
     */
    callbackImpl.moveendCallback = function (center, zoom, event) {
        console.log(center, zoom, event)
        //window.VisMapJsInteract.moveendCallback(JSON.stringify({center:center,zoom:zoom}));
    }
/**
 * 双击回调业务系统函数
 * @param feature
 */
callbackImpl.dblclickCallback = function (feature, event) {
    var type = feature.get("type");
    if(type){
        if (feature.get("features")==null ||  feature.get("features")==undefined  || feature.get("features").length==1) {//非聚合 
            if (type == 'camera'){
                //custormStyle.tip['cameraDetail'](feature, detailTip);
                //detailTip.setPosition(feature.getGeometry().getLastCoordinate());
            }
         }
    } 
    //window.VisMapJsInteract.dblclickCallback(JSON.stringify(feature.getProperties()));
}
/**
 * 地图拖拽回调事件
 */
callbackImpl.pointerdragCallback = function (feature, event) {
    if (feature != null) {
        var data = feature.getProperties();
        delete data.geometry;
        data.position = event.pixel;
        //window.VisMapJsInteract.pointerdragCallback(JSON.stringify(data));
    }
}
callbackImpl.modifyStartCallback = function (feature, event) {
  if (feature != null) {
     // console.log(feature.getGeometry().getCoordinates());
  }
}
/**
 * 地图元素修改完成回调事件
 */
callbackImpl.modifyEndCallback = function (feature, event) {
  if (feature != null) {
    var cds=feature.getGeometry().getCoordinates();
    var coordinates=[];
    cds.forEach(function (item,index,input) {
      coordinates.push(mapTool.toLonLat(item));
    })
    feature.set("coordinates",coordinates);
    var data = feature.getProperties();
        delete data.geometry;
    if(feature.getGeometry() instanceof   ol.geom.LineString){
      data.lineLength=ol.Sphere.getLength(feature.getGeometry());
    }
    //window.VisMapJsInteract.modifyEndCallback(JSON.stringify(data));
  }
}
/**
 * 动画完成回调
 */
callbackImpl.animationCallback = function (id, slef, status) {
    console.log(id, slef, status)
    //window.VisMapJsInteract.animationCallback(id);
}
callbackImpl.queryGeoServerDataCallback=function(geoType,data){
    var _layerId=geoType;
     clear(_layerId);
     importData(data,_layerId);
     ulDetailsObj.renderData(_layerId,data);
}