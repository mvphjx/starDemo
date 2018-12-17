/**
 * 计算一个点是否在多边型里面 
 */
var eps = 1e-8;
function pointInPolygon(point, polygon){
	var nFlag = 0;
	var nCount = 0; 
	for (var i=0;i<polygon.length-1;i++){
		nFlag = isIntersectAnt(point[0],point[1],polygon[i][0],polygon[i][1],  polygon[i+1][0],polygon[i+1][1]);  
		if (nCount < 0)    {  
		   // return 2;   //点在边上  
			return 2;
		}  
		nCount += nFlag; 
	}
	if (nCount % 2 == 1){   //点在多边形内  
        return 1;
    } else {  //点在不多边形内
    	return 0;
    }
}

function isIntersectAnt(x, y, X1, Y1, X2, Y2){  
    //计算线段的最小和最大坐标值  
    var minX,maxX,minY,maxY;
    minX = X1;
    maxX = X2;
    if (minX > maxX){
        minX = X2;
        maxX = X1;
    }
    minY = Y1;
    maxY = Y2;
    if (minY > maxY){
        minY = Y2;
        maxY = Y1;
    }  
    //射线与边无交点的快速判断  
    if (y<minY || y>maxY || x<minX)   {  
        return 0;
    }
    //如果是水平线段，在线段上返回-1，否则返回0  
    if (Math.abs(maxY - minY) < eps)   {  //if (fabs(maxY - minY) < eps)   {  
        return (x >= minX && x <= maxX)? (-1):0;
    }
    //计算射线与边所在直线的交点的横坐标  
    var x0 = X1 + (y - Y1)*(X2 - X1)/(Y2 - Y1);  
    //交点在射线右侧，则不相交  
    if (x0 > x) {
        return 0;  
    }
    //交点和射线起点相同  
    if (Math.abs(x-x0)< eps){
        return -1;
    }
    //穿过下端点也不计数  
    if (Math.abs(y-minY) < eps){  
        return 0;  
    }
    return 1;
} 