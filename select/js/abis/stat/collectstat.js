
CollectStat.prototype.tdNameRel 	= null;
CollectStat.prototype.codeFilter	= null;
CollectStat.tdNameRel				= null;
CollectStat.prototype.cols		 	= null;
CollectStat.prototype.flg		 	= null;
CollectStat.flg		 				= null;
CollectStat.vMaps					= null;
CollectStat.divNameRel 				= null;
CollectStat.Colors 					= null;
CollectStat.StatKey					= null;
CollectStat.NoDataColor				= null;

function CollectStat(codeFilter)
{
	this.codeFilter = codeFilter;
	this.init();
	
}

CollectStat.prototype.initParams = function()
{
	CollectStat.Colors = ["#c7497e","#0a75eb","#825e6b","#711285","#ca5f17",
	                      "#c5058b","#237272","#a30c29","#585bcf","#3f7d3c",
	                      "#0684a8","#bb8842","#232565","#23a094","#56568b",
	                      "#9aa943","#f0994a","#9212c2","#c08472","#bebb7e",
	                      "#773335","#61878b","#785ec6","#bfa50f","#496798"
	                      ];
	CollectStat.NoDataColor	= ["#446BDF"];
	
//	CollectStat.StatKey = 
//	{
//			CARD_COUNT			: "CARD_COUNT",	
//			GOOD_FINGER_COUNT	: "GOOD_FINGER_COUNT",
//			BAD_FINGER_COUNT	: "BAD_FINGER_COUNT",
//			UNKNOWN_FINGER_COUNT: "UNKNOWN_FINGER_COUNT",
//			GOOD_PALM_COUNT		: "GOOD_PALM_COUNT",
//			BAD_PALM_COUNT		: "BAD_PALM_COUNT",	
//			UNKNOWN_PALM_COUNT	: "UNKNOWN_PALM_COUNT",	
//			DNA_COUNT			: "DNA_COUNT",
//			MOBILE_PHONE_COUNT	: "MOBILE_PHONE_COUNT",	
//			OTHER_GOODS_COUNT	: "OTHER_GOODS_COUNT",	
//			FACE_COUNT			: "FACE_COUNT",			
//			HAND_WRITING_COUNT	: "HAND_WRITING_COUNT",	
//			SHOE_PRINT_COUNT	: "SHOE_PRINT_COUNT",	
//			TT_SUBMIT_COUNT		: "TT_SUBMIT_COUNT",
//			TT_HIT_COUNT		: "TT_HIT_COUNT",		
//			TL_SUBMIT_COUNT		: "TL_SUBMIT_COUNT",	
//			TL_HIT_COUNT		: "TL_HIT_COUNT"
//	};
	
	CollectStat.divNameRel = {};
	CollectStat.divNameRel["CARD_COUNT"] 			= "my_chart_1";
	CollectStat.divNameRel["GOOD_FINGER_COUNT"] 	= "my_chart_2";
	CollectStat.divNameRel["BAD_FINGER_COUNT"] 		= "my_chart_3";	
	CollectStat.divNameRel["UNKNOWN_FINGER_COUNT"] 	= "my_chart_4";
	CollectStat.divNameRel["GOOD_PALM_COUNT"] 		= "my_chart_5";
	CollectStat.divNameRel["BAD_PALM_COUNT"] 		= "my_chart_6";
	CollectStat.divNameRel["UNKNOWN_PALM_COUNT"] 	= "my_chart_7";
	CollectStat.divNameRel["DNA_COUNT"] 			= "my_chart_8";
	CollectStat.divNameRel["MOBILE_PHONE_COUNT"] 	= "my_chart_9";
	CollectStat.divNameRel["OTHER_GOODS_COUNT"] 	= "my_chart_10";
	CollectStat.divNameRel["FACE_COUNT"] 			= "my_chart_11";
	CollectStat.divNameRel["HAND_WRITING_COUNT"] 	= "my_chart_12";
	CollectStat.divNameRel["SHOE_PRINT_COUNT"] 		= "my_chart_13";
	CollectStat.divNameRel["TT_SUBMIT_COUNT"] 		= "my_chart_14";
	CollectStat.divNameRel["TT_HIT_COUNT"] 			= "my_chart_15";
	CollectStat.divNameRel["TL_SUBMIT_COUNT"] 		= "my_chart_16";
	CollectStat.divNameRel["TL_HIT_COUNT"] 			= "my_chart_17";
	
	this.tdNameRel = {};
	this.tdNameRel["CARD_COUNT"] 			= AbisMessageResource.Stat["PersonCount"];
	this.tdNameRel["GOOD_FINGER_COUNT"] 	= AbisMessageResource.Stat["QualifiedFingerPrintCount"];
	this.tdNameRel["BAD_FINGER_COUNT"] 		= AbisMessageResource.Stat["UnqualifiedFingerprintCount"];
	this.tdNameRel["UNKNOWN_FINGER_COUNT"] 	= AbisMessageResource.Stat["FingerprintUnknownCount"];
	this.tdNameRel["GOOD_PALM_COUNT"] 		= AbisMessageResource.Stat["QualifiedPalmPrintCount"];
	this.tdNameRel["BAD_PALM_COUNT"] 		= AbisMessageResource.Stat["UnqualifiedPalmprintCount"];
	this.tdNameRel["UNKNOWN_PALM_COUNT"] 	= AbisMessageResource.Stat["PalmPrintUnknownCount"];
	this.tdNameRel["DNA_COUNT"] 			= AbisMessageResource.Stat["BloodSampleCount"];
	this.tdNameRel["MOBILE_PHONE_COUNT"] 	= AbisMessageResource.Stat["ArticlePhoneCount"];
	this.tdNameRel["OTHER_GOODS_COUNT"] 	= AbisMessageResource.Stat["ArticleOtherCount"];
	this.tdNameRel["FACE_COUNT"] 			= AbisMessageResource.Stat["PhotoCount"];
	this.tdNameRel["HAND_WRITING_COUNT"] 	= AbisMessageResource.Stat["HandwritingCount"];
	this.tdNameRel["SHOE_PRINT_COUNT"] 		= AbisMessageResource.Stat["FootCount"];
	this.tdNameRel["TT_SUBMIT_COUNT"] 		= AbisMessageResource.Stat["TTSubmitCount"];
	this.tdNameRel["TT_HIT_COUNT"] 			= AbisMessageResource.Stat["TTHitCount"];
	this.tdNameRel["TL_SUBMIT_COUNT"] 		= AbisMessageResource.Stat["TLSubmitCount"];
	this.tdNameRel["TL_HIT_COUNT"] 			= AbisMessageResource.Stat["TLHitCount"];
	
	CollectStat.tdNameRel 					= this.tdNameRel;
	
	this.cols = new Array();
	this.cols.push("UNIT_CODE");
	this.cols.push("CARD_COUNT");
	this.cols.push("GOOD_FINGER_COUNT");
	this.cols.push("BAD_FINGER_COUNT");
	this.cols.push("UNKNOWN_FINGER_COUNT");
	this.cols.push("GOOD_PALM_COUNT");
	this.cols.push("BAD_PALM_COUNT");
	this.cols.push("UNKNOWN_PALM_COUNT");
	this.cols.push("DNA_COUNT");
	this.cols.push("MOBILE_PHONE_COUNT");
	this.cols.push("OTHER_GOODS_COUNT");
	this.cols.push("FACE_COUNT");
	this.cols.push("HAND_WRITING_COUNT");
	this.cols.push("SHOE_PRINT_COUNT");
	this.cols.push("TT_SUBMIT_COUNT");
	this.cols.push("TT_HIT_COUNT");
	this.cols.push("TL_SUBMIT_COUNT");
	this.cols.push("TL_HIT_COUNT");
	
	this.flg = {};
	this.flg["CARD_COUNT"] 			= false;
	this.flg["GOOD_FINGER_COUNT"] 	= false;
	this.flg["BAD_FINGER_COUNT"] 	= false;
	this.flg["UNKNOWN_FINGER_COUNT"]= false;
	this.flg["GOOD_PALM_COUNT"] 	= false;
	this.flg["BAD_PALM_COUNT"] 		= false;
	this.flg["UNKNOWN_PALM_COUNT"] 	= false;
	this.flg["DNA_COUNT"] 			= false;
	this.flg["MOBILE_PHONE_COUNT"] 	= false;
	this.flg["OTHER_GOODS_COUNT"] 	= false;
	this.flg["FACE_COUNT"] 			= false;
	this.flg["HAND_WRITING_COUNT"] 	= false;
	this.flg["SHOE_PRINT_COUNT"] 	= false;
	this.flg["TT_SUBMIT_COUNT"] 	= false;
	this.flg["TT_HIT_COUNT"] 		= false;
	this.flg["TL_SUBMIT_COUNT"] 	= false;
	this.flg["TL_HIT_COUNT"] 		= false;
	
	CollectStat.flg 				= this.flg;
}

CollectStat.prototype.init = function()
{
	
	
	this.initParams();
	
	this.unitcode 	= WebUI.createCombo("unitcode","unitcode",null,null,true,false,"USER_MAIN|UNIT_CODE","",null);
	this.unitcode.setFilterRgx(this.codeFilter);
	
	var columnnames = ['USER_MAIN|UNIT_CODE'];	
	
	var filtercolums = new Array();
	filtercolums.push("USER_MAIN|UNIT_CODE:"+ this.codeFilter);
   
	WebComboUtil.getCodeTable(columnnames, invoke, filtercolums);
    
    var nThis = this;
    function invoke(data)
    {
    	data = eval('(' + data + ')');	
    	nThis.unitcode.setComboData(data['user_main|unit_code']);
    }
    
    var searchBnt = WebUI.createWebButton("search_bnt", WebUI.BntType.B_80_24, "", search);
    
    function search()
    {
    	var param = {};
    	param.unitCode 	= nThis.unitcode.getValue();
    	param.hasLowerLv= $("#haslowerlv").is(":checked");
    	
    	var startDate = $("input[name='startdate']").val();
    	var endDate = $("input[name='enddate']").val();
    	if(startDate > endDate)
		{
			//alert("时间应按照前小后大填写!");
			alert(AbisMessageResource.Alert["StartTimeCanNotGreaterThanEndTime"]);
			return;
		}
    	param.startDate = startDate
    	param.endDate 	= endDate;
    	var jsonData = $.toJSON(param);
    	
    	var table = $("#StatTable");
    	var trs = table.find("tr:gt(1)");
    	trs.remove();
    	var nthis = this;
    	var url = WebVar.VarPath + "/stat/collect/search/";
		$.ajax
		({
    		type 		: 'POST',
    		contentType : 'application/json',
    		url 		: url,
    		data 		: jsonData,
    		dataType 	: 'json',
    		timeout 	: WebVar.TimeOut,
    		success 	: function(data) 
    		{
    			searchFinish(data);
    		},
    		error : function(e, status, error) 
    		{
    			if (status == "timeout") 
    			{
    				alert(AbisMessageResource.Alert["ConnectTimeOut"]);
	    		}
    		}
		});
 
    }
    
    function searchFinish(data)
    {
    	nThis.loadData(data);
    }
	
    var url = WebVar.VarPath + "/js/abis/stat/open-flash-chart.swf";
    for(var col in CollectStat.divNameRel)
    {
    	var divId = CollectStat.divNameRel[col];
    	var funcName = "get_" + divId;
    	swfobject.embedSWF(url, divId,"480", "320", "9.0.0", "expressInstall.swf",{"get-data" : funcName}, {wmode:"transparent"}); 
    }
}

function get_my_chart_1(){return getData("CARD_COUNT");}
function get_my_chart_2(){return getData("GOOD_FINGER_COUNT");}
function get_my_chart_3(){return getData("BAD_FINGER_COUNT");}
function get_my_chart_4(){return getData("UNKNOWN_FINGER_COUNT");}
function get_my_chart_5(){return getData("GOOD_PALM_COUNT");}
function get_my_chart_6(){return getData("BAD_PALM_COUNT");}
function get_my_chart_7(){return getData("UNKNOWN_PALM_COUNT");}
function get_my_chart_8(){return getData("DNA_COUNT");}
function get_my_chart_9(){return getData("MOBILE_PHONE_COUNT");}
function get_my_chart_10(){return getData("OTHER_GOODS_COUNT");}
function get_my_chart_11(){return getData("FACE_COUNT");}
function get_my_chart_12(){return getData("HAND_WRITING_COUNT");}
function get_my_chart_13(){return getData("SHOE_PRINT_COUNT");}
function get_my_chart_14(){return getData("TT_SUBMIT_COUNT");}
function get_my_chart_15(){return getData("TT_HIT_COUNT");}
function get_my_chart_16(){return getData("TL_SUBMIT_COUNT");}
function get_my_chart_17(){return getData("TL_HIT_COUNT");}


function getData(key)
{
	CollectStat.flg[key] = true;
	
	var vs 	= null;
	if(CollectStat.vMaps != null)
	{
		vs = CollectStat.vMaps[key];
	}
	
	var data = null;
	if(vs != null)
	{
		data = convertData(key);
		CollectStat.vMaps[key] = null;
	}
	else
	{
		data = getDefaultData(key);
	}

	return data; 
}

function getDefaultData(key)
{
	var title = CollectStat.tdNameRel[key];
	var vs 		= [{"value":100,"label":AbisMessageResource["NotStat"],"highlight":"alpha"}];
	var data 	= buildData(title,vs,CollectStat.NoDataColor);
	return data;
}

function filterData(min,max,angle,vs)
{
	if(vs == null) return null;
	
	vs.sort
	(
		function(o1,o2)
		{
			var v1 		= o1.value;
			var v2 		= o2.value;
			var flag 	= v1 > v2 ? -1 : 0;
			return flag;
		}
	);
	
	var total = 0;
	for(var i = 0; i< vs.length;i++)
	{
		total += vs[i].value;
	}
	var av = (total / 360.0) * angle;
	
	
	var otherValue 	= 0;
	var otherTip 	= "";
	
	var values = new Array();
	for(var i = 0; i< vs.length;i++)
	{
		var value = vs[i];
		var val = value.value;
		if( i < min)
		{
			if(value.value != 0) 
			{
				values.push(value);
			}
		}
		else
		{
			if(val < av || i >= max )
			{
				otherValue += val;
				otherTip += value.label + "</br>";
			}
			else
			{
				values.push(value);
			}
		}
	}
	
	if(otherValue != 0)
	{
		var data 		= {"value":otherValue,"label":AbisMessageResource["Other"],"highlight":"alpha"};
		values.push(data);
	}
	
	return values;
}


CollectStat.prototype.loadData = function(data)
{
	CollectStat.vMaps = {};
	CollectStat.vMaps["CARD_COUNT"] 			= new Array();
	CollectStat.vMaps["GOOD_FINGER_COUNT"] 		= new Array();
	CollectStat.vMaps["BAD_FINGER_COUNT"] 		= new Array();
	CollectStat.vMaps["UNKNOWN_FINGER_COUNT"] 	= new Array();
	CollectStat.vMaps["GOOD_PALM_COUNT"] 		= new Array();
	CollectStat.vMaps["BAD_PALM_COUNT"] 		= new Array();
	CollectStat.vMaps["UNKNOWN_PALM_COUNT"] 	= new Array();
	CollectStat.vMaps["DNA_COUNT"] 				= new Array();
	CollectStat.vMaps["MOBILE_PHONE_COUNT"] 	= new Array();
	CollectStat.vMaps["OTHER_GOODS_COUNT"] 		= new Array();
	CollectStat.vMaps["FACE_COUNT"] 			= new Array();
	CollectStat.vMaps["HAND_WRITING_COUNT"] 	= new Array();
	CollectStat.vMaps["SHOE_PRINT_COUNT"] 		= new Array();
	CollectStat.vMaps["TT_SUBMIT_COUNT"] 		= new Array();
	CollectStat.vMaps["TT_HIT_COUNT"] 			= new Array();
	CollectStat.vMaps["TL_SUBMIT_COUNT"] 		= new Array();
	CollectStat.vMaps["TL_HIT_COUNT"] 			= new Array();
	
	var table = $("#StatTable");
	
	if(!WebUtil.isEmpty(data))
	{
		var trs = table.find("tr:gt(1)");
    	
		for(var i =0;i<data.length;i++)
		{
			var row = data[i];
			var tr = $("<tr></tr>");
			var unitName = row["UNIT_CODE"];
			for(var j=0;j<this.cols.length;j++)
			{
				var colName = this.cols[j];
				var value = row[colName];
				
				if(colName != "UNIT_CODE")
				{
					var values = CollectStat.vMaps[colName];
					if(unitName != AbisMessageResource["Total"])
					{
						var d = {"value":value,"label":unitName+":"+value,"highlight":"alpha"};
						values.push(d);
					}
				}
				
				var td = $("<td>" + value + "</td>");
				if(i == data.length - 1)
				{
					td.addClass("td_bottom");
					if(j == 0)
					{
						td.addClass("hj");
					}
				}
				else
				{
					if(j == 0)
					{
						td.addClass("fc");
					}
				}
				
				if(j == this.cols.length - 1)
				{
					td.addClass("td_right");
				}
				tr.append(td);
			}
			
			table.append(tr);
		}
	}
	else
	{
		var tr = $("<tr></tr>");
		tr.append($("<td class=\"td_bottom hj\">" + AbisMessageResource["Total"] + "</td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom\"></td>"));
		tr.append($("<td class=\"td_bottom td_right\"></td>"));
		table.append(tr);
	}
	
	this.loadImgData();
}

CollectStat.prototype.loadImgData = function()
{
	for(var j = 0;j < this.cols.length;j++)
	{
		var colName = this.cols[j];
		if(colName != "UNIT_CODE")
		{
			var flash = this.flg[colName];
			if(!flash) continue;
			
			var data = convertData(colName);
			var tmp = findSWF(CollectStat.divNameRel[colName]); 
			tmp.load(data);
			CollectStat.vMaps[colName] = null;
		}
	}
}

function convertData(colName)
{
	var hasCnt	= false;
	var vs 		= CollectStat.vMaps[colName];
	var title 	= CollectStat.tdNameRel[colName];
	for(var i=0;i<vs.length;i++)
	{
		if(vs[i].value != "0")
		{
			hasCnt = true;
			break;
		}
	}
	var data = null;
	if(!hasCnt)
	{
		// 所有数据都为0
		vs = new Array();
		var vd = {"value":"100","label":"0","highlight":"alpha"};
		vs.push(vd);
		data = buildData(title,vs,CollectStat.NoDataColor);
	}
	else
	{
		vs = filterData(10,20,15,vs);
		data = buildData(title,vs,CollectStat.Colors);
	}
	return data;
}

function buildData(title,values,colors)
{  
	
	var data =
	{
			"title"							: {"text" : title,"style":"{font-size: 14px;font-family:微软雅黑;font-weight:600;}"},
			"is_decimal_separator_comma"	: 0,
			"bg_colour"						: "#FFFFFF",
			"num_decimals"					: 2,
			"is_fixed_num_decimals_forced"	: 0,
			"is_thousand_separator_disabled": 0,
			"elements":
			[
				{
					"values"	: values,
					"type"		:"pie",
					"colours"	: colors,
					"tip"		: "#percent#",  
					"alpha"		: "0.9",
					"font-size"	: 12,  
					"radius"	: 85,
					"on-click"	: ""
				}
			]
	};
	var jsonData = JSON.stringify(data);
	return jsonData;
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

