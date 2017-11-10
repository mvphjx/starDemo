

function UnitStat(id,array,searchStr)
{
	this.id = id;
	this.array = array;
	this.searchStr = searchStr;
	this.init();
}

UnitStat.prototype.init = function()
{
	
	var tit1 = "<tr><td colspan=\"1\" rowspan=\"5\" class=\"titX\">单位　项目</td><td colspan=\"10\" class=\"titS\">捺印指纹搜集与管理</td><td colspan=\"5\" class=\"titS\">现场指纹</td><td colspan=\"14\" class=\"titS\">指纹应用</td>" +
			"<td colspan=\"2\" rowspan=\"2\" class=\"titS\">抓获人员</td><td rowspan=\"5\" class=\"titN\">材料上报</td><td colspan=\"2\" rowspan=\"2\" class=\"titS\">活采倒查反馈</td></tr>";
	var tit2 = "<tr><td rowspan=\"4\" class=\"titN\">搜集  指标</td><td colspan=\"4\" class=\"titS\">搜集上报数</td><td colspan=\"2\" class=\"titS\">不合格数</td><td rowspan=\"4\" class=\"titN\">利用数</td><td rowspan=\"4\" class=\"titN\">得分</td><td rowspan=\"4\" class=\"titN\">名次</td><td rowspan=\"4\" class=\"titN\">上报数</td>" +
				"<td colspan=\"3\" class=\"titS\">不合格</td><td rowspan=\"4\" class=\"titN\">利用数</td><td colspan=\"11\" class=\"titS\">破案</td><td rowspan=\"4\" class=\"titN\">认定人犯</td><td colspan=\"2\" rowspan=\"3\" class=\"titS\">利用活采指纹破案</td></tr>";
	var tit3 = "<tr><td rowspan=\"3\" class=\"titN\">合计</td><td rowspan=\"3\" class=\"titN\">油墨捺印指纹</td><td colspan=\"2\" class=\"titS\">活采指纹</td><td rowspan=\"3\" class=\"titN\">采集入库不合格数</td><td rowspan=\"3\" class=\"titN\">平面掌纹不合格数</td><td rowspan=\"3\" class=\"titN\">查档超时效数</td>" +
			"<td rowspan=\"3\" class=\"titN\">特征标注不合格数</td><td rowspan=\"3\" class=\"titN\">文字信息不合格项</td><td rowspan=\"3\" class=\"titN\">合计</td><td colspan=\"5\" class=\"titS\">正查</td><td colspan=\"5\" class=\"titS\">倒查</td><td rowspan=\"3\" class=\"titN\">上报抓获材料</td>" +
					"<td rowspan=\"3\" class=\"titN\">比对报警抓获</td><td rowspan=\"3\" class=\"titN\">超2小时反馈</td><td rowspan=\"3\" class=\"titN\">未反馈</td></tr>";
	var tit4 = "<tr><td rowspan=\"2\" class=\"titN\">有人员资料号</td><td rowspan=\"2\" class=\"titN\">无人员资料号</td><td colspan=\"2\" class=\"titS\">市内</td><td colspan=\"2\" class=\"titS\">协查</td><td rowspan=\"2\" class=\"titN\">本省外市</td>" +
			"<td colspan=\"2\" class=\"titS\">市内</td><td colspan=\"2\" class=\"titS\">协查</td><td rowspan=\"2\" class=\"titN\">本省外市</td></tr>";
	var tit5 = "<tr><td class=\"titN\">一般</td><td class=\"titN\">" + AbisMessageResource['HomicideCase'] + "</td><td class=\"titN\">部A和B＋</td><td class=\"titN\">部C</td><td class=\"titN\">一般</td><td class=\"titN\">"+AbisMessageResource['HomicideCase']+"</td><td class=\"titN\">部A和B＋</td><td class=\"titN\">部C</td><td class=\"titN\">正查</td><td class=\"titN\">倒查</td></tr>";
	var tit = tit1 + tit2 + tit3 + tit4 + tit5;
	var tr = "";
	var trr = "";
	var cssT;
	for(var i = 0;i < array.length;i++)
	{
		if(i%2 != 0)
		{
			cssT = "titR";
		}
		else
		{
			cssT= "";
		}
		trr = "";
		var mdata = this.searchStr[i].mdata;
		var ydata = this.searchStr[i].ydata;
		
		for(var k = 0; k < mdata.length;k++)
		{
			trr = trr + "<td class=\"titS\">"+mdata[k]+"</td>";
		}
		tr = tr + "<tr class="+cssT+"><td rowspan=\"2\" class=\"titS\">"+array[i]+"</td><td class=\"titS\">当月</td>" + trr + "</tr>";
		trr = "";
		for(var k = 0; k < ydata.length;k++)
		{
			trr = trr + "<td class=\"titSR\">"+ydata[k]+"</td>";
		}
		tr = tr + "<tr class="+cssT+"><td class=\"titSR\">年累</td>" + trr + "</tr>";
	}
	var table = "<table border=\"0\"cellpadding=\"0\" cellspacing=\"0\" class=\"tableStat\">" + tit + tr + "</table>";
	$("#" + this.id).html(table);
}


