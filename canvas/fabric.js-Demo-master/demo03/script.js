var canvas = new fabric.Canvas('canvas');
var imgElement = document.getElementById('jspang-img');

var imgInstance = new fabric.Image(imgElement,{
    left:100,
    top:100,
    width:200,
    height:100,
    angle:50
});

canvas.add(imgInstance);