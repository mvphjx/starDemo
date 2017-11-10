
function SpecPersonClassStat()
{
	this.init();
}

SpecPersonClassStat.prototype.init = function()
{
	 var url = WebVar.VarPath + "/js/abis/stat/open-flash-chart.swf";
	 var dataUrl = WebVar.VarPath + "/stat/specpersonuserclass/build";
	 swfobject.embedSWF(url, "my_chart_2","600", "520", "9.0.0", "expressInstall.swf",{"data-file":dataUrl}, {wmode:"transparent"}); 
    //520
}
function getD1(){return getData();}

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
					"colours":["#c7497e","#0a75eb","#825e6b","#711285","#ca5f17",
			                      "#c5058b","#237272","#a30c29","#585bcf","#3f7d3c",
			                      "#0684a8","#bb8842","#232565","#23a094","#56568b",
			                      "#9aa943","#f0994a","#9212c2","#c08472","#bebb7e",
			                      "#773335","#61878b","#785ec6","#bfa50f","#496798"],
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
