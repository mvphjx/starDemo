var Class = function(setings) {
	var that = this;
	that.index = 0; // ++layer.index;
	that.config = $.extend({}, that.config, setings);
};
Class.pt = Class.prototype;
//默认配置
Class.pt.config = {
	resize: true,
	resizing:function(){},
	resized:function(){}
};
//拖拽层
Class.pt.move = function() {
	var that = this,
		config = that.config,
		_DOC = $(document),
		resizeElem = $(window.frames["layui-layer-iframe1"].document).find('.layui-layer-resize'),
		_Iframe = $('#layui-layer-iframe1'),
		_Iframe_DOC = $(window.frames["layui-layer-iframe1"].document),
		dict = {};
	resizeElem.on('mousedown', function(e) {
		e.preventDefault();
		dict.resizeStart = true;
		dict.offset = [e.clientX, e.clientY];
		dict.area = [
			_Iframe_DOC.outerWidth(), _Iframe_DOC.outerHeight()
		];
	}).on('mouseup', function(e) {
		if(dict.resizeStart) {
			delete dict.resizeStart;
		}
	});
	_DOC.on('mousemove', function(e) {
		//Resize
		if(config.resize && dict.resizeStart) {
			var X = e.clientX - dict.offset[0],
				Y = e.clientY - dict.offset[1];
			e.preventDefault();
			resize({
				width: dict.area[0] + X,
				height: dict.area[1] + Y
			})
			dict.isResize = true;
			config.resizing && config.resizing(_Iframe_DOC);
		}
	}).on('mouseup', function(e) {
		if(dict.resizeStart) {
			delete dict.resizeStart;
		}
	});
	_Iframe_DOC.on('mousemove', function(e) {
		//Resize
		if(config.resize && dict.resizeStart) {
			var X = e.clientX - dict.offset[0],
				Y = e.clientY - dict.offset[1];
			e.preventDefault();
			resize({
				width: dict.area[0] + X,
				height: dict.area[1] + Y
			})
			dict.isResize = true;
			config.resizing && config.resizing(_Iframe_DOC);
		}
	}).on('mouseup', function(e) {
		if(dict.resizeStart) {
			delete dict.resizeStart;
		}
	});

	function resize(csstyle) {
		_Iframe.css(csstyle);
	}
	return that;
};