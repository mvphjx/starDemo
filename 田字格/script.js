/**
 * Created by Administrator on 2017/3/19.
 */
var canvas=document.getElementById("canvas");
var pen=canvas.getContext("2d");
(function() {
        if (pen) {
            var cWidth=600;
            var cHeight=cWidth;
            var flag=false;
            var lastLoc=null;
            var lastTime;
            var lineColor;
            canvas.width=cWidth;
            canvas.height=cHeight;
            var outline=canvas.getBoundingClientRect();
            var outlineLeft=outline.left;
            var outlineTop=outline.top;
            var colorBtns=document.getElementsByClassName("btn");
            var clearBtn=document.getElementById("clear");
            function init (){
                 pen.save();
                pen.strokeStyle="rgb(230,11,9)";
                pen.setLineDash([10,5]);
   /*             pen.lineWidth=10;
                pen.beginPath();
                pen.moveTo(3,3);
                pen.lineTo(cWidth-3,3);
                pen.lineTo(cWidth-3,cHeight-3);
                pen.lineTo(3,cHeight-3);
                pen.closePath();
                pen.stroke();*/
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
            function convertLoc(x,y){
                return{
                    x: Math.round(x-outlineLeft),
                    y: Math.round(y-outlineTop)
                }
            }
            function distance(curLoc,lastLoc){
                return Math.sqrt(Math.pow((curLoc.x-lastLoc.x),2)+Math.pow((curLoc.y-lastLoc.y),2));
            }
            function lineWidth(s,t){
                var v=s/t;
                if(v<=0.1){
                    return 20;
                }
                else if(v>=5){
                    return 10;
                }
                else{
                    return 20-20/(5-0.1)*(v-0.1);
                }
            }
            canvas.onmousedown=function(e){
                e.preventDefault();
                lastLoc=convertLoc(e.clientX, e.clientY);
                lastTime=new Date().getTime();
                flag=true;

            }
            canvas.onmouseup=function(e){
                e.preventDefault();
                flag=false;
            }
            canvas.onmouseout=function(e){
                e.preventDefault();
                flag=false;
            }
            canvas.onmousemove=function(e){
                e.preventDefault();
                if(flag){
                    var curLoc=convertLoc(e.clientX, e.clientY);
                    var s=distance(curLoc,lastLoc);
                    var t=new Date().getTime()-lastTime;
                    pen.beginPath();
                    pen.moveTo(lastLoc.x,lastLoc.y);
                    pen.lineTo(curLoc.x,curLoc.y);
                    pen.lineWidth=lineWidth(s,t);
                    pen.strokeStyle=lineColor;
                    pen.lineCap="round";
                    pen.stroke();
                    lastLoc=curLoc;
                }
            }
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