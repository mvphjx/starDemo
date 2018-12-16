/**
 * 全局常量
 */
window.globalconstant = {};
var globalconstant = window.globalconstant;
//地图默认标识
globalconstant.target = "map";
//聚合图层样式缓存
globalconstant.clusterStyleCache={}

//地图自定义图层集合对象
globalconstant.layers ={};

//地图自定义交互集合对象
globalconstant.draws ={};

//地图自定义选择集合对象
globalconstant.selects ={};

//地图自定义插件集合对象
globalconstant.plugin = new Array();

globalconstant.imgUrl="../../images/";//图标地址
globalconstant.featureNS='http://www.visystem.cn/';   //geoserver命名空间
globalconstant.featurePrefix= 'vgisNew'        //geoserver工作空间

//地图网格化填充颜色
globalconstant.gridFillColor =['rgba(142,105,125,0.8)','rgba(205,130,80,0.8)','rgba(222,85,40,0.8)','rgba(232,140,80,0.8)','rgba(137,160,75,0.8)','rgba(242,170,95,0.8)','rgba(186,120,5,0.8)'];
//区域网格配置
globalconstant.qyGridConfig=[{
								name:'分局/区',
								level:1,          //对应的数据库的数据级别标志    例如：数据库中"level=1"的是分局数据
								zoomScope:[1,5]   //该网格在多大地图级别范围显示  例如：地图1~5级显示分局网格
							},
							{
								name:'派出所/街道',
								level:2,        //例如：数据库中"level=2"的是派出所数据
								zoomScope:[6,6] //例如：地图6~6级显示分局网格
							}]
//===================插件================================

//=======定义插件对象================================
function MapPlugin(){}

/**
*停止事件
*调用每个插件方法前停止其它插件的事件
*/
MapPlugin.prototype.stopEvent = function(){}

/**
 * 鼠标移动到feature上
 * @param feature 组件
 * @param event 事件
 * 
 */
MapPlugin.prototype.pointermove = function(feature, event){}

/**
*点击事件
*coordinate 坐标
*feature 
*/
MapPlugin.prototype.singleclick = function(feature, event){}

/**
*缩放移动图层事件
*@param center 中心坐标
*@param zoom 层
*@param event 事件
*/
MapPlugin.prototype.moveend = function(center, zoom, event){}


/**
 * 清空所有的
 */
MapPlugin.prototype.clearAll = function(){}


globalconstant.stopEvent = function(){
	for (var i=0;i<globalconstant.plugin.length;i++){
		globalconstant.plugin[i].stopEvent();
	}
}

globalconstant.pointermove = function(feature, event){
	for (var i=0;i<globalconstant.plugin.length;i++){
		globalconstant.plugin[i].pointermove(feature, event);
	}	
}


globalconstant.singleclick = function(feature, event){
	for (var i=0;i<globalconstant.plugin.length;i++){
		globalconstant.plugin[i].singleclick(feature, event);
	}
}

/**
 * 双击
 *coordinate 坐标
 *feature
 */
globalconstant.dblclick = function(feature, event){
	for (var i=0;i<globalconstant.plugin.length;i++){
		globalconstant.plugin[i].dblclick(feature, event);
	}
}


globalconstant.moveend = function(center, zoom, event){
	for (var i=0;i<globalconstant.plugin.length;i++){
		globalconstant.plugin[i].moveend(center, zoom, event);
	}
}


globalconstant.clearAll = function(){
	for (var i=0;i<globalconstant.plugin.length;i++){
		globalconstant.plugin[i].stopEvent();
		globalconstant.plugin[i].clearAll();
	}
}
/**
 * 获取插件
 */
globalconstant.getPlugin = function(id){
	for (var i=0;i<globalconstant.plugin.length;i++){
		if (globalconstant.plugin[i].id==id){
			return globalconstant.plugin[i];
		}
	}
}