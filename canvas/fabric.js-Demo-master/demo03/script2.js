var canvas = new fabric.Canvas('canvas');

fabric.Image.fromURL('./jsapng.png',function(oImg){
    oImg.scale(0.1);
    canvas.add(oImg);
});
