
/**
 * 数组操作帮助类
 */
var WebArrayUtil =
{
	containsToIgnoreCase:function(list,value)
	{
		if(WebUtil.isEmpty(list)) return false;
		if(value == null)return false;
		value = value.toUpperCase();
		var r;
		var b = false;
		for(var i in list)
		{
			var obj = list[i];
			if(obj instanceof Array)
			{
				b = this.containsToIgnoreCase(obj,value);
				if(b == true) break;
			}
			else
			{
				r = obj.toUpperCase();
				if(r == value)
				{
					b = true;
					break;
				}
			}
		}
		return b;
	},
	contains:function(list,value)
	{
		if(WebUtil.isEmpty(list)) return false;
		if(value == null)return false;
		for(var i =0;i<list.length;i++)
		{
			if(list[i] == value)
			{
				return true;
			}
		}
		return false;
	},
	indexOf:function(list,value)
	{
		if(WebUtil.isEmpty(list)) return -1;
		if(value == null)return -1;
		for(var i =0;i<list.length;i++)
		{
			if(list[i] == value)
			{
				return i;
			}
		}
		return -1;
	},
	join: function(list,c)
	{
		if(list == null || list.length == 0)return null;
		var str = "";
		for(var i in list)
		{
			var s = list[i];
			str += s + ",";
		}
		str = str.substring(0,str.length-1);
		return str;
	}
}
