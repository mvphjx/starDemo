var canvas = new fabric.Canvas('canvas');

var circle = new fabric.Circle({
    radius:100,
    fill:'green',
    scaleY:0.5,
    originX:'center',
    originY:'center'
});


var text = new fabric.Text('Hello Jspang!',{
    fontSize:30,
    originX:'center',
    originY:'center'  
})


var group = new fabric.Group([circle,text],{
    left:0,
    top:0,
    angle:0
});

//group.item(0).setFill('red');
// group.item(1).set({
//     text:'Hello World!',
//     fill:'white'
// });


canvas.add(group);

