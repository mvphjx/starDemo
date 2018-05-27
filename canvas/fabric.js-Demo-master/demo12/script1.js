var canvas = new fabric.Canvas('canvas');

var rect = new fabric.Rect({
    left:100,
    top:100,
    width:100,
    height:100,
    fill:'red'
});

var circle = new fabric.Circle({
    left:200,
    top:100,
    radius:50,
    fill:'blue'
});
canvas.add(rect);
canvas.add(circle);


var group = new fabric.Group([
    canvas.item(0).clone(),
    canvas.item(1).clone()
]);
canvas.clear().renderAll();



canvas.add(group)








