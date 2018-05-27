var canvas = new fabric.Canvas('canvas');
var path = new fabric.Path('M 0 0 L 300 100 L 170 200 z');

path.set({
    left : 0,
    top : 0,
    fill : 'red'
});

canvas.add(path);