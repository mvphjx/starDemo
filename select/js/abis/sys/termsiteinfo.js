
TermSiteInfo.prototype.statTimeBegin = null;
TermSiteInfo.prototype.endTimeEnd = null;
TermSiteInfo.prototype.tiannum = 20;

function TermSiteInfo(conType,sampleTime,sid)
{	
	this.conType = conType;
	this.sampleTime = sampleTime;
	this.sid = sid;
	this.init(this.conType);
}

TermSiteInfo.prototype.init = function(conType)
{
	if(conType == "reqPer")
	{
		$("#stree_6_a").click();
	}
	else if(conType == "dbaPer")
	{
		$("#stree_3_a").click();
	}
	else if(conType == "processPer")
	{
		$("#stree_4_a").click();
	}
	else if(conType == "serverPer")
	{
		$("#stree_5_a").click();
	}
	else if(conType == "termPer")
	{
		$("#stree_2_a").click();
	}
	else
	{
		$("#stree_1_a").click();
	}
	var hti = WebUtil.getContentHeight() - 50;
	$("#stree").height(hti);
	$("#termSiteId").height(hti + 40);
}

TermSiteInfo.prototype.setData = function(data,configType)
{
	if(configType == "compperId")
	{
		var compt1 = findSWF("my_chart1");  
		compt1.load(data.jsonChart1); 
		var compt2 = findSWF("my_chart2");  
		compt2.load(data.jsonChart2); 
		var compt3 = findSWF("my_chart3");  
		compt3.load(data.jsonChart3); 
		var compt4 = findSWF("my_chart4");
		compt4.load(data.jsonChart4); 
		var compt5 = findSWF("my_chart5"); 
		compt5.load(data.jsonChart5);
		var compt6 = findSWF("my_chart6");
		compt6.load(data.jsonChart6);
	}
	if(configType == "reqperId")
	{
		var reqtmp1 = findSWF("my_chart7");  
		reqtmp1.load(data.reqCountJsonChart); 
		var reqtmp2 = findSWF("my_chart8");
		reqtmp2.load(data.conreqcountJsonChart);
		var reqtmp3 = findSWF("my_chart9");
		reqtmp3.load(data.peakreqcountJsonChart);
		var reqtmp4 = findSWF("my_chart10");
		reqtmp4.load(data.avereqcountJsonChart);
	}
	if(configType == "dbperId")
	{
		var dbtmp1 = findSWF("my_chart11");
		dbtmp1.load(data.diskCountJsonChart);
		var dbtmp2 = findSWF("my_chart12");
		dbtmp2.load(data.freediskcountJsonChart);
		var dbtmp3 = findSWF("my_chart13");
		dbtmp3.load(data.freedbcountJsonChart);
	}
	if(configType == "jinchengId")
	{
		var jctmp1 = findSWF("my_chart14");
		jctmp1.load(data.cpuCountJsonChart);
		var jctmp2 = findSWF("my_chart15");
		jctmp2.load(data.memUsercountJsonChart);
		var jctmp3 = findSWF("my_chart16");
		jctmp3.load(data.peakMemcountJsonChart);
		var jctmp4 = findSWF("my_chart17");
		jctmp4.load(data.threadcountJsonChart);
		var jctmp5 = findSWF("my_chart18");
		jctmp5.load(data.handlecountJsonChart);
		var jctmp6 = findSWF("my_chart19");
		jctmp6.load(data.ioreadsChart);
		var jctmp7 = findSWF("my_chart20");
		jctmp7.load(data.ioreadJsonChart);
		var jctmp8 = findSWF("my_chart21");
		jctmp8.load(data.iootherJsonChart);
		var jctmp9 = findSWF("my_chart22");
		jctmp9.load(data.ioothersJsonChart);
		var jctmp10 = findSWF("my_chart23");
		jctmp10.load(data.totalCpuJsonChart);
	}
	if(configType == "fuwuId")
	{
		var servertmp1 = findSWF("my_chart24");
		servertmp1.load(data.userCountJsonChart);
		var servertmp2 = findSWF("my_chart25");
		servertmp2.load(data.peakUsercountJsonChart);
		var servertmp3 = findSWF("my_chart26");
		servertmp3.load(data.aveTimecountJsonChart);
		var servertmp4 = findSWF("my_chart27");
		servertmp4.load(data.peakTimecountJsonChart);
		var servertmp5 = findSWF("my_chart28");
		servertmp5.load(data.totalcountJsonChart);
		var servertmp6 = findSWF("my_chart29");
		servertmp6.load(data.concurcountJsonChart);
		var servertmp7 = findSWF("my_chart30");
		servertmp7.load(data.peakconcountJsonChart);
		var servertmp8 = findSWF("my_chart31");
		servertmp8.load(data.aveseccountJsonChart);
		var servertmp9 = findSWF("my_chart32");
		servertmp9.load(data.samplecountJsonChart);
	}
	
//	 $("#siteNoId").html("1212121");
//	 $("#serviceStatusId").val("1212121");
	 
}

TermSiteInfo.prototype.query = function(configType)
{
	var dateIndex = $('#dateList option:selected').val();
	this.statTimeBegin = $("#statTimeBegin").val();
	this.endTimeEnd = $("#endTimeEnd").val();
	this.setDateText(this.statTimeBegin,this.endTimeEnd);
	var dayNum = this.DateDiff(this.endTimeEnd,this.statTimeBegin);
	if(dayNum > this.tiannum)
	{
		alert(AbisMessageResource.Alert["MaxStatIntervalTip"]);
		return;
	}
	if(this.statTimeBegin > this.endTimeEnd)
	{
		//alert("时间顺序输入错误");
		alert(AbisMessageResource.Alert["StartTimeCanNotGreaterThanEndTime"]);
		return;
	}
	
	var reData = {};
	reData.id = this.sid;
	reData.statTime= this.statTimeBegin;
	reData.endTime= this.endTimeEnd;
	reData.configType = configType;
	reData.index = dateIndex;
	var jData = $.toJSON(reData);
	var nthis = this;
	var url = WebVar.VarPath + "/sys/termsitemgr/dainfo";
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jData,
		dataType : 'json',
		success : function(data) 
		{   
			if(data != null)
			{
				data = eval('('+ data +')');
				nthis.setData(data,configType);
			}
		},   
		error : function(e) 
		{   
		}   
	});
} 

TermSiteInfo.prototype.setChartData =  function(configType) 
{
	var dateIndex = $('#dateList option:selected').val();
	var reData = {};
	reData.id = this.sid;
	this.statTimeBegin = $("#statTimeBegin").val();
	if(this.statTimeBegin != null && this.statTimeBegin != "")
	{
		reData.statTime= this.statTimeBegin;
	}
	else
	{
		reData.statTime= this.sampleTime;
	}
	this.endTimeEnd = $("#endTimeEnd").val();
	if(this.endTimeEnd != null && this.endTimeEnd != "")
	{
		reData.endTime= this.endTimeEnd;
	}
	else
	{
		reData.endTime= this.sampleTime;
	}
	reData.configType = configType;
	reData.index = dateIndex;
	var jData = $.toJSON(reData);
	var url = WebVar.VarPath + "/sys/termsitemgr/dainfo";
	var nthis = this;
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jData,
		dataType : 'json',
		success : function(data) 
		{   
			if(data != null)
			{
				data = eval('('+ data +')');
				nthis.setData(data,configType);
			}
		},   
		error : function(e) 
		{   
		}   
	});
    return "";
}

TermSiteInfo.prototype.page1 = 1;
TermSiteInfo.prototype.page3 = 1;
TermSiteInfo.prototype.page5 = 1;
TermSiteInfo.prototype.page6 = 1;
TermSiteInfo.prototype.page7 = 1;
TermSiteInfo.prototype.page8 = 1;
TermSiteInfo.prototype.page9 = 1;
TermSiteInfo.prototype.page10 = 1;
TermSiteInfo.prototype.page11 = 1;
TermSiteInfo.prototype.page12 = 1;
TermSiteInfo.prototype.page13 = 1;
TermSiteInfo.prototype.page14 = 1;
TermSiteInfo.prototype.page15 = 1;
TermSiteInfo.prototype.page16 = 1;
TermSiteInfo.prototype.page17 = 1;
TermSiteInfo.prototype.page18 = 1;
TermSiteInfo.prototype.page19 = 1;
TermSiteInfo.prototype.page20 = 1;
TermSiteInfo.prototype.page21 = 1;
TermSiteInfo.prototype.page22 = 1;
TermSiteInfo.prototype.page23 = 1;
TermSiteInfo.prototype.page24 = 1;
TermSiteInfo.prototype.page25 = 1;
TermSiteInfo.prototype.page26 = 1;
TermSiteInfo.prototype.page27 = 1;
TermSiteInfo.prototype.page28 = 1;
TermSiteInfo.prototype.page29 = 1;
TermSiteInfo.prototype.page30 = 1;
TermSiteInfo.prototype.page32 = 1;
TermSiteInfo.prototype.page34 = 1;
TermSiteInfo.prototype.page35 = 1;
TermSiteInfo.prototype.page36 = 1;
TermSiteInfo.prototype.gotoPage = function(val1,val2)
{
//	$(obj).parent().parent().next().find("input[type=checkbox]").attr("checked", true);
	var dateIndex = $('#dateList option:selected').val();
	var reData = {};
	this.statTimeBegin = $("#statTimeBegin").val();
	if(this.statTimeBegin != null && this.statTimeBegin != "")
	{
		reData.statTime= this.statTimeBegin;
	}
	else
	{
		reData.statTime= this.sampleTime;
	}
	this.endTimeEnd = $("#endTimeEnd").val();
	if(this.endTimeEnd != null && this.endTimeEnd != "")
	{
		reData.endTime= this.endTimeEnd;
	}
	else
	{
		reData.endTime= this.sampleTime;
	}
	reData.index = dateIndex;
	reData.termtype = val1;
	if(val1 == 1)
	{
		if(val2 == 1)
		{
			this.page1 += 1; 
		}
		else
		{
			this.page1 -= 1; 
		}
		reData.page = this.page1;
	}
	if(val1 == 3)
	{
		if(val2 == 1)
		{
			this.page3 += 1; 
		}
		else
		{
			this.page3 -= 1; 
		}
		reData.page = this.page3;
	}
	if(val1 == 5)
	{
		if(val2 == 1)
		{
			this.page5 += 1; 
		}
		else
		{
			this.page5 -= 1; 
		}
		reData.page = this.page5;
	}
	if(val1 == 6)
	{
		if(val2 == 1)
		{
			this.page6 += 1; 
		}
		else
		{
			this.page6 -= 1; 
		}
		reData.page = this.page6;
	}
	if(val1 == 7)
	{
		if(val2 == 1)
		{
			this.page7 += 1; 
		}
		else
		{
			this.page7 -= 1; 
		}
		reData.page = this.page7;
	}
	if(val1 == 8)
	{
		if(val2 == 1)
		{
			this.page8 += 1; 
		}
		else
		{
			this.page8 -= 1; 
		}
		reData.page = this.page8;
	}
	if(val1 == 9)
	{
		if(val2 == 1)
		{
			this.page9 += 1; 
		}
		else
		{
			this.page9 -= 1; 
		}
		reData.page = this.page9;
	}
	if(val1 == 10)
	{
		if(val2 == 1)
		{
			this.page10 += 1; 
		}
		else
		{
			this.page10 -= 1; 
		}
		reData.page = this.page10;
	}
	if(val1 == 11)
	{
		if(val2 == 1)
		{
			this.page11 += 1; 
		}
		else
		{
			this.page11 -= 1; 
		}
		reData.page = this.page11;
	}
	if(val1 == 12)
	{
		if(val2 == 1)
		{
			this.page12 += 1; 
		}
		else
		{
			this.page12 -= 1; 
		}
		reData.page = this.page12;
	}
	if(val1 == 13)
	{
		if(val2 == 1)
		{
			this.page13 += 1; 
		}
		else
		{
			this.page13 -= 1; 
		}
		reData.page = this.page13;
	}
	if(val1 == 14)
	{
		if(val2 == 1)
		{
			this.page14 += 1; 
		}
		else
		{
			this.page14 -= 1; 
		}
		reData.page = this.page14;
	}
	if(val1 == 15)
	{
		if(val2 == 1)
		{
			this.page15 += 1; 
		}
		else
		{
			this.page15 -= 1; 
		}
		reData.page = this.page15;
	}
	if(val1 == 16)
	{
		if(val2 == 1)
		{
			this.page16 += 1; 
		}
		else
		{
			this.page16 -= 1; 
		}
		reData.page = this.page16;
	}
	if(val1 == 17)
	{
		if(val2 == 1)
		{
			this.page17 += 1; 
		}
		else
		{
			this.page17 -= 1; 
		}
		reData.page = this.page17;
	}
	if(val1 == 18)
	{
		if(val2 == 1)
		{
			this.page18 += 1; 
		}
		else
		{
			this.page18 -= 1; 
		}
		reData.page = this.page18;
	}
	if(val1 == 19)
	{
		if(val2 == 1)
		{
			this.page19 += 1; 
		}
		else
		{
			this.page19 -= 1; 
		}
		reData.page = this.page19;
	}
	if(val1 == 20)
	{
		if(val2 == 1)
		{
			this.page20 += 1; 
		}
		else
		{
			this.page20 -= 1; 
		}
		reData.page = this.page20;
	}
	if(val1 == 21)
	{
		if(val2 == 1)
		{
			this.page21 += 1; 
		}
		else
		{
			this.page21 -= 1; 
		}
		reData.page = this.page21;
	}
	if(val1 == 22)
	{
		if(val2 == 1)
		{
			this.page22 += 1; 
		}
		else
		{
			this.page22 -= 1; 
		}
		reData.page = this.page22;
	}
	if(val1 == 23)
	{
		if(val2 == 1)
		{
			this.page23 += 1; 
		}
		else
		{
			this.page23 -= 1; 
		}
		reData.page = this.page23;
	}
	if(val1 == 24)
	{
		if(val2 == 1)
		{
			this.page24 += 1; 
		}
		else
		{
			this.page24 -= 1; 
		}
		reData.page = this.page24;
	}
	if(val1 == 25)
	{
		if(val2 == 1)
		{
			this.page25 += 1; 
		}
		else
		{
			this.page25 -= 1; 
		}
		reData.page = this.page25;
	}
	if(val1 == 26)
	{
		if(val2 == 1)
		{
			this.page26 += 1; 
		}
		else
		{
			this.page26 -= 1; 
		}
		reData.page = this.page26;
	}
	if(val1 == 27)
	{
		if(val2 == 1)
		{
			this.page27 += 1; 
		}
		else
		{
			this.page27 -= 1; 
		}
		reData.page = this.page27;
	}
	if(val1 == 28)
	{
		if(val2 == 1)
		{
			this.page28 += 1; 
		}
		else
		{
			this.page28 -= 1; 
		}
		reData.page = this.page28;
	}
	if(val1 == 29)
	{
		if(val2 == 1)
		{
			this.page29 += 1; 
		}
		else
		{
			this.page29 -= 1; 
		}
		reData.page = this.page29;
	}
	if(val1 == 30)
	{
		if(val2 == 1)
		{
			this.page30 += 1; 
		}
		else
		{
			this.page30 -= 1; 
		}
		reData.page = this.page30;
	}
	if(val1 == 32)
	{
		if(val2 == 1)
		{
			this.page32 += 1; 
		}
		else
		{
			this.page32 -= 1; 
		}
		reData.page = this.page32;
	}
	if(val1 == 34)
	{
		if(val2 == 1)
		{
			this.page34 += 1; 
		}
		else
		{
			this.page34 -= 1; 
		}
		reData.page = this.page34;
	}
	if(val1 == 35)
	{
		if(val2 == 1)
		{
			this.page35 += 1; 
		}
		else
		{
			this.page35 -= 1; 
		}
		reData.page = this.page35;
	}
	if(val1 == 36)
	{
		if(val2 == 1)
		{
			this.page36 += 1; 
		}
		else
		{
			this.page36 -= 1; 
		}
		reData.page = this.page36;
	}
	
	var jData = $.toJSON(reData);
	var url = WebVar.VarPath + "/sys/termsitemgr/gotoPage";
	var nthis = this;
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : jData,
		dataType : 'json',
		success : function(data) 
		{   
			if(data != null)
			{
				var compt = null;
				if(val1 == 1)
				{
					compt = findSWF("my_chart1");  
				}
				if(val1 == 3)
				{
					compt = findSWF("my_chart2");  
				}
				if(val1 == 5)
				{
					compt = findSWF("my_chart3");  
				}
				if(val1 == 6)
				{
					compt = findSWF("my_chart4");  
				}
				if(val1 == 7)
				{
					compt = findSWF("my_chart5");  
				}
				if(val1 == 8)
				{
					compt = findSWF("my_chart6");  
				}
				if(val1 == 9)
				{
					compt = findSWF("my_chart7");  
				}
				if(val1 == 10)
				{
					compt = findSWF("my_chart8");  
				}
				if(val1 == 11)
				{
					compt = findSWF("my_chart9");  
				}
				if(val1 == 12)
				{
					compt = findSWF("my_chart10");  
				}
				if(val1 == 13)
				{
					compt = findSWF("my_chart11");  
				}
				if(val1 == 14)
				{
					compt = findSWF("my_chart12");  
				}
				if(val1 == 15)
				{
					compt = findSWF("my_chart13");  
				}
				if(val1 == 16)
				{
					compt = findSWF("my_chart24");  
				}
				if(val1 == 17)
				{
					compt = findSWF("my_chart25");  
				}
				if(val1 == 18)
				{
					compt = findSWF("my_chart26");  
				}
				if(val1 == 19)
				{
					compt = findSWF("my_chart27");  
				}
				if(val1 == 20)
				{
					compt = findSWF("my_chart28");  
				}
				if(val1 == 21)
				{
					compt = findSWF("my_chart29");  
				}
				if(val1 == 22)
				{
					compt = findSWF("my_chart30");  
				}
				if(val1 == 23)
				{
					compt = findSWF("my_chart31");  
				}
				if(val1 == 24)
				{
					compt = findSWF("my_chart32");  
				}
				if(val1 == 25)
				{
					compt = findSWF("my_chart14");  
				}
				if(val1 == 26)
				{
					compt = findSWF("my_chart15");  
				}
				if(val1 == 27)
				{
					compt = findSWF("my_chart16");  
				}
				if(val1 == 28)
				{
					compt = findSWF("my_chart17");  
				}
				if(val1 == 29)
				{
					compt = findSWF("my_chart18");  
				}
				if(val1 == 30)
				{
					compt = findSWF("my_chart19");  
				}
				if(val1 == 32)
				{
					compt = findSWF("my_chart20");  
				}
				if(val1 == 34)
				{
					compt = findSWF("my_chart21");  
				}
				if(val1 == 35)
				{
					compt = findSWF("my_chart22");  
				}
				if(val1 == 36)
				{
					compt = findSWF("my_chart23");  
				}
				compt.load(data); 
			}
		},   
		error : function(e) 
		{   
		}   
	});
}

TermSiteInfo.prototype.setDateText = function(obj1,obj2)
{
	if(WebUtil.isNull(obj1) && WebUtil.isNull(obj2))
	{
		var date1 = new Date();
		date1.setDate(date1.getDate() - 19);
		var date2 = new Date();
		
	    var year1 = date1.getFullYear();       /*年*/
	    var month1 = date1.getMonth() + 1;     /*月*/
	    var day1 = date1.getDate();            /*日*/
	    
	    var year2 = date2.getFullYear();       /*年*/
	    var month2 = date2.getMonth() + 1;     /*月*/
	    var day2 = date2.getDate();            /*日*/
	    var time1 = ""+year1;					/*系统当前时间*/
	    var time2 = ""+year2;
	    
	    if(month1 < 10)
	    {
	    	time1 += "0";
	    }
	    time1 += month1;
	    if(month2 < 10)
	    {
	    	time2 += "0";
	    }
	    time2 += month2;
	    if(day1 < 10)
	    {
	    	time1 += "0";
	    }
	    time1 += day1;
	    if(day2 < 10)
	    {
	    	time2 += "0";
	    }
	    time2 += day2;
	    
	    $("#statTimeBegin").val(time1);
	    $("#endTimeEnd").val(time2);
	}
	else if(!WebUtil.isNull(obj1) && WebUtil.isNull(obj2))
	{
		var  yern = obj1.substring(0,4);
       	var  month = obj1.substring(4,6);
       	var  day = obj1.substring(6,8);
       	var oDate1 = new Date(yern, month- 1,day);
       	oDate1.setDate(oDate1.getDate() + 19);
       	var year1 = oDate1.getFullYear();       /*年*/
	    var month1 = oDate1.getMonth() + 1;     /*月*/
	    var day1 = oDate1.getDate();            /*日*/
	    var time1 = ""+year1;	 
	    
	    if(month1 < 10)
	    {
	    	time1 += "0";
	    }
	    time1 += month1;
	    if(day1 < 10)
	    {
	    	time1 += "0";
	    }
	    time1 += day1;
	    $("#endTimeEnd").val(time1);
	}
	else if(WebUtil.isNull(obj1) && !WebUtil.isNull(obj2))
	{
		var  yern = obj2.substring(0,4);
       	var  month = obj2.substring(4,6);
       	var  day = obj2.substring(6,8);
       	var oDate1 = new Date(yern, month- 1,day);
       	oDate1.setDate(oDate1.getDate() - 19);
       	var year1 = oDate1.getFullYear();       /*年*/
	    var month1 = oDate1.getMonth() + 1;     /*月*/
	    var day1 = oDate1.getDate();            /*日*/
	    var time1 = ""+year1;	 
	    
	    if(month1 < 10)
	    {
	    	time1 += "0";
	    }
	    time1 += month1;
	    if(day1 < 10)
	    {
	    	time1 += "0";
	    }
	    time1 += day1;
	    $("#statTimeBegin").val(time1);
	}
	this.statTimeBegin  	= $("#statTimeBegin").val();
	this.endTimeEnd		= $("#endTimeEnd").val();
}

TermSiteInfo.prototype.DateDiff = function(sDate1,sDate2)
{
   var  oDate1,oDate2,iDays; 
   var  yern = sDate1.substring(0,4);
   var  month = sDate1.substring(4,6);
   var  day = sDate1.substring(6,8);
   oDate1 = new Date(yern, month- 1,day);
   yern = sDate2.substring(0,4);
   month = sDate2.substring(4,6);
   day = sDate2.substring(6,8);
   oDate2 = new Date(yern , month - 1, day);
   iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24); 
   return  iDays;
	}  

function findSWF(movieName) 
{     
	if (navigator.appName.indexOf("Microsoft")!= -1) 
	{     
	 	return window[movieName];     
	} 
	else 
	{     
		return document[movieName];     
	} 
}
