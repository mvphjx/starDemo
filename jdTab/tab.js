	/*
	 * wrap 为整个导航节点
	 * li   为一级导航节点
	 * sub  为二级导航节点
	 * 
	 * 1鼠标进入导航区，显示二级节点，离开隐藏二级菜单
	 * 2在一级导航区 根据鼠标行为判断  是否要切换一级菜单
	 *  
	 */
$(document).ready(function() {
	var delayTime = 400;
	var sub = $("#sub");
	var activeRow, activeMenu;//业务中的 当前菜单

	var timer;

	var mouseInSub = false;
	sub.on("mouseenter",
		function() {
			mouseInSub = true;
		}).on("mouseleave",
		function() {
			mouseInSub = false;
		});

	var mouseTrach = [];
	var moveHandler = function(e) {
		mouseTrach.push({
			x: e.pageX,
			y: e.pageY
		});
		if(mouseTrach.length > 3) {
			mouseTrach.shift();//shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
		}
	};
//不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件
//只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件
	$("#wrap").on("mouseenter",
		function() {
			sub.removeClass("none");
			$(document).bind("mousemove", moveHandler);
		}).on("mouseleave",
		function() {
			sub.addClass("none");

			if(activeRow) {
				activeRow.removeClass("active");
				activeRow = null;
			}
			if(activeMenu) {
				activeMenu.addClass("none");
				activeMenu = null;
			}

			$(document).unbind("mousemove", moveHandler);
		}).on("mouseenter", "li",
		//对一级导航 进行用户行为预测
		function(e) {
			if(!activeRow) {
				activeRow = $(e.target).addClass("active");
				activeMenu = $("#" + activeRow.data("id"));
				activeMenu.removeClass("none");
			}
			if(timer) {
				clearTimeout(timer);
			}

			var curMouse = mouseTrach[mouseTrach.length - 1];
			var prevMouse = mouseTrach[mouseTrach.length - 2];
			//console.log(curMouse, prevMouse);
			var delay = needDelay(sub, curMouse, prevMouse);

			if(delay) {
				timer = setTimeout(function() {
						if(mouseInSub) {
							return
						}
						var prevActiveRow = activeRow;
						var prevActiveMenu = activeMenu;
						var nowActiveRow = $(e.target);//事件中的当前菜单
						var nowActiveMenu = $("#" + nowActiveRow.data("id"));
						changeMenu(prevActiveRow,prevActiveMenu,nowActiveRow,nowActiveMenu)
						timer = null;
					},
					delayTime);
			} else {
				var prevActiveRow = activeRow;
				console.log("prevActiveRow："+activeRow.data("id"));
				var prevActiveMenu = activeMenu;
				var nowActiveRow = $(e.target);
				var nowActiveMenu = $("#" + nowActiveRow.data("id"));
				console.log(nowActiveRow.data("id"))
				changeMenu(prevActiveRow,prevActiveMenu,nowActiveRow,nowActiveMenu)
			}
			function changeMenu(prevActiveRow,prevActiveMenu,nowActiveRow,nowActiveMenu){
				prevActiveRow.removeClass("active");
				prevActiveMenu.addClass("none");
				nowActiveRow.addClass("active");
				nowActiveMenu.removeClass("none");
				activeRow = nowActiveRow;
				activeMenu = nowActiveMenu;
			}
		});

});
/*
 * 根据用户鼠标运动轨迹
 *   下一个点 是否在    当前点，上边框，下边框所构成的三角形内
 * 判断是否需要 更换一级导航
 */
function needDelay(ele, curMouse, prevMouse) {
	if(!curMouse || !prevMouse) {
		return
	}
	var offset = ele.offset();

	var topleft = {
		x: offset.left,
		y: offset.top
	};
	var leftbottom = {
		x: offset.left,
		y: offset.top + ele.height()
	};

	return isPoint(curMouse, prevMouse, topleft, leftbottom);
	function isPoint(p, a, b, c) {
		var pa = vector(p, a);
		var pb = vector(p, b);
		var pc = vector(p, c);

		var t1 = vectorPro(pa, pb);
		var t2 = vectorPro(pb, pc);
		var t3 = vectorPro(pc, pa);

		return sameSign(t1, t2) && sameSign(t2, t3);
	}
	function vector(a, b) {
		return {
			x: b.x - a.x,
			y: b.y - a.y
		}
	}

	function vectorPro(v1, v2) {
		return v1.x * v2.y - v1.y * v2.x;
	}

	function sameSign(a, b) {
		return(a ^ b) >= 0;
	}


}