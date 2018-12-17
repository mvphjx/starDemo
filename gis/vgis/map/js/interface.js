/**
 * 业务系统需要提供如下接口
 * init()   return ==>{"mapUrl":"../demo/tile","imgUrl":"../images/","defaultLon":25,"defaultLat":13,"defaultlevel":15}
 * singleclickCallback(data)  param->data:'{id:'1',icon:'default.png', lon:119.93,lat:35.99,......}'
 * pointermoveCallback(data)  param->data:'{id:'1',icon:'default.png', lon:119.93,lat:35.99,......}'
 * moveendCallback (data)     param->data:'{id:'1',icon:'default.png', lon:119.93,lat:35.99,......}'
 * pointerdragCallback(feature, event)
 * animationCallback(feature, event)
 */

/**
 * 地图提供如下接口
 * createLayer(_layerId,_layerType);
 * showPoint(_data,_layerId)
 * showLine (_data,_layerId)
 * showData (_data,_layerId)
 * importData(_geoJsonData,_layerId)
 * exportData(_layerId)
 * clear(_layerId)
 * removeFeature (_featureId,_layerId)
 * setCenter(_lon,_lat)
 * setZoom(_zoom)
 **/

/**=====================================================地图提供的接口 start====================================================================*/
function mapInit(_options){
    if(_options!=null && _options!=undefined){
        mapTool.init(_options);
        return  JSON.stringify({success:true,status:1,messege:''});
    }else{
        return  JSON.stringify({success:false,status:2,messege:'请配置地图初始参数'});
    }
}
/**
* 创建图层
* @param  layerId
* @param  layerType 图层类型 heat：热力图 cluster聚合图层
* @param  _zIndex 图层显示级别
*/
function createLayer(_layerId,_layerType,_zIndex){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        mapTool.createLayer(_layerId,_layerType,_zIndex);
        return  JSON.stringify({success:true,status:1,messege:''});
    }else{
        return  JSON.stringify({success:false,status:2,messege:'该图层已经被占用！请重新命名'});
    }
}
/**
 * 创建tip弹出框
 */
function createTip(_data){
    var coordinate=mapTool.transform(_data.lon,_data.lat);
    return mapTool.createTip(coordinate,_data)
}

/**
 * 控制图层是否显示
 * @param {*} _layerId 
 * @param {*} _flag 
 */
function setLayerActive(_layerId,_flag){
    globalconstant.layers[_layerId].setVisible(_flag);
}
/**
 * 控制图层显示级别
 * @param {*} _layerId
 * @param {*} _zIndex
 */
function setLayerZIndex(_layerId,_zIndex){
    globalconstant.layers[_layerId].setZIndex(_zIndex) ;
}
/**
 * 控制draw是否激活
 * @param {*} _layerId
 * @param {*} _flag
 */
function setDrawActive(_id,_flag){
    globalconstant.draws[_id].setActive(_flag);
}
/**
 * 显示点位数据
 * @param _data  点位数据
 * @param _layerId 图层id
 */
function showPoint(_data,_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.showPoint(_data,_layerId);
        return   JSON.stringify({success:true,status:1,messege:''});
    }
}

/**
 * 显示线数据
 * @param _data  线数据
 * @param layerId 图层id
 */
function showLine (_data,_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.showLine(_data,_layerId);
        return JSON.stringify( {success:true,status:1,messege:''});
    }
}

/**
 * 显示线数据
 * @param _data  线数据
 * @param layerId 图层id
 */
function showPolygon (_data,_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.showPolygon(_data,_layerId);
        return JSON.stringify( {success:true,status:1,messege:''});
    }
}

/**
 * 显示数据
 * @param _data  数据
 * @param _layerId 图层id
 */
function showData (_data,_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.showData(_data,_layerId);
        return JSON.stringify(  {success:true,status:1,messege:''});
    }
}

/**
 * 导入数据
 * @param _geoJsonData
 * @param _layerId
 */
function importData(_geoJsonData,_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.importData(_geoJsonData,_layerId);
        return  JSON.stringify( {success:true,status:1,messege:''});
    }
}
/**
 * 导出数据
 * @param layerId
 */
function exportData(_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        return mapTool.exportData(_layerId);
    }
}

/**
 * 清除图层元素
 * @param layerId
 */
function clear(_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.clear(_layerId);
        return JSON.stringify(  {success:true,status:1,messege:''});
    }
}

/**
 * 删除指定图层的特定元素
 * @param _featureId
 * @param _layerId
 */
function removeFeature (_featureId,_layerId){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else {
        mapTool.removeFeature(_featureId,_layerId);
        return JSON.stringify( {success:true,status:1,messege:''});
    }
}

/**
 * 设置地图中心点
 * @param _lon
 * @param _lat
 */
function setCenter(_lon,_lat){
    if(!isNaN(parseFloat(_lon)) && isFinite(_lon)   && !isNaN(parseFloat(_lat)) && isFinite(_lat) ){
        mapTool.setCenter(_lon,_lat);
        return JSON.stringify( {success:true,status:1,messege:''});
    }else{
        return JSON.stringify({success:false,status:2,messege:'经纬度数据不是数字'});
    }
}
/**
 * 设置地图中心点
 * @param _lon
 * @param _lat
 */
function getCenter(){
        return mapTool.toLonLat(mapTool.getCenter())
}
/**
 * 获取地图级别
 * @param _zoom
 */
function getZoom(){
    return  mapTool.getZoom()
}
/**
 * 设置地图级别
 * @param _zoom
 */
function setZoom(_zoom){
    if(!isNaN(parseFloat(_zoom)) && isFinite(_zoom)){
        mapTool.setZoom(_zoom);
        return JSON.stringify( {success:true,status:1,messege:''});
    }else{
        return JSON.stringify({success:false,status:2,messege:'地图级别不是数字'});
    }
}
function setFeatureStyle(_layerId,_featureId,_type,_style){
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.setFeatureStyle(_layerId,_featureId,_type,_style);
        return JSON.stringify( {success:true,status:1,messege:''});
    }
}
function setTipVisibleByType(type,visible){
    mapTool.setTipVisibleByType(type,visible);
    return JSON.stringify( {success:true,status:1,messege:''});
};
/**
 * 动画
 * @param {*} data 
 */
function animation(data){
    if(data!=null && data!=undefined){
        mapTool.animation(data);
        return JSON.stringify( {success:true,status:1,messege:''});
    }else{
        return JSON.stringify({success:false,status:2,messege:'动画数据错误'});
    }
}
/**
 * 动画暂停
 * @param {*} data 
 */
function animationStop(data){
    mapTool.animationStop(null,null);
    // if(data!=null && data!=undefined){
    //     return JSON.stringify( {success:true,status:1,messege:''});
    // }else{
    //     return JSON.stringify({success:false,status:2,messege:'动画数据错误'});
    // }
}

/**
 * 动画移除
 * @param {*} data 
 */
function animationRemove(data){
    mapTool.animationRemove();
    // if(data!=null && data!=undefined){
    //     return JSON.stringify( {success:true,status:1,messege:''});
    // }else{
    //     return JSON.stringify({success:false,status:2,messege:'动画数据错误'});
    // }
}
/**
 * 测点位距
 * @param data 两个点位的数组
 * @returns {*}
 */
function getDistance(data){
    if(data!=null && data!=undefined){
        return mapTool.getLineLength(data);
    }else{
        return JSON.stringify({success:false,status:2,messege:'点位数据错误'});
    }
}
/**
 * 线条长度
 * @param {*} data 
 */
function getLineLength(data){
    if(data!=null && data!=undefined){
        return mapTool.getLineLength(data);
    }else{
        return JSON.stringify({success:false,status:2,messege:'点位数据错误'});
    }
}
/**
  屏幕坐标转经纬度
 */
function pixelToLonlat(x,y){
    if(x!=null && y!=null){
        return mapTool.pixelToLonlat(x,y);
    }else{
        return JSON.stringify({success:false,status:2,messege:'屏幕坐标数据错误'});
    }
}
/**
 经纬度转屏幕坐标
 */
function lonlatToPixel(lon,lat){
    if(lon!=null && lon!=null){
        return mapTool.lonlatToPixel(lon,lat);
    }else{
        return JSON.stringify({success:false,status:2,messege:'经纬度坐标数据错误'});
    }
}
function toLonLat(lon,lat){
    return mapTool.toLonLat([lon,lat]);
}
function queryGeoServerData(geoType,param){
    mapTool.queryGeoServerData(geoType,param)
    return JSON.stringify(  {success:true,status:1,messege:''});
}
/**
  显示基本图层（摄像头，案件，兴趣点，警力等地图自带图层）
 */
function showBaselayer(geoType,param){
    var _layerId=geoType;
    if(globalconstant.layers[_layerId]==null || globalconstant.layers[_layerId]==undefined){
        return  JSON.stringify({success:false,status:2,messege:'该图层不存在！'});
    }else{
        mapTool.showBaselayer(geoType,param)
        return JSON.stringify(  {success:true,status:1,messege:''});
    }
}
/**
  控制地图工具条是否显示
 */
function setToolBarVisable(flag){
    if(flag){
        toolBoxObj.show()
    }else{
        toolBoxObj.hide()
    }
    return JSON.stringify(  {success:true,status:1,messege:''});
}
function setSearchBoxVisable(flag){
    if(flag){
        searchBoxObj.show()
    }else{
        searchBoxObj.hide()
    }
    return JSON.stringify(  {success:true,status:1,messege:''});
}
/**
  创建地图交互对象
  type:'Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon' or 'Circle'
 */
function createDraw(id,_layerId,type){
    if(globalconstant.draws[id]!=null &&  globalconstant.draws[id]!=undefined){
        return  JSON.stringify({success:false,status:2,messege:'该交互对象已经存在，请重新命名！'});
    }else{
        mapTool.createDraw(id,_layerId,type);
        return JSON.stringify(  {success:true,status:1,messege:''});
    }
}

/**
 创建地图选择对象
  type: 'singleClick','pointerMove','click'
 */
function createSelect(id,_layerId,type){
    if(globalconstant.selects[id]!=null && globalconstant.selects[id]!=undefined){
        return  JSON.stringify({success:false,status:2,messege:'该选择集合对象已经存在，请重新命名！'});
    }else{
        mapTool.createSelect(id,_layerId,type);
        return JSON.stringify(  {success:true,status:1,messege:''});
    }
}
/**=====================================================地图提供的接口 end====================================================================*/