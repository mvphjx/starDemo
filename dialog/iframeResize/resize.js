var ready;
var layer = {}
	//设定层的样式
layer.style = function(index, options, limit) {
	if(!limit) {
		if(parseFloat(options.width) <= 260) {
			options.width = 260;
		};

		if(parseFloat(options.height) - 0 - 0 <= 64) {
			options.height = 64 + 0 + 0;
		};
	}
	layero = $('#layui-layer-iframe1');
	layero.css(options);
	btnHeight = 0;

	layero.find('iframe').css({
		height: parseFloat(options.height) - 0 - btnHeight
	});
};

var Class = function(setings) {
	var that = this;
	that.index = 0; // ++layer.index;
	that.config = $.extend({}, that.config, setings);
	document.body ? that.creat() : setTimeout(function() {
		that.creat();
	}, 30);
	that.layero = $('#layui-layer-iframe1');
};
Class.pt = Class.prototype;
//默认配置
Class.pt.config = {
	type: 0,
	shade: 0.3,
	fixed: true,
	move: null,
	title: '&#x4FE1;&#x606F;',
	offset: 'auto',
	area: 'auto',
	closeBtn: 1,
	time: 0, //0表示不自动关闭
	zIndex: 19891014,
	maxWidth: 360,
	anim: 0,
	isOutAnim: true,
	icon: -1,
	moveType: 1,
	resize: true,
	scrollbar: true, //是否允许浏览器滚动条
	tips: 2
};
//拖拽层
Class.pt.move = function() {
	var that = this,
		config = that.config,
		_DOC = $(document),
		layero = that.layero,
		moveElem = layero.find(config.move),
		resizeElem = $(window.frames["layui-layer-iframe1"].document).find('.layui-layer-resize'),
		_IDOC = $(window.frames["layui-layer-iframe1"].document),
		dict = {};

	if(config.move) {
		moveElem.css('cursor', 'move');
	}

	moveElem.on('mousedown', function(e) {
		e.preventDefault();
		if(config.move) {
			dict.moveStart = true;
			dict.offset = [
				e.clientX - parseFloat(layero.css('left')), e.clientY - parseFloat(layero.css('top'))
			];
			ready.moveElem.css('cursor', 'move').show();
		}
	});

	resizeElem.on('mousedown', function(e) {
		e.preventDefault();
		dict.resizeStart = true;
		dict.offset = [e.clientX, e.clientY];
		dict.area = [
			layero.outerWidth(), layero.outerHeight()
		];
		//ready.moveElem.css('cursor', 'se-resize').show();
	}).on('mouseup', function(e) {
		if(dict.moveStart) {
			delete dict.moveStart;
			ready.moveElem.hide();
			config.moveEnd && config.moveEnd(layero);
		}
		if(dict.resizeStart) {
			delete dict.resizeStart;
		}
	});

	_DOC.on('mousemove', function(e) {

		//拖拽移动
		if(dict.moveStart) {
			var X = e.clientX - dict.offset[0],
				Y = e.clientY - dict.offset[1],
				fixed = layero.css('position') === 'fixed';

			e.preventDefault();

			dict.stX = fixed ? 0 : win.scrollLeft();
			dict.stY = fixed ? 0 : win.scrollTop();

			//控制元素不被拖出窗口外
			if(!config.moveOut) {
				var setRig = win.width() - layero.outerWidth() + dict.stX,
					setBot = win.height() - layero.outerHeight() + dict.stY;
				X < dict.stX && (X = dict.stX);
				X > setRig && (X = setRig);
				Y < dict.stY && (Y = dict.stY);
				Y > setBot && (Y = setBot);
			}

			layero.css({
				left: X,
				top: Y
			});
		}

		//Resize
		if(config.resize && dict.resizeStart) {
			var X = e.clientX - dict.offset[0],
				Y = e.clientY - dict.offset[1];
			e.preventDefault();

			layer.style(that.index, {
				width: dict.area[0] + X,
				height: dict.area[1] + Y
			})
			console.log(X,Y)
			dict.isResize = true;
			config.resizing && config.resizing(layero);
		}
	}).on('mouseup', function(e) {
		if(dict.moveStart) {
			delete dict.moveStart;
			ready.moveElem.hide();
			config.moveEnd && config.moveEnd(layero);
		}
		if(dict.resizeStart) {
			delete dict.resizeStart;
			ready.moveElem.hide();
		}
	});
	_IDOC.on('mousemove', function(e) {

		//拖拽移动
		if(dict.moveStart) {
			var X = e.clientX - dict.offset[0],
				Y = e.clientY - dict.offset[1],
				fixed = layero.css('position') === 'fixed';

			e.preventDefault();

			dict.stX = fixed ? 0 : win.scrollLeft();
			dict.stY = fixed ? 0 : win.scrollTop();

			//控制元素不被拖出窗口外
			if(!config.moveOut) {
				var setRig = win.width() - layero.outerWidth() + dict.stX,
					setBot = win.height() - layero.outerHeight() + dict.stY;
				X < dict.stX && (X = dict.stX);
				X > setRig && (X = setRig);
				Y < dict.stY && (Y = dict.stY);
				Y > setBot && (Y = setBot);
			}

			layero.css({
				left: X,
				top: Y
			});
		}

		//Resize
		if(config.resize && dict.resizeStart) {
			var X = e.clientX - dict.offset[0],
				Y = e.clientY - dict.offset[1];
			e.preventDefault();

			layer.style(that.index, {
				width: dict.area[0] + X,
				height: dict.area[1] + Y
			})
			console.log(X,Y)
			dict.isResize = true;
			config.resizing && config.resizing(layero);
		}
	}).on('mouseup', function(e) {
		if(dict.moveStart) {
			delete dict.moveStart;
			ready.moveElem.hide();
			config.moveEnd && config.moveEnd(layero);
		}
		if(dict.resizeStart) {
			delete dict.resizeStart;
			ready.moveElem.hide();
		}
	});
	

	return that;
};
Class.pt.layero = {};
//创建骨架
Class.pt.creat = function() {
	var that = this,
		config = that.config,
		times = that.index,
		nodeIndex, content = config.content,
		conType = typeof content === 'object',
		body = $('body');

	if(config.id && $('#' + config.id)[0]) return;

	if(typeof config.area === 'string') {
		config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
	}

	//anim兼容旧版shift
	if(config.shift) {
		config.anim = config.shift;
	}

};