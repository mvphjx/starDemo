/**
 * 画圆菜单
 */
window.menucircle = {};
var menucircle = window.menucircle;

menucircle.popupCircle = new ol.Overlay({
    element: document.getElementById('popupmenucircle')
  });
appMap.map.addOverlay(menucircle.popupCircle);

menucircle.show = function(coordinate){
	if (coordinate==null){
		menucircle.popupCircle.setPosition(undefined);
		return null;
	}
	menucircle.popupCircle.setPosition(coordinate);
	var size = $(".menu-items > a").size();
	//alert(size);
	var angle = (2*Math.PI / 360) * 360/size; // 每度角的大小
	var semidiameter = 35; //半径
	var pianyi = 12;
	
	$(".menu-items > a").each(function(i,y){
		var hudu = angle *i; //angle *times;
		//console.log(x);
		var offset = $(".menu-circle").offset();
		//console.log(offset.top);
		//console.log(offset.left);
		//console.log(offset)
		//圆中心坐标
		var x = $(".menu-circle").width()/2+offset.top-pianyi;
		var y = $(".menu-circle").height()/2+offset.left-pianyi;
		
		var top = x + (Math.sin(hudu) * semidiameter);
	    var left = y - (Math.cos(hudu) * semidiameter);    //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
	    //console.log(top, left);
	    $(this).offset({top: top, left: left});
	});
}