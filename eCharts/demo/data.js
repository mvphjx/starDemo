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
myDataAll.push({"time":"20170630",num:"2041"})
for(var i =0,length=myDataAll.length;i<length;i++){
	if(i===0){
		myData.push(0);
	}else{
		myData.push(myDataAll[i].num-myDataAll[i-1].num);		
	}
}


