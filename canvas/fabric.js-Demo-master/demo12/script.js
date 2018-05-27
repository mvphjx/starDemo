var canvas = new fabric.Canvas('canvas');

var circle = new fabric.Circle({
    radius:50,
    fill:'green',
    top:100,
    left:200,
   
});

var rect = new fabric.Rect({
    left:100,
    top:100,
    width:100,
    height:100,
    fill:'red'
});




var group = new fabric.Group([circle,rect],{
    left:150,
    top:100,
    angle:10
});

group.addWithUpdate(new fabric.Rect({
    fill:'blue',
    top:group.getTop()+50,
    left:group.getLeft()+100,
    width:100,
    height:100,
    originX:'center',
    originY:'center'
}));





canvas.add(group);

