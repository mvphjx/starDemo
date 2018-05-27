var canvas = new fabric.Canvas('canvas');
var rect = new fabric.Rect({
    width:100,
    height:100,
    fill:'green'
});

var circle = new fabric.Circle({
    radius:75,
    fill:'blue'
});

circle.on('selected',function(){
    console.log('selected  a circle!');
});

rect.on('selected',function(){
    console.log('selected a rectangle');
});


canvas.add(rect);
canvas.add(circle);

