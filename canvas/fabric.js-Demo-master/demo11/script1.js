var canvas = new fabric.Canvas('canvas');

var circle1= new fabric.Circle({
    radius:50,
    fill:'red',
    left:0
});


var circle2= new fabric.Circle({
    radius:50,
    fill:'yellow',
    left:100
});

var circle3= new fabric.Circle({
    radius:50,
    fill:'green',
    left:200
});

var group = new fabric.Group([circle1,circle2,circle3],{
    left:200,
    top:100
});


canvas.add(group);



