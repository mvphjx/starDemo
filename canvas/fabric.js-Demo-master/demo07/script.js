var canvas = new fabric.Canvas('canvas');
var color1 = new fabric.Color("#f55");
var color2 = new fabric.Color("#123525");
var color3 = new fabric.Color("123525");
var color4 = new fabric.Color('rgb(100,0,100)');
var color5 = new fabric.Color('rgba(10,20,30,0.5)');

var color6 =color1.toRgb();
var color7 =color5.toHex();
var color8 = color1.overlayWith(color2).toRgb();
console.log(color6);
console.log(color7);
var rect =  new fabric.Rect({
    left:100,
    top:100,
    width:100,
    height:100,
    fill:color8
});
canvas.add(rect);

