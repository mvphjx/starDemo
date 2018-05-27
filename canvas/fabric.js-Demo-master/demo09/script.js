var canvas = new fabric.Canvas('canvas');

var text = new fabric.Text('Hello JSPang.com',{
    left:0,
    top:100,
    fontFamily:'Comic Sans',
    fontSize:20,
    textDecoration:'overline'
}) 

canvas.add(text);