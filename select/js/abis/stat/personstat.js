
function PersonStat()
{
	this.init();
}

PersonStat.prototype.init = function()
{
    
    var url = WebVar.VarPath + "/js/abis/stat/open-flash-chart.swf";
    for(var i=1 ; i<= 2 ;i++)
    {
    	var dataUrl = WebVar.VarPath + "/stat/person/build/"+i;
//    	var func = eval("getD"+i);
    	swfobject.embedSWF(url, "my_chart_" + i,"450", "420", "9.0.0", "expressInstall.swf",{"data-file":dataUrl}, {wmode:"transparent"}); 
    }
    
}

function getD1(){return getData();}
function getD2(){return getData();}

function getData()
{
	var data =
	{
			"title":{"text":AbisMessageResource["PieChart"]},
			"is_decimal_separator_comma":0,
			"elements":
			[
				{
					"values":
					[
						{"value":14,"label":AbisMessageResource["Unknown"],"highlight":"alpha"},
						{"value":50,"label":AbisMessageResource["Male"],"highlight":"alpha"},
						{"value":43,"label":AbisMessageResource["Female"],"highlight":"alpha"},
						{"value":21,"label":AbisMessageResource["NotExplain"],"highlight":"alpha"},
						{"value":62,"label":AbisMessageResource["Error"],"highlight":"alpha"}
					],
					"type":"pie",
					"colours":["#669900","#6666ff","#6699ff","#cc9955","#660000"],
					"tip"		: "#percent# #val#",  
					"alpha"		: "0.9",
					"font-size"	: 12,  
					"on-click"	: ""
				}
			],
			"num_decimals":2,
			"is_fixed_num_decimals_forced":0,
			"is_thousand_separator_disabled":0
	};

	return JSON.stringify(data);
}
