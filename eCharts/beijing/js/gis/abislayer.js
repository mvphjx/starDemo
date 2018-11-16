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

AbisLayer.alertLevel = {warn:0,ok:1,error:2,ask:3}
//0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
AbisLayer.layerPageType = {msg:0,page:1,iframe:2,load:3,tips:4}

//全局函数 临时兼容一下，ocx存在时的样式
function fixocx(index) {
    try{
        var layerocx1 = $("#layui-layerocx"+index);
        layerocx1.css("left",-6);
        var $parent = layerocx1.parent();
        layerocx1.width($parent.outerWidth(true))
        layerocx1.height($parent.outerHeight(true))
    }catch(e){

    }
}

