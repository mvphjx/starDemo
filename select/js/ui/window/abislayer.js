AbisLayer.prototype.dialogId = null;
AbisLayer.prototype.delay = 500;
AbisLayer.prototype.setting = null;

/**
 * 按照自己业务  封装一下layer 控件
 * TODO 主要解决 项目字段的iframe 弹出控件 不好用的问题
 * 
 * 
 * @param {Object} id
 * @param {Object} setting
 * {
 * 	title:"text",
 *  icon:"path",
 * 	page:"path",
 * 	showCtrl:false, 是否显示底部工具栏（确定和取消按钮）
 * 	button:{},
 * 	initData:{}
 * 	call:{init:"函数名",get:"函数名",set:"函数名",...}
 * 	callBack:{ok:"funcName",cancel:"funcName",...}
 * }
 */
function AbisLayer(id, setting)
{
	//demo
	layer.open({
	    type: 2,
	    title: param.title,
	    maxmin: true,
	    area: ['800px', '500px'],
	    content: WebVar.VarPath + "/webwindow/open?page=" + setting.page + "&showCtrl=" + setting.showCtrl,
	    end: function(){
	      layer.tips('Hi', '#about', {tips: 1})
	    }
	});
}

