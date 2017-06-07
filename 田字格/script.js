/**
 * Created by hjx on 2017年6月7日22:53:48
 */
var canvas=document.getElementById("canvas");
//方法返回一个用于在画布上绘图的环境。
var pen=canvas.getContext("2d");
(function() {
        if (pen) {
            var cWidth=Math.min(800,$(window).width()-20);
            var cHeight=cWidth;
            $(".controller").css("width",cWidth+"px");
            var isMouseDown=false;
            var lastLoc=null;
            var lastTime;
            var lineColor;
            var lastLineWidth = null;
            canvas.width=cWidth;
            canvas.height=cHeight;
            var colorBtns=document.getElementsByClassName("btn");
            var clearBtn=document.getElementById("clear");
            function init (){//绘制米字格
                pen.save();
                pen.strokeStyle="rgb(230,11,9)";
                pen.setLineDash([10,5]);
                pen.lineWidth=1;
                pen.beginPath();
                pen.moveTo(0,0);
                pen.lineTo(cWidth,cHeight);
                pen.moveTo(cWidth,0);
                pen.lineTo(0,cHeight);
                pen.moveTo(cWidth/2,0);
                pen.lineTo(cWidth/2,cHeight);
                pen.moveTo(0,cHeight/2);
                pen.lineTo(cWidth,cHeight/2);
                pen.stroke();
                pen.restore();
            };
            init();
            //获取相对 canvas的鼠标坐标
            function convertLoc(x,y){
            	var outline=canvas.getBoundingClientRect();
            	var outlineLeft=outline.left;
            	var outlineTop=outline.top;
                return{
                    x: Math.round(x-outlineLeft),
                    y: Math.round(y-outlineTop)
                }
            }
            function distance(curLoc,lastLoc){
                return Math.sqrt(Math.pow((curLoc.x-lastLoc.x),2)+Math.pow((curLoc.y-lastLoc.y),2));
            }
            function getLineWidth(s,t,last){
            	//计算移动速度对 线条粗细的影响
                var v=s/t;
                var max = 20;
                var min = 5;
                var maxspeed = 2;
                var minspeed = 0.1;
                console.log(v);
                var lineWidth = 1;
                if(v<=minspeed){
                    lineWidth=max;
                }
                else if(v>=maxspeed){
                    lineWidth= min;
                }
                else{
                    lineWidth= max-(max-min)/(maxspeed-minspeed)*(v-minspeed);
                }
                if(last){//平滑过渡
                	lineWidth = last*2/3 + lineWidth/3
                }
                return lineWidth;
            }
            function beginStroke(point){//兼容手机 触摸事件
            	lastLoc=convertLoc(point.x, point.y);
                lastTime=new Date().getTime();
            	isMouseDown = true;
            }
            function endStroke(){//兼容手机 触摸事件
            	isMouseDown = false;
            }
            function moveStroke(point){//兼容手机 触摸事件
            	if(isMouseDown){
                    var curLoc=convertLoc(point.x,point.y);
                    var s=distance(curLoc,lastLoc);
                    var curTime = new Date().getTime();
                    var t=curTime-lastTime;
                    pen.beginPath();
                    pen.moveTo(lastLoc.x,lastLoc.y);
                    pen.lineTo(curLoc.x,curLoc.y);
                    lastLineWidth=getLineWidth(s,t,lastLineWidth);
                    pen.lineWidth=lastLineWidth
                    pen.strokeStyle=lineColor;
                    pen.lineCap="round";
                    pen.stroke();
                    lastLoc=curLoc;
                    lastTime=curTime
                }
            }
            //监听鼠标事件
            canvas.onmousedown=function(e){
                e.preventDefault();
                beginStroke({x:e.clientX,y:e.clientY});
            }
            canvas.onmouseup=function(e){
                e.preventDefault();
                endStroke();
            }
            canvas.onmouseout=function(e){
                e.preventDefault();
                endStroke();
            }
            canvas.onmousemove=function(e){
                e.preventDefault();
                if(isMouseDown){
                	moveStroke({x:e.clientX,y:e.clientY});
                }             
            }
            //监听手机事件
            canvas.addEventListener("touchstart",function(e){
            	e.preventDefault();
            	var touch = e.touches[0]
            	beginStroke({x:touch.pageX,y:touch.pageY});
            });
            canvas.addEventListener("touchmove",function(e){
            	e.preventDefault();
            	if(isMouseDown){
            		var touch = e.touches[0]
                	moveStroke({x:touch.pageX,y:touch.pageY});
                } 
            });
            canvas.addEventListener("touchend",function(e){
            	e.preventDefault();
            	endStroke();
            });
            for(var i=0;i<colorBtns.length;i++){
                colorBtns[i].onclick=function(){
                    lineColor=this.getAttribute("color");
                }
            }
            clearBtn.onclick=function(){
                pen.clearRect(0,0,cWidth,cHeight);
                init();
            };

        }
        else {
            alert("no canvas!")
        }
    }
)();