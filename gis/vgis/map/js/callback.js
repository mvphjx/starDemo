/**
 * 这是个事件回调抽象对象，具体实现在各个业务工程包内callbackImp.js
 */
var callback={
      /**
      * 创建图层回调
      */
      createVectorCallback :function (_layerId) {},
      /**
       * 创建feature回调
       */
      createFeatureCallback :function (feature,tip) { },
      /**
       * 创建线条回调
       */
      createLineCallback:function(feature){},
	  /**
       * 创建Tip回调
       */
      createTipCallback:function(feature){},

    /**
     * 创建Select回调
     */
      createSelectCallback:function(feature){},
      /**
       * 显示数据回调
       */
      showDataCallback:function(feature){},

      parseParamCallback:function(_layerId,param){},

      queryGeoServerDataCallback:function(geoType,data){},
      /**
       * 显示基本图层数据回调
      */
      showBaseLayerCallback:function(layerName,features){},
      /**
         * 单击回调业务系统函数
         * @param feature
         */
      singleclickCallback :function (feature, event) {
          if(feature!=null && feature.get("modify")){//判断该点是不是可以编辑
              appMap.select.setActive(true);
          }else{
              appMap.select.setActive(false);
          }
      },
      /**
       * 鼠标移动回调业务系统函数
       * @param feature
       */
      pointermoveCallback :function (feature, event) { },
     /**
       * 地图移动回调业务系统函数
       * @param feature
       */
       moveendCallback :function (center, zoom, event) { },
      /**
       * 双击回调业务系统函数
       * @param feature
       */
      dblclickCallback :function (feature, event) {},
      /**
       * 拖拽回调
       */
      pointerdragCallback :function (feature, event) {},
      /**
       * 动画回调
       */
      animationCallback :function (name, slef, status) {},

       /**
       * 元素开始修改回调
       */
      modifyStartCallback:function(feature, event){},
       /**
       * 元素修改完成回调
       */
      modifyEndCallback:function(feature, event){},
     /**
     * 绘画结束
     */
     drawEndCallback:function(_layerId,event){}
}