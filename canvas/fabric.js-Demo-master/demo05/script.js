var canvas = new fabric.Canvas('canvas');
var rect = new fabric.Rect({
    left:100,
    top:100,
    width:100,
    height:100,
    fill:'red'
});


rect.animate('left',500,{
    onChange:canvas.renderAll.bind(canvas),
    duration:2000,
    easing:fabric.util.ease.easeOutCubic
});

canvas.add(rect);