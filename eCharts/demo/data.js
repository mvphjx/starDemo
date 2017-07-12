/**
 * 用电情况相关数据
 */	
var myDataAll = [];
var myData = [];
//myDate.push({"time":"20170524",num:"1908"})
myDataAll.push({"time":"20170624",num:"2014"})
myDataAll.push({"time":"20170625",num:"2018"})
myDataAll.push({"time":"20170626",num:"2029"})
myDataAll.push({"time":"20170627",num:"2031"})
myDataAll.push({"time":"20170628",num:"2036"})
myDataAll.push({"time":"20170629",num:"2038"})
myDataAll.push({"time":"20170630",num:"2039.7"})
myDataAll.push({"time":"20170701",num:"2043.3"})
myDataAll.push({"time":"20170702",num:"2052.7"})
myDataAll.push({"time":"20170703",num:"2055.3"})
myDataAll.push({"time":"20170704",num:"2056.7"})
myDataAll.push({"time":"20170705",num:"2058.5"})
myDataAll.push({"time":"20170706",num:"2059.7"})
myDataAll.push({"time":"20170707",num:"2061.4"})
myDataAll.push({"time":"20170708",num:"2065.0"})
myDataAll.push({"time":"20170709",num:"2071.0"})
myDataAll.push({"time":"20170710",num:"2073.8"})
myDataAll.push({"time":"20170711",num:"2077.4"})
myDataAll.push({"time":"20170712",num:"2082.4"})
for(var i =0,length=myDataAll.length;i<length;i++){
	if(i===0){
		myData.push(0);
	}else{
		myData.push(myDataAll[i].num-myDataAll[i-1].num);		
	}
}


