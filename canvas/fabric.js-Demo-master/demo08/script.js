var canvas = new fabric.Canvas('canvas');
var circle= new fabric.Circle({
    left:100,
    top:100,
    radius:50,
    strokWidth:1,
    stroke:'red'
});

circle.setGradient('fill',{
    x1:0,
    y1:0,
    x2:circle.width,
    y2:0,
    colorStops:{
        0:'red',
        0.2:'orange',
        0.4:'yellow',
        0.6:'green',
        0.8:'blue',
        1:'purple'
    }
});

canvas.add(circle);
