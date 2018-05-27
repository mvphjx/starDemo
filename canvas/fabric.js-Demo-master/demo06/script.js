var canvas = new fabric.Canvas('canvas');
fabric.Image.fromURL('bolgTOuxiang.jpg',function(img){
    //增加我们的过滤器效果
    img.filters.push(
        new fabric.Image.filters.Sepia(),
        new fabric.Image.filters.Brightness({brightness:100})
    );
    //应用过滤器
    img.applyFilters(canvas.renderAll.bind(canvas));
    canvas.add(img);
});