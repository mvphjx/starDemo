

function WorkLoadStat(workRes)
{
	this.workRes = workRes;
	this.init();
}

WorkLoadStat.prototype.init = function()
{
	this.initUI();
	this.initData();
}


WorkLoadStat.prototype.initUI = function()
{
	this.searchBnt 	= WebUI.createWebButton("SearchBntId", WebUI.BntType.B_100_24, "NormalBnt", search);
	this.clearBnt 	= WebUI.createWebButton("ClearBntId", WebUI.BntType.B_100_24, "NormalBnt", clear);
//	WebUI.createLinkButton("ExportExcelBnt",LinkButtonCfg.Cfg.ExpFpt,exportExcel);
		
	var thisObj = this;
	function search()
	{
		var param 		= {};
		param.unitCode 	= $("#Unitcode").val();
		param.userName 	= $("#UserName").val();
		param.startDate = $("#StartDate").val();
		param.endDate 	= $("#EndDate").val();
		//保存人员
		var p =
		{
			"param" : param
		};
		var jsonStr = JSON.stringify(p);
		thisObj.wait();
		$.ajax
		(
			{
			    type 	: "POST",
			    data 	: jsonStr,
			    url		: WebVar.VarPath +"/stat/workload/find/",//GLOBAL.NAMESPACE+"/stat/WorkLoadStatAction!execWork.action",
			    contentType : "application/json",
			    complete : function(res, status)
			    {
//					var obj = eval('(' + res.responseText + ')');
//					thisObj.workRes = eval('(' + obj.WorkRes + ')');
					thisObj.initData();
					
			    }
			}
		);
	}
	
	function clear()
	{
		$("#Unitcode").val("");
		$("#UserName").val("");
		$("#StartDate").val("");
		$("#EndDate").val("");
	}
	
	function exportExcel()
	{
		window.clipboardData.setData("Text",document.all("WorkLoadTable").outerHTML);
		try  
		{
			var ExApp = new ActiveXObject("Excel.Application");
			var ExWBk = ExApp.workbooks.add();
			var ExWSh = ExWBk.worksheets(1);
			ExApp.DisplayAlerts = false;
			ExApp.visible = true;
		}
		catch(e)
		{
			alert(AbisMessageResource["PleaseTrustedSite"]);
			return false;
		}
	 	ExWBk.worksheets(1).Paste;
	}
}


WorkLoadStat.prototype.wait = function()
{
	var table 	= $("#WorkLoadTable");
	var $trs 	= table.find("tr:gt(0)");
	$trs.remove();
	//添加一行等待
	var tr = $("<tr></tr>");
	var td= $("<td align=\"center\" colspan=\"4\"></td>");
	var waitArea = $("<div class=\"wait\"></div>");
	var wait = $("<div class=\"icon\"></div>");
	var text = $("<div class=\"text\">" + AbisMessageResource["Counting"] +"</div>");
	waitArea.append(wait);
	waitArea.append(text);
	td.append(waitArea);
	tr.append(td);
	table.append(tr);
}

WorkLoadStat.prototype.initData = function()
{
	/*
		<tr>
			<th class="FirstCol">用户名</th>
			<th>切割数量</th>
			<th>扫描数量</th>
			<th>合计</th>
		</tr>
		<tr>
			<td class="header">abisadmin</td>
			<td>20</td>
			<td>30</td>
			<td class="VTotal">50</td>
		</tr>
		<tr>
			<td class="header">合计</td>
			<td class="HTotal">0</td>
			<td class="HTotal">0</td>
			<td class="HTotal">0</td>
		</tr>
	*/
	var table = $("#WorkLoadTable");
	table.find("tbody").remove();
	//创建表头
	var header = $("<tr></tr>");
	table.append(header);
	var c1 = $("<th class=\"FirstCol\">" + AbisMessageResource["UserName"] + "</th>");
	var c2 = $("<th>" + AbisMessageResource["UserName"] + "</th>");
	var c3 = $("<th>" + AbisMessageResource["CutCount"] + "</th>");
	var c4 = $("<th>" + AbisMessageResource["Total"] + "</th>");
	header.append(c1);
	header.append(c2);
	header.append(c3);
	header.append(c4);
	
	//构建统计数据
	var work;
	var row;
	var td1,td2,td3,td4 ; 
	if(!WebUtil.isEmpty(this.workRes))
	{
		for(var i=0;i<this.workRes.length;i++)
		{
			work = this.workRes[i];
			row = $("<tr></tr>");
			table.append(row);
			td1 = $("<td class=\"header\"></td>");
			td2 = $("<td></td>");
			td3 = $("<td></td>");
			td4 = $("<td class=\"VTotal\"></td>");
			if(i == this.workRes.length - 1)
			{
				td1.attr("class","Total");
				td2.attr("class","HTotal");
				td3.attr("class","HTotal");
				td4.attr("class","HTotal");
			}
			td1.html(work.realName);
			td2.html(work.scanCount);
			td3.html(work.segCount);
			td4.html(work.totalCount);
			
			row.append(td1);
			row.append(td2);
			row.append(td3);
			row.append(td4);
		}
	}
}
