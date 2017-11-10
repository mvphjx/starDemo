

function StatTable(id,statData)
{
	this.id = id;
	this.statData = statData;
	this.init();
}

StatTable.prototype.init = function()
{
	this.initUI();
}


StatTable.prototype.initUI = function()
{
	if(this.statData != null)
	{
		var day = this.statData.day;
		var data = this.statData.data;
		var dayTd = "";
		if(day != null && day != "")
		{
			for(var i = 0;i < day.length; i++)
			{
				dayTd += "<td class=\"titX\" height=\"50\" width=\"100\" >" + day[i] + "</td>";
			}
		}
		var dayTr = "<tr height=\"50\" width=\"100\">" + dayTd + "</tr>";
		var dataTr = "";
		if(data != null && data != "")
		{
			for(var i = 0;i < data.length; i++)
			{
				var dataStr = data[i];
				var dataTd = "";
				for(var k = 0;k < dataStr.length; k++)
				{
					dataTd += "<td class=\"titS\" height=\"50\" width=\"100\">" + dataStr[k] + "</td>";
				}
				dataTr += "<tr height=\"50\" width=\"100\">" + dataTd + "</tr>";
			}
		}
	}
	var table = "<table border=\"0\"cellpadding=\"0\" cellspacing=\"0\" class=\"tableStat\" >" + dayTr + dataTr + "</table>";
	
	var div = "<div style=\"overflow: auto; overflow-y:auto;\">" + table + "</div>";
	$("#" + this.id).html(div);
}

